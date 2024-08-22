import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { sql } from "@vercel/postgres";
import { z } from "zod";

// Schema to validate the URL
const urlSchema = z.string().url();

export const POST = async (req: NextRequest) => {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const { originalUrl, customDomain, customPath } = await req.json();

    // Constructing a base URL using the customDomain provided by the user
    let customUrl = `https://${customDomain}`;

    // If customPath is present, it appends it to the customUrl
    if (customPath) {
      customUrl = `${customUrl}/${customPath}`;
    }

    urlSchema.parse(originalUrl);
    if (customDomain) {
      urlSchema.parse(customUrl);
    }

    const result = await sql`
      INSERT INTO user_links (user_email, original_url, shortened_url, custom_domain, custom_path)
      VALUES (${token.email}, ${originalUrl}, ${customUrl}, ${customDomain}, ${customPath})
      RETURNING *;
    `;

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error("Error creating custom URL:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid URL format" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Failed to create custom URL" },
      { status: 500 }
    );
  }
};

export const OPTIONS = async () => {
  return NextResponse.json({}, { status: 200 });
};