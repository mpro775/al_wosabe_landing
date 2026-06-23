"use client";

import { AlertCircle, CheckCircle2, Loader2, Send } from "lucide-react";
import { useId, useState } from "react";
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
  { value: "Tools", label: { ar: "الأدوات والعدد", en: "Tools" } },
];

const citiesList = [
  { value: "Sana'a", label: { ar: "صنعاء", en: "Sana'a" } },
  { value: "Hodeidah", label: { ar: "الحديدة", en: "Hodeidah" } },
  { value: "Mukalla", label: { ar: "المكلا", en: "Mukalla" } },
  { value: "Bajel", label: { ar: "باجل", en: "Bajel" } },
  { value: "Zabid", label: { ar: "زبيد", en: "Zabid" } },
  { value: "Aden", label: { ar: "عدن", en: "Aden" } },
  { value: "Taiz", label: { ar: "تعز", en: "Taiz" } },
];

const fieldClass =
  "focus-ring min-h-12 w-full rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-semibold text-white transition-all duration-200 placeholder:font-normal placeholder:text-steel-400/60 hover:border-white/20 focus:border-brand/60 focus:bg-white/[0.06]";

function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-bold text-steel-300">
      {children}
      {required && (
        <span className="ms-1 text-brand" aria-hidden="true">
          *
        </span>
      )}
    </label>
  );
}

export function QuoteForm({ labels, locale }: { labels: Labels; locale: Locale }) {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const isAr = locale === "ar";
  const uid = useId();

  const update = (field: keyof typeof initialState, value: string) => {
    setError(null);
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.name.trim() || !form.phone.trim() || !form.city || !form.product) {
      setError(isAr ? "يرجى ملء جميع الحقول المطلوبة (المميزة بـ *)." : "Please fill in all required fields (marked *).");
      return;
    }

    setError(null);
    setSubmitting(true);
    setSuccessMsg(isAr ? "تم تجهيز رسالة واتساب، سيتم تحويلك الآن." : "WhatsApp message is ready. Redirecting now.");

    const formattedMessage = isAr
      ? `طلب عرض سعر من موقع الوصابي للتجارة\n\nالاسم: ${form.name}\nالشركة/المحل: ${form.business || "غير محدد"}\nالهاتف: ${form.phone}\nالمدينة: ${form.city}\nالمنتج: ${form.product}\nالكمية: ${form.quantity || "غير محدد"}\nالتفاصيل: ${form.message || "لا يوجد"}`
      : `Quote request from Al-Wosabe website\n\nName: ${form.name}\nBusiness: ${form.business || "Not specified"}\nPhone: ${form.phone}\nCity: ${form.city}\nProduct: ${form.product}\nQuantity: ${form.quantity || "Not specified"}\nDetails: ${form.message || "None"}`;

    setTimeout(() => {
      window.open(whatsappHref(company.whatsappNumber, formattedMessage), "_blank", "noopener,noreferrer");
      setSuccessMsg(null);
      setSubmitting(false);
      setForm(initialState);
    }, 1100);
  };

  return (
    <form
      onSubmit={submit}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-900/80 p-5 shadow-[var(--shadow-elev-3)] backdrop-blur-xl md:p-7"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-[image:var(--grad-brand)]" />

      <div className="grid gap-x-4 gap-y-4 md:grid-cols-2">
        <div>
          <FieldLabel htmlFor={`${uid}-name`} required>{labels.name}</FieldLabel>
          <input id={`${uid}-name`} className={fieldClass} required autoComplete="name" value={form.name} onChange={(e) => update("name", e.target.value)} />
        </div>
        <div>
          <FieldLabel htmlFor={`${uid}-business`}>{labels.business}</FieldLabel>
          <input id={`${uid}-business`} className={fieldClass} autoComplete="organization" value={form.business} onChange={(e) => update("business", e.target.value)} />
        </div>
        <div>
          <FieldLabel htmlFor={`${uid}-phone`} required>{labels.phone}</FieldLabel>
          <input id={`${uid}-phone`} type="tel" inputMode="tel" dir="ltr" className={fieldClass} required autoComplete="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} />
        </div>
        <div>
          <FieldLabel htmlFor={`${uid}-city`} required>{labels.city}</FieldLabel>
          <select id={`${uid}-city`} className={`${fieldClass} bg-ink-800`} required value={form.city} onChange={(e) => update("city", e.target.value)}>
            <option value="" disabled className="bg-ink-800 text-steel-400">{labels.city}</option>
            {citiesList.map((item) => (
              <option key={item.value} value={item.label[locale]} className="bg-ink-800 text-white">{item.label[locale]}</option>
            ))}
          </select>
        </div>
        <div>
          <FieldLabel htmlFor={`${uid}-product`} required>{labels.product}</FieldLabel>
          <select id={`${uid}-product`} className={`${fieldClass} bg-ink-800`} required value={form.product} onChange={(e) => update("product", e.target.value)}>
            <option value="" disabled className="bg-ink-800 text-steel-400">{labels.product}</option>
            {productsList.map((item) => (
              <option key={item.value} value={item.label[locale]} className="bg-ink-800 text-white">{item.label[locale]}</option>
            ))}
          </select>
        </div>
        <div>
          <FieldLabel htmlFor={`${uid}-quantity`}>{labels.quantity}</FieldLabel>
          <input id={`${uid}-quantity`} className={fieldClass} value={form.quantity} onChange={(e) => update("quantity", e.target.value)} />
        </div>

        <div className="md:col-span-2">
          <FieldLabel htmlFor={`${uid}-message`}>{labels.message}</FieldLabel>
          <textarea id={`${uid}-message`} className={`${fieldClass} min-h-28 resize-y`} value={form.message} onChange={(e) => update("message", e.target.value)} />
        </div>

        {error && (
          <div role="alert" className="flex items-start gap-2.5 rounded-lg border border-red-500/25 bg-red-500/10 px-3.5 py-2.5 text-xs font-bold leading-6 text-red-300 md:col-span-2">
            <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
            <span>{error}</span>
          </div>
        )}

        {successMsg && (
          <div role="status" aria-live="polite" className="flex items-start gap-2.5 rounded-lg border border-emerald-500/25 bg-emerald-500/10 px-3.5 py-2.5 text-xs font-bold leading-6 text-emerald-300 md:col-span-2">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
            <span>{successMsg}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="group focus-ring relative mt-1 inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-lg bg-[image:var(--grad-brand)] px-5 py-3 text-sm font-bold text-ink-950 shadow-[var(--shadow-elev-2)] transition-all duration-300 hover:shadow-[var(--shadow-elev-3)] hover:brightness-[1.04] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 md:col-span-2"
        >
          {!submitting && <span className="btn-sheen" aria-hidden="true" />}
          {submitting ? (
            <Loader2 aria-hidden="true" size={18} className="relative animate-spin" />
          ) : (
            <Send aria-hidden="true" size={18} className="relative rtl:-scale-x-100" />
          )}
          <span className="relative">{labels.submit}</span>
        </button>
      </div>
    </form>
  );
}
