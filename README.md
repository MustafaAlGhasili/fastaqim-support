# موقع الدعم الفني لتطبيق فاستقم | Fastaqim Support Website

الموقع الرسمي للدعم الفني لتطبيق **فاستقم (Fastaqim)**، مُعد ومُهيأ بالكامل للاستضافة المجانية عبر **GitHub Pages**، ومُخصص لتقديمه كـ **رابط الدعم الفني (Support URL)** في **Apple App Store Connect**.

---

## 📌 قيم يجب استبدالها قبل النشر (Important Placeholders)

قبل رفع الموقع ونشره، يجب استبدال القيم المؤقتة التالية:

| القيمة المؤقتة | الوصف | الملفات المعنية |
|---|---|---|
| `alghasili.mustafa@gmail.com` | عنوان البريد الإلكتروني الفعلي المخصص لاستقبال رسائل دعم التطبيق (مثال: `support@fastaqim.com` أو بريدك على Gmail) | `index.html`<br>`assets/js/app.js` |
| `USERNAME` | اسم حسابك على GitHub | إعدادات المستودع ورابط الموقع النهائي |

---

## ⚙️ الخطوة 1: ضبط البريد الإلكتروني للدعم الفني

1. افتح ملف `assets/js/app.js`، وفي السطر رقم 14 تقريباً، استبدل:
   ```javascript
   SUPPORT_EMAIL: 'alghasili.mustafa@gmail.com',
   ```
   بعنوان بريدك الحقيقي، مثال:
   ```javascript
   SUPPORT_EMAIL: 'alghasili.mustafa@gmail.com',
   ```

2. افتح ملف `index.html`، وابحث عن `alghasili.mustafa@gmail.com` واستبدلها ببريدك الإلكتروني (توجد في روابط `mailto:` والنصوص المعروضة).

> 💡 **ملاحظة:** صُمم الموقع ليعمل بسلاسة حتى لو قمت بتغيير القيمة في ملف `assets/js/app.js` فقط؛ حيث يقوم السكريبت تلقائياً بتحديث جميع الروابط والنصوص في الصفحة. ومع ذلك يُفضل استبدالها في `index.html` أيضاً لضمان أفضل توافق مع محركات البحث وتطبيقات قراءة الشاشة عند إيقاف JavaScript.

---

## 🚀 الخطوة 2: إنشاء المستودع على GitHub ورفع الموقع

### 1. إنشاء مستودع جديد على GitHub
1. سجّل الدخول إلى حسابك على [GitHub](https://github.com/).
2. اضغط على زر **New** لإنشاء مستودع جديد (New repository).
3. أدخل اسم المستودع:
   ```text
   fastaqim-support
   ```
4. اختر نوع المستودع: **Public** (عام) لأن استضافة GitHub Pages المجانية تتطلب أن يكون المستودع عاماً في الحسابات العادية.
5. **لا تُحدد** خيارات "Add a README file" أو "Add .gitignore" لأن الملفات جاهزة وموجودة بالفعل داخل المشروع.
6. اضغط **Create repository**.

### 2. رفع ملفات المشروع من جهازك
افتح موجه الأوامر (Terminal أو PowerShell) داخل مجلد المشروع `d:\Fastaqim-support` ونفّذ الأوامر التالية بالترتيب:

```bash
# 1. تهيئة مستودع Git محلي
git init

# 2. إضافة جميع الملفات
git add .

# 3. حفظ أول Commit
git commit -m "Initial commit: Fastaqim Support Website"

# 4. تعيين الفرع الأساسي إلى main
git branch -M main

# 5. ربط المستودع المحلي بمستودع GitHub (استبدل USERNAME باسم حسابك على GitHub)
git remote add origin https://github.com/USERNAME/fastaqim-support.git

# 6. رفع الملفات إلى GitHub
git push -u origin main
```

---

## 🌐 الخطوة 3: تفعيل GitHub Pages عبر GitHub Actions

المشروع يحتوي بالفعل على سير عمل تلقائي جاهز في المسار:
`.github/workflows/deploy.yml`

لتفعيل النشر التلقائي عبره:

1. ادخل إلى صفحة المستودع على GitHub: `https://github.com/USERNAME/fastaqim-support`.
2. اضغط على تبويب **Settings** (الإعدادات).
3. من القائمة الجانبية اليسرى، اضغط على **Pages**.
4. تحت قسم **Build and deployment**:
   - في خانة **Source**، اختر:
     ```text
     GitHub Actions
     ```
5. بمجرد اختيار `GitHub Actions`، سيبدأ سير العمل فوراً وبشكل تلقائي في بناء ونشر الموقع.
6. يمكنك متابعة تقدم النشر من تبويب **Actions** في أعلى المستودع. يستغرق النشر عادةً أقل من دقيقة.

---

## 🔗 الخطوة 4: رابط الموقع المباشر (Live Public URL)

بعد اكتمال النشر، سيكون الرابط المباشر للموقع هو:

```text
https://USERNAME.github.io/fastaqim-support/
```

*(استبدل `USERNAME` باسم مستخدم حسابك على GitHub)*

---

## 🍎 الخطوة 5: تقديم الرابط في Apple App Store Connect

عند تقديم تطبيق **فاستقم** للمراجعة أو تحديث بياناته في **Apple App Store Connect**:

1. انتقل إلى [App Store Connect](https://appstoreconnect.apple.com/).
2. اختر تطبيق **فاستقم (Fastaqim)**.
3. في شاشة إصدار التطبيق (App Information / Version Information)، ابحث عن حقل:
   - **Support URL** (رابط الدعم الفني).
4. الصق الرابط العام لموقع الدعم:
   ```text
   https://USERNAME.github.io/fastaqim-support/
   ```
5. احفظ التغييرات.

---

## 🔄 كيفية تحديث الموقع في المستقبل

عند الرغبة في تحديث أي محتوى أو إضافة أسئلة شائعة جديدة:

1. عدّل الملفات محلياً على جهازك.
2. احفظ التغييرات ثم نفّذ:
   ```bash
   git add .
   git commit -m "Update support content"
   git push origin main
   ```
3. سيقوم GitHub Actions تلقائياً بإعادة نشر النسخة المحدثة خلال ثوانٍ معدودة.

---

## 📁 هيكلية ملفات المشروع (Project Structure)

```text
fastaqim-support/
├── .github/
│   └── workflows/
│       └── deploy.yml        # سير العمل التلقائي لنشر GitHub Pages
├── assets/
│   ├── css/
│   │   └── style.css         # ملف التنسيقات (هوية وتصميم فاستقم الرسمي)
│   ├── js/
│   │   └── app.js            # منطق الأكورديون، البحث، النسخ، ونموذج البريد
│   └── images/
│       ├── app_icon.png      # أيقونة التطبيق الرسمية من نظام iOS (1024x1024)
│       ├── logo.png          # شعار فاستقم الكامل مع الخط العربي
│       ├── splash_logo.png   # الشعار الرمزي المستقل
│       ├── icon.svg          # الشعار بصيغة المتجهات SVG
│       └── favicon.png       # أيقونة المتصفح المخصصة (Favicon)
├── index.html                # صفحة الموقع الرئيسية باللغة العربية (RTL)
├── .gitignore                # استثناء الملفات المؤقتة
└── README.md                 # الدليل التوثيقي الشامل
```

---

## 🔒 الخصوصية والقيود
- لا يحتوي الموقع على نماذج خادعة أو سيرفرات وسيطة؛ جميع عمليات التواصل تتم مباشرة عبر تطبيق البريد الخاص بالمستخدم (`mailto:`).
- جميع مسارات الملفات نُفذت بصيغة نسبية (`relative paths`) لضمان عمل الموقع دون أي أخطاء في الروابط أو الصور تحت مسار GitHub Pages الفرعي (`/fastaqim-support/`).
- تم الالتزام التام بالهوية البصرية الرسمية لتطبيق فاستقم (الخط المعتمد: Cairo، اللون الأساسي الأخضر الإسلامي `#2E7D32` والذهبي الوقور `#8B5E0B`).
