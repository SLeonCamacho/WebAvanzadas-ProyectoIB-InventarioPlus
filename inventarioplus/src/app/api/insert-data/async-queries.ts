import { sql } from '@vercel/postgres';

export async function createUser(name: string, email: string, password: string) {
  try {
    const result = await sql`
    INSERT INTO Users (name, email, password)
    VALUES 
      (${name}, ${email}, ${password})
      RETURNING *;
  `;
    return result.rows;
  } catch (error) {
    console.error('Error fetching user:', error);
    return [];
  }
}

export async function createInventory(product_name: string, quantity: number, price: number, user_id: number) {
  try {
    const result = await sql`
      INSERT INTO Inventory (product_name, quantity, price, user_id)
      VALUES (${product_name}, ${quantity}, ${price}, ${user_id})
      RETURNING *;
    `;
    return result.rows;
  } catch (error) {
    console.error('Error creating inventory:', error);
    return [];
  }
}

export async function createInventoryDetails(inventory_id: number, description: string, manufacturer: string, expiry_date: string) {
  try {
    const result = await sql`
      INSERT INTO InventoryDetails (inventory_id, description, manufacturer, expiry_date)
      VALUES (${inventory_id}, ${description}, ${manufacturer}, ${expiry_date})
      RETURNING *;
    `;
    return result.rows;
  } catch (error) {
    console.error('Error creating inventory details:', error);
    return [];
  }
}

export async function createOrder(user_id: number, order_date: string, total: number) {
  try {
    const result = await sql`
      INSERT INTO Orders (user_id, order_date, total)
      VALUES (${user_id}, ${order_date}, ${total})
      RETURNING *;
    `;
    return result.rows;
  } catch (error) {
    console.error('Error creating order:', error);
    return [];
  }
}

export async function createOrderItem(order_id: number, product_id: number, quantity: number, price: number) {
  try {
    const result = await sql`
      INSERT INTO OrderItems (order_id, product_id, quantity, price)
      VALUES (${order_id}, ${product_id}, ${quantity}, ${price})
      RETURNING *;
    `;
    return result.rows;
  } catch (error) {
    console.error('Error creating order item:', error);
    return [];
  }
}
