"use client";

type Props = {
  onClick: () => void;
  loading: boolean;
};

export default function SignButton({ onClick, loading }: Props) {
  const handleSignup = async () => {
    console.log("clicked signup");
  };
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className="text-white font-semibold bg-[#2d6a4f] w-full py-3 rounded-xl hover:cursor-pointer hover:bg-neutral-200 duration-150 transition-all"
    >
      {loading ? "Signing up..." : "Sign Up"}
    </button>
  );
}
