import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(
  req: NextRequest,
  { params }: { params: { shortUrl: string } }
) {
  try {
    const query = `
      UPDATE user_urls
      SET click_count = click_count + 1
      WHERE short_url = $1
      RETURNING original_url;
    `;

    const result = await sql.query(query, [params.shortUrl]);

    if (result.rows.length > 0) {
      const originalUrl = result.rows[0].original_url;
      console.log("Found original URL:", originalUrl);

      return NextResponse.json({ originalUrl });
    } else {
      console.log("URL not found, redirecting to home page");
      return NextResponse.redirect(new URL("/", req.url));  
    }
  } catch (error) {
    console.error("Error fetching original URL:", error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}