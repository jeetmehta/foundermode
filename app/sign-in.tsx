import { useSignIn } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ReactNativePhoneInput from "react-native-phone-input";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SignInScreen() {
  const { signIn, isLoaded } = useSignIn();
  const router = useRouter();
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [isEmailMode, setIsEmailMode] = useState(true);
  const phoneInput = useRef<ReactNativePhoneInput>(null);

  const toggleMode = () => {
    setIsEmailMode(!isEmailMode);
    setEmailOrPhone("");
  };

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        identifier: emailOrPhone,
      });

      // This indicates the user is signed in
      await completeSignIn.createdSessionId;
      router.push("/(auth)/home");
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].message);
    }
  };

  const onOAuthSignInPress = async (
    strategy: "oauth_google" | "oauth_apple" | "oauth_facebook"
  ) => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignIn = await signIn.create({
        strategy: strategy,
        redirectUrl: "http://localhost:8081",
      });

      // This indicates the user is signed in
      await completeSignIn.createdSessionId;
      router.push("/(auth)/home");
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>Sign In</Text>
      <View style={styles.inputContainer}>
        {isEmailMode && (
          <>
            <Ionicons
              name={isEmailMode ? "mail-outline" : "call-outline"}
              size={24}
              color="#888"
              style={styles.buttonIcon}
            />
            <TextInput
              style={styles.input}
              placeholder={isEmailMode ? "Email" : "Phone Number"}
              placeholderTextColor="#888"
              value={emailOrPhone}
              onChangeText={setEmailOrPhone}
              keyboardType={isEmailMode ? "email-address" : "phone-pad"}
            />
          </>
        )}
      </View>
      {!isEmailMode && (
        <ReactNativePhoneInput
          ref={phoneInput}
          initialValue={emailOrPhone}
          initialCountry={"us"}
          onChangePhoneNumber={(text) => {
            setEmailOrPhone(text);
          }}
          style={styles.phoneInput}
          textStyle={styles.phoneInputText}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={onSignInPress}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or</Text>

      <TouchableOpacity style={styles.button} onPress={toggleMode}>
        <Ionicons
          name={isEmailMode ? "call-outline" : "mail-outline"}
          size={24}
          color="#fff"
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonText}>
          {isEmailMode ? "Continue with Phone" : "Continue with Email"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => onOAuthSignInPress("oauth_google")}
      >
        <Ionicons
          name="logo-google"
          size={24}
          color="#fff"
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonText}>Continue with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => onOAuthSignInPress("oauth_apple")}
      >
        <Ionicons
          name="logo-apple"
          size={24}
          color="#fff"
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonText}>Continue with Apple</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => onOAuthSignInPress("oauth_facebook")}
      >
        <Ionicons
          name="logo-facebook"
          size={24}
          color="#fff"
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonText}>Continue with Facebook</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <Link href="/sign-up" asChild>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 20,
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
    width: "100%",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#444",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonIcon: {
    marginRight: 10,
  },
  orText: {
    color: "#fff",
    fontSize: 16,
    marginVertical: 10,
  },
  footer: {
    flexDirection: "row",
    marginTop: 20,
  },
  footerText: {
    color: "#888",
    fontSize: 14,
  },
  footerLink: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  phoneInput: {
    width: "100%",
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#888",
    paddingHorizontal: 10,
  },
  phoneInputText: {
    color: "#fff",
  },
});
