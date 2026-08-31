import { Navigate } from 'react-router'
import { useAuth } from '@/hooks/useAuth'
import { LOGIN_PATH } from '@/const'
import { BookOpen, CreditCard, Receipt } from 'lucide-react'

const sections = [
  {
    icon: BookOpen,
    title: 'Meine Titel',
    text: 'Freigeschaltete E-Books und Artikel erscheinen hier — folgt mit dem Inhaltsmodell.',
  },
  {
    icon: CreditCard,
    title: 'Abo-Status',
    text: 'Aktiver Zugang und Laufzeit — folgt mit der Stripe-Verknüpfung.',
  },
  {
    icon: Receipt,
    title: 'Kaufhistorie',
    text: 'Belege und vergangene Käufe — folgt mit dem Konto-Dashboard.',
  },
]

export default function Konto() {
  const { user, isLoading, logout } = useAuth()

  if (isLoading) {
    return (
      <div className="mx-auto max-w-[720px] px-6 py-32">
        <div className="h-8 w-48 animate-pulse bg-paper-deep" />
        <div className="mt-6 h-4 w-72 animate-pulse bg-paper-deep" />
      </div>
    )
  }

  if (!user) {
    return <Navigate to={LOGIN_PATH} replace />
  }

  return (
    <div className="mx-auto max-w-[720px] px-6 py-24 lg:py-32">
      <p className="kicker">Mitgliederbereich</p>
      <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-ink lg:text-5xl">
        Mein Konto
      </h1>
      <p className="mt-6 font-body text-lg leading-relaxed text-ink-soft">
        Willkommen, {user.name ?? 'Leserin oder Leser'}
        {user.email ? ` (${user.email})` : ''}. Dieser Bereich entsteht schrittweise —
        der Login funktioniert bereits, die nächsten Module folgen nach Freigabe.
      </p>

      <div className="mt-16 space-y-px border border-line">
        {sections.map((s) => (
          <div
            key={s.title}
            className="flex items-start gap-6 bg-paper-deep/50 px-8 py-8"
          >
            <s.icon className="mt-1 h-5 w-5 shrink-0 text-cinnabar" />
            <div>
              <h2 className="font-display text-xl font-semibold text-ink">{s.title}</h2>
              <p className="mt-2 font-sans text-sm leading-relaxed text-ink-faint">
                {s.text}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => logout()}
        className="btn-ghost mt-12 cursor-pointer"
      >
        Abmelden
      </button>
    </div>
  )
}
