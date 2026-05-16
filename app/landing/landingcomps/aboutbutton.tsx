export default function AboutButton() {
  return (
    <button className="group w-fit inline-flex items-center gap-1 border border-[#2D6A4F] bg-[#2D6A4F] text-white px-3 py-2 rounded-md font-semibold text-sm cursor-pointer transition-all duration-200 hover:scale-[1.03] hover:text-white">
      Learn More{" "}
      <span className="inline-block transition-transform duration-200 group-hover:translate-x-[5px]">
        →
      </span>
    </button>
  );
}
