export default function Ring({
  percentage,
  color,
  label,
}: {
  percentage: number;
  color: string;
  label: string;
}) {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width="70" height="70" viewBox="0 0 70 70">
        {/* Background track */}
        <circle
          cx="35"
          cy="35"
          r={radius}
          fill="none"
          stroke="#E8E4DF"
          strokeWidth="6"
        />
        {/* Progress arc */}
        <circle
          cx="35"
          cy="35"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 35 35)"
        />
        <text
          x="35"
          y="40"
          textAnchor="middle"
          fontSize="12"
          fontWeight="800"
          fill="#1A1A2E"
        >
          {percentage}%
        </text>
      </svg>
      <span className="text-xs text-[#6B7280] font-medium">{label}</span>
    </div>
  );
}
