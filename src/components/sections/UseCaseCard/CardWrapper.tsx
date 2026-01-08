import { getFile } from '@/api';
import UseCaseCard from '.';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import { UseCaseType } from '@/types/components/useCases';

const UseCaseCardWrapper = async ({ card }: { card: UseCaseType }) => {
  const lottieFile = await getFile(card.lottie_file);

  return <UseCaseCard card={card} lottieFile={lottieFile} />;
};

export default withErrorBoundary(UseCaseCardWrapper);
