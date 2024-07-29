import { NextResponse } from "next/server";
import { AuthSchema } from "@/app/schemas";
import { hash } from "bcryptjs";
import { createUser } from "@/lib/actions";

export async function handleUserRegistration(request: Request) {
  try {
    const body = await request.json();
    const result = AuthSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid field" });
    }
    const { email, password } = result.data;

    // Hashing the password
    const hashedPassword = await hash(password, 10);
    // Inserting the new user into the database
    await createUser(email, hashedPassword);
    return NextResponse.json({ message: "User registered successfully" });

  } catch (e: any) {
    console.error("Error inserting user:", e);

    if (e.message.includes("duplicate key value violates unique constraint")) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export { handleUserRegistration as POST };
