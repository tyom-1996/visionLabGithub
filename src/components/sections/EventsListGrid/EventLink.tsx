import { Button } from "@/components/shared/Button";
import Image from "next/image";
import styles from './styles.module.scss';
import classNames from "classnames";

type WebinarItem = {
  id: number;
  date: string;
  time: string;
  title: string;
  img: string;
};

type Props = {
    event: WebinarItem;
}

const EventLink = ({ event }: Props) => {
  return (
    <div>
      <Button href={`/events/${event.id}`} className={styles.linkWrapper}>
        <Image
          src={event.img}
          alt={event.title}
          title={event.title}
          height={443}
          width={430}
          quality={100}
          className={styles.image}
        />
        <div className={styles.imageOverlay}>
          <p className={styles.date}>{event.date}/{event.time}</p>
          <h3 className={styles.linkTitle}>
            {event.title}
          </h3>
        </div>
      </Button>
    </div>
  );
}

export default EventLink;