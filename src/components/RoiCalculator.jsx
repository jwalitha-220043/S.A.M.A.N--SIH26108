import React, { useState } from 'react';
import { TrendingUp, Calculator, Building2, ShieldCheck, ArrowRight, DollarSign } from 'lucide-react';

export default function RoiCalculator() {
  const [sellersCount, setSellersCount] = useState(25000);
  const [annualSubPrice, setAnnualSubPrice] = useState(15000);
  const [disputeSavings, setDisputeSavings] = useState(500000);

  // ARR Calculation
  const totalArr = (sellersCount * annualSubPrice) / 10000000; // in Crores
  const estimatedDisputeCostSaved = (sellersCount * disputeSavings * 0.05) / 10000000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono">
          <TrendingUp className="w-3.5 h-3.5" /> STARTUP SaaS & COMMERCIAL POTENTIAL
        </div>
        <h2 className="text-3xl font-extrabold text-white font-orbitron">
          Commercial Strategy & Market Potential
        </h2>
        <p className="text-slate-400 text-sm leading-relaxed">
          Grounding economic projections in official GeM figures: 1.37 Lakh Buyer Organisations and nearly 25 Lakh Sellers & Service Providers.
        </p>
      </div>

      {/* Interactive ROI Calculator Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 md:p-8 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl">
        
        {/* Controls (6 Cols) */}
        <div className="lg:col-span-6 space-y-5">
          <h3 className="text-base font-bold text-white font-orbitron flex items-center gap-2">
            <Calculator className="w-5 h-5 text-cyan-400" />
            Interactive Subscription & Impact Model
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Target Vendor / Enterprise Subscribers:</span>
                <span className="font-mono font-bold text-cyan-400">{sellersCount.toLocaleString()} Subscribers (1% of GeM Base)</span>
              </div>
              <input
                type="range"
                min="5000"
                max="100000"
                step="5000"
                value={sellersCount}
                onChange={(e) => setSellersCount(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Annual Subscription Price:</span>
                <span className="font-mono font-bold text-emerald-400">₹{annualSubPrice.toLocaleString()} / year</span>
              </div>
              <input
                type="range"
                min="5000"
                max="50000"
                step="2500"
                value={annualSubPrice}
                onChange={(e) => setAnnualSubPrice(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
            </div>
          </div>
        </div>

        {/* Results Banner (6 Cols) */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-950 border border-emerald-500/40 text-center space-y-4 shadow-2xl">
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
            ILLUSTRATIVE ARR & DISPUTE SAVINGS SCENARIO
          </span>

          <div className="text-4xl sm:text-5xl font-black text-white font-orbitron">
            ₹{totalArr.toFixed(1)} <span className="text-emerald-400 text-2xl font-sans">Crore ARR</span>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            At 1% adoption among GeM's 25 Lakh vendor ecosystem (25,000 subscriptions at ₹15,000/yr), S.A.M.A.N. represents <strong className="text-slate-200">₹37.5 Crore Annual Recurring Revenue</strong> while saving government agencies ₹{estimatedDisputeCostSaved.toFixed(0)} Cr+ in litigation and re-tendering costs.
          </p>

          <div className="pt-2 border-t border-slate-800 flex justify-center gap-4 text-xs font-mono text-cyan-300">
            <span>• Government Pilot Path</span>
            <span>• Enterprise Vendor SaaS</span>
          </div>
        </div>

      </div>

      {/* 4-Phase Roadmap Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="text-[10px] font-bold font-mono text-cyan-400">PHASE 1</div>
          <h4 className="text-sm font-bold text-white">SIH POC & DoCA Pilot</h4>
          <p className="text-xs text-slate-400">Validate with procurement stakeholders across 5 high-volume product categories.</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="text-[10px] font-bold font-mono text-blue-400">PHASE 2</div>
          <h4 className="text-sm font-bold text-white">GeM & Enterprise Pilot</h4>
          <p className="text-xs text-slate-400">Integrate specification audit engine directly into GeM buyer drafting workflow.</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="text-[10px] font-bold font-mono text-indigo-400">PHASE 3</div>
          <h4 className="text-sm font-bold text-white">Vendor SaaS Platform</h4>
          <p className="text-xs text-slate-400">Monetize vendor bid compliance checker for 25 Lakh+ registered GeM suppliers.</p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="text-[10px] font-bold font-mono text-emerald-400">PHASE 4</div>
          <h4 className="text-sm font-bold text-white">Global Standards Expansion</h4>
          <p className="text-xs text-slate-400">Expand temporal compliance stack to ISO, IEC, ASTM & global export regulations.</p>
        </div>
      </div>

    </div>
  );
}
