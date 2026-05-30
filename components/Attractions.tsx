"use client";

import { useEffect, useRef } from "react";
import { Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

// Background images using Unsplash CDN (no API key needed for display)
// Each image is pre-selected to match the attraction theme.
const ATTRACTION_IMAGES = [
  // Düden Waterfall — tropical waterfall
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=640&q=72&fit=crop",
  // Sandland — sand art / desert dunes
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=640&q=72&fit=crop",
  // Lara Beach — the iconic tropical beach photo
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=640&q=72&fit=crop",
  // Upside Down House — creative/quirky architecture
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=640&q=72&fit=crop",
  // Kaleiçi Old Town — Mediterranean harbour/old town
  "https://images.unsplash.com/photo-1539622106114-e0df812b8b18?w=640&q=72&fit=crop",
];

// Gradient overlays (each card gets its own tint, visible even if image fails to load)
const GRADIENTS = [
  "linear-gradient(160deg, #1e4d8c 0%, #0ea5e9 100%)",
  "linear-gradient(160deg, #78350f 0%, #d97706 100%)",
  "linear-gradient(160deg, #065f46 0%, #10b981 100%)",
  "linear-gradient(160deg, #4c1d95 0%, #8b5cf6 100%)",
  "linear-gradient(160deg, #7f1d1d 0%, #ef4444 100%)",
];

export default function Attractions() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("in-view"), i * 100);
            });
          }
        });
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="attractions"
      className="py-20 sm:py-28 bg-white"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <span className="inline-block bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            {t.attractions.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {t.attractions.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto">
            {t.attractions.description}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {t.attractions.items.map((item, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i % 4} group relative overflow-hidden rounded-2xl cursor-default`}
              style={{ minHeight: 280 }}
            >
              {/* ── Background image layer ── */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{
                  backgroundImage: `url('${ATTRACTION_IMAGES[i]}')`,
                }}
                aria-hidden="true"
              />

              {/* ── Gradient overlay (always visible, acts as image fallback) ── */}
              <div
                className="absolute inset-0"
                style={{
                  background: `${GRADIENTS[i]}`,
                  opacity: 0.55,
                  mixBlendMode: "multiply",
                }}
                aria-hidden="true"
              />

              {/* ── Bottom shadow for text readability ── */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.05) 100%)",
                }}
                aria-hidden="true"
              />

              {/* ── Time badge (top left) ── */}
              <div className="absolute top-4 left-4">
                <div
                  className="inline-flex items-center gap-1.5 text-white text-xs font-bold px-3 py-1.5 rounded-full border border-white/30"
                  style={{ background: "rgba(0,0,0,0.35)", backdropFilter: "blur(6px)" }}
                >
                  <Clock size={10} />
                  {item.time} {t.attractions.minutes}
                </div>
              </div>

              {/* ── Content (bottom) ── */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <h3 className="font-bold text-white text-base sm:text-lg leading-tight mb-1.5">
                  {item.name}
                </h3>
                <p className="text-white/75 text-xs sm:text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
