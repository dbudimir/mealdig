import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/db/connection';
import Order from '../../../lib/db/models/Order';
import Chain from '../../../lib/db/models/Chain';
import User from '../../../lib/db/models/User';
import ChipotleOrder from '../../../lib/db/models/ChipotleOrder';
import AndPizzaOrder from '../../../lib/db/models/AndPizzaOrder';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Ensure all models are registered before populate
  void User;
  void Order;
  void Chain;
  void ChipotleOrder;
  void AndPizzaOrder;

  try {
    await connectDB();
    const query = Order.find({}) as any;
    const orders = await query
      .deepPopulate(['chain', 'users', 'orderContent'])
      .populate({ path: 'orderContent', refPath: 'chainSchema' });
    res.status(200).json(orders);
  } catch {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
}
