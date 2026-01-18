"use client";

import React from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { User, Mail, ShieldCheck, LogOut, Send, Loader2 } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = React.useState<{
    _id: string;
    username: string;
    email: string;
    isVerified?: boolean;
  } | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [sendingEmail, setSendingEmail] = React.useState(false); // New state for email loading

  const router = useRouter();

  const logout = async () => {
    try {
      await axios.get("/api/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const sendVerificationEmail = async () => {
    if (!user) return;
    setSendingEmail(true); // Start loading
    try {
      await axios.post("/api/sendemailverify", {
        emailType: "VERIFY",
        userId: user._id,
        email: user.email,
      });
      toast.success("Verification email sent");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setSendingEmail(false); // Stop loading
    }
  };

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("/api/me");
        setUser(response.data);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch user info");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1625] flex items-center justify-center p-4 font-sans text-white">
      {/* Profile Card */}
      <div className="w-full max-w-md bg-[#231f2e] rounded-3xl overflow-hidden shadow-2xl border border-white/5 transition-all duration-300">
        
        {/* Card Header/Banner */}
        <div className="h-24 bg-gradient-to-r from-[#6e54b5] to-[#5d44a0] w-full" />
        
        <div className="px-8 pb-8">
          {/* Avatar Overlay */}
          <div className="flex justify-center -mt-12 mb-6">
            <div className="h-24 w-24 rounded-2xl bg-[#2d2839] border-4 border-[#231f2e] flex items-center justify-center shadow-xl">
              <User className="w-12 h-12 text-purple-400" />
            </div>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tight">User Profile</h1>
            <p className="text-gray-400 text-sm mt-1">Manage your account details</p>
          </div>

          {/* User Data */}
          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-4 bg-[#2d2839]/50 p-4 rounded-2xl border border-white/5">
              <User className="w-5 h-5 text-purple-400" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Username</span>
                <span className="text-sm">{loading ? "..." : user?.username}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-[#2d2839]/50 p-4 rounded-2xl border border-white/5">
              <Mail className="w-5 h-5 text-purple-400" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Email</span>
                <span className="text-sm">{loading ? "..." : user?.email}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-[#2d2839]/50 p-4 rounded-2xl border border-white/5">
              <ShieldCheck className="w-5 h-5 text-purple-400" />
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Verification</span>
                <span className={`text-sm font-medium ${user?.isVerified ? "text-green-400" : "text-yellow-500"}`}>
                  {loading ? "..." : user?.isVerified ? "Verified Account" : "Action Required"}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            {!loading && !user?.isVerified && (
              <button
                onClick={sendVerificationEmail}
                disabled={sendingEmail} // Disable while sending
                className="w-full group flex items-center justify-center gap-2 bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-500 py-4 rounded-xl font-medium transition-all border border-yellow-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sendingEmail ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    Verify Email Now
                  </>
                )}
              </button>
            )}

            <button
              onClick={logout}
              className="w-full flex items-center justify-center gap-2 bg-[#6e54b5] hover:bg-[#5d44a0] text-white py-4 rounded-xl font-medium transition-all shadow-lg shadow-purple-500/10"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Card Footer */}
        <div className="bg-[#2d2839]/30 p-4 text-center border-t border-white/5">
          <p className="text-[10px] text-gray-500 font-mono tracking-tighter uppercase">
            User ID: {user?._id || "fetching..."}
          </p>
        </div>
      </div>
    </div>
  );
}