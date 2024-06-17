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