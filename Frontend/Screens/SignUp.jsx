import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ImageBackground,
  StyleSheet,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateForm = () => {
    // Check for empty fields
    if (
      !userName.trim() ||
      !fullName.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      Alert.alert("Validation Error", "All fields are required.");
      return false;
    }

    // Check for valid email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Validation Error", "Please enter a valid email address.");
      return false;
    }

    // Check for password length
    if (password.length < 6) {
      Alert.alert(
        "Validation Error",
        "Password must be at least 6 characters long."
      );
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      await axios.post("http://10.0.2.2:5000/api/auth/signup", {
        userName,
        fullName,
        email,
        password,
      });
      Alert.alert("Success", "Account created successfully");
      navigation.navigate("SignIn");
    } catch (error) {
      Alert.alert("Error", "Could not create account");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/Images/leaderboard1.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          placeholder="Username"
          value={userName}
          onChangeText={setUserName}
          style={styles.input}
        />
        <TextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: 300,
    marginBottom: 150,
    marginTop: 150,
  },
  title: {
    fontSize: 30,
    marginBottom: 20,
    fontWeight: "bold",
    color: "white",
  },
  input: {
    borderWidth: 4,
    width: "80%",
    padding: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    borderRadius: 20,
    borderColor: "grey",
  },
  button: {
    backgroundColor: "#FFA500",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderColor: "grey",
    borderWidth: 4,
  },
  buttonText: {
    fontSize: 18,
    color: "black",
  },
});

export default SignUpScreen;
