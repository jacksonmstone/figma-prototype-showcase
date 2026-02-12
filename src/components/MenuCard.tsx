import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { MenuItem } from "@/data/menuData";
import { useOrder } from "@/context/OrderContext";

export default function MenuCard({ item }: { item: MenuItem }) {
  const { addItem } = useOrder();

  return (
    <div className="relative group">
      <Link to={`/item/${item.id}`} className="block">
        <div className="rounded-xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-md transition-shadow">
          <div className="aspect-square overflow-hidden">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          <div className="p-3">
            <h3 className="font-medium text-sm text-foreground leading-tight">{item.name}</h3>
            <p className="text-muted-foreground text-xs mt-1">${item.price.toFixed(2)}</p>
          </div>
        </div>
      </Link>
      <button
        onClick={(e) => { e.preventDefault(); addItem(item); }}
        className="absolute top-2 right-2 bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
        aria-label={`Add ${item.name} to order`}
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
