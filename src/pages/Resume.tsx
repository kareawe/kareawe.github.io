import { useReveal } from '../hooks/useReveal'
import photo from './증명사진.jpg'

/* ──────────────────────────────────────────────
 *  이력서 데이터 — 실제 값으로 교체하세요.
 *  (File.docx 표준 이력서 양식 기반: 인적사항 · SKILLS ·
 *   학력 · 경력 · 주요활동 · 수상 · 어학 · 연수 · 병역)
 * ────────────────────────────────────────────── */

const profile = {
  nameKo: '김민재',
  nameHanja: '金玟載',
  nameEn: 'Kim Minjae',
  position: 'AI / Full-Stack Developer',
  birth: '2001.10.30',
  address: '경기도 성남시 수정구 위례엘포트',
  phone: '010-2710-1829',
  email: 'kimminjae1573@naver.com',
  github: 'github.com/kareawe',
  portfolio : "https://kareawe.github.io"
}

const skills: { name: string; level: '상' | '중' | '하' }[] = [
  { name: 'Java / Spring Boot', level: '상' },
  { name: 'PostgreSQL / SQL', level: '상' },
  { name: 'Python', level: '중' },
  { name: 'React / TypeScript', level: '중' },
  { name: 'Docker / Linux', level: '중' },
]

const education = [
  {
    period: '2020.03 – 2026.08',
    school: '가천대학교',
    detail: '금융수학과 | 졸업',
  },
  {
    period: '2025.03 – 2025.08',
    school: '가천 카카오엔터프라이즈 SW아카데미',
    detail: '풀스택 과정 수료',
  },
  {
    period: '2026.01 – 2026.06',
    school: 'SKALA 3기',
    detail: 'AI 과정 수료',
  },
]

const career = [
  {
    period: '2026.07.15 – 재직 중',
    org: '애커튼테크놀로지서비스',
    role: 'AI 혁신 TF팀',
    tasks: [
      'SKAX 제안 AI 개발 및 운영',
    ],
  },
  {
    period: '2026.04 – 2026.06',
    org: 'SK AX 기업 연계 프로젝트',
    role: 'Backend · AI 연동',
    tasks: [
      '외부 AI 재조정 서비스 연동 및 데이터 정합성 설계',
      'risk_id 시점 동기화 · actionable 위험 필터링 파이프라인 구축',
      '에러 의미 분리(NotActionableException / AiAgentException)로 운영 안정성 확보',
    ],
  },
]

const activities = [
  {
    period: '2025.03 – 2025.06',
    place: 'HomeProtector (전세사기)',
    content: 'XGBoost·SHAP 위험 예측 + Gemini LLM 근거 생성, OCR 문서 분석 파이프라인 구현.',
  },
  {
    period: '2025.07 – 2025.08',
    place: '카카오 엔터프라이즈 (FLOW)',
    content: 'Weaviate 벡터DB 기반 RAG 검색 시스템의 관리자 화면과 검색 UX 구현.',
  },
]

const awards = [
  { date: '2024.08', title: '입선 (2024년 국민행복 서비스 발굴·창업 경진대회)' },
  { date: '2024.06', title: '2차 팀미션 우수상 (우체국 예금 서포터즈)' },
]

const languages = [
  { name: '영어', test: 'OPIc', score: 'IM2', issuer: 'ACTFL', date: '2025.12.20' },
]

const trainings = [
  { period: '2026.01 – 2026.06', course: 'SKALA AI 3기', org: 'SK AX' },
  { period: '2025.03 – 2025.08', course: '가천카카오엔터프라이즈 SW아카데미', org: '카카오 엔터프라이즈' },
  { period: '2024.04 – 2024.09', course: '우체국 예금 서포터즈 14기', org: '우체국 예금' },
]

const military = {
  period: '2021.03 – 2022.09',
  rank: '병장',
  note: '만기 전역 (병장 만기 제대)',
}

export default function Resume() {
  const revealRef = useReveal()

  return (
    <div ref={revealRef}>
      {/* Navy header band */}
      <section className="band" style={{ paddingTop: '8.5rem', paddingBottom: '3.2rem' }}>
        <div className="container reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '1rem', flexWrap: 'wrap' }}>
          <div>
            <p className="eyebrow" style={{ marginBottom: '0.9rem' }}>Resume · 이력서</p>
            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 700, letterSpacing: '-0.04em' }}>
              {profile.nameKo}
              <span style={{ fontSize: '0.42em', fontWeight: 500, color: 'rgba(238,241,247,0.6)', marginLeft: '0.7rem' }}>
                {profile.nameHanja} · {profile.nameEn}
              </span>
            </h1>
            <p className="muted" style={{ marginTop: '0.6rem' }}>{profile.position}</p>
          </div>
          <button className="btn-ghost no-print" onClick={() => window.print()} style={{ cursor: 'pointer' }}>
            PDF로 저장 / 인쇄
          </button>
        </div>
      </section>

      {/* Body */}
      <div className="container resume-grid" style={{ paddingTop: '3rem', paddingBottom: '7rem' }}>
        {/* Left column — 인적사항 · SKILLS */}
        <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
          <div className="card reveal" style={{ padding: '1.6rem' }}>
            <img className="photo-slot" src={photo} alt={`${profile.nameKo} 증명사진`} />
            <InfoRow k="생년월일" v={profile.birth} />
            <InfoRow k="주소" v={profile.address} />
            <InfoRow k="연락처" v={profile.phone} />
            <InfoRow k="이메일" v={profile.email} />
            <InfoRow k="GitHub" v={profile.github} href={`https://${profile.github}`} />
            <InfoRow k="Portfolio" v={profile.portfolio.replace(/^https?:\/\//, '')} href={profile.portfolio} last />
          </div>

          <div className="card reveal" style={{ padding: '1.6rem' }}>
            <SideTitle>SKILLS</SideTitle>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: '1rem' }}>
              {skills.map((s) => (
                <div key={s.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                    <span style={{ fontSize: '0.84rem', fontWeight: 500 }}>{s.name}</span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--accent)' }}>{s.level}</span>
                  </div>
                  <SkillBar level={s.level} />
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Right column — 학력 · 경력 · 활동 · 수상 · 어학 · 연수 · 병역 */}
        <main style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
          <Section title="학력사항" en="Education" className="reveal">
            {education.map((e, i) => (
              <Entry key={i} period={e.period} title={e.school} sub={e.detail} />
            ))}
          </Section>

          <Section title="경력사항" en="Career" className="reveal">
            {career.map((c, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '1rem' }} className="entry-grid">
                <span className="entry-period">{c.period}</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', flexWrap: 'wrap' }}>
                    <strong style={{ fontSize: '0.95rem' }}>{c.org}</strong>
                    <span className="tag tag-accent">{c.role}</span>
                  </div>
                  <ul style={{ margin: '0.6rem 0 0', paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                    {c.tasks.map((t, j) => (
                      <li key={j} className="muted" style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </Section>

          <Section title="주요활동" en="Activities" className="reveal">
            {activities.map((a, i) => (
              <Entry key={i} period={a.period} title={a.place} sub={a.content} />
            ))}
          </Section>

          <Section title="수상내역" en="Awards" className="reveal">
            {awards.map((a, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '1rem' }} className="entry-grid">
                <span className="entry-period">{a.date}</span>
                <span style={{ fontSize: '0.88rem' }}>{a.title}</span>
              </div>
            ))}
          </Section>

          <Section title="어학능력" en="Language" className="reveal">
            <div style={{ overflowX: 'auto' }}>
              <table className="resume-table">
                <thead>
                  <tr><th>외국어</th><th>시험명</th><th>점수</th><th>발행처</th><th>취득일</th></tr>
                </thead>
                <tbody>
                  {languages.map((l, i) => (
                    <tr key={i}>
                      <td>{l.name}</td><td>{l.test}</td><td>{l.score}</td><td>{l.issuer}</td><td>{l.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="연수" en="Training" className="reveal">
            <div style={{ overflowX: 'auto' }}>
              <table className="resume-table">
                <thead>
                  <tr><th>기간</th><th>과정</th><th>기관</th></tr>
                </thead>
                <tbody>
                  {trainings.map((t, i) => (
                    <tr key={i}>
                      <td>{t.period}</td><td>{t.course}</td><td>{t.org}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="병역" en="Military" className="reveal">
            <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '1rem' }} className="entry-grid">
              <span className="entry-period">{military.period}</span>
              <span style={{ fontSize: '0.88rem' }}>{military.rank} · {military.note}</span>
            </div>
          </Section>
        </main>
      </div>

      <style>{`
        .resume-grid {
          display: grid;
          grid-template-columns: 280px minmax(0, 1fr);
          gap: 1.6rem;
          align-items: start;
        }
        /* grid 자식이 안쪽 콘텐츠(표 등) 때문에 늘어나 2단 정렬이 깨지는 것 방지 */
        .resume-grid > aside,
        .resume-grid > main {
          min-width: 0;
        }
        .resume-grid img,
        .resume-grid table { max-width: 100%; }
        .photo-slot {
          display: block;
          width: 100%;
          aspect-ratio: 3 / 4;
          max-width: 160px;
          margin: 0 auto 1.4rem;
          border: 1px solid var(--border);
          border-radius: 10px;
          object-fit: cover;
          background: var(--bg-soft);
        }
        .resume-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.82rem;
        }
        .resume-table th, .resume-table td {
          border: 1px solid var(--border);
          padding: 0.55rem 0.7rem;
          text-align: left;
        }
        .resume-table th {
          background: var(--bg-soft);
          font-weight: 600;
          color: var(--text-muted);
          font-size: 0.74rem;
        }
        .entry-period {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--text-faint);
          padding-top: 0.1rem;
        }
        @media (max-width: 720px) {
          .resume-grid { grid-template-columns: 1fr !important; }
          .entry-grid { grid-template-columns: 1fr !important; gap: 0.3rem !important; }
        }
        @media print {
          /* 인쇄창 '여백' 설정이 @page를 덮어써도 좌우 여백이 유지되도록
             상하만 @page로, 좌우는 콘텐츠 패딩으로 강제한다 */
          @page { size: A4 portrait; margin: 14mm 0; }

          .no-print { display: none !important; }

          /* 색/배경 그대로 인쇄 */
          html, body { background: #fff !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }

          /* 헤더 밴드: 흰 배경으로 컴팩트하게 */
          .band {
            background: #fff !important;
            color: var(--text) !important;
            padding: 0 !important;
            margin-bottom: 0.6rem !important;
          }
          .band::after { display: none !important; }
          .band .eyebrow { color: var(--accent) !important; }
          .band .muted, .band h1 span { color: var(--text-muted) !important; }
          .band h1 { color: var(--text) !important; font-size: 1.9rem !important; }

          /* 인쇄 영역 폭을 A4에 맞추되, 좌우 여백은 패딩으로 직접 부여
             (인쇄창 여백=None이어도 항상 적용됨) */
          .container {
            max-width: 100% !important;
            width: 100% !important;
            padding-left: 16mm !important;
            padding-right: 16mm !important;
            box-sizing: border-box !important;
          }
          .resume-grid {
            grid-template-columns: 210px 1fr !important;
            gap: 0.9rem !important;
            padding-top: 0.6rem !important;
            padding-bottom: 0 !important;
            align-items: start;
          }

          /* 카드가 페이지 경계에서 쪼개지지 않게 */
          .card, .resume-table, tr, .entry-grid, figure {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          .card {
            box-shadow: none !important;
            border-color: var(--border) !important;
          }

          /* 폰트·여백 살짝 축소해 한 면에 더 담기게 */
          .card { padding: 1rem 1.1rem !important; }
          .photo-slot { max-width: 130px !important; margin-bottom: 1rem !important; }
        }
      `}</style>
    </div>
  )
}

function InfoRow({ k, v, href, last }: { k: string; v: string; href?: string; last?: boolean }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        gap: '0.8rem',
        padding: '0.55rem 0',
        borderBottom: last ? 'none' : '1px solid var(--border)',
      }}
    >
      <span style={{ fontSize: '0.74rem', color: 'var(--text-faint)', flexShrink: 0 }}>{k}</span>
      {href ? (
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          style={{ fontSize: '0.82rem', textAlign: 'right', wordBreak: 'break-all', color: 'var(--accent)', textDecoration: 'none' }}
        >
          {v}
        </a>
      ) : (
        <span style={{ fontSize: '0.82rem', textAlign: 'right', wordBreak: 'break-all' }}>{v}</span>
      )}
    </div>
  )
}

function SideTitle({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--accent)' }}>
      {children}
    </p>
  )
}

function SkillBar({ level }: { level: '상' | '중' | '하' }) {
  const pct = level === '상' ? 92 : level === '중' ? 65 : 38
  return (
    <div style={{ height: 5, borderRadius: 99, background: 'var(--bg-soft)', overflow: 'hidden' }}>
      <div style={{ width: `${pct}%`, height: '100%', background: 'var(--accent)', borderRadius: 99 }} />
    </div>
  )
}

function Section({
  title,
  en,
  className,
  children,
}: {
  title: string
  en: string
  className?: string
  children: React.ReactNode
}) {
  return (
    <section className={`card ${className ?? ''}`} style={{ padding: '1.6rem 1.8rem' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: '1.1rem', paddingBottom: '0.8rem', borderBottom: '1px solid var(--border)' }}>
        <h2 style={{ fontSize: '1.05rem', fontWeight: 650, letterSpacing: '-0.01em' }}>{title}</h2>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.64rem', letterSpacing: '0.08em', color: 'var(--text-faint)', textTransform: 'uppercase' }}>{en}</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>{children}</div>
    </section>
  )
}

function Entry({ period, title, sub }: { period: string; title: string; sub: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '1rem' }} className="entry-grid">
      <span className="entry-period">{period}</span>
      <div>
        <strong style={{ fontSize: '0.92rem' }}>{title}</strong>
        <p className="muted" style={{ fontSize: '0.85rem', marginTop: '0.25rem', lineHeight: 1.6 }}>{sub}</p>
      </div>
    </div>
  )
}
