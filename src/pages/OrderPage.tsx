import { useOrder } from "@/context/OrderContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function OrderPage() {
  const { orderItems, updateQuantity, removeItem, getTotal } = useOrder();

  if (orderItems.length === 0) {
    return (
      <div className="px-4 py-12 text-center space-y-4">
        <p className="text-muted-foreground text-lg">Your order is empty</p>
        <Link to="/" className="inline-block bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 py-5 space-y-5">
      <h1 className="text-2xl text-foreground">Your Order Information</h1>

      <div className="space-y-3">
        {orderItems.map(({ item, quantity }) => (
          <div key={item.id} className="flex items-center gap-3 bg-card border border-border rounded-xl p-3">
            <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-sm text-foreground truncate">{item.name}</h3>
              <p className="text-muted-foreground text-xs">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => updateQuantity(item.id, quantity - 1)} className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors">
                <Minus className="w-3 h-3" />
              </button>
              <span className="text-sm font-medium w-5 text-center text-foreground">{quantity}</span>
              <button onClick={() => updateQuantity(item.id, quantity + 1)} className="w-7 h-7 rounded-full border border-border flex items-center justify-center text-foreground hover:bg-secondary transition-colors">
                <Plus className="w-3 h-3" />
              </button>
              <button onClick={() => removeItem(item.id)} className="w-7 h-7 rounded-full flex items-center justify-center text-destructive hover:bg-destructive/10 transition-colors ml-1">
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-border pt-4">
        <span className="text-foreground font-medium">Total</span>
        <span className="text-xl font-serif text-foreground">${getTotal().toFixed(2)}</span>
      </div>

      <Link
        to="/checkout"
        className="block text-center bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
