import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import key from '../../../key.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const userData = req.body.data;

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
      subject: 'Success! Your password has been reset.',
      html: `<p><b>Hi ${userData.userFullName}</b></p>
      <p>Your password has been succesfully reset.</p>
      <a href='https://mealdig.com'>MealDig.com</a>`,
    });
    res.send({ message: 'Email sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send email' });
  }
}
