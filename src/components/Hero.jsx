import { motion } from 'framer-motion'
import { ArrowDown, Github, Linkedin, Download } from 'lucide-react'
import { personal } from '../data/portfolio'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: 'easeOut' },
})

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20"
    >
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg pointer-events-none" />

      {/* Radial glow */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(56,189,248,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-6xl mx-auto px-6 relative z-10 py-20">
        {/* Open to work pill */}
        <motion.div {...fadeUp(0.1)} className="mb-8">
          <span
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full"
            style={{
              background: 'rgba(56,189,248,0.08)',
              border: '0.5px solid rgba(56,189,248,0.3)',
              color: '#38bdf8',
            }}
          >
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#38bdf8' }} />
            Open to opportunities
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          {...fadeUp(0.2)}
          className="font-syne font-extrabold leading-none tracking-tight mb-2"
          style={{ fontSize: 'clamp(48px, 9vw, 96px)', color: '#ffffff' }}
        >
          Alwyn
        </motion.h1>
        <motion.h1
          {...fadeUp(0.3)}
          className="font-syne font-extrabold leading-none tracking-tight mb-6"
          style={{
            fontSize: 'clamp(48px, 9vw, 96px)',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(56,189,248,0.5)',
          }}
        >
          Munatsi<span style={{ color: '#38bdf8', WebkitTextStroke: 0 }}>.</span>
        </motion.h1>

        {/* Role */}
        <motion.p
          {...fadeUp(0.4)}
          className="text-base font-light mb-6 max-w-xl leading-relaxed"
          style={{ color: '#38bdf8' }}
        >
          {personal.tagline}
        </motion.p>

        {/* Bio */}
        <motion.p
          {...fadeUp(0.5)}
          className="text-sm font-light leading-relaxed max-w-2xl mb-10"
          style={{ color: '#6a8aa8' }}
        >
          {personal.bio.slice(0, 220)}...
        </motion.p>

        {/* Buttons */}
        <motion.div {...fadeUp(0.6)} className="flex flex-wrap gap-4 mb-16">
          <a
            href="#projects"
            className="font-syne font-bold text-sm px-6 py-3 rounded-lg transition-all duration-200 hover:opacity-85"
            style={{ background: '#38bdf8', color: '#060b14' }}
          >
            Explore My Work
          </a>
          <a
            href="https://github.com/alwyn-munatsi"
            target="_blank"
            rel="noreferrer"
            className="font-syne font-bold text-sm px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2"
            style={{
              background: 'transparent',
              border: '0.5px solid #1a3050',
              color: '#c8d8f0',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#38bdf8'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#1a3050'}
          >
            <Github size={16} /> GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/alwynmunatsi/"
            target="_blank"
            rel="noreferrer"
            className="font-syne font-bold text-sm px-6 py-3 rounded-lg transition-all duration-200 flex items-center gap-2"
            style={{
              background: 'transparent',
              border: '0.5px solid #1a3050',
              color: '#c8d8f0',
            }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#38bdf8'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#1a3050'}
          >
            <Linkedin size={16} /> LinkedIn
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          {...fadeUp(0.7)}
          className="grid grid-cols-2 md:grid-cols-4 gap-px"
          style={{ background: '#0f1e35', borderRadius: 12, overflow: 'hidden' }}
        >
          {personal.stats.map((s, i) => (
            <div
              key={i}
              className="px-6 py-5 text-center"
              style={{ background: '#060b14' }}
            >
              <div
                className="font-syne font-extrabold text-2xl tracking-tight"
                style={{ color: '#38bdf8' }}
              >
                {s.value}
              </div>
              <div
                className="text-xs font-semibold tracking-wider uppercase mt-1"
                style={{ color: '#1a3050' }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: '#1a3050' }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  )
}
