'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Mic, X, MessageSquare, Loader2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useLocation } from '@/hooks/useLocation';

export default function PublicAI() {
    const { t, language } = useLanguage();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
    const [isListening, setIsListening] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Initialize Speech Recognition
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = false;
                recognition.interimResults = false;
                recognition.lang = language === 'hi' ? 'hi-IN' : language === 'ta' ? 'ta-IN' : 'en-US';

                recognition.onresult = (event: any) => {
                    const transcript = event.results[0][0].transcript;
                    setInput(transcript);
                    handleSend(transcript);
                };

                recognition.onerror = (event: any) => {
                    console.error('Speech recognition error', event.error);
                    setIsListening(false);
                };

                recognition.onend = () => {
                    setIsListening(false);
                };

                recognitionRef.current = recognition;
            }
        }
    }, [language]);

    const speak = (text: string) => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = language === 'hi' ? 'hi-IN' : language === 'ta' ? 'ta-IN' : 'en-US';
            window.speechSynthesis.speak(utterance);
        }
    };

    const handleSend = async (textOverride?: string) => {
        const textToSend = textOverride || input;
        if (!textToSend.trim()) return;

        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: textToSend }]);
        setIsOpen(true);
        setIsProcessing(true);

        // Check for emergency keywords locally first
        const lowerMsg = textToSend.toLowerCase();
        if (lowerMsg.includes('help') || lowerMsg.includes('emergency') || lowerMsg.includes('doctor') || lowerMsg.includes('pain')) {
            await triggerEmergencyAlert(textToSend);
        } else {
            // Send to AI
            try {
                const res = await fetch('/api/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        messages: [...messages, { role: 'user', content: textToSend }]
                    })
                });

                const data = await res.json();

                if (res.ok) {
                    const aiResponse = data.content;
                    setMessages(prev => [...prev, {
                        role: 'assistant',
                        content: aiResponse
                    }]);
                    speak(aiResponse);
                } else {
                    throw new Error(data.error);
                }
            } catch (e) {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: "I'm having trouble connecting to the server. Please check your connection."
                }]);
            }
            setIsProcessing(false);
        }
    };

    const triggerEmergencyAlert = async (msg: string) => {
        try {
            const res = await fetch('/api/alerts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: `Chat Alert: ${msg}`,
                    type: 'EMERGENCY',
                    priority: 'High',
                    channels: 'SMS,Voice,Email',
                    targetCatId: 1,
                    latitude: location.latitude,
                    longitude: location.longitude,
                    location: location.error ? 'Location Error' : 'GPS Coordinates Attached'
                })
            });

            if (res.ok) {
                const responseMsg = "🚨 EMERGENCY ALERT SENT! Help is on the way. Your location has been shared with nearby health workers.";
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: responseMsg
                }]);
                speak(responseMsg);
            } else {
                const errorMsg = "⚠️ Failed to send alert automatically. Please call 108 immediately!";
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: errorMsg
                }]);
                speak(errorMsg);
            }
        } catch (e) {
            const netErrorMsg = "⚠️ Error connecting to server. Please call 108 immediately!";
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: netErrorMsg
            }]);
            speak(netErrorMsg);
        }
        setIsProcessing(false);
    };

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            setIsListening(true);
            recognitionRef.current?.start();
        }
    };

    return (
        <>
            {/* Hero Input Section */}
            <div className="w-full max-w-2xl mx-auto mt-8 relative z-10">
                <div className="relative flex items-center bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded-full p-2 shadow-2xl hover:border-emerald-500/50 transition-all group">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder={t('welcome') || "Ask anything about health or emergencies..."}
                        className="flex-1 bg-transparent border-none text-white placeholder-slate-400 px-6 py-3 focus:outline-none text-lg"
                    />
                    <div className="flex items-center gap-2 pr-2">
                        <button
                            onClick={toggleListening}
                            className={`p-3 rounded-full transition-all ${isListening
                                ? 'bg-red-500 text-white animate-pulse'
                                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                                }`}
                        >
                            <Mic size={20} />
                        </button>
                        <button
                            onClick={() => handleSend()}
                            className="p-3 bg-emerald-600 text-white rounded-full hover:bg-emerald-500 transition-colors shadow-lg hover:shadow-emerald-500/25"
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl flex flex-col z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
                    {/* Header */}
                    <div className="flex justify-between items-center p-4 border-b border-slate-800 bg-slate-950/50 rounded-t-2xl">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center">
                                <MessageSquare size={16} className="text-white" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-sm">AI Assistant</h3>
                                <span className="text-xs text-emerald-400 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Online
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-slate-400 hover:text-white transition-colors"
                        >
                            <X size={18} />
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === 'user'
                                        ? 'bg-emerald-600 text-white rounded-br-none'
                                        : 'bg-slate-800 text-slate-200 rounded-bl-none'
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {isProcessing && (
                            <div className="flex justify-start">
                                <div className="bg-slate-800 p-3 rounded-2xl rounded-bl-none flex items-center gap-2">
                                    <Loader2 size={16} className="animate-spin text-emerald-400" />
                                    <span className="text-xs text-slate-400">Thinking...</span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Footer Input */}
                    <div className="p-4 border-t border-slate-800">
                        <div className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Type a message..."
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-3 pl-4 pr-12 text-white focus:ring-1 focus:ring-emerald-500 outline-none text-sm"
                            />
                            <button
                                onClick={() => handleSend()}
                                className="absolute right-2 top-2 p-1.5 bg-emerald-600 text-white rounded-lg hover:bg-emerald-500 transition-colors"
                            >
                                <Send size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
