// craetaed board
"use client";
import { createBoard } from "@/utils/api";
import { useState } from "react";


const NewBoardForm = ({ onBoardCreated }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name) return;

    const newBoard = await createBoard({ name, description });
    if (newBoard) {
      onBoardCreated(newBoard); // callback to update board list
      setName("");
      setDescription("");
    } else {
      alert("Error creating board");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mb-4">
      <input
        type="text"
        placeholder="Board Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded"
        required
      />
      <button
        type="submit"
        className="bg-purple-500 w-40 text-white px-4 py-2 rounded cursor-pointer"
      >
        Create Board +
      </button>
    </form>
  );
};

export default NewBoardForm;
