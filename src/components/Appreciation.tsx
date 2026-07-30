'use client'

import { motion } from 'framer-motion'
import { Play } from 'lucide-react'
import { useState } from 'react'

export default function Appreciation() {
  const [playing, setPlaying] = useState(false)

  return (
    <section id="appreciation" className="py-28 px-6 dot-bg relative overflow-hidden">
      <div className="section-divider" />
      <div aria-hidden className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(245,158,11,0.04) 0%, transparent 70%)', filter: 'blur(60px)' }} />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div className="text-center mb-12"
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <p className="section-eyebrow mb-3" style={{ color: '#f59e0b' }}>In Their Words</p>
          <h2 className="section-title">Appreciation</h2>
          <div className="section-bar" style={{ background: 'linear-gradient(90deg, #f59e0b, #f97316)' }} />
          <p className="mt-5 text-slate-500 text-sm max-w-lg mx-auto leading-relaxed">
            Recognition from KIBA Labs for outstanding contributions to enterprise SAP BTP development.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.55, ease: 'easeOut' }}
          className="relative rounded-3xl overflow-hidden"
          style={{ border: '1px solid rgba(245,158,11,0.15)', background: 'var(--surface)' }}>
          <div aria-hidden className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{ boxShadow: '0 0 80px rgba(245,158,11,0.05) inset, 0 20px 60px rgba(0,0,0,0.4)' }} />

          <div className="relative aspect-video bg-[#050508]">
            {!playing && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 cursor-pointer group"
                style={{ background: 'linear-gradient(to bottom, rgba(5,5,8,0.3), rgba(5,5,8,0.7))' }}
                onClick={() => setPlaying(true)}>
                <div className="relative">
                  <div className="absolute inset-0 rounded-full animate-ping opacity-20"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }} />
                  <div className="relative w-20 h-20 rounded-full flex items-center justify-center transition-transform group-hover:scale-110 duration-300"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 0 50px rgba(99,102,241,0.5)' }}>
                    <Play size={30} className="text-white ml-1.5" fill="white" />
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-base font-bold text-white mb-1">Play Appreciation Video</p>
                  <p className="text-xs text-slate-500">KIBA Labs · Employee of the Year Ceremony</p>
                </div>
              </div>
            )}
            <video src="/amit-appreciation-1.mp4" controls={playing} autoPlay={playing}
              className="w-full h-full object-cover" onPlay={() => setPlaying(true)} />
          </div>

          <div className="px-7 py-5 flex items-center gap-4 border-t border-white/[0.06]">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0 text-xl">🏆</div>
            <div>
              <p className="text-sm font-bold text-white">Employee of the Year — KIBA Labs</p>
              <p className="text-xs text-slate-500 mt-0.5">7th Anniversary Celebration · January 10, 2026</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
