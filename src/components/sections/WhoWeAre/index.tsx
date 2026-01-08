import AdvancedTextBlock from '@/components/shared/AdvancedTextBlock';

const WhoWeAre = ({ description }: { description?: string }) => {
  const LABEL = 'Our Customers';
  const DESCRIPTION = 'VisionLabs technologies are used by both businesses and government agencies around the globe';

  return (
    <AdvancedTextBlock
      descriptionLabel={LABEL}
      description={description || DESCRIPTION}
      descriptionVariant="lg"
      isDecorateBlockShow
    />
  );
};

export default WhoWeAre;
