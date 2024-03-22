import { AlertCircle, X } from 'lucide-react';

type ErrorToastProps = {
  errorText: string;
  onClose: () => void;
};

export function ErrorToast(props: ErrorToastProps) {
  const { errorText, onClose } = props;

  return (
    <div
      className="flex p-2 bg-destructive text-background opacity-75 hover:opacity-100 shadow-md gap-4 rounded-2xl lide-in-from-top-2 transition"
      role="alert">
      <div className="flex gap-4">
        <AlertCircle />
        <p>{errorText}</p>
      </div>
      <button className="flex hover:bg-background/20 rounded-md" onClick={onClose}>
        <X className="text-white" />
      </button>
    </div>
  );
}
