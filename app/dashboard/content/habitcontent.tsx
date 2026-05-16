"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { calculateStreak } from "@/lib/utils";
import AddHabitBtn from "../components/addhabitbtn";
import TotalHabits from "./habitcards/totalhabits";
import ActiveStreaks from "./habitcards/activestreaks";
import LongestStreak from "./habitcards/longeststreak";
import HabitCategories from "./habitcards/habitcategories";
import HabitsList from "./habitcards/habitslist";

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

export default function HabitContent() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [logs, setLogs] = useState<Record<string, string[]>>({});

  const activeStreaks = habits.filter(
    (h) => calculateStreak(logs[h.id] || []) > 0
  ).length;

  const longestStreak =
    habits.length === 0
      ? 0
      : Math.max(...habits.map((h) => calculateStreak(logs[h.id] || [])));

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

  const handleDelete = async (habitId: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("HabitLog").delete().eq("habitId", habitId).eq("userId", user.id);
    await supabase.from("Habit").delete().eq("id", habitId).eq("userId", user.id);
    await fetchHabits();
    await fetchLogs();
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
      <div className="w-full flex justify-between items-start gap-3">
        <div className="flex flex-col">
          <p className="text-2xl md:text-3xl font-bold">Habits</p>
          <p className="text-sm text-black/50">Manage and track your habits</p>
        </div>
        <AddHabitBtn />
      </div>

      {/* Stats */}
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
        <TotalHabits count={habits.length} />
        <ActiveStreaks count={activeStreaks} />
        <LongestStreak days={longestStreak} />
        <HabitCategories count={categoryCount} />
      </div>

      <HabitsList habits={habits} logs={logs} onDelete={handleDelete} />
    </div>
  );
}
