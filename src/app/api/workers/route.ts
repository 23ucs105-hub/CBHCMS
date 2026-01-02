import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

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

export async function PUT(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Worker ID required' }, { status: 400 });
        }

        const body = await request.json();

        // Update worker and optionally user
        const result = await prisma.$transaction(async (tx) => {
            // Update worker
            const worker = await tx.healthWorker.update({
                where: { id: parseInt(id) },
                data: {
                    fullName: body.fullName,
                    phone: body.phone,
                    email: body.email,
                    location: body.location || '',
                    alertModes: body.alertModes || 'SMS',
                    categoryId: parseInt(body.categoryId),
                },
                include: { category: true }
            });

            // Update associated user if username or password provided
            if (body.username || body.password) {
                const updateData: any = {};
                if (body.username) updateData.username = body.username;
                if (body.password) updateData.password = await bcrypt.hash(body.password, 10);
                if (body.fullName) updateData.name = body.fullName;
                if (body.email) updateData.email = body.email;

                // Find user by worker's phone or email
                const user = await tx.user.findFirst({
                    where: {
                        OR: [
                            { email: worker.email },
                            { name: worker.fullName }
                        ]
                    }
                });

                if (user) {
                    await tx.user.update({
                        where: { id: user.id },
                        data: updateData
                    });
                }
            }

            return worker;
        });

        return NextResponse.json(result);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to update worker' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Worker ID required' }, { status: 400 });
        }

        await prisma.healthWorker.delete({
            where: { id: parseInt(id) }
        });

        return NextResponse.json({ message: 'Worker deleted successfully' });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to delete worker' }, { status: 500 });
    }
}
