import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import { isLocale, localeDirection, locales, type Locale } from "@/lib/locales";
import { siteMeta } from "@/data/site";
import { Preloader } from "@/components/layout/Preloader";
import { PageTransition } from "@/components/layout/PageTransition";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { FloatingWhatsAppButton } from "@/components/ui/FloatingWhatsAppButton";
import { BackToTopButton } from "@/components/ui/BackToTopButton";

const alexandria = localFont({
  src: [
    {
      path: "../../../public/fonts/Alexandria-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Alexandria-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Alexandria-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Alexandria-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Alexandria-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-alexandria",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : "ar";
  const meta = siteMeta[locale];

  return {
    metadataBase: new URL("https://www.alwosabe.com"),
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ar: "/ar",
        en: "/en",
        "x-default": "/",
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale: locale === "ar" ? "ar_YE" : "en_US",
      type: "website",
      images: [
        {
          url: "/images/og-image.png",
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
      images: ["/images/og-image.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  const locale = rawLocale as Locale;

  return (
    <html lang={locale} dir={localeDirection(locale)}>
      <body
        className={`${alexandria.variable} font-[var(--font-alexandria)] antialiased`}
      >
        <Preloader locale={locale} />
        <ScrollProgress />
        <PageTransition>{children}</PageTransition>
        <FloatingWhatsAppButton locale={locale} />
        <BackToTopButton />
      </body>
    </html>
  );
}

