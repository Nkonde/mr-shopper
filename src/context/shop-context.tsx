import { createContext, PropsWithChildren, useContext, useMemo, useState } from 'react';

export type CartItem = { id: string; name: string; price: number; quantity: number };
export type Order = { id: string; items: string; total: number; status: string; date: string };

type ShopContextValue = {
  cart: CartItem[];
  orders: Order[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  changeQuantity: (id: string, change: number) => void;
  checkout: () => boolean;
};

const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({ children }: PropsWithChildren) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart((current) => {
      const existing = current.find((entry) => entry.id === item.id);
      return existing
        ? current.map((entry) =>
            entry.id === item.id ? { ...entry, quantity: entry.quantity + 1 } : entry
          )
        : [...current, { ...item, quantity: 1 }];
    });
  };

  const changeQuantity = (id: string, change: number) => {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + change } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const checkout = () => {
    if (!cart.length) return false;
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 15;
    setOrders((current) => [
      {
        id: Date.now().toString(),
        items: cart.map((item) => `${item.name}${item.quantity > 1 ? ` x${item.quantity}` : ''}`).join(', '),
        total,
        status: 'Preparing',
        date: 'Just now',
      },
      ...current,
    ]);
    setCart([]);
    return true;
  };

  const value = useMemo(
    () => ({ cart, orders, addToCart, changeQuantity, checkout }),
    [cart, orders]
  );
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used inside ShopProvider');
  return context;
}
