"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type HeroSlide = {
  id: string;
  subtitle: string;
  title: string;
  description: string;
  cta: string;
  image: string;
};

type HeroCarouselProps = {
  slides: HeroSlide[];
};

export function HeroCarousel({ slides }: HeroCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 5500);

    return () => window.clearInterval(timer);
  }, [slides.length]);

  const activeSlide = useMemo(() => slides[activeIndex], [slides, activeIndex]);

  const goToNext = () => setActiveIndex((prev) => (prev + 1) % slides.length);
  const goToPrev = () =>
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
      <div className="relative h-[280px] md:h-[420px] lg:h-[520px]">
        <Image
          key={activeSlide.id}
          src={activeSlide.image}
          alt={activeSlide.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-transparent" />

        <div className="relative z-10 flex h-full max-w-3xl flex-col justify-center gap-4 p-6 text-white md:p-12">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">{activeSlide.subtitle}</p>
          <h1 className="text-3xl font-bold leading-tight md:text-5xl">{activeSlide.title}</h1>
          <p className="max-w-xl text-sm text-slate-100 md:text-base">{activeSlide.description}</p>
          <div>
            <Button size="lg">{activeSlide.cta}</Button>
          </div>
        </div>

        <button
          aria-label="Previous slide"
          onClick={goToPrev}
          className="absolute left-3 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-slate-900 transition hover:bg-white"
        >
          &#8249;
        </button>
        <button
          aria-label="Next slide"
          onClick={goToNext}
          className="absolute right-3 top-1/2 z-20 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-slate-900 transition hover:bg-white"
        >
          &#8250;
        </button>
      </div>

      <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "h-2.5 rounded-full transition-all",
              index === activeIndex ? "w-8 bg-white" : "w-2.5 bg-white/60 hover:bg-white/80",
            )}
          />
        ))}
      </div>
    </section>
  );
}
