import { useState } from "react";
import { allergyOptions } from "@/data/menuData";
import { useNavigate } from "react-router-dom";

export default function FiltersPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const navigate = useNavigate();

  const toggle = (opt: string) => {
    setSelected((prev) => prev.includes(opt) ? prev.filter((s) => s !== opt) : [...prev, opt]);
  };

  return (
    <div className="px-4 py-5 space-y-6">
      <h1 className="text-2xl text-foreground">Menu Filter</h1>
      <p className="text-muted-foreground text-sm">Select options to filter out</p>

      <section>
        <h2 className="text-lg text-foreground mb-3">Allergies / Dietary</h2>
        <div className="grid grid-cols-2 gap-3">
          {allergyOptions.map((opt) => (
            <label
              key={opt}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg border cursor-pointer transition-colors text-sm ${
                selected.includes(opt)
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-foreground border-border hover:bg-secondary"
              }`}
            >
              <input
                type="checkbox"
                checked={selected.includes(opt)}
                onChange={() => toggle(opt)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                selected.includes(opt) ? "border-primary-foreground bg-primary-foreground/20" : "border-muted-foreground"
              }`}>
                {selected.includes(opt) && (
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              {opt}
            </label>
          ))}
        </div>
      </section>

      <button
        onClick={() => navigate("/")}
        className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
      >
        Apply Filters
      </button>
    </div>
  );
}
