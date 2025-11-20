import express from "express";
import Board from "../../models/board.js";

const router = express.Router();

// GET a single board by ID
router.get("/:boardId", async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) return res.status(404).json({ error: "Board not found" });
    return res.status(200).json(board);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch board" });
  }
});

// PUT update a board by ID
router.put("/:boardId", async (req, res) => {
  try {
    const updatedBoard = await Board.findByIdAndUpdate(
      req.params.boardId,
      req.body,
      { new: true }
    );
    if (!updatedBoard) return res.status(404).json({ error: "Board not found" });
    return res.status(200).json(updatedBoard);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// DELETE a board by ID
router.delete("/:boardId", async (req, res) => {
  try {
    const deleted = await Board.findByIdAndDelete(req.params.boardId);
    if (!deleted) return res.status(404).json({ error: "Board not found" });
    return res.status(200).json({ message: "Board deleted" });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete board" });
  }
});

export default router;
