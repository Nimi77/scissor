import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { sql } from "@vercel/postgres";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { id } = req.query;

  if (typeof id !== "string") {
    return res.status(400).json({ message: "Invalid link ID" });
  }

  if (req.method === "PATCH") {
    const { customDomain, customPath } = req.body;

    try {
      // Update the link in the database
      const result = await sql`
        UPDATE user_links
        SET custom_domain = ${customDomain}, custom_path = ${customPath}
        WHERE id = ${id} AND user_email = ${session.user.email}
        RETURNING *;
      `;

      if (result.rowCount === 0) {
        return res
          .status(404)
          .json({ message: "Link not found or not authorized" });
      }

      return res.status(200).json(result.rows[0]);
    } catch (error) {
      console.error("Error updating link:", error);
      return res.status(500).json({ message: "Failed to update link" });
    }
  } else if (req.method === "DELETE") {
    try {
      // Delete the link from the database
      const result = await sql`
        DELETE FROM user_links
        WHERE id = ${id} AND user_email = ${session.user.email}
        RETURNING *;
      `;

      if (result.rowCount === 0) {
        return res
          .status(404)
          .json({ message: "Link not found or not authorized" });
      }

      return res.status(200).json({ message: "Link deleted successfully" });
    } catch (error) {
      console.error("Error deleting link:", error);
      return res.status(500).json({ message: "Failed to delete link" });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
}
