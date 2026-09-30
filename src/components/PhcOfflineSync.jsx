import React, { useState, useEffect } from 'react';
import { getOfflineRecords, saveOfflineRecord, triggerSyncAllRecords } from '../services/offlineDb';
import { Database, RefreshCw, Plus, CheckCircle, WifiOff, ShieldCheck, User, Activity, FileText } from 'lucide-react';
import { speechService } from '../services/speechService';

export default function PhcOfflineSync({ isOnline }) {
  const [records, setRecords] = useState([]);
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Form state
  const [patientName, setPatientName] = useState('');
  const [village, setVillage] = useState('Guntur Rural PHC #1');
  const [age, setAge] = useState('');
  const [vitals, setVitals] = useState('BP: 120/80 | SpO2: 98% | Pulse: 72');
  const [diagnosis, setDiagnosis] = useState('');
  const [medication, setMedication] = useState('');

  useEffect(() => {
    setRecords(getOfflineRecords());
  }, []);

  const handleAddRecord = (e) => {
    e?.preventDefault();
    if (!patientName.trim()) return;

    const newRec = saveOfflineRecord({
      patientName,
      village,
      age: parseInt(age) || 45,
      vitals,
      diagnosis: diagnosis || 'General Health Checkup',
      medicationPrescribed: medication || 'Multivitamins & Paracetamol',
      doctorNotes: 'Recorded via GramaJarvis PHC Offline Terminal'
    });

    setRecords(getOfflineRecords());
    setPatientName('');
    setAge('');
    setDiagnosis('');
    setMedication('');

    speechService.speak(`Record saved locally for ${newRec.patientName}. Pending sync when internet signal restores.`, 'en-IN');
  };

  const handleSyncAll = () => {
    setIsSyncing(true);
    speechService.speak("Syncing offline rural health records to Government Central Vault...", 'en-IN');

    setTimeout(() => {
      const updated = triggerSyncAllRecords();
      setRecords(updated);
      setIsSyncing(false);
      speechService.speak("All offline PHC records successfully synced to Health Vault!", 'en-IN');
    }, 2000);
  };

  const pendingCount = records.filter(r => r.syncStatus.includes('Pending')).length;

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-panel p-5 rounded-3xl border border-cyan-500/30">
        <div>
          <h2 className="text-2xl font-black font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-pink-400 to-emerald-300 flex items-center gap-2">
            <Database className="w-6 h-6 text-cyan-400" /> PHC CONNECTIVITY & OFFLINE PWA SYNC
          </h2>
          <p className="text-xs text-cyan-200/70 mt-1 font-mono">
            Zero-internet patient record storage for Primary Health Centres in low-reception rural belts
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            Pending Sync: <strong className="text-pink-400">{pendingCount} Records</strong>
          </div>

          <button
            onClick={handleSyncAll}
            disabled={isSyncing || pendingCount === 0}
            className={`px-4 py-2 rounded-xl text-xs font-bold font-orbitron flex items-center gap-2 transition shadow-lg ${
              pendingCount > 0
                ? 'bg-gradient-to-r from-cyan-400 to-emerald-400 text-black shadow-[0_0_20px_rgba(0,253,255,0.5)] hover:opacity-90'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'SYNCING TO VAULT...' : 'SYNC ALL NOW'}
          </button>
        </div>
      </div>

      {/* Grid: Form & Records */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Record Entry Form */}
        <div className="glass-panel-neon p-6 rounded-3xl border border-cyan-400/40 space-y-4">
          <h3 className="text-lg font-bold font-orbitron text-cyan-300 flex items-center gap-2">
            <Plus className="w-5 h-5 text-pink-400" /> NEW PATIENT PHC ENTRY
          </h3>
          <p className="text-xs text-slate-300">Saves directly to phone storage when offline</p>

          <form onSubmit={handleAddRecord} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Patient Full Name</label>
              <input
                type="text"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                placeholder="e.g. Laxmi Devi"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-white focus:outline-none focus:border-cyan-400"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 64"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-white focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Village / PHC Clinic</label>
                <input
                  type="text"
                  value={village}
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-white focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Recorded Vitals</label>
              <input
                type="text"
                value={vitals}
                onChange={(e) => setVitals(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-white focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Diagnosis</label>
              <input
                type="text"
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="e.g. Fever, Hypertension, Diabetes check"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Medication Prescribed</label>
              <input
                type="text"
                value={medication}
                onChange={(e) => setMedication(e.target.value)}
                placeholder="e.g. Paracetamol 650mg, Metformin"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-extrabold font-orbitron text-xs tracking-wider shadow-[0_0_20px_rgba(255,0,128,0.5)] hover:opacity-95"
            >
              SAVE OFFLINE RECORD
            </button>
          </form>
        </div>

        {/* Existing PHC Records Stream */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-cyan-500/30 space-y-4">
          <h3 className="text-lg font-bold font-orbitron text-white flex items-center justify-between">
            <span>OFFLINE & SYNCED PHC HEALTH VAULT RECORDS</span>
            <span className="text-xs text-cyan-400 font-mono font-normal">TOTAL: {records.length}</span>
          </h3>

          <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
            {records.map((rec) => {
              const isPending = rec.syncStatus.includes('Pending');
              return (
                <div
                  key={rec.id}
                  className={`p-4 rounded-2xl border transition-all text-xs space-y-2 ${
                    isPending
                      ? 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                      : 'bg-slate-950/80 border-cyan-500/30 text-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-cyan-400" />
                      <strong className="text-white text-sm">{rec.patientName}</strong>
                      <span className="text-slate-400">({rec.age} yrs • {rec.village})</span>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full font-bold text-[10px] ${
                        isPending ? 'bg-amber-500/20 text-amber-300 border border-amber-400' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-400'
                      }`}
                    >
                      {rec.syncStatus}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-slate-300 font-mono bg-slate-900/60 p-2 rounded-xl">
                    <div>Vitals: <span className="text-cyan-300">{rec.vitals}</span></div>
                    <div>Diagnosis: <span className="text-pink-300">{rec.diagnosis}</span></div>
                  </div>

                  <div className="text-slate-400 text-[11px] flex justify-between">
                    <span>Meds: {rec.medicationPrescribed}</span>
                    <span>{new Date(rec.timestamp).toLocaleTimeString()}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
