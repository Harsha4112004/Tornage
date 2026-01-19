"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [disable, setDisable] = useState(true);
  const [isSame, setIsSame] = useState(false);
  const [showPass, setShowPass] = useState(false);

  // Extract token from URL
  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  // Validation Logic
  useEffect(() => {
    setIsSame(password === confirmPassword);
    setDisable(
      !(password.length >= 8 && confirmPassword.length > 0 && token.length > 0)
    );
  }, [password, confirmPassword, token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!isSame) {
      toast.error("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await axios.post("/api/resetpassword", { token, password });
      toast.success("Password reset successfully");
      router.push("/login");
    } catch (error: any) {
      if (error.response?.status === 401) {
        toast.error("New password cannot be same as old password");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a1625] flex items-center justify-center p-4 font-sans text-white">
      {/* Centered Card Container */}
      <div className="w-full max-w-md bg-[#231f2e] rounded-3xl p-8 md:p-12 shadow-2xl border border-white/5">
        
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="bg-purple-500/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="w-8 h-8 text-purple-400" />
          </div>
          <h1 className="text-3xl font-semibold mb-2 text-white">Reset Password</h1>
          <p className="text-gray-400 text-sm">
            Enter your new credentials below to secure your account.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password */}
          <div className="relative">
            <input 
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password (min 8 chars)" 
              className="w-full bg-[#2d2839] text-white border border-transparent rounded-xl px-4 py-4 focus:outline-none focus:ring-1 focus:ring-purple-500 transition placeholder:text-gray-500"
              required
            />
            <button 
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
            >
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {/* Confirm Password */}
          <div>
            <input 
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm New Password" 
              className={`w-full bg-[#2d2839] text-white border rounded-xl px-4 py-4 focus:outline-none transition placeholder:text-gray-500 ${
                !isSame && confirmPassword.length > 0 
                ? "border-red-500/50 focus:border-red-500" 
                : "border-transparent focus:ring-1 focus:ring-purple-500"
              }`}
              required
            />
            {!isSame && confirmPassword.length > 0 && (
              <p className="text-red-400 text-xs italic mt-2 ml-1">
                Passwords do not match
              </p>
            )}
          </div>

          <button 
            type="submit"
            disabled={disable || loading}
            className="w-full bg-[#6e54b5] disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#5d44a0] text-white font-medium py-4 rounded-xl transition shadow-lg shadow-purple-500/20 mt-4"
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link 
            href="/login" 
            className="text-sm text-gray-500 hover:text-purple-400 transition"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}