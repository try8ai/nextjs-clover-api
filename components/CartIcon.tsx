"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/store";

export function CartIcon() {
  const items = useCartStore((state) => state.items);

  return (
    <Link href="/cart" className="relative">
      <ShoppingCart className="h-6 w-6" />
      {items.length > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
        >
          {items.length}
        </Badge>
      )}
    </Link>
  );
}
