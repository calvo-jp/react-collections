type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface Icon extends React.SVGProps<SVGSVGElement> {
  size?: Size;
  width?: number;
  height?: number;
}

export default Icon;
