import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import key from '../../../key.json';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
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
      to: 'david@mealdig.com',
      subject: 'New Feedback Submitted',
      html: `<p><b>Hi David!</b></p>
      <p>New Feedback Submitted</p>
      <p>Submitted By: 
      <br />${req.body.email}</p>
      <p>Page URL:
      <br/>${req.body.pageURL}</p>
      <p>Message: 
      <br />${req.body.emailMessage}</p>
      <a href='https://mealdig.com'>MealDig.com</a>`,
    });
    res.send({ message: 'Email sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to send email' });
  }
}
