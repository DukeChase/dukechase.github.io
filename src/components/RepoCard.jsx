function RepoCard({ repo, view }) {
  const badgeText = repo.isFork ? 'Fork' : 'Public'
  
  if (view === 'list') {
    return (
      <div className="repo-card repo-card--list">
        <div className="repo-card__main">
          <a href={repo.url} className="repo-card__name" target="_blank" rel="noopener noreferrer">{repo.name}</a>
          <span className="repo-card__badge">{badgeText}</span>
        </div>
        <p className="repo-card__desc">{repo.desc || '暂无描述'}</p>
        <div className="repo-card__meta">
          {repo.lang && (
            <span className="repo-card__lang">
              <span className="repo-card__lang-dot" style={{ backgroundColor: repo.langColor }} />
              {repo.lang}
            </span>
          )}
          <span className="repo-card__stat">
            <i className="far fa-star" /> {repo.stars}
          </span>
          <span className="repo-card__stat">
            <i className="fas fa-code-branch" /> {repo.forks}
          </span>
          <span className="repo-card__updated">更新于 {repo.updated}</span>
        </div>
      </div>
    )
  }

  return (
    <div className="repo-card repo-card--grid">
      <div className="repo-card__header">
        <a href={repo.url} className="repo-card__name" target="_blank" rel="noopener noreferrer">{repo.name}</a>
        <span className="repo-card__badge">{badgeText}</span>
      </div>
      <p className="repo-card__desc">{repo.desc || '暂无描述'}</p>
      <div className="repo-card__footer">
        <div className="repo-card__stats">
          {repo.lang && (
            <span className="repo-card__lang">
              <span className="repo-card__lang-dot" style={{ backgroundColor: repo.langColor }} />
              {repo.lang}
            </span>
          )}
          <span className="repo-card__stat">
            <i className="far fa-star" /> {repo.stars}
          </span>
          <span className="repo-card__stat">
            <i className="fas fa-code-branch" /> {repo.forks}
          </span>
        </div>
        <span className="repo-card__updated">更新于 {repo.updated}</span>
      </div>
    </div>
  )
}

export default RepoCard
