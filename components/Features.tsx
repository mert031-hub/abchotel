"use client";

import { useEffect, useRef } from "react";
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

type Category = {
  key: string;
  label: string;
  color: string;
  bg: string;
  iconBg: string;
  items: { icon: React.ElementType; key: string }[];
};

function useCategories(t: ReturnType<typeof useLanguage>["t"]): Category[] {
  return [
    {
      key: "kitchen",
      label: t.features.categories.kitchen,
      color: "text-amber-700",
      bg: "bg-amber-50 border-amber-100",
      iconBg: "bg-amber-100",
      items: [
        { icon: Refrigerator, key: "fridge" },
        { icon: Flame, key: "oven" },
        { icon: UtensilsCrossed, key: "cooktop" },
        { icon: WashingMachine, key: "dishwasher" },
      ],
    },
    {
      key: "living",
      label: t.features.categories.living,
      color: "text-blue-700",
      bg: "bg-blue-50 border-blue-100",
      iconBg: "bg-blue-100",
      items: [
        { icon: Maximize, key: "spacious" },
        { icon: Sofa, key: "living_area" },
        { icon: Volume2, key: "sound" },
        { icon: Monitor, key: "desk" },
      ],
    },
    {
      key: "bathroom",
      label: t.features.categories.bathroom,
      color: "text-cyan-700",
      bg: "bg-cyan-50 border-cyan-100",
      iconBg: "bg-cyan-100",
      items: [
        { icon: ShowerHead, key: "shower" },
        { icon: Droplets, key: "shower_head" },
        { icon: Wind, key: "hair_dryer" },
        { icon: Scissors, key: "slippers" },
      ],
    },
    {
      key: "extra",
      label: t.features.categories.extra,
      color: "text-violet-700",
      bg: "bg-violet-50 border-violet-100",
      iconBg: "bg-violet-100",
      items: [
        { icon: WashingMachine, key: "washing" },
        { icon: Shirt, key: "iron" },
        { icon: Snowflake, key: "ac" },
        { icon: Thermometer, key: "hot_water" },
        { icon: Bed, key: "bedding" },
      ],
    },
  ];
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

        {/* Category cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, ci) => (
            <div
              key={cat.key}
              className={`reveal reveal-delay-${ci + 1} border rounded-2xl p-6 hover:shadow-lg transition-all duration-300 group ${cat.bg}`}
            >
              <h3 className={`font-bold text-lg mb-5 ${cat.color}`}>
                {cat.label}
              </h3>
              <ul className="space-y-3">
                {cat.items.map(({ icon: Icon, key }) => (
                  <li key={key} className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 ${cat.iconBg} rounded-lg flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform`}
                    >
                      <Icon size={15} className={cat.color} />
                    </div>
                    <span className="text-slate-700 text-sm font-medium">
                      {t.features.items[key as keyof typeof t.features.items]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
