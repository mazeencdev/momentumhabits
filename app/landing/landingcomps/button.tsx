"use client";
import { useRouter } from "next/navigation";

export default function LandingButton() {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push("/signup")}
      className=" w-fit border border-[#2D6A4F] bg-[#2D6A4F] text-white px-3 py-2 rounded-md font-semibold text-sm  hover:cursor-pointer hover:text-white duration-200 transition-all"
    >
      Get Started
    </button>
  );
}
