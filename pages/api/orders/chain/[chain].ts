import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../../lib/db/connection';
import Order from '../../../../lib/db/models/Order';
import ChipotleOrder from '../../../../lib/db/models/ChipotleOrder';
import AndPizzaOrder from '../../../../lib/db/models/AndPizzaOrder';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { chain } = req.query;

  try {
    await connectDB();

    void Order;
    void ChipotleOrder;
    void AndPizzaOrder;

    const orders = await Order.find({ chainName: chain as string }).populate({
      path: 'orderContent',
      refPath: 'chainSchema',
    } as any);
    res.status(200).json(orders);
  } catch {
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
}
