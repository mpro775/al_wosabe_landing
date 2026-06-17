"use client";

import { useState } from "react";
import Image from "next/image";
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

function Hero({ locale, years }: { locale: Locale; years: number }) {
  const hero = content[locale].hero;
  const isAr = locale === "ar";

  // Split title to style specific words
  // "الوصابي للتجارة" -> "الوصابي" (white), "للتجارة" (orange)
  // "Al-Wosabe for Trading" -> "Al-Wosabe" (white), "for Trading" (orange)
  const renderTitle = () => {
    if (isAr) {
      return (
        <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl xl:text-7xl text-center lg:text-start text-white w-full">
          <SplitTextReveal text="الوصابي" />{" "}
          <span className="text-[#FF8A00] drop-shadow-[0_0_15px_rgba(255,138,0,0.2)]">
            <SplitTextReveal text="للتجارة" />
          </span>
        </h1>
      );
    }
    return (
      <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl xl:text-7xl text-center lg:text-start text-white w-full">
        <SplitTextReveal text="Al-Wosabe" />{" "}
        <span className="text-[#FF8A00] drop-shadow-[0_0_15px_rgba(255,138,0,0.2)]">
          <SplitTextReveal text="for Trading" />
        </span>
      </h1>
    );
  };

  return (
    <section id="home" className="relative min-h-[760px] md:min-h-screen overflow-hidden bg-[#1B1B1D] pt-28 text-white flex items-center">
      {/* Ambient warehouse background image */}
      <div className="absolute inset-0 z-0 opacity-[0.04] filter grayscale pointer-events-none">
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
          className="absolute -end-10 top-0 h-full w-[350px] opacity-[0.02] mix-blend-overlay rotate-6 pointer-events-none bg-repeat-y"
          style={{ backgroundImage: "url('/images/graphics/tire-track.svg')", backgroundSize: 'contain' }}
        />
        {/* Route lines animated drifting background */}
        <motion.div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: "url('/images/graphics/route-lines.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 220,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Diagonal orange stripe */}
      <motion.div
        initial={{ x: isAr ? "100%" : "-100%", opacity: 0 }}
        whileInView={{ x: "0%", opacity: 0.12 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className={`absolute top-0 bottom-0 w-[45%] bg-[#FF8A00] pointer-events-none z-[1] -skew-x-[12deg] ${isAr ? "right-[-10%]" : "left-[-10%]"
          }`}
      />

      {/* Grid Pattern and Overlay */}
      <div className="industrial-grid absolute inset-0 opacity-20 z-1 pointer-events-none" />
      <div className="hero-gradient-overlay absolute inset-0 z-1 pointer-events-none" />

      <Container className="relative z-10 grid min-h-[calc(100vh-7rem)] items-center gap-12 py-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-start w-full">
          {/* Small floating logo badge */}
          <Reveal className="hidden lg:block">
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
                <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#FF8A00]">
                  {isAr ? "الوصابي للتجارة" : "Al-Wosabe Trading"}
                </span>
                <span className="text-[9px] font-bold text-white/50">
                  {isAr ? "تأسست عام 1986" : "Since 1986"}
                </span>
              </div>
            </div>
          </Reveal>

          {/* Hero Eyebrow */}
          <Reveal delay={0.1}>
            <div className="relative mb-5 inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#FF8A00]/30 bg-[#FF8A00]/8 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#FFC247]">
              <span className="relative">{hero.eyebrow}</span>
            </div>
          </Reveal>

          {/* Title */}
          {renderTitle()}

          {/* Separator */}
          <Reveal delay={0.2}>
            <div
              className="my-5 h-[3px] w-20 rounded-full"
              style={{
                background: "linear-gradient(90deg, #ff8a00, #ffc247)",
                boxShadow: "0 0 15px rgba(255, 138, 0, 0.4)",
              }}
            />
          </Reveal>

          <Reveal delay={0.3} className="w-full">
            <p className="text-xl font-bold leading-tight text-[#FFC247] text-center lg:text-start w-full">
              {hero.subtitle}{" "}
              <span className="text-white font-normal text-sm opacity-50 block md:inline md:ms-2">
                ({isAr ? "منذ 1986" : "Since 1986"})
              </span>
            </p>
          </Reveal>

          <Reveal delay={0.4} className="w-full flex justify-center lg:justify-start">
            <p className="mt-4 max-w-xl text-base leading-8 text-white/75 text-center lg:text-start w-full">{hero.description}</p>
          </Reveal>

          {/* CTAs */}
          <Reveal delay={0.5} className="w-full flex justify-center lg:justify-start">
            <div className="mt-8 flex flex-row gap-3 w-full max-w-md sm:max-w-none sm:w-auto justify-center lg:justify-start">
              <Button href="#quote" className="flex-1 sm:flex-none min-h-12 px-4 sm:px-6 text-sm">
                {hero.primary}
                <ArrowUpRight aria-hidden="true" size={18} />
              </Button>
              <Button href="#products" variant="secondary" className="flex-1 sm:flex-none min-h-12 px-4 sm:px-6 text-sm">
                {hero.secondary}
              </Button>
            </div>
          </Reveal>
        </div>

        {/* Hero Visual Column */}
        <div className="relative w-full max-lg:order-2">
          {/* Glowing backdrop elements */}
          <div
            className="absolute -inset-10 skew-x-[-6deg] rounded-3xl opacity-30 blur-3xl pointer-events-none"
            style={{ background: "radial-gradient(circle, rgba(255, 138, 0, 0.2) 0%, transparent 70%)" }}
          />

          {/* Main Image Container (Trucks) */}
          <Reveal delay={0.2} direction="left" className="relative z-10">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/12 bg-white/5 p-2 shadow-2xl backdrop-blur-sm">
              <ParallaxImage
                src="/images/hero/hero-trucks.webp"
                alt={isAr ? "صورة تعبيرية لأسطول توزيع" : "Illustrative image of distribution fleet"}
                aspectRatio="aspect-auto h-full"
                containerClassName="rounded-xl overflow-hidden h-full"
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1B1B1D]/80 via-transparent to-black/20 pointer-events-none rounded-xl m-2" />
            </div>
          </Reveal>

          {/* Secondary Image Card (Warehouse) - Desktop Only */}
          <div className="hidden md:block absolute -bottom-10 -start-10 w-[55%] aspect-[4/3] rounded-xl border border-white/15 bg-[#1B1B1D]/90 p-1.5 shadow-2xl z-20">
            <div className="relative h-full w-full overflow-hidden rounded-lg bg-neutral-950">
              <Image
                src="/images/hero/hero-warehouse.webp"
                alt={isAr ? "صورة تعبيرية لمستودعات ومنتجات" : "Illustrative image of warehouse and product storage"}
                fill
                sizes="20vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <span className="absolute bottom-2.5 start-3 text-[10px] font-bold tracking-wider text-[#FFC247] uppercase bg-black/60 px-2 py-0.5 rounded">
                {isAr ? "المستودعات والمخازن" : "Logistics & Storage"}
              </span>
            </div>
          </div>

          {/* Floating interactive badge */}
          <Reveal delay={0.4} className="absolute -top-6 -end-4 z-20">
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#141416]/95 p-3 shadow-xl backdrop-blur-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF8A00]/10 text-[#FFC247]">
                <Truck size={20} />
              </div>
              <div className="text-start">
                <span className="block text-xs font-bold text-white">{isAr ? "أسطول نشط" : "Active Fleet"}</span>
                <span className="block text-[10px] font-bold text-white/50">{isAr ? "توزيع الجمهورية" : "Nationwide Delivery"}</span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F7F7F4] to-transparent z-2" />
    </section>
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
        <div className="mt-12 grid grid-cols-2 gap-3.5 sm:grid-cols-2 lg:grid-cols-5">
          {stats.items.map(([value, label], index) => {
            const isYears = value === "years";
            const numeric = /^\d/.test(value);
            const numberValue = isYears ? years : numeric ? Number.parseInt(value, 10) : null;
            const suffix = value.includes("+") || isYears ? "+" : "";

            return (
              <Reveal key={label} delay={index * 0.06} className={cn(index === 4 && "col-span-2 sm:col-span-1")}>
                <div className="gradient-top-border group relative h-full overflow-hidden rounded-xl border border-black/6 bg-white p-5 sm:p-6 text-center shadow-sm transition-all duration-400 hover:shadow-[0_20px_50px_rgba(255,138,0,0.12)] hover:-translate-y-1">
                  {/* Subtle gradient overlay on hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-[#FF8A00]/0 to-[#FFC247]/0 opacity-0 transition-opacity duration-400 group-hover:from-[#FF8A00]/4 group-hover:to-[#FFC247]/2 group-hover:opacity-100" />
                  <strong className="relative block text-3xl sm:text-4xl font-bold text-[#FF8A00]">
                    {numberValue === null ? value : <AnimatedCounter value={numberValue} suffix={suffix} />}
                  </strong>
                  <span className="relative mt-2.5 sm:mt-3 block text-xs sm:text-sm font-bold leading-6 text-[#343438]/65">{label}</span>
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
              {about.timeline.map(([year, text]) => (
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
                  <strong className="text-2xl font-bold text-[#FFC247]">{year}</strong>
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
              <ParallaxImage
                src="/images/operations/warehouse.webp"
                alt={isAr ? "صورة تعبيرية لمستودعات ومنتجات" : "Illustrative image of warehouse and product storage"}
                containerClassName="rounded-xl overflow-hidden"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/20 pointer-events-none" />

              {/* Overlapping Route Lines for theme coherence */}
              <div
                className="absolute inset-0 z-1 opacity-15 pointer-events-none mix-blend-screen"
                style={{ backgroundImage: "url('/images/graphics/route-lines.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
              />

              {/* Floating labels over image */}
              <div className="absolute top-4 start-4 flex items-center gap-2 rounded-lg border border-white/10 bg-black/75 px-3 py-1.5 shadow-md backdrop-blur-md z-10">
                <span className="h-2 w-2 rounded-full bg-[#FF8A00]" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                  {isAr ? "تخزين آمن منذ 1986" : "Secure Storage Since 1986"}
                </span>
              </div>

              <div className="absolute top-1/2 -translate-y-1/2 end-4 flex items-center gap-2 rounded-lg border border-white/10 bg-black/75 px-3 py-1.5 shadow-md backdrop-blur-md z-10">
                <span className="h-2 w-2 rounded-full bg-[#FFC247]" />
                <span className="text-[10px] font-bold text-[#FFC247] uppercase tracking-wider">
                  {isAr ? "مخزون منظم وضخم" : "Organized Inventory"}
                </span>
              </div>

              <div className="absolute bottom-4 start-4 flex items-center gap-2 rounded-lg border border-white/10 bg-black/75 px-3 py-1.5 shadow-md backdrop-blur-md z-10">
                <span className="h-2 w-2 rounded-full bg-green-400" />
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">
                  {isAr ? "سلاسل إمداد وتوزيع مستمر" : "Continuous Supply Chains"}
                </span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Text / Info Column */}
        <Reveal>
          <div className="text-start ">
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
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FF8A00]/10 text-[#FF8A00] font-bold">
                  1
                </span>
                <div>
                  <h4 className="text-base font-bold text-[#1B1B1D]">
                    {isAr ? "مستودعات منظمة وجاهزية توريد" : "Organized Warehousing & Supply Readiness"}
                  </h4>
                  <p className="mt-1 text-sm leading-6 text-[#343438]/70">
                    {isAr
                      ? "مستودعاتنا مجهزة لتخزين الإطارات والبطاريات والزيوت بطرق منظمة تحافظ على سلامة وجودة المنتجات وتسهل عمليات الشحن السريع."
                      : "Our storage spaces are tailored to house tires, batteries, and lubricants systematically, preserving product quality and facilitating rapid dispatch."}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FF8A00]/10 text-[#FF8A00] font-bold">
                  2
                </span>
                <div>
                  <h4 className="text-base font-bold text-[#1B1B1D]">
                    {isAr ? "إدارة منظمة للمخزون" : "Organized Inventory Management"}
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
        <div className="mt-12 grid grid-cols-2 gap-3.5 md:gap-5 md:grid-cols-2 lg:grid-cols-3">
          {products[locale].map(({ title, description, image, icon, category }, index) => (
            <Reveal key={title} delay={index * 0.05}>
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

function Brands({ locale }: { locale: Locale }) {
  const copy = content[locale].brands;

  return (
    <section id="brands" className="bg-white py-22">
      <Container>
        <div className="mb-12">
          <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
        </div>

        {/* Dynamic Partner Marquee wrapper */}
        <Reveal delay={0.1}>
          <BrandMarquee brands={brands} locale={locale} />
        </Reveal>
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
          <div className="mt-8 grid grid-cols-4 gap-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-3">
            {branches.map((branch) => (
              <div
                key={branch.city.en}
                onMouseEnter={() => setHoveredCity(branch.city.en)}
                onMouseLeave={() => setHoveredCity(null)}
                onClick={() => setHoveredCity(branch.city.en)}
                className={`group rounded-lg border p-2 text-[10px] sm:text-xs md:text-sm font-bold transition-all duration-300 backdrop-blur cursor-pointer flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-center ${hoveredCity === branch.city.en
                  ? "border-[#FF8A00] bg-[#FF8A00]/15 text-white"
                  : "border-white/8 bg-white/5 text-white/65 hover:border-[#FF8A00]/30 hover:bg-[#FF8A00]/8 hover:text-white/85"
                  }`}
              >
                <MapPin
                  className={`transition-all duration-300 shrink-0 ${hoveredCity === branch.city.en ? "text-[#FFC247] scale-110" : "text-[#FF8A00]"
                    }`}
                  size={12}
                  aria-hidden="true"
                />
                <span className="truncate max-w-full">{branch.city[locale]}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Animated Interactive SVG Route Map */}
        <Reveal direction="left">
          <AnimatedRouteMap
            locale={locale}
            hoveredCity={hoveredCity}
            setHoveredCity={setHoveredCity}
          />
        </Reveal>
      </Container>
    </section>
  );
}

function Fleet({ locale }: { locale: Locale }) {
  const copy = content[locale].fleet;
  const isAr = locale === "ar";

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
                <strong className="block text-2xl font-bold text-[#FF8A00]">
                  {isAr ? "تغطية جغرافية منظمة" : "Organized Reach"}
                </strong>
                <p className="mt-2 text-sm leading-6 text-[#343438]/70">
                  {isAr
                    ? "نخدم المدن الرئيسية ونطاقًا واسعًا من السوق اليمني عبر شبكة فروع وتوزيع منظمة تضمن استقرار الإمداد للشركاء."
                    : "We serve main cities and a wide scope of the Yemeni market through an organized branch and distribution network."}
                </p>
              </div>

              <div className="rounded-xl border border-black/5 bg-[#F7F7F4] p-5">
                <strong className="block text-2xl font-bold text-[#FF8A00]">
                  {isAr ? "جاهزية تشغيلية عالية" : "High Readiness"}
                </strong>
                <p className="mt-2 text-sm leading-6 text-[#343438]/70">
                  {isAr
                    ? "أسطولنا مجهز ومعد لنقل وتوزيع المنتجات الثقيلة والمختلفة تحت شتى الظروف الجغرافية والطرق الصعبة بكفاءة تامة."
                    : "Our fleet is equipped and ready to transport heavy and diverse products under various terrains and difficult road conditions."}
                </p>
              </div>
            </div>

            {/* Direct branch communication shortcut */}
            <div className="mt-6">
              <Button href="#branches" variant="secondary" className="min-h-11 text-xs py-2.5 px-5 select-none">
                {isAr ? "تواصل مع أقرب فرع" : "Contact nearest branch"}
              </Button>
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
              <ParallaxImage
                src="/images/operations/fleet.webp"
                alt={isAr ? "صورة تعبيرية لأسطول توزيع" : "Illustrative image of distribution fleet"}
                containerClassName="rounded-xl overflow-hidden"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
              {/* Charcoal Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40 pointer-events-none animate-none" />

              {/* Overlapping Route Lines for theme coherence */}
              <div
                className="absolute inset-0 z-1 opacity-20 pointer-events-none mix-blend-screen"
                style={{ backgroundImage: "url('/images/graphics/route-lines.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
              />

              {/* Big Badge Overlay (20+ Distribution Trucks) */}
              <div className="absolute bottom-6 start-6 flex items-center gap-4 rounded-xl border border-white/10 bg-black/75 p-4 shadow-xl backdrop-blur-md z-10">
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-[#FF8A00] to-[#E87500] text-[#1B1B1D] shadow-lg">
                  <Truck size={28} />
                </div>
                <div className="text-start">
                  <span className="block text-2xl font-bold text-white">
                    <AnimatedCounter value={20} suffix="+" />
                  </span>
                  <span className="block text-xs font-bold text-[#FFC247] uppercase tracking-wider">
                    {isAr ? "شاحنة توزيع نشطة" : "Active Trucks"}
                  </span>
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
  const [selectedBranch, setSelectedBranch] = useState<typeof branches[0] | null>(null);

  return (
    <section id="branches" className="bg-white py-22">
      <Container>
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} description={copy.description} />
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-4 md:gap-5">
          {branches.map((branch, index) => (
            <Reveal key={branch.city.en} delay={index * 0.04}>
              <button
                onClick={() => setSelectedBranch(branch)}
                className="group relative flex items-center justify-between rounded-xl border border-black/8 bg-[#F7F7F4]/50 p-3 sm:p-4 md:p-6 shadow-sm transition-all duration-300 hover:border-[#FF8A00]/40 hover:bg-white hover:shadow-md text-start w-full cursor-pointer"
              >
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4 overflow-hidden">
                  <span className="flex h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#1B1B1D] to-[#252529] text-[#FFC247] shadow-md group-hover:from-[#FF8A00] group-hover:to-[#E87500] group-hover:text-white transition-all duration-300">
                    <MapPin className="h-4 w-4 sm:h-5 sm:w-5 md:h-5.5 md:w-5.5" aria-hidden="true" />
                  </span>
                  <div className="overflow-hidden">
                    <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#1B1B1D] transition-colors group-hover:text-[#E87500] truncate">
                      {branch.city[locale]}
                    </h3>
                    <span className="text-[9px] sm:text-xs text-[#343438]/50 mt-0.5 block truncate">
                      {locale === "ar" ? "اضغط للتواصل" : "Click to connect"}
                    </span>
                  </div>
                </div>
                <span className="flex h-7 w-7 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-full bg-black/5 text-[#E87500] group-hover:bg-[#FF8A00] group-hover:text-white transition-all duration-300">
                  <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </Container>

      {/* Modern Dialog Modal */}
      <AnimatePresence>
        {selectedBranch && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBranch(null)}
              className="absolute inset-0 bg-[#141416]/75 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#1B1B1D] p-6 shadow-2xl text-white"
            >
              {/* Top Accent line */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#FF8A00] to-[#FFC247]" />

              {/* Close Button */}
              <button
                onClick={() => setSelectedBranch(null)}
                className="absolute top-4 end-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:bg-white/10 hover:text-white cursor-pointer"
                aria-label="Close"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3.5 mb-6 text-start">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF8A00] to-[#E87500] text-[#1B1B1D] shadow-lg">
                  <MapPin size={22} />
                </span>
                <div>
                  <h3 className="text-xl font-bold">{selectedBranch.city[locale]}</h3>
                  <p className="text-xs text-[#FFC247] uppercase tracking-wider font-semibold mt-0.5">
                    {locale === "ar" ? "أرقام التواصل والفرع" : "Branch Contact Numbers"}
                  </p>
                </div>
              </div>

              {/* Phone List */}
              <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                {selectedBranch.phones.map((phone) => (
                  <a
                    key={phone}
                    href={phoneHref(phone)}
                    className="flex items-center justify-between gap-4 rounded-xl border border-white/8 bg-white/5 px-4 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:border-[#FF8A00]/50 hover:bg-[#FF8A00]/10 hover:text-[#FFC247] hover:shadow-[0_4px_15px_rgba(255,138,0,0.15)] group"
                  >
                    <span dir="ltr">{phone}</span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/70 group-hover:bg-[#FF8A00] group-hover:text-white transition-colors duration-300">
                      <Phone size={14} />
                    </span>
                  </a>
                ))}
              </div>

              {/* Footer info */}
              <div className="mt-6 border-t border-white/8 pt-4 text-center">
                <p className="text-xs text-white/50">
                  {locale === "ar"
                    ? "جميع الأرقام قابلة للضغط للاتصال المباشر"
                    : "All numbers are clickable for direct calls"}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Values({ locale }: { locale: Locale }) {
  const copy = content[locale].values;

  return (
    <section className="bg-[#F7F7F4] py-22">
      <Container>
        <SectionHeading eyebrow={copy.eyebrow} title={copy.title} align="center" />
        <div className="mt-12 grid grid-cols-2 gap-3.5 sm:gap-4 md:grid-cols-3">
          {copy.items.map(([title, description], index) => {
            const Icon = valueIcons[index];
            return (
              <Reveal key={title} delay={index * 0.06} className={cn(index === 2 && "col-span-2 sm:col-span-1")}>
                <article className="card-hover-glow group relative h-full overflow-hidden rounded-xl border border-black/6 bg-white p-5 sm:p-7 text-center shadow-sm">
                  {/* Gradient overlay on hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-[#FF8A00]/0 to-[#FFC247]/0 opacity-0 transition-opacity duration-400 group-hover:from-[#FF8A00]/4 group-hover:to-[#FFC247]/2 group-hover:opacity-100" />
                  <div className="relative">
                    <div className="mx-auto mb-5 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-xl bg-gradient-to-br from-[#FF8A00]/12 to-[#FFC247]/8 text-[#FF8A00] transition-all duration-400 group-hover:from-[#FF8A00] group-hover:to-[#E87500] group-hover:text-white group-hover:shadow-[0_8px_24px_rgba(255,138,0,0.3)]">
                      <Icon aria-hidden="true" size={24} className="sm:h-7 sm:w-7" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#1B1B1D]">{title}</h3>
                    <div
                      className="mx-auto my-3.5 h-[2px] w-10 rounded-full transition-all duration-400 group-hover:w-16"
                      style={{ background: "linear-gradient(90deg, #ff8a00, #ffc247)" }}
                    />
                    <p className="text-xs sm:text-sm leading-6 sm:leading-7 text-[#343438]/68">{description}</p>
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
              <ParallaxImage
                src="/images/operations/team.webp"
                alt={isAr ? "صورة تعبيرية لفريق عمليات وتوزيع" : "Illustrative image of operations and distribution team"}
                sizes="(max-width: 1024px) 100vw, 40vw"
                aspectRatio="aspect-[16/10]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent pointer-events-none" />

              {/* Floating label */}
              <div className="absolute bottom-4 start-4 rounded-lg border border-white/10 bg-black/60 px-3 py-1.5 backdrop-blur-md z-10">
                <span className="text-xs font-bold text-[#FFC247] uppercase tracking-wider">
                  {isAr ? "فريق عمل متخصص" : "Professional Team"}
                </span>
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
                    <h4 className="text-base font-bold text-[#1B1B1D] transition-colors duration-300 group-hover:text-[#E87500]">
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
          <Button href={whatsappHref(company.whatsappNumber, directMessage)} className="mt-8 select-none">
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
