import { UseCaseDetailsType } from '@/types/components/useCases';
import { PRODUCTS_PREVIEW_MOCK } from './products.mock';
import { USE_CASES_PREVIEW_MOCK } from './useCases.mock';

export const USE_CASE_DETAILS_MOCK: UseCaseDetailsType = {
  id: 1,
  code: 'safety-at-facilities',
  name: 'Безопасность на объектах',
  preview_text: 'С помощью видеоаналитики контролируйте происходящее на объекте и оперативно узнавайте о нештатных ситуациях.',
  solving_problems: {
    image: '/content/images/use-cases-inverted-triangle.svg',
    alt: 'solving problems',
    title: 'solving problems',
    lottie_file: '/content/lottie/Anim_10_v01.json',
    list: [
      {
        name: 'Безопасность',
        description: 'Контроль периметра и охраняемых зон',
      },
      {
        name: 'Сервис',
        description: 'Выявление потенциально опасных ситуаций',
      },
      {
        name: 'Безопасность',
        description: 'Автоматизированный пропуск транспорта',
      },
      {
        name: 'Безопасность',
        description: 'Обеспечение промышленной безопасности',
      },
      {
        name: 'Сервис',
        description: 'Анализ перемещений по территории',
      }
    ],
  },
  opportunities: {
    image: '/content/images/opportunities.jpg',
    alt: 'opportunities',
    title: 'opportunities',
    list: [
      {
        id: 1,
        name: 'Распознавание лиц и силуэтов',
        description: 'Идентификация сотрудников и посетителей, построение их маршрутов',
      },
      {
        id: 2,
        name: 'Поведенческая аналитика',
        description: 'Распознавание лежащих людей, позы стрельбы, оружия, драк, вандализма',
      },
      {
        id: 3,
        name: 'Распознавание огня',
        description: 'Выявление очагов возгорания на ранней стадии, детекция черного и белого дыма',
      },
      {
        id: 4,
        name: 'Обнаружение оставленных предметов',
        description: 'Реагирование на наличие оставленных или забытых вещей в зоне наблюдения',
      },
      {
        id: 5,
        name: 'Распознавание СИЗ',
        description: 'Выявление сотрудников без касок, жилетов, перчаток в опасных зонах',
      },
      {
        id: 6,
        name: 'Транспортная видеоаналитика',
        description: 'Распознавание машин и их атрибутов: принадлежность к спецтранспорту, цвет, тип и других',
      },
      {
        id: 7,
        name: 'Детекция пересечения линий',
        description: 'Мониторинг отсутствия посторонних в опасных или закрытых зонах',
      }
    ],
  },
  results: [
    {
      name: '≈30%',
      description: 'повышается точность и скорость реакции на угрозы благодаря аналитике',
      is_big: true,
    },
    {
      name: '3',
      description: 'секунды требуется для обработки инцидента и оповещения',
      is_big: true,
    },
    {
      name: '20%',
      description: 'ниже нагрузка на службу безопасности за счет автоматического мониторинга',
      is_big: true,
    }
  ],
  success_stories: [
    {
      id: 1,
      title: 'Рублево-Архангельское',
      subtitle: 'Управление трафиком',
      description: 'Регулирование потока въезжающего транспорта и автоматизация навигации по полосам в зависимости от типа транспортного средства',
      logo: '/content/logo/city-red.png',
      logo_alt: 'S7',
      logo_title: 'S7',
      isUseMockImage: true,
    },
    {
      id: 2,
      title: 'ДКС',
      subtitle: 'Промышленная безопасность',
      description: 'Технологии компьютерного обеспечивают распознавание автотранспорта, а также мониторинг наличия средств защиты и нахождения сотрудников в опасных зонах',
      logo: '/content/logo/city-red.png',
      logo_alt: 'post-bank',
      logo_title: 'post-bank',
      isUseMockImage: true,
    },
    {
      id: 3,
      title: 'Росгранстрой',
      subtitle: 'Цифровизации пограничных пунктов пропуска',
      description: 'Автоматическая фиксация перемещения транспорта и анализ данных со всех этапов проверок — пограничного, таможенного, санитарного',
      logo: '/content/logo/city-red.png',
      logo_alt: 'ЦДТ',
      logo_title: 'ЦДТ',
      isUseMockImage: true,
    }
  ],
  products: PRODUCTS_PREVIEW_MOCK,
  use_cases: USE_CASES_PREVIEW_MOCK.filter((useCase) => useCase.name !== 'Повышение безопасности объектов' && useCase.name !== 'Не нашли свой сценарий?'),
  big_square_label: 'Показатели, которых мы добились за время работы',
};
