'use client';

import { useState, useEffect } from 'react';
import { Bell, Check, Shield } from 'lucide-react';
import Image from 'next/image';

export default function WorkerApp() {
    const [selectedCategory, setSelectedCategory] = useState('1');
    const [categories, setCategories] = useState<any[]>([]);
    const [alerts, setAlerts] = useState<any[]>([]);

    useEffect(() => {
        // Fetch categories
        fetch('/api/categories').then(r => r.json()).then(setCategories);
    }, []);

    useEffect(() => {
        const fetchAlerts = async () => {
            const res = await fetch('/api/alerts');
            const data = await res.json();
            // Filter by selected category
            const relevant = data.filter((a: any) => a.targetCatId === parseInt(selectedCategory) || a.targetCatId === 1); // 1 is often default/emergency
            setAlerts(relevant);
        };

        fetchAlerts();
        const interval = setInterval(fetchAlerts, 5000); // Polling for mobile updates
        return () => clearInterval(interval);
    }, [selectedCategory]);

    return (
        <div className="min-h-screen bg-slate-100 pb-20">
            {/* Mobile Header */}
            <header className="bg-emerald-600 text-white p-4 sticky top-0 z-10 shadow-md">
                <div className="flex justify-between items-center">
                    <h1 className="font-bold text-lg flex items-center gap-2">
                        <Image src="/logo.png" alt="Logo" width={24} height={24} className="w-6 h-6 object-contain bg-white rounded-full p-0.5" /> Responder App
                    </h1>
                    <div className="bg-emerald-700 px-2 py-1 rounded text-xs">
                        Online
                    </div>
                </div>
            </header>

            {/* Category Selector (Log in simulation) */}
            <div className="p-4 bg-white shadow-sm mb-4">
                <label className="text-xs font-bold text-slate-500 uppercase">I am a...</label>
                <select
                    className="w-full mt-1 p-2 border rounded bg-slate-50"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>

            {/* Alert Stream */}
            <div className="px-4 space-y-4">
                <h2 className="text-sm font-semibold text-slate-500">Incoming Alerts</h2>

                {alerts.length === 0 ? (
                    <div className="text-center py-10 text-slate-400">
                        <Bell size={48} className="mx-auto mb-2 opacity-20" />
                        <p>No active alerts for your category.</p>
                    </div>
                ) : (
                    alerts.map(alert => (
                        <div key={alert.id} className="bg-white rounded-xl p-5 shadow-sm border-l-4 border-red-500 animate-in slide-in-from-bottom-2">
                            <div className="flex justify-between items-start mb-2">
                                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded-full uppercase">
                                    {alert.type}
                                </span>
                                <span className="text-xs text-slate-400">
                                    {new Date(alert.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>

                            <h3 className="font-bold text-slate-800 text-lg mb-1">
                                {alert.priority} Priority Alert
                            </h3>
                            <p className="text-slate-600 mb-4 leading-relaxed">
                                {alert.message}
                            </p>

                            <button className="w-full bg-slate-900 text-white py-3 rounded-lg font-medium active:scale-95 transition-transform flex items-center justify-center gap-2">
                                <Check size={18} /> Acknowledge
                            </button>
                            <div className="mt-2 text-center text-xs text-slate-400">
                                Channels: {alert.channels}
                            </div>
                        </div>
                    ))
                )}
            </div>

        </div>
    );
}
