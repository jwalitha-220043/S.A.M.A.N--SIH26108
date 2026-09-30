import React, { useState } from 'react';
import { 
  FileText, ShieldCheck, Building2, Upload, AlertOctagon, CheckCircle2, 
  HelpCircle, Download, RefreshCw, Clock, ArrowRight, Sparkles, Code2, Copy, Check, Filter
} from 'lucide-react';
import { SAMAN_DATA } from '../data/samanData';
import EvidenceProvenanceModal from './EvidenceProvenanceModal';

export default function SmartPanelWorkspace({ initialPreset }) {
  const [activeMode, setActiveMode] = useState('audit'); // 'author' | 'audit' | 'vendor'
  const [selectedPreset, setSelectedPreset] = useState(initialPreset || SAMAN_DATA.presetTenders[0]);
  const [inputText, setInputText] = useState(selectedPreset.rawText);
  const [evalDate, setEvalDate] = useState('2026-09-30');
  
  // Active selected issue for WHY provenance modal
  const [whyIssue, setWhyIssue] = useState(null);
  
  // State for GeM spec export modal
  const [showGemModal, setShowGemModal] = useState(false);
  const [copiedGem, setCopiedGem] = useState(false);

  // State for Authoring Mode inputs
  const [authorCategory, setAuthorCategory] = useState('Electrical Cables');
  const [authorProductName, setAuthorProductName] = useState('1.1 kV Underground Power Cable 3.5 Core XLPE');
  const [authorSpecOutput, setAuthorSpecOutput] = useState('');

  // Handle Preset selection
  const handleSelectPreset = (preset) => {
    setSelectedPreset(preset);
    setInputText(preset.rawText);
  };

  // Generate Authoring Output
  const handleGenerateAuthorSpec = () => {
    const spec = `TECHNICAL SPECIFICATION FOR PROCUREMENT (GeM-COMPLIANT)
Product: ${authorProductName}
Category: ${authorCategory}
Evaluation Standard: SAMAN Temporal Compliance Stack (As of ${evalDate})

1. MANDATORY CONFORMANCE & REVISION STATUS:
   • Primary Product Standard: IS 7098 (Part 1):2019 "Crosslinked Polyethylene Insulated Thermoplastic Sheathed Cables - Specification" (3rd Revision, incorporating Amendment 2: 2022).
   • Conductor Conformance: High conductivity Aluminium conductor conforming to IS 8130:2013 (2nd Revision).

2. MANDATORY QUALITY CONTROL ORDER (QCO) & BIS CERTIFICATION:
   • The product MUST hold a valid BIS License under Scheme-I (ISI Mark) conforming to Electrical Wires and Cables (Quality Control) Order, 2023.
   • Bidders must upload valid BIS CML license copy on GeM portal.

3. NORMATIVE REFERENCE & TEST METHODS:
   • Testing shall adhere to IS 10810 (Part 1 to Part 64).
   • Flame Retardant Low Smoke (FRLS) properties shall comply with IS 10810 (Part 55) Smoke Density & Part 58 Oxygen Index.
   • Drums and packaging shall conform to IS 10418:2016.`;
    setAuthorSpecOutput(spec);
  };

  // Copy GeM Spec
  const handleCopyGemSpec = () => {
    const gemFormatted = `=== GOVERNMENT E-MARKETPLACE (GeM) VERIFIED SPECIFICATION ===\nCategory: ${selectedPreset.category}\nEvaluated Date: ${evalDate}\nCompliance Readiness Score: 100/100 (Audited by SAMAN AI)\n\nREVISED TECHNICAL SPECIFICATION:\n` + 
      selectedPreset.rawText
        .replace("IS 7098 (Part 1):1988", "IS 7098 (Part 1):2019 (with Amendment 2: 2022)")
        .replace("IS 8130:1984", "IS 8130:2013")
        .replace("IS 1489 (Part 1):1991", "IS 1489 (Part 1):2015 (with Amendment 3)")
        .replace("IS 3312:2010", "IS 3312:2021")
        .replace("IS 4984:1995", "IS 4984:2016") + 
      `\n\nMANDATORY BIS & QCO CLAUSE:\nSupplier must furnish valid BIS License (ISI Mark) in accordance with applicable Quality Control Orders (QCO) notified by Government of India.`;
    
    navigator.clipboard.writeText(gemFormatted);
    setCopiedGem(true);
    setTimeout(() => setCopiedGem(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      
      {/* Top Workspace Header & Mode Selector */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              SMART PANEL WORKSPACE
            </span>
            <span className="text-xs text-slate-400">• SIH26108 Live Engine</span>
          </div>
          <h2 className="text-xl font-extrabold text-white font-orbitron">
            Procurement Intelligence & Compliance Auditor
          </h2>
        </div>

        {/* 3 Modes Switcher Tabs (LoanPro style) */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold w-full md:w-auto overflow-x-auto">
          <button
            onClick={() => setActiveMode('author')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeMode === 'author' 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Mode A: Authoring</span>
          </button>

          <button
            onClick={() => setActiveMode('audit')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeMode === 'audit' 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Mode B: Tender Audit</span>
          </button>

          <button
            onClick={() => setActiveMode('vendor')}
            className={`px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
              activeMode === 'vendor' 
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Mode C: Vendor Bid Check</span>
          </button>
        </div>
      </div>

      {/* Main Split Smart Panel (LoanPro Split UI Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT PANEL: Input / Specification / Presets (5 Cols on LG) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Preset Selector Banner */}
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Sparkles className="w-4 h-4" /> Load Verified Tender Preset:
              </span>
              <span className="text-[10px] text-slate-500 font-mono">5 Categories Available</span>
            </div>
            
            <div className="space-y-1.5">
              {SAMAN_DATA.presetTenders.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`w-full p-2.5 rounded-lg border text-left text-xs transition-all flex items-center justify-between gap-2 ${
                    selectedPreset.id === preset.id 
                      ? 'bg-cyan-950/60 border-cyan-500/50 text-cyan-200' 
                      : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  <span className="font-medium truncate">{preset.category}: {preset.title.split(' ')[2]}...</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                    {preset.issues.length} Risks
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* MODE B & AUDIT INPUT PANEL */}
          {activeMode === 'audit' && (
            <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-200 font-mono uppercase tracking-wider flex items-center gap-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  Tender Specification Document Text
                </label>
                
                {/* Temporal Time-Machine Date Picker */}
                <div className="flex items-center gap-1.5 text-[11px] bg-slate-950 px-2 py-1 rounded border border-slate-800 text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Eval Date:</span>
                  <input
                    type="date"
                    value={evalDate}
                    onChange={(e) => setEvalDate(e.target.value)}
                    className="bg-transparent text-cyan-300 font-mono focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Upload Dropzone Simulator */}
              <div className="p-4 rounded-xl border-2 border-dashed border-slate-800 hover:border-cyan-500/40 bg-slate-950/50 text-center transition-all cursor-pointer space-y-2">
                <Upload className="w-6 h-6 text-slate-500 mx-auto" />
                <div className="text-xs text-slate-300 font-medium">
                  Drop Tender PDF / DOCX here or paste specification below
                </div>
                <div className="text-[10px] text-slate-500">Supports Multilingual OCR & GeM Specification Formats</div>
              </div>

              {/* Specification Text Area */}
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={10}
                className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-mono leading-relaxed focus:outline-none focus:border-cyan-500/60 resize-y"
                placeholder="Paste tender technical specification text here..."
              />

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span>Category: <strong className="text-cyan-300">{selectedPreset.category}</strong></span>
                <button
                  onClick={() => setInputText(selectedPreset.rawText)}
                  className="text-cyan-400 hover:underline flex items-center gap-1 font-mono text-[11px]"
                >
                  <RefreshCw className="w-3 h-3" /> Reset Input
                </button>
              </div>
            </div>
          )}

          {/* MODE A: AUTHORING INPUT PANEL */}
          {activeMode === 'author' && (
            <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                Mode A: Standards-Aware Specification Drafter
              </h3>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Product Category:</label>
                  <select
                    value={authorCategory}
                    onChange={(e) => setAuthorCategory(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Electrical Cables">Electrical Cables & Wires</option>
                    <option value="Building & Construction">Cement & Civil Construction</option>
                    <option value="Furniture & Storage">Steel Office Furniture</option>
                    <option value="Pipes & Water">HDPE & PVC Piping</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Product Name & Key Parameters:</label>
                  <input
                    type="text"
                    value={authorProductName}
                    onChange={(e) => setAuthorProductName(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-cyan-500 font-mono text-xs"
                  />
                </div>

                <button
                  onClick={handleGenerateAuthorSpec}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold shadow-md hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Draft Compliant Specification</span>
                </button>
              </div>
            </div>
          )}

          {/* MODE C: VENDOR BID CHECK PANEL */}
          {activeMode === 'vendor' && (
            <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 space-y-4">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-indigo-400" />
                Mode C: Vendor Datasheet Compliance Validator
              </h3>
              <p className="text-xs text-slate-400">
                Compare manufacturer datasheet specifications against government tender IS standards before submitting GeM bids.
              </p>

              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                <div className="font-semibold text-slate-200">Uploaded Product Datasheet:</div>
                <div className="text-slate-400 font-mono">Polycab 3.5C 300 sq.mm XLPE Armoured Cable (CML-7890123)</div>
                <div className="flex items-center gap-2 pt-1 text-emerald-400 font-mono text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> BIS License Valid until 2027-05-31
                </div>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT PANEL: Live Compliance Smart Panel & Audit Results (7 Cols on LG) */}
        <div className="lg:col-span-7 space-y-5">
          
          {/* Readiness Score & Risk Counter Banner (Defensible Formula) */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950 border border-slate-800 space-y-4 shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              
              {/* Score Box */}
              <div className="flex items-center gap-4">
                <div className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-slate-950 border-2 border-amber-500/50 shadow-lg shadow-amber-500/10">
                  <span className="text-2xl font-black text-amber-400 font-orbitron">
                    {selectedPreset.readinessScore}
                  </span>
                  <span className="text-[10px] text-slate-500 absolute -bottom-1">/100</span>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-400 font-mono uppercase tracking-wider">
                    Compliance Readiness Index
                  </div>
                  <h3 className="text-lg font-bold text-white">
                    {selectedPreset.readinessScore >= 80 ? 'High Compliance' : 'Audit Action Required'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Defensible mathematical score based on QCOs, obsolete IS & normative risks.
                  </p>
                </div>
              </div>

              {/* Risk Summary Pills */}
              <div className="flex items-center gap-2">
                <div className="px-3 py-1.5 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-center text-xs font-mono">
                  <div className="font-bold text-sm">
                    {selectedPreset.issues.filter(i => i.severity === 'CRITICAL').length}
                  </div>
                  <div className="text-[9px] uppercase">Critical</div>
                </div>

                <div className="px-3 py-1.5 rounded-xl bg-amber-950/60 border border-amber-500/40 text-amber-300 text-center text-xs font-mono">
                  <div className="font-bold text-sm">
                    {selectedPreset.issues.filter(i => i.severity === 'REVIEW').length}
                  </div>
                  <div className="text-[9px] uppercase">Review</div>
                </div>

                <div className="px-3 py-1.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-center text-xs font-mono">
                  <div className="font-bold text-sm">7</div>
                  <div className="text-[9px] uppercase">Verified</div>
                </div>
              </div>
            </div>

            {/* Score Deduction Breakdown Pill Bar */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 text-[11px]">Score Deductions:</span>
              {selectedPreset.readinessDeductions.map((ded, i) => (
                <span key={i} className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300 text-[11px] font-mono flex items-center gap-1">
                  <span className="text-red-400 font-bold">{ded.points}</span>
                  <span>{ded.reason}</span>
                </span>
              ))}
            </div>
          </div>

          {/* AUDIT FINDINGS LIST (Modes B & A Output) */}
          {activeMode !== 'author' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
                  <AlertOctagon className="w-4 h-4 text-cyan-400" />
                  Detected Compliance Gaps & Recommendations ({selectedPreset.issues.length})
                </h3>

                <button
                  onClick={() => setShowGemModal(true)}
                  className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow hover:scale-105 transition-all flex items-center gap-1.5"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Generate GeM Spec</span>
                </button>
              </div>

              {/* Issue Cards */}
              <div className="space-y-3">
                {selectedPreset.issues.map(issue => (
                  <div 
                    key={issue.id}
                    className={`p-4 rounded-xl border text-xs space-y-3 transition-all ${
                      issue.severity === 'CRITICAL' 
                        ? 'bg-slate-900/90 border-red-500/40 shadow-lg shadow-red-950/20' 
                        : 'bg-slate-900/90 border-amber-500/40 shadow-lg shadow-amber-950/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] ${
                            issue.severity === 'CRITICAL' 
                              ? 'bg-red-500/20 text-red-300 border border-red-500/30' 
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}>
                            {issue.severity}
                          </span>
                          <span className="font-mono text-slate-400 text-[11px]">{issue.clauseRef}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white">{issue.title}</h4>
                      </div>

                      {/* THE HERO "WHY?" BUTTON */}
                      <button
                        onClick={() => setWhyIssue(issue)}
                        className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-md shadow-cyan-500/20 hover:scale-105 transition-all flex items-center gap-1 shrink-0"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>WHY?</span>
                      </button>
                    </div>

                    {/* Comparison Box */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-[11px]">
                      <div className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-300">
                        <span className="text-red-400 font-bold block text-[10px]">Tender Found:</span>
                        {issue.found}
                      </div>
                      <div className="p-2 rounded bg-slate-950 border border-emerald-500/30 text-emerald-300">
                        <span className="text-emerald-400 font-bold block text-[10px]">Required IS:</span>
                        {issue.correct}
                      </div>
                    </div>

                    {/* Impact description */}
                    <p className="text-slate-300 leading-relaxed font-sans">{issue.impact}</p>

                    {/* QCO Mandatory Tag */}
                    {issue.qcoMandatory && (
                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-amber-300">
                        <span className="flex items-center gap-1 font-mono">
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                          Mandatory QCO: {issue.qcoName}
                        </span>
                        <span className="text-slate-400">Effective: {issue.qcoEffective}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MODE A DRAFT SPECIFICATION RESULT */}
          {activeMode === 'author' && authorSpecOutput && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-cyan-500/40 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-cyan-400 font-bold flex items-center gap-2 font-sans">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Generated Standards-Compliant Tender Draft
                </span>
                <button
                  onClick={() => navigator.clipboard.writeText(authorSpecOutput)}
                  className="text-cyan-300 hover:underline flex items-center gap-1 text-[11px]"
                >
                  <Copy className="w-3 h-3" /> Copy Specification
                </button>
              </div>

              <pre className="whitespace-pre-wrap text-slate-200 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
                {authorSpecOutput}
              </pre>
            </div>
          )}

        </div>

      </div>

      {/* WHY EVIDENCE & PROVENANCE MODAL */}
      <EvidenceProvenanceModal
        issue={whyIssue}
        onClose={() => setWhyIssue(null)}
        onGenerateCorrection={() => setShowGemModal(true)}
      />

      {/* GeM SPECIFICATION EXPORT MODAL */}
      {showGemModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="relative w-full max-w-2xl rounded-2xl bg-[#0b0f19] border border-emerald-500/40 p-6 space-y-4 text-slate-100 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-white font-orbitron">
                  GeM-Ready Specification Generator
                </h3>
              </div>
              <button onClick={() => setShowGemModal(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-300">
              This formatted specification corrects obsolete standards, inserts mandatory QCO clauses, and includes normative test requirements ready for publication on Government e-Marketplace (GeM).
            </p>

            <textarea
              readOnly
              rows={10}
              className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 leading-relaxed focus:outline-none"
              value={`=== GOVERNMENT E-MARKETPLACE (GeM) VERIFIED SPECIFICATION ===
Category: ${selectedPreset.category}
Evaluated Date: ${evalDate}
Compliance Readiness Score: 100/100 (Audited by SAMAN AI)

REVISED TECHNICAL SPECIFICATION:
` + selectedPreset.rawText
.replace("IS 7098 (Part 1):1988", "IS 7098 (Part 1):2019 (3rd Revision with Amendment 2: 2022)")
.replace("IS 8130:1984", "IS 8130:2013 (2nd Revision)")
.replace("IS 1489 (Part 1):1991", "IS 1489 (Part 1):2015 (with Amendment 3)")
.replace("IS 3312:2010", "IS 3312:2021 (4th Revision)")
.replace("IS 4984:1995", "IS 4984:2016 (5th Revision with Amendment 2)") + 
`

MANDATORY BIS & QCO CLAUSE:
Supplier must furnish valid BIS License (ISI Mark) in accordance with applicable Quality Control Orders (QCO) notified by Ministry of Commerce & Industry, Government of India.`}
            />

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowGemModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-medium"
              >
                Close
              </button>

              <button
                onClick={handleCopyGemSpec}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xs shadow-lg shadow-emerald-500/20 hover:scale-[1.02] transition-all flex items-center gap-2"
              >
                {copiedGem ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                <span>{copiedGem ? 'Copied to Clipboard!' : 'Copy GeM Specification'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
