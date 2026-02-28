import React, { useState } from 'react'
import { GitHubCalendar } from 'react-github-calendar'
import config from '../config'
import './Contributions.css'

function Contributions() {
  const { github } = config
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 6 }, (_, i) => currentYear - i)

  const renderColorLegend = () => (
    <div className="contributions-legend">
      <span className="legend-text">Learn how we count contributions</span>
      <div className="legend-scale">
        <span className="legend-label">Less</span>
        <div className="legend-colors">
          <div className="legend-box" style={{ backgroundColor: 'var(--contribution-level-0)' }} />
          <div className="legend-box" style={{ backgroundColor: 'var(--contribution-level-1)' }} />
          <div className="legend-box" style={{ backgroundColor: 'var(--contribution-level-2)' }} />
          <div className="legend-box" style={{ backgroundColor: 'var(--contribution-level-3)' }} />
          <div className="legend-box" style={{ backgroundColor: 'var(--contribution-level-4)' }} />
        </div>
        <span className="legend-label">More</span>
      </div>
    </div>
  )

  return (
    <div className="contributions">
      <div className="contributions-header">
        <h3 className="contributions-title">
          <i className="fas fa-chart-bar"></i> GitHub Contributions
        </h3>
      </div>
      
      <div className="contributions-summary">
        <div className="year-selector">
          <select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(Number(e.target.value))}
            className="year-dropdown"
          >
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="github-calendar-wrapper">
        <GitHubCalendar 
          username={github.username}
          year={selectedYear}
          colorScheme="dark"
          blockSize={12}
          blockMargin={3}
          fontSize={12}
          theme={{
            light: ['#e5e7eb', '#d1d5db', '#9ca3af', '#6b7280', '#374151'],
            dark: [
              'rgba(99, 102, 241, 0.1)',
              'rgba(99, 102, 241, 0.3)',
              'rgba(99, 102, 241, 0.5)',
              'rgba(139, 92, 246, 0.7)',
              'rgba(168, 85, 247, 0.9)'
            ]
          }}
          renderBlock={(block, activity) => 
            React.cloneElement(block, {
              ...block.props,
              style: {
                ...block.props.style,
                transition: 'all 0.2s ease',
              },
              onMouseEnter: (e) => {
                block.props.onMouseEnter && block.props.onMouseEnter(e)
              }
            })
          }
        />
      </div>
      
      {renderColorLegend()}
    </div>
  )
}

export default Contributions
