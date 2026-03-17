import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { MapPin, GraduationCap, Briefcase, Users } from 'lucide-react'
import { personal } from '../data/portfolio'

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

const highlights = [
  { icon: MapPin,       label: 'Jersey City, NJ',           sub: 'United States'            },
  { icon: Briefcase,    label: 'Data Analyst Intern',        sub: 'Copper Sparrow · 2026'    },
  { icon: GraduationCap, label: 'MS Data Analytics',         sub: 'Katz School · 2025–2026'  },
  { icon: Users,        label: '2,791 Followers',            sub: 'LinkedIn · 500+ Connections' },
]

export default function About() {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <FadeIn>
          <div className="mb-14">
            <p className="section-label mb-3">About Me</p>
            <h2 className="font-syne font-extrabold text-4xl tracking-tight" style={{ color: '#fff' }}>
              Who I Am
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <FadeIn delay={0.1}>
            <div className="space-y-4">
              <p className="text-sm leading-relaxed font-light" style={{ color: '#6a8aa8' }}>
                {personal.bio}
              </p>
              <div className="pt-4 flex gap-3">
                <a
                  href="https://www.linkedin.com/in/alwynmunatsi/"
                  target="_blank"
                  rel="noreferrer"
                  className="font-syne font-bold text-xs px-5 py-2.5 rounded-lg transition-all duration-200 hover:opacity-85"
                  style={{ background: '#38bdf8', color: '#060b14' }}
                >
                  View LinkedIn
                </a>
                <a
                  href="https://github.com/alwyn-munatsi"
                  target="_blank"
                  rel="noreferrer"
                  className="font-syne font-bold text-xs px-5 py-2.5 rounded-lg transition-all duration-200"
                  style={{ border: '0.5px solid #1a3050', color: '#c8d8f0' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#38bdf8'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#1a3050'}
                >
                  GitHub Profile
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Highlights */}
          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 gap-3">
              {highlights.map((h, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl"
                  style={{
                    background: '#0a1522',
                    border: '0.5px solid #0f1e35',
                  }}
                  whileHover={{ borderColor: 'rgba(56,189,248,0.3)', x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: 'rgba(56,189,248,0.08)' }}
                  >
                    <h.icon size={18} style={{ color: '#38bdf8' }} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: '#c8d8f0' }}>{h.label}</p>
                    <p className="text-xs" style={{ color: '#3a5a7a' }}>{h.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}
