import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const InstructionScreen = ({ navigation }) => {
  const handleStart = () => {
    navigation.navigate("GameScreen");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to Banana Blitz 🍌</Text>

      <Text style={styles.heading}>How to Play:</Text>

      <View style={styles.instructions}>
        <Text style={styles.instructionItem}>
          🍌 You will be given a mathematical equation with bananas as blanks.
        </Text>
        <Text style={styles.instructionItem}>
          🍌 Find the suitable numbers that fit the banana blank.
        </Text>
        <Text style={styles.instructionItem}>
          🍌 At start, you have 60 seconds to find the answer.
        </Text>
        <Text style={styles.instructionItem}>
          🍌 If the chosen answer is wrong, you will lose a attempt.
        </Text>
        <Text style={styles.instructionItem}>
          🍌 When your score increases, the time left decreases.
        </Text>
        <Text style={styles.instructionItem}>
          🍌 After losing all three attempts, the game is over.
        </Text>
        <Text style={styles.instructionItem}>
          🍌 You can view your highest score in the profile.
        </Text>

        <Text style={styles.instructionItem}>
          🍌 You can check whether you are on the leaderboard.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>Let's Start</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "600",
    color: "white",
    marginBottom: 10,
  },
  instructions: {
    marginBottom: 20,
  },
  instructionItem: {
    fontSize: 18,
    color: "#FFA500",
    marginVertical: 5,
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    borderColor: "grey",
    borderWidth: 6,
  },
  buttonText: {
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
});

export default InstructionScreen;
