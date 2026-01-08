import { ComplianceType } from '@/types/components/compliance';

export const COMPLIANCE_MOCK: ComplianceType = {
  contacts: [
    {
      name: 'Email',
      value: 'external.hotline.mts@b1.ru',
      is_email: true,
    },
    {
      name: 'Бесплатный номер для звонков по&nbsp;России',
      value: '8 800 234 44 18',
      is_phone: true,
    },
    {
      name: 'Для бесплатных звонков из-за границы смотрите инструкцию на&nbsp;сайте, там&nbsp;же можно отправить обращение через форму обратной связи',
      value: 'hotline-mts.b1.ru',
      is_site: true,
    }
  ],
  documents: [
    {
      name: 'Кодекс делового поведения и этики',
      elements: [
        {
          name: 'Кодекс делового поведения и этики',
          path: '/content/files/test-tutorial.pdf',
          file_size: '2.3 Мб',
        },
        {
          name: 'Code of Business Conduct and Ethics',
          path: '/content/files/test-tutorial.pdf',
          file_size: '2.3 Мб',
        }
      ],
    },
    {
      name: 'Политика "Соблюдение антикоррупционного законодательства"',
      elements: [
        {
          name: 'Cоблюдение антикоррупционного законодательства',
          path: '/content/files/test-tutorial.pdf',
          file_size: '2.3 Мб',
        },
        {
          name: 'Compliance with Anti-Corruption Legislation',
          path: '/content/files/test-tutorial.pdf',
          file_size: '2.3 Мб',
        }
      ],
    },
    {
      name: 'Политика "Управление конфликтом интересов"',
      elements: [
        {
          name: 'Памятка по управлению конфликтом интересов',
          path: '/content/files/test-tutorial.pdf',
          file_size: '2.3 Мб',
        },
        {
          name: 'Conflict of Interest Handbook',
          path: '/content/files/test-tutorial.pdf',
          file_size: '2.3 Мб',
        }
      ],
    },
    {
      name: 'Кодекс делового поведения контрагента',
      elements: [
        {
          name: 'Кодекс делового поведения контрагента',
          path: '/content/files/test-tutorial.pdf',
          file_size: '2.3 Мб',
        },
        {
          name: 'Counterparty code of Business Conduct',
          path: '/content/files/test-tutorial.pdf',
          file_size: '2.3 Мб',
        }
      ],
    },
    {
      name: 'Антикоррупционная оговорка',
      elements: [
        {
          name: 'Антикоррупционная оговорка',
          path: '/content/files/test-tutorial.pdf',
          file_size: '2.3 Мб',
        },
        {
          name: 'Anti-corruption clause',
          path: '/content/files/test-tutorial.pdf',
          file_size: '2.3 Мб',
        }
      ],
    },
    {
      name: 'Сводная ведомость результатов проведения специальной оценки условий труда',
      elements: [
        {
          name: 'Сводная ведомость результатов проведения специальной оценки условий труда',
          path: '/content/files/test-tutorial.pdf',
          file_size: '2.3 Мб',
        }
      ],
    },
    {
      name: 'Ответственное использование',
      elements: [
        {
          name: 'Ответственное использование',
          path: '/content/files/test-tutorial.pdf',
          file_size: '2.3 Мб',
        }
      ],
    }
  ],
  misc: {
    text: 'Искусственный интеллект становится знамением времени, что накладывает дополнительную ответственность на VisionLabs, ведь наша деятельность может отражаться на экономическом, социальном и информационном развитии страны. Инновации, которые мы предлагаем для повышения эффективности бизнеса, открывают не только новые деловые возможности, но и содержат в себе определенные риски.',
    subtext: 'Именно поэтому мы соблюдаем применимое антикоррупционное законодательство, законодательство РФ и других стран, внутренние нормативные документы, ведем бизнес этично, берем на себя ответственность за последствия принимаемых решений и придерживаемся принципов, изложенных в Кодексе делового поведения и этики Компании, а также в Кодексе этики в сфере Искусственного Интеллекта: гуманистический подход, отсутствие дискриминации, безопасная работа с данными, идентификация ИИ и уважение свободы воли человека.',
    email: 'compliance@mts.ai',
    contacts_text: 'По&nbsp;вопросам в&nbsp;области комплаенса и&nbsp;деловой этики пишите на&nbsp;',
    hotline_title: 'Единая горячая линия группы МТС',
    hotline_text: 'Вы&nbsp;также можете сообщить о&nbsp;нарушении на&nbsp;единую горячую линию группы МТС',
    secondary_text: 'Единую горячую линию поддерживает независимая третья сторона.<br /><br /> Мы&nbsp;гарантируем конфиденциальность и&nbsp;неразглашение персональных данных и&nbsp;не&nbsp;допускаем ответных действий в&nbsp;отношении тех, кто сообщил о&nbsp;нарушении. Рассказать о&nbsp;нарушении можно и&nbsp;анонимно. Нельзя умышленно предоставлять ложную или вводящую в&nbsp;заблуждение информацию.',
  },
};
