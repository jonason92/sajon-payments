import { useRef } from 'react'
import { Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { STRIPE_LINKS } from '@/lib/stripe'

gsap.registerPlugin(ScrollTrigger)

const EASE = 'power4.out'

function Fleuron({ className = '' }: { className?: string }) {
  return (
    <div className={`js-fleuron flex items-center justify-center gap-6 py-10 ${className}`}>
      <span className="h-px w-16 bg-line" />
      <span className="font-display text-2xl leading-none text-gold">❧</span>
      <span className="h-px w-16 bg-line" />
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* Lesefortschritt                                                     */
/* ------------------------------------------------------------------ */
function ProgressBar() {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    gsap.fromTo(
      ref.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      },
    )
  })

  return (
    <div
      ref={ref}
      className="fixed inset-x-0 top-0 z-[55] h-0.5 origin-left bg-cinnabar"
      aria-hidden="true"
    />
  )
}

/* ------------------------------------------------------------------ */
/* Section 1 — Reader-Kopf                                             */
/* ------------------------------------------------------------------ */
function ReaderHead() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: EASE } })
      tl.fromTo(
        '.js-head-fade',
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 },
      )
        .fromTo(
          '.js-hero-img',
          { clipPath: 'inset(0 0 100% 0)' },
          { clipPath: 'inset(0 0 0% 0)', duration: 1.2, ease: 'power3.inOut' },
          0.3,
        )
        .fromTo(
          '.js-cover',
          { x: 80, rotate: 4, opacity: 0 },
          { x: 0, rotate: 0, opacity: 1, duration: 1 },
          0.6,
        )
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="mx-auto max-w-article px-6 pt-16 lg:pt-24">
      <div className="js-head-fade flex flex-wrap items-center gap-3">
        <span className="badge-free">Leseprobe · Kostenlos</span>
        <span className="font-sans text-[11px] font-medium uppercase tracking-[0.22em] text-ink-faint">
          Essay-Band „Leseproben & Essays“
        </span>
      </div>

      <h1 className="js-head-fade mt-8 font-display text-4xl font-semibold leading-[1.05] text-ink lg:text-[64px]">
        Vom Setzen und Sammeln — eine kurze Geschichte des Verlegens
      </h1>

      <p className="js-head-fade mt-6 font-sans text-[13px] text-ink-faint">
        Sajon Redaktion · Kapitel 1 von 12 · 9 Min. Lesezeit
      </p>

      {/* Cover-Kombi */}
      <div className="relative mt-12">
        <figure className="js-hero-img">
          <img
            src="/leseprobe-hero.png"
            alt="Handschriftliches Manuskript mit Rotstift-Korrekturen"
            className="aspect-[21/9] w-full object-cover"
          />
        </figure>
        <motion.img
          src="/cover-leseprobe.png"
          alt="Cover: Leseproben & Essays"
          className="js-cover absolute -bottom-10 left-6 w-[120px] border border-line shadow-[0_16px_32px_-16px_rgb(26_23_18/0.45)] lg:-left-10"
          whileHover={{ rotate: -2, scale: 1.03 }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <p className="mt-14 pl-6 font-sans text-[13px] italic leading-relaxed text-ink-faint lg:pl-0 lg:text-right">
        Werkstatt-Spuren: Ein Manuskript aus dem Sajon-Lektorat, vor dem letzten Satz.
      </p>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Section 2 — Volltext                                                */
/* ------------------------------------------------------------------ */
function ChapterHeading({ children }: { children: string }) {
  return (
    <h2 className="js-para mt-16 font-display text-2xl font-semibold italic text-ink lg:text-[26px]">
      {children}
    </h2>
  )
}

function Body() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>('.js-para').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: EASE,
            scrollTrigger: { trigger: el, start: 'top 88%' },
          },
        )
      })
      // Marginalie: Linie, dann Text
      const tl = gsap.timeline({
        scrollTrigger: { trigger: '.js-marginalia', start: 'top 80%' },
      })
      tl.fromTo('.js-marg-line', { scaleX: 0 }, { scaleX: 1, duration: 0.6, ease: 'power3.inOut' }).fromTo(
        '.js-marg-text',
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.5, ease: EASE },
        '-=0.1',
      )
    },
    { scope: ref },
  )

  const p = 'js-para mt-8 font-body text-[17px] leading-[1.75] text-ink lg:text-[19px]'

  return (
    <section ref={ref} className="mx-auto max-w-article px-6">
      <p className={`${p} drop-cap mt-14`}>
        Geschrieben steht viel über das Verlegen — und doch beginnt jede Geschichte des
        Buchmachens an derselben Stelle: in der Werkstatt. Bevor ein Text Leserinnen und
        Leser findet, muss er Gestalt annehmen, Seite für Seite, Zeile für Zeile. Das
        Setzen ist dabei kein blosses Handwerk neben dem eigentlichen Werk; es ist die
        erste Lektüre, die ein Text erfährt — langsam, aufmerksam, unbestechlich.
      </p>

      <ChapterHeading>I. Die Werkstatt</ChapterHeading>
      <p className={p}>
        In den Setzereien des neunzehnten Jahrhunderts stand das Blei in Kästen, und jede
        Lette hatte ihren Platz. Wer setzte, las mit den Fingern. Der Satz entstand
        rückwärts und spiegelverkehrt, und gerade darin lag eine Tugend: Man konnte sich
        dem Text nicht entziehen, nicht über ihn hinweggleiten. Jeder Fehler musste
        einzeln aus der Form gelöst werden — eine Schule der Genauigkeit, die Verlage
        bis heute prägt.
      </p>
      <p className={p}>
        Mit der Werkstatt wuchs das Lektorat. Aus Setzern wurden Verleger, aus Verlegern
        Vertraute der Autorinnen. Der Verlag war weniger Firma als Haushalt: Man teilte
        das Risiko eines Buches wie man ein Brot teilt, und man stritt über Kommata wie
        über Fragen des Glaubens.
        <FootnoteMark />
      </p>

      <ChapterHeading>II. Der Satzspiegel</ChapterHeading>
      <div className="relative">
        <p className={p}>
          Der Satzspiegel — jenes unsichtbare Rechteck, in dem der Text auf der Seite
          wohnt — ist die leiseste und wichtigste Entscheidung des Buchsatzes. Zu eng
          gesetzt, erstickt der Gedanke; zu grosszügig, verliert er den Zusammenhalt.
          Die alten Meister teilten die Seite in Neuntel und fanden darin ein Mass, das
          dem Auge Ruhe gibt und der Hand Raum für Notizen.
        </p>
        {/* Marginalie: Desktop rechts, Mobile inline */}
        <aside className="js-marginalia mt-6 border-l border-line pl-4 lg:absolute lg:-right-56 lg:top-2 lg:mt-0 lg:w-44 lg:border-l-0 lg:pl-0">
          <span className="js-marg-line mb-3 block h-px w-10 origin-left bg-ink-faint" />
          <p className="js-marg-text font-sans text-xs italic leading-relaxed text-ink-faint">
            Randnotiz: Die Neunteilung der Seite geht auf Jan Tschichold zurück — ein
            Erbe der mittelalterlichen Handschriften-Werkstätten.
          </p>
        </aside>
      </div>

      <blockquote className="js-para my-14 border-x border-line px-8 text-center font-display text-2xl font-medium italic leading-snug text-ink lg:text-3xl">
        „Verlegen heisst: einem Text ein Zuhause bauen.“
      </blockquote>

      <p className={p}>
        Vielleicht ist das die eigentliche Verlegerische Geste: nicht das Finden des
        Textes, nicht einmal sein Drucken, sondern das Bauen eines Ortes, an dem er
        wohnen bleiben kann. Papier, Bindung, Schrift und Weissraum sind die Zimmer
        dieses Hauses. Der Leser zieht ein, schliesst die Tür hinter sich und ist für
        eine Weile unerreichbar.
      </p>

      <Fleuron />

      <ChapterHeading>III. Das digitale Blatt</ChapterHeading>
      <p className={p}>
        Als das Buch begann, den Bildschirm zu betreten, prophezeite man seinem Satz
        ein schnelles Ende. Das Gegenteil trat ein. Die Typografie kehrte zurück —
        zunächst als Zitat, dann als Anspruch. Wer heute einen langen Text auf einem
        guten Bildschirm liest, spürt dieselben Fragen, die einst am Setzkasten
        verhandelt wurden: Zeilenlänge, Zeilenabstand, das Verhältnis von Weiss zu
        Schwarz.
      </p>
      <p className={p}>
        Der digitale Verlag hat Freiheiten gewonnen, die der Druck nie kannte: Ein Text
        kann wachsen, korrigiert werden, in Editionen erscheinen, ohne dass eine
        Druckfahne verbrannt wird. Doch die Pflicht blieb. Jedes E-Book ist ein
        Versprechen auf Haltbarkeit — und Haltbarkeit entsteht nicht aus dem Dateiformat,
        sondern aus der Sorgfalt.
      </p>
      <p className={p}>
        So schliesst sich der Kreis dieser kurzen Geschichte dort, wo sie begann: in der
        Werkstatt. Ob Bleiletter oder Zeichenfolge, ob Leinenband oder Reader — das
        Verlegen bleibt ein Handwerk der Aufmerksamkeit. Und wer einmal gesehen hat, wie
        ein gut gesetzter Satz auf der Seite steht, verzeiht dem schlechten keinen
        einzigen Grauwert mehr.
      </p>

      {/* Fußnotenzeile */}
      <div className="js-para mt-16 border-t border-line pt-6">
        <p className="font-sans text-[13px] leading-relaxed text-ink-faint">
          <sup className="mr-1 text-cinnabar">1</sup> Vgl. Altherr, J. R. (2024):
          Akademische Editionen, Sajon Publishing.
        </p>
      </div>
    </section>
  )
}

/* Footnote-Marker-Komponente (für Inline-Verwendung in Body wäre sie ideal;
   hier als Tooltip im ersten Vorkommen platziert via Body-Text ¹) */
export function FootnoteMark() {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <sup className="cursor-help font-sans text-cinnabar">1</sup>
        </TooltipTrigger>
        <TooltipContent className="max-w-[280px]">
          ¹ Vgl. Altherr, J. R. (2024): Akademische Editionen, Sajon Publishing.
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

/* ------------------------------------------------------------------ */
/* Section 3 — Soft-Upsell                                             */
/* ------------------------------------------------------------------ */
function Upsell() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { ease: EASE },
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      })
      tl.fromTo(
        '.js-up-fleuron',
        { rotate: -360, opacity: 0 },
        { rotate: 0, opacity: 1, duration: 1.2, ease: 'power2.out' },
      )
        .fromTo(
          '.js-up-box',
          { clipPath: 'inset(100% 0 0 0)' },
          { clipPath: 'inset(0% 0 0 0)', duration: 1, ease: 'power3.inOut' },
          '-=0.6',
        )
        .fromTo(
          '.js-up-btn',
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.1 },
          '-=0.4',
        )
    },
    { scope: ref },
  )

  return (
    <section ref={ref} className="mx-auto max-w-article px-6">
      <div className="js-up-fleuron">
        <Fleuron className="!py-0" />
      </div>
      <div className="js-up-box mt-10 border border-line bg-paper-deep p-10 text-center lg:p-12">
        <p className="kicker">Ende der Leseprobe — Kapitel 1 von 12</p>
        <h2 className="mt-6 font-display text-3xl font-semibold text-ink lg:text-[32px]">
          Elf weitere Kapitel warten.
        </h2>
        <p className="mx-auto mt-6 max-w-[52ch] font-body text-[15px] leading-relaxed text-ink-soft">
          Der vollständige Essay-Band ist im Sajon-Archiv enthalten — zusammen mit über
          120 Artikeln und allen E-Book-Editionen.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <motion.div whileTap={{ scale: 0.97 }} className="js-up-btn w-full sm:w-auto">
            <a
              href={STRIPE_LINKS.jahr}
              target="_blank"
              rel="noopener"
              className="btn-accent w-full sm:w-auto"
            >
              Jahres-Abo CHF 79
            </a>
          </motion.div>
          <motion.div whileTap={{ scale: 0.97 }} className="js-up-btn w-full sm:w-auto">
            <a
              href={STRIPE_LINKS.monat}
              target="_blank"
              rel="noopener"
              className="btn-ghost w-full sm:w-auto"
            >
              Monatlich CHF 9
            </a>
          </motion.div>
        </div>
        <div className="js-up-btn mt-6">
          <Link
            to="/abo"
            className="group inline-flex items-center gap-2 font-sans text-[13px] font-medium uppercase tracking-[0.1em] text-ink-soft transition-colors hover:text-cinnabar"
          >
            Alle Optionen vergleichen
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
        <p className="js-up-btn mt-8 flex items-center justify-center gap-2 font-sans text-[11px] uppercase tracking-[0.12em] text-gold">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-gold" />
          Testmodus — keine echte Abbuchung
        </p>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/* Section 4 — Nächste Leseproben                                      */
/* ------------------------------------------------------------------ */
function MoreSamples() {
  const ref = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      gsap.fromTo(
        '.js-sample',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: EASE,
          stagger: 0.1,
          scrollTrigger: { trigger: ref.current, start: 'top 85%' },
        },
      )
    },
    { scope: ref },
  )

  const samples = [
    { title: 'Die Typografie der Wissenschaft — Vorwort', meta: 'Vorwort · 6 Min. Lesezeit' },
    { title: 'Akademische Editionen — Kapitel 1', meta: 'Kapitel 1 von 9 · 11 Min. Lesezeit' },
  ]

  return (
    <section ref={ref} className="mx-auto max-w-article px-6 pb-24 pt-20 lg:pb-32">
      <h3 className="font-display text-xl font-semibold italic text-ink lg:text-[26px]">
        Weitere kostenlose Leseproben
      </h3>
      <ul className="mt-8">
        {samples.map((s) => (
          <li key={s.title} className="js-sample border-t border-line last:border-b">
            <a
              href="#"
              className="group flex items-center justify-between gap-6 py-6 transition-colors duration-300 hover:bg-paper-deep"
            >
              <div>
                <p className="font-body text-lg font-semibold text-ink transition-colors group-hover:text-cinnabar">
                  {s.title}
                </p>
                <p className="mt-1 font-sans text-[13px] text-ink-faint">{s.meta}</p>
              </div>
              <ArrowRight className="h-5 w-5 shrink-0 text-ink-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-cinnabar" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

/* ------------------------------------------------------------------ */
export default function Leseprobe() {
  return (
    <article className="pb-4">
      <ProgressBar />
      <ReaderHead />
      <Body />
      <Upsell />
      <MoreSamples />
    </article>
  )
}
