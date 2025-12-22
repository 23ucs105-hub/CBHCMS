import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const workers = await prisma.healthWorker.findMany({
            include: { category: true },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(workers);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch workers' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const worker = await prisma.healthWorker.create({
            data: {
                fullName: body.fullName,
                phone: body.phone,
                email: body.email,
                location: body.location || '',
                alertModes: body.alertModes || 'SMS',
                categoryId: parseInt(body.categoryId),
                isActive: body.isActive ?? true,
            },
        });
        return NextResponse.json(worker);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create worker' }, { status: 500 });
    }
}
