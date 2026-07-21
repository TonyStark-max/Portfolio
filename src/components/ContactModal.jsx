import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, Send, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/sound';

export default function ContactModal({ data }) {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Software Engineer Opportunities (Full-Time)',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const subjects = [
    'Software Engineer Opportunities (Full-Time)',
    'Backend Engineering Internship',
    'Systems Architecture Project / Consulting',
    'General Technical Inquiry'
  ];

  const handleCopyEmail = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(data.personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmitMessage = (e) => {
    e.preventDefault();
    soundFx.playSuccess();
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent-gold)] uppercase tracking-widest mb-3">
            <Mail className="w-3.5 h-3.5" />
            <span>06 / Initiate Connection</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-display text-[var(--text-primary)]">
            Let's Build Something <span className="font-editorial italic font-normal text-[var(--accent-gold)]">Exceptional</span>
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-3">
            Seeking Software Engineering opportunities to build reliable, high-concurrency backend systems.
          </p>
        </motion.div>

        {/* Contact Container Box with Scroll Entrance Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-[var(--border-color)] grid grid-cols-1 lg:grid-cols-12"
        >
          {/* Left Info Column */}
          <div className="lg:col-span-5 p-8 bg-[var(--bg-secondary)]/60 border-b lg:border-b-0 lg:border-r border-[var(--border-color)] flex flex-col justify-between space-y-8">
            <div>
              <span className="text-xs font-mono text-[var(--accent-gold)] uppercase tracking-wider block mb-2">
                Direct Contact & Profiles
              </span>
              <h3 className="text-2xl font-bold font-display text-[var(--text-primary)]">
                {data.personal.name}
              </h3>
              <p className="text-xs font-mono text-[var(--text-muted)] mt-1">
                {data.personal.location}
              </p>

              {/* Copy Email Button */}
              <div className="mt-6 p-4 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)] space-y-2">
                <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">
                  Direct Email Address
                </span>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-mono font-semibold text-[var(--text-primary)] truncate">
                    {data.personal.email}
                  </span>
                  <button
                    onClick={handleCopyEmail}
                    className="px-3 py-1.5 rounded-lg bg-[var(--accent-gold)] text-black text-xs font-mono font-semibold hover:bg-amber-300 transition-colors shrink-0 flex items-center gap-1"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Profile Links */}
            <div className="space-y-3 pt-6 border-t border-[var(--border-color)]">
              <a
                href={data.personal.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--accent-gold)] py-1 transition-colors"
              >
                <span>GitHub Repositories & Commits</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={data.personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => soundFx.playClick()}
                className="flex items-center justify-between text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--accent-gold)] py-1 transition-colors"
              >
                <span>LinkedIn Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Right Direct Message Form Column */}
          <div className="lg:col-span-7 p-8">
            <h4 className="text-lg font-bold font-display text-[var(--text-primary)] mb-6 flex items-center gap-2">
              <span className="text-[var(--accent-gold)] font-mono text-sm">#</span>
              Send Direct Message
            </h4>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-12 text-center space-y-4"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h4 className="text-xl font-bold font-display text-[var(--text-primary)]">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs font-mono text-[var(--text-secondary)] max-w-sm mx-auto">
                  Thank you for reaching out. Somu will respond to your message promptly.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-white/10 text-xs font-mono text-[var(--text-primary)] hover:bg-white/20 transition-colors mt-2"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmitMessage} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Sarah Jenkins"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:border-[var(--border-highlight)] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="s.jenkins@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:border-[var(--border-highlight)] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">
                    Inquiry Topic
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:border-[var(--border-highlight)] focus:outline-none"
                  >
                    {subjects.map((sub) => (
                      <option key={sub} value={sub} className="bg-black text-white">
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">
                    Message / Project Details
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell me about the engineering role, tech stack, or backend project..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:border-[var(--border-highlight)] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[var(--accent-gold)] text-black font-semibold font-mono text-xs flex items-center justify-center gap-2 hover:bg-amber-300 transition-all shadow-md active:scale-95"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message Direct</span>
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
