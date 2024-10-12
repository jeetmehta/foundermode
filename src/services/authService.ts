import { useAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";

const CLERK_PUBLISHABLE_KEY = "your_clerk_publishable_key";

WebBrowser.maybeCompleteAuthSession();

export const ClerkAuthProvider = ({ children }) => (
  <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
    {children}
  </ClerkProvider>
);

export const useClerkAuth = useAuth;

// Add more auth-related functions as needed
