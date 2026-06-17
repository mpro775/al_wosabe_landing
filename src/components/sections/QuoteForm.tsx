"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { company } from "@/data/site";
import type { Locale } from "@/lib/locales";
import { whatsappHref } from "@/lib/utils";

type Labels = {
  name: string;
  business: string;
  phone: string;
  city: string;
  product: string;
  quantity: string;
  message: string;
  submit: string;
};

const initialState = {
  name: "",
  business: "",
  phone: "",
  city: "",
  product: "",
  quantity: "",
  message: "",
};

const productsList = [
  { value: "Tires", label: { ar: "الإطارات", en: "Tires" } },
  { value: "Batteries", label: { ar: "البطاريات", en: "Batteries" } },
  { value: "Lubricants", label: { ar: "الزيوت ومواد التشحيم", en: "Lubricants" } },
  { value: "Motorcycle Spare Parts", label: { ar: "قطع غيار الدراجات النارية", en: "Motorcycle Spare Parts" } },
  { value: "Accessories", label: { ar: "الإكسسوارات", en: "Accessories" } },
  { value: "Tools", label: { ar: "الأدوات والعدد", en: "Tools" } }
];

const citiesList = [
  { value: "Sana'a", label: { ar: "صنعاء", en: "Sana'a" } },
  { value: "Hodeidah", label: { ar: "الحديدة", en: "Hodeidah" } },
  { value: "Mukalla", label: { ar: "المكلا", en: "Mukalla" } },
  { value: "Bajel", label: { ar: "باجل", en: "Bajel" } },
  { value: "Zabid", label: { ar: "زبيد", en: "Zabid" } },
  { value: "Aden", label: { ar: "عدن", en: "Aden" } },
  { value: "Taiz", label: { ar: "تعز", en: "Taiz" } }
];

export function QuoteForm({ labels, locale }: { labels: Labels; locale: Locale }) {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const isAr = locale === "ar";

  const update = (field: keyof typeof initialState, value: string) => {
    setError(null);
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Check required fields
    if (!form.name.trim() || !form.phone.trim() || !form.city || !form.product) {
      setError(isAr ? "يرجى ملء جميع الحقول المطلوبة." : "Please fill in all required fields.");
      return;
    }

    setError(null);
    setSuccessMsg(isAr ? "تم تجهيز رسالة واتساب، سيتم تحويلك الآن." : "WhatsApp message is ready. Redirecting now.");

    const formattedMessage =
      isAr
        ? `طلب عرض سعر من موقع الوصابي للتجارة\n\nالاسم: ${form.name}\nالشركة/المحل: ${form.business || "غير محدد"}\nالهاتف: ${form.phone}\nالمدينة: ${form.city}\nالمنتج: ${form.product}\nالكمية: ${form.quantity || "غير محدد"}\nالتفاصيل: ${form.message || "لا يوجد"}`
        : `Quote request from Al-Wosabe website\n\nName: ${form.name}\nBusiness: ${form.business || "Not specified"}\nPhone: ${form.phone}\nCity: ${form.city}\nProduct: ${form.product}\nQuantity: ${form.quantity || "Not specified"}\nDetails: ${form.message || "None"}`;

    setTimeout(() => {
      window.open(whatsappHref(company.whatsappNumber, formattedMessage), "_blank", "noopener,noreferrer");
      setSuccessMsg(null);
      setForm(initialState);
    }, 1100);
  };

  const inputClass =
    "focus-ring min-h-12 rounded-lg border border-white/10 bg-white/6 px-4 py-3 text-sm font-semibold text-white placeholder:text-white/30 transition-all duration-300 hover:border-white/20 hover:bg-white/8 focus:border-[#FF8A00]/50 focus:bg-white/10 focus:shadow-[0_0_15px_rgba(255,138,0,0.1)]";

  return (
    <form
      onSubmit={submit}
      className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-5 shadow-2xl backdrop-blur-xl md:p-6"
    >
      {/* Top gradient accent */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
        style={{ background: "gradient-to-r from-transparent via-[#ff8a00] to-transparent", backgroundImage: "linear-gradient(90deg, transparent, #ff8a00, #ffc247, #ff8a00, transparent)" }}
      />

      {/* Corner glow */}
      <div className="pointer-events-none absolute -top-20 -end-20 h-40 w-40 rounded-full bg-[#FF8A00]/8 blur-3xl" />

      <div className="relative grid gap-3 md:grid-cols-2">
        <input className={inputClass} required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder={labels.name} aria-label={labels.name} />
        <input className={inputClass} value={form.business} onChange={(e) => update("business", e.target.value)} placeholder={labels.business} aria-label={labels.business} />
        <input className={inputClass} required value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder={labels.phone} aria-label={labels.phone} />

        {/* City Dropdown */}
        <select
          className={`${inputClass} text-white/95 bg-[#1C1C1E]`}
          required
          value={form.city}
          onChange={(e) => update("city", e.target.value)}
          aria-label={labels.city}
        >
          <option value="" disabled className="text-white/40 bg-[#1C1C1E]">
            {labels.city}
          </option>
          {citiesList.map((item) => (
            <option
              key={item.value}
              value={item.label[locale]}
              className="text-white bg-[#1C1C1E]"
            >
              {item.label[locale]}
            </option>
          ))}
        </select>

        {/* Product Category Dropdown */}
        <select
          className={`${inputClass} text-white/95 bg-[#1C1C1E]`}
          required
          value={form.product}
          onChange={(e) => update("product", e.target.value)}
          aria-label={labels.product}
        >
          <option value="" disabled className="text-white/40 bg-[#1C1C1E]">
            {labels.product}
          </option>
          {productsList.map((item) => (
            <option
              key={item.value}
              value={item.label[locale]}
              className="text-white bg-[#1C1C1E]"
            >
              {item.label[locale]}
            </option>
          ))}
        </select>

        <input className={inputClass} value={form.quantity} onChange={(e) => update("quantity", e.target.value)} placeholder={labels.quantity} aria-label={labels.quantity} />

        <textarea
          className={`${inputClass} min-h-28 resize-y md:col-span-2`}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder={labels.message}
          aria-label={labels.message}
        />

        {error && (
          <div className="text-red-400 text-xs font-bold leading-6 md:col-span-2 text-start bg-red-950/30 border border-red-500/20 px-3.5 py-2.5 rounded-lg">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="text-green-400 text-xs font-bold leading-6 md:col-span-2 text-start bg-green-950/30 border border-green-500/20 px-3.5 py-2.5 rounded-lg animate-pulse">
            {successMsg}
          </div>
        )}

        <button
          type="submit"
          className="focus-ring group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-[#FF8A00] to-[#E87500] px-5 py-3 text-sm font-bold text-[#1B1B1D] shadow-[0_12px_30px_rgba(255,138,0,0.3)] transition-all duration-300 hover:from-[#FFC247] hover:to-[#FF8A00] hover:shadow-[0_16px_40px_rgba(255,138,0,0.4)] hover:scale-[1.02] active:scale-[0.98] md:col-span-2 cursor-pointer"
        >
          {/* Shimmer overlay */}
          <div className="pointer-events-none absolute inset-0 shimmer opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <Send aria-hidden="true" size={18} className="relative animate-none" />
          <span className="relative">{labels.submit}</span>
        </button>
      </div>
    </form>
  );
}
