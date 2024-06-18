import { sql } from '@vercel/postgres';
import { Inventory, InventoryDetails, Orders, OrderItems } from '../../types/tables';

export async function fetchAllInventory(user_id: number): Promise<Inventory[]> {
  try {
    const result = await sql<Inventory[]>`
      SELECT * 
      FROM Inventory 
      WHERE user_id = ${user_id};
    `;
    return result.rows as unknown as Inventory[];
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return [];
  }
}

/*Other fuctions...*/
export async function fetchInventoryByProductName(product_name: string, user_id: number): Promise<Inventory[]> {
  try {
    const result = await sql<Inventory[]>`
      SELECT * FROM Inventory
      WHERE product_name ILIKE ${'%' + product_name + '%'} AND user_id = ${user_id};
    `;
    return result.rows as unknown as Inventory[];
  } catch (error) {
    console.error('Error fetching inventory by product name:', error);
    return [];
  }
}

export async function fetchAllInventoryDetails(user_id: number): Promise<InventoryDetails[]> {
  try {
    const result = await sql<InventoryDetails[]>`
      SELECT id, inventory_id, description, manufacturer, expiry_date 
      FROM InventoryDetails 
      WHERE inventory_id IN (SELECT id FROM Inventory WHERE user_id = ${user_id});
    `;
    return result.rows as unknown as InventoryDetails[];
  } catch (error) {
    console.error('Error fetching inventory details:', error);
    return [];
  }
}

export async function fetchInventoryDetailsByDescription(userId: number, description: string): Promise<InventoryDetails[]> {
  try {
    const result = await sql<InventoryDetails[]>`
      SELECT InventoryDetails.* 
      FROM InventoryDetails 
      JOIN Inventory ON Inventory.id = InventoryDetails.inventory_id 
      WHERE Inventory.user_id = ${userId} AND InventoryDetails.description ILIKE ${'%' + description + '%'};
    `;
    return result.rows as unknown as InventoryDetails[];
  } catch (error) {
    console.error('Error fetching inventory details by description:', error);
    return [];
  }
}

export async function fetchAllOrders(user_id: number): Promise<Orders[]> {
  try {
    const result = await sql<Orders[]>`
      SELECT * 
      FROM Orders 
      WHERE user_id = ${user_id};
    `;
    return result.rows as unknown as Orders[];
  } catch (error) {
    console.error('Error fetching orders:', error);
    return [];
  }
}

export async function fetchOrdersByOrderDate(userId: number, order_date: string): Promise<Orders[]> {
  try {
    const result = await sql<Orders[]>`
      SELECT * 
      FROM Orders 
      WHERE user_id = ${userId} AND order_date::text LIKE ${'%' + order_date + '%'};
    `;
    return result.rows as unknown as Orders[];
  } catch (error) {
    console.error('Error fetching orders by order date:', error);
    return [];
  }
}

export async function fetchAllOrderItems(userId: number): Promise<OrderItems[]> {
  try {
    const result = await sql<OrderItems[]>`
      SELECT OrderItems.* 
      FROM OrderItems 
      JOIN Orders ON Orders.id = OrderItems.order_id 
      WHERE Orders.user_id = ${userId};
    `;
    return result.rows as unknown as OrderItems[];
  } catch (error) {
    console.error('Error fetching order items:', error);
    return [];
  }
}

export async function fetchOrderItemsByQuantity(userId: number, quantity: number): Promise<OrderItems[]> {
  try {
    const result = await sql<OrderItems[]>`
      SELECT OrderItems.* 
      FROM OrderItems 
      JOIN Orders ON Orders.id = OrderItems.order_id 
      WHERE Orders.user_id = ${userId} AND OrderItems.quantity = ${quantity};
    `;
    return result.rows as unknown as OrderItems[];
  } catch (error) {
    console.error('Error fetching order items by quantity:', error);
    return [];
  }
}
