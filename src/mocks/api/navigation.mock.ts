import { NavigationDataType } from '@/types/components/navigation';

export const MENU_MOCK: NavigationDataType[] = [
  {
    code: 'products',
    name: 'Продукты',
    id: 1,
    children: [
      {
        id: 1,
        name_logo: '<span>Luna</span> <span>Kiosk</span>',
        image_logo: '/content/images/product-kiosk.svg',
        alt_logo: 'Luna Kiosk alt',
        title_logo: 'Luna Kiosk title',
        description: 'Биометрия для самообслуживания',
        code: 'luna-kiosk',
      },
      {
        id: 2,
        name_logo: '<span>Luna</span> <span>Platform</span>',
        image_logo: '/content/images/product-platform.svg',
        alt_logo: 'Luna Platform alt',
        title_logo: 'Luna Platform title',
        description: 'Платформа распознавания лиц и аномалий',
        code: 'luna-platform',
      },
      {
        id: 3,
        name_logo: '<span>Luna</span> <span>ID</span>',
        image_logo: '/content/images/product-id.svg',
        alt_logo: 'Luna ID alt',
        title_logo: 'Luna ID title',
        description: 'Биометрия и распознавание документов',
        code: 'luna-id',
      },
      {
        id: 4,
        name_logo: '<span>Luna</span> <span>Cars</span>',
        image_logo: '/content/images/product-cars.svg',
        alt_logo: 'Luna Cars alt',
        title_logo: 'Luna Cars title',
        description: 'Видеоаналитика транспорта и дорог',
        code: 'luna-cars',
      },
      {
        id: 5,
        name_logo: '<span>Luna</span> <span>Pass</span>',
        image_logo: '/content/images/product-pass.svg',
        alt_logo: 'Luna Pass alt',
        title_logo: 'Luna Pass title',
        description: 'Защита биометрии и проверка лиц',
        code: 'luna-pass',
      }
    ],
  },
  {
    code: 'solutions',
    name: 'Отрасли',
    id: 2,
    children: [
      {
        name_logo: 'Умный и безопасный город',
        code: 'smart-and-safe-city',
        description: 'Мониторинг потоков и чрезвычайных ситуаций',
      },
      {
        name_logo: 'Финансы',
        code: 'finance',
        description: 'Предотвращение фрода и безопасность',
      },
      {
        name_logo: 'Здравоохранение',
        code: 'healthcare',
        description: 'Идентификация пациентов и диагностика',
      },
      {
        name_logo: 'Транспорт',
        code: 'transport',
        description: 'Оптимизация дорожной сети и пассажиропотока',
      },
      {
        name_logo: 'Промышленность',
        code: 'industry',
        description: 'Контроль доступа, безопасности и качества',
      },
      {
        name_logo: 'Образование',
        code: 'education',
        description: 'Безопасность заведений и анализ вовлеченности',
      }
    ],
  },
  {
    code: 'use-cases',
    name: 'Сценарии',
    id: 3,
    children: [
      {
        name_logo: 'Безопасность',
        code: 'safety',
        description: 'Проверка, пресечение нарушений',
        image_logo: '/content/images/product-id.svg',
      },
      {
        name_logo: 'Идентификация',
        code: 'identification',
        description: 'Биометрия для оплаты и сервиса',
        image_logo: '/content/images/product-pass.svg',
      },
      {
        name_logo: 'Мониторинг',
        code: 'monitoring',
        description: 'Маршруты и контроль транспорта',
        image_logo: '/content/images/product-platform.svg',
      },
      {
        name_logo: 'Диагностика',
        code: 'diagnostics',
        description: 'Анализ и диагностика медснимков',
        image_logo: '/content/images/product-kiosk.svg',
      },
      {
        name_logo: 'Аналитика',
        code: 'analytics',
        description: 'Анализ визитов и маршрутов',
        image_logo: '/content/images/product-cars.svg',
      }
    ],
  },
  {
    code: '',
    name: 'О нас',
    id: 4,
    can_located_separately: true,
    children: [
      {
        name_logo: 'Кто мы',
        code: 'about-us',
        description: 'Узнайте историю компании и факты о нашей экспертизе',
      },
      {
        name_logo: 'Новости',
        code: 'media-news',
        description: 'События, новости и публикации',
      },
      {
        name_logo: 'Документация',
        code: 'documentation',
        description: 'Руководства и тех. материалы',
      },
      {
        name_logo: 'Истории успеха',
        code: 'success-stories',
        description: 'История компании и экспертиза',
      },
      {
        name_logo: 'Партнёры',
        code: 'partners',
        description: 'Наши партнёры и сотрудничество с нами',
      },
      {
        name_logo: 'Комплаенс',
        code: 'compliance',
        description: 'Cоответствие требованиям',
      },
      {
        name_logo: 'Контакты',
        code: 'contacts',
        description: 'Свяжитесь с нами',
      }
    ],
  }
];
