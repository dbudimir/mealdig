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
    const user = await User.findOne({ resetPasswordToken: req.body.newPassword.token }).exec();

    if (!user) {
      return res.json({ message: 'The user does not exist' });
    }

    const expiration = new Date(user.resetPasswordExpires).getTime();

    // Check if the password reset token has not expired
    if (expiration > Date.now()) {
      // Update new password for user
      const password = bcrypt.hashSync(req.body.newPassword.password, 10);
      await user.updateOne({
        password,
      });
      return res.json({
        userId: user._id,
        userFullName: user.userFullName,
        email: user.email,
        userName: user.userName,
      });
    }

    res.json({ message: 'This password reset link has expired' });
  } catch {
    res.status(500).json({ error: 'Failed to confirm token' });
  }
}
