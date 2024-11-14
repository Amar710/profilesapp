import { useAuthenticator } from "@aws-amplify/ui-react";

export function useSignOut() {
  const { signOut } = useAuthenticator((context) => [context.user]);
  return signOut;
}
