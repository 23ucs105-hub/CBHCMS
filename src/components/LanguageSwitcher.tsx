'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage();

    return (
        <div className="flex items-center gap-2 bg-slate-800/50 rounded-full px-3 py-1 border border-slate-700">
            <Globe size={14} className="text-slate-400" />
            <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-transparent text-xs text-slate-300 focus:outline-none cursor-pointer"
            >
                <option value="en" className="bg-slate-900">English</option>
                <option value="hi" className="bg-slate-900">हिंदी</option>
                <option value="ta" className="bg-slate-900">தமிழ்</option>
            </select>
        </div>
    );
}
