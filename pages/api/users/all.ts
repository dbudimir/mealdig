import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/db/connection';
import User from '../../../lib/db/models/User';
import Order from '../../../lib/db/models/Order';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();
    const query = User.find({}) as any;
    const allUsers = await query.deepPopulate(['orders']);
    res.status(200).json(allUsers);
  } catch {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}
