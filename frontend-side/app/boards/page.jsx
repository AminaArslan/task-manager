"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchBoards } from "../../utils/api"; // use api.js

export default function BoardsPage() {
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    fetchBoards()
      .then(setBoards)
      .catch(() => alert("Error fetching boards"));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Boards</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {boards.map((board) => (
          <Link key={board._id} href={`/boards/${board._id}`}>
            <div className="p-4 border rounded shadow hover:bg-gray-100 cursor-pointer">
              <h2 className="text-xl font-semibold">{board.name}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
