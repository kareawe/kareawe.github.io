import { NavLink } from 'react-router-dom'
import { useEffect, useState } from 'react'

const links = [
  { to: '/', label: 'About', num: '01' },
  { to: '/projects', label: 'Projects', num: '02' },
  { to: '/contact', label: 'Contact', num: '03' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '0 2rem',
        height: '72px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(6,6,14,0.9)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled
          ? '1px solid rgba(0,212,255,0.08)'
          : '1px solid transparent',
        transition: 'all 0.4s ease',
      }}
    >
      <NavLink
        to="/"
        onClick={() => setMenuOpen(false)}
        style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '10px',
            background:
              'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,255,136,0.1))',
            border: '1px solid rgba(0,212,255,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            color: 'var(--cyan)',
            fontSize: '1.1rem',
            letterSpacing: '-0.05em',
          }}
        >
          K
        </div>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85rem',
            color: 'var(--text2)',
            letterSpacing: '0.1em',
          }}
        >
          kareawe
        </span>
      </NavLink>

      <nav style={{ display: 'flex', gap: '0.5rem' }} className="desktop-nav">
        {links.map(({ to, label, num }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            onClick={() => setMenuOpen(false)}
            style={({ isActive }: { isActive: boolean }) => ({
              padding: '8px 20px',
              borderRadius: '8px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              color: isActive ? 'var(--cyan)' : 'var(--text2)',
              background: isActive ? 'rgba(0,212,255,0.08)' : 'transparent',
              border: isActive
                ? '1px solid rgba(0,212,255,0.2)'
                : '1px solid transparent',
              letterSpacing: '0.05em',
              transition: 'all 0.3s ease',
              display: 'flex',
              gap: '6px',
              alignItems: 'center',
            })}
          >
            <span style={{ color: 'var(--text3)', fontSize: '0.7rem' }}>
              {num}.
            </span>
            {label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
        style={{
          display: 'none',
          flexDirection: 'column',
          gap: '5px',
          padding: '8px',
        }}
        className="hamburger"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: 'block',
              width: 24,
              height: 2,
              background:
                menuOpen && i === 1
                  ? 'transparent'
                  : menuOpen && i === 0
                    ? 'var(--cyan)'
                    : menuOpen && i === 2
                      ? 'var(--cyan)'
                      : 'var(--text2)',
              borderRadius: 2,
              transform:
                menuOpen && i === 0
                  ? 'rotate(45deg) translate(5px,5px)'
                  : menuOpen && i === 2
                    ? 'rotate(-45deg) translate(5px,-5px)'
                    : 'none',
              transition: 'all 0.3s ease',
            }}
          />
        ))}
      </button>

      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            top: 72,
            background: 'rgba(6,6,14,0.97)',
            backdropFilter: 'blur(20px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            zIndex: 99,
          }}
        >
          {links.map(({ to, label, num }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={() => setMenuOpen(false)}
              style={({ isActive }: { isActive: boolean }) => ({
                fontFamily: 'var(--font-display)',
                fontSize: '2.5rem',
                fontWeight: 800,
                color: isActive ? 'var(--cyan)' : 'var(--text)',
                letterSpacing: '-0.02em',
              })}
            >
              <span
                style={{
                  color: 'var(--cyan)',
                  fontSize: '1rem',
                  marginRight: 8,
                }}
              >
                {num}.
              </span>
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