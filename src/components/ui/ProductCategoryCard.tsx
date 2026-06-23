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
    <article className="accent-top card-rise group flex h-full flex-col overflow-hidden rounded-2xl border border-steel-200 bg-paper shadow-[var(--shadow-elev-1)] hover:border-steel-300">
      {/* Product image */}
      <div className="relative aspect-[16/10] w-full shrink-0 overflow-hidden bg-ink-900">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent" />

        <div className="absolute inset-x-4 bottom-3 z-10 flex items-center justify-between gap-3">
          <h3 className="font-display truncate text-base font-bold text-white sm:text-lg">{title}</h3>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-ink-950/75 text-brand-bright backdrop-blur-md transition-all duration-300 group-hover:border-brand group-hover:bg-brand group-hover:text-ink-950">
            <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={2.1} />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-grow flex-col justify-between p-4 text-start sm:p-5">
        <div>
          <span className="mb-2.5 inline-flex items-center rounded-md border border-steel-200 bg-sand-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-graphite-500">
            {category}
          </span>
          <p className="text-xs leading-6 text-graphite-600 line-clamp-2 sm:text-sm">{description}</p>
        </div>
        <div className="mt-4 h-[2px] w-8 rounded-full bg-[image:var(--grad-brand)] transition-all duration-300 group-hover:w-16" />
      </div>
    </article>
  );
}
