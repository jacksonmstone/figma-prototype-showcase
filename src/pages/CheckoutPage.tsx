import { useState } from "react";
import { useOrder } from "@/context/OrderContext";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const { getTotal, getTax, getTip, tipPercent, setTipPercent, tableNumber, setTableNumber, clearOrder, orderItems } = useOrder();
  const navigate = useNavigate();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [ccv, setCcv] = useState("");
  const [cardName, setCardName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const subtotal = getTotal() + getTax() + getTip();

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => {
      clearOrder();
      navigate("/");
    }, 2000);
  };

  if (orderItems.length === 0 && !submitted) {
    return (
      <div className="px-4 py-12 text-center space-y-4">
        <p className="text-muted-foreground text-lg">No items to check out</p>
        <button onClick={() => navigate("/")} className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity">
          Browse Menu
        </button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="px-4 py-16 text-center space-y-3 animate-fade-in">
        <div className="text-4xl">✓</div>
        <h1 className="text-2xl text-foreground font-serif">Order Sent!</h1>
        <p className="text-muted-foreground">Your order has been sent to the kitchen.</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-5 space-y-5">
      <h1 className="text-2xl text-foreground">Check Out Center</h1>

      {/* Table Number */}
      <div>
        <label className="text-xs text-muted-foreground uppercase tracking-wide">Your Table Number</label>
        <input
          type="text"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          className="mt-1 w-full bg-secondary text-foreground px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {/* Price Breakdown */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-foreground">
          <span>Price</span>
          <span>${getTotal().toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span>+ Tax (8.875%)</span>
          <span>${getTax().toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-muted-foreground items-center">
          <span>+ Tip</span>
          <div className="flex items-center gap-2">
            {[15, 18, 20, 25].map((p) => (
              <button
                key={p}
                onClick={() => setTipPercent(p)}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                  tipPercent === p ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                }`}
              >
                {p}%
              </button>
            ))}
          </div>
        </div>
        <div className="flex justify-between text-muted-foreground">
          <span></span>
          <span>${getTip().toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-foreground font-medium border-t border-border pt-2">
          <span>Subtotal</span>
          <span className="text-lg font-serif">${subtotal.toFixed(2)}</span>
        </div>
      </div>

      {/* Card Info */}
      <div className="space-y-3">
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wide">Card Number</label>
          <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="•••• •••• •••• ••••" className="mt-1 w-full bg-secondary text-foreground px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide">Expiration Date</label>
            <input type="text" value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" className="mt-1 w-full bg-secondary text-foreground px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="text-xs text-muted-foreground uppercase tracking-wide">CCV</label>
            <input type="text" value={ccv} onChange={(e) => setCcv(e.target.value)} placeholder="•••" className="mt-1 w-full bg-secondary text-foreground px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        </div>
        <div>
          <label className="text-xs text-muted-foreground uppercase tracking-wide">Card Holder Name</label>
          <input type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Name" className="mt-1 w-full bg-secondary text-foreground px-3 py-2.5 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>
      </div>

      {/* Payment Options */}
      <div className="flex items-center justify-center gap-4 py-2">
        <span className="text-sm font-semibold text-foreground">PayPal</span>
        <span className="text-sm font-semibold text-foreground">Apple Pay</span>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
      >
        Send to Kitchen
      </button>
    </div>
  );
}
