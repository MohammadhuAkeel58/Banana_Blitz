import express from "express";
import {
  getTopScores,
  saveOrUpdateScore,
} from "../controllers/scoreControllers.js";
import authMiddleware from "../middleware/protect.js";

const router = express.Router();
router.post("/scores", authMiddleware, saveOrUpdateScore);
router.get("/leaderboard", getTopScores);

export default router;
