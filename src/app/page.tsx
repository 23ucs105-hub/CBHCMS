'use client';

import Image from "next/image";
import { Activity, Heart, Shield, Phone, ArrowRight } from "lucide-react";
import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import PublicAI from '@/components/PublicAI';

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500/30">
      {/* Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
      </div>

      {/* Header */}
      <header className="relative z-50 container mx-auto px-6 py-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10">
            <Image src="/logo.png" alt="Logo" fill className="object-contain" />
          </div>
          <span className="font-bold text-xl tracking-tight">CBHCMS</span>
        </div>
        <LanguageSwitcher />
      </header>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-6 pt-20 pb-32 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 mb-8 animate-in fade-in slide-in-from-bottom-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-sm text-slate-400 font-medium">{t('statusListening') || 'System Active & Listening'}</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 animate-in fade-in slide-in-from-bottom-8 delay-150">
          {t('appName')}
        </h1>

        <p className="text-slate-400 text-lg mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 delay-200">
          {t('welcome')}
        </p>

        {/* AI Interface */}
        <div className="animate-in fade-in slide-in-from-bottom-8 delay-300">
          <PublicAI />
        </div>

        <p className="text-slate-500 text-sm mt-8 animate-in fade-in slide-in-from-bottom-8 delay-500">
          {t('voicePrompt')}
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 text-left">
          {[
            { icon: Activity, title: "Real-time Monitoring", desc: "Continuous health tracking and alert systems." },
            { icon: Shield, title: "Secure Platform", desc: "Enterprise-grade security for sensitive data." },
            { icon: Heart, title: "Community Care", desc: "Connecting patients with local health workers." }
          ].map((feature, i) => (
            <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-emerald-500/30 transition-colors">
              <feature.icon className="w-10 h-10 text-emerald-500 mb-4" />
              <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-900 bg-slate-950">
        <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm">© 2024 CBHCMS. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="/login" className="text-slate-400 hover:text-emerald-400 text-sm font-medium transition-colors flex items-center gap-2">
              {t('adminLogin')} <ArrowRight size={14} />
            </a>
            <a href="/login" className="text-slate-400 hover:text-emerald-400 text-sm font-medium transition-colors flex items-center gap-2">
              {t('workerApp')} <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
