import clsx from 'clsx';
import * as React from 'react';
import SearchIcon from './icons/Search';

type BaseProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type SearchbarProps = Omit<BaseProps, 'type' | 'children' | 'onClick'>;

const Searchbar: React.FC<SearchbarProps> = ({
  className,
  onFocus,
  onBlur,
  ...props
}) => {
  const [focused, setFocused] = React.useState(false);

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setFocused(true);

    if (!!onFocus) onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    setFocused(false);

    if (!!onBlur) onBlur(e);
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
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder="Search"
        className="outline-none w-full pr-2"
        {...props}
      />

      <div className="h-4 my-auto border-l border-gray-200" />

      <button className="px-2" tabIndex={-1}>
        <SearchIcon className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Searchbar;
