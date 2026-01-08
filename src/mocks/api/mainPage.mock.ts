import { MainPageDataType } from '@/types/components/mainPage';
import { PRODUCTS_PREVIEW_MOCK } from './products.mock';
import { SOLUTIONS_PREVIEW_MOCK } from './solutions.mock';
import { USE_CASES_PREVIEW_MOCK } from './useCases.mock';

export const MAIN_PAGE_MOCK: MainPageDataType = {
  industries: SOLUTIONS_PREVIEW_MOCK,
  numbers: [
    {
      name: '13',
      preview_text: 'лет разрабатываем технологии компьютерного зрения',
      is_big: true,
    },
    {
      name: '500',
      preview_text: 'проектов по всему миру',
      is_big: true,
    },
    {
      name: '270+',
      preview_text: 'клиентов из разных сфер',
      is_big: true,
    },
    {
      name: '37 стран',
      preview_text: 'пользуются нашими технологиями',
      is_big: false,
    },
    {
      name: '1,7+ млн',
      preview_text: 'камер по всему миру используют наше ПО',
      is_big: false,
    },
    {
      name: '1 место',
      preview_text: 'в мире по точности распознавания в рейтинге NIST',
      is_big: false,
    }
  ],
  partners: [
    {
      id: 1,
      title: 'ЦБТ',
      subtitle: 'Оператор ЕБС',
      description: 'C 2022 года — оператор ГИС «Единая биометрическая система», одного из ключевых проектов цифровой инфраструктуры РФ. АО «ЦБТ» обеспечивает сбор, хранение, обработку и проверку биометрических персональных данных с учетом требований законодательства.',
      logo: '/content/logo/cbt.png',
      logo_alt: 'ЦБТ',
      logo_title: 'ЦБТ',
      isUseMockImage: true,
    },
    {
      id: 2,
      title: 'НСПК',
      subtitle: 'Оператор платежной системы МИР',
      description: 'АО «НСПК» обеспечивает независимость платежной инфраструктуры России. НСПК выпускает карты «Мир» и развивает Систему быстрых платежей. Компания внедряет доступные и удобные платежные сервисы, поддерживая суверенитет страны и формируя стандарты индустрии.',
      logo: '/content/logo/nspk.png',
      logo_alt: 'НСПК',
      logo_title: 'НСПК',
      isUseMockImage: true,
    },
    {
      id: 3,
      title: 'ЦРТ',
      subtitle: 'VMS',
      description: 'Группа компаний ЦРТ — ведущий разработчик решений на основе разговорного ИИ, машинного обучения и компьютерного зрения. Эксперт в речевых технологиях, лицевой и голосовой биометрии. В России технологии ЦРТ используются в банках, госсекторе, ТЭК и концепции Safe & Smart City.',
      logo: '/content/logo/crt.png',
      logo_alt: 'ЦРТ',
      logo_title: 'ЦРТ',
      isUseMockImage: true,
    },
    {
      id: 4,
      title: 'Нетрис',
      subtitle: 'VMS',
      description: 'Ведущий разработчик интеллектуальных решений в области видеонаблюдения для умных городов, регионов и крупного бизнеса. На базе технологий АО «Нетрис» создается Единая национальная платформа видеонаблюдения (ЕНПВ). Решения используются в России и СНГ.',
      logo: '/content/logo/netris.png',
      logo_alt: 'Нетрис',
      logo_title: 'Нетрис',
      isUseMockImage: true,
    },
    {
      id: 5,
      title: 'Алгонт',
      subtitle: 'VMS',
      description: 'АО «Алгонт» — российская IT-компания, специализирующаяся на разработке, проектировании, производстве и внедрении решений для комплексной безопасности объектов. Компания выполняет полный цикл работ — от проектирования до обслуживания «под ключ» инженерных систем.',
      logo: '/content/logo/algont.png',
      logo_alt: 'Алгонт',
      logo_title: 'Алгонт',
      isUseMockImage: true,
    },
    {
      id: 6,
      title: 'ITV Group',
      subtitle: 'VMS',
      description: 'Система видеоаналитики распознает транспорт и помогает оптимизировать трафик, снижая риск ДТПГК ITV Group объединяет разработчиков, производителей и поставщиков решений для физической безопасности. В ее состав среди прочих входит компания ITV — разработчик ПО для видеонаблюдения, интегрированных систем безопасности и нейросетевой видеоаналитики, применяемых по всему миру.',
      logo: '/content/logo/itv.png',
      logo_alt: 'ITV Group',
      logo_title: 'ITV Group',
      isUseMockImage: true,
    }
  ],
  products: PRODUCTS_PREVIEW_MOCK,
  'use-cases': USE_CASES_PREVIEW_MOCK,
  computer_vision: {
    title: 'Технологии, которые видят и&nbsp;понимают',
    text: 'Разрабатываем технологии распознавания людей и&nbsp;объектов. Любой сложности, для&nbsp;любой отрасли.',
  },
  achievements: [
    {
      id: 1,
      text: 'Команда экспертов в компьютерном зрении',
      json: '/content/lottie/Anim16v01.json',
    },
    {
      id: 2,
      text: 'Технологии, которые работают по всему миру',
      json: '/content/lottie/Anim_17_v02.json',
    },
    {
      id: 3,
      text: 'Лёгкая интеграция с системами клиента',
      json: '/content/lottie/Anim18v01.json',
    }
  ],
  whoweare: 'Технологии VisionLabs внедряют компании и государственные организации по всему миру',
};
