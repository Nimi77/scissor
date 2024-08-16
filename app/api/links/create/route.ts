import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { sql } from "@vercel/postgres";
import { z } from "zod";

// Schema to validate the URL
const urlSchema = z.string().url();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === "POST") {
    const { originalUrl, customDomain, customPath, createdAt } = req.body;

    try {
      const customUrl = `https://${customDomain}/${customPath}`;

      // Validate the original URL and the custom URL
      urlSchema.parse(originalUrl);
      if (customDomain && customPath) {
        urlSchema.parse(customUrl);
      }

      // Save to the database with the current date
      const result = await sql`
        INSERT INTO user_links (user_email, original_url, shortened_url, custom_domain, custom_path, created_at)
        VALUES (${session.user.email}, ${originalUrl}, ${customUrl}, ${customDomain}, ${customPath}, ${createdAt})
        RETURNING *;
      `;

      return res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Error creating custom URL:", error);

      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid URL format" });
      }

      return res.status(500).json({ message: "Failed to create custom URL" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}