-- Seed data for dynamic_menu (run once after schema.sql)
-- Matches the 8 items shown on the website: Breakfast Sandwich, Fruit Platter, Bagel Sandwich, French Toast, Avocado Toast, Eggs Benedict, Club Sandwich, Shoyu Ramen.

-- 1. RESTAURANT
INSERT INTO restaurant (name, location) VALUES
    ('The Morning Table', '123 Main St');

-- 2. ALLERGEN (match menuData: Gluten, Dairy, Eggs, Fish, Soy, plus Nuts for filters)
INSERT INTO allergen (name) VALUES
    ('Gluten'),
    ('Dairy'),
    ('Eggs'),
    ('Fish'),
    ('Soy'),
    ('Nuts');

-- 3. DIETARY_TAG (for filters / future use)
INSERT INTO dietary_tag (name) VALUES
    ('Vegetarian'),
    ('Vegan'),
    ('Gluten-Free'),
    ('Dairy-Free');

-- 4. INGREDIENT (sample for menu items)
INSERT INTO ingredient (name) VALUES
    ('Bacon'),
    ('American Cheese'),
    ('Egg'),
    ('Poppy Seed Bun'),
    ('Mixed Berries'),
    ('Melon'),
    ('Cream Cheese'),
    ('Smoked Salmon'),
    ('Dill'),
    ('Brioche'),
    ('Maple Syrup'),
    ('Sourdough Bread'),
    ('Avocado'),
    ('English Muffin'),
    ('Canadian Bacon'),
    ('Hollandaise Sauce'),
    ('Turkey'),
    ('Lettuce'),
    ('Tomato'),
    ('Mayo'),
    ('Ramen Noodles'),
    ('Soy Sauce'),
    ('Nori');

-- 5. MENU_ITEM (8 items matching Index/menuData: id 1–8, category suggested/main)
INSERT INTO menu_item (restaurant_id, name, description, price, image_url, category) VALUES
    (1, 'Breakfast Sandwich', 'The quintessential New York breakfast. Includes crispy bacon, yellow American cheese, and a fried egg onto a poppy seed sandwich.', 14.35, NULL, 'suggested'),
    (1, 'Fruit Platter', 'A colorful assortment of seasonal fresh fruits including berries, melon, and tropical selections.', 12.50, NULL, 'suggested'),
    (1, 'Bagel Sandwich', 'Fresh poppy seed bagel with cream cheese and smoked salmon, garnished with dill.', 13.65, NULL, 'main'),
    (1, 'French Toast', 'Thick-cut brioche french toast with maple syrup and fresh mixed berries.', 13.25, NULL, 'main'),
    (1, 'Avocado Toast', 'Smashed avocado on sourdough bread topped with a perfectly poached egg.', 14.00, NULL, 'main'),
    (1, 'Eggs Benedict', 'Classic eggs benedict with Canadian bacon, poached eggs, and hollandaise sauce on an English muffin.', 15.50, NULL, 'main'),
    (1, 'Club Sandwich', 'Triple-decker club sandwich with turkey, bacon, lettuce, tomato, and mayo. Served with fries.', 15.63, NULL, 'main'),
    (1, 'Shoyu Ramen', 'Shoyu ramen is a classic dish with a rich broth made of soy sauce. Topped with soft-boiled egg and nori.', 16.75, NULL, 'main');

-- 6. MENU_ITEM_ALLERGENS (match menuData allergens per item)
INSERT INTO menu_item_allergens (menu_item_id, allergen_id) VALUES
    (1, 1), (1, 2), (1, 3),
    (3, 1), (3, 2), (3, 4),
    (4, 1), (4, 2), (4, 3),
    (5, 1), (5, 3),
    (6, 1), (6, 2), (6, 3),
    (7, 1), (7, 3),
    (8, 1), (8, 5), (8, 3);

-- 7. MENU_ITEM_DIETARY_TAGS (sample)
INSERT INTO menu_item_dietary_tags (menu_item_id, dietary_tag_id) VALUES
    (2, 1), (2, 2);

-- 8. MENU_ITEM_INGREDIENTS (sample links)
INSERT INTO menu_item_ingredients (menu_item_id, ingredient_id) VALUES
    (1, 1), (1, 2), (1, 3), (1, 4),
    (2, 5), (2, 6),
    (3, 7), (3, 8), (3, 9),
    (4, 10), (4, 11), (4, 5),
    (5, 12), (5, 13), (5, 3),
    (6, 14), (6, 15), (6, 3), (6, 16),
    (7, 17), (7, 1), (7, 18), (7, 19), (7, 20),
    (8, 21), (8, 22), (8, 3), (8, 23);

-- 9. COMPLETED_ORDERS (sample)
INSERT INTO completed_orders (restaurant_id, order_type, total_price) VALUES
    (1, 'dine-in', 42.15),
    (1, 'takeout', 28.75);

-- 10. ACTIVE_ORDERS (sample line items for the two completed orders)
INSERT INTO active_orders (order_id, menu_item_id, quantity, price_at_order_time) VALUES
    (1, 1, 2, 14.35),
    (1, 2, 1, 12.50),
    (2, 6, 1, 15.50),
    (2, 4, 1, 13.25);
