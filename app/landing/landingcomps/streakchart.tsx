const days = [
  { day: "M", height: 40, done: true },
  { day: "T", height: 65, done: true },
  { day: "W", height: 50, done: true },
  { day: "T", height: 80, done: true },
  { day: "F", height: 55, done: true },
  { day: "S", height: 30, done: true },
  { day: "S", height: 10, done: true },
];

export function StreakChart() {
  return (
    <div className="flex items-end gap-2 h-24">
      {days.map((d, i) => (
        <div key={i} className="flex flex-col items-center gap-1 flex-1">
          <div
            className={`w-full rounded-md ${d.done ? "bg-[#2D6A4F]" : "bg-[#D8F3DC]"}`}
            style={{ height: `${d.height}px` }} // px instead of %
          />
          <span className="text-[10px] text-[#6B7280] font-medium">
            {d.day}
          </span>
        </div>
      ))}
    </div>
  );
}
