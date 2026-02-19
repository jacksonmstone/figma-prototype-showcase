import { useParams, Link } from "react-router-dom";
import { menuItems } from "@/data/menuData";
import { useOrder } from "@/context/OrderContext";
import { Plus, ArrowLeft } from "lucide-react";
import MenuCard from "@/components/MenuCard";

export default function ItemDetailPage() {
  const { id } = useParams();
  const item = menuItems.find((i) => i.id === id);
  const { addItem } = useOrder();

  if (!item) {
    return <div className="p-6 text-center text-muted-foreground">Item not found</div>;
  }

  const similar = menuItems.filter((i) => i.id !== item.id).slice(0, 2);

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Hero Image */}
      <div className="relative">
        <img src={item.image} alt={item.name} className="w-full aspect-[4/3] object-cover" />
        <Link to="/" className="absolute top-4 left-4 bg-card/80 backdrop-blur-sm p-2 rounded-full">
          <ArrowLeft className="w-5 h-5 text-foreground" />
        </Link>
      </div>

      <div className="px-4 space-y-4">
        <h1 className="text-2xl text-foreground">{item.name}</h1>

        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Price</p>
          <p className="text-3xl font-serif text-foreground">${item.price.toFixed(2)}</p>
        </div>

        {item.allergens.length > 0 && (
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Allergens</p>
            <div className="flex flex-wrap gap-2">
              {item.allergens.map((a) => (
                <span key={a} className="bg-allergen text-allergen-foreground text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1">
                  ✓ {a}
                </span>
              ))}
            </div>
          </div>
        )}

        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">Description</p>
          <p className="text-sm text-foreground leading-relaxed">{item.description}</p>
        </div>

        <button
          onClick={() => addItem(item)}
          className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          <Plus className="w-5 h-5" />
          Add to Order
        </button>

        {/* Similar Suggestions */}
        <section className="pt-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-3">Similar Suggestions</p>
          <div className="grid grid-cols-2 gap-3">
            {similar.map((s) => (
              <MenuCard key={s.id} item={s} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
