"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Phone, MapPin, X } from "lucide-react";
import { branches } from "@/data/site";
import { phoneHref } from "@/lib/utils";

/**
 * Distribution routes connecting the branch cities. Coordinates are in the
 * overlay's 0-100 space and pass through the branch x/y defined in site.ts, so
 * the lines stay locked to the city dots and the underlying map geography.
 * `drawDur` controls the draw-in reveal; `signalDur` the travelling delivery dot.
 */
const ROUTES = [
  // Sana'a → Bajel → Hodeidah (capital to the main Red Sea port)
  { d: "M 17 49 C 15.67 49.67, 11 51.83, 9 53 C 7 54.17, 5.67 55.5, 5 56", drawDur: 3, signalDur: 9, delay: 0 },
  // Hodeidah → Zabid → Taiz (Tihama coastal plain down to the southern highlands)
  { d: "M 5 56 C 5.67 57.33, 7.17 61.33, 9 64 C 10.83 66.67, 14.83 70.67, 16 72", drawDur: 2.8, signalDur: 8, delay: 0.25 },
  // Sana'a → Taiz → Aden (central spine to the southern port)
  { d: "M 17 49 C 16.83 52.83, 14.67 66.33, 16 72 C 17.33 77.67, 23.5 81.17, 25 83", drawDur: 3.2, signalDur: 11, delay: 0.5 },
  // Sana'a → Mukalla (eastern long-haul to Hadhramaut)
  { d: "M 17 49 C 24.83 51.33, 56.17 60.67, 64 63", drawDur: 3.6, signalDur: 13, delay: 0.75 },
  // Aden → Mukalla (southern coastal link)
  { d: "M 25 83 C 31.5 79.67, 57.5 66.33, 64 63", drawDur: 3.4, signalDur: 12, delay: 1 },
];

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
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900/90 p-4 shadow-[var(--shadow-elev-3)] backdrop-blur-md">
      {/* Top accent indicator */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent" />

      {/* Map Content & SVG Grid */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-ink-950/60">
        {/* Base Map Graphic */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <Image
            src="/images/graphics/yemen-map-clean.svg"
            alt="Yemen Map Grid"
            fill
            className="object-fill"
          />
        </div>

        {/* Interactive Overlay Layer */}
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 z-10 w-full h-full select-none"
        >
          <defs>
            <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ED8B00" />
              <stop offset="100%" stopColor="#F8A21E" />
            </linearGradient>
            <filter id="glow-map-effect">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Distribution route lines — locked to the branch dots (see ROUTES) */}
          {ROUTES.map((route, i) => (
            <motion.path
              key={`route-${i}`}
              d={route.d}
              fill="none"
              stroke="url(#route-gradient)"
              strokeWidth="0.8"
              strokeDasharray="4 3"
              strokeLinecap="round"
              initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: route.drawDur, ease: "easeOut", delay: route.delay }}
              className="opacity-60"
            />
          ))}

          {/* Animated delivery signals travelling each route (active fleet) */}
          {!shouldReduceMotion &&
            ROUTES.map((route, i) => (
              <circle key={`signal-${i}`} r="1" fill={i % 2 ? "#ED8B00" : "#F8A21E"} filter="url(#glow-map-effect)">
                <animateMotion path={route.d} dur={`${route.signalDur}s`} repeatCount="indefinite" />
              </circle>
            ))}

          {/* City Dots */}
          {branches.map((branch) => {
            const isHovered = hoveredCity === branch.city.en;
            // Right-edge cities flip their label/tooltip to the left to stay on-canvas.
            const tipW = isAr ? 35 : 42;
            const flip = branch.x > 60;
            const tipX = flip ? branch.x - 3.5 - tipW : branch.x + 3.5;
            const txtX = flip ? branch.x - 5.5 : branch.x + 5.5;
            const labelX = flip ? branch.x - 3.5 : branch.x + 3.5;
            const anchor = flip ? "end" : "start";
            return (
              <g
                key={branch.city.en}
                onMouseEnter={() => setHoveredCity(branch.city.en)}
                onMouseLeave={() => setHoveredCity(null)}
                onClick={() => setHoveredCity(branch.city.en)}
                className="cursor-pointer"
              >
                {/* Glow ring with subtle pulse */}
                <circle
                  cx={branch.x}
                  cy={branch.y}
                  r={isHovered ? 7 : 4}
                  fill="none"
                  stroke={isHovered ? "#F8A21E" : "#ED8B00"}
                  strokeOpacity={isHovered ? 0.85 : 0.35}
                  className="transition-all duration-300"
                  style={{
                    transformOrigin: `${branch.x}% ${branch.y}%`,
                  }}
                >
                  {!isHovered && !shouldReduceMotion && (
                    <animate
                      attributeName="r"
                      values="3.5;5;3.5"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  )}
                </circle>

                {/* Core point */}
                <circle
                  cx={branch.x}
                  cy={branch.y}
                  r={isHovered ? 3.2 : 2}
                  fill={isHovered ? "#F8A21E" : "#ED8B00"}
                  filter={isHovered ? "url(#glow-map-effect)" : ""}
                  className="transition-all duration-300"
                />

                {/* Desktop Overlay Tooltips with smooth fade */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.g
                      className="hidden md:block"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <rect
                        x={tipX}
                        y={branch.y - 10}
                        width={tipW}
                        height="12"
                        rx="2"
                        fill="rgba(23, 24, 27, 0.96)"
                        stroke="rgba(237, 139, 0, 0.45)"
                        strokeWidth="0.5"
                      />
                      <text
                        x={txtX}
                        y={branch.y - 5}
                        textAnchor={anchor}
                        fill="#FFFFFF"
                        fontSize="3.8"
                        fontWeight="900"
                      >
                        {branch.city[locale]}
                      </text>
                      <text
                        x={txtX}
                        y={branch.y - 1}
                        textAnchor={anchor}
                        fill="rgba(255, 255, 255, 0.5)"
                        fontSize="3.0"
                        fontWeight="700"
                      >
                        {branch.phones.length} {branch.phones.length > 1 ? labels.phoneCountPlural : labels.phoneCountSingular}
                      </text>
                    </motion.g>
                  )}
                </AnimatePresence>

                {/* Static Text labels for visible cities when NOT hovered */}
                {!isHovered && (
                  <text
                    x={labelX}
                    y={branch.y - 1.5}
                    textAnchor={anchor}
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
          <div className="relative rounded-xl border border-white/10 bg-ink-950/55 p-4 backdrop-blur-md">
            <button
              type="button"
              onClick={() => setHoveredCity(null)}
              className="absolute top-3 end-3 text-steel-400 hover:text-white"
              aria-label={labels.close}
            >
              <X size={16} />
            </button>
            <div className="flex items-center gap-2.5">
              <span className="chrome flex h-8 w-8 items-center justify-center rounded-lg text-ink-950">
                <MapPin size={16} />
              </span>
              <div>
                <h4 className="font-display text-sm font-bold text-white">
                  {activeBranch.city[locale]}
                </h4>
                <p className="text-xs text-steel-400">
                  {activeBranch.phones.length} {activeBranch.phones.length > 1 ? labels.phoneCountPlural : labels.phoneCountSingular}
                </p>
              </div>
            </div>

            <div className="mt-3.5 grid gap-2">
              {activeBranch.phones.map((phone) => (
                <a
                  key={phone}
                  href={phoneHref(phone)}
                  className="flex items-center justify-between rounded-lg border border-white/8 bg-white/5 px-3 py-2 text-xs font-bold text-steel-100 hover:border-brand/40 hover:bg-brand/10"
                >
                  <span dir="ltr">{phone}</span>
                  <span className="flex items-center gap-1 text-[10px] text-brand-bright">
                    {labels.callNow}
                    <Phone size={12} />
                  </span>
                </a>
              ))}
            </div>
          </div>
        ) : (
          <p className="py-2 text-center text-xs italic text-steel-400">
            {labels.tapToSelect}
          </p>
        )}
      </div>
    </div>
  );
}
