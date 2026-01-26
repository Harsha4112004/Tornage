import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tornage",
  description: "Provide Ai Toolkits",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ✅ Puter must load BEFORE React uses it */}
        <Script
          src="https://js.puter.com/v2/"
          strategy="beforeInteractive"
        />

        {children}

        {/* ✅ Razorpay Script (after UI is ready) */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />

        {/* ✅ Toasts */}
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
