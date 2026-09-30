import React, { useState, useEffect, useRef } from 'react';
import { Video, X, Camera, Sparkles, Navigation, Hand, CheckCircle } from 'lucide-react';
import { speechService } from '../services/speechService';

export default function SignLanguageModal({ isOpen, onClose, onGestureNavigate }) {
  const videoRef = useRef(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [detectedGesture, setDetectedGesture] = useState('Scanning hand gestures...');
  const [gestureHistory, setGestureHistory] = useState([]);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [isOpen]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (err) {
      console.warn('Webcam permission denied or not available:', err);
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const simulateGestureTrigger = (gestureName, targetTab, speechMsg) => {
    setDetectedGesture(`Detected Sign: "${gestureName}" → Navigating to ${targetTab.toUpperCase()}`);
    setGestureHistory(prev => [gestureName, ...prev]);

    speechService.speak(speechMsg, 'en-IN');
    setTimeout(() => {
      onGestureNavigate(targetTab);
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-xl glass-panel-neon p-6 rounded-3xl border border-pink-500/50 space-y-5 shadow-[0_0_60px_rgba(255,0,128,0.4)]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-pink-500/30 pb-3">
          <div className="flex items-center gap-2">
            <Video className="w-6 h-6 text-pink-400 animate-pulse" />
            <div>
              <h3 className="text-lg font-bold font-orbitron text-pink-300">SIGN LANGUAGE GESTURE RECOGNIZER</h3>
              <p className="text-[10px] text-cyan-300 font-mono">REAL-TIME COMPUTER VISION AI</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Camera Feed Box */}
        <div className="relative w-full h-64 bg-slate-950 rounded-2xl border border-cyan-500/40 overflow-hidden flex items-center justify-center shadow-inner">
          <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover" />
          
          {!cameraActive && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400 gap-2 bg-slate-950/90">
              <Camera className="w-10 h-10 text-pink-400 animate-bounce" />
              <span className="text-xs font-mono">Camera Feed Initializing...</span>
            </div>
          )}

          {/* Sci-Fi Targeting Reticle overlay */}
          <div className="absolute inset-8 border border-cyan-400/30 rounded-xl pointer-events-none flex items-center justify-center">
            <div className="w-16 h-16 border-2 border-dashed border-pink-500 rounded-full animate-spin-slow"></div>
          </div>

          <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 rounded-xl bg-slate-950/90 border border-cyan-400 text-xs font-mono text-cyan-200 flex items-center gap-2">
            <Hand className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>{detectedGesture}</span>
          </div>
        </div>

        {/* Quick Simulated Sign Gesture Triggers */}
        <div>
          <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider block mb-2">
            Or Click a Simulated Sign Gesture:
          </span>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => simulateGestureTrigger('🖐️ OPEN PALM (Help)', 'map', 'Sign gesture detected: Open Palm. Navigating to Triage Map.')}
              className="p-3 rounded-xl bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 text-xs font-semibold text-cyan-200 flex items-center gap-2 transition"
            >
              <span>🖐️ Open Palm</span>
              <span className="text-[10px] text-slate-400">→ Emergency Triage Map</span>
            </button>

            <button
              onClick={() => simulateGestureTrigger('✌️ V-SIGN (Doctors)', 'directory', 'Sign gesture detected: V-Sign. Opening Doctor Directory.')}
              className="p-3 rounded-xl bg-slate-900 border border-pink-500/30 hover:border-pink-400 text-xs font-semibold text-pink-200 flex items-center gap-2 transition"
            >
              <span>✌️ V-Sign</span>
              <span className="text-[10px] text-slate-400">→ Doctors & Anti-Corruption</span>
            </button>

            <button
              onClick={() => simulateGestureTrigger('👍 THUMBS UP (Schemes)', 'schemes', 'Sign gesture detected: Thumbs Up. Opening Government Schemes.')}
              className="p-3 rounded-xl bg-slate-900 border border-emerald-500/30 hover:border-emerald-400 text-xs font-semibold text-emerald-200 flex items-center gap-2 transition"
            >
              <span>👍 Thumbs Up</span>
              <span className="text-[10px] text-slate-400">→ Govt Schemes</span>
            </button>

            <button
              onClick={() => simulateGestureTrigger('✊ FIST (Family)', 'family', 'Sign gesture detected: Fist. Opening Family Vault.')}
              className="p-3 rounded-xl bg-slate-900 border border-purple-500/30 hover:border-purple-400 text-xs font-semibold text-purple-200 flex items-center gap-2 transition"
            >
              <span>✊ Fist</span>
              <span className="text-[10px] text-slate-400">→ Family Vault</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
