import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: "primary" | "secondary" | "ghost" | "steel";
  children: ReactNode;
};

export function Button({ href, variant = "primary", children, className, ...props }: ButtonProps) {
  const internal = href.startsWith("/") || href.startsWith("#");
  const classes = cn(
    "group focus-ring relative inline-flex min-h-12 items-center justify-center gap-2 overflow-hidden rounded-lg px-6 py-3 text-sm font-bold tracking-tight transition-all duration-300 active:scale-[0.98]",
    variant === "primary" &&
      "bg-[image:var(--grad-brand)] text-ink-950 shadow-[var(--shadow-elev-2)] hover:shadow-[var(--shadow-elev-3)] hover:brightness-[1.04]",
    variant === "secondary" &&
      "border border-white/15 bg-white/[0.04] text-on-dark backdrop-blur hover:border-brand/50 hover:bg-white/[0.07] hover:text-white",
    variant === "steel" &&
      "border border-steel-200 bg-paper text-ink-900 shadow-[var(--shadow-elev-1)] hover:border-steel-300 hover:shadow-[var(--shadow-elev-2)]",
    variant === "ghost" && "text-ink-900 hover:bg-ink-950/5",
    className,
  );

  const content = (
    <>
      {variant === "primary" ? <span className="btn-sheen" aria-hidden="true" /> : null}
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </>
  );

  if (internal) {
    return (
      <Link href={href} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...props}>
      {content}
    </a>
  );
}
