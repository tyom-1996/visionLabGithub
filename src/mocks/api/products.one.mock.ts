import { PRODUCTS_PREVIEW_MOCK } from './products.mock';
import { ProductDetailsType } from '@/types/components/product';

export const PRODUCT_DETAILS_MOCK: ProductDetailsType = {
  id: 1,
  code: 'luna-cars',
  detail_logo: '/content/images/product-cars.svg',
  detail_title: 'Luna Cars',
  detail_logo_alt: 'Luna Cars',
  detail_logo_title: 'Luna Cars',
  detail_subtitle: 'Система интеллектуальной видеоаналитики для распознавания транспорта и мониторинга дорожной обстановки',
  image_main: '/content/images/luna-cars.jpg',
  alt_main: 'luna-cars',
  title_main: 'luna-cars',
  video_main: '/content/video/MosaicBanner_CAR_webm_v02.webm',
  detail_description: {
    text: 'Система распознаёт номера и атрибуты автомобилей, проверяет их по спискам и управляет доступом на территорию. Встроенный модуль аналитики обрабатывает видеопоток и легко интегрируется с другими системами. Систему можно использовать на парковках, КПП, охраняемых объектах и платных дорогах.',
  },
  task_list: [
    {
      description: 'Безопасность',
      value: 'Автоматизация парковок',
    },
    {
      description: 'Сервис',
      value: 'Автоматизация работы парковки для охраняемых территорий',
    },
    {
      description: 'Бизнес',
      value: 'Сбор данных для маркетинговой аналитики на заправках',
    },
    {
      description: 'Безопасность',
      value: 'Мониторинг дорожно-транспортной ситуации и управление трафиком',
    }
  ],
  possibilities_logo: '/content/images/product-opportunities.jpg',
  possibilities_logo_alt: 'opportunities',
  possibilities_logo_title: 'opportunities',
  possibilities: [
    {
      id: 1,
      bottom_title: 'Номер',
      bottom_subtitle: 'С серией и регионом',
      title: 'Точность',
      subtitle: '99,8%',
    },
    {
      id: 2,
      bottom_title: 'Марка и модель',
      bottom_subtitle: 'Более 1750 пар марка — модель',
      title: 'Точность',
      subtitle: '>95%',
    },
    {
      id: 3,
      bottom_title: 'Цвет',
      bottom_subtitle: '16 основных цветов',
      title: 'Точность',
      subtitle: '>95%',
    },
    {
      id: 4,
      bottom_title: 'Категория',
      bottom_subtitle: '15 категорий и велосипеды',
      title: 'Точность',
      subtitle: '>95%',
    },
    {
      id: 5,
      bottom_title: 'Экстренные службы',
      bottom_subtitle: 'А также общественный и специальный транспор',
      title: 'Точность',
      subtitle: '>95%',
    }
  ],
  modules: [
    {
      value: 'Контроль физического доступа ',
      description: 'Модуль для автоматизации въезда и выезда автомобилей. Распознаёт атрибуты транспортного средства, записывает данные в журнал событий, интегрируется со шлагбаумами и воротами.',
    },
    {
      value: 'Видеоаналитика',
      description: 'Модуль для анализа видеопотока. Распознаёт автомобили и их атрибуты, людей и животных на дороге, а также возгорания и задымления.',
    }
  ],
  advantages_logo: '/content/images/girl-with-laptop.jpeg',
  advantages_logo_alt: 'modules',
  advantages_logo_title: 'modules',
  advantages: [
    'Определение всех основных атрибутов транспорта',
    'Работа с видеопотоком в режиме реального времени и с записями'
  ],
  clients: [
    {
      id: 1,
      title: 'ЦОДД',
      description: 'Автоматизированная проверка выставляемых штрафов для сокращения числа ошибочно сформированных извещений',
      logo: '/content/logo/s7.png',
      logo_alt: 'ЦОДД',
      logo_title: 'ЦОДД',
    },
    {
      id: 2,
      title: 'ДКС',
      description: 'Автоматизация журнала учёта для контроля транспорта, въезжающего на территорию завода',
      logo: '/content/logo/post-bank.png',
      logo_alt: 'ДКС',
      logo_title: 'ДКС',
    },
    {
      id: 3,
      title: 'Рублёво-Архангельское',
      description: 'Регулирование потока въезжающего транспорта и навигация по полосам в зависимости от типа транспортного средства',
      logo: '/content/logo/alfa-bank.png',
      logo_alt: 'Рублёво-Архангельское',
      logo_title: 'Рублёво-Архангельское',
    }
  ],
  related_products: PRODUCTS_PREVIEW_MOCK,
  what_recognize: 'Что распознаёт',
};
