'use client';

import { useState, useEffect, useRef } from 'react';
import { Terminal, Cpu, Cloud, Wifi, Mail } from 'lucide-react';
import Image from 'next/image';

export default function SimulatePage() {
    const [logs, setLogs] = useState<any[]>([]);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const res = await fetch('/api/alerts');
                const data = await res.json();
                // Transform alerts into "System Logs"
                const systemLogs = data.map((alert: any) => ({
                    id: alert.id,
                    time: new Date(alert.createdAt).toISOString(),
                    event: `DISPATCH_TRIGGERED`,
                    details: `Message: "${alert.message.substring(0, 30)}..." -> Target: ${alert.category?.name} [${alert.channels}]`,
                    status: 'SUCCESS'
                })).reverse(); // Newest first
                setLogs(systemLogs);
            } catch (e) {
                console.error(e);
            }
        };

        fetchLogs();
        const interval = setInterval(fetchLogs, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen bg-black text-green-500 font-mono p-4">
            <header className="flex justify-between items-center border-b border-green-800 pb-4 mb-4">
                <h1 className="text-xl flex items-center gap-2">
                    <Image src="/logo.png" alt="Logo" width={24} height={24} className="w-6 h-6 object-contain" />
                    <Terminal size={24} />
                    CLOUD_SIMULATION_GATEWAY_v1.0
                </h1>
                <div className="flex gap-4 text-sm">
                    <span className="flex items-center gap-1 text-green-400"><Cloud size={16} /> REGION: ap-south-1</span>
                    <span className="flex items-center gap-1 text-green-400"><Cpu size={16} /> CPU: 12%</span>
                    <span className="flex items-center gap-1 text-green-400 animate-pulse"><Wifi size={16} /> CONNECTED</span>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-green-800 p-4 h-[80vh] overflow-auto bg-black rounded">
                    <h2 className="border-b border-green-800 pb-2 mb-2 text-white">Event Log Stream</h2>
                    <div className="space-y-2">
                        {logs.map((log) => (
                            <div key={log.id} className="text-xs md:text-sm hover:bg-green-900/20 p-1">
                                <span className="text-green-700">[{log.time}]</span>
                                <span className="text-blue-400 mx-2">{log.event}</span>
                                <span className="text-green-300">{log.details}</span>
                                <span className="float-right text-green-600">[{log.status}]</span>
                            </div>
                        ))}
                        <div ref={bottomRef} />
                    </div>
                </div>

                <div className="border border-green-800 p-4 h-[80vh] flex flex-col gap-4">
                    <h2 className="border-b border-green-800 pb-2 text-white">Service Health API</h2>

                    <div className="flex-1 grid grid-cols-2 gap-4">
                        <div className="bg-green-900/10 border border-green-800 p-4 flex flex-col justify-center items-center">
                            <Cloud size={48} className="mb-2 text-green-500" />
                            <h3 className="text-xl font-bold">SMS Gateway</h3>
                            <span className="bg-green-500 text-black px-2 text-xs rounded mt-2">OPERATIONAL</span>
                        </div>
                        <div className="bg-green-900/10 border border-green-800 p-4 flex flex-col justify-center items-center">
                            <Phone size={48} className="mb-2 text-green-500" /> {/* Phone triggers error as Lucide import? Wait, I didn't import Phone here. */}
                            <h3 className="text-xl font-bold">Voice API</h3>
                            <span className="bg-green-500 text-black px-2 text-xs rounded mt-2">OPERATIONAL</span>
                        </div>
                        <div className="bg-green-900/10 border border-green-800 p-4 flex flex-col justify-center items-center">
                            <Mail size={48} className="mb-2 text-green-500" />
                            <h3 className="text-xl font-bold">Email SMTP</h3>
                            <span className="bg-green-500 text-black px-2 text-xs rounded mt-2">OPERATIONAL</span>
                        </div>
                        <div className="bg-green-900/10 border border-green-800 p-4 flex flex-col justify-center items-center">
                            <Cpu size={48} className="mb-2 text-green-500" />
                            <h3 className="text-xl font-bold">Alert Engine</h3>
                            <span className="bg-green-500 text-black px-2 text-xs rounded mt-2">PROCESSING</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Need to import Phone if I use it
import { Phone } from 'lucide-react';
