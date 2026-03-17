import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { skills } from '../data/portfolio'

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  )
}

const categoryColors = {
  'Languages':     '#38bdf8',
  'Data Tools':    '#818cf8',
  'Engineering':   '#22c55e',
  'Cloud & Infra': '#f59e0b',
  'Frameworks':    '#f97316',
  'Databases':     '#ec4899',
}

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6" style={{ background: '#0a1522' }}>
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="mb-14">
            <p className="section-label mb-3">Expertise</p>
            <h2 className="font-syne font-extrabold text-4xl tracking-tight" style={{ color: '#fff' }}>
              Skills & Technologies
            </h2>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(skills).map(([category, items], ci) => {
            const color = categoryColors[category] || '#38bdf8'
            return (
              <FadeIn key={category} delay={ci * 0.08}>
                <div
                  className="p-5 rounded-xl h-full"
                  style={{ background: '#060b14', border: '0.5px solid #0f1e35' }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: color }}
                    />
                    <h3
                      className="font-syne font-bold text-xs tracking-wider uppercase"
                      style={{ color }}
                    >
                      {category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {items.map((skill, si) => (
                      <motion.span
                        key={skill}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: si * 0.04, duration: 0.3 }}
                        viewport={{ once: true }}
                        className="text-xs px-3 py-1.5 rounded-lg font-medium"
                        style={{
                          background: `${color}10`,
                          border: `0.5px solid ${color}25`,
                          color: `${color}cc`,
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
