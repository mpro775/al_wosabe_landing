"use client";

import { useState } from "react";
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
  brands,
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

function Hero({ locale, years }: { locale: Locale; years: number }) {
  const hero = content[locale].hero;

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-[#1B1B1D] pt-28 text-white">
      {/* Ambient warehouse background image */}
      <div className="absolute inset-0 z-0 opacity-[0.06] filter grayscale pointer-events-none">
        <Image
          src="/images/hero/hero-warehouse.webp"
          alt=""
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* SVG Background Layers */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-1">
        {/* Tire track svg layer */}
        <div 
          className="absolute -end-10 top-0 h-full w-[350px] opacity-[0.03] mix-blend-overlay rotate-6 pointer-events-none bg-repeat-y"
          style={{ backgroundImage: "url('/images/graphics/tire-track.svg')", backgroundSize: 'contain' }}
        />
        {/* Route lines svg layer */}
        <div 
          className="absolute inset-0 opacity-[0.07] pointer-events-none"
          style={{ backgroundImage: "url('/images/graphics/route-lines.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
      </div>

      {/* Grid Pattern and Overlay */}
      <div className="industrial-grid absolute inset-0 opacity-40 z-1 pointer-events-none" />
      <div className="hero-gradient-overlay absolute inset-0 z-1 pointer-events-none" />

      <Container className="relative z-10 grid min-h-[calc(100vh-7rem)] items-center gap-12 py-14 lg:grid-cols-[1.15fr_0.85fr]">
        <Reveal>
          <div className="flex flex-col items-start">
            {/* Small floating logo badge instead of massive hero card */}
            <div className="relative mb-6 flex items-center gap-3 rounded-xl border border-white/10 bg-black/45 p-2 pe-3.5 backdrop-blur-md">
              <div className="relative flex h-9 w-14 items-center justify-center overflow-hidden rounded bg-white p-1">
                <Image
                  src={company.logo}
                  alt=""
                  width={100}
                  height={28}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex flex-col text-start">
                <span className="text-[10px] font-black uppercase tracking-[0.15em] text-[#FF8A00]">
                  {locale === "ar" ? "الوصابي للتجارة" : "Al-Wosabe Trading"}
                </span>
                <span className="text-[9px] font-bold text-white/50">
                  {locale === "ar" ? "تأسست عام 1986" : "Since 1986"}
                </span>
              </div>
            </div>

            {/* Hero Eyebrow */}
            <div className="relative mb-5 inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#FF8A00]/30 bg-[#FF8A00]/8 px-4 py-1.5 text-xs font-black uppercase tracking-wider text-[#FFC247]">
              <span className="relative">{hero.eyebrow}</span>
            </div>

            {/* Main Title */}
            <h1 className="text-gradient text-4xl font-black leading-tight sm:text-5xl lg:text-6xl xl:text-7xl text-start">
              {hero.title}
            </h1>

            {/* Separator */}
            <div
              className="my-5 h-1 w-20 rounded-full"
              style={{
                background: "gradient-to-r from-[#ff8a00] to-[#ffc247]",
                backgroundImage: "linear-gradient(90deg, #ff8a00, #ffc247)",
                boxShadow: "0 0 15px rgba(255, 138, 0, 0.4)",
              }}
            />

            <p className="text-xl font-extrabold leading-tight text-[#FFC247] text-start">{hero.subtitle}</p>
            <p className="mt-4 max-w-xl text-base leading-8 text-white/65 text-start">{hero.description}</p>
            
            {/* CTAs */}
            <div className="mt-8 flex flex-col gap-3.5 sm:flex-row w-full sm:w-auto">
              <Button href="#quote" className="w-full sm:w-auto">
                {hero.primary}
                <ArrowUpRight aria-hidden="true" size={18} />
              </Button>
              <Button href="#products" variant="secondary" className="w-full sm:w-auto">
                {hero.secondary}
              </Button>
            </div>

            {/* Quick stats horizontal list */}
            <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-4 border-t border-white/8 pt-8 w-full sm:grid-cols-4">
              <QuickStatItem value="Since 1986" label={locale === "ar" ? "عراقة وتأسيس" : "Established"} />
              <QuickStatItem value="20+ Trucks" label={locale === "ar" ? "شاحنة توزيع" : "Active Fleet"} />
              <QuickStatItem value="7+ Branches" label={locale === "ar" ? "فروع رئيسية" : "Branch Cities"} />
              <QuickStatItem value="Nationwide" label={locale === "ar" ? "توزيع الجمهورية" : "Distribution"} />
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.12} direction="left">
          <div className="relative w-full">
            {/* Glowing backdrop elements */}
            <div
              className="absolute -inset-10 skew-x-[-6deg] rounded-3xl opacity-40 blur-3xl pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(255, 138, 0, 0.25) 0%, transparent 70%)" }}
            />

            {/* Main Image Container (Trucks) */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/12 bg-white/5 p-2 shadow-2xl backdrop-blur-sm">
              <div className="relative h-full w-full overflow-hidden rounded-xl bg-neutral-900">
                <Image
                  src="/images/hero/hero-trucks.webp"
                  alt={locale === "ar" ? "شاحنات توزيع الوصابي للتجارة" : "Al-Wosabe for Trading distribution fleet"}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                {/* Subtle gradient overlay to tie image to dark background */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1D]/90 via-transparent to-black/30" />
              </div>
            </div>

            {/* Secondary Image Card (Warehouse) - Overlapping */}
            <div className="absolute -bottom-10 -start-6 w-[55%] aspect-[4/3] rounded-xl border border-white/15 bg-[#1B1B1D]/90 p-1.5 shadow-2xl transition-transform duration-500 hover:scale-105 md:-start-10">
              <div className="relative h-full w-full overflow-hidden rounded-lg bg-neutral-950">
                <Image
                  src="/images/hero/hero-warehouse.webp"
                  alt={locale === "ar" ? "مستودعات الوصابي للتجارة" : "Al-Wosabe for Trading warehouse"}
                  fill
                  sizes="(max-width: 1024px) 50vw, 20vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-2.5 start-3 text-[10px] font-black tracking-wider text-[#FFC247] uppercase bg-black/60 px-2 py-0.5 rounded">
                  {locale === "ar" ? "المستودعات والمخازن" : "Logistics & Storage"}
                </span>
              </div>
            </div>

            {/* Floating interactive badge */}
            <div className="absolute -top-6 -end-4 flex items-center gap-3 rounded-xl border border-white/10 bg-[#141416]/90 p-3 shadow-xl backdrop-blur-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF8A00]/10 text-[#FFC247]">
                <Truck size={20} />
              </div>
              <div className="text-start">
                <span className="block text-xs font-black text-white">{locale === "ar" ? "أسطول نشط" : "Active Fleet"}</span>
                <span className="block text-[10px] font-bold text-white/50">{locale === "ar" ? "توصيل لكافة المحافظات" : "Nationwide Delivery"}</span>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F7F7F4] to-transparent z-2" />
    </section>
  );
}

function QuickStatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col text-start">
      <strong className="text-xl font-black text-[#FF8A00] sm:text-2xl">{value}</strong>
      <span className="mt-1 text-[10px] font-black uppercase tracking-wider text-white/40">{label}</span>
    </div>
  );
}

function Stats({ locale, years }: { locale: Locale; years: number }) {
  const stats = content[locale].stats;

  return (
    <section className="relative overflow-hidden bg-[#F7F7F4] py-18">
      {/* Route lines background graphic */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none select-none"
        style={{ backgroundImage: "url('/images/graphics/route-lines.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
      <Container className="relative z-10">
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

function Operations({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";
  
  return (
    <section className="relative overflow-hidden bg-[#F7F7F4] py-22">
      {/* Background graphic track */}
      <div 
        className="absolute inset-y-0 start-0 w-1/3 opacity-[0.02] pointer-events-none select-none"
        style={{ backgroundImage: "url('/images/graphics/route-lines.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      />

      <Container className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        {/* Image / Stats Column */}
        <Reveal direction="right">
          <div className="relative">
            {/* Glow effect behind image */}
            <div 
              className="absolute -inset-4 rounded-2xl opacity-40 blur-2xl pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(255, 194, 71, 0.12) 0%, transparent 70%)" }}
            />

            <div className="relative overflow-hidden rounded-2xl border border-black/8 bg-neutral-900 p-2 shadow-2xl">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-950">
                <Image
                  src="/images/operations/warehouse.webp"
                  alt={isAr ? "مستودعات الوصابي للتجارة" : "Al-Wosabe for Trading Warehouse"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                {/* Dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 pointer-events-none" />

                {/* Overlapping Route Lines for theme coherence */}
                <div 
                  className="absolute inset-0 z-1 opacity-15 pointer-events-none mix-blend-screen"
                  style={{ backgroundImage: "url('/images/graphics/route-lines.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
                />

                {/* Floating labels over image */}
                {/* 1. Since 1986 */}
                <div className="absolute top-4 start-4 flex items-center gap-2 rounded-lg border border-white/10 bg-black/75 px-3 py-1.5 shadow-md backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-[#FF8A00]" />
                  <span className="text-[10px] font-black text-white uppercase tracking-wider">
                    {isAr ? "تخزين آمن منذ 1986" : "Secure Storage Since 1986"}
                  </span>
                </div>

                {/* 2. Organized Storage */}
                <div className="absolute top-1/2 -translate-y-1/2 end-4 flex items-center gap-2 rounded-lg border border-white/10 bg-black/75 px-3 py-1.5 shadow-md backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-[#FFC247]" />
                  <span className="text-[10px] font-black text-[#FFC247] uppercase tracking-wider">
                    {isAr ? "مخزون منظم وضخم" : "Organized Inventory"}
                  </span>
                </div>

                {/* 3. Supply & Distribution */}
                <div className="absolute bottom-4 start-4 flex items-center gap-2 rounded-lg border border-white/10 bg-black/75 px-3 py-1.5 shadow-md backdrop-blur-md">
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                  <span className="text-[10px] font-black text-white uppercase tracking-wider">
                    {isAr ? "سلاسل إمداد وتوزيع مستمر" : "Continuous Supply Chains"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Text / Info Column */}
        <Reveal>
          <div className="text-start">
            <SectionHeading 
              eyebrow={isAr ? "الجاهزية التشغيلية" : "Operational Strength"} 
              title={isAr ? "جاهزية تشغيلية ومستودعات منظمة" : "Organized Storage & Distribution Readiness"} 
              description={
                isAr 
                  ? "نعتمد في الوصابي للتجارة على بنية تحتية قوية لإدارة المخزون والتوريد، تضمن تلبية احتياجات التجار والعملاء في كافة الأوقات وبجاهزية كاملة."
                  : "At Al-Wosabe for Trading, we rely on a robust supply and inventory management infrastructure to serve our business partners efficiently and meet demand at all times."
              }
            />

            <div className="mt-8 space-y-4">
              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FF8A00]/10 text-[#FF8A00] font-black">
                  1
                </span>
                <div>
                  <h4 className="text-base font-black text-[#1B1B1D]">
                    {isAr ? "مستودعات بمواصفات عالية" : "High-Capacity Warehouses"}
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-[#343438]/70">
                    {isAr
                      ? "مستودعاتنا مجهزة لتخزين الإطارات والبطاريات والزيوت بطرق منظمة تحافظ على سلامة وجودة المنتجات وتسهل عمليات الشحن السريع."
                      : "Our storage spaces are tailored to house tires, batteries, and lubricants systematically, preserving product quality and facilitating rapid dispatch."}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FF8A00]/10 text-[#FF8A00] font-black">
                  2
                </span>
                <div>
                  <h4 className="text-base font-black text-[#1B1B1D]">
                    {isAr ? "إدارة ذكية للمخزون" : "Smart Inventory Management"}
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-[#343438]/70">
                    {isAr
                      ? "نطبق أنظمة دقيقة لمراقبة المخزون تضمن توفر الفئات المطلوبة بشكل دائم وسد النقص الفوري في نقاط التوزيع المختلفة."
                      : "We employ precise inventory tracking systems to maintain stock levels, avoiding supply bottlenecks and ensuring continuous availability."}
                  </p>
                </div>
              </div>
            </div>
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
          {products[locale].map(({ title, description, image, icon }, index) => (
            <Reveal key={title} delay={index * 0.05}>
              <ProductCategoryCard
                title={title}
                description={description}
                image={image}
                icon={icon}
              />
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
          {brands.map((brand, index) => (
            <Reveal key={brand.name} delay={index * 0.04}>
              <BrandLogoCard name={brand.name} logo={brand.logo} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Distribution({ locale }: { locale: Locale }) {
  const [hoveredCity, setHoveredCity] = useState<string | null>(null);
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
            {branches.map((branch) => (
              <div
                key={branch.city.en}
                onMouseEnter={() => setHoveredCity(branch.city.en)}
                onMouseLeave={() => setHoveredCity(null)}
                className={`group rounded-lg border px-4 py-3.5 text-sm font-bold transition-all duration-300 backdrop-blur cursor-pointer ${
                  hoveredCity === branch.city.en
                    ? "border-[#FF8A00]/50 bg-[#FF8A00]/12 text-white"
                    : "border-white/8 bg-white/5 text-white/65 hover:border-[#FF8A00]/30 hover:bg-[#FF8A00]/8 hover:text-white/85"
                }`}
              >
                <MapPin 
                  className={`me-2 inline transition-all duration-300 ${
                    hoveredCity === branch.city.en ? "text-[#FFC247] scale-110" : "text-[#FF8A00]"
                  }`} 
                  size={16} 
                  aria-hidden="true" 
                />
                {branch.city[locale]}
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal direction="left">
          <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#141416]/90 p-4 shadow-2xl backdrop-blur-md">
            {/* Gradient top line */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[2px]"
              style={{ background: "linear-gradient(90deg, transparent, #ff8a00, #ffc247, #ff8a00, transparent)" }}
            />

            {/* Map Container */}
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
              {/* Yemen map background image */}
              <div className="absolute inset-0 z-0 opacity-40 pointer-events-none p-4">
                <div className="relative w-full h-full">
                  <Image
                    src="/images/graphics/yemen-map.svg"
                    alt="Yemen Map"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              
              {/* Route Lines overlay */}
              <div 
                className="absolute inset-0 z-1 opacity-[0.15] pointer-events-none mix-blend-screen"
                style={{ backgroundImage: "url('/images/graphics/route-lines.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
              />

              {/* Interactive SVG overlay */}
              <svg 
                viewBox="0 0 100 100" 
                className="absolute inset-0 z-10 w-full h-full select-none"
              >
                <defs>
                  <linearGradient id="map-route-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF8A00" />
                    <stop offset="100%" stopColor="#FFC247" />
                  </linearGradient>
                  <filter id="glow-map">
                    <feGaussianBlur stdDeviation="1.2" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Route lines paths */}
                <path 
                  d="M48 33 C40 40, 38 51, 42 66 M48 33 C60 40, 70 50, 78 62 M48 33 C42 37, 38 39, 34 44 M42 66 C49 71, 51 75, 54 78" 
                  fill="none" 
                  stroke="url(#map-route-gradient)" 
                  strokeWidth="1.2" 
                  strokeDasharray="4 3" 
                  className="opacity-50"
                />

                {branches.map((branch) => {
                  const isHovered = hoveredCity === branch.city.en;
                  return (
                    <g 
                      key={branch.city.en}
                      onMouseEnter={() => setHoveredCity(branch.city.en)}
                      onMouseLeave={() => setHoveredCity(null)}
                      className="cursor-pointer"
                    >
                      {/* Outer pulse ring */}
                      <circle 
                        cx={branch.x} 
                        cy={branch.y} 
                        r={isHovered ? "6.5" : "4.5"} 
                        fill="none" 
                        stroke="#FF8A00" 
                        strokeOpacity={isHovered ? "0.6" : "0.2"} 
                        className="transition-all duration-300"
                        style={{ transformOrigin: `${branch.x}% ${branch.y}%` }}
                      />
                      <circle 
                        cx={branch.x} 
                        cy={branch.y} 
                        r={isHovered ? "3.2" : "2.2"} 
                        fill={isHovered ? "#FFC247" : "#FF8A00"} 
                        filter={isHovered ? "url(#glow-map)" : ""}
                        className="transition-all duration-300"
                      />
                      {/* Label tooltip */}
                      {isHovered && (
                        <g>
                          <rect
                            x={branch.x + 3.5}
                            y={branch.y - 8.5}
                            width={locale === "ar" ? "20" : "24"}
                            height="7"
                            rx="1.5"
                            fill="rgba(20,20,22,0.95)"
                            stroke="rgba(255,138,0,0.4)"
                            strokeWidth="0.5"
                          />
                          <text 
                            x={branch.x + (locale === "ar" ? 13.5 : 15.5)} 
                            y={branch.y - 3.5} 
                            fill="#FFFFFF" 
                            fontSize="4.5" 
                            fontWeight="900"
                            textAnchor="middle"
                          >
                            {branch.city[locale]}
                          </text>
                        </g>
                      )}
                      {!isHovered && (
                        <text 
                          x={branch.x + 3.5} 
                          y={branch.y - 1.5} 
                          fill="rgba(255,255,255,0.72)" 
                          fontSize="3.5" 
                          fontWeight="700"
                        >
                          {branch.city[locale]}
                        </text>
                      )}
                    </g>
                  );
                })}
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
    <section className="relative overflow-hidden bg-white py-24">
      {/* Subtle route line background graphic */}
      <div 
        className="absolute inset-y-0 end-0 w-1/3 opacity-[0.03] pointer-events-none select-none"
        style={{ backgroundImage: "url('/images/graphics/route-lines.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
      />

      {/* Tire track background graphic */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none select-none mix-blend-overlay"
        style={{ backgroundImage: "url('/images/graphics/tire-track.svg')", backgroundSize: '400px' }}
      />

      <Container className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        {/* Text Column */}
        <Reveal>
          <div className="text-start">
            <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
            
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl border border-black/5 bg-[#F7F7F4] p-5">
                <strong className="block text-2xl font-black text-[#FF8A00]">
                  {locale === "ar" ? "تغطية جغرافية كاملة" : "Complete Coverage"}
                </strong>
                <p className="mt-2 text-sm leading-6 text-[#343438]/70">
                  {locale === "ar" 
                    ? "نصل إلى كافة المدن والمحافظات الرئيسية من خلال شبكة توريد متكاملة تضمن استقرار الإمداد للشركاء والتجار."
                    : "We reach all major cities and governorates via an integrated supply network ensuring stability for traders and partners."}
                </p>
              </div>

              <div className="rounded-xl border border-black/5 bg-[#F7F7F4] p-5">
                <strong className="block text-2xl font-black text-[#FF8A00]">
                  {locale === "ar" ? "جاهزية تشغيلية عالية" : "High Readiness"}
                </strong>
                <p className="mt-2 text-sm leading-6 text-[#343438]/70">
                  {locale === "ar"
                    ? "أسطولنا مجهز ومعد لنقل وتوزيع المنتجات الثقيلة والمختلفة تحت شتى الظروف الجغرافية والطرق الصعبة بكفاءة تامة."
                    : "Our fleet is equipped and ready to transport heavy and diverse products under various terrains and difficult road conditions."}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Image / Proof Column */}
        <Reveal delay={0.12} direction="left">
          <div className="relative">
            {/* Glowing accent border background */}
            <div 
              className="absolute -inset-4 rounded-2xl opacity-40 blur-2xl pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(255, 138, 0, 0.15) 0%, transparent 70%)" }}
            />
            
            <div className="relative overflow-hidden rounded-2xl border border-black/8 bg-neutral-900 p-2 shadow-2xl">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-neutral-950">
                <Image
                  src="/images/operations/fleet.webp"
                  alt={locale === "ar" ? "أسطول شاحنات الوصابي للتوزيع" : "Al-Wosabe distribution trucks fleet"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                {/* Charcoal Dark Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40 pointer-events-none" />

                {/* Overlapping Route Lines for theme coherence */}
                <div 
                  className="absolute inset-0 z-1 opacity-20 pointer-events-none mix-blend-screen"
                  style={{ backgroundImage: "url('/images/graphics/route-lines.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
                />

                {/* Big Badge Overlay (20+ Distribution Trucks) */}
                <div className="absolute bottom-6 start-6 flex items-center gap-4 rounded-xl border border-white/10 bg-black/75 p-4 shadow-xl backdrop-blur-md">
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF8A00] to-[#E87500] text-[#1B1B1D] shadow-lg">
                    <Truck size={28} />
                  </div>
                  <div className="text-start">
                    <span className="block text-2xl font-black text-white">
                      <AnimatedCounter value={20} suffix="+" />
                    </span>
                    <span className="block text-xs font-bold text-[#FFC247] uppercase tracking-wider">
                      {locale === "ar" ? "شاحنة توزيع نشطة" : "Active Trucks"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
              <BranchCard
                city={branch.city[locale]}
                phones={branch.phones}
                callLabel={copy.call}
                locale={locale}
              />
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
    <section className="relative overflow-hidden bg-white py-24">
      <Container className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        {/* Left: Image Card */}
        <Reveal direction="right">
          <div className="relative">
            {/* Ambient blur */}
            <div 
              className="absolute -inset-4 rounded-3xl opacity-30 blur-2xl pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(255, 138, 0, 0.15) 0%, transparent 70%)" }}
            />
            
            <div className="relative overflow-hidden rounded-2xl border border-black/8 bg-neutral-900 p-2 shadow-2xl">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-neutral-950">
                <Image
                  src="/images/operations/team.webp"
                  alt={isAr ? "فريق عمل الوصابي للتجارة" : "Al-Wosabe for Trading Team"}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />
                
                {/* Floating label */}
                <div className="absolute bottom-4 start-4 rounded-lg border border-white/10 bg-black/60 px-3 py-1.5 backdrop-blur-md">
                  <span className="text-xs font-black text-[#FFC247] uppercase tracking-wider">
                    {isAr ? "فريق عمل متخصص" : "Professional Team"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Right: Content & Strengths */}
        <Reveal>
          <div className="text-start">
            <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
            
            <div className="mt-8 space-y-5">
              {teamItems.map(({ title, description, Icon }, index) => (
                <div 
                  key={index} 
                  className="group flex gap-4 rounded-xl border border-black/5 bg-[#F7F7F4] p-5 transition-all duration-300 hover:border-[#FF8A00]/20 hover:bg-gradient-to-r hover:from-[#FF8A00]/5 hover:to-transparent"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1B1B1D] to-[#2a2a2e] text-[#FFC247] shadow-lg transition-all duration-300 group-hover:from-[#FF8A00] group-hover:to-[#E87500] group-hover:text-[#1B1B1D]">
                    <Icon aria-hidden="true" size={22} />
                  </span>
                  <div>
                    <h4 className="text-base font-black text-[#1B1B1D] transition-colors duration-300 group-hover:text-[#E87500]">
                      {title}
                    </h4>
                    <p className="mt-1 text-sm leading-6 text-[#343438]/70">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
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
      {/* Background SVG graphics */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {/* Tire track */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: "url('/images/graphics/tire-track.svg')", backgroundSize: '400px' }}
        />
        {/* Route lines */}
        <div 
          className="absolute inset-0 opacity-[0.08] pointer-events-none"
          style={{ backgroundImage: "url('/images/graphics/route-lines.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
      </div>
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
