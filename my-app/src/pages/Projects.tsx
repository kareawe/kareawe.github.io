import { useState } from 'react'
import { useReveal } from '../hooks/useReveal'

const projects = [
  {
    num: '01',
    title: 'Flow — RAG 기반 문서 검색 시스템',
    role: 'Frontend Engineer',
    summary: 'LLM과 벡터DB를 활용한 지능형 문서 검색 시스템. 관리자 페이지 설계 및 개발.',
    highlights: ['검색 정확도 20% 향상', '문장 청킹 전략 최적화', 'Weaviate 기반 RAG 파이프라인'],
    fe: [
      '문서/카테고리 관리용 테이블 UX (검색·필터·정렬·체크박스·무한 스크롤) 구현',
      'Loading / Empty / Error / Retry 상태 표준화 패턴',
      'TableLayout, Badge 등 공통 컴포넌트 설계로 UI 일관성 강화',
      'React Query로 서버 상태와 UI 상태 분리, 의존성 최적화',
      'Optimistic Update로 등록/수정/삭제 UX 지연 최소화',
    ],
    tags: ['React', 'TypeScript', 'Java', 'RAG', 'Weaviate', 'React Query'],
    link: 'https://github.com/ThunderEleven-Flow',
    color: '#00d4ff',
    img: 'https://i.imgur.com/wsPRSOS.png',
  },
  {
    num: '02',
    title: 'HomeProtector — AI 전세사기 탐지',
    role: 'AI + Frontend Engineer',
    summary: 'XGBoost + SHAP + Gemini API 결합으로 전세 사기 위험 예측 및 자연어 설명 생성.',
    highlights: ['예측 정확도 12% 향상', '토큰 비용 35% 절감', 'React 기반 통합 정보 플랫폼'],
    fe: [
      'AI 분석 결과 기반 직관적 정보 재구성 UI 구성',
      'Kakao 로그인 StrictMode 중복 실행 이슈 안정화',
      'Zustand + localStorage 연동으로 라우팅·새로고침에도 입력 상태 유지',
      '입력 → 분석 → 결과 3단계 UX + 로딩·오류·재시도·근거 노출 신뢰 UX 패턴',
    ],
    tags: ['Python', 'XGBoost', 'SHAP', 'Gemini API', 'React', 'Zustand'],
    link: 'https://github.com/Commeliers/commeliers-web',
    color: '#00ff88',
    img: 'https://i.imgur.com/aRaEeSc.png',
  },
  {
    num: '03',
    title: 'ML 기반 보육시설 배치 최적화',
    role: 'ML Engineer + Frontend Design',
    summary: '머신러닝으로 지역별 보육 수요와 노동 시장을 분석, 최적 보육시설 배치 의사결정 지원 시스템.',
    highlights: ['지역별 보육 수요 예측', '최적 배치 알고리즘 구현', '시각화 기반 의사결정 지원'],
    fe: [
      '요약/비교 중심 정보 구성 (한눈에 판단 가능한 화면)',
      '필터/정렬/지도·차트형 결과 표현 등 시각화 설계 관점 강화',
    ],
    tags: ['Python', 'ML', 'Optimization', 'Data Visualization'],
    link: 'https://github.com/kareawe/ML-Driven-Optimization-of-Childcare-Allocation-and-Labor-Demand',
    color: '#9b59ff',
    img: '',
  },
]

export default function Projects() {
  const revealRef = useReveal()
  const [active, setActive] = useState<number | null>(null)

  return (
    <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh', padding: '10rem 2rem 6rem' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }} ref={revealRef}>
        {/* Header */}
        <div className="reveal" style={{ marginBottom: '5rem' }}>
          <p style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--cyan)',
            letterSpacing: '0.25em', marginBottom: '1.5rem', opacity: 0.7,
          }}>02. SELECTED WORK</p>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 400,
            fontSize: 'clamp(3.5rem, 10vw, 8rem)', letterSpacing: '-0.05em',
            lineHeight: 0.88, display: 'flex', flexDirection: 'column', gap: '0.1em',
          }}>
            <span style={{
              background: 'linear-gradient(135deg, #fff 50%, rgba(255,255,255,0.3))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              fontWeight: 800,
            }}>Selected</span>
            <span style={{
              color: 'transparent',
              WebkitTextStroke: '1px rgba(0,212,255,0.5)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
            }}>Work.</span>
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '2rem' }}>
            <div style={{ width: 40, height: 1, background: 'var(--cyan)', opacity: 0.4 }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text2)', letterSpacing: '0.1em' }}>
              {projects.length} projects · React · TypeScript · AI/ML
            </span>
          </div>
        </div>

        {/* Project cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {projects.map((p, i) => (
            <div
              key={p.num}
              className="reveal"
              style={{ transitionDelay: `${i * 0.12}s` }}
            >
              <ProjectCard
                project={p}
                isOpen={active === i}
                onToggle={() => setActive(active === i ? null : i)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectCard({
  project,
  isOpen,
  onToggle,
}: {
  project: typeof projects[0]
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div style={{
      background: 'rgba(13,13,26,0.85)',
      border: `1px solid ${isOpen ? project.color + '55' : 'var(--border)'}`,
      borderRadius: '20px',
      overflow: 'hidden',
      backdropFilter: 'blur(12px)',
      transition: 'all 0.4s ease',
      boxShadow: isOpen ? `0 0 60px ${project.color}15` : 'none',
    }}>
      {/* Card header */}
      <div
        onClick={onToggle}
        data-hover
        style={{
          padding: '2.5rem 2.5rem 2rem',
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '2rem',
          cursor: 'none',
          alignItems: 'start',
        }}
      >
        <div>
          {/* Number + Role row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.1rem', flexWrap: 'wrap' }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
              color: project.color, opacity: 0.45, letterSpacing: '0.1em',
            }}>{project.num}</span>
            <div style={{ width: 20, height: 1, background: project.color, opacity: 0.25 }} />
            <span style={{
              padding: '2px 10px', borderRadius: '4px',
              background: `${project.color}0d`, border: `1px solid ${project.color}22`,
              color: project.color, fontSize: '0.65rem', fontFamily: 'var(--font-mono)',
              letterSpacing: '0.08em',
            }}>{project.role}</span>
          </div>

          {/* Title — tall and slim */}
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 300,
            fontSize: 'clamp(1.4rem, 3vw, 2.2rem)', letterSpacing: '-0.03em',
            lineHeight: 1.1, marginBottom: '1rem', color: 'var(--text)',
          }}>
            {/* Split at em dash to style differently */}
            {project.title.includes('—') ? (
              <>
                <span style={{ fontWeight: 700 }}>{project.title.split('—')[0].trim()}</span>
                <span style={{ color: project.color, fontWeight: 200, opacity: 0.6 }}> — </span>
                <span style={{ fontWeight: 300, color: 'var(--text2)', fontSize: '0.85em' }}>{project.title.split('—')[1]?.trim()}</span>
              </>
            ) : project.title}
          </h2>

          <p style={{ color: 'var(--text2)', fontSize: '0.88rem', lineHeight: 1.8, maxWidth: 560, fontWeight: 300 }}>{project.summary}</p>

          {/* Highlights */}
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.2rem', flexWrap: 'wrap' }}>
            {project.highlights.map(h => (
              <span key={h} style={{
                fontSize: '0.7rem', color: 'var(--text2)',
                fontFamily: 'var(--font-mono)',
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '3px 10px', borderRadius: '4px',
                border: '1px solid var(--border)',
              }}>
                <span style={{ fontSize: '0.5rem', color: project.color }}>◆</span> {h}
              </span>
            ))}
          </div>
        </div>

        {/* Toggle button */}
        <div style={{
          width: 44, height: 44, borderRadius: '12px',
          border: `1px solid ${isOpen ? project.color + '50' : 'var(--border)'}`,
          background: isOpen ? `${project.color}10` : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: isOpen ? project.color : 'var(--text2)',
          fontSize: '1.4rem', lineHeight: 1,
          transition: 'all 0.3s ease',
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0)',
          flexShrink: 0,
        }}>+</div>
      </div>

      {/* Expanded content */}
      <div style={{
        maxHeight: isOpen ? '800px' : '0',
        overflow: 'hidden',
        transition: 'max-height 0.5s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <div style={{
          padding: '2rem 2.5rem 2.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          borderTop: `1px solid ${project.color}15`,
        }}>
          {/* Image */}
          {project.img && (
            <div style={{
              borderRadius: '12px', overflow: 'hidden',
              background: '#0a0a14', border: '1px solid var(--border)',
              height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <img src={project.img} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          )}

          {/* FE contributions */}
          <div>
            <p style={{
              fontFamily: 'var(--font-mono)', fontSize: '0.62rem', color: project.color,
              letterSpacing: '0.2em', marginBottom: '1.2rem', opacity: 0.7,
            }}>FRONTEND CONTRIBUTION</p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {project.fe.map((item, i) => (
                <li key={i} style={{
                  display: 'flex', gap: '12px',
                  fontSize: '0.83rem', color: 'var(--text2)', lineHeight: 1.75,
                  fontWeight: 300,
                }}>
                  <span style={{
                    color: project.color, flexShrink: 0,
                    marginTop: '0.5rem', fontSize: '0.4rem',
                    width: 4, height: 4, borderRadius: '50%',
                    background: project.color, display: 'inline-block',
                  }} />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tech + Link */}
        <div style={{
          padding: '1.2rem 2rem',
          borderTop: `1px solid ${project.color}10`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem',
        }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
            {project.tags.map(tag => (
              <span key={tag} style={{
                padding: '3px 10px', borderRadius: '4px',
                background: 'transparent', border: `1px solid ${project.color}20`,
                color: 'var(--text2)', fontSize: '0.68rem', fontFamily: 'var(--font-mono)',
                letterSpacing: '0.05em',
              }}>{tag}</span>
            ))}
          </div>
          <a href={project.link} target="_blank" rel="noreferrer" data-hover style={{
            display: 'inline-flex', alignItems: 'center', gap: '6px',
            color: project.color, fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem', letterSpacing: '0.1em',
            transition: 'opacity 0.2s ease', opacity: 0.7,
            textDecoration: 'none',
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
          >
            VIEW ON GITHUB <span style={{ fontSize: '0.9em' }}>↗</span>
          </a>
        </div>
      </div>
    </div>
  )
}