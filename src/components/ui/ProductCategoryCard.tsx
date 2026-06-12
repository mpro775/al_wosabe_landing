import type { LucideIcon } from "lucide-react";

export function ProductCategoryCard({ title, description, Icon }: { title: string; description: string; Icon: LucideIcon }) {
  return (
    <article className="group rounded-lg border border-black/10 bg-white p-6 shadow-[0_18px_50px_rgba(27,27,29,0.08)] transition duration-300 hover:-translate-y-1 hover:border-[#FF8A00]/50 hover:shadow-[0_22px_70px_rgba(27,27,29,0.12)]">
      <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-md bg-[#1B1B1D] text-[#FFC247] transition duration-300 group-hover:bg-[#FF8A00] group-hover:text-[#1B1B1D]">
        <Icon aria-hidden="true" size={27} strokeWidth={2.2} />
      </div>
      <h3 className="text-xl font-black text-[#1B1B1D]">{title}</h3>
      <div className="my-4 h-1 w-12 rounded-full bg-[#FF8A00] transition-all duration-300 group-hover:w-20" />
      <p className="text-sm leading-7 text-[#343438]/75">{description}</p>
    </article>
  );
}
