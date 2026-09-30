import skaxDashboard from '../pages/skax-dashboard.png'

export type Trouble = {
  title: string
  problem: string
  cause?: string
  solution?: string
  /** 여러 작업을 나열할 때 (solution 대신 사용) */
  actions?: string[]
  code?: string
  result: string
  /** result 값이 실측 전 placeholder면 true */
  todo?: boolean
}

export type Project = {
  id: string
  title: string
  subtitle: string
  /** 카드 상단 뱃지 (현업 / 기업 연계 / 팀 프로젝트) */
  badge: string
  /** 현업 프로젝트 강조 */
  featured?: boolean
  role: string
  summary: string
  /** 한눈에 보는 핵심 성과 (3~4개) */
  highlights: string[]
  ai?: string
  period: string
  contribution: string // 기여도 %
  contributionRole: string
  stack: string[]
  image?: string
  imageCaption?: string
  /** 사내 보안으로 화면 대신 구조도를 보여줄 때 */
  diagram?: 'proposal-ai'
  /** 트러블슈팅 섹션 이름 (기본: 트러블슈팅) */
  troubleLabel?: [string, string]
  troubles: Trouble[]
  link?: string
}

export const projects: Project[] = [
  {
    id: 'skax-proposal-ai',
    title: 'SK AX 전략 제안서 AI 개발 및 운영',
    subtitle: '애커튼테크놀로지서비스 · AI 혁신 TF팀',
    badge: '현업 · 운영 중',
    featured: true,
    role: '개발 · 보안 · 배포 · 운영',
    summary:
      'RFP 입찰 제안서 작성을 돕는 사내 AI를 개발하고, KISA 기준 보안 점검과 전사 배포, 운영·백업 체계 구축까지 수행했습니다.',
    highlights: ['전사 시스템 운영 중', '라이선스 판매 · 외부 도입 진행', 'KISA 점검 108개 중 96개 개선', '복구 테스트까지 검증한 백업 체계'],
    ai: '경쟁사 정보 · 법률 데이터 · 사내 RFP 이력을 MCP로 연결한 제안서 작성 AI',
    period: '2026.07 – 진행 중',
    contribution: '70',
    contributionRole: '개발 · 보안 점검 · 배포 · 운영',
    stack: ['MCP', 'Docker', 'Linux (iptables)', 'rsnapshot', 'rsync', 'ReaR'],
    diagram: 'proposal-ai',
    troubleLabel: ['주요 수행 내용', 'Work'],
    troubles: [
      {
        title: '전략 제안서 AI 개발',
        problem:
          '제안서 작성에 필요한 경쟁사 정보, 법률 데이터, 과거 RFP 이력이 각각 흩어져 있어 작성자가 일일이 찾아봐야 했음.',
        actions: [
          '경쟁사 정보 · 법률 데이터 · 사내 RFP 히스토리를 MCP로 연결하는 구조 설계',
          'MCP 기반 PPT 내용 일관성 검토, 문맥 연결 흐름 검토 기능 구현',
          '발표 스크립트 생성 기능 구현 및 제안서 기능 운영 관리',
        ],
        result: '전사 시스템으로 운영 중 · 라이선스 형태로 판매, 외부 기업 도입 진행 중',
      },
      {
        title: 'KISA 기준 서버 보안 점검 및 전사 배포',
        problem:
          '판교 데이터센터 온프레미스 서버에 구축한 Docker 환경을 전사 배포 전에 KISA 기준으로 검증해야 했음.',
        actions: [
          'Docker 컨테이너용 iptables(DOCKER-USER) 허용 IP 규칙 적용',
          '인증키 파일 권한 변경 및 소유자 root 지정',
          '업로드 용량은 RFP 파일 크기를 고려해 1GB 유지로 판단',
          '즉시 조치가 어려운 12개 항목은 담당자 의견을 담은 소명 파일을 보안감사팀에 제출해 예외 처리',
          '점검 완료 후 전사 배포 직접 수행',
        ],
        result: '점검 항목 108개 중 96개 개선 · 나머지 12개 소명 후 전사 배포',
      },
      {
        title: '백업 · 복구 체계 구축',
        problem: '기존 백업 방식으로는 장애 시 안정적인 복구를 보장하기 어렵다고 판단.',
        actions: [
          'rsnapshot · ssh · rsync 기반 파일 백업 체계 구축',
          'ReaR를 활용한 OS 시스템 백업 체계 구축',
          '구축에서 끝내지 않고 실제 복구 테스트까지 수행',
        ],
        result: '파일 + OS 이중 백업 · 실제 복구 테스트로 복구 가능성 검증',
      },
    ],
  },
  {
    id: 'chip-scheduler',
    title: '반도체 공정 지연 위험 재조정 시스템',
    subtitle: 'SKALA · SK AX 기업 연계 프로젝트',
    badge: '기업 연계',
    role: 'Backend · AI 연동',
    summary:
      '외부 AI가 공정 지연 위험을 주기적으로 재예측하고 재조정 에이전트가 대안을 생성하는 환경에서, 변하는 위험 데이터와 외부 AI 호출 사이의 정합성을 구조적으로 보장하는 백엔드.',
    highlights: ['502 남발 → 장애/데이터 상태 구분', '입구·출구 동일 불변 조건 적용', '재조정안 생성 전 흐름 검증'],
    ai: '지연 위험 예측 모델(/predict) + 재조정 AI 에이전트(/run) 외부 연동 · risk_id 정합성 동기화',
    period: '2026.04 – 2026.06',
    contribution: '80',
    contributionRole: '외부 AI 연동 · 데이터 정합성 설계 · 위험 그룹핑',
    stack: ['Spring Boot', 'PostgreSQL', 'External AI API', 'Data Integrity'],
    image: skaxDashboard,
    imageCaption: 'chipScheduler — 스케줄 재조정 후보안 대시보드',
    troubles: [
      {
        title: '재조정 API가 502로 실패 — 사실은 정합성 문제',
        problem: '외부 재조정 에이전트(/run) 호출이 502로 실패. 표면상 연동 장애로 보였음.',
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
        problem: '404를 막아도, 위험 탐지~호출 사이 unit이 다음 step으로 넘어가면 409("큐에 없음")가 남음.',
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
    id: 'flow-rag',
    title: 'RAG 기반 문서 검색 시스템',
    subtitle: 'Flow · 팀 프로젝트',
    badge: '팀 프로젝트',
    role: 'AI · Frontend',
    summary: 'LLM과 벡터DB로 사내 문서를 검색하고, 관리자가 문서·카테고리를 손쉽게 운영하도록 돕는 시스템.',
    highlights: ['Weaviate 기반 RAG 파이프라인', '문장 단위 청킹 재설계', 'React Query 캐싱 · 낙관적 갱신'],
    ai: 'Weaviate 벡터DB 기반 RAG 파이프라인 + 문장 청킹 전략 최적화',
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
    id: 'home-protector',
    title: '전세사기 위험 분석 플랫폼',
    subtitle: 'HomeProtector · 팀 프로젝트',
    badge: '팀 프로젝트',
    role: 'AI · Full-Stack',
    summary:
      '전세 계약 전, 등기부등본·시세 데이터를 분석해 사기 위험을 예측하고 그 근거까지 사용자에게 설명하는 플랫폼.',
    highlights: ['XGBoost · SHAP 위험 예측', 'Gemini로 예측 근거 설명', 'OCR 등기부등본 분석'],
    ai: 'XGBoost·SHAP 위험 예측 + Gemini LLM 근거 생성 + OCR 문서 분석',
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
