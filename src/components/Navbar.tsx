import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Katalog', to: '/' },
  { label: 'Hard Paywall', to: '/artikel/hard' },
  { label: 'Metered', to: '/artikel/metered' },
  { label: 'Leseprobe', to: '/leseprobe' },
  { label: 'Abo', to: '/abo' },
]

function TestmodeBadge() {
  return (
    <span className="badge-testmode" title="Zahlungen laufen über Stripe im Testmodus">
      <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-gold" />
      Stripe Testmodus
    </span>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-[12px] transition-all duration-300 ease-editorial',
          scrolled ? 'shadow-[0_8px_24px_-16px_rgb(26_23_18/0.35)]' : '',
        )}
      >
        <div
          className={cn(
            'mx-auto flex max-w-site items-center justify-between px-6 transition-all duration-300 ease-editorial lg:px-12',
            scrolled ? 'h-14' : 'h-[72px]',
          )}
        >
          {/* Wortmarke */}
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-display text-2xl font-bold tracking-[0.3em] text-ink">SAJON</span>
            <span className="mt-1 font-sans text-[9px] font-medium uppercase tracking-[0.35em] text-ink-faint">
              Publishing · Bern
            </span>
          </Link>

          {/* Desktop links */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'relative font-sans text-[13px] font-medium uppercase tracking-[0.1em] transition-colors duration-300',
                    isActive
                      ? 'text-cinnabar after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:bg-cinnabar'
                      : 'text-ink-soft hover:text-ink',
                  )
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right: badge + CTA */}
          <div className="hidden items-center gap-5 lg:flex">
            <TestmodeBadge />
            <motion.div whileTap={{ scale: 0.97 }}>
              <Link
                to="/abo"
                className="btn-primary !px-6 !py-3 text-xs"
              >
                Zugang wählen
              </Link>
            </motion.div>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            aria-label="Menü öffnen"
            onClick={() => setOpen(true)}
            className="cursor-pointer text-ink lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile fullscreen overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="paper-texture fixed inset-0 z-[60] flex flex-col bg-paper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex h-[72px] items-center justify-between border-b border-line px-6">
              <span className="font-display text-2xl font-bold tracking-[0.3em]">SAJON</span>
              <button
                type="button"
                aria-label="Menü schließen"
                onClick={() => setOpen(false)}
                className="cursor-pointer text-ink"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2 px-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: -32 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={link.to}
                    end={link.to === '/'}
                    className={({ isActive }) =>
                      cn(
                        'block border-b border-line py-4 font-display text-[40px] font-semibold leading-tight',
                        isActive ? 'italic text-cinnabar' : 'text-ink',
                      )
                    }
                  >
                    {link.label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 flex flex-col items-start gap-5"
              >
                <TestmodeBadge />
                <Link to="/abo" className="btn-primary">
                  Zugang wählen
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
