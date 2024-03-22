import { useCombobox, useMultipleSelection } from 'downshift';
import React, { useCallback } from 'react';
import { Popover } from './popover';
import { SelectionBox } from './selection-box';
import { InputWithButton } from './input-with-button';
import { Option, searchByInput } from './searchQuery';
import { usePaginatedFetch } from 'src/utils/usePaginatedFetch';
import { useDebounce } from 'src/utils/useDebounce';

type MultiSelectProps = {
  onError: (errorMessage: string) => void;
};

export function MultiSelect(props: MultiSelectProps) {
  const { onError } = props;

  const [inputValue, setInputValue] = React.useState(''); //Textfield input value

  const [selectedItems, setSelectedItems] = React.useState<Option[]>([]); //Selected values by user

  const debouncedInputValue = useDebounce(inputValue); //Debounced input value to prevent continuous backend call

  //Paginated Infinite Fetch Hook
  const {
    isLoading,
    results: items,
    fetchNextPage
  } = usePaginatedFetch({
    fetchQuery: useCallback(
      (page: number, controller: AbortController) =>
        searchByInput(debouncedInputValue, page, controller, onError),
      [debouncedInputValue]
    ),
    dependencies: [debouncedInputValue]
  });

  //Downshift useMultipleSelection hook for accesibility with selection-boxes (Selection tags on input)
  const { getDropdownProps, removeSelectedItem, getSelectedItemProps } = useMultipleSelection({
    selectedItems,
    onStateChange({ selectedItems: newSelectedItems, type }) {
      switch (type) {
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.SelectedItemKeyDownDelete:
        case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
        case useMultipleSelection.stateChangeTypes.FunctionRemoveSelectedItem:
          setSelectedItems(newSelectedItems ?? []);
          break;
        default:
          break;
      }
    }
  });

  //Downshift useCombobox hook for accesibility with combobox (Dropdown items)
  const comboboxProps = useCombobox({
    items: items ?? [],
    defaultHighlightedIndex: 0, // Highlights the first item.
    inputValue,
    onStateChange({ inputValue: newInputValue, type, selectedItem: newSelectedItem }) {
      switch (type) {
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (newSelectedItem) {
            //Selected item add logic
            if (!selectedItems.includes(newSelectedItem)) {
              setSelectedItems([...selectedItems, newSelectedItem]);
              setInputValue('');
            } else {
              //Selected item remove logic
              const indexOfUnselectedItem = selectedItems.findIndex(
                (selectedItem) => selectedItem === newSelectedItem
              );

              const newItemsAfterUnselect = [...selectedItems];
              newItemsAfterUnselect.splice(indexOfUnselectedItem, 1);

              setSelectedItems(newItemsAfterUnselect);
              setInputValue('');
            }
          }
          break;

        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(newInputValue ?? '');

          break;
        default:
          break;
      }
    }
  });

  return (
    <div className="w-[500px] h-10" {...getDropdownProps({ preventKeyAction: false })}>
      <div className="w-full shadow-md bg-background gap-2 items-center flex flex-nowrap py-2 px-1 border-2 rounded-xl h-full mb-3">
        {selectedItems.map((selectedItemForRender, index) => {
          //Show only 2 selection boxes
          if (index < 2) {
            return (
              <SelectionBox
                key={`selected-item-${index}`}
                selectedItemForRender={selectedItemForRender}
                index={index}
                removeSelectedItem={removeSelectedItem}
                getSelectedItemProps={getSelectedItemProps}
              />
            );
          }
        })}
        {
          //To show how many other selections exist
          selectedItems.length > 2 && (
            <p className="text-nowrap text-accent font-bold">+ {selectedItems.length - 2}</p>
          )
        }
        <InputWithButton comboboxProps={comboboxProps} isLoading={isLoading} />
      </div>
      <Popover
        fetchNextPage={fetchNextPage}
        comboboxProps={comboboxProps}
        items={items ?? []}
        selectedItems={selectedItems}
        inputValue={debouncedInputValue}
        isLoading={isLoading}
      />
    </div>
  );
}
