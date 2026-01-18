"use client";

import Link from "next/link";
import { ArrowRight, Bot, Shield, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#1a1625] text-white font-sans">
      {/* Navbar */}
      <header className="border-b border-white/5 bg-[#1a1625]/80 backdrop-blur-md sticky top-0 z-50">
        <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 py-5">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold tracking-tighter">Tornage</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link href="#" className="hover:text-purple-400 transition">Solutions</Link>
            <Link href="#" className="hover:text-purple-400 transition">Technology</Link>
            <Link href="#" className="hover:text-purple-400 transition">About</Link>
          </div>
          

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-300 hover:text-white transition"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="h-10 px-6 rounded-full bg-[#6e54b5] text-white text-sm font-medium hover:bg-[#5d44a0] transition flex items-center shadow-lg shadow-purple-500/20"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 text-center overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full -z-10" />
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
          AI Solutions For Complex <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">
            Enterprise Challenges
          </span>
        </h1>
        <p className="mx-auto mb-10 max-w-2xl text-lg text-gray-400 leading-relaxed">
          Scale your business with our trusted AI framework. Built for security, 
          efficiency, and seamless enterprise integration.
        </p>

      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="text-left mb-16">
          <h2 className="text-3xl font-bold mb-4">Engineered for Excellence</h2>
          <div className="w-20 h-1 bg-[#6e54b5] rounded-full" />
        </div>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <FeatureCard 
            icon={<Bot className="text-purple-400" />}
            title="Intelligent Automation"
            desc="Streamline workflows with AI that learns and adapts to your specific business logic."
          />
          <FeatureCard 
            icon={<Shield className="text-purple-400" />}
            title="Enterprise Security"
            desc="Bank-grade encryption and protocol standards to keep your data protected 24/7."
          />
          <FeatureCard 
            icon={<Zap className="text-purple-400" />}
            title="Instant Integration"
            desc="Connect with your existing tech stack in minutes using our robust API endpoints."
          />
        </div>
      </section>

      {/* Product Preview Card */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="bg-[#231f2e] rounded-[2rem] border border-white/5 p-4 md:p-8 shadow-3xl">
          <div className="flex items-center gap-2 mb-6 px-4">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          <div className="h-80 md:h-[400px] w-full rounded-xl bg-[#1a1625] border border-white/5 flex items-center justify-center">
            <p className="text-gray-500 font-mono text-sm tracking-widest uppercase">Dashboard Preview Content</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="bg-gradient-to-b from-[#2d2839] to-[#231f2e] rounded-3xl p-12 text-center border border-white/10">
          <h2 className="text-4xl font-bold mb-6">Ready to transform your business?</h2>
          <p className="text-gray-400 mb-10 max-w-lg mx-auto">
            Build next-generation applications with AniCompany’s AI-powered platform
          </p>
          <Link href="/signup" className="inline-flex h-14 pt-4 px-10 rounded-xl bg-white text-[#1a1625] font-bold hover:bg-gray-200 transition">
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#1a1625]">
        <div className="mx-auto max-w-7xl px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold tracking-tighter">AniCompany</div>
          <div className="text-sm text-gray-500">
            © 2026 AniCompany Inc. All rights reserved.
          </div>
          <div className="flex gap-6 text-sm text-gray-400">
            <Link href="#" className="hover:text-white transition">Privacy</Link>
            <Link href="#" className="hover:text-white transition">Terms</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#231f2e] p-8 hover:border-purple-500/30 transition-all group">
      <div className="mb-6 h-12 w-12 rounded-xl bg-[#2d2839] flex items-center justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}