import React from 'react';
import { ShieldCheck, Cpu, FileCheck, Network, Award, Globe, ExternalLink, Sparkles } from 'lucide-react';
import { SAMAN_DATA } from '../data/samanData';

export default function SamanNavbar({ activeTab, setActiveTab, currentLang, setCurrentLang, onOpenWorkspace }) {
  return (
    <header className="sticky top-0 z-50 bg-[#090d16]/90 backdrop-blur-xl border-b border-slate-800 text-slate-100">
      {/* Top Ministry & SIH Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-indigo-950 px-4 py-1.5 border-b border-blue-500/20 text-xs flex items-center justify-between text-slate-300">
        <div className="flex items-center gap-3 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="bg-blue-600/30 text-blue-300 px-2 py-0.5 rounded font-mono font-bold text-[10px] border border-blue-400/30 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-cyan-400" /> SIH26108
          </span>
          <span className="hidden sm:inline font-medium text-slate-200">
            Ministry of Consumer Affairs, Food & Public Distribution • Department of Consumer Affairs (DoCA)
          </span>
          <span className="sm:hidden font-medium text-slate-200">DoCA & BIS Procurement AI</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden md:inline-flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            23,890 BIS Standards Synchronized
          </span>
          {/* Language Picker */}
          <div className="flex items-center gap-1 bg-slate-800/80 px-2 py-0.5 rounded text-[11px] border border-slate-700">
            <Globe className="w-3 h-3 text-cyan-400" />
            <select 
              value={currentLang}
              onChange={(e) => setCurrentLang(e.target.value)}
              className="bg-transparent text-slate-200 focus:outline-none cursor-pointer"
            >
              {SAMAN_DATA.languages.map(lang => (
                <option key={lang.code} value={lang.code} className="bg-slate-900 text-white">
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('hero')}>
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20">
            <div className="w-full h-full bg-[#0b0f19] rounded-[10px] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-white via-slate-100 to-cyan-300 bg-clip-text text-transparent font-orbitron">
                S.A.M.A.N.
              </span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-slate-400 tracking-wide font-medium hidden sm:block">
              Standards & Mandatory-Compliance Analysis Navigator
            </p>
          </div>
        </div>

        {/* LoanPro-Style Header Nav Tabs */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-sm font-medium">
          <button
            onClick={() => setActiveTab('hero')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'hero' 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Overview
          </button>

          <button
            onClick={() => setActiveTab('workspace')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'workspace' 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Cpu className="w-4 h-4 text-cyan-400" />
            Audit Workspace
          </button>

          <button
            onClick={() => setActiveTab('graph')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'graph' 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Network className="w-4 h-4 text-indigo-400" />
            Temporal Graph
          </button>

          <button
            onClick={() => setActiveTab('benchmarks')}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1.5 ${
              activeTab === 'benchmarks' 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Award className="w-4 h-4 text-amber-400" />
            Benchmarks
          </button>

          <button
            onClick={() => setActiveTab('roi')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'roi' 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            Startup ROI
          </button>
        </nav>

        {/* CTA Button (LoanPro style Demo/Launch button) */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenWorkspace}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-semibold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
          >
            <FileCheck className="w-4 h-4" />
            <span>Launch Audit Engine</span>
          </button>
        </div>
      </div>
    </header>
  );
}
