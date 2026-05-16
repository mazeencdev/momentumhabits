import LandingButton from "../landingcomps/button";
import Image from "next/image";

export default function Hero() {
  return (
    <div
      id="hero"
      className="w-full flex flex-col lg:flex-row justify-center items-center min-h-[calc(100vh-64px)] gap-10 lg:gap-20 bg-[#F9F7F4] px-6 md:px-16 lg:px-28 pt-20 lg:pt-0 pb-10 lg:pb-0"
    >
      <div className="flex flex-col w-full lg:w-[500px] gap-5 text-center lg:text-left items-center lg:items-start">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Build momentum, one day at a time.
        </h1>
        <p className="text-sm font-light max-w-sm">
          Track your habits, stay consistent, and turn small wins into lasting
          change—all in one place.
        </p>
        <LandingButton />
        <div className="flex items-center gap-8 md:gap-10">
          <div>
            <h1 className="font-bold text-2xl">5K+</h1>
            <p className="font-light text-[10px]">ON A DAILY STREAK</p>
          </div>
          <div>
            <h1 className="font-bold text-2xl">85%</h1>
            <p className="font-light text-[10px]">CONSISTENCY RATE</p>
          </div>
          <div>
            <h1 className="font-bold text-2xl">150+</h1>
            <p className="font-light text-[10px]">HABITS COMPLETED</p>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[600px] flex justify-center shrink-0">
        <div className="w-full border-black border rounded-xl animate-[smallBounce_1.5s_ease-in-out_infinite] shadow-black shadow-2xl">
          <Image
            src={"/dashboard-preview.svg"}
            alt="dashboard"
            width={600}
            height={600}
            className="rounded-xl w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
