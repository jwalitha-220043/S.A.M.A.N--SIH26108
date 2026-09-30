import React, { useState } from 'react';
import { DOCTORS, HOSPITALS } from '../services/mockData';
import { inspectBillAntiCorruption } from '../services/geminiService';
import { Stethoscope, Award, Star, Clock, ShieldCheck, DollarSign, AlertCircle, Phone, Search } from 'lucide-react';
import { speechService } from '../services/speechService';

export default function Directory({ selectedCountry }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeSubTab, setActiveSubTab] = useState('doctors'); // 'doctors' | 'hospitals' | 'anti-corruption'
  
  // Anti corruption calculator state
  const [procedureName, setProcedureName] = useState('Cardiac Angioplasty');
  const [billedPrice, setBilledPrice] = useState('180000');
  const [govtCapPrice, setGovtCapPrice] = useState('65000');
  const [auditResult, setAuditResult] = useState(null);

  const filteredDoctors = DOCTORS.filter(doc => {
    if (searchTerm && !doc.name.toLowerCase().includes(searchTerm.toLowerCase()) && !doc.specialty.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    return true;
  });

  const handleAuditBill = (e) => {
    e?.preventDefault();
    const result = inspectBillAntiCorruption(procedureName, billedPrice, govtCapPrice);
    setAuditResult(result);
    
    if (result.isOvercharging) {
      speechService.speak(`Alert! Overcharging detected for ${procedureName}. Government capped limit is ₹${govtCapPrice}. GramaJarvis flags this hospital bill!`, 'en-IN');
    } else {
      speechService.speak(`Price verified safe! Billed amount for ${procedureName} complies with official government tariffs.`, 'en-IN');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Sub-tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-panel p-5 rounded-3xl border border-cyan-500/30">
        <div>
          <h2 className="text-2xl font-black font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-pink-400 to-emerald-300 flex items-center gap-2">
            <Stethoscope className="w-6 h-6 text-pink-400" /> DOCTORS, HOSPITALS & ANTI-CORRUPTION SHIELD
          </h2>
          <p className="text-xs text-cyan-200/70 mt-1 font-mono">
            Verified degrees, shift availability, government capped price tariffs, and anti-cheating inspector
          </p>
        </div>

        {/* Sub Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSubTab('doctors')}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-orbitron transition ${
              activeSubTab === 'doctors' ? 'bg-cyan-400 text-black shadow-[0_0_15px_#00f3ff]' : 'bg-slate-900 text-slate-300'
            }`}
          >
            Doctors ({DOCTORS.length})
          </button>
          <button
            onClick={() => setActiveSubTab('hospitals')}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-orbitron transition ${
              activeSubTab === 'hospitals' ? 'bg-pink-500 text-white shadow-[0_0_15px_#ff0080]' : 'bg-slate-900 text-slate-300'
            }`}
          >
            Hospitals ({HOSPITALS.length})
          </button>
          <button
            onClick={() => setActiveSubTab('anti-corruption')}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-orbitron transition flex items-center gap-1.5 ${
              activeSubTab === 'anti-corruption' ? 'bg-emerald-400 text-black shadow-[0_0_15px_#00ff66]' : 'bg-slate-900 text-emerald-400 border border-emerald-500/40'
            }`}
          >
            <ShieldCheck className="w-4 h-4" /> Anti-Corruption Shield
          </button>
        </div>
      </div>

      {/* DOCTORS SUB TAB */}
      {activeSubTab === 'doctors' && (
        <div className="space-y-4">
          {/* Search bar */}
          <div className="relative max-w-md">
            <Search className="w-5 h-5 text-cyan-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search doctor by name, specialty, degree..."
              className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-950/80 border border-cyan-500/30 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDoctors.map((doc) => (
              <div key={doc.id} className="glass-panel-neon p-6 rounded-3xl border border-cyan-400/40 space-y-4 relative overflow-hidden">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-pink-500 p-0.5 shadow-[0_0_20px_rgba(0,243,255,0.4)]">
                      <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center font-orbitron font-extrabold text-cyan-300 text-lg">
                        {doc.name.charAt(4) || 'D'}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold font-orbitron text-white">{doc.name}</h3>
                      <p className="text-xs text-pink-300 font-semibold">{doc.specialty}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-500/20 px-2.5 py-1 rounded-xl border border-amber-400/40 text-amber-300 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
                    <span>{doc.rating}</span>
                  </div>
                </div>

                {/* Qualification & Eligibility */}
                <div className="p-3 rounded-2xl bg-slate-950/80 border border-cyan-500/30 space-y-1.5 text-xs">
                  <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span>Degree: <strong className="text-white">{doc.qualification}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-300">
                    <Clock className="w-4 h-4 text-pink-400" />
                    <span>Experience: <strong className="text-white">{doc.experience}</strong></span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">{doc.bio}</p>

                {/* Languages & Shift Status */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-cyan-500/20 text-xs">
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-500/40 font-bold">
                    ● {doc.availability}
                  </span>
                  <span className="text-slate-400 font-mono">Fee: <strong className="text-cyan-300">{doc.fee}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* HOSPITALS SUB TAB */}
      {activeSubTab === 'hospitals' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {HOSPITALS.map((hosp) => (
            <div key={hosp.id} className="glass-panel p-6 rounded-3xl border border-cyan-500/30 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold font-orbitron text-white">{hosp.name}</h3>
                  <p className="text-xs text-cyan-300">{hosp.district}, {hosp.state}</p>
                </div>
                <span className="px-3 py-1 rounded-xl bg-cyan-950 text-cyan-300 border border-cyan-500/40 text-xs font-bold">
                  ★ {hosp.rating}
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-950/80 border border-cyan-500/30 text-xs space-y-1">
                <div className="text-emerald-400 font-bold">🛡️ {hosp.antiCorruptionScore}</div>
                <div className="text-slate-300">Empaneled Schemes: {hosp.schemesSupported.join(', ')}</div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Capped Procedure Prices:</h4>
                <div className="space-y-1.5 text-xs font-mono">
                  {hosp.priceTariff.map((t, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
                      <span>{t.disease}</span>
                      <span className="text-cyan-300 font-bold">{t.govtCap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ANTI-CORRUPTION INSPECTOR TAB */}
      {activeSubTab === 'anti-corruption' && (
        <div className="max-w-2xl mx-auto glass-panel-neon p-8 rounded-3xl border border-emerald-400/50 space-y-6">
          <div className="flex items-center gap-3 border-b border-emerald-500/30 pb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-7 h-7 text-emerald-300" />
            </div>
            <div>
              <h3 className="text-xl font-bold font-orbitron text-emerald-300">ANTI-CORRUPTION HOSPITAL BILL INSPECTOR</h3>
              <p className="text-xs text-slate-300">Detect hospital fraud & compare quotes against mandatory government capped tariffs</p>
            </div>
          </div>

          <form onSubmit={handleAuditBill} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-cyan-300 mb-1">Medical Procedure / Surgery</label>
              <input
                type="text"
                value={procedureName}
                onChange={(e) => setProcedureName(e.target.value)}
                placeholder="e.g. Cardiac Angioplasty, Dialysis, Normal Delivery"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-cyan-500/40 text-white text-xs font-medium focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-pink-400 mb-1">Billed Price (₹)</label>
                <input
                  type="text"
                  value={billedPrice}
                  onChange={(e) => setBilledPrice(e.target.value)}
                  placeholder="e.g. 180000"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-pink-500/40 text-white text-xs font-medium focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-emerald-400 mb-1">Govt Tariff Cap (₹)</label>
                <input
                  type="text"
                  value={govtCapPrice}
                  onChange={(e) => setGovtCapPrice(e.target.value)}
                  placeholder="e.g. 65000"
                  className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-emerald-500/40 text-white text-xs font-medium focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-400 via-cyan-400 to-pink-500 text-black font-extrabold font-orbitron text-sm tracking-wider shadow-[0_0_25px_rgba(0,255,102,0.5)] hover:opacity-95"
            >
              RUN JARVIS CORRUPTION AUDIT
            </button>
          </form>

          {/* Audit Output Box */}
          {auditResult && (
            <div
              className={`p-5 rounded-2xl border text-xs leading-relaxed space-y-2 font-medium ${
                auditResult.isOvercharging
                  ? 'bg-red-950/90 border-red-500 text-red-200 shadow-[0_0_25px_rgba(255,45,85,0.4)]'
                  : 'bg-emerald-950/90 border-emerald-500 text-emerald-200 shadow-[0_0_25px_rgba(0,255,102,0.4)]'
              }`}
            >
              <div className="font-bold font-orbitron text-sm flex items-center gap-2">
                {auditResult.isOvercharging ? <AlertCircle className="w-5 h-5 text-red-400" /> : <ShieldCheck className="w-5 h-5 text-emerald-400" />}
                AUDIT REPORT: {auditResult.severity}
              </div>
              <p>{auditResult.message}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
