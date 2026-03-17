import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Award } from 'lucide-react'
import { certifications } from '../data/portfolio'

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

export default function Certifications() {
  return (
    <section id="certifications" className="py-24 px-6" style={{ background: '#060b14' }}>
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="mb-14">
            <p className="section-label mb-3">Credentials</p>
            <h2 className="font-syne font-extrabold text-4xl tracking-tight" style={{ color: '#fff' }}>
              Licenses & Certifications
            </h2>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {certifications.map((cert, i) => (
            <FadeIn key={cert.name} delay={i * 0.06}>
              <motion.div
                className="p-4 rounded-xl"
                style={{ background: '#0a1522', border: '0.5px solid #0f1e35' }}
                whileHover={{ y: -3, borderColor: `${cert.color}40` }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: `${cert.color}15` }}
                  >
                    <Award size={15} style={{ color: cert.color }} />
                  </div>
                  <div>
                    <h3 className="font-syne font-bold text-xs leading-snug" style={{ color: '#c8d8f0' }}>
                      {cert.name}
                    </h3>
                    <p className="text-xs mt-1" style={{ color: cert.color }}>{cert.issuer}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#1a3050' }}>{cert.date}</p>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
