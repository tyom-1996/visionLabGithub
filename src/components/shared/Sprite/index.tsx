import { SVGProps } from 'react';

interface Props extends SVGProps<SVGSVGElement> {
  svgId: string,
}

const Sprite = ({ svgId, ...rest }: Props) => {
  return (
    <svg {...rest}>
      <use xlinkHref={`/sprite.svg#${svgId}`} />
    </svg>
  );
};

export default Sprite;
