import React from 'react';

export function useDebounce(input: string, timeout: number = 500) {
  const [debouncedInput, setDebouncedInput] = React.useState('');

  // To get and set debounced input, default 500ms
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (input !== debouncedInput) {
        setDebouncedInput(input);
      }
    }, timeout);

    return () => clearTimeout(timeoutId);
  }, [input, timeout]);

  return debouncedInput;
}
