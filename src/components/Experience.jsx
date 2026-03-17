import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react'
import { experience, education } from '../data/portfolio'

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

function ExpCard({ job, index }) {
  return (
    <FadeIn delay={index * 0.1}>
      <motion.div
        className="relative pl-8"
        whileHover={{ x: 4 }}
        transition={{ duration: 0.2 }}
      >
        {/* Timeline dot */}
        <div
          className="absolute left-0 top-5 w-3 h-3 rounded-full border-2 flex-shrink-0"
          style={{
            background: job.current ? job.color : '#0a1522',
            borderColor: job.color,
            boxShadow: job.current ? `0 0 10px ${job.color}60` : 'none',
          }}
        />
        {/* Timeline line */}
        <div
          className="absolute left-[5px] top-8 bottom-0 w-px"
          style={{ background: '#0f1e35' }}
        />

        <div
          className="mb-6 p-5 rounded-xl"
          style={{ background: '#0a1522', border: '0.5px solid #0f1e35' }}
        >
          <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                {job.current && (
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '0.5px solid rgba(34,197,94,0.3)' }}
                  >
                    Current
                  </span>
                )}
                <span className="text-xs" style={{ color: '#3a5a7a' }}>{job.type}</span>
              </div>
              <h3 className="font-syne font-bold text-base" style={{ color: '#c8d8f0' }}>{job.title}</h3>
              <p className="text-sm font-semibold mt-0.5" style={{ color: job.color }}>{job.company}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-1 text-xs" style={{ color: '#3a5a7a' }}>
                <Calendar size={11} /> {job.period}
              </div>
              <div className="flex items-center gap-1 text-xs mt-1" style={{ color: '#1a3050' }}>
                <MapPin size={11} /> {job.location}
              </div>
            </div>
          </div>

          {job.description && (
            <p className="text-xs leading-relaxed mb-3" style={{ color: '#4a6a8a' }}>
              {job.description}
            </p>
          )}

          <div className="flex flex-wrap gap-2">
            {job.skills.map(s => (
              <span key={s} className="tag">{s}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </FadeIn>
  )
}

function EduCard({ edu, index }) {
  return (
    <FadeIn delay={index * 0.1}>
      <motion.div
        className="p-5 rounded-xl"
        style={{ background: '#0a1522', border: '0.5px solid #0f1e35' }}
        whileHover={{ borderColor: 'rgba(56,189,248,0.3)' }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-start gap-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center font-syne font-extrabold text-sm flex-shrink-0"
            style={{ background: `${edu.color}18`, color: edu.color, border: `0.5px solid ${edu.color}40` }}
          >
            {edu.logo}
          </div>
          <div>
            <h3 className="font-syne font-bold text-sm" style={{ color: '#c8d8f0' }}>{edu.school}</h3>
            <p className="text-xs mt-0.5" style={{ color: '#38bdf8' }}>{edu.degree}</p>
            <p className="text-xs mt-1" style={{ color: '#3a5a7a' }}>{edu.period}</p>
            {edu.grade && <p className="text-xs mt-1" style={{ color: '#1a3050' }}>Grade: {edu.grade}</p>}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {edu.skills.map(s => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </FadeIn>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-6" style={{ background: '#060b14' }}>
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <div className="mb-14">
            <p className="section-label mb-3">Career Journey</p>
            <h2 className="font-syne font-extrabold text-4xl tracking-tight" style={{ color: '#fff' }}>
              Experience & Education
            </h2>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Experience */}
          <div>
            <FadeIn>
              <div className="flex items-center gap-3 mb-8">
                <Briefcase size={16} style={{ color: '#38bdf8' }} />
                <span className="font-syne font-bold text-sm tracking-wider uppercase" style={{ color: '#38bdf8' }}>
                  Work Experience
                </span>
              </div>
            </FadeIn>
            <div>
              {experience.map((job, i) => <ExpCard key={i} job={job} index={i} />)}
            </div>
          </div>

          {/* Education */}
          <div>
            <FadeIn>
              <div className="flex items-center gap-3 mb-8">
                <GraduationCap size={16} style={{ color: '#38bdf8' }} />
                <span className="font-syne font-bold text-sm tracking-wider uppercase" style={{ color: '#38bdf8' }}>
                  Education
                </span>
              </div>
            </FadeIn>
            <div className="space-y-4">
              {education.map((edu, i) => <EduCard key={i} edu={edu} index={i} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
