"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";

export function Preloader({ locale }: { locale: "ar" | "en" }) {
  const [loading, setLoading] = useState(true);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    // Check if the preloader has been seen in the current session
    const seen = typeof window !== "undefined" ? sessionStorage.getItem("alw-preloader-seen") : null;
    if (seen === "true" || shouldReduceMotion) {
      const t = setTimeout(() => setLoading(false), 0);
      return () => clearTimeout(t);
    }

    const timer = setTimeout(() => {
      setLoading(false);
      try {
        sessionStorage.setItem("alw-preloader-seen", "true");
      } catch (e) {
        // ignore storage errors
      }
    }, 1300); // Preloading timeout between 900ms and 1400ms

    return () => clearTimeout(timer);
  }, [shouldReduceMotion]);

  if (!loading) return null;

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.4, ease: "easeInOut" }
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#111113]"
        >
          {/* Main Logo Wrapper with Mask Reveal */}
          <div className="relative mb-6 flex flex-col items-center">
            <motion.div
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: "inset(0 0% 0 0)" }}
              transition={{ duration: 0.8, ease: "easeInOut", delay: 0.1 }}
              className="relative h-20 w-64 md:h-24 md:w-80"
            >
              <Image
                src="/logo/logo-white.png"
                alt="Al-Wosabe for Trading"
                fill
                priority
                className="object-contain"
              />
            </motion.div>
            
            {/* Title & Badge */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
              className="mt-4 flex flex-col items-center text-center"
            >
              <h1 className="text-sm font-black uppercase tracking-[0.2em] text-[#FF8A00]">
                {locale === "ar" ? "الوصابي للتجارة" : "Al-Wosabe for Trading"}
              </h1>
              <span className="mt-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-[10px] font-bold text-white/55">
                Since 1986
              </span>
            </motion.div>
          </div>

          {/* Glowing Route Progress Line */}
          <div className="relative h-[3px] w-48 overflow-hidden rounded-full bg-white/10">
            <motion.div
              initial={{ left: "-100%" }}
              animate={{ left: "100%" }}
              transition={{
                duration: 1.0,
                repeat: 0,
                ease: "easeInOut",
                delay: 0.2
              }}
              className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-[#FF8A00] to-transparent shadow-[0_0_8px_#FF8A00]"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
