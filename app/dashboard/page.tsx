"use client";

import { useState } from "react";

import Mainbar from "./components/mainbar";
import Sidebar from "./components/sidebar";
import DashboardContent from "./content/dashboardcontent";
import HabitContent from "./content/habitcontent";
import ProgressContent from "./content/progresscontent";

export default function Dashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-white text-black flex items-stretch gap-0 lg:gap-5 lg:py-5 lg:px-5 overflow-x-hidden">
      <Sidebar
        setActivePage={setActivePage}
        activePage={activePage}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col w-full gap-3 lg:gap-5 p-3 lg:p-0 min-w-0">
        <Mainbar onMenuOpen={() => setSidebarOpen(true)} />
        <div className="flex-1 min-h-0">
          {activePage === "dashboard" && <DashboardContent />}
          {activePage === "habits" && <HabitContent />}
          {activePage === "progress" && <ProgressContent />}
        </div>
      </div>
    </div>
  );
}
