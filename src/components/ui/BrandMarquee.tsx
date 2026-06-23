"use client";

import Image from "next/image";
import type { brands as BrandsList } from "@/data/site";

export function BrandMarquee({
  brands,
  locale,
}: {
  brands: typeof BrandsList;
  locale: "ar" | "en";
}) {
  const isAr = locale === "ar";
  // Duplicate the brand list to create an infinite scrolling illusion
  const duplicatedBrands = [...brands, ...brands, ...brands, ...brands];

  const marqueeCss = `
    @keyframes marquee-ltr {
      0% { transform: translate3d(0, 0, 0); }
      100% { transform: translate3d(-50%, 0, 0); }
    }
    @keyframes marquee-rtl {
      0% { transform: translate3d(0, 0, 0); }
      100% { transform: translate3d(50%, 0, 0); }
    }
    .animate-marquee-ltr {
      animation: marquee-ltr 80s linear infinite;
    }
    .animate-marquee-rtl {
      animation: marquee-rtl 80s linear infinite;
    }
    .animate-marquee-ltr:hover, .animate-marquee-rtl:hover {
      animation-play-state: paused;
    }
  `;

  return (
    <div className="w-full overflow-hidden py-4 select-none relative">
      <style dangerouslySetInnerHTML={{ __html: marqueeCss }} />

      {/* Desktop: Slow Marquee */}
      <div className="relative w-full overflow-hidden hidden md:block">
        {/* Soft fading overlays on edges */}
        <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-28 bg-gradient-to-r from-sand-50 via-sand-50/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-28 bg-gradient-to-l from-sand-50 via-sand-50/80 to-transparent" />

        <div className="flex w-full overflow-hidden">
          <div
            className={`flex gap-6 whitespace-nowrap ${
              isAr ? "animate-marquee-rtl" : "animate-marquee-ltr"
            }`}
            style={{
              display: "flex",
              width: "max-content",
              // For RTL, start from shifted position so it moves smoothly
              transform: isAr ? "translate3d(-50%, 0, 0)" : "translate3d(0, 0, 0)",
            }}
          >
            {duplicatedBrands.map((brand, idx) => (
              <div
                key={`${brand.name}-${idx}`}
                className="group flex h-24 w-44 shrink-0 items-center justify-center rounded-xl border border-steel-200 bg-paper p-5 shadow-[var(--shadow-elev-1)] transition-all duration-300 hover:border-steel-300 hover:shadow-[var(--shadow-elev-2)]"
              >
                <div className="relative h-12 w-full transition-all duration-300">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    sizes="180px"
                    className="object-contain filter grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: Horizontal scroll-snap */}
      <div className="md:hidden overflow-x-auto scroll-smooth" style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}>
        {/* Soft fading overlays on edges */}
        <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-12 bg-gradient-to-r from-sand-50 via-sand-50/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-12 bg-gradient-to-l from-sand-50 via-sand-50/80 to-transparent" />

        <div className="flex gap-3 px-4" style={{ width: "max-content" }}>
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="group flex h-20 w-36 shrink-0 items-center justify-center rounded-xl border border-steel-200 bg-paper p-4 shadow-[var(--shadow-elev-1)]"
              style={{ scrollSnapAlign: "start" }}
            >
              <div className="relative h-10 w-full">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  sizes="120px"
                  className="object-contain filter grayscale opacity-60 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
