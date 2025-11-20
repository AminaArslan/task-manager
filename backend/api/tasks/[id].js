import express from "express";
import Task from "../../models/Task.js";

const router = express.Router();

// GET a single task by ID
router.get("/:taskId", async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ error: "Task not found" });
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json({ error: "Failed to fetch task" });
  }
});

// PUT update a task by ID
router.put("/:taskId", async (req, res) => {
  try {
    const updated = await Task.findByIdAndUpdate(req.params.taskId, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Task not found" });
    return res.status(200).json(updated);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

// DELETE a task by ID
router.delete("/:taskId", async (req, res) => {
  try {
    const deleted = await Task.findByIdAndDelete(req.params.taskId);
    if (!deleted) return res.status(404).json({ error: "Task not found" });
    return res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
