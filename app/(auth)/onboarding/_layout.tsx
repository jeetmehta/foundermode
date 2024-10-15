import { Stack } from "expo-router";
import React from "react";

export default function OnboardingLayout() {
  return (
    <Stack>
      <Stack.Screen name="name" options={{ headerShown: false }} />
      <Stack.Screen name="earnings" options={{ headerShown: false }} />
      <Stack.Screen name="finish" options={{ headerShown: false }} />
    </Stack>
  );
}
