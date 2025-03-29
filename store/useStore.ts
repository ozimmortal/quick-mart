import { create } from 'zustand';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface StoreState {
  cart: CartItem[];
  favorites: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
}

export const useStore = create<StoreState>((set) => ({
  cart: [],
  favorites: [],
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.cart.find((item) => item.id === product.id);
      if (existingItem) {
        return {
          cart: state.cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { cart: [...state.cart, { ...product, quantity: 1 }] };
    }),
  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  addToFavorites: (product) =>
    set((state) => ({
      favorites: [...state.favorites, product],
    })),
  removeFromFavorites: (productId) =>
    set((state) => ({
      favorites: state.favorites.filter((item) => item.id !== productId),
    })),
}));