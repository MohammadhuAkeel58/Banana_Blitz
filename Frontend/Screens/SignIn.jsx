import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const SignInScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      return Alert.alert("Error", "Please fill in both fields.");
    }

    if (!validateEmail(email)) {
      return Alert.alert("Error", "Please enter a valid email address.");
    }

    try {
      const response = await axios.post(
        "http://10.0.2.2:5000/api/auth/signin",
        { email, password }
      );
      const { token } = response.data;
      await AsyncStorage.setItem("userToken", token);
      navigation.navigate("Profile", { token });
    } catch (error) {
      Alert.alert("Error", "Invalid email or password");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/Images/leaderboard1.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Sign In</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
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
    color: "white",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 4,
    width: "80%",
    padding: 8,
    marginBottom: 10,
    borderColor: "grey",
    backgroundColor: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    borderRadius: 20,
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

export default SignInScreen;
