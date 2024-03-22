import { ErrorToast } from './error-toast';

export type Toast = {
  message: string;
  id: number;
};

type ErrorToastProps = {
  toasts: Toast[];
  removeToast: (id: number) => void;
};

export function ToastList(props: ErrorToastProps) {
  const { toasts, removeToast } = props;

  if (toasts.length > 0) {
    return (
      <div className="flex flex-col gap-2 top-0 right-0 absolute mt-4 z-50" aria-live="assertive">
        {toasts.map((toast) => (
          <ErrorToast
            key={toast.id}
            errorText={toast.message}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    );
  }
  return null;
}
