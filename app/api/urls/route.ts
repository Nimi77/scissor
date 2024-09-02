import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { sql } from "@vercel/postgres";

export const GET = async (req: NextRequest) => {
  const session = await getToken({ req });

  if (!session) {
    console.log("Unauthorized access attempt.");
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const result = await sql`
      SELECT * FROM user_urls
      WHERE user_email = ${session.email}
      ORDER BY created_at DESC;
    `;

    console.log("Fetched links for user:", session.email, result.rows);

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching links for user:", session.email, error);
    return NextResponse.json(
      { message: "Failed to fetch links" },
      { status: 500 }
    );
  }
};

export const OPTIONS = async () => {
  return NextResponse.json({}, { status: 200 });
};