"use client";

import { createTask } from "@/utils/api";
import { useState } from "react";


const NewTaskForm = ({ boardId, column = "Todo", onTaskCreated, onClose }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const taskData = {
      boardId,
      title,
      description: "",
      priority: "Medium",
      dueDate: new Date().toISOString(),
      tags: [],
      column,
    };

    const newTask = await createTask(taskData);
    if (newTask) {
      onTaskCreated(newTask);
      setTitle("");
      onClose();
    } else {
      alert("Error creating task");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-4 p-2 border rounded shadow bg-white w-full"
    >
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
          className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add
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
