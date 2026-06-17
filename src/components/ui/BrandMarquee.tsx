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
      animation: marquee-ltr 50s linear infinite;
    }
    .animate-marquee-rtl {
      animation: marquee-rtl 50s linear infinite;
    }
    .animate-marquee-ltr:hover, .animate-marquee-rtl:hover {
      animation-play-state: paused;
    }
  `;

  return (
    <div className="w-full overflow-hidden py-4 select-none relative">
      <style dangerouslySetInnerHTML={{ __html: marqueeCss }} />

      {/* Desktop view: Infinite Marquee */}
      <div className="hidden md:block relative w-full overflow-hidden">
        {/* Soft fading overlays on edges */}
        <div className="pointer-events-none absolute inset-y-0 start-0 z-10 w-28 bg-gradient-to-r from-white via-white/80 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 end-0 z-10 w-28 bg-gradient-to-l from-white via-white/80 to-transparent" />

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
                className="flex h-24 w-44 shrink-0 items-center justify-center rounded-xl border border-black/5 bg-[#F7F7F4]/50 p-5 shadow-sm transition-all duration-300 hover:border-[#FF8A00]/25 hover:bg-white hover:shadow-[0_12px_30px_rgba(255,138,0,0.08)] group"
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

      {/* Mobile view: Horizontal Scroll Snap */}
      <div className="md:hidden flex w-full gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory px-5 pb-4">
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="snap-center shrink-0 flex h-24 w-40 items-center justify-center rounded-xl border border-black/5 bg-[#F7F7F4]/80 p-5 shadow-sm"
          >
            <div className="relative h-10 w-full">
              <Image
                src={brand.logo}
                alt={brand.name}
                fill
                sizes="150px"
                className="object-contain filter grayscale opacity-75"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
