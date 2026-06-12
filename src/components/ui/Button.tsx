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
    "focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold transition duration-300",
    variant === "primary" &&
      "bg-[#FF8A00] text-[#1B1B1D] shadow-[0_16px_40px_rgba(255,138,0,0.28)] hover:bg-[#FFC247]",
    variant === "secondary" &&
      "border border-white/20 bg-white/10 text-white backdrop-blur hover:border-[#FF8A00]/70 hover:bg-[#FF8A00]/15",
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
