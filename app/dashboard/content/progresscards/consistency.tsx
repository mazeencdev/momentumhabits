type Props = { score: number };

export default function Consistency({ score }: Props) {
  return (
    <div className="w-full bg-white border border-black/15 rounded-2xl p-5 flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <p className="text-sm text-neutral-500 font-medium">Consistency</p>
        <span className="text-2xl">📈</span>
      </div>
      <p className="text-3xl font-bold text-[#2D6A4F]">{score}%</p>
      <p className="text-xs text-neutral-400">Last 30 days</p>
    </div>
  );
}
