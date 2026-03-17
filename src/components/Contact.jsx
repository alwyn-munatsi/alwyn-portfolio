import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Linkedin, Github, MapPin, Send } from 'lucide-react'

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}

const contacts = [
  { icon: Linkedin, label: 'LinkedIn',    value: '/in/alwynmunatsi',  href: 'https://www.linkedin.com/in/alwynmunatsi/' },
  { icon: Github,   label: 'GitHub',      value: 'alwyn-munatsi',     href: 'https://github.com/alwyn-munatsi' },
  { icon: MapPin,   label: 'Location',    value: 'Jersey City, NJ',   href: null },
]

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6" style={{ background: '#060b14' }}>
      <div className="max-w-4xl mx-auto text-center">
        <FadeIn>
          <p className="section-label mb-4">Get In Touch</p>
          <h2
            className="font-syne font-extrabold tracking-tight mb-5"
            style={{ fontSize: 'clamp(32px, 5vw, 56px)', color: '#fff' }}
          >
            Let's Work Together
          </h2>
          <p className="text-sm font-light leading-relaxed max-w-xl mx-auto mb-12" style={{ color: '#6a8aa8' }}>
            I'm actively seeking Data Analytics, Data Engineering, and Data Science internship or entry-level opportunities. If you have a role or project that could use my skills, let's connect!
          </p>
        </FadeIn>

        {/* Contact cards */}
        <FadeIn delay={0.1}>
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            {contacts.map((c, i) => (
              <motion.div
                key={c.label}
                className="p-5 rounded-xl"
                style={{ background: '#0a1522', border: '0.5px solid #0f1e35' }}
                whileHover={{ y: -4, borderColor: 'rgba(56,189,248,0.3)' }}
                transition={{ duration: 0.2 }}
              >
                {c.href ? (
                  <a href={c.href} target="_blank" rel="noreferrer" className="block">
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3"
                      style={{ background: 'rgba(56,189,248,0.08)' }}>
                      <c.icon size={18} style={{ color: '#38bdf8' }} />
                    </div>
                    <p className="font-syne font-bold text-xs tracking-wider uppercase mb-1" style={{ color: '#1a3050' }}>{c.label}</p>
                    <p className="text-sm font-medium" style={{ color: '#38bdf8' }}>{c.value}</p>
                  </a>
                ) : (
                  <div>
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center mx-auto mb-3"
                      style={{ background: 'rgba(56,189,248,0.08)' }}>
                      <c.icon size={18} style={{ color: '#38bdf8' }} />
                    </div>
                    <p className="font-syne font-bold text-xs tracking-wider uppercase mb-1" style={{ color: '#1a3050' }}>{c.label}</p>
                    <p className="text-sm font-medium" style={{ color: '#c8d8f0' }}>{c.value}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://www.linkedin.com/in/alwynmunatsi/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-syne font-bold text-sm px-7 py-3.5 rounded-lg transition-all hover:opacity-85"
              style={{ background: '#38bdf8', color: '#060b14' }}
            >
              <Send size={15} /> Connect on LinkedIn
            </a>
            <a
              href="https://github.com/alwyn-munatsi"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-syne font-bold text-sm px-7 py-3.5 rounded-lg transition-all"
              style={{ border: '0.5px solid #1a3050', color: '#c8d8f0' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#38bdf8'; e.currentTarget.style.color = '#38bdf8' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a3050'; e.currentTarget.style.color = '#c8d8f0' }}
            >
              <Github size={15} /> View GitHub
            </a>
          </div>
        </FadeIn>

        {/* Footer */}
        <FadeIn delay={0.3}>
          <div className="mt-20 pt-8" style={{ borderTop: '0.5px solid #0f1e35' }}>
            <p className="text-xs" style={{ color: '#1a3050' }}>
              © 2026 Alwyn Munatsi · Built with React, Vite & Tailwind CSS
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
