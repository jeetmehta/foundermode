import { useSignIn } from "@clerk/clerk-expo";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const LoginScreen: React.FC = () => {
  const { signIn, setSession, isLoaded } = useSignIn();
  const navigation = useNavigation();

  const onSignInWithGoogle = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        strategy: "oauth_google",
        redirectUrl: "foundermode://oauth-native-callback",
      });

      // This is an example redirect URL. You need to configure it in Clerk Dashboard.
      await setSession(completeSignIn.createdSessionId);
      navigation.navigate("Alarm");
    } catch (err: any) {
      console.error("OAuth error", err);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TouchableOpacity style={styles.button} onPress={onSignInWithGoogle}>
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>
      {/* Add other sign-in methods here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default LoginScreen;
