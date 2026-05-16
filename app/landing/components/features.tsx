import { StreakChart } from "../landingcomps/streakchart";
import Image from "next/image";
import Ring from "../landingcomps/rings";

const reminders = [
  { name: "Morning Run", time: "6:00 AM" },
  { name: "Read 20 Pages", time: "8:30 AM" },
  { name: "Journal", time: "9:00 PM" },
];

const stats = [
  { value: "14", label: "Day Streak" },
  { value: "86%", label: "Weekly Rate" },
  { value: "248", label: "Total Completions" },
];

const cells = [
  "l4","l2","l3","l4","l1","l4","l3","l2","l4","l3","l1","l4",
  "l3","l4","l2","l1","l4","l3","l4","l2","l3","l4","l1","l2",
  "l1","l3","l4","l2","l4","l1","l3","l4","l2","l3","l4","l1",
];

const heatColors: Record<string, string> = {
  l1: "#D8F3DC",
  l2: "#74C69D",
  l3: "#3D9970",
  l4: "#2D6A4F",
};

const badges = [
  { icon: "🔥", name: "On Fire", sub: "7 day streak", earned: true },
  { icon: "⚡", name: "Unstoppable", sub: "14 day streak", earned: true },
  { icon: "🏃", name: "Early Bird", sub: "7 AM habit", earned: true },
  { icon: "🏆", name: "Legend", sub: "30 day streak", earned: false },
];

export default function Features() {
  return (
    <div
      id="features"
      className="w-full flex flex-col justify-between items-center bg-[#F9F7F4] py-10 gap-10 scroll-mt-24 px-6 md:px-16 lg:px-28"
    >
      <div className="flex flex-col items-center w-full max-w-lg gap-5 text-center">
        <p className="text-sm text-[#2D6A4F] font-semibold bg-[#D8F3DC] px-3 rounded-xl w-fit">
          ✦ Features
        </p>
        <p className="text-[#1A1A2E] font-bold text-3xl md:text-4xl">
          Everything you need to{" "}
          <span className="text-[#2D6A4F]">build habits that last</span>
        </p>
        <p className="text-[#6B7280] text-sm">
          Momentum gives you the tools to stay consistent, track progress, and
          celebrate every win - big or small.
        </p>
      </div>

      <div className="w-full space-y-6 md:space-y-10">
        {/* Top 3 feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 text-[#1A1A2E]">
          <div className="space-y-5 bg-white p-8 rounded-2xl">
            <Image
              src={"/streak.svg"}
              alt="streak"
              width={40}
              height={40}
              className="bg-[#D8F3DC] p-2 rounded-xl"
            />
            <div>
              <p className="text-lg font-semibold">Streak Tracking</p>
              <p className="text-sm text-[#6B7280]">
                Stay motivated with daily streaks. Every day you show up adds to
                your chain - don&apos;t break it.
              </p>
            </div>
            <StreakChart />
          </div>
          <div className="space-y-5 bg-white p-8 rounded-2xl">
            <Image
              src={"/progress.svg"}
              alt="progress rings"
              width={40}
              height={40}
              className="bg-[#D8F3DC] p-2 rounded-xl"
            />
            <div>
              <p className="text-lg font-semibold">Progress Rings</p>
              <p className="text-sm text-[#6B7280]">
                See daily, weekly, and monthly completion at a glance. Your
                progress, beautifully visualised.
              </p>
            </div>
            <div className="flex items-center">
              <Ring percentage={67} color="#2D6A4F" label="Today" />
              <Ring percentage={86} color="#3D9970" label="Week" />
              <Ring percentage={92} color="#74C69D" label="Month" />
            </div>
          </div>
          <div className="space-y-5 bg-white p-8 rounded-2xl sm:col-span-2 lg:col-span-1">
            <Image
              src={"/reminders.svg"}
              alt="reminders"
              width={40}
              height={40}
              className="bg-[#D8F3DC] p-2 rounded-xl"
            />
            <div>
              <p className="text-lg font-semibold">Smart Reminders</p>
              <p className="text-sm text-[#6B7280]">
                Get nudged at the right time, every time. Set custom reminders
                for each habit so nothing slips.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              {reminders.map((r, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 bg-[#F9F7F4] border border-[#E8E4DF] rounded-xl px-4 py-3"
                >
                  <div className="w-2 h-2 rounded-full bg-[#2D6A4F] shrink-0" />
                  <span className="text-sm font-semibold flex-1">{r.name}</span>
                  <span className="text-xs text-[#6B7280]">{r.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom 2 feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <div className="space-y-5 bg-white p-8 rounded-2xl text-[#1A1A2E]">
            <Image
              src={"/insights.svg"}
              alt="insights"
              width={40}
              height={40}
              className="bg-[#D8F3DC] p-2 rounded-xl"
            />
            <div>
              <p className="text-lg font-semibold">Deep Insights</p>
              <p className="text-sm text-[#6B7280]">
                Understand your patterns over time. Momentum analyses your data
                and shows you exactly where you&apos;re thriving - and where to
                improve.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="bg-[#F9F7F4] border border-[#E8E4DF] rounded-xl p-4 text-center"
                >
                  <p className="text-2xl font-extrabold text-[#2D6A4F]">
                    {s.value}
                  </p>
                  <p className="text-[11px] text-[#6B7280] font-medium mt-1">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-12 gap-1 mt-4">
              {cells.map((level, i) => (
                <div
                  key={i}
                  className="aspect-square rounded-sm"
                  style={{ backgroundColor: heatColors[level] }}
                />
              ))}
            </div>
          </div>
          <div className="space-y-5 bg-white p-8 rounded-2xl text-[#1A1A2E]">
            <Image
              src={"/badges.svg"}
              alt="badges"
              width={40}
              height={40}
              className="bg-[#D8F3DC] p-2 rounded-xl"
            />
            <div>
              <p className="text-lg font-semibold">Badges &amp; Milestones</p>
              <p className="text-sm text-[#6B7280]">
                Celebrate every win. Earn badges as you hit milestones —
                they&apos;re a reminder of how far you&apos;ve come.
              </p>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {badges.map((b, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center text-center rounded-xl p-3 border ${
                    b.earned
                      ? "bg-[#D8F3DC] border-[#74C69D]"
                      : "bg-[#F9F7F4] border-[#E8E4DF]"
                  }`}
                >
                  <span className="text-2xl mb-1">{b.icon}</span>
                  <p className="text-xs font-semibold text-[#1A1A2E]">
                    {b.name}
                  </p>
                  <p className="text-[10px] text-[#6B7280] mt-0.5">{b.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
