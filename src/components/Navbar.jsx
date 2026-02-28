function Navbar({ theme, toggleTheme }) {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <a href="#" className="nav-logo"><i className="fab fa-github"></i> GitHub</a>
        <div className="nav-search">
          <i className="fas fa-search"></i>
          <input type="text" placeholder="Search or jump to..." />
        </div>
        <div className="nav-links">
          <a href="#">Pull requests</a>
          <a href="#">Issues</a>
          <a href="#">Marketplace</a>
          <a href="#">Explore</a>
        </div>
      </div>
      <div className="nav-right">
        <button className="theme-toggle" aria-label="切换深色模式" onClick={toggleTheme}>
          <i className={`fas ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
        </button>
        <i className="fas fa-bell nav-icon"></i>
        <i className="fas fa-plus nav-icon"></i>
        <img src="https://placehold.co/32x32/0969da/ffffff?text=U" alt="用户头像" className="avatar" />
      </div>
    </nav>
  )
}

export default Navbar