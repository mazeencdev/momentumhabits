"use client";

import { useRouter } from "next/navigation";

export default function CTA() {
  const router = useRouter();

  return (
    <section
      id="showcase"
      className="w-full bg-[#F9F7F4] px-6 md:px-16 lg:px-28 py-16 md:py-24 flex justify-center"
    >
      <div className="w-full max-w-5xl bg-[#2D6A4F] rounded-3xl px-6 md:px-16 lg:px-20 py-16 md:py-24 text-center relative overflow-hidden animate-[smallBounce_1.3s_ease-in-out_infinite]">
        <div className="inline-flex items-center gap-2 bg-white/10 text-white text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full mb-7">
          ✦ Get Started Free
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-5">
          Start building habits
          <br />
          <span className="opacity-50">that actually stick.</span>
        </h2>
        <p className="text-white/70 text-base md:text-lg max-w-md mx-auto leading-relaxed mb-10">
          Join thousands of people using Momentum to show up every day and
          become who they want to be.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => router.push("/signup")}
            className="w-full sm:w-auto bg-white text-[#2D6A4F] font-bold text-sm px-8 py-4 rounded-xl hover:bg-[#F9F7F4] transition-colors"
          >
            Get Started Free
          </button>
          <button
            onClick={() =>
              document
                .getElementById("features")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="w-full sm:w-auto text-white border border-white/30 font-semibold text-sm px-8 py-4 rounded-xl hover:bg-white/10 transition-colors"
          >
            See How It Works
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10">
          <div className="flex">
            {["M", "J", "S", "R"].map((initial, i) => (
              <div
                key={i}
                className="w-8 h-8 rounded-full border-2 border-[#2D6A4F] bg-[#D8F3DC] text-[#2D6A4F] text-xs font-bold flex items-center justify-center -ml-2 first:ml-0"
              >
                {initial}
              </div>
            ))}
          </div>
          <p className="text-white/60 text-sm font-medium text-center">
            <span className="text-white font-bold">2,400+ people</span> already
            building better habits
          </p>
        </div>
      </div>
    </section>
  );
}
