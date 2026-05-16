import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--poppins",
  weight: ["300", "600", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Momentum — Build Habits That Stick",
  description:
    "Track your habits, stay consistent, and turn small daily wins into lasting change. Momentum makes habit building effortless.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} h-full`}>
      <body
        className="min-h-full flex flex-col"
        style={{ background: "var(--bg)", color: "var(--text)" }}
      >
        {children}
      </body>
      <script src="https://accounts.google.com/gsi/client" async defer></script>
    </html>
  );
}
