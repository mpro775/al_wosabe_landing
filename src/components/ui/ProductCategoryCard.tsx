import type { LucideIcon } from "lucide-react";
import Image from "next/image";

export function ProductCategoryCard({
  title,
  description,
  image,
  icon: Icon,
}: {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
}) {
  return (
    <article className="gradient-top-border card-hover-glow group relative overflow-hidden rounded-xl border border-black/8 bg-white shadow-[0_18px_50px_rgba(27,27,29,0.06)]">
      {/* Product Image Header (4:3 Aspect Ratio) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1B1B1D]">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Subtle dark gradient overlay on image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
        
        {/* Icon Corner Badge */}
        <div className="absolute top-4 end-4 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#1B1B1D]/80 text-[#FFC247] backdrop-blur-md transition-all duration-400 group-hover:bg-gradient-to-br group-hover:from-[#FF8A00] group-hover:to-[#E87500] group-hover:text-[#1B1B1D] group-hover:shadow-[0_8px_20px_rgba(255,138,0,0.35)]">
          <Icon aria-hidden="true" size={20} strokeWidth={2.2} />
        </div>
      </div>

      <div className="p-6 relative">
        <h3 className="text-xl font-black text-[#1B1B1D]">{title}</h3>
        {/* Orange line expanding on Hover */}
        <div className="my-3 h-1 w-12 rounded-full bg-gradient-to-r from-[#FF8A00] to-[#FFC247] transition-all duration-400 group-hover:w-24" />
        <p className="text-sm leading-7 text-[#343438]/75">{description}</p>
      </div>
    </article>
  );
}
