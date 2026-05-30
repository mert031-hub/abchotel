"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type GalleryImage = {
  src: string;
  alt: string;
  category: "room" | "kitchen" | "bathroom" | "common";
};

const IMAGES: GalleryImage[] = [
  { src: "/images/salon.avif", alt: "Living Room", category: "room" },
  { src: "/images/salon2.avif", alt: "Living Room 2", category: "room" },
  { src: "/images/salon3.avif", alt: "Living Room 3", category: "room" },
  { src: "/images/salon7.avif", alt: "Living Room 4", category: "room" },
  { src: "/images/ciftkisilik1.avif", alt: "Double Room", category: "room" },
  { src: "/images/ciftkisilik2.avif", alt: "Double Room 2", category: "room" },
  { src: "/images/ciftkisilik3.avif", alt: "Double Room 3", category: "room" },
  { src: "/images/ciftkisilik4.avif", alt: "Double Room 4", category: "room" },
  { src: "/images/ciftkisilik5.avif", alt: "Double Room 5", category: "room" },
  { src: "/images/ciftkisilik6.avif", alt: "Double Room 6", category: "room" },
  { src: "/images/ciftkisilik8.avif", alt: "Double Room 7", category: "room" },
  { src: "/images/ciftkisilik9.avif", alt: "Double Room 8", category: "room" },
  { src: "/images/mutfak1.avif", alt: "Kitchen", category: "kitchen" },
  { src: "/images/mutfak2.avif", alt: "Kitchen 2", category: "kitchen" },
  { src: "/images/banyo1.avif", alt: "Bathroom", category: "bathroom" },
  { src: "/images/banyo2.avif", alt: "Bathroom 2", category: "bathroom" },
  { src: "/images/bahce1.avif", alt: "Garden", category: "common" },
  { src: "/images/balkon1.webp", alt: "Balcony", category: "common" },
  { src: "/images/manzara1.avif", alt: "View", category: "common" },
];

const CATEGORIES = ["all", "room", "kitchen", "bathroom", "common"] as const;

export default function Gallery() {
  const { t } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const filtered = activeCategory === "all"
    ? IMAGES
    : IMAGES.filter((img) => img.category === activeCategory);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const prevImage = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + filtered.length) % filtered.length : null));
  }, [filtered.length]);

  const nextImage = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % filtered.length : null));
  }, [filtered.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIndex, closeLightbox, prevImage, nextImage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".reveal").forEach((el, i) => {
              setTimeout(() => el.classList.add("in-view"), i * 50);
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
    <>
      <section
        id="gallery"
        className="py-20 sm:py-28 bg-gradient-to-b from-white to-slate-50"
        ref={sectionRef}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <div className="text-center mb-12 reveal">
            <span className="inline-block bg-blue-50 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              {t.gallery.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              {t.gallery.title}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto">
              {t.gallery.description}
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10 reveal">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white border border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"
                }`}
              >
                {t.gallery.categories[cat as keyof typeof t.gallery.categories]}
              </button>
            ))}
          </div>

          {/* Masonry-style grid */}
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {filtered.map((img, i) => (
              <div
                key={`${img.src}-${activeCategory}`}
                className="reveal break-inside-avoid"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <button
                  onClick={() => openLightbox(i)}
                  className="relative w-full overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 group block"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                      <ZoomIn size={20} className="text-slate-800" />
                    </div>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div className="lightbox" onClick={closeLightbox}>
          <div
            className="relative max-w-5xl w-full mx-4 aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={filtered[lightboxIndex].src}
              alt={filtered[lightboxIndex].alt}
              fill
              className="object-contain rounded-2xl"
              sizes="(max-width: 768px) 100vw, 80vw"
            />

            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2.5 rounded-full transition-colors"
            >
              <X size={20} />
            </button>

            {/* Prev */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2.5 rounded-full transition-colors"
            >
              <ChevronLeft size={24} />
            </button>

            {/* Next */}
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-2.5 rounded-full transition-colors"
            >
              <ChevronRight size={24} />
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-sm px-4 py-1.5 rounded-full">
              {lightboxIndex + 1} / {filtered.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
