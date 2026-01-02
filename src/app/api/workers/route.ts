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

import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // 1. Check if username exists
        const existingUser = await prisma.user.findUnique({
            where: { username: body.username }
        });

        if (existingUser) {
            return NextResponse.json({ error: 'Username already exists' }, { status: 400 });
        }

        // 2. Hash password
        const hashedPassword = await bcrypt.hash(body.password, 10);

        // 3. Create User and Worker in transaction
        const result = await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    username: body.username,
                    password: hashedPassword,
                    role: 'WORKER',
                    name: body.fullName,
                    email: body.email
                }
            });

            const worker = await tx.healthWorker.create({
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

            return worker;
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create worker' }, { status: 500 });
    }
}
