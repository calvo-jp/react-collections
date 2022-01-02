import Icon from 'widgets/icons/types/icon';

type Size = Required<Icon>['size'];

const sizes: Record<Size, string> = {
  xs: 'w-4 h-4',
  sm: 'w-5 h-5',
  md: 'w-6 h-6',
  lg: 'w-7 h-7',
  xl: 'w-8 h-8',
};

export default sizes;
