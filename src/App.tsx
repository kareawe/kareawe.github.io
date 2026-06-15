import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'

import Nav from './components/Nav'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import Portfolio from './pages/PortfolioPdf'
import Resume from './pages/Resume'
import PortfolioExport from './pages/PortfolioExport'

function App() {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionStage, setTransitionStage] = useState<'enter' | 'exit'>('enter')

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      requestAnimationFrame(() => {
        setTransitionStage('exit')
        setTimeout(() => {
          setDisplayLocation(location)
          setTransitionStage('enter')
          window.scrollTo(0, 0)
        }, 200)
      })
    }
  }, [location, displayLocation])

  return (
    <>
      <Nav />
      <main
        style={{
          opacity: transitionStage === 'exit' ? 0 : 1,
          transform: transitionStage === 'exit' ? 'translateY(8px)' : 'translateY(0)',
          transition: 'opacity 0.2s ease, transform 0.2s ease',
        }}
      >
        <Routes location={displayLocation}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/portfolio-export" element={<PortfolioExport />} />
        </Routes>
      </main>
    </>
  )
}

export default App
