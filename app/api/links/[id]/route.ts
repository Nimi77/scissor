import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { sql } from "@vercel/postgres";
import { z } from "zod";

const urlSchema = z.string().url();

export async function PATCH(req: NextRequest) {
  const session = await getToken({ req });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const id = req.nextUrl.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json({ message: "Invalid link ID" }, { status: 400 });
  }

  try {
    const body = await req.json();
    const { customDomain, customPath } = body;

    let customUrl = customDomain ? `https://${customDomain}` : "";
    if (customPath) {
      customUrl = customUrl
        ? `${customUrl}/${customPath}`
        : `https://${customDomain}/${customPath}`;
    }

    if (customDomain) {
      urlSchema.parse(customUrl);
    }

    const result = await sql`
      UPDATE user_links
      SET 
        custom_domain = COALESCE(${customDomain}, custom_domain),
        custom_path = COALESCE(${customPath}, custom_path),
        shortened_url = ${customUrl} 
      WHERE id = ${id} AND user_email = ${session.email}
      RETURNING *;
    `;

    console.log("Database Update Result:", result);

    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: "Link not found or not authorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error("Error updating link:", error);
    return NextResponse.json(
      { message: "Failed to update link" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const session = await getToken({ req });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const id = req.nextUrl.pathname.split("/").pop();
  if (!id) {
    return NextResponse.json({ message: "Invalid link ID" }, { status: 400 });
  }

  try {
    const result = await sql`
      DELETE FROM user_links
      WHERE id = ${id} AND user_email = ${session.email}
      RETURNING *;
    `;

    if (result.rowCount === 0) {
      return NextResponse.json(
        { message: "Link not found or not authorized" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Link deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting link:", error);
    return NextResponse.json(
      { message: "Failed to delete link" },
      { status: 500 }
    );
  }
}

// GET method for redirecting to the original URL
export async function GET(req: NextRequest) {
  const { href: customUrl } = req.nextUrl;

  console.log(`Incoming request with custom URL: ${customUrl}`);

  try {
    const result = await sql`
      UPDATE user_links
      SET clicks = clicks + 1
      WHERE shortened_url = ${customUrl}
      RETURNING original_url;
    `;
    console.log(result)
    
    if (result.rowCount === 0) {
      console.error(`No URL found for: ${customUrl}`);
      return NextResponse.json({ message: "URL not found" }, { status: 404 });
    }

    const originalUrl = result.rows[0].original_url;
    console.log(originalUrl);
    console.log(`Redirecting to original URL: ${originalUrl}`);

    return NextResponse.redirect(originalUrl, 301);
  } catch (error) {
    console.error("Error occurred while redirecting to original URL:", error);
    return NextResponse.json(
      { message: "Failed to redirect" },
      { status: 500 }
    );
  }
}