import { create } from "zustand";

import { Product } from "@/types";

interface PreviewModalStore {
  isOpen: boolean;
  data: Product | null;
  onOpen: (data: Product) => void;
  onClose: () => void;
}

const usePreviewModal = create<PreviewModalStore>((set) => ({
  isOpen: false,
  data: null,
  onOpen: (data) => set({ isOpen: true, data }),
  onClose: () => set({ isOpen: false, data: null }),
}));

export default usePreviewModal;
