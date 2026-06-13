import Image from "next/image";
import { ArrowUpRight, Building2, CheckCircle2, MapPin, Truck } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { BranchCard } from "@/components/ui/BranchCard";
import { BrandLogoCard } from "@/components/ui/BrandLogoCard";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ProductCategoryCard } from "@/components/ui/ProductCategoryCard";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { QuoteForm } from "@/components/sections/QuoteForm";
import {
  branches,
  brandPlaceholders,
  company,
  content,
  products,
  structuredOrganization,
  valueIcons,
} from "@/data/site";
import type { Locale } from "@/lib/locales";
import { whatsappHref } from "@/lib/utils";

export function LandingPage({ locale }: { locale: Locale }) {
  const labels = content[locale];
  const years = new Date().getFullYear() - company.establishedYear;

  return (
    <>
      <Header locale={locale} />
      <main>
        <Hero locale={locale} years={years} />
        <Stats locale={locale} years={years} />
        <About locale={locale} />
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

function Hero({ locale, years }: { locale: Locale; years: number }) {
  const hero = content[locale].hero;

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-[#1B1B1D] pt-28 text-white">
      {/* Background layers */}
      <div className="industrial-grid absolute inset-0 opacity-60" />
      <div className="route-lines absolute inset-0 opacity-80" />
      <div className="hero-gradient-overlay absolute inset-0" />
      <div className="tire-track absolute -end-20 top-16 h-[520px] w-40 rotate-12 opacity-30" />

      {/* Floating shapes */}
      <div className="floating-shape floating-shape-1" />
      <div className="floating-shape floating-shape-2" />
      <div className="floating-shape floating-shape-3" />

      <Container className="relative grid min-h-[calc(100vh-7rem)] items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <div>
            {/* Eyebrow badge with shimmer */}
            <div className="relative mb-5 inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#FF8A00]/30 bg-[#FF8A00]/8 px-4 py-2 text-sm font-extrabold text-[#FFC247]">
              <div className="shimmer pointer-events-none absolute inset-0" />
              <CheckCircle2 size={16} aria-hidden="true" className="relative" />
              <span className="relative">{hero.eyebrow}</span>
            </div>

            {/* Title with gradient text */}
            <h1 className="text-gradient max-w-4xl text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
              {hero.title}
            </h1>

            {/* Glowing separator */}
            <div
              className="my-5 h-1 w-20 rounded-full"
              style={{
                background: "linear-gradient(90deg, #ff8a00, #ffc247)",
                boxShadow: "0 0 15px rgba(255, 138, 0, 0.4)",
              }}
            />

            <p className="max-w-2xl text-2xl font-extrabold leading-tight text-[#FFC247]">{hero.subtitle}</p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/65 sm:text-lg">{hero.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="#quote">
                {hero.primary}
                <ArrowUpRight aria-hidden="true" size={18} />
              </Button>
              <Button href="#products" variant="secondary">
                {hero.secondary}
              </Button>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.12} direction="left">
          <div className="relative">
            {/* Enhanced glow behind card */}
            <div
              className="absolute -inset-6 skew-x-[-8deg] rounded-2xl opacity-60 blur-3xl"
              style={{ background: "radial-gradient(ellipse, rgba(255, 138, 0, 0.2), transparent)" }}
            />
            <div className="relative overflow-hidden rounded-xl border border-white/12 bg-white/6 p-5 shadow-2xl backdrop-blur-xl">
              {/* Gradient top accent */}
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
                style={{ background: "linear-gradient(90deg, transparent, #ff8a00, #ffc247, #ff8a00, transparent)" }}
              />

              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="rounded-full bg-gradient-to-r from-[#FF8A00] to-[#E87500] px-4 py-2 text-sm font-black text-[#1B1B1D] shadow-[0_4px_15px_rgba(255,138,0,0.3)]">
                  {hero.badge}
                </span>
                <span className="text-sm font-bold text-white/40">+{years}</span>
              </div>

              <div className="flex aspect-[1.16] items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-[#111113] to-[#0a0a0c] p-8">
                <Image
                  src={company.logo}
                  alt={locale === "ar" ? "شعار الوصابي للتجارة" : "Al-Wosabe for Trading logo"}
                  width={700}
                  height={182}
                  priority
                  className="w-full object-contain drop-shadow-[0_0_30px_rgba(255,138,0,0.15)]"
                />
              </div>

              <div className="mt-5 grid grid-cols-3 gap-3 text-center">
                <MiniStat value="7+" label={locale === "ar" ? "مدن" : "Cities"} />
                <MiniStat value="20+" label={locale === "ar" ? "شاحنة" : "Trucks"} />
                <MiniStat value="1986" label={locale === "ar" ? "تأسيس" : "Founded"} />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F7F7F4] to-transparent" />
    </section>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-white/8 bg-white/5 p-3 transition-all duration-300 hover:border-[#FF8A00]/30 hover:bg-white/8">
      <strong className="text-gradient block text-xl font-black">{value}</strong>
      <span className="text-xs font-bold text-white/45">{label}</span>
    </div>
  );
}

function Stats({ locale, years }: { locale: Locale; years: number }) {
  const stats = content[locale].stats;

  return (
    <section className="bg-[#F7F7F4] py-18">
      <Container>
        <SectionHeading eyebrow={stats.eyebrow} title={stats.title} align="center" />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stats.items.map(([value, label], index) => {
            const isYears = value === "years";
            const numeric = /^\d/.test(value);
            const numberValue = isYears ? years : numeric ? Number.parseInt(value, 10) : null;
            const suffix = value.includes("+") || isYears ? "+" : "";

            return (
              <Reveal key={label} delay={index * 0.05}>
                <div className="gradient-top-border group relative h-full overflow-hidden rounded-xl border border-black/6 bg-white p-6 text-center shadow-sm transition-all duration-400 hover:shadow-[0_20px_50px_rgba(255,138,0,0.1)]">
                  {/* Subtle gradient overlay on hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-[#FF8A00]/0 to-[#FFC247]/0 opacity-0 transition-opacity duration-400 group-hover:from-[#FF8A00]/4 group-hover:to-[#FFC247]/2 group-hover:opacity-100" />
                  <strong className="relative block text-4xl font-black text-[#FF8A00]">
                    {numberValue === null ? value : <AnimatedCounter value={numberValue} suffix={suffix} />}
                  </strong>
                  <span className="relative mt-3 block text-sm font-bold leading-6 text-[#343438]/65">{label}</span>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function About({ locale }: { locale: Locale }) {
  const about = content[locale].about;

  return (
    <section id="about" className="bg-white py-22">
      <Container className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <Reveal direction="right">
          <div className="overflow-hidden rounded-xl bg-gradient-to-br from-[#1B1B1D] to-[#252529] p-7 text-white shadow-2xl">
            {/* Gradient accent */}
            <div
              className="mb-6 h-[2px] w-20 rounded-full"
              style={{ background: "linear-gradient(90deg, #ff8a00, #ffc247)" }}
            />
            <div className="route-lines rounded-lg border border-white/8 p-6">
              {about.timeline.map(([year, text], index) => (
                <div key={year} className="relative border-s-2 border-[#FF8A00]/30 pb-8 ps-7 last:pb-0">
                  {/* Glowing dot */}
                  <span
                    className="absolute -start-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-[#FF8A00]"
                    style={{
                      boxShadow: "0 0 10px rgba(255, 138, 0, 0.5), 0 0 20px rgba(255, 138, 0, 0.2)",
                    }}
                  />
                  {/* Outer ring */}
                  <span
                    className="absolute -start-[9px] top-[2px] h-[18px] w-[18px] rounded-full border-2 border-[#FF8A00]/25"
                  />
                  <strong className="text-2xl font-black text-[#FFC247]">{year}</strong>
                  <p className="mt-2 text-sm leading-7 text-white/60">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal>
          <SectionHeading eyebrow={about.eyebrow} title={about.title} />
          <div className="mt-6 grid gap-4 text-base leading-8 text-[#343438]/75">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Products({ locale }: { locale: Locale }) {
  const copy = content[locale].products;

  return (
    <section id="products" className="relative bg-[#F7F7F4] py-22">
      <Container>
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products[locale].map(([title, description, Icon], index) => (
            <Reveal key={title} delay={index * 0.05}>
              <ProductCategoryCard title={title} description={description} Icon={Icon} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Brands({ locale }: { locale: Locale }) {
  const copy = content[locale].brands;

  return (
    <section id="brands" className="bg-white py-22">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
          <p className="rounded-xl border border-[#FF8A00]/20 bg-gradient-to-r from-[#FF8A00]/8 to-[#FFC247]/5 p-5 text-sm font-bold leading-7 text-[#7A4700]">
            {copy.note}
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {brandPlaceholders.map((brand, index) => (
            <Reveal key={brand} delay={index * 0.04}>
              <BrandLogoCard label={brand} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Distribution({ locale }: { locale: Locale }) {
  const copy = content[locale].distribution;

  return (
    <section id="distribution" className="relative overflow-hidden bg-[#1B1B1D] py-22 text-white">
      {/* Floating shapes */}
      <div className="pointer-events-none absolute -start-40 top-20 h-80 w-80 rounded-full bg-[#FF8A00]/5 blur-3xl" />
      <div className="pointer-events-none absolute -end-40 bottom-20 h-60 w-60 rounded-full bg-[#FFC247]/5 blur-3xl" />

      <Container className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} dark />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {branches.map((branch, index) => (
              <div
                key={branch.city.en}
                className="group rounded-lg border border-white/8 bg-white/5 px-4 py-3.5 text-sm font-bold text-white/65 backdrop-blur transition-all duration-300 hover:border-[#FF8A00]/30 hover:bg-[#FF8A00]/8 hover:text-white/85"
              >
                <MapPin className="me-2 inline text-[#FF8A00] transition-transform duration-300 group-hover:scale-110" size={16} aria-hidden="true" />
                {branch.city[locale]}
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal direction="left">
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur">
            {/* Gradient top line */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
              style={{ background: "linear-gradient(90deg, transparent, #ff8a00, #ffc247, #ff8a00, transparent)" }}
            />

            <div className="route-lines rounded-lg p-2">
              <svg viewBox="0 0 100 100" role="img" aria-label={copy.title} className="h-auto w-full">
                <defs>
                  <linearGradient id="route-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF8A00" />
                    <stop offset="100%" stopColor="#FFC247" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <path d="M31 13 L55 9 L79 23 L88 45 L82 70 L63 86 L43 82 L27 68 L18 46 Z" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                <path d="M48 33 C40 40, 38 51, 42 66 M48 33 C60 40, 70 50, 78 62 M48 33 C42 37, 38 39, 34 44 M42 66 C49 71, 51 75, 54 78" fill="none" stroke="url(#route-gradient)" strokeWidth="1.1" strokeDasharray="4 3" />
                {branches.map((branch) => (
                  <g key={branch.city.en}>
                    {/* Outer pulse ring */}
                    <circle cx={branch.x} cy={branch.y} r="5" fill="none" stroke="#FF8A00" strokeOpacity="0.15" className="map-pulse" />
                    <circle cx={branch.x} cy={branch.y} r="3.5" fill="none" stroke="#FF8A00" strokeOpacity="0.3" />
                    <circle cx={branch.x} cy={branch.y} r="2" fill="#FFC247" filter="url(#glow)" />
                    <text x={branch.x + 3.5} y={branch.y - 2.5} fill="rgba(255,255,255,0.72)" fontSize="3" fontWeight="700">
                      {branch.city[locale]}
                    </text>
                  </g>
                ))}
              </svg>
            </div>
            <p className="mt-4 text-sm font-semibold leading-7 text-white/45">{copy.mapNote}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Fleet({ locale }: { locale: Locale }) {
  const copy = content[locale].fleet;

  return (
    <section className="bg-[#F7F7F4] py-22">
      <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <Reveal direction="right">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-[#1B1B1D] to-[#252529] p-8 text-white shadow-2xl">
            {/* Gradient accent */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
              style={{ background: "linear-gradient(90deg, transparent, #ff8a00, #ffc247, #ff8a00, transparent)" }}
            />
            {/* Corner glow */}
            <div className="pointer-events-none absolute -top-10 -end-10 h-32 w-32 rounded-full bg-[#FF8A00]/10 blur-3xl" />

            <div className="relative">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF8A00]/15 to-[#FFC247]/10 text-[#FFC247]">
                <Truck size={34} aria-hidden="true" />
              </div>
              <div className="mt-6 text-7xl font-black">
                <span className="text-gradient">
                  <AnimatedCounter value={20} suffix="+" />
                </span>
              </div>
              <p className="mt-4 text-lg font-bold text-white/55">{locale === "ar" ? "شاحنة توزيع" : "Distribution trucks"}</p>
              {/* Mini progress bar */}
              <div className="mt-6 h-1 w-full overflow-hidden rounded-full bg-white/8">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "85%",
                    background: "linear-gradient(90deg, #ff8a00, #ffc247)",
                    boxShadow: "0 0 10px rgba(255, 138, 0, 0.4)",
                  }}
                />
              </div>
              <p className="mt-2 text-xs font-bold text-white/30">{locale === "ar" ? "تغطية الجمهورية" : "Nationwide coverage"}</p>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
        </Reveal>
      </Container>
    </section>
  );
}

function Branches({ locale }: { locale: Locale }) {
  const copy = content[locale].branches;

  return (
    <section id="branches" className="bg-white py-22">
      <Container>
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {branches.map((branch, index) => (
            <Reveal key={branch.city.en} delay={index * 0.04}>
              <BranchCard city={branch.city[locale]} phones={branch.phones} callLabel={copy.call} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Values({ locale }: { locale: Locale }) {
  const copy = content[locale].values;

  return (
    <section className="bg-[#F7F7F4] py-22">
      <Container>
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} align="center" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {copy.items.map(([title, description], index) => {
            const Icon = valueIcons[index];
            return (
              <Reveal key={title} delay={index * 0.06}>
                <article className="card-hover-glow group relative h-full overflow-hidden rounded-xl border border-black/6 bg-white p-7 text-center shadow-sm">
                  {/* Gradient overlay on hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-[#FF8A00]/0 to-[#FFC247]/0 opacity-0 transition-opacity duration-400 group-hover:from-[#FF8A00]/4 group-hover:to-[#FFC247]/2 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF8A00]/12 to-[#FFC247]/8 text-[#FF8A00] transition-all duration-400 group-hover:from-[#FF8A00] group-hover:to-[#E87500] group-hover:text-white group-hover:shadow-[0_8px_24px_rgba(255,138,0,0.3)]">
                      <Icon aria-hidden="true" size={28} />
                    </div>
                    <h3 className="text-xl font-black text-[#1B1B1D]">{title}</h3>
                    <div
                      className="mx-auto my-4 h-[2px] w-10 rounded-full transition-all duration-400 group-hover:w-16"
                      style={{ background: "linear-gradient(90deg, #ff8a00, #ffc247)" }}
                    />
                    <p className="text-sm leading-7 text-[#343438]/68">{description}</p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function Team({ locale }: { locale: Locale }) {
  const copy = content[locale].team;

  const teamItems = [
    {
      Icon: Building2,
      label: locale === "ar" ? "خبرة سوق محلي" : "Local market experience",
    },
    {
      Icon: Truck,
      label: locale === "ar" ? "تشغيل وتوزيع" : "Operations and distribution",
    },
    {
      Icon: CheckCircle2,
      label: locale === "ar" ? "تعامل تجاري واضح" : "Clear business handling",
    },
  ];

  return (
    <section className="bg-white py-22">
      <Container className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <Reveal>
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
        </Reveal>
        <Reveal direction="left">
          <div className="grid gap-4">
            {teamItems.map(({ Icon, label }, index) => (
              <div
                key={index}
                className="group flex items-center gap-4 rounded-xl border border-black/6 bg-[#F7F7F4] p-5 transition-all duration-300 hover:border-[#FF8A00]/20 hover:bg-gradient-to-r hover:from-[#FF8A00]/5 hover:to-transparent hover:shadow-[0_8px_24px_rgba(255,138,0,0.06)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#1B1B1D] to-[#2a2a2e] text-[#FFC247] shadow-lg transition-all duration-300 group-hover:from-[#FF8A00] group-hover:to-[#E87500] group-hover:text-[#1B1B1D] group-hover:shadow-[0_4px_15px_rgba(255,138,0,0.3)]">
                  <Icon aria-hidden="true" />
                </span>
                <span className="font-black text-[#1B1B1D]">{label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Quote({ locale }: { locale: Locale }) {
  const copy = content[locale].quote;
  const directMessage = locale === "ar" ? "مرحباً، أريد طلب عرض سعر من الوصابي للتجارة." : "Hello, I would like to request a quote from Al-Wosabe for Trading.";

  return (
    <section id="quote" className="relative overflow-hidden bg-[#1B1B1D] py-22 text-white">
      <div className="route-lines absolute inset-0" />
      {/* Background glows */}
      <div className="pointer-events-none absolute -start-40 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-[#FF8A00]/5 blur-3xl" />
      <div className="pointer-events-none absolute -end-40 top-1/4 h-60 w-60 rounded-full bg-[#FFC247]/5 blur-3xl" />

      <Container className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <Reveal>
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} dark />
          <Button href={whatsappHref(company.whatsappNumber, directMessage)} className="mt-8">
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
