import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const contactItems = [
  {
    label: 'GitHub',
    value: 'github.com/kareawe',
    href: 'https://github.com/kareawe',
    color: '#00d4ff',
    icon: '⌥',
    desc: 'Projects & Code',
  },
  {
    label: 'Email',
    value: 'kimminjae1573@naver.com',
    href: 'mailto:kimminjae1573@naver.com',
    color: '#00ff88',
    icon: '◎',
    desc: 'Direct Message',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/민재-김',
    href: 'https://www.linkedin.com/in/%EB%AF%BC%EC%9E%AC-%EA%B9%80-707232309',
    color: '#9b59ff',
    icon: '◈',
    desc: 'Professional Profile',
  },
]

const interests = [
  'React / TypeScript 어드민 & 대시보드',
  'AI/LLM 기반 프론트엔드 통합',
  'UX 개선 & API 연동',
  '실시간 데이터 시각화',
  '금융 데이터 분석',
]

export default function Contact() {
  const revealRef = useReveal()
  const [hovered, setHovered] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText('kimminjae1573@naver.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh', padding: '10rem 2rem 6rem' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }} ref={revealRef}>
        {/* Header */}
        <div className="reveal" style={{ marginBottom: '5rem', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--cyan)', letterSpacing: '0.15em', marginBottom: '1rem' }}>03. GET IN TOUCH</p>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 800,
            fontSize: 'clamp(3rem, 7vw, 6rem)', letterSpacing: '-0.04em', lineHeight: 0.95,
            marginBottom: '1.5rem',
          }}>
            <span style={{ background: 'linear-gradient(135deg, #fff 40%, rgba(0,212,255,0.5))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              Let's build
            </span>
            <br />
            <span style={{ color: 'var(--cyan)' }}>something.</span>
          </h1>
          <p style={{ color: 'var(--text2)', maxWidth: 480, margin: '0 auto', lineHeight: 1.8, fontSize: '0.95rem' }}>
            프로젝트 협업이나 기술적 논의가 필요하시다면 언제든 연락주세요.
            데이터, AI/ML, 웹 개발 관련 주제에 관심이 많습니다.
          </p>
        </div>

        {/* Contact cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem', marginBottom: '3rem' }}>
          {contactItems.map((item, i) => (
            <div key={item.label} className="reveal" style={{ transitionDelay: `${i * 0.1}s` }}>
              <a
                href={item.href}
                target={item.href.startsWith('mailto') ? undefined : '_blank'}
                rel="noreferrer"
                data-hover
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: 'block',
                  background: 'rgba(13,13,26,0.85)',
                  border: `1px solid ${hovered === i ? item.color + '55' : 'var(--border)'}`,
                  borderRadius: '20px',
                  padding: '2rem',
                  backdropFilter: 'blur(12px)',
                  transition: 'all 0.3s ease',
                  transform: hovered === i ? 'translateY(-8px)' : 'translateY(0)',
                  boxShadow: hovered === i ? `0 20px 60px ${item.color}12` : 'none',
                  textDecoration: 'none',
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: '14px',
                  background: `${item.color}12`, border: `1px solid ${item.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.4rem', color: item.color, marginBottom: '1.2rem',
                  transition: 'all 0.3s ease',
                  ...(hovered === i ? { background: `${item.color}20` } : {}),
                }}>
                  {item.icon}
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text2)', letterSpacing: '0.1em', marginBottom: '0.4rem' }}>{item.desc}</p>
                <p style={{ fontWeight: 600, marginBottom: '0.3rem' }}>{item.label}</p>
                <p style={{ fontSize: '0.82rem', color: item.color, fontFamily: 'var(--font-mono)' }}>{item.value}</p>
              </a>
            </div>
          ))}
        </div>

        {/* Quick copy email */}
        <div className="reveal" style={{ marginBottom: '4rem' }}>
          <div style={{
            background: 'rgba(13,13,26,0.85)',
            border: '1px solid var(--border)',
            borderRadius: '16px', padding: '1.5rem 2rem',
            backdropFilter: 'blur(12px)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            flexWrap: 'wrap', gap: '1rem',
          }}>
            <div>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text2)', marginBottom: '4px' }}>QUICK COPY</p>
              <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--text)' }}>kimminjae1573@naver.com</p>
            </div>
            <button
              onClick={copyEmail}
              data-hover
              style={{
                padding: '10px 24px', borderRadius: '10px',
                background: copied ? 'rgba(0,255,136,0.15)' : 'rgba(0,212,255,0.08)',
                border: `1px solid ${copied ? 'rgba(0,255,136,0.35)' : 'rgba(0,212,255,0.25)'}`,
                color: copied ? 'var(--green)' : 'var(--cyan)',
                fontFamily: 'var(--font-mono)', fontSize: '0.82rem',
                transition: 'all 0.3s ease',
              }}
            >
              {copied ? '✓ Copied!' : 'Copy →'}
            </button>
          </div>
        </div>

        {/* Interests */}
        <div className="reveal">
          <div style={{
            background: 'rgba(13,13,26,0.85)',
            border: '1px solid var(--border)',
            borderRadius: '20px', padding: '2rem',
            backdropFilter: 'blur(12px)',
          }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--cyan)', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>COLLABORATION INTERESTS</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
              {interests.map((item, i) => (
                <span key={i} style={{
                  padding: '8px 18px', borderRadius: '10px',
                  background: 'rgba(0,212,255,0.06)', border: '1px solid rgba(0,212,255,0.15)',
                  color: 'var(--text)', fontSize: '0.88rem',
                  display: 'flex', alignItems: 'center', gap: '8px',
                }}>
                  <span style={{ color: 'var(--cyan)', fontSize: '0.6rem' }}>◆</span>
                  {item}
                </span>
              ))}
            </div>

            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
              <p style={{ color: 'var(--text2)', fontSize: '0.85rem', lineHeight: 1.8 }}>
                특히 <strong style={{ color: 'var(--text)' }}>React/TypeScript 기반 어드민·대시보드, UX 개선, API 연동</strong> 협업을 좋아합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <div className="reveal" style={{ marginTop: '5rem', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text2)', opacity: 0.5 }}>
            "Data-driven decisions, intuitive experiences"
          </p>
          <p style={{ marginTop: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text2)', opacity: 0.3 }}>
            © 2025 kareawe · Built with React + TypeScript + Vite
          </p>
        </div>
      </div>
    </div>
  )
}