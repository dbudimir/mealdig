import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/db/connection';
import User from '../../../lib/db/models/User';
import Order from '../../../lib/db/models/Order';
import ChipotleOrder from '../../../lib/db/models/ChipotleOrder';
import AndPizzaOrder from '../../../lib/db/models/AndPizzaOrder';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { userName } = req.query;

  if (!userName || typeof userName !== 'string') {
    return res.status(400).json({ error: 'Invalid username' });
  }

  try {
    await connectDB();

    void Order;
    void ChipotleOrder;
    void AndPizzaOrder;

    const user = await User.find({ userName }).populate({
      path: 'orders',
      populate: { path: 'orderContent' },
    });
    res.status(200).json(user);
  } catch {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
}
