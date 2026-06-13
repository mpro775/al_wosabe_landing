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
      <p className="mb-3 inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.18em] text-[#FF8A00]">
        <span
          className="inline-block h-1.5 w-1.5 rounded-full bg-[#FF8A00]"
          style={{ boxShadow: "0 0 8px rgba(255, 138, 0, 0.5)" }}
        />
        {eyebrow}
        <span
          className="inline-block h-1.5 w-1.5 rounded-full bg-[#FF8A00]"
          style={{ boxShadow: "0 0 8px rgba(255, 138, 0, 0.5)" }}
        />
      </p>
      <h2 className={cn("text-3xl font-black leading-tight sm:text-4xl lg:text-5xl", dark ? "text-white" : "text-[#1B1B1D]")}>
        {title}
      </h2>
      {/* Gradient underline accent */}
      <div
        className={cn("mx-0 mt-4 h-1 w-16 rounded-full", align === "center" && "mx-auto")}
        style={{ background: "linear-gradient(90deg, #ff8a00, #ffc247)" }}
      />
      {description ? (
        <p className={cn("mt-5 text-base leading-8 sm:text-lg", dark ? "text-white/70" : "text-[#343438]/75")}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
