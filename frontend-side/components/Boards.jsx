"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ For redirect
import NewBoardForm from "./NewBoardForm";

const Boards = () => {
  const [boards, setBoards] = useState([]);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();

  // ✅ helper function for proper word capitalization
  const capitalizeWords = (str = "") =>
    str
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  // ✅ Redirect unauthenticated users
  useEffect(() => {
  const token = localStorage.getItem("token");
  if (!token) {
    router.push("/login");
    return;
  }
  fetchBoards();
}, [router]);

  // ✅ Fetch boards with JWT token
  const fetchBoards = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${API_URL}/api/boards`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });

      const sortedBoards = res.data
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map(board => ({
          ...board,
          name: capitalizeWords(board.name),
        }));

      setBoards(sortedBoards);
    } catch (err) {
      console.error(err);
      alert("Error fetching boards");
    }
  };

  // useEffect(() => {
  //   fetchBoards();
  // }, []);

  // ✅ Add new board to state
  const addBoard = (newBoard) => {
    const formattedBoard = {
      ...newBoard,
      name: capitalizeWords(newBoard.name),
    };

    setBoards((prevBoards) => {
      const allBoards = [formattedBoard, ...prevBoards];
      const uniqueBoards = Array.from(
        new Map(allBoards.map((b) => [b._id, b])).values()
      );
      return uniqueBoards;
    });
  };

  // ✅ Delete board with JWT token
  const deleteBoard = async (id) => {
    if (!confirm("Are you sure you want to delete this board?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/api/boards/${id}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setBoards(boards.filter((b) => b._id !== id));
    } catch (err) {
      console.error(err);
      alert("Error deleting board");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="inline-block text-3xl font-bold p-3 rounded-xl text-center mb-6 text-white bg-purple-400">
        Dashboard
      </h1>

      {/* Form to create new board */}
      <div className="mb-6">
        <NewBoardForm onBoardCreated={addBoard} />
      </div>

      {/* Boards grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {boards.map((board) => (
          <div
            key={board._id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition relative"
          >
            {/* Board name */}
            <Link href={`/boards/${board._id}`}>
              <div className="p-6 cursor-pointer hover:bg-gray-50 rounded-t-xl">
                <h2 className="text-xl font-semibold text-purple-400">{board.name}</h2>
              </div>
            </Link>

            {/* Footer for actions */}
            <div className="flex justify-end p-3 border-t border-gray-200">
              <button
                onClick={() => deleteBoard(board._id)}
                className="bg-purple-400 text-white px-2 rounded-sm font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Boards;
