"use client";

import { useEffect, useRef } from "react";
import { Leaf, Shield, Users, Home, MapPin, Calendar } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

const ICONS = [Leaf, Shield, Users, Home, MapPin, Calendar];

export default function About() {
  const { t, lang } = useLanguage();
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20 sm:py-28 bg-white" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-16 reveal">
          <span className="inline-block bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            {t.about.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-5">
            {t.about.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t.about.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Image collage */}
          <div className="relative reveal">
            <div className="grid grid-cols-2 gap-3">
              <div className="relative rounded-2xl overflow-hidden aspect-square shadow-md">
                <Image
                  src="/images/salon3.avif"
                  alt="Comfortable living room"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-square shadow-md mt-6">
                <Image
                  src="/images/ciftkisilik2.avif"
                  alt="Comfortable bedroom"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-square shadow-md">
                <Image
                  src="/images/mutfak2.avif"
                  alt="Fully equipped kitchen"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="relative rounded-2xl overflow-hidden aspect-square shadow-md mt-6">
                <Image
                  src="/images/balkon1.webp"
                  alt="Private balcony"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Floating stat */}
            <div className="absolute top-4 -right-4 bg-white rounded-2xl shadow-xl px-5 py-4 border border-slate-100 hidden sm:block">
              <div className="text-3xl font-bold text-blue-600">20+</div>
              <div className="text-xs text-slate-500 mt-0.5">
                {lang === "tr" ? "Yıllık Deneyim" : "Years Experience"}
              </div>
            </div>
          </div>

          {/* Right: Features grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {t.about.features.map((feature, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <div
                  key={i}
                  className={`reveal reveal-delay-${i % 4} bg-slate-50 hover:bg-blue-50/60 border border-slate-100 hover:border-blue-200 rounded-2xl p-5 transition-all duration-300 group`}
                >
                  <div className="w-10 h-10 bg-blue-100 group-hover:bg-blue-200 rounded-xl flex items-center justify-center mb-3 transition-colors">
                    <Icon size={18} className="text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-slate-900 mb-1 text-sm sm:text-base">
                    {feature.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
