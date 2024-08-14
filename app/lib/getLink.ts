import { sql } from '@vercel/postgres';
import { QueryResult } from '@vercel/postgres';

// shape of the link data
interface Link {
  id: string;
  originalUrl: string; 
  shortUrl: string;
  customDomain?: string;
  customPath?: string;
  createdAt: Date;
}

export async function getLinkByShortUrl(shortUrl: string): Promise<Link | null> {
  try {
    const result = await sql<Link>`
      SELECT id, original_url AS "originalUrl", short_url AS "shortUrl", custom_domain AS "customDomain", custom_path AS "customPath", created_at AS "createdAt" 
      FROM links WHERE short_url = ${shortUrl} LIMIT 1;
    `;

    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching link by short URL:', error);
    throw new Error('Database query failed');
  }
}

