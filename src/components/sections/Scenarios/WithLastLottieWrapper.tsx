'use server';

import { getFile } from '@/api';
import withErrorBoundary from '@/hocs/withErrorBoundary';
import { UseCaseType } from '@/types/components/useCases';
import Scenarios from '.';

const WithLastLottieWrapper = async ({ useCases, titleLabel }: { useCases: UseCaseType[], titleLabel?: string }) => {
  const lottieFile = await getFile(useCases[useCases.length - 1].lottie_file);

  return <Scenarios useCases={useCases} lastLottieFile={lottieFile} titleLabel={titleLabel}/>;
};

export const ScenariosWithLastLottieWrapper = withErrorBoundary(WithLastLottieWrapper);
