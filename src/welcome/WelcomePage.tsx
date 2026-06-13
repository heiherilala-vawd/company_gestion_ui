import { useState, useCallback, useRef } from 'react'
import { useLogin } from 'react-admin'
import { useNavigate, Navigate } from 'react-router-dom'
import './WelcomePage.css'

/* ------------------------------------------------------------------ */
/*  SVG icons                                                         */
/* ------------------------------------------------------------------ */

const LogoIcon = () => (
  <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" y="2" width="28" height="28" rx="6" stroke="currentColor" strokeWidth="2.5" />
    <path
      d="M10 16l4 4 8-8"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const FinanceIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M12 8v8M9 11h4.5a1.5 1.5 0 010 3H9"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const StockIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M3 7l9-4 9 4-9 4-9-4z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 7v10l9 4V11M21 7v10l-9 4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const HrIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="9" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M3 19v-1a5 5 0 015-5h2a5 5 0 015 5v1"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M16 8l2 2 4-4"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

const ReportsIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="4" width="16" height="16" rx="2" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8 16V8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M12 16v-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M16 16v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
)

/* ------------------------------------------------------------------ */
/*  Feature data                                                      */
/* ------------------------------------------------------------------ */

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
}

const features: Feature[] = [
  {
    icon: <FinanceIcon />,
    title: 'Finance & Comptabilité',
    description:
      'Suivez dépenses, revenus, achats, prêts et trésorerie. Gérez vos flux financiers avec des rapports clairs et une visibilité en temps réel.',
  },
  {
    icon: <StockIcon />,
    title: 'Gestion de Stock',
    description:
      'Administrez vos entrepôts, matériaux, équipements et véhicules. Suivi des mouvements, consommations et inventaires.',
  },
  {
    icon: <HrIcon />,
    title: 'Ressources Humaines',
    description:
      'Gérez les congés, les paies, les tâches et les équipes. Planifiez et suivez les activités de vos collaborateurs.',
  },
  {
    icon: <ReportsIcon />,
    title: 'Rapports & Analyses',
    description:
      'Tableaux de bord interactifs, rapports annuels et indicateurs clés pour piloter votre entreprise avec confiance.',
  },
]

/* ------------------------------------------------------------------ */
/*  Login Modal sub-component                                         */
/* ------------------------------------------------------------------ */

interface LoginModalProps {
  onClose: () => void
}

const LoginModal = ({ onClose }: LoginModalProps) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const login = useLogin()
  const navigate = useNavigate()
  const emailRef = useRef<HTMLInputElement>(null)

  const handleOverlayClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) onClose()
    },
    [onClose],
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      await login({ username: email, password }, '/company')
    } catch (err: unknown) {
      const message =
        typeof err === 'string'
          ? err
          : err instanceof Error
            ? err.message
            : 'Email ou mot de passe incorrect.'
      setError(message)
      setLoading(false)
      emailRef.current?.focus()
    }
  }

  return (
    <div
      className="wp-modal-overlay"
      onClick={handleOverlayClick}
      onKeyDown={() => {}}
      role="presentation"
    >
      <div className="wp-modal" role="dialog" aria-modal="true" aria-label="Connexion">
        <button className="wp-modal__close" onClick={onClose} aria-label="Fermer" type="button">
          &times;
        </button>

        <div className="wp-modal__header">
          <div className="wp-modal__logo">
            <LogoIcon />
          </div>
          <h2 className="wp-modal__title">Bienvenue</h2>
          <p className="wp-modal__subtitle">Connectez-vous à votre compte GestPro</p>
        </div>

        <form className="wp-modal__form" onSubmit={handleSubmit} noValidate>
          {error && <div className="wp-modal__error">{error}</div>}

          <div className="wp-modal__field">
            <label htmlFor="wp-email">Adresse email</label>
            <input
              ref={emailRef}
              id="wp-email"
              type="email"
              placeholder="vous@exemple.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              autoFocus
              required
            />
          </div>

          <div className="wp-modal__field">
            <label htmlFor="wp-password">Mot de passe</label>
            <input
              id="wp-password"
              type="password"
              placeholder="Votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <button className="wp-modal__submit" type="submit" disabled={loading}>
            {loading ? (
              <>
                <span className="wp-spinner" />
                Connexion…
              </>
            ) : (
              'Se connecter'
            )}
          </button>
        </form>

        <div className="wp-modal__footer">
          <button
            type="button"
            onClick={() => {
              onClose()
              navigate('/register')
            }}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: '0.875rem',
              fontWeight: 500,
              color: 'var(--wp-accent)',
            }}
          >
            Pas encore de compte ? Créez-en un
          </button>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main WelcomePage                                                  */
/* ------------------------------------------------------------------ */

export const WelcomePage = () => {
  const [showLogin, setShowLogin] = useState(false)
  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  if (token) {
    return <Navigate to="/jobs" replace />
  }

  return (
    <div className="welcome-page">
      {/* ----- Nav ----- */}
      <nav className="welcome-nav" role="navigation" aria-label="Navigation principale">
        <div className="wp-container welcome-nav__inner">
          <div className="welcome-nav__logo">
            <LogoIcon />
            GestPro
          </div>
          <div className="welcome-nav__actions">
            <button className="wp-btn-ghost" type="button" onClick={() => setShowLogin(true)}>
              Se connecter
            </button>
            <button className="wp-btn-primary" type="button" onClick={() => navigate('/register')}>
              S&rsquo;inscrire
            </button>
          </div>
        </div>
      </nav>

      {/* ----- Hero ----- */}
      <section className="welcome-hero" aria-label="Présentation">
        <div className="welcome-hero__grid" aria-hidden="true" />
        <div className="welcome-hero__blob welcome-hero__blob--green" aria-hidden="true" />
        <div className="welcome-hero__blob welcome-hero__blob--blue" aria-hidden="true" />
        <div className="welcome-hero__blob welcome-hero__blob--small" aria-hidden="true" />

        <div className="welcome-hero__content">
          <div className="welcome-hero__badge">
            <span className="welcome-hero__badge-dot" />
            Solution tout-en-un
          </div>

          <h1 className="welcome-hero__title">
            Gérez votre entreprise
            <br />
            en toute simplicité
          </h1>

          <p className="welcome-hero__subtitle">
            GestPro réunit la gestion financière, le suivi de stock, les ressources humaines et les
            rapports analytiques dans une seule plateforme conçue pour les PME.
          </p>

          <div className="welcome-hero__ctas">
            <button
              className="wp-btn-hero-primary"
              type="button"
              onClick={() => setShowLogin(true)}
            >
              Commencer
            </button>
            <a className="wp-btn-hero-secondary" href="#features">
              En savoir plus
            </a>
          </div>
        </div>

        <div className="welcome-scroll" aria-hidden="true">
          <span>Découvrir</span>
          <div className="welcome-scroll__line" />
        </div>
      </section>

      {/* ----- Features ----- */}
      <section className="welcome-features" id="features" aria-label="Fonctionnalités">
        <div className="wp-container">
          <div className="welcome-features__header">
            <span className="welcome-features__label">Fonctionnalités</span>
            <h2 className="welcome-features__title">Tout ce dont vous avez besoin</h2>
            <p className="welcome-features__desc">
              Une plateforme complète pour centraliser et simplifier la gestion de votre entreprise
              au quotidien.
            </p>
          </div>

          <div className="welcome-features__grid">
            {features.map((f) => (
              <article key={f.title} className="wp-feature-card">
                <div className="wp-feature-card__icon">{f.icon}</div>
                <h3 className="wp-feature-card__title">{f.title}</h3>
                <p className="wp-feature-card__desc">{f.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ----- Stats ----- */}
      <section className="welcome-stats" aria-label="Statistiques">
        <div className="welcome-stats__grid">
          {[
            { number: '4', label: 'Modules intégrés' },
            { number: '30+', label: 'Entités de gestion' },
            { number: '100%', label: 'Sécurisé' },
            { number: '24/7', label: 'Disponible' },
          ].map((s) => (
            <div key={s.label} className="wp-stat">
              <div className="wp-stat__number">{s.number}</div>
              <div className="wp-stat__label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ----- CTA ----- */}
      <section className="welcome-cta" aria-label="Appel à l'action">
        <div className="wp-container">
          <div className="welcome-cta__card">
            <h2 className="welcome-cta__title">Prêt à moderniser votre gestion ?</h2>
            <p className="welcome-cta__desc">
              Rejoignez les entreprises qui font confiance à GestPro pour piloter leurs opérations
              au quotidien.
            </p>
            <button type="button" onClick={() => navigate('/register')}>
              Créer un compte gratuit
            </button>
            <p className="welcome-cta__footnote">Aucune carte bancaire requise</p>
          </div>
        </div>
      </section>

      {/* ----- Footer ----- */}
      <footer className="welcome-footer">
        <div className="welcome-footer__inner">
          <div className="welcome-footer__brand">
            <LogoIcon />
            GestPro
          </div>
          <p className="welcome-footer__copy">
            &copy; {new Date().getFullYear()} GestPro. Tous droits réservés.
          </p>
          <div className="welcome-footer__links">
            <a href="#features">Fonctionnalités</a>
            <a href="mailto:contact@gestpro.app">Contact</a>
          </div>
        </div>
      </footer>

      {/* ----- Login Modal ----- */}
      {showLogin && <LoginModal onClose={() => setShowLogin(false)} />}
    </div>
  )
}

export default WelcomePage
