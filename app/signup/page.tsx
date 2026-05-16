"use client";

import Link from "next/link";
import Image from "next/image";
import SignButton from "./components/Signbutton";
import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: name } },
      });

      if (error) {
        router.push(`/login?signup=error&msg=${encodeURIComponent(error.message)}`);
        return;
      }

      setName("");
      setPassword("");
      setEmail("");
      router.push("/login?signup=success");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F9F7F4] text-black flex flex-col p-5 md:p-8">
      {/* Top nav */}
      <div className="w-full flex justify-between items-center mb-6">
        <Link href={"/landing"} className="text-xl font-bold text-[#2D6A4F] flex items-center gap-1">
          <Image src={"/momentum-logo.svg"} alt="momentum_logo" width={25} height={25} />
          Momentum
        </Link>
        <p className="text-sm font-light">
          <Link href="/login">Log In</Link>
        </p>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 py-6">
        {/* Form */}
        <div className="w-full max-w-sm flex flex-col gap-8">
          <div>
            <p className="text-3xl font-bold">
              Join <span className="text-[#2D6A4F]">Momentum</span>
            </p>
            <p className="text-black/70">Create your account to get started</p>
          </div>

          <form className="w-full flex flex-col gap-4">
            <div className="w-full flex flex-col">
              <label className="text-lg font-bold">Name</label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter your name"
                className="border border-black rounded-lg py-2 px-3 placeholder:text-sm w-full"
              />
            </div>
            <div className="w-full flex flex-col">
              <label className="text-lg font-bold">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="border border-black rounded-lg py-2 px-3 placeholder:text-sm w-full"
              />
            </div>
            <div className="w-full flex flex-col">
              <label className="text-lg font-bold">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Enter your password"
                className="border border-black rounded-lg py-2 px-3 placeholder:text-sm w-full"
              />
            </div>
            <SignButton onClick={handleSignup} loading={loading} />
          </form>
        </div>

        {/* Promo image — hidden on small screens */}
        <div className="hidden lg:block">
          <Image
            src={"/momentum-promo.svg"}
            alt="momentum_promo_pic"
            width={500}
            height={500}
            className="rounded-4xl"
          />
        </div>
      </div>
    </div>
  );
}
