import { Link, Navigate } from 'react-router'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { trpc } from '@/providers/trpc'
import { LOGIN_PATH } from '@/const'
import { BookOpen, CreditCard, Lock, Receipt, Sparkles } from 'lucide-react'

const typeLabel = (type: string) =>
  type === 'ebook' ? 'E-Book' : type === 'artikel' ? 'Artikel' : 'Leseprobe'

const tierLabel = (tier: string) =>
  tier === 'einmal'
    ? 'Einmalzugang'
    : tier === 'monat'
      ? 'Monats-Abo'
      : 'Jahres-Abo'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
}

export default function Konto() {
  const { user, isLoading, logout } = useAuth()
  const myTitles = trpc.account.myTitles.useQuery(undefined, { enabled: !!user })
  const overview = trpc.account.myOverview.useQuery(undefined, { enabled: !!user })
  const catalog = trpc.titles.list.useQuery(undefined, { enabled: !!user })
  const purchases = trpc.purchases.mine.useQuery(undefined, { enabled: !!user })

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[960px] px-6 py-32">
        <div className="h-8 w-48 animate-pulse bg-paper-deep" />
        <div className="mt-6 h-4 w-72 animate-pulse bg-paper-deep" />
        <div className="mt-16 h-40 animate-pulse bg-paper-deep" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to={LOGIN_PATH} replace />
  }

  const titles = myTitles.data ?? []
  const entitlementsCount =
    overview.data?.entitlementsCount ?? titles.length

  return (
    <div className="mx-auto max-w-[960px] px-6 py-24 lg:py-32">
      {/* Header */}
      <p className="kicker">Mitgliederbereich</p>
      <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink lg:text-5xl">
        Mein Konto
      </h1>
      <p className="mt-6 font-body text-lg leading-relaxed text-ink-soft">
        Guten Tag, {user.name ?? 'liebe Leserin, lieber Leser'}
        {user.email ? ` — angemeldet als ${user.email}` : ''}.
        Hier finden Sie Ihre freigeschalteten Inhalte und Ihren Zugang im Überblick.
      </p>

      {/* Meine Titel */}
      <motion.section {...fadeUp} className="mt-20">
        <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
          <h2 className="flex items-center gap-3 font-display text-2xl font-semibold text-ink">
            <BookOpen className="h-5 w-5 text-cinnabar" /> Meine Titel
          </h2>
          <span className="font-sans text-xs uppercase tracking-[0.12em] text-ink-faint">
            {entitlementsCount} {entitlementsCount === 1 ? 'Titel' : 'Titel'}
          </span>
        </div>

        {myTitles.isLoading ? (
          <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[2/3] bg-paper-deep" />
                <div className="mt-5 h-6 w-3/4 bg-paper-deep" />
                <div className="mt-2 h-3 w-1/2 bg-paper-deep" />
              </div>
            ))}
          </div>
        ) : titles.length === 0 ? (
          <div className="mt-8 border border-dashed border-line bg-paper-deep/40 px-8 py-14 text-center">
            <BookOpen className="mx-auto h-8 w-8 text-ink-faint" />
            <p className="mt-5 font-display text-xl font-semibold text-ink">
              Noch keine Titel freigeschaltet
            </p>
            <p className="mx-auto mt-3 max-w-md font-body text-[15px] leading-relaxed text-ink-soft">
              Sobald Sie ein E-Book erwerben oder ein Abo abschließen, erscheinen
              Ihre Inhalte hier. Stöbern Sie doch schon einmal im Katalog.
            </p>
            <Link to="/" className="btn-primary mt-8">
              Katalog entdecken
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {titles.map((t) => (
              <Link key={t.slug} to={t.route} className="group block">
                <div className="relative border border-line bg-paper-deep transition-all duration-500 ease-editorial group-hover:-translate-y-2 group-hover:shadow-editorial">
                  {t.coverImage && (
                    <img
                      src={t.coverImage}
                      alt={`Cover: ${t.title}`}
                      className="aspect-[2/3] w-full object-cover"
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
                  {t.author} · {typeLabel(t.type)}
                </p>
              </Link>
            ))}
          </div>
        )}
      </motion.section>

      {/* Abo-Status */}
      <motion.section {...fadeUp} className="mt-20">
        <h2 className="flex items-center gap-3 border-b border-line pb-4 font-display text-2xl font-semibold text-ink">
          <CreditCard className="h-5 w-5 text-cinnabar" /> Abo-Status
        </h2>
        <div className="mt-8 border border-line bg-paper-deep/40 px-8 py-10">
          <p className="font-display text-xl font-semibold text-ink">
            Kein aktives Abo
          </p>
          <p className="mt-3 max-w-xl font-body text-[15px] leading-relaxed text-ink-soft">
            Die Verknüpfung mit Stripe folgt in einem nächsten Schritt. Sobald sie
            aktiv ist, sehen Sie hier Laufzeit, Status und Verwaltungsoptionen
            Ihres Abonnements.
          </p>
          <Link to="/abo" className="btn-ghost mt-6">
            Angebote ansehen
          </Link>
        </div>
      </motion.section>

      {/* Kaufhistorie */}
      <motion.section {...fadeUp} className="mt-20">
        <h2 className="flex items-center gap-3 border-b border-line pb-4 font-display text-2xl font-semibold text-ink">
          <Receipt className="h-5 w-5 text-cinnabar" /> Kaufhistorie
        </h2>
        {purchases.isLoading ? (
          <div className="mt-8 space-y-4">
            {[0, 1].map((i) => (
              <div key={i} className="h-14 animate-pulse bg-paper-deep" />
            ))}
          </div>
        ) : (purchases.data ?? []).length === 0 ? (
          <div className="mt-8 border border-dashed border-line bg-paper-deep/40 px-8 py-10 text-center">
            <Receipt className="mx-auto h-7 w-7 text-ink-faint" />
            <p className="mt-4 font-display text-xl font-semibold text-ink">
              Noch keine Käufe
            </p>
            <p className="mx-auto mt-2 max-w-md font-body text-[15px] leading-relaxed text-ink-soft">
              Zahlungen laufen derzeit über Stripe im Testmodus. Ihre Belege
              erscheinen hier automatisch, sobald der Webhook aktiv ist.
            </p>
          </div>
        ) : (
          <ul className="mt-6 divide-y divide-line border-b border-line">
            {(purchases.data ?? []).map((p) => (
              <li key={p.id} className="flex items-center justify-between gap-6 py-5">
                <div>
                  <p className="font-display text-lg font-semibold text-ink">
                    {tierLabel(p.tier)}
                  </p>
                  <p className="mt-1 font-sans text-xs uppercase tracking-[0.12em] text-ink-faint">
                    {new Date(p.createdAt).toLocaleDateString('de-CH')} ·{' '}
                    {p.status === 'bezahlt' ? 'Bezahlt' : p.status === 'storniert' ? 'Storniert' : 'Erstattet'}
                  </p>
                </div>
                {p.amount != null && (
                  <p className="font-body text-[15px] font-semibold text-ink">
                    {(p.amount / 100).toFixed(2)} {p.currency?.toUpperCase() ?? 'CHF'}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </motion.section>

      {/* Entdecken */}
      <motion.section {...fadeUp} className="mt-20">
        <h2 className="flex items-center gap-3 border-b border-line pb-4 font-display text-2xl font-semibold text-ink">
          <Sparkles className="h-5 w-5 text-cinnabar" /> Entdecken
        </h2>
        {catalog.isLoading ? (
          <div className="mt-8 space-y-4">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-14 animate-pulse bg-paper-deep" />
            ))}
          </div>
        ) : !catalog.data || catalog.data.length === 0 ? (
          <p className="mt-8 font-body text-[15px] italic leading-relaxed text-ink-soft">
            Der Katalog wird gerade befüllt — schauen Sie bald wieder vorbei.
          </p>
        ) : (
          <ul className="mt-6 divide-y divide-line border-b border-line">
            {catalog.data.map((t) => (
              <li key={t.slug}>
                <Link
                  to={t.route}
                  className="group flex items-center justify-between gap-6 py-5"
                >
                  <div className="min-w-0">
                    <p className="truncate font-display text-lg font-semibold text-ink transition-colors duration-300 group-hover:text-cinnabar">
                      {t.title}
                    </p>
                    <p className="mt-1 font-sans text-xs uppercase tracking-[0.12em] text-ink-faint">
                      {typeLabel(t.type)} · {t.author}
                    </p>
                  </div>
                  {t.premium ? (
                    <span className="badge-premium shrink-0">
                      <Lock className="h-3 w-3" /> Premium
                    </span>
                  ) : (
                    <span className="badge-free shrink-0">Frei</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </motion.section>

      <button
        type="button"
        onClick={() => logout()}
        className="btn-ghost mt-16 cursor-pointer"
      >
        Abmelden
      </button>
    </div>
  )
}
