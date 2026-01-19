"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import { Eye, EyeOff } from "lucide-react";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = useState({ username: "", password: "", email: "" });
  const [disable, setDisable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // --- YOUR VALIDATION LOGIC ---
  useEffect(() => {
    const isUsernameValid = user.username.length >= 6;
    const isPasswordValid = user.password.length >= 8;
    const isEmailValid = user.email.length > 0;

    setDisable(!(isUsernameValid && isPasswordValid && isEmailValid));
  }, [user]);

  const onSignup = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);

  try {
    await axios.post("/api/signup", user);

    toast.success("Verification code sent to your email");
    router.push(`/verify-email?email=${encodeURIComponent(user.email)}`);
  } catch (err: any) {
    if (err.response?.status === 401) {
      toast.error("Username already exists");
    } else if (err.response?.status === 402) {
      toast.error("Email already exists");
    } else {
      toast.error("Signup failed");
    }
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-[#1a1625] flex items-center justify-center p-4 font-sans">
      {/* Main Container */}
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-[#231f2e] rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Left Side: Image Section */}
        <div className="relative w-full md:w-1/2 h-64 md:h-[700px]">
          <img 
            src="/Dune.png" 
            alt="Dune landscape" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#231f2e] via-transparent to-transparent opacity-70" />
          
          <div className="absolute inset-0 p-10 flex flex-col justify-between text-white">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold tracking-tighter">Tornage</span>
              <Link href="/" className="text-sm bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition flex items-center gap-2">
                Back to website <span>→</span>
              </Link>
            </div>
            
            <div className="mb-10">
              <h2 className="text-3xl font-medium leading-tight">
                AI Solutions You Can Trust,<br />For Complex Enterprise Challenges
              </h2>
            </div>
          </div>
        </div>

        {/* Right Side: Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-[#231f2e]">
          <div className="max-w-md w-full mx-auto">
            <h1 className="text-4xl text-white font-semibold mb-2">Create an account</h1>
            <p className="text-gray-400 mb-8 text-sm">
              Already have an account? <Link href="/login" className="text-gray-200 underline underline-offset-4 hover:text-purple-400">Log in</Link>
            </p>

            <form onSubmit={onSignup} className="space-y-4">
              {/* Username Input */}
              <div>
                <input 
                  type="text" 
                  value={user.username}
                  onChange={(e) => setUser({ ...user, username: e.target.value })}
                  placeholder="Username (Min 6 chars)" 
                  className="w-full bg-[#2d2839] text-white border border-transparent rounded-xl px-4 py-4 focus:outline-none focus:ring-1 focus:ring-purple-500 transition placeholder:text-gray-500"
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <input 
                  type="email" 
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  placeholder="Email address" 
                  className="w-full bg-[#2d2839] text-white border border-transparent rounded-xl px-4 py-4 focus:outline-none focus:ring-1 focus:ring-purple-500 transition placeholder:text-gray-500"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  placeholder="Password (Min 8 chars)" 
                  className="w-full bg-[#2d2839] text-white border border-transparent rounded-xl px-4 py-4 focus:outline-none focus:ring-1 focus:ring-purple-500 transition placeholder:text-gray-500"
                  required
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>

              <div className="flex items-center gap-2 py-2">
                <input type="checkbox" id="terms" className="w-4 h-4 rounded accent-purple-600 bg-[#2d2839]" required />
                <label htmlFor="terms" className="text-xs text-gray-400">
                  I agree to the <span className="underline cursor-pointer">Terms & Conditions</span>
                </label>
              </div>

              <button 
                type="submit"
                disabled={disable || loading}
                className="w-full bg-[#6e54b5] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#5d44a0] text-white font-medium py-4 rounded-xl transition shadow-lg shadow-purple-500/10 mt-2"
              >
                {loading ? "Creating Account..." : "Create Account"}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-800"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#231f2e] px-4 text-gray-500 tracking-widest">Or register with</span>
              </div>
            </div>

            {/* Centered Google Button */}
            <div className="flex justify-center">
              <button className="flex items-center justify-center gap-2 border border-gray-800 rounded-xl py-3 px-10 text-white hover:bg-white/5 transition w-full">
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
                <span className="text-sm font-light">Google</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}