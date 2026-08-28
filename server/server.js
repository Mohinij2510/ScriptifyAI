import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import scriptRoutes from "./routes/scriptRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/scripts", scriptRoutes);
app.use("/api/auth", authRoutes);

const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/scriptify";

mongoose.connect(mongoUri, {
  serverSelectionTimeoutMS: 2000,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Notice: Running in resilient fallback mode (" + err.message + ")"));

app.listen(5000, () => console.log("Server running on port 5000"));