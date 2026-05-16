"use client";

import Image from "next/image";
import Link from "next/link";
import LandingButton from "../landingcomps/button";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed z-50 w-full h-16 flex justify-between items-center bg-[#F9F7F4]/80 backdrop-blur-sm border-b border-black/5 px-5 md:px-10 lg:px-20">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src={"/momentum-logo.svg"} alt="logo" width={30} height={30} />
        <h1 className="text-xl font-bold">
          <Link href={"/#hero"} scroll={false}>
            Momentum
          </Link>
        </h1>
      </div>

      {/* Desktop nav links */}
      <div className="hidden md:block">
        <ul className="flex items-center gap-5 font-semibold text-sm">
          <li>
            <Link href={"/#about"} scroll={true}>
              About
            </Link>
          </li>
          <li>
            <Link href={"/#features"}>Features</Link>
          </li>
          <li>
            <Link href={"/#showcase"}>CTA</Link>
          </li>
        </ul>
      </div>

      {/* Desktop right buttons */}
      <div className="hidden md:flex items-center gap-2">
        <Link href={"/login"}>
          <p className="text-sm font-light text-neutral-500">Sign In</p>
        </Link>
        <LandingButton />
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <span
          className={`block h-0.5 w-6 bg-black transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
        />
        <span
          className={`block h-0.5 w-6 bg-black transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
        />
        <span
          className={`block h-0.5 w-6 bg-black transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
        />
      </button>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-16 left-0 w-full bg-[#F9F7F4] border-b border-black/10 flex flex-col px-5 py-5 gap-4 shadow-lg">
          <Link
            href={"/#about"}
            onClick={() => setMenuOpen(false)}
            className="text-sm font-semibold"
          >
            About
          </Link>
          <Link
            href={"/#features"}
            onClick={() => setMenuOpen(false)}
            className="text-sm font-semibold"
          >
            Features
          </Link>
          <Link
            href={"/#showcase"}
            onClick={() => setMenuOpen(false)}
            className="text-sm font-semibold"
          >
            Pricing
          </Link>
          <hr className="border-black/10" />
          <Link
            href={"/login"}
            onClick={() => setMenuOpen(false)}
            className="text-sm text-neutral-500"
          >
            Sign In
          </Link>
          <LandingButton />
        </div>
      )}
    </nav>
  );
}
