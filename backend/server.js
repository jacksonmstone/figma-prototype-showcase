import express from 'express';
import pg from 'pg';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env from project root (parent of backend) so DB_PASSWORD is found
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const { Pool } = pg;

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// pg requires password to be a string
const dbPassword = process.env.DB_PASSWORD;
const password = dbPassword != null ? String(dbPassword) : '';

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: process.env.DB_NAME || 'dynamic_menu',
  user: process.env.DB_USER || 'postgres',
  password,
});

// Test database connection
pool.on('connect', () => {
  console.log('Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Get all restaurants
app.get('/api/restaurants', async (req, res) => {
  try {
    const result = await pool.query('SELECT restaurant_id, name, location FROM restaurant ORDER BY restaurant_id');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching restaurants:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get menu items for a restaurant (with allergens array)
app.get('/api/menu-items', async (req, res) => {
  try {
    const restaurantId = req.query.restaurant_id || 1;
    const result = await pool.query(
      `SELECT m.menu_item_id AS id, m.name, m.description, m.price, m.image_url, m.category,
              COALESCE(array_agg(a.name) FILTER (WHERE a.name IS NOT NULL), ARRAY[]::text[]) AS allergens
       FROM menu_item m
       LEFT JOIN menu_item_allergens ma ON m.menu_item_id = ma.menu_item_id
       LEFT JOIN allergen a ON ma.allergen_id = a.allergen_id
       WHERE m.restaurant_id = $1
       GROUP BY m.menu_item_id, m.name, m.description, m.price, m.image_url, m.category
       ORDER BY m.menu_item_id`,
      [restaurantId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching menu items:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single menu item by id (with allergens)
app.get('/api/menu-items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const itemResult = await pool.query(
      'SELECT menu_item_id AS id, name, description, price, image_url, category FROM menu_item WHERE menu_item_id = $1',
      [id]
    );
    if (itemResult.rows.length === 0) {
      return res.status(404).json({ error: 'Menu item not found' });
    }
    const item = itemResult.rows[0];
    const allergenResult = await pool.query(
      'SELECT a.name FROM allergen a JOIN menu_item_allergens ma ON a.allergen_id = ma.allergen_id WHERE ma.menu_item_id = $1',
      [id]
    );
    item.allergens = allergenResult.rows.map((r) => r.name);
    res.json(item);
  } catch (error) {
    console.error('Error fetching menu item:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all allergens (for filters)
app.get('/api/allergens', async (req, res) => {
  try {
    const result = await pool.query('SELECT name FROM allergen ORDER BY name');
    res.json(result.rows.map((r) => r.name));
  } catch (error) {
    console.error('Error fetching allergens:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get all completed orders
app.get('/api/orders', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM completed_orders ORDER BY order_id');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get completed order by ID
app.get('/api/orders/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM completed_orders WHERE order_id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error fetching order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Submit new order (completed_orders + active_orders line items)
app.post('/api/orders', async (req, res) => {
  const client = await pool.connect();
  try {
    const body = req.body || {};
    const { restaurant_id, order_type, items } = body;
    if (!restaurant_id || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        error: 'restaurant_id and non-empty items array required',
        received: { restaurant_id: body.restaurant_id, itemsLength: Array.isArray(body.items) ? body.items.length : 0 },
      });
    }
    const total = items.reduce((sum, i) => sum + (Number(i.price_at_order_time) || 0) * (Number(i.quantity) || 0), 0);

    await client.query('BEGIN');

    const orderResult = await client.query(
      'INSERT INTO completed_orders (restaurant_id, order_type, total_price) VALUES ($1, $2, $3) RETURNING order_id',
      [Number(restaurant_id), order_type || 'dine-in', total]
    );
    const orderId = orderResult.rows[0].order_id;

    for (const line of items) {
      await client.query(
        'INSERT INTO active_orders (order_id, menu_item_id, quantity, price_at_order_time) VALUES ($1, $2, $3, $4)',
        [orderId, Number(line.menu_item_id), Number(line.quantity), Number(line.price_at_order_time)]
      );
    }

    await client.query('COMMIT');
    res.status(201).json({ order_id: orderId, total_price: total });
  } catch (error) {
    await client.query('ROLLBACK').catch(() => {});
    console.error('Error submitting order:', error.message, error.detail || '');
    res.status(500).json({
      error: 'Failed to save order',
      detail: error.message || 'Internal server error',
    });
  } finally {
    client.release();
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
