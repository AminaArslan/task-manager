import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Import your routers from api folder
import boardsRouter from "./api/boards/index.js";
import tasksRouter from "./api/tasks/index.js";

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();

app.use(cors());
app.use(express.json());
app.get("/" ,(req ,res) => res.send("API is running"))
// Routes
app.use("/api/boards", boardsRouter);
app.use("/api/tasks", tasksRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
