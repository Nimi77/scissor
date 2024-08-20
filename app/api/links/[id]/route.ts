import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { sql } from "@vercel/postgres";

export async function PATCH(req: NextRequest) {
  // `getToken` to retrieve the session
  const session = await getToken({ req });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Extracting ID from the path
  const id = req.nextUrl.pathname.split("/").pop();

  if (!id) {
    return NextResponse.json({ message: "Invalid link ID" }, { status: 400 });
  }

  // Safely parse JSON body
  let body: { customDomain: string; customPath: string };
  try {
    body = await req.json();
  } catch (error) {
    return NextResponse.json({ message: "Invalid JSON" }, { status: 400 });
  }

  const { customDomain, customPath } = body;

  try {
    const result = await sql`
      UPDATE user_links
      SET custom_domain = ${customDomain}, custom_path = ${customPath}
      WHERE id = ${id} AND user_email = ${session.email}
      RETURNING *;
    `;

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
  // Extracting the ID from the path
  console.log("GET request received");

  const id = req.nextUrl.pathname.split("/").pop();
  console.log(`ID extracted from URL: ${id}`);  

  if (!id) {
    console.error("Invalid link ID");
    return NextResponse.json({ message: "Invalid link ID" }, { status: 400 });
  }

  try {
    const result = await sql`
      SELECT original_url
      FROM user_links
      WHERE id = ${id}
      LIMIT 1;
    `;

    console.log(`Database query result: ${JSON.stringify(result)}`);

    if (result.rowCount === 0) {
      console.error("URL not found");
      return NextResponse.json({ message: "URL not found" }, { status: 404 });
    }

    const originalUrl = result.rows[0].original_url;
    console.log(`Redirecting to: ${originalUrl}`);  

    return NextResponse.redirect(originalUrl, 301);
  } catch (error) {
    console.error("Error redirecting to original URL:", error);
    return NextResponse.json(
      { message: "Failed to redirect" },
      { status: 500 }
    );
  }
}