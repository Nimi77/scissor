import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { customAlphabet } from "nanoid";
import { sql } from "@vercel/postgres";

const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTWXYZ0123456789";
const nanoid = customAlphabet(alphabet, 6);

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ message: "Invalid URL" }, { status: 400 });
    }

    // Extracting the user's token to get the email (if authenticated)
    const token = await getToken({ req: request });
    const email = token?.email || null;

    const shortId = nanoid();

    const result = await sql`
      INSERT INTO user_urls (short_url, original_url, user_email, click_count)
      VALUES (${shortId}, ${url}, ${email}, 0)
      RETURNING short_url;
    `;

    return NextResponse.json({
      shortUrl: `${request.nextUrl.origin}/${result.rows[0].short_url}`,
    });
  } catch (error) {
    console.error("Error creating short URL:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}