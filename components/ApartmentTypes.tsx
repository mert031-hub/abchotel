"use client";

import { useEffect, useRef } from "react";
import { Check, MessageCircle, Phone, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

const WHATSAPP = "905062988080";
const PHONE = "05062988080";

export default function ApartmentTypes() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("in-view"), i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const apartments = [
    {
      data: t.apartments.economy,
      image: "/images/salon2.avif",
      image2: "/images/banyo1.avif",
      accent: "blue",
      featured: false,
    },
    {
      data: t.apartments.comfort,
      image: "/images/ciftkisilik3.avif",
      image2: "/images/salon7.avif",
      accent: "amber",
      featured: true,
    },
  ];

  return (
    <section
      id="apartments"
      className="py-20 sm:py-28 bg-white"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <span className="inline-block bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            {t.apartments.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-5">
            {t.apartments.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto">
            {t.apartments.description}
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {apartments.map(({ data, image, image2, accent, featured }, i) => (
            <div
              key={i}
              className={`reveal reveal-delay-${i + 1} relative flex flex-col rounded-3xl overflow-hidden border transition-all duration-300 hover:shadow-2xl group ${
                featured
                  ? "border-amber-200 shadow-xl shadow-amber-50"
                  : "border-slate-200 shadow-lg"
              }`}
            >
              {/* Featured badge */}
              {featured && (
                <div className="absolute top-4 right-4 z-10 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow">
                  ★ Popular
                </div>
              )}

              {/* Image */}
              <div className="relative h-52 sm:h-64 overflow-hidden">
                <Image
                  src={image}
                  alt={data.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {/* Image accent overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                {/* Type badge */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-semibold px-3 py-1.5 rounded-lg">
                  {data.type}
                </div>
              </div>

              {/* Secondary thumbnail */}
              <div className="absolute top-4 left-4 w-16 h-16 rounded-xl overflow-hidden border-2 border-white shadow-md">
                <Image
                  src={image2}
                  alt={`${data.name} view 2`}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {data.name}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">
                  {data.desc}
                </p>

                {/* Features */}
                <ul className="space-y-2 mb-6 flex-1">
                  {data.features.map((feature, fi) => (
                    <li key={fi} className="flex items-center gap-2.5 text-sm">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${
                          accent === "amber"
                            ? "bg-amber-100"
                            : "bg-blue-100"
                        }`}
                      >
                        <Check
                          size={11}
                          className={
                            accent === "amber"
                              ? "text-amber-600"
                              : "text-blue-600"
                          }
                        />
                      </div>
                      <span className="text-slate-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* No price displayed — CTA only */}
                <div className="pt-4 border-t border-slate-100 space-y-2">
                  <p className="text-xs text-slate-500 text-center mb-3">
                    {t.apartments.cta}
                  </p>
                  <a
                    href={`https://wa.me/${WHATSAPP}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                      featured
                        ? "bg-amber-500 hover:bg-amber-600 text-white shadow-md hover:shadow-lg"
                        : "bg-blue-600 hover:bg-blue-700 text-white shadow-md hover:shadow-lg"
                    }`}
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                    <ArrowRight size={14} />
                  </a>
                  <a
                    href={`tel:${PHONE}`}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl font-medium text-sm bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors"
                  >
                    <Phone size={15} />
                    {t.contact.call_btn}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
