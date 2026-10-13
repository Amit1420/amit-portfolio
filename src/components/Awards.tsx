'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { awards } from '@/lib/data'
import { ExternalLink } from 'lucide-react'
import Confetti from './Confetti'
import LinkedinIcon from './LinkedinIcon'

export default function Awards() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="awards" ref={sectionRef} className="py-28 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #050508 0%, #080812 100%)' }}>
      <div className="section-divider" />
      <div aria-hidden className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(245,158,11,0.2), transparent)' }} />
      <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }} />
      <Confetti trigger={inView} />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="section-eyebrow mb-3" style={{ color: '#f59e0b' }}>Recognition</p>
          <h2 className="section-title">Achievements & Awards</h2>
          <div className="section-bar" style={{ background: 'linear-gradient(90deg, #f59e0b, #f97316)' }} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {awards.map((a, i) => {
            const content = (
              <div className="relative z-10 h-full flex flex-col">
                <div className="flex items-start justify-between gap-3 mb-5">
                  <div className="text-5xl leading-none">{a.icon}</div>
                  {a.link && (
                    <div className="flex items-center gap-1 text-[10px] font-semibold text-amber-500/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: 'rgba(245,158,11,0.6)' }}>
                      <ExternalLink size={10} /> LinkedIn Post
                    </div>
                  )}
                </div>
                <div className="flex flex-wrap items-baseline gap-2.5 mb-2">
                  <h3 className="text-lg font-extrabold text-white tracking-tight">{a.title}</h3>
                  <span className="tag tag-gold">{a.org}</span>
                </div>
                <p className="text-xs font-bold mb-4 tracking-wider" style={{ color: 'rgba(245,158,11,0.6)' }}>{a.date}</p>
                <p className="text-sm text-slate-400 leading-relaxed flex-1">{a.description}</p>
                {a.link && (
                  <div className="mt-5 pt-4 flex items-center gap-2 text-xs font-bold transition-colors duration-150"
                    style={{ borderTop: '1px solid rgba(255,255,255,0.06)', color: 'rgba(245,158,11,0.6)' }}>
                    <LinkedinIcon size={13} />
                    View on LinkedIn →
                  </div>
                )}
              </div>
            )
            return (
              <motion.div key={a.title}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.55, ease: 'easeOut' }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group relative overflow-hidden rounded-2xl p-7 cursor-default"
                style={{ background: 'linear-gradient(135deg, rgba(13,13,24,1) 0%, rgba(17,17,30,1) 100%)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div aria-hidden className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, rgba(245,158,11,0.04), rgba(99,102,241,0.04))' }} />
                <div aria-hidden className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-20 pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%)' }} />
                <div aria-hidden className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none"
                  style={{ padding: '1px', background: 'linear-gradient(135deg, rgba(245,158,11,0.35), rgba(99,102,241,0.15))', WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', WebkitMaskComposite: 'xor', maskComposite: 'exclude' }} />
                {a.link ? (
                  <a href={a.link} target="_blank" rel="noopener noreferrer" className="block h-full">{content}</a>
                ) : content}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
