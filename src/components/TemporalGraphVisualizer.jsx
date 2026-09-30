import React, { useState } from 'react';
import { Network, Clock, ShieldCheck, Database, Calendar, AlertTriangle, ArrowRight, Layers, Info } from 'lucide-react';
import { SAMAN_DATA } from '../data/samanData';

export default function TemporalGraphVisualizer() {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [selectedNode, setSelectedNode] = useState(SAMAN_DATA.knowledgeGraphNodes[1]); // Default IS 7098:2019
  const [filterType, setFilterType] = useState('ALL');

  // Filter nodes based on selected year & category filter
  const filteredNodes = SAMAN_DATA.knowledgeGraphNodes.filter(node => {
    if (filterType !== 'ALL' && node.type !== filterType) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-xl">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold font-mono px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
              <Network className="w-3.5 h-3.5" /> CORE INNOVATION
            </span>
            <span className="text-xs text-slate-400">• SIH26108 Differentiator</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white font-orbitron">
            Temporal Compliance Knowledge Graph
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl">
            Models standard relationships across time (`VALID_FROM`, `SUPERSEDED_BY`, `QCO_EFFECTIVE_FROM`). Evaluate tenders historically as of publication date.
          </p>
        </div>

        {/* Time Machine Year Slider */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-indigo-500/30 space-y-2 w-full md:w-72">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold text-indigo-300 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-indigo-400" /> Time-Machine Evaluation:
            </span>
            <span className="font-mono font-bold text-white bg-indigo-900/80 px-2 py-0.5 rounded">
              Year {selectedYear}
            </span>
          </div>

          <input
            type="range"
            min="2018"
            max="2026"
            step="1"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
          />

          <div className="flex justify-between text-[10px] text-slate-500 font-mono">
            <span>2018 (Legacy)</span>
            <span>2022 (QCO Draft)</span>
            <span>2026 (Enforced)</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Visual Graph Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Side: Graph Node Matrix & Visual Canvas (8 Cols) */}
        <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-6 min-h-[480px]">
          
          {/* Node Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-4">
            <span className="text-xs font-bold text-slate-300 font-mono uppercase tracking-wider">
              Node Filter:
            </span>
            
            <div className="flex flex-wrap items-center gap-1.5 text-xs">
              {['ALL', 'PRODUCT', 'STANDARD', 'AMENDMENT', 'NORMATIVE', 'QCO'].map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-2.5 py-1 rounded-lg transition-all text-[11px] font-mono ${
                    filterType === type 
                      ? 'bg-indigo-600 text-white font-bold' 
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Graph Node Grid Visualization */}
          <div className="relative p-6 rounded-xl bg-slate-950/90 border border-slate-800/80 min-h-[320px] flex flex-col justify-center gap-6 overflow-hidden">
            
            {/* Background Grid Accent */}
            <div className="absolute inset-0 bg-[radial-gradient(#312e81_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

            {/* Simulated Edge Lines & Nodes */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredNodes.map(node => {
                const isSelected = selectedNode.id === node.id;
                
                // Determine node color based on status & time machine year
                let nodeStyle = "border-slate-700 bg-slate-900 text-slate-300";
                if (node.status === 'SUPERSEDED' || (node.validUntil && parseInt(node.validUntil) < selectedYear)) {
                  nodeStyle = "border-red-500/50 bg-red-950/30 text-red-300";
                } else if (node.type === 'QCO') {
                  nodeStyle = "border-amber-500/50 bg-amber-950/30 text-amber-300";
                } else if (node.type === 'STANDARD') {
                  nodeStyle = "border-emerald-500/50 bg-emerald-950/30 text-emerald-300";
                } else if (node.type === 'PRODUCT') {
                  nodeStyle = "border-cyan-500/50 bg-cyan-950/30 text-cyan-300";
                }

                return (
                  <button
                    key={node.id}
                    onClick={() => setSelectedNode(node)}
                    className={`p-3.5 rounded-xl border text-left transition-all relative group ${nodeStyle} ${
                      isSelected ? 'ring-2 ring-indigo-400 scale-[1.03] shadow-lg shadow-indigo-500/20' : 'hover:scale-[1.01]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-1">
                      <span className="opacity-80">{node.type}</span>
                      {node.status && (
                        <span className={`px-1.5 py-0.5 rounded text-[9px] ${
                          node.status === 'SUPERSEDED' ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'
                        }`}>
                          {node.status}
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-bold font-sans line-clamp-2">{node.label}</div>
                    
                    {/* Relationship Arrow Preview */}
                    <div className="mt-2 text-[10px] text-slate-400 flex items-center gap-1 font-mono">
                      <span>Click to view details</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Edge Legend Banner */}
            <div className="relative z-10 pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-400 font-mono">
              <span>Relationships:</span>
              <span className="text-cyan-400">PRODUCT → GOVERNED_BY → IS</span>
              <span className="text-red-400">IS_1988 → SUPERSEDED_BY → IS_2019</span>
              <span className="text-amber-400">IS → ENFORCED_BY → QCO</span>
            </div>

          </div>
        </div>

        {/* Right Side: Selected Node Temporal Details (4 Cols) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
            <Info className="w-4 h-4 text-indigo-400" />
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Node Temporal Details
            </h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold block">NODE IDENTIFIER</span>
              <div className="font-mono font-bold text-white text-sm">{selectedNode.id}</div>
              <div className="text-slate-300 font-sans font-medium">{selectedNode.label}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">TEMPORAL PROPERTIES</span>
              <div className="grid grid-cols-2 gap-2 font-mono text-[11px]">
                <div>
                  <span className="text-slate-500 block">Valid From:</span>
                  <span className="text-slate-200">{selectedNode.validFrom || '1988-01-01'}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Status ({selectedYear}):</span>
                  <span className={`font-bold ${
                    selectedNode.status === 'SUPERSEDED' ? 'text-red-400' : 'text-emerald-400'
                  }`}>
                    {selectedNode.status || 'ACTIVE'}
                  </span>
                </div>
              </div>
            </div>

            {selectedNode.type === 'QCO' && (
              <div className="p-3 rounded-xl bg-amber-950/30 border border-amber-500/30 space-y-1">
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold block">MANDATORY QCO ENFORCEMENT</span>
                <p className="text-slate-300 leading-relaxed">
                  Enforces mandatory BIS Certification (Scheme-I) across all government & private procurements under Gazette Order.
                </p>
              </div>
            )}

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 font-mono text-[11px]">
              <span className="text-slate-400 uppercase font-bold text-[10px] block">CONNECTED GRAPH EDGES</span>
              <div className="space-y-1 text-slate-300">
                <div>• IS_7098_1_1988 <span className="text-red-400">SUPERSEDED_BY</span> IS_7098_1_2019</div>
                <div>• IS_7098_1_2019 <span className="text-amber-400">ENFORCED_BY</span> QCO_CABLE_2023</div>
                <div>• IS_7098_1_2019 <span className="text-indigo-400">REQUIRES_NORMATIVE</span> IS_8130_2013</div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
