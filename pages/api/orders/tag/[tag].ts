import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../../lib/db/connection';
import Order from '../../../../lib/db/models/Order';
import User from '../../../../lib/db/models/User';
import ChipotleOrder from '../../../../lib/db/models/ChipotleOrder';
import AndPizzaOrder from '../../../../lib/db/models/AndPizzaOrder';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { tag } = req.query;

  try {
    await connectDB();

    void Order;
    void User;
    void ChipotleOrder;
    void AndPizzaOrder;

    const orders = await Order.find({ tags: tag as string })
      .populate({ path: 'users' })
      .populate({ path: 'orderContent', refPath: 'chainSchema' } as any);
    res.status(200).json(orders);
  } catch {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
}
