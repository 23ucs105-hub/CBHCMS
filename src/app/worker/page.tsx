import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import WorkerAppClient from './WorkerAppClient';

export default async function WorkerPage() {
    // Server-side authentication check
    const session = await auth();
    if (!session?.user) {
        redirect('/login');
    }

    return <WorkerAppClient />;
}
