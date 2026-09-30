import React from 'react';
import { Award, CheckCircle2, FileCheck, BarChart3, ShieldCheck, Zap } from 'lucide-react';
import { SAMAN_DATA } from '../data/samanData';

export default function BenchmarkMetrics() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-amber-300 text-xs font-mono">
          <Award className="w-3.5 h-3.5" /> EXPERT-VALIdATED BENCHMARK DATASET
        </div>
        <h2 className="text-3xl font-extrabold text-white font-orbitron">
          Rigorous Benchmark Evaluation
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          Tested against 100 expert-labelled real government procurement requirements from GeM, PSUs, and Ministry tenders. Measured proof, not unverified claims.
        </p>
      </div>

      {/* Benchmark Metric Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {SAMAN_DATA.benchmarks.slice(0, 3).map((item, idx) => (
          <div 
            key={idx}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3 shadow-xl hover:border-cyan-500/40 transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cyan-400 font-mono uppercase">{item.metric}</span>
              <BarChart3 className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="text-4xl font-black text-white font-orbitron">{item.value}</div>
            <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Secondary Benchmark Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SAMAN_DATA.benchmarks.slice(3).map((item, idx) => (
          <div 
            key={idx}
            className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-4 shadow-xl hover:border-indigo-500/40 transition-all"
          >
            <div className="space-y-1">
              <span className="text-xs font-bold text-indigo-400 font-mono uppercase">{item.metric}</span>
              <p className="text-xs text-slate-400">{item.desc}</p>
            </div>
            <div className="text-3xl font-black text-emerald-400 font-orbitron shrink-0">
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Measurement Methodology Box */}
      <div className="p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2 font-orbitron">
          <ShieldCheck className="w-5 h-5 text-cyan-400" />
          Ground Truth Benchmark Methodology (100 Test Cases)
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-slate-200">100 Real Tenders</span>
            <p className="text-slate-400">Curated across Electrical, Construction, Chemicals, Pipe Networks & Office Equipment.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-slate-200">Expert Ground Truth</span>
            <p className="text-slate-400">Labelled for primary IS, normative test methods, version revision history & QCO applicability.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <span className="font-bold text-slate-200">Zero Black-Box AI</span>
            <p className="text-slate-400">Compliance logic carried deterministically by graph & official gazette rules.</p>
          </div>
        </div>
      </div>

    </div>
  );
}
