import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const WelcomeScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome builders</Text>
      <Text style={styles.subtitle}>
        Founder mode is the alarm clock for you.
      </Text>

      <View style={styles.stepsContainer}>
        <Text style={styles.step}>1. Create an account</Text>
        <Text style={styles.step}>
          2. Connect your earnings (your data is private and read-only)
        </Text>
        <Text style={styles.step}>3. Set your alarm</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CreateAccount")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.loginButton]}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    padding: 20,
    justifyContent: "center",
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
    marginBottom: 30,
  },
  stepsContainer: {
    marginBottom: 30,
  },
  step: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  loginButton: {
    backgroundColor: "#000",
    borderColor: "#333",
    borderWidth: 1,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default WelcomeScreen;
