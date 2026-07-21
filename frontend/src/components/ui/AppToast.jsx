import { Toaster } from 'sonner';

export default function AppToast() {
  return (
    <Toaster
      position="top-center"
      richColors
      closeButton
      duration={3000}
      theme="light"
      toastOptions={{
        className: 'font-inter shadow-lg border border-gray-100 rounded-xl',
      }}
    />
  );
}
