import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function GET(
  req: NextRequest,
  { params }: { params: { shortUrl: string } }
) {
  try {
    const query = `
      SELECT original_url
      FROM url_mappings
      WHERE short_url = $1;
    `;

    const result = await sql.query(query, [params.shortUrl]);

    if (result.rows.length > 0) {
      const originalUrl = result.rows[0].original_url;
      console.log("Redirecting to original URL:", originalUrl);

      const response = NextResponse.redirect(originalUrl);

      //  CORS headers for  API responses
      response.headers.set(
        "Access-Control-Allow-Origin",
        "https://linktrim.vercel.app"
      );
      response.headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS"
      );
      response.headers.set("Access-Control-Allow-Headers", "Content-Type");

      return response;
    } else {
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