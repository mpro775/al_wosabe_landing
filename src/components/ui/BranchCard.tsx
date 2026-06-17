"use client";

import { useState } from "react";
import { MapPin, Phone, ChevronDown, ChevronUp } from "lucide-react";
import { phoneHref } from "@/lib/utils";

export function BranchCard({
  city,
  phones,
  callLabel,
  locale,
}: {
  city: string;
  phones: string[];
  callLabel: string;
  locale: "ar" | "en";
}) {
  const [expanded, setExpanded] = useState(false);

  const labels = {
    ar: {
      phoneLabelSingular: "رقم",
      phoneLabelPlural: "أرقام",
      showAllLabel: `عرض كل الأرقام (${phones.length})`,
      hideLabel: "إخفاء الأرقام",
      tapToViewLabel: "اضغط لعرض أرقام الفرع",
    },
    en: {
      phoneLabelSingular: "number",
      phoneLabelPlural: "numbers",
      showAllLabel: `Show all numbers (${phones.length})`,
      hideLabel: "Hide numbers",
      tapToViewLabel: "Tap to view branch numbers",
    },
  }[locale];

  const hasMore = phones.length > 3;

  return (
    <article className="gradient-top-border card-hover-glow group relative overflow-hidden rounded-xl border border-black/8 bg-white p-6 shadow-[0_18px_50px_rgba(27,27,29,0.06)] transition-all duration-400 hover:shadow-[0_24px_60px_rgba(27,27,29,0.1)]">
      {/* Header */}
      <div 
        onClick={() => setExpanded(!expanded)}
        className="flex items-center justify-between gap-4 select-none cursor-pointer"
      >
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#1B1B1D] to-[#2a2a2e] text-[#FFC247] shadow-md">
            <MapPin size={18} aria-hidden="true" />
          </span>
          <h3 className="text-xl font-black text-[#1B1B1D]">{city}</h3>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-gradient-to-r from-[#FF8A00]/15 to-[#FFC247]/10 px-3 py-1 text-xs font-bold text-[#E87500]">
            {phones.length} {phones.length > 1 ? labels.phoneLabelPlural : labels.phoneLabelSingular}
          </span>
          
          <span className="text-[#E87500] transition-transform duration-300">
            {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </span>
        </div>
      </div>

      {/* Tap to View Branch Numbers Banner for Mobile ONLY when collapsed */}
      {!expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="focus-ring mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-[#FF8A00]/30 bg-[#FF8A00]/5 py-2.5 text-xs font-bold text-[#E87500] md:hidden transition-all duration-300 hover:bg-[#FF8A00]/10"
        >
          <span>{labels.tapToViewLabel}</span>
          <ChevronDown size={14} />
        </button>
      )}

      {/* Phone Numbers List */}
      <div 
        className={`grid gap-2 transition-all duration-300 overflow-hidden mt-5 ${
          expanded ? "max-h-[800px] opacity-100" : "max-h-0 md:max-h-[300px] opacity-0 md:opacity-100 max-md:hidden"
        }`}
      >
        {phones.map((phone, index) => {
          // If collapsed, only show the first 3 on desktop, and hide all on mobile (handled by layout classes).
          // If expanded, show all on both.
          const isExtra = index >= 3;
          return (
            <a
              key={phone}
              href={phoneHref(phone)}
              className={`focus-ring items-center justify-between gap-3 rounded-lg border border-black/6 bg-[#F7F7F4]/80 px-3.5 py-2.5 text-sm font-bold text-[#343438] transition-all duration-300 hover:border-[#FF8A00]/40 hover:bg-gradient-to-r hover:from-[#FF8A00]/8 hover:to-[#FFC247]/5 hover:text-[#E87500] hover:shadow-[0_4px_12px_rgba(255,138,0,0.08)] ${
                isExtra && !expanded ? "hidden" : "flex"
              }`}
              aria-label={`${callLabel} ${phone}`}
            >
              <span dir="ltr">{phone}</span>
              <Phone aria-hidden="true" size={15} className="opacity-50 transition-opacity group-hover:opacity-100" />
            </a>
          );
        })}

        {/* Toggle Button for Desktop (always visible) and Mobile (only when expanded) */}
        {(hasMore || expanded) && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className={`text-xs font-extrabold text-[#E87500] hover:text-[#FF8A00] transition-colors focus:outline-none text-start flex items-center gap-1 cursor-pointer w-fit mt-2 ${
              !expanded ? "max-md:hidden" : ""
            }`}
          >
            {expanded ? (
              <>
                {labels.hideLabel}
                <ChevronUp size={14} />
              </>
            ) : (
              <>
                {labels.showAllLabel}
                <ChevronDown size={14} />
              </>
            )}
          </button>
        )}
      </div>
    </article>
  );
}
