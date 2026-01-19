"use client";

import Image from "next/image";
import { Check, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-[#1a1625] text-white px-6 py-8">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-2xl font-bold">AI TOOLKITS</h1>
        <p className="text-gray-400 text-sm">
          AI Solutions For Complex Challenges
        </p>
      </header>

      {/* Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CourseCard
          image="/Ai_Automate.png"
          title="Student Toolkit"
          features={[
            "AI-powered ATS Analyzer to boost your resume shortlisting",
            "Smart AI Resume Optimizer tailored for modern hiring systems",
            "Daily curated job updates delivered straight to your inbox",
          ]}
        />
      </section>
    </main>
  );
}

/* ================= TOOLKIT CARD ================= */

function CourseCard({
  image,
  title,
  features,
}: {
  image: string;
  title: string;
  features: string[];
}) {
  const router = useRouter();

  const [hasPurchased, setHasPurchased] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  /* ✅ CHECK PURCHASE STATUS */
  useEffect(() => {
    let isMounted = true;

    setIsChecking(true);

    fetch(`/api/purchase/status?toolkit=${encodeURIComponent(title)}`)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) setHasPurchased(Boolean(data?.purchased));
      })
      .catch(() => {
        if (isMounted) setHasPurchased(false);
      })
      .finally(() => {
        if (isMounted) setIsChecking(false);
      });

    return () => {
      isMounted = false;
    };
  }, [title]);

  /* ✅ RAZORPAY BUY HANDLER */
  const handleBuy = () => {
    const options = {
      key: "rzp_test_1DP5mmOlF5G5ag",
      amount: 500 * 100,
      currency: "INR",
      name: "AI Toolkits",
      description: title,
      image: "/Ai_Automate.png",

      handler: async function () {
        await fetch("/api/purchase/confirm", {
          method: "POST",
          body: JSON.stringify({ toolkitTitle: title }),
        });

        setHasPurchased(true);
      },

      prefill: {
        name: "Test User",
        email: "test@example.com",
        contact: "9999999999",
      },

      theme: {
        color: "#6e54b5",
      },
    };

    const razorpay = new (window as any).Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="rounded-lg border border-white/5 bg-[#231f2e] overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative h-60 bg-black/40">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3 flex-1">
        <h3 className="text-xl text-center font-semibold">{title}</h3>

        <div className="mt-2 space-y-2">
          {features.map((f) => (
            <div
              key={f}
              className="flex items-start gap-2 text-sm text-gray-300"
            >
              <Check className="w-3.5 h-3.5 text-purple-400 mt-[1px]" />
              <span className="leading-snug">{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 pb-4 flex flex-col gap-2">
        {isChecking ? (
          <>
            <div className="w-full h-10 rounded-md bg-white/10 animate-pulse" />
            <div className="w-full h-10 rounded-md bg-white/5 animate-pulse" />
          </>
        ) : hasPurchased ? (
          <button
            onClick={() => router.push("/toolkits/student/use")}
            className="w-full h-10 rounded-md bg-purple-400 hover:bg-purple-500 transition text-md font-medium"
          >
            Use Toolkit
          </button>
        ) : (
          <>
            <button
              onClick={handleBuy}
              type="button"
              className="group relative w-full h-10 rounded-md bg-gradient-to-r from-[#6e54b5] via-[#7d5fc9] to-[#6e54b5] transition-all duration-300 flex items-center justify-center gap-2 text-md font-medium overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-violet-500 to-purple-500 opacity-30 animate-gradient-shift" />
              <span className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-violet-500 to-purple-500 rounded-lg blur opacity-70 animate-pulse-slow" />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />

              <span className="relative z-10 flex items-center justify-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Buy
              </span>
            </button>

            <button
              onClick={() => router.push("/toolkits/student")}
              className="w-full h-10 rounded-md border border-white/10 hover:border-purple-500/40 hover:bg-[#1a1625] transition text-md"
            >
              More Details
            </button>
          </>
        )}
      </div>
    </div>
  );
}
