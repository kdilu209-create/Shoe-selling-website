import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../data/products";

interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
  selectedColor: string;
  uniqueId: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size: string, color: string) => void;
  removeItem: (uniqueId: string) => void;
  updateQuantity: (uniqueId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addItem = (product: Product, size: string, color: string) => {
    setItems((prevItems) => {
      const uniqueId = `${product.id}-${size}-${color}`;
      const existingItem = prevItems.find((item) => item.uniqueId === uniqueId);

      if (existingItem) {
        return prevItems.map((item) =>
          item.uniqueId === uniqueId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevItems, { 
        ...product, 
        quantity: 1, 
        selectedSize: size, 
        selectedColor: color,
        uniqueId 
      }];
    });
  };

  const removeItem = (uniqueId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.uniqueId !== uniqueId));
  };

  const updateQuantity = (uniqueId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(uniqueId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.uniqueId === uniqueId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}