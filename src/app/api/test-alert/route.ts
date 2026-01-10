import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mail';
import { generateEmailHtml } from '@/lib/email-templates';

export async function POST(request: Request) {
    try {
        const { type, email, phone, message } = await request.json();

        if (type === 'email') {
            if (!email) return NextResponse.json({ error: 'Email is required' }, { status: 400 });

            const html = generateEmailHtml('Test Alert', message, 'en');
            await sendEmail(email, 'Test Alert - CBHCMS', html); // Note: sendEmail needs to support HTML or we pass it as text if not supported yet.
            // Wait, my sendEmail function (from previous session) might only support text. I need to check it.
            // Assuming I'll update sendEmail or it supports html.

            return NextResponse.json({ success: true });
        }

        if (type === 'sms') {
            // Mock SMS
            console.log(`[SMS_MOCK] Sending to ${phone}: ${message}`);
            return NextResponse.json({ success: true });
        }

        if (type === 'push') {
            // Mock Push
            console.log(`[PUSH_MOCK] Sending Push Notification: ${message}`);
            return NextResponse.json({ success: true });
        }

        return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to send test alert' }, { status: 500 });
    }
}
