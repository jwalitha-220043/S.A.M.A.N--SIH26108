import React from 'react';
import { 
  X, ShieldCheck, AlertOctagon, CheckCircle2, ExternalLink, 
  ArrowRight, Clock, FileText, Database, Lock, Scale
} from 'lucide-react';

export default function EvidenceProvenanceModal({ issue, onClose, onGenerateCorrection }) {
  if (!issue) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0b0f19] border border-cyan-500/40 shadow-2xl shadow-cyan-500/20 text-slate-100 p-6 space-y-6">
        
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl border ${
              issue.severity === 'CRITICAL' 
                ? 'bg-red-500/10 border-red-500/30 text-red-400' 
                : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
            }`}>
              <AlertOctagon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono border ${
                  issue.severity === 'CRITICAL' 
                    ? 'bg-red-500/20 text-red-300 border-red-500/40' 
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                }`}>
                  {issue.severity} AUDIT FINDING
                </span>
                <span className="text-xs text-slate-400 font-mono">ID: {issue.id}</span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">{issue.title}</h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Provenance Evidence Trail (The "WHY?" Chain) */}
        <div className="space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono flex items-center gap-2">
            <Scale className="w-4 h-4" />
            Deterministic Reasoning Trail & Source Provenance
          </div>

          {/* Graph Path Visualizer */}
          <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-3 font-mono text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <span className="text-slate-500">1. Tender Requirement:</span>
              <span className="bg-slate-800 px-2 py-0.5 rounded border border-slate-700 font-sans">
                {issue.clauseRef} ({issue.found})
              </span>
            </div>

            <div className="flex items-center gap-2 text-red-400 pl-4">
              <ArrowRight className="w-3.5 h-3.5 text-red-400" />
              <span>SUPERSEDED_BY / OUTDATED VERSION</span>
            </div>

            <div className="flex items-center gap-2 text-emerald-300 pl-4">
              <span className="text-slate-500">2. Authoritative Active IS:</span>
              <span className="bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/40 font-sans font-bold">
                {issue.correct}
              </span>
            </div>

            {issue.qcoMandatory && (
              <div className="flex items-center gap-2 text-amber-300 pl-4">
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-slate-500">Enforced by QCO:</span>
                <span className="bg-amber-950/80 text-amber-300 px-2 py-0.5 rounded border border-amber-500/40 font-sans">
                  {issue.qcoName} (Eff. {issue.qcoEffective})
                </span>
              </div>
            )}
          </div>

          {/* Detailed Impact & Comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-red-950/20 border border-red-900/40 space-y-1">
              <span className="text-red-400 font-bold font-mono text-[11px]">TENDER REFERENCE (NON-COMPLIANT):</span>
              <p className="text-slate-300 font-medium">{issue.found}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-900/40 space-y-1">
              <span className="text-emerald-400 font-bold font-mono text-[11px]">RECOMMENDED AUTHORITATIVE REVISION:</span>
              <p className="text-emerald-200 font-bold">{issue.correct}</p>
            </div>
          </div>

          {/* Legal & Standard Impact Note */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
            <div className="font-bold text-slate-200 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              Compliance Risk Analysis:
            </div>
            <p className="text-slate-300 leading-relaxed">{issue.impact}</p>
          </div>

          {/* Normative Dependencies */}
          {issue.normativeDependencies && issue.normativeDependencies.length > 0 && (
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs">
              <div className="font-bold text-slate-200 flex items-center gap-1.5">
                <Database className="w-4 h-4 text-indigo-400" />
                Associated Normative References & Test Methods:
              </div>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                {issue.normativeDependencies.map((dep, idx) => (
                  <li key={idx} className="font-mono">{dep}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Verification Metadata Strip */}
          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold">Official Source Verification: {issue.bisSource}</span>
            </div>

            <a
              href={issue.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-emerald-900/80 hover:bg-emerald-800 text-emerald-100 font-semibold text-[11px] flex items-center gap-1.5 transition-colors"
            >
              <span>BIS Know Your Standard</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-800 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors"
          >
            Close Provenance View
          </button>
          
          <button
            onClick={() => {
              onGenerateCorrection(issue);
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 hover:scale-[1.02] transition-all flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Apply Correct Specification</span>
          </button>
        </div>

      </div>
    </div>
  );
}
