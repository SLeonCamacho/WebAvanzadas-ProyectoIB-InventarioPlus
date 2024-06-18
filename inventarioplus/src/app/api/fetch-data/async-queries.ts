import { sql } from '@vercel/postgres';

export async function fetchAllInventory() {
  try {
    const result = await sql`
      SELECT * FROM Inventory;
    `;
    return result.rows;
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return [];
  }
}

export async function fetchInventoryByProductName(product_name: string) {
  try {
    const result = await sql`
      SELECT * FROM Inventory
      WHERE product_name ILIKE ${'%' + product_name + '%'};
    `;
    return result.rows;
  } catch (error) {
    console.error('Error fetching inventory by product name:', error);
    return [];
  }
}

export async function fetchAllInventoryDetails() {
  try {
    const result = await sql`
      SELECT * FROM InventoryDetails;
    `;
    return result.rows;
  } catch (error) {
    console.error('Error fetching inventory details:', error);
    return [];
  }
}

export async function fetchInventoryDetailsByDescription(description: string) {
  try {
    const result = await sql`
      SELECT * FROM InventoryDetails
      WHERE description ILIKE ${'%' + description + '%'};
    `;
    return result.rows;
  } catch (error) {
    console.error('Error fetching inventory details by description:', error);
    return [];
  }
}

export async function fetchAllOrders() {
  try {
    const result = await sql`
      SELECT * FROM Orders;
    `;
    return result.rows;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

export async function fetchOrdersByOrderDate(order_date: string) {
  try {
    const result = await sql`
      SELECT * FROM Orders
      WHERE order_date::text LIKE ${'%' + order_date + '%'};
    `;
    return result.rows;
  } catch (error) {
    console.error('Error fetching orders by order date:', error);
    return [];
  }
}

export async function fetchAllOrderItems() {
  try {
    const result = await sql`
      SELECT * FROM OrderItems;
    `;
    return result.rows;
  } catch (error) {
    console.error('Error fetching order items:', error);
    return [];
  }
}

export async function fetchOrderItemsByQuantity(quantity: number) {
  try {
    const result = await sql`
      SELECT * FROM OrderItems
      WHERE quantity = ${quantity};
    `;
    return result.rows;
  } catch (error) {
    console.error('Error fetching order items by quantity:', error);
    return [];
  }
}
