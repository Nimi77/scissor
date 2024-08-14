import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { sql } from "@vercel/postgres";
import { z } from "zod";

const urlSchema = z.string().url();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method === "POST") {
    const { originalUrl, customDomain, customPath } = req.body;

    try {
      // Construct the custom URL
      const shortenedUrl = `https://${customDomain}/${customPath}`;

      // Validate the custom URL
      urlSchema.parse(`https://${shortenedUrl}`);

      // Save to the database
      const result = await sql`
        INSERT INTO user_links (user_email, original_url, shortened_url, custom_domain, custom_path, created_at)
        VALUES (${session.user.email}, ${originalUrl}, ${shortenedUrl}, ${customDomain}, ${customPath}, NOW())
        RETURNING *;
      `;

      return res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Error creating shortened URL:", error);
      return res.status(500).json({ message: "Failed to create shortened URL" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}