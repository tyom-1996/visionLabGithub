'use client';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import { UseMockImage } from '@/types/components';
import styles from './styles.module.scss';
import { useState } from 'react';
import MediaLink from './MediaLink';

type Event = {
  id: number;
  date: string;
  time: string;
  title: string;
  img: string;
};

type Props = UseMockImage & {
  title: string;
  titleLabel: string | number;
  newEvents: Event[];
};

const NewEventLink = (props: Props) => {
  const {
    titleLabel,
    newEvents,
  } = props;

  const [active, setActive] = useState(0);
  const activeEvent = newEvents[active];

  return (
    <section className={styles.wrapper}>
      <div className={styles.selector}>
        <div className={styles.buttons}>
          <button onClick={() => setActive(0)} className={active === 0 ? styles.btnActive : styles.btnNotActive}>Вебинары</button>
          <button onClick={() => setActive(1)} className={active === 1 ? styles.btnActive : styles.btnNotActive}>Конференции</button>
        </div>
      </div>
      <div className={styles.activeContent}>
        <div className={styles.titleWrapper}>
          <p className={styles.label}>{titleLabel}</p>
          <h3 className={styles.title}>
            {activeEvent.title}
          </h3>
        </div>
        <MediaLink event={activeEvent} />
      </div>
    </section>
  );
};

export default withErrorBoundary(NewEventLink);
