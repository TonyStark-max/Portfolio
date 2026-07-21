import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Download, ExternalLink, RefreshCw, BookOpen, Layers, Check } from 'lucide-react';
import { soundFx } from '../utils/sound';

export default function HldDocViewerModal({ docUrl, docTitle, onClose }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!docUrl) return;

    if (docUrl.endsWith('.md')) {
      setLoading(true);
      setError(null);
      fetch(docUrl)
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
          return res.text();
        })
        .then((text) => {
          setContent(text);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Failed to load HLD document:', err);
          setError('Could not load markdown content directly.');
          setLoading(false);
        });
    }
  }, [docUrl]);

  if (!docUrl) return null;

  const isMarkdown = docUrl.endsWith('.md');

  // Handle non-markdown direct pdf opening
  if (!isMarkdown) {
    window.open(docUrl, '_blank');
    onClose();
    return null;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    soundFx.playSuccess();
    setTimeout(() => setCopied(false), 2000);
  };

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
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Reader Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-[var(--bg-primary)] border border-[var(--border-highlight)] rounded-3xl shadow-2xl overflow-hidden z-10 my-auto max-h-[90vh] flex flex-col font-sans"
        >
          {/* Header Bar */}
          <div className="p-5 sm:p-6 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-secondary)]/80">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-[var(--accent-gold)] uppercase tracking-wider block">
                  High-Level Design Document
                </span>
                <h2 className="text-xl sm:text-2xl font-bold font-display text-[var(--text-primary)]">
                  {docTitle || 'Architecture Design Spec'}
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={docUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="hidden sm:flex px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-[var(--text-secondary)] hover:text-white hover:border-white/20 transition-all items-center gap-1.5"
                title="Open raw markdown file"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Raw File</span>
              </a>

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
          </div>

          {/* Document Content Scrollable Body */}
          <div className="p-6 sm:p-10 overflow-y-auto space-y-6 flex-1 font-mono text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed">
            {loading && (
              <div className="py-20 flex flex-col items-center justify-center text-[var(--text-muted)] space-y-3">
                <RefreshCw className="w-6 h-6 animate-spin text-[var(--accent-gold)]" />
                <span>Fetching High-Level Design specification...</span>
              </div>
            )}

            {error && (
              <div className="p-6 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-center space-y-3 font-sans">
                <p>{error}</p>
                <a
                  href={docUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-rose-500 text-white font-semibold text-xs"
                >
                  <ExternalLink className="w-4 h-4" /> Open File Directly
                </a>
              </div>
            )}

            {!loading && !error && (
              <div className="prose prose-invert max-w-none space-y-4">
                <pre className="p-6 rounded-2xl bg-[#0a0c10] border border-[var(--border-color)] text-[var(--text-secondary)] font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto whitespace-pre-wrap selection:bg-amber-400/30">
                  {content}
                </pre>
              </div>
            )}
          </div>

          {/* Footer Controls */}
          <div className="p-4 sm:p-5 border-t border-[var(--border-color)] bg-[var(--bg-secondary)]/80 flex items-center justify-between font-mono text-xs">
            <span className="text-[var(--text-muted)] hidden sm:block">
              Specification Format: GitHub Markdown (.md)
            </span>

            <div className="flex items-center gap-3 ml-auto">
              <button
                onClick={handleCopy}
                className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-[var(--text-secondary)] hover:text-white transition-all flex items-center gap-1.5 text-xs font-mono"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <FileText className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Spec'}</span>
              </button>

              <a
                href={docUrl}
                download
                onClick={() => soundFx.playClick()}
                className="px-4 py-2 rounded-xl bg-[var(--accent-gold)] text-black font-semibold flex items-center gap-1.5 text-xs font-mono hover:bg-amber-300 transition-all shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Spec</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
