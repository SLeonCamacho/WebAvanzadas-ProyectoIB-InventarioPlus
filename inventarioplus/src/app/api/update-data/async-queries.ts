import { sql } from '@vercel/postgres';

export async function updateInventory(id: number, product_name: string, quantity: number, price: number) {
  try {
    const result = await sql`
      UPDATE Inventory
      SET product_name = ${product_name}, quantity = ${quantity}, price = ${price}
      WHERE id = ${id}
      RETURNING *;
    `;
    return result.rows;
  } catch (error) {
    console.error('Error updating inventory:', error);
    return [];
  }
}

export async function updateInventoryDetails(id: number, inventory_id: number, description: string, manufacturer: string, expiry_date: string) {
  try {
    const result = await sql`
      UPDATE InventoryDetails
      SET inventory_id = ${inventory_id}, description = ${description}, manufacturer = ${manufacturer}, expiry_date = ${expiry_date}
      WHERE id = ${id}
      RETURNING *;
    `;
    return result.rows;
  } catch (error) {
    console.error('Error updating inventory details:', error);
    return [];
  }
}

export async function updateOrder(id: number, order_date: string, total: number) {
  try {
    const result = await sql`
      UPDATE Orders
      SET order_date = ${order_date}, total = ${total}
      WHERE id = ${id}
      RETURNING *;
    `;
    return result.rows;
  } catch (error) {
    console.error('Error updating order:', error);
    return [];
  }
}

export async function updateOrderItem(id: number, order_id: number, product_id: number, quantity: number, price: number) {
  try {
    const result = await sql`
      UPDATE OrderItems
      SET order_id = ${order_id}, product_id = ${product_id}, quantity = ${quantity}, price = ${price}
      WHERE id = ${id}
      RETURNING *;
    `;
    return result.rows;
  } catch (error) {
    console.error('Error updating order item:', error);
    return [];
  }
}
