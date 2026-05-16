"use client";

type Props = {
  onClick: () => void;
};

export default function LogButton({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="text-white font-semibold bg-[#2d6a4f] w-full py-3 rounded-xl hover:cursor-pointer hover:bg-neutral-200 duration-150 transition-all"
    >
      Sign In
    </button>
  );
}
