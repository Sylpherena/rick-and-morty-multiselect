import { useState } from 'react';
import { Toast } from './toast-list';

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string) => {
    const toast = {
      id: Date.now(),
      message
    };

    setToasts((prevToasts: Toast[]) => [...prevToasts, toast]);

    //Auto-remove of toasts after 5 secs
    setTimeout(() => {
      removeToast(toast.id);
    }, 5000);
  };

  const removeToast = (id: number) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return {
    toasts,
    showToast,
    removeToast
  };
}
