"use client";

import { useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    setIsMobile(media.matches);
    const listener = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, []);

  // On mobile, collapse completely by default. On desktop, show first 3.
  const visiblePhones = isMobile
    ? (expanded ? phones : [])
    : (expanded ? phones : phones.slice(0, 3));

  const hasMore = phones.length > 3;

  return (
    <article className="gradient-top-border card-hover-glow group relative overflow-hidden rounded-xl border border-black/8 bg-white p-6 shadow-[0_18px_50px_rgba(27,27,29,0.06)] transition-all duration-400 hover:shadow-[0_24px_60px_rgba(27,27,29,0.1)]">
      {/* Header */}
      <div 
        onClick={() => isMobile && setExpanded(!expanded)}
        className={`flex items-center justify-between gap-4 select-none ${isMobile ? "cursor-pointer" : ""}`}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#1B1B1D] to-[#2a2a2e] text-[#FFC247] shadow-md">
            <MapPin size={18} aria-hidden="true" />
          </span>
          <h3 className="text-xl font-black text-[#1B1B1D]">{city}</h3>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-gradient-to-r from-[#FF8A00]/15 to-[#FFC247]/10 px-3 py-1 text-xs font-bold text-[#E87500]">
            {phones.length} {locale === "ar" 
              ? (phones.length > 1 ? "أرقام" : "رقم") 
              : (phones.length > 1 ? "numbers" : "number")}
          </span>
          
          {isMobile && (
            <span className="text-[#E87500] transition-transform duration-300">
              {expanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </span>
          )}
        </div>
      </div>

      {/* Phone Numbers Grid */}
      <div 
        className={`grid gap-2 transition-all duration-300 overflow-hidden ${
          isMobile 
            ? (expanded ? "mt-5 max-h-[500px] opacity-100" : "max-h-0 opacity-0") 
            : "mt-5 opacity-100"
        }`}
      >
        {visiblePhones.map((phone) => (
          <a
            key={phone}
            href={phoneHref(phone)}
            className="focus-ring flex min-h-11 items-center justify-between gap-3 rounded-lg border border-black/6 bg-[#F7F7F4]/80 px-3.5 py-2.5 text-sm font-bold text-[#343438] transition-all duration-300 hover:border-[#FF8A00]/40 hover:bg-gradient-to-r hover:from-[#FF8A00]/8 hover:to-[#FFC247]/5 hover:text-[#E87500] hover:shadow-[0_4px_12px_rgba(255,138,0,0.08)]"
            aria-label={`${callLabel} ${phone}`}
          >
            <span dir="ltr">{phone}</span>
            <Phone aria-hidden="true" size={15} className="opacity-50 transition-opacity group-hover:opacity-100" />
          </a>
        ))}

        {/* Show more/less button on desktop if phones.length > 3 */}
        {!isMobile && hasMore && (
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="mt-2 text-xs font-extrabold text-[#E87500] hover:text-[#FF8A00] transition-colors focus:outline-none text-start flex items-center gap-1 cursor-pointer w-fit"
          >
            {expanded ? (
              <>
                {locale === "ar" ? "عرض أقل" : "Show less"}
                <ChevronUp size={14} />
              </>
            ) : (
              <>
                {locale === "ar" ? `عرض كل الأرقام (${phones.length})` : `Show all numbers (${phones.length})`}
                <ChevronDown size={14} />
              </>
            )}
          </button>
        )}
      </div>
    </article>
  );
}
