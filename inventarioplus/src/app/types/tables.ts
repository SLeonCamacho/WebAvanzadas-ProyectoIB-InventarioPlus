export type Inventory = {
  id: number;
  product_name: string;
  quantity: number;
  price: number;
  user_id: number;
};

export type InventoryDetails = {
  id: number;
  inventory_id: number;
  description: string;
  manufacturer: string;
  expiry_date: string;
};

export type Orders = {
  id: number;
  user_id: number;
  order_date: string;
  total: number;
};

export type OrderItems = {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
};
