import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Github, ExternalLink, Filter } from 'lucide-react'
import { projects } from '../data/portfolio'

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

const categories = ['All', ...new Set(projects.map(p => p.category))]

export default function Projects() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <section id="projects" className="py-24 px-6" style={{ background: '#0a1522' }}>
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="mb-10">
            <p className="section-label mb-3">Portfolio</p>
            <h2 className="font-syne font-extrabold text-4xl tracking-tight" style={{ color: '#fff' }}>
              Featured Projects
            </h2>
          </div>
        </FadeIn>

        {/* Filter tabs */}
        <FadeIn delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className="font-syne font-semibold text-xs px-4 py-2 rounded-lg transition-all duration-200"
                style={{
                  background: active === cat ? '#38bdf8' : 'rgba(56,189,248,0.06)',
                  color: active === cat ? '#060b14' : '#3a5a7a',
                  border: active === cat ? 'none' : '0.5px solid #0f1e35',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((p, i) => (
            <FadeIn key={p.title} delay={i * 0.07}>
              <motion.div
                className="h-full flex flex-col p-5 rounded-xl"
                style={{ background: '#060b14', border: '0.5px solid #0f1e35' }}
                whileHover={{ y: -4, borderColor: 'rgba(56,189,248,0.3)' }}
                transition={{ duration: 0.2 }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <span
                    className="text-xs font-bold tracking-wider uppercase"
                    style={{ color: '#38bdf8' }}
                  >
                    {p.category}
                  </span>
                  <div className="flex gap-2">
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                      className="transition-colors"
                      style={{ color: '#3a5a7a' }}
                      onMouseEnter={e => e.currentTarget.style.color = '#38bdf8'}
                      onMouseLeave={e => e.currentTarget.style.color = '#3a5a7a'}
                    >
                      <Github size={15} />
                    </a>
                    <ExternalLink size={15} style={{ color: '#1a3050' }} />
                  </div>
                </div>

                {/* Title */}
                <h3
                  className="font-syne font-bold text-sm leading-snug mb-2"
                  style={{ color: '#c8d8f0' }}
                >
                  {p.short}
                </h3>

                {/* Description */}
                <p
                  className="text-xs leading-relaxed flex-1 mb-4"
                  style={{ color: '#4a6a8a' }}
                >
                  {p.description}
                </p>

                {/* Meta */}
                <div className="text-xs mb-4" style={{ color: '#1a3050' }}>
                  {p.period} · {p.association}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                  {p.skills.map(s => (
                    <span key={s} className="tag">{s}</span>
                  ))}
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>

        {/* GitHub CTA */}
        <FadeIn delay={0.3}>
          <div className="mt-12 text-center">
            <a
              href="https://github.com/alwyn-munatsi"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-syne font-bold text-sm px-6 py-3 rounded-lg transition-all duration-200"
              style={{ border: '0.5px solid #1a3050', color: '#c8d8f0' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#38bdf8'; e.currentTarget.style.color = '#38bdf8' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = '#1a3050'; e.currentTarget.style.color = '#c8d8f0' }}
            >
              <Github size={16} /> View All 11+ Repositories on GitHub
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
