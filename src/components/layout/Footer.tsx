import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import { branches, company, content, navigation } from "@/data/site";
import type { Locale } from "@/lib/locales";
import { Container } from "@/components/ui/Container";
import { phoneHref } from "@/lib/utils";

export function Footer({ locale }: { locale: Locale }) {
  const labels = content[locale];
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="relative bg-[#111113] py-16 text-white">
      {/* Top gradient border */}
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{ background: "linear-gradient(90deg, transparent, #ff8a00, #ffc247, #ff8a00, transparent)" }}
      />

      {/* Subtle glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#FF8A00]/3 to-transparent" />

      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image
              src={company.logo}
              alt={locale === "ar" ? "شعار الوصابي للتجارة" : "Al-Wosabe for Trading logo"}
              width={310}
              height={81}
              className="h-14 w-auto object-contain drop-shadow-[0_0_20px_rgba(255,138,0,0.15)]"
            />
            <p className="mt-6 max-w-xl text-sm leading-8 text-white/55">{labels.footer.description}</p>
            {/* Social-proof mini-badge */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/5 px-4 py-2 text-xs font-bold text-white/50">
              <span className="inline-block h-2 w-2 rounded-full bg-green-400" style={{ boxShadow: "0 0 6px rgba(74, 222, 128, 0.6)" }} />
              {locale === "ar" ? "نشط منذ 1986" : "Active since 1986"}
            </div>
          </div>
          <div>
            <h3 className="mb-5 text-lg font-black">{locale === "ar" ? "روابط سريعة" : "Quick Links"}</h3>
            <div className="grid gap-2.5 text-sm text-white/55">
              {navigation[locale].map(([label, id]) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className="animated-underline w-fit transition-colors duration-300 hover:text-[#FFC247]"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-5 text-lg font-black">{locale === "ar" ? "تواصل" : "Contact"}</h3>
            <div className="grid gap-3.5 text-sm text-white/55">
              <a
                href={phoneHref(branches[4].phones[0])}
                className="flex items-center gap-3 transition-colors duration-300 hover:text-[#FFC247]"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/8 text-[#FF8A00]">
                  <Phone size={15} aria-hidden="true" />
                </span>
                <span dir="ltr">{branches[4].phones[0]}</span>
              </a>
              <span className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/8 text-[#FF8A00]">
                  <MapPin size={15} aria-hidden="true" />
                </span>
                {locale === "ar" ? "فروع في مدن رئيسية داخل اليمن" : "Branches across key Yemeni cities"}
              </span>
              <span className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/8 text-[#FF8A00]">
                  <Mail size={15} aria-hidden="true" />
                </span>
                {locale === "ar" ? "نموذج الطلب عبر واتساب" : "Quote requests via WhatsApp"}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/8 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-white/35 sm:flex-row">
            <span>© {year} Al-Wosabe for Trading. {labels.footer.rights}</span>
            <span className="text-xs text-white/20">{locale === "ar" ? "صُنع بعناية 🇾🇪" : "Crafted with care 🇾🇪"}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
