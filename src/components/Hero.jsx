import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, Terminal, Code2, Cpu, ShieldCheck, Zap } from 'lucide-react';
import { soundFx } from '../utils/sound';

export default function Hero({ data, recruiterMode, onOpenTerminal, onOpenContact }) {
  const { scrollY } = useScroll();
  const yBackground = useTransform(scrollY, [0, 800], [0, 150]);
  const yHeroText = useTransform(scrollY, [0, 600], [0, -40]);
  const yCard = useTransform(scrollY, [0, 600], [0, 40]);

  return (
    <section id="about" className="relative min-h-[92vh] pt-32 pb-20 flex flex-col justify-center overflow-hidden">
      {/* Parallax Ambient Mesh & Background Shapes */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <motion.div
        style={{ y: yBackground }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[var(--accent-gold)]/15 to-teal-500/10 rounded-full blur-[140px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Recruiter Quick Mode Alert Notice */}
        {recruiterMode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-amber-400/20 text-amber-300">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300 block">
                  Recruiter Quick View Active
                </span>
                <p className="text-sm font-sans font-medium text-amber-100/90">
                  B.Tech CSE (CGPA 7.9/10) • Java 21, Spring Boot, PostgreSQL, Redis, Netty & Docker Specialist.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <a
                href="#contact"
                onClick={onOpenContact}
                className="px-4 py-1.5 rounded-lg bg-amber-400 text-black text-xs font-mono font-bold hover:bg-amber-300 transition-colors"
              >
                Schedule Call
              </a>
            </div>
          </motion.div>
        )}

        {/* Live Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-secondary)] shadow-sm mb-6"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
          </span>
          <span>{data.personal.availability}</span>
        </motion.div>

        {/* Hero Title & Headline with Parallax Scroll Shift */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <motion.div
            style={{ y: yHeroText }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-8"
          >
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-[var(--text-primary)] font-display leading-[1.05]">
              Architecting <br />
              <span className="font-editorial italic font-normal text-[var(--accent-gold)]">
                High-Performance
              </span>{' '}
              <br />
              Backend Systems.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl font-sans font-normal leading-relaxed">
              {data.personal.tagline}
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#projects"
                onClick={() => soundFx.playClick()}
                className="px-6 py-3 rounded-xl bg-[var(--accent-gold)] text-black font-semibold text-sm flex items-center gap-2 hover:bg-amber-300 transition-all shadow-lg shadow-amber-500/10 hover:scale-105 active:scale-95"
              >
                <span>View Selected Work</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => {
                  soundFx.playClick();
                  onOpenTerminal();
                }}
                className="px-5 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm font-mono flex items-center gap-2 hover:border-[var(--border-highlight)] hover:bg-[var(--bg-card-hover)] transition-all"
              >
                <Terminal className="w-4 h-4 text-[var(--accent-gold)]" />
                <span>Launch Interactive Terminal</span>
              </button>

              <a
                href={data.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="px-4 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-xs font-mono flex items-center gap-1.5 hover:border-[var(--border-highlight)] transition-all"
              >
                <Code2 className="w-4 h-4" />
                <span>GitHub Profile</span>
              </a>
            </div>
          </motion.div>

          {/* Quick Metrics & Bio Highlights Panel with Counter Parallax */}
          <motion.div
            style={{ y: yCard }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="glass-panel p-6 sm:p-8 rounded-3xl relative overflow-hidden group hover:border-[var(--border-highlight)] transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl group-hover:bg-amber-500/25 transition-all" />

              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4 mb-6">
                <span className="text-xs font-mono text-[var(--accent-gold)] uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5" />
                  Key Impact Snapshot
                </span>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">Verified Metrics</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {data.personal.stats.map((stat, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-white/5 border border-white/5 space-y-1 group-hover:border-white/10 transition-colors">
                    <div className="text-2xl sm:text-3xl font-extrabold font-display text-[var(--text-primary)] tracking-tight">
                      {stat.value}
                    </div>
                    <div className="text-xs font-medium text-[var(--text-secondary)] leading-tight">
                      {stat.label}
                    </div>
                    <div className="text-[10px] font-mono text-[var(--accent-gold)] truncate">
                      {stat.highlight}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-4 border-t border-[var(--border-color)] flex items-center justify-between text-[11px] text-[var(--text-muted)] font-mono leading-relaxed">
                <span className="flex items-center gap-1.5 flex-wrap">
                  <Cpu className="w-3.5 h-3.5 text-[var(--accent-gold)] shrink-0" />
                  <span>Java 21 • Spring Boot • Netty • PostgreSQL • Redis</span>
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
