import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

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
                channels: body.channels, // e.g. "SMS,Voice"
                targetCatId: parseInt(body.targetCatId),
                status: 'SENT',
            },
            include: { category: true }
        });

        // 2. Simulate Dispatch to Cloud Services
        // In a real app, this would call AWS SNS, Twilio, etc.
        // Here we just log it or call our simulation endpoint internally? 
        // We'll log to console for Server-Side logging.
        console.log(`[CLOUD_MOCK] Dispatching Alert #${alert.id} to Category: ${alert.category.name}`);
        console.log(`[CLOUD_MOCK] Channels: ${alert.channels}`);
        console.log(`[CLOUD_MOCK] Message: ${alert.message}`);

        return NextResponse.json(alert);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create alert' }, { status: 500 });
    }
}
