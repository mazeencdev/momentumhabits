type Props = { monthlyScore: number };

export default function MonthlyProgress({ monthlyScore }: Props) {
  return (
    <div className="bg-white rounded-2xl p-5 border border-black/15 flex flex-col justify-between">
      <h2 className="text-lg font-bold text-neutral-800 mb-3">
        Monthly Progress
      </h2>
      <div className="flex items-center gap-4">
        <div className="relative w-20 h-20 shrink-0">
          <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
            <circle
              cx="18"
              cy="18"
              r="15.9"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="3"
            />
            <circle
              cx="18"
              cy="18"
              r="15.9"
              fill="none"
              stroke="#2D6A4F"
              strokeWidth="3"
              strokeDasharray={`${monthlyScore} ${100 - monthlyScore}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-[#2D6A4F]">
              {monthlyScore}%
            </span>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-700">
            {monthlyScore >= 80 ? "Great work!" : monthlyScore >= 50 ? "Keep going!" : "Just getting started!"}
          </p>
          <p className="text-xs text-neutral-400 mt-1">
            You&apos;ve completed {monthlyScore}% of your habits this month.
          </p>
        </div>
      </div>
      <p className="text-xs text-neutral-400">Keep it up!</p>
    </div>
  );
}
