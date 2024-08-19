import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(
  req: NextRequest,
  { params }: { params: { shortUrl: string } }
) {
  try {
    console.log("Received short URL:", params.shortUrl);

    // SQL query to retrieve the original URL from the database
    const query = `
      SELECT original_url
      FROM url_mappings
      WHERE short_url = $1;
    `;

    const result = await sql.query(query, [params.shortUrl]);
    console.log("Database query result:", result.rows);

    if (result.rows.length > 0) {
      const originalUrl = result.rows[0].original_url;
      console.log("Redirecting to original URL:", originalUrl);

      // Create a new response with a redirect
      const response = NextResponse.redirect(originalUrl);

      response.headers.set(
        "Access-Control-Allow-Origin",
        "https://linktrim.vercel.app"
      );

      return response;
    } else {
      console.log("URL not found for short URL:", params.shortUrl);

      const response = NextResponse.json(
        { message: "URL not found" },
        { status: 404 }
      );
      response.headers.set(
        "Access-Control-Allow-Origin",
        "https://linktrim.vercel.app"
      );

      return response;
    }
  } catch (error) {
    console.error("Error fetching original URL:", error);

    const response = NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
    response.headers.set(
      "Access-Control-Allow-Origin",
      "https://linktrim.vercel.app"
    );

    return response;
  }
}