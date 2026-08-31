import { Link } from 'react-router'
import { CheckCircle2 } from 'lucide-react'

export default function Danke() {
  return (
    <div className="mx-auto max-w-[720px] px-6 py-24 text-center lg:py-32">
      <CheckCircle2 className="mx-auto h-10 w-10 text-cinnabar" />
      <p className="kicker mt-8">Bestellung bestätigt</p>
      <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink lg:text-5xl">
        Danke für Ihren Kauf.
      </h1>
      <p className="mx-auto mt-6 max-w-[520px] font-body text-lg leading-relaxed text-ink-soft">
        Ihre Zahlung wurde über Stripe entgegengenommen. Der Zugang wird automatisch
        mit Ihrem Konto verknüpft — verwenden Sie dazu beim Anmelden dieselbe
        E-Mail-Adresse wie beim Kauf.
      </p>

      <div className="mx-auto mt-12 max-w-[520px] border border-line bg-paper-deep/50 px-8 py-8 text-left">
        <h2 className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-ink-faint">
          So geht es weiter
        </h2>
        <ol className="mt-4 space-y-3 font-body text-[15px] leading-relaxed text-ink-soft">
          <li className="flex gap-3">
            <span className="font-display italic text-cinnabar">1.</span>
            Zahlungsbestätigung von Stripe per E-Mail prüfen
          </li>
          <li className="flex gap-3">
            <span className="font-display italic text-cinnabar">2.</span>
            Im Konto anmelden — die freigeschalteten Titel erscheinen unter „Meine Titel“
          </li>
          <li className="flex gap-3">
            <span className="font-display italic text-cinnabar">3.</span>
            Lesen im Browser oder Download als EPUB / PDF
          </li>
        </ol>
      </div>

      <div className="mt-12 flex flex-col items-center gap-4">
        <Link to="/konto" className="btn-primary">
          Zu meinem Konto
        </Link>
        <p className="flex items-center gap-3 font-sans text-[13px] text-ink-faint">
          <span className="badge-testmode">
            <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-gold" />
            Stripe Testmodus
          </span>
          Es wurde nichts abgebucht.
        </p>
      </div>
    </div>
  )
}
