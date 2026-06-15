import './PortfolioPdf.css'

const projects = [
  {
    title: '반도체 공정 대시보드 프로젝트',
    subtitle: 'SK AX 기업 연계 프로젝트',
    role: '백엔드 · 데이터 처리 구조 설계',
    problem:
      '다수 사용자의 동시 조회 환경에서 공정 데이터 응답 지연과 병목 가능성이 존재했습니다.',
    solution:
      'PostgreSQL 기반 데이터 구조와 API 흐름을 설계하고 로그 모니터링 기반으로 병목 구간과 장애 발생 가능성을 점검했습니다.',
    result:
      '실시간 조회 환경에서도 안정적인 응답이 가능하도록 데이터 처리 흐름과 운영 안정성을 고려했습니다.',
    stack: ['PostgreSQL', 'Spring Boot', 'API', 'Monitoring'],
  },
  {
    title: '사내 문서 기반 챗봇 프로젝트',
    subtitle: '가천 SW아카데미',
    role: 'RAG 검색 구조 · 백엔드 API 구현',
    problem:
      '검색 요청 증가에 따라 응답 속도 저하와 동일 질문 반복 문제가 발생했습니다.',
    solution:
      'FAQ·일반대화·문서검색 분기 구조를 설계하고 Redis 기반 캐시 구조와 검색 로직 최적화를 적용했습니다.',
    result:
      '반복 요청 처리 속도를 개선하고 응답 안정성과 검색 정확도를 함께 향상시켰습니다.',
    stack: ['RAG', 'Redis', 'PostgreSQL', 'API'],
  },
  {
    title: '전세사기 예방 플랫폼 프로젝트',
    subtitle: 'OCR 기반 위험 분석',
    role: '데이터 추출 · 위험 분석 로직 구현',
    problem:
      '등기부등본 을구 파싱 과정에서 문서의 형식, 선명도, 해상도 차이로 OCR 인식 정확도가 낮았습니다.',
    solution:
      '이미지 전처리와 데이터 검증 로직을 개선해 근저당권·채권최고액 등 핵심 데이터 추출 정확도를 높였습니다.',
    result:
      '사용자가 계약 전 위험 요소를 직관적으로 확인할 수 있는 분석 구조를 구현했습니다.',
    stack: ['OCR', 'Data Validation', 'Risk Analysis'],
  },
]

function PortfolioPdf() {
  return (
    <div className="portfolio-page">
      <section className="a4-page">
        <header className="hero-section">
          <div>
            <p className="eyebrow">FULL-STACK PORTFOLIO</p>
            <h1>
              데이터 흐름과 운영 안정성을
              <br />
              설계하는 김민재입니다.
            </h1>
            <p className="hero-desc">
              금융수학 기반의 데이터 이해와 백엔드 개발 경험을 바탕으로
              데이터 정합성, 응답 안정성, 운영 환경을 함께 고려하는 개발을
              지향합니다.
            </p>
          </div>

          <div className="hero-card">
            <p>Position</p>
            <strong>Full-Stack Developer</strong>
            <span>
              Data Reliability
              <br />
              Stable API
              <br />
              SQL · Redis · Monitoring
            </span>
          </div>
        </header>

        <section className="section">
          <div className="section-title">
            <span>01</span>
            <h2>About Me</h2>
          </div>

          <div className="highlight-box">
            <strong>
              빠른 기능 구현보다 중요한 것은 안정적으로 동작하는 구조라고
              생각합니다.
            </strong>
            <p>
              저는 데이터가 정확하게 흐르고, 서비스가 안정적으로 동작하는
              구조를 고민하는 개발자입니다. 프로젝트를 진행하며 단순히 기능을
              구현하는 것보다 데이터 정합성, 응답 안정성, 운영 환경에서 발생할
              수 있는 병목을 함께 고려하는 것이 중요하다고 느꼈습니다.
              금융수학 전공을 바탕으로 데이터와 서비스 흐름을 이해하고,
              백엔드 개발 경험을 통해 안정적인 시스템 구조를 설계하는 역량을
              키워왔습니다.
            </p>
          </div>
        </section>

        <section className="section">
          <div className="section-title">
            <span>02</span>
            <h2>Core Strength</h2>
          </div>

          <div className="strength-grid">
            <div>
              <strong>Data Reliability</strong>
              <p>데이터 정합성과 검증 로직을 고려한 처리 구조 설계</p>
            </div>
            <div>
              <strong>Stable Response</strong>
              <p>동시 조회 환경에서의 응답 안정성 개선 경험</p>
            </div>
            <div>
              <strong>Cache Strategy</strong>
              <p>Redis 기반 반복 요청 처리 및 응답 속도 개선</p>
            </div>
            <div>
              <strong>Monitoring</strong>
              <p>로그 기반 병목 구간 점검과 운영 안정성 개선</p>
            </div>
          </div>
        </section>
      </section>

      <section className="a4-page">
        <div className="section-title">
          <span>03</span>
          <h2>Projects</h2>
        </div>

        <div className="project-list">
          {projects.slice(0, 2).map((project, index) => (
            <article className="project-card large" key={project.title}>
              <div className="project-head">
                <div>
                  <p className="project-index">PROJECT {index + 1}</p>
                  <h3>{project.title}</h3>
                  <span>{project.subtitle}</span>
                </div>
                <em>{project.role}</em>
              </div>

              <div className="project-body">
                <p>
                  <b>문제</b>
                  {project.problem}
                </p>
                <p>
                  <b>해결</b>
                  {project.solution}
                </p>
                <p>
                  <b>결과</b>
                  {project.result}
                </p>
              </div>

              <div className="stack-list">
                {project.stack.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="a4-page">
        <div className="section-title">
          <span>04</span>
          <h2>Additional Project</h2>
        </div>

        <article className="project-card large">
          <div className="project-head">
            <div>
              <p className="project-index">PROJECT 3</p>
              <h3>{projects[2].title}</h3>
              <span>{projects[2].subtitle}</span>
            </div>
            <em>{projects[2].role}</em>
          </div>

          <div className="project-body">
            <p>
              <b>문제</b>
              {projects[2].problem}
            </p>
            <p>
              <b>해결</b>
              {projects[2].solution}
            </p>
            <p>
              <b>결과</b>
              {projects[2].result}
            </p>
          </div>

          <div className="stack-list">
            {projects[2].stack.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </article>

        <section className="section">
          <div className="section-title">
            <span>05</span>
            <h2>Tech Stack</h2>
          </div>

          <div className="tech-grid">
            <div>
              <strong>Backend</strong>
              <p>Spring Boot, Java, Python, REST API</p>
            </div>
            <div>
              <strong>Database</strong>
              <p>PostgreSQL, SQL, Data Modeling</p>
            </div>
            <div>
              <strong>Infra · Operation</strong>
              <p>Linux, Docker, Kubernetes, Log Monitoring</p>
            </div>
            <div>
              <strong>Data · AI</strong>
              <p>RAG, OCR, Redis Cache, Data Validation</p>
            </div>
          </div>
        </section>

        <section className="closing-section">
          <h2>제가 만들고 싶은 가치</h2>
          <p>
            앞으로도 데이터의 정확성과 서비스의 안정성을 함께 고려하는 개발자가
            되고 싶습니다. 프론트엔드부터 API, 데이터베이스, 캐시, 모니터링
            구조까지 함께 이해하며 사용자가 신뢰할 수 있는 서비스를 만드는 데
            집중하겠습니다.
          </p>
        </section>
      </section>
    </div>
  )
}

export default PortfolioPdf
