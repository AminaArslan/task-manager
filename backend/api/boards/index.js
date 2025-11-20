import express from "express";
import Board from "../../models/board.js";

const router = express.Router();

// GET all boards
router.get("/", async (req, res) => {
  try {
    const boards = await Board.find({});
    return res.status(200).json(boards);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch boards" });
  }
});

// POST a new board
router.post("/", async (req, res) => {
  try {
    const board = await Board.create(req.body);
    return res.status(201).json(board);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

export default router;
