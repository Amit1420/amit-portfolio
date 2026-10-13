'use client'

import { motion } from 'framer-motion'
import { experiences } from '@/lib/data'
import { Building2, Calendar, MapPin } from 'lucide-react'

const MAX_TAGS = 6

export default function Experience() {
  return (
    <section id="experience" className="py-28 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #080812 0%, #050508 100%)' }}>
      <div className="section-divider" />
      <div aria-hidden className="absolute bottom-0 left-0 w-[500px] h-[500px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 65%)', filter: 'blur(80px)' }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div className="text-center mb-16"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="section-eyebrow mb-3">Career</p>
          <h2 className="section-title">Work Experience</h2>
          <div className="section-bar" />
        </motion.div>

        <div className="space-y-6">
          {experiences.map((exp, ei) => (
            <motion.div key={exp.company}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: ei * 0.1, duration: 0.55, ease: 'easeOut' }}
              className="card p-7 md:p-9">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-8 pb-7 border-b border-white/[0.06]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))', border: '1px solid rgba(99,102,241,0.2)' }}>
                    <Building2 size={20} className="text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white tracking-tight">{exp.company}</h3>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin size={10} />{exp.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    <Calendar size={11} />{exp.period}
                  </span>
                  <span className="tag tag-violet">{exp.duration}</span>
                </div>
              </div>

              <div className="space-y-0">
                {exp.roles.map((role, ri) => {
                  const isCurrent = (role as { current?: boolean }).current === true
                  const isLast = ri === exp.roles.length - 1
                  return (
                    <div key={ri} className="flex gap-5">
                      <div className="flex flex-col items-center flex-shrink-0 w-5">
                        <div className={`w-3 h-3 rounded-full flex-shrink-0 mt-1 z-10 ${
                          isCurrent ? 'bg-indigo-500 ring-4 ring-indigo-500/20' : 'bg-[#16162a] border-2 border-[#2d2d4e]'
                        }`} style={isCurrent ? { boxShadow: '0 0 14px rgba(99,102,241,0.8)' } : {}} />
                        {!isLast && (
                          <div className="flex-1 w-px mt-2"
                            style={{ background: 'linear-gradient(to bottom, rgba(99,102,241,0.35), rgba(99,102,241,0.06))' }} />
                        )}
                      </div>
                      <div className={`flex-1 min-w-0 ${!isLast ? 'pb-10' : 'pb-0'}`}>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <h4 className={`font-black text-sm tracking-tight leading-snug ${isCurrent ? 'text-white' : 'text-slate-300'}`}>
                            {role.title}
                          </h4>
                          {isCurrent && <span className="tag tag-emerald text-[10px]">● Live</span>}
                          {role.client && <span className="tag tag-cyan text-[10px]">Client: {role.client}</span>}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-4">
                          <Calendar size={10} /><span>{role.period}</span>
                        </div>
                        {role.project && (
                          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mb-4 tracking-wide"
                            style={{ background: 'rgba(6,182,212,0.07)', color: '#67e8f9', border: '1px solid rgba(6,182,212,0.14)' }}>
                            <span className="text-[10px]">◈</span>{role.project}
                          </div>
                        )}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {role.techStack.slice(0, MAX_TAGS).map((t) => <span key={t} className="tag">{t}</span>)}
                          {role.techStack.length > MAX_TAGS && (
                            <span className="tag" title={role.techStack.slice(MAX_TAGS).join(', ')}>
                              +{role.techStack.length - MAX_TAGS}
                            </span>
                          )}
                        </div>
                        <ul className="space-y-2">
                          {role.bullets.map((b, i) => (
                            <li key={i} className="flex gap-2.5 text-sm text-slate-400 leading-relaxed">
                              <span className="text-indigo-500 shrink-0 mt-[3px] text-[10px] font-black">▸</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )
                })}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
