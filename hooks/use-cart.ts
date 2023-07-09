import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { Product } from "@/types";
import { toast } from "react-hot-toast";

interface CartStore {
  items: Product[];
  addItem: (item: Product) => void;
  removeItem: (id: string) => void;
  removeAllItems: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (item: Product) => {
        const currentItems = get().items;
        const itemExists = currentItems.find((i) => i.id === item.id);

        if (itemExists) {
          return toast("Item already exists in cart");
        }

        set({ items: [...currentItems, item] });
        toast.success("Item added to cart");
      },
      removeItem: (id: string) => {
        const currentItems = get().items;
        const newItems = currentItems.filter((i) => i.id !== id);

        set({ items: newItems });
        toast.success("Item removed from cart");
      },
      removeAllItems: () => set({ items: [] }),
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCart;
