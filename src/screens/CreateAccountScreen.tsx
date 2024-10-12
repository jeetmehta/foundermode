import { useSignUp } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";

const CreateAccountScreen: React.FC = () => {
  const { signUp, setActive } = useSignUp();
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isEmailMode, setIsEmailMode] = useState(true);
  const phoneInput = useRef<PhoneInput>(null);

  const handleSignUp = async () => {
    if (!signUp) {
      return;
    }
    try {
      let signUpAttempt;

      if (isEmailMode) {
        if (!email) {
          Alert.alert("Email Required", "Please enter your email address.");
          return;
        }
        console.log("Attempting email sign up for:", email);
        signUpAttempt = await signUp.create({
          emailAddress: email,
        });
      } else {
        if (!phoneNumber) {
          Alert.alert(
            "Phone Number Required",
            "Please enter your phone number."
          );
          return;
        }
        console.log("Attempting phone sign up for:", phoneNumber);
        signUpAttempt = await signUp.create({
          phoneNumber: phoneNumber,
        });
      }

      console.log(
        "Sign up attempt result:",
        JSON.stringify(signUpAttempt, null, 2)
      );

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        navigation.navigate("NameInput");
      } else {
        if (signUpAttempt.verifications.emailAddress) {
          navigation.navigate("VerifyEmail", { signUpAttempt });
        } else if (signUpAttempt.verifications.phoneNumber) {
          navigation.navigate("VerifyPhone", { signUpAttempt });
        }
      }
    } catch (err: any) {
      console.error("Error during sign up:", err);
      console.log("Error details:", JSON.stringify(err, null, 2));

      let errorMessage = "An unexpected error occurred during sign up.";

      if (err.errors && err.errors.length > 0) {
        errorMessage = err.errors.map((e) => e.message).join("\n");
      } else if (err.message) {
        errorMessage = err.message;
      }

      Alert.alert("Sign Up Error", errorMessage);
    }
  };

  const handleOAuthSignUp = async (
    strategy: "oauth_google" | "oauth_apple"
  ) => {
    if (!signUp) {
      return;
    }
    try {
      const signUpAttempt = await signUp.create({
        strategy: strategy,
      });

      console.log(
        "OAuth sign up attempt result:",
        JSON.stringify(signUpAttempt, null, 2)
      );

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        navigation.navigate("NameInput");
      } else {
        Alert.alert("Sign Up Error", "Unable to complete OAuth sign up.");
      }
    } catch (err: any) {
      console.error("Error during OAuth sign up:", err);
      Alert.alert(
        "Sign Up Error",
        err.message || "An error occurred during OAuth sign up."
      );
    }
  };

  const toggleMode = () => {
    setIsEmailMode(!isEmailMode);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create an account</Text>

      <View style={styles.inputContainer}>
        {isEmailMode && (
          <>
            <Ionicons
              name={isEmailMode ? "mail-outline" : "call-outline"}
              size={24}
              color="#888"
              style={styles.icon}
            />
            <TextInput
              style={styles.input}
              placeholder={isEmailMode ? "Email" : "Phone Number"}
              placeholderTextColor="#888"
              value={isEmailMode ? email : phoneNumber}
              onChangeText={isEmailMode ? setEmail : setPhoneNumber}
              keyboardType={isEmailMode ? "email-address" : "phone-pad"}
            />
          </>
        )}
      </View>
      {!isEmailMode && (
        <PhoneInput
          ref={phoneInput}
          defaultValue={phoneNumber}
          defaultCode="US"
          layout="first"
          onChangeText={(text) => {
            setPhoneNumber(text);
          }}
          onChangeFormattedText={(text) => {
            setPhoneNumber(text);
          }}
          withDarkTheme
          withShadow
          autoFocus
          containerStyle={styles.phoneInputContainer}
          textContainerStyle={styles.phoneInputTextContainer}
        />
      )}
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Continue</Text>
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
        onPress={() => handleOAuthSignUp("oauth_apple")}
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
        onPress={() => handleOAuthSignUp("oauth_google")}
      >
        <Ionicons
          name="logo-google"
          size={24}
          color="#fff"
          style={styles.buttonIcon}
        />
        <Text style={styles.buttonText}>Continue with Google</Text>
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
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: "100%",
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: "#000",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#333",
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
  toggleButton: {
    marginTop: 10,
    marginBottom: 20,
  },
  toggleButtonText: {
    color: "#888",
    fontSize: 14,
  },
  orText: {
    color: "#fff",
    fontSize: 16,
    marginVertical: 10,
  },
  phoneInputContainer: {
    width: "100%",
    marginBottom: 10,
  },
  phoneInputTextContainer: {
    backgroundColor: "#fff",
  },
});

export default CreateAccountScreen;
