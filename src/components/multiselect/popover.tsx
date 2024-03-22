import clsx from 'clsx';
import { UseComboboxReturnValue } from 'downshift';
import React from 'react';
import { Option } from './searchQuery';
import { useIntersectionObserver } from 'src/utils/useIntersectionObserver';

type PopoverProps = {
  comboboxProps: UseComboboxReturnValue<Option>;
  items: Option[];
  selectedItems: Option[];
  inputValue: string;
  fetchNextPage: () => Promise<void>;
  isLoading: boolean;
};

//Format character name to get search text bold
function getFormattedCharacterName(inputValue: string, name: string) {
  const trimmedinput = inputValue.trim();
  // Remove whitespace to prevent bugs according to backend
  const boldIndex = name.toLocaleLowerCase().indexOf(trimmedinput.toLowerCase());

  if (name.toLocaleLowerCase().includes(trimmedinput.toLocaleLowerCase())) {
    return (
      <span>
        {name.substring(0, boldIndex)}
        <span className="font-extrabold">
          {name.substring(boldIndex, boldIndex + trimmedinput.length)}
        </span>
        {name.substring(boldIndex + trimmedinput.length)}
      </span>
    );
  } else {
    return <span>{name}</span>;
  }
}

// Empty popover text indicating query state
function getEmptyPopoverText(isLoading: boolean) {
  if (isLoading) {
    return <span>Loading...</span>;
  }
  return <span>No Data Found</span>;
}

export function Popover(props: PopoverProps) {
  const { comboboxProps, items, selectedItems, inputValue, isLoading, fetchNextPage } = props;

  const { isOpen, getMenuProps, highlightedIndex, getItemProps } = comboboxProps;

  // To fetch when last list item intersects
  const ref = useIntersectionObserver(fetchNextPage);

  return (
    <ul
      className={clsx(
        'absolute z-50 w-[500px] border rounded-2xl bg-background text-accent font-medium slide-in-from-top-2 transition overflow-y-scroll mr-[-14px]',
        {
          ['animate-in fade-in-0 max-h-80 opacity-100']: isOpen,
          ['animate-out fade-out-0 max-h-0 opacity-0']: !isOpen
        }
      )}
      {...getMenuProps()}>
      {isOpen &&
        (items.length > 0 ? (
          items.map((item, index) => (
            <li
              className={clsx(
                highlightedIndex === index && 'bg-accent/20 overflow-hidden',
                'py-2 px-3 flex h-16 gap-2 items-center border-y first:border-t-0 last:border-b-0 cursor-pointer'
              )}
              key={`${item.id}${index}`}
              {...getItemProps({ item, index })}>
              <input
                className="size-4"
                type="checkbox"
                checked={selectedItems.includes(item)}
                onChange={() => {}}
              />
              <img className="rounded-lg h-10" src={item.image} />
              <div className="flex flex-col">
                {getFormattedCharacterName(inputValue, item.name)}
                <span className="text-sm text-accent font-medium">
                  {item.episode.length + ' Episodes'}
                </span>
              </div>
            </li>
          ))
        ) : (
          <li className={'py-2 px-3 flex h-16 items-center border rounded-2xl'}>
            {getEmptyPopoverText(isLoading)}
          </li>
        ))}
      <div
        className={clsx('rounded-b-2xl mt-[-8px] opacity-0', { ['opacity-100']: isLoading })}
        ref={ref}>
        <div className="h-1.5 w-full bg-primary/20 overflow-hidden">
          <div className="animate-progress w-full h-full bg-primary/60 origin-left-right"></div>
        </div>
      </div>
    </ul>
  );
}
