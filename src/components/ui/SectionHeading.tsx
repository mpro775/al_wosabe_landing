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
      <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.18em] text-[#FF8A00]">{eyebrow}</p>
      <h2 className={cn("text-3xl font-black leading-tight sm:text-4xl lg:text-5xl", dark ? "text-white" : "text-[#1B1B1D]")}>
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-5 text-base leading-8 sm:text-lg", dark ? "text-white/70" : "text-[#343438]/75")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
