import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/db/connection';
import Chain from '../../../lib/db/models/Chain';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();

    // Ensure all models are registered before populate
    void Chain;

    const chains = await Chain.find({});
    res.status(200).json(chains);
  } catch {
    res.status(500).json({ error: 'Failed to fetch chains' });
  }
}
