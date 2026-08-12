'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendContactEmail(formData: { name: string; email: string; message: string }) {
    try {
        const { name, email, message } = formData;

        if (!name || !email || !message) {
            return { error: 'Missing required fields' };
        }

        const data = await resend.emails.send({
            from: 'Portfolio Contact Form <hello@wahyumhd.com>', // Using verified domain
            to: process.env.CONTACT_EMAIL || 'ipwahyumahendra@gmail.com', // Replace with their actual email or use env variable
            subject: `New Message from ${name} via Portfolio`,
            replyTo: email,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `
                <h3>New message from your portfolio website</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Message:</strong></p>
                <p>${message.replace(/\n/g, '<br>')}</p>
            `,
        });

        return { success: true, data };
    } catch (error) {
        return { error: 'Failed to send email' };
    }
}
