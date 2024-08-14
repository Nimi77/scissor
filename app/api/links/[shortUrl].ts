import { NextApiRequest, NextApiResponse } from 'next';
import { getLinkByShortUrl } from '@/app/lib/getLink';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { shortUrl } = req.query;

  try {
    const link = await getLinkByShortUrl(shortUrl as string);

    if (link) {
      // Redirect to the original URL
      res.redirect(link.originalUrl);
    } else {
      res.status(404).json({ message: 'Link not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
}
