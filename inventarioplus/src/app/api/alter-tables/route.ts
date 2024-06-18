import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Modificar Inventory table
    await sql`
      ALTER TABLE Inventory
      DROP CONSTRAINT IF EXISTS inventory_user_id_fkey,
      ADD CONSTRAINT inventory_user_id_fkey FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE;
    `;

    // Modificar InventoryDetails table
    await sql`
      ALTER TABLE InventoryDetails
      DROP CONSTRAINT IF EXISTS inventorydetails_inventory_id_fkey,
      ADD CONSTRAINT inventorydetails_inventory_id_fkey FOREIGN KEY (inventory_id) REFERENCES Inventory(id) ON DELETE CASCADE;
    `;

    // Modificar Orders table
    await sql`
      ALTER TABLE Orders
      DROP CONSTRAINT IF EXISTS orders_user_id_fkey,
      ADD CONSTRAINT orders_user_id_fkey FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE;
    `;

    // Modificar OrderItems table
    await sql`
      ALTER TABLE OrderItems
      DROP CONSTRAINT IF EXISTS orderitems_order_id_fkey,
      ADD CONSTRAINT orderitems_order_id_fkey FOREIGN KEY (order_id) REFERENCES Orders(id) ON DELETE CASCADE;
    `;

    await sql`
      ALTER TABLE OrderItems
      DROP CONSTRAINT IF EXISTS orderitems_product_id_fkey,
      ADD CONSTRAINT orderitems_product_id_fkey FOREIGN KEY (product_id) REFERENCES Inventory(id) ON DELETE CASCADE;
    `;

    return NextResponse.json({ message: "Tables modified successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
