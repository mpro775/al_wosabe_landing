"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { Phone, MapPin, X } from "lucide-react";
import { branches } from "@/data/site";
import { phoneHref } from "@/lib/utils";

export function AnimatedRouteMap({
  locale,
  hoveredCity,
  setHoveredCity,
}: {
  locale: "ar" | "en";
  hoveredCity: string | null;
  setHoveredCity: (city: string | null) => void;
}) {
  const isAr = locale === "ar";
  const shouldReduceMotion = useReducedMotion();

  const labels = {
    ar: {
      phoneCountSingular: "رقم تواصل",
      phoneCountPlural: "أرقام تواصل",
      callNow: "اتصال الآن",
      tapToSelect: "اضغط على أي مدينة لرؤية التفاصيل",
      close: "إغلاق",
    },
    en: {
      phoneCountSingular: "contact number",
      phoneCountPlural: "contact numbers",
      callNow: "Call Now",
      tapToSelect: "Tap on any city dot to view contact info",
      close: "Close",
    },
  }[locale];

  // Find currently selected branch data (for mobile select display)
  const activeBranch = branches.find((b) => b.city.en === hoveredCity);

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#141416]/95 p-4 shadow-2xl backdrop-blur-md">
      {/* Top golden gradient indicator */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, transparent, #ff8a00, #ffc247, #ff8a00, transparent)",
        }}
      />

      {/* Map Content & SVG Grid */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#111113]/50">
        {/* Base Map Graphic */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none p-4">
          <div className="relative w-full h-full">
            <Image
              src="/images/graphics/yemen-map.svg"
              alt="Yemen Map Grid"
              fill
              className="object-contain"
            />
          </div>
        </div>

        {/* Route Lines overlay */}
        <div
          className="absolute inset-0 z-1 opacity-[0.08] pointer-events-none mix-blend-screen"
          style={{
            backgroundImage: "url('/images/graphics/route-lines.svg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Interactive Overlay Layer */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 z-10 w-full h-full select-none"
        >
          <defs>
            <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FF8A00" />
              <stop offset="100%" stopColor="#FFC247" />
            </linearGradient>
            <filter id="glow-map-effect">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* SVG Paths for Routes */}
          {/* Route 1: Sana'a to Hodeidah via Bajel */}
          <motion.path
            d="M48 33 L38 39 L34 44"
            fill="none"
            stroke="url(#route-gradient)"
            strokeWidth="0.8"
            strokeDasharray="4 3"
            initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeOut" }}
            className="opacity-60"
          />

          {/* Route 2: Sana'a to Taiz to Aden */}
          <motion.path
            d="M48 33 C42 42, 40 54, 42 66 L54 78"
            fill="none"
            stroke="url(#route-gradient)"
            strokeWidth="0.8"
            strokeDasharray="4 3"
            initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
            className="opacity-60"
          />

          {/* Route 3: Sana'a to Mukalla */}
          <motion.path
            d="M48 33 C60 40, 70 50, 78 62"
            fill="none"
            stroke="url(#route-gradient)"
            strokeWidth="0.8"
            strokeDasharray="4 3"
            initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 3, ease: "easeOut", delay: 0.6 }}
            className="opacity-60"
          />

          {/* Animated Delivery Signals (Active Fleet Representation) */}
          {!shouldReduceMotion && (
            <>
              {/* Signal 1: Sana'a -> Hodeidah */}
              <circle r="1" fill="#FFC247" filter="url(#glow-map-effect)">
                <animateMotion
                  path="M48 33 L38 39 L34 44"
                  dur="7s"
                  repeatCount="indefinite"
                />
              </circle>
              {/* Signal 2: Sana'a -> Taiz -> Aden */}
              <circle r="1" fill="#FF8A00" filter="url(#glow-map-effect)">
                <animateMotion
                  path="M48 33 C42 42, 40 54, 42 66 L54 78"
                  dur="9s"
                  repeatCount="indefinite"
                />
              </circle>
              {/* Signal 3: Sana'a -> Mukalla */}
              <circle r="1" fill="#FFC247" filter="url(#glow-map-effect)">
                <animateMotion
                  path="M48 33 C60 40, 70 50, 78 62"
                  dur="12s"
                  repeatCount="indefinite"
                />
              </circle>
            </>
          )}

          {/* City Dots */}
          {branches.map((branch) => {
            const isHovered = hoveredCity === branch.city.en;
            return (
              <g
                key={branch.city.en}
                onMouseEnter={() => setHoveredCity(branch.city.en)}
                onMouseLeave={() => setHoveredCity(null)}
                onClick={() => setHoveredCity(branch.city.en)}
                className="cursor-pointer"
              >
                {/* Glow ring */}
                <circle
                  cx={branch.x}
                  cy={branch.y}
                  r={isHovered ? 7 : 4}
                  fill="none"
                  stroke={isHovered ? "#FFC247" : "#FF8A00"}
                  strokeOpacity={isHovered ? 0.8 : 0.3}
                  className="transition-all duration-300"
                  style={{
                    transformOrigin: `${branch.x}% ${branch.y}%`,
                  }}
                />

                {/* Core point */}
                <circle
                  cx={branch.x}
                  cy={branch.y}
                  r={isHovered ? 3.2 : 2}
                  fill={isHovered ? "#FFC247" : "#FF8A00"}
                  filter={isHovered ? "url(#glow-map-effect)" : ""}
                  className="transition-all duration-300"
                />

                {/* Desktop Overlay Tooltips */}
                {isHovered && (
                  <g className="hidden md:block">
                    <rect
                      x={branch.x + 3.5}
                      y={branch.y - 10}
                      width={isAr ? 35 : 42}
                      height="12"
                      rx="2"
                      fill="rgba(17, 17, 19, 0.95)"
                      stroke="rgba(255, 138, 0, 0.4)"
                      strokeWidth="0.5"
                    />
                    <text
                      x={branch.x + 5.5}
                      y={branch.y - 5}
                      fill="#FFFFFF"
                      fontSize="3.8"
                      fontWeight="900"
                    >
                      {branch.city[locale]}
                    </text>
                    <text
                      x={branch.x + 5.5}
                      y={branch.y - 1}
                      fill="rgba(255, 255, 255, 0.5)"
                      fontSize="3.0"
                      fontWeight="700"
                    >
                      {branch.phones.length} {branch.phones.length > 1 ? labels.phoneCountPlural : labels.phoneCountSingular}
                    </text>
                  </g>
                )}

                {/* Static Text labels for visible cities when NOT hovered */}
                {!isHovered && (
                  <text
                    x={branch.x + 3.5}
                    y={branch.y - 1.5}
                    fill="rgba(255, 255, 255, 0.6)"
                    fontSize="3"
                    fontWeight="700"
                    className="pointer-events-none"
                  >
                    {branch.city[locale]}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* Mobile Drawer (Visible below the map when a city is selected/tapped) */}
      <div className="mt-4 md:hidden">
        {activeBranch ? (
          <div className="rounded-xl border border-[#FF8A00]/20 bg-black/45 p-4 backdrop-blur-md relative">
            <button
              type="button"
              onClick={() => setHoveredCity(null)}
              className="absolute top-3 end-3 text-white/50 hover:text-white"
              aria-label={labels.close}
            >
              <X size={16} />
            </button>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FF8A00]/10 text-[#FFC247]">
                <MapPin size={16} />
              </span>
              <div>
                <h4 className="text-sm font-bold text-white">
                  {activeBranch.city[locale]}
                </h4>
                <p className="text-xs text-white/50">
                  {activeBranch.phones.length} {activeBranch.phones.length > 1 ? labels.phoneCountPlural : labels.phoneCountSingular}
                </p>
              </div>
            </div>

            <div className="mt-3.5 grid gap-2">
              {activeBranch.phones.map((phone) => (
                <a
                  key={phone}
                  href={phoneHref(phone)}
                  className="flex items-center justify-between rounded-lg border border-white/5 bg-white/5 px-3 py-2 text-xs font-bold text-white/90 hover:bg-white/10"
                >
                  <span dir="ltr">{phone}</span>
                  <span className="flex items-center gap-1 text-[#FF8A00] text-[10px]">
                    {labels.callNow}
                    <Phone size={12} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-xs text-white/40 italic py-2">
            {labels.tapToSelect}
          </p>
        )}
      </div>
    </div>
  );
}
