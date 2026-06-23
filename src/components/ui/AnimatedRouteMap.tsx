"use client";

import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
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
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900/90 p-4 shadow-[var(--shadow-elev-3)] backdrop-blur-md">
      {/* Top accent indicator */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-brand to-transparent" />

      {/* Map Content & SVG Grid */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-ink-950/60">
        {/* Base Map Graphic */}
        <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
          <Image
            src="/images/graphics/yemen-map.svg"
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

          {/* SVG Paths for Routes */}
          {/* Route 1: Western Coastal Route (Sana'a to Aden via Bajel, Hodeidah, Zabid, Taiz) */}
          <motion.path
            d="M48 33 C44 34, 41 36, 38 39 C36 41, 35 42, 34 44 C33 47, 34 51, 37 54 C39 58, 40 62, 42 66 C46 70, 50 74, 54 78"
            fill="none"
            stroke="url(#route-gradient)"
            strokeWidth="0.8"
            strokeDasharray="4 3"
            initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 3.5, ease: "easeOut" }}
            className="opacity-60"
          />

          {/* Route 2: Direct Inland Route (Sana'a to Aden via Taiz) */}
          <motion.path
            d="M48 33 C46 44, 44 55, 42 66 C45 70, 50 74, 54 78"
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

          {/* Route 3: Eastern Route (Sana'a to Mukalla) */}
          <motion.path
            d="M48 33 C58 38, 68 48, 78 62"
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

          {/* Route 4: Southern Coastal Route (Aden to Mukalla) */}
          <motion.path
            d="M54 78 C62 76, 70 72, 78 62"
            fill="none"
            stroke="url(#route-gradient)"
            strokeWidth="0.8"
            strokeDasharray="4 3"
            initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 3, ease: "easeOut", delay: 0.9 }}
            className="opacity-60"
          />

          {/* Animated Delivery Signals (Active Fleet Representation) */}
          {!shouldReduceMotion && (
            <>
              {/* Signal 1: Western Coastal Route */}
              <circle r="1" fill="#F8A21E" filter="url(#glow-map-effect)">
                <animateMotion
                  path="M48 33 C44 34, 41 36, 38 39 C36 41, 35 42, 34 44 C33 47, 34 51, 37 54 C39 58, 40 62, 42 66 C46 70, 50 74, 54 78"
                  dur="12s"
                  repeatCount="indefinite"
                />
              </circle>
              {/* Signal 2: Direct Inland Route */}
              <circle r="1" fill="#ED8B00" filter="url(#glow-map-effect)">
                <animateMotion
                  path="M48 33 C46 44, 44 55, 42 66 C45 70, 50 74, 54 78"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </circle>
              {/* Signal 3: Eastern Route */}
              <circle r="1" fill="#F8A21E" filter="url(#glow-map-effect)">
                <animateMotion
                  path="M48 33 C58 38, 68 48, 78 62"
                  dur="10s"
                  repeatCount="indefinite"
                />
              </circle>
              {/* Signal 4: Southern Coastal Route */}
              <circle r="1" fill="#ED8B00" filter="url(#glow-map-effect)">
                <animateMotion
                  path="M54 78 C62 76, 70 72, 78 62"
                  dur="10s"
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
                        x={branch.x + 3.5}
                        y={branch.y - 10}
                        width={isAr ? 35 : 42}
                        height="12"
                        rx="2"
                        fill="rgba(23, 24, 27, 0.96)"
                        stroke="rgba(237, 139, 0, 0.45)"
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
                    </motion.g>
                  )}
                </AnimatePresence>

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
