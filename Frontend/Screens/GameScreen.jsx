import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  Animated,
  Easing,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const BananaGameScreen = () => {
  const navigation = useNavigation();
  const [quest, setQuest] = useState(null);
  const [solution, setSolution] = useState(null);
  const [note, setNote] = useState("[Wait for first game]");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(60);
  const [attempts, setAttempts] = useState(3);
  const [loading, setLoading] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const fadeAnim = useState(new Animated.Value(0))[0];

  useEffect(() => {
    fetchQuest();
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

  useEffect(() => {
    if (timer === 0 && attempts > 0 && !gameOver) {
      setAttempts((prevAttempts) => prevAttempts - 1);
      setTimer(60);
      setNote("Time ran out! New timer started.");
    } else if (attempts === 0 && !gameOver) {
      endGame();
    }
  }, [timer, attempts, gameOver]);

  const fetchQuest = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://marcconrad.com/uob/banana/api.php"
      );
      const data = response.data;
      setQuest(data.question);
      setSolution(data.solution);
      setNote("Quest is ready.");
      fadeInNote();
    } catch (error) {
      setNote("Error fetching data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const fadeInNote = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const handleInput = async (input) => {
    if (attempts <= 0 || loading || gameOver) return;

    if (input === solution) {
      setScore((prevScore) => prevScore + 1);
      setNote("Correct! New quest...");
      setTimer(60);
      setTimeout(() => fetchQuest(), 2000);
    } else {
      setNote("Not Correct!");
      setAttempts((prev) => prev - 1);
    }
  };

  const endGame = async () => {
    if (gameOver) return;

    setGameOver(true);
    setTimer(0);

    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await axios.post(
        "http://10.0.2.2:5000/api/score/scores",
        { score },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Score saved or updated successfully.", response.data);
    } catch (error) {
      console.log("Error saving or updating score:", error);
    }
  };

  const restartGame = () => {
    setScore(0);
    setTimer(60);
    setAttempts(3);
    setNote("[Wait for first game]");
    setGameOver(false);
    fetchQuest();
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem("userToken");
      console.log("User signed out successfully.");
      navigation.navigate("Welcome");
    } catch (error) {
      console.log("Error signing out:", error);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/Images/leaderboard1.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>The Banana Blitz</Text>
        <Text style={styles.timer}>Time: {timer} seconds</Text>
        <Text style={styles.attempts}>Attempts left: {attempts}</Text>
        <Text style={styles.score}>Score: {score}</Text>
        {gameOver ? (
          <Text style={styles.gameOver}>Game Over</Text>
        ) : loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : quest ? (
          <Image source={{ uri: quest }} style={styles.image} />
        ) : (
          <Text style={styles.loadingText}>Loading question...</Text>
        )}
        <Animated.Text style={[styles.note, { opacity: fadeAnim }]}>
          {note}
        </Animated.Text>
        <Text style={styles.inputLabel}>{solution}</Text>
        <Text style={styles.inputLabel}>Click the missing digit</Text>
        <View style={styles.buttonContainer}>
          {[...Array(10).keys()].map((num) => (
            <TouchableOpacity
              key={num}
              style={styles.numberButton}
              onPress={() => handleInput(num)}
              disabled={loading || attempts <= 0 || gameOver}
            >
              <Text style={styles.buttonText}>{num}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={[styles.actionButton, styles.startButton]}
            onPress={restartGame}
            disabled={loading}
          >
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.leaderboardButton]}
            onPress={() => navigation.navigate("leaderBoard")}
          >
            <Text style={styles.buttonText}>Leaderboard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={signOut}
          >
            <Text style={styles.buttonText}>SignOut</Text>
          </TouchableOpacity>
        </View>
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
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Dark overlay to enhance text visibility
    borderRadius: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "yellow",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  timer: {
    fontSize: 22,
    fontWeight: "bold",
    color: "yellow",
    paddingVertical: 10,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  attempts: {
    fontSize: 18,
    marginVertical: 10,
    fontWeight: "bold",
    color: "yellow",
  },
  score: {
    fontSize: 24,
    fontWeight: "bold",
    color: "yellow",
    marginBottom: 10,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  gameOver: {
    fontSize: 28,
    fontWeight: "bold",
    color: "red",
    marginVertical: 20,
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  note: {
    fontSize: 16,
    marginVertical: 20,
    fontWeight: "bold",
    color: "white",
  },
  inputLabel: {
    fontSize: 18,
    color: "yellow",
    fontWeight: "bold",
    marginTop: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginVertical: 20,
  },
  numberButton: {
    backgroundColor: "#f39c12",
    borderRadius: 25,
    width: 50,
    height: 50,
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  actionButton: {
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 30,
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
    elevation: 10,
  },
  startButton: {
    backgroundColor: "#27ae60",
  },
  leaderboardButton: {
    backgroundColor: "#2980b9",
  },
  deleteButton: {
    backgroundColor: "#c0392b",
  },
  image: {
    width: 400,
    height: 200,
    marginVertical: 20,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "yellow",
    marginVertical: 10,
  },
});

export default BananaGameScreen;
