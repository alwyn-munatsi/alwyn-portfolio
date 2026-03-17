import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Github, Linkedin } from 'lucide-react'

const links = [
  { label: 'About',    href: '#about'    },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects'  },
  { label: 'Skills',   href: '#skills'   },
  { label: 'Contact',  href: '#contact'  },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(6,11,20,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '0.5px solid #0f1e35' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="font-syne font-extrabold text-white text-lg tracking-tight">
          Alwyn<span style={{ color: '#38bdf8' }}>.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium transition-colors duration-200"
              style={{ color: '#3a5a7a' }}
              onMouseEnter={e => e.target.style.color = '#38bdf8'}
              onMouseLeave={e => e.target.style.color = '#3a5a7a'}
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Social + CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a href="https://github.com/alwyn-munatsi" target="_blank" rel="noreferrer"
            className="transition-colors" style={{ color: '#3a5a7a' }}
            onMouseEnter={e => e.target.style.color = '#38bdf8'}
            onMouseLeave={e => e.target.style.color = '#3a5a7a'}>
            <Github size={18} />
          </a>
          <a href="https://www.linkedin.com/in/alwynmunatsi/" target="_blank" rel="noreferrer"
            className="transition-colors" style={{ color: '#3a5a7a' }}
            onMouseEnter={e => e.target.style.color = '#38bdf8'}
            onMouseLeave={e => e.target.style.color = '#3a5a7a'}>
            <Linkedin size={18} />
          </a>
          <a
            href="#contact"
            className="font-syne font-bold text-sm px-4 py-2 rounded-lg transition-all duration-200"
            style={{ background: '#38bdf8', color: '#060b14' }}
            onMouseEnter={e => e.target.style.opacity = '0.85'}
            onMouseLeave={e => e.target.style.opacity = '1'}
          >
            Hire Me
          </a>
        </div>

        {/* Hamburger */}
        <button className="md:hidden" style={{ color: '#c8d8f0' }} onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ background: '#060b14', borderBottom: '0.5px solid #0f1e35' }}
            className="md:hidden px-6 pb-6"
          >
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm font-medium border-b"
                style={{ color: '#3a5a7a', borderColor: '#0f1e35' }}
              >
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setOpen(false)}
              className="block mt-4 font-syne font-bold text-sm px-4 py-2 rounded-lg text-center"
              style={{ background: '#38bdf8', color: '#060b14' }}>
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
