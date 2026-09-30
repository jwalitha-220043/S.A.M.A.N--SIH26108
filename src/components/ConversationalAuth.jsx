import React, { useState, useEffect } from 'react';
import { Mic, MicOff, User, Phone, Globe, ArrowRight, Video, Sparkles, Volume2, Shield } from 'lucide-react';
import { speechService } from '../services/speechService';

export default function ConversationalAuth({ onLoginSuccess, onOpenSignLanguage }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [nationality, setNationality] = useState('India');
  const [isListening, setIsListening] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState('Jarvis is listening for your name, phone, or country...');
  const [currentStep, setCurrentStep] = useState(1); // 1: Name, 2: Phone, 3: Country

  useEffect(() => {
    // Welcome Greeting from JARVIS on mount
    const welcomePrompt = "Welcome to GramaJarvis Healthcare! I am your AI assistant. Please tell me your name, mobile number, and country to sign in.";
    speechService.speak(welcomePrompt, 'en-IN');
  }, []);

  const handleVoiceToggle = () => {
    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
      setVoiceStatus('Voice input paused.');
    } else {
      setIsListening(true);
      setVoiceStatus('Listening... Speak now!');
      speechService.startListening(
        (transcript) => {
          console.log('Voice transcript:', transcript);
          setVoiceStatus(`Heard: "${transcript}"`);
          parseVoiceAuthInput(transcript);
        },
        (err) => {
          setVoiceStatus(`Voice error: ${err}. Try typing instead.`);
          setIsListening(false);
        },
        () => {
          setIsListening(false);
        }
      );
    }
  };

  const parseVoiceAuthInput = (transcript) => {
    const text = transcript.toLowerCase();
    
    // Auto detect country
    if (text.includes('japan')) {
      setNationality('Japan');
    } else if (text.includes('india') || text.includes('bharat')) {
      setNationality('India');
    }

    // Auto extract phone numbers (digits)
    const digitsMatch = transcript.match(/\d{5,12}/);
    if (digitsMatch) {
      setPhone(digitsMatch[0]);
      speechService.speak(`Captured mobile number ${digitsMatch[0]}. Now please say or type your name.`, 'en-IN');
    } else if (text.length > 2 && !name) {
      // Clean name string
      const cleanName = transcript.replace(/my name is|i am|this is/gi, '').trim();
      if (cleanName) {
        setName(cleanName);
        speechService.speak(`Hello ${cleanName}! Please provide your mobile number to complete authentication.`, 'en-IN');
      }
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!name.trim()) {
      speechService.speak("Please enter or speak your name.", 'en-IN');
      return;
    }
    if (!phone.trim()) {
      speechService.speak("Please enter or speak your mobile number.", 'en-IN');
      return;
    }

    const userData = {
      name: name.trim(),
      phone: phone.trim(),
      nationality
    };

    speechService.speak(`Welcome ${userData.name}! Opening your 3D GramaJarvis Dashboard now.`, 'en-IN', () => {
      onLoginSuccess(userData);
    });
    
    // Direct trigger fallback if TTS callback delays
    setTimeout(() => {
      onLoginSuccess(userData);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-[#030617]">
      {/* Background glowing ambient light orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse-glow pointer-events-none" />

      {/* Glassmorphism Auth Card */}
      <div className="relative z-10 w-full max-w-xl glass-panel-neon rounded-3xl p-8 md:p-10 border border-cyan-400/40 shadow-[0_0_50px_rgba(0,243,255,0.25)]">
        
        {/* Header with Pulsing JARVIS Voice Indicator */}
        <div className="flex items-center justify-between border-b border-cyan-500/30 pb-6 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center shadow-[0_0_20px_rgba(0,243,255,0.5)]">
              <Sparkles className="w-6 h-6 text-cyan-300 animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-pink-400 to-emerald-300">
                AI AUTHENTICATION
              </h2>
              <p className="text-xs text-cyan-300/80 font-mono tracking-wider">GRAMA JARVIS ONBOARDING</p>
            </div>
          </div>

          <button
            onClick={onOpenSignLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-900/60 border border-purple-400/60 text-purple-200 hover:bg-purple-800 transition text-xs font-semibold shadow-[0_0_15px_rgba(121,40,202,0.4)]"
            title="Open Sign Language Gesture Recognizer"
          >
            <Video className="w-4 h-4 text-pink-400" />
            Sign Language
          </button>
        </div>

        {/* Live JARVIS Speech Status Box */}
        <div className="mb-6 p-4 rounded-2xl bg-slate-900/80 border border-cyan-500/40 flex items-center gap-3 shadow-inner">
          <div className={`w-4 h-4 rounded-full ${isListening ? 'bg-emerald-400 animate-ping' : 'bg-cyan-400'}`} />
          <div className="flex-1">
            <div className="text-xs text-cyan-400 font-semibold uppercase tracking-wider flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5" /> JARVIS Assistant Voice Cue
            </div>
            <p className="text-sm text-slate-200 mt-0.5 font-medium">{voiceStatus}</p>
          </div>
          <button
            type="button"
            onClick={handleVoiceToggle}
            className={`p-3 rounded-full border transition-all ${
              isListening
                ? 'bg-emerald-500 text-black border-emerald-300 shadow-[0_0_20px_rgba(0,255,102,0.8)]'
                : 'bg-cyan-500/20 text-cyan-300 border-cyan-400 hover:bg-cyan-500/40 shadow-[0_0_15px_rgba(0,243,255,0.4)]'
            }`}
          >
            {isListening ? <Mic className="w-6 h-6 animate-pulse" /> : <MicOff className="w-6 h-6" />}
          </button>
        </div>

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-cyan-300 mb-2 flex items-center gap-2">
              <User className="w-4 h-4 text-pink-400" /> Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter or speak your name (e.g., Lakshmi Devi)"
                className="w-full px-4 py-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/40 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition font-medium"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-cyan-300 mb-2 flex items-center gap-2">
              <Phone className="w-4 h-4 text-emerald-400" /> Mobile Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter or speak 10-digit mobile number"
              className="w-full px-4 py-3.5 rounded-xl bg-slate-950/80 border border-cyan-500/40 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 transition font-medium"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-cyan-300 mb-2 flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" /> Nationality / Region
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['India', 'Japan', 'Global / Other'].map((country) => (
                <button
                  key={country}
                  type="button"
                  onClick={() => setNationality(country)}
                  className={`py-3 px-3 rounded-xl border text-xs font-bold transition-all flex flex-col items-center gap-1 ${
                    nationality === country
                      ? 'bg-gradient-to-r from-cyan-500 to-pink-500 text-white border-white shadow-[0_0_20px_rgba(0,243,255,0.6)] scale-105'
                      : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:border-cyan-400'
                  }`}
                >
                  <span>{country === 'India' ? '🇮🇳 India' : country === 'Japan' ? '🇯🇵 Japan' : '🌐 Global'}</span>
                  <span className="text-[10px] opacity-80">{country}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full mt-4 py-4 rounded-xl bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 text-slate-950 font-extrabold font-orbitron text-base tracking-wider hover:opacity-95 transition transform hover:scale-[1.02] shadow-[0_0_30px_rgba(0,243,255,0.6)] flex items-center justify-center gap-3"
          >
            ENTER 3D DASHBOARD
            <ArrowRight className="w-5 h-5 text-black" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <Shield className="w-3.5 h-3.5 text-emerald-400" />
          Zero-corruption protected • Encrypted rural health credentials
        </div>
      </div>
    </div>
  );
}
