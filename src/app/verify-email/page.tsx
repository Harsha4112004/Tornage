"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

export default function EmailVerificationPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyEmail = async () => {
    try {
      await axios.post("/api/verifyemail", { token });
      setVerified(true);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);

  useEffect(() => {
    if (token) verifyEmail();
  }, [token]);

  return (
    <div className="min-h-screen bg-[#1a1625] flex items-center justify-center p-4 font-sans text-white">
      {/* Centered Card */}
      <div className="w-full max-w-md bg-[#231f2e] rounded-3xl p-8 md:p-12 shadow-2xl border border-white/5 text-center">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold mb-2">Email Verification</h1>
          <p className="text-gray-400 text-sm">
            {verified 
              ? "Account confirmed" 
              : error 
              ? "Verification failed" 
              : "Verifying your credentials..."}
          </p>
        </div>

        {/* Status Feedback Section */}
        <div className="flex flex-col items-center justify-center space-y-6">
          {verified ? (
            <>
              <div className="bg-green-500/10 p-4 rounded-2xl">
                <CheckCircle2 className="w-16 h-16 text-green-500" />
              </div>
              <div className="space-y-2">
                <p className="text-xl font-medium text-white">Success!</p>
                <p className="text-gray-400 text-sm">
                  Your email has been verified. You can now access all features.
                </p>
              </div>
              <Link href="/profile" className="w-full">
                <button className="w-full bg-[#6e54b5] hover:bg-[#5d44a0] text-white font-medium py-4 rounded-xl transition shadow-lg shadow-purple-500/20">
                  Go to Profile
                </button>
              </Link>
            </>
          ) : error ? (
            <>
              <div className="bg-red-500/10 p-4 rounded-2xl">
                <XCircle className="w-16 h-16 text-red-500" />
              </div>
              <div className="space-y-2">
                <p className="text-xl font-medium text-white">Oops!</p>
                <p className="text-gray-400 text-sm">
                  The link is invalid or has expired. Please try signing up again.
                </p>
              </div>
              <Link href="/signup" className="w-full">
                <button className="w-full border border-gray-700 hover:bg-white/5 text-white font-medium py-4 rounded-xl transition">
                  Back to Signup
                </button>
              </Link>
            </>
          ) : (
            <>
              <div className="bg-purple-500/10 p-4 rounded-2xl">
                <Loader2 className="w-16 h-16 text-purple-400 animate-spin" />
              </div>
              <p className="text-gray-400 animate-pulse">
                Please wait while we validate your link...
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-10 pt-6 border-t border-white/5">
          <p className="text-xs text-gray-500">
            AniCompany &copy; 2026. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}