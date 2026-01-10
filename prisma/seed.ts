import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

async function main() {
    const doctor = await prisma.workerCategory.upsert({
        where: { name: 'Doctor' },
        update: {},
        create: {
            name: 'Doctor',
            description: 'Medical Doctors',
        },
    });

    const ambulance = await prisma.workerCategory.upsert({
        where: { name: 'Ambulance' },
        update: {},
        create: {
            name: 'Ambulance',
            description: 'Ambulance Drivers and Paramedics',
        },
    });

    const asha = await prisma.workerCategory.upsert({
        where: { name: 'ASHA Worker' },
        update: {},
        create: {
            name: 'ASHA Worker',
            description: 'Accredited Social Health Activists',
        },
    });

    console.log({ doctor, ambulance, asha });

    console.log('Creating admin user...');
    try {
        const password = await bcrypt.hash('admin123', 10);
        const admin = await prisma.user.upsert({
            where: { username: 'admin' },
            update: {},
            create: {
                username: 'admin',
                password,
                name: 'System Admin',
                role: 'ADMIN',
                email: 'admin@cbhcms.com',
            },
        });
        console.log('Admin user created:', admin);
    } catch (error) {
        console.error('Error creating admin user:', error);
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
