// app/boards/page.jsx
import Boards from "@/components/Boards";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function BoardsPage() {
  return (
    <ProtectedRoute>
      <Boards />
    </ProtectedRoute>
  );
}