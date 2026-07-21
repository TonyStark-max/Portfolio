import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles, Filter, Layers, ExternalLink, Activity, FileText } from 'lucide-react';
import { soundFx } from '../utils/sound';
import ProjectModal from './ProjectModal';

export default function Projects({ data }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Backend & Security', 'Systems & Networking', 'AI & Microservices'];

  const filteredProjects = activeCategory === 'All'
    ? data.projects
    : data.projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-28 relative">
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
              <Sparkles className="w-3.5 h-3.5" />
              <span>02 / Case Studies & Production Systems</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold font-display text-[var(--text-primary)]">
              Engineering <span className="font-editorial italic font-normal text-[var(--accent-gold)]">Showcase</span>
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
                onMouseEnter={() => soundFx.playHover()}
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -8, scale: 1.02 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group glass-panel rounded-3xl overflow-hidden flex flex-col justify-between hover:border-[var(--border-highlight)] hover:shadow-2xl transition-all duration-300 relative cursor-pointer"
                onClick={() => {
                  soundFx.playClick();
                  setSelectedProject(project);
                }}
              >
                {/* Project Image & Overlay */}
                <div className="relative h-56 overflow-hidden bg-black/40">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent" />

                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[var(--accent-gold)] uppercase">
                      {project.category}
                    </span>
                    <span className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white group-hover:bg-[var(--accent-gold)] group-hover:text-black transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 mb-2">
                      <Activity className="w-3.5 h-3.5" />
                      <span>{project.metrics}</span>
                    </div>

                    <h3 className="text-xl font-bold font-display text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs font-mono text-[var(--text-muted)] mt-1">
                      {project.subtitle}
                    </p>

                    <p className="text-xs text-[var(--text-secondary)] mt-3 line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Card Actions & Tech stack tags */}
                  <div className="pt-4 border-t border-[var(--border-color)] flex items-center justify-between gap-2">
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 rounded-md bg-white/5 text-[10px] font-mono text-[var(--text-secondary)] border border-[var(--border-color)]"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="px-2 py-1 rounded-md bg-white/5 text-[10px] font-mono text-[var(--text-muted)]">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>

                    {project.hldUrl && (
                      <a
                        href={project.hldUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          e.stopPropagation();
                          soundFx.playClick();
                        }}
                        className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-semibold flex items-center gap-1 shrink-0 transition-colors"
                        title="View High Level Design Document in new tab"
                      >
                        <FileText className="w-3 h-3 text-amber-400" />
                        <span>HLD Doc</span>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Modal Case Study Drawer */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}
