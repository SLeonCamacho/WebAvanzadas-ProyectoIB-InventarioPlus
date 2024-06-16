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
        user_id INT REFERENCES Users(id)
      );
    `;

    return NextResponse.json({ message: "Tables created successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
