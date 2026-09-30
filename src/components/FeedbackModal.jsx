import React, { useState } from 'react';
import { Star, X, Send, ShieldAlert, Sparkles, Heart } from 'lucide-react';
import { speechService } from '../services/speechService';
import confetti from 'canvas-confetti';

export default function FeedbackModal({ isOpen, onClose }) {
  const [rating, setRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [corruptionReported, setCorruptionReported] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e?.preventDefault();
    setSubmitted(true);

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 }
    });

    speechService.speak("Thank you for your feedback! GramaJarvis AI continuously improves rural healthcare quality based on your input.", 'en-IN');

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="w-full max-w-lg glass-panel-neon p-6 rounded-3xl border border-cyan-400/50 space-y-5 shadow-[0_0_60px_rgba(0,243,255,0.4)]">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-cyan-500/30 pb-3">
          <div className="flex items-center gap-2">
            <Heart className="w-6 h-6 text-pink-400" />
            <div>
              <h3 className="text-lg font-bold font-orbitron text-cyan-200">USER FEEDBACK & TRANSPARENCY REPORT</h3>
              <p className="text-[10px] text-cyan-400 font-mono">RATE GRAMA JARVIS & REPORT HOSPITAL CHEATING</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400 mx-auto flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-emerald-300 animate-bounce" />
            </div>
            <h4 className="text-xl font-bold font-orbitron text-emerald-300">THANK YOU FOR YOUR FEEDBACK!</h4>
            <p className="text-xs text-slate-300">Your review helps keep rural healthcare transparent and fraud-free.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-cyan-300 uppercase mb-2">Rate App Experience</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-2 transition transform hover:scale-110"
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= rating ? 'text-amber-300 fill-amber-300 shadow-[0_0_15px_#ffc800]' : 'text-slate-700'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-cyan-300 uppercase mb-1">Your Comments or Hospital Feedback</label>
              <textarea
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Tell us how GramaJarvis helped you or report any issue..."
                rows={3}
                className="w-full p-3 rounded-xl bg-slate-950 border border-cyan-500/30 text-white text-xs focus:outline-none focus:border-cyan-400"
              />
            </div>

            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-red-500/40">
              <input
                type="checkbox"
                id="corruption"
                checked={corruptionReported}
                onChange={(e) => setCorruptionReported(e.target.checked)}
                className="w-4 h-4 accent-pink-500"
              />
              <label htmlFor="corruption" className="text-xs text-red-300 font-semibold cursor-pointer">
                Report Hospital Overcharging or Corruption Incident
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 via-pink-500 to-emerald-400 text-black font-extrabold font-orbitron text-xs tracking-wider shadow-[0_0_20px_rgba(0,243,255,0.5)]"
            >
              SUBMIT FEEDBACK & REPORT
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
