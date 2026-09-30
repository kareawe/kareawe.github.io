import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { projects, type Project, type Trouble } from '../data/projects'

export default function Projects() {
  const revealRef = useReveal()

  return (
    <div ref={revealRef}>
      {/* Navy header band */}
      <section className="band" style={{ paddingTop: '8.5rem', paddingBottom: '3.2rem' }}>
        <div className="container">
          <p className="eyebrow rise" style={{ marginBottom: '0.9rem' }}>Selected Work</p>
          <h1 className="rise" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 700, letterSpacing: '-0.04em', ['--d' as string]: '80ms' }}>
            핵심 프로젝트
          </h1>
          <p className="muted rise" style={{ marginTop: '0.8rem', maxWidth: 600, ['--d' as string]: '160ms' }}>
            현업에서 운영 중인 서비스부터 팀 프로젝트까지{' '}
            <strong style={{ color: '#fff' }}>{projects.length}개</strong>를 정리했습니다. 카드를 누르면 해당
            프로젝트로 이동하고, 각 항목은 펼쳐서 자세히 볼 수 있습니다.
          </p>
        </div>
      </section>

      <div className="container" style={{ paddingTop: '2.4rem', paddingBottom: '7rem' }}>
        {/* At a glance */}
        <nav className="glance no-print" aria-label="프로젝트 목록">
          {projects.map((p, i) => (
            <a
              key={p.id}
              href={`#${p.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(p.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
              className={`glance-card reveal${p.featured ? ' is-featured' : ''}`}
              style={{ ['--d' as string]: `${i * 70}ms` }}
            >
              <div className="glance-top">
                <span className="glance-num">{String(i + 1).padStart(2, '0')}</span>
                <span className={`badge${p.featured ? ' badge-live' : ''}`}>{p.badge}</span>
              </div>
              <p className="glance-title">{p.title}</p>
              <p className="glance-meta">{p.period} · {p.role}</p>
              <p className="glance-hl">{p.highlights[0]}</p>
            </a>
          ))}
        </nav>

        <div className="project-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.8rem', marginTop: '2.6rem' }}>
          {projects.map((p, i) => (
            <div key={p.id} id={p.id} className="reveal project-item" style={{ scrollMarginTop: 84 }}>
              <ProjectCard project={p} index={i + 1} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [troubleKo, troubleEn] = project.troubleLabel ?? ['트러블슈팅', 'Troubleshooting']

  return (
    <article className={`card project-card${project.featured ? ' is-featured' : ''}`} style={{ padding: '2rem' }}>
      {/* Head */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.55rem', flexWrap: 'wrap' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-faint)' }}>
              PROJECT {String(index).padStart(2, '0')}
            </span>
            <span className={`badge${project.featured ? ' badge-live' : ''}`}>{project.badge}</span>
          </div>
          <h2 style={{ fontSize: '1.45rem', fontWeight: 650, letterSpacing: '-0.02em', lineHeight: 1.35 }}>{project.title}</h2>
          <p className="muted" style={{ fontSize: '0.85rem', marginTop: '0.3rem' }}>{project.subtitle}</p>
        </div>
        <span className="tag tag-accent role-tag" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>{project.role}</span>
      </div>

      <p style={{ lineHeight: 1.8, marginBottom: '1.1rem' }}>{project.summary}</p>

      {/* Highlights */}
      <ul className="hl-list">
        {project.highlights.map((h) => (
          <li key={h}>
            <span className="hl-check" aria-hidden>✓</span>
            {h}
          </li>
        ))}
      </ul>

      {/* Meta */}
      <div className="ov-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem', margin: '1.4rem 0 0.4rem' }}>
        <Meta label="개발 기간" value={project.period} />
        <Meta label="기여도" value={`${project.contribution}%`} sub={project.contributionRole} accent bar={Number(project.contribution)} />
        <Meta label="기술 스택" value={project.stack.join(' · ')} />
      </div>

      {project.ai && (
        <div className="ai-note">
          <span className="ai-note-k">AI 핵심</span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text)' }}>{project.ai}</span>
        </div>
      )}

      {/* Key UI or architecture */}
      {project.diagram === 'proposal-ai' ? (
        <Block label="시스템 구조" en="Architecture">
          <ProposalDiagram />
          <p style={{ fontSize: '0.72rem', color: 'var(--text-faint)', marginTop: '0.6rem', textAlign: 'center' }}>
            🔒 사내 보안 정책으로 실제 화면 대신 구조도로 대체합니다
          </p>
        </Block>
      ) : project.image ? (
        <Block label="핵심 화면" en="Key UI">
          <figure style={{ margin: 0 }}>
            <div className="shot">
              <img src={project.image} alt={project.imageCaption ?? project.title} loading="lazy" style={{ width: '100%', maxHeight: 320, objectFit: 'contain' }} />
            </div>
            <figcaption style={{ fontSize: '0.72rem', color: 'var(--text-faint)', marginTop: '0.4rem', textAlign: 'center' }}>
              {project.imageCaption ?? '핵심 화면'}
            </figcaption>
          </figure>
        </Block>
      ) : null}

      {/* Troubleshooting / Work */}
      <Block label={troubleKo} en={troubleEn} accent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
          {project.troubles.map((t, i) => (
            <TroubleItem key={t.title} num={i + 1} trouble={t} defaultOpen={project.featured && i === 0} />
          ))}
        </div>
      </Block>

      {project.link && (
        <div style={{ marginTop: '1.2rem', paddingTop: '1.1rem', borderTop: '1px solid var(--border)', textAlign: 'right' }}>
          <a href={project.link} target="_blank" rel="noreferrer" className="link-arrow">
            GitHub <span>↗</span>
          </a>
        </div>
      )}
      <style>{`@media (max-width:560px){ .ov-grid{ grid-template-columns: 1fr !important; } .role-tag{ display:none !important; } }`}</style>
    </article>
  )
}

function ProposalDiagram() {
  const sources = ['경쟁사 정보', '법률 데이터', '사내 RFP 이력']
  const features = ['PPT 일관성 검토', '문맥 흐름 검토', '발표 스크립트 생성']
  return (
    <div className="arch">
      <div className="arch-col">
        <span className="arch-cap">Data Sources</span>
        {sources.map((s) => (
          <span key={s} className="arch-node">{s}</span>
        ))}
      </div>
      <div className="arch-flow" aria-hidden><span /></div>
      <div className="arch-col arch-core">
        <span className="arch-cap">Connector</span>
        <span className="arch-node arch-mcp">MCP</span>
        <span className="arch-node arch-ai">전략 제안서 AI</span>
      </div>
      <div className="arch-flow" aria-hidden><span /></div>
      <div className="arch-col">
        <span className="arch-cap">Features</span>
        {features.map((s) => (
          <span key={s} className="arch-node">{s}</span>
        ))}
      </div>
      <div className="arch-infra">
        <span>On-prem Docker · 판교 DC</span>
        <span>KISA 점검 · iptables</span>
        <span>rsnapshot · ReaR 백업</span>
      </div>
    </div>
  )
}

function Block({ label, en, accent, children }: { label: string; en: string; accent?: boolean; children: React.ReactNode }) {
  return (
    <div className="pblock" style={{ padding: '1.3rem 0 0.2rem', marginTop: '1.1rem', borderTop: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '0.98rem', fontWeight: 650, color: accent ? 'var(--accent)' : 'var(--text)' }}>{label}</h3>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.08em', color: 'var(--text-faint)', textTransform: 'uppercase' }}>{en}</span>
      </div>
      {children}
    </div>
  )
}

function Meta({ label, value, sub, accent, bar }: { label: string; value: string; sub?: string; accent?: boolean; bar?: number }) {
  return (
    <div style={{ background: 'var(--bg-soft)', border: '1px solid var(--border)', borderRadius: 10, padding: '0.8rem 0.9rem' }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.06em', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
        {label}
      </p>
      <p style={{ fontSize: '0.84rem', fontWeight: 600, color: accent ? 'var(--accent)' : 'var(--text)', lineHeight: 1.45 }}>{value}</p>
      {bar !== undefined && (
        <div className="meter" aria-hidden>
          <span style={{ ['--w' as string]: `${bar}%` }} />
        </div>
      )}
      {sub && <p className="muted" style={{ fontSize: '0.72rem', marginTop: '0.35rem' }}>{sub}</p>}
    </div>
  )
}

function TroubleItem({ num, trouble, defaultOpen }: { num: number; trouble: Trouble; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(!!defaultOpen)
  const rows: { k: string; v: string }[] = [
    { k: '문제', v: trouble.problem },
    ...(trouble.cause ? [{ k: '원인', v: trouble.cause }] : []),
    ...(trouble.solution ? [{ k: '해결', v: trouble.solution }] : []),
  ]

  return (
    <div className={`trouble${open ? ' is-open' : ''}`}>
      <button className="trouble-head" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span className="trouble-num">{num}</span>
        <span className="trouble-titles">
          <span className="trouble-title">{trouble.title}</span>
          <span className="trouble-result">
            <span className="trouble-result-k">성과</span>
            {trouble.result}
          </span>
        </span>
        <span className="trouble-chev" aria-hidden>⌄</span>
      </button>

      <div className="collapse">
        <div className="collapse-inner">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '0.9rem' }}>
            {rows.map((r) => (
              <div key={r.k} style={{ display: 'grid', gridTemplateColumns: '46px 1fr', gap: '0.7rem' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--text-muted)', paddingTop: '0.05rem' }}>{r.k}</span>
                <span className="muted" style={{ fontSize: '0.85rem', lineHeight: 1.65 }}>{r.v}</span>
              </div>
            ))}
            {trouble.actions && (
              <div style={{ display: 'grid', gridTemplateColumns: '46px 1fr', gap: '0.7rem' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--text-muted)', paddingTop: '0.05rem' }}>한 일</span>
                <ul className="action-list">
                  {trouble.actions.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {trouble.code && <pre className="code-block">{trouble.code}</pre>}

          {trouble.todo && (
            <p className="todo-note" style={{ fontSize: '0.66rem', color: 'var(--text-faint)', marginTop: '0.6rem', textAlign: 'right' }}>
              * 성과 수치 실측값 확인 필요
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
