import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { soundFx } from '../utils/sound';

export default function Footer({ data }) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    soundFx.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[var(--border-color)] bg-[var(--bg-secondary)]/50 py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Brand info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[var(--accent-gold)] to-amber-600 flex items-center justify-center text-black font-extrabold text-sm shadow-md">
            S
          </div>
          <div>
            <div className="text-sm font-bold font-display text-[var(--text-primary)]">
              {data.personal.name}
            </div>
            <div className="text-[11px] font-mono text-[var(--text-muted)] flex items-center gap-2">
              <span>IST Local Time: {timeStr || '10:42 PM IST'}</span>
              <span>•</span>
              <span className="text-emerald-400">Available</span>
            </div>
          </div>
        </div>

        {/* Center Copyright */}
        <div className="text-center text-xs font-mono text-[var(--text-muted)]">
          © 2026 Somu • B.Tech CSE (Malla Reddy University). All rights reserved.
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <a
            href={data.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playClick()}
            className="p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-highlight)] transition-all"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href={data.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playClick()}
            className="p-2.5 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-highlight)] transition-all"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-[var(--accent-gold)] text-black font-semibold hover:bg-amber-300 transition-all shadow-md active:scale-95"
            title="Scroll Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
