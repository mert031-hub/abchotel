"use client";

import { useEffect, useRef } from "react";
import { MapPin, Navigation, ExternalLink } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const MAPS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=ABC+APART+Antalya";
const MAPS_PLACE =
  "https://maps.google.com/?q=ABC+APART+Güzeloba+2109+Sk+No:8+Muratpaşa+Antalya";

export default function Location() {
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
      id="location"
      className="py-20 sm:py-28 bg-white"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <span className="inline-block bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            {t.location.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {t.location.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto">
            {t.location.description}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Left: Info */}
          <div className="lg:col-span-1 space-y-4 reveal">
            {/* Address card */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin size={18} className="text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 mb-1 text-sm">
                    {t.location.badge}
                  </div>
                  <address className="text-slate-600 text-sm not-italic leading-relaxed">
                    {t.location.address}
                  </address>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-2 mt-4">
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-sm transition-all shadow-sm hover:shadow-md"
                >
                  <Navigation size={16} />
                  {t.location.get_directions}
                </a>
                <a
                  href={MAPS_PLACE}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3 rounded-xl text-sm border border-slate-200 transition-all"
                >
                  <ExternalLink size={16} />
                  {t.location.open_maps}
                </a>
              </div>
            </div>

            {/* Quick info */}
            <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
              <h4 className="font-semibold text-amber-900 text-sm mb-3">
                Nearby Landmarks
              </h4>
              <ul className="space-y-2 text-sm text-amber-800">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0" />
                  Düden Şelalesi — 2 dk
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0" />
                  Lara Plajı — 10 dk
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0" />
                  Kaleiçi — 30 dk
                </li>
              </ul>
            </div>
          </div>

          {/* Right: Map */}
          <div className="lg:col-span-2 reveal reveal-delay-1">
            <div className="map-responsive shadow-lg border border-slate-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6384.963933482031!2d30.78629383898871!3d36.85488087025938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c39b0c33600e01%3A0x818d18c1cddaea02!2sABC%20APART!5e0!3m2!1str!2str!4v1780135947035!5m2!1str!2str"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ABC Apart Hotel Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
