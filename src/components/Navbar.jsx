import { useState, useEffect } from 'react'
import config from '../config'

function Navbar({ theme, toggleTheme }) {
  const { nav, profile, github } = config
  const [showNavbar, setShowNavbar] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      if (currentScrollY === 0) {
        setShowNavbar(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setShowNavbar(false)
      } else if (currentScrollY < lastScrollY) {
        setShowNavbar(true)
      }
      
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [lastScrollY])

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      window.open(`https://github.com/search?q=${encodeURIComponent(searchQuery.trim())}`, '_blank')
    }
  }

  const handleGitHubClick = (e) => {
    e.preventDefault()
    window.open(`https://github.com/`, '_blank')
  }
  
  return (
    <nav className={`navbar ${showNavbar ? 'navbar--visible' : 'navbar--hidden'}`}>
      <div className="nav-left">
        <a href="#" className="nav-logo" onClick={handleGitHubClick}>
          <i className="fab fa-github"></i> {nav.logo}
        </a>
        <div className="nav-search">
          <i className="fas fa-search"></i>
          <input 
            type="text" 
            placeholder={nav.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleSearch}
          />
        </div>
        <div className="nav-links">
          <a href={`https://github.com/pulls`} target="_blank" rel="noopener noreferrer">Pull requests</a>
          <a href={`https://github.com/issues`} target="_blank" rel="noopener noreferrer">Issues</a>
          <a href="https://github.com/marketplace" target="_blank" rel="noopener noreferrer">Marketplace</a>
          <a href="https://github.com/explore" target="_blank" rel="noopener noreferrer">Explore</a>
        </div>
      </div>
      <div className="nav-right">
        <button className="theme-toggle" aria-label="切换深色模式" onClick={toggleTheme}>
          <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
        </button>
        <i className="fas fa-bell nav-icon"></i>
        <i className="fas fa-plus nav-icon"></i>
        <img src={profile.avatar} alt={`${profile.name}的头像`} className="avatar" />
      </div>
    </nav>
  )
}

export default Navbar
