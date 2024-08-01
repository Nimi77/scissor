import { verifyUserCredentials } from "@/lib/actions";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user = await verifyUserCredentials(email, password);
  if (user) {
    return NextResponse.json(user, { status: 200 });
  } else {
    return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 });
  }
}
