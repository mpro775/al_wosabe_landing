"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { company, content, navigation } from "@/data/site";
import type { Locale } from "@/lib/locales";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function Header({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const otherLocale = locale === "ar" ? "en" : "ar";
  const labels = content[locale];
  const links = navigation[locale];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#1B1B1D]/82 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <Link href={`/${locale}#home`} className="focus-ring flex items-center" aria-label={locale === "ar" ? "الوصابي للتجارة" : "Al-Wosabe for Trading"}>
          <Image src={company.logo} alt="" width={250} height={65} priority className="h-12 w-auto object-contain" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {links.map(([label, id]) => (
            <a
              key={id}
              href={`#${id}`}
              className="focus-ring rounded-md px-3 py-2 text-sm font-bold text-white/75 transition hover:text-[#FFC247]"
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            href={`/${otherLocale}`}
            className="focus-ring rounded-md border border-white/15 px-4 py-2 text-sm font-extrabold text-white transition hover:border-[#FF8A00]/60 hover:text-[#FFC247]"
          >
            {labels.language}
          </Link>
          <Button href="#quote" className="min-h-11 px-4 py-2">
            {labels.cta}
          </Button>
        </div>

        <button
          type="button"
          className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/15 text-white lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      <div
        className={cn(
          "grid border-t border-white/10 bg-[#1B1B1D] transition-[grid-template-rows] duration-300 lg:hidden",
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
                className="focus-ring rounded-md px-3 py-3 text-base font-bold text-white/78 hover:bg-white/8 hover:text-[#FFC247]"
              >
                {label}
              </a>
            ))}
            <div className="mt-3 grid grid-cols-2 gap-3">
              <Link
                href={`/${otherLocale}`}
                className="focus-ring flex min-h-12 items-center justify-center rounded-md border border-white/15 text-sm font-extrabold text-white"
              >
                {labels.language}
              </Link>
              <a
                href="#quote"
                onClick={() => setOpen(false)}
                className="focus-ring flex min-h-12 items-center justify-center rounded-md bg-[#FF8A00] text-sm font-extrabold text-[#1B1B1D]"
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
