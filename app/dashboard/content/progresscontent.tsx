"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  calculateStreak,
  calculateWeeklyData,
  calculateConsistency,
  calculateOverallScore,
  calculateCategoryProgress,
} from "@/lib/utils";
import OverallScore from "./progresscards/overallscore";
import BestStreak from "./progresscards/beststreak";
import CompletedThisWeek from "./progresscards/completedthisweek";
import Consistency from "./progresscards/consistency";
import ProgressChart from "./progresscards/progresschart";
import CategoryProgress from "./progresscards/categoryprogress";

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

export default function ProgressContent() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [logs, setLogs] = useState<Record<string, string[]>>({});

  const overallScore = calculateOverallScore(habits, logs);
  const consistency = calculateConsistency(habits, logs, 30);
  const weeklyData = calculateWeeklyData(habits, logs);
  const categoryData = calculateCategoryProgress(habits, logs, 30);

  const bestStreak =
    habits.length === 0
      ? 0
      : Math.max(...habits.map((h) => calculateStreak(logs[h.id] || [])));

  const now = new Date();
  const currentDay = now.getDay();
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay;
  let completedThisWeek = 0;
  let totalThisWeek = 0;
  for (let i = 0; i < 7; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() + mondayOffset + i);
    if (date > now) break;
    const dateStr = date.toISOString().split("T")[0];
    totalThisWeek += habits.length;
    habits.forEach((h) => {
      if ((logs[h.id] || []).some((d) => d.split("T")[0] === dateStr)) {
        completedThisWeek++;
      }
    });
  }

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

  useEffect(() => {
    fetchHabits();
    fetchLogs();
    const handleHabitAdded = () => { fetchHabits(); fetchLogs(); };
    window.addEventListener("habitAdded", handleHabitAdded);
    return () => window.removeEventListener("habitAdded", handleHabitAdded);
  }, []);

  return (
    <div className="rounded-xl bg-neutral-500/5 shadow-sm shadow-black/10 border border-black/10 flex flex-col items-center px-4 md:px-5 py-5 gap-5">
      {/* Header */}
      <div className="w-full flex justify-between items-start">
        <div className="flex flex-col">
          <p className="text-2xl md:text-3xl font-bold">Progress</p>
          <p className="text-sm text-black/50">Track your growth over time</p>
        </div>
      </div>

      {/* Stats */}
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        <OverallScore score={overallScore} />
        <BestStreak days={bestStreak} />
        <CompletedThisWeek completed={completedThisWeek} total={totalThisWeek} />
        <Consistency score={consistency} />
      </div>

      {/* Charts */}
      <div className="w-full flex flex-col md:flex-row gap-5">
        <ProgressChart weeklyData={weeklyData} />
        <CategoryProgress categories={categoryData} />
      </div>
    </div>
  );
}
