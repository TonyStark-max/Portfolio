import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

export default function Testimonials({ data }) {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[var(--accent-gold)] uppercase tracking-widest mb-3">
            <Star className="w-3.5 h-3.5" />
            <span>06 / Endorsements & Recommendations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-[var(--text-primary)]">
            What Engineering Leadership <span className="font-editorial italic font-normal text-[var(--accent-gold)]">Says</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.testimonials.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-panel p-8 rounded-3xl relative flex flex-col justify-between"
            >
              <Quote className="w-10 h-10 text-[var(--accent-gold)] opacity-30 mb-4" />

              <p className="text-base sm:text-lg text-[var(--text-primary)] font-serif italic leading-relaxed mb-6">
                "{item.quote}"
              </p>

              <div className="flex items-center gap-4 pt-6 border-t border-[var(--border-color)]">
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="w-12 h-12 rounded-full object-cover border border-[var(--border-highlight)] shadow-sm"
                />
                <div>
                  <h4 className="text-sm font-bold font-display text-[var(--text-primary)]">
                    {item.author}
                  </h4>
                  <p className="text-xs font-mono text-[var(--text-muted)]">
                    {item.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
