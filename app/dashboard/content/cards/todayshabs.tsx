"use client";

import { isCompletedToday } from "@/lib/utils";

type Habit = {
  id: string;
  name: string;
  icon: string;
  category: string;
  frequency: string;
  reminderTime: string | null;
};

type Props = {
  habits: Habit[];
  logs: Record<string, string[]>;
  onToggle: (habitId: string, completed: boolean) => void;
};

export default function TodaysHabs({ habits, logs, onToggle }: Props) {
  return (
    <div className="flex-1 bg-white border border-black/15 rounded-2xl p-5 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-neutral-800">Today&apos;s Habits</h2>
        <span className="text-sm font-semibold text-[#2D6A4F] bg-[#6bdca9]/25 px-3 py-1 rounded-full">
          {habits.length} habits
        </span>
      </div>

      {habits.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-center">
          <span className="text-4xl mb-3">🌱</span>
          <p className="text-sm font-semibold text-neutral-600">No habits yet</p>
          <p className="text-xs text-neutral-400 mt-1">
            Press &ldquo;Add Habit&rdquo; to get started
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {habits.map((habit) => {
            const completed = isCompletedToday(logs[habit.id] || []);
            return (
              <div
                key={habit.id}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-neutral-100 transition-all duration-150 cursor-pointer"
                onClick={() => onToggle(habit.id, completed)}
              >
                <span className="text-xl shrink-0">{habit.icon}</span>
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium truncate ${
                      completed ? "line-through text-neutral-400" : "text-neutral-700"
                    }`}
                  >
                    {habit.name}
                  </p>
                  <p className="text-xs text-neutral-400">
                    {habit.frequency}
                    {habit.reminderTime ? ` · ⏰ ${habit.reminderTime}` : ""}
                  </p>
                </div>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full shrink-0 bg-neutral-100 text-neutral-600">
                  {habit.category}
                </span>
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all duration-150 ${
                    completed
                      ? "bg-[#2D6A4F] border-[#2D6A4F]"
                      : "border-neutral-300"
                  }`}
                >
                  {completed && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
