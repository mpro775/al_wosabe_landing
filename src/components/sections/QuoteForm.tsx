"use client";

import { Send, Sparkles } from "lucide-react";
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

export function QuoteForm({ labels, locale }: { labels: Labels; locale: Locale }) {
  const [form, setForm] = useState(initialState);

  const update = (field: keyof typeof initialState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const message =
      locale === "ar"
        ? `طلب عرض سعر من موقع الوصابي للتجارة%0Aالاسم: ${form.name}%0Aالشركة/المحل: ${form.business}%0Aالهاتف: ${form.phone}%0Aالمدينة: ${form.city}%0Aالمنتج: ${form.product}%0Aالكمية: ${form.quantity}%0Aالتفاصيل: ${form.message}`
        : `Quote request from Al-Wosabe website%0AName: ${form.name}%0ABusiness: ${form.business}%0APhone: ${form.phone}%0ACity: ${form.city}%0AProduct: ${form.product}%0AQuantity: ${form.quantity}%0ADetails: ${form.message}`;

    window.open(whatsappHref(company.whatsappNumber, decodeURIComponent(message)), "_blank", "noopener,noreferrer");
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
        style={{ background: "linear-gradient(90deg, transparent, #ff8a00, #ffc247, #ff8a00, transparent)" }}
      />

      {/* Corner glow */}
      <div className="pointer-events-none absolute -top-20 -end-20 h-40 w-40 rounded-full bg-[#FF8A00]/8 blur-3xl" />

      <div className="relative grid gap-3 md:grid-cols-2">
        <input className={inputClass} required value={form.name} onChange={(e) => update("name", e.target.value)} placeholder={labels.name} aria-label={labels.name} />
        <input className={inputClass} value={form.business} onChange={(e) => update("business", e.target.value)} placeholder={labels.business} aria-label={labels.business} />
        <input className={inputClass} required value={form.phone} onChange={(e) => update("phone", e.target.value)} placeholder={labels.phone} aria-label={labels.phone} />
        <input className={inputClass} required value={form.city} onChange={(e) => update("city", e.target.value)} placeholder={labels.city} aria-label={labels.city} />
        <input className={inputClass} required value={form.product} onChange={(e) => update("product", e.target.value)} placeholder={labels.product} aria-label={labels.product} />
        <input className={inputClass} value={form.quantity} onChange={(e) => update("quantity", e.target.value)} placeholder={labels.quantity} aria-label={labels.quantity} />
        <textarea
          className={`${inputClass} min-h-28 resize-y md:col-span-2`}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder={labels.message}
          aria-label={labels.message}
        />
        <button
          type="submit"
          className="focus-ring group relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-[#FF8A00] to-[#E87500] px-5 py-3 text-sm font-black text-[#1B1B1D] shadow-[0_12px_30px_rgba(255,138,0,0.3)] transition-all duration-300 hover:from-[#FFC247] hover:to-[#FF8A00] hover:shadow-[0_16px_40px_rgba(255,138,0,0.4)] hover:scale-[1.02] active:scale-[0.98] md:col-span-2"
        >
          {/* Shimmer overlay */}
          <div className="pointer-events-none absolute inset-0 shimmer opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <Send aria-hidden="true" size={18} className="relative" />
          <span className="relative">{labels.submit}</span>
        </button>
      </div>
    </form>
  );
}
