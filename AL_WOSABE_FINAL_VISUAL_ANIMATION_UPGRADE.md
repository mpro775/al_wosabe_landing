# AL_WOSABE_FINAL_VISUAL_ANIMATION_UPGRADE.md

## مهمة التنفيذ الكاملة
هذا الملف مخصص لوكيل ذكاء اصطناعي أو مطور Frontend لتنفيذ التحسينات النهائية على مشروع **Al-Wosabe for Trading Landing Page** بعد إضافة الصور والأصول البصرية.

المطلوب ليس تنفيذ أجزاء اختيارية، بل تنفيذ كل البنود المذكورة هنا بالكامل داخل المشروع، ثم التأكد من نجاح:

```bash
npm run lint
npm run build
```

الهدف النهائي: تحويل الموقع من Landing Page جيدة إلى موقع شركة تجارية/توزيع احترافي جدًا، بصري، متحرك، سريع، متوافق، ويعطي انطباع شركة قوية منذ 1986.

---

## 1. قواعد عامة إلزامية

### 1.1 لا تغيّر هوية الشركة الأساسية
اعتمد الهوية التالية:

- Dark charcoal backgrounds
- Orange/gold accents
- Premium industrial corporate style
- Trading and distribution visual language
- Tire-track patterns
- Route/distribution line motion
- Clean B2B layout
- Arabic RTL + English LTR

### 1.2 لا تستخدم ادعاءات غير مؤكدة
تجنب عبارات مثل:

- وكيل حصري
- Authorized Dealer
- Official Distributor
- Smart inventory system
- Nationwide coverage لكل المدن والمحافظات إذا لم يكن مثبتًا

استخدم عبارات آمنة مثل:

- علامات تجارية نعمل معها
- شبكة فروع وتوزيع منظمة
- نخدم المدن الرئيسية ونطاقًا واسعًا من السوق اليمني
- إدارة منظمة للمخزون

### 1.3 الصور التعبيرية
إذا كانت الصور مولدة بالذكاء الاصطناعي وليست حقيقية من العميل، لا تكتب في alt أو النصوص أنها صور حقيقية لفريق أو شاحنات الشركة.

استخدم:

```text
صورة تعبيرية لفريق عمليات وتوزيع
صورة تعبيرية لأسطول توزيع
صورة تعبيرية لمستودعات ومنتجات
```

بالإنجليزية:

```text
Illustrative image of operations and distribution team
Illustrative image of distribution fleet
Illustrative image of warehouse and product storage
```

---

## 2. إصلاحات الكود الإلزامية

## 2.1 إصلاح lint في BranchCard.tsx

يوجد خطأ lint بسبب `setState` داخل `useEffect` لاكتشاف الموبايل.

المطلوب:

- إزالة الاعتماد على `window.matchMedia` داخل `BranchCard`.
- اجعل سلوك عرض الأرقام Responsive عبر CSS وState بسيط للفتح/الإغلاق فقط.
- لا تستخدم `setIsMobile` داخل `useEffect`.

السلوك المطلوب:

### Desktop
- عرض أول 3 أرقام مباشرة.
- إذا يوجد أكثر من 3 أرقام، يظهر زر:
  - عربي: `عرض كل الأرقام`
  - إنجليزي: `Show all numbers`

### Mobile
- الكرت يظهر مغلقًا مع نص:
  - عربي: `اضغط لعرض أرقام الفرع`
  - إنجليزي: `Tap to view branch numbers`
- عند الضغط، تظهر الأرقام.
- زر إغلاق:
  - عربي: `إخفاء الأرقام`
  - إنجليزي: `Hide numbers`

### Labels
لا تجعل كلمة `أرقام` ثابتة بالعربي داخل النسخة الإنجليزية.

استخدم labels من content أو props:

```ts
phoneLabelSingular: "رقم" | "number"
phoneLabelPlural: "أرقام" | "numbers"
showAllLabel: "عرض كل الأرقام" | "Show all numbers"
hideLabel: "إخفاء الأرقام" | "Hide numbers"
tapToViewLabel: "اضغط لعرض أرقام الفرع" | "Tap to view branch numbers"
```

---

## 2.2 تقليل أوزان خط Alexandria

إذا كان المشروع يحمل جميع الأوزان من 100 إلى 900، قللها إلى الأوزان المستخدمة فقط:

```ts
weight: ["400", "500", "700", "800", "900"]
```

أو إذا أمكن:

```ts
weight: ["400", "700", "800"]
```

لا تحمل أوزان غير مستخدمة.

---

## 2.3 تصغير الشعار المستخدم في الهيدر

الشعار الكبير لا يستخدم مباشرة في الهيدر.

أنشئ نسخ محسّنة:

```text
public/images/logo/logo-header.webp
public/images/logo/logo-footer.webp
```

المقاسات المقترحة:

```text
logo-header.webp: 360x100 تقريبًا، أقل من 50KB
logo-footer.webp: 420x120 تقريبًا، أقل من 70KB
```

إذا لم تكن أدوات التحويل متاحة داخل المشروع، استخدم نفس الصورة مؤقتًا لكن اضبط `sizes` و `width/height` ولا تجعلها تحمل بحجم ضخم.

---

## 2.4 ضغط ملفات SVG

الملفات التالية ثقيلة ويجب ضغطها:

```text
public/images/graphics/yemen-map.svg
public/images/graphics/tire-track.svg
public/images/graphics/route-lines.svg
```

نفّذ ضغط عبر SVGO أو أي أداة متاحة.

المطلوب:

- حذف metadata غير الضرورية.
- تقليل الدقة الزائدة للمسارات.
- حذف العناصر المخفية وغير المستخدمة.
- الحفاظ على المظهر البصري.
- إذا كان `tire-track.svg` يستخدم كخلفية فقط، اجعله مبسطًا جدًا أو حوّله إلى WebP خفيف إن كان أفضل للأداء.

---

## 2.5 تعديل صورة OpenGraph

إن كان `og-image.png` بحجم غير مناسب، أنشئ نسخة:

```text
public/og-image.png
```

بمقاس:

```text
1200x630
```

يفضل أن تحتوي:
- خلفية داكنة
- شعار الوصابي
- عبارة `Since 1986`
- صورة شاحنات أو مستودع
- لمسة برتقالية

ثم حدّث metadata بحيث تشير للصورة الصحيحة.

---

# 3. تحسين Hero Section

## 3.1 الهدف
أول شاشة يجب أن تعطي إحساس:

- شركة توزيع حقيقية
- قوية وموثوقة
- عريقة منذ 1986
- لها منتجات وفروع وأساطيل

## 3.2 التصميم المطلوب

عدّل Hero ليصبح:

- خلفية داكنة فخمة.
- صورة `hero-trucks.webp` هي العنصر البصري الرئيسي.
- `hero-warehouse.webp` صورة ثانوية فقط على الديسكتوب.
- إخفاء أو تقليل الصورة الثانوية في الموبايل إذا سببت زحامًا.
- استخدام `tire-track.svg` كخلفية خفيفة جدًا بنسبة شفافية منخفضة.
- استخدام `route-lines.svg` كطبقة Motion خفيفة.
- إضافة diagonal orange band مائل خلف الصورة أو بين النص والصورة مستوحى من الكتالوج.
- الشعار يظهر داخل Badge صغير، وليس كبطل الشاشة.

## 3.3 النصوص والألوان

- العنوان الرئيسي يكون أبيض/شبه أبيض.
- لا تجعل العنوان كله gradient.
- استخدم البرتقالي فقط لكلمات محددة مثل:
  - منذ 1986
  - Since 1986
  - التجارة والتوزيع
  - Trading & Distribution

## 3.4 أنميشن Hero

نفّذ:

- Split text reveal للعنوان كلمة بكلمة.
- Fade-up للفقرة.
- CTA buttons تظهر بتتابع.
- الصورة الرئيسية تدخل scale + fade.
- كروت الإحصائيات تظهر stagger.
- خط diagonal orange يدخل من الجهة المناسبة حسب اللغة:
  - RTL: من اليمين
  - LTR: من اليسار
- route-lines تتحرك ببطء شديد كخلفية.

## 3.5 التوافق على الموبايل

في الموبايل:

- النص أولًا.
- الصورة بعد النص.
- لا تجعل القسم طويل جدًا.
- استخدم:

```css
min-height: 760px on mobile;
min-height: 100vh on desktop;
```

- أزرار CTA تكون واضحة وكبيرة.
- أخفِ الصورة الثانوية أو اجعلها تحت الصورة الرئيسية.

---

# 4. تحسين Product Cards

## 4.1 الهدف
الكروت يجب أن تبدو ككروت منتجات تجارية فاخرة وليست مجرد Cards عامة.

## 4.2 التعديل المطلوب
عدّل `ProductCategoryCard` ليحتوي:

- صورة المنتج من:
  - `/images/products/tires.webp`
  - `/images/products/batteries.webp`
  - `/images/products/lubricants.webp`
  - `/images/products/motorcycle-parts.webp`
  - `/images/products/accessories.webp`
  - `/images/products/tools.webp`
- Overlay gradient داكن أسفل الصورة.
- عنوان المنتج يظهر جزئيًا فوق الصورة أو ملاصق لها.
- الوصف أسفل الصورة.
- أيقونة صغيرة في Corner Badge.
- خط برتقالي أسفل الكرت أو داخل الصورة.
- Hover state احترافي.

## 4.3 Hover المطلوب

عند Hover:

```text
image scale: 1.06
card translateY: -6px
orange accent line width: 100%
icon slight rotate: 4deg
shadow: soft orange glow
```

لا تستخدم bounce ولا حركات طفولية.

## 4.4 Animation on scroll

- الكروت تظهر stagger.
- كل كرت delay مختلف بسيط.
- استخدم Motion for React أو Framer Motion الموجود في المشروع.

---

# 5. تحسين Brands Section

## 5.1 إزالة نص placeholders
إذا كانت هناك جملة تقول إن الشعارات جاهزة للاستبدال، احذفها واستبدلها بالنص التالي:

### عربي
```text
نعرض مجموعة من العلامات التجارية التي نعمل معها ضمن قطاعات الإطارات، الزيوت، البطاريات وقطع الغيار، دون ادعاء وكالة حصرية إلا عند وجود تأكيد رسمي.
```

### English
```text
A selected portfolio of brands we work with across tires, lubricants, batteries, and spare parts, without claiming exclusivity unless officially confirmed.
```

## 5.2 تصميم عرض الشعارات

نفّذ مكون:

```text
src/components/ui/BrandMarquee.tsx
```

أو طوّر المكون الحالي.

المطلوب:

### Desktop
- صف Marquee بطيء جدًا للشعارات.
- يمكن إضافة Grid ثابت أسفل أو بدلًا من الماركيه.
- عند Hover على الماركيه يتوقف.
- الشعارات Grayscale في الوضع العادي وتصبح Color عند Hover.

### Mobile
- استخدم Horizontal scroll snap بدل Grid طويل.
- كل Logo داخل كرت أبيض نظيف.
- حجم موحد باستخدام `object-contain`.

## 5.3 لا تكتب ادعاءات
لا تكتب:
- Exclusive
- Official
- Authorized

إلا إذا كان موجودًا رسميًا في بيانات العميل.

---

# 6. تحسين Distribution Network / Map

## 6.1 الهدف
هذا القسم يجب أن يصبح واحدًا من أقوى الأقسام بصريًا في الصفحة.

## 6.2 أنشئ مكون مستقل

أنشئ:

```text
src/components/ui/AnimatedRouteMap.tsx
```

أو انقل منطق الخريطة إلى مكون مستقل.

## 6.3 المطلوب بصريًا

- استخدم `yemen-map.svg` كخريطة رئيسية.
- استخدم `route-lines.svg` كطبقة فوق أو خلف الخريطة.
- أضف نقاط فروع للمدن:
  - صنعاء / Sana’a
  - الحديدة / Hodeidah
  - المكلا / Mukalla
  - باجل / Bajel
  - زبيد / Zabid
  - عدن / Aden
  - تعز / Taiz

## 6.4 تفاعل الخريطة

- نقاط المدن تعمل Pulse ناعم.
- عند Hover أو Focus:
  - النقطة تضيء.
  - يظهر Tooltip أو Card صغير يحتوي:
    - اسم المدينة
    - عدد أرقام التواصل
    - زر اتصال لأول رقم متوفر
- عند Hover على مدينة من قائمة الفروع، تضيء النقطة المقابلة في الخريطة.

## 6.5 أنميشن الخريطة

نفّذ:

- Route lines draw animation عند ظهور القسم.
- Branch dots تظهر stagger.
- Truck icon صغيرة تتحرك على مسار بسيط بين المدن.
- إذا كان تنفيذ truck path صعبًا، استخدم نقطة مضيئة تتحرك على path بدل الشاحنة.

## 6.6 الموبايل

على الموبايل:

- الخريطة لا تكون ضخمة جدًا.
- اجعلها قابلة للقراءة.
- Tooltips يمكن أن تتحول إلى selected city card أسفل الخريطة.
- لا تجعل hover هو الطريقة الوحيدة؛ استخدم click/tap.

---

# 7. تحسين Fleet Section

## 7.1 الهدف
تحويل رقم 20+ من معلومة إلى إثبات بصري قوي.

## 7.2 التصميم المطلوب

استخدم:

```text
/images/operations/fleet.webp
```

التخطيط:

- صورة كبيرة Cinematic.
- Overlay داكن.
- Badge كبير `20+`.
- نص:
  - عربي: `شاحنة توزيع`
  - English: `Distribution Trucks`
- route line أو tire-track خفيف.
- CTA صغير:
  - عربي: `تواصل مع أقرب فرع`
  - English: `Contact nearest branch`

## 7.3 الحركة

- الرقم 20+ يعمل Count-up.
- الصورة Parallax خفيف عند التمرير.
- route line يتحرك ببطء.
- Badge يدخل من جانب الصورة.

---

# 8. تحسين Operations / Warehouse Section

## 8.1 استخدام warehouse image

استخدم:

```text
/images/operations/warehouse.webp
```

داخل About أو Operations.

## 8.2 النصوص الآمنة

استبدل أي عبارات قوية غير مؤكدة:

بدل:
```text
إدارة ذكية للمخزون
Smart Inventory Management
```

استخدم:
```text
إدارة منظمة للمخزون
Organized Inventory Management
```

بدل:
```text
مستودعات بمواصفات عالية
```

استخدم:
```text
مستودعات منظمة وجاهزية توريد
Organized Warehousing & Supply Readiness
```

## 8.3 الشكل

- الصورة داخل كرت كبير بحدود rounded.
- Overlay خفيف.
- كروت صغيرة فوق الصورة:
  - Since 1986
  - Organized Storage
  - Supply Readiness
- أنميشن fade + parallax.

---

# 9. تحسين Team Section

## 9.1 استخدام team image

استخدم:

```text
/images/operations/team.webp
```

## 9.2 لا تدّعي أنها صورة الفريق الحقيقي إن لم تكن كذلك

استخدم alt:

### عربي
```text
صورة تعبيرية لفريق عمليات وتوزيع
```

### English
```text
Illustrative image of operations and distribution team
```

## 9.3 التصميم

- صورة الفريق في كرت كبير.
- بجانبها نص الفريق.
- أسفل النص 3 نقاط قوة:
  - خبرة السوق
  - تنسيق العمليات
  - خدمة العملاء

بالإنجليزية:
- Market Experience
- Operations Coordination
- Customer Service

## 9.4 الحركة

- الصورة تظهر parallax بسيط.
- نقاط القوة تظهر stagger.
- Hover للكروت بسيط.

---

# 10. تحسين Quote Form

## 10.1 نوع المنتج Select

بدل حقل المنتج النصي، استخدم Select.

### عربي
```text
الإطارات
البطاريات
الزيوت ومواد التشحيم
قطع غيار الدراجات النارية
الإكسسوارات
الأدوات
```

### English
```text
Tires
Batteries
Lubricants
Motorcycle Spare Parts
Accessories
Tools
```

## 10.2 المدينة Select

### عربي
```text
صنعاء
الحديدة
المكلا
باجل
زبيد
عدن
تعز
```

### English
```text
Sana’a
Hodeidah
Mukalla
Bajel
Zabid
Aden
Taiz
```

## 10.3 Validation

- الاسم مطلوب.
- الهاتف مطلوب.
- المدينة مطلوبة.
- نوع المنتج مطلوب.
- الرسالة اختيارية.
- أظهر خطأ واضح أسفل الحقل.
- لا تفتح واتساب إذا البيانات الأساسية ناقصة.

## 10.4 تجربة الإرسال

عند نجاح التحقق:

- أظهر Toast أو رسالة صغيرة:
  - عربي: `تم تجهيز رسالة واتساب، سيتم تحويلك الآن.`
  - English: `WhatsApp message is ready. Redirecting now.`
- ثم افتح واتساب.

## 10.5 الزر

أضف shimmer خفيف للزر الرئيسي، بدون مبالغة.

---

# 11. تحسين Footer

## 11.1 التصميم

- استخدم خلفية داكنة.
- استخدم `logo-white` أو نسخة بيضاء مناسبة.
- أضف `tire-track.svg` خفيف جدًا.
- أضف `route-lines.svg` كعنصر بسيط.
- أضف Since 1986 badge.

## 11.2 المحتوى

الفوتر يحتوي:

- الشعار
- نبذة قصيرة
- روابط سريعة
- المنتجات
- الفروع
- تواصل
- زر واتساب
- حقوق النشر

## 11.3 الأداء

لا تستخدم الشعار الكبير جدًا إذا كان موجودًا. استخدم النسخة المصغرة.

---

# 12. Preloader / Loading / Intro Experience

## 12.1 أنشئ Preloader

أنشئ:

```text
src/components/layout/Preloader.tsx
```

## 12.2 شكل اللودنج

الخلفية:

```css
#111113
```

العناصر:

1. شعار الوصابي في المنتصف.
2. Mask reveal للشعار.
3. خط برتقالي يتحرك كأنه route.
4. عبارة:
   - عربي: `الوصابي للتجارة`
   - English: `Al-Wosabe for Trading`
5. Badge:
   - `Since 1986`
6. مؤشر تحميل بسيط:
   - progress line برتقالي
   - أو نقاط مضيئة متحركة

## 12.3 مدة اللودنج

```text
900ms إلى 1400ms
```

لا تجعل اللودنج طويلًا.

## 12.4 يظهر مرة واحدة فقط

استخدم:

```ts
sessionStorage.setItem("alw-preloader-seen", "true")
```

إذا شاهده المستخدم في نفس الجلسة، لا يظهر مرة أخرى.

## 12.5 احترام reduced motion

إذا كان المستخدم يفضّل تقليل الحركة:

```css
prefers-reduced-motion
```

- لا تشغل mask animation معقد.
- اعرض الشعار مباشرة.
- اختصر مدة اللودنج.

## 12.6 مكان التركيب

ركّب Preloader في:

```text
src/app/[locale]/layout.tsx
```

أو داخل `LandingPage.tsx` بحيث يغطي الصفحة قبل ظهور المحتوى.

---

## 12.7 إضافة loading.tsx

أنشئ:

```text
src/app/[locale]/loading.tsx
```

يحتوي Loading بسيط بنفس الهوية:

- خلفية داكنة
- شعار صغير
- خط برتقالي متحرك

---

# 13. Intro Motion بعد اختفاء Preloader

بعد انتهاء اللودنج:

1. يظهر شعار صغير أو Badge `Since 1986`.
2. يظهر عنوان Hero كلمة بكلمة.
3. تظهر الفقرة.
4. تظهر CTA buttons.
5. تظهر صورة Hero.
6. تظهر Stats cards.

هذا هو Onboarding المطلوب. لا تستخدم Popups أو جولات طويلة.

---

# 14. مكونات Motion جديدة

أنشئ أو طوّر المكونات التالية:

```text
src/components/ui/SplitTextReveal.tsx
src/components/ui/ParallaxImage.tsx
src/components/ui/ScrollProgress.tsx
src/components/ui/BrandMarquee.tsx
src/components/ui/AnimatedRouteMap.tsx
src/components/layout/Preloader.tsx
src/components/layout/PageTransition.tsx
```

## 14.1 SplitTextReveal.tsx
يستخدم في:
- Hero title
- بعض Section headings

المطلوب:
- يقسم النص إلى كلمات.
- يظهر الكلمات stagger.
- يدعم RTL/LTR.
- يحترم reduced motion.

## 14.2 ParallaxImage.tsx
يستخدم في:
- Hero
- Fleet
- Warehouse
- Team

المطلوب:
- حركة y خفيفة أثناء التمرير.
- scale بسيط.
- لا يعمل في reduced motion.

## 14.3 ScrollProgress.tsx
- خط برتقالي رفيع أعلى الصفحة.
- يظهر تقدم التمرير.
- مناسب للهوية.

## 14.4 PageTransition.tsx
- انتقال ناعم عند تغيير اللغة أو تحميل الصفحة.
- لا يطيل التجربة.
- يحترم reduced motion.

---

# 15. نظام الأنميشن العام

استخدم Motion for React / Framer Motion الموجود في المشروع.

## 15.1 قواعد الحركة

- لا تستخدم bounce.
- لا تستخدم حركات سريعة مزعجة.
- مدة الحركة:
  - 0.5s إلى 1.2s
- easing:
  - easeOut
  - cubic-bezier ناعم
- stagger بسيط:
  - 0.06s إلى 0.12s

## 15.2 Hero
- Split text
- CTA fade-up
- image parallax
- diagonal line slide
- stats stagger

## 15.3 Stats
- Count-up
- Card stagger
- hover glow

## 15.4 About Timeline
- timeline line draw
- year dots glow
- content fade

## 15.5 Products
- stagger cards
- image zoom hover
- accent line expand

## 15.6 Brands
- slow marquee
- pause on hover
- grayscale to color

## 15.7 Distribution
- route line draw
- dots pulse
- truck/dot motion along path

## 15.8 Quote
- form and content slide from opposite directions
- button shimmer

---

# 16. تحسين Responsive كامل

## 16.1 Header
- اجعل Nav يظهر من `xl` فما فوق.
- من أقل من `xl` استخدم Mobile Menu.
- قلل ارتفاع الشعار على الديسكتوب:
  - `h-10` أو `h-11`
- تأكد أن زر اللغة واضح.
- لا يحدث تداخل بين الروابط والـ CTA.

## 16.2 Hero Mobile
- النص أولًا.
- الصورة ثانيًا.
- أخفِ secondary warehouse card أو اجعله أسفل الصورة.
- لا تستخدم ارتفاع زائد جدًا.
- CTA buttons بعرض مناسب.

## 16.3 Product Cards Mobile
- كرت واحد في الصف.
- الصورة لا تقص العنصر الأساسي.
- النص مقروء.

## 16.4 Brands Mobile
- استخدم horizontal scroll snap.
- لا تجعل Grid طويل جدًا.
- الكروت بحجم متناسق.

## 16.5 Map Mobile
- اجعل الخريطة داخل كرت قابل للقراءة.
- استخدم tap بدل hover.
- selected city card أسفل الخريطة.

## 16.6 Branches Mobile
- Accordion واضح.
- أضف نص `اضغط لعرض أرقام الفرع`.
- أرقام الاتصال كبيرة وسهلة الضغط.

## 16.7 Quote Form Mobile
- الحقول full width.
- زر الإرسال واضح.
- لا تجعل الفورم مزدحمًا.

---

# 17. Floating WhatsApp Button

أضف زر واتساب عائم:

```text
src/components/ui/FloatingWhatsAppButton.tsx
```

## السلوك
- يظهر بعد scroll 400px.
- لا يغطي محتوى مهم.
- يدعم RTL/LTR.
- على الديسكتوب يظهر نص:
  - عربي: `تواصل واتساب`
  - English: `WhatsApp`
- على الموبايل أيقونة فقط أو نص قصير.
- يفتح واتساب برسالة عامة.

## الحركة
- fade/scale in.
- hover glow أخضر خفيف أو برتقالي حسب الهوية.
- لا يكون مزعجًا.

---

# 18. Back to Top / Scroll UX

أضف زر صغير للعودة للأعلى أو دمجه مع Floating actions.

السلوك:

- يظهر بعد 700px scroll.
- smooth scroll to top.
- لا يغطي زر واتساب.

---

# 19. تحسين النصوص والمحتوى

استبدل العبارات التالية إن وجدت:

## بدل:
```text
نصل إلى كافة المدن والمحافظات الرئيسية
```

## استخدم:
```text
نخدم المدن الرئيسية ونطاقًا واسعًا من السوق اليمني عبر شبكة فروع وتوزيع منظمة.
```

## بدل:
```text
إدارة ذكية للمخزون
```

## استخدم:
```text
إدارة منظمة للمخزون
```

## بدل:
```text
Smart Inventory Management
```

## استخدم:
```text
Organized Inventory Management
```

## بدل alt:
```text
فريق عمل الوصابي للتجارة
```

## استخدم إن كانت الصورة تعبيرية:
```text
صورة تعبيرية لفريق عمليات وتوزيع
```

بالإنجليزية:
```text
Illustrative image of operations and distribution team
```

---

# 20. تحسين SEO وMetadata

## 20.1 Metadata base
إذا كان الدومين غير معروف، اترك placeholder واضح:

```ts
metadataBase: new URL("https://replace-with-real-domain.com")
```

ولا تستخدم domain وهمي يبدو نهائيًا.

## 20.2 OpenGraph
تأكد من:
- title عربي وإنجليزي مناسب.
- description عربي وإنجليزي.
- og-image 1200x630.
- canonical لكل لغة.
- alternate languages.

## 20.3 Alt text
كل الصور يجب أن تحتوي alt مناسب حسب اللغة.

---

# 21. الأداء

## 21.1 الصور
- Hero main image فقط priority.
- لا تجعل كل الصور priority.
- استخدم `sizes` مع `next/image`.
- استخدم lazy loading للصور خارج الشاشة.
- تأكد من WebP مضغوط.

## 21.2 SVG
- اضغط SVG.
- لا تستخدم SVG ثقيل كـ inline إذا لا تحتاج تحكم.
- استخدم background image للـ decorative SVG.
- أضف `aria-hidden="true"` للعناصر الزخرفية.

## 21.3 Motion
- لا تشغل animations ثقيلة على الموبايل.
- استخدم reduced motion.
- لا تستخدم scroll listeners غير محسّنة.

---

# 22. Accessibility

نفّذ:

- Focus states واضحة.
- Buttons قابلة للوحة المفاتيح.
- Mobile menu accessible.
- Language switcher فيه `aria-label`.
- Decorative images `aria-hidden`.
- Color contrast قوي.
- لا تعتمد على اللون فقط.
- Form errors تكون مربوطة بالحقول.

---

# 23. ملفات متوقع تعديلها أو إنشاؤها

## ملفات تعديل
```text
src/app/[locale]/layout.tsx
src/app/[locale]/page.tsx
src/components/sections/LandingPage.tsx
src/components/ui/ProductCategoryCard.tsx
src/components/ui/BrandLogoCard.tsx
src/components/ui/BranchCard.tsx
src/components/ui/QuoteForm.tsx
src/components/layout/Header.tsx
src/components/layout/Footer.tsx
src/data/site.ts
src/styles/globals.css
```

## ملفات إنشاء
```text
src/app/[locale]/loading.tsx
src/components/layout/Preloader.tsx
src/components/layout/PageTransition.tsx
src/components/ui/SplitTextReveal.tsx
src/components/ui/ParallaxImage.tsx
src/components/ui/ScrollProgress.tsx
src/components/ui/BrandMarquee.tsx
src/components/ui/AnimatedRouteMap.tsx
src/components/ui/FloatingWhatsAppButton.tsx
src/components/ui/BackToTopButton.tsx
```

## أصول إنشاء/تحسين
```text
public/images/logo/logo-header.webp
public/images/logo/logo-footer.webp
public/og-image.png
public/images/graphics/yemen-map.svg
public/images/graphics/tire-track.svg
public/images/graphics/route-lines.svg
```

---

# 24. اختبار نهائي إلزامي

بعد التنفيذ شغّل:

```bash
npm run lint
npm run build
```

ثم افحص يدويًا:

- الصفحة العربية RTL.
- الصفحة الإنجليزية LTR.
- الهيدر على Desktop/Tablet/Mobile.
- Hero على Mobile.
- فتح وإغلاق Mobile Menu.
- Language switch.
- Products hover.
- Brands marquee/mobile scroll.
- Distribution map hover/tap.
- Branch cards accordion.
- Quote form validation.
- WhatsApp redirect.
- Floating WhatsApp button.
- Preloader يظهر مرة واحدة فقط.
- reduced motion لا يكسر التجربة.
- الصور لا تتأخر بشكل مزعج.
- لا توجد ادعاءات قانونية غير مؤكدة.
- لا توجد نصوص placeholder.

---

# 25. معيار القبول النهائي

لا تعتبر المهمة مكتملة إلا إذا تحقق التالي:

- `npm run lint` ينجح بدون أخطاء.
- `npm run build` ينجح بدون أخطاء.
- Hero أصبح سينمائيًا واحترافيًا.
- المنتجات تظهر بصور وهوفر احترافي.
- البراندات تظهر بشعارات حقيقية لا placeholders.
- الخريطة تفاعلية ومتحركة.
- Fleet يستخدم صورة الأسطول بصريًا.
- Warehouse/Team تستخدم الصور بشكل احترافي وآمن.
- Quote Form به Selects وValidation.
- Footer أقوى ويستخدم الهوية البصرية.
- Preloader/Loading موجود واحترافي.
- ScrollProgress وFloating WhatsApp موجودان.
- الموقع ممتاز على الموبايل.
- كل الأنميشن يحترم `prefers-reduced-motion`.
- لا توجد عبارات ادعائية غير مثبتة.
- لا توجد صور كبيرة غير محسّنة في الهيدر.
- لا توجد SVG ثقيلة غير مضغوطة قدر الإمكان.

---

## النتيجة المطلوبة
بعد تنفيذ هذا الملف، يجب أن يظهر الموقع كصفحة شركة تجارية وتوزيع حديثة وراقية:

```text
Premium animated bilingual corporate landing page
for Al-Wosabe for Trading,
established since 1986,
with strong product, distribution, fleet, branch,
and quote-request storytelling.
```
