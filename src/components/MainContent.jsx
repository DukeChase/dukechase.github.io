import { useState, useEffect } from 'react'
import RepoCard from './RepoCard'

const repos = [
  {
    id: 1,
    name: 'awesome-react-project',
    desc: '一个基于React的现代化Web应用，包含完整的用户认证和数据管理功能。',
    lang: 'JavaScript',
    langColor: '#61dafb',
    stars: '1.2k',
    forks: 89,
    updated: '3天前'
  },
  {
    id: 2,
    name: 'vue-dashboard',
    desc: '使用Vue 3和Element Plus构建的管理后台模板，支持暗色主题。',
    lang: 'Vue',
    langColor: '#42b883',
    stars: 856,
    forks: 156,
    updated: '1周前'
  },
  {
    id: 3,
    name: 'node-api-server',
    desc: '基于Node.js和Express构建的RESTful API服务器，支持JWT认证。',
    lang: 'Node.js',
    langColor: '#339933',
    stars: 432,
    forks: 67,
    updated: '2周前'
  },
  {
    id: 4,
    name: 'css-framework',
    desc: '轻量级CSS框架，提供现代化的组件和响应式布局系统。',
    lang: 'CSS',
    langColor: '#1572B6',
    stars: '2.1k',
    forks: 234,
    updated: '1个月前'
  }
]

function MainContent() {
  const [activeTab, setActiveTab] = useState(0)
  const [view, setView] = useState(() => {
    return localStorage.getItem('repo-view') || 'grid'
  })

  useEffect(() => {
    localStorage.setItem('repo-view', view)
  }, [view])

  const tabs = [
    { icon: 'fa-book', label: '概览' },
    { icon: 'fa-folder', label: '仓库' },
    { icon: 'fa-star', label: 'Star' }
  ]

  const renderOverview = () => (
    <div className="content-card">
      <div className="content-header">
        <h2 className="section-title">
          <i className="fas fa-book"></i> 个人简介
        </h2>
      </div>
      <div className="overview-content">
        <p className="overview-text">
          欢迎来到我的 GitHub 主页！我是一名热爱编程的开发者，专注于前端开发和用户体验设计。
        </p>
        <p className="overview-text">
          在这里你可以查看我的开源项目、技术文章和代码贡献。我热衷于学习新技术，并乐于与社区分享我的经验和知识。
        </p>
        <p className="overview-text">
          如果你对我的项目感兴趣，欢迎 Star、Fork 或提交 Issue。也可以通过以下方式联系我：
        </p>
        <ul className="overview-list">
          <li>📧 Email: user@example.com</li>
          <li>🌐 Website: https://username.dev</li>
          <li>🐦 Twitter: @username</li>
        </ul>
      </div>
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
      <div className={`repo-container ${view === 'grid' ? 'repo-grid' : 'repo-list'}`} data-view={view}>
        {repos.map(repo => (
          <RepoCard key={repo.id} repo={repo} view={view} />
        ))}
      </div>
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