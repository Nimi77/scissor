import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { z } from "zod";
import bcrypt from "bcryptjs";

const ResetPasswordSchema = z.object({
  token: z.string().min(1, "Token is required."),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.debug("Received request body:", body);

    const parsedData = ResetPasswordSchema.safeParse(body);

    if (!parsedData.success) {
      console.warn("Invalid input:", parsedData.error.format());
      return NextResponse.json({ message: "Invalid input." }, { status: 400 });
    }

    const { token, password } = parsedData.data;
    console.debug("Parsed data:", { token, password });

    // Fetching the user based on the reset token
    const result = await sql`
      SELECT * FROM users WHERE reset_token = ${token};
    `;
    console.debug("Database query result:", result.rows);

    if (
      result.rowCount === 0 ||
      new Date() > new Date(result.rows[0].reset_token_expires)
    ) {
      console.warn("Invalid or expired token.");
      return NextResponse.json(
        { message: "Invalid or expired token." },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`
      UPDATE users
      SET password = ${hashedPassword}, reset_token = NULL, reset_token_expires = NULL
      WHERE reset_token = ${token};
    `;

    console.info("Password reset successfully for token:", token);

    return NextResponse.json(
      { message: "Password reset successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json(
      { message: "An error occurred. Please try again later." },
      { status: 500 }
    );
  }
}