import type { LucideIcon } from "lucide-react";

export function ProductCategoryCard({ title, description, Icon }: { title: string; description: string; Icon: LucideIcon }) {
  return (
    <article className="gradient-top-border card-hover-glow group relative rounded-xl border border-black/8 bg-white p-7 shadow-[0_18px_50px_rgba(27,27,29,0.06)]">
      {/* Subtle gradient overlay on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-[#FF8A00]/0 to-[#FFC247]/0 opacity-0 transition-opacity duration-500 group-hover:from-[#FF8A00]/3 group-hover:to-[#FFC247]/3 group-hover:opacity-100" />
      <div className="relative">
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#1B1B1D] text-[#FFC247] shadow-lg transition-all duration-400 group-hover:bg-gradient-to-br group-hover:from-[#FF8A00] group-hover:to-[#E87500] group-hover:text-[#1B1B1D] group-hover:shadow-[0_8px_24px_rgba(255,138,0,0.3)]">
          <Icon aria-hidden="true" size={27} strokeWidth={2.2} />
        </div>
        <h3 className="text-xl font-black text-[#1B1B1D]">{title}</h3>
        <div className="my-4 h-1 w-12 rounded-full bg-gradient-to-r from-[#FF8A00] to-[#FFC247] transition-all duration-400 group-hover:w-24" />
        <p className="text-sm leading-7 text-[#343438]/75">{description}</p>
      </div>
    </article>
  );
}
