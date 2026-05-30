"use client";

import { useState, useEffect, useRef } from "react";
import { Phone, MapPin, Star, ChevronDown } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import LoadingScreen from "@/components/LoadingScreen";

const PHONE = "05062988080";
const WHATSAPP = "905062988080";
const MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=ABC+APART+Antalya";

const WA_ICON = (
  <svg viewBox="0 0 24 24" className="w-[18px] h-[18px] shrink-0 fill-current">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Hero() {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const revealed = useRef(false);
  const [loadingDone, setLoadingDone] = useState(false);
  const [contentIn, setContentIn] = useState(false);

  const reveal = () => {
    if (revealed.current) return;
    revealed.current = true;
    setLoadingDone(true);
    setTimeout(() => setContentIn(true), 100);
  };

  useEffect(() => {
    // Hard cap: never wait more than 1.5 s on the loading screen
    const timer = setTimeout(reveal, 1500);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // Dark navy background matches loading screen — prevents any flash before video paints
    <section
      id="home"
      className="hero-section relative flex items-center overflow-hidden"
      style={{ background: "#0d1b2a" }}
    >
      {/* ── Video background ── */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        onCanPlay={reveal}
        onError={reveal}
        className="hero-video absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/images/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay — heavier on left for text readability */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background:
            "linear-gradient(160deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.58) 45%, rgba(0,0,0,0.22) 100%)",
        }}
      />

      {/* ── Loading screen ── */}
      <LoadingScreen visible={!loadingDone} />

      {/* ── Content ── */}
      <div
        className={`relative w-full max-w-7xl mx-auto px-4 sm:px-6 pt-20 pb-28 sm:pt-28 sm:pb-20 transition-all duration-700 ${
          contentIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ zIndex: 2 }}
      >
        <div className="max-w-2xl">

          {/* ── Location badge ── */}
          <div
            className="inline-flex items-center gap-1.5 text-white/85 text-xs sm:text-sm font-medium px-3 py-1.5 sm:px-4 sm:py-2 rounded-full mb-4 sm:mb-6 border border-white/20"
            style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(8px)" }}
          >
            <MapPin size={12} className="shrink-0" />
            {t.hero.badge}
          </div>

          {/* ── Title ── */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-3 sm:mb-4"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.45)" }}
          >
            {t.hero.title}
          </h1>

          {/* ── Subtitle ── */}
          <p
            className="text-lg sm:text-2xl font-semibold mb-3 sm:mb-5 leading-snug"
            style={{ color: "rgba(147,210,255,0.95)" }}
          >
            {t.hero.subtitle}
          </p>

          {/* ── Description — 2 lines on mobile, full on desktop ── */}
          <p
            className="text-sm sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-xl line-clamp-2 sm:line-clamp-none"
            style={{ color: "rgba(255,255,255,0.78)" }}
          >
            {t.hero.description}
          </p>

          {/* ── CTA buttons ── */}
          <div className="flex gap-3 mb-5 sm:mb-8">
            {/* WhatsApp — primary */}
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-white font-semibold px-4 py-3.5 sm:px-6 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95 text-sm sm:text-base"
            >
              {WA_ICON}
              <span className="truncate">{t.hero.cta_whatsapp}</span>
            </a>

            {/* Call */}
            <a
              href={`tel:${PHONE}`}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 font-semibold px-4 py-3.5 sm:px-6 sm:py-4 rounded-xl border border-white/25 transition-all active:scale-95 text-white hover:bg-white/20 text-sm sm:text-base"
              style={{ background: "rgba(255,255,255,0.13)", backdropFilter: "blur(6px)" }}
            >
              <Phone size={16} className="shrink-0" />
              <span className="truncate">{t.hero.cta_call}</span>
            </a>

            {/* Directions — hidden on mobile (available in bottom bar) */}
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center justify-center gap-2 font-semibold px-6 py-4 rounded-xl border border-white/25 transition-all active:scale-95 text-white hover:bg-white/20"
              style={{ background: "rgba(255,255,255,0.13)", backdropFilter: "blur(6px)" }}
            >
              <MapPin size={18} />
              {t.hero.cta_directions}
            </a>
          </div>

          {/* ── Trust indicators ── */}
          {/* Mobile: compact single row */}
          <div className="flex items-center gap-2 flex-wrap sm:hidden">
            <div
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/15 text-xs"
              style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(8px)" }}
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={9} className={i < 4 ? "fill-amber-400 text-amber-400" : "fill-amber-300 text-amber-300"} />
                ))}
              </div>
              <span className="text-white font-bold">4.5</span>
              <span className="text-white/50">Google</span>
            </div>
            <div
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/15 text-xs"
              style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(8px)" }}
            >
              <span className="text-emerald-300 font-bold">9/10</span>
              <span className="text-white/55">Hotels.com</span>
            </div>
            <div
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/15 text-xs"
              style={{ background: "rgba(255,255,255,0.10)", backdropFilter: "blur(8px)" }}
            >
              <span className="text-sky-300 font-bold">8/10</span>
              <span className="text-white/55">Booking</span>
            </div>
          </div>

          {/* Desktop: full trust badges */}
          <div className="hidden sm:flex flex-wrap gap-3">
            <div
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20"
              style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} className={i < 4 ? "fill-amber-400 text-amber-400" : "fill-amber-300 text-amber-300"} />
                ))}
              </div>
              <span className="text-white font-bold text-sm">4.5</span>
              <span className="text-white/60 text-xs">{t.hero.trust_google}</span>
            </div>
            <div
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/20"
              style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}
            >
              <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ color: "#6ee7b7", background: "rgba(16,185,129,0.25)" }}>9/10</span>
              <span className="text-white/75 text-xs">Hotels.com</span>
            </div>
            <div
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/20"
              style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)" }}
            >
              <span className="text-xs font-bold px-1.5 py-0.5 rounded" style={{ color: "#93c5fd", background: "rgba(59,130,246,0.25)" }}>8/10</span>
              <span className="text-white/75 text-xs">Booking</span>
            </div>
          </div>

        </div>
      </div>

      {/* ── Scroll cue ── */}
      <div
        className="absolute bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        style={{ zIndex: 2 }}
      >
        <span className="text-white/30 text-xs font-medium tracking-widest uppercase hidden sm:block">scroll</span>
        <ChevronDown size={22} className="text-white/35 animate-bounce" />
      </div>
    </section>
  );
}
