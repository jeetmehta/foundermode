import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const ConnectEarningsScreen: React.FC = () => {
  const router = useRouter();

  const handleConnect = (source: string) => {
    // Here you would typically implement the connection logic
    console.log(`Connecting to ${source}`);
    router.push("/onboarding/finish");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connect your earnings</Text>
      <Text style={styles.subtitle}>Your data is private and read-only</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleConnect("Stripe")}
      >
        <Text style={styles.buttonText}>Connect Stripe</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => handleConnect("Gumroad")}
      >
        <Text style={styles.buttonText}>Connect Gumroad</Text>
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
  },
  title: {
    fontSize: 24,
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
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

export default ConnectEarningsScreen;
