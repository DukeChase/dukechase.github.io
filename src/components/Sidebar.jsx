import { useState, useEffect } from 'react'
import config from '../config'

function Sidebar() {
  const { profile, contact, github } = config
  
  const [stats, setStats] = useState({
    followers: profile.stats.followers,
    following: profile.stats.following,
    stars: profile.stats.stars
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        setLoading(true)
        
        const userResponse = await fetch(
          `https://api.github.com/users/${github.username}`,
          {
            headers: {
              'Accept': 'application/vnd.github+json',
              'X-GitHub-Api-Version': '2022-11-28'
            }
          }
        )
        
        if (!userResponse.ok) {
          throw new Error(`HTTP error! status: ${userResponse.status}`)
        }
        
        const userData = await userResponse.json()
        
        const reposResponse = await fetch(
          `https://api.github.com/users/${github.username}/repos?per_page=100`,
          {
            headers: {
              'Accept': 'application/vnd.github+json',
              'X-GitHub-Api-Version': '2022-11-28'
            }
          }
        )
        
        let totalStars = 0
        if (reposResponse.ok) {
          const reposData = await reposResponse.json()
          totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0)
        }
        
        setStats({
          followers: userData.followers,
          following: userData.following,
          stars: totalStars
        })
      } catch (err) {
        console.error('Failed to fetch user stats:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserStats()
  }, [github.username])

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
            <span className="stat-number">{loading ? '...' : stats.followers}</span>
            <span className="stat-label">关注者</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{loading ? '...' : stats.following}</span>
            <span className="stat-label">关注中</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{loading ? '...' : stats.stars}</span>
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
