import { NextResponse } from "next/server";
import { AuthSchema } from "@/app/schemas";
import { hash } from "bcryptjs";
import { createUser } from "@/app/lib/actions";

export async function POST(request: Request) {
  try {
    const registerData = await request.json();
    const validatedField = AuthSchema.safeParse(registerData);

    if (!validatedField.success) {
      return NextResponse.json({ error: "Invalid field" });
    }

    const { email, password } = validatedField.data;
    const hashedPassword = await hash(password, 10);
    const user = {
      email,
      password: hashedPassword,
    };

    // Inserting the new user into the database
    await createUser(user);
    return NextResponse.json({ message: "Registration Successfully!" });
  } catch (error: any) {
    console.error("Error inserting user", error);

    if (
      error.message.includes("duplicate key value violates unique constraint")
    ) {
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
