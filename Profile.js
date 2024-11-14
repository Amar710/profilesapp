import { useState, useEffect } from "react";
import {
  Button,
  Heading,
  Flex,
  View,
  Grid,
  Divider,
} from "@aws-amplify/ui-react";
import { Amplify } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import { generateClient } from "aws-amplify/data";
import outputs from "../amplify_outputs.json";
import { useSignOut } from "./authHelpers"; // Import the custom sign-out hook

Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});

export default function Profile() {
  const [userProfiles, setUserProfiles] = useState([]);
  const signOut = useSignOut(); // Use the shared sign-out function

  useEffect(() => {
    fetchUserProfile();
  }, []);

  async function fetchUserProfile() {
    const { data: profiles } = await client.models.UserProfile.list();
    setUserProfiles(profiles);
  }

  return (
    <Flex
      className="App"
      justifyContent="center"
      alignItems="center"
      direction="column"
      width="70%"
      margin="2rem auto"
      padding="2rem"
      style={{
        backgroundColor: "#f7f8fa",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Heading level={1} style={{ color: "#333" }}>My Profile</Heading>
      <Divider margin="1.5rem 0" />
      <Grid
        margin="3rem 0"
        templateColumns="repeat(auto-fit, minmax(250px, 1fr))"
        gap="2rem"
        alignContent="center"
      >
        {userProfiles.map((userProfile) => (
          <Flex
            key={userProfile.id || userProfile.email}
            direction="column"
            justifyContent="center"
            alignItems="center"
            padding="2rem"
            style={{
              border: "1px solid #ddd",
              borderRadius: "10px",
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1.0)")}
          >
            <View style={{ marginBottom: "1rem" }}>
              <Heading level={3} style={{ color: "#4CAF50" }}>{userProfile.email}</Heading>
            </View>
          </Flex>
        ))}
      </Grid>
      <Button
        onClick={signOut} // Use shared sign-out function
        style={{
          backgroundColor: "#ff5f6d",
          color: "#ffffff",
          border: "none",
          borderRadius: "5px",
          padding: "10px 20px",
          fontSize: "1em",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#ff7b81")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#ff5f6d")}
      >
        Sign Out
      </Button>
    </Flex>
  );
}
