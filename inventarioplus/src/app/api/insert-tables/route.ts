import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Inserting data into Users table
    await sql`
      INSERT INTO Users (name, email, password)
      VALUES 
        ('Santiago', 'santiago.leon@epn.edu.ec', 'password1'),
        ('Bobby', 'bobby@example.com', 'password2');
    `;

    // Inserting data into Inventory table
    await sql`
      INSERT INTO Inventory (product_name, quantity, price, user_id)
      VALUES 
        ('Product A', 100, 10.99, 1),
        ('Product B', 200, 20.99, 2);
    `;

    // Inserting data into InventoryDetails table
    await sql`
      INSERT INTO InventoryDetails (inventory_id, description, manufacturer, expiry_date)
      VALUES 
        (1, 'Description for Product A', 'Manufacturer A', '2024-12-31'),
        (2, 'Description for Product B', 'Manufacturer B', '2025-06-30');
    `;

    // Inserting data into Orders table
    await sql`
      INSERT INTO Orders (user_id, order_date, total)
      VALUES 
        (1, '2023-06-15', 109.90),
        (2, '2023-07-20', 209.90);
    `;

    // Inserting data into OrderItems table
    await sql`
      INSERT INTO OrderItems (order_id, product_id, quantity, price)
      VALUES 
        (1, 1, 10, 10.99),
        (2, 2, 10, 20.99);
    `;

    return NextResponse.json({ message: "Data inserted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
