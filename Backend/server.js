import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoute.js";
import scoreRoutes from "./routes/scoreRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import connectDb from "./config/db.js";

dotenv.config();
const PORT = process.env.PORT;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/score", scoreRoutes);
app.use("/api/profile", profileRoutes);

app.listen(PORT, () => {
  console.log(`program listening ${PORT}`);
});
