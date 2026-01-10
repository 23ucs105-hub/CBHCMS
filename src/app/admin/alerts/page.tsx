'use client';

import { useState, useEffect } from 'react';
import { Send, AlertTriangle, Radio, CheckCircle, Clock, MapPin } from 'lucide-react';

export default function AlertsPage() {
    const [alerts, setAlerts] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    // Form
    const [formData, setFormData] = useState({
        message: '',
        type: 'EMERGENCY',
        priority: 'High',
        targetCatId: '1',
        channels: 'SMS,Voice'
    });

    useEffect(() => {
        fetchData();
        // Poll for updates every 5 seconds to show "Real-time" effect
        const interval = setInterval(fetchData, 5000);
        return () => clearInterval(interval);
    }, []);

    const fetchData = async () => {
        try {
            const [aRes, cRes] = await Promise.all([
                fetch('/api/alerts'),
                fetch('/api/categories')
            ]);
            setAlerts(await aRes.json());
            setCategories(await cRes.json());
            setLoading(false);
        } catch (e) {
            console.error(e);
        }
    };

    const handleTrigger = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch('/api/alerts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        fetchData();
        setFormData({ ...formData, message: '' }); // Reset message but keep others
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Trigger Form */}
            <div className="lg:col-span-1">
                <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 sticky top-24">
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Radio className="text-red-500 animate-pulse" />
                        Dispatch Alert
                    </h2>

                    <form onSubmit={handleTrigger} className="space-y-4">
                        <div>
                            <label className="text-xs text-slate-400 uppercase font-semibold">Message</label>
                            <textarea
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-red-500 outline-none h-32 resize-none mt-1"
                                placeholder="Describe the emergency..."
                                required
                                value={formData.message}
                                onChange={e => setFormData({ ...formData, message: e.target.value })}
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs text-slate-400 uppercase font-semibold">Type</label>
                                <select
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white mt-1 outline-none"
                                    value={formData.type}
                                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                                >
                                    <option value="EMERGENCY">Emergency</option>
                                    <option value="DISASTER">Disaster</option>
                                    <option value="HEALTH">Health Info</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs text-slate-400 uppercase font-semibold">Priority</label>
                                <select
                                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white mt-1 outline-none"
                                    value={formData.priority}
                                    onChange={e => setFormData({ ...formData, priority: e.target.value })}
                                >
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs text-slate-400 uppercase font-semibold">Target Group</label>
                            <select
                                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white mt-1 outline-none"
                                value={formData.targetCatId}
                                onChange={e => setFormData({ ...formData, targetCatId: e.target.value })}
                            >
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="text-xs text-slate-400 uppercase font-semibold">Channels</label>
                            <div className="flex flex-wrap gap-4 mt-2">
                                {['SMS', 'Voice', 'Email'].map(ch => (
                                    <label key={ch} className="flex items-center gap-2 text-white cursor-pointer group">
                                        <input
                                            type="checkbox"
                                            checked={formData.channels.includes(ch)}
                                            onChange={e => {
                                                const current = formData.channels.split(',').filter(x => x);
                                                const updated = e.target.checked
                                                    ? [...current, ch].join(',')
                                                    : current.filter(x => x !== ch).join(',');
                                                setFormData({ ...formData, channels: updated });
                                            }}
                                            className="accent-red-500"
                                        />
                                        <span className="text-sm group-hover:text-red-400 transition-colors uppercase tracking-wider">{ch}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3 rounded-lg mt-4 transition-colors flex items-center justify-center gap-2">
                            <Send size={18} />
                            BROADCAST ALERT
                        </button>
                    </form>
                </div>
            </div>

            {/* Alert Feed */}
            <div className="lg:col-span-2 space-y-4">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                    <Clock className="text-slate-400" />
                    Live Alert Feed
                </h2>

                {loading ? <p className="text-slate-500">Loading feed...</p> : (
                    alerts.map(alert => (
                        <div key={alert.id} className="bg-slate-900 border border-slate-800 p-5 rounded-lg flex gap-4 animate-in slide-in-from-right-4">
                            <div className={`p-3 rounded-full h-fit ${alert.priority === 'High' ? 'bg-red-500/20 text-red-500' :
                                alert.priority === 'Medium' ? 'bg-orange-500/20 text-orange-500' :
                                    'bg-blue-500/20 text-blue-500'
                                }`}>
                                <AlertTriangle size={24} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h4 className="font-bold text-lg text-white">{alert.type} Alert</h4>
                                    <span className="text-xs text-slate-400">{new Date(alert.createdAt).toLocaleString()}</span>
                                </div>
                                <p className="text-slate-300 mt-1">{alert.message}</p>

                                {(alert.latitude && alert.longitude) ? (
                                    <div className="mt-2 text-sm">
                                        <a
                                            href={`https://www.google.com/maps?q=${alert.latitude},${alert.longitude}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-emerald-400 hover:underline flex items-center gap-1 w-fit"
                                        >
                                            <MapPin size={14} /> View Location
                                        </a>
                                    </div>
                                ) : alert.location ? (
                                    <div className="mt-2 text-sm text-slate-400 flex items-center gap-1">
                                        <MapPin size={14} /> {alert.location}
                                    </div>
                                ) : null}

                                <div className="flex items-center gap-4 mt-3 text-sm text-slate-500">
                                    <span className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded">
                                        To: {alert.category?.name}
                                    </span>
                                    <span className="flex items-center gap-1 bg-slate-800 px-2 py-1 rounded">
                                        Via: {alert.channels}
                                    </span>
                                    <span className="flex items-center gap-1 text-green-500 ml-auto">
                                        <CheckCircle size={14} /> {alert.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
