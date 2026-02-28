import { useState, useEffect } from 'react'
import RepoCard from './RepoCard'
import Contributions from './Contributions'
import config from '../config'

const langColors = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python: '#3572A5',
  Java: '#b07219',
  'Jupyter Notebook': '#DA5B0B',
  Go: '#00ADD8',
  Rust: '#dea584',
  C: '#555555',
  'C++': '#f34b7d',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Shell: '#89e051',
  Vim: '#199f4b',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#F05138',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Scala: '#c22d40',
  Lua: '#000080',
  Perl: '#39457E',
  R: '#198CE7',
  MATLAB: '#e16737',
  TeX: '#3D6117',
  Makefile: '#427819',
  Dockerfile: '#384d54',
  default: '#8b949e'
}

const formatUpdated = (dateStr) => {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now - date
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffDays === 0) return '今天'
  if (diffDays === 1) return '昨天'
  if (diffDays < 7) return `${diffDays}天前`
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}周前`
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}个月前`
  return `${Math.floor(diffDays / 365)}年前`
}

const transformRepo = (repo) => ({
  id: repo.id,
  name: repo.name,
  desc: repo.description,
  lang: repo.language,
  langColor: langColors[repo.language] || langColors.default,
  stars: repo.stargazers_count,
  forks: repo.forks_count,
  updated: formatUpdated(repo.updated_at),
  url: repo.html_url,
  isFork: repo.fork
})

function MainContent() {
  const { github, overview, contact } = config
  
  const [activeTab, setActiveTab] = useState(0)
  const [view, setView] = useState(() => {
    return localStorage.getItem('repo-view') || 'grid'
  })
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    localStorage.setItem('repo-view', view)
  }, [view])

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `https://api.github.com/users/${github.username}/repos?sort=updated&per_page=${github.reposPerPage}`,
          {
            headers: {
              'Accept': 'application/vnd.github+json',
              'X-GitHub-Api-Version': '2022-11-28'
            }
          }
        )
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data = await response.json()
        setRepos(data.map(transformRepo))
        setError(null)
      } catch (err) {
        setError(err.message)
        console.error('Failed to fetch repos:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchRepos()
  }, [github.username, github.reposPerPage])

  const tabs = [
    { icon: 'fa-book', label: '概览' },
    { icon: 'fa-folder', label: '仓库' },
    { icon: 'fa-star', label: 'Star' }
  ]

  const renderOverview = () => (
    <div className="content-card">
      <div className="content-header">
        <h2 className="section-title">
          <i className="fas fa-book"></i> {overview.title}
        </h2>
      </div>
      <div className="overview-content">
        {overview.paragraphs.map((text, index) => (
          <p key={index} className="overview-text">{text}</p>
        ))}
        <ul className="overview-list">
          {contact.email && (
            <li>📧 Email: <a href={`mailto:${contact.email}`}>{contact.email}</a></li>
          )}
          {contact.website && (
            <li>🌐 Website: <a href={contact.website} target="_blank" rel="noopener noreferrer">{contact.website}</a></li>
          )}
          {contact.twitter && (
            <li>🐦 Twitter: <a href={`https://twitter.com/${contact.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer">{contact.twitter}</a></li>
          )}
        </ul>
      </div>
      <Contributions />
    </div>
  )

  const renderRepos = () => (
    <div className="content-card">
      <div className="content-header">
        <h2 className="section-title">
          <i className="fas fa-folder"></i> 我的仓库
        </h2>
        <div className="view-toggle">
          <button
            className={`view-btn ${view === 'grid' ? 'active' : ''}`}
            onClick={() => setView('grid')}
            title="网格视图"
          >
            <i className="fas fa-th-large"></i>
          </button>
          <button
            className={`view-btn ${view === 'list' ? 'active' : ''}`}
            onClick={() => setView('list')}
            title="列表视图"
          >
            <i className="fas fa-list"></i>
          </button>
        </div>
      </div>
      {loading && (
        <div className="repo-loading">
          <i className="fas fa-spinner fa-spin"></i>
          <span>加载中...</span>
        </div>
      )}
      {error && (
        <div className="repo-error">
          <i className="fas fa-exclamation-circle"></i>
          <span>加载失败: {error}</span>
        </div>
      )}
      {!loading && !error && repos.length === 0 && (
        <div className="empty-state">
          <i className="fas fa-folder-open empty-icon"></i>
          <p>暂无仓库</p>
        </div>
      )}
      {!loading && !error && repos.length > 0 && (
        <div className={`repo-list repo-list--${view}`}>
          {repos.map(repo => (
            <RepoCard key={repo.id} repo={repo} view={view} />
          ))}
        </div>
      )}
    </div>
  )

  const renderStars = () => (
    <div className="content-card">
      <div className="content-header">
        <h2 className="section-title">
          <i className="fas fa-star"></i> Star 的仓库
        </h2>
      </div>
      <div className="empty-state">
        <i className="fas fa-star empty-icon"></i>
        <p>暂无 Star 的仓库</p>
      </div>
    </div>
  )

  const renderContent = () => {
    switch (activeTab) {
      case 0:
        return renderOverview()
      case 1:
        return renderRepos()
      case 2:
        return renderStars()
      default:
        return renderOverview()
    }
  }

  return (
    <main className="main-content" id="main-content">
      <div className="tabs">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab ${activeTab === index ? 'active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            <i className={`fas ${tab.icon}`}></i> {tab.label}
          </div>
        ))}
      </div>
      {renderContent()}
    </main>
  )
}

export default MainContent
