import React from 'react';
import { 
  ShieldCheck, ArrowRight, CheckCircle2, AlertTriangle, FileText, 
  Layers, Clock, Search, ExternalLink, Sparkles, Building2, TrendingUp, Cpu
} from 'lucide-react';
import { SAMAN_DATA } from '../data/samanData';

export default function LoanProHero({ onStartWorkspace, onSelectPreset }) {
  return (
    <section className="relative overflow-hidden pt-8 pb-16 md:pt-12 md:pb-24 border-b border-slate-800/80">
      {/* Background Glowing Mesh & Grids */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-cyan-500/10 via-blue-600/15 to-indigo-600/10 blur-[130px] rounded-full" />
        <div className="absolute top-10 right-10 w-96 h-96 bg-purple-600/10 blur-[100px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        {/* Top Badges & Tagline */}
        <div className="text-center space-y-5 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-950/80 border border-blue-500/30 text-xs text-blue-300 font-medium backdrop-blur-md shadow-lg shadow-blue-950/50">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>SIH 2026 Problem Statement SIH26108</span>
            <span className="text-slate-500">•</span>
            <span className="text-cyan-300 font-semibold">DoCA & BIS Benchmark</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none font-orbitron">
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
              From Tender to Compliance.
            </span>
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent mt-2 inline-block">
              With Evidence.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed font-normal">
            We don't just search standards. <strong className="text-cyan-300 font-semibold">We identify compliance risks before the tender is published.</strong> AI-powered procurement intelligence for Indian Standards (IS), Quality Control Orders (QCOs), revisions, and mandatory certifications.
          </p>

          {/* Hero Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={onStartWorkspace}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-white font-bold text-base shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <Cpu className="w-5 h-5" />
              <span>Launch Live Audit Engine</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href="#modes"
              className="w-full sm:w-auto px-6 py-4 rounded-xl bg-slate-900/90 text-slate-200 font-semibold text-base border border-slate-700 hover:bg-slate-800 hover:border-slate-600 transition-all flex items-center justify-center gap-2"
            >
              <span>Explore 3 Product Modes</span>
            </a>
          </div>
        </div>

        {/* LoanPro-Style Quick Metric Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl shadow-2xl">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-orbitron">
              {SAMAN_DATA.projectInfo.stats.bisStandards}
            </div>
            <div className="text-xs text-slate-400 font-medium">Published BIS Standards</div>
            <div className="text-[10px] text-slate-500">Categorized & Synchronized</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-orbitron">
              {SAMAN_DATA.projectInfo.stats.gemGmv}
            </div>
            <div className="text-xs text-slate-400 font-medium">GeM Procurement GMV</div>
            <div className="text-[10px] text-slate-500">Government e-Marketplace</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-indigo-400 font-orbitron">
              {SAMAN_DATA.projectInfo.stats.gemSellers}
            </div>
            <div className="text-xs text-slate-400 font-medium">Sellers & Buyers Base</div>
            <div className="text-[10px] text-slate-500">1.37L Buyers • 25L Sellers</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 text-center space-y-1">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-orbitron">
              100%
            </div>
            <div className="text-xs text-slate-400 font-medium">Traceable Provenance</div>
            <div className="text-[10px] text-slate-500">Zero Black-Box AI Claims</div>
          </div>
        </div>

        {/* 3 Core Product Modes (LoanPro Product Cards) */}
        <div id="modes" className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-orbitron text-white">
              Built for the Entire Procurement Lifecycle
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">
              Empowering Government Procurement Officers, Department Auditors, and Commercial Vendors with evidence-backed standards intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mode A */}
            <div 
              onClick={onStartWorkspace}
              className="group p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-cyan-500/50 transition-all hover:shadow-xl hover:shadow-cyan-500/10 cursor-pointer space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-cyan-400 tracking-wider uppercase font-mono">Mode A</div>
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">Tender Authoring</h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Draft new procurement specifications automatically enriched with normative test methods, primary IS references, and mandatory QCO clauses.
              </p>
              <div className="pt-2 flex items-center text-xs font-semibold text-cyan-400 group-hover:translate-x-1 transition-transform">
                <span>Start Authoring</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>

            {/* Mode B */}
            <div 
              onClick={onStartWorkspace}
              className="group p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-blue-500/50 transition-all hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-blue-400 tracking-wider uppercase font-mono">Mode B</div>
                <h3 className="text-xl font-bold text-white group-hover:text-blue-300 transition-colors">Tender Audit</h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Upload or paste existing tender documents to instantly detect obsolete standards, missing QCOs, version mismatches, and compliance risks.
              </p>
              <div className="pt-2 flex items-center text-xs font-semibold text-blue-400 group-hover:translate-x-1 transition-transform">
                <span>Run Audit Scan</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>

            {/* Mode C */}
            <div 
              onClick={onStartWorkspace}
              className="group p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 hover:border-indigo-500/50 transition-all hover:shadow-xl hover:shadow-indigo-500/10 cursor-pointer space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <div className="text-xs font-bold text-indigo-400 tracking-wider uppercase font-mono">Mode C (Startup SaaS)</div>
                <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">Vendor Bid Compliance</h3>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                Suppliers check product datasheets and test certificates against tender conditions to verify exact compliance before submitting bids.
              </p>
              <div className="pt-2 flex items-center text-xs font-semibold text-indigo-400 group-hover:translate-x-1 transition-transform">
                <span>Check Vendor Bid</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </div>
          </div>
        </div>

        {/* Preset Samples Quick Loader */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                Try Verified Government Procurement Presets
              </h3>
              <p className="text-xs text-slate-400">
                Click any preset to test the AI Compliance Engine with real, verified Indian Standards data.
              </p>
            </div>
            <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded border border-cyan-800">
              100% Verifiable Gazette Data
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {SAMAN_DATA.presetTenders.map(preset => (
              <button
                key={preset.id}
                onClick={() => onSelectPreset(preset)}
                className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-cyan-500/40 text-left transition-all hover:bg-slate-900 group"
              >
                <div className="text-[10px] font-bold text-cyan-400 uppercase font-mono mb-1">
                  {preset.category}
                </div>
                <div className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300 line-clamp-2">
                  {preset.title}
                </div>
                <div className="mt-2 text-[10px] text-slate-500 flex items-center justify-between">
                  <span>{preset.issues.length} Risks Flagged</span>
                  <span className="text-cyan-400 font-semibold group-hover:underline">Load & Audit →</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
