'use client';

import { useState } from 'react';
import { Send, Mail, MessageSquare, Smartphone, CheckCircle, AlertCircle } from 'lucide-react';

export default function TestAlertsPage() {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('This is a test alert from the CBHCMS system.');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

    const handleSend = async (type: 'email' | 'sms' | 'push') => {
        setLoading(true);
        setStatus(null);

        try {
            const res = await fetch('/api/test-alert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, email, phone, message })
            });

            const data = await res.json();

            if (res.ok) {
                setStatus({ type: 'success', msg: `Test ${type.toUpperCase()} sent successfully!` });
            } else {
                setStatus({ type: 'error', msg: data.error || 'Failed to send test alert' });
            }
        } catch (e) {
            setStatus({ type: 'error', msg: 'Network error occurred' });
        }
        setLoading(false);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-white mb-8">Test Notifications</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Configuration */}
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
                    <h2 className="text-lg font-semibold text-slate-200 mb-4">Target Configuration</h2>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Test Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="worker@example.com"
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Test Phone Number</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            placeholder="+1234567890"
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-400 mb-2">Test Message</label>
                        <textarea
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none h-32 resize-none"
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                    <h2 className="text-lg font-semibold text-slate-200 mb-4">Trigger Channels</h2>

                    <button
                        onClick={() => handleSend('email')}
                        disabled={loading || !email}
                        className="w-full bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700 rounded-xl p-4 flex items-center justify-between group transition-all"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-500/10 text-blue-500 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                <Mail size={24} />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-white">Send Email</h3>
                                <p className="text-sm text-slate-400">Test SMTP configuration</p>
                            </div>
                        </div>
                        <Send size={20} className="text-slate-500 group-hover:text-white transition-colors" />
                    </button>

                    <button
                        onClick={() => handleSend('sms')}
                        disabled={loading || !phone}
                        className="w-full bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700 rounded-xl p-4 flex items-center justify-between group transition-all"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-500/10 text-green-500 rounded-lg group-hover:bg-green-500 group-hover:text-white transition-colors">
                                <MessageSquare size={24} />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-white">Send SMS</h3>
                                <p className="text-sm text-slate-400">Test SMS gateway (Mock)</p>
                            </div>
                        </div>
                        <Send size={20} className="text-slate-500 group-hover:text-white transition-colors" />
                    </button>

                    <button
                        onClick={() => handleSend('push')}
                        disabled={loading}
                        className="w-full bg-slate-800 hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700 rounded-xl p-4 flex items-center justify-between group transition-all"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-purple-500/10 text-purple-500 rounded-lg group-hover:bg-purple-500 group-hover:text-white transition-colors">
                                <Smartphone size={24} />
                            </div>
                            <div className="text-left">
                                <h3 className="font-bold text-white">Send Push</h3>
                                <p className="text-sm text-slate-400">Test PWA Notifications</p>
                            </div>
                        </div>
                        <Send size={20} className="text-slate-500 group-hover:text-white transition-colors" />
                    </button>

                    {status && (
                        <div className={`mt-6 p-4 rounded-lg flex items-center gap-3 ${status.type === 'success' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
                            {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                            <span className="font-medium">{status.msg}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
