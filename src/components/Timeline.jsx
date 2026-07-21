import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ChevronDown, ChevronUp, CheckCircle, GraduationCap, Code2, Server, Cpu } from 'lucide-react';
import { soundFx } from '../utils/sound';

export default function Timeline({ data }) {
  const [expandedIndex, setExpandedIndex] = useState(0);

  const timelineItems = [
    {
      id: "edu",
      role: "B.Tech in Computer Science & Engineering",
      company: "Malla Reddy Deemed to be University (Hyderabad)",
      period: "2023 — Present (Expected 2027)",
      type: "Academic Foundation • CGPA 7.9 / 10",
      icon: GraduationCap,
      description: "Pursuing Computer Science & Engineering with strong focus on Systems Programming, Database Internals, Concurrency, and REST API Architecture.",
      highlights: [
        "CGPA: 7.9 / 10 across core computer science & engineering coursework.",
        "Mastered Data Structures & Algorithms, Operating Systems, DBMS, Computer Networks & Software Engineering.",
        "Built production-ready projects in Java 21, Spring Boot, Netty, Redis, and Docker."
      ],
      tech: ["Java 21", "Data Structures", "DBMS", "Operating Systems", "Computer Networks"]
    },
    {
      id: "synapse",
      role: "Lead Systems Architect — Synapse-Hub",
      company: "Multi-Tenant Idea Management Platform",
      period: "2024",
      type: "Full Stack & Backend Security",
      icon: Code2,
      description: "Designed multi-tenant isolation and security architecture for enterprise idea management platform.",
      highlights: [
        "Enforced multi-tenant isolation via PostgreSQL Row-Level Security (RLS) and Spring Security filters, blocking cross-tenant IDOR access.",
        "Built dual-mode auth engine (Clerk OAuth2 + mock JWT sandbox) reducing local setup to a single Docker command.",
        "100% test pass rate across isolation, XSS, and rate-limiting integration test suites using MockMvc."
      ],
      tech: ["Java 21", "Spring Boot", "PostgreSQL RLS", "Spring Security", "Clerk OAuth", "Docker"]
    },
    {
      id: "kvstore",
      role: "Distributed Systems Engineer — Netty KV-Store",
      company: "Concurrent Low-Latency Storage Engine",
      period: "2024",
      type: "Systems & Networking",
      icon: Server,
      description: "Architected crash-safe concurrent key-value store using Java 21 and Netty with custom TCP wire protocol.",
      highlights: [
        "Engineered custom TCP wire protocol with Netty for concurrent low-latency client connections.",
        "Implemented Write-Ahead Logging (WAL) disk flushes and atomic JSON snapshotting for crash-safe durability.",
        "Built asynchronous primary-replica streaming with automatic client reconnection and lag tracking."
      ],
      tech: ["Java 21", "Netty TCP", "JUnit", "WAL Logging", "JSON Snapshots", "Docker Compose"]
    },
    {
      id: "ticket",
      role: "Backend & AI Architect — Natural Ticket Booking",
      company: "AI-Assisted Concurrency Reservation System",
      period: "2023 — 2024",
      type: "AI & Distributed Systems",
      icon: Cpu,
      description: "Built high-concurrency ticket reservation engine with 2-tiered locking to eliminate double bookings.",
      highlights: [
        "Designed two-tiered locking engine with Redis TTL soft holds & PostgreSQL pessimistic locks eliminating double-bookings.",
        "Built resilient transaction pipeline with idempotent retries and automated compensating rollbacks for payment failures.",
        "Synchronized seat maps via Postgres Change Data Capture (CDC) & Spring AI booking agent routing."
      ],
      tech: ["Java", "Spring AI", "Spring Boot", "PostgreSQL CDC", "Redis TTL Locks", "Supabase", "Docker"]
    }
  ];

  return (
    <section id="experience" className="py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Scroll Ease-In Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-16 text-center max-w-2xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent-gold)] uppercase tracking-widest mb-3">
            <Briefcase className="w-3.5 h-3.5" />
            <span>04 / Education & Engineering Journey</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold font-display text-[var(--text-primary)]">
            Academic & <span className="font-editorial italic font-normal text-[var(--accent-gold)]">Engineering</span> Timeline
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mt-3">
            Complete milestone breakdown across education, backend microservices, Netty distributed systems, and AI concurrency.
          </p>
        </motion.div>

        {/* Timeline List */}
        <div className="relative border-l-2 border-[var(--border-color)] ml-4 sm:ml-32 space-y-10">
          {timelineItems.map((item, idx) => {
            const isExpanded = expandedIndex === idx;
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
                className="relative pl-6 sm:pl-10 group"
              >
                {/* Timeline Dot Indicator */}
                <div
                  className={`absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-2 transition-all ${
                    isExpanded
                      ? 'bg-[var(--accent-gold)] border-[var(--accent-gold)] ring-4 ring-[var(--accent-gold-glow)] scale-110'
                      : 'bg-[var(--bg-primary)] border-[var(--text-muted)] group-hover:border-[var(--accent-gold)]'
                  }`}
                />

                {/* Left Period Label (on desktop) */}
                <div className="hidden sm:block absolute -left-36 top-1 text-xs font-mono text-[var(--text-muted)] text-right w-24">
                  {item.period}
                </div>

                {/* Card Container */}
                <div
                  onClick={() => {
                    soundFx.playClick();
                    setExpandedIndex(isExpanded ? null : idx);
                  }}
                  className={`glass-panel p-6 sm:p-8 rounded-3xl cursor-pointer transition-all duration-300 ${
                    isExpanded ? 'border-[var(--border-highlight)] shadow-xl' : ''
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-[var(--accent-gold)] shrink-0 hidden sm:block">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="sm:hidden text-xs font-mono text-[var(--accent-gold)] block mb-1">
                          {item.period}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold font-display text-[var(--text-primary)]">
                          {item.role}
                        </h3>
                        <div className="text-xs sm:text-sm font-semibold text-[var(--accent-gold)] font-mono mt-0.5">
                          {item.company} • <span className="text-[var(--text-muted)] font-normal">{item.type}</span>
                        </div>
                      </div>
                    </div>

                    <button className="self-end sm:self-center p-2 rounded-xl bg-white/5 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </button>
                  </div>

                  <p className="text-sm text-[var(--text-secondary)] mt-4 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Expandable Key Highlights */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pt-6 border-t border-[var(--border-color)] space-y-4"
                      >
                        <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider">
                          Key Achievements & Technical Deliverables:
                        </div>
                        <ul className="space-y-2.5">
                          {item.highlights.map((h, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-xs text-[var(--text-primary)]">
                              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                              <span>{h}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="pt-4 flex flex-wrap gap-2">
                          {item.tech.map((t) => (
                            <span
                              key={t}
                              className="px-2.5 py-1 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[10px] font-mono text-[var(--text-secondary)]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
