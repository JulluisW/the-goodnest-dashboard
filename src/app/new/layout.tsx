import { ReactNode } from "react";
import SidebarNew from "../components/dashboard/SidebarNew";
import TopbarNew from "../components/dashboard/TopbarNew";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <SidebarNew />
      <main className="flex-grow bg-gray-100 p-6 max-h-screen flex flex-col text-[#484f50]">
        <TopbarNew />
        <section className="grow overflow-y-scroll">{children}</section>
      </main>
    </div>
  );
}
