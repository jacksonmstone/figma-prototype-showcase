import { menuItems } from "@/data/menuData";
import MenuCard from "@/components/MenuCard";
import { Link } from "react-router-dom";
import { Filter } from "lucide-react";

const Index = () => {
  const now = new Date();
  const timeStr = now.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true });
  const suggested = menuItems.filter((i) => i.category === "suggested");
  const rest = menuItems.filter((i) => i.category === "main");

  return (
    <div className="px-4 py-5 space-y-6">
      {/* Restaurant Name */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-foreground">The Morning Table</h1>
        <Link to="/filters" className="text-muted-foreground hover:text-foreground transition-colors">
          <Filter className="w-5 h-5" />
        </Link>
      </div>

      {/* Suggested */}
      <section>
        <h2 className="text-lg text-foreground mb-3">
          Suggested Dishes @ {timeStr}
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {suggested.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* Rest of Menu */}
      <section>
        <h2 className="text-lg text-foreground mb-3 underline underline-offset-4 decoration-border">
          Rest of Menu
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {rest.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
