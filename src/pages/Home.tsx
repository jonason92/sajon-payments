import { useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { Lock, ArrowRight, ArrowUpRight, CreditCard, BookOpen, Download, Smartphone, ShieldCheck } from 'lucide-react'
import { STRIPE_LINKS } from '@/lib/stripe'
import { trpc } from '@/providers/trpc'

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
/* Section 1 — Hero                                                    */
/* ------------------------------------------------------------------ */
function Hero() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: EASE } })
      tl.fromTo(
        '.js-eyebrow-line',
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power3.inOut', stagger: 0.05 },
      )
        .fromTo(
          '.js-hero-title .js-word',
          { yPercent: 110 },
          { yPercent: 0, duration: 1, stagger: 0.07 },
          '-=0.3',
        )
        .fromTo(
          '.js-hero-fade',
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 },
          '-=0.5',
        )
        .fromTo(
          '.js-hero-img',
          { clipPath: 'inset(0 0 100% 0)' },
          { clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'power3.inOut' },
          0.4,
        )
        .fromTo('.js-hero-img img', { scale: 1.08 }, { scale: 1, duration: 2.4 }, 0.4)

      gsap.to('.js-hero-img', {
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="relative flex min-h-[100dvh] flex-col overflow-hidden">
      {/* Eyebrow-Zeile (Zeitungskopf) */}
      <div className="mx-auto w-full max-w-site px-6 pt-10 lg:px-12">
        <div className="js-eyebrow-line h-px origin-center bg-line" />
        <p className="py-4 text-center font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-ink-faint">
          Sajon Publishing · Akademischer E-Book-Verlag · Gegründet MMXXIV
        </p>
        <div className="js-eyebrow-line h-px origin-center bg-line" />
      </div>

      <div className="mx-auto grid w-full max-w-site flex-1 items-center gap-16 px-6 py-16 lg:grid-cols-12 lg:px-12">
        {/* Text */}
        <div className="lg:col-span-7">
          <h1 className="js-hero-title font-display text-[44px] font-semibold leading-[0.98] tracking-[-0.02em] text-ink lg:text-[88px]">
            {words('Wissenschaft,')}
            <br />
            <span className="italic text-cinnabar">{words('schön gesetzt.')}</span>
          </h1>
          <p className="js-hero-fade mt-8 max-w-xl font-body text-lg italic leading-[1.6] text-ink-soft lg:text-[23px]">
            Sajon Publishing edi&shy;ert akademische E-Books mit der Sorgfalt klassischer Buchkunst
            — präzise gesetzt, typografisch anspruchsvoll, kuratiert.
          </p>
          <div className="js-hero-fade mt-10 flex flex-wrap items-center gap-4">
            <a href="#programm" className="btn-primary">
              Programm entdecken
            </a>
            <Link to="/abo" className="btn-ghost">
              Abo wählen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Bild */}
        <div className="relative lg:col-span-5">
          <div
            className="absolute -right-6 -top-6 hidden h-full w-full border border-cinnabar lg:block"
            aria-hidden
          />
          <div className="js-hero-img relative border border-line will-change-transform">
            <img
              src="/hero-books.png"
              alt="Stapel schöner Hardcover-Bücher in Leinenbindung"
              className="aspect-[3/2] w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Scroll-Hinweis */}
      <div className="js-hero-fade flex flex-col items-center gap-3 pb-10">
        <span className="font-sans text-[11px] font-medium uppercase tracking-[0.3em] text-ink-faint">
          Blättern ↓
        </span>
        <span className="relative h-12 w-px overflow-hidden bg-line">
          <span className="absolute left-0 top-0 h-4 w-px animate-[scrollhint_1.6s_ease-in-out_infinite] bg-cinnabar" />
        </span>
      </div>
      <style>{`@keyframes scrollhint { 0% { transform: translateY(-100%);} 100% { transform: translateY(300%);} }`}</style>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Section 2 — Verlagsprogramm                                         */
/* ------------------------------------------------------------------ */
const PROGRAMME = [
  {
    num: 'I.',
    title: 'E-Books',
    text: 'Vollständig edierte Monografien und Sammelbände, gesetzt für den Bildschirm wie für den Druck.',
  },
  {
    num: 'II.',
    title: 'Akademische Artikel',
    text: 'Peer-reviewte Fachaufsätze aus Geistes- und Designwissenschaft.',
  },
  {
    num: 'III.',
    title: 'Leseproben',
    text: 'Kuratierte Auszüge und Essays — frei zugänglich, als Einladung.',
  },
]

function Programm() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '.js-program-item',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: EASE,
          scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        },
      )
    },
    { scope: ref },
  )

  return (
    <section id="programm" ref={ref} className="px-6 py-[72px] lg:py-32">
      <div className="mx-auto max-w-[900px] text-center">
        <p className="kicker">Das Programm</p>
        <h2 className="mt-6 font-display text-[28px] font-semibold leading-[1.1] text-ink lg:text-[40px]">
          Drei Formate. Ein Anspruch: akademische Präzision in editorischer Form.
        </h2>
      </div>
      <div className="mx-auto mt-20 grid max-w-[900px] gap-12 md:grid-cols-3 md:gap-8">
        {PROGRAMME.map((item) => (
          <div key={item.num} className="js-program-item group">
            <div className="relative h-px bg-line">
              <span className="absolute left-0 top-0 h-px w-full origin-left scale-x-0 bg-cinnabar transition-transform duration-500 ease-editorial group-hover:scale-x-100" />
            </div>
            <p className="mt-6 font-display text-lg italic text-cinnabar">{item.num}</p>
            <h3 className="mt-2 font-display text-[26px] font-semibold leading-[1.2] text-ink transition-colors duration-300 group-hover:text-cinnabar">
              {item.title}
            </h3>
            <p className="mt-3 font-body text-[15px] leading-relaxed text-ink-soft">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Section 3 — Ausgewählte Titel                                       */
/* ------------------------------------------------------------------ */
function Katalog() {
  const ref = useRef<HTMLElement>(null)
  const { data: titles, isLoading } = trpc.titles.list.useQuery()

  useGSAP(
    () => {
      if (isLoading) return
      gsap.fromTo(
        '.js-catalog-card',
        { opacity: 0, y: 48 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: EASE,
          scrollTrigger: { trigger: ref.current, start: 'top 80%' },
        },
      )
    },
    { scope: ref, dependencies: [isLoading, titles] },
  )

  return (
    <section ref={ref} className="border-t border-line px-6 py-[72px] lg:px-12 lg:py-32">
      <div className="mx-auto max-w-site">
        <p className="kicker">Aus dem Katalog</p>
        <h2 className="mt-6 font-display text-[28px] font-semibold text-ink lg:text-[40px]">
          Neuerscheinungen
        </h2>

        {isLoading ? (
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="js-catalog-card block animate-pulse">
                <div className="aspect-[2/3] w-full border border-line bg-paper-deep" />
                <div className="mt-5 h-6 w-3/4 bg-paper-deep" />
                <div className="mt-2 h-3 w-1/2 bg-paper-deep" />
              </div>
            ))}
          </div>
        ) : !titles || titles.length === 0 ? (
          <p className="mt-16 font-body text-[15px] italic leading-relaxed text-ink-soft">
            Derzeit sind keine Neuerscheinungen im Katalog — schauen Sie bald wieder vorbei.
          </p>
        ) : (
          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {titles.map((t) => (
              <Link key={t.slug} to={t.route} className="js-catalog-card group block">
                <div className="relative border border-line bg-paper-deep transition-all duration-500 ease-editorial group-hover:-translate-y-2 group-hover:shadow-editorial [perspective:1200px]">
                  {t.coverImage && (
                    <img
                      src={t.coverImage}
                      alt={`Cover: ${t.title}`}
                      className="aspect-[2/3] w-full object-cover transition-transform duration-500 ease-editorial group-hover:[transform:rotateX(2deg)_rotateY(-3deg)]"
                    />
                  )}
                  <span className="absolute right-4 top-4">
                    {t.premium ? (
                      <span className="badge-premium">
                        <Lock className="h-3 w-3" /> Premium
                      </span>
                    ) : (
                      <span className="badge-free bg-paper">Frei</span>
                    )}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[22px] font-semibold text-ink transition-colors duration-300 group-hover:text-cinnabar">
                  {t.title}
                </h3>
                <p className="mt-1 font-sans text-xs uppercase tracking-[0.12em] text-ink-faint">
                  {t.author} · {t.type === 'ebook' ? 'E-Book' : t.type === 'artikel' ? 'Artikel' : 'Leseprobe'}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Section 4 — Die drei Paywall-Varianten                              */
/* ------------------------------------------------------------------ */
function MiniLock() {
  return (
    <div className="flex aspect-[4/3] items-center justify-center bg-locked">
      <div className="flex flex-col items-center gap-3 text-paper/90">
        <Lock className="h-10 w-10 text-cinnabar transition-transform duration-500 ease-editorial group-hover:-rotate-6" />
        <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-paper/60">
          Premium-Inhalt
        </span>
      </div>
    </div>
  )
}

function MiniBlur() {
  return (
    <div className="relative aspect-[4/3] overflow-hidden border border-line bg-paper p-6">
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="mb-3 h-2.5 rounded-sm bg-ink/70"
          style={{
            width: `${92 - i * 4}%`,
            filter: `blur(${Math.max(0, (i - 1) * 1.6)}px)`,
            opacity: 1 - i * 0.1,
          }}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-paper to-transparent" />
    </div>
  )
}

function MiniTiers() {
  return (
    <div className="grid aspect-[4/3] grid-cols-3 items-center gap-3 border border-line bg-paper p-5">
      {[
        { label: 'Einmal', price: 'CHF 19' },
        { label: 'Monat', price: 'CHF 9' },
        { label: 'Jahr', price: 'CHF 79' },
      ].map((t, i) => (
        <div
          key={t.label}
          className={`flex h-4/5 flex-col items-center justify-center gap-2 border text-center ${
            i === 2 ? 'border-gold bg-paper-deep' : 'border-line'
          }`}
        >
          <span className="font-sans text-[10px] uppercase tracking-[0.15em] text-ink-faint">
            {t.label}
          </span>
          <span className="font-display text-lg font-semibold text-ink">{t.price}</span>
        </div>
      ))}
    </div>
  )
}

const VARIANTS = [
  {
    num: 'I.',
    title: 'Hard Paywall',
    text: 'Der vollständig gesperrte Inhalt. Ein Lock-Overlay versiegelt den Artikel — nur der Einstieg bleibt sichtbar.',
    to: '/artikel/hard',
    Visual: MiniLock,
  },
  {
    num: 'II.',
    title: 'Teaser / Metered',
    text: 'Der Text verläuft ins Unscharfe. Die ersten Absätze sind frei — danach verwischt der Rest hinter einer sanften Blur-Wand.',
    to: '/artikel/metered',
    Visual: MiniBlur,
  },
  {
    num: 'III.',
    title: 'Abo-Wall / Pricing',
    text: 'Drei Zugänge, eine Entscheidung: Einmalzugang, Monats- oder Jahres-Abo — abgewickelt über Stripe.',
    to: '/abo',
    Visual: MiniTiers,
  },
]

function PaywallDemo() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('.js-variant-panel').forEach((panel) => {
        gsap.fromTo(
          panel,
          { clipPath: 'inset(0 100% 0 0)' },
          {
            clipPath: 'inset(0 0% 0 0)',
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: { trigger: panel, start: 'top 70%' },
          },
        )
      })
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="bg-paper-deep px-6 py-[72px] lg:px-12 lg:py-32">
      <div className="mx-auto max-w-site">
        <p className="kicker">Die Paywall-Systeme</p>
        <h2 className="mt-6 font-display text-[28px] font-semibold text-ink lg:text-[40px]">
          Drei Wege zum Inhalt.
        </h2>

        <div className="mt-20 space-y-20">
          {VARIANTS.map((v, i) => (
            <div
              key={v.num}
              className={`js-variant-panel group grid items-center gap-10 border border-line bg-paper p-8 lg:grid-cols-2 lg:gap-16 lg:p-14 ${
                i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
              }`}
            >
              <div>
                <p className="font-display text-lg italic text-cinnabar">{v.num}</p>
                <h3 className="mt-2 font-display text-[26px] font-semibold text-ink lg:text-[32px]">
                  {v.title}
                </h3>
                <p className="mt-4 max-w-md font-body text-[17px] leading-relaxed text-ink-soft">
                  {v.text}
                </p>
                <Link to={v.to} className="btn-ghost mt-8">
                  Demo ansehen <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <v.Visual />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Section 5 — Pricing-Teaser                                          */
/* ------------------------------------------------------------------ */
const TIERS = [
  { name: 'Einmalzugang', price: 'CHF 19', unit: 'einmalig', link: STRIPE_LINKS.einmal },
  { name: 'Monats-Abo', price: 'CHF 9', unit: 'pro Monat', link: STRIPE_LINKS.monat, lift: true },
  { name: 'Jahres-Abo', price: 'CHF 79', unit: 'pro Jahr', link: STRIPE_LINKS.jahr, gold: true },
]

function PricingTeaser() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '.js-tier-card',
        { opacity: 0, scale: 0.96 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: EASE,
          scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        },
      )
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="px-6 py-[72px] lg:px-12 lg:py-32">
      <div className="mx-auto max-w-site text-center">
        <h2 className="font-display text-[28px] font-semibold text-ink lg:text-[40px]">
          Zugang wählen
        </h2>
        <p className="mt-4 font-body text-[17px] italic text-ink-soft">
          Alle Preise inkl. MwSt. · Zahlung über Stripe
        </p>

        <div className="mx-auto mt-16 grid max-w-4xl gap-6 md:grid-cols-3">
          {TIERS.map((tier) => (
            <div
              key={tier.name}
              className={`js-tier-card relative flex flex-col items-center border bg-paper px-8 py-12 ${
                tier.gold ? 'border-gold' : 'border-line'
              } ${tier.lift ? 'md:-translate-y-3 md:shadow-editorial' : ''}`}
            >
              {tier.gold && (
                <span className="absolute -top-3 rounded-full bg-gold px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-paper">
                  Bestseller
                </span>
              )}
              <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-ink-faint">
                {tier.name}
              </h3>
              <p className="mt-5 font-display text-[44px] font-semibold leading-none text-ink">
                {tier.price}
              </p>
              <p className="mt-2 font-sans text-[13px] text-ink-faint">{tier.unit}</p>
              <a
                href={tier.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-accent mt-8 w-full !px-4"
              >
                Kaufen <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <Link
            to="/abo"
            className="link-underline font-sans text-sm font-semibold uppercase tracking-[0.12em] text-ink"
          >
            Alle Details vergleichen →
          </Link>
          <p className="flex items-center gap-3 font-sans text-[13px] text-ink-faint">
            <span className="badge-testmode">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-gold" />
              Stripe Testmodus
            </span>
            Es wird nichts abgebucht.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Section 5b — So funktioniert es (praktischer Ablauf)                */
/* ------------------------------------------------------------------ */
const STEPS = [
  {
    num: '1.',
    icon: BookOpen,
    title: 'Titel wählen',
    text: 'Stöbern Sie im Katalog: Leseproben sind frei, Premium-Inhalte erkennen Sie am roten Badge. Jeder Titel zeigt Format, Umfang und Preis vor dem Kauf.',
  },
  {
    num: '2.',
    icon: CreditCard,
    title: 'Sicher bezahlen',
    text: 'Die Zahlung läuft über Stripe — Kreditkarte, TWINT oder Apple Pay. Diese Vorschau läuft im Testmodus: Testkarte 4242 4242 4242 4242, es wird nichts abgebucht.',
  },
  {
    num: '3.',
    icon: Download,
    title: 'Sofort lesen',
    text: 'Nach dem Kauf steht der Inhalt in Ihrem Konto bereit — im Online-Reader und als Download (EPUB & PDF, DRM-frei) für eReader, Tablet und Smartphone.',
  },
]

const FORMAT_FACTS = [
  { icon: Smartphone, label: 'Lesegeräte', value: 'eReader, Tablet, Smartphone, Desktop' },
  { icon: Download, label: 'Formate', value: 'EPUB 3 · PDF · Online-Reader' },
  { icon: ShieldCheck, label: 'Kopierschutz', value: 'DRM-frei — Ihre Datei, für immer' },
]

function Ablauf() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '.js-step',
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: EASE,
          scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        },
      )
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="border-t border-line px-6 py-[72px] lg:px-12 lg:py-32">
      <div className="mx-auto max-w-site">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="kicker">So funktioniert es</p>
          <h2 className="mt-6 font-display text-[28px] font-semibold leading-[1.1] text-ink lg:text-[40px]">
            In drei Schritten zum Inhalt.
          </h2>
        </div>

        <div className="mx-auto mt-16 grid max-w-[1000px] gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.map((step) => (
            <div key={step.num} className="js-step">
              <div className="flex items-center gap-4">
                <step.icon className="h-5 w-5 text-cinnabar" />
                <span className="h-px flex-1 bg-line" />
                <span className="font-display text-lg italic text-cinnabar">{step.num}</span>
              </div>
              <h3 className="mt-6 font-display text-[24px] font-semibold text-ink">{step.title}</h3>
              <p className="mt-3 font-body text-[15px] leading-relaxed text-ink-soft">{step.text}</p>
            </div>
          ))}
        </div>

        {/* Praktische Fakten: Formate & Geräte */}
        <div className="js-step mx-auto mt-16 grid max-w-[1000px] border border-line md:grid-cols-3">
          {FORMAT_FACTS.map((f, i) => (
            <div
              key={f.label}
              className={`flex items-start gap-4 px-8 py-7 ${i > 0 ? 'border-t border-line md:border-l md:border-t-0' : ''}`}
            >
              <f.icon className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
              <div>
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-ink-faint">
                  {f.label}
                </p>
                <p className="mt-1.5 font-body text-[15px] font-semibold text-ink">{f.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Section 5c — Der Verlag                                             */
/* ------------------------------------------------------------------ */
const SPARTEN = [
  'Sajon Publishing',
  'Jonason Spiritual Science Bridge',
  'sajonDocs',
  'Sajon Bibliotheks- & Archivplattform',
  'Sajon Lebende Bücher',
]

function Verlag() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '.js-verlag-fade',
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: EASE,
          scrollTrigger: { trigger: ref.current, start: 'top 75%' },
        },
      )
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="bg-paper-deep px-6 py-[72px] lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-site gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="js-verlag-fade">
          <p className="kicker">Der Verlag</p>
          <h2 className="mt-6 font-display text-[28px] font-semibold leading-[1.15] text-ink lg:text-[36px]">
            Sajon Publishing — die Verlags-Sparte der Sajon GmbH.
          </h2>
          <p className="mt-6 font-body text-[17px] leading-relaxed text-ink-soft">
            Sajon Publishing verbindet akademische Sorgfalt mit zeitgemäßem Buchdesign:
            peer-reviewte Inhalte, handgesetzte Typografie und eine technische Pipeline,
            die aus einem Manuskript jedes gewünschte Format erzeugt.
          </p>
          <address className="mt-8 border-l-2 border-cinnabar pl-6 font-body text-[15px] not-italic leading-relaxed text-ink-soft">
            <strong className="font-semibold text-ink">Sajon GmbH</strong>
            <br />
            Sparte Sajon Publishing
            <br />
            Klösterlistutz 18A
            <br />
            3013 Bern
          </address>
        </div>

        <div className="js-verlag-fade lg:pt-16">
          <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-ink-faint">
            Die Sparten der Sajon GmbH
          </h3>
          <ul className="mt-6 divide-y divide-line border-y border-line">
            {SPARTEN.map((s, i) => (
              <li key={s} className="flex items-baseline gap-5 py-4">
                <span className="font-display text-sm italic text-cinnabar">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`font-body text-[16px] ${i === 0 ? 'font-semibold text-ink' : 'text-ink-soft'}`}
                >
                  {s}
                  {i === 0 && (
                    <span className="ml-3 font-sans text-[10px] font-semibold uppercase tracking-[0.15em] text-gold">
                      Diese Website
                    </span>
                  )}
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-6 font-sans text-[13px] leading-relaxed text-ink-faint">
            Fragen zu Titeln, Lizenzen oder Zusammenarbeit? Schreiben Sie uns —
            wir antworten in der Regel innerhalb von zwei Werktagen.
          </p>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Section 6 — Verlagszitat                                            */
/* ------------------------------------------------------------------ */
const QUOTE =
  'Ein Buch ist nicht erst dann fertig, wenn es gelesen ist — sondern wenn es schön gelesen wird.'

function Verlagszitat() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '.js-quote-word',
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: {
            trigger: ref.current,
            start: 'top 75%',
            end: 'center 45%',
            scrub: true,
          },
        },
      )
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="bg-ink px-6 py-[72px] text-paper lg:px-12 lg:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <blockquote className="font-display text-[26px] font-medium italic leading-snug lg:text-[36px]">
          {QUOTE.split(' ').map((w, i) => (
            <span key={i} className="js-quote-word inline-block">
              {w}&nbsp;
            </span>
          ))}
        </blockquote>
        <p className="mt-8 font-sans text-[13px] uppercase tracking-[0.22em] text-paper/50">
          Verlagsleitlinie, Sajon Publishing
        </p>
        <Link to="/abo" className="btn-accent mt-12">
          Jetzt Zugang wählen
        </Link>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

export default function Home() {
  return (
    <>
      <Hero />
      <Programm />
      <Katalog />
      <PaywallDemo />
      <Ablauf />
      <PricingTeaser />
      <Verlag />
      <Verlagszitat />
    </>
  )
}
