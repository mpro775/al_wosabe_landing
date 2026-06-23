"use client";

import { useState } from "react";
import { ArrowUpRight, Building2, CheckCircle2, MapPin, Phone, Truck, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ProductCategoryCard } from "@/components/ui/ProductCategoryCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { QuoteForm } from "@/components/sections/QuoteForm";
import { SplitTextReveal } from "@/components/ui/SplitTextReveal";
import { ParallaxImage } from "@/components/ui/ParallaxImage";
import { BrandMarquee } from "@/components/ui/BrandMarquee";
import { AnimatedRouteMap } from "@/components/ui/AnimatedRouteMap";
import { ProductShowcase, useShowcaseCycle } from "@/components/ui/ProductShowcase";
import {
  branches,
  brands,
  company,
  content,
  products,
  structuredOrganization,
  valueIcons,
} from "@/data/site";
import type { Locale } from "@/lib/locales";
import { cn, phoneHref, whatsappHref } from "@/lib/utils";

export function LandingPage({ locale }: { locale: Locale }) {
  const years = new Date().getFullYear() - company.establishedYear;

  return (
    <>
      <Header locale={locale} />
      <main className="overflow-x-hidden">
        <Hero locale={locale} years={years} />
        <Stats locale={locale} years={years} />
        <About locale={locale} />
        <Operations locale={locale} />
        <Products locale={locale} />
        <Brands locale={locale} />
        <Distribution locale={locale} />
        <Fleet locale={locale} />
        <Branches locale={locale} />
        <Values locale={locale} />
        <Team locale={locale} />
        <Quote locale={locale} />
      </main>
      <Footer locale={locale} />
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredOrganization) }}
      />
    </>
  );
}

/* ───────────────────────── Hero ───────────────────────── */
function Hero({ locale, years }: { locale: Locale; years: number }) {
  const hero = content[locale].hero;
  const isAr = locale === "ar";
  const showcaseProducts = products[locale];
  const { active, setActive, setPaused, reduce } = useShowcaseCycle(showcaseProducts.length);
  const activeTitle = showcaseProducts[active].title;

  const credentials: [string, string][] = isAr
    ? [
        ["1986", "سنة التأسيس"],
        [`${years}+`, "عامًا من الخبرة"],
        [`${branches.length}`, "فروع رئيسية"],
        ["50K+", "عميل وتاجر"],
      ]
    : [
        ["1986", "Established"],
        [`${years}+`, "Years"],
        [`${branches.length}`, "Branches"],
        ["50K+", "Clients"],
      ];

  return (
    <section
      id="home"
      className="relative flex min-h-[760px] items-center overflow-hidden bg-ink-950 pt-28 text-on-dark md:min-h-screen"
    >
      {/* Single quiet ambient layer + faint engineering grid */}
      <div className="ambient-dark pointer-events-none absolute inset-0 z-0" />
      <div className="blueprint-grid pointer-events-none absolute inset-0 z-0 opacity-70" />

      <Container className="relative z-10 grid min-h-[calc(100vh-7rem)] items-center gap-12 py-16 lg:grid-cols-[1.02fr_0.98fr] lg:gap-10">
        {/* Copy column */}
        <div className="flex w-full min-w-0 flex-col items-center text-center lg:items-start lg:text-start">
          <Reveal delay={0.05}>
            <span className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] py-1.5 ps-2.5 pe-4 text-xs font-bold uppercase tracking-[0.18em] text-steel-300 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-brand" />
              {hero.eyebrow}
            </span>
          </Reveal>

          <h1 className="font-display w-full text-center text-[2.6rem] font-extrabold leading-[1.06] tracking-tight text-white sm:text-6xl lg:text-start lg:text-[4.25rem] xl:text-[4.75rem]">
            <SplitTextReveal text={isAr ? "الوصابي" : "Al-Wosabe"} />{" "}
            <span className="text-gradient">
              <SplitTextReveal text={isAr ? "للتجارة" : "for Trading"} />
            </span>
          </h1>

          {/* Kinetic line synced to the product showcase */}
          <Reveal delay={0.25} className="w-full">
            <p className="mt-6 flex w-full flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-lg font-bold text-steel-300 sm:text-xl lg:justify-start">
              <span>{isAr ? "نوفّر لكل مركبة" : "Everything your vehicle needs"}</span>
              <span aria-hidden="true" className="text-steel-500">—</span>
              <span className="relative inline-flex min-h-[1.5em] max-w-full items-center">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={active}
                    className="text-gradient font-extrabold"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: -14 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {activeTitle}
                  </motion.span>
                </AnimatePresence>
              </span>
            </p>
          </Reveal>

          <Reveal delay={0.35} className="flex w-full justify-center lg:justify-start">
            <p className="mt-4 max-w-xl text-base leading-[1.9] text-steel-400">{hero.description}</p>
          </Reveal>

          <Reveal delay={0.45} className="flex w-full justify-center lg:justify-start">
            <div className="mt-9 flex w-full max-w-md flex-row gap-3 sm:w-auto sm:max-w-none">
              <Button href="#quote" className="flex-1 sm:flex-none">
                {hero.primary}
                <ArrowUpRight aria-hidden="true" size={18} className="rtl:-scale-x-100" />
              </Button>
              <Button href="#products" variant="secondary" className="flex-1 sm:flex-none">
                {hero.secondary}
              </Button>
            </div>
          </Reveal>

          {/* Credential strip */}
          <Reveal delay={0.55} className="w-full">
            <div className="mt-12 flex w-full items-stretch justify-center gap-0 lg:justify-start">
              {credentials.map(([value, label], i) => (
                <div key={label} className="flex items-stretch">
                  {i > 0 && <span className="mx-4 w-px self-stretch bg-white/10 sm:mx-6" aria-hidden="true" />}
                  <div className="text-center lg:text-start">
                    <div className="font-display text-2xl font-extrabold tabular-nums text-white sm:text-3xl">
                      {value}
                    </div>
                    <div className="mt-1 text-[11px] font-bold uppercase tracking-wider text-steel-400">
                      {label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Kinetic product showcase */}
        <Reveal delay={0.2} direction="left" className="w-full min-w-0 max-lg:order-2">
          <ProductShowcase
            products={showcaseProducts}
            locale={locale}
            active={active}
            onSelect={setActive}
            onPauseChange={setPaused}
          />
        </Reveal>
      </Container>

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-28 w-full bg-no-repeat"
        style={{
          backgroundImage: "url('/images/graphics/industrial_divider.png')",
          backgroundSize: "100% 100%",
        }}
      />
    </section>
  );
}

/* ───────────────────────── Stats ───────────────────────── */
function Stats({ locale, years }: { locale: Locale; years: number }) {
  const stats = content[locale].stats;

  return (
    <section className="bg-sand-50 py-20 sm:py-24">
      <Container>
        <SectionHeading eyebrow={stats.eyebrow} title={stats.title} align="center" />
        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-5">
          {stats.items.map(([value, label], index) => {
            const isYears = value === "years";
            const numeric = /^\d/.test(value);
            const numberValue = isYears ? years : numeric ? Number.parseInt(value, 10) : null;
            const suffix = value.includes("+") || isYears ? "+" : "";

            return (
              <Reveal key={label} delay={index * 0.08} className={cn(index === 4 && "col-span-2 lg:col-span-1")}>
                <div className="accent-top card-rise group h-full rounded-2xl border border-steel-200 bg-paper p-6 text-center shadow-[var(--shadow-elev-1)] hover:border-steel-300">
                  <strong className="font-display block text-3xl font-extrabold tabular-nums text-ink-900 sm:text-[2.5rem]">
                    {numberValue === null ? value : <AnimatedCounter value={numberValue} suffix={suffix} />}
                  </strong>
                  <span className="mt-3 block text-xs font-bold leading-6 text-graphite-500 sm:text-sm">{label}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ───────────────────────── About + Timeline ───────────────────────── */
function About({ locale }: { locale: Locale }) {
  const about = content[locale].about;

  return (
    <section id="about" className="bg-paper py-20 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <Reveal direction="right">
          <div className="overflow-hidden rounded-2xl bg-[image:var(--grad-dark)] p-8 text-white shadow-[var(--shadow-elev-3)]">
            <div className="mb-7 h-[3px] w-16 rounded-full bg-[image:var(--grad-brand)]" />
            <div className="rounded-xl border border-white/8 p-7">
              {about.timeline.map(([year, text], idx) => (
                <div key={year} className="relative pb-9 ps-7 last:pb-0">
                  <div
                    className="absolute bottom-0 start-[3px] top-1 w-px bg-steel-400/25"
                    style={{ transformOrigin: "top", animation: `timeline-draw 1.1s ease-out ${idx * 0.25}s both` }}
                  />
                  <span className="absolute -start-[3px] top-1.5 h-3 w-3 rounded-full border-2 border-ink-900 bg-brand ring-2 ring-brand/25" />
                  <strong className="font-display text-xl font-extrabold text-brand-bright">{year}</strong>
                  <p className="mt-2 text-sm leading-7 text-steel-400">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal>
          <SectionHeading eyebrow={about.eyebrow} title={about.title} />
          <div className="mt-7 grid gap-4 text-base leading-[1.9] text-graphite-600">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ───────────────────────── Operations ───────────────────────── */
function Operations({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";

  const points: [string, string][] = [
    [
      isAr ? "مستودعات منظمة وجاهزية توريد" : "Organized Warehousing & Supply Readiness",
      isAr
        ? "مستودعاتنا مجهزة لتخزين الإطارات والبطاريات والزيوت بطرق منظمة تحافظ على سلامة وجودة المنتجات وتسهل عمليات الشحن السريع."
        : "Our storage spaces are tailored to house tires, batteries, and lubricants systematically, preserving product quality and facilitating rapid dispatch.",
    ],
    [
      isAr ? "إدارة منظمة للمخزون" : "Organized Inventory Management",
      isAr
        ? "نطبق أنظمة دقيقة لمراقبة المخزون تضمن توفر الفئات المطلوبة بشكل دائم وسد النقص الفوري في نقاط التوزيع المختلفة."
        : "We employ precise inventory tracking systems to maintain stock levels, avoiding supply bottlenecks and ensuring continuous availability.",
    ],
  ];

  return (
    <section className="bg-sand-50 py-20 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <Reveal direction="right">
          <div className="steel-frame">
            <div className="relative overflow-hidden rounded-[17px] bg-ink-900">
              <ParallaxImage
                src="/images/operations/warehouse.webp"
                alt={isAr ? "مستودعات ومخزون الوصابي" : "Al-Wosabe warehouse and inventory"}
                containerClassName=""
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/80 via-ink-950/15 to-transparent" />
              <div className="absolute top-4 start-4 flex items-center gap-2 rounded-lg border border-white/10 bg-ink-950/70 px-3 py-1.5 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-steel-200">
                  {isAr ? "تخزين آمن منذ 1986" : "Secure Storage Since 1986"}
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <SectionHeading
            eyebrow={isAr ? "الجاهزية التشغيلية" : "Operational Strength"}
            title={isAr ? "جاهزية تشغيلية ومستودعات منظمة" : "Organized Storage & Distribution Readiness"}
            description={
              isAr
                ? "نعتمد في الوصابي للتجارة على بنية تحتية قوية لإدارة المخزون والتوريد، تضمن تلبية احتياجات التجار والعملاء في كافة الأوقات وبجاهزية كاملة."
                : "At Al-Wosabe for Trading, we rely on a robust supply and inventory management infrastructure to serve our business partners efficiently and meet demand at all times."
            }
          />
          <div className="mt-9 space-y-5">
            {points.map(([title, body], i) => (
              <div key={title} className="flex gap-4">
                <span className="font-display flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-brand/20 bg-brand/10 text-base font-extrabold text-brand-deep">
                  {i + 1}
                </span>
                <div>
                  <h4 className="text-base font-bold text-ink-900">{title}</h4>
                  <p className="mt-1.5 text-sm leading-7 text-graphite-600">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ───────────────────────── Products ───────────────────────── */
function Products({ locale }: { locale: Locale }) {
  const copy = content[locale].products;

  return (
    <section id="products" className="bg-paper py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
        <div className="mt-14 grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
          {products[locale].map(({ title, description, image, icon, category }, index) => (
            <Reveal key={title} delay={index * 0.07}>
              <ProductCategoryCard
                title={title}
                description={description}
                image={image}
                icon={icon}
                category={category}
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ───────────────────────── Brands ───────────────────────── */
function Brands({ locale }: { locale: Locale }) {
  const copy = content[locale].brands;

  return (
    <section id="brands" className="bg-sand-50 py-20 sm:py-28">
      <Container>
        <div className="mb-12">
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
        </div>
        <Reveal delay={0.1}>
          <BrandMarquee brands={brands} locale={locale} />
        </Reveal>
      </Container>
    </section>
  );
}

/* ───────────────────────── Distribution ───────────────────────── */
function Distribution({ locale }: { locale: Locale }) {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
  const copy = content[locale].distribution;

  return (
    <section id="distribution" className="relative overflow-hidden bg-ink-950 py-20 text-on-dark sm:py-28">
      <div className="ambient-dark pointer-events-none absolute inset-0" />
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-60" />

      <Container className="relative grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} dark />
          <div className="mt-9 grid grid-cols-4 gap-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3">
            {branches.map((branch) => {
              const active = hoveredCity === branch.city.en;
              return (
                <button
                  key={branch.city.en}
                  type="button"
                  onMouseEnter={() => setHoveredCity(branch.city.en)}
                  onMouseLeave={() => setHoveredCity(null)}
                  onClick={() => setHoveredCity(branch.city.en)}
                  className={cn(
                    "focus-ring flex flex-col items-center justify-center gap-1 rounded-lg border p-2 text-center text-[10px] font-bold transition-all duration-300 sm:flex-row sm:gap-2 sm:text-xs md:text-sm",
                    active
                      ? "border-brand bg-brand/15 text-white"
                      : "border-white/8 bg-white/[0.04] text-steel-400 hover:border-brand/30 hover:bg-white/[0.07] hover:text-steel-100",
                  )}
                >
                  <MapPin
                    size={12}
                    aria-hidden="true"
                    className={cn("shrink-0 transition-all duration-300", active ? "scale-110 text-brand-bright" : "text-brand")}
                  />
                  <span className="max-w-full truncate">{branch.city[locale]}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal direction="left">
          <AnimatedRouteMap locale={locale} hoveredCity={hoveredCity} setHoveredCity={setHoveredCity} />
        </Reveal>
      </Container>
    </section>
  );
}

/* ───────────────────────── Fleet ───────────────────────── */
function Fleet({ locale }: { locale: Locale }) {
  const copy = content[locale].fleet;
  const isAr = locale === "ar";

  const boxes: [string, string][] = [
    [
      isAr ? "تغطية جغرافية منظمة" : "Organized Reach",
      isAr
        ? "نخدم المدن الرئيسية ونطاقًا واسعًا من السوق اليمني عبر شبكة فروع وتوزيع منظمة تضمن استقرار الإمداد للشركاء."
        : "We serve main cities and a wide scope of the Yemeni market through an organized branch and distribution network.",
    ],
    [
      isAr ? "جاهزية تشغيلية عالية" : "High Readiness",
      isAr
        ? "أسطولنا مجهز ومعد لنقل وتوزيع المنتجات الثقيلة والمختلفة تحت شتى الظروف الجغرافية والطرق الصعبة بكفاءة تامة."
        : "Our fleet is equipped and ready to transport heavy and diverse products under various terrains and difficult road conditions.",
    ],
  ];

  return (
    <section className="bg-paper py-20 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <Reveal>
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
          <div className="mt-9 grid gap-5 sm:grid-cols-2">
            {boxes.map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-steel-200 bg-sand-50 p-6">
                <strong className="font-display block text-lg font-extrabold text-ink-900">{title}</strong>
                <p className="mt-2.5 text-sm leading-7 text-graphite-600">{body}</p>
              </div>
            ))}
          </div>
          <div className="mt-7">
            <Button href="#branches" variant="steel">
              {isAr ? "تواصل مع أقرب فرع" : "Contact nearest branch"}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.1} direction="left">
          <div className="steel-frame">
            <div className="relative overflow-hidden rounded-[17px] bg-ink-900">
              <ParallaxImage
                src="/images/operations/fleet.webp"
                alt={isAr ? "أسطول توزيع الوصابي" : "Al-Wosabe distribution fleet"}
                containerClassName=""
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/20 to-transparent" />
              <Reveal delay={0.25} direction="up" className="absolute bottom-6 start-6 z-10">
                <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-ink-950/75 p-4 shadow-[var(--shadow-elev-3)] backdrop-blur-md">
                  <div className="chrome flex h-13 w-13 items-center justify-center rounded-lg text-ink-950">
                    <Truck size={26} />
                  </div>
                  <div className="text-start">
                    <span className="font-display block text-2xl font-extrabold tabular-nums text-white">
                      <AnimatedCounter value={20} suffix="+" />
                    </span>
                    <span className="block text-xs font-bold uppercase tracking-wider text-brand-bright">
                      {isAr ? "شاحنة توزيع نشطة" : "Active Trucks"}
                    </span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ───────────────────────── Branches + Modal ───────────────────────── */
function Branches({ locale }: { locale: Locale }) {
  const copy = content[locale].branches;
  const [selectedBranch, setSelectedBranch] = useState<(typeof branches)[0] | null>(null);

  return (
    <section id="branches" className="bg-sand-50 py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3">
          {branches.map((branch, index) => (
            <Reveal key={branch.city.en} delay={index * 0.04}>
              <button
                onClick={() => setSelectedBranch(branch)}
                className="card-rise focus-ring group flex w-full items-center justify-between rounded-2xl border border-steel-200 bg-paper p-4 text-start shadow-[var(--shadow-elev-1)] hover:border-brand/40 md:p-6"
              >
                <div className="flex items-center gap-3 overflow-hidden md:gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[image:var(--grad-dark)] text-brand-bright shadow-[var(--shadow-elev-1)] transition-all duration-300 group-hover:bg-[image:var(--grad-brand)] group-hover:text-ink-950 md:h-12 md:w-12">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="overflow-hidden">
                    <h3 className="truncate text-base font-bold text-ink-900 transition-colors group-hover:text-brand-deep md:text-lg">
                      {branch.city[locale]}
                    </h3>
                    <span className="mt-0.5 block truncate text-[11px] text-graphite-500">
                      {locale === "ar" ? "اضغط للتواصل" : "Click to connect"}
                    </span>
                  </div>
                </div>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-steel-100 text-brand-deep transition-all duration-300 group-hover:bg-brand group-hover:text-ink-950">
                  <Phone className="h-4 w-4" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </Container>

      <AnimatePresence>
        {selectedBranch && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBranch(null)}
              className="absolute inset-0 bg-ink-950/70 backdrop-blur-md"
            />
            <motion.div
              initial={{ scale: 0.96, opacity: 0, y: 14 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.96, opacity: 0, y: 14 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-ink-900 p-6 text-white shadow-[var(--shadow-elev-3)]"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-[image:var(--grad-brand)]" />
              <button
                onClick={() => setSelectedBranch(null)}
                className="focus-ring absolute top-4 end-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-steel-300 transition-all hover:bg-white/10 hover:text-white"
                aria-label={locale === "ar" ? "إغلاق" : "Close"}
              >
                <X size={18} />
              </button>

              <div className="mb-6 flex items-center gap-3.5 text-start">
                <span className="chrome flex h-12 w-12 items-center justify-center rounded-xl text-ink-950">
                  <MapPin size={22} />
                </span>
                <div>
                  <h3 className="font-display text-xl font-extrabold">{selectedBranch.city[locale]}</h3>
                  <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-brand-bright">
                    {locale === "ar" ? "أرقام التواصل والفرع" : "Branch Contact Numbers"}
                  </p>
                </div>
              </div>

              <div className="max-h-[300px] space-y-3 overflow-y-auto pe-1">
                {selectedBranch.phones.map((phone) => (
                  <a
                    key={phone}
                    href={phoneHref(phone)}
                    className="group flex items-center justify-between gap-4 rounded-xl border border-white/8 bg-white/5 px-4 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:border-brand/50 hover:bg-brand/10 hover:text-brand-bright"
                  >
                    <span dir="ltr">{phone}</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-steel-300 transition-colors duration-300 group-hover:bg-brand group-hover:text-ink-950">
                      <Phone size={14} />
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-6 border-t border-white/8 pt-4 text-center">
                <p className="text-xs text-steel-400">
                  {locale === "ar" ? "جميع الأرقام قابلة للضغط للاتصال المباشر" : "All numbers are clickable for direct calls"}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ───────────────────────── Values ───────────────────────── */
function Values({ locale }: { locale: Locale }) {
  const copy = content[locale].values;

  return (
    <section className="bg-paper py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} align="center" />
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {copy.items.map(([title, description], index) => {
            const Icon = valueIcons[index];
            return (
              <Reveal key={title} delay={index * 0.06} className={cn(index === 2 && "col-span-2 md:col-span-1")}>
                <article className="accent-top card-rise group h-full rounded-2xl border border-steel-200 bg-sand-50 p-6 text-center shadow-[var(--shadow-elev-1)] hover:border-steel-300 sm:p-8">
                  <div className="mx-auto mb-5 flex h-15 w-15 items-center justify-center rounded-xl bg-[image:var(--grad-dark)] text-brand-bright transition-all duration-300 group-hover:bg-[image:var(--grad-brand)] group-hover:text-ink-950 sm:h-16 sm:w-16">
                    <Icon aria-hidden="true" size={26} />
                  </div>
                  <h3 className="font-display text-lg font-bold text-ink-900 sm:text-xl">{title}</h3>
                  <div className="mx-auto my-4 h-[2px] w-10 rounded-full bg-[image:var(--grad-brand)] transition-all duration-300 group-hover:w-16" />
                  <p className="text-sm leading-7 text-graphite-600">{description}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ───────────────────────── Team ───────────────────────── */
function Team({ locale }: { locale: Locale }) {
  const copy = content[locale].team;
  const isAr = locale === "ar";

  const teamItems = [
    {
      title: isAr ? "خبرة السوق المحلي" : "Market Experience",
      description: isAr
        ? "فريق متمكن بخبرة عريقة تتجاوز 35 عاماً في فهم احتياجات السوق اليمني لقطع المركبات والدراجات."
        : "An expert team with over 35 years of experience in understanding Yemen's vehicle and motorcycle market.",
      Icon: Building2,
    },
    {
      title: isAr ? "تنسيق العمليات واللوجستيات" : "Operations Coordination",
      description: isAr
        ? "نعمل بتزامن كامل لإدارة النقل والتوزيع وضمان وصول الشحنات بكفاءة تامة لكافة الفروع والموزعين."
        : "We operate in sync to manage dispatch and distribution, ensuring deliveries reach all branches and distributors.",
      Icon: Truck,
    },
    {
      title: isAr ? "خدمة العملاء والتجار" : "Customer Service",
      description: isAr
        ? "نوفر قنوات تواصل مباشرة وسريعة لتلبية طلبات عروض الأسعار والتجهيز الفوري للمعاملات التجارية."
        : "We offer direct, fast channels to fulfill quote requests and process commercial orders promptly.",
      Icon: CheckCircle2,
    },
  ];

  return (
    <section className="bg-sand-50 py-20 sm:py-28">
      <Container className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <Reveal direction="right">
          <div className="steel-frame">
            <div className="relative overflow-hidden rounded-[17px] bg-ink-900">
              <ParallaxImage
                src="/images/operations/team.webp"
                alt={isAr ? "فريق عمليات وتوزيع الوصابي" : "Al-Wosabe operations and distribution team"}
                sizes="(max-width: 1024px) 100vw, 45vw"
                aspectRatio="aspect-[16/10]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 start-4 rounded-lg border border-white/10 bg-ink-950/65 px-3 py-1.5 backdrop-blur-md">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-bright">
                  {isAr ? "فريق عمل متخصص" : "Professional Team"}
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal>
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
          <div className="mt-9 space-y-4">
            {teamItems.map(({ title, description, Icon }) => (
              <div
                key={title}
                className="group flex gap-4 rounded-2xl border border-steel-200 bg-paper p-5 transition-all duration-300 hover:border-brand/25 hover:shadow-[var(--shadow-elev-2)]"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[image:var(--grad-dark)] text-brand-bright shadow-[var(--shadow-elev-1)] transition-all duration-300 group-hover:bg-[image:var(--grad-brand)] group-hover:text-ink-950">
                  <Icon aria-hidden="true" size={22} />
                </span>
                <div>
                  <h4 className="text-base font-bold text-ink-900 transition-colors duration-300 group-hover:text-brand-deep">
                    {title}
                  </h4>
                  <p className="mt-1.5 text-sm leading-7 text-graphite-600">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ───────────────────────── Quote ───────────────────────── */
function Quote({ locale }: { locale: Locale }) {
  const copy = content[locale].quote;
  const directMessage =
    locale === "ar"
      ? "مرحباً، أريد طلب عرض سعر من الوصابي للتجارة."
      : "Hello, I would like to request a quote from Al-Wosabe for Trading.";

  return (
    <section id="quote" className="relative overflow-hidden bg-ink-950 py-20 text-on-dark sm:py-28">
      <div className="ambient-dark pointer-events-none absolute inset-0" />
      <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-50" />

      <Container className="relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <Reveal direction="right">
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} dark />
          <Button href={whatsappHref(company.whatsappNumber, directMessage)} className="mt-9">
            {copy.submit}
          </Button>
        </Reveal>
        <Reveal direction="left">
          <QuoteForm labels={copy} locale={locale} />
        </Reveal>
      </Container>
    </section>
  );
}
