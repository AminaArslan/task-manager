"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // ✅ import context

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login } = useAuth(); // ✅ get login function from context
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Login failed");

      // ✅ Update AuthContext and localStorage
      login(
        { _id: data._id, name: data.name, email: data.email }, // user
        data.token // token
      );
     
    // ✅ Clear form inputs
    setEmail("");
    setPassword("");
    
    alert("Login successful!");
      router.push("/"); // ✅ redirect
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
     <input
  type="email"
  name="email"
  autoComplete="email"
  className="border p-2 mb-2 w-full rounded"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
      <input
  type="password"
  name="password"
  autoComplete="current-password"
  className="border p-2 mb-2 w-full rounded"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>
      <button type="submit" className="bg-purple-500 text-white p-2 w-full rounded hover:bg-purple-700">
        Login
      </button>
    </form>
  );
}
