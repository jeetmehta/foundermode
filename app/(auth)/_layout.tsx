import { useAuth } from "@clerk/clerk-expo";
import { Slot, useRouter } from "expo-router";
import { useEffect } from "react";

export default function AuthLayout() {
  const { isSignedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isSignedIn) {
      router.replace("/sign-in");
    }
  }, [isSignedIn]);

  return <Slot />;
}
