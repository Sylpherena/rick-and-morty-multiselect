import {
  Overwrite,
  UseMultipleSelectionGetSelectedItemPropsOptions,
  UseMultipleSelectionGetSelectedItemReturnValue
} from 'downshift';
import { X } from 'lucide-react';
import { Option } from './searchQuery';

export type SelectionBoxProps = {
  index: number;
  selectedItemForRender: Option;
  removeSelectedItem: (item: Option) => void;
  getSelectedItemProps: <Options>(
    options: UseMultipleSelectionGetSelectedItemPropsOptions<Option> & Options
  ) => Omit<
    Overwrite<UseMultipleSelectionGetSelectedItemReturnValue, Options>,
    'selectedItem' | 'index'
  >;
};

export function SelectionBox(props: SelectionBoxProps) {
  const { index, getSelectedItemProps, removeSelectedItem, selectedItemForRender } = props;

  return (
    <span
      className="flex bg-primary/20 rounded-lg px-2 max-w-32 whitespace-nowrap gap-1 py-1"
      {...getSelectedItemProps({
        selectedItem: selectedItemForRender,
        index
      })}>
      <p className="font-medium text-accent truncate">{selectedItemForRender.name}</p>
      <span
        className="px-1 cursor-pointer hover:bg-accent bg-primary h-6 rounded-md w-6 flex items-center"
        onClick={(e) => {
          e.stopPropagation();
          removeSelectedItem(selectedItemForRender);
        }}>
        <X className="text-white" size={24} strokeWidth={3} />
      </span>
    </span>
  );
}
