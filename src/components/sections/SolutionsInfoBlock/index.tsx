import AdvancedTextBlock from '@/components/shared/AdvancedTextBlock';

const SolutionsInfoBlock = ({ description }: { description: string }) => {
  const LABEL = 'Solutions for any industry';
  const DESCRIPTION = 'Our technologies are used by banks, shops, schools, hospitals, construction sites, and industrial plants';

  return (
    <AdvancedTextBlock
      descriptionLabel={LABEL}
      description={description || DESCRIPTION}
      descriptionVariant="lg"
      isDecorateBlockShow
    />
  );
};

export default SolutionsInfoBlock;
