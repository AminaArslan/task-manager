import express from "express";
import Board from "../../models/board.js";
const router = express.Router();

// GET all boards
router.get("/", async (req, res) => {
  try {
    const boards = await Board.find({});
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch boards" });
  }
});

// GET single board
router.get("/:boardId", async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) return res.status(404).json({ error: "Board not found" });
    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch board" });
  }
});

// POST a new board
router.post("/", async (req, res) => {
  try {
    const board = await Board.create(req.body);
    res.status(201).json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT update a board
router.put("/:boardId", async (req, res) => {
  try {
    const updatedBoard = await Board.findByIdAndUpdate(req.params.boardId, req.body, { new: true });
    if (!updatedBoard) return res.status(404).json({ error: "Board not found" });
    res.status(200).json(updatedBoard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE a board
router.delete("/:boardId", async (req, res) => {
  try {
    const deleted = await Board.findByIdAndDelete(req.params.boardId);
    if (!deleted) return res.status(404).json({ error: "Board not found" });
    res.status(200).json({ message: "Board deleted" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete board" });
  }
});

export default router;
