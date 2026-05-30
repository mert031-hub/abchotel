"use client";

import { useEffect, useRef } from "react";
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const PHONE = "05062988080";
const WHATSAPP = "905062988080";
const MAPS_URL = "https://www.google.com/maps/dir/?api=1&destination=ABC+APART+Antalya";

export default function Contact() {
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
      id="contact"
      className="py-20 sm:py-28 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden"
      ref={sectionRef}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-white/5 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/3 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14 reveal">
          <span className="inline-block bg-white/10 border border-white/20 text-white text-sm font-semibold px-4 py-1.5 rounded-full mb-4 backdrop-blur-sm">
            {t.contact.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t.contact.title}
          </h2>
          <p className="text-blue-100 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            {t.contact.description}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto mb-10">
          {/* WhatsApp card */}
          <div className="reveal bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all hover:-translate-y-1 hover:shadow-xl group">
            <a
              href={`https://wa.me/${WHATSAPP}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="w-14 h-14 bg-green-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-400/30 transition-colors">
                <MessageCircle size={26} className="text-green-300" />
              </div>
              <h3 className="font-bold text-white text-lg mb-1.5">
                {t.contact.whatsapp_btn}
              </h3>
              <p className="text-blue-200 text-sm mb-4">
                {t.contact.phone}
              </p>
              <span className="inline-block bg-green-500 hover:bg-green-400 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors shadow-md">
                WhatsApp
              </span>
            </a>
          </div>

          {/* Phone card */}
          <div className="reveal reveal-delay-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all hover:-translate-y-1 hover:shadow-xl group">
            <a href={`tel:${PHONE}`} className="block">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 transition-colors">
                <Phone size={26} className="text-white" />
              </div>
              <h3 className="font-bold text-white text-lg mb-1.5">
                {t.contact.call_btn}
              </h3>
              <p className="text-blue-200 text-sm mb-4 font-mono tracking-wider">
                {t.contact.phone}
              </p>
              <span className="inline-block bg-white hover:bg-blue-50 text-blue-700 font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors shadow-md">
                {t.contact.call_btn}
              </span>
            </a>
          </div>

          {/* Address card */}
          <div className="reveal reveal-delay-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-all hover:-translate-y-1 hover:shadow-xl group sm:col-span-2 lg:col-span-1">
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="w-14 h-14 bg-amber-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-amber-400/30 transition-colors">
                <MapPin size={26} className="text-amber-300" />
              </div>
              <h3 className="font-bold text-white text-lg mb-1.5">
                {t.contact.address_btn}
              </h3>
              <p className="text-blue-200 text-sm mb-4">
                Güzeloba, Muratpaşa
                <br />
                Antalya
              </p>
              <span className="inline-block bg-amber-500 hover:bg-amber-400 text-white font-semibold px-6 py-2.5 rounded-xl text-sm transition-colors shadow-md">
                {t.location.get_directions}
              </span>
            </a>
          </div>
        </div>

        {/* Hours */}
        <div className="text-center reveal">
          <div className="inline-flex items-center gap-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-8 py-4 flex-wrap justify-center gap-y-2">
            <div className="flex items-center gap-2 text-blue-100">
              <Clock size={16} />
              <span className="text-sm font-medium">{t.contact.hours}</span>
            </div>
            <div className="w-px h-4 bg-white/20 hidden sm:block" />
            <div className="flex items-center gap-2 text-blue-100">
              <span className="text-sm font-medium">{t.contact.checkout}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
