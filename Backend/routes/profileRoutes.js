import express from "express";
import {
  getProfile,
  deleteUserProfile,
} from "../controllers/profileController.js";
import authMiddleware from "../middleware/protect.js";

const router = express.Router();

router.get("/profiles", authMiddleware, getProfile);
router.delete("/deletepro", authMiddleware, deleteUserProfile);

export default router;
