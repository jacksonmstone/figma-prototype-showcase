import React, { createContext, useContext, useState, ReactNode } from "react";
import { MenuItem } from "@/data/menuData";

export interface OrderItem {
  item: MenuItem;
  quantity: number;
}

interface OrderContextType {
  orderItems: OrderItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  getTotal: () => number;
  getTax: () => number;
  getTip: () => number;
  setTipPercent: (p: number) => void;
  tipPercent: number;
  tableNumber: string;
  setTableNumber: (t: string) => void;
  clearOrder: () => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider = ({ children }: { children: ReactNode }) => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [tipPercent, setTipPercent] = useState(18);
  const [tableNumber, setTableNumber] = useState("12");

  const addItem = (item: MenuItem) => {
    setOrderItems((prev) => {
      const existing = prev.find((o) => o.item.id === item.id);
      if (existing) {
        return prev.map((o) => o.item.id === item.id ? { ...o, quantity: o.quantity + 1 } : o);
      }
      return [...prev, { item, quantity: 1 }];
    });
  };

  const removeItem = (itemId: string) => {
    setOrderItems((prev) => prev.filter((o) => o.item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) { removeItem(itemId); return; }
    setOrderItems((prev) => prev.map((o) => o.item.id === itemId ? { ...o, quantity } : o));
  };

  const getTotal = () => orderItems.reduce((sum, o) => sum + o.item.price * o.quantity, 0);
  const getTax = () => getTotal() * 0.08875;
  const getTip = () => getTotal() * (tipPercent / 100);

  const clearOrder = () => setOrderItems([]);

  return (
    <OrderContext.Provider value={{ orderItems, addItem, removeItem, updateQuantity, getTotal, getTax, getTip, setTipPercent, tipPercent, tableNumber, setTableNumber, clearOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used within OrderProvider");
  return ctx;
};
