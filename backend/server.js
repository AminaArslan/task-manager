import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

// Import  routers from api folder
import boardsRouter from "./api/boards/index.js";
import tasksRouter from "./api/tasks/index.js";

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const express = require('express');
const app = express();


// NEXT
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://task-manager-umber-mu.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  // res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});



// CORS setup
// app.use(
//   cors({
//     origin: [
//       // "http://localhost:3000", // local frontend
//       "https://task-manager-umber-mu.vercel.app", // production frontend
//     ],
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

app.use(express.json());
// app.options("*", cors()); // allow preflight for all routes
app.get("/", (req, res) => res.send("API is running"));

// Routes
app.use("/api/boards", boardsRouter);
app.use("/api/tasks", tasksRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
