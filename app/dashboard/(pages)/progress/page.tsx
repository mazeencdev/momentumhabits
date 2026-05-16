"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
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

export default function Progress() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [logs, setLogs] = useState<Record<string, string[]>>({});

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

  const bestStreak =
    habits.length === 0
      ? 0
      : Math.max(...habits.map((h) => calculateStreak(logs[h.id] || [])));

  const bestHabit = habits.find(
    (h) => calculateStreak(logs[h.id] || []) === bestStreak,
  );

  const totalCompletions = Object.values(logs).flat().length;

  const now = new Date();
  const daysElapsed = now.getDate();
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

  const achievements = [
    {
      name: "First Habit",
      desc: "Created your first habit",
      icon: "🌱",
      earned: habits.length > 0,
    },
    {
      name: "Week Warrior",
      desc: "Completed a 7-day streak",
      icon: "⚡",
      earned: bestStreak >= 7,
    },
    {
      name: "Early Bird",
      desc: "Morning habits 5 days straight",
      icon: "🌅",
      earned: false,
    },
    {
      name: "Perfectionist",
      desc: "100% completion for a week",
      icon: "💎",
      earned: monthlyScore === 100,
    },
    {
      name: "Consistency King",
      desc: "30-day streak on any habit",
      icon: "👑",
      earned: bestStreak >= 30,
    },
    {
      name: "Momentum Master",
      desc: "Complete all habits for a month",
      icon: "🚀",
      earned: false,
    },
  ];

  const monthlyData = Array.from({ length: 6 }, (_, i) => {
    const date = new Date();
    date.setMonth(date.getMonth() - (5 - i));
    const year = date.getFullYear();
    const month = date.getMonth();
    const monthStr = date.toLocaleString("en-US", { month: "short" });
    const monthStart = `${year}-${String(month + 1).padStart(2, "0")}-01`;
    const monthEnd = `${year}-${String(month + 1).padStart(2, "0")}-31`;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const monthLogs = Object.values(logs)
      .flat()
      .filter((d) => d >= monthStart && d <= monthEnd);
    const possible = habits.length * daysInMonth;
    const completion =
      possible === 0 ? 0 : Math.round((monthLogs.length / possible) * 100);
    return { month: monthStr, completion };
  });

  const weeklyBreakdown = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ].map((day, i) => {
    const date = new Date();
    const dayOfWeek = date.getDay();
    const diff = i - (dayOfWeek === 0 ? 6 : dayOfWeek - 1);
    const target = new Date();
    target.setDate(date.getDate() + diff);
    const dateStr = target.toISOString().split("T")[0];
    const completed = Object.values(logs)
      .flat()
      .filter((d) => d === dateStr).length;
    return { day, habits: completed, total: habits.length };
  });

  const topHabits = habits
    .map((h) => {
      const habitLogs = logs[h.id] || [];
      const streak = calculateStreak(habitLogs);
      const created = new Date(h.createdAt);
      const daysSinceCreated =
        Math.floor(
          (now.getTime() - created.getTime()) / (1000 * 60 * 60 * 24),
        ) + 1;
      const rate = Math.round(
        (habitLogs.length / Math.max(1, daysSinceCreated)) * 100,
      );
      return { name: h.name, streak, rate };
    })
    .sort((a, b) => b.streak - a.streak)
    .slice(0, 4);

  return (
    <div className="flex flex-col gap-5 pb-5">
      {/* Top Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-[#F9F7F4] rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-neutral-500 font-medium">Overall Rate</p>
          <p className="text-3xl font-bold text-[#2D6A4F] mt-1">
            {monthlyScore}%
          </p>
          <p className="text-xs text-neutral-400 mt-1">This month</p>
        </div>
        <div className="bg-[#F9F7F4] rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-neutral-500 font-medium">Longest Streak</p>
          <p className="text-3xl font-bold text-[#2D6A4F] mt-1">
            {bestStreak} days
          </p>
          <p className="text-xs text-neutral-400 mt-1">
            {bestHabit?.name || "—"}
          </p>
        </div>
        <div className="bg-[#F9F7F4] rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-neutral-500 font-medium">
            Habits Completed
          </p>
          <p className="text-3xl font-bold text-[#2D6A4F] mt-1">
            {totalCompletions}
          </p>
          <p className="text-xs text-neutral-400 mt-1">All time</p>
        </div>
        <div className="bg-[#F9F7F4] rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-neutral-500 font-medium">Achievements</p>
          <p className="text-3xl font-bold text-[#2D6A4F] mt-1">
            {achievements.filter((a) => a.earned).length} /{" "}
            {achievements.length}
          </p>
          <p className="text-xs text-neutral-400 mt-1">Unlocked</p>
        </div>
      </div>

      <div className="flex gap-4">
        {/* Left Column */}
        <div className="flex flex-col gap-4 flex-1 min-w-0">
          {/* Monthly Trend */}
          <div className="bg-[#F9F7F4] rounded-2xl p-5 shadow-sm">
            <h2 className="text-lg font-bold text-neutral-800 mb-1">
              6-Month Trend
            </h2>
            <p className="text-xs text-neutral-400 mb-4">
              Monthly habit completion rate
            </p>
            <div className="flex items-end gap-3" style={{ height: "120px" }}>
              {monthlyData.map((d) => (
                <div
                  key={d.month}
                  className="flex flex-col items-center gap-1 flex-1"
                >
                  <p className="text-xs font-semibold text-[#2D6A4F]">
                    {d.completion}%
                  </p>
                  <div
                    className="w-full flex flex-col justify-end"
                    style={{ height: "80px" }}
                  >
                    <div
                      className="w-full rounded-t-xl bg-[#2D6A4F]"
                      style={{ height: `${d.completion * 0.8}px` }}
                    />
                  </div>
                  <p className="text-xs text-neutral-400">{d.month}</p>
                </div>
              ))}
            </div>
          </div>

          {/* This Week Breakdown */}
          <div className="bg-[#F9F7F4] rounded-2xl p-5 shadow-sm">
            <h2 className="text-lg font-bold text-neutral-800 mb-4">
              This Week
            </h2>
            <div className="flex flex-col gap-3">
              {weeklyBreakdown.map((d) => (
                <div key={d.day} className="flex items-center gap-3">
                  <p className="text-sm text-neutral-600 w-24 shrink-0">
                    {d.day}
                  </p>
                  <div className="flex-1 h-2.5 bg-neutral-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#2D6A4F] rounded-full"
                      style={{
                        width: `${d.total === 0 ? 0 : (d.habits / d.total) * 100}%`,
                      }}
                    />
                  </div>
                  <p className="text-xs font-semibold text-neutral-500 w-10 text-right shrink-0">
                    {d.habits}/{d.total}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="flex flex-col gap-4 w-72 shrink-0">
          {/* Top Habits */}
          <div className="bg-[#F9F7F4] rounded-2xl p-5 shadow-sm">
            <h2 className="text-lg font-bold text-neutral-800 mb-4">
              Top Habits
            </h2>
            {topHabits.length === 0 ? (
              <p className="text-sm text-neutral-400">No habits yet</p>
            ) : (
              <div className="flex flex-col gap-3">
                {topHabits.map((h, i) => (
                  <div key={h.name} className="flex items-center gap-3">
                    <span className="text-sm font-bold text-neutral-300 w-4">
                      #{i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-neutral-700 truncate">
                        {h.name}
                      </p>
                      <p className="text-xs text-neutral-400">
                        🔥 {h.streak} day streak
                      </p>
                    </div>
                    <span className="text-sm font-bold text-[#2D6A4F]">
                      {h.rate}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Achievements */}
          <div className="bg-[#F9F7F4] rounded-2xl p-5 shadow-sm">
            <h2 className="text-lg font-bold text-neutral-800 mb-4">
              Achievements
            </h2>
            <div className="flex flex-col gap-3">
              {achievements.map((a) => (
                <div
                  key={a.name}
                  className={`flex items-center gap-3 p-3 rounded-xl ${a.earned ? "bg-[#2D6A4F]/10" : "bg-neutral-100 opacity-50"}`}
                >
                  <span className="text-2xl">{a.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-neutral-800">
                      {a.name}
                    </p>
                    <p className="text-xs text-neutral-500 truncate">
                      {a.desc}
                    </p>
                  </div>
                  {a.earned && (
                    <svg
                      className="w-4 h-4 text-[#2D6A4F] shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
