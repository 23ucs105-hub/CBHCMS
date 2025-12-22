'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Phone, MapPin, Mail } from 'lucide-react';

export default function WorkersPage() {
    const [workers, setWorkers] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);

    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        categoryId: '1',
        location: '',
        alertModes: 'SMS'
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [wRes, cRes] = await Promise.all([
                fetch('/api/workers'),
                fetch('/api/categories')
            ]);
            setWorkers(await wRes.json());
            setCategories(await cRes.json());
            setLoading(false);
        } catch (e) {
            console.error(e);
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/workers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setShowForm(false);
                fetchData();
                // Reset
                setFormData({ fullName: '', phone: '', email: '', categoryId: '1', location: '', alertModes: 'SMS' });
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Health Workers</h2>
                <button
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus size={18} />
                    Add Worker
                </button>
            </div>

            {showForm && (
                <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl mb-8 animate-in slide-in-from-top-4">
                    <h3 className="text-lg font-semibold mb-4 text-emerald-400">New Worker Details</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text" placeholder="Full Name" required
                            className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                            value={formData.fullName}
                            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                        />
                        <input
                            type="tel" placeholder="Phone Number" required
                            className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        />
                        <input
                            type="email" placeholder="Email (Optional)"
                            className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                            value={formData.email}
                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                        />
                        <select
                            className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                            value={formData.categoryId}
                            onChange={e => setFormData({ ...formData, categoryId: e.target.value })}
                        >
                            {categories.map(cat => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                        <input
                            type="text" placeholder="Location / Area"
                            className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                            value={formData.location}
                            onChange={e => setFormData({ ...formData, location: e.target.value })}
                        />
                        <div className="flex items-center gap-4 bg-slate-950 p-3 rounded-lg border border-slate-800">
                            <span className="text-slate-400">Alert Mode:</span>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={formData.alertModes.includes('SMS')}
                                    onChange={() => setFormData({ ...formData, alertModes: 'SMS,Voice' })}
                                /> SMS
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" checked={formData.alertModes.includes('Voice')}
                                    onChange={() => setFormData({ ...formData, alertModes: 'SMS,Voice' })}
                                /> Voice
                            </label>
                        </div>

                        <div className="col-span-full flex justify-end gap-3 mt-4">
                            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-slate-400 hover:text-white">Cancel</button>
                            <button type="submit" className="px-6 py-2 bg-emerald-600 rounded-lg text-white font-medium hover:bg-emerald-500">Save Worker</button>
                        </div>
                    </form>
                </div>
            )}

            {loading ? (
                <div className="text-center py-10 text-slate-500">Loading workers...</div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {workers.map(worker => (
                        <div key={worker.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-emerald-500/50 transition-colors group">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-bold text-lg text-white group-hover:text-emerald-400 transition-colors">{worker.fullName}</h3>
                                    <span className="text-xs font-semibold bg-slate-800 text-slate-300 px-2 py-1 rounded">
                                        {worker.category?.name || 'Unknown'}
                                    </span>
                                </div>
                                <span className={`w-3 h-3 rounded-full ${worker.isActive ? 'bg-green-500' : 'bg-red-500'}`} />
                            </div>

                            <div className="space-y-2 text-sm text-slate-400">
                                <div className="flex items-center gap-2">
                                    <Phone size={14} /> {worker.phone}
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin size={14} /> {worker.location || 'N/A'}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail size={14} /> {worker.email || 'N/A'}
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between text-xs text-slate-500">
                                <span>Modes: {worker.alertModes}</span>
                                <button className="text-red-400 hover:text-red-300"><Trash2 size={14} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
