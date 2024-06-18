import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    // Creating Users table
    await sql`
      CREATE TABLE IF NOT EXISTS Users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL
      );
    `;

    // Creating Inventory table
    await sql`
      CREATE TABLE IF NOT EXISTS Inventory (
        id SERIAL PRIMARY KEY,
        product_name VARCHAR(100),
        quantity INT,
        price DECIMAL,
        user_id INT REFERENCES Users(id) ON DELETE CASCADE
      );
    `;

    // Creating InventoryDetails table
    await sql`
      CREATE TABLE IF NOT EXISTS InventoryDetails (
        id SERIAL PRIMARY KEY,
        inventory_id INT REFERENCES Inventory(id) ON DELETE CASCADE,
        description TEXT,
        manufacturer VARCHAR(100),
        expiry_date DATE
      );
    `;

    // Creating Orders table
    await sql`
      CREATE TABLE IF NOT EXISTS Orders (
        id SERIAL PRIMARY KEY,
        user_id INT REFERENCES Users(id) ON DELETE CASCADE,
        order_date TIMESTAMP,
        total DECIMAL
      );
    `;

    // Creating OrderItems table
    await sql`
      CREATE TABLE IF NOT EXISTS OrderItems (
        id SERIAL PRIMARY KEY,
        order_id INT REFERENCES Orders(id) ON DELETE CASCADE,
        product_id INT REFERENCES Inventory(id) ON DELETE CASCADE,
        quantity INT,
        price DECIMAL
      );
    `;

    return NextResponse.json({ message: "Tables created successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
