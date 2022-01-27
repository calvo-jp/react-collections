import SearchIcon from '@heroicons/react/outline/SearchIcon';
import CloseIcon from '@heroicons/react/outline/XIcon';
import clsx from 'clsx';
import * as React from 'react';

interface SearchbarProps {
  /** decrease ring size from 4 to 2 */
  outline?: 'sm';

  /** adds a clear textfield option */
  onReset?: () => void;
}

const Searchbar: React.FC<SearchbarProps & React.ComponentProps<'input'>> = ({
  onBlur,
  onFocus,
  onReset,
  onChange,
  className,
  outline,
  ...props
}) => {
  const [empty, setEmpty] = React.useState(!props.value);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmpty(!e.target.value);
    onChange?.(e);
  };

  React.useEffect(() => {
    setEmpty(!props.value);
    return () => setEmpty(true);
  }, [props.value]);

  return (
    <div
      className={clsx(
        'flex items-center gap-1 p-1.5 border outline-none transition-all duration-300 rounded-xl group cursor-text',
        !focused && 'border-gray-200 hover:border-gray-400',
        focused && 'border-blue-400 ring-blue-200',
        focused && !outline && 'ring-4',
        focused && outline && 'ring-2',
        className
      )}
      onClick={handleClick}
    >
      <div className="mx-0.5" tabIndex={-1}>
        <SearchIcon
          className={clsx(
            'w-4 h-4 transition-all duration-300',
            !focused && 'text-gray-400 group-hover:text-gray-500',
            focused && 'text-gray-500'
          )}
        />
      </div>
      <input
        ref={inputRef}
        type="search"
        onBlur={handleMouseEvent}
        onFocus={handleMouseEvent}
        onChange={handleChange}
        className="outline-none w-full"
        placeholder="Search recipes"
        {...props}
      />

      {onReset && !empty && (
        <button type="button" className="mr-1" onClick={onReset}>
          <CloseIcon className="w-4 h-4 text-gray-400" />
        </button>
      )}
    </div>
  );
};

export default Searchbar;
