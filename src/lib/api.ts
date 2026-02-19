const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options?.headers },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    const message = err.detail ? `${err.error || 'Error'}: ${err.detail}` : (err.error || `HTTP ${res.status}`);
    throw new Error(message);
  }
  return res.json();
}

export interface Restaurant {
  restaurant_id: number;
  name: string;
  location: string | null;
}

export interface MenuItemFromApi {
  id: number;
  name: string;
  description: string | null;
  price: string;
  image_url: string | null;
  category: string | null;
  allergens: string[];
}

export async function getRestaurants(): Promise<Restaurant[]> {
  return fetchApi<Restaurant[]>('/api/restaurants');
}

export async function getMenuItems(restaurantId: number = 1): Promise<MenuItemFromApi[]> {
  return fetchApi<MenuItemFromApi[]>(`/api/menu-items?restaurant_id=${restaurantId}`);
}

export async function getMenuItem(id: string): Promise<MenuItemFromApi> {
  return fetchApi<MenuItemFromApi>(`/api/menu-items/${id}`);
}

export async function getAllergens(): Promise<string[]> {
  return fetchApi<string[]>('/api/allergens');
}

export interface SubmitOrderItem {
  menu_item_id: number;
  quantity: number;
  price_at_order_time: number;
}

export async function submitOrder(body: {
  restaurant_id: number;
  order_type?: string;
  items: SubmitOrderItem[];
}): Promise<{ order_id: number; total_price: number }> {
  return fetchApi<{ order_id: number; total_price: number }>('/api/orders', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}
