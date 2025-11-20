import express from "express";
import Task from "../../models/Task.js";

const router = express.Router();

// GET tasks (optionally by boardId)
router.get("/", async (req, res) => {
  try {
    const { boardId } = req.query;
    const tasks = boardId ? await Task.find({ boardId }) : await Task.find({});
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// POST a new task
router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    return res.status(201).json(task);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// GET single task by ID
router.get("/:taskId", async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ error: "Task not found" });
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch task" });
  }
});

// PUT update a task
router.put("/:taskId", async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, {
      new: true,
    });
    if (!task) return res.status(404).json({ error: "Task not found" });
    return res.status(200).json(task);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// DELETE a task
router.delete("/:taskId", async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.taskId);
    if (!task) return res.status(404).json({ error: "Task not found" });
    return res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
