'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, AlertCircle, Phone } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [status, setStatus] = useState('Idle'); // Idle, Listening, Processing, Sent
  const [feedback, setFeedback] = useState('');

  // Ref for SpeechRecognition to keep it persistent
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize SpeechRecognition
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.lang = 'en-US';
      recognition.interimResults = false;

      recognition.onstart = () => {
        setIsListening(true);
        setStatus('Listening...');
        setFeedback('');
      };

      recognition.onend = () => {
        setIsListening(false);
        if (status === 'Listening...') {
          setStatus('Idle');
        }
      };

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        processVoiceCommand(text);
      };

      recognitionRef.current = recognition;
    } else {
      setFeedback('Voice recognition not supported in this browser.');
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        // Already started
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const processVoiceCommand = async (text: string) => {
    setStatus('Processing...');
    const lowerText = text.toLowerCase();

    // Simple Keyword Detection
    if (lowerText.includes('help') || lowerText.includes('emergency') || lowerText.includes('doctor') || lowerText.includes('pain')) {
      // Trigger Emergency Alert
      await triggerEmergencyAlert(text);
    } else {
      setStatus('Idle');
      setFeedback('No emergency keywords detected. Try saying "Help" or "Emergency".');
    }
  };

  const triggerEmergencyAlert = async (message: string) => {
    try {
      const res = await fetch('/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Voice Alert: ${message}`,
          type: 'EMERGENCY',
          priority: 'High',
          channels: 'SMS,Voice,App',
          targetCatId: 1 // Default to ID 1 (e.g. Doctor or Ambulance), needs to exist!
        })
      });

      if (res.ok) {
        setStatus('Alert Sent!');
        setFeedback('Emergency Alert has been dispatched to nearby health workers.');
        speak("Emergency alert sent. Help is on the way.");
      } else {
        console.error('Failed to send alert');
        setStatus('Error');
        setFeedback('Failed to send alert. Please call 108 manually.');
        speak("Failed to send alert. Please call emergency services.");
      }
    } catch (e) {
      console.error(e);
      setStatus('Error');
    }
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900 to-slate-950 z-[-1]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <header className="absolute top-6 left-6 flex items-center gap-2">
        <div className="bg-primary/20 p-2 rounded-lg">
          <Image
            src="/logo.png"
            alt="CBHCMS Logo"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
        </div>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-300">
          CBHCMS
        </h1>
      </header>

      <main className="flex flex-col items-center gap-8 max-w-md w-full text-center z-10">
        <h2 className="text-4xl font-extrabold tracking-tight">
          How can we help?
        </h2>

        <p className="text-muted-foreground text-lg">
          Tap the microphone and say <span className="text-destructive font-bold">"Emergency"</span> or <span className="text-primary font-bold">"Help"</span> for immediate assistance.
        </p>

        <div className="relative group">
          {/* Pulse Rings */}
          {isListening && (
            <>
              <div className="absolute inset-0 rounded-full bg-primary/30 animate-pulse-ring delay-0" />
              <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-ring delay-[1s]" />
            </>
          )}

          <button
            onClick={isListening ? stopListening : startListening}
            className={`
                    relative z-10 w-32 h-32 rounded-full flex items-center justify-center 
                    transition-all duration-300 shadow-2xl
                    ${isListening
                ? 'bg-destructive shadow-[0_0_50px_rgba(239,68,68,0.5)] scale-110'
                : 'bg-gradient-to-tr from-primary to-emerald-400 hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]'
              }
                `}
          >
            {isListening ? (
              <Mic className="w-12 h-12 text-white animate-pulse" />
            ) : (
              <Mic className="w-12 h-12 text-white" />
            )}
          </button>
        </div>

        <div className="h-20 flex flex-col items-center justify-center">
          {transcript && (
            <p className="text-xl italic text-slate-300 mb-2">"{transcript}"</p>
          )}
          <div className={`text-sm font-semibold px-4 py-1 rounded-full ${status === 'Alert Sent!' ? 'bg-green-500/20 text-green-400' :
            status === 'Error' ? 'bg-red-500/20 text-red-400' :
              'bg-slate-800 text-slate-400'
            }`}>
            {status}
          </div>
        </div>

        {feedback && (
          <div className="glass-card w-full animate-in fade-in slide-in-from-bottom-4">
            <p className={status === 'Error' ? 'text-destructive' : 'text-primary'}>
              {feedback}
            </p>
          </div>
        )}
      </main>

      <footer className="absolute bottom-6 text-slate-500 text-sm flex gap-4">
        <span>Cloud-Based Voice Assistance System</span>
        <a href="/admin" className="hover:text-primary transition-colors">Admin Login</a>
        <a href="/worker" className="hover:text-primary transition-colors">Worker App</a>
      </footer>
    </div>
  );
}
