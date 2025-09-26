import { ReactNode } from "react";
import Sidebar from "@/app/components/dashboard/Sidebar";
import Topbar from "@/app/components/dashboard/Topbar";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-grow bg-gray-100 p-6 max-h-screen flex flex-col">
        <Topbar />
        <section className="grow overflow-y-scroll">{children}</section>
      </main>
    </div>
  );
}
