import express from "express";
import Board from "../../models/board.js";
import protect from "../../middleware/auth.js";

const router = express.Router();

// Protect all routes
router.use(protect);

/**
 * @route   GET /api/boards
 * @desc    Get all boards of the logged-in user
 */
router.get("/", async (req, res) => {
  try {
    const boards = await Board.find({ user: req.user._id });
    res.status(200).json(boards);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch boards" });
  }
});

/**
 * @route   GET /api/boards/:boardId
 * @desc    Get a single board (only if belongs to logged-in user)
 */
router.get("/:boardId", async (req, res) => {
  try {
    const board = await Board.findOne({ _id: req.params.boardId, user: req.user._id });
    if (!board) return res.status(404).json({ error: "Board not found" });
    res.status(200).json(board);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch board" });
  }
});

/**
 * @route   POST /api/boards
 * @desc    Create a new board for the logged-in user
 */
router.post("/", async (req, res) => {
  try {
    const board = await Board.create({ ...req.body, user: req.user._id });
    res.status(201).json(board);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @route   PUT /api/boards/:boardId
 * @desc    Update a board (only if belongs to logged-in user)
 */
router.put("/:boardId", async (req, res) => {
  try {
    const updatedBoard = await Board.findOneAndUpdate(
      { _id: req.params.boardId, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!updatedBoard) return res.status(404).json({ error: "Board not found" });
    res.status(200).json(updatedBoard);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @route   DELETE /api/boards/:boardId
 * @desc    Delete a board (only if belongs to logged-in user)
 */
router.delete("/:boardId", async (req, res) => {
  try {
    const deleted = await Board.findOneAndDelete({ _id: req.params.boardId, user: req.user._id });
    if (!deleted) return res.status(404).json({ error: "Board not found" });
    res.status(200).json({ message: "Board deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete board" });
  }
});

export default router;
