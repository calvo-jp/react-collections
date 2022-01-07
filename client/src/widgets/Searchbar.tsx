import SearchIcon from '@heroicons/react/solid/SearchIcon';
import clsx from 'clsx';
import * as React from 'react';

type BaseProps = React.ComponentProps<'input'>;

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
        'flex items-center gap-1 p-2 border outline-none transition-all duration-300 rounded-lg group cursor-text',
        !focused && 'border-gray-200 hover:border-gray-400',
        focused && 'border-blue-400 ring-2 ring-blue-200',
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
        className="outline-none w-full"
        {...props}
      />

      <div className="px-1" tabIndex={-1}>
        <SearchIcon
          className={clsx(
            'w-4 h-4 transition-all duration-300',
            !focused && 'text-gray-400 group-hover:text-gray-500',
            focused && 'text-gray-500'
          )}
        />
      </div>
    </div>
  );
};

export default Searchbar;
