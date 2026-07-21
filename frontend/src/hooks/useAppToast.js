import { toast } from 'sonner';

export const useAppToast = () => {
  return {
    success: (title, description) => toast.success(title, { description }),
    error: (title, description) => toast.error(title, { description }),
    warning: (title, description) => toast.warning(title, { description }),
    info: (title, description) => toast.info(title, { description }),
    // future-proofing options if needed
    custom: (message, options) => toast(message, options),
  };
};
