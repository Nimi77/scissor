import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { sql } from '@vercel/postgres';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });

    if (!session) {
        console.log('Unauthorized access attempt');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    if (req.method === 'GET') {
        try {
            const result = await sql`
                SELECT * FROM user_links
                WHERE user_email = ${session.user.email}
                ORDER BY created_at DESC;
            `;

            console.log('Links fetched successfully:', result.rows);

            return res.status(200).json(result.rows);
        } catch (error) {
            console.error('Error fetching links:', error);
            return res.status(500).json({ message: 'Failed to fetch links' });
        }
    }

    console.log('Invalid method used');
    return res.status(405).json({ message: 'Method not allowed' });
}