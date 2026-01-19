"use client";

import { useState, useRef, useEffect, ChangeEvent, FormEvent } from "react";
import { AlertCircle, CheckCircle2, ArrowLeft, RotateCcw } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const email = searchParams.get("email") || "";

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(30);
  const [verified, setVerified] = useState(false);

  /* Countdown */
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  /* Focus first input */
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const val = e.target.value;
    if (!/^\d?$/.test(val)) return;

    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    setError(null);

    if (val && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const code = otp.join("");
    if (code.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.post("/api/verifyemail", { email, otp: code });
      setSuccess("Email verified successfully!");
      setVerified(true);
      setTimeout(() => router.push("/login"), 2000);
    } catch (err: any) {
      setError(err.response?.data?.error || "Invalid OTP");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setResendLoading(true);
    setError(null);

    try {
      await axios.post("/api/sendemailverify", { email, emailType: "VERIFY" });
      setCountdown(30);
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } catch {
      setError("Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  const allFilled = otp.every(Boolean);

  return (
    <div className="min-h-screen bg-[#1a1625] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#231f2e] rounded-3xl p-8 shadow-2xl">

        {/* Header */}
        <div className="mb-8">
          <Link
            href="/signup"
            className="inline-flex items-center text-gray-400 hover:text-purple-400 transition mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to signup
          </Link>

          <h1 className="text-3xl text-white font-semibold mb-2">
            Verify your email
          </h1>
          <p className="text-gray-400 text-sm">
            Enter the 6-digit code sent to
          </p>
          <p className="text-gray-200 font-medium mt-1">{email}</p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 text-red-400 flex gap-2">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-xl bg-green-500/10 text-green-400 flex gap-2">
            <CheckCircle2 className="w-5 h-5" />
            {success}
          </div>
        )}

        {/* OTP Inputs */}
        <div className="flex justify-between gap-3 mb-6">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => {
                inputRefs.current[i] = el;
              }}
              value={digit}
              maxLength={1}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              disabled={loading || verified}
              className="w-12 h-14 text-center text-xl font-semibold bg-[#2d2839] text-white rounded-xl focus:outline-none focus:ring-1 focus:ring-purple-500"
            />
          ))}
        </div>

        {/* Resend */}
        <div className="text-center text-sm mb-6">
          {countdown > 0 ? (
            <p className="text-gray-400">
              Resend OTP in <span className="text-gray-200">{countdown}s</span>
            </p>
          ) : (
            <button
              onClick={handleResendOTP}
              disabled={resendLoading}
              className="text-gray-400 hover:text-purple-400 transition"
            >
              <RotateCcw className="inline w-4 h-4 mr-1" />
              {resendLoading ? "Sending..." : "Resend OTP"}
            </button>
          )}
        </div>

        {/* Verify Button */}
        <button
          onClick={handleVerify}
          disabled={!allFilled || loading || verified}
          className="w-full bg-[#6e54b5] hover:bg-[#5d44a0] disabled:opacity-50 text-white font-medium py-4 rounded-xl transition"
        >
          {verified ? "Verified!" : loading ? "Verifying..." : "Verify Email"}
        </button>
      </div>
    </div>
  );
}
