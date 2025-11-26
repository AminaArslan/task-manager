// for drag and
"use client";
import TaskCard from "./TaskCard";

export default function Column({ title, tasks, onDragEnd, setSelectedTask }) {
  const allowDrop = (e) => e.preventDefault();

  const drop = (e) => {
    const taskId = e.dataTransfer.getData("taskId");
    onDragEnd(taskId, title);
  };

  return (
    <div
      className="p-4 bg-gray-100 rounded min-h-[400px]"
      onDragOver={allowDrop}
      onDrop={drop}
    >
      <h2 className="text-xl font-semibold mb-2">{title}</h2>

      {tasks.map((t) => (
        <TaskCard
          key={t._id}
          task={t}
          onClick={() => setSelectedTask(t)}
        />
      ))}
    </div>
  );
}
