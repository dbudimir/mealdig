import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import key from '../../../key.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const userData = req.body.data;

  // Determine reset URL based on location
  let resetURL = 'http://localhost:3000/reset-password?=';
  if (userData.location !== 'http://localhost:8040') {
    resetURL = 'https://mealdig.com/reset-password/?=';
  }

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      type: 'OAuth2',
      user: 'david@mealdig.com',
      serviceClient: key.client_id,
      privateKey: key.private_key,
    },
  });

  try {
    await transporter.verify();
    await transporter.sendMail({
      from: 'noreply@mealdig.com',
      to: userData.email,
      subject: 'Reset your MealDig password.',
      html: `<p><b>Hi ${userData.userFullName}</b></p>
      <p>You're receiving this email because you just requested to reset your password. Click on the link below to update your password now.</p>
      <a href='${resetURL}${userData.resetPasswordToken}'>Reset Here</a>`,
    });
    res.send({ message: 'Email sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send email' });
  }
}
