"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchTasks, updateTask, deleteTask, fetchSingleBoard } from "@/utils/api";
import NewTaskForm from "@/components/NewTaskForm";
import TaskEditModal from "@/components/TaskEditModal";


export default function BoardDetails() {
  const { boardId } = useParams();
  const router = useRouter();
  const [boardName, setBoardName] = useState("");
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [addingTaskColumn, setAddingTaskColumn] = useState(null);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // 🔒 Redirect if not logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/login");
  }, [router]);

  // ✅ Helper functions for column colors
  const columns = ["Todo", "In Progress", "Done"];
  const getAddButtonColor = (col) => {
    switch (col) {
      case "Todo": return "bg-cyan-500";
      case "In Progress": return "bg-lime-500";
      case "Done": return "bg-orange-500";
      default: return "bg-blue-500";
    }
  };
  const getAddColor = (col) => {
    switch (col) {
      case "Todo": return "text-cyan-500";
      case "In Progress": return "text-lime-500";
      case "Done": return "text-orange-500";
      default: return "text-blue-500";
    }
  };

  // 🔹 Load board 
 const loadBoardName = async () => {
  try {
    const board = await fetchSingleBoard(boardId);
    if (board) {
      setBoardName(board.name);
    }
  } catch (err) {
    console.error("Error fetching board name:", err);
    alert("Failed to load board");
  }
};

  // 🔹 Load tasks with JWT
  const loadTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await fetchTasks(boardId, token); // pass token to fetchTasks
      setTasks(data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  useEffect(() => {
    if (boardId) {
      loadBoardName();
      loadTasks();
    }
  }, [boardId]);

  // 🔹 Delete task
  const handleDeleteTask = async (taskId) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      const token = localStorage.getItem("token");
      await deleteTask(taskId, token);
      setTasks((prev) => prev.filter((t) => t._id !== taskId));
    } catch (err) {
      console.error(err);
      alert("Error deleting task");
    }
  };

  // 🔹 Filter states
  const [searchText, setSearchText] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesPriority = priorityFilter === "" || task.priority === priorityFilter;
    const matchesTag = tagFilter === "" || task.tags?.some((t) => t.toLowerCase().includes(tagFilter.toLowerCase()));
    return matchesSearch && matchesPriority && matchesTag;
  });

  // 🔹 Drag-drop column change
  const handleDragEnd = async (taskId, newColumn) => {
    const task = tasks.find((t) => t._id === taskId);
    if (!task || task.column === newColumn) return;

    const updatedTask = { ...task, column: newColumn };
    setTasks((prev) => prev.map((t) => (t._id === taskId ? updatedTask : t)));

    try {
      await updateTask(taskId, { column: newColumn });
    } catch (err) {
      console.error("Error updating task column:", err);
      loadTasks();
    }
  };

  return (
    <div className="p-4">
      {/* Board Name */}
      <h1 className="capitalize text-xl sm:text-2xl font-semibold inline-block mb-6 text-white bg-purple-400 p-3 rounded-xl italic">
        <span className="sm:text-3xl text-2xl font-bold not-italic ">Board Name: </span> {boardName || "Board"}
      </h1>

      {/* Search & Filters */}
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
        {(searchText || priorityFilter || tagFilter) && (
          <button
            onClick={() => { setSearchText(""); setPriorityFilter(""); setTagFilter(""); }}
            className="bg-purple-400 text-white px-3 py-2 rounded hover:bg-purple-700"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Tasks Columns */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {columns.map((col) => (
          <div
            key={col}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDragEnd(e.dataTransfer.getData("taskId"), col)}
            className={`p-2 rounded ${getAddButtonColor(col)}`}
          >
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-white text-2xl font-bold mb-2">{col}</h2>
              <button
                className={`text-white text-base border-2 border-white px-3 py-1 rounded ${getAddButtonColor(col)}`}
                onClick={() => setAddingTaskColumn(addingTaskColumn === col ? null : col)}
              >
                + Add Task
              </button>
            </div>

            {addingTaskColumn === col && (
              <NewTaskForm
                boardId={boardId}
                column={col}
                onTaskCreated={(newTask) =>
                  setTasks((prev) => (prev.some(t => t._id === newTask._id) ? prev : [newTask, ...prev]))
                }
                onClose={() => setAddingTaskColumn(null)}
              />
            )}

            {filteredTasks.filter((t) => t.column === col).map((task) => (
              <div
                key={task._id}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("taskId", task._id)}
                onClick={() => setSelectedTask(task)}
                className="bg-white p-2 rounded shadow cursor-move mb-2 flex flex-col justify-between"
              >
                <div>
                  <h3 className={`font-semibold text-lg italic mb-1 wrap-break-words ${getAddColor(col)}`}>
                    {task.title}
                  </h3>
                  {task.description && (
                    <p className="text-gray-600 text-sm mb-1 wrap-break-words whitespace-pre-wrap">
                      {task.description}
                    </p>
                  )}
                  <p className="text-sm text-gray-500 mb-1">Priority: {task.priority || "Medium"}</p>
                  <p className="text-sm text-gray-500 mb-1">
                    Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
                  </p>
                  {task.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {task.tags.map((tag) => (
                        <span key={tag} className="text-xs bg-blue-200 rounded px-1 wrap-break-words">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="flex items-end justify-end mt-2">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDeleteTask(task._id); }}
                    className={`text-white cursor-pointer px-2 py-1 rounded border ${getAddButtonColor(col)}`}
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
            setTasks((prev) => prev.map((t) => (t._id === updatedTask._id ? updatedTask : t)))
          }
        />
      )}
    </div>
  );
}
