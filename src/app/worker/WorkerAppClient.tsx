'use client';

import { useState, useEffect } from 'react';
import { Bell, Check, LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function WorkerAppClient() {
    const router = useRouter();
    const [workerInfo, setWorkerInfo] = useState<any>(null);
    const [categories, setCategories] = useState<any[]>([]);
    const [alerts, setAlerts] = useState<any[]>([]);
    const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');

    useEffect(() => {
        // Fetch worker info and categories
        Promise.all([
            fetch('/api/worker/me').then(r => r.json()),
            fetch('/api/categories').then(r => r.json())
        ]).then(([worker, cats]) => {
            setWorkerInfo(worker);
            setCategories(cats);

            // Request notification permission if not granted
            if ('Notification' in window && Notification.permission !== 'granted') {
                Notification.requestPermission().then(permission => {
                    setNotificationPermission(permission);
                });
            } else if ('Notification' in window) {
                setNotificationPermission(Notification.permission);
            }
        }).catch(err => {
            console.error('Failed to fetch worker info:', err);
        });
    }, []);

    useEffect(() => {
        if (!workerInfo?.categoryId) return;

        const fetchAlerts = async () => {
            try {
                const res = await fetch('/api/alerts');
                const data = await res.json();

                // Filter by worker's category
                const relevant = data.filter((a: any) =>
                    a.targetCatId === workerInfo.categoryId || a.targetCatId === 1
                );

                // Check for new alerts and send notification
                if (relevant.length > alerts.length && notificationPermission === 'granted') {
                    const newAlerts = relevant.filter(newAlert =>
                        !alerts.some(existingAlert => existingAlert.id === newAlert.id)
                    );

                    newAlerts.forEach(alert => {
                        new Notification(`${alert.priority} Alert - ${alert.type}`, {
                            body: alert.message,
                            icon: '/logo.png',
                            badge: '/logo.png',
                            tag: `alert-${alert.id}`,
                            requireInteraction: true,
                        });
                    });
                }

                setAlerts(relevant);
            } catch (err) {
                console.error('Failed to fetch alerts:', err);
            }
        };

        fetchAlerts();
        const interval = setInterval(fetchAlerts, 5000);
        return () => clearInterval(interval);
    }, [workerInfo?.categoryId, alerts.length, notificationPermission]);

    const handleLogout = async () => {
        if (confirm('Are you sure you want to logout?')) {
            try {
                await fetch('/api/auth/signout', { method: 'POST' });
                router.push('/login');
            } catch (err) {
                console.error('Logout failed:', err);
            }
        }
    };

    if (!workerInfo) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white p-4">
            {/* Header with worker info */}
            <header className="mb-6 pb-4 border-b border-slate-800">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                            <User className="text-emerald-500" size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">{workerInfo.fullName}</h1>
                            <p className="text-sm text-slate-400">{workerInfo.category?.name || 'Responder'}</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-3 py-2 bg-slate-900 hover:bg-red-500/10 border border-slate-800 hover:border-red-500/50 rounded-lg text-slate-400 hover:text-red-400 transition-colors"
                    >
                        <LogOut size={18} />
                        <span className="hidden sm:inline">Logout</span>
                    </button>
                </div>

                {/* Status indicators */}
                <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        <span className="text-slate-400">Online</span>
                    </div>
                    {notificationPermission === 'granted' && (
                        <div className="flex items-center gap-2">
                            <Bell size={14} className="text-emerald-500" />
                            <span className="text-slate-400">Notifications On</span>
                        </div>
                    )}
                    {notificationPermission === 'denied' && (
                        <div className="flex items-center gap-2 text-amber-400">
                            <Bell size={14} />
                            <span>Enable notifications in settings</span>
                        </div>
                    )}
                </div>
            </header>

            {/* Alerts section */}
            <div>
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Bell size={20} className="text-emerald-500" />
                    Incoming Alerts
                    {alerts.length > 0 && (
                        <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            {alerts.length}
                        </span>
                    )}
                </h2>

                {alerts.length === 0 ? (
                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center text-slate-500">
                        <Bell size={48} className="mx-auto mb-3 opacity-20" />
                        <p>No active alerts for your category.</p>
                        <p className="text-xs mt-2">You will be notified when new alerts arrive.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {alerts.map(alert => (
                            <div key={alert.id} className="bg-slate-900 border-l-4 border-red-500 rounded-lg p-4 animate-in slide-in-from-bottom-2">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-semibold bg-red-500/20 text-red-400 px-2 py-1 rounded">
                                        {alert.priority} - {alert.type}
                                    </span>
                                    <span className="text-xs text-slate-500">
                                        {new Date(alert.createdAt).toLocaleTimeString()}
                                    </span>
                                </div>
                                <p className="text-white mb-3">{alert.message}</p>
                                <div className="flex gap-2">
                                    <button className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
                                        <Check size={18} />
                                        Acknowledge
                                    </button>
                                </div>
                                <div className="mt-2 text-xs text-slate-500">
                                    Channels: {alert.channels}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
