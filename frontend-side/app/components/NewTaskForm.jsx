"use client"; 

import { createTask } from "@/utils/api";
import { useState } from "react";

const NewTaskForm = ({ boardId, column = "Todo", onTaskCreated, onClose }) => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false); // prevent double submission

  // Function to get button color based on column
  const getButtonColor = () => {
    switch (column) {
      case "Todo": return "bg-cyan-500";
      case "In Progress": return "bg-lime-500";
      case "Done": return "bg-orange-500";
      default: return "bg-blue-500";
    }
  };

  // Capitalize each word
  const capitalizeWords = (str) => 
    str.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || loading) return;

    setLoading(true); // prevent multiple submits
    const capitalizedTitle = capitalizeWords(title);

    const taskData = {
      boardId,
      title: capitalizedTitle,
      description: "",
      priority: "Medium",
      dueDate: new Date().toISOString(),
      tags: [],
      column,
    };

    try {
      const newTask = await createTask(taskData);
      if (newTask) {
        onTaskCreated(newTask);
        setTitle("");
        onClose();
      } else {
        alert("Error creating task");
      }
    } catch (err) {
      console.error("Error creating task:", err);
      alert("Error creating task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-2 border rounded shadow bg-white w-full">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full rounded mb-2"
        required
      />

      <div className="flex gap-2">
        <button
          type="submit"
          className={`flex-1 text-white p-2 rounded ${getButtonColor()}`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="flex-1 bg-gray-400 text-white p-2 rounded hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default NewTaskForm;
