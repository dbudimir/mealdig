import type { NextApiRequest, NextApiResponse } from 'next';
import crypto from 'crypto';
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
      return res.json({ message: 'The email does not exist' });
    }

    // Create and save password reset token
    const token = crypto.randomBytes(20).toString('hex');
    await user.updateOne({
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 360000,
    });

    // Send updated user data back to client
    res.json({
      userId: user._id,
      userFullName: user.userFullName,
      email: user.email,
      userName: user.userName,
      resetPasswordToken: token,
      resetPasswordExpires: Date.now() + 360000,
    });
  } catch {
    res.status(500).json({ error: 'Failed to process request' });
  }
}
