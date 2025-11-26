import express from "express";
import Task from "../../models/Task.js";
import protect from "../../middleware/auth.js";

const router = express.Router();

// Protect all routes - user must be authenticated
router.use(protect);

/**
 * @route   GET /api/tasks
 * @desc    Get all tasks for logged-in user (optional filter by boardId)
 */
router.get("/", async (req, res) => {
  try {
    const { boardId } = req.query;
    const filter = { user: req.user._id };
    if (boardId) filter.boardId = boardId;

    const tasks = await Task.find(filter);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

/**
 * @route   GET /api/tasks/:taskId
 * @desc    Get a single task by ID (only if belongs to logged-in user)
 */
router.get("/:taskId", async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.taskId, user: req.user._id });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch task" });
  }
});

/**
 * @route   POST /api/tasks
 * @desc    Create a new task for the logged-in user
 */
router.post("/", async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, user: req.user._id });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @route   PUT /api/tasks/:taskId
 * @desc    Update a task by ID (only if belongs to logged-in user)
 */
router.put("/:taskId", async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.taskId, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!updatedTask) return res.status(404).json({ error: "Task not found" });
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

/**
 * @route   DELETE /api/tasks/:taskId
 * @desc    Delete a task by ID (only if belongs to logged-in user)
 */
router.delete("/:taskId", async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({ _id: req.params.taskId, user: req.user._id });
    if (!deletedTask) return res.status(404).json({ error: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
