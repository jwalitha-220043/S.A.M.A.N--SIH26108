import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Send, Sparkles, Volume2, X, Navigation, HelpCircle, MessageSquare } from 'lucide-react';
import { speechService } from '../services/speechService';
import { askJarvisAI } from '../services/geminiService';

export default function JarvisAvatar({ activeTab, setActiveTab, currentLanguage, user }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [chatLog, setChatLog] = useState([
    {
      sender: 'jarvis',
      text: `Greetings ${user?.name || 'Friend'}! I am GramaJarvis AI. Ask me anything about doctors, hospital beds, or schemes, or speak a command to navigate!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const handleAsk = async (queryText = userQuery) => {
    if (!queryText.trim()) return;

    const query = queryText.trim();
    setUserQuery('');

    // Append user message
    setChatLog(prev => [...prev, {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);

    // Check navigation intents first
    const textLower = query.toLowerCase();

    if (textLower.includes('map') || textLower.includes('triage') || textLower.includes('red zone') || textLower.includes('location')) {
      setActiveTab('map');
      speakAndRespond(`Navigating to the Smart Geo Triage Map! Red zones indicate critical hospital overload.`);
      return;
    }
    if (textLower.includes('doctor') || textLower.includes('hospital') || textLower.includes('price') || textLower.includes('corruption')) {
      setActiveTab('directory');
      speakAndRespond(`Opening Doctor & Hospital Directory with Anti-Corruption price comparison!`);
      return;
    }
    if (textLower.includes('scheme') || textLower.includes('arogya') || textLower.includes('ayushman') || textLower.includes('granny') || textLower.includes('card')) {
      setActiveTab('schemes');
      speakAndRespond(`Switching to Government Schemes! Here is Ayushman Bharat and Arogya Sri in simple Granny Mode.`);
      return;
    }
    if (textLower.includes('phc') || textLower.includes('offline') || textLower.includes('sync') || textLower.includes('vitals')) {
      setActiveTab('phc');
      speakAndRespond(`Opening PHC Offline Sync! You can save and sync patient records with low internet connectivity.`);
      return;
    }
    if (textLower.includes('family') || textLower.includes('alert') || textLower.includes('phone') || textLower.includes('sms')) {
      setActiveTab('family');
      speakAndRespond(`Opening Family Vault & Voice Alert System!`);
      return;
    }

    // Call Gemini AI service
    const aiAnswer = await askJarvisAI(query, activeTab, currentLanguage);
    speakAndRespond(aiAnswer);
  };

  const speakAndRespond = (replyText) => {
    setChatLog(prev => [...prev, {
      sender: 'jarvis',
      text: replyText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }]);

    setIsSpeaking(true);
    speechService.speak(replyText, currentLanguage, () => {
      setIsSpeaking(false);
    });
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      speechService.stopListening();
      setIsListening(false);
    } else {
      setIsListening(true);
      speechService.startListening(
        (transcript) => {
          setIsListening(false);
          handleAsk(transcript);
        },
        (err) => {
          console.warn('Voice error:', err);
          setIsListening(false);
        },
        () => setIsListening(false)
      );
    }
  };

  const explainCurrentPage = () => {
    const pageExplanations = {
      map: "You are viewing the Smart Geo Triage Map. Hospitals are color-coded: Red means critical bed shortage, Yellow is moderate, and Green has full bed capacity.",
      directory: "You are on the Doctor & Hospital Directory. You can check doctor degrees, live shift availability, and use our Anti-Corruption Price Inspector to stop hospital overcharging.",
      schemes: "You are on the Government Schemes page. Here, Arogya Sri and Ayushman Bharat are explained in simple 'Granny Mode' voice so rural families understand their 5 Lakh Rupee cashless benefits.",
      phc: "You are on the PHC Offline Sync page. Nurse and health workers can record patient vitals without internet. All records automatically sync to government servers once connected.",
      family: "You are in the Family Vault. Multiple family members are linked to 1 mobile phone. JARVIS sends automated voice call and SMS reminders for medicine and appointments."
    };

    const explanation = pageExplanations[activeTab] || "Welcome to GramaJarvis! Ask me any healthcare question.";
    speakAndRespond(explanation);
  };

  return (
    <>
      {/* Floating 3D Interactive Bubble Orb Avatar (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
        {/* Floating Speech Tooltip */}
        {!isOpen && (
          <div
            onClick={() => setIsOpen(true)}
            className="mb-3 px-4 py-2 rounded-2xl glass-panel-neon text-xs font-semibold text-cyan-200 border border-cyan-400/50 shadow-[0_0_20px_rgba(0,243,255,0.4)] cursor-pointer animate-float-slow flex items-center gap-2 max-w-xs"
          >
            <Sparkles className="w-4 h-4 text-pink-400 animate-spin-slow" />
            <span>Click or speak to JARVIS!</span>
          </div>
        )}

        {/* 3D Orb Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`relative group w-16 h-16 rounded-full flex items-center justify-center transition-transform transform hover:scale-110 shadow-[0_0_35px_rgba(0,243,255,0.7)] ${
            isSpeaking ? 'animate-bounce' : ''
          }`}
        >
          {/* Animated Glowing Outer Aura */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500 via-purple-600 to-pink-500 animate-spin-slow opacity-80 blur-sm"></div>
          
          {/* Core Sci-Fi Spherical Body */}
          <div className="relative w-14 h-14 rounded-full bg-slate-950 border-2 border-cyan-300 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-400/40 via-purple-900/60 to-black"></div>
            
            {/* Visualizer Waveforms when Speaking/Listening */}
            {isSpeaking ? (
              <div className="flex items-center gap-1 z-10">
                <div className="w-1 h-6 bg-cyan-300 animate-[bounce_0.6s_infinite_100ms]"></div>
                <div className="w-1 h-8 bg-pink-400 animate-[bounce_0.6s_infinite_200ms]"></div>
                <div className="w-1 h-5 bg-emerald-400 animate-[bounce_0.6s_infinite_300ms]"></div>
              </div>
            ) : isListening ? (
              <Mic className="w-7 h-7 text-emerald-400 z-10 animate-pulse" />
            ) : (
              <Sparkles className="w-7 h-7 text-cyan-300 z-10" />
            )}
          </div>
        </button>
      </div>

      {/* Expanded Jarvis Interactive Assistant Drawer */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 glass-panel-neon rounded-3xl p-5 border border-cyan-400/50 shadow-[0_0_50px_rgba(0,243,255,0.4)] animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-cyan-300" />
              </div>
              <div>
                <h3 className="text-sm font-bold font-orbitron text-cyan-200">GRAMA JARVIS AI</h3>
                <p className="text-[10px] text-cyan-400/70 font-mono">3D Voice & Navigation Assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={explainCurrentPage}
                className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/40 text-xs flex items-center gap-1"
                title="Explain current page"
              >
                <HelpCircle className="w-3.5 h-3.5" /> Explain Page
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Transcript Window */}
          <div className="h-64 overflow-y-auto space-y-3 p-2 text-xs mb-3">
            {chatLog.map((msg, index) => (
              <div
                key={index}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-tr-none shadow-[0_0_15px_rgba(255,0,128,0.3)]'
                      : 'bg-slate-900/90 border border-cyan-500/30 text-cyan-100 rounded-tl-none shadow-[0_0_15px_rgba(0,243,255,0.2)]'
                  }`}
                >
                  <p className="leading-relaxed font-medium">{msg.text}</p>
                  <span className="text-[9px] opacity-60 block mt-1 text-right">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Voice & Command Input */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleVoiceToggle}
              className={`p-3 rounded-xl border transition ${
                isListening
                  ? 'bg-emerald-500 text-black border-emerald-300 shadow-[0_0_20px_rgba(0,255,102,0.8)]'
                  : 'bg-cyan-500/20 text-cyan-300 border-cyan-400/50 hover:bg-cyan-500/30'
              }`}
            >
              {isListening ? <Mic className="w-5 h-5 animate-pulse" /> : <MicOff className="w-5 h-5" />}
            </button>

            <input
              type="text"
              value={userQuery}
              onChange={(e) => setUserQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              placeholder="Type or ask JARVIS..."
              className="flex-1 px-3 py-2.5 rounded-xl bg-slate-950/80 border border-cyan-500/30 text-white text-xs placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />

            <button
              onClick={() => handleAsk()}
              className="p-2.5 rounded-xl bg-cyan-400 text-black hover:bg-cyan-300 transition font-bold"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
