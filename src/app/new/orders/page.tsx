"use client";

import { useRouter } from "next/navigation";
import { logout } from "@/app/lib/services/authService";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/app/lib/firebase"; // adjust if your firebase setup path different
import BasicTable from "@/app/components/new/global/BasicTable";

export default function OrdersPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(true);

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

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="flex flex-col bg-gray-100">
      {/* <header className="bg-white shadow p-4 flex justify-between items-center"></header> */}

      <main className="flex-grow p-6 flex flex-col gap-4">
        <BasicTable
          loading={loading}
          columns={[
            { title: "ID", dataIndex: "id", key: "id", align: "right" },
            { title: "Name", dataIndex: "name", key: "name", align: "left" },
            { title: "Email", dataIndex: "email", key: "email", align: "left" },
            { title: "Role", dataIndex: "role", key: "role", align: "center" },
            {
              title: "Action",
              dataIndex: "action",
              key: "action",
              align: "center",
              render: (_, row) => (
                <button className="text-blue-500 hover:underline">
                  Edit {row.name}
                </button>
              ),
            },
          ]}
          data={[
            { id: 1, name: "Alice", role: "Admin", email: "alice@example.com" },
            { id: 2, name: "Bob", role: "User", email: "bob@example.com" },
            { id: 3, name: "Alice", role: "Admin", email: "alice@example.com" },
            { id: 4, name: "Bob", role: "User", email: "bob@example.com" },
            { id: 5, name: "Alice", role: "Admin", email: "alice@example.com" },
            { id: 6, name: "Bob", role: "User", email: "bob@example.com" },
            { id: 7, name: "Alice", role: "Admin", email: "alice@example.com" },
            { id: 8, name: "Bob", role: "User", email: "bob@example.com" },
            { id: 9, name: "Alice", role: "Admin", email: "alice@example.com" },
            { id: 10, name: "Bob", role: "User", email: "bob@example.com" },
            {
              id: 11,
              name: "Alice",
              role: "Admin",
              email: "alice@example.com",
            },
            { id: 12, name: "Bob", role: "User", email: "bob@example.com" },
          ]}
        />
      </main>
    </div>
  );
}
