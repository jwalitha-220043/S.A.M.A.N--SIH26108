import React, { useState } from 'react';
import { SCHEMES } from '../services/mockData';
import { explainSchemeGrannyMode } from '../services/geminiService';
import { Award, Volume2, Sparkles, CheckCircle, ShieldCheck, Heart, Info, ArrowRight } from 'lucide-react';
import { speechService } from '../services/speechService';

export default function SchemeExplainer({ selectedCountry, selectedLanguage }) {
  const [activeScheme, setActiveScheme] = useState(SCHEMES[0]);
  const [grannyText, setGrannyText] = useState('');
  const [isSpeakingGranny, setIsSpeakingGranny] = useState(false);

  const filteredSchemes = SCHEMES.filter(s => {
    if (selectedCountry && selectedCountry === 'Japan') return s.applicableCountry === 'Japan';
    return s.applicableCountry === 'India';
  });

  const handleSpeakGranny = (scheme) => {
    setActiveScheme(scheme);
    const textToSpeak = scheme.grannyExplanation;
    setGrannyText(textToSpeak);
    setIsSpeakingGranny(true);

    speechService.speak(textToSpeak, selectedLanguage, () => {
      setIsSpeakingGranny(false);
    });
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-panel p-5 rounded-3xl border border-cyan-500/30">
        <div>
          <h2 className="text-2xl font-black font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-emerald-300 to-pink-400 flex items-center gap-2">
            <Award className="w-6 h-6 text-emerald-400" /> GOVERNMENT HEALTH SCHEMES & "GRANNY MODE" AI
          </h2>
          <p className="text-xs text-cyan-200/70 mt-1 font-mono">
            Arogya Sri, Ayushman Bharat & Japan Health Insurance explained in simple, warm voice for elders
          </p>
        </div>
      </div>

      {/* Scheme Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredSchemes.map((scheme) => (
          <div
            key={scheme.id}
            onClick={() => setActiveScheme(scheme)}
            className={`p-6 rounded-3xl border transition-all cursor-pointer space-y-4 ${
              activeScheme?.id === scheme.id
                ? 'glass-panel-neon border-pink-500 scale-[1.02] shadow-[0_0_30px_rgba(255,0,128,0.4)]'
                : 'glass-panel border-cyan-500/20 hover:border-cyan-400'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center">
                <Heart className="w-5 h-5 text-pink-400" />
              </div>
              <span className="px-2.5 py-1 rounded-xl bg-purple-950 text-purple-300 border border-purple-500/40 text-[10px] font-bold">
                {scheme.applicableCountry}
              </span>
            </div>

            <h3 className="text-lg font-bold font-orbitron text-white">{scheme.title}</h3>
            <p className="text-xs text-slate-300 line-clamp-2">{scheme.targetGroup}</p>

            <div className="p-3 rounded-2xl bg-slate-950/80 border border-cyan-500/30 text-xs font-mono">
              <span className="text-slate-400 block text-[10px]">Annual Coverage:</span>
              <strong className="text-cyan-300 text-sm">{scheme.coverageAmount}</strong>
            </div>

            {/* Voice Granny Mode Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleSpeakGranny(scheme);
              }}
              className={`w-full py-3 rounded-xl font-extrabold font-orbitron text-xs flex items-center justify-center gap-2 transition shadow-lg ${
                isSpeakingGranny && activeScheme?.id === scheme.id
                  ? 'bg-pink-500 text-white animate-pulse shadow-[0_0_20px_rgba(255,0,128,0.8)]'
                  : 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-black shadow-[0_0_15px_rgba(0,243,255,0.4)]'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              {isSpeakingGranny && activeScheme?.id === scheme.id ? 'SPEAKING TO GRANNY...' : 'EXPLAIN TO GRANNY (VOICE)'}
            </button>
          </div>
        ))}
      </div>

      {/* Active Scheme Detailed Breakdown Panel */}
      {activeScheme && (
        <div className="glass-panel-neon p-8 rounded-3xl border border-cyan-400/50 space-y-6">
          <div className="flex flex-wrap items-center justify-between border-b border-cyan-500/30 pb-4 gap-4">
            <div>
              <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">SCHEME KNOWLEDGE VAULT</span>
              <h3 className="text-2xl font-bold font-orbitron text-white mt-1">{activeScheme.title}</h3>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <span>{activeScheme.hospitalsCount}</span>
            </div>
          </div>

          {/* Granny Simple Language Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-950 via-purple-950/60 to-slate-950 border border-pink-500/40 space-y-3 shadow-inner">
            <div className="flex items-center gap-2 text-xs font-bold text-pink-400 uppercase tracking-wider font-orbitron">
              <Sparkles className="w-4 h-4 text-pink-400 animate-spin-slow" /> "EXPLAIN TO GRANNY/GRANDPA" AUDIO VOICE SCRIPT
            </div>
            <p className="text-sm text-slate-100 italic leading-relaxed font-medium">
              "{activeScheme.grannyExplanation}"
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-cyan-500/30 space-y-2">
              <h4 className="font-bold text-cyan-300 uppercase tracking-wider text-xs">Who is Eligible?</h4>
              <p className="text-slate-300 leading-relaxed">{activeScheme.targetGroup}</p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/80 border border-purple-500/30 space-y-2">
              <h4 className="font-bold text-pink-300 uppercase tracking-wider text-xs">Diseases & Surgeries Covered</h4>
              <p className="text-slate-300 leading-relaxed">{activeScheme.diseasesCovered}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
