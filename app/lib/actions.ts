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