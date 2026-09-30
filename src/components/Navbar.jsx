import React from 'react';
import { Activity, MapPin, Users, Award, Database, Home, Globe, Wifi, WifiOff, Video, Sparkles } from 'lucide-react';
import { speechService } from '../services/speechService';

export default function Navbar({
  activeTab,
  setActiveTab,
  selectedCountry,
  setSelectedCountry,
  selectedLanguage,
  setSelectedLanguage,
  isOnline,
  user,
  onOpenSignLanguage
}) {
  const languages = [
    { code: 'en-IN', name: 'English' },
    { code: 'te-IN', name: 'తెలుగు (Telugu)' },
    { code: 'hi-IN', name: 'हिंदी (Hindi)' },
    { code: 'ta-IN', name: 'தமிழ் (Tamil)' },
    { code: 'kn-IN', name: 'கன்னడ (Kannada)' },
    { code: 'ja-JP', name: '日本語 (Japanese)' }
  ];

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    speechService.setLanguage(langCode);
    const langObj = languages.find(l => l.code === langCode);
    if (langObj) {
      speechService.speak(`Language changed to ${langObj.name}`, langCode);
    }
  };

  const navItems = [
    { id: 'map', label: '1. Geo Triage Map', icon: MapPin },
    { id: 'directory', label: '2. Doctors & Hospitals', icon: Users },
    { id: 'schemes', label: '3. Govt Schemes', icon: Award },
    { id: 'phc', label: '4. PHC Offline Sync', icon: Database },
    { id: 'family', label: '5. Family Vault', icon: Home },
  ];

  return (
    <header className="sticky top-0 z-30 w-full glass-panel border-b border-cyan-500/30 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,243,255,0.15)]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        
        {/* Brand Logo & User Welcome */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-pink-500 p-0.5 shadow-[0_0_20px_rgba(0,243,255,0.6)]">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Activity className="w-6 h-6 text-cyan-400 animate-pulse" />
            </div>
          </div>
          <div>
            <h1 className="text-xl font-black tracking-wider font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-pink-400 to-emerald-300">
              GRAMA JARVIS
            </h1>
            <p className="text-[10px] text-cyan-400/80 font-mono tracking-widest uppercase">
              USER: <span className="text-white font-bold">{user?.name || 'Venkata Rao'}</span> ({selectedCountry})
            </p>
          </div>
        </div>

        {/* Center Navigation Tabs */}
        <nav className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold font-orbitron transition-all flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/30 to-pink-500/30 border border-cyan-400 text-cyan-200 shadow-[0_0_20px_rgba(0,243,255,0.4)] scale-105'
                    : 'bg-slate-900/60 border border-slate-800 text-slate-300 hover:border-cyan-500/50 hover:text-white'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-pink-400' : 'text-cyan-400'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Country, Language, Sign Language, Online Pill */}
        <div className="flex items-center gap-3">
          
          {/* Sign Language Gesture Trigger */}
          <button
            onClick={onOpenSignLanguage}
            className="p-2 rounded-xl bg-purple-900/60 border border-purple-400/60 text-pink-300 hover:bg-purple-800 transition flex items-center gap-1.5 text-xs font-bold shadow-[0_0_15px_rgba(121,40,202,0.4)]"
            title="Sign Language Camera Gesture Parsing"
          >
            <Video className="w-4 h-4 text-pink-400 animate-pulse" />
            <span className="hidden sm:inline">Sign Gesture</span>
          </button>

          {/* Country Selector */}
          <div className="flex items-center bg-slate-900/80 border border-cyan-500/30 rounded-xl p-1 text-xs">
            <button
              onClick={() => setSelectedCountry('India')}
              className={`px-2 py-1 rounded-lg text-xs font-semibold transition ${
                selectedCountry === 'India' ? 'bg-cyan-500 text-black shadow-[0_0_10px_#00f3ff]' : 'text-slate-300'
              }`}
            >
              🇮🇳 IN
            </button>
            <button
              onClick={() => setSelectedCountry('Japan')}
              className={`px-2 py-1 rounded-lg text-xs font-semibold transition ${
                selectedCountry === 'Japan' ? 'bg-pink-500 text-white shadow-[0_0_10px_#ff0080]' : 'text-slate-300'
              }`}
            >
              🇯🇵 JP
            </button>
          </div>

          {/* Language Selector */}
          <select
            value={selectedLanguage}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="px-2.5 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-cyan-200 text-xs font-medium focus:outline-none focus:border-cyan-300"
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code} className="bg-slate-950 text-white">
                {l.name}
              </option>
            ))}
          </select>

          {/* Online/Offline Status Pill */}
          <div
            className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wider flex items-center gap-1.5 border shadow-inner ${
              isOnline
                ? 'bg-emerald-950/80 text-emerald-400 border-emerald-500/40'
                : 'bg-amber-950/80 text-amber-400 border-amber-500/40 animate-pulse'
            }`}
          >
            {isOnline ? <Wifi className="w-3.5 h-3.5 text-emerald-400" /> : <WifiOff className="w-3.5 h-3.5 text-amber-400" />}
            <span>{isOnline ? 'ONLINE' : 'OFFLINE SYNC'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
