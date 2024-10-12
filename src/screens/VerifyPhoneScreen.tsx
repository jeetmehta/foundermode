import { useSignUp } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const VerifyPhoneScreen: React.FC = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const { signUp, setActive } = useSignUp();
  const navigation = useNavigation();

  const handleVerification = async () => {
    if (!signUp) {
      return;
    }
    try {
      const completeSignUp = await signUp.attemptPhoneNumberVerification({
        code: verificationCode,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        navigation.navigate("NameInput");
      } else {
        console.log("Sign up status:", completeSignUp.status);
        Alert.alert("Verification Failed", "Please try again.");
      }
    } catch (err: any) {
      console.error("Error during phone verification:", err);
      Alert.alert(
        "Verification Error",
        err.message || "An error occurred during verification."
      );
    }
  };

  const resendCode = async () => {
    if (!signUp) {
      return;
    }
    try {
      await signUp.preparePhoneNumberVerification();
      Alert.alert(
        "Code Sent",
        "A new verification code has been sent to your phone."
      );
    } catch (err: any) {
      console.error("Error resending code:", err);
      Alert.alert("Error", "Failed to resend verification code.");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>
      <Text style={styles.title}>Verify Your Phone</Text>
      <Text style={styles.subtitle}>
        Enter the verification code sent to your phone.
      </Text>
      <TextInput
        style={styles.input}
        value={verificationCode}
        onChangeText={setVerificationCode}
        placeholder="Verification Code"
        keyboardType="number-pad"
      />
      <TouchableOpacity style={styles.button} onPress={handleVerification}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.resendButton} onPress={resendCode}>
        <Text style={styles.resendButtonText}>Resend Code</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  button: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  resendButton: {
    marginTop: 20,
  },
  resendButtonText: {
    color: "#888",
    fontSize: 14,
  },
});

export default VerifyPhoneScreen;
