"use client";
import Column from "./Column";
import { useState } from "react";
import { updateTask } from "../utils/api";

const Tasks = ({ initialTasks, onTaskDeleted }) => {
  const [tasks, setTasks] = useState(initialTasks || []);
  const [selectedTask, setSelectedTask] = useState(null);
  const columns = ["Todo", "In Progress", "Done"];

  // Handle drag-drop column change
  const handleDragEnd = async (taskId, newColumn) => {
    const task = tasks.find((t) => t._id === taskId);
    if (!task || task.column === newColumn) return;
    // Update task
    const updatedTask = { ...task, column: newColumn };
    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? updatedTask : t))
    );

    await updateTask(taskId, { column: newColumn });

  };

  return (
    <div className="flex gap-4 mt-4">
      {columns.map((col) => (
        <Column
          key={col}
          title={col}
          tasks={tasks.filter((t) => t.column === col)}
          setTasks={setTasks}
          onDragEnd={handleDragEnd}
          setSelectedTask={setSelectedTask}
        />
      ))}
    </div>
  );
};

export default Tasks;
