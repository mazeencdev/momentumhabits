"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Settings() {
  const [notifications, setNotifications] = useState({
    dailyReminder: true,
    streakAlerts: true,
    weeklyReport: false,
    achievements: true,
  });

  const [user, setUser] = useState<any>(null);
  const [fullName, setFullName] = useState("");
  const [reminderTime, setReminderTime] = useState("08:00");

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
      setFullName(user?.user_metadata?.full_name || "");
    });
  }, []);

  const toggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = async () => {
    await supabase.auth.updateUser({ data: { full_name: fullName } });
    window.dispatchEvent(new Event("userUpdated"));
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    const fileExt = file.name.split(".").pop();
    const filePath = `${user.id}.${fileExt}`;

    await supabase.storage
      .from("avatars")
      .upload(filePath, file, { upsert: true });

    const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);

    await supabase.auth.updateUser({ data: { avatar_url: data.publicUrl } });

    window.dispatchEvent(new Event("userUpdated"));
  };

  return (
    <div className="flex flex-col gap-5 pb-5 max-w-3xl">
      {/* Profile */}
      <div className="bg-[#F9F7F4] rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-neutral-800 mb-5">Profile</h2>
        <div className="flex items-center gap-5 mb-6">
          <div className="flex flex-col items-center gap-2">
            <div className="w-20 h-20 rounded-2xl bg-[#2D6A4F] flex items-center justify-center text-white text-3xl font-bold shrink-0 overflow-hidden">
              {user?.user_metadata?.avatar_url ? (
                <img
                  src={user.user_metadata.avatar_url}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                user?.user_metadata?.full_name?.[0]?.toUpperCase() || "?"
              )}
            </div>
            <label className="cursor-pointer text-xs text-[#2D6A4F] font-medium hover:underline">
              Change Photo
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarUpload}
              />
            </label>
          </div>
          <div>
            <p className="font-semibold text-neutral-800 text-lg">
              {user?.user_metadata?.full_name || "—"}
            </p>
            <p className="text-sm text-neutral-400">{user?.email || "—"}</p>
            <p className="text-xs text-[#2D6A4F] font-medium mt-1">
              Member since{" "}
              {user?.created_at
                ? new Date(user.created_at).toLocaleDateString("en-US", {
                    month: "long",
                    year: "numeric",
                  })
                : "—"}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-neutral-500 font-medium block mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-700 focus:outline-none focus:border-[#2D6A4F] transition-colors"
            />
          </div>
          <div>
            <label className="text-xs text-neutral-500 font-medium block mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              defaultValue={user?.email || ""}
              className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-700 focus:outline-none focus:border-[#2D6A4F] transition-colors"
            />
          </div>
        </div>
        <button
          onClick={handleSave}
          className="mt-4 px-5 py-2.5 bg-[#2D6A4F] text-white text-sm font-medium rounded-xl hover:bg-[#245a42] transition-colors duration-200"
        >
          Save Changes
        </button>
      </div>

      {/* Preferences */}
      <div className="bg-[#F9F7F4] rounded-2xl p-6 shadow-sm">
        <h2 className="text-lg font-bold text-neutral-800 mb-5">Preferences</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-neutral-500 font-medium block mb-1.5">
              Week Starts On
            </label>
            <select className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-700 focus:outline-none focus:border-[#2D6A4F] transition-colors bg-white">
              <option>Monday</option>
              <option>Sunday</option>
              <option>Saturday</option>
            </select>
          </div>
          <div>
            <label className="text-xs text-neutral-500 font-medium block mb-1.5">
              Default View
            </label>
            <select className="w-full px-3 py-2.5 rounded-xl border border-neutral-200 text-sm text-neutral-700 focus:outline-none focus:border-[#2D6A4F] transition-colors bg-white">
              <option>Dashboard</option>
              <option>Habits</option>
              <option>Progress</option>
            </select>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-[#F9F7F4] rounded-2xl p-6 shadow-sm border border-red-100">
        <h2 className="text-lg font-bold text-red-500 mb-2">Danger Zone</h2>
        <p className="text-sm text-neutral-500 mb-4">
          These actions are permanent and cannot be undone.
        </p>
        <div className="flex gap-3">
          <button className="px-5 py-2.5 border border-red-200 text-red-500 text-sm font-medium rounded-xl hover:bg-red-50 transition-colors duration-200">
            Reset All Habits
          </button>
          <button className="px-5 py-2.5 bg-red-500 text-white text-sm font-medium rounded-xl hover:bg-red-600 transition-colors duration-200">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
