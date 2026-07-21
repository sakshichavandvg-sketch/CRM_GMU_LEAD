import { useConfirmStore } from '@/stores/confirmStore';

export const useConfirm = () => {
  return useConfirmStore((state) => state.confirm);
};
