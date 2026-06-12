import { Phone } from "lucide-react";
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
    <article className="rounded-lg border border-black/10 bg-white p-5 shadow-[0_18px_50px_rgba(27,27,29,0.08)]">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="text-xl font-black text-[#1B1B1D]">{city}</h3>
        <span className="rounded-full bg-[#FF8A00]/12 px-3 py-1 text-xs font-bold text-[#E87500]">{phones.length}</span>
      </div>
      <div className="grid gap-2">
        {phones.map((phone) => (
          <a
            key={phone}
            href={phoneHref(phone)}
            className="focus-ring flex min-h-11 items-center justify-between gap-3 rounded-md border border-black/10 px-3 py-2 text-sm font-bold text-[#343438] transition hover:border-[#FF8A00]/60 hover:bg-[#FF8A00]/8"
            aria-label={`${callLabel} ${phone}`}
          >
            <span dir="ltr">{phone}</span>
            <Phone aria-hidden="true" size={16} />
          </a>
        ))}
      </div>
    </article>
  );
}
