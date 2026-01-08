import styles from './page.module.scss';
import AdvancedTextBlock from '@/components/shared/AdvancedTextBlock';
import Questions from '@/components/sections/Questions';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { allEvents } from '../data';
import { getQuestionsData } from '@/api/questions';
import { Button } from '@/components/shared/Button';
import RegisterIcon from '../../../../public/content/icons/registerIcon';
import SpeakersSlider from '@/components/sections/SpeakersSlider';
import WebinarProgram from '@/components/sections/WebinarProgram';
import RightArrowIcon from '../../../../public/content/icons/rightArrow';
import type { CSSProperties } from 'react';
import OtherEvents from '@/components/sections/OtherEvents';
import ScrollToAnchorButton from './ScrollToAnchorButton';
import HeaderElements from '@/components/shared/HeaderElements';

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateStaticParams() {
  return allEvents.map((event) => ({
    id: event.id.toString(),
  }));
}

const EventDetailsPage = async ({ params }: Params) => {
  const { id } = await params;
  const eventId = Number(id);
  const event = allEvents.find((item) => item.id === eventId);
  const questionsData = await getQuestionsData('about-us');
  const staticTitle = 'Технологии для бизнеса 2025-2030';
  const staticDate = '15.05.2025';
  const staticTime = '14:00 - 17:00';
  const staticDescription = 'Почему большие языковые модели набирают популярность? Почему ИИ — это про маркетинг? Как правильно называть ИИ? Что определяет использование информационных технологий? Как внедряют технологии искусственного интеллекта на промышленных предприятиях? А в ресторанном бизнесе? Почему 75 % используют ИИ, но не достигают своих первоначальных целей?';
  const baseSpeakers = [
    {
      id: 1,
      name: 'КИРИЛЛОВ Иван Дамидович',
      role: 'CEO «РусГидро»',
      company: '',
      image: '/content/images/speaker_img1.png',
    },
    {
      id: 2,
      name: 'МИХАЙЛОВ Александр Гиднев',
      role: 'Менеджер по продажам ООО «Стальные линии»',
      company: '',
      image: '/content/images/speaker_img2.png',
    },
    {
      id: 3,
      name: 'КИРИЛЛОВ Иван Дамидович',
      role: 'CEO «РусГидро»',
      company: '',
      image: '/content/images/speaker_img1.png',
    },
    {
      id: 4,
      name: 'МИХАЙЛОВ Александр Гиднев',
      role: 'Менеджер по продажам ООО «Стальные линии»',
      company: '',
      image: '/content/images/speaker_img2.png',
    },
  ];
  const speakers = [
    ...baseSpeakers,
    ...baseSpeakers.map((speaker, idx) => ({
      ...speaker,
      id: `dup-${idx}`,
    })),
  ];

  const program = [
    {
      id: 1,
      order: '01',
      time: '14:00',
      title: 'Знакомство',
      items: [
        'Приветствие участников',
        'Краткий обзор тем встречи',
      ],
    },
    {
      id: 2,
      order: '02',
      time: '14:10',
      title: 'Цели и стратегии',
      items: [
        'Обзор целей и программы вебинара',
        'Основная тема: теоретическая часть',
        'Практические примеры и кейсы',
        'Ответы на вопросы и обсуждение',
        'Итоги и ключевые выводы',
        'Рекомендации и дальнейшие шаги для участников',
      ],
    },
    {
      id: 3,
      order: '03',
      time: '14:25',
      title: 'Ритейл',
      items: [
        'Сценарии внедрения ИИ в офлайн и онлайн-магазинах',
        'Антифрод и персонализация на витрине',
      ],
    },
    {
      id: 4,
      order: '04',
      time: '14:50',
      title: 'Новинки 2025',
      items: [
        'Ключевые тренды по компьютерному зрению',
        'Что меняется в требованиях к ML-моделям',
      ],
    },
    {
      id: 5,
      order: '05',
      time: '15:10',
      title: 'Завершение',
      items: [
        'Резюме и выводы',
        'Ответы на вопросы участников',
      ],
    },
  ];

  const audience = [
    {
      id: 1,
      title: 'Руководителям и владельцам бизнеса',
      description: 'Узнайте как повысить рентабельность уже купленных GPU',
    },
    {
      id: 2,
      title: 'ИТ-руководителям и менеджерам',
      description: 'Узнайте как точнее планировать SLA и сроки выполнения задач',
    },
    {
      id: 3,
      title: 'Руководителям и владельцам бизнеса',
      description: 'Узнайте как повысить рентабельность уже купленных GPU',
    },
    {
      id: 4,
      title: 'ИТ-руководителям и менеджерам',
      description: 'Узнайте как точнее планировать SLA и сроки выполнения задач',
    },
  ];

  // Duplicate events to ensure the slider has plenty of slides to loop through
  const otherEventsImages = [
    '/content/images/other_events_img1.png',
    '/content/images/other_events_img2.png',
    '/content/images/other_events_img3.png',
  ];

  // Ensure priority ordering in "Другие события":
  // 1) "Вебинар: ChaLearn Face Anti-spoofing Attack Detection Challenge"
  // 2) "Вебинар на тему: ChaLearn Face Anti-spoofing Attack Detection Challenge"
  // 3) "Уникальная конференция от VisionLabs и Q-Systems"
  // 4) Any other events
  const chaLearnPrimary = allEvents.find((item) =>
    item.title.includes('Вебинар: ChaLearn Face Anti-spoofing Attack Detection Challenge')
  );
  const chaLearnSecondary = allEvents.find((item) =>
    item.title.includes('Вебинар на тему: ChaLearn Face Anti-spoofing Attack Detection Challenge')
  );
  const visionConfEvent = allEvents.find((item) =>
    item.title.includes('Уникальная конференция от VisionLabs и Q-Systems')
  );

  const orderedEvents: typeof allEvents = [];
  const addedIds = new Set<number>();
  const pushIf = (event?: typeof allEvents[number]) => {
    if (event && !addedIds.has(event.id)) {
      orderedEvents.push(event);
      addedIds.add(event.id);
    }
  };

  pushIf(chaLearnPrimary);
  pushIf(chaLearnSecondary);
  pushIf(visionConfEvent);
  allEvents.forEach((event) => pushIf(event));

  const otherEvents = Array.from(
    { length: Math.max(10, orderedEvents.length) },
    (_, idx) => {
      const base = orderedEvents[idx % orderedEvents.length];
      return {
        ...base,
        id: base.id * 1000 + idx, // keep ids unique for React keys
        img: otherEventsImages[idx % otherEventsImages.length],
      };
    }
  );

  const questionsWrapperStyle: CSSProperties & { '--gap-size': string } = {
    // Ensure no inherited gap is applied to Questions block on this page
    '--gap-size': '0px',
    marginTop: 0,
    paddingTop: 0,
  };

  // const headerImageData = {
  //   src: event?.img || '/content/images/banner_img.png',
  //   alt: event?.title || 'Вебинар VisionLabs',
  //   title: event?.title || 'Вебинар VisionLabs',
  // };

  if (!event) {
    notFound();
  }

  return (
    <div className={styles.eventWrapper}>
      <div className="header-block">
        <AdvancedTextBlock
          title={staticTitle}
          // titleVariant="h1"
          // description={`${staticDate} • ${staticTime}`}
          // descriptionVariant="md"
          isLabelInParentheses
        />
        {/* Sentinel so layout header can observe this page like others */}
        <div data-menu-visibility style={{ height: 1 }} aria-hidden />
      </div>

      <section className={styles.bannerSection}>
        <div className={styles.bannerImageWrapper}>
          <Image
            src="/content/images/banner_img.png"
            alt="Вебинар VisionLabs"
            title="Вебинар VisionLabs"
            fill
            priority
            sizes="100vw"
            className={styles.bannerImage}
          />
        </div>
        <div className={styles.bannerButtonParent}>
          <ScrollToAnchorButton targetId="registrationSection" className={styles.bannerButton}>
            Зарегистрироваться
            <RegisterIcon />
          </ScrollToAnchorButton>
        </div>
      </section>

      <section className={styles.detailsSection}>
        <div className={styles.detailsLabel}>
          <span>Вебинар</span>
        </div>
        <div className={styles.detailsContent}>
          <h1 className={styles.detailsTitle}>{staticTitle}</h1>
          <div className={styles.detailsMeta}>
            <div>
              <p className={styles.metaCaption}>Дата</p>
              <p className={styles.metaHighlight}>{staticDate}</p>
            </div>
            <div>
              <p className={styles.metaCaption}>Время</p>
              <p className={styles.metaHighlight}>{staticTime}</p>
            </div>
          </div>
          <p className={styles.detailsDescription}>
            {staticDescription}
          </p>
        </div>
      </section>

      <section className={styles.videoSection}>
        <div className={styles.videoLabel}>Видео-трансляция</div>
        <div className={styles.videoCard}>
          <Image
            src="/content/images/video_img.png"
            alt="Видео трансляция"
            title="Видео трансляция"
            fill
            priority
            sizes="100vw"
            className={styles.videoImage}
          />
          <div className={styles.videoOverlay}>
            <div className={styles.videoButton}>
              <span>Смотреть вебинар</span>
              <span className={styles.videoArrow}>
                <RightArrowIcon/>
              </span>
            </div>
            <div className={styles.videoTitle}>
              <p>
                Технологии для бизнеса 2025–2030
              </p>
              
            </div>
          </div>
        </div>
      </section>

      <SpeakersSlider speakers={speakers} />

      <WebinarProgram
        items={program}
        expandedId={2}
        classes={{
          section: styles.programSection,
          heading: styles.programHeading,
          headingWrapper: styles.programHeading,
          grid: styles.programGrid,
          webinarProgramWrapper: styles.webinarProgramWrapper,
          times: styles.programTimes,
          timeRow: styles.programTimeRow,
          order: styles.programOrder,
          time: styles.programTime,
          list: styles.programList,
          item: styles.programItem,
          itemHeader: styles.programItemHeader,
          title: styles.programTitle,
          toggle: styles.programToggle,
          bullets: styles.programBullets,
        }}
      />

      <section className={styles.audienceSection}>
        <div className={styles.audienceHeading}>Для кого</div>
        <div className={styles.audienceGrid}>
          {audience.map((item) => (
            <div key={item.id} className={styles.audienceCard}>
              <h3 className={styles.audienceTitle}>{item.title}</h3>
              <p className={styles.audienceText}>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.registrationSection} id="registrationSection">
        <div className={styles.registrationHeading}>
          <p className={styles.registrationHeadingTitle}>Форма регистрации</p>
          <p className={styles.registrationNote}>* — обязательные поля</p>
        </div>
        <form className={styles.registrationForm}>
          <div className={styles.formRow}>
            <input className={styles.input} type="text" name="firstName" placeholder="Имя*" required />
            <input className={styles.input} type="text" name="lastName" placeholder="Фамилия" />
          </div>
          <div className={styles.formRow}>
            <input className={styles.input} type="text" name="company" placeholder="Компания" />
          </div>
          <div className={styles.formRow}>
            <input className={styles.input} type="text" name="position" placeholder="Должность" />
          </div>
          <div className={styles.formRow}>
            <input className={styles.input} type="email" name="email" placeholder="E-mail*" required />
          </div>
          <div className={styles.formRow}>
            <textarea className={styles.textarea} name="comment" placeholder="Комментарий" rows={1}></textarea>
          </div>
          <div className={styles.checkboxes}>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="agree" />
              <span>Нажимая кнопку «Зарегистрироваться», я даю согласие на обработку персональных данных</span>
            </label>
            <label className={styles.checkboxLabel}>
              <input type="checkbox" name="ads" />
              <span>Согласие на получение рекламной информации</span>
            </label>
          </div>
          <button type="submit" className={styles.submitBtn}>
            Зарегистрироваться
            <RightArrowIcon/>
          </button>
        </form>
      </section>

      <OtherEvents events={otherEvents} />

      <div style={questionsWrapperStyle}>
        <Questions
          variantPaddingTop="zero"
          title={questionsData?.title}
          description={questionsData?.description}
        />
      </div>
    </div>
  );
};

export default EventDetailsPage;

