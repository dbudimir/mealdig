import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import connectDB from '../../../lib/db/connection';
import User from '../../../lib/db/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();
    const user = await User.findOne({ email: req.body.email }).exec();

    if (!user) {
      res.status(400).json({
        message: 'The email does not exist',
        emailMatch: false,
      });
      return;
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
      res.status(400).json({
        message: 'The password is invalid',
        passwordMatch: false,
      });
      return;
    }

    res.status(200).json({
      userId: user._id,
      userFullName: user.userFullName,
      userName: user.userName,
      email: user.email,
      accessLevel: user.accessLevel,
    });
  } catch {
    res.status(500).json({ error: 'Failed to login' });
  }
}
