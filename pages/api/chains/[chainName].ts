import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/db/connection';
import Chain from '../../../lib/db/models/Chain';
import Order from '../../../lib/db/models/Order';
import ChipotleOrder from '../../../lib/db/models/ChipotleOrder';
import AndPizzaOrder from '../../../lib/db/models/AndPizzaOrder';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { chainName } = req.query;

  try {
    await connectDB();

    // Ensure all models are registered before populate
    void Order;
    void ChipotleOrder;
    void AndPizzaOrder;

    const chain = await Chain.findOne({ name: chainName as string }).populate({
      path: 'orders',
      populate: { path: 'orderContent', refPath: 'contentSchema' } as any,
    });
    res.status(200).json(chain);
  } catch (error) {
    console.error('Error in /api/chains/[chainName]:', error);
    res
      .status(500)
      .json({ error: 'Failed to fetch chain', details: error instanceof Error ? error.message : 'Unknown error' });
  }
}
