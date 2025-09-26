"use client";

import Link from "next/link";
import { logout } from "@/app/lib/services/authService";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col p-4 z-10">
      <h2 className="text-2xl font-bold mb-8">UMKM Dashboard</h2>
      <nav className="flex flex-col gap-2">
        <Link
          href="/dashboard/products"
          className="hover:bg-gray-700 p-2 rounded"
        >
          Products
        </Link>
        <Link
          href="/dashboard/orders"
          className="hover:bg-gray-700 p-2 rounded"
        >
          Orders
        </Link>
        <Link
          href="/dashboard/finances"
          className="hover:bg-gray-700 p-2 rounded"
        >
          Finances
        </Link>
      </nav>
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 w-full text-white p-2 mt-4 rounded"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
