import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const EMAIL = 'kimminjae1573@naver.com'

const contactItems = [
  { label: 'GitHub', value: 'github.com/kareawe', href: 'https://github.com/kareawe', desc: 'Projects & Code' },
  { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}`, desc: 'Direct Message' },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/민재-김',
    href: 'https://www.linkedin.com/in/%EB%AF%BC%EC%9E%AC-%EA%B9%80-707232309',
    desc: 'Professional Profile',
  },
]

const interests = [
  'React / TypeScript 어드민·대시보드',
  '안정적인 API·데이터 처리 구조',
  'AI/LLM 기반 기능 통합',
  '실시간 데이터 시각화',
  '금융 데이터 분석',
]

export default function Contact() {
  const revealRef = useReveal()
  const [copied, setCopied] = useState(false)

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div ref={revealRef}>
      <section className="band" style={{ paddingTop: '8.5rem', paddingBottom: '3.2rem' }}>
        <div className="container reveal">
          <p className="eyebrow" style={{ marginBottom: '0.9rem' }}>Get in touch</p>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.1 }}>
            함께 만들 무언가가 있다면
          </h1>
          <p className="muted" style={{ marginTop: '1rem', maxWidth: 520 }}>
            프로젝트 협업이나 기술적 논의가 필요하시면 언제든 연락 주세요. 데이터, AI/ML,
            웹 개발 전반에 관심이 많습니다.
          </p>
        </div>
      </section>

      <div className="container" style={{ maxWidth: 820, paddingTop: '3rem', paddingBottom: '7rem' }}>

        {/* Cards */}
        <div
          className="reveal"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1rem',
            marginBottom: '1rem',
          }}
        >
          {contactItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith('mailto') ? undefined : '_blank'}
              rel="noreferrer"
              className="card card-hover"
              style={{ display: 'block' }}
            >
              <p className="eyebrow" style={{ marginBottom: '0.7rem' }}>{item.desc}</p>
              <p style={{ fontWeight: 600, marginBottom: '0.25rem' }}>{item.label}</p>
              <p className="muted" style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)' }}>
                {item.value}
              </p>
            </a>
          ))}
        </div>

        {/* Quick copy */}
        <div
          className="reveal card"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '3rem',
          }}
        >
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.3rem' }}>Quick copy</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem' }}>{EMAIL}</p>
          </div>
          <button onClick={copyEmail} className={`btn ${copied ? 'btn-primary' : 'btn-ghost'}`}>
            {copied ? '✓ 복사됨' : '복사하기'}
          </button>
        </div>

        {/* Interests */}
        <div className="reveal card">
          <p className="eyebrow" style={{ marginBottom: '1.2rem' }}>Collaboration Interests</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {interests.map((item) => (
              <span key={item} className="tag">{item}</span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="reveal" style={{ marginTop: '4rem', textAlign: 'center' }}>
          <p className="muted" style={{ fontSize: '0.85rem' }}>
            “Data-driven decisions, intuitive experiences”
          </p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-faint)', fontFamily: 'var(--font-mono)' }}>
            © 2026 kareawe · Built with React + TypeScript + Vite
          </p>
        </div>
      </div>
    </div>
  )
}
