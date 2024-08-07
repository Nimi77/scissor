"use server";
import { sql } from "@vercel/postgres";

export type User = {
  id: string;
  email: string;
  password: string;
};

export async function createUser(user: Omit<User, "id">) {
  const saveUser = await sql`
        INSERT INTO users (email, password)
        VALUES (${user.email}, ${user.password})
      `;
  console.log("User created", saveUser);
  return saveUser;
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