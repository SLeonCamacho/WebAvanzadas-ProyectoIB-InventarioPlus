import { sql } from '@vercel/postgres';

export async function getUserByEmailAndPassword(email: string, password: string) {
  try {
    const result = await sql`
      SELECT email, password
      FROM Users
      WHERE email = ${email} AND password = ${password};
    `;
    return result.rows;
  } catch (error) {
    console.error('Error fetching user:', error);
    return [];
  }
}
