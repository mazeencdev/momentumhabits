"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { calculateStreak } from "@/lib/utils";

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

export function StreakChart() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [logs, setLogs] = useState<Record<string, string[]>>({});
  const now = new Date();
  const daysElapsed = now.getDate(); // day of month so far
  const totalPossible = habits.length * daysElapsed;
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString()
    .split("T")[0];
  const monthLogs = Object.values(logs)
    .flat()
    .filter((d) => d >= monthStart);
  const monthlyScore =
    totalPossible === 0
      ? 0
      : Math.round((monthLogs.length / totalPossible) * 100);
  const bestStreak =
    habits.length === 0
      ? 0
      : Math.max(...habits.map((h) => calculateStreak(logs[h.id] || [])));

  const weeklyData = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
    (day, i) => {
      const date = new Date();
      const dayOfWeek = date.getDay(); // 0 = Sun
      const diff = i - (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
      const target = new Date();
      target.setDate(date.getDate() + diff);
      const dateStr = target.toISOString().split("T")[0];

      const completions = Object.values(logs)
        .flat()
        .filter((d) => d === dateStr).length;
      const score =
        habits.length === 0
          ? 0
          : Math.round((completions / habits.length) * 100);
      return { day, score };
    },
  );

  const fetchLogs = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
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
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { data } = await supabase
      .from("Habit")
      .select("*")
      .eq("userId", user.id);

    setHabits(data || []);
  };

  useEffect(() => {
    fetchHabits();
    fetchLogs();

    const handleHabitAdded = () => {
      fetchHabits();
      fetchLogs();
    };
    window.addEventListener("habitAdded", handleHabitAdded);
    return () => window.removeEventListener("habitAdded", handleHabitAdded);
  }, []);

  const dailyHabits = habits.filter((h) => h.frequency === "Daily");

  return (
    <div className="flex items-end gap-2 h-24">
      {weeklyData.map((d) => (
        <div key={d.day} className="flex flex-col items-center gap-1 flex-1">
          <div
            className={`w-full rounded-md ${d.score ? "bg-[#2D6A4F]" : "bg-[#D8F3DC]"}`}
            style={{ height: `72px` }} // px instead of %
          />
          <span className="text-[10px] text-[#6B7280] font-medium">
            {d.day}
          </span>
        </div>
      ))}
    </div>
  );
}
