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
    "focus-ring min-h-12 rounded-md border border-white/12 bg-white/8 px-4 py-3 text-sm font-semibold text-white placeholder:text-white/35 transition hover:border-white/25";

  return (
    <form onSubmit={submit} className="grid gap-3 rounded-lg border border-white/12 bg-white/8 p-4 shadow-2xl backdrop-blur md:grid-cols-2 md:p-5">
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
        className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-[#FF8A00] px-5 py-3 text-sm font-black text-[#1B1B1D] transition hover:bg-[#FFC247] md:col-span-2"
      >
        <Send aria-hidden="true" size={18} />
        {labels.submit}
      </button>
    </form>
  );
}
