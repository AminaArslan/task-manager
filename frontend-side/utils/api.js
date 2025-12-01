const API_URL = process.env.NEXT_PUBLIC_API_URL;

//  Automatically attach token from localStorage
const getAuthHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ---- Single Board ----
export const fetchSingleBoard = async (boardId) => {
  try {
    const res = await fetch(`${API_URL}/api/boards/${boardId}`, {
      headers: getAuthHeaders(),
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to fetch board");
    }

    return res.json();
  } catch (err) {
    console.error("fetchSingleBoard error:", err.message);
    return null;
  }
};


// ---- Boards ----
export const fetchBoards = async () => {
  try {
    const res = await fetch(`${API_URL}/api/boards`, { headers: getAuthHeaders() });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to fetch boards");
    }
    return res.json();
  } catch (err) {
    console.error("fetchBoards error:", err.message);
    return [];
  }
};

export const createBoard = async (boardData) => {
  try {
    const res = await fetch(`${API_URL}/api/boards`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(boardData),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create board");
    }
    return res.json();
  } catch (err) {
    console.error("createBoard error:", err.message);
    return null;
  }
};

export const deleteBoard = async (id) => {
  try {
    const res = await fetch(`${API_URL}/api/boards/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete board");
    }
  } catch (err) {
    console.error("deleteBoard error:", err.message);
  }
};

// ---- Tasks ----
export const fetchTasks = async (boardId) => {
  try {
    const res = await fetch(`${API_URL}/api/tasks?boardId=${boardId}`, { headers: getAuthHeaders() });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to fetch tasks");
    }
    return res.json();
  } catch (err) {
    console.error("fetchTasks error:", err.message);
    return [];
  }
};

export const createTask = async (task) => {
  try {
    const res = await fetch(`${API_URL}/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(task),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create task");
    }
    return res.json();
  } catch (err) {
    console.error("createTask error:", err.message);
    return null;
  }
};

export const updateTask = async (id, data) => {
  try {
    const res = await fetch(`${API_URL}/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update task");
    }
    return res.json();
  } catch (err) {
    console.error("updateTask error:", err.message);
    return null;
  }
};

export const deleteTask = async (id, ) => {
  try {
    const res = await fetch(`${API_URL}/api/tasks/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete task");
    }
  } catch (err) {
    console.error("deleteTask error:", err.message);
  }
};
