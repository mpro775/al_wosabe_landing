"use client";

import Image from "next/image";
import Link from "next/link";
import { Globe, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { company, content, navigation } from "@/data/site";
import type { Locale } from "@/lib/locales";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function Header({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("home");
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

  useEffect(() => {
    const sectionIds = links.map(([_, id]) => id);

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "-30% 0px -50% 0px",
      threshold: 0.1,
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        const lastId = sectionIds[sectionIds.length - 1];
        if (lastId) {
          setActiveSection(lastId);
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [links]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-white/[0.07] bg-ink-950/95 shadow-[0_4px_30px_rgba(0,0,0,0.35)] backdrop-blur-2xl"
          : "border-b border-white/[0.06] bg-ink-950/55 backdrop-blur-xl",
      )}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}#home`}
          className="focus-ring group flex items-center"
          aria-label={locale === "ar" ? "الوصابي للتجارة" : "Al-Wosabe for Trading"}
        >
          <Image
            src="/logo/logo-white.png"
            alt=""
            width={220}
            height={55}
            priority
            className="h-10 w-auto object-contain transition-opacity duration-300 group-hover:opacity-90 xl:h-11"
          />
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex" aria-label="Main navigation">
          {links.map(([label, id]) => {
            const isActive = activeSection === id;
            return (
              <a
                key={id}
                href={`#${id}`}
                className={cn(
                  "animated-underline focus-ring relative rounded-md px-3.5 py-2 text-sm font-bold transition-colors duration-300",
                  isActive ? "active text-brand-bright" : "text-steel-200 hover:text-white",
                )}
              >
                {label}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2.5 xl:flex">
          <Link
            href={`/${otherLocale}`}
            className="focus-ring group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-all duration-300 hover:border-brand/50 hover:bg-brand/10"
            aria-label={locale === "ar" ? "تغيير اللغة إلى الإنجليزية" : "Switch language to English"}
          >
            <Globe className="h-5 w-5 text-steel-300 transition-transform duration-500 group-hover:rotate-12 group-hover:text-brand-bright" />
          </Link>
          <Button href="#quote" className="min-h-11 px-4 py-2">
            {labels.cta}
          </Button>
        </div>

        <div className="flex items-center gap-3 xl:hidden">
          <Link
            href={`/${otherLocale}`}
            className="focus-ring group flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-all duration-300 hover:border-brand/50 hover:bg-brand/10"
            aria-label={locale === "ar" ? "تغيير اللغة إلى الإنجليزية" : "Switch language to English"}
          >
            <Globe className="h-5 w-5 text-steel-300 transition-transform duration-500 group-hover:rotate-12 group-hover:text-brand-bright" />
          </Link>

          <button
            type="button"
            className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-md border border-white/10 text-white transition-all duration-300 hover:border-brand/50 hover:bg-brand/10 hover:text-brand-bright"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "grid border-t border-white/[0.07] bg-ink-950/97 backdrop-blur-2xl transition-[grid-template-rows] duration-300 xl:hidden",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className="overflow-hidden">
          <nav className="grid gap-1 px-5 py-5" aria-label="Mobile navigation">
            {links.map(([label, id]) => {
              const isActive = activeSection === id;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "focus-ring rounded-md px-3 py-3 text-base font-bold transition-colors duration-300 hover:bg-brand/10",
                    isActive ? "text-brand-bright" : "text-steel-200 hover:text-white",
                  )}
                >
                  {label}
                </a>
              );
            })}
            <div className="mt-3">
              <a
                href="#quote"
                onClick={() => setOpen(false)}
                className="focus-ring flex min-h-12 items-center justify-center rounded-lg bg-[image:var(--grad-brand)] text-sm font-bold text-ink-950 shadow-[var(--shadow-elev-2)] transition-all duration-300 hover:brightness-[1.04]"
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
