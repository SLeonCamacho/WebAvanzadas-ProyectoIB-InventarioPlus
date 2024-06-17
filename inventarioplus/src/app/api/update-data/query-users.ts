import { sql } from '@vercel/postgres';

export async function updateUserPass(email: string, password: string) {
    try {
        const result = await sql`
    UPDATE Users 
    SET password = ${password}
    WHERE email = ${email}
      RETURNING *;
  `;
        return result.rows;
    } catch (error) {
        console.error('Error updating password:', error);
        return [];
    }
}
