import breakfastSandwich from "@/assets/breakfast-sandwich.jpg";
import fruitPlatter from "@/assets/fruit-platter.jpg";
import bagelSandwich from "@/assets/bagel-sandwich.jpg";
import frenchToast from "@/assets/french-toast.jpg";
import avocadoToast from "@/assets/avocado-toast.jpg";
import eggsBenedict from "@/assets/eggs-benedict.jpg";
import clubSandwich from "@/assets/club-sandwich.jpg";
import shoyuRamen from "@/assets/shoyu-ramen.jpg";

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  allergens: string[];
  category: "suggested" | "main";
}

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Breakfast Sandwich",
    price: 14.35,
    image: breakfastSandwich,
    description: "The quintessential New York breakfast. Includes crispy bacon, yellow American cheese, and a fried egg onto a poppy seed sandwich.",
    allergens: ["Gluten", "Dairy", "Eggs"],
    category: "suggested",
  },
  {
    id: "2",
    name: "Fruit Platter",
    price: 12.50,
    image: fruitPlatter,
    description: "A colorful assortment of seasonal fresh fruits including berries, melon, and tropical selections.",
    allergens: [],
    category: "suggested",
  },
  {
    id: "3",
    name: "Bagel Sandwich",
    price: 13.65,
    image: bagelSandwich,
    description: "Fresh poppy seed bagel with cream cheese and smoked salmon, garnished with dill.",
    allergens: ["Gluten", "Dairy", "Fish"],
    category: "main",
  },
  {
    id: "4",
    name: "French Toast",
    price: 13.25,
    image: frenchToast,
    description: "Thick-cut brioche french toast with maple syrup and fresh mixed berries.",
    allergens: ["Gluten", "Dairy", "Eggs"],
    category: "main",
  },
  {
    id: "5",
    name: "Avocado Toast",
    price: 14.00,
    image: avocadoToast,
    description: "Smashed avocado on sourdough bread topped with a perfectly poached egg.",
    allergens: ["Gluten", "Eggs"],
    category: "main",
  },
  {
    id: "6",
    name: "Eggs Benedict",
    price: 15.50,
    image: eggsBenedict,
    description: "Classic eggs benedict with Canadian bacon, poached eggs, and hollandaise sauce on an English muffin.",
    allergens: ["Gluten", "Dairy", "Eggs"],
    category: "main",
  },
  {
    id: "7",
    name: "Club Sandwich",
    price: 15.63,
    image: clubSandwich,
    description: "Triple-decker club sandwich with turkey, bacon, lettuce, tomato, and mayo. Served with fries.",
    allergens: ["Gluten", "Eggs"],
    category: "main",
  },
  {
    id: "8",
    name: "Shoyu Ramen",
    price: 16.75,
    image: shoyuRamen,
    description: "Shoyu ramen is a classic dish with a rich broth made of soy sauce. Topped with soft-boiled egg and nori.",
    allergens: ["Gluten", "Soy", "Eggs"],
    category: "main",
  },
];

export const allergyOptions = [
  "Peanuts", "Nuts", "Dairy", "Eggs", "Wheat/Gluten", "Soy",
  "Shellfish", "Fish", "Sesame", "Vegan", "Vegetarian", "Halal",
  "Kosher", "Other",
];
