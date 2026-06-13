import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
};

export function Button({ href, variant = "primary", children, className, ...props }: ButtonProps) {
  const internal = href.startsWith("/") || href.startsWith("#");
  const classes = cn(
    "focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold transition-all duration-300",
    variant === "primary" &&
      "bg-gradient-to-r from-[#FF8A00] to-[#E87500] text-[#1B1B1D] shadow-[0_16px_40px_rgba(255,138,0,0.28)] hover:from-[#FFC247] hover:to-[#FF8A00] hover:shadow-[0_20px_50px_rgba(255,138,0,0.38)] hover:scale-[1.03] active:scale-[0.98]",
    variant === "secondary" &&
      "border border-white/20 bg-white/8 text-white backdrop-blur hover:border-[#FF8A00]/60 hover:bg-[#FF8A00]/12 hover:text-[#FFC247] hover:shadow-[0_0_20px_rgba(255,138,0,0.1)]",
    variant === "ghost" && "text-[#1B1B1D] hover:bg-black/5",
    className,
  );

  if (internal) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
}
