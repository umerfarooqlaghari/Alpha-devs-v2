import { Request, Response } from 'express';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import prisma from '../lib/prisma';

const ses = new SESClient({
    region: process.env.AWS_REGION || 'us-east-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

const FROM_EMAIL = process.env.AWS_SES_FROM_EMAIL || 'info@alpha-devs.cloud';

async function sendEmail(to: string, subject: string, html: string, text: string) {
    const cmd = new SendEmailCommand({
        Source: `"Alpha Devs" <${FROM_EMAIL}>`,
        Destination: { ToAddresses: [to] },
        Message: {
            Subject: { Data: subject, Charset: 'UTF-8' },
            Body: {
                Html: { Data: html, Charset: 'UTF-8' },
                Text: { Data: text, Charset: 'UTF-8' },
            },
        },
    });
    return ses.send(cmd);
}

export const handleContactForm = async (req: Request, res: Response) => {
    const { name, email, subject, message, type, date, time } = req.body;

    if (!name || !email || !subject || !message) {
        res.status(400).json({ error: 'All fields are required' });
        return;
    }

    try {
        // Save to database
        const contact = await prisma.contact.create({
            data: {
                name,
                email,
                subject,
                message,
                type: (type as any) || 'INQUIRY',
                date: date || null,
                time: time || null,
                status: 'PENDING'
            } as any
        });

        const isBooking = type === 'BOOKING';
        const typeLabel = isBooking ? 'Meeting Booking' : 'General Inquiry';

        // 1. Admin notification
        const adminHtml = `
            <div style="font-family: sans-serif; padding: 20px; color: #333; border: 1px solid #eee; border-radius: 10px;">
                <h2 style="color: #121212; border-bottom: 2px solid #eee; padding-bottom: 10px;">New ${typeLabel}</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                ${isBooking ? `
                <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; border: 1px solid #bbf7d0; margin: 15px 0;">
                    <p style="margin: 0; color: #166534;"><strong>📅 Requested Date:</strong> ${date}</p>
                    <p style="margin: 5px 0 0; color: #166534;"><strong>🕒 Requested Time:</strong> ${time}</p>
                </div>
                ` : ''}
                <p><strong>Message:</strong></p>
                <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #121212;">
                    ${message.replace(/\n/g, '<br>')}
                </div>
            </div>
        `;
        const adminText = `Name: ${name}\nEmail: ${email}\nType: ${typeLabel}${isBooking ? `\nDate: ${date}\nTime: ${time}` : ''}\n\nMessage:\n${message}`;

        // 2. User confirmation
        const userHtml = `
            <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; padding: 30px; border-radius: 12px; background: #fff;">
                <h2 style="color: #121212; margin-bottom: 20px;">Hi ${name},</h2>
                <p style="font-size: 16px; line-height: 1.6;">Thank you for reaching out to <strong>Alpha Devs</strong>.</p>
                <p style="font-size: 16px; line-height: 1.6;">${isBooking ? `We have received your meeting request for <strong>${date}</strong> at <strong>${time}</strong>.` : `We have received your message regarding <strong>"${subject}"</strong>.`}</p>
                <p style="font-size: 16px; line-height: 1.6;">Our technical team will review it and get back to you shortly.</p>
                <div style="margin: 30px 0; padding: 20px; background: #f8fbfd; border-radius: 8px; border: 1px solid #e1e9ef;">
                    <p style="margin: 0; font-size: 14px; color: #555;"><strong>Your Message:</strong></p>
                    <p style="margin: 10px 0 0; font-style: italic; color: #333;">"${message}"</p>
                </div>
                <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;" />
                <p style="font-size: 14px; color: #666; margin: 0;">Best regards,<br><strong style="color: #121212;">The Alpha Devs Team</strong></p>
            </div>
        `;
        const userText = `Hi ${name},\n\nThank you for reaching out to Alpha Devs. ${isBooking ? `We have received your meeting request for ${date} at ${time}.` : `We have received your message regarding "${subject}".`}\n\nOur team will get back to you shortly.\n\nBest regards,\nThe Alpha Devs Team`;

        await Promise.all([
            sendEmail(FROM_EMAIL, `[${typeLabel}] ${subject} from ${name}`, adminHtml, adminText),
            sendEmail(email, isBooking ? 'Your Meeting Request with Alpha Devs' : 'We received your contact request!', userHtml, userText),
        ]);

        res.json({ message: isBooking ? 'Meeting request sent! Check your email for confirmation.' : 'Request received!', contactId: contact.id });
    } catch (error) {
        console.error('Contact form processing error:', error);
        res.status(500).json({ error: 'Failed to process your request. Please try again later.' });
    }
};

export const getContacts = async (req: Request, res: Response) => {
    try {
        const contacts = await prisma.contact.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        res.json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ error: 'Failed to fetch contact submissions' });
    }
};
export const updateContactStatus = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const contact = await prisma.contact.update({
            where: { id: id as string },
            data: { status }
        });
        res.json(contact);
    } catch (error) {
        console.error('Error updating contact status:', error);
        res.status(500).json({ error: 'Failed to update contact status' });
    }
};

export const deleteContact = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.contact.delete({
            where: { id: id as string }
        });
        res.json({ message: 'Contact deleted successfully' });
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({ error: 'Failed to delete contact' });
    }
};
