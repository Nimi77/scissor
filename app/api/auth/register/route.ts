import { hash } from "bcryptjs";
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Hashing the password
    const hashedPassword = await hash(password, 10);

    // Inserting the new user into the database
    await sql`
      INSERT INTO users (email, password)
      VALUES (${email}, ${hashedPassword})
    `;

    return NextResponse.json({ message: "User registered successfully" });
  } catch (e: any) {
    console.error("Error inserting user:", e);
    if (e.message.includes("duplicate key value violates unique constraint")) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}