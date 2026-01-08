import ImageWithStackedCards from '@/components/sections/ImageWithStackedCards';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import styles from './styles.module.scss';
import { UseMockImage } from '@/types/components';
import { cleanHTML } from '@/utils/helpers';

type SolvingProblemsProps = {
  title?: string;
  titleLabel: string | number,
  solving: UseMockImage & {
    image?: string,
    alt?: string,
    title?: string,
    lottie_file?: string,
    parsedLottieFile?: unknown,
    list: {
      name: string,
      description: string,
    }[],
  }
};

const SolvingList = ({ list }: { list: SolvingProblemsProps['solving']['list'] }) => {
  return (
    <div className={styles.solvingList}>
      {list.map((element, index) => (
        <div key={element.name + index} className={styles.solvingWrapper}>
          <div className={styles.solvingDescription} dangerouslySetInnerHTML={{ __html: cleanHTML(element.description) }}/>
          <div className={styles.solvingName}>{element.name}</div>
        </div>
      ))}
    </div>
  );
};

const SolvingProblems = ({ titleLabel, solving, title }: SolvingProblemsProps) => {
  const { image, alt, title: imageTitle, lottie_file: lottiePath, parsedLottieFile, list } = solving;

  return (
    <ImageWithStackedCards
      title={title || 'Tasks Solved'}
      titleLabel={titleLabel}
      image={image}
      imageAlt={alt}
      imageTitle={imageTitle}
      content={<SolvingList list={list} />}
      isUseMockImage={solving?.isUseMockImage}
      lottiePath={lottiePath}
      parsedLottieFile={parsedLottieFile}
    />
  );
};

export default withErrorBoundary(SolvingProblems);
