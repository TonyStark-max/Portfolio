import React, { useState, useEffect } from 'react';
import { portfolioData } from './data/portfolioData';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import TerminalPlayground from './components/TerminalPlayground';
import Timeline from './components/Timeline';
import SkillsMatrix from './components/SkillsMatrix';
import ContactModal from './components/ContactModal';
import Footer from './components/Footer';

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [recruiterMode, setRecruiterMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleOpenTerminal = () => {
    const termEl = document.getElementById('terminal');
    if (termEl) {
      termEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContact = () => {
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] relative selection:bg-amber-400/30 selection:text-amber-200">
      {/* Custom Physics Cursor (Disabled) */}
      <CustomCursor />

      {/* Main Navbar */}
      <Navbar
        currentTheme={theme}
        setTheme={setTheme}
        recruiterMode={recruiterMode}
        setRecruiterMode={setRecruiterMode}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        onOpenTerminal={handleOpenTerminal}
        resumeUrl={portfolioData.personal.resumeUrl}
      />

      {/* Main Body */}
      <main>
        <Hero
          data={portfolioData}
          recruiterMode={recruiterMode}
          onOpenTerminal={handleOpenTerminal}
          onOpenContact={handleOpenContact}
        />

        <Projects data={portfolioData} />

        <TerminalPlayground data={portfolioData} />

        <Timeline data={portfolioData} />

        <SkillsMatrix data={portfolioData} />

        <ContactModal data={portfolioData} />
      </main>

      {/* Footer */}
      <Footer data={portfolioData} />
    </div>
  );
}
