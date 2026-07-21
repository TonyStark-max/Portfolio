import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Cpu, Server, Database, Container, Code2, Shield, Sparkles, Layers, Zap, Terminal, Package, GitBranch, FileCode, HardDrive, Coffee } from 'lucide-react';
import { soundFx } from '../utils/sound';

export default function SkillsMatrix({ data }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const iconMap = {
    Coffee: Coffee,
    Code: Code2,
    FileCode: FileCode,
    Server: Server,
    Shield: Shield,
    Sparkles: Sparkles,
    Database: Database,
    Layers: Layers,
    Container: Container,
    GitBranch: GitBranch,
    Terminal: Terminal,
    Package: Package,
    Zap: Zap,
    HardDrive: HardDrive
  };

  const categories = ['All', 'Languages', 'Backend', 'Databases', 'DevOps & Tools'];

  const filteredSkills = activeCategory === 'All'
    ? data.skills
    : data.skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Ease-In Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent-gold)] uppercase tracking-widest mb-3">
              <Cpu className="w-4 h-4" />
              <span>05 / Technical Skill Matrix</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-display text-[var(--text-primary)]">
              Core Skills & <span className="font-editorial italic font-normal text-[var(--accent-gold)] font-serif">Competencies</span>
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 p-1.5 rounded-2xl bg-[var(--bg-card)] border border-[var(--border-color)]">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundFx.playTab();
                  setActiveCategory(cat);
                }}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                  activeCategory === cat
                    ? 'bg-[var(--accent-gold)] text-black font-semibold shadow-md'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredSkills.map((skill, idx) => {
            const IconComponent = iconMap[skill.icon] || Code2;

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, scale: 1.02 }}
                viewport={{ once: true }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                className="group glass-panel p-6 rounded-3xl border border-[var(--border-color)] hover:border-[var(--border-highlight)] hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-[var(--accent-gold)] group-hover:scale-110 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-white/5 text-[10px] font-mono text-[var(--accent-gold)] border border-white/10">
                      {skill.level}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold font-display text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
                    {skill.name}
                  </h3>
                  <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider block mb-2">
                    {skill.category}
                  </span>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {skill.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
