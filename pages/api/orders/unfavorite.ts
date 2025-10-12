import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/db/connection';
import Order from '../../../lib/db/models/Order';
import User from '../../../lib/db/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await connectDB();
      const result = {
        order: await Order.updateOne(
          { _id: req.body.orderId },
          { $inc: { favoriteCount: -1 }, $pull: { usersFavorited: req.body.userId } }
        ).exec(),
        user: await User.updateOne({ _id: req.body.userId }, { $pullAll: { favorites: req.body.orderId } }).exec(),
      };
      res.status(200).json(result);
    } catch {
      res.status(500).json({ error: 'Failed to unfavorite order' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
