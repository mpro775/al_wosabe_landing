import Image from "next/image";
import { Mail, MapPin, Phone, MessageSquare, ArrowUpRight } from "lucide-react";
import { branches, company, content } from "@/data/site";
import type { Locale } from "@/lib/locales";
import { Container } from "@/components/ui/Container";
import { phoneHref, whatsappHref } from "@/lib/utils";

export function Footer({ locale }: { locale: Locale }) {
  const labels = content[locale];
  const year = new Date().getFullYear();
  const isAr = locale === "ar";

  const productLinks = isAr
    ? [
      ["الإطارات", "#products"],
      ["البطاريات", "#products"],
      ["الزيوت ومواد التشحيم", "#products"],
      ["قطع غيار الدراجات النارية", "#products"],
      ["الإكسسوارات", "#products"],
      ["الأدوات والعدد", "#products"],
    ]
    : [
      ["Tires", "#products"],
      ["Batteries", "#products"],
      ["Lubricants", "#products"],
      ["Motorcycle Spare Parts", "#products"],
      ["Accessories", "#products"],
      ["Tools & Hardware", "#products"],
    ];

  const branchLinks = isAr
    ? [
      ["فرع صنعاء", "#branches"],
      ["فرع الحديدة", "#branches"],
      ["فرع المكلا", "#branches"],
      ["فرع عدن", "#branches"],
      ["فرع تعز", "#branches"],
    ]
    : [
      ["Sana'a Branch", "#branches"],
      ["Hodeidah Branch", "#branches"],
      ["Mukalla Branch", "#branches"],
      ["Aden Branch", "#branches"],
      ["Taiz Branch", "#branches"],
    ];

  const directMessage = isAr
    ? "مرحباً، أريد التواصل مع الوصابي للتجارة."
    : "Hello, I would like to contact Al-Wosabe for Trading.";

  return (
    <footer id="contact" className="relative overflow-hidden bg-ink-950 py-16 text-white">
      <div className="blueprint-grid pointer-events-none absolute inset-0 z-0 opacity-40" />

      {/* Top hairline accent */}
      <div className="absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-brand/50 to-transparent" />

      <Container className="relative z-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.9fr_0.9fr_1.1fr]">
          {/* Column 1: Info */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-start">
            <Image
              src="/logo/logo-white.png"
              alt={isAr ? "شعار الوصابي للتجارة باللون الأبيض" : "Al-Wosabe for Trading white logo"}
              width={260}
              height={70}
              className="h-11 w-auto object-contain xl:h-12"
            />
            <p className="mt-6 max-w-sm text-sm leading-8 text-steel-400">{labels.footer.description}</p>
            {/* Social-proof badge */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs font-bold text-steel-300">
              <span className="inline-block h-2 w-2 rounded-full bg-brand" />
              <span className="text-brand-bright">{isAr ? "منذ 1986" : "Since 1986"}</span>
            </div>
          </div>

          {/* Column 2: Products */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-start">
            <h3 className="font-display mb-5 w-full text-base font-bold text-brand-bright">{isAr ? "المنتجات" : "Products"}</h3>
            <div className="grid justify-items-center gap-2.5 text-sm text-steel-400 sm:justify-items-start">
              {productLinks.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="animated-underline w-fit transition-colors duration-300 hover:text-white"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Column 3: Branches */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-start">
            <h3 className="font-display mb-5 w-full text-base font-bold text-brand-bright">{isAr ? "الفروع" : "Branches"}</h3>
            <div className="flex w-full flex-wrap justify-center gap-x-4 gap-y-2.5 text-sm text-steel-400 sm:grid sm:gap-2.5">
              {branchLinks.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="animated-underline w-fit transition-colors duration-300 hover:text-white"
                >
                  {label}
                </a>
              ))}
              <a
                href="#branches"
                className="mt-2 flex w-full items-center justify-center gap-1 text-xs font-bold text-brand transition-colors hover:text-brand-bright sm:w-auto sm:justify-start"
              >
                <span>{isAr ? "استعراض كل الفروع" : "View All Branches"}</span>
                <ArrowUpRight size={14} className="rtl:-scale-x-100" />
              </a>
            </div>
          </div>

          {/* Column 4: Contact & Quote */}
          <div className="flex flex-col items-center text-center sm:items-start sm:text-start">
            <h3 className="font-display mb-5 w-full text-base font-bold text-brand-bright">{isAr ? "تواصل وطلب عرض سعر" : "Contact & Quote"}</h3>
            <div className="grid w-full justify-items-center gap-3 text-sm text-steel-400 sm:justify-items-start">
              {/* Main Phone */}
              <a
                href={phoneHref(company.whatsappNumber)}
                className="flex items-center gap-3 transition-colors duration-300 hover:text-white"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-brand">
                  <Phone size={15} aria-hidden="true" />
                </span>
                <span dir="ltr" className="font-bold">+967 777 265 744</span>
              </a>

              {/* Main Office Location */}
              <span className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-brand">
                  <MapPin size={15} aria-hidden="true" />
                </span>
                <span>{isAr ? "صنعاء، الجمهورية اليمنية" : "Sana'a, Yemen"}</span>
              </span>

              {/* Quote Request Form link */}
              <a
                href="#quote"
                className="flex items-center gap-3 transition-colors duration-300 hover:text-white"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/[0.06] text-brand">
                  <Mail size={15} aria-hidden="true" />
                </span>
                <span>{isAr ? "طلب عرض السعر" : "Request a Quote"}</span>
              </a>

              {/* WhatsApp Button */}
              <div className="mt-3 w-full max-w-[280px] sm:max-w-none">
                <a
                  href={whatsappHref(company.whatsappNumber, directMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring flex min-h-11 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg transition-all duration-300 hover:bg-emerald-500 hover:scale-[1.02] active:scale-[0.98] w-full"
                >
                  <MessageSquare size={16} />
                  <span>{isAr ? "تواصل عبر واتساب" : "Chat on WhatsApp"}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright footer */}
        <div className="mt-12 border-t border-white/8 pt-6">
          <div className="flex flex-col items-center justify-between gap-3 text-sm text-white/35 sm:flex-row">
            <span>© {year} Al-Wosabe for Trading. {labels.footer.rights}</span>
            <span className="text-xs text-white/20">{isAr ? "صُنع بعناية 🇾🇪" : "Crafted with care 🇾🇪"}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
