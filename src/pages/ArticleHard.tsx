import { useState } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import { Lock, BookOpen, Feather, ArrowUpRight, ArrowRight, Check } from 'lucide-react'
import { STRIPE_LINKS } from '@/lib/stripe'
import { cn } from '@/lib/utils'

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

type Tier = 'einmal' | 'monat' | 'jahr'

const TIERS: { id: Tier; label: string; price: string; recommended?: boolean }[] = [
  { id: 'einmal', label: 'Einmalzugang', price: 'CHF 19.00' },
  { id: 'monat', label: 'Monats-Abo', price: 'CHF 9.00/Mt.' },
  { id: 'jahr', label: 'Jahres-Abo', price: 'CHF 79.00/Jahr', recommended: true },
]

const HEADLINE = 'Die unsichtbare Ordnung — Mikrotypografie in akademischen Editionen'

function WordReveal({ text }: { text: string }) {
  const words = text.split(' ')
  return (
    <h1 className="font-display text-4xl font-semibold leading-[1.05] text-ink md:text-[64px]">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 0.06 * i, ease: EASE }}
          >
            {word}
            {i < words.length - 1 ? ' ' : ''}
          </motion.span>
        </span>
      ))}
    </h1>
  )
}

export default function ArticleHard() {
  const [tier, setTier] = useState<Tier>('jahr')

  return (
    <article className="paper-texture">
      {/* Section 1 — Artikelkopf */}
      <header className="mx-auto max-w-article px-6 pt-16 lg:pt-24">
        <nav className="font-sans text-xs text-ink-faint" aria-label="Breadcrumb">
          <Link to="/" className="transition-colors hover:text-cinnabar">
            Katalog
          </Link>
          <span className="mx-2">/</span>
          <a href="#" className="transition-colors hover:text-cinnabar">
            Akademische Artikel
          </a>
          <span className="mx-2">/</span>
          <a href="#" className="transition-colors hover:text-cinnabar">
            Typografie
          </a>
        </nav>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex items-center gap-4"
        >
          <span className="badge-premium">
            <Lock className="h-3 w-3" />
            Premium
          </span>
          <span className="kicker">Premium · Fachartikel</span>
        </motion.div>

        <div className="mt-6">
          <WordReveal text={HEADLINE} />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-6 font-sans text-[13px] tracking-wide text-ink-faint"
        >
          Von Dr. Elena Marbach · 14. November 2025 · 18 Min. Lesezeit · ISSN 2942-XXXX
        </motion.p>

        <motion.figure
          initial={{ clipPath: 'inset(100% 0 0 0)' }}
          animate={{ clipPath: 'inset(0% 0 0 0)' }}
          transition={{ duration: 1, delay: 0.4, ease: EASE }}
          className="mt-12"
        >
          <img
            src="/article-hero-hard.png"
            alt="Bleilettern im Setzkasten"
            className="w-full border border-line object-cover"
          />
          <figcaption className="mt-3 font-sans text-[13px] italic text-ink-faint">
            Bleilettern im Setzkasten. Foto: Sajon Archiv.
          </figcaption>
        </motion.figure>
      </header>

      {/* Section 2 — Freier Einstieg */}
      <div className="mx-auto max-w-article px-6 pt-16">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="drop-cap font-body text-[17px] leading-[1.75] text-ink md:text-[19px]"
        >
          Der Satz eines wissenschaftlichen Textes entscheidet über seine Glaubwürdigkeit, bevor ein
          einziges Argument gelesen wurde. Nicht der Inhalt, sondern die Ordnung der Lettern bildet
          den ersten Eindruck: das ruhige Grau der Zeilen, das Maß des Durchschusses, die kaum
          merkliche Korrektur des Kernings zwischen Kapitälchen und Klammer. Mikrotypografie ist die
          stille Infrastruktur des Denkens — Ligaturen, die das Auge nicht stolpern lassen,
          Minuskelziffern, die sich in den Fließtext fügen, Trennungen, die den Rhythmus einer
          Argumentation respektieren statt ihn zu zerreißen. Wer sie beherrscht, dem vertraut der
          Leser, ohne zu wissen warum.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="relative mt-8 font-body text-[17px] leading-[1.75] text-ink md:text-[19px]"
        >
          In den Werkstätten der großen akademischen Verlage galt diese Kunst lange als
          unaussprechliches Handwerk, weitergegeben von Setzer zu Setzer, von Korrektor zu
          <span className="block bg-gradient-to-b from-ink to-transparent bg-clip-text text-transparent">
            Korrektorin — bis der Buchdruck selbst zur Disposition stand und mit ihm das Wissen um
            seine feinsten Register.
          </span>
        </motion.p>
      </div>

      {/* Section 3 — Lock-Overlay */}
      <motion.section
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative mt-4 min-h-[60vh] overflow-hidden bg-locked/[0.96]"
      >
        {/* Locked article silhouette behind overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 select-none px-6 py-16 opacity-60 [filter:blur(20px)_brightness(0.3)]"
        >
          <div className="mx-auto max-w-article space-y-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <p key={i} className="font-body text-[19px] leading-[1.75] text-ink-soft">
                Die Mikrotypografie akademischer Editionen verlangt ein Maß an Aufmerksamkeit, das
                der Flüchtigkeit digitaler Publikationspraxis diametral entgegensteht. Versalien,
                Ligaturen und der korrekte Satz von Anführungszeichen sind keine Dekoration,
                sondern semantische Zeichen, deren Vernachlässigung den Text selbst verändert.
              </p>
            ))}
          </div>
        </div>

        <div className="relative z-10 flex min-h-[60vh] items-center justify-center px-6 py-20">
          <div className="w-full max-w-[460px] text-center">
            {/* Animated lock */}
            <motion.div
              initial={{ rotate: -14, y: -8 }}
              whileInView={{ rotate: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
              className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold/40"
            >
              <motion.div
                animate={{ opacity: [1, 0.6, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <Lock className="h-10 w-10 text-gold" strokeWidth={1.5} />
              </motion.div>
            </motion.div>

            <p className="mt-8 font-sans text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
              Premium-Inhalt
            </p>
            <h2 className="mt-4 font-display text-[34px] font-semibold leading-tight text-paper">
              Dieser Artikel ist Teil der Sajon Edition.
            </h2>
            <p className="mt-4 font-body text-[15px] leading-relaxed text-paper/70">
              Erhalten Sie sofortigen Zugang zu diesem und über 120 weiteren Fachartikeln,
              Editionen und E-Books.
            </p>

            {/* Tier options */}
            <div className="mt-8 space-y-2 text-left">
              {TIERS.map((t, i) => {
                const active = tier === t.id
                return (
                  <motion.button
                    key={t.id}
                    type="button"
                    onClick={() => setTier(t.id)}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + 0.08 * i, ease: EASE }}
                    className={cn(
                      'flex w-full cursor-pointer items-center justify-between border-l-2 px-4 py-3 transition-colors duration-300',
                      active
                        ? 'border-cinnabar bg-paper/10'
                        : 'border-transparent hover:bg-paper/5',
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={cn(
                          'flex h-4 w-4 items-center justify-center rounded-full border',
                          active ? 'border-gold bg-gold' : 'border-paper/40',
                        )}
                      >
                        {active && <Check className="h-2.5 w-2.5 text-locked" strokeWidth={3} />}
                      </span>
                      <span className="font-sans text-sm text-paper">{t.label}</span>
                      {t.recommended && (
                        <span className="rounded-full border border-gold px-2 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-[0.1em] text-gold">
                          Empfohlen
                        </span>
                      )}
                    </span>
                    <span
                      className={cn(
                        'font-sans text-sm font-semibold transition-colors duration-300',
                        active ? 'text-gold' : 'text-paper/60',
                      )}
                    >
                      {t.price}
                    </span>
                  </motion.button>
                )
              })}
            </div>

            {/* CTA */}
            <motion.div whileTap={{ scale: 0.97 }} className="mt-6">
              <a
                href={STRIPE_LINKS[tier]}
                target="_blank"
                rel="noopener"
                className="btn-accent w-full"
              >
                Zugang freischalten
                <ArrowRight className="h-4 w-4" />
              </a>
            </motion.div>

            <a
              href="#"
              className="mt-5 inline-block font-sans text-[13px] text-paper/70 underline decoration-paper/30 underline-offset-4 transition-colors hover:text-paper"
            >
              Bereits Abonnent? Anmelden
            </a>

            <div className="mt-8 flex items-center justify-center gap-3">
              <span className="badge-testmode">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-gold" />
                Testmodus
              </span>
              <span className="font-sans text-[11px] text-paper/50">
                Stripe-Testmodus — keine echte Abbuchung.
              </span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Section 4 — Das erhalten Sie */}
      <section className="border-y border-line bg-paper-deep">
        <div className="mx-auto max-w-site px-6 py-24 lg:px-12">
          <p className="kicker text-center">Das erhalten Sie</p>
          <div className="mt-12 grid gap-12 md:grid-cols-3">
            {[
              {
                icon: BookOpen,
                title: '120+ Fachartikel',
                text: 'Das gesamte Archiv der Sajon Edition — Typografie, Buchgeschichte, Editionswissenschaft.',
              },
              {
                icon: Feather,
                title: 'Neue Editionen monatlich',
                text: 'Jeden Monat eine neu gesetzte akademische Edition, exklusiv für Abonnenten.',
              },
              {
                icon: ArrowUpRight,
                title: 'Jederzeit kündbar',
                text: 'Keine Laufzeit, kein Kleingedrucktes. Ihr Zugang, Ihre Entscheidung.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: 0.12 * i, ease: EASE }}
                className="text-center"
              >
                <item.icon className="mx-auto h-7 w-7 text-cinnabar" strokeWidth={1.5} />
                <h3 className="mt-5 font-display text-[22px] font-semibold text-ink">
                  {item.title}
                </h3>
                <p className="mx-auto mt-3 max-w-xs font-body text-[15px] leading-relaxed text-ink-soft">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <motion.div whileTap={{ scale: 0.97 }} className="inline-block">
              <Link to="/abo" className="btn-ghost">
                Alle Abo-Details
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </article>
  )
}
