'use client';

import { useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/lib/actions';
import Image from 'next/image';
import { Shield, Lock, User } from 'lucide-react';

export default function LoginPage() {
    const [errorMessage, dispatch] = useFormState(authenticate, undefined);

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
                <div className="flex flex-col items-center mb-8">
                    <Image src="/logo.png" alt="Logo" width={64} height={64} className="mb-4" />
                    <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
                    <p className="text-slate-400">Sign in to continue</p>
                </div>

                <form action={dispatch} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Username</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-slate-500" size={18} />
                            <input
                                type="text"
                                name="username"
                                placeholder="Enter your username"
                                required
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 text-slate-500" size={18} />
                            <input
                                type="password"
                                name="password"
                                placeholder="••••••••"
                                required
                                minLength={6}
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    <LoginButton />

                    {errorMessage && (
                        <div className="flex items-center gap-2 text-red-400 text-sm bg-red-400/10 p-3 rounded-lg">
                            <Shield size={16} />
                            <p>{errorMessage}</p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold py-3 rounded-lg transition-all transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {pending ? 'Signing in...' : 'Sign In'}
        </button>
    );
}
