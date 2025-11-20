"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import NewBoardForm from "./NewBoardForm";

const Boards = () => {
  const [boards, setBoards] = useState([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const fetchBoards = async () => {
    try {
      const res = await axios.get(`${API_URL}/boards`);
      setBoards(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching boards");
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  const addBoard = (newBoard) => {
    setBoards((prevBoards) => {
      const allBoards = [...prevBoards, newBoard];
      const uniqueBoards = Array.from(
        new Map(allBoards.map((b) => [b._id, b])).values()
      );
      return uniqueBoards;
    });
  };

  const deleteBoard = async (id) => {
    if (!confirm("Are you sure you want to delete this board?")) return;

    try {
      await axios.delete(`${API_URL}/boards/${id}`);
      setBoards(boards.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting board");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Task Management</h1>

      {/* Form to create new board */}
      <NewBoardForm onBoardCreated={addBoard} />

      {/* Boards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {boards.map((board) => (
          <div key={board._id} className="relative">
            {/* Board name */}
            <Link href={`/boards/${board._id}`}>
              <div className="border p-4 rounded shadow hover:shadow-lg transition cursor-pointer">
                <h2 className="font-semibold text-lg">{board.name}</h2>
              </div>
            </Link>

            {/* Delete button */}
            <button
              onClick={() => deleteBoard(board._id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Boards;
