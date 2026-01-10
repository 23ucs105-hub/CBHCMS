'use client';
// Using client component for simplicity of fetching data without separate server fetch setup in layout
import { useEffect, useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';

export default function AdminDashboard() {
    const { t } = useLanguage();
    const [stats, setStats] = useState({ workers: 0, alerts: 0, activeCategories: 3 });

    useEffect(() => {
        // Quick fetch for stats
        Promise.all([
            fetch('/api/workers').then(r => r.json()),
            fetch('/api/alerts').then(r => r.json())
        ]).then(([workers, alerts]) => {
            setStats({
                workers: Array.isArray(workers) ? workers.length : 0,
                alerts: Array.isArray(alerts) ? alerts.length : 0,
                activeCategories: 3 // Static for now, or fetch
            });
        });
    }, []);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card bg-slate-900 border border-slate-800">
                <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">{t('totalHealthWorkers')}</h3>
                <p className="text-4xl font-bold text-white mt-2">{stats.workers}</p>
            </div>

            <div className="glass-card bg-slate-900 border border-slate-800">
                <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">{t('activeAlerts24h')}</h3>
                <p className="text-4xl font-bold text-emerald-400 mt-2">{stats.alerts}</p>
            </div>

            <div className="glass-card bg-slate-900 border border-slate-800">
                <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wider">{t('categories')}</h3>
                <p className="text-4xl font-bold text-cyan-400 mt-2">{stats.activeCategories}</p>
            </div>

            <div className="col-span-full mt-8">
                <h3 className="text-xl font-semibold mb-4 text-slate-200">{t('systemStatus')}</h3>
                <div className="bg-slate-900 rounded-xl p-6 border border-slate-800">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>{t('cloudFunctions')}: <span className="text-green-400">{t('operational')}</span></span>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>{t('database')}: <span className="text-green-400">{t('connected')}</span></span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>{t('voiceGateway')}: <span className="text-green-400">{t('statusListening')}</span></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
