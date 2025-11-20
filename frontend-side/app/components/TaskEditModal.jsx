"use client";

import { useState, useEffect } from "react";
import { updateTask } from "@/utils/api";

const TaskEditModal = ({ task, onClose, onTaskUpdated }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [tags, setTags] = useState("");
  const [column, setColumn] = useState("Todo");

  useEffect(() => {
    if (!task) return;

    setTitle(task.title || "");
    setDescription(task.description || "");
    setPriority(task.priority || "Medium");
    setDueDate(task.dueDate ? task.dueDate.split("T")[0] : "");
    setTags(task.tags ? task.tags.join(",") : "");
    setColumn(task.column || "Todo");
  }, [task]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedData = {
      title,
      description,
      priority,
      dueDate: dueDate || null,
      tags: tags.split(",").map((t) => t.trim()),
      column,
    };

    const updatedTask = await updateTask(task._id, updatedData);
    if (updatedTask) {
      onTaskUpdated(updatedTask);
      onClose();
    } else {
      alert("Error updating task");
    }
  };

  if (!task) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-2">Edit Task</h2>
        <form onSubmit={handleUpdate} className="space-y-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-1 w-full rounded"
            placeholder="Title"
            required
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-1 w-full rounded"
            placeholder="Description"
          />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="border p-1 w-full rounded"
          />
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="border p-1 w-full rounded"
            placeholder="Tags (comma separated)"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="border p-1 w-full rounded"
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <select
            value={column}
            onChange={(e) => setColumn(e.target.value)}
            className="border p-1 w-full rounded"
          >
            <option value="Todo">Todo</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full"
          >
            Update Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskEditModal;
