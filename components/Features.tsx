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
  gradient: string;   // CSS gradient for text legibility overlay
  iconBg: string;
  iconColor: string;
  checkColor: string;
  items: { icon: React.ElementType; key: string }[];
};

const CONFIGS: CategoryConfig[] = [
  {
    key: "kitchen",
    bgImage: "/images/mutfak1.avif",
    gradient: "linear-gradient(to top, rgba(120,53,15,0.75) 0%, rgba(0,0,0,0.15) 100%)",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700",
    checkColor: "text-amber-600",
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
    gradient: "linear-gradient(to top, rgba(30,58,138,0.75) 0%, rgba(0,0,0,0.15) 100%)",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700",
    checkColor: "text-blue-600",
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
    gradient: "linear-gradient(to top, rgba(14,116,144,0.75) 0%, rgba(0,0,0,0.15) 100%)",
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-700",
    checkColor: "text-cyan-600",
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
    gradient: "linear-gradient(to top, rgba(76,29,149,0.75) 0%, rgba(0,0,0,0.15) 100%)",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-700",
    checkColor: "text-violet-600",
    items: [
      { icon: WashingMachine, key: "washing" },
      { icon: Shirt, key: "iron" },
      { icon: Snowflake, key: "ac" },
      { icon: Thermometer, key: "hot_water" },
      { icon: Bed, key: "bedding" },
    ],
  },
];

export default function Features() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const catLabels = t.features.categories;

  return (
    <section
      id="features"
      className="py-20 sm:py-28"
      style={{ background: "linear-gradient(to bottom, #f5f2ec, #fdfcf8)" }}
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <span className="inline-block bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            {t.features.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {t.features.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto">
            {t.features.description}
          </p>
        </div>

        {/* Cards: image-header + feature-list */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CONFIGS.map((cat, ci) => {
            const label = catLabels[cat.key as keyof typeof catLabels];
            return (
              <div
                key={cat.key}
                className={`reveal reveal-delay-${ci + 1} group flex flex-col rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
              >
                {/* ── Image header ── */}
                <div className="relative h-44 sm:h-48 shrink-0 overflow-hidden">
                  <Image
                    src={cat.bgImage}
                    alt={label}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Gradient overlay for title legibility */}
                  <div
                    className="absolute inset-0"
                    style={{ background: cat.gradient }}
                    aria-hidden
                  />
                  {/* Category title */}
                  <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 pt-8">
                    <h3 className="font-bold text-lg text-white">
                      {label}
                    </h3>
                  </div>
                </div>

                {/* ── Feature list ── */}
                <div className="flex-1 bg-white p-5">
                  <ul className="space-y-3">
                    {cat.items.map(({ icon: Icon, key }) => (
                      <li key={key} className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 ${cat.iconBg} rounded-lg flex items-center justify-center shrink-0`}
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
            );
          })}
        </div>
      </div>
    </section>
  );
}
