import { hash } from "bcryptjs"
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    console.log({ email, password });

    // // Hashing the password
    const hashedPassword = await hash(password, 10);

    // Inserting the new user into the database
    const response = await sql`
      INSERT INTO users (email, password)
      VALUES (${email}, ${hashedPassword})
    
    `;
   
  } catch (e: any) {
    console.error("Error inserting user:", e);
  }
  return NextResponse.json({ message: "success" });
}