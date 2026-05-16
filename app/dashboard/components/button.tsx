"use client";

type Variant = "primary" | "secondary" | "full";
type Side = "sm" | "md" | "lg";

const variantClasses: Record<Variant, string> = {
  primary: "bg-[#2d6b4f] text-white hover:bg-[#2d6b4f]/80",
  secondary: "bg-transparent border border-black/40 hover:bg-[#2d7b4f]/70 text-black",
  full: "bg-[#2d6b4f] text-white hover:bg-[#2d6b4f]/80 w-full",
};

const sideClasses: Record<Side, string> = {
  sm: "px-3 py-1 text-sm",
  md: "px-4 py-2",
  lg: "px-6 py-3 text-lg",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  side?: Side;
}

export default function Button({ children, variant = "primary", side = "md", className = "", ...props }: ButtonProps) {
  return (
    <button
      className={`rounded-md transition-all duration-200 w-fit h-fit ${variantClasses[variant]} ${sideClasses[side]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
