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

// import { NextApiRequest, NextApiResponse } from 'next';
// import { sql } from '@vercel/postgres';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { shortened_url } = req.query;

//   // confirming that shortened_url is a string
//   const shortenedUrl = Array.isArray(shortened_url) ? shortened_url[0] : shortened_url;

//   if (!shortenedUrl) {
//     return res.status(400).json({ error: 'Invalid URL' });
//   }

//   try {
//     const result = await sql`
//       SELECT original_url
//       FROM user_links
//       WHERE shortened_url = ${shortenedUrl}
//     `;

//     if (result.rowCount === 0) {
//       return res.status(404).json({ error: 'URL not found' });
//     }

//     const originalUrl = result.rows[0].original_url;
//     res.redirect(originalUrl);
//   } catch (error) {
//     console.error('Error redirecting to original URL:', error);
//     res.status(500).json({ error: 'Failed to redirect' });
//   }
// }
