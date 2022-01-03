type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

type StringOrNumber = string | number;

interface Icon extends React.SVGProps<SVGSVGElement> {
  size?: Size;
  width?: StringOrNumber;
  height?: StringOrNumber;
}

export default Icon;
