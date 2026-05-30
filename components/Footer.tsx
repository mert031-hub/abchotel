"use client";

import { Phone, MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const PHONE = "05062988080";
const WHATSAPP = "905062988080";

const NAV_IDS = [
  "home",
  "about",
  "apartments",
  "gallery",
  "reviews",
  "location",
  "contact",
] as const;

export default function Footer() {
  const { t } = useLanguage();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = NAV_IDS.map((id) => ({
    id,
    label: t.nav[id as keyof typeof t.nav],
  }));

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-xs">ABC</span>
              </div>
              <div>
                <div className="font-bold text-white text-base">ABC Apart Hotel</div>
                <div className="text-slate-500 text-xs">Antalya, Türkiye</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              {t.footer.tagline}
            </p>
            {/* Social / contact quick links */}
            <div className="flex gap-3">
              <a
                href={`https://wa.me/${WHATSAPP}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 rounded-xl flex items-center justify-center transition-colors group"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 fill-green-400">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href={`tel:${PHONE}`}
                className="w-10 h-10 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/20 rounded-xl flex items-center justify-center transition-colors"
                aria-label="Phone"
              >
                <Phone size={16} className="text-blue-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              {t.footer.quick_links}
            </h3>
            <ul className="space-y-3">
              {navLinks.map(({ id, label }) => (
                <li key={id}>
                  <button
                    onClick={() => scrollTo(id)}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              {t.footer.contact_info}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-blue-400 shrink-0 mt-0.5" />
                <address className="text-slate-400 text-sm not-italic leading-relaxed whitespace-pre-line">
                  {t.footer.address}
                </address>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-blue-400 shrink-0" />
                <a
                  href={`tel:${PHONE}`}
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                >
                  {t.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Clock size={16} className="text-blue-400 shrink-0" />
                <span className="text-slate-400 text-sm">
                  {t.contact.hours}
                </span>
              </li>
            </ul>
          </div>

          {/* Platform ratings */}
          <div>
            <h3 className="text-white font-semibold mb-5 text-sm uppercase tracking-wider">
              {t.reviews.platforms}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-slate-800 rounded-xl px-4 py-3">
                <span className="text-slate-400 text-sm">Google</span>
                <span className="text-amber-400 font-bold text-sm">4.5 ★</span>
              </div>
              <div className="flex items-center justify-between bg-slate-800 rounded-xl px-4 py-3">
                <span className="text-slate-400 text-sm">Hotels.com</span>
                <span className="text-emerald-400 font-bold text-sm">9/10</span>
              </div>
              <div className="flex items-center justify-between bg-slate-800 rounded-xl px-4 py-3">
                <span className="text-slate-400 text-sm">Booking</span>
                <span className="text-blue-400 font-bold text-sm">8/10</span>
              </div>
              <div className="flex items-center justify-between bg-slate-800 rounded-xl px-4 py-3">
                <span className="text-slate-400 text-sm">Trivago</span>
                <span className="text-violet-400 font-bold text-sm">8/10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © 2025 ABC Apart Hotel. {t.footer.rights}
          </p>
          <p className="text-slate-600 text-xs">
            Güzeloba, Muratpaşa, Antalya
          </p>
        </div>
      </div>
    </footer>
  );
}
