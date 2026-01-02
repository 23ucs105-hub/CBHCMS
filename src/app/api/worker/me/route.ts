import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
    try {
        const session = await auth();

        if (!session?.user) {
            return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
        }

        // Find worker by username or email
        const worker = await prisma.healthWorker.findFirst({
            where: {
                OR: [
                    { email: session.user.email || '' },
                    { fullName: session.user.name || '' }
                ]
            },
            include: {
                category: true
            }
        });

        if (!worker) {
            return NextResponse.json({ error: 'Worker not found' }, { status: 404 });
        }

        return NextResponse.json(worker);
    } catch (error) {
        console.error('Error fetching worker info:', error);
        return NextResponse.json({ error: 'Failed to fetch worker info' }, { status: 500 });
    }
}
