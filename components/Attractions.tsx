"use client";

import { useEffect, useRef } from "react";
import { Clock, Waves, Palmtree, Camera, Mountain, Building2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const ICONS = [Waves, Camera, Palmtree, Mountain, Building2];

const COLORS = [
  {
    bg: "bg-blue-50",
    border: "border-blue-100",
    iconBg: "bg-blue-100",
    icon: "text-blue-600",
    badge: "bg-blue-600 text-white",
    hover: "hover:border-blue-300 hover:shadow-blue-100",
  },
  {
    bg: "bg-amber-50",
    border: "border-amber-100",
    iconBg: "bg-amber-100",
    icon: "text-amber-600",
    badge: "bg-amber-500 text-white",
    hover: "hover:border-amber-300 hover:shadow-amber-100",
  },
  {
    bg: "bg-emerald-50",
    border: "border-emerald-100",
    iconBg: "bg-emerald-100",
    icon: "text-emerald-600",
    badge: "bg-emerald-600 text-white",
    hover: "hover:border-emerald-300 hover:shadow-emerald-100",
  },
  {
    bg: "bg-violet-50",
    border: "border-violet-100",
    iconBg: "bg-violet-100",
    icon: "text-violet-600",
    badge: "bg-violet-600 text-white",
    hover: "hover:border-violet-300 hover:shadow-violet-100",
  },
  {
    bg: "bg-rose-50",
    border: "border-rose-100",
    iconBg: "bg-rose-100",
    icon: "text-rose-600",
    badge: "bg-rose-600 text-white",
    hover: "hover:border-rose-300 hover:shadow-rose-100",
  },
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
      { threshold: 0.1 }
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
        <div className="text-center mb-16 reveal">
          <span className="inline-block bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            {t.attractions.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-5">
            {t.attractions.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto">
            {t.attractions.description}
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {t.attractions.items.map((item, i) => {
            const Icon = ICONS[i % ICONS.length];
            const color = COLORS[i % COLORS.length];
            return (
              <div
                key={i}
                className={`reveal reveal-delay-${i % 4} flex flex-col rounded-2xl border p-5 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-default group ${color.bg} ${color.border} ${color.hover}`}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 ${color.iconBg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon size={22} className={color.icon} />
                </div>

                {/* Time badge */}
                <div className={`inline-flex items-center gap-1.5 ${color.badge} text-xs font-bold px-3 py-1 rounded-full mb-3 self-start`}>
                  <Clock size={10} />
                  {item.time} {t.attractions.minutes}
                </div>

                {/* Content */}
                <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-tight mb-2">
                  {item.name}
                </h3>
                <p className="text-slate-500 text-xs sm:text-sm leading-relaxed flex-1">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
