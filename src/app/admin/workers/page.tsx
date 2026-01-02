'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Phone, MapPin, Mail } from 'lucide-react';

export default function WorkersPage() {
    const [workers, setWorkers] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [error, setError] = useState<string>('');
    const [formData, setFormData] = useState({
        fullName: '', phone: '', email: '', username: '', password: '',
        categoryId: '1', location: '', alertModes: 'SMS'
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [workersRes, catsRes] = await Promise.all([
                fetch('/api/workers'),
                fetch('/api/categories')
            ]);
            setWorkers(await workersRes.json());
            setCategories(await catsRes.json());
        } catch (e) {
            console.error('Failed to fetch data:', e);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('/api/workers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || 'Failed to create worker');
                return;
            }

            setShowForm(false);
            setError('');
            fetchData();
            // Reset
            setFormData({ fullName: '', phone: '', email: '', username: '', password: '', categoryId: '1', location: '', alertModes: 'SMS' });
        } catch (e) {
            console.error(e);
            setError('Network error. Please try again.');
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Are you sure you want to remove this worker? This action cannot be undone.')) return;

        try {
            const res = await fetch(`/api/workers?id=${id}`, { method: 'DELETE' });
            if (res.ok) {
                fetchData();
            } else {
                alert('Failed to delete worker');
            }
        } catch (e) {
            console.error(e);
            alert('Error deleting worker');
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Health Workers</h2>
                <button
                    onClick={() => {
                        setShowForm(!showForm);
                        setError('');
                    }}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg transition-colors"
                >
                    <Plus size={18} />
                    Add Worker
                </button>
            </div>

            {showForm && (
                <div className="bg-slate-900 border border-slate-700 p-6 rounded-xl mb-8 animate-in slide-in-from-top-4">
                    <h3 className="text-lg font-semibold mb-4 text-emerald-400">New Worker Details</h3>

                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                            {error}
                        </div>
                    )}

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
                        <input
                            type="text" placeholder="Username" required
                            className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                            value={formData.username}
                            onChange={e => setFormData({ ...formData, username: e.target.value })}
                        />
                        <input
                            type="password" placeholder="Password" required
                            className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                            value={formData.password}
                            onChange={e => setFormData({ ...formData, password: e.target.value })}
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
                        <div className="flex flex-wrap items-center gap-4 bg-slate-950 p-3 rounded-lg border border-slate-800">
                            <span className="text-slate-400 text-sm">Alert Modes:</span>
                            {['SMS', 'Voice', 'Email'].map(mode => (
                                <label key={mode} className="flex items-center gap-2 cursor-pointer text-white text-sm">
                                    <input
                                        type="checkbox"
                                        checked={formData.alertModes.includes(mode)}
                                        onChange={e => {
                                            const current = formData.alertModes.split(',').filter(x => x);
                                            const updated = e.target.checked
                                                ? [...current, mode].join(',')
                                                : current.filter(x => x !== mode).join(',');
                                            setFormData({ ...formData, alertModes: updated });
                                        }}
                                        className="accent-emerald-500"
                                    /> {mode}
                                </label>
                            ))}
                        </div>

                        <div className="col-span-full flex justify-end gap-3 mt-4">
                            <button type="button" onClick={() => { setShowForm(false); setError(''); }} className="px-4 py-2 text-slate-400 hover:text-white">Cancel</button>
                            <button type="submit" className="px-6 py-2 bg-emerald-600 rounded-lg text-white font-medium hover:bg-emerald-500">Save Worker</button>
                        </div>
                    </form>
                </div>
            )}

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
                            <button
                                onClick={() => handleDelete(worker.id)}
                                className="text-red-400 hover:text-red-300 transition-colors"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
