import type {
  AmenityGroup,
  AmenityId,
  ApartmentSlug,
  BedType,
} from "@/features/apartments/types";
import type { PluralForms } from "../../plural";

/*
 * `other` is the Russian "many" form (0, 5–20, 11–14, …).
 */
type ApartmentItemMessages = {
  name: string;
  /** One line, shown on the card. */
  summary: string;
  description: string;
  /** One alt text per photo, same order as `Apartment.images` (5 photos). */
  imageAlts: [string, string, string, string, string];
};

type ApartmentsMessages = {
  section: { eyebrow: string; title: string; lead: string };
  card: {
    areaUnit: string;
    /** Count is rendered separately: `${n} ${formatCount(locale, n, guests)}`. */
    guests: PluralForms;
    from: string;
    perNight: string;
    viewDetails: string;
  };
  detail: {
    descriptionTitle: string;
    factsTitle: string;
    bedsTitle: string;
    bedrooms: PluralForms;
    studio: string;
    amenitiesTitle: string;
    groups: Record<AmenityGroup, string>;
    priceTitle: string;
    priceNote: string;
    cta: string;
    close: string;
    previousPhoto: string;
    nextPhoto: string;
    /** Placeholders: `{current}` and `{total}`. */
    photoCounter: string;
    galleryLabel: string;
    breadcrumb: {
      /** Accessible name of the breadcrumb `nav`. */
      label: string;
      home: string;
      apartments: string;
    };
  };
  items: Record<ApartmentSlug, ApartmentItemMessages>;
  amenities: Record<AmenityId, string>;
  /** Count is rendered separately: `${n} ${formatCount(locale, n, bedTypes[type])}`. */
  bedTypes: Record<BedType, PluralForms>;
};

const apartments: ApartmentsMessages = {
  section: {
    eyebrow: "Апартаменты",
    title: "Квартиры",
    lead: "Полностью оборудованные люкс-апартаменты для длительного проживания.",
  },
  card: {
    areaUnit: "м²",
    guests: { one: "гость", few: "гостя", other: "гостей" },
    from: "от",
    perNight: "за ночь",
    viewDetails: "Смотреть подробности",
  },
  detail: {
    descriptionTitle: "Об апартаменте",
    factsTitle: "Основное",
    bedsTitle: "Спальные места",
    bedrooms: {
      one: "спальня",
      few: "спальни",
      other: "спален",
    },
    studio: "Студия",
    amenitiesTitle: "Оснащение",
    groups: {
      kitchen: "Кухня",
      bathroom: "Ванная",
      room: "Комната",
      other: "Прочее",
    },
    priceTitle: "Цена",
    priceNote: "Напишите нам, чтобы узнать цену на длительный срок.",
    cta: "Бронирование",
    close: "Закрыть",
    previousPhoto: "Предыдущее фото",
    nextPhoto: "Следующее фото",
    photoCounter: "Фотография {current} из {total}",
    galleryLabel: "Галерея фотографий апартамента",
    breadcrumb: {
      label: "Навигация",
      home: "Главная",
      apartments: "Апартаменты",
    },
  },
  items: {
    "suit-deluxe-1": {
      name: "Suit Deluxe 1",
      summary:
        "Апартаменты в Суботице с двуспальной кроватью и диваном-кроватью, до 4 гостей.",
      description:
        "Одна спальня с двуспальной кроватью. В гостиной — диван-кровать и кухня с плитой, холодильником, микроволновкой и посудой. Душ, кондиционер, телевизор и Wi-Fi.",
      imageAlts: [
        "Гостиная сюита Deluxe 1 в Суботице",
        "Спальная зона сюита Deluxe 1 с двуспальной кроватью",
        "Кухня и обеденный уголок сюита Deluxe 1",
        "Ванная сюита Deluxe 1 с душевой кабиной",
        "Деталь интерьера сюита Deluxe 1 в песочных тонах",
      ],
    },
    "suit-deluxe-2": {
      name: "Suit Deluxe 2",
      summary: "Апартаменты в Суботице с двумя спальнями, до 5 гостей.",
      description:
        "В одной комнате двуспальная кровать, в другой — две односпальные. В гостиной диван-кровать. Есть кухня, письменный стол и стиральная машина.",
      imageAlts: [
        "Гостиная сюита Deluxe 2 в Суботице",
        "Первая спальня сюита Deluxe 2 с двуспальной кроватью",
        "Вторая спальня сюита Deluxe 2 с двумя отдельными кроватями",
        "Кухня сюита Deluxe 2 с обеденным столом",
        "Ванная сюита Deluxe 2 со стиральной машиной",
      ],
    },
    "studio-deluxe": {
      name: "Studio Deluxe",
      summary: "Студия в Суботице с двуспальной кроватью, для двоих.",
      description:
        "Студия с двуспальной кроватью, кухонным уголком и душем. Кондиционер, телевизор и Wi-Fi.",
      imageAlts: [
        "Studio Deluxe с двуспальной кроватью в Суботице",
        "Кухонный уголок студии Deluxe",
        "Место для сидения и телевизор в студии Deluxe",
        "Ванная студии Deluxe с душевой кабиной",
        "Деталь интерьера студии Deluxe в глиняных тонах",
      ],
    },
    "suit-king-size-balkon": {
      name: "Suit King Size с балконом",
      summary:
        "Апартаменты в Суботице с кроватью king size и балконом, до 4 гостей.",
      description:
        "Кровать king size и диван-кровать. Есть балкон, кухня, письменный стол, сейф и стиральная машина.",
      imageAlts: [
        "Спальня сюита King Size с кроватью king size в Суботице",
        "Балкон сюита King Size с местом для сидения",
        "Гостиная сюита King Size с кухней",
        "Ванная сюита King Size с душевой кабиной",
        "Деталь интерьера сюита King Size в оливковых тонах",
      ],
    },
  },
  amenities: {
    fridge: "Холодильник",
    stove: "Плита",
    microwave: "Микроволновка",
    kettle: "Чайник",
    "coffee-machine": "Кофемашина",
    cookware: "Посуда для готовки",
    dishes: "Тарелки и приборы",
    shower: "Душевая кабина",
    hairdryer: "Фен",
    towels: "Полотенца",
    toiletries: "Туалетные принадлежности",
    "washing-machine": "Стиральная машина",
    "air-conditioning": "Кондиционер",
    tv: "Телевизор",
    wifi: "Бесплатный Wi-Fi",
    wardrobe: "Шкаф",
    desk: "Письменный стол",
    safe: "Сейф",
    balcony: "Балкон",
    heating: "Отопление",
    parking: "Парковка",
    iron: "Утюг",
    "bed-linen": "Постельное бельё",
    "self-check-in": "Самостоятельное заселение",
  },
  bedTypes: {
    king: {
      one: "кровать king size",
      few: "кровати king size",
      other: "кроватей king size",
    },
    double: {
      one: "двуспальная кровать",
      few: "двуспальные кровати",
      other: "двуспальных кроватей",
    },
    single: {
      one: "односпальная кровать",
      few: "односпальные кровати",
      other: "односпальных кроватей",
    },
    "sofa-bed": {
      one: "диван-кровать",
      few: "дивана-кровати",
      other: "диванов-кроватей",
    },
  },
};

export default apartments;
