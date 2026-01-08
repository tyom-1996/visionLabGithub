import { ContactsType } from '@/types/components/contacts';

export const CONTACTS_MOCK: ContactsType = {
  contacts: [
    {
      id: 1,
      name: 'Москва, 105062<br/>Подсосенский переулок, д. 23 стр. 3',
      text: [
        {
          value: 'Посмотреть на Яндекс Карте',
          description: 'https://yandex.ru/maps/213/moscow/house/podsosenskiy_pereulok_23s3/Z04YcAJkTEYPQFtvfXt0dH1rYg==/?ll=37.654538%2C55.755186&z=17',
        }
      ],
    },
    {
      id: 2,
      name: 'Техническая поддержка',
      text: [
        {
          value: 'support@visionlabs.ru',
          description: '',
          is_email: true,
        }
      ],
    },
    {
      id: 3,
      name: 'Продажи и Сотрудничество',
      text: [
        {
          value: 'sales@visionlabs.ru',
          description: '',
          is_email: true,
        },
        {
          value: 'partners@visionlabs.ru',
          description: '',
          is_email: true,
        },
        {
          value: '+7 499 399 33 61',
          description: '',
        }
      ],
    },
    {
      id: 4,
      name: 'Пресса\u2028и Карьера',
      text: [
        {
          value: 'pr@visionlabs.ru',
          description: '',
          is_email: true,
        },
        {
          value: 'job@visionlabs.ru',
          description: '',
          is_email: true,
        }
      ],
    },
    {
      id: 5,
      name: 'Новости\u2028компании',
      text: [
        {
          value: 'visionlabs_news',
          description: '',
        }
      ],
    }
  ],
  seo: {
    title: 'Контакты компании VisionLabs: подробная информация',
    description: 'Контакты компании VisionLabs. Наш адрес: 101000, Москва, Подсосенский переулок, д. 23 стр. 3. Телефон: +7 499 399 33 61. Больше подробной информации на сайте.',
    keywords: null,
  },
};
