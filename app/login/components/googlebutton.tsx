import { FcGoogle } from "react-icons/fc";
import { supabase } from "@/lib/supabase";

export default function GoogleSignInButton() {
  const handleGoogleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/dashboard",
      },
    });
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="flex items-center justify-center gap-3 px-5 py-3 bg-[#F9F7F4] text-black rounded-xl transition-all duration-200 w-full hover:cursor-pointer hover:bg-neutral-300"
    >
      <FcGoogle size={20} />
      <span className="font-medium">Google</span>
    </button>
  );
}
