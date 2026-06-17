import {
  BatteryCharging,
  BriefcaseBusiness,
  Building2,
  CircleGauge,
  Cog,
  MapPin,
  PackageCheck,
  ShieldCheck,
  Truck,
  Wrench,
} from "lucide-react";
import type { Locale } from "@/lib/locales";

export const company = {
  establishedYear: 1986,
  whatsappNumber: "967777265744",
  logo: "/logo.png",
};

export const siteMeta: Record<
  Locale,
  { title: string; description: string; keywords: string[]; logoAlt: string }
> = {
  ar: {
    title: "الوصابي للتجارة | استيراد وتوزيع الإطارات والبطاريات والزيوت في اليمن",
    description:
      "الوصابي للتجارة شركة يمنية عريقة تأسست عام 1986، متخصصة في استيراد وتوزيع الإطارات، البطاريات، الزيوت، قطع غيار الدراجات والإكسسوارات عبر شبكة فروع في اليمن.",
    keywords: [
      "الوصابي للتجارة",
      "إطارات اليمن",
      "بطاريات اليمن",
      "زيوت سيارات اليمن",
      "قطع غيار دراجات نارية اليمن",
      "توزيع إطارات اليمن",
    ],
    logoAlt: "شعار الوصابي للتجارة",
  },
  en: {
    title: "Al-Wosabe for Trading | Tires, Batteries & Lubricants Distribution in Yemen",
    description:
      "Founded in 1986, Al-Wosabe for Trading supplies tires, batteries, lubricants, motorcycle spare parts, accessories, and tools through a branch and distribution network across Yemen.",
    keywords: [
      "Al-Wosabe for Trading",
      "tires Yemen",
      "batteries Yemen",
      "lubricants Yemen",
      "motorcycle spare parts Yemen",
      "distribution company Yemen",
    ],
    logoAlt: "Al-Wosabe for Trading logo",
  },
};

export const navigation = {
  ar: [
    ["الرئيسية", "home"],
    ["من نحن", "about"],
    ["المنتجات", "products"],
    ["العلامات التجارية", "brands"],
    ["شبكة التوزيع", "distribution"],
    ["الفروع", "branches"],
    ["تواصل معنا", "quote"],
  ],
  en: [
    ["Home", "home"],
    ["About", "about"],
    ["Products", "products"],
    ["Brands", "brands"],
    ["Distribution", "distribution"],
    ["Branches", "branches"],
    ["Contact", "quote"],
  ],
} satisfies Record<Locale, [string, string][]>;

export const content = {
  ar: {
    cta: "اطلب عرض سعر",
    language: "English",
    hero: {
      eyebrow: "شركة يمنية منذ 1986",
      title: "الوصابي للتجارة",
      subtitle: "شريك موثوق في التجارة والتوزيع منذ 1986",
      description:
        "نوفّر منتجات موثوقة في الإطارات، البطاريات، الزيوت، قطع غيار الدراجات، الإكسسوارات والأدوات، عبر شبكة فروع وتوزيع تغطي مدناً رئيسية في الجمهورية اليمنية.",
      primary: "اطلب عرض سعر",
      secondary: "استعرض المنتجات",
      badge: "Since 1986",
    },
    stats: {
      eyebrow: "ثقة مبنية على تشغيل حقيقي",
      title: "أرقام تختصر قوة الانتشار والخبرة",
      items: [
        ["1986", "سنة التأسيس"],
        ["years", "عاماً من الخبرة"],
        ["7+", "مدن وفروع رئيسية"],
        ["20+", "شاحنة توزيع"],
        ["اليمن", "تغطية واسعة"],
      ],
    },
    about: {
      eyebrow: "من نحن",
      title: "قصة تجارية بدأت من صنعاء وتوسعت في السوق اليمني",
      paragraphs: [
        "تأسست الوصابي للتجارة عام 1986، وبدأ نشاطها من سوق صنعاء قبل أن تتوسع تدريجياً في استيراد وتوزيع الإطارات، البطاريات، قطع غيار الدراجات النارية، الزيوت والمنتجات المرتبطة بها.",
        "اليوم أصبحت الشركة من الأسماء المعروفة في السوق اليمني، بفضل شبكة فروعها، فريقها المتخصص، وأسطول التوزيع الذي يدعم وصول المنتجات إلى العملاء والشركاء في مختلف المدن.",
      ],
      timeline: [
        ["1986", "بداية النشاط التجاري في صنعاء"],
        ["توسع", "تطوير شبكة فروع في مدن رئيسية"],
        ["اليوم", "أسطول توزيع ومنتجات متنوعة للسوق اليمني"],
      ],
    },
    products: {
      eyebrow: "مجالات النشاط",
      title: "منتجات تخدم قطاع المركبات والدراجات",
      description: "نغطي فئات رئيسية يحتاجها التجار والعملاء عبر شبكة توريد وتوزيع منظمة.",
    },
    brands: {
      eyebrow: "محفظة العلامات",
      title: "علامات تجارية نعمل معها",
      description:
        "نعمل مع مجموعة متنوعة من العلامات التجارية التي تخدم قطاعات الإطارات، البطاريات، الزيوت، قطع الغيار والمنتجات المكملة، بما يساعدنا على تلبية احتياجات شرائح مختلفة من السوق.",
    },
    distribution: {
      eyebrow: "شبكة التوزيع",
      title: "شبكة توزيع تغطي مدناً رئيسية في اليمن",
      description:
        "بفضل فروعنا في المدن الرئيسية وأسطول التوزيع الخاص بنا، نعمل على إيصال المنتجات بكفاءة إلى العملاء والشركاء في مختلف المناطق.",
      mapNote: "الخريطة خطية مبسطة لعرض شبكة الانتشار وليست مرجعاً جغرافياً دقيقاً.",
    },
    fleet: {
      eyebrow: "القدرة التشغيلية",
      title: "أسطول توزيع يدعم الوصول السريع",
      description:
        "تمتلك الوصابي للتجارة أكثر من 20 شاحنة لتوزيع المنتجات إلى مختلف المناطق داخل الجمهورية اليمنية، مما يعزز قدرتها على خدمة العملاء والشركاء بكفاءة.",
    },
    branches: {
      eyebrow: "الفروع والتواصل",
      title: "اختر المدينة وتواصل مباشرة",
      description: "كل رقم قابل للضغط للاتصال مباشرة، مع عرض منظم يمنع ازدحام الأرقام على الموبايل.",
      call: "اتصال",
    },
    values: {
      eyebrow: "القيم والخبرة",
      title: "عمل منظم، توريد موثوق، وتواصل واضح",
      items: [
        ["الثقة", "التعامل بوضوح وتقديم معلومات مهنية دون ادعاءات غير مثبتة."],
        ["الانتشار", "فروع في مدن رئيسية تدعم الوصول إلى شرائح مختلفة من العملاء."],
        ["الكفاءة", "أسطول توزيع وفريق عمل يساعدان على خدمة الطلبات بسرعة وتنظيم."],
      ],
    },
    team: {
      eyebrow: "الفريق والخبرة",
      title: "فريق يعرف السوق واحتياجات العملاء",
      description:
        "يجمع فريق الوصابي للتجارة بين خبرة السوق المحلي، معرفة المنتجات، والتعامل اليومي مع التجار والعملاء في قطاعات المركبات والدراجات.",
    },
    quote: {
      eyebrow: "طلب عرض سعر",
      title: "أرسل احتياجك وسنجهّز رسالة واتساب مباشرة",
      description: "املأ البيانات الأساسية، وسيفتح واتساب برسالة منظمة إلى فريق الوصابي للتجارة.",
      name: "الاسم الكامل",
      business: "اسم الشركة/المحل",
      phone: "رقم الهاتف",
      city: "المدينة",
      product: "نوع المنتج المطلوب",
      quantity: "الكمية المتوقعة",
      message: "تفاصيل إضافية",
      submit: "إرسال عبر واتساب",
    },
    footer: {
      description:
        "شركة يمنية عريقة في الاستيراد والتوزيع، تأسست منذ عام 1986، وتوفر منتجات موثوقة لقطاع المركبات والدراجات.",
      rights: "جميع الحقوق محفوظة.",
    },
  },
  en: {
    cta: "Request a Quote",
    language: "العربية",
    hero: {
      eyebrow: "A Yemeni company since 1986",
      title: "Al-Wosabe for Trading",
      subtitle: "A Trusted Trading & Distribution Partner Since 1986",
      description:
        "We supply reliable tires, batteries, lubricants, motorcycle spare parts, accessories, and tools through a strong branch and distribution network across Yemen.",
      primary: "Request a Quote",
      secondary: "Explore Products",
      badge: "Since 1986",
    },
    stats: {
      eyebrow: "Trust built on real operations",
      title: "Numbers that reflect reach and experience",
      items: [
        ["1986", "Established"],
        ["years", "Years of Experience"],
        ["7+", "Main Cities & Branches"],
        ["20+", "Distribution Trucks"],
        ["Yemen", "Nationwide Reach"],
      ],
    },
    about: {
      eyebrow: "About",
      title: "A trading story that began in Sana'a and grew across Yemen",
      paragraphs: [
        "Founded in 1986, Al-Wosabe for Trading began its operations in Sana'a market and gradually expanded through the import and distribution of tires, batteries, motorcycle spare parts, lubricants, and related products.",
        "Today, the company is recognized in Yemen's market through its branch network, experienced team, and distribution fleet that helps deliver products efficiently to customers and business partners across major cities.",
      ],
      timeline: [
        ["1986", "Operations started in Sana'a"],
        ["Growth", "Branch network across key cities"],
        ["Today", "Distribution fleet and diverse product categories"],
      ],
    },
    products: {
      eyebrow: "Product Categories",
      title: "Products for vehicles and motorcycles",
      description: "We cover core categories needed by traders and customers through an organized supply and distribution network.",
    },
    brands: {
      eyebrow: "Brand Portfolio",
      title: "Brands We Work With",
      description:
        "We work with a diverse portfolio of brands serving tires, batteries, lubricants, spare parts, and related product categories, helping us meet different market needs.",
    },
    distribution: {
      eyebrow: "Distribution Network",
      title: "A distribution network across major Yemeni cities",
      description:
        "Through our branches in key cities and our dedicated distribution fleet, we deliver products efficiently to customers and partners across multiple regions.",
      mapNote: "This line-art map is simplified for network storytelling, not precise geographic reference.",
    },
    fleet: {
      eyebrow: "Operational Capacity",
      title: "A distribution fleet built for reach",
      description:
        "Al-Wosabe for Trading operates more than 20 distribution trucks, supporting efficient delivery of products to customers and partners across Yemen.",
    },
    branches: {
      eyebrow: "Branches & Contact",
      title: "Choose a city and contact directly",
      description: "Every phone number is tappable, with a clean layout that avoids clutter on mobile.",
      call: "Call",
    },
    values: {
      eyebrow: "Values & Expertise",
      title: "Organized work, reliable supply, clear communication",
      items: [
        ["Trust", "Clear business communication without unsupported claims."],
        ["Reach", "Branches in key cities help serve different customer segments."],
        ["Efficiency", "A distribution fleet and experienced team support organized service."],
      ],
    },
    team: {
      eyebrow: "Team & Expertise",
      title: "A team that understands the market and customer needs",
      description:
        "Al-Wosabe's team combines local market experience, product knowledge, and day-to-day work with traders and customers in vehicle and motorcycle sectors.",
    },
    quote: {
      eyebrow: "Request a Quote",
      title: "Share your needs through a ready WhatsApp message",
      description: "Fill in the essentials and WhatsApp will open with a structured message to Al-Wosabe's team.",
      name: "Full name",
      business: "Company / shop name",
      phone: "Phone number",
      city: "City",
      product: "Requested product type",
      quantity: "Expected quantity",
      message: "Additional details",
      submit: "Send via WhatsApp",
    },
    footer: {
      description:
        "A long-established Yemeni trading company founded in 1986, supplying reliable products for vehicles and motorcycles.",
      rights: "All rights reserved.",
    },
  },
} satisfies Record<Locale, Record<string, unknown>>;

export const products = {
  ar: [
    {
      title: "الإطارات",
      description: "مجموعة متنوعة من الإطارات المناسبة للاستخدام التجاري والشخصي، من علامات تلبي احتياجات السوق المحلي.",
      image: "/images/products/tires.webp",
      icon: CircleGauge,
    },
    {
      title: "البطاريات",
      description: "بطاريات موثوقة لمختلف الاستخدامات، مع تركيز على الجودة والاستمرارية والقيمة المناسبة.",
      image: "/images/products/batteries.webp",
      icon: BatteryCharging,
    },
    {
      title: "الزيوت ومواد التشحيم",
      description: "زيوت ومواد تشحيم تساعد على تحسين الأداء والحفاظ على كفاءة المركبات والمعدات.",
      image: "/images/products/lubricants.webp",
      icon: Cog,
    },
    {
      title: "قطع غيار الدراجات النارية",
      description: "توريد قطع غيار للدراجات النارية بما يلبي احتياجات التجار والعملاء في السوق.",
      image: "/images/products/motorcycle-parts.webp",
      icon: Wrench,
    },
    {
      title: "الإكسسوارات",
      description: "تشكيلة من الإكسسوارات والمنتجات المكملة لقطاع المركبات والدراجات.",
      image: "/images/products/accessories.webp",
      icon: PackageCheck,
    },
    {
      title: "الأدوات",
      description: "أدوات ومنتجات مساعدة تدعم احتياجات الورش والعملاء التجاريين.",
      image: "/images/products/tools.webp",
      icon: BriefcaseBusiness,
    },
  ],
  en: [
    {
      title: "Tires",
      description: "A diverse tire range for commercial and personal use, from brands that serve local market needs.",
      image: "/images/products/tires.webp",
      icon: CircleGauge,
    },
    {
      title: "Batteries",
      description: "Reliable batteries for different applications, focused on quality, continuity, and suitable value.",
      image: "/images/products/batteries.webp",
      icon: BatteryCharging,
    },
    {
      title: "Lubricants",
      description: "Oils and lubricants that support performance and help maintain vehicle and equipment efficiency.",
      image: "/images/products/lubricants.webp",
      icon: Cog,
    },
    {
      title: "Motorcycle Spare Parts",
      description: "Supplying motorcycle spare parts for traders and customers across the market.",
      image: "/images/products/motorcycle-parts.webp",
      icon: Wrench,
    },
    {
      title: "Accessories",
      description: "A selection of accessories and complementary products for vehicles and motorcycles.",
      image: "/images/products/accessories.webp",
      icon: PackageCheck,
    },
    {
      title: "Tools",
      description: "Tools and support products for workshops and commercial customers.",
      image: "/images/products/tools.webp",
      icon: BriefcaseBusiness,
    },
  ],
} satisfies Record<
  Locale,
  { title: string; description: string; image: string; icon: typeof CircleGauge }[]
>;

export const branches = [
  { city: { ar: "صنعاء", en: "Sana'a" }, phones: ["00967 1 374552", "00967 1 374550", "00967 1 474400", "00967 1 474401", "00967 1 474402", "00967 1 474403", "00967 1 621452", "00967 1 621453", "00967 1 325777", "00967 1 324777"], x: 48, y: 33 },
  { city: { ar: "الحديدة", en: "Hodeidah" }, phones: ["00967 3 238823", "00967 3 211077", "00967 3 211076", "00967 3 265344", "00967 3 265244", "00967 3 265944"], x: 34, y: 44 },
  { city: { ar: "باجل", en: "Bajel" }, phones: ["00967 3 500853"], x: 38, y: 39 },
  { city: { ar: "زبيد", en: "Zabid" }, phones: ["00967 3 340955"], x: 37, y: 54 },
  { city: { ar: "المكلا", en: "Mukalla" }, phones: ["00967 777265744"], x: 78, y: 62 },
  { city: { ar: "عدن", en: "Aden" }, phones: ["00967 777580006", "00967 2 308611", "00967 2 308612"], x: 54, y: 78 },
  { city: { ar: "تعز", en: "Taiz" }, phones: ["00967 777215023"], x: 42, y: 66 },
];

export const brands = [
  {
    name: "Gulf",
    logo: "/images/brands/Gulf_logo.png",
    category: "Lubricants",
  },
  {
    name: "Westlake",
    logo: "/images/brands/Westlake-Tires-logo.png",
    category: "Tires",
  },
  {
    name: "Goodride",
    logo: "/images/brands/goodride.svg",
    category: "Tires",
  },
  {
    name: "Trazano",
    logo: "/images/brands/trazano.png",
    category: "Tires",
  },
  {
    name: "Golden Crown",
    logo: "/images/brands/golden-crown.png",
    category: "Tires",
  },
  {
    name: "Chaoyang",
    logo: "/images/brands/chaoyang.png",
    category: "Tires",
  },
  {
    name: "Rongxing",
    logo: "/images/brands/Rongxing.png",
    category: "Motorcycle Parts",
  },
  {
    name: "AlMaijd",
    logo: "/images/brands/AlMaijd.png",
    category: "Motorcycle Parts",
  },
  {
    name: "BT Sporty",
    logo: "/images/brands/BT-sporty.png",
    category: "Motorcycle Parts",
  },
  {
    name: "Metro",
    logo: "/images/brands/metro.png",
    category: "Motorcycle Parts",
  },
  {
    name: "Thunder Lite",
    logo: "/images/brands/thunder-lite.png",
    category: "Motorcycle Parts",
  },
  {
    name: "RX Sporty",
    logo: "/images/brands/rx-sporty.png",
    category: "Motorcycle Parts",
  },
  {
    name: "Tochka",
    logo: "/images/brands/tochka.png",
    category: "Motorcycle Parts",
  },
];

export const valueIcons = [ShieldCheck, MapPin, Truck];

export const structuredOrganization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Al-Wosabe for Trading",
  alternateName: "الوصابي للتجارة",
  foundingDate: "1986",
  areaServed: "Yemen",
  logo: "/logo.png",
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+967777265744",
    contactType: "sales",
    areaServed: "YE",
  },
};
