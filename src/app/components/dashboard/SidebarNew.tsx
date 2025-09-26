"use client";

import Link from "next/link";
import { logout } from "@/app/lib/services/authService";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/app/lib/utils";

export default function SidebarNew() {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const navItems = [
    {
      title: "Dashboard",
      href: "/new",
      key: "new",
      icon: <></>,
    },
    {
      title: "Order",
      href: "/new/orders",
      key: "orders",
      icon: <></>,
    },
    {
      title: "Products",
      href: "/new/products",
      key: "products",
      icon: <></>,
    },
    {
      title: "Finances",
      href: "/new/finances",
      key: "finance",
      icon: <></>,
    },
    {
      title: "Storage",
      href: "#",
      key: "storage",
      icon: <></>,
    },
  ];

  return (
    <aside className="w-64 flex flex-col p-4 z-10 shadow-xl">
      <img className=" mb-8" src="/the-goodnest-icon.png" />
      <nav className="flex flex-col gap-2">
        {navItems.map((item: any) => (
          <Link
            key={item.key}
            href={item.href}
            className={cn("hover:bg-gray-100 rounded flex", {
              "bg-gray-100": pathname.split("/").pop()?.includes(item.key),
            })}
          >
            <p className="p-2">{item.title}</p>
            {pathname.split("/").pop()?.includes(item.key) && (
              <div className="w-2 h-full bg-[#484f50] rounded-xl ml-auto" />
            )}
          </Link>
        ))}
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
