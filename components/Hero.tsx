"use client";

import { useState, useEffect, useRef } from "react";
import { Phone, MapPin, Star, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import LoadingScreen from "@/components/LoadingScreen";

const PHONE = "05062988080";
const WHATSAPP = "905062988080";
const MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=ABC+APART+Antalya";

const WA_ICON = (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export default function Hero() {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loadingDone, setLoadingDone] = useState(false);
  const [contentIn, setContentIn] = useState(false);

  const reveal = () => {
    setLoadingDone(true);
    // Slight delay so the transition feels intentional
    setTimeout(() => setContentIn(true), 150);
  };

  useEffect(() => {
    // Fallback: reveal after 2.5 s if browser stalls before canplay fires
    const t = setTimeout(reveal, 2500);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* ── Video background ── */}
      {/* Place the video src at public/images/hero-video.mp4 */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/salon.avif"
        onCanPlay={reveal}
        onError={reveal}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      >
        <source src="/images/video1.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay for text legibility */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 1,
          background:
            "linear-gradient(105deg, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.15) 100%)",
        }}
      />

      {/* ── Loading screen ── */}
      <LoadingScreen visible={!loadingDone} />

      {/* ── Content ── */}
      <div
        className={`relative w-full max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-20 transition-all duration-1000 ${
          contentIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
        style={{ zIndex: 2 }}
      >
        <div className="max-w-2xl">
          {/* Badge */}
          <div
            className="inline-flex items-center gap-2 text-white/90 text-sm font-medium px-4 py-2 rounded-full mb-6 border border-white/20"
            style={{
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(8px)",
            }}
          >
            <MapPin size={14} />
            {t.hero.badge}
          </div>

          {/* Title */}
          <h1
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.35)" }}
          >
            {t.hero.title}
          </h1>

          {/* Subtitle */}
          <p
            className="text-xl sm:text-2xl font-semibold mb-5"
            style={{ color: "rgba(147,210,255,0.95)" }}
          >
            {t.hero.subtitle}
          </p>

          {/* Description */}
          <p
            className="text-base sm:text-lg leading-relaxed mb-8 max-w-xl"
            style={{ color: "rgba(255,255,255,0.80)" }}
          >
            {t.hero.description}
          </p>

          {/* Trust indicators */}
          <div className="flex flex-wrap gap-3 mb-8">
            {/* Google */}
            <div
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/20"
              style={{
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className={
                      i < 4
                        ? "fill-amber-400 text-amber-400"
                        : "fill-amber-300 text-amber-300"
                    }
                  />
                ))}
              </div>
              <span className="text-white font-bold text-sm">4.5</span>
              <span className="text-white/60 text-xs">
                {t.hero.trust_google}
              </span>
            </div>

            {/* Reviews */}
            <div
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/20"
              style={{
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(8px)",
              }}
            >
              <MessageCircle size={14} className="text-sky-300" />
              <span className="text-white text-sm font-medium">
                {t.hero.trust_reviews}
              </span>
            </div>

            {/* Hotels.com */}
            <div
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/20"
              style={{
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span
                className="text-xs font-bold px-1.5 py-0.5 rounded"
                style={{
                  color: "#6ee7b7",
                  background: "rgba(16,185,129,0.25)",
                }}
              >
                9/10
              </span>
              <span className="text-white/75 text-xs">Hotels.com</span>
            </div>

            {/* Booking */}
            <div
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-white/20"
              style={{
                background: "rgba(255,255,255,0.12)",
                backdropFilter: "blur(8px)",
              }}
            >
              <span
                className="text-xs font-bold px-1.5 py-0.5 rounded"
                style={{
                  color: "#93c5fd",
                  background: "rgba(59,130,246,0.25)",
                }}
              >
                8/10
              </span>
              <span className="text-white/75 text-xs">Booking</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row flex-wrap gap-3">
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-400 text-white font-semibold px-6 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-95"
            >
              {WA_ICON}
              {t.hero.cta_whatsapp}
            </a>

            <a
              href={`tel:${PHONE}`}
              className="inline-flex items-center justify-center gap-2.5 font-semibold px-6 py-4 rounded-xl border border-white/25 transition-all active:scale-95 text-white hover:bg-white/20"
              style={{
                background: "rgba(255,255,255,0.13)",
                backdropFilter: "blur(6px)",
              }}
            >
              <Phone size={18} />
              {t.hero.cta_call}
            </a>

            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 font-semibold px-6 py-4 rounded-xl border border-white/25 transition-all active:scale-95 text-white hover:bg-white/20"
              style={{
                background: "rgba(255,255,255,0.13)",
                backdropFilter: "blur(6px)",
              }}
            >
              <MapPin size={18} />
              {t.hero.cta_directions}
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
        style={{ zIndex: 2 }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1 h-2 bg-white/50 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
