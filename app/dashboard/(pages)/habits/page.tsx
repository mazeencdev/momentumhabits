"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

const categories = [
  "All",
  "Health",
  "Fitness",
  "Learning",
  "Mindfulness",
  "Productivity",
];

const categoryColors: Record<string, string> = {
  Mindfulness: "bg-purple-100 text-purple-700",
  Fitness: "bg-red-100 text-red-600",
  Learning: "bg-blue-100 text-blue-700",
  Health: "bg-emerald-100 text-emerald-700",
  Productivity: "bg-amber-100 text-amber-700",
};

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

function calculateStreak(logs: string[]): number {
  // logs is an array of "YYYY-MM-DD" strings
  const sorted = [...logs].sort().reverse(); // newest first
  let streak = 0;
  let expected = new Date();

  for (const log of sorted) {
    const logDate = new Date(log);
    const diff = Math.floor(
      (expected.getTime() - logDate.getTime()) / (1000 * 60 * 60 * 24),
    );
    if (diff === 0 || diff === 1) {
      streak++;
      expected = logDate;
    } else {
      break;
    }
  }
  return streak;
}

export default function Habits() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [habits, setHabits] = useState<Habit[]>([]);
  const [logs, setLogs] = useState<Record<string, string[]>>({});

  const handleComplete = async (habit: Habit) => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    await supabase.from("HabitLog").insert({
      habitId: habit.id,
      userId: user.id,
      completedAt: new Date().toISOString().split("T")[0],
    });
  };

  const handleDelete = async (habitId: string) => {
    await supabase.from("Habit").delete().eq("id", habitId);
    window.dispatchEvent(new Event("habitAdded"));
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

    const handleHabitAdded = () => fetchHabits();
    window.addEventListener("habitAdded", handleHabitAdded);
    return () => window.removeEventListener("habitAdded", handleHabitAdded);
  }, []);

  const filtered =
    activeCategory === "All"
      ? habits
      : habits.filter((h) => h.category === activeCategory);

  return (
    <div className="flex flex-col gap-5 pb-5">
      {/* Header Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-[#F9F7F4] rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-neutral-500 font-medium">Active Habits</p>
          <p className="text-3xl font-bold text-[#2D6A4F] mt-1">
            {habits.length}
          </p>
          <p className="text-xs text-neutral-400 mt-1">Across all categories</p>
        </div>
        <div className="bg-[#F9F7F4] rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-neutral-500 font-medium">
            Categories Used
          </p>
          <p className="text-3xl font-bold text-[#2D6A4F] mt-1">
            {new Set(habits.map((h) => h.category)).size}
          </p>
          <p className="text-xs text-neutral-400 mt-1">Out of 5 total</p>
        </div>
        <div className="bg-[#F9F7F4] rounded-2xl p-5 shadow-sm">
          <p className="text-sm text-neutral-500 font-medium">Daily Habits</p>
          <p className="text-3xl font-bold text-[#2D6A4F] mt-1">
            {habits.filter((h) => h.frequency === "Daily").length}
          </p>
          <p className="text-xs text-neutral-400 mt-1">Recurring every day</p>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeCategory === cat
                ? "bg-[#2D6A4F] text-white shadow-sm"
                : "bg-[#F9F7F4] text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Habit Cards */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <span className="text-5xl mb-4">🌱</span>
          <p className="text-lg font-semibold text-neutral-600">
            No habits yet
          </p>
          <p className="text-sm text-neutral-400 mt-1">
            Press &ldquo;Add Habit&rdquo; to start building your first streak
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {filtered.map((habit) => (
            <div
              key={habit.id}
              className="bg-[#F9F7F4] rounded-2xl p-5 shadow-sm flex flex-col gap-3 hover:shadow-md transition-all duration-200"
            >
              <p className="text-xs font-semibold text-[#2D6A4F]">
                🔥 {calculateStreak(logs[habit.id] || [])} day streak
              </p>
              <div className="flex justify-between items-start">
                <span className="text-3xl">{habit.icon}</span>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${categoryColors[habit.category] || "bg-neutral-100 text-neutral-600"}`}
                  >
                    {habit.category}
                  </span>
                  <button
                    onClick={() => handleDelete(habit.id)}
                    className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-100 text-neutral-400 hover:text-red-500 transition-all duration-150"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-neutral-800">{habit.name}</h3>
                <p className="text-xs text-neutral-400 mt-0.5">
                  {habit.frequency}
                </p>
              </div>
              {habit.reminderTime && (
                <p className="text-xs text-[#2D6A4F] font-medium">
                  ⏰ Reminder at {habit.reminderTime}
                </p>
              )}
              <button
                onClick={() => handleComplete(habit)}
                className="w-full py-2 rounded-xl bg-[#2D6A4F]/10 text-[#2D6A4F] text-xs font-semibold hover:bg-[#2D6A4F] hover:text-white transition-all duration-150"
              >
                ✓ Mark as Done
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
