"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { company, content, navigation } from "@/data/site";
import type { Locale } from "@/lib/locales";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function Header({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const otherLocale = locale === "ar" ? "en" : "ar";
  const labels = content[locale];
  const links = navigation[locale];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-white/8 bg-[#141416]/92 shadow-[0_4px_30px_rgba(0,0,0,0.3)] backdrop-blur-2xl"
          : "border-b border-white/10 bg-[#1B1B1D]/72 backdrop-blur-xl",
      )}
    >
      {/* Glowing bottom accent line */}
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 h-[1px] transition-opacity duration-500",
          scrolled ? "opacity-100" : "opacity-0",
        )}
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,138,0,0.4), rgba(255,194,71,0.3), rgba(255,138,0,0.4), transparent)",
        }}
      />

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}#home`}
          className="focus-ring group flex items-center"
          aria-label={locale === "ar" ? "الوصابي للتجارة" : "Al-Wosabe for Trading"}
        >
          <Image
            src={company.logo}
            alt=""
            width={250}
            height={65}
            priority
            className="h-12 w-auto object-contain transition-all duration-300 group-hover:brightness-110 group-hover:drop-shadow-[0_0_12px_rgba(255,138,0,0.3)]"
          />
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Main navigation">
          {links.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className="animated-underline focus-ring relative rounded-md px-3.5 py-2 text-sm font-bold text-white/70 transition-all duration-300 hover:text-[#FFC247]"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex">
          <Link
            href={`/${otherLocale}`}
            className="focus-ring rounded-md border border-white/12 bg-white/5 px-4 py-2 text-sm font-extrabold text-white transition-all duration-300 hover:border-[#FF8A00]/50 hover:bg-[#FF8A00]/10 hover:text-[#FFC247] hover:shadow-[0_0_15px_rgba(255,138,0,0.1)]"
          >
            {labels.language}
          </Link>
          <Button href="#quote" className="min-h-11 px-4 py-2">
            {labels.cta}
          </Button>
        </div>

        <button
          type="button"
          className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/15 text-white transition-all duration-300 hover:border-[#FF8A00]/50 hover:bg-[#FF8A00]/10 hover:text-[#FFC247] lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <div
        className={cn(
          "grid border-t border-white/8 bg-[#141416]/95 backdrop-blur-2xl transition-[grid-template-rows] duration-300 lg:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <nav className="grid gap-1 px-5 py-5" aria-label="Mobile navigation">
            {links.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setOpen(false)}
                className="focus-ring rounded-md px-3 py-3 text-base font-bold text-white/78 transition-all duration-300 hover:bg-[#FF8A00]/8 hover:text-[#FFC247]"
              >
                {label}
              </a>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Link
                href={`/${otherLocale}`}
                className="focus-ring flex min-h-12 items-center justify-center rounded-md border border-white/15 bg-white/5 text-sm font-extrabold text-white transition-all duration-300 hover:border-[#FF8A00]/50 hover:bg-[#FF8A00]/10"
              >
                {labels.language}
              </Link>
              <a
                href="#quote"
                onClick={() => setOpen(false)}
                className="focus-ring flex min-h-12 items-center justify-center rounded-md bg-gradient-to-r from-[#FF8A00] to-[#E87500] text-sm font-extrabold text-[#1B1B1D] shadow-[0_8px_24px_rgba(255,138,0,0.3)] transition-all duration-300 hover:from-[#FFC247] hover:to-[#FF8A00]"
              >
                {labels.cta}
              </a>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
