-- RESTAURANT
CREATE TABLE IF NOT EXISTS restaurant (
    restaurant_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255)
);

-- ALLERGEN
CREATE TABLE IF NOT EXISTS allergen (
    allergen_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- DIETARY_TAG
CREATE TABLE IF NOT EXISTS dietary_tag (
    dietary_tag_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL
);

-- INGREDIENT
CREATE TABLE IF NOT EXISTS ingredient (
    ingredient_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- MENU_ITEM (references restaurant)
CREATE TABLE IF NOT EXISTS menu_item (
    menu_item_id SERIAL PRIMARY KEY,
    restaurant_id INT NOT NULL REFERENCES restaurant(restaurant_id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image_url VARCHAR(500),
    category VARCHAR(50) DEFAULT 'main'
);
-- Add category if table already existed without it
ALTER TABLE menu_item ADD COLUMN IF NOT EXISTS category VARCHAR(50) DEFAULT 'main';

-- COMPLETED_ORDERS (references restaurant)
CREATE TABLE IF NOT EXISTS completed_orders (
    order_id SERIAL PRIMARY KEY,
    restaurant_id INT NOT NULL REFERENCES restaurant(restaurant_id) ON DELETE CASCADE,
    order_type VARCHAR(50),
    total_price DECIMAL(10, 2) NOT NULL,
    created_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ORDER_ITEM (references completed_orders, menu_item)
CREATE TABLE IF NOT EXISTS active_orders (
    order_item_id SERIAL PRIMARY KEY,
    order_id INT NOT NULL REFERENCES completed_orders(order_id) ON DELETE CASCADE,
    menu_item_id INT NOT NULL REFERENCES menu_item(menu_item_id) ON DELETE RESTRICT,
    quantity INT NOT NULL CHECK (quantity > 0),
    price_at_order_time DECIMAL(10, 2) NOT NULL
);

-- Many-to-many: MENU_ITEM <-> ALLERGEN
CREATE TABLE IF NOT EXISTS menu_item_allergens (
    menu_item_id INT NOT NULL REFERENCES menu_item(menu_item_id) ON DELETE CASCADE,
    allergen_id INT NOT NULL REFERENCES allergen(allergen_id) ON DELETE CASCADE,
    PRIMARY KEY (menu_item_id, allergen_id)
);

-- Many-to-many: MENU_ITEM <-> DIETARY_TAG
CREATE TABLE IF NOT EXISTS menu_item_dietary_tags (
    menu_item_id INT NOT NULL REFERENCES menu_item(menu_item_id) ON DELETE CASCADE,
    dietary_tag_id INT NOT NULL REFERENCES dietary_tag(dietary_tag_id) ON DELETE CASCADE,
    PRIMARY KEY (menu_item_id, dietary_tag_id)
);

-- Many-to-many: MENU_ITEM <-> INGREDIENT
CREATE TABLE IF NOT EXISTS menu_item_ingredients (
    menu_item_id INT NOT NULL REFERENCES menu_item(menu_item_id) ON DELETE CASCADE,
    ingredient_id INT NOT NULL REFERENCES ingredient(ingredient_id) ON DELETE CASCADE,
    PRIMARY KEY (menu_item_id, ingredient_id)
);
