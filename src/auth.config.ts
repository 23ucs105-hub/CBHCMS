import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnAdmin = nextUrl.pathname.startsWith('/admin');
            const isOnWorker = nextUrl.pathname.startsWith('/worker');
            const isOnLogin = nextUrl.pathname.startsWith('/login');

            console.log('Middleware Auth Check:', {
                path: nextUrl.pathname,
                isLoggedIn,
                user: auth?.user
            });

            if (isOnAdmin) {
                if (isLoggedIn) {
                    return true;
                }
                return false; // Redirect unauthenticated users to login page
            }

            if (isOnWorker) {
                if (isLoggedIn) return true;
                return false;
            }

            if (isOnLogin) {
                if (isLoggedIn) {
                    return Response.redirect(new URL('/admin', nextUrl));
                }
                return true;
            }

            return true;
        },
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
                // @ts-ignore
                session.user.role = token.role;
            }
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as any).role;
            }
            return token;
        }
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
