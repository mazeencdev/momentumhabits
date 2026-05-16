"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  ArrowRightEndOnRectangleIcon,
  Squares2X2Icon,
  ArrowTrendingUpIcon,
  ChartBarIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type SidebarProps = {
  setActivePage: (page: string) => void;
  activePage?: string;
  open?: boolean;
  onClose?: () => void;
};

export default function Sidebar({
  setActivePage,
  activePage,
  open,
  onClose,
}: SidebarProps) {
  const router = useRouter();

  const handleSignout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleNav = (page: string) => {
    setActivePage(page);
    onClose?.();
  };

  const navItem = (page: string, Icon: React.ElementType, label: string) => (
    <button
      onClick={() => handleNav(page)}
      className={`w-full text-lg font-normal group transition-all duration-200 rounded-lg px-2 py-1 text-left ${
        activePage === page
          ? "text-black bg-[#2d6a4f]/10"
          : "text-black/40 hover:text-black hover:bg-[#2d6a4f]/5"
      }`}
    >
      <p className="flex items-center gap-1">
        <Icon
          className={`size-6 transition-all duration-200 ${
            activePage === page
              ? "text-[#2D6A4F]"
              : "group-hover:text-[#2D6A4F]"
          }`}
        />
        {label}
      </p>
    </button>
  );

  return (
    <>
      {/* Mobile overlay backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-full w-72 bg-white border-r border-black/10 shadow-xl flex flex-col px-5 py-5 transition-transform duration-300
          lg:static lg:z-auto lg:shadow-none lg:border lg:rounded-xl lg:translate-x-0 lg:h-auto lg:self-stretch
          ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="w-full h-fit flex items-center justify-between gap-2 py-2 mb-2">
          <div className="flex items-center gap-2">
            <Image
              src={"/momentum-logo.svg"}
              alt="Momentum_Logo"
              width={40}
              height={40}
            />
            <p className="text-2xl font-bold">Momentum</p>
          </div>
          {/* Close button (mobile only) */}
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-lg hover:bg-neutral-100"
          >
            <XMarkIcon className="size-5 text-black/50" />
          </button>
        </div>

        {/* Menu section */}
        <div className="w-full h-fit flex flex-col gap-4 py-5 text-black/40">
          <p className="text-xs font-light text-black/50 uppercase tracking-wide">
            Menu
          </p>
          {navItem("dashboard", Squares2X2Icon, "Dashboard")}
          {navItem("habits", ArrowTrendingUpIcon, "Habits")}
          {navItem("progress", ChartBarIcon, "Progress")}
        </div>

        {/* General section */}
        <div className="w-full h-fit flex flex-col gap-4 py-5 text-black/40">
          <p className="text-xs font-light text-black/50 uppercase tracking-wide">
            General
          </p>
          <button
            onClick={handleSignout}
            className="text-lg font-normal group hover:text-black transition-all duration-200 hover:bg-[#2d6a4f]/5 rounded-lg px-2 py-1 text-left"
          >
            <p className="flex items-center gap-1">
              <ArrowRightEndOnRectangleIcon className="size-6 group-hover:text-[#2D6A4F] transition-all duration-200" />
              Logout
            </p>
          </button>
        </div>
      </aside>
    </>
  );
}
