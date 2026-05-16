type Props = {
  weeklyData: { day: string; score: number }[];
};

export default function ProgressChart({ weeklyData }: Props) {
  return (
    <div className="flex-1 bg-white rounded-2xl p-5 border border-black/15 flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-bold text-neutral-800">Weekly Breakdown</h2>
        <p className="text-xs text-neutral-400">Daily completion rate this week</p>
      </div>
      <div className="flex items-end gap-2 flex-1" style={{ minHeight: "120px" }}>
        {weeklyData.map((d) => (
          <div key={d.day} className="flex flex-col items-center gap-1 flex-1">
            <p className="text-xs font-semibold text-[#2D6A4F]">{d.score > 0 ? `${d.score}%` : ""}</p>
            <div className="w-full flex flex-col items-center justify-end" style={{ height: "80px" }}>
              <div
                className="w-full rounded-t-lg bg-[#2D6A4F]"
                style={{ height: `${d.score * 0.8}px` }}
              />
            </div>
            <p className="text-xs text-neutral-400">{d.day}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
