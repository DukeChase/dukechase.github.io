function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="profile-card">
        <div className="profile-header">
          <img src="https://placehold.co/100x100/0969da/ffffff?text=User" alt="用户头像" className="profile-avatar" />
          <h1 className="profile-name">用户名</h1>
          <p className="profile-username">username</p>
        </div>
        <p className="profile-bio">前端开发工程师，热爱开源技术和用户体验设计。专注于React和Vue.js开发。</p>
        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-number">127</span>
            <span className="stat-label">关注者</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">89</span>
            <span className="stat-label">关注中</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">23</span>
            <span className="stat-label">Star</span>
          </div>
        </div>
        <div className="profile-details">
          <div className="detail-item">
            <i className="fas fa-building"></i>
            <span>科技公司</span>
          </div>
          <div className="detail-item">
            <i className="fas fa-location-dot"></i>
            <span>北京, 中国</span>
          </div>
          <div className="detail-item">
            <i className="fas fa-link"></i>
            <span>https://username.dev</span>
          </div>
          <div className="detail-item">
            <i className="fab fa-twitter"></i>
            <span>@username</span>
          </div>
          <div className="detail-item">
            <i className="fas fa-envelope"></i>
            <span>user@example.com</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar