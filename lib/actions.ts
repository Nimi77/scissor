"use server";
import { sql } from "@vercel/postgres";
import pool from "./db";
import bcrypt from "bcryptjs";

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

export async function verifyUserCredentials(email: string, password: string) {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (res.rows.length > 0) {
      const user = res.rows[0];

      //verify the password using bcrypt
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        return {
          id: user.id,
          email: user.email,
        };
      }else{
        return null;      
      }
    }
  } finally {
    client.release();
  }
}