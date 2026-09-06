'use server';

import { Resend } from 'resend';

export async function sendContactEmail(formData: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      return { error: 'Missing required fields' };
    }

    if (!process.env.RESEND_API_KEY)
      return { error: 'Contact service unavailable' };
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: 'Portfolio Contact Form <hello@wahyumhd.com>', // Using verified domain
      to: process.env.CONTACT_EMAIL || 'ipwahyumahendra@gmail.com', // Replace with their actual email or use env variable
      subject: `New Message from ${name} via Portfolio`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    });

    if (error) return { error: 'Failed to send email' };
    return { success: true };
  } catch {
    return { error: 'Failed to send email' };
  }
}
