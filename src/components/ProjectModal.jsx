import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Cpu, CheckCircle, Layers, Activity, FileText } from 'lucide-react';
import { GithubIcon } from './Icons';
import { soundFx } from '../utils/sound';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            soundFx.playClick();
            onClose();
          }}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[var(--bg-primary)] border border-[var(--border-highlight)] rounded-3xl shadow-2xl overflow-hidden z-10 my-auto max-h-[90vh] flex flex-col"
        >
          {/* Header Bar */}
          <div className="p-6 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-secondary)]/50">
            <div>
              <span className="text-xs font-mono text-[var(--accent-gold)] uppercase tracking-wider block mb-1">
                {project.category} • Case Study
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-[var(--text-primary)]">
                {project.title}
              </h2>
            </div>

            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              className="p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-highlight)] transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content Scrollable Body */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1">
            {/* Banner Mockup Image */}
            <div className="relative rounded-2xl overflow-hidden border border-[var(--border-color)] group shadow-xl">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 sm:h-80 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                <span className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-mono text-amber-300 flex items-center gap-2">
                  <Activity className="w-3.5 h-3.5" />
                  {project.metrics}
                </span>
              </div>
            </div>

            {/* Overview & Description */}
            <div>
              <h3 className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-wider mb-2">
                System Overview
              </h3>
              <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Architecture Highlights */}
            {project.architecture && (
              <div className="space-y-4">
                <h3 className="text-sm font-mono text-[var(--accent-gold)] uppercase tracking-wider flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  Architectural Engineering Highlights
                </h3>

                <div className="grid grid-cols-1 gap-3">
                  {project.architecture.map((item, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-sm text-[var(--text-primary)] font-sans">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Badges */}
            <div>
              <h3 className="text-sm font-mono text-[var(--text-muted)] uppercase tracking-wider mb-3">
                Technologies & Frameworks
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] text-xs font-mono text-[var(--text-primary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div className="p-6 border-t border-[var(--border-color)] bg-[var(--bg-secondary)]/50 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs font-mono text-[var(--text-muted)]">
              {project.metrics}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {project.hldUrl && (
                <a
                  href={project.hldUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="px-4 py-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold flex items-center gap-2 hover:bg-amber-500/20 transition-all"
                  title="View High-Level Design Document in new tab"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>View HLD Doc</span>
                </a>
              )}

              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="px-4 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] text-xs font-mono flex items-center gap-2 hover:border-[var(--border-highlight)] transition-all"
              >
                <GithubIcon className="w-4 h-4" />
                <span>View Source Code</span>
              </a>

              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="px-5 py-2 rounded-xl bg-[var(--accent-gold)] text-black font-semibold text-xs font-mono flex items-center gap-2 hover:bg-amber-300 transition-all shadow-md"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
