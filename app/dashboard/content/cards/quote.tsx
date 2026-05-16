export default function Quote() {
  return (
    <div className="w-full md:w-64 shrink-0 bg-[#2D6A4F] rounded-2xl p-5 border border-black/15 flex flex-col gap-3 justify-around">
      <p className="text-[#6bdca9] text-xs font-semibold uppercase tracking-widest">
        Daily Motivation
      </p>
      <p className="text-white text-sm font-medium leading-relaxed">
        &ldquo;Small habits don&apos;t add up, they compound. That&apos;s the
        power of Momentum.&rdquo;
      </p>
      <p className="text-[#6bdca9] text-xs">— James Clear</p>
    </div>
  );
}
