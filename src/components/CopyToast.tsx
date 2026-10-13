'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check } from 'lucide-react'

export default function CopyToast() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const handler = () => {
      setShow(true)
      clearTimeout(timer) // repeated copies restart the timer instead of stacking
      timer = setTimeout(() => setShow(false), 2500)
    }
    window.addEventListener('email-copied', handler)
    return () => {
      clearTimeout(timer)
      window.removeEventListener('email-copied', handler)
    }
  }, [])

  return (
    <div role="status" aria-live="polite">
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-5 py-3 rounded-full text-sm font-semibold text-white shadow-2xl"
          style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', boxShadow: '0 8px 30px rgba(99,102,241,0.5)' }}
        >
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center">
            <Check size={11} className="text-white" strokeWidth={3} />
          </div>
          Email copied to clipboard!
        </motion.div>
      )}
    </AnimatePresence>
    </div>
  )
}
