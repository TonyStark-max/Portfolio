import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Sun, Moon, Sparkles, Terminal, Menu, X, Briefcase, Command, Layers, Download, ChevronDown } from 'lucide-react';
import { soundFx } from '../utils/sound';

export default function Navbar({ currentTheme, setTheme, recruiterMode, setRecruiterMode, soundEnabled, setSoundEnabled, onOpenTerminal, resumeUrl = "/resume.pdf" }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const themeRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    const handleClickOutside = (e) => {
      if (themeRef.current && !themeRef.current.contains(e.target)) {
        setThemeOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: '01. About', href: '#about' },
    { name: '02. Projects', href: '#projects' },
    { name: '03. Sandbox', href: '#terminal', action: onOpenTerminal },
    { name: '04. Timeline', href: '#experience' },
    { name: '05. Skills', href: '#skills' },
    { name: '06. Contact', href: '#contact' },
  ];

  const themeOptions = [
    { id: 'dark', label: 'Obsidian Noir', icon: Moon },
    { id: 'mono', label: 'Monochrome Minimal', icon: Layers },
    { id: 'light', label: 'Editorial Paper', icon: Sun },
    { id: 'nordic', label: 'Nordic Slate', icon: Sparkles },
    { id: 'oled', label: 'Cyber OLED', icon: Command }
  ];

  const handleNavClick = (e, link) => {
    soundFx.playClick();
    if (link.action) {
      e.preventDefault();
      link.action();
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-[var(--border-color)] shadow-lg'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Monogram */}
        <a
          href="#about"
          onClick={() => soundFx.playClick()}
          className="group flex items-center gap-2.5 text-lg font-bold font-display tracking-tight text-[var(--text-primary)] transition-transform hover:scale-105"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-[var(--accent-gold)] to-amber-600 flex items-center justify-center text-black font-extrabold shadow-md group-hover:rotate-6 transition-transform">
            S
          </div>
          <span className="flex items-center gap-1.5 font-editorial text-xl italic font-normal">
            Somu <span className="text-[var(--accent-gold)] not-italic text-sm font-sans font-semibold opacity-75">✦</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-mono tracking-wider uppercase">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link)}
              onMouseEnter={() => soundFx.playHover()}
              className="text-[var(--text-secondary)] hover:text-[var(--accent-gold)] transition-colors relative group py-1"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[var(--accent-gold)] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Action Controls & Utilities */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Recruiter Quick Mode Toggle */}
          <button
            onClick={() => {
              soundFx.playClick();
              setRecruiterMode(!recruiterMode);
            }}
            onMouseEnter={() => soundFx.playHover()}
            className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 border transition-all ${
              recruiterMode
                ? 'bg-amber-400/20 text-amber-300 border-amber-400/40 shadow-sm shadow-amber-400/20 ring-1 ring-amber-400/30'
                : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-color)] hover:border-[var(--border-highlight)]'
            }`}
            title="Toggle Recruiter Quick View Mode"
          >
            <Briefcase className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            <span>Recruiter View</span>
            {recruiterMode && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />}
          </button>

          {/* Sound Audio Toggle */}
          <button
            onClick={() => {
              const nextState = !soundEnabled;
              setSoundEnabled(nextState);
              soundFx.toggleSound(nextState);
              if (nextState) soundFx.playSuccess();
            }}
            className={`p-2 rounded-lg border transition-all ${
              soundEnabled
                ? 'bg-[var(--accent-gold-glow)] text-[var(--accent-gold)] border-[var(--border-highlight)]'
                : 'bg-[var(--bg-card)] text-[var(--text-muted)] border-[var(--border-color)] hover:text-[var(--text-primary)]'
            }`}
            title={soundEnabled ? 'Mute UI Sounds' : 'Enable UI Audio Feedback'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Theme Selector Dropdown */}
          <div ref={themeRef} className="relative">
            <button
              onClick={() => {
                soundFx.playClick();
                setThemeOpen(!themeOpen);
              }}
              className="p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-highlight)] transition-all flex items-center gap-1"
              title="Select Color Theme"
            >
              <Sun className="w-4 h-4 text-[var(--accent-gold)]" />
              <ChevronDown className={`w-3 h-3 transition-transform ${themeOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {themeOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-48 py-2 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-highlight)] shadow-2xl z-50 overflow-hidden"
                >
                  <div className="px-3 py-1 text-[10px] font-mono uppercase text-[var(--text-muted)] border-b border-[var(--border-color)] mb-1">
                    Select Theme
                  </div>
                  {themeOptions.map((t) => {
                    const Icon = t.icon;
                    const isSelected = currentTheme === t.id;
                    return (
                      <button
                        key={t.id}
                        onClick={() => {
                          soundFx.playClick();
                          setTheme(t.id);
                          setThemeOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-xs font-mono flex items-center justify-between transition-colors ${
                          isSelected
                            ? 'text-[var(--accent-gold)] font-semibold bg-[var(--accent-gold-glow)]'
                            : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5'
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          <Icon className="w-3.5 h-3.5" />
                          {t.label}
                        </span>
                        {isSelected && <span className="text-[10px] text-[var(--accent-gold)]">✓</span>}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Resume Download / View Button */}
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFx.playClick()}
            className="px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--border-highlight)] transition-all flex items-center gap-1.5"
            title="View or Download Resume PDF"
          >
            <Download className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
            <span>Resume</span>
          </a>

          {/* CTA Contact Drawer Trigger */}
          <a
            href="#contact"
            onClick={() => soundFx.playClick()}
            className="px-4 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[var(--accent-gold)] text-black hover:bg-amber-300 transition-all shadow-md hover:shadow-amber-400/20 active:scale-95"
          >
            Contact Somu
          </a>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="sm:hidden bg-[var(--bg-primary)] border-b border-[var(--border-color)] overflow-hidden px-4 py-6"
          >
            <nav className="flex flex-col gap-4 font-mono text-sm uppercase">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  className="text-[var(--text-secondary)] hover:text-[var(--accent-gold)] py-1 border-b border-[var(--border-color)]/30"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="mt-6 flex flex-col gap-3">
              <a
                href={resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] font-mono text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-[var(--accent-gold)]" />
                <span>View / Download Resume</span>
              </a>

              <button
                onClick={() => {
                  setRecruiterMode(!recruiterMode);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2.5 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/30 text-xs font-mono font-semibold flex items-center justify-center gap-2"
              >
                <Briefcase className="w-4 h-4" />
                {recruiterMode ? 'Recruiter Mode: ACTIVE' : 'Enable Recruiter Quick Mode'}
              </button>

              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-2.5 rounded-lg bg-[var(--accent-gold)] text-black font-semibold text-center text-xs font-mono"
              >
                Contact Somu
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
