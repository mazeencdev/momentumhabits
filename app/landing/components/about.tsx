import Image from "next/image";
import AboutButton from "../landingcomps/aboutbutton";

export default function About() {
  return (
    <div
      id="about"
      className="bg-[#F9F7F4] w-full flex flex-col lg:flex-row justify-center items-center py-16 lg:py-0 lg:h-[700px] gap-10 lg:gap-20 px-6 md:px-16 lg:px-28"
    >
      <div className="w-full max-w-[500px] lg:max-w-none lg:w-fit border border-black rounded-xl">
        <Image
          src={"/momentum_progress_matched.svg"}
          alt="progress"
          width={600}
          height={600}
          className="rounded-xl w-full h-auto"
        />
      </div>
      <div className="w-full lg:w-[500px] space-y-5 text-center lg:text-left">
        <h1 className="text-3xl font-bold">
          Built for consistency, not perfection
        </h1>
        <p className="text-sm font-light">
          Most habit trackers expect perfection—miss a day, and everything
          resets. Momentum is built differently. It focuses on helping you stay
          consistent, even when life gets messy. By turning small daily actions
          into steady progress, Momentum makes it easier to keep going and build
          habits that actually last.
        </p>
        <div className="flex justify-center lg:justify-start">
          <AboutButton />
        </div>
      </div>
    </div>
  );
}
