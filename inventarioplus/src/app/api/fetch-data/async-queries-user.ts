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

export async function getUserByEmail(email: string) {
  try {
    const result = await sql`
      SELECT email
      FROM Users
      WHERE email = ${email};
    `;
    return result.rows;
  } catch (error) {
    console.error('Error fetching user:', error);
    return [];
  }
}

export async function getUserNameByEmail(email: string) {
  try {
    const result = await sql`
      SELECT name
      FROM Users
      WHERE email = ${email};
    `;
    return result.rows;
  } catch (error) {
    console.error('Error fetching user:', error);
    return [];
  }
}

export async function getUserIDByEmail(email: string) {
  try {
    const result = await sql`
      SELECT id
      FROM Users
      WHERE email = ${email};
    `;
    return result.rows;
  } catch (error) {
    console.error('Error fetching user:', error);
    return [];
  }
}