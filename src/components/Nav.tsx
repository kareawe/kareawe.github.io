import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'

const links = [
  { to: '/', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/resume', label: 'Resume' },
  { to: '/contact', label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const onDark = !scrolled

  const linkStyle = ({ isActive }: { isActive: boolean }) => ({
    fontSize: '0.9rem',
    fontWeight: 500,
    color: isActive
      ? onDark
        ? '#ffffff'
        : 'var(--text)'
      : onDark
        ? 'rgba(238,241,247,0.62)'
        : 'var(--text-muted)',
    padding: '0.3rem 0',
    borderBottom: `2px solid ${isActive ? (onDark ? '#88abff' : 'var(--accent)') : 'transparent'}`,
    transition: 'color 0.2s ease',
  })

  return (
    <header
      className="site-header"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 64,
        display: 'flex',
        alignItems: 'center',
        background: scrolled ? 'color-mix(in srgb, var(--bg) 82%, transparent)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'var(--border)' : 'transparent'}`,
        transition: 'background 0.3s ease, border-color 0.3s ease',
      }}
    >
      <div
        className="container"
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <NavLink
          to="/"
          onClick={() => setMenuOpen(false)}
          style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}
        >
          <span
            style={{
              fontWeight: 700,
              fontSize: '1.05rem',
              letterSpacing: '-0.02em',
              color: onDark ? '#eef1f7' : 'var(--text)',
              transition: 'color 0.2s ease',
            }}
          >
            김민재
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: onDark ? 'rgba(238,241,247,0.55)' : 'var(--text-faint)',
              transition: 'color 0.2s ease',
            }}
          >
            kareawe
          </span>
        </NavLink>

        <nav style={{ display: 'flex', gap: '1.6rem' }} className="desktop-nav">
          {links.map(({ to, label }) => (
            <NavLink key={to} to={to} end={to === '/'} style={linkStyle}>
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Toggle menu"
          className="hamburger"
          style={{ display: 'none', flexDirection: 'column', gap: 5, padding: 6 }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display: 'block',
                width: 22,
                height: 2,
                background: onDark ? '#eef1f7' : 'var(--text)',
                borderRadius: 2,
                opacity: menuOpen && i === 1 ? 0 : 1,
                transform:
                  menuOpen && i === 0
                    ? 'rotate(45deg) translate(5px,5px)'
                    : menuOpen && i === 2
                      ? 'rotate(-45deg) translate(5px,-5px)'
                      : 'none',
                transition: 'all 0.25s ease',
              }}
            />
          ))}
        </button>
      </div>

      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: 64,
            background: 'var(--bg)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            zIndex: 99,
          }}
        >
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              style={({ isActive }: { isActive: boolean }) => ({
                fontSize: '1.8rem',
                fontWeight: 600,
                color: isActive ? 'var(--accent)' : 'var(--text)',
              })}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </header>
  )
}
