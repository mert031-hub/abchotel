"use client";

import { useState, useRef, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const PLATFORM_RATINGS = [
  { name: "Hotels.com", score: "9/10", color: "text-red-600", bg: "bg-red-50", border: "border-red-100" },
  { name: "Trivago", score: "8/10", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
  { name: "Booking", score: "8/10", color: "text-blue-800", bg: "bg-blue-50", border: "border-blue-200" },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-slate-200 text-slate-200"
          }
        />
      ))}
    </div>
  );
}

export default function Reviews() {
  const { t } = useLanguage();
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  const updateScrollState = () => {
    const el = sliderRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  };

  const scroll = (dir: "left" | "right") => {
    const el = sliderRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === "left" ? -amount : amount, behavior: "smooth" });
  };

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, []);

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
    <section
      id="reviews"
      className="py-20 sm:py-28 bg-gradient-to-b from-slate-50 to-white overflow-hidden"
      ref={sectionRef}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12 reveal">
          <span className="inline-block bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
            {t.reviews.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            {t.reviews.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto">
            {t.reviews.description}
          </p>
        </div>

        {/* Score cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 max-w-3xl mx-auto reveal">
          {/* Google */}
          <div className="bg-white border border-amber-100 rounded-2xl p-5 text-center shadow-sm">
            <div className="text-3xl font-bold text-slate-900 mb-1">4.5</div>
            <div className="flex justify-center mb-2">
              <StarRating rating={4} />
            </div>
            <div className="text-xs text-slate-500">{t.reviews.google_rating}</div>
            <div className="text-xs text-amber-600 font-medium mt-1">Google</div>
          </div>

          {/* Platforms */}
          {PLATFORM_RATINGS.map((p) => (
            <div
              key={p.name}
              className={`${p.bg} border ${p.border} rounded-2xl p-5 text-center shadow-sm`}
            >
              <div className={`text-3xl font-bold ${p.color} mb-2`}>
                {p.score}
              </div>
              <div className="text-xs text-slate-500">{t.reviews.platforms}</div>
              <div className={`text-xs font-medium mt-1 ${p.color}`}>
                {p.name}
              </div>
            </div>
          ))}
        </div>

        {/* Slider controls */}
        <div className="flex items-center justify-between mb-6 reveal">
          <p className="text-slate-500 text-sm">
            {t.reviews.total_reviews}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`p-2.5 rounded-xl border transition-all ${
                canScrollLeft
                  ? "bg-white border-slate-200 hover:border-blue-300 hover:text-blue-600 text-slate-600"
                  : "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed"
              }`}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`p-2.5 rounded-xl border transition-all ${
                canScrollRight
                  ? "bg-white border-slate-200 hover:border-blue-300 hover:text-blue-600 text-slate-600"
                  : "bg-slate-50 border-slate-100 text-slate-300 cursor-not-allowed"
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Horizontal slider */}
        <div
          ref={sliderRef}
          className="flex gap-4 overflow-x-auto no-scrollbar pb-4"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {t.reviews.items.map((review, i) => (
            <div
              key={i}
              className="flex-none w-72 sm:w-80 bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300"
              style={{ scrollSnapAlign: "start" }}
            >
              {/* Quote icon */}
              <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center mb-4">
                <Quote size={16} className="text-blue-500" />
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <StarRating rating={review.rating} />
                <span className="text-sm font-semibold text-slate-700">
                  {review.rating}.0
                </span>
              </div>

              {/* Text */}
              <p className="text-slate-600 text-sm leading-relaxed mb-5 line-clamp-4">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Reviewer */}
              <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                <div>
                  <div className="font-semibold text-slate-900 text-sm">
                    {review.name}
                  </div>
                  <div className="text-xs text-slate-400">{review.date}</div>
                </div>
                <div className="flex items-center gap-1 bg-slate-50 px-2 py-1 rounded-lg">
                  <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-blue-500">
                    <path d="M21.805 10.023H12v4.01h5.647c-.243 1.255-1.012 2.317-2.157 3.024v2.512h3.49c2.043-1.882 3.22-4.654 3.22-7.938 0-.556-.05-1.096-.145-1.608z" />
                    <path d="M12 22c2.7 0 4.967-.896 6.623-2.43l-3.49-2.512c-.896.6-2.043.955-3.133.955-2.41 0-4.453-1.628-5.183-3.818H3.22v2.59C4.87 20.33 8.19 22 12 22z" />
                    <path d="M6.817 14.195A5.932 5.932 0 016.5 12c0-.762.137-1.497.317-2.195V7.214H3.22A9.942 9.942 0 002 12c0 1.595.39 3.104 1.075 4.44l3.742-2.245z" />
                    <path d="M12 6.182c1.358 0 2.573.467 3.531 1.383l2.643-2.643C16.96 3.434 14.694 2.4 12 2.4c-3.81 0-7.13 1.67-9.405 4.314l3.742 2.59C7.547 7.81 9.59 6.182 12 6.182z" />
                  </svg>
                  <span className="text-xs font-medium text-slate-500">
                    {review.lang}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
