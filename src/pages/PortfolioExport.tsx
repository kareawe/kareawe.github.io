import Home from './Home'
import Projects from './Projects'
import Contact from './Contact'

/**
 * About(Home) + Projects + Contact 를 한 문서로 이어 붙인 인쇄 전용 페이지.
 * Cmd+P → "PDF로 저장" 하면 포트폴리오 전체가 하나의 PDF로 나온다. (이력서 제외)
 */
export default function PortfolioExport() {
  return (
    <div className="pf-export">
      <div className="export-toolbar no-print">
        <span>포트폴리오 PDF 미리보기 · About + Projects + Contact</span>
        <button className="btn btn-primary" onClick={() => window.print()}>
          PDF로 저장 / 인쇄
        </button>
      </div>

      <section className="export-section">
        <Home />
      </section>
      <section className="export-section">
        <Projects />
      </section>
      <section className="export-section">
        <Contact />
      </section>

      <style>{`
        .export-toolbar {
          position: sticky;
          top: 64px;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          flex-wrap: wrap;
          padding: 0.8rem 1.2rem;
          margin: 0 auto;
          background: color-mix(in srgb, var(--bg) 86%, transparent);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--border);
          font-size: 0.85rem;
          color: var(--text-muted);
        }

        @media print {
          @page { size: A4 portrait; margin: 12mm 0; }

          /* 섹션마다 새 페이지에서 시작 */
          .pf-export .export-section { break-before: page; }
          .pf-export .export-section:first-of-type { break-before: auto; }

          /* 컨테이너 폭을 A4에 맞추고 좌우 여백은 패딩으로 직접 부여
             (인쇄창 여백 설정과 무관하게 항상 적용됨) */
          .pf-export .container {
            max-width: 100% !important;
            width: 100% !important;
            padding-left: 14mm !important;
            padding-right: 14mm !important;
            box-sizing: border-box !important;
          }

          /* 화면용 큰 히어로/섹션 여백을 인쇄용으로 압축 */
          .pf-export .band {
            min-height: auto !important;
            padding-top: 10mm !important;
            padding-bottom: 8mm !important;
          }
          /* 상하만 압축 — 좌우는 .container 의 14mm 마진을 덮어쓰지 않도록 longhand 사용 */
          .pf-export .section { padding-top: 7mm !important; padding-bottom: 7mm !important; }

          /* Home/Contact 카드: 경계에서 쪼개지지 않게 */
          .pf-export .card,
          .pf-export figure {
            break-inside: avoid;
            page-break-inside: avoid;
          }
          .pf-export .card { box-shadow: none !important; }

          /* ── 프로젝트: 1개 = 1페이지 ───────────────────────────
             "핵심 프로젝트" 헤더 밴드는 PDF에서 숨겨(빈 페이지 방지)
             각 프로젝트가 페이지 맨 위에서 시작하게 하고, 인쇄용으로 강하게
             압축해 한 장에 담으며, 절대 중간에서 쪼개지지 않게 한다 */
          .pf-export .export-section:nth-of-type(2) .band { display: none !important; }

          .pf-export .project-item { break-before: page; }
          .pf-export .project-item:first-child { break-before: auto; }
          .pf-export .project-item article.card {
            break-inside: avoid;
            page-break-inside: avoid;
            zoom: 0.76;                 /* 전체를 비례 축소해 한 장에 맞춤 */
            padding: 1.1rem 1.3rem !important;
          }

          /* 코드블록·예시 안내는 PDF에서 생략 (화면엔 그대로 표시) */
          .pf-export .code-block,
          .pf-export .todo-note { display: none !important; }

          /* 블록/트러블 항목의 inline 여백을 직접 압축해 한 장에 담기 */
          .pf-export .pblock { padding: 0.65rem 0 !important; }
          .pf-export .trouble { padding: 0.7rem 0.9rem !important; }
          .pf-export .project-item article.card img { max-height: 130px !important; }
        }

        @media (max-width: 640px) {
          .export-toolbar { top: 0; }
        }
      `}</style>
    </div>
  )
}
