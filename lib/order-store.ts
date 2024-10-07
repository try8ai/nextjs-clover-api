import { Order } from '@/types';
import { create } from 'zustand';


interface OrderState {
    order: Order | null;
    setOrder: (order: Order) => void;
    clearOrder: () => void;
  }

  export const useOrderStore = create<OrderState>((set) => ({
    order: null,
    setOrder: (order) => set({ order }),
    clearOrder: () => set({ order: null }),
  }));  