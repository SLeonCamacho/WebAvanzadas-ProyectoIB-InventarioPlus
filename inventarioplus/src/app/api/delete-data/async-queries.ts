import { sql } from '@vercel/postgres';

export async function deleteInventory(id: number) {
  try {
    const result = await sql`
      DELETE FROM Inventory
      WHERE id = ${id}
      RETURNING *;
    `;
    return result.rows;
  } catch (error) {
    console.error('Error deleting inventory:', error);
    return [];
  }
}

export async function deleteInventoryDetails(id: number) {
  try {
    const result = await sql`
      DELETE FROM InventoryDetails
      WHERE id = ${id}
      RETURNING *;
    `;
    return result.rows;
  } catch (error) {
    console.error('Error deleting inventory details:', error);
    return [];
  }
}

export async function deleteOrder(id: number) {
  try {
    const result = await sql`
      DELETE FROM Orders
      WHERE id = ${id}
      RETURNING *;
    `;
    return result.rows;
  } catch (error) {
    console.error('Error deleting order:', error);
    return [];
  }
}

export async function deleteOrderItem(id: number) {
  try {
    const result = await sql`
      DELETE FROM OrderItems
      WHERE id = ${id}
      RETURNING *;
    `;
    return result.rows;
  } catch (error) {
    console.error('Error deleting order item:', error);
    return [];
  }
}
