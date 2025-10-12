import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../../lib/db/connection';
import Order from '../../../../lib/db/models/Order';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { id } = req.query;

  try {
    await connectDB();

    void Order;

    const deleted = await Order.findOneAndDelete({ _id: id as string });
    res.status(200).json(deleted);
  } catch {
    res.status(500).json({ error: 'Failed to delete order' });
  }
}
