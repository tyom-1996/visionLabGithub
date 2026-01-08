type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'white-primary-text'
  | 'white-black'
  | 'transparent-primary-text'
  | 'transparent-white'
  | 'transparent-black'
  | 'always-black';

type ButtonProps = {
  variant?: ButtonVariant,
  isDisabled?: boolean,
  isSmallSize?: boolean,
  className?: string,
  onClick?: React.MouseEventHandler<HTMLElement>,
  href?: string,
  svgId?: string,
  svgClassName?: string,
  target?: string,
  rel?: string,
  onMouseEnter?: (e?: React.MouseEvent<HTMLElement>) => void,
  onMouseLeave?: () => void,
  lang?: string,
  type?: 'button' | 'submit' | 'reset',
  id?: string,
  animatedText?: boolean,
  lottieIconId?: string,
};

export type { ButtonProps };
