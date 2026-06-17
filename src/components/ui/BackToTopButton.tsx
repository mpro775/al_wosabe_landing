"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 700);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          onClick={scrollToTop}
          type="button"
          className="fixed bottom-[84px] end-6 z-[90] flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-[#1B1B1D]/90 text-[#FFC247] shadow-2xl backdrop-blur-md hover:bg-[#FF8A00] hover:text-[#1B1B1D] hover:border-[#FF8A00] hover:shadow-[0_0_15px_rgba(255,138,0,0.3)] transition-all cursor-pointer select-none"
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
