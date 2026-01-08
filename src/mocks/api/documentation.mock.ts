import { DocumentationPageType } from '@/types/components/documentation';

const elements = [
  {
    name: 'Описание функциональных характеристик программного обеспечения',
    path: '/content/files/test-tutorial.pdf',
    file_size: '2.3 Мб',
  },
  {
    name: 'Инструкция по установке',
    path: '/content/files/test-tutorial.pdf',
    file_size: '186.1 Кб',
  },
  {
    name: 'Описание процессов, обеспечивающих поддержание жизненного цикла ПО',
    path: '/content/files/test-tutorial.pdf',
    file_size: '418.3 Кб',
  },
  {
    name: 'Информация о стоимости ПО',
    path: '/content/files/test-tutorial.pdf',
    file_size: '156.8 Мб',
  },
  {
    name: 'Инструкция по эксплуатации',
    path: '/content/files/test-tutorial.pdf',
    file_size: '8.2 Кб',
  }
];

export const DOCUMENTATION_MOCK: DocumentationPageType = {
  heading_text: 'Актуальная версия документации предоставляется по запросу. Размещенная ниже документация актуальна на дату размещения',
  documentation: [
    {
      name: 'Технологии',
      children: [
        {
          name: 'Access Control Server',
          elements,
        },
        {
          name: 'Terminal',
          elements,
        },
        {
          name: 'Face Stream',
          elements,
        },
        {
          name: 'Access Control',
          elements,
        }
      ],
    },
    {
      name: 'Продукты',
      children: [
        {
          name: 'LUNA PASS',
          elements,
        },
        {
          name: 'LUNA CARS API',
          elements,
        },
        {
          name: 'LUNA VECTOR ID',
          elements,
        },
        {
          name: 'LUNA VMS 2.0',
          elements,
        },
        {
          name: 'LUNA CARS Analytics',
          elements,
        },
        {
          name: 'LUNA VMS',
          elements,
        },
        {
          name: 'LUNA ID',
          elements,
        },
        {
          name: 'LUNA KIOSK',
          elements,
        },
        {
          name: 'LUNA CLEMENTINE 2.0',
          elements,
        },
        {
          name: 'LUNA CARS Stream',
          elements,
        },
        {
          name: 'Luna Access',
          elements,
        }
      ],
    },
    {
      name: 'Платформа',
      children: [
        {
          name: 'Access Control Server 2',
          elements,
        },
        {
          name: 'Terminal 2',
          elements,
        },
        {
          name: 'Face Stream 2',
          elements,
        },
        {
          name: 'Access Control 2',
          elements,
        }
      ],
    },
    {
      name: 'Ядро',
      children: [
        {
          name: 'Access Control Server 3',
          elements,
        },
        {
          name: 'Terminal 3',
          elements,
        },
        {
          name: 'Face Stream 3',
          elements,
        },
        {
          name: 'Access Control 3',
          elements,
        }
      ],
    },
    {
      name: 'Прочие документы',
      children: [
        {
          name: 'Access Control Server 4',
          elements,
        },
        {
          name: 'Terminal 4',
          elements,
        },
        {
          name: 'Face Stream 4',
          elements,
        },
        {
          name: 'Access Control 4',
          elements,
        }
      ],
    }
  ],
};
