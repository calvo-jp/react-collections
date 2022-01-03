type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface Icon extends React.SVGProps<SVGSVGElement> {
  size?: Size;
}

export default Icon;
