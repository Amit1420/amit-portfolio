'use client'

import { motion } from 'framer-motion'
import { profile, education } from '@/lib/data'
import { GraduationCap, Briefcase, Award, MapPin, Mail, Phone } from 'lucide-react'

function LinkedinIcon() {
  return (
    <svg width={16} height={16} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const fu = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true as const },
  transition: { delay, duration: 0.55, ease: 'easeOut' as const },
})

export default function About() {
  return (
    <section id="about" className="py-28 px-6 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #07070e 0%, #0c0c18 100%)' }}>
      <div className="section-divider" />
      <div aria-hidden className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full pointer-events-none -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div className="mb-14" {...fu(0)}>
          <p className="section-eyebrow mb-3">Background</p>
          <h2 className="section-title">About Me</h2>
          <div className="section-bar" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div {...fu(0.1)}>
            <p className="text-slate-400 leading-[1.9] text-[0.95rem] mb-8">{profile.summary}</p>
            <div className="space-y-2">
              {[
                { icon: <MapPin size={14} />, label: 'Location', value: profile.location, href: null },
                { icon: <Mail size={14} />, label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
                { icon: <Phone size={14} />, label: 'Phone', value: profile.phone, href: `tel:${profile.phone}` },
                { icon: <LinkedinIcon />, label: 'LinkedIn', value: profile.linkedin.replace('https://', ''), href: profile.linkedin, external: true },
              ].map((row) => (
                <div key={row.label}
                  className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-white/[0.05] bg-white/[0.02] hover:border-indigo-500/20 hover:bg-indigo-500/[0.03] transition-all group cursor-default">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0 text-indigo-400 group-hover:bg-indigo-500/15 transition-colors">
                    {row.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-0.5">{row.label}</p>
                    {row.href ? (
                      <a href={row.href} target={row.external ? '_blank' : undefined}
                        rel={row.external ? 'noopener noreferrer' : undefined}
                        className="text-sm text-slate-300 hover:text-indigo-300 transition-colors truncate block">{row.value}</a>
                    ) : (
                      <span className="text-sm text-slate-300 truncate block">{row.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div className="space-y-4" {...fu(0.2)}>
            {[
              {
                icon: <Briefcase size={18} />,
                border: '#6366f1',
                iconBg: 'rgba(99,102,241,0.12)',
                iconColor: '#a5b4fc',
                title: 'Current Role',
                body: <>Software Engineer II at <span className="text-slate-200 font-medium">KIBA Labs</span>, working as SAP CAP Consultant for SAP Labs — building cloud-native Utilities applications on SAP BTP.</>
              },
              {
                icon: <GraduationCap size={18} />,
                border: '#8b5cf6',
                iconBg: 'rgba(139,92,246,0.12)',
                iconColor: '#c4b5fd',
                title: 'Education',
                body: <><span className="text-slate-300">{education.degree}</span><br /><span className="text-slate-500 text-xs">{education.institution} · {education.period}</span></>
              },
              {
                icon: <Award size={18} />,
                border: '#f59e0b',
                iconBg: 'rgba(245,158,11,0.12)',
                iconColor: '#fcd34d',
                title: 'Recognition',
                body: <>Employee of the Year 2026 &amp; Platinum Award at KIBA Labs for outstanding enterprise cloud delivery and client satisfaction.</>
              },
            ].map((card) => (
              <div key={card.title} className="card p-5 flex gap-4 group"
                style={{ borderLeft: `3px solid ${card.border}` }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors"
                  style={{ background: card.iconBg, color: card.iconColor }}>
                  {card.icon}
                </div>
                <div>
                  <h4 className="font-bold text-slate-200 text-sm mb-1 tracking-tight">{card.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{card.body}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
