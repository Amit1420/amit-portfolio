'use client'

import { motion } from 'framer-motion'
import { skillGroups } from '@/lib/data'

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-6 relative overflow-hidden dot-bg">
      <div className="section-divider" />
      <div aria-hidden className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)', filter: 'blur(40px)' }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="section-eyebrow mb-3">Tech Stack</p>
          <h2 className="section-title">Technical Skills</h2>
          <div className="section-bar" />
          <p className="mt-5 text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">
            Spanning SAP BTP, cloud-native Java, AWS, and modern DevOps — built on 3+ years of enterprise delivery.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {skillGroups.map((group, i) => (
            <motion.div key={group.category}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.05, duration: 0.45, ease: 'easeOut' }}
              className="card p-5 group">
              <div className="skill-card-header">
                <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center text-lg shrink-0 group-hover:bg-indigo-500/15 transition-colors">
                  {group.icon}
                </div>
                <h3 className="text-sm font-bold text-slate-200 tracking-tight">{group.category}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.skills.map((skill) => (
                  <span key={skill} className="tag">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
