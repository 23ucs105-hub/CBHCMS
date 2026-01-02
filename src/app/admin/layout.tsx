import Link from 'next/link';
import { LayoutDashboard, Users, Bell, Settings, LogOut } from 'lucide-react';
import Image from 'next/image';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen bg-slate-950 text-slate-100 overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                        <Image src="/logo.png" alt="Logo" width={32} height={32} className="w-8 h-8 object-contain" />
                        <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
                            Admin Portal
                        </h1>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Cloud Alert System</p>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    <Link href="/admin" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-emerald-400 transition-colors">
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>
                    <Link href="/admin/workers" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-emerald-400 transition-colors">
                        <Users size={20} />
                        <span>Health Workers</span>
                    </Link>
                    <Link href="/admin/alerts" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-emerald-400 transition-colors">
                        <Bell size={20} />
                        <span>Alerts & Logs</span>
                    </Link>
                    <Link href="/simulate" target="_blank" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-cyan-400 transition-colors">
                        <Settings size={20} />
                        <span>Simulation View</span>
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-500/10 text-slate-400 hover:text-red-400 transition-colors">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </Link>
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
