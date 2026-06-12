import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import { isLocale, localeDirection, locales, type Locale } from "@/lib/locales";
import { siteMeta } from "@/data/site";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
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
        className={`${cairo.variable} ${inter.variable} ${
          locale === "ar" ? "font-[var(--font-arabic)]" : "font-[var(--font-english)]"
        } antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
