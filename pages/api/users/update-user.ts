import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../lib/db/connection';
import User from '../../../lib/db/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.body._id },
      {
        $set: {
          userFullName: req.body.userFullName,
          userName: req.body.userName,
          email: req.body.email,
          accessLevel: req.body.accessLevel,
        },
      }
    );
    res.status(200).json(updatedUser);
  } catch {
    res.status(500).json({ error: 'Failed to update user' });
  }
}
