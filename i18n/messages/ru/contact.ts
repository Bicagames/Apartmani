/*
 * Address lines, phone number and e-mail are NOT here: they come from
 * `config/site.ts`. This file only holds labels and copy.
 * phoneSoon / emailSoon mirror `site.footer` so the contact section can stay
 * self-contained without importing the site slice.
 */
const contact = {
  section: {
    eyebrow: "Контакты",
    title: "Свяжитесь с нами",
    lead: "Для длительного проживания в полностью оборудованных люкс-апартаментах позвоните или напишите.",
  },
  reservations: {
    title: "Бронирование",
    body: "Напишите, какая категория нужна и на какой срок.",
    callCta: "Позвонить",
    whatsappCta: "WhatsApp",
    telegramCta: "Telegram",
    viberCta: "Viber",
    emailCta: "Почта",
    phoneSoon: "Номер телефона скоро появится",
    emailSoon: "Адрес эл. почты скоро появится",
  },
  info: {
    phoneLabel: "Телефон",
    emailLabel: "Эл. почта",
    addressLabel: "Адрес",
  },
  map: {
    title: "Карта с расположением объекта",
    openInMaps: "Открыть в Google Maps",
  },
};

export default contact;
