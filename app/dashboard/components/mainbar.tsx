"use client";

import { EnvelopeIcon, BellIcon, Bars3Icon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type MainbarProps = {
  onMenuOpen?: () => void;
};

export default function Mainbar({ onMenuOpen }: MainbarProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    const refetch = () => {
      supabase.auth.getUser().then(({ data: { user } }) => {
        setName(user?.user_metadata?.full_name || user?.email || "");
        setEmail(user?.email || "");
      });
    };
    refetch();
    window.addEventListener("userUpdated", refetch);
    return () => window.removeEventListener("userUpdated", refetch);
  }, []);

  const initials = name
    ? name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "?";

  return (
    <div className="h-auto min-h-16 w-full rounded-xl bg-neutral-500/5 shadow-sm shadow-black/10 border border-black/10 flex justify-between items-center px-4 py-3 gap-3 flex-wrap">
      {/* Left: hamburger (mobile) + search */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <button
          onClick={onMenuOpen}
          className="lg:hidden p-2 rounded-xl hover:bg-black/5 transition-colors shrink-0"
          aria-label="Open menu"
        >
          <Bars3Icon className="size-6 text-black/60" />
        </button>
        <input
          type="text"
          placeholder="Search Habits"
          className="bg-white w-full max-w-[350px] px-3 py-2.5 rounded-full placeholder:text-black/30 placeholder:text-sm border border-black/10 min-w-0"
        />
      </div>

      {/* Right: icons + avatar */}
      <div className="flex items-center gap-2 shrink-0">
        <EnvelopeIcon className="size-10 text-black bg-white p-2.5 rounded-full hidden sm:block" />
        <BellIcon className="size-10 text-black bg-white p-2.5 rounded-full hidden sm:block" />
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-[#2D6A4F] flex items-center justify-center text-white font-bold text-sm shrink-0">
            {initials}
          </div>
          <div className="hidden sm:flex flex-col">
            <p className="text-sm font-medium leading-tight">{name}</p>
            <p className="text-xs text-black/50 leading-tight truncate max-w-[160px]">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
