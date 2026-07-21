import { create } from 'zustand';

export const useConfirmStore = create((set) => ({
  isOpen: false,
  options: {
    title: "",
    description: "",
    variant: "primary", // primary | danger | warning | info
    size: "sm", // sm | md | lg
    confirmText: "Confirm",
    cancelText: "Cancel",
  },
  resolve: null,
  isConfirming: false,

  confirm: (options) => 
    new Promise((resolve) => {
      set({ 
        isOpen: true, 
        options: { 
          title: options.title || "",
          description: options.description || "",
          variant: options.variant || "primary",
          size: options.size || "sm",
          confirmText: options.confirmText || "Confirm",
          cancelText: options.cancelText || "Cancel"
        }, 
        resolve,
        isConfirming: false,
      });
    }),

  handleConfirm: () => {
    set((state) => {
      // Prevent double clicks by locking state briefly
      if (state.isConfirming) return state;
      
      // Resolve the promise immediately
      if (state.resolve) {
        state.resolve(true);
      }
      
      // Close the modal
      return { isConfirming: true, isOpen: false, resolve: null };
    });
  },

  handleCancel: () => {
    set((state) => {
      if (state.isConfirming) return state;

      if (state.resolve) {
        state.resolve(false);
      }
      
      return { isOpen: false, resolve: null };
    });
  }
}));
