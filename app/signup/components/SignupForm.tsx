"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();
  const [name,     setName]     = useState("");
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setError("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    router.push("/dashboard");
  }

  const strength =
    password.length === 0 ? 0
    : password.length < 6  ? 1
    : password.length < 10 ? 2
    : 3;

  const strengthColors = ["transparent", "#F87171", "#FBBF24", "#34D399"];
  const strengthLabels = ["", "Weak", "Fair", "Strong"];

  return (
    <div
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        borderRadius: "24px",
        padding: "44px 40px",
        width: "420px",
        boxShadow: "0 40px 80px rgba(0,0,0,0.5), 0 0 60px rgba(124,58,237,0.08)",
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "32px",
        }}
      >
        <div
          style={{
            width: "38px",
            height: "38px",
            background: "linear-gradient(135deg, #7C3AED, #A855F7)",
            borderRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
            boxShadow: "0 4px 16px rgba(124,58,237,0.45)",
          }}
        >
          ⚡
        </div>
        <span
          style={{
            fontWeight: 700,
            fontSize: "18px",
            letterSpacing: "-0.03em",
            color: "var(--text)",
          }}
        >
          Momentum
        </span>
      </div>

      {/* Headings */}
      <h1
        style={{
          fontSize: "24px",
          fontWeight: 800,
          letterSpacing: "-0.02em",
          marginBottom: "6px",
          textAlign: "center",
        }}
      >
        Create your account
      </h1>
      <p
        style={{
          fontSize: "14px",
          color: "var(--text-2)",
          textAlign: "center",
          marginBottom: "32px",
        }}
      >
        Start building habits that actually stick
      </p>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "18px" }}
      >
        {/* Name */}
        <div>
          <label
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--text-2)",
              display: "block",
              marginBottom: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Full Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            autoComplete="name"
            style={{
              width: "100%",
              padding: "12px 14px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              color: "var(--text)",
              fontSize: "14px",
              outline: "none",
              fontFamily: "inherit",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) =>
              (e.target.style.borderColor = "rgba(124,58,237,0.55)")
            }
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
        </div>

        {/* Email */}
        <div>
          <label
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--text-2)",
              display: "block",
              marginBottom: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Email address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
            style={{
              width: "100%",
              padding: "12px 14px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              color: "var(--text)",
              fontSize: "14px",
              outline: "none",
              fontFamily: "inherit",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) =>
              (e.target.style.borderColor = "rgba(124,58,237,0.55)")
            }
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
        </div>

        {/* Password */}
        <div>
          <label
            style={{
              fontSize: "12px",
              fontWeight: 600,
              color: "var(--text-2)",
              display: "block",
              marginBottom: "8px",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Min. 8 characters"
            autoComplete="new-password"
            style={{
              width: "100%",
              padding: "12px 14px",
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              color: "var(--text)",
              fontSize: "14px",
              outline: "none",
              fontFamily: "inherit",
              transition: "border-color 0.2s",
            }}
            onFocus={(e) =>
              (e.target.style.borderColor = "rgba(124,58,237,0.55)")
            }
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
          {/* Strength meter */}
          {password.length > 0 && (
            <div style={{ marginTop: "8px" }}>
              <div style={{ display: "flex", gap: "4px" }}>
                {[1, 2, 3].map((level) => (
                  <div
                    key={level}
                    style={{
                      flex: 1,
                      height: "3px",
                      borderRadius: "99px",
                      background:
                        level <= strength
                          ? strengthColors[strength]
                          : "var(--border)",
                      transition: "background 0.3s",
                    }}
                  />
                ))}
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: strengthColors[strength],
                  marginTop: "4px",
                  fontWeight: 600,
                }}
              >
                {strengthLabels[strength]}
              </div>
            </div>
          )}
        </div>

        {/* Error */}
        {error && (
          <div
            style={{
              background: "var(--red-dim)",
              border: "1px solid rgba(248,113,113,0.3)",
              borderRadius: "8px",
              padding: "10px 14px",
              fontSize: "13px",
              color: "var(--red)",
            }}
          >
            {error}
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="btn-primary"
          style={{ justifyContent: "center", marginTop: "4px", fontSize: "15px", padding: "13px" }}
          disabled={loading}
        >
          {loading ? (
            <span style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "16px",
                  height: "16px",
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTopColor: "white",
                  borderRadius: "50%",
                  display: "inline-block",
                  animation: "spin 0.7s linear infinite",
                }}
              />
              Creating account…
            </span>
          ) : (
            "Create account"
          )}
        </button>
      </form>

      {/* Divider */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          margin: "24px 0",
        }}
      >
        <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
        <span style={{ fontSize: "12px", color: "var(--text-3)", fontWeight: 600 }}>
          OR
        </span>
        <div style={{ flex: 1, height: "1px", background: "var(--border)" }} />
      </div>

      {/* Google SSO placeholder */}
      <button
        type="button"
        className="btn-secondary"
        style={{ width: "100%", justifyContent: "center", gap: "10px" }}
        onClick={() => router.push("/dashboard")}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908C16.658 14.3 17.64 11.927 17.64 9.2z" fill="#4285F4" />
          <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" fill="#34A853" />
          <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
          <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 6.29C4.672 4.163 6.656 3.58 9 3.58z" fill="#EA4335" />
        </svg>
        Continue with Google
      </button>

      {/* Terms note */}
      <p
        style={{
          textAlign: "center",
          fontSize: "11px",
          color: "var(--text-3)",
          marginTop: "16px",
          lineHeight: 1.5,
        }}
      >
        By signing up you agree to our{" "}
        <a href="#" style={{ color: "var(--text-2)", textDecoration: "none" }}>
          Terms
        </a>{" "}
        and{" "}
        <a href="#" style={{ color: "var(--text-2)", textDecoration: "none" }}>
          Privacy Policy
        </a>
        .
      </p>

      {/* Switch to login */}
      <p
        style={{
          textAlign: "center",
          fontSize: "13px",
          color: "var(--text-2)",
          marginTop: "16px",
        }}
      >
        Already have an account?{" "}
        <Link
          href="/login"
          style={{
            color: "var(--accent-light)",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Sign in
        </Link>
      </p>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
