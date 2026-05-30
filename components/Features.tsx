"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  Refrigerator,
  Flame,
  UtensilsCrossed,
  WashingMachine,
  Sofa,
  Volume2,
  Monitor,
  Droplets,
  Wind,
  Shirt,
  Snowflake,
  Thermometer,
  Bed,
  Maximize,
  ShowerHead,
  Scissors,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type CategoryConfig = {
  key: string;
  bgImage: string;
  tintClass: string;          // Tailwind background tint for the overlay
  titleColor: string;
  iconBg: string;
  iconColor: string;
  borderClass: string;
  items: { icon: React.ElementType; key: string }[];
};

function useCategories(t: ReturnType<typeof useLanguage>["t"]): (CategoryConfig & { label: string })[] {
  const configs: CategoryConfig[] = [
    {
      key: "kitchen",
      bgImage: "/images/mutfak1.avif",
      tintClass: "bg-amber-50/80",
      titleColor: "text-amber-800",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-700",
      borderClass: "border-amber-200",
      items: [
        { icon: Refrigerator, key: "fridge" },
        { icon: Flame, key: "oven" },
        { icon: UtensilsCrossed, key: "cooktop" },
        { icon: WashingMachine, key: "dishwasher" },
      ],
    },
    {
      key: "living",
      bgImage: "/images/salon.avif",
      tintClass: "bg-blue-50/80",
      titleColor: "text-blue-800",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-700",
      borderClass: "border-blue-200",
      items: [
        { icon: Maximize, key: "spacious" },
        { icon: Sofa, key: "living_area" },
        { icon: Volume2, key: "sound" },
        { icon: Monitor, key: "desk" },
      ],
    },
    {
      key: "bathroom",
      bgImage: "/images/banyo1.avif",
      tintClass: "bg-cyan-50/80",
      titleColor: "text-cyan-800",
      iconBg: "bg-cyan-100",
      iconColor: "text-cyan-700",
      borderClass: "border-cyan-200",
      items: [
        { icon: ShowerHead, key: "shower" },
        { icon: Droplets, key: "shower_head" },
        { icon: Wind, key: "hair_dryer" },
        { icon: Scissors, key: "slippers" },
      ],
    },
    {
      key: "extra",
      bgImage: "/images/ciftkisilik1.avif",
      tintClass: "bg-violet-50/80",
      titleColor: "text-violet-800",
      iconBg: "bg-violet-100",
      iconColor: "text-violet-700",
      borderClass: "border-violet-200",
      items: [
        { icon: WashingMachine, key: "washing" },
        { icon: Shirt, key: "iron" },
        { icon: Snowflake, key: "ac" },
        { icon: Thermometer, key: "hot_water" },
        { icon: Bed, key: "bedding" },
      ],
    },
  ];

  return configs.map((c) => ({
    ...c,
    label: t.features.categories[c.key as keyof typeof t.features.categories],
  }));
}

export default function Features() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);
  const categories = useCategories(t);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("in-view"), i * 80);
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
      id="features"
      className="py-20 sm:py-28 bg-gradient-to-b from-slate-50 to-white"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="inline-block bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            {t.features.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-5">
            {t.features.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto">
            {t.features.description}
          </p>
        </div>

        {/* Category cards with background images */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, ci) => (
            <div
              key={cat.key}
              className={`reveal reveal-delay-${ci + 1} relative overflow-hidden border ${cat.borderClass} rounded-2xl hover:shadow-xl transition-all duration-300 group`}
            >
              {/* ── Background image (blurred, low-opacity) ── */}
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src={cat.bgImage}
                  alt=""
                  fill
                  className="object-cover scale-110 blur-sm opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  aria-hidden
                />
              </div>

              {/* ── Color tint overlay ── */}
              <div className={`absolute inset-0 ${cat.tintClass}`} aria-hidden />

              {/* ── Content ── */}
              <div className="relative z-10 p-6">
                <h3 className={`font-bold text-lg mb-5 ${cat.titleColor}`}>
                  {cat.label}
                </h3>
                <ul className="space-y-3">
                  {cat.items.map(({ icon: Icon, key }) => (
                    <li key={key} className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 ${cat.iconBg} rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                      >
                        <Icon size={15} className={cat.iconColor} />
                      </div>
                      <span className="text-slate-700 text-sm font-medium">
                        {t.features.items[key as keyof typeof t.features.items]}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
