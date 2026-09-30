import React, { useState } from 'react';
import SamanNavbar from './components/SamanNavbar';
import LoanProHero from './components/LoanProHero';
import SmartPanelWorkspace from './components/SmartPanelWorkspace';
import TemporalGraphVisualizer from './components/TemporalGraphVisualizer';
import BenchmarkMetrics from './components/BenchmarkMetrics';
import RoiCalculator from './components/RoiCalculator';
import SamanFooter from './components/SamanFooter';
import { SAMAN_DATA } from './data/samanData';

export default function App() {
  const [activeTab, setActiveTab] = useState('hero'); // 'hero' | 'workspace' | 'graph' | 'benchmarks' | 'roi'
  const [currentLang, setCurrentLang] = useState('en');
  const [activePreset, setActivePreset] = useState(SAMAN_DATA.presetTenders[0]);

  // Handle Preset Selection from Hero or Workspace
  const handleSelectPreset = (preset) => {
    setActivePreset(preset);
    setActiveTab('workspace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-100 selection:bg-cyan-500 selection:text-black font-sans relative overflow-x-hidden">
      
      {/* Background Radial Glow Grid */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-blue-900/10 via-cyan-950/5 to-transparent blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0a_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* LoanPro-Style Sticky Header */}
        <SamanNavbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          currentLang={currentLang}
          setCurrentLang={setCurrentLang}
          onOpenWorkspace={() => {
            setActiveTab('workspace');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

        {/* Dynamic Section View */}
        <main className="flex-1">
          {activeTab === 'hero' && (
            <>
              <LoanProHero
                onStartWorkspace={() => {
                  setActiveTab('workspace');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onSelectPreset={handleSelectPreset}
              />
              <SmartPanelWorkspace initialPreset={activePreset} />
              <TemporalGraphVisualizer />
              <BenchmarkMetrics />
              <RoiCalculator />
            </>
          )}

          {activeTab === 'workspace' && (
            <div className="pt-4">
              <SmartPanelWorkspace initialPreset={activePreset} />
            </div>
          )}

          {activeTab === 'graph' && (
            <div className="pt-4">
              <TemporalGraphVisualizer />
            </div>
          )}

          {activeTab === 'benchmarks' && (
            <div className="pt-4">
              <BenchmarkMetrics />
            </div>
          )}

          {activeTab === 'roi' && (
            <div className="pt-4">
              <RoiCalculator />
            </div>
          )}
        </main>

        {/* Footer */}
        <SamanFooter />

      </div>
    </div>
  );
}
