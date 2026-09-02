document.getElementById('year').textContent = new Date().getFullYear();

// Language switch
const translations = {
  en: {
    nav_about: "About Us",
    nav_gallery: "Gallery",
    nav_contact: "Contact",
    hero_eyebrow: "Welcome to our website!",
    hero_title: "Shanghai Zhongda Wincome Co., Ltd.",
    hero_lead: "The company focuses on blending traditional designs with modern craftsmanship to meet customer needs.",
    about_since: "Since",
    about_title: "Established in 2012",
    about_body: "A specialized manufacturer of Arab thobes in China. We strive to achieve excellence in the quality of our products and services.",
    factory_title: "Our Factory",
    factory_lead: "Our company has succeeded in meeting customer needs and providing high-quality products at competitive prices. We also specialize in the finest Moroccan thobes (galabiya/kalabiya). We continually strive to develop our products and expand our distribution to become the premier brand of Arab fashion in China and the Arab world. Furthermore, thanks to our commitment to quality and innovation, Shanghai Zhongda Wincome Co., Ltd. is a trusted destination for customers seeking elegant and distinctive Arab fashion.",
    products_title: "Our Products",
    tab_thobe: "Thobe",
    tab_pants: "Pants",
    address_title: "Address",
    address_body: "Room 260-1, 828-838 Zhangyang Road, China (Shanghai) Pilot Free Trade Zone",
    footer_emails: "Emails",
    footer_mobile: "Mobile",
    footer_factory_phone: "Factory Phone",
    footer_company: "Shanghai Zhongda Wincome Co., Ltd.",
    footer_rights: "All rights reserved.",
    lang_toggle_label: "العربية"
  },
  ar: {
    nav_about: "عن الشركة",
    nav_gallery: "المعرض",
    nav_contact: "تواصل معنا",
    hero_eyebrow: "مرحبًا بكم في موقعنا!",
    hero_title: "شركة شنغهاي تشونغدا وينكوم المحدودة",
    hero_lead: "تركز الشركة على مزج التصاميم التقليدية بالحرفية الحديثة لتلبية احتياجات العملاء.",
    about_since: "منذ",
    about_title: "تأسست عام 2012",
    about_body: "شركة متخصصة في تصنيع الثياب العربية في الصين. نسعى جاهدين لتحقيق التميز في جودة منتجاتنا وخدماتنا.",
    factory_title: "مصنعنا",
    factory_lead: "نجحت شركتنا في تلبية احتياجات العملاء وتوفير منتجات عالية الجودة بأسعار تنافسية. كما نتخصص في أفخم الثياب المغربية (الجلابية / القلابية). نسعى باستمرار لتطوير منتجاتنا وتوسيع نطاق توزيعها لتصبح العلامة الرائدة للأزياء العربية في الصين والعالم العربي. وبفضل التزامنا بالجودة والابتكار، تُعد شركة شنغهاي تشونغدا وينكوم وجهة موثوقة لعملائنا الباحثين عن أزياء عربية أنيقة ومميزة.",
    products_title: "منتجاتنا",
    tab_thobe: "الثوب",
    tab_pants: "البنطلون",
    address_title: "العنوان",
    address_body: "الغرفة 260-1، 828-838 طريق تشانغيانغ، الصين (منطقة شنغهاي التجارية الحرة التجريبية)",
    footer_emails: "البريد الإلكتروني",
    footer_mobile: "الجوال",
    footer_factory_phone: "هاتف المصنع",
    footer_company: "شركة شنغهاي تشونغدا وينكوم المحدودة",
    footer_rights: "جميع الحقوق محفوظة.",
    lang_toggle_label: "English"
  }
};

function applyLanguage(lang) {
  const dict = translations[lang];
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (dict[key]) el.textContent = dict[key];
  });
  const toggle = document.getElementById('lang-toggle');
  if (toggle) toggle.textContent = dict.lang_toggle_label;
  try { localStorage.setItem('site-lang', lang); } catch (e) {}
}

let currentLang = 'en';
try { currentLang = localStorage.getItem('site-lang') || 'en'; } catch (e) {}
applyLanguage(currentLang);

document.getElementById('lang-toggle').addEventListener('click', () => {
  currentLang = currentLang === 'en' ? 'ar' : 'en';
  applyLanguage(currentLang);
});

// Mobile menu
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');

menuToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});

mainNav.querySelectorAll('[data-close]').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Product tabs
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    tabButtons.forEach((b) => {
      b.classList.remove('active');
      b.setAttribute('aria-selected', 'false');
    });
    tabPanels.forEach((p) => {
      p.classList.remove('active');
      p.hidden = true;
    });

    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    const panel = document.querySelector(`.tab-panel[data-panel="${btn.dataset.tab}"]`);
    panel.classList.add('active');
    panel.hidden = false;
  });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

document.querySelectorAll('.lightbox-trigger').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    lightboxImg.src = link.getAttribute('href');
    lightboxImg.alt = link.querySelector('img')?.alt || '';
    lightbox.classList.add('open');
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  lightboxImg.src = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});

// Back to top
const backToTop = document.querySelector('.back-to-top');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});
