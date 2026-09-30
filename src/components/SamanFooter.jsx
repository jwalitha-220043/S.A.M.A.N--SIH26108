import React from 'react';
import { ShieldCheck, ExternalLink, Globe } from 'lucide-react';
import { SAMAN_DATA } from '../data/samanData';

export default function SamanFooter() {
  return (
    <footer className="mt-16 bg-[#060911] border-t border-slate-800/80 text-slate-400 text-xs py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <span className="font-extrabold text-lg text-white font-orbitron">S.A.M.A.N.</span>
            </div>
            <p className="text-slate-400 leading-relaxed max-w-md">
              {SAMAN_DATA.projectInfo.fullName} ({SAMAN_DATA.projectInfo.psId}). An evidence-backed temporal compliance intelligence system for Indian Standards and E-Procurement.
            </p>
            <div className="text-[11px] text-slate-500 font-mono">
              Tagline: <strong className="text-cyan-400 font-semibold">{SAMAN_DATA.projectInfo.tagline}</strong>
            </div>
          </div>

          {/* Col 2: Official Sources */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs font-mono uppercase tracking-wider">Official Data Sources</h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <a href="https://www.services.bis.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 flex items-center gap-1">
                  <span>Bureau of Indian Standards (BIS)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://gem.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 flex items-center gap-1">
                  <span>Government e-Marketplace (GeM)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://doca.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 flex items-center gap-1">
                  <span>Department of Consumer Affairs (DoCA)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://egazette.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 flex items-center gap-1">
                  <span>Official Gazette of India (QCO Orders)</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal Strategy */}
          <div className="space-y-2">
            <h4 className="font-bold text-white text-xs font-mono uppercase tracking-wider">Data & Rights Strategy</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Operates using officially accessible BIS metadata, gazette notifications, and authorized standards intelligence layers. Compliant with BIS reproduction guidelines.
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-slate-500">
          <div>
            © 2026 S.A.M.A.N. AI • Smart India Hackathon 2026 (SIH26108) Benchmark Prototype
          </div>
          <div className="flex items-center gap-3">
            <span>Ministry of Consumer Affairs</span>
            <span>•</span>
            <span>DoCA & BIS</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
