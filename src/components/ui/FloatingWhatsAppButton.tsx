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
          className="fixed bottom-6 end-6 z-[90] flex items-center gap-2 rounded-full bg-emerald-600 p-3.5 text-sm font-bold text-white shadow-2xl hover:bg-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] md:px-5 md:py-3 transition-all select-none"
          style={{
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3), 0 0 15px rgba(16, 185, 129, 0.2)",
          }}
        >
          <MessageSquare size={18} />
          <span className="hidden md:inline">{label}</span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
