import { Button } from "@/components/shared/Button";
import Image from "next/image";
import classNames from "classnames";
import styles from "./styles.module.scss";

type Event = {
  id: number;
  date: string;
  time: string;
  title: string;
  img: string;
};

type Props = {
    event: Event
}

const MediaLink = ({event}: Props) => {
    return <Button href="#" className={styles.contentWrapper}>
        <Image
            src="/content/images/webinar-cover.jpg"
            alt="image"
            title="title"
            height={521}
            width={885}
            quality={100}
            className={styles.image}
        />
        <div className={styles.imageOverlay}>
            <div className={styles.date}>
                {event.date}  {event.time}
            </div>
            <Button
                variant="secondary"
                svgId="arrow-right"
                svgClassName={styles.introBtnDemoSvg}
                href="#"
                className={classNames('button-icon-to-right', styles.linkBtn)}
                animatedText
            >
                Learn&nbsp;more
            </Button>
        </div>
    </Button>
}

export default MediaLink;