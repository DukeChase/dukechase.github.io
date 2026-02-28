import config from '../config'

function Sidebar() {
  const { profile, contact } = config
  
  return (
    <aside className="sidebar">
      <div className="profile-card">
        <div className="profile-header">
          <img src={profile.avatar} alt={`${profile.name}的头像`} className="profile-avatar" />
          <h1 className="profile-name">{profile.name}</h1>
          <p className="profile-username">{profile.username}</p>
        </div>
        <p className="profile-bio">{profile.bio}</p>
        <div className="profile-stats">
          <div className="stat-item">
            <span className="stat-number">{profile.stats.followers}</span>
            <span className="stat-label">关注者</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{profile.stats.following}</span>
            <span className="stat-label">关注中</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{profile.stats.stars}</span>
            <span className="stat-label">Star</span>
          </div>
        </div>
        <div className="profile-details">
          {contact.company && (
            <div className="detail-item">
              <i className="fas fa-building"></i>
              <span>{contact.company}</span>
            </div>
          )}
          {contact.location && (
            <div className="detail-item">
              <i className="fas fa-location-dot"></i>
              <span>{contact.location}</span>
            </div>
          )}
          {contact.website && (
            <div className="detail-item">
              <i className="fas fa-link"></i>
              <a href={contact.website} target="_blank" rel="noopener noreferrer">{contact.website}</a>
            </div>
          )}
          {contact.twitter && (
            <div className="detail-item">
              <i className="fab fa-twitter"></i>
              <a href={`https://twitter.com/${contact.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer">{contact.twitter}</a>
            </div>
          )}
          {contact.email && (
            <div className="detail-item">
              <i className="fas fa-envelope"></i>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
