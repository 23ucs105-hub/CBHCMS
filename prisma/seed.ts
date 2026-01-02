import { PrismaClient } from '@prisma/client';
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
