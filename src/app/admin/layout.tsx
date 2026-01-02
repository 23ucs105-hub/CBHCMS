'use client';

import Link from 'next/link';
import { LayoutDashboard, Users, Bell, Settings, LogOut } from 'lucide-react';
import Image from 'next/image';
<<<<<<< HEAD
import { useLanguage } from '@/context/LanguageContext';
import { logout } from '@/lib/actions';
=======
>>>>>>> 2c86f74c62da423df98dd90b03b22f41dd22e385

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { t } = useLanguage();

    return (
        <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
<<<<<<< HEAD
                <div className="p-6 flex items-center gap-3">
                    <Image src="/logo.png" alt="Logo" width={40} height={40} />
                    <div>
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                            {t('adminPortal') || 'Admin Portal'}
                        </h1>
                        <p className="text-xs text-slate-500 mt-1">Cloud Alert System</p>
                    </div>
=======
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Image src="/logo.png" alt="Logo" width={32} height={32} className="w-8 h-8 object-contain" />
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                            Admin Portal
                        </h1>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Cloud Alert System</p>
>>>>>>> 2c86f74c62da423df98dd90b03b22f41dd22e385
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-emerald-400 transition-colors">
                        <LayoutDashboard size={20} />
                        <span>{t('dashboard') || 'Dashboard'}</span>
                    </Link>
                    <Link href="/admin/workers" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-emerald-400 transition-colors">
                        <Users size={20} />
                        <span>{t('healthWorkers') || 'Health Workers'}</span>
                    </Link>
                    <Link href="/admin/alerts" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-emerald-400 transition-colors">
                        <Bell size={20} />
                        <span>{t('alertsLogs') || 'Alerts & Logs'}</span>
                    </Link>
                    <Link href="/simulate" target="_blank" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition-colors">
                        <Settings size={20} />
                        <span>{t('simulationView') || 'Simulation View'}</span>
                    </Link>
                    <Link href="/admin/test-alerts" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-purple-400 transition-colors">
                        <Bell size={20} />
                        <span>Test Notifications</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <form action={logout}>
                        <button type="submit" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors">
                            <LogOut size={20} />
                            <span>{t('logout') || 'Logout'}</span>
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto relative">
                <header className="h-16 border-b border-slate-800 bg-slate-900/50 backdrop-blur sticky top-0 z-10 flex items-center justify-between px-8">
                    <h2 className="text-lg font-medium text-slate-200">Overview</h2>
                    <div className="flex items-center gap-4">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span className="text-sm text-emerald-500">System Online</span>
                    </div>
                </header>
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
