import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const skills = [
  {
    label: 'Frontend Development',
    icon: '⬡',
    color: '#00d4ff',
    tags: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'API Integration'],
  },
  {
    label: 'Frontend Advanced',
    icon: '◈',
    color: '#00ff88',
    tags: ['React Query', 'Zustand', 'Infinite Scroll', 'Optimistic Update', 'Error Handling', 'ESLint'],
  },
  {
    label: 'AI & Machine Learning',
    icon: '◉',
    color: '#9b59ff',
    tags: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'LLM', 'RAG', 'Time-Series'],
  },
  {
    label: 'Data & Finance',
    icon: '◆',
    color: '#ff9b00',
    tags: ['Python', 'SQL', 'Pandas', 'NumPy', 'Financial Modeling'],
  },
  {
    label: 'Tools & Others',
    icon: '⬣',
    color: '#ff5fa0',
    tags: ['Git', 'Docker', 'Java', 'Jenkins', 'Mustache'],
  },
]

const certs = [
  { name: 'SQLD', sub: 'SQL Developer', done: true },
  { name: 'ADsP', sub: 'Advanced Data Science Professional', done: true },
  { name: '정보처리기사', sub: '정보처리기사', done: true },
  { name: 'SQLP', sub: 'Information Processing Engineer', done: false },
]

function TypeWriter({ texts }: { texts: string[] }) {
  const [idx, setIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const target = texts[idx]
    let timer: ReturnType<typeof setTimeout>

    if (!deleting && displayed.length < target.length) {
      timer = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80)
    } else if (!deleting && displayed.length === target.length) {
      timer = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && displayed.length > 0) {
      timer = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    } else {
      timer = setTimeout(() => {
        setDeleting(false)
        setIdx(i => (i + 1) % texts.length)
      }, 100)
    }
    return () => clearTimeout(timer)
  }, [displayed, deleting, idx, texts])

  return (
    <span style={{ color: 'var(--cyan)' }}>
      {displayed}
      <span style={{
        display: 'inline-block', width: 3, height: '1em',
        background: 'var(--cyan)', marginLeft: 2,
        animation: 'blink 1s steps(1) infinite',
        verticalAlign: 'text-bottom',
      }} />
      <style>{`@keyframes blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }`}</style>
    </span>
  )
}

export default function Home() {
  const revealRef = useReveal()
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const move = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect()
      const x = ((e.clientX - left) / width - 0.5) * 20
      const y = ((e.clientY - top) / height - 0.5) * 20
      el.style.transform = `perspective(1000px) rotateY(${x * 0.3}deg) rotateX(${-y * 0.3}deg)`
    }
    const reset = () => { el.style.transform = 'perspective(1000px) rotateY(0) rotateX(0)' }
    document.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', reset)
    return () => {
      document.removeEventListener('mousemove', move)
      document.removeEventListener('mouseleave', reset)
    }
  }, [])

  return (
    <div style={{ position: 'relative', zIndex: 2 }}>
      {/* HERO */}
      <section style={{
        minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        padding: '6rem 2rem 4rem',
        textAlign: 'center',
      }}>
        <div ref={heroRef} style={{ transition: 'transform 0.1s ease' }}>
          {/* Avatar */}
          <div style={{
            width: 100, height: 100, borderRadius: '28px',
            margin: '0 auto 2.5rem',
            background: 'linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,255,136,0.1))',
            border: '2px solid rgba(0,212,255,0.35)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '2.8rem',
            fontFamily: 'var(--font-mono)', fontWeight: 700,
            color: 'var(--cyan)',
            boxShadow: '0 0 60px rgba(0,212,255,0.15), inset 0 0 30px rgba(0,212,255,0.05)',
            animation: 'float 3s ease-in-out infinite',
          }}>K</div>

          {/* Greeting tag */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 16px', borderRadius: '20px',
            background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.2)',
            fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--cyan)',
            marginBottom: '1.5rem', letterSpacing: '0.1em',
          }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', display: 'inline-block', animation: 'pulse-border 2s infinite' }} />
            Available for opportunities
          </div>

          {/* Name */}
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            fontWeight: 800, lineHeight: 0.95,
            letterSpacing: '-0.04em',
            marginBottom: '1rem',
            animation: 'fadeUp 1s ease both',
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #fff 30%, rgba(0,212,255,0.7))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>김민재</span>
            <br />
            <span style={{
              fontFamily: 'var(--font-mono)', fontWeight: 400,
              fontSize: '0.28em', letterSpacing: '0.06em',
              WebkitTextFillColor: 'transparent',
              display: 'inline-flex', alignItems: 'center', gap: '0.6em',
            }}>
              <span style={{ color: 'var(--cyan)', WebkitTextFillColor: 'var(--cyan)', opacity: 0.7 }}>Ability</span>
              <span style={{ color: 'var(--text2)', WebkitTextFillColor: 'var(--text2)', opacity: 0.7, fontSize: '0.85em' }}>vs</span>
              <span style={{ color: 'var(--green)', WebkitTextFillColor: 'var(--green)', opacity: 0.7 }}>Aspiration</span>
            </span>
          </h1>

          {/* Typewriter */}
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: 'clamp(0.9rem, 2.5vw, 1.2rem)',
            color: 'var(--text2)', marginBottom: '2.5rem',
            minHeight: '2em',
            animation: 'fadeUp 1s 0.2s ease both', opacity: 0,
            animationFillMode: 'forwards',
          }}>
            <TypeWriter texts={[
              'Front-End Engineer',
              'Real-time Data Enthusiast',
              'Predictable UI Designer',
              'AI/ML Developer',
              'Finance Data Analyst',
            ]} />
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap',
            animation: 'fadeUp 1s 0.4s ease both', opacity: 0,
            animationFillMode: 'forwards',
          }}>
            <Link to="/projects" style={{
              padding: '14px 32px', borderRadius: '12px',
              background: 'var(--cyan)', color: '#06060e',
              fontWeight: 700, fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem', letterSpacing: '0.05em',
              transition: 'all 0.3s ease',
              boxShadow: '0 0 30px rgba(0,212,255,0.3)',
            }} data-hover>
              View Projects →
            </Link>
            <a href="https://github.com/kareawe" target="_blank" rel="noreferrer" style={{
              padding: '14px 32px', borderRadius: '12px',
              border: '1px solid rgba(0,212,255,0.3)',
              color: 'var(--text)', fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem', letterSpacing: '0.05em',
              transition: 'all 0.3s ease',
              background: 'rgba(0,212,255,0.04)',
            }} data-hover>
              GitHub ↗
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '2.5rem', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px',
          color: 'var(--text2)', fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
          letterSpacing: '0.15em', opacity: 0.5,
        }}>
          SCROLL
          <div style={{
            width: 1, height: 50,
            background: 'linear-gradient(var(--cyan), transparent)',
            animation: 'scanline 1.5s ease-in-out infinite',
          }} />
        </div>
      </section>

      {/* ABOUT */}
      <div ref={revealRef}>
        <section style={{ padding: '6rem 2rem', maxWidth: 1000, margin: '0 auto' }}>
          <div className="reveal" style={{ marginBottom: '4rem' }}>
            <SectionLabel num="01" label="About Me" />
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem', marginBottom: '4rem',
          }}>
            <div className="reveal" style={{ transitionDelay: '0.1s' }}>
              <GlassCard>
                <p style={{ color: 'var(--text2)', lineHeight: 2, fontSize: '0.95rem' }}>
                  <strong style={{ color: 'var(--text)' }}>복잡한 데이터를 사용자가 이해하기 쉬운 화면으로 바꾸는 것</strong>과
                  {' '}<strong style={{ color: 'var(--text)' }}>직관적인 사용자 경험</strong>을 가장 중요하게 생각하는
                  프론트엔드 엔지니어입니다.
                </p>
                <div style={{ height: '1px', background: 'var(--border)', margin: '1.5rem 0' }} />
                <p style={{ color: 'var(--text2)', lineHeight: 1.9, fontSize: '0.95rem' }}>
                  금융 데이터 분석부터 AI/ML 모델링, 프론트엔드 개발까지 폭넓은 경험.
                  특히 <strong style={{ color: 'var(--cyan)' }}>실시간 데이터, 다수의 상태 변화, 빈번한 사용자 인터랙션 환경</strong>에서
                  UI가 예측 가능하게 동작하도록 설계해왔습니다.
                </p>
              </GlassCard>
            </div>

            <div className="reveal" style={{ transitionDelay: '0.2s' }}>
              <GlassCard>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--cyan)', letterSpacing: '0.1em', marginBottom: '1.2rem' }}>EDUCATION / CAREER</p>
                {[
                  { period: '2020.03 — 2026.02', title: '가천대학교', sub: '금융수학과 / AI·소프트웨어학부 (소프트웨어전공)', dot: '#00d4ff', badge: null },
                  { period: '2025.03 — 2025.08', title: '가천카카오SW아카데미 6기', sub: 'Full-Stack & AI 집중 과정', dot: '#00d4ff', badge: null },
                  { period: '2026.01.06 — 진행 중', title: 'SKALA AI 과정', sub: 'AI 심화 과정 수료 중', dot: '#00ff88', badge: 'In Progress' },
                ].map((item, i, arr) => (
                  <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: i < arr.length - 1 ? '1.4rem' : 0 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0 }}>
                      <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.dot, boxShadow: `0 0 10px ${item.dot}`, flexShrink: 0, marginTop: 2 }} />
                      {i < arr.length - 1 && <div style={{ width: 1, flex: 1, background: 'var(--border)', marginTop: 4, minHeight: 28 }} />}
                    </div>
                    <div style={{ paddingBottom: i < arr.length - 1 ? 0 : 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: 3, flexWrap: 'wrap' }}>
                        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text2)' }}>{item.period}</p>
                        {item.badge && (
                          <span style={{
                            padding: '1px 7px', borderRadius: '4px',
                            fontSize: '0.6rem', fontFamily: 'var(--font-mono)',
                            background: `${item.dot}15`, border: `1px solid ${item.dot}35`,
                            color: item.dot, letterSpacing: '0.05em',
                          }}>{item.badge}</span>
                        )}
                      </div>
                      <p style={{ fontWeight: 600, marginBottom: 2, fontSize: '0.92rem' }}>{item.title}</p>
                      <p style={{ fontSize: '0.82rem', color: 'var(--text2)' }}>{item.sub}</p>
                    </div>
                  </div>
                ))}
              </GlassCard>
            </div>
          </div>

          {/* SKILLS */}
          <div className="reveal" style={{ marginBottom: '2rem' }}>
            <SectionLabel num="02" label="Tech Stack" />
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.2rem',
          }}>
            {skills.map((skill, i) => (
              <div key={skill.label} className="reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <SkillCard skill={skill} />
              </div>
            ))}
          </div>

          {/* CERTS */}
          <div className="reveal" style={{ margin: '4rem 0 2rem' }}>
            <SectionLabel num="03" label="Certifications" />
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '1rem',
          }}>
            {certs.map((cert, i) => (
              <div key={cert.name} className="reveal" style={{ transitionDelay: `${i * 0.08}s` }}>
                <GlassCard style={{ textAlign: 'center', padding: '1.8rem 1rem' }}>
                  <p style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>{cert.name}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text2)', marginBottom: '1rem' }}>{cert.sub}</p>
                  <span style={{
                    display: 'inline-block', padding: '4px 14px', borderRadius: '20px',
                    fontSize: '0.75rem', fontFamily: 'var(--font-mono)',
                    background: cert.done ? 'rgba(0,255,136,0.1)' : 'rgba(255,155,0,0.1)',
                    color: cert.done ? 'var(--green)' : '#ff9b00',
                    border: `1px solid ${cert.done ? 'rgba(0,255,136,0.3)' : 'rgba(255,155,0,0.3)'}`,
                  }}>
                    {cert.done ? '✓ Certified' : '◎ In Progress'}
                  </span>
                </GlassCard>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function SectionLabel({ num, label }: { num: string; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--cyan)', opacity: 0.6 }}>{num}.</span>
      <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', letterSpacing: '-0.03em' }}>{label}</h2>
      <div style={{ flex: 1, height: 1, background: 'var(--border)', marginLeft: '1rem' }} />
    </div>
  )
}

function GlassCard({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: 'rgba(13,13,26,0.8)',
      border: '1px solid var(--border)',
      borderRadius: '16px',
      padding: '1.8rem',
      backdropFilter: 'blur(10px)',
      height: '100%',
      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      ...style,
    }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,212,255,0.3)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 30px rgba(0,212,255,0.06)'
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLElement).style.borderColor = 'var(--border)'
        ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
      }}
    >
      {children}
    </div>
  )
}

function SkillCard({ skill }: { skill: typeof skills[0] }) {
  return (
    <div style={{
      background: 'rgba(13,13,26,0.8)',
      border: '1px solid var(--border)',
      borderRadius: '16px',
      padding: '1.5rem',
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
      position: 'relative', overflow: 'hidden',
    }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = skill.color + '55'
        el.style.boxShadow = `0 0 30px ${skill.color}10`
        el.style.transform = 'translateY(-4px)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement
        el.style.borderColor = 'var(--border)'
        el.style.boxShadow = 'none'
        el.style.transform = 'none'
      }}
    >
      <div style={{ position: 'absolute', top: 12, right: 16, fontSize: '1.8rem', opacity: 0.08, color: skill.color }}>{skill.icon}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
        <span style={{ color: skill.color, fontSize: '1.1rem' }}>{skill.icon}</span>
        <p style={{ fontWeight: 600, fontSize: '0.9rem' }}>{skill.label}</p>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
        {skill.tags.map(tag => (
          <span key={tag} style={{
            padding: '4px 10px', borderRadius: '6px',
            background: `${skill.color}12`, border: `1px solid ${skill.color}25`,
            color: skill.color, fontSize: '0.75rem', fontFamily: 'var(--font-mono)',
          }}>{tag}</span>
        ))}
      </div>
    </div>
  )
}