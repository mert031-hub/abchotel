"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

type GalleryImage = {
  src: string;
  alt: string;
};

const IMAGES: GalleryImage[] = [
  { src: "/images/salon.avif", alt: "Living Room" },
  { src: "/images/salon2.avif", alt: "Living Room 2" },
  { src: "/images/salon3.avif", alt: "Living Room 3" },
  { src: "/images/salon7.avif", alt: "Living Room 4" },
  { src: "/images/ciftkisilik1.avif", alt: "Double Room" },
  { src: "/images/ciftkisilik2.avif", alt: "Double Room 2" },
  { src: "/images/ciftkisilik3.avif", alt: "Double Room 3" },
  { src: "/images/ciftkisilik4.avif", alt: "Double Room 4" },
  { src: "/images/ciftkisilik5.avif", alt: "Double Room 5" },
  { src: "/images/ciftkisilik6.avif", alt: "Double Room 6" },
  { src: "/images/ciftkisilik8.avif", alt: "Double Room 7" },
  { src: "/images/ciftkisilik9.avif", alt: "Double Room 8" },
  { src: "/images/mutfak1.avif", alt: "Kitchen" },
  { src: "/images/mutfak2.avif", alt: "Kitchen 2" },
  { src: "/images/banyo1.avif", alt: "Bathroom" },
  { src: "/images/banyo2.avif", alt: "Bathroom 2" },
  { src: "/images/bahce1.avif", alt: "Garden" },
  { src: "/images/balkon1.webp", alt: "Balcony" },
  { src: "/images/manzara1.avif", alt: "View" },
];

export default function Gallery() {
  const { t } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const prevImage = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + IMAGES.length) % IMAGES.length : null));
  }, []);

  const nextImage = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % IMAGES.length : null));
  }, []);

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
        className="py-20 sm:py-28"
        style={{ background: "linear-gradient(to bottom, #fdfcf8, #f5f2ec)" }}
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

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {IMAGES.map((img, i) => (
              <div
                key={img.src}
                className="reveal"
                style={{ transitionDelay: `${(i % 9) * 50}ms` }}
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
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
              src={IMAGES[lightboxIndex].src}
              alt={IMAGES[lightboxIndex].alt}
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
              {lightboxIndex + 1} / {IMAGES.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
