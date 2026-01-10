'use server';

import { signIn, signOut, auth } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        const result = await signIn('credentials', {
            redirect: false,
            username: formData.get('username'),
            password: formData.get('password'),
        });

        if (result?.error) {
            return 'Invalid credentials.';
        }

        // Get user session to check role
        const session = await auth();
        const role = session?.user?.role;

        // Redirect based on role
        if (role === 'ADMIN') {
            redirect('/admin');
        } else if (role === 'WORKER') {
            redirect('/worker');
        } else {
            redirect('/');
        }
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function logout() {
    await signOut({ redirectTo: '/' });
}
