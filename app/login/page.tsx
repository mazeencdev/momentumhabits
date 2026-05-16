"use client";

import Link from "next/link";
import Image from "next/image";
import LogButton from "./components/loginbutton";
import { useState, useEffect, Suspense } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter, useSearchParams } from "next/navigation";

function SignupToast() {
  const searchParams = useSearchParams();
  const status = searchParams.get("signup");
  const msg = searchParams.get("msg");
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    if (!status) return;
    setVisible(true);
    const t = setTimeout(() => dismiss(), 5000);
    return () => clearTimeout(t);
  }, [status]);

  const dismiss = () => {
    setLeaving(true);
    setTimeout(() => setVisible(false), 300);
  };

  if (!visible || !status) return null;

  const isSuccess = status === "success";

  return (
    <div
      style={{
        position: "fixed",
        top: "24px",
        right: "24px",
        zIndex: 9999,
        display: "flex",
        alignItems: "flex-start",
        gap: "12px",
        background: isSuccess ? "#f0fdf4" : "#fef2f2",
        border: `1px solid ${isSuccess ? "#bbf7d0" : "#fecaca"}`,
        borderRadius: "14px",
        padding: "16px 18px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
        maxWidth: "360px",
        width: "calc(100% - 48px)",
        opacity: leaving ? 0 : 1,
        transform: leaving ? "translateX(20px)" : "translateX(0)",
        transition: "opacity 0.3s ease, transform 0.3s ease",
        animation: "slideIn 0.3s ease",
      }}
    >
      <div
        style={{
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          background: isSuccess ? "#dcfce7" : "#fee2e2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {isSuccess ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" />
          </svg>
        )}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: "14px", fontWeight: 700, color: isSuccess ? "#15803d" : "#b91c1c", margin: 0 }}>
          {isSuccess ? "Account created!" : "Signup failed"}
        </p>
        <p style={{ fontSize: "13px", color: isSuccess ? "#166534" : "#991b1b", margin: "3px 0 0", lineHeight: 1.4 }}>
          {isSuccess
            ? "Your account is ready. Sign in to get started."
            : (msg ?? "Something went wrong. Please try again.")}
        </p>
      </div>

      <button
        onClick={dismiss}
        style={{ background: "none", border: "none", cursor: "pointer", padding: "2px", color: isSuccess ? "#16a34a" : "#dc2626", flexShrink: 0, lineHeight: 1 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError(error.message);
      return;
    }
    window.location.href = "/dashboard";
  };

  return (
    <>
      <Suspense>
        <SignupToast />
      </Suspense>

      <div className="w-full min-h-screen bg-[#F9F7F4] text-black flex flex-col p-5 md:p-8">
        {/* Top nav */}
        <div className="w-full flex justify-between items-center mb-6">
          <Link href={"/landing"} className="text-xl font-bold text-[#2D6A4F] flex items-center gap-1">
            <Image src={"/momentum-logo.svg"} alt="momentum_logo" width={25} height={25} />
            Momentum
          </Link>
          <p className="text-sm font-light">
            <Link href={"/signup"}>Sign Up</Link>
          </p>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 py-6">
          {/* Form */}
          <div className="w-full max-w-sm flex flex-col gap-8">
            <div>
              <p className="text-3xl font-bold">Welcome Back</p>
              <p className="text-black/70">Sign in to your account</p>
            </div>

            <form className="w-full flex flex-col gap-4">
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
              {error && (
                <p className="text-red-500 text-sm text-center w-full">{error}</p>
              )}
              <LogButton onClick={handleLogin} />
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
    </>
  );
}
