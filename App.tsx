import { ClerkProvider } from "@clerk/clerk-expo";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import AlarmScreen from "./src/screens/AlarmScreen";
import ConnectEarningsScreen from "./src/screens/ConnectEarningsScreen";
import CreateAccountScreen from "./src/screens/CreateAccountScreen";
import FinishScreen from "./src/screens/FinishScreen";
import LoginScreen from "./src/screens/LoginScreen";
import NameInputScreen from "./src/screens/NameInputScreen";
import VerifyEmailScreen from "./src/screens/VerifyEmailScreen";
import VerifyPhoneScreen from "./src/screens/VerifyPhoneScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import { tokenCache } from "./src/utils/clerk";

const Stack = createStackNavigator();

export default function App() {
  return (
    <ClerkProvider
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!}
      tokenCache={tokenCache}
    >
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Welcome"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
          <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
          <Stack.Screen name="VerifyPhone" component={VerifyPhoneScreen} />
          <Stack.Screen name="NameInput" component={NameInputScreen} />
          <Stack.Screen
            name="ConnectEarnings"
            component={ConnectEarningsScreen}
          />
          <Stack.Screen name="Finish" component={FinishScreen} />
          <Stack.Screen name="Alarm" component={AlarmScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ClerkProvider>
  );
}
