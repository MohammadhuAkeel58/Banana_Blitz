import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
} from "react-native";
import axios from "axios";

const LeaderboardScreen = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          "http://10.0.2.2:5000/api/score/leaderboard"
        );
        setLeaderboard(response.data);
      } catch (error) {
        Alert.alert("Error", "Could not fetch leaderboard.");
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <ImageBackground
      source={require("../assets/Images/leaderboard1.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>🏆 Leaderboard 🏆</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <FlatList
            data={leaderboard}
            keyExtractor={(item) => item.userName}
            renderItem={({ item, index }) => (
              <View style={styles.item}>
                <Text style={styles.rank}>#{index + 1}</Text>
                <Image
                  source={{
                    uri:
                      item.profilePicture ||
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf27-ug2vMdYDQ773xf5si2zZd8Mn2_OVRbQ&s",
                  }}
                  style={styles.profilePicture}
                />
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{item.userName}</Text>
                  <Text style={styles.email}>{item.email}</Text>
                </View>
                <Text style={styles.highScore}>{item.highScore} pts</Text>
              </View>
            )}
          />
        )}
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
    width: "90%",
    marginTop: 60,
    paddingBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  rank: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFD700", // Gold color for rank
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: "#1e90ff", // Blue border for profile
  },
  userInfo: {
    flex: 1,
    paddingLeft: 10,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
  },
  highScore: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff6347",
  },
});

export default LeaderboardScreen;
