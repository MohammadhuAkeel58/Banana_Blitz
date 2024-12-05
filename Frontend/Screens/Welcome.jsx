import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/Images/Front.webp")}
        style={styles.image}
      />
      <Text style={styles.title}>Welcome to Banana Blitz</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.guestButton}
        onPress={() => navigation.navigate("GameScreen")}
      >
        <Text style={styles.buttonText}>Guest</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>Powered By Akeel Aslam</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  image: {
    width: 400,
    height: 400,
  },
  title: {
    fontSize: 30,
    marginBottom: 30,
    marginTop: 30,
    color: "yellow",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "yellow",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
    marginBottom: 30,
    borderColor: "green",
    borderWidth: 4,
  },
  guestButton: {
    backgroundColor: "yellow",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderColor: "green",
    borderWidth: 4,
  },
  buttonText: {
    fontSize: 18,
    color: "black",
  },
  footerText: {
    fontSize: 18,
    color: "grey",
    marginBottom: 210,
    marginTop: 80,
  },
});

export default WelcomeScreen;
