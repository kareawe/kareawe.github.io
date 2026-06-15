import { Link } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal'

const skillGroups = [
  {
    label: 'AI · ML',
    tags: ['LLM / RAG', 'Gemini API', 'XGBoost · SHAP', 'OCR', 'TensorFlow · PyTorch', 'Scikit-learn'],
  },
  {
    label: 'Data',
    tags: ['Python', 'SQL', 'Pandas · NumPy', 'Weaviate', 'Data Modeling', 'Financial Modeling'],
  },
  {
    label: 'Frontend',
    tags: ['React / Next.js', 'TypeScript', 'React Query', 'Zustand', 'Optimistic Update'],
  },
  {
    label: 'Backend · Infra',
    tags: ['Spring Boot', 'Java', 'REST API', 'Redis', 'PostgreSQL', 'Docker · K8s'],
  },
]

const timeline = [
  {
    period: '2020.03 — 2026.02',
    title: '가천대학교',
    sub: '금융수학과 / AI·소프트웨어학부 (소프트웨어전공)',
    active: false,
  },
  {
    period: '2025.03 — 2025.08',
    title: '가천카카오SW아카데미 6기',
    sub: 'Full-Stack & AI 집중 과정',
    active: false,
  },
  {
    period: '2026.01.06 — 진행 중',
    title: 'SKALA AI 과정',
    sub: 'AI 심화 과정 수료 중',
    active: true,
  },
]

const certs = [
  { name: 'SQLD', sub: 'SQL Developer', done: true },
  { name: 'ADsP', sub: 'Advanced Data Semi-Professional', done: true },
  { name: '정보처리기사', sub: 'Engineer Information Processing', done: false },
  { name: 'SQLP', sub: 'SQL Professional', done: false },
]

export default function Home() {
  const revealRef = useReveal()

  return (
    <div ref={revealRef}>
      {/* HERO */}
      <section
        className="band"
        style={{
          minHeight: '90vh',
          display: 'flex',
          alignItems: 'center',
          paddingTop: '5rem',
        }}
      >
        <div className="container reveal">
          <div className="band-chip" style={{ marginBottom: '1.8rem' }}>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#34d399',
                display: 'inline-block',
                boxShadow: '0 0 8px rgba(52,211,153,0.7)',
              }}
            />
            새로운 기회를 찾고 있습니다
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.6rem, 7vw, 4.6rem)',
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: '-0.04em',
              marginBottom: '1.4rem',
            }}
          >
            <span style={{ color: '#88abff' }}>AI</span>와 데이터를
            <br />
            제품으로 연결합니다
          </h1>

          <p className="muted" style={{ fontSize: '1.05rem', maxWidth: 580, marginBottom: '2.2rem' }}>
            금융수학 기반의 데이터 이해를 바탕으로,{' '}
            <strong style={{ color: '#fff', fontWeight: 600 }}>AI/ML 모델과 LLM을 실제
            서비스로 구현</strong>하는 풀스택 엔지니어입니다. 예측·검색·문서 분석 같은 AI
            기능을 안정적인 백엔드와 예측 가능한 UI로 연결합니다.
          </p>

          <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
            <Link to="/projects" className="btn btn-primary">
              프로젝트 보기 →
            </Link>
            <a
              href="https://github.com/kareawe"
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost"
            >
              GitHub ↗
            </a>
            <Link to="/portfolio-export" className="btn btn-ghost">
              포트폴리오 PDF
            </Link>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section container">
        <div className="section-head reveal">
          <span className="idx">01</span>
          <h2>About</h2>
          <span className="rule" />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.4rem',
          }}
        >
          <div className="card reveal">
            <p className="muted" style={{ lineHeight: 1.9 }}>
              <strong style={{ color: 'var(--text)' }}>빠른 기능 구현보다 안정적으로
              동작하는 구조</strong>를 더 중요하게 생각합니다. 단순히 만드는 것을 넘어
              데이터 정합성, 응답 안정성, 운영 환경에서의 병목까지 함께 고려해 왔습니다.
            </p>
            <div style={{ height: 1, background: 'var(--border)', margin: '1.4rem 0' }} />
            <p className="muted" style={{ lineHeight: 1.9 }}>
              실시간 데이터, 다수의 상태 변화, 빈번한 사용자 인터랙션 환경에서
              <strong style={{ color: 'var(--text)' }}> UI가 예측 가능하게 동작하도록</strong>{' '}
              설계하고, 백엔드에서는 데이터가 정확하게 흐르도록 구조를 잡습니다.
            </p>
          </div>

          <div className="card reveal">
            <p className="eyebrow" style={{ marginBottom: '1.4rem' }}>Education / Career</p>
            {timeline.map((item, i, arr) => (
              <div key={i} style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <span
                    style={{
                      width: 9,
                      height: 9,
                      borderRadius: '50%',
                      marginTop: 6,
                      background: item.active ? 'var(--accent)' : 'var(--border-strong)',
                      flexShrink: 0,
                    }}
                  />
                  {i < arr.length - 1 && (
                    <span style={{ width: 1, flex: 1, background: 'var(--border)', minHeight: 30 }} />
                  )}
                </div>
                <div style={{ paddingBottom: i < arr.length - 1 ? '1.3rem' : 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-faint)' }}>
                      {item.period}
                    </span>
                    {item.active && <span className="tag tag-accent">In Progress</span>}
                  </div>
                  <p style={{ fontWeight: 600, margin: '0.2rem 0' }}>{item.title}</p>
                  <p className="muted" style={{ fontSize: '0.85rem' }}>{item.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section className="section container">
        <div className="section-head reveal">
          <span className="idx">02</span>
          <h2>Tech Stack</h2>
          <span className="rule" />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.2rem',
          }}
        >
          {skillGroups.map((group) => (
            <div key={group.label} className="card card-hover reveal">
              <p style={{ fontWeight: 600, marginBottom: '1rem', fontSize: '0.95rem' }}>
                {group.label}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {group.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="section container" style={{ paddingBottom: '7rem' }}>
        <div className="section-head reveal">
          <span className="idx">03</span>
          <h2>Certifications</h2>
          <span className="rule" />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
            gap: '1rem',
          }}
        >
          {certs.map((cert) => (
            <div key={cert.name} className="card card-hover reveal" style={{ textAlign: 'center' }}>
              <p style={{ fontWeight: 700, fontSize: '1.4rem', letterSpacing: '-0.02em' }}>
                {cert.name}
              </p>
              <p className="muted" style={{ fontSize: '0.78rem', margin: '0.4rem 0 1rem' }}>
                {cert.sub}
              </p>
              <span className={`tag ${cert.done ? 'tag-accent' : ''}`}>
                {cert.done ? '취득' : 'In Progress'}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
