import { NextApiRequest } from 'next';
import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(req: NextApiRequest) {
  try {
    const { email } = req.body;

    const result = await sql`SELECT id FROM users WHERE email = ${email}`;

    const user = result.rows[0];

    if (user) {
      // Email already exists
      return NextResponse.json({ error: "Email already exists" });
    }
    
    return NextResponse.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error", error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
