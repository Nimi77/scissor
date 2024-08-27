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
      console.log("Found original URL:", originalUrl);

      return NextResponse.json({ originalUrl });
    } else {
      console.log("URL not found");
      return NextResponse.json({ message: "URL not found" }, { status: 404 });
    }
  } catch (error) {
    console.error("Error fetching original URL:", error);

    const response = NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );

    return response;
  }
}