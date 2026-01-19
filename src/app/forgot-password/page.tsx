"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);

  // Logic: Disable button if email is empty
  useEffect(() => {
    setDisable(email.length === 0);
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post("/api/sendresetpassword", { emailType: "RESET", email });
      toast.success("Reset link sent to your email");
      setEmail("");
      router.push("/login");
    } catch (error: any) {
      if (error.response?.status === 404) {
        toast.error("Email not registered");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1625] flex items-center justify-center p-4 font-sans">
      {/* Main Container */}
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-[#231f2e] rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Left Side: Image Section (Consistent with Login/Signup) */}
        <div className="relative w-full md:w-1/2 h-64 md:h-[600px]">
          <img 
            src="/Dune.png" 
            alt="Security Background" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#231f2e] via-transparent to-transparent opacity-70" />
          
          <div className="absolute inset-0 p-10 flex flex-col justify-between text-white">
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold tracking-tighter">Tornage</span>
              <Link href="/" className="text-sm bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 hover:bg-white/20 transition">
                Back to website →
              </Link>
            </div>
            
            <div className="mb-10">
              <h2 className="text-3xl font-medium leading-tight">
                Secure Access,<br />Reliable Solutions
              </h2>
            </div>
          </div>
        </div>

        {/* Right Side: Form Section */}
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center bg-[#231f2e]">
          <div className="max-w-md w-full mx-auto text-center md:text-left">
            <h1 className="text-4xl text-white font-semibold mb-2">Forgot Password</h1>
            <p className="text-gray-400 mb-8 text-sm">
              {"Enter your email address and we'll send you a link to reset your password."}
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your registered email" 
                  className="w-full bg-[#2d2839] text-white border border-transparent rounded-xl px-4 py-4 focus:outline-none focus:ring-1 focus:ring-purple-500 transition placeholder:text-gray-500"
                  required
                />
              </div>

              <button 
                type="submit"
                disabled={disable || loading}
                className="w-full bg-[#6e54b5] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#5d44a0] text-white font-medium py-4 rounded-xl transition shadow-lg shadow-purple-500/10"
              >
                {loading ? "Sending Link..." : "Send Reset Link"}
              </button>

              <div className="text-center">
                <Link 
                  href="/login" 
                  className="text-sm text-gray-400 hover:text-purple-400 transition underline underline-offset-4"
                >
                  Return to Login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}