import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, Filter, ShoppingCart, CreditCard, Bell } from "lucide-react";
import { useOrder } from "@/context/OrderContext";

const navLinks = [
  { to: "/", label: "Home", icon: Home },
  { to: "/filters", label: "Filters", icon: Filter },
  { to: "/order", label: "View Order", icon: ShoppingCart },
  { to: "/checkout", label: "Checkout", icon: CreditCard },
];

export default function AppLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { orderItems } = useOrder();
  const totalItems = orderItems.reduce((s, o) => s + o.quantity, 0);

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-md min-h-screen bg-card shadow-xl relative flex flex-col">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-3 border-b border-border sticky top-0 bg-card z-30">
          <div className="text-2xl font-serif tracking-tight text-foreground">⚇</div>
          <div className="flex items-center gap-3">
            {totalItems > 0 && (
              <Link to="/order" className="relative">
                <ShoppingCart className="w-5 h-5 text-foreground" />
                <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {totalItems}
                </span>
              </Link>
            )}
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-foreground">
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </header>

        {/* Slide-out Nav */}
        {menuOpen && (
          <div className="absolute inset-0 top-[57px] z-40 animate-fade-in">
            <div className="absolute inset-0 bg-foreground/20" onClick={() => setMenuOpen(false)} />
            <nav className="relative bg-card w-full p-6 space-y-2 animate-slide-up border-b border-border shadow-lg">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium transition-colors ${
                      active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-secondary"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    {link.label}
                  </Link>
                );
              })}
              <button
                onClick={() => { setMenuOpen(false); alert("Waiter has been notified!"); }}
                className="flex items-center gap-3 px-4 py-3 rounded-lg text-lg font-medium w-full text-left text-foreground hover:bg-secondary transition-colors"
              >
                <Bell className="w-5 h-5" />
                Call Waiter
              </button>
            </nav>
          </div>
        )}

        {/* Content */}
        <main className="flex-1 overflow-y-auto pb-20">{children}</main>

        {/* Bottom Call Waiter Bar */}
        <div className="sticky bottom-0 bg-card border-t border-border px-4 py-3 flex items-center gap-2 z-20">
          <button
            onClick={() => alert("Waiter has been notified!")}
            className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <Bell className="w-4 h-4" />
            Call Waiter
          </button>
          <Link
            to="/order"
            className="ml-auto flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <ShoppingCart className="w-4 h-4" />
            View Order {totalItems > 0 && `(${totalItems})`}
          </Link>
        </div>
      </div>
    </div>
  );
}
