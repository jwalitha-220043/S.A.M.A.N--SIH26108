import React, { useState, useEffect } from 'react';
import { HOSPITALS } from '../services/mockData';
import { AlertTriangle, CheckCircle, ShieldAlert, Phone, Navigation, Bed, Stethoscope, Sparkles, Filter } from 'lucide-react';
import { speechService } from '../services/speechService';

export default function TriageMap({ selectedCountry }) {
  const [filterZone, setFilterZone] = useState('all');
  const [selectedHospital, setSelectedHospital] = useState(HOSPITALS[0]);

  const filteredHospitals = HOSPITALS.filter(h => {
    if (selectedCountry && h.country.toLowerCase() !== selectedCountry.toLowerCase()) return false;
    if (filterZone === 'all') return true;
    return h.zone === filterZone;
  });

  const getZoneBadge = (zone) => {
    switch (zone) {
      case 'red':
        return (
          <span className="px-2.5 py-1 rounded-full bg-red-950/80 text-red-400 border border-red-500/50 text-xs font-bold flex items-center gap-1 shadow-[0_0_15px_rgba(255,45,85,0.4)]">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" /> RED ZONE (Acute Overload)
          </span>
        );
      case 'yellow':
        return (
          <span className="px-2.5 py-1 rounded-full bg-amber-950/80 text-amber-400 border border-amber-500/50 text-xs font-bold flex items-center gap-1 shadow-[0_0_15px_rgba(255,200,0,0.4)]">
            <ShieldAlert className="w-3.5 h-3.5 text-amber-400" /> YELLOW ZONE (Moderate)
          </span>
        );
      case 'green':
      default:
        return (
          <span className="px-2.5 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-500/50 text-xs font-bold flex items-center gap-1 shadow-[0_0_15px_rgba(0,255,102,0.4)]">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> GREEN ZONE (Adequate Capacity)
          </span>
        );
    }
  };

  const handleSelectHospital = (hosp) => {
    setSelectedHospital(hosp);
    speechService.speak(`Selected ${hosp.name}. Triage status is ${hosp.zone} zone with ${hosp.bedsAvailable} available beds.`, 'en-IN');
  };

  return (
    <div className="space-y-6">
      {/* Header & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-panel p-5 rounded-3xl border border-cyan-500/30">
        <div>
          <h2 className="text-2xl font-black font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-emerald-300 to-pink-400 flex items-center gap-2">
            <Navigation className="w-6 h-6 text-cyan-400" /> SMART GEO TRIAGE MAP
          </h2>
          <p className="text-xs text-cyan-200/70 mt-1 font-mono">
            AI-driven zoning: Red (Critical Shortage) • Yellow (Moderate) • Green (Optimal Beds)
          </p>
        </div>

        {/* Triage Zone Filters */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter Zone:
          </span>
          <button
            onClick={() => setFilterZone('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filterZone === 'all' ? 'bg-cyan-500 text-black shadow-[0_0_15px_#00f3ff]' : 'bg-slate-900 text-slate-300'
            }`}
          >
            All Zones ({HOSPITALS.length})
          </button>
          <button
            onClick={() => setFilterZone('red')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filterZone === 'red' ? 'bg-red-500 text-white shadow-[0_0_15px_#ff2d55]' : 'bg-slate-900 text-red-400'
            }`}
          >
            🔴 Red Alert
          </button>
          <button
            onClick={() => setFilterZone('yellow')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filterZone === 'yellow' ? 'bg-amber-500 text-black shadow-[0_0_15px_#ffc800]' : 'bg-slate-900 text-amber-400'
            }`}
          >
            🟡 Yellow Moderate
          </button>
          <button
            onClick={() => setFilterZone('green')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              filterZone === 'green' ? 'bg-emerald-500 text-black shadow-[0_0_15px_#00ff66]' : 'bg-slate-900 text-emerald-400'
            }`}
          >
            🟢 Green Safe
          </button>
        </div>
      </div>

      {/* Main Map & Interactive Cards Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Interactive Simulated Map Box */}
        <div className="lg:col-span-2 glass-panel p-4 rounded-3xl border border-cyan-500/30 relative min-h-[450px] flex flex-col justify-between overflow-hidden">
          
          {/* Sci-Fi Grid Canvas Map Representation */}
          <div className="absolute inset-0 bg-[#04081c] bg-[radial-gradient(#00f3ff_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>

          {/* Interactive Hospital Pins overlaid on grid */}
          <div className="relative z-10 p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-400 animate-spin-slow" /> LIVE RADAR HEALTH TRIAGE
              </span>
              <span className="text-xs text-slate-400 font-mono">LOCATION: {selectedCountry.toUpperCase()} REGION</span>
            </div>

            {/* Hospital Map Pin Radar Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {filteredHospitals.map((hosp) => {
                const isSelected = selectedHospital?.id === hosp.id;
                return (
                  <div
                    key={hosp.id}
                    onClick={() => handleSelectHospital(hosp)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer transform hover:scale-[1.02] ${
                      isSelected
                        ? hosp.zone === 'red'
                          ? 'glass-panel-red border-red-400 scale-[1.02]'
                          : hosp.zone === 'yellow'
                          ? 'glass-panel-yellow border-amber-400 scale-[1.02]'
                          : 'glass-panel-green border-emerald-400 scale-[1.02]'
                        : 'glass-panel border-cyan-500/20 hover:border-cyan-400'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-base font-bold text-white font-orbitron">{hosp.name}</h3>
                      {getZoneBadge(hosp.zone)}
                    </div>

                    <p className="text-xs text-slate-300 mb-3">{hosp.district}, {hosp.state}</p>

                    <div className="grid grid-cols-2 gap-2 text-xs mb-3 font-mono">
                      <div className="p-2 rounded-xl bg-slate-950/60 border border-cyan-500/20 flex items-center gap-2">
                        <Bed className="w-4 h-4 text-cyan-400" />
                        <span>Beds: <strong className="text-cyan-200">{hosp.bedsAvailable}/{hosp.totalBeds}</strong></span>
                      </div>
                      <div className="p-2 rounded-xl bg-slate-950/60 border border-purple-500/20 flex items-center gap-2">
                        <Stethoscope className="w-4 h-4 text-pink-400" />
                        <span>ICU: <strong className="text-pink-300">{hosp.icuBeds} Ready</strong></span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {hosp.specialties.slice(0, 3).map((spec, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-cyan-950/80 border border-cyan-500/30 text-[10px] font-semibold text-cyan-300">
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="relative z-10 p-3 bg-slate-950/80 border-t border-cyan-500/30 flex items-center justify-between text-xs text-cyan-300 font-mono">
            <span>JARVIS AUTO-TRIAGE ACTIVE</span>
            <span>DATA SOURCE: STATE HEALTH DEPT</span>
          </div>
        </div>

        {/* Selected Hospital Detailed Triage Inspector Panel */}
        {selectedHospital && (
          <div className="glass-panel-neon p-6 rounded-3xl border border-pink-500/40 space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-pink-400 uppercase">TRIAGE INSPECTOR</span>
                <h3 className="text-xl font-bold font-orbitron text-white mt-0.5">{selectedHospital.name}</h3>
                <p className="text-xs text-slate-300">{selectedHospital.district}, {selectedHospital.state}</p>
              </div>
              {getZoneBadge(selectedHospital.zone)}
            </div>

            {/* Capacity Stats */}
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-cyan-500/40 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-300">Available Bed Capacity:</span>
                <span className="text-cyan-300 font-mono font-bold text-sm">{selectedHospital.bedsAvailable} / {selectedHospital.totalBeds} Beds</span>
              </div>
              <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-1000 ${
                    selectedHospital.zone === 'red' ? 'bg-red-500' : selectedHospital.zone === 'yellow' ? 'bg-amber-400' : 'bg-emerald-400'
                  }`}
                  style={{ width: `${(selectedHospital.bedsAvailable / selectedHospital.totalBeds) * 100}%` }}
                />
              </div>
            </div>

            {/* Government Schemes Supported */}
            <div>
              <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider mb-2">Government Schemes Empaneled:</h4>
              <div className="flex flex-wrap gap-2">
                {selectedHospital.schemesSupported.map((sch, i) => (
                  <span key={i} className="px-3 py-1 rounded-xl bg-purple-900/60 border border-purple-400/50 text-xs font-semibold text-purple-200 shadow-[0_0_10px_rgba(121,40,202,0.3)]">
                    ✓ {sch}
                  </span>
                ))}
              </div>
            </div>

            {/* Anti-Corruption Tariff Safeguards */}
            <div>
              <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Government Price Capping Tariff:</h4>
              <div className="space-y-2 text-xs">
                {selectedHospital.priceTariff.map((item, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-slate-900/90 border border-cyan-500/20 flex items-center justify-between">
                    <div>
                      <strong className="text-slate-200">{item.disease}</strong>
                      <span className="block text-[10px] text-emerald-400">{item.status}</span>
                    </div>
                    <div className="text-right font-mono">
                      <span className="text-cyan-300 font-bold block">{item.govtCap}</span>
                      <span className="text-[10px] text-slate-500 line-through">Private: {item.privateAvg}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact & Voice Triage Trigger */}
            <div className="pt-2 flex gap-3">
              <a
                href={`tel:${selectedHospital.phone}`}
                className="flex-1 py-3 rounded-xl bg-emerald-500 text-black font-extrabold font-orbitron text-xs flex items-center justify-center gap-2 hover:bg-emerald-400 transition shadow-[0_0_20px_rgba(0,255,102,0.5)]"
              >
                <Phone className="w-4 h-4" /> CALL TRIAGE DESK
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
