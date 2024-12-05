import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  Animated,
  ImageBackground,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(false);
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);

      try {
        const token = await AsyncStorage.getItem("userToken");
        const guest = (await AsyncStorage.getItem("guest")) === "true";

        if (guest) {
          Alert.alert("Notice", "Guest users cannot access the profile page");
          navigation.goBack();
          setLoading(false);
          return;
        }

        const response = await axios.get(
          "http://10.0.2.2:5000/api/profile/profiles",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setProfile(response.data);
      } catch (error) {
        Alert.alert("Error", "Could not fetch profile.");
        navigation.navigate("SignIn");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();

    Animated.loop(
      Animated.timing(rotation, {
        toValue: 1,
        duration: 12000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const deleteAcc = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      await axios.delete("http://10.0.2.2:5000/api/profile/deletepro", {
        headers: { Authorization: `Bearer ${token}` },
      });
      await AsyncStorage.removeItem("userToken");
      console.log("User deleted successfully.");
      navigation.navigate("Welcome");
    } catch (error) {
      console.log("Error Deleting Account:", error);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/Images/leaderboard1.png")}
      style={styles.background}
    >
      <View style={styles.card}>
        <View style={styles.header}>
          <Animated.Image
            style={[
              styles.avatar,
              { transform: [{ rotate: rotateInterpolate }] },
            ]}
            source={{
              uri:
                profile?.profilePicture ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf27-ug2vMdYDQ773xf5si2zZd8Mn2_OVRbQ&s",
            }}
          />
          <Text style={styles.username}>
            {profile?.userName || "Banana Blitz Player"}
          </Text>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#00bcd4" />
        ) : profile ? (
          <View style={styles.details}>
            <View style={styles.infoRow}>
              <Text style={styles.infoTitle}>Email:</Text>
              <Text style={styles.infoValue}>{profile.email}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoTitle}>Full Name:</Text>
              <Text style={styles.infoValue}>{profile.fullName}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoTitle}>High Score:</Text>
              <Text style={styles.infoValue}>{profile.highScore} pts</Text>
            </View>
          </View>
        ) : (
          <Text style={styles.loadingText}>Fetching profile...</Text>
        )}

        <TouchableOpacity style={styles.button} onPress={deleteAcc}>
          <Text style={styles.buttonText}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Instruction")}
        >
          <Text style={styles.buttonText}>View Instructions</Text>
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
    backgroundColor: "#e8f5fe",
  },
  card: {
    width: "85%",
    backgroundColor: "#ffffff",
    borderRadius: 25,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: "black",
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  details: {
    width: "100%",
    marginTop: 10,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingBottom: 8,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  infoValue: {
    fontSize: 16,
    color: "#777",
    fontStyle: "italic",
  },
  button: {
    marginTop: 20,
    backgroundColor: "yellow",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    textTransform: "uppercase",
  },
  loadingText: {
    fontSize: 16,
    color: "#888",
    marginTop: 20,
  },
});

export default ProfileScreen;
