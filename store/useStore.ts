import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
}

interface CartStore {
  items: Product[];
  favorites: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  removeFavorite: (productId: string) => void;
  clearCart: () => void;
}

export const useStore = create<CartStore>((set) => ({
  items: [],
  favorites: [],
  addItem: (product) =>
    set((state) => ({
      items: [...state.items, product],
    })),
  removeItem: (productId) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    })),
    removeFavorite: (productId) =>(
      set((state) => ({
        favorites: state.favorites.filter((item) => item.id !== productId),
    }))),
  clearCart: () => set({ items: [] }),
}));