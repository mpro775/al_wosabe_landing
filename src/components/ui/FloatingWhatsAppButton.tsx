"use client";

import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { company } from "@/data/site";
import { whatsappHref } from "@/lib/utils";

export function FloatingWhatsAppButton({ locale }: { locale: "ar" | "en" }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const message =
    locale === "ar"
      ? "مرحباً، أريد الاستفسار عن منتجات وخدمات الوصابي للتجارة."
      : "Hello, I would like to inquire about Al-Wosabe's trading products and services.";

  const label = locale === "ar" ? "تواصل واتساب" : "WhatsApp";

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          href={whatsappHref(company.whatsappNumber, message)}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring fixed bottom-6 end-6 z-[90] flex select-none items-center gap-2 rounded-full bg-emerald-600 p-3.5 text-sm font-bold text-white shadow-[var(--shadow-elev-3)] transition-all hover:bg-emerald-500 md:px-5 md:py-3"
        >
          <MessageSquare size={18} />
          <span className="hidden md:inline">{label}</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
