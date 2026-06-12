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
    <footer id="contact" className="bg-[#141416] py-14 text-white">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Image src={company.logo} alt={locale === "ar" ? "شعار الوصابي للتجارة" : "Al-Wosabe for Trading logo"} width={310} height={81} className="h-14 w-auto object-contain" />
            <p className="mt-6 max-w-xl text-sm leading-7 text-white/65">{labels.footer.description}</p>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-black">{locale === "ar" ? "روابط سريعة" : "Quick Links"}</h3>
            <div className="grid gap-2 text-sm text-white/65">
              {navigation[locale].map(([label, id]) => (
                <a key={id} href={`#${id}`} className="hover:text-[#FFC247]">
                  {label}
                </a>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-black">{locale === "ar" ? "تواصل" : "Contact"}</h3>
            <div className="grid gap-3 text-sm text-white/65">
              <a href={phoneHref(branches[4].phones[0])} className="flex items-center gap-3 hover:text-[#FFC247]">
                <Phone size={17} aria-hidden="true" />
                <span dir="ltr">{branches[4].phones[0]}</span>
              </a>
              <span className="flex items-center gap-3">
                <MapPin size={17} aria-hidden="true" />
                {locale === "ar" ? "فروع في مدن رئيسية داخل اليمن" : "Branches across key Yemeni cities"}
              </span>
              <span className="flex items-center gap-3">
                <Mail size={17} aria-hidden="true" />
                {locale === "ar" ? "نموذج الطلب عبر واتساب" : "Quote requests via WhatsApp"}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/45">
          © {year} Al-Wosabe for Trading. {labels.footer.rights}
        </div>
      </Container>
    </footer>
  );
}
