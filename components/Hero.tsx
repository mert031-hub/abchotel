"use client";

import { Phone, MapPin, Star, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Image from "next/image";

const PHONE = "05062988080";
const WHATSAPP = "905062988080";
const MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=ABC+APART+Antalya";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/40"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-50/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div className="text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-sm font-medium px-4 py-2 rounded-full mb-6 animate-fade-up">
              <MapPin size={14} />
              {t.hero.badge}
            </div>

            {/* Main Title */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-4 animate-fade-up animate-delay-100">
              {t.hero.title}
            </h1>

            {/* Subtitle */}
            <p className="text-xl sm:text-2xl text-blue-600 font-semibold mb-5 animate-fade-up animate-delay-200">
              {t.hero.subtitle}
            </p>

            {/* Description */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-up animate-delay-300">
              {t.hero.description}
            </p>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mb-8 animate-fade-up animate-delay-300">
              {/* Google Rating */}
              <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < 4
                          ? "fill-amber-400 text-amber-400"
                          : "fill-amber-300 text-amber-300"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-slate-900">4.5</span>
                <span className="text-xs text-slate-500">{t.hero.trust_google}</span>
              </div>

              <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm">
                <MessageCircle size={14} className="text-blue-500" />
                <span className="text-sm font-semibold text-slate-700">
                  {t.hero.trust_reviews}
                </span>
              </div>

              <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                  9/10
                </span>
                <span className="text-xs text-slate-600">Hotels.com</span>
              </div>

              <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-4 py-2.5 shadow-sm">
                <span className="text-xs font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                  8/10
                </span>
                <span className="text-xs text-slate-600">Booking</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center lg:justify-start animate-fade-up animate-delay-400">
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t.hero.cta_whatsapp}
              </a>

              <a
                href={`tel:${PHONE}`}
                className="inline-flex items-center justify-center gap-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                <Phone size={18} className="shrink-0" />
                {t.hero.cta_call}
              </a>

              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-6 py-3.5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                <MapPin size={18} className="shrink-0 text-blue-500" />
                {t.hero.cta_directions}
              </a>
            </div>
          </div>

          {/* Right: Image Grid */}
          <div className="relative animate-fade-up animate-delay-200 hidden lg:block">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-3">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
                  <Image
                    src="/images/salon.avif"
                    alt="ABC Apart Hotel Living Room"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
                  <Image
                    src="/images/mutfak1.avif"
                    alt="ABC Apart Hotel Kitchen"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-3 mt-6">
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
                  <Image
                    src="/images/ciftkisilik1.avif"
                    alt="ABC Apart Hotel Bedroom"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-lg">
                  <Image
                    src="/images/bahce1.avif"
                    alt="ABC Apart Hotel Garden"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Floating rating badge */}
            <div className="absolute -bottom-4 left-4 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3 border border-slate-100">
              <div className="w-10 h-10 bg-amber-400 rounded-xl flex items-center justify-center">
                <Star size={18} className="fill-white text-white" />
              </div>
              <div>
                <div className="font-bold text-slate-900 text-sm">4.5 / 5.0</div>
                <div className="text-xs text-slate-500">200+ Google Reviews</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 animate-fade-up animate-delay-500">
        <div className="w-6 h-10 border-2 border-slate-300 rounded-full flex items-start justify-center p-1.5">
          <div className="w-1 h-2 bg-slate-400 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
