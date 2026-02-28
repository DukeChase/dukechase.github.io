import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import MainContent from './components/MainContent'
import ParticleBackground from './components/ParticleBackground'
import './styles.css'

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="app">
      <ParticleBackground />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <div className="container">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  )
}

export default App
