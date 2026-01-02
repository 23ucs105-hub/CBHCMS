import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    try {
        const categories = await prisma.workerCategory.findMany();
        console.log('Categories found:', categories);

        if (categories.length === 0) {
            console.log('Warning: No categories found. Database might be empty.');
        }
    } catch (e) {
        console.error('Database Connection Error:', e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
