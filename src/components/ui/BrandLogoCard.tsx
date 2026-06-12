export function BrandLogoCard({ label }: { label: string }) {
  return (
    <div className="group flex h-28 items-center justify-center rounded-lg border border-black/10 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#FF8A00]/60 hover:shadow-xl">
      <div className="flex h-14 w-full items-center justify-center rounded-md border border-dashed border-[#343438]/25 bg-[#F7F7F4] text-sm font-black tracking-[0.18em] text-[#343438]/45 transition duration-300 group-hover:border-[#FF8A00]/70 group-hover:text-[#FF8A00]">
        {label}
      </div>
    </div>
  );
}
