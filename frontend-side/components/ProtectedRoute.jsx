"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/authentication/login");
    }
  }, [user, loading, router]);

  // Jab tak auth check ho raha ho blank ya loader show kare
  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading...</p>;
  }

  // User nahi hai to kuch render na kare
  if (!user) {
    return null;
  }

  return children;
}
