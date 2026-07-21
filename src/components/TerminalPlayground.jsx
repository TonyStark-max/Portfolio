import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, CornerDownLeft, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/sound';

export default function TerminalPlayground({ data }) {
  const [history, setHistory] = useState([
    { type: 'system', content: `Welcome to ${data.personal.name}'s Interactive CLI Terminal [v2.4.0-release]` },
    { type: 'system', content: 'Type "help" or click any quick command chip below.' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const terminalBodyRef = useRef(null);

  const handleCommand = (cmdStr) => {
    soundFx.playClick();
    const cleanCmd = cmdStr.trim().toLowerCase();
    
    const newHistory = [...history, { type: 'user', content: `$ ${cmdStr}` }];

    switch (cleanCmd) {
      case 'help':
        newHistory.push({
          type: 'output',
          content: `Available Commands:
  • help       : Display available commands
  • whoami     : Print summary & bio about ${data.personal.name}
  • education  : View degree & CGPA details
  • skills     : View Java, Spring Boot, Netty, DB & DevOps stack
  • projects   : View highlighted software systems
  • contact    : Get direct email & GitHub / LinkedIn links
  • hired      : Send a hiring signal (Triggers Confetti 🎉)
  • clear      : Clear terminal screen`
        });
        break;

      case 'whoami':
      case 'bio':
        newHistory.push({
          type: 'output',
          content: `${data.personal.name} — ${data.personal.title}
University: ${data.personal.university}
Degree: ${data.personal.degree} (CGPA: ${data.personal.cgpa})
Status: ${data.personal.availability}
Bio: ${data.personal.bio.join(' ')}`
        });
        break;

      case 'education':
        newHistory.push({
          type: 'output',
          content: `Academic Background:
  Institution : ${data.personal.university}
  Degree      : ${data.personal.degree}
  CGPA        : ${data.personal.cgpa}
  Focus       : Data Structures, Operating Systems, DBMS, Computer Networks`
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'output',
          content: `Core Software Stack:
  [Languages] : Java 21, Python, JavaScript
  [Backend]   : Spring Boot, Spring Security, Spring AI, JPA/Hibernate, Netty, REST APIs
  [Databases] : PostgreSQL (RLS, CDC), Redis (TTL locks), Netty WAL, MinIO
  [DevOps]    : Docker & Compose, Git, GitHub Actions, Linux, Maven, Vercel`
        });
        break;

      case 'projects':
        const projList = data.projects.map((p, i) => `  [${i+1}] ${p.title} (${p.category}) - ${p.metrics}`).join('\n');
        newHistory.push({
          type: 'output',
          content: `Featured Systems Projects:\n${projList}`
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'output',
          content: `Direct Contact Channels:
  • Email    : ${data.personal.email}
  • GitHub   : ${data.personal.github}
  • LinkedIn : ${data.personal.linkedin}`
        });
        break;

      case 'hired':
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
        soundFx.playSuccess();
        newHistory.push({
          type: 'output',
          content: `🎉 SUCCESS! Thank you for considering ${data.personal.name}! Direct Email: ${data.personal.email}`
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case '':
        break;

      default:
        newHistory.push({
          type: 'error',
          content: `Command not recognized: "${cmdStr}". Type "help" for a list of available commands.`
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCommand(inputVal);
  };

  // Scroll ONLY the internal terminal box, NOT the window screen
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [history]);

  const quickBtns = ['whoami', 'education', 'skills', 'projects', 'contact', 'hired', 'clear'];

  return (
    <section id="terminal" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title with Scroll Ease-In Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent-gold)] uppercase tracking-widest mb-3">
            <TerminalIcon className="w-4 h-4" />
            <span>03 / Developer Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[var(--text-primary)]">
            Interactive <span className="font-editorial italic font-normal text-[var(--accent-gold)] font-serif">Terminal</span> Emulator
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-2 font-mono">
            Test live commands to inspect architecture details, stack metrics, or send a hiring signal.
          </p>
        </motion.div>

        {/* Terminal Window Box */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="rounded-3xl border border-[var(--border-color)] bg-[#07080b] shadow-2xl overflow-hidden font-mono text-xs sm:text-sm"
        >
          {/* Header Bar */}
          <div className="px-5 py-3.5 bg-[#0f1118] border-b border-[var(--border-color)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-3 text-xs text-[var(--text-muted)]">somu@backend-arch ~ zsh</span>
            </div>

            <button
              onClick={() => handleCommand('clear')}
              className="text-[10px] text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center gap-1 transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              Reset Terminal
            </button>
          </div>

          {/* Terminal Body Screen - Internal Container Scroll Only */}
          <div ref={terminalBodyRef} className="p-6 h-80 overflow-y-auto space-y-3 font-mono">
            {history.map((item, idx) => (
              <div key={idx} className="leading-relaxed">
                {item.type === 'user' && (
                  <span className="text-[var(--accent-gold)] font-semibold">{item.content}</span>
                )}
                {item.type === 'system' && (
                  <span className="text-emerald-400/90">{item.content}</span>
                )}
                {item.type === 'output' && (
                  <pre className="text-[var(--text-secondary)] whitespace-pre-wrap font-mono mt-1">
                    {item.content}
                  </pre>
                )}
                {item.type === 'error' && (
                  <span className="text-rose-400">{item.content}</span>
                )}
              </div>
            ))}
          </div>

          {/* Quick Action Chips */}
          <div className="px-6 py-2 bg-[#0c0e14] border-t border-[var(--border-color)]/50 flex flex-wrap gap-2 items-center">
            <span className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider mr-1">Quick Run:</span>
            {quickBtns.map((btn) => (
              <button
                key={btn}
                onClick={() => handleCommand(btn)}
                className="px-2.5 py-1 rounded bg-white/5 hover:bg-[var(--accent-gold-glow)] text-[var(--text-secondary)] hover:text-[var(--accent-gold)] text-[11px] border border-white/10 transition-colors"
              >
                {btn}
              </button>
            ))}
          </div>

          {/* Input Prompt Form */}
          <form onSubmit={handleSubmit} className="p-4 bg-[#0a0b10] border-t border-[var(--border-color)] flex items-center gap-3">
            <span className="text-[var(--accent-gold)] font-bold">$</span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder='Type a command like "help", "education", "skills" or "hired"...'
              className="flex-1 bg-transparent text-[var(--text-primary)] focus:outline-none font-mono text-sm placeholder-[var(--text-muted)]"
            />
            <button
              type="submit"
              className="p-2 rounded-lg bg-[var(--accent-gold)] text-black hover:bg-amber-300 transition-colors"
            >
              <CornerDownLeft className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}
