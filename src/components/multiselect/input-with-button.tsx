import { UseComboboxReturnValue } from 'downshift';
import { Loader2, Triangle } from 'lucide-react';
import { Option } from './searchQuery';

type InputWithButtonProps = {
  comboboxProps: UseComboboxReturnValue<Option>;
  isLoading: boolean;
};

export function InputWithButton(props: InputWithButtonProps) {
  const { comboboxProps, isLoading } = props;

  const { getToggleButtonProps, getInputProps } = comboboxProps;

  return (
    <div className="flex gap-0.5 grow">
      <input
        placeholder="Search Ricks&Mortys!"
        className="w-full focus-visible:outline-none placeholder-shown:truncate"
        {...getInputProps()}
      />
      {isLoading && <Loader2 className="text-primary animate-spin" />}
      <button
        aria-label="toggle menu"
        className="flex items-center justify-center px-2"
        type="button"
        {...getToggleButtonProps()}>
        <Triangle className="rotate-180" fill={'hsl(var(--accent))'} strokeWidth={0} size={18} />
      </button>
    </div>
  );
}
