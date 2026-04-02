import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Nav from './components/Nav'
import Cursor from './components/Cursor'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Contact from './pages/Contact'
import GridBackground from './components/GridBackground'

function App() {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const [transitionStage, setTransitionStage] = useState<'enter' | 'exit'>('enter')

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      // 다음 프레임에서 실행 (React warning 회피)
      requestAnimationFrame(() => {
        setTransitionStage('exit')

        setTimeout(() => {
          setDisplayLocation(location)
          setTransitionStage('enter')
          window.scrollTo(0, 0)
        }, 300)
      })
    }
  }, [location, displayLocation])

  return (
    <>
      <Cursor />
      <GridBackground />
      <Nav />
      <main
        style={{
          opacity: transitionStage === 'exit' ? 0 : 1,
          transform:
            transitionStage === 'exit'
              ? 'translateY(20px)'
              : 'translateY(0)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      >
        <Routes location={displayLocation}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </>
  )
}

export default App