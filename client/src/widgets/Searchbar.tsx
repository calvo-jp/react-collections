import SearchIcon from '@heroicons/react/solid/SearchIcon';
import clsx from 'clsx';
import * as React from 'react';

type BaseProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type SearchbarProps = Omit<BaseProps, 'type' | 'children' | 'onClick'>;

const Searchbar: React.FC<SearchbarProps> = ({
  onBlur,
  onFocus,
  className,
  ...props
}) => {
  const [focused, setFocused] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleMouseEvent = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    switch (e.type) {
      case 'blur':
        onBlur?.(e);
        setFocused(false);
        break;
      case 'focus':
        onFocus?.(e);
        setFocused(true);
        break;
      default:
        break;
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();

    if (inputRef.current) inputRef.current.focus();
  };

  return (
    <div
      className={clsx(
        'flex items-center gap-1 p-2 border border-gray-300 outline-none transition-all duration-300 rounded-md',
        !focused && 'hover:border-gray-400',
        focused && 'border-blue-400 ring-4 ring-blue-200',
        className
      )}
      onClick={handleClick}
    >
      <input
        ref={inputRef}
        type="search"
        onBlur={handleMouseEvent}
        onFocus={handleMouseEvent}
        placeholder="Search"
        className="outline-none w-full pr-2"
        {...props}
      />

      <div className="h-4 my-auto border-l border-gray-200" />

      <button className="px-2" tabIndex={-1}>
        <SearchIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Searchbar;
