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
    <footer id="contact" className="relative overflow-hidden bg-[#111113] py-16 text-white">
      {/* Background SVG graphics */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {/* Tire track */}
        <div 
          className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none"
          style={{ backgroundImage: "url('/images/graphics/tire-track.svg')", backgroundSize: '350px' }}
        />
        {/* Route lines */}
        <div 
          className="absolute inset-0 opacity-[0.015] pointer-events-none"
          style={{ backgroundImage: "url('/images/graphics/route-lines.svg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
      </div>

      {/* Top gradient border */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] z-1"
        style={{ background: "linear-gradient(90deg, transparent, #ff8a00, #ffc247, #ff8a00, transparent)" }}
      />

      {/* Subtle glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#FF8A00]/3 to-transparent z-1" />

      <Container className="relative z-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.9fr_0.9fr_1.1fr]">
          {/* Column 1: Info */}
          <div>
            <Image
              src="/logo/logo-white.png"
              alt={isAr ? "شعار الوصابي للتجارة باللون الأبيض" : "Al-Wosabe for Trading white logo"}
              width={260}
              height={70}
              className="h-11 xl:h-12 w-auto object-contain drop-shadow-[0_0_20px_rgba(255,138,0,0.1)]"
            />
            <p className="mt-6 text-sm leading-8 text-white/55">{labels.footer.description}</p>
            {/* Social-proof badge */}
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#FF8A00]/20 bg-white/5 px-4 py-2 text-xs font-bold text-white/70">
              <span className="inline-block h-2 w-2 rounded-full bg-[#FF8A00] animate-pulse" style={{ boxShadow: "0 0 6px rgba(255, 138, 0, 0.6)" }} />
              <span className="text-[#FFC247]">{isAr ? "منذ 1986" : "Since 1986"}</span>
            </div>
          </div>

          {/* Column 2: Products */}
          <div>
            <h3 className="mb-5 text-base font-black text-[#FFC247]">{isAr ? "المنتجات" : "Products"}</h3>
            <div className="grid gap-2.5 text-sm text-white/55">
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
          <div>
            <h3 className="mb-5 text-base font-black text-[#FFC247]">{isAr ? "الفروع" : "Branches"}</h3>
            <div className="grid gap-2.5 text-sm text-white/55">
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
                className="mt-2 flex items-center gap-1 text-xs font-extrabold text-[#FF8A00] hover:text-[#FFC247] transition-colors"
              >
                <span>{isAr ? "استعراض كل الفروع" : "View All Branches"}</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          {/* Column 4: Contact & Quote */}
          <div className="flex flex-col items-start">
            <h3 className="mb-5 text-base font-black text-[#FFC247]">{isAr ? "تواصل وطلب عرض سعر" : "Contact & Quote"}</h3>
            <div className="grid gap-3 text-sm text-white/55 w-full">
              {/* Main Phone */}
              <a
                href={phoneHref(company.whatsappNumber)}
                className="flex items-center gap-3 transition-colors duration-300 hover:text-white"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/8 text-[#FF8A00]">
                  <Phone size={15} aria-hidden="true" />
                </span>
                <span dir="ltr" className="font-bold">+967 777 265 744</span>
              </a>

              {/* Main Office Location */}
              <span className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/8 text-[#FF8A00]">
                  <MapPin size={15} aria-hidden="true" />
                </span>
                <span>{isAr ? "صنعاء، الجمهورية اليمنية" : "Sana'a, Yemen"}</span>
              </span>

              {/* Quote Request Form link */}
              <a
                href="#quote"
                className="flex items-center gap-3 transition-colors duration-300 hover:text-white"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/8 text-[#FF8A00]">
                  <Mail size={15} aria-hidden="true" />
                </span>
                <span>{isAr ? "طلب عرض السعر" : "Request a Quote"}</span>
              </a>

              {/* WhatsApp Button */}
              <div className="mt-3 w-full">
                <a
                  href={whatsappHref(company.whatsappNumber, directMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring flex min-h-11 items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-xs font-black text-white shadow-lg transition-all duration-300 hover:bg-emerald-500 hover:scale-[1.02] active:scale-[0.98] w-full"
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
