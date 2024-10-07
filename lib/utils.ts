import { CartItem } from "@/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function createOrderCartLineItems(cartItems: CartItem[]) {
  return cartItems.flatMap(({ product, quantity }) =>
    Array(quantity).fill({ item: { id: product.id } })
  );
} 