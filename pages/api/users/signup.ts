import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/db/connection';
import User from '../../../lib/db/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();
    const user = new User(req.body);
    const result = await user.save();
    res.status(200).json(result);
  } catch {
    res.status(500).json({ error: 'Failed to create user' });
  }
}
