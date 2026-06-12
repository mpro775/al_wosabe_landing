import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import { isLocale, localeDirection, locales, type Locale } from "@/lib/locales";
import { siteMeta } from "@/data/site";

const alexandria = localFont({
  src: [
    {
      path: "../../../public/fonts/Alexandria-Thin.ttf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Alexandria-ExtraLight.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Alexandria-Light.ttf",
      weight: "300",
      style: "normal",
    },
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
      path: "../../../public/fonts/Alexandria-SemiBold.ttf",
      weight: "600",
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
  variable: "--font-arabic",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-english",
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
    metadataBase: new URL("https://al-wosabe.example"),
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ar: "/ar",
        en: "/en",
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale: locale === "ar" ? "ar_YE" : "en_US",
      type: "website",
      images: [{ url: "/logo.png", width: 2048, height: 531, alt: meta.logoAlt }],
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
        className={`${alexandria.variable} ${inter.variable} ${
          locale === "ar" ? "font-[var(--font-arabic)]" : "font-[var(--font-english)]"
        } antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
