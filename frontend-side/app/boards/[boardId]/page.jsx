"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import NewTaskForm from "@/app/components/NewTaskForm";
import TaskEditModal from "@/app/components/TaskEditModal";
import {fetchTasks, updateTask, deleteTask  } from "@/utils/api";


export default function BoardDetails() {
  const { boardId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [addingTaskColumn, setAddingTaskColumn] = useState(null);

  // 🔍 SEARCH + FILTER STATES
  const [searchText, setSearchText] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  const columns = ["Todo", "In Progress", "Done"];

  // Fetch tasks
  const loadTasks = async () => {
    try {
      const data = await fetchTasks(boardId);
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
      alert("Error fetching tasks");
    }
  };

  useEffect(() => {
    loadTasks();
  }, [boardId]);

  // Delete task
  const handleDeleteTask = async (taskId) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (err) {
      console.error("Error deleting task:", err);
      alert("Error deleting task");
    }
  };

  // 🔍 FILTER LOGIC
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchText.toLowerCase());

    const matchesPriority =
      priorityFilter === "" || task.priority === priorityFilter;

    const matchesTag =
      tagFilter === "" ||
      task.tags?.some((t) =>
        t.toLowerCase().includes(tagFilter.toLowerCase())
      );

    return matchesSearch && matchesPriority && matchesTag;
  });

  // Handle drag-drop column change
  const handleDragEnd = async (taskId, newColumn) => {
    const task = tasks.find((t) => t._id === taskId);
    if (!task || task.column === newColumn) return;

    const updatedTask = { ...task, column: newColumn };
    setTasks((prev) =>
      prev.map((t) => (t._id === taskId ? updatedTask : t))
    );

    try {
      await updateTask(taskId, { column: newColumn });
    } catch (err) {
      console.error("Error updating task column:", err);
      loadTasks();
    }
  };

  return (
    <div className="p-4">
      {/* 🔍 SEARCH + FILTER BAR */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by title..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Priorities</option>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <input
          type="text"
          placeholder="Filter by tag..."
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {columns.map((col) => (
          <div
            key={col}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              const taskId = e.dataTransfer.getData("taskId");
              handleDragEnd(taskId, col);
            }}
            className="bg-gray-100 p-2 rounded min-h-[100px]"
          >
            <h2 className="text-lg font-bold mb-2">{col}</h2>

            {/* Add Task Button */}
            <div className="flex gap-2 mb-2">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded flex-1"
                onClick={() =>
                  setAddingTaskColumn(addingTaskColumn === col ? null : col)
                }
              >
                + Add Task
              </button>
            </div>

            {addingTaskColumn === col && (
              <NewTaskForm
                boardId={boardId}
                column={col}
                onTaskCreated={(newTask) =>
                  setTasks((prev) => [...prev, newTask])
                }
                onClose={() => setAddingTaskColumn(null)}
              />
            )}

            {/* Filtered Tasks */}
            {filteredTasks
              .filter((t) => t.column === col)
              .map((task) => (
                <div
                  key={task._id}
                  draggable
                  onDragStart={(e) =>
                    e.dataTransfer.setData("taskId", task._id)
                  }
                  onClick={() => setSelectedTask(task)}
                  className="bg-white p-2 rounded shadow cursor-move mb-2 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="font-semibold text-base mb-1 wrap-break-words">
                      {task.title}
                    </h3>

                    {task.description && (
                      <p className="text-gray-600 text-sm mb-1 wrap-break-words whitespace-pre-wrap">
                        {task.description}
                      </p>
                    )}

                    <p className="text-sm text-gray-500 mb-1">
                      Priority: {task.priority || "Medium"}
                    </p>

                    <p className="text-sm text-gray-500 mb-1">
                      Due:{" "}
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "N/A"}
                    </p>

                    {task.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {task.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-blue-200 rounded px-1 wrap-break-words"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-end justify-center mt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTask(task._id);
                      }}
                      className="text-red-500 hover:text-red-700 cursor-pointer px-2 py-1 rounded border border-red-300 hover:border-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
          </div>
        ))}
      </div>

      {selectedTask && (
        <TaskEditModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          onTaskUpdated={(updatedTask) =>
            setTasks((prev) =>
              prev.map((t) => (t._id === updatedTask._id ? updatedTask : t))
            )
          }
        />
      )}
    </div>
  );
}
