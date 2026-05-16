"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { calculateWeeklyData, getToday } from "@/lib/utils";
import AddHabitBtn from "../components/addhabitbtn";
import Categories from "./cards/categories";
import DailyHabs from "./cards/dailyhabs";
import MonthlyProgress from "./cards/monthlyprogress";
import Quote from "./cards/quote";
import TodaysHabs from "./cards/todayshabs";
import TotalHabs from "./cards/totalhabs";
import WeeklyBarChart from "./cards/weeklybarchart";
import WeeklyScore from "./cards/weeklyscore";

type Habit = {
  id: string;
  name: string;
  icon: string;
  category: string;
  frequency: string;
  reminderTime: string | null;
  createdAt: string;
  userId: string;
};

export default function DashboardContent() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [logs, setLogs] = useState<Record<string, string[]>>({});
  const [userName, setUserName] = useState("");

  const now = new Date();
  const daysElapsed = now.getDate();
  const totalPossible = habits.length * daysElapsed;
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString()
    .split("T")[0];
  const monthLogs = Object.values(logs)
    .flat()
    .filter((d) => d.split("T")[0] >= monthStart);
  const monthlyScore =
    totalPossible === 0
      ? 0
      : Math.round((monthLogs.length / totalPossible) * 100);

  const weeklyData = calculateWeeklyData(habits, logs);
  const weeklyScore =
    weeklyData.length === 0
      ? 0
      : Math.round(
          weeklyData.reduce((sum, d) => sum + d.score, 0) / weeklyData.length
        );

  const dailyCount = habits.filter((h) => h.frequency === "Daily").length;
  const categoryCount = new Set(habits.map((h) => h.category)).size;

  const fetchLogs = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase
      .from("HabitLog")
      .select("habitId, completedAt")
      .eq("userId", user.id);
    if (!data) return;
    const grouped: Record<string, string[]> = {};
    for (const log of data) {
      if (!grouped[log.habitId]) grouped[log.habitId] = [];
      grouped[log.habitId].push(log.completedAt);
    }
    setLogs(grouped);
  };

  const fetchHabits = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data } = await supabase.from("Habit").select("*").eq("userId", user.id);
    setHabits(data || []);
  };

  const handleToggle = async (habitId: string, completed: boolean) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const today = getToday();
    if (completed) {
      await supabase.from("HabitLog").delete().eq("habitId", habitId).eq("userId", user.id).eq("completedAt", today);
    } else {
      await supabase.from("HabitLog").insert({ habitId, userId: user.id, completedAt: today });
    }
    await fetchLogs();
  };

  useEffect(() => {
    fetchHabits();
    fetchLogs();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUserName(user?.user_metadata?.full_name || user?.email || "");
    });
    const handleHabitAdded = () => { fetchHabits(); fetchLogs(); };
    window.addEventListener("habitAdded", handleHabitAdded);
    return () => window.removeEventListener("habitAdded", handleHabitAdded);
  }, []);

  return (
    <div className="rounded-xl bg-neutral-500/5 shadow-sm shadow-black/10 border border-black/10 flex flex-col items-center px-4 md:px-5 py-5 gap-5">
      {/* Header */}
      <div className="w-full flex justify-between items-start gap-3">
        <div className="flex flex-col">
          <p className="text-2xl md:text-3xl font-bold">Dashboard</p>
          <p className="text-sm text-black/50">
            Welcome back{userName ? `, ${userName}` : ""}
          </p>
        </div>
        <AddHabitBtn />
      </div>

      {/* Stats cards */}
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        <TotalHabs count={habits.length} />
        <DailyHabs count={dailyCount} />
        <WeeklyScore score={weeklyScore} />
        <Categories count={categoryCount} />
      </div>

      {/* Today's habits + bottom row */}
      <div className="w-full flex flex-col gap-5">
        <TodaysHabs habits={habits} logs={logs} onToggle={handleToggle} />
        <div className="flex flex-col md:flex-row gap-5">
          <WeeklyBarChart weeklyData={weeklyData} />
          <MonthlyProgress monthlyScore={monthlyScore} />
          <Quote />
        </div>
      </div>
    </div>
  );
}
