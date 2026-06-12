import { notFound } from "next/navigation";
import { LandingPage } from "@/components/sections/LandingPage";
import { isLocale, type Locale } from "@/lib/locales";

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    notFound();
  }

  return <LandingPage locale={rawLocale as Locale} />;
}
