type Props = {
  weeklyData: { day: string; score: number }[];
};

export default function WeeklyBarChart({ weeklyData }: Props) {
  return (
    <div className="flex-1 flex flex-col justify-between bg-white rounded-2xl p-5 border border-black/15">
      <div>
        <h2 className="text-lg font-bold text-neutral-800 mb-1">This Week</h2>
        <p className="text-xs text-neutral-400 mb-4">Daily completion rate</p>
      </div>

      <div className="flex items-end gap-2" style={{ height: "100px" }}>
        {weeklyData.map((d) => (
          <div key={d.day} className="flex flex-col items-center gap-1 flex-1">
            <div
              className="w-full flex flex-col items-center justify-end"
              style={{ height: "72px" }}
            >
              <div
                className="w-full rounded-t-lg bg-[#2D6A4F]"
                style={{ height: `${d.score * 0.72}px` }}
              />
            </div>
            <p className="text-xs text-neutral-400">{d.day}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
