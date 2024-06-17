import { sql } from '@vercel/postgres';
import dotenv from 'dotenv';

dotenv.config();

export async function fetchUsers() {
  try {
    const result = await sql`
      SELECT * FROM Users;
    `;
    console.log(result);
  } catch (error) {
    console.error('Error fetching users:', error);
  }
}
