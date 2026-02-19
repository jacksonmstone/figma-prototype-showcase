import breakfastSandwich from "@/assets/breakfast-sandwich.jpg";
import fruitPlatter from "@/assets/fruit-platter.jpg";
import bagelSandwich from "@/assets/bagel-sandwich.jpg";
import frenchToast from "@/assets/french-toast.jpg";
import avocadoToast from "@/assets/avocado-toast.jpg";
import eggsBenedict from "@/assets/eggs-benedict.jpg";
import clubSandwich from "@/assets/club-sandwich.jpg";
import shoyuRamen from "@/assets/shoyu-ramen.jpg";
import type { MenuItemFromApi } from "@/lib/api";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  allergens: string[];
  category: "suggested" | "main";
}

/** Map menu_item_id (1–8) to local asset for display when API has no image_url */
export const menuItemImageMap: Record<number, string> = {
  1: breakfastSandwich,
  2: fruitPlatter,
  3: bagelSandwich,
  4: frenchToast,
  5: avocadoToast,
  6: eggsBenedict,
  7: clubSandwich,
  8: shoyuRamen,
};

export function apiItemToMenuItem(row: MenuItemFromApi): MenuItem {
  const id = String(row.id);
  const category = (row.category === "suggested" || row.category === "main" ? row.category : "main") as "suggested" | "main";
  return {
    id,
    name: row.name,
    price: Number(row.price),
    image: menuItemImageMap[row.id] || row.image_url || "",
    description: row.description || "",
    allergens: Array.isArray(row.allergens) ? row.allergens : [],
    category,
  };
}

/** Fallback allergy/filter options if API is unavailable */
export const allergyOptionsFallback = [
  "Peanuts", "Nuts", "Dairy", "Eggs", "Wheat/Gluten", "Soy",
  "Shellfish", "Fish", "Sesame", "Vegan", "Vegetarian", "Halal",
  "Kosher", "Other",
];
