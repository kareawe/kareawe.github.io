import { useReveal } from '../hooks/useReveal'
import skaxDashboard from './skax-dashboard.png'

type Trouble = {
  title: string
  problem: string
  cause: string
  solution: string
  code?: string
  result: string
  /** result 값이 실측 전 placeholder면 true */
  todo?: boolean
}

type Project = {
  title: string
  subtitle: string
  role: string
  ai?: string
  purpose: string
  period: string
  contribution: string // 기여도 %
  contributionRole: string
  stack: string[]
  image?: string
  imageCaption?: string
  troubles: Trouble[]
  link?: string
}

const projects: Project[] = [
  {
    title: '반도체 공정 지연 위험 재조정 시스템',
    subtitle: 'SK AX 기업 연계 프로젝트',
    role: 'Backend · AI 연동',
    ai: '지연 위험 예측 모델(/predict) + 재조정 AI 에이전트(/run) 외부 연동 · risk_id 정합성 동기화',
    purpose:
      '외부 AI가 공정 지연 위험을 주기적으로 재예측하고 재조정 에이전트가 대안을 생성하는 환경에서, 끊임없이 변하는 위험 데이터와 외부 AI 호출 사이의 데이터 정합성을 구조적으로 보장하는 백엔드.',
    period: '2026.04 – 2026.06',
    contribution: '80',
    contributionRole: '외부 AI 연동 · 데이터 정합성 설계 · 위험 그룹핑',
    stack: ['Spring Boot', 'PostgreSQL', 'External AI API', 'Data Integrity'],
    image: skaxDashboard,
    imageCaption: 'chipScheduler — 스케줄 재조정 후보안 대시보드',
    troubles: [
      {
        title: '재조정 API가 502로 실패 — 사실은 정합성 문제',
        problem:
          '외부 재조정 에이전트(/run) 호출이 502로 실패. 표면상 연동 장애로 보였음.',
        cause:
          'AI가 /predict로 주기적 재예측을 돌리면 위험이 새 risk_id로 재생성되는데, 그룹은 예전 risk_id(member_risk_ids)를 그대로 들고 있어 stale 포인터가 됨. (404 = 사라진 위험, 409 = 큐를 떠난 unit) → 서버 장애가 아니라 "보낸 데이터가 현재 시점과 안 맞는다"는 신호.',
        solution:
          'AI 호출 실패를 의미 단위로 분리. 404·409는 "현재 큐에서 처리 불가능한 데이터 조건"(NotActionableException → 409 + 사유), 진짜 5xx만 AiAgentException → 502로 올림.',
        code: `catch (HttpClientErrorException e) {
  int s = e.getStatusCode().value();
  if (s == 404 || s == 409)          // 데이터 상태: 처리할 위험 없음
    throw new NotActionableException(...);
  throw new AiAgentException(...);    // 진짜 연동 장애만 502
}`,
        result: '502 남발 제거 → 로그·모니터링에서 장애 vs 데이터 상태 구분, 원인 추적 가능',
      },
      {
        title: 'unit이 큐를 떠나 409',
        problem:
          '404를 막아도, 위험 탐지~호출 사이 unit이 다음 step으로 넘어가면 409("큐에 없음")가 남음.',
        cause: '공정 진행 속도 — 그룹을 만든 뒤 unit이 process_queue를 벗어남.',
        solution:
          'process_queue 필터로 현재 대기열에 있는 unit의 위험만 actionable로 간주. 같은 필터를 그룹 생성(입구)과 재동기화(출구) 양쪽에 동일 적용해 같은 불변 조건을 경로 전체에서 강제. actionable 위험도 성공안도 없는 phantom 그룹은 expire 처리(success 옵션이 있으면 보존).',
        code: `// 현재 대기열(process_queue)에 있는 unit만 actionable
var queued = processQueueRepo.findByDistrictAndStep(districtId, stepId);
representatives = live.stream()
  .filter(r -> queued.contains(r.getUnit().getUnitId()))
  .toList();`,
        result: '409가 날 데이터가 파이프라인에 진입 불가 → success 재조정안 생성까지 전 흐름 검증',
      },
    ],
  },
  {
    title: 'RAG 기반 문서 검색 시스템',
    subtitle: 'Flow · 팀 프로젝트',
    role: 'AI · Frontend',
    ai: 'Weaviate 벡터DB 기반 RAG 파이프라인 + 문장 청킹 전략 최적화',
    purpose:
      'LLM과 벡터DB로 사내 문서를 검색하고, 관리자가 문서·카테고리를 손쉽게 운영하도록 돕는 시스템.',
    period: '2025.07 – 2025.08',
    contribution: '80',
    contributionRole: '관리자 화면(FE) 전반 · 검색 결과 UX',
    stack: ['React', 'TypeScript', 'Java', 'RAG', 'Weaviate', 'React Query'],
    image: 'https://i.imgur.com/wsPRSOS.png',
    imageCaption: '문서 관리 화면',
    troubles: [
      {
        title: '과도한 리렌더와 중복 요청',
        problem: '관리자 테이블에서 필터·입력이 바뀔 때마다 불필요한 리렌더와 중복 API 호출이 발생.',
        cause: '서버 상태와 UI 상태가 한 곳에서 관리되어 의존성이 얽힘.',
        solution: 'React Query로 서버 상태를 분리·캐싱하고 쿼리 키를 정규화, 변경 작업에 Optimistic Update 적용.',
        code: `const { mutate } = useMutation({
  mutationFn: updateDoc,
  onMutate: async (next) => {
    await qc.cancelQueries({ queryKey: ['docs'] })
    const prev = qc.getQueryData(['docs'])
    qc.setQueryData(['docs'], (d) => patch(d, next)) // 낙관적 갱신
    return { prev }
  },
  onError: (_e, _v, ctx) => qc.setQueryData(['docs'], ctx.prev),
})`,
        result: '체감 지연 최소화 · 중복 요청 감소',
        todo: true,
      },
      {
        title: 'RAG 검색 정확도 부족',
        problem: '검색 결과가 질문 의도와 어긋나 정확도가 낮았음.',
        cause: '청킹 단위가 부적절해 문맥이 끊기거나 과하게 묶임.',
        solution: '문장 단위 청킹으로 재설계하고 임베딩 전략을 비교 실험해 최적 조합 선정.',
        result: '검색 정확도 +20%',
        todo: true,
      },
    ],
    link: 'https://github.com/ThunderEleven-Flow',
  },
  {
    title: '전세사기 위험 분석 플랫폼',
    subtitle: 'HomeProtector · 팀 프로젝트',
    role: 'AI · Full-Stack',
    ai: 'XGBoost·SHAP 위험 예측 + Gemini LLM 근거 생성 + OCR 문서 분석',
    purpose:
      '전세 계약 전, 등기부등본·시세 데이터를 분석해 사기 위험을 예측하고 그 근거까지 사용자에게 설명하는 플랫폼.',
    period: '2025.03 – 2025.06',
    contribution: '80',
    contributionRole: 'AI 모델링 · OCR 파이프라인 · 결과 화면(FE)',
    stack: ['Python', 'XGBoost', 'SHAP', 'Gemini API', 'OCR', 'React', 'Zustand'],
    image: 'https://i.imgur.com/aRaEeSc.png',
    imageCaption: '분석 결과 화면',
    troubles: [
      {
        title: 'Kakao 소셜 로그인 중복 호출',
        problem: '소셜 로그인 콜백이 간헐적으로 2번 실행되어 토큰 재발급과 상태 꼬임이 발생.',
        cause: 'React 18 StrictMode의 개발 모드 이중 마운트로 useEffect 내 로그인 처리가 2회 실행됨.',
        solution: '1회 실행을 보장하는 ref 가드를 추가하고 로그인 콜백을 effect 의존성에서 분리.',
        code: `const ran = useRef(false)
useEffect(() => {
  if (ran.current) return      // StrictMode 이중 실행 방지
  ran.current = true
  handleKakaoLogin(code)
}, [])`,
        result: '중복 호출 제거 → 로그인 실패·상태 꼬임 해소',
      },
      {
        title: 'LLM 토큰 비용 과다',
        problem: 'Gemini로 위험 근거를 생성할 때 토큰 사용량과 호출 비용이 과도하게 발생.',
        cause: '매 요청마다 전체 SHAP 출력과 문맥을 그대로 프롬프트에 포함.',
        solution: '상위 기여 변수만 추출해 프롬프트를 구조화하고, 동일 입력에 대한 응답을 캐싱.',
        result: 'LLM 토큰 비용 약 35% 절감',
        todo: true,
      },
      {
        title: 'OCR 인식 정확도 저조',
        problem: '등기부등본 을구의 근저당권·채권최고액 등 핵심 항목이 자주 오인식됨.',
        cause: '문서 해상도·기울기·레이아웃 편차로 인식 품질이 일정하지 않음.',
        solution: '이미지 전처리(이진화·기울기 보정)와 추출값 검증 규칙을 추가.',
        result: '핵심 항목 추출 안정화 → 예측 정확도 +12%',
        todo: true,
      },
    ],
    link: 'https://github.com/Commeliers/commeliers-web',
  },
]

export default function Projects() {
  const revealRef = useReveal()

  return (
    <div ref={revealRef}>
      {/* Navy header band */}
      <section className="band" style={{ paddingTop: '8.5rem', paddingBottom: '3.2rem' }}>
        <div className="container reveal">
          <p className="eyebrow" style={{ marginBottom: '0.9rem' }}>Selected Work</p>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.2rem)', fontWeight: 700, letterSpacing: '-0.04em' }}>
            핵심 프로젝트
          </h1>
          <p className="muted" style={{ marginTop: '0.8rem', maxWidth: 600 }}>
            각 프로젝트를{' '}
            <strong style={{ color: '#fff' }}>개요·기여도 → 핵심 UI → 트러블슈팅</strong>{' '}
            순으로 정리했습니다. 트러블슈팅은{' '}
            <strong style={{ color: '#fff' }}>문제 → 원인 → 해결 → 개선 수치</strong> 흐름을 따릅니다.
          </p>
        </div>
      </section>

      {/* Cards on light body */}
      <div className="container" style={{ paddingTop: '3rem', paddingBottom: '7rem' }}>
        <div className="project-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
          {projects.map((p, i) => (
            <div key={p.title} className="reveal project-item">
              <ProjectCard project={p} index={i + 1} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <article className="card" style={{ padding: '2rem' }}>
      {/* Head */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: '1rem',
          marginBottom: project.ai ? '1.2rem' : '1.6rem',
        }}
      >
        <div>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-faint)', marginBottom: '0.5rem' }}>
            PROJECT {String(index).padStart(2, '0')}
          </p>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 650, letterSpacing: '-0.02em' }}>{project.title}</h2>
          <p className="muted" style={{ fontSize: '0.85rem', marginTop: '0.3rem' }}>{project.subtitle}</p>
        </div>
        <span className="tag tag-accent" style={{ whiteSpace: 'nowrap', flexShrink: 0 }}>{project.role}</span>
      </div>

      {project.ai && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'var(--accent-soft)',
            border: '1px solid var(--accent-border)',
            borderRadius: 10,
            padding: '0.7rem 0.9rem',
            marginBottom: '1.6rem',
          }}
        >
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.66rem', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.06em', flexShrink: 0 }}>
            AI 핵심
          </span>
          <span style={{ fontSize: '0.82rem', color: 'var(--text)' }}>{project.ai}</span>
        </div>
      )}

      {/* 1. Overview */}
      <Block label="개요 · 기여도" en="Overview">
        <p style={{ marginBottom: '1rem', lineHeight: 1.8 }}>{project.purpose}</p>
        <div className="ov-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.8rem' }}>
          <Meta label="개발 기간" value={project.period} />
          <Meta label="기여도" value={`${project.contribution}%`} sub={project.contributionRole} accent />
          <Meta label="기술 스택" value={project.stack.join(' · ')} />
        </div>
        <style>{`@media (max-width:560px){ .ov-grid{ grid-template-columns: 1fr !important; } }`}</style>
      </Block>

      {/* 2. Key UI */}
      {project.image ? (
        <Block label="핵심 화면" en="Key UI">
          <figure style={{ margin: 0 }}>
            <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)', background: '#fff' }}>
              <img src={project.image} alt={project.imageCaption ?? project.title} style={{ width: '100%', maxHeight: 320, objectFit: 'contain' }} />
            </div>
            <figcaption style={{ fontSize: '0.72rem', color: 'var(--text-faint)', marginTop: '0.4rem', textAlign: 'center' }}>
              {project.imageCaption ?? '핵심 화면'}
            </figcaption>
          </figure>
        </Block>
      ) : (
        <Block label="핵심 화면" en="Key UI">
          <div className="media-slot">
            <span style={{ fontSize: '0.8rem' }}>🖼️ 핵심 UI 캡처</span>
            <span style={{ fontSize: '0.7rem' }}>가장 공들인 화면 첨부</span>
          </div>
        </Block>
      )}

      {/* 3. Troubleshooting */}
      <Block label="트러블슈팅" en="Troubleshooting" accent>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {project.troubles.map((t, i) => (
            <TroubleItem key={i} num={i + 1} trouble={t} />
          ))}
        </div>
      </Block>

      {/* Footer */}
      {project.link && (
        <div style={{ marginTop: '1.6rem', paddingTop: '1.3rem', borderTop: '1px solid var(--border)', textAlign: 'right' }}>
          <a href={project.link} target="_blank" rel="noreferrer" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--accent)' }}>
            GitHub ↗
          </a>
        </div>
      )}
    </article>
  )
}

function Block({
  label,
  en,
  accent,
  children,
}: {
  label: string
  en: string
  accent?: boolean
  children: React.ReactNode
}) {
  return (
    <div className="pblock" style={{ padding: '1.3rem 0', borderTop: '1px solid var(--border)' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '0.98rem', fontWeight: 650, color: accent ? 'var(--accent)' : 'var(--text)' }}>{label}</h3>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.08em', color: 'var(--text-faint)', textTransform: 'uppercase' }}>{en}</span>
      </div>
      {children}
    </div>
  )
}

function Meta({ label, value, sub, accent }: { label: string; value: string; sub?: string; accent?: boolean }) {
  return (
    <div
      style={{
        background: 'var(--bg-soft)',
        border: '1px solid var(--border)',
        borderRadius: 10,
        padding: '0.8rem 0.9rem',
      }}
    >
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.06em', color: 'var(--text-faint)', textTransform: 'uppercase', marginBottom: '0.35rem' }}>
        {label}
      </p>
      <p style={{ fontSize: '0.84rem', fontWeight: 600, color: accent ? 'var(--accent)' : 'var(--text)', lineHeight: 1.45 }}>{value}</p>
      {sub && <p className="muted" style={{ fontSize: '0.72rem', marginTop: '0.3rem' }}>{sub}</p>}
    </div>
  )
}

function TroubleItem({ num, trouble }: { num: number; trouble: Trouble }) {
  const rows: { k: string; v: string }[] = [
    { k: '문제', v: trouble.problem },
    { k: '원인', v: trouble.cause },
    { k: '해결', v: trouble.solution },
  ]
  return (
    <div className="trouble" style={{ border: '1px solid var(--border)', borderRadius: 12, padding: '1.1rem 1.2rem', background: 'var(--bg-soft)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.8rem' }}>
        <span
          style={{
            width: 22,
            height: 22,
            borderRadius: 7,
            background: 'var(--accent)',
            color: '#fff',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {num}
        </span>
        <span style={{ fontWeight: 600, fontSize: '0.92rem' }}>{trouble.title}</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {rows.map((r) => (
          <div key={r.k} style={{ display: 'grid', gridTemplateColumns: '46px 1fr', gap: '0.7rem' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--text-muted)', paddingTop: '0.05rem' }}>{r.k}</span>
            <span className="muted" style={{ fontSize: '0.85rem', lineHeight: 1.65 }}>{r.v}</span>
          </div>
        ))}
      </div>

      {trouble.code && <pre className="code-block">{trouble.code}</pre>}

      {/* Result */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.55rem',
          marginTop: '0.9rem',
          padding: '0.6rem 0.8rem',
          borderRadius: 9,
          background: 'var(--accent-soft)',
          border: '1px solid var(--accent-border)',
        }}
      >
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.64rem', fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.05em', flexShrink: 0 }}>
          개선
        </span>
        <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text)' }}>{trouble.result}</span>
        {trouble.todo && (
          <span className="todo-note" style={{ fontSize: '0.66rem', color: 'var(--text-faint)', marginLeft: 'auto', whiteSpace: 'nowrap' }}>
            * 실측값 확인
          </span>
        )}
      </div>
    </div>
  )
}
