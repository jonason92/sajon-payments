import { Link } from 'react-router'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper-deep">
      <div className="mx-auto max-w-site px-6 pb-12 pt-24 lg:px-12">
        <p className="max-w-3xl font-display text-[28px] font-medium italic leading-snug text-ink">
          „Wissenschaft verdient schönes Setzen.“
        </p>

        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {/* Verlag */}
          <div>
            <span className="font-display text-2xl font-bold tracking-[0.3em] text-ink">SAJON</span>
            <p className="mt-1 font-sans text-[9px] font-medium uppercase tracking-[0.35em] text-ink-faint">
              Publishing · Bern
            </p>
            <address className="mt-6 font-body text-[15px] not-italic leading-relaxed text-ink-soft">
              Sajon GmbH · Sajon Publishing
              <br />
              Klösterlistutz 18A
              <br />
              3013 Bern
            </address>
            <p className="mt-4 font-sans text-[11px] leading-relaxed text-ink-faint">
              Eine Sparte der Sajon GmbH — neben Jonason Spiritual Science Bridge, sajonDocs,
              Sajon Bibliotheks- &amp; Archivplattform und Sajon Lebende Bücher.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-ink-faint">
              Navigation
            </h3>
            <ul className="mt-6 space-y-3 font-sans text-[13px] font-medium uppercase tracking-[0.1em]">
              {[
                { label: 'Katalog', to: '/' },
                { label: 'Hard Paywall', to: '/artikel/hard' },
                { label: 'Metered', to: '/artikel/metered' },
                { label: 'Leseprobe', to: '/leseprobe' },
                { label: 'Abo', to: '/abo' },
              ].map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-ink-soft transition-colors hover:text-cinnabar">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Rechtliches */}
          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-[0.22em] text-ink-faint">
              Rechtliches
            </h3>
            <ul className="mt-6 space-y-3 font-sans text-[13px] font-medium uppercase tracking-[0.1em]">
              {['AGB', 'Datenschutz', 'Impressum'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-ink-soft transition-colors hover:text-cinnabar">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
          <p className="flex items-center gap-3 font-sans text-[13px] text-ink-faint">
            <span className="badge-testmode">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-gold" />
              Testmodus
            </span>
            Zahlungen laufen über Stripe im Testmodus — es wird nichts abgebucht.
          </p>
          <p className="font-sans text-[13px] text-ink-faint">© 2025 Sajon Publishing</p>
        </div>
      </div>
    </footer>
  )
}
