import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { sql } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });

    if (!session) {
        console.log('Unauthorized access attempt');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (req.method === 'POST') {
        const { originalUrl, shortenedUrl, linkName } = req.body;

        try {
            const result = await sql`
                INSERT INTO user_links (user_email, original_url, shortened_url, link_name)
                VALUES (${session.user.email}, ${originalUrl}, ${shortenedUrl}, ${linkName})
                RETURNING *;
            `;

            console.log('Link created successfully:', result.rows[0]);

            return res.status(200).json(result.rows[0]);
        } catch (error) {
            console.error('Error creating link:', error);
            return res.status(500).json({ message: 'Failed to create link' });
        }
    }

    console.log('Invalid method used');
    return res.status(405).json({ message: 'Method not allowed' });
}