"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/app/lib/services/authService";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/app/lib/firebase"; // adjust if your firebase setup path different

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        router.push("/login"); // redirect if no user
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <div className="flex flex-col bg-gray-100">
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded"
        >
          Logout
        </button>
      </header>

      <main className="flex-grow p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Welcome {userEmail || "Loading..."}
        </h2>
        <p className="text-gray-600">This is your dashboard page 🚀</p>
      </main>
    </div>
  );
}
