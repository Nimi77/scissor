import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(
  request: NextRequest,
  { params }: { params: { shortUrl: string } }
) {
  try {
    const { shortUrl } = params;
    console.log("Received short URL:", shortUrl);

    // SQL query to retrieve the original URL from the database
    const query = `
      SELECT original_url
      FROM url_mappings
      WHERE short_url = $1;
    `;

    const result = await sql.query(query, [shortUrl]);
    console.log("Database query result:", result.rows);

    if (result.rows.length > 0) {
      const originalUrl = result.rows[0].original_url;
      console.log("Redirecting to original URL:", originalUrl);
      return NextResponse.redirect(originalUrl);
    } else {
      console.log("URL not found for short URL:", shortUrl); 
      return NextResponse.json({ message: "URL not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching original URL:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}