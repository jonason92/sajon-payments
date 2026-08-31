import { useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { motion } from 'framer-motion'
import { BookOpen, Feather, LockOpen, Check, ArrowRight, Minus } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { STRIPE_LINKS } from '@/lib/stripe'
import { cn } from '@/lib/utils'

gsap.registerPlugin(ScrollTrigger)

const EASE = 'power4.out'

function words(text: string) {
  return text.split(' ').map((w, i) => (
    <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
      <span className="js-word inline-block will-change-transform">{w}&nbsp;</span>
    </span>
  ))
}

/* ------------------------------------------------------------------ */
/* Tier-Daten                                                          */
/* ------------------------------------------------------------------ */
const TIERS = [
  {
    name: 'Einmalzugang',
    icon: BookOpen,
    price: 19,
    suffix: 'einmalig',
    oldPrice: null as number | null,
    tagline: 'Für den gezielten Zugriff.',
    features: [
      'Zugang zu einem Inhalt Ihrer Wahl',
      'E-Book als EPUB & PDF',
      'Kein Abo, keine Verlängerung',
      '30 Tage Lesezugang online',
    ],
    cta: 'Einmalig kaufen — CHF 19',
    href: STRIPE_LINKS.einmal,
    buttonClass: 'btn-ghost w-full',
    highlighted: false,
    badge: null as string | null,
  },
  {
    name: 'Monats-Abo',
    icon: Feather,
    price: 9,
    suffix: '/ Monat',
    oldPrice: null as number | null,
    tagline: 'Für neugierige Dauerleser:innen.',
    features: [
      'Unbegrenzter Zugriff auf alle Artikel & Leseproben',
      'Alle E-Book-Neuerscheinungen inklusive',
      "Monatliche Editor's-Choice-Edition",
      'Jederzeit kündbar',
    ],
    cta: 'Monats-Abo starten',
    href: STRIPE_LINKS.monat,
    buttonClass: 'btn-accent w-full',
    highlighted: true,
    badge: 'Beliebt',
  },
  {
    name: 'Jahres-Abo',
    icon: LockOpen,
    price: 79,
    suffix: '/ Jahr',
    oldPrice: 108,
    tagline: 'Der volle Verlag — zum besten Preis.',
    features: [
      'Alles aus dem Monats-Abo',
      '2 Monate geschenkt',
      'Print-fähige PDF-Sammlereditionen',
      'Frühzugang zu Neuerscheinungen',
      'Verlagspost: jährlicher Almanach (digital)',
    ],
    cta: 'Jahres-Abo sichern',
    href: STRIPE_LINKS.jahr,
    buttonClass: 'btn-accent w-full',
    highlighted: false,
    badge: '2 Monate geschenkt',
  },
]

/* ------------------------------------------------------------------ */
/* Section 1 — Header                                                  */
/* ------------------------------------------------------------------ */
function Header() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: EASE } })
      tl.fromTo(
        '.js-h1 .js-word',
        { yPercent: 110 },
        { yPercent: 0, duration: 1, stagger: 0.06 },
      ).fromTo(
        '.js-lead',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9 },
        0.5,
      )
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="mx-auto max-w-[800px] px-6 pt-24 text-center lg:pt-32">
      <p className="kicker">Sajon Zugang</p>
      <h1 className="js-h1 mt-6 font-display text-5xl font-semibold leading-[1.02] tracking-[-0.02em] text-ink lg:text-7xl">
        {words('Ein Zugang. Das ganze Archiv.')}
      </h1>
      <p className="js-lead mx-auto mt-8 max-w-[62ch] font-body text-lg italic leading-relaxed text-ink-soft lg:text-xl">
        Wählen Sie, wie Sie lesen möchten — einmalig, monatlich oder im Jahresbezug. Alle
        Preise in CHF, inkl. MwSt. Sichere Zahlung über Stripe.
      </p>
      <div className="js-lead mt-8 flex justify-center">
        <TooltipProvider delayDuration={150}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="badge-testmode cursor-help">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-gold" />
                Stripe Testmodus
              </span>
            </TooltipTrigger>
            <TooltipContent className="max-w-[260px] text-center">
              Diese Seite läuft im Stripe-Testmodus. Verwenden Sie die Testkarte 4242 4242
              4242 4242.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Section 2 — Pricing-Tiers                                           */
/* ------------------------------------------------------------------ */
function TierCards() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const cards = gsap.utils.toArray<HTMLElement>('.js-tier')
      cards.forEach((card, i) => {
        const highlighted = card.dataset.highlighted === 'true'
        gsap.fromTo(
          card,
          { opacity: 0, y: 48, scale: highlighted ? 1.03 : 1 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            ease: EASE,
            delay: i * 0.12 + (highlighted ? 0.2 : 0),
            scrollTrigger: { trigger: ref.current, start: 'top 80%' },
          },
        )
        // Preis-Counter
        const priceEl = card.querySelector<HTMLElement>('.js-price')
        if (priceEl) {
          const target = Number(priceEl.dataset.price)
          const counter = { value: 0 }
          gsap.to(counter, {
            value: target,
            duration: 0.8,
            ease: 'power2.out',
            delay: i * 0.12 + (highlighted ? 0.2 : 0) + 0.3,
            scrollTrigger: { trigger: ref.current, start: 'top 80%' },
            onUpdate: () => {
              priceEl.textContent = String(Math.round(counter.value))
            },
          })
        }
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="mx-auto mt-24 max-w-[1200px] px-6 lg:mt-28">
      <div className="grid items-start gap-8 lg:grid-cols-3 lg:gap-6">
        {TIERS.map((tier) => {
          const Icon = tier.icon
          return (
            <motion.article
              key={tier.name}
              data-highlighted={tier.highlighted}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={cn(
                'js-tier relative rounded-[2px] bg-paper p-10 transition-shadow duration-300',
                tier.highlighted
                  ? 'border-2 border-cinnabar shadow-[0_24px_48px_-24px_rgb(26_23_18/0.3)] hover:shadow-[0_32px_64px_-24px_rgb(26_23_18/0.4)] lg:-mt-4'
                  : 'border border-line hover:border-cinnabar',
              )}
            >
              {tier.badge && (
                <span
                  className={cn(
                    'absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1 font-sans text-[11px] font-semibold uppercase tracking-[0.12em]',
                    tier.highlighted
                      ? 'bg-cinnabar text-paper'
                      : 'border border-gold bg-paper text-gold',
                  )}
                >
                  {tier.badge}
                </span>
              )}

              <div className="flex items-center gap-3">
                <Icon className={cn('h-5 w-5', tier.highlighted ? 'text-cinnabar' : 'text-ink-soft')} />
                <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-ink">
                  {tier.name}
                </h2>
              </div>

              <div className="mt-8 flex items-baseline gap-3">
                <span className="font-display text-[56px] font-semibold leading-none text-ink">
                  CHF&nbsp;<span className="js-price" data-price={tier.price}>0</span>
                </span>
                <span className="font-sans text-[13px] text-ink-faint">{tier.suffix}</span>
                {tier.oldPrice && (
                  <span className="font-sans text-[13px] text-ink-faint line-through">
                    CHF {tier.oldPrice}
                  </span>
                )}
              </div>

              <p className="mt-4 font-body text-[15px] italic text-ink-soft">{tier.tagline}</p>

              <ul className="mt-8 space-y-3 border-t border-line pt-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 font-body text-[15px] leading-relaxed text-ink-soft">
                    <Check className="mt-1 h-4 w-4 shrink-0 text-cinnabar" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>

              <motion.div whileTap={{ scale: 0.97 }} className="mt-10">
                <a href={tier.href} target="_blank" rel="noopener" className={tier.buttonClass}>
                  {tier.cta}
                </a>
              </motion.div>
            </motion.article>
          )
        })}
      </div>

      <p className="mt-12 text-center font-sans text-[13px] leading-relaxed text-ink-faint">
        Zahlung via Stripe · Kreditkarte, TWINT, Apple Pay · Testmodus — keine echte
        Abbuchung. · Kündbar zum Periodenende.
      </p>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Section 3 — Vergleichstabelle                                       */
/* ------------------------------------------------------------------ */
const COMPARISON: { feature: string; values: [boolean, boolean, boolean] }[] = [
  { feature: 'Einzelner Inhalt', values: [true, true, true] },
  { feature: 'Alle Fachartikel', values: [false, true, true] },
  { feature: 'E-Book-Bibliothek', values: [false, true, true] },
  { feature: 'Neue Editionen', values: [false, true, true] },
  { feature: 'PDF-Downloads', values: [true, true, true] },
  { feature: 'Frühzugang', values: [false, false, true] },
  { feature: 'Jährlicher Almanach', values: [false, false, true] },
]

function Comparison() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '.js-row',
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          ease: EASE,
          stagger: 0.06,
          scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        },
      )
      gsap.fromTo(
        '.js-check',
        { scale: 0 },
        {
          scale: 1,
          duration: 0.45,
          ease: 'back.out(2)',
          stagger: 0.04,
          scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        },
      )
    },
    { scope: ref },
  )

  const cols = ['Einmalzugang', 'Monats-Abo', 'Jahres-Abo']

  return (
    <section ref={ref} className="mx-auto mt-24 max-w-[900px] px-6 lg:mt-32">
      <h2 className="text-center font-display text-3xl font-semibold text-ink lg:text-[40px]">
        Im Vergleich
      </h2>
      <div className="mt-12 overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-line">
              <th className="py-4 pr-4 font-sans text-xs font-semibold uppercase tracking-[0.22em] text-ink-faint">
                Leistung
              </th>
              {cols.map((c) => (
                <th
                  key={c}
                  className="px-4 py-4 text-center font-sans text-xs font-semibold uppercase tracking-[0.14em] text-ink"
                >
                  {c}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((row) => (
              <tr
                key={row.feature}
                className="js-row border-b border-line transition-colors duration-200 hover:bg-paper-deep"
              >
                <td className="py-4 pr-4 font-body text-[15px] text-ink">{row.feature}</td>
                {row.values.map((v, i) => (
                  <td key={i} className="px-4 py-4 text-center">
                    {v ? (
                      <Check
                        className="js-check mx-auto h-4 w-4 text-cinnabar"
                        strokeWidth={2.5}
                      />
                    ) : (
                      <Minus className="mx-auto h-4 w-4 text-ink-faint" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Section 4 — FAQ                                                     */
/* ------------------------------------------------------------------ */
const FAQ = [
  {
    q: 'Kann ich jederzeit kündigen?',
    a: 'Ja. Das Monats-Abo lässt sich jederzeit zum Ende des laufenden Monats kündigen, das Jahres-Abo zum Ende des laufenden Bezugsjahres. Es gibt keine Mindestlaufzeit und keine Kündigungsfristen darüber hinaus.',
  },
  {
    q: 'Welche Zahlungsmittel werden akzeptiert?',
    a: 'Die Zahlung läuft sicher über Stripe: Kreditkarte (Visa, Mastercard, Amex), TWINT und Apple Pay. Diese Demo läuft im Testmodus — verwenden Sie die Testkarte 4242 4242 4242 4242; es wird nichts abgebucht.',
  },
  {
    q: 'Was unterscheidet Einmalzugang und Abo?',
    a: 'Der Einmalzugang öffnet genau einen Inhalt Ihrer Wahl für 30 Tage — ohne Abo und ohne automatische Verlängerung. Die Abos öffnen das gesamte Archiv: alle Fachartikel, Leseproben und E-Book-Editionen, solange das Abo läuft.',
  },
  {
    q: 'In welchen Formaten erhalte ich die E-Books?',
    a: 'Alle E-Books stehen als EPUB und PDF zum Download bereit und können zusätzlich im Online-Reader im Browser gelesen werden — auf Desktop, Tablet und Smartphone.',
  },
  {
    q: 'Gibt es Ermäßigungen für Studierende?',
    a: 'Ja. Studierende und Doktorierende erhalten auf Anfrage 30 % Ermäßigung auf beide Abos. Schreiben Sie uns mit einem Immatrikulationsnachweis an verlag@sajon.example.',
  },
]

function Faq() {
  return (
    <section className="mx-auto mt-24 max-w-[760px] px-6 lg:mt-32">
      <h2 className="text-center font-display text-3xl font-semibold text-ink lg:text-[40px]">
        Häufige Fragen
      </h2>
      <Accordion type="single" collapsible className="mt-12">
        {FAQ.map((item, i) => (
          <AccordionItem key={i} value={`faq-${i}`} className="border-line">
            <AccordionTrigger className="py-6 text-left font-body text-lg font-semibold text-ink hover:text-cinnabar hover:no-underline [&[data-state=open]>svg]:rotate-180">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="font-body text-[15px] leading-relaxed text-ink-soft">
              {item.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Section 5 — Abschluss-CTA                                           */
/* ------------------------------------------------------------------ */
function ClosingCta() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '.js-cta-word',
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 80%',
            end: 'top 40%',
            scrub: true,
          },
        },
      )
      gsap.fromTo(
        '.js-cta-fade',
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: EASE,
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: 'top 70%' },
        },
      )
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="mt-24 bg-ink lg:mt-32">
      <div className="mx-auto max-w-[800px] px-6 py-24 text-center lg:py-32">
        <h2 className="font-display text-3xl font-semibold leading-snug text-paper lg:text-[40px]">
          {'Noch unsicher? Beginnen Sie mit einer Leseprobe.'.split(' ').map((w, i) => (
            <span key={i} className="js-cta-word inline-block">{w}&nbsp;</span>
          ))}
        </h2>
        <div className="mt-12 flex flex-col items-center gap-6">
          <motion.div whileTap={{ scale: 0.97 }} className="js-cta-fade">
            <Link
              to="/leseprobe"
              className="btn border border-paper bg-transparent text-paper hover:bg-paper hover:text-ink"
            >
              Kostenlose Leseprobe lesen
            </Link>
          </motion.div>
          <Link
            to="/artikel/metered"
            className="js-cta-fade group inline-flex items-center gap-2 font-sans text-[13px] font-medium uppercase tracking-[0.1em] text-paper/60 transition-colors hover:text-paper"
          >
            oder direkt zum Archiv
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
export default function Pricing() {
  return (
    <>
      <Header />
      <TierCards />
      <Comparison />
      <Faq />
      <ClosingCta />
    </>
  )
}
