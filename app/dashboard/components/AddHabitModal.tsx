"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

const categories = [
  "Health",
  "Fitness",
  "Learning",
  "Mindfulness",
  "Productivity",
];
const frequencies = ["Daily", "Weekdays", "Weekends", "Weekly"];
const icons = [
  "🧘",
  "💪",
  "📚",
  "💧",
  "🚶",
  "✍️",
  "🌍",
  "🥗",
  "🚿",
  "💻",
  "🤸",
  "🙏",
  "🎯",
  "🌅",
  "⚡",
];

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function AddHabitModal({ open, onClose }: Props) {
  const [habitName, setHabitName] = useState("");
  const [category, setCategory] = useState("Health");
  const [frequency, setFrequency] = useState("Daily");
  const [selectedIcon, setSelectedIcon] = useState("🎯");
  const [reminderTime, setReminderTime] = useState("");

  const handleHabit = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("Habit").insert({
      name: habitName,
      icon: selectedIcon,
      category,
      frequency,
      reminderTime: reminderTime || null,
      userId: user.id,
    });

    if (error) {
      console.log(error);
      return;
    }

    window.dispatchEvent(new Event("habitAdded"));
    handleClose();
  };

  const handleClose = () => {
    setHabitName("");
    setCategory("Health");
    setFrequency("Daily");
    setSelectedIcon("🎯");
    setReminderTime("");
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative bg-[#F9F7F4] rounded-2xl shadow-2xl w-full max-w-md mx-4 p-6 flex flex-col gap-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-neutral-800">
              Add New Habit
            </h2>
            <p className="text-sm text-neutral-400 mt-0.5">
              Build a new streak starting today
            </p>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-neutral-200 transition-colors text-neutral-500"
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Icon Picker */}
        <div>
          <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-2">
            Pick an Icon
          </label>
          <div className="flex flex-wrap gap-2">
            {icons.map((icon) => (
              <button
                key={icon}
                onClick={() => setSelectedIcon(icon)}
                className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-all duration-150 ${
                  selectedIcon === icon
                    ? "bg-[#2D6A4F] shadow-sm scale-110"
                    : "bg-neutral-100 hover:bg-neutral-200"
                }`}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Habit Name */}
        <div>
          <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-2">
            Habit Name
          </label>
          <input
            type="text"
            value={habitName}
            onChange={(e) => setHabitName(e.target.value)}
            placeholder="e.g. Morning Meditation"
            className="w-full px-4 py-3 rounded-xl bg-neutral-100 text-sm text-neutral-700 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#2D6A4F]/30 transition-all"
          />
        </div>

        {/* Category + Frequency */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-2">
              Category
            </label>
            <div className="flex flex-col gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium text-left transition-all duration-150 ${
                    category === cat
                      ? "bg-[#2D6A4F] text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider block mb-2">
              Frequency
            </label>
            <div className="flex flex-col gap-1.5">
              {frequencies.map((freq) => (
                <button
                  key={freq}
                  onClick={() => setFrequency(freq)}
                  className={`px-3 py-2 rounded-xl text-sm font-medium text-left transition-all duration-150 ${
                    frequency === freq
                      ? "bg-[#2D6A4F] text-white"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
                  }`}
                >
                  {freq}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Preview */}
        {habitName && (
          <div className="flex items-center gap-3 p-3 bg-[#2D6A4F]/10 rounded-xl border border-[#2D6A4F]/20">
            <span className="text-2xl">{selectedIcon}</span>
            <div>
              <p className="text-sm font-semibold text-neutral-800">
                {habitName}
              </p>
              <p className="text-xs text-neutral-500">
                {category} · {frequency}
                {reminderTime ? ` · ${reminderTime}` : ""}
              </p>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button
            onClick={handleClose}
            className="flex-1 py-3 rounded-xl border border-neutral-200 text-sm font-medium text-neutral-600 hover:bg-neutral-100 transition-colors duration-150"
          >
            Cancel
          </button>
          <button
            disabled={!habitName.trim()}
            onClick={handleHabit}
            className="flex-1 py-3 rounded-xl bg-[#2D6A4F] text-white text-sm font-medium hover:bg-[#245a42] transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Add Habit
          </button>
        </div>
      </div>
    </div>
  );
}
