import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <Text style={styles.title}>Welcome builders</Text>
      <Text style={styles.subtitle}>
        Founder mode is the alarm clock for you.
      </Text>
      <View style={styles.stepsContainer}>
        <Text style={styles.step}>1. Create an account</Text>
        <Text style={styles.step}>2. Connect your earnings</Text>
        <Text style={styles.step}>3. Set your alarm</Text>
      </View>
      <Link href="/sign-up" asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </Link>
      <Link href="/sign-in" asChild>
        <TouchableOpacity style={[styles.button, styles.loginButton]}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </Link>
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
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    marginBottom: 30,
    textAlign: "center",
  },
  stepsContainer: {
    alignSelf: "stretch",
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
    width: "100%",
    alignItems: "center",
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  loginButton: {
    backgroundColor: "#000",
    borderColor: "#333",
    borderWidth: 1,
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
});
