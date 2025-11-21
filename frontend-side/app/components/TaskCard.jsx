"use client";

import { deleteTask } from "../utils/api";

const TaskCard = ({ task, onTaskDeleted, onClick }) => {
    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this task?")) return;
        await deleteTask(task._id);
        if (onTaskDeleted) onTaskDeleted(task._id);
    };

    return (
        <div
            className="bg-white p-2 rounded shadow relative cursor-pointer"
            onClick={onClick}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("taskId", task._id)}
        >
            <h3 className="text-2xl text-blue-70 font-semibold">{task.title}</h3>
            <p className="text-gray-600">{task.description || "No description"}</p>
            <p className="text-sm text-gray-400">
                Priority: {task.priority || "Medium"}
            </p>
            <p className=" text-gray-400">
                Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "N/A"}
            </p>
            <div className="flex gap-1 mt-1">
                {(task.tags || []).map((tag) => (
                    <span key={tag} className="text-xs bg-blue-200 rounded px-1">
                        {tag}
                    </span>
                ))}
            </div>

            {/* Delete button */}
            {onTaskDeleted && (
                <button
                    onClick={(e) => {
                        e.stopPropagation(); // prevent triggering onClick
                        handleDelete();
                    }}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                    Delete
                </button>
            )}
        </div>
    );
};

export default TaskCard;
