import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { sql } from "@vercel/postgres";

export async function DELETE(req: NextRequest) {
  const session = await getToken({ req });

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const id = req.nextUrl.pathname.split("/").pop();
  if (!id) {
    console.log("Invalid link ID");
    return NextResponse.json({ message: "Invalid link ID" }, { status: 400 });
  }

  try {
    const result = await sql`
        DELETE FROM user_urls
        WHERE id = ${id} AND user_email = ${session.email}
        RETURNING *;
      `;

    console.log("Delete result:", result);

    if (result.rowCount === 0) {
      console.log("Link not found or user not authorized to delete it");
      return NextResponse.json(
        { message: "Link not found or not authorized" },
        { status: 404 }
      );
    }

    console.log("Link deleted successfully");
  } catch (error) {
    console.error("Error deleting link:", error);
    return NextResponse.json(
      { message: "Failed to delete link" },
      { status: 500 }
    );
  }
}