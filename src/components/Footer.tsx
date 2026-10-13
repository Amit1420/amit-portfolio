import LinkedinIcon from './LinkedinIcon'
import { profile } from '@/lib/data'
import { Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative py-10 px-6 border-t border-white/[0.05]" style={{ background: '#050508' }}>
      <div aria-hidden className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.2), rgba(139,92,246,0.15), transparent)' }} />
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
            <div className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-black text-white"
              style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>AK</div>
            <span className="font-bold text-sm gradient-text">{profile.name}</span>
          </div>
          <p className="text-xs text-slate-700">{profile.title} · {profile.subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          {[
            { href: `mailto:${profile.email}`, icon: <Mail size={14} />, label: 'Email' },
            { href: profile.linkedin, icon: <LinkedinIcon size={15} />, label: 'LinkedIn', external: true },
          ].map((l) => (
            <a key={l.label} href={l.href}
              target={l.external ? '_blank' : undefined}
              rel={l.external ? 'noopener noreferrer' : undefined}
              aria-label={l.label}
              className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-slate-600 hover:text-indigo-400 hover:border-indigo-500/30 hover:bg-indigo-500/[0.06] transition-all">
              {l.icon}
            </a>
          ))}
        </div>
        <p className="text-[11px] text-slate-700 text-center">
          © {new Date().getFullYear()} Amit Kumar · amitk1420.vercel.app
        </p>
      </div>
    </footer>
  )
}
