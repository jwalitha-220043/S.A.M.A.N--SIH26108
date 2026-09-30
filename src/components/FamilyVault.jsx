import React, { useState } from 'react';
import { INITIAL_FAMILY } from '../services/mockData';
import { Users, Plus, PhoneCall, MessageSquare, Heart, AlertCircle, Sparkles, Send, Star } from 'lucide-react';
import { speechService } from '../services/speechService';
import confetti from 'canvas-confetti';

export default function FamilyVault({ user, onOpenFeedback }) {
  const [familyMembers, setFamilyMembers] = useState(INITIAL_FAMILY);
  const [alertLog, setAlertLog] = useState([]);
  
  // Add member form
  const [name, setName] = useState('');
  const [relation, setRelation] = useState('Grandparent');
  const [age, setAge] = useState('');
  const [conditions, setConditions] = useState('Hypertension');
  const [isSendingAlert, setIsSendingAlert] = useState(false);

  const handleAddMember = (e) => {
    e?.preventDefault();
    if (!name.trim()) return;

    const newMember = {
      id: "f-" + Date.now(),
      name: name.trim(),
      relation,
      age: parseInt(age) || 50,
      gender: "Female",
      bloodGroup: "O+",
      chronicConditions: conditions || "General Health Monitor",
      lastVitals: "BP: 124/82 | Normal",
      phone: user?.phone || "+91 98765 43210",
      healthCardId: "AROGYA-AP-" + Math.floor(100000 + Math.random() * 900000)
    };

    setFamilyMembers([...familyMembers, newMember]);
    setName('');
    setAge('');
    setConditions('');

    speechService.speak(`Added ${newMember.name} to family health vault!`, 'en-IN');
  };

  const handleDispatchFamilyVoiceAlert = (member, alertType) => {
    setIsSendingAlert(true);
    const alertMessages = {
      dosage: `Jarvis Voice Alert sent to ${member.name} (${member.phone}): "Grandma Rameshamma, please take your Diabetes Metformin tablet now with warm water!"`,
      scheme: `Jarvis SMS & Voice Alert sent to ${member.name}: "You are 100% eligible for Arogya Sri ₹5 Lakh free surgery coverage!"`,
      vitals: `Jarvis Vital Check Alert sent to ${member.name}: "BP is recorded as 130/85. Perfect health status!"`
    };

    const textMsg = alertMessages[alertType] || alertMessages.dosage;

    speechService.speak(textMsg, 'en-IN', () => {
      setIsSendingAlert(false);
    });

    setAlertLog(prev => [{
      id: Date.now(),
      recipient: member.name,
      phone: member.phone,
      message: textMsg,
      timestamp: new Date().toLocaleTimeString()
    }, ...prev]);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 }
    });
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-panel p-5 rounded-3xl border border-cyan-500/30">
        <div>
          <h2 className="text-2xl font-black font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-pink-400 to-emerald-300 flex items-center gap-2">
            <Users className="w-6 h-6 text-pink-400" /> MULTI-MEMBER FAMILY VAULT & VOICE ALERTS
          </h2>
          <p className="text-xs text-cyan-200/70 mt-1 font-mono">
            Register your whole family on 1 mobile phone ({user?.phone || '+91 98765 43210'}) & dispatch automated voice/SMS alerts
          </p>
        </div>

        <button
          onClick={onOpenFeedback}
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold font-orbitron text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(255,0,128,0.5)] hover:scale-105 transition"
        >
          <Star className="w-4 h-4 text-amber-300 fill-amber-300" /> LEAVE APP FEEDBACK
        </button>
      </div>

      {/* Main Grid: Family Members & Form & Dispatch Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Member Add Form */}
        <div className="glass-panel-neon p-6 rounded-3xl border border-pink-400/40 space-y-4">
          <h3 className="text-lg font-bold font-orbitron text-pink-300 flex items-center gap-2">
            <Plus className="w-5 h-5 text-cyan-400" /> ADD FAMILY MEMBER
          </h3>

          <form onSubmit={handleAddMember} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Member Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Grandma Venkatamma"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-white focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Relation</label>
                <select
                  value={relation}
                  onChange={(e) => setRelation(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-white focus:outline-none"
                >
                  <option value="Grandparent">Grandparent</option>
                  <option value="Parent">Parent</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Child">Child</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 mb-1 font-semibold">Age</label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="e.g. 70"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-white focus:outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 mb-1 font-semibold">Chronic Health Conditions</label>
              <input
                type="text"
                value={conditions}
                onChange={(e) => setConditions(e.target.value)}
                placeholder="e.g. Diabetes, Asthma, High BP"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-cyan-500/30 text-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-emerald-400 text-black font-extrabold font-orbitron text-xs tracking-wider shadow-[0_0_20px_rgba(0,243,255,0.4)]"
            >
              REGISTER MEMBER TO VAULT
            </button>
          </form>
        </div>

        {/* Registered Family Members */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-cyan-500/30 space-y-4">
          <h3 className="text-lg font-bold font-orbitron text-white">
            REGISTERED FAMILY PROFILES (LINKED TO {user?.phone || '+91 98765 43210'})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {familyMembers.map((member) => (
              <div key={member.id} className="p-5 rounded-2xl bg-slate-950/80 border border-cyan-500/30 space-y-3 text-xs">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-base font-bold text-white font-orbitron">{member.name}</h4>
                    <span className="text-cyan-300 text-[11px] font-semibold">{member.relation} • {member.age} yrs</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-purple-950 text-purple-300 border border-purple-500/40 text-[10px]">
                    {member.healthCardId}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1 font-mono">
                  <div className="text-pink-300">Conditions: {member.chronicConditions}</div>
                  <div className="text-emerald-400">Vitals: {member.lastVitals}</div>
                </div>

                {/* Voice Alert Dispatch Buttons */}
                <div className="pt-2 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleDispatchFamilyVoiceAlert(member, 'dosage')}
                    className="flex-1 py-2 rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/50 hover:bg-cyan-500/30 font-bold text-[11px] flex items-center justify-center gap-1"
                  >
                    <PhoneCall className="w-3.5 h-3.5 text-cyan-400" /> Dosage Voice Alert
                  </button>

                  <button
                    onClick={() => handleDispatchFamilyVoiceAlert(member, 'scheme')}
                    className="flex-1 py-2 rounded-xl bg-pink-500/20 text-pink-300 border border-pink-400/50 hover:bg-pink-500/30 font-bold text-[11px] flex items-center justify-center gap-1"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-pink-400" /> Scheme SMS Alert
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Live Alert Log Stream */}
          {alertLog.length > 0 && (
            <div className="mt-6 pt-4 border-t border-cyan-500/30 space-y-2">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">JARVIS ALERT DISPATCH HISTORY:</h4>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {alertLog.map((log) => (
                  <div key={log.id} className="p-3 rounded-xl bg-slate-900/90 border border-cyan-500/20 text-xs font-mono text-cyan-200 flex justify-between items-center">
                    <span>{log.message}</span>
                    <span className="text-[10px] text-slate-500 ml-2">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
