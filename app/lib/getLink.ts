import { sql } from '@vercel/postgres';

interface Link {
  id: string;
  originalUrl: string; 
  customUrl: string;
  customDomain?: string;
  customPath?: string;
  createdAt: Date;
}

export async function getLinkByShortUrl(customUrl: string): Promise<Link | null> {
  try {
    const result = await sql<Link>`
      SELECT id, original_url AS "originalUrl", shortened_url AS "customUrl", custom_domain AS "customDomain", custom_path AS "customPath", created_at AS "createdAt" 
      FROM links WHERE custom_url = ${customUrl} LIMIT 1;
    `;

    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error fetching link by custom URL:', error);
    throw new Error('Database query failed');
  }
}

