export function BrandLogoCard({ label }: { label: string }) {
  return (
    <div className="card-hover-glow group relative flex h-32 items-center justify-center overflow-hidden rounded-xl border border-black/6 bg-white p-5 shadow-sm">
      {/* Gradient accent on hover */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF8A00] to-transparent opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
      <div className="flex h-16 w-full items-center justify-center rounded-lg border border-dashed border-[#343438]/20 bg-gradient-to-br from-[#F7F7F4] to-[#f0f0ec] text-sm font-black tracking-[0.18em] text-[#343438]/40 transition-all duration-400 group-hover:border-[#FF8A00]/50 group-hover:bg-gradient-to-br group-hover:from-[#FF8A00]/8 group-hover:to-[#FFC247]/5 group-hover:text-[#FF8A00] group-hover:shadow-inner">
        {label}
      </div>
    </div>
  );
}
