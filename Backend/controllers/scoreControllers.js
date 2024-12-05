import UserModel from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const saveOrUpdateScore = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newScore = req.body.score;

    user.score = newScore;

    if (newScore > user.highScore) {
      user.highScore = newScore;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Score saved/updated successfully",
      score: user.score,
      highScore: user.highScore,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error });
  }
};

export const getTopScores = async (req, res) => {
  try {
    const topScores = await UserModel.find()
      .sort({ highScore: -1 })
      .limit(10)
      .select("userName highScore");
    res.status(200).json(topScores);
  } catch (error) {
    console.error("Error retrieving leaderboard:", error);
    res.status(500).json({ message: "Error retrieving leaderboard", error });
  }
};
