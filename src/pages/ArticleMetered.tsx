import { useEffect, useRef } from 'react'
import { Link } from 'react-router'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ArrowUpRight, Lock } from 'lucide-react'
import { STRIPE_LINKS } from '@/lib/stripe'

gsap.registerPlugin(ScrollTrigger)

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number]

const FREE_PARAGRAPHS_BEFORE_QUOTE = [
  'Es gibt einen Moment, in dem jedes gedruckte Buch verrät, aus welcher Zeit es stammt: Man schlägt es auf, und das Papier antwortet — mit einem Geruch, einem Widerstand, einem leisen Knistern des Rückens. Das leuchtende Buch kennt diesen Moment nicht. Sein Umschlag ist aus Glas, seine Seiten warten im Dunkeln, bis ein Finger sie weckt. Und doch: Wir lesen. Mehr denn je, sagen die Verkaufszahlen, nur eben anders.',
  'Die E-Book-Edition, die einst als billiges Nebenprodukt des Drucks galt, ist erwachsen geworden. Verlage, die ihre digitale Ausgabe zuletzt wie eine Pflichtübung behandelten, setzen heute eigene Gestalter auf die leuchtende Seite an. Denn der Bildschirm verzeiht nichts: Er zeigt jede lieblose Trennung, jede falsch gesetzte Ligatur in gleißender Schärfe.',
  'Was sich verändert hat, ist nicht das Lesen selbst, sondern die Bühne, auf der es stattfindet. Der Leser sitzt nicht mehr im Sessel neben der Stehlampe; er liest im Zug, im Wartezimmer, im Bett mit abgedunkeltem Display. Der Text muss diesen Orten standhalten — und die Typografie muss es ihm ermöglichen.',
]

const FREE_PARAGRAPHS_AFTER_QUOTE = [
  'Vielleicht ist das die eigentliche Pointe dieser Entwicklung: Das digitale Buch hat den gedruckten Band nicht verdrängt, es hat ihn unter Zugzwang gesetzt. Seit es leuchtende Seiten gibt, müssen Papierseiten ihre Existenz rechtfertigen — mit Haptik, mit Satzspiegel, mit der Schwerkraft eines gut gebundenen Blocks. Die Antwort der Verlage fällt erstaunlich oft gleich aus: schöner werden.',
  'Und so entsteht eine merkwürdige Konkurrenz der Aufmerksamkeiten. Wer auf dem Bildschirm liest, erwartet Geschwindigkeit und Verfügbarkeit; wer zum Buch greift, erwartet Dauer. Die besten Editionen unserer Zeit liefern beides — denselben Text, zweimal gedacht, zweimal gesetzt, zweimal ernst genommen.',
]

const LOCKED_PARAGRAPHS = [
  'Die Typografie des leuchtenden Buches folgt eigenen Gesetzen. Wo der Bleisatz mit festen Keilen arbeitete, rechnet der Renderer in Bruchteilen von Pixeln; wo der Setzer ein für alle Mal entschied, entscheidet nun ein Algorithmus bei jedem Umbruch neu. Variable Schriften versprechen, diese Unschärfe zu bändigen: Eine einzige Datei, die sich der Zeilenlänge, der Helligkeit des Raums, selbst der Sehstärke des Lesers anpasst. Doch die Praxis hinkt dem Versprechen hinterher — die meisten Lesegeräte ignorieren, was die Schrift könnte, und setzen sie, wie sie es immer taten: mit dem Mut der Standardkonfiguration.',
  'Hinzu kommt die Ökonomie der Aufmerksamkeit. Der digitale Text konkurriert nicht mit anderen Büchern, sondern mit allem: mit Nachrichten, mit Spielen, mit dem kleinen roten Zähler in der Ecke des Bildschirms. Verlage antworten darauf mit Kürze — kürzere Kapitel, kürzere Absätze, kürzere Sätze. Es ist eine Ironie der Gattungsgeschichte, dass ausgerechnet das Buch, das einst die Langsamkeit erfand, nun lernt, sich zu beeilen.',
  'Dabei zeigt die Forschung ein differenzierteres Bild. Lesestudien der letzten Jahre legen nahe, dass es weniger das Medium ist, das das Verständnis formt, als die Haltung, mit der gelesen wird. Wer den Bildschirm als Ort des Scannens gelernt hat, scannt auch das Buch darauf; wer ihn als Ort der Lektüre beansprucht, liest darauf so tief wie auf Papier. Das Gerät ist unschuldig — die Gewohnheit ist es nicht.',
  'Was bleibt, ist eine doppelte Verantwortung. Die Gestaltung digitaler Editionen muss die Ungeduld des Mediums respektieren, ohne sich ihr zu ergeben; sie muss Einladung und Wehr zugleich sein. Vielleicht wird man eines Tages sagen, das leuchtende Buch habe das gedruckte gerettet — nicht indem es es ersetzte, sondern indem es es zwang, sich an seine eigenen Stärken zu erinnern.',
]

const BLUR_TARGETS = [2, 6, 10, 14]

/** GSAP-isolated scroll-coupled blur zone (no Framer Motion inside). */
function BlurGateText() {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    const ctx = gsap.context(() => {
      const paragraphs = gsap.utils.toArray<HTMLElement>('[data-blur-p]', root)
      paragraphs.forEach((p, i) => {
        const target = BLUR_TARGETS[Math.min(i, BLUR_TARGETS.length - 1)]
        gsap.fromTo(
          p,
          { filter: 'blur(0px)', opacity: 1 },
          {
            filter: `blur(${target}px)`,
            opacity: Math.max(0.25, 1 - i * 0.22),
            ease: 'none',
            scrollTrigger: {
              trigger: p,
              start: 'top 80%',
              end: 'top 50%',
              scrub: true,
            },
          },
        )
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none select-none [mask-image:linear-gradient(to_bottom,black,black_30%,transparent_92%)]"
    >
      {LOCKED_PARAGRAPHS.map((text, i) => (
        <p
          key={i}
          data-blur-p
          className="mt-8 font-body text-[17px] leading-[1.75] text-ink md:text-[19px]"
        >
          {text}
        </p>
      ))}
      <div className="h-[420px]" />
    </div>
  )
}

function MeteredBar() {
  return (
    <motion.div
      initial={{ y: '-100%' }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
      className="sticky top-[72px] z-40 border-b border-line bg-paper-deep"
    >
      <div className="mx-auto flex h-10 max-w-site items-center justify-between gap-4 px-6 lg:px-12">
        <div className="flex min-w-0 items-center gap-3">
          <span className="hidden font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint sm:inline">
            Leseprobe
          </span>
          <span className="truncate font-sans text-[12px] text-ink-soft">
            Sie lesen Artikel 2 von 3 kostenlosen Artikeln diesen Monat
          </span>
          <span className="flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 + 0.2 * i, duration: 0.35, ease: EASE }}
                className={
                  i < 2
                    ? 'h-2 w-2 rounded-full bg-cinnabar'
                    : 'h-2 w-2 rounded-full border border-cinnabar bg-transparent'
                }
              />
            ))}
          </span>
        </div>
        <Link
          to="/abo"
          className="flex shrink-0 items-center gap-1 font-sans text-[12px] font-semibold text-cinnabar transition-colors hover:text-cinnabar-deep"
        >
          Unbegrenzt lesen
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </motion.div>
  )
}

export default function ArticleMetered() {
  return (
    <article className="paper-texture">
      <MeteredBar />

      {/* Section 2 — Artikelkopf & freier Text */}
      <header className="mx-auto max-w-article px-6 pt-16 lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex items-center gap-4"
        >
          <span className="kicker">Leseprobe · Essay</span>
          <span className="badge-free">Frei lesbar</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
          className="mt-6 font-display text-4xl font-semibold leading-[1.08] text-ink md:text-[60px]"
        >
          Warum wir Bücher anders lesen, seit sie leuchten
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 font-sans text-[13px] tracking-wide text-ink-faint"
        >
          Von der Sajon Redaktion · 3. November 2025 · 12 Min. Lesezeit
        </motion.p>

        <motion.figure
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: EASE }}
          className="mt-12"
        >
          <img
            src="/article-hero-metered.png"
            alt="Offenes Buch auf einem Holztisch neben einer Kaffeetasse"
            className="w-full border border-line object-cover"
          />
          <figcaption className="mt-3 font-sans text-[13px] italic text-ink-faint">
            Das leuchtende Buch neben seinem gedruckten Vorfahren. Foto: Sajon Archiv.
          </figcaption>
        </motion.figure>
      </header>

      <div className="mx-auto max-w-article px-6 pt-14">
        {FREE_PARAGRAPHS_BEFORE_QUOTE.map((text, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.1 * i, ease: EASE }}
            className={
              (i === 0 ? 'drop-cap ' : '') +
              'mt-8 font-body text-[17px] leading-[1.75] text-ink first:mt-0 md:text-[19px]'
            }
          >
            {text}
          </motion.p>
        ))}

        {/* Pull quote */}
        <div className="my-14">
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="h-px origin-left bg-line"
          />
          <motion.blockquote
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="px-6 py-10 text-center font-display text-2xl font-medium italic leading-snug text-ink md:text-[30px]"
          >
            „Der Bildschirm hat das Buch nicht verdrängt — er hat es herausgefordert, schöner zu
            werden.“
          </motion.blockquote>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="h-px origin-right bg-line"
          />
        </div>

        <motion.h3
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="font-display text-[26px] font-semibold italic text-ink"
        >
          I. Die Seite ohne Papier
        </motion.h3>

        {FREE_PARAGRAPHS_AFTER_QUOTE.map((text, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, delay: 0.1 * i, ease: EASE }}
            className="mt-8 font-body text-[17px] leading-[1.75] text-ink md:text-[19px]"
          >
            {text}
          </motion.p>
        ))}
      </div>

      {/* Section 3 — Blur-Gate */}
      <div className="relative mx-auto max-w-article px-6 pt-6">
        <BlurGateText />

        {/* Floating CTA card over the blur zone */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="pointer-events-none absolute inset-x-0 top-[260px] z-10 flex justify-center px-6"
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="pointer-events-auto w-full max-w-[480px] rounded-[2px] border border-line bg-paper p-8 shadow-[0_32px_64px_-24px_rgb(26_23_18/0.35)]"
          >
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-cinnabar">
              Hier endet die Leseprobe
            </p>
            <h2 className="mt-3 font-display text-[28px] font-semibold leading-tight text-ink">
              Lesen Sie weiter mit Sajon Zugang.
            </h2>
            <p className="mt-3 font-body text-[15px] leading-relaxed text-ink-soft">
              Dieser Essay und das gesamte Archiv — E-Books, Editionen, Fachartikel.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                href={STRIPE_LINKS.monat}
                target="_blank"
                rel="noopener"
                className="btn-accent flex-1 !px-5 !py-3.5 text-[13px]"
              >
                CHF 9 / Monat
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                href={STRIPE_LINKS.einmal}
                target="_blank"
                rel="noopener"
                className="btn-ghost flex-1 !px-5 !py-3.5 text-[13px]"
              >
                Einmalig CHF 19
              </motion.a>
            </div>
            <a
              href={STRIPE_LINKS.jahr}
              target="_blank"
              rel="noopener"
              className="mt-4 inline-block font-sans text-[13px] font-medium text-cinnabar underline decoration-cinnabar/40 underline-offset-4 transition-colors hover:text-cinnabar-deep"
            >
              oder Jahres-Abo CHF 79 — 2 Monate geschenkt →
            </a>
            <p className="mt-6 flex items-center gap-2 font-sans text-[11px] text-ink-faint">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-gold" />
              Stripe Testmodus · keine Abbuchung
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Section 4 — Weiterführende Titel */}
      <section className="mx-auto max-w-article px-6 pb-24 pt-32">
        <h2 className="font-display text-[32px] font-semibold text-ink">Weiterlesen</h2>
        <div className="mt-8 border-t border-line">
          {[
            {
              title: 'Handschrift, Rotstift, Setzmaschine — eine Werkstattgeschichte',
              rubrik: 'Leseprobe · Essay',
              time: '9 Min.',
              to: '/leseprobe',
              free: true,
            },
            {
              title: 'Die unsichtbare Ordnung — Mikrotypografie in akademischen Editionen',
              rubrik: 'Premium · Fachartikel',
              time: '18 Min.',
              to: '/artikel/hard',
              free: false,
            },
            {
              title: 'Vom Bleisatz zum Variablensatz — eine Technikgeschichte',
              rubrik: 'Premium · Fachartikel',
              time: '14 Min.',
              to: '/artikel/hard',
              free: false,
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.1 * i, ease: EASE }}
              className="border-b border-line"
            >
              <Link
                to={item.to}
                className="group flex items-center justify-between gap-6 py-6 transition-transform duration-300 ease-editorial hover:translate-x-2"
              >
                <div>
                  <p className="flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-faint">
                    {item.rubrik}
                    {!item.free && <Lock className="h-3 w-3 text-cinnabar" />}
                  </p>
                  <h3 className="mt-2 font-display text-[21px] font-semibold leading-snug text-ink">
                    {item.title}
                  </h3>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <span className="hidden font-sans text-[13px] text-ink-faint sm:inline">
                    {item.time}
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-ink-faint transition-colors duration-300 group-hover:text-cinnabar" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </article>
  )
}
