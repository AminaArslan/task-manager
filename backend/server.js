import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRouter from "./api/auth/index.js";
import boardsRouter from "./api/boards/index.js";
import tasksRouter from "./api/tasks/index.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

// ✅ Proper CORS
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://task-manager-one-green.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// ✅ Handle preflight request
app.options("*", cors());


app.use(express.json());

app.get("/", (req, res) => res.send("API is running"));

// Routes
app.use("/api/auth", authRouter);
app.use("/api/boards", boardsRouter);
app.use("/api/tasks", tasksRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));






