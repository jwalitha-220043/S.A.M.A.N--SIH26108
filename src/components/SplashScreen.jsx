import React, { useEffect, useRef } from 'react';
import { Sparkles, Activity, ShieldCheck } from 'lucide-react';

export default function SplashScreen({ onComplete }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Create 3D-like floating particles & tech energy grid
    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 5 + 1,
      radius: Math.random() * 3.5 + 1,
      color: Math.random() > 0.5 ? '#00f3ff' : (Math.random() > 0.5 ? '#ff0080' : '#00ff66'),
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
    }));

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.fillStyle = 'rgba(3, 6, 23, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines
      ctx.strokeStyle = 'rgba(0, 243, 255, 0.04)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw glowing 3D-effect particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * p.z, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 15;
        ctx.shadowColor = p.color;
        ctx.globalAlpha = 0.8;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // Auto complete after 3.8 seconds
    const timer = setTimeout(() => {
      if (onComplete) onComplete();
    }, 3800);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030617] overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      {/* 3D Animated Title overlay */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 animate-float-slow">
        {/* Glowing holographic ring icon */}
        <div className="relative mb-6 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 blur-2xl opacity-60 animate-pulse-glow"></div>
          <div className="relative w-28 h-28 rounded-full border-2 border-cyan-400/80 bg-slate-950/80 backdrop-blur-xl flex items-center justify-center shadow-[0_0_50px_rgba(0,243,255,0.6)]">
            <Activity className="w-14 h-14 text-cyan-400 animate-spin-slow" />
          </div>
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-wider font-orbitron bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-pink-500 to-emerald-400 text-glow-cyan">
          GRAMA JARVIS
        </h1>
        <p className="mt-3 text-lg md:text-xl font-medium tracking-widest text-cyan-200/90 uppercase flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-pink-500" />
          3D AI Healthcare Platform for All
          <ShieldCheck className="w-5 h-5 text-emerald-400" />
        </p>

        {/* Loading Progress Bar */}
        <div className="mt-8 w-64 md:w-96 h-2 bg-slate-900 rounded-full overflow-hidden border border-cyan-500/30 p-0.5 shadow-[0_0_15px_rgba(0,243,255,0.3)]">
          <div className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full animate-[pulse_1s_infinite] transition-all duration-3000 w-full"></div>
        </div>

        <span className="mt-3 text-xs text-cyan-400/70 font-mono tracking-widest">
          INITIALIZING MULTILINGUAL AI & TRIAGE ENGINE...
        </span>
      </div>
    </div>
  );
}
