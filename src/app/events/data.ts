export type EventItem = {
  id: number;
  date: string;
  time: string;
  title: string;
  img: string;
  description?: string;
};

export const webinars: EventItem[] = [
  {
    id: 0,
    date: '05.11.2024',
    time: '15:00',
    title: 'Уникальный вебинар от VisionLabs и Q-Systems',
    img: '/content/images/webinars-card-1.jpg',
    description: 'Как VisionLabs и Q-Systems внедряют биометрию и антифрод в реальных проектах.',
  },
  {
    id: 1,
    date: '05.11.2024',
    time: '15:00',
    title: 'Вебинар на тему: ChaLearn Face Anti-spoofing Attack Detection Challenge',
    img: '/content/images/webinars-card-2.jpg',
    description: 'Разбор датасетов и подходов, которые помогают выявлять спуфинг в потоковом видео.',
  },
  {
    id: 2,
    date: '05.11.2024',
    time: '15:00',
    title: 'Вебинар: как применять ИИ в 2025 году',
    img: '/content/images/webinars-card-3.jpg',
    description: 'Практические сценарии для внедрения компьютерного зрения и ML в бизнес-процессы.',
  },
  {
    id: 3,
    date: '05.11.2024',
    time: '15:00',
    title: 'Индивидуальный вебинар от Ксении Бордо',
    img: '/content/images/webinars-card-4.jpg',
    description: 'Экспертный взгляд на будущее визуальной идентификации и тренды в 2025 году.',
  },
  {
    id: 4,
    date: '05.11.2024',
    time: '15:00',
    title: 'Уникальный вебинар от VisionLabs и Q-Systems',
    img: '/content/images/webinars-card-1.jpg',
    description: 'Как VisionLabs и Q-Systems внедряют биометрию и антифрод в реальных проектах.',
  },
  {
    id: 5,
    date: '05.11.2024',
    time: '15:00',
    title: 'Вебинар на тему: ChaLearn Face Anti-spoofing Attack Detection Challenge',
    img: '/content/images/webinars-card-2.jpg',
    description: 'Разбор датасетов и подходов, которые помогают выявлять спуфинг в потоковом видео.',
  },
  {
    id: 6,
    date: '05.11.2024',
    time: '15:00',
    title: 'Вебинар: как применять ИИ в 2025 году',
    img: '/content/images/webinars-card-3.jpg',
    description: 'Практические сценарии для внедрения компьютерного зрения и ML в бизнес-процессы.',
  },
  {
    id: 7,
    date: '05.11.2024',
    time: '15:00',
    title: 'Индивидуальный вебинар от Ксении Бордо',
    img: '/content/images/webinars-card-4.jpg',
    description: 'Экспертный взгляд на будущее визуальной идентификации и тренды в 2025 году.',
  },
];

export const confs: EventItem[] = [
  {
    id: 100,
    date: '05.11.2024',
    time: '15:00',
    title: 'Конференция: ChaLearn Face Anti-spoofing Attack Detection Challenge',
    img: '/content/images/confs-card-1.jpg',
    description: 'Обсуждаем результаты челенджа, метрики качества и практическое применение.',
  },
  {
    id: 101,
    date: '05.11.2024',
    time: '15:00',
    title: 'Уникальная конференция от VisionLabs и Q-Systems',
    img: '/content/images/confs-card-2.jpg',
    description: 'Истории внедрения биометрии в ритейле и банковском секторе.',
  },
  {
    id: 102,
    date: '05.11.2024',
    time: '15:00',
    title: 'Индивидуальная конференция от Ксении Бордо',
    img: '/content/images/confs-card-3.jpg',
    description: 'Персональный взгляд на будущее технологий визуальной идентификации.',
  },
  {
    id: 103,
    date: '05.11.2024',
    time: '15:00',
    title: 'Вебинар: как применять ИИ в 2025 году',
    img: '/content/images/confs-card-4.jpg',
    description: 'Практические сценарии внедрения ИИ в крупных компаниях.',
  },
  {
    id: 104,
    date: '05.11.2024',
    time: '15:00',
    title: 'Конференция: ChaLearn Face Anti-spoofing Attack Detection Challenge',
    img: '/content/images/confs-card-1.jpg',
    description: 'Обсуждаем результаты челенджа, метрики качества и практическое применение.',
  },
  {
    id: 105,
    date: '05.11.2024',
    time: '15:00',
    title: 'Уникальная конференция от VisionLabs и Q-Systems',
    img: '/content/images/confs-card-2.jpg',
    description: 'Истории внедрения биометрии в ритейле и банковском секторе.',
  },
  {
    id: 106,
    date: '05.11.2024',
    time: '15:00',
    title: 'Индивидуальная конференция от Ксении Бордо',
    img: '/content/images/confs-card-3.jpg',
    description: 'Персональный взгляд на будущее технологий визуальной идентификации.',
  },
  {
    id: 107,
    date: '05.11.2024',
    time: '15:00',
    title: 'Вебинар: как применять ИИ в 2025 году',
    img: '/content/images/confs-card-4.jpg',
    description: 'Практические сценарии внедрения ИИ в крупных компаниях.',
  },
];

export const newEvents: EventItem[] = [
  {
    id: 0,
    date: '05.11.2024',
    time: '15:00',
    title: 'Уникальный вебинар от VisionLabs и Q-Systems',
    img: '/content/images/webinars-card-1.jpg',
  },
  {
    id: 100,
    date: '05.11.2024',
    time: '15:00',
    title: 'Конференция: ChaLearn Face Anti-spoofing Attack Detection Challenge',
    img: '/content/images/confs-card-1.jpg',
  },
];

export const allEvents = [...webinars, ...confs];

