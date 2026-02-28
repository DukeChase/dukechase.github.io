function RepoCard({ repo, view }) {
  return (
    <div className="repo-card">
      <div className="repo-header">
        <a href="#" className="repo-name">{repo.name}</a>
        <span className="repo-public">Public</span>
      </div>
      <p className="repo-desc">{repo.desc}</p>
      <div className="repo-stats">
        <div className="repo-stat">
          <span className="repo-lang" style={{ backgroundColor: repo.langColor }}></span>
          {repo.lang}
        </div>
        <div className="repo-stat">
          <i className="far fa-star"></i>
          {repo.stars}
        </div>
        <div className="repo-stat">
          <i className="fas fa-code-branch"></i>
          {repo.forks}
        </div>
      </div>
      <div className="repo-updated">
        更新于 {repo.updated}
      </div>
    </div>
  )
}

export default RepoCard