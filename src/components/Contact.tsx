'use client'

import { motion } from 'framer-motion'
import { profile } from '@/lib/data'
import { Mail, Phone, MapPin, Send } from 'lucide-react'

function LinkedinIcon() {
  return (
    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

const contactItems = [
  { icon: <Mail size={17} />, label: 'Email', value: (p: typeof profile) => p.email, href: (p: typeof profile) => `mailto:${p.email}`, color: '#6366f1', bg: 'rgba(99,102,241,0.1)' },
  { icon: <Phone size={17} />, label: 'Phone', value: (p: typeof profile) => p.phone, href: (p: typeof profile) => `tel:${p.phone}`, color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)' },
  { icon: <MapPin size={17} />, label: 'Location', value: (p: typeof profile) => p.location, href: null, color: '#06b6d4', bg: 'rgba(6,182,212,0.1)' },
  { icon: <LinkedinIcon />, label: 'LinkedIn', value: (p: typeof profile) => p.linkedin.replace('https://', ''), href: (p: typeof profile) => p.linkedin, color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', external: true },
]

export default function Contact() {
  return (
    <section id="contact" className="py-28 px-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #080812 0%, #050508 100%)' }}>
      <div className="section-divider" />
      <div aria-hidden className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div className="text-center mb-14"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="section-eyebrow mb-3">Say Hello</p>
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-bar" />
          <p className="mt-5 text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">
            Open to new opportunities in SAP BTP, Java backend, or cloud-native engineering.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          <motion.div className="space-y-3"
            initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, ease: 'easeOut' }}>
            {contactItems.map((item) => {
              const href = item.href ? item.href(profile) : null
              const value = item.value(profile)
              const inner = (
                <div className="card p-4 flex items-center gap-4 group hover:border-indigo-500/30 cursor-pointer">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-all group-hover:scale-105"
                    style={{ background: item.bg, color: item.color }}>
                    {item.icon}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-0.5">{item.label}</p>
                    <p className="text-sm font-semibold text-slate-300 truncate group-hover:text-white transition-colors">{value}</p>
                  </div>
                </div>
              )
              return href ? (
                <a key={item.label} href={href}
                  target={(item as { external?: boolean }).external ? '_blank' : undefined}
                  rel={(item as { external?: boolean }).external ? 'noopener noreferrer' : undefined}>{inner}</a>
              ) : <div key={item.label}>{inner}</div>
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative rounded-2xl p-8 flex flex-col justify-between overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.06) 100%)', border: '1px solid rgba(99,102,241,0.18)' }}>
            <div aria-hidden className="absolute -bottom-20 -right-20 w-56 h-56 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)' }} />
            <div aria-hidden className="absolute -top-10 -left-10 w-40 h-40 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)' }} />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 8px 24px rgba(99,102,241,0.3)' }}>
                <Send size={19} className="text-white" />
              </div>
              <h3 className="text-xl font-extrabold text-white tracking-tight mb-3">Let&apos;s work together</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Have an SAP BTP project, need a Java backend architect, or want to discuss cloud-native microservices? I&apos;d love to connect.
              </p>
              <a href={`mailto:${profile.email}`} className="btn-primary w-full justify-center">
                <Mail size={15} /> Send an Email
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
