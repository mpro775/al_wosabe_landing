import { MapPin, Phone } from "lucide-react";
import { phoneHref } from "@/lib/utils";

export function BranchCard({
  city,
  phones,
  callLabel,
}: {
  city: string;
  phones: string[];
  callLabel: string;
}) {
  return (
    <article className="gradient-top-border group relative overflow-hidden rounded-xl border border-black/8 bg-white p-6 shadow-[0_18px_50px_rgba(27,27,29,0.06)] transition-all duration-400 hover:shadow-[0_24px_60px_rgba(27,27,29,0.1)]">
      <div className="mb-5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#1B1B1D] to-[#2a2a2e] text-[#FFC247] shadow-md">
            <MapPin size={18} aria-hidden="true" />
          </span>
          <h3 className="text-xl font-black text-[#1B1B1D]">{city}</h3>
        </div>
        <span className="rounded-full bg-gradient-to-r from-[#FF8A00]/15 to-[#FFC247]/10 px-3 py-1 text-xs font-bold text-[#E87500]">
          {phones.length} {phones.length > 1 ? "أرقام" : "رقم"}
        </span>
      </div>
      <div className="grid gap-2">
        {phones.map((phone) => (
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
      </div>
    </article>
  );
}
