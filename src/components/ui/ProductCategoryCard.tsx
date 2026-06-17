import type { LucideIcon } from "lucide-react";
import Image from "next/image";

export function ProductCategoryCard({
  title,
  description,
  image,
  icon: Icon,
  category,
}: {
  title: string;
  description: string;
  image: string;
  icon: LucideIcon;
  category: string;
}) {
  return (
    <article className="gradient-top-border group relative overflow-hidden rounded-xl border border-black/8 bg-white shadow-[0_18px_50px_rgba(27,27,29,0.06)] transition-all duration-400 hover:-translate-y-1.5 hover:border-[#FF8A00]/40 hover:shadow-[0_0_25px_rgba(255,138,0,0.15),0_18px_50px_rgba(27,27,29,0.06)] flex flex-col h-full">
      {/* Product Image Header (16:10 Aspect Ratio for modern crops) */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1B1B1D] shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
        />
        {/* Deep dark gradient overlay at the bottom of the image for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent pointer-events-none" />

        {/* Title and Icon overlayed at the bottom of the image */}
        <div className="absolute bottom-3 inset-x-3.5 flex items-center justify-between gap-3 z-10">
          <h3 className="text-sm sm:text-base md:text-lg font-bold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] truncate">
            {title}
          </h3>
          {/* Icon Badge */}
          <div className="flex h-7 w-7 sm:h-8.5 sm:w-8.5 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-[#1B1B1D]/80 text-[#FFC247] backdrop-blur-md transition-all duration-400 group-hover:bg-[#FF8A00] group-hover:text-white group-hover:border-[#FF8A00] group-hover:-translate-y-0.5 group-hover:shadow-[0_4px_12px_rgba(255,138,0,0.35)]">
            <Icon aria-hidden="true" className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform duration-300" strokeWidth={2.2} />
          </div>
        </div>
      </div>

      {/* Card Content (Description & Category Badge) */}
      <div className="p-3.5 sm:p-5 relative text-start flex flex-col justify-between flex-grow">
        <div>
          {/* Category Badge */}
          <div className="mb-2">
            <span className="inline-flex items-center gap-1 rounded bg-[#FF8A00]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#E87500]">
              {category}
            </span>
          </div>

          {/* Description */}
          <p className="text-[11px] sm:text-xs md:text-sm leading-5 sm:leading-6 text-[#343438]/75 line-clamp-2">
            {description}
          </p>
        </div>

        {/* Orange line expanding on Hover */}
        <div className="mt-4 h-[2px] w-8 rounded-full bg-gradient-to-r from-[#FF8A00] to-[#FFC247] transition-all duration-400 group-hover:w-16" />
      </div>

      {/* Orange accent line at the absolute bottom of the card expanding to 100% width on hover */}
      <div className="absolute bottom-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#FF8A00] to-[#FFC247] scale-x-0 origin-left transition-transform duration-400 group-hover:scale-x-100" />
    </article>
  );
}
