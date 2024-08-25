import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { sql } from "@vercel/postgres";

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

    if (!customDomain && !customPath) {
      return NextResponse.json(
        { message: "Either custom domain or custom path must be provided" },
        { status: 400 }
      );
    }

    const result = await sql`
      UPDATE user_links
      SET 
        custom_domain = COALESCE(${customDomain}, custom_domain), 
        custom_path = COALESCE(${customPath}, custom_path)
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
  // Get the custom domain from the hostname
  const customDomain = req.nextUrl.hostname;

  try {
    console.log(`Incoming request to custom domain: ${customDomain}`);
   
    const result = await sql`
      SELECT original_url
      FROM user_links
      WHERE custom_domain = ${customDomain}
      LIMIT 1;
    `;
 
    console.log("SQL Query Result:", result);

    if (result.rowCount === 0) {
      console.warn(`No URL found for custom domain: ${customDomain}`);
      return NextResponse.json({ message: "URL not found" }, { status: 404 });
    }

    const originalUrl = result.rows[0].original_url;

    // the original URL that will be used for the redirect
    console.log(`Redirecting to original URL: ${originalUrl}`);

    // Redirect to the original URL
    return NextResponse.redirect(originalUrl, 301);
  } catch (error) {
    console.error("Error occurred while redirecting to original URL:", error);
    return NextResponse.json(
      { message: "Failed to redirect" },
      { status: 500 }
    );
  }
}