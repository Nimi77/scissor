"use server";
import { sql } from "@vercel/postgres";

export type User = {
  id: string;
  email: string;
  password: string;
};

export async function createUser(email: string, hashedPassword: string) {
  try {
    const result = await sql`
        INSERT INTO users (email, password)
        VALUES (${email}, ${hashedPassword})
      `;
    console.log("User created", result);
    return result;
  } catch (error) {
    console.log("Internal server error", error);
    throw new Error("Failed to create user.");
  }
}

export async function getUser(email: string) {
  console.log("getUser", email);
  try {
    const result = await sql`SELECT * FROM users WHERE email = ${email}`;
    console.log("result", result);

    return result?.rows[0] as User;
  } catch (error) {
    console.log("Internal server error", error);
    throw new Error("Failed to fetch user.");
  }
}
