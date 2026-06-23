import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "start",
  dark = false,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "start" | "center";
  dark?: boolean;
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      <span
        className={cn(
          "mb-5 inline-flex items-center gap-2.5 rounded-full border py-1.5 ps-2.5 pe-3.5 text-xs font-bold uppercase tracking-[0.2em]",
          dark
            ? "border-white/10 bg-white/[0.04] text-steel-300"
            : "border-steel-200 bg-paper text-graphite-500 shadow-[var(--shadow-elev-1)]",
        )}
      >
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand" />
        {eyebrow}
      </span>

      <h2
        className={cn(
          "font-display text-[1.75rem] font-bold leading-[1.15] tracking-tight sm:text-4xl lg:text-[2.75rem]",
          dark ? "text-white" : "text-ink-900",
        )}
      >
        {title}
      </h2>

      <div
        className={cn(
          "mt-5 h-[3px] w-14 rounded-full bg-[image:var(--grad-brand)]",
          align === "center" && "mx-auto",
        )}
      />

      {description ? (
        <p
          className={cn(
            "mt-6 text-base leading-[1.85] sm:text-lg",
            dark ? "text-steel-300" : "text-graphite-600",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
