import { NextRequest, NextResponse } from "next/server";
import { customAlphabet } from "nanoid";
import { sql } from "@vercel/postgres";

// Nanoid configuration for generating unique short URLs
const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTWXYZ0123456789";
const nanoid = customAlphabet(alphabet, 10);

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url || typeof url !== "string") {
      return NextResponse.json({ message: "Invalid URL" }, { status: 400 });
    }

    const shortId = nanoid();

    // SQL query to insert the mapping into the database
    const query = `
      INSERT INTO url_mappings (short_url, original_url)
      VALUES ($1, $2)
      RETURNING short_url;
    `;

    const values = [shortId, url];

    const result = await sql.query(query, values);
    console.log("Database insertion result:", result.rows);

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