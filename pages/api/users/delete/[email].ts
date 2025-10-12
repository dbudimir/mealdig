import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../../lib/db/connection';
import User from '../../../../lib/db/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.query;

  try {
    await connectDB();
    const deleted = await User.findOneAndDelete({ email: email as string });
    res.status(200).json(deleted);
  } catch {
    res.status(500).json({ error: 'Failed to delete user' });
  }
}
