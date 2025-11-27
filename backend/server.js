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
  .catch((err) => console.error("Mongo error:", err));

const app = express();

// ✅ HANDLE PREFLIGHT FIRST
app.options("*", cors());

// ✅ CORS CONFIG
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://task-manager-umber-mu.vercel.app"
  ],
  credentials: true,
  methods: "GET,POST,PUT,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization"
}));

app.use(express.json());

// ✅ FORCE HEADERS ON EVERY RESPONSE
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://task-manager-umber-mu.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.get("/", (req, res) => res.send("API is running"));

app.use("/api/auth", authRouter);
app.use("/api/boards", boardsRouter);
app.use("/api/tasks", tasksRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));
