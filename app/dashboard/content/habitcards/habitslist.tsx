"use client";

import { calculateStreak } from "@/lib/utils";

type Habit = {
  id: string;
  name: string;
  icon: string;
  category: string;
  frequency: string;
};

type Props = {
  habits: Habit[];
  logs: Record<string, string[]>;
  onDelete: (habitId: string) => void;
};

export default function HabitsList({ habits, logs, onDelete }: Props) {
  return (
    <div className="w-full flex-1 flex flex-col gap-3 min-h-0">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-neutral-700">All Habits</p>
        <span className="text-sm font-semibold text-[#2D6A4F] bg-[#6bdca9]/25 px-3 py-1 rounded-full">
          {habits.length} habits
        </span>
      </div>

      <div className="flex-1 bg-white rounded-2xl border border-black/15 p-4 flex flex-col gap-2 overflow-y-auto">
        {habits.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <span className="text-4xl mb-3">🌱</span>
            <p className="text-sm font-semibold text-neutral-600">No habits yet</p>
            <p className="text-xs text-neutral-400 mt-1">
              Press &ldquo;Add Habit&rdquo; to get started
            </p>
          </div>
        ) : (
          habits.map((habit) => {
            const streak = calculateStreak(logs[habit.id] || []);
            return (
              <div
                key={habit.id}
                className="flex items-center gap-4 p-3 rounded-xl hover:bg-neutral-100 transition-all duration-150"
              >
                <span className="text-2xl">{habit.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-neutral-800">{habit.name}</p>
                  <p className="text-xs text-neutral-400">{habit.frequency}</p>
                </div>
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-[#6bdca9]/25 text-[#2D6A4F]">
                  {habit.category}
                </span>
                <div className="flex items-center gap-1 text-xs text-neutral-500">
                  <span>🔥</span>
                  <span className="font-semibold">{streak}d</span>
                </div>
                <button
                  onClick={() => onDelete(habit.id)}
                  className="text-xs text-neutral-400 hover:text-red-400 transition-colors duration-150 px-2"
                >
                  ✕
                </button>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
