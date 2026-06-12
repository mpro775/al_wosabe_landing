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
      <div className="industrial-grid absolute inset-0 opacity-60" />
      <div className="route-lines absolute inset-0 opacity-80" />
      <div className="tire-track absolute -end-20 top-16 h-[520px] w-40 rotate-12 opacity-30" />
      <Container className="relative grid min-h-[calc(100vh-7rem)] items-center gap-12 py-14 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#FF8A00]/35 bg-[#FF8A00]/10 px-4 py-2 text-sm font-extrabold text-[#FFC247]">
              <CheckCircle2 size={16} aria-hidden="true" />
              {hero.eyebrow}
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">{hero.title}</h1>
            <p className="mt-5 max-w-2xl text-2xl font-extrabold leading-tight text-[#FFC247]">{hero.subtitle}</p>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/72 sm:text-lg">{hero.description}</p>
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
            <div className="absolute -inset-5 skew-x-[-10deg] rounded-lg bg-[#FF8A00]/18 blur-2xl" />
            <div className="relative rounded-lg border border-white/14 bg-white/8 p-5 shadow-2xl backdrop-blur">
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="rounded-full bg-[#FF8A00] px-4 py-2 text-sm font-black text-[#1B1B1D]">{hero.badge}</span>
                <span className="text-sm font-bold text-white/50">+{years}</span>
              </div>
              <div className="flex aspect-[1.16] items-center justify-center overflow-hidden rounded-md bg-[#111113] p-8">
                <Image src={company.logo} alt={locale === "ar" ? "شعار الوصابي للتجارة" : "Al-Wosabe for Trading logo"} width={700} height={182} priority className="w-full object-contain drop-shadow-2xl" />
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
    </section>
  );
}

function MiniStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/8 p-3">
      <strong className="block text-xl font-black text-[#FFC247]">{value}</strong>
      <span className="text-xs font-bold text-white/52">{label}</span>
    </div>
  );
}

function Stats({ locale, years }: { locale: Locale; years: number }) {
  const stats = content[locale].stats;

  return (
    <section className="bg-[#F7F7F4] py-16">
      <Container>
        <SectionHeading eyebrow={stats.eyebrow} title={stats.title} align="center" />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {stats.items.map(([value, label], index) => {
            const isYears = value === "years";
            const numeric = /^\d/.test(value);
            const numberValue = isYears ? years : numeric ? Number.parseInt(value, 10) : null;
            const suffix = value.includes("+") || isYears ? "+" : "";

            return (
              <Reveal key={label} delay={index * 0.05}>
                <div className="h-full rounded-lg border border-black/10 bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                  <strong className="block text-4xl font-black text-[#FF8A00]">
                    {numberValue === null ? value : <AnimatedCounter value={numberValue} suffix={suffix} />}
                  </strong>
                  <span className="mt-3 block text-sm font-bold leading-6 text-[#343438]/70">{label}</span>
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
    <section id="about" className="bg-white py-20">
      <Container className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <Reveal direction="right">
          <div className="rounded-lg bg-[#1B1B1D] p-6 text-white shadow-2xl">
            <div className="route-lines rounded-md border border-white/10 p-6">
              {about.timeline.map(([year, text]) => (
                <div key={year} className="relative border-s border-[#FF8A00]/50 pb-8 ps-6 last:pb-0">
                  <span className="absolute -start-2 top-1 h-4 w-4 rounded-full bg-[#FF8A00]" />
                  <strong className="text-2xl font-black text-[#FFC247]">{year}</strong>
                  <p className="mt-2 text-sm leading-7 text-white/68">{text}</p>
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
    <section id="products" className="bg-[#F7F7F4] py-20">
      <Container>
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
    <section id="brands" className="bg-white py-20">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
          <p className="rounded-lg border border-[#FF8A00]/25 bg-[#FF8A00]/8 p-4 text-sm font-bold leading-7 text-[#7A4700]">{copy.note}</p>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
    <section id="distribution" className="overflow-hidden bg-[#1B1B1D] py-20 text-white">
      <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} dark />
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {branches.map((branch) => (
              <div key={branch.city.en} className="rounded-md border border-white/10 bg-white/7 px-4 py-3 text-sm font-bold text-white/72">
                <MapPin className="me-2 inline text-[#FF8A00]" size={16} aria-hidden="true" />
                {branch.city[locale]}
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal direction="left">
          <div className="route-lines rounded-lg border border-white/12 bg-white/7 p-5 shadow-2xl">
            <svg viewBox="0 0 100 100" role="img" aria-label={copy.title} className="h-auto w-full">
              <path d="M31 13 L55 9 L79 23 L88 45 L82 70 L63 86 L43 82 L27 68 L18 46 Z" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
              <path d="M48 33 C40 40, 38 51, 42 66 M48 33 C60 40, 70 50, 78 62 M48 33 C42 37, 38 39, 34 44 M42 66 C49 71, 51 75, 54 78" fill="none" stroke="#FF8A00" strokeWidth="1.1" strokeDasharray="4 3" />
              {branches.map((branch) => (
                <g key={branch.city.en}>
                  <circle cx={branch.x} cy={branch.y} r="2.2" fill="#FFC247" />
                  <circle cx={branch.x} cy={branch.y} r="4.8" fill="none" stroke="#FF8A00" strokeOpacity="0.45" />
                  <text x={branch.x + 3} y={branch.y - 2} fill="rgba(255,255,255,0.78)" fontSize="3.2" fontWeight="700">
                    {branch.city[locale]}
                  </text>
                </g>
              ))}
            </svg>
            <p className="mt-4 text-sm font-semibold leading-7 text-white/55">{copy.mapNote}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function Fleet({ locale }: { locale: Locale }) {
  const copy = content[locale].fleet;

  return (
    <section className="bg-[#F7F7F4] py-20">
      <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <Reveal direction="right">
          <div className="rounded-lg bg-[#1B1B1D] p-8 text-white shadow-2xl">
            <Truck size={64} className="text-[#FFC247]" aria-hidden="true" />
            <div className="mt-8 text-7xl font-black text-[#FF8A00]">
              <AnimatedCounter value={20} suffix="+" />
            </div>
            <p className="mt-4 text-lg font-bold text-white/65">{locale === "ar" ? "شاحنة توزيع" : "Distribution trucks"}</p>
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
    <section id="branches" className="bg-white py-20">
      <Container>
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
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
    <section className="bg-[#F7F7F4] py-20">
      <Container>
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} align="center" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {copy.items.map(([title, description], index) => {
            const Icon = valueIcons[index];
            return (
              <Reveal key={title} delay={index * 0.06}>
                <article className="h-full rounded-lg border border-black/10 bg-white p-6 text-center shadow-sm">
                  <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-md bg-[#FF8A00]/12 text-[#FF8A00]">
                    <Icon aria-hidden="true" size={28} />
                  </div>
                  <h3 className="text-xl font-black text-[#1B1B1D]">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#343438]/72">{description}</p>
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

  return (
    <section className="bg-white py-20">
      <Container className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <Reveal>
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
        </Reveal>
        <Reveal direction="left">
          <div className="grid gap-4">
            {[Building2, Truck, CheckCircle2].map((Icon, index) => (
              <div key={index} className="flex items-center gap-4 rounded-lg border border-black/10 bg-[#F7F7F4] p-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-md bg-[#1B1B1D] text-[#FFC247]">
                  <Icon aria-hidden="true" />
                </span>
                <span className="font-black text-[#1B1B1D]">
                  {locale === "ar"
                    ? ["خبرة سوق محلي", "تشغيل وتوزيع", "تعامل تجاري واضح"][index]
                    : ["Local market experience", "Operations and distribution", "Clear business handling"][index]}
                </span>
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
    <section id="quote" className="route-lines bg-[#1B1B1D] py-20 text-white">
      <Container className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
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
