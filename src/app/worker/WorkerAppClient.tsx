'use client';

import { useState, useEffect } from 'react';
import { Bell, Check, Shield } from 'lucide-react';

export default function WorkerAppClient() {
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
        <div className="min-h-screen bg-slate-950 text-white p-4">
            <header className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                    <Shield className="text-emerald-500" size={32} />
                    <h1 className="text-xl font-bold">Responder App</h1>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-sm text-slate-400">Online</span>
                </div>
            </header>

            <div className="mb-6">
                <label className="text-sm text-slate-400 mb-2 block">I am a...</label>
                <select
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                    value={selectedCategory}
                    onChange={e => setSelectedCategory(e.target.value)}
                >
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                </select>
            </div>

            <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Bell size={20} className="text-emerald-500" />
                    Incoming Alerts
                </h2>

                {alerts.length === 0 ? (
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-slate-500">
                        No active alerts for your category.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {alerts.map(alert => (
                            <div key={alert.id} className="bg-slate-900 border-l-4 border-red-500 rounded-lg p-4">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-semibold bg-red-500/20 text-red-400 px-2 py-1 rounded">
                                        {alert.priority} - {alert.type}
                                    </span>
                                    <span className="text-xs text-slate-500">
                                        {new Date(alert.createdAt).toLocaleTimeString()}
                                    </span>
                                </div>
                                <p className="text-white mb-3">{alert.message}</p>
                                <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
                                    <Check size={18} />
                                    Acknowledge
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
