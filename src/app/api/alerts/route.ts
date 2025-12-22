import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/mail';

export async function GET() {
    try {
        const alerts = await prisma.alert.findMany({
            include: { category: true },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(alerts);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch alerts' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // 1. Create Alert in DB
        const alert = await prisma.alert.create({
            data: {
                message: body.message,
                type: body.type, // Emergency, Health, Disaster
                priority: body.priority, // High, Medium, Low
                channels: body.channels, // e.g. "SMS,Voice,Email"
                targetCatId: parseInt(body.targetCatId),
                status: 'SENT',
            },
            include: { category: true }
        });

        // 2. Fetch Workers in Category to send Emails
        if (body.channels.includes('Email')) {
            const workers = await prisma.healthWorker.findMany({
                where: {
                    categoryId: alert.targetCatId,
                    alertModes: { contains: 'Email' }
                }
            });

            console.log(`[EMAIL_DISPATCH] Sending to ${workers.length} workers`);

            for (const worker of workers) {
                if (worker.email) {
                    await sendEmail(
                        worker.email,
                        `🚨 ${alert.type} ALERT: ${alert.priority} Priority`,
                        `Medical Emergency System Notification:\n\nMessage: ${alert.message}\nCategory: ${alert.category.name}\n\nPlease acknowledge this alert in your dashboard.`
                    );
                }
            }
        }

        // 3. Simulate Dispatch to Cloud Services (SMS/Voice)
        console.log(`[CLOUD_MOCK] Dispatching Alert #${alert.id} to Category: ${alert.category.name}`);
        console.log(`[CLOUD_MOCK] Channels: ${alert.channels}`);
        console.log(`[CLOUD_MOCK] Message: ${alert.message}`);

        return NextResponse.json(alert);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create alert' }, { status: 500 });
    }
}
