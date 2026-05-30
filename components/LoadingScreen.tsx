"use client";

import { useEffect, useState } from "react";

interface Props {
  visible: boolean;
}

export default function LoadingScreen({ visible }: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center transition-opacity duration-700 ${
        visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      style={{
        zIndex: 9999,
        background:
          "linear-gradient(160deg, #0c3d6b 0%, #1260a8 25%, #0ea5e9 55%, #06b6d4 75%, #0d9488 100%)",
      }}
    >
      {/* Background glow orbs */}
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          top: "15%",
          right: "20%",
          width: 220,
          height: 220,
          background: "rgba(253,224,71,0.12)",
        }}
      />
      <div
        className="absolute rounded-full blur-2xl"
        style={{
          top: "12%",
          right: "22%",
          width: 90,
          height: 90,
          background: "rgba(253,224,71,0.22)",
        }}
      />
      <div
        className="absolute rounded-full blur-3xl"
        style={{
          bottom: "20%",
          left: "10%",
          width: 180,
          height: 180,
          background: "rgba(255,255,255,0.06)",
        }}
      />

      {/* Decorative circles */}
      <div
        className="absolute rounded-full border border-white/10"
        style={{ bottom: 80, left: 40, width: 120, height: 120 }}
      />
      <div
        className="absolute rounded-full border border-white/8"
        style={{ bottom: 40, left: 80, width: 60, height: 60 }}
      />
      <div
        className="absolute rounded-full border border-white/5"
        style={{ top: 50, left: "28%", width: 200, height: 200 }}
      />

      {/* Main content */}
      <div className="relative flex flex-col items-center gap-8 px-6 text-center">
        {/* Sun / logo area */}
        <div className="relative">
          {/* Outer glow ring */}
          <div
            className="absolute inset-0 rounded-full animate-ping"
            style={{ background: "rgba(253,224,71,0.15)", animationDuration: "2.5s" }}
          />
          <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center border border-white/25"
            style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(12px)" }}
          >
            <span className="text-white font-bold text-xl tracking-tight">ABC</span>
          </div>
        </div>

        {/* Name */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 tracking-tight">
            ABC Apart Hotel
          </h1>
          <p className="text-sky-200 text-sm font-medium tracking-[0.2em] uppercase">
            Antalya • Türkiye
          </p>
        </div>

        {/* Loading dots */}
        <div className="flex items-center gap-2.5">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full bg-white/60 animate-bounce"
              style={{ animationDelay: `${i * 0.18}s`, animationDuration: "1.1s" }}
            />
          ))}
        </div>
      </div>

      {/* Wave SVG at bottom */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden" style={{ lineHeight: 0 }}>
        <svg
          viewBox="0 0 1440 100"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full"
          style={{ height: 80 }}
        >
          <path
            d="M0,50 C200,100 400,10 600,55 C800,100 1000,20 1200,60 C1320,80 1400,50 1440,55 L1440,100 L0,100 Z"
            fill="rgba(255,255,255,0.08)"
          />
          <path
            d="M0,70 C300,30 600,90 900,60 C1100,40 1300,75 1440,65 L1440,100 L0,100 Z"
            fill="rgba(255,255,255,0.05)"
          />
        </svg>
      </div>
    </div>
  );
}
