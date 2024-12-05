import mongoose from "mongoose";

const connectDb = mongoose
  .connect("mongodb://127.0.0.1:27017/BananaGame")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB error", err));

export default connectDb;
