import { useState } from 'react'
import './Analytics.css'

function Analytics() {
  // Mock data for the current month
  const [revenueData] = useState([
    { day: 1, revenue: 1200 },
    { day: 5, revenue: 1800 },
    { day: 10, revenue: 2400 },
    { day: 15, revenue: 3200 },
    { day: 20, revenue: 4100 },
    { day: 25, revenue: 5200 },
    { day: 30, revenue: 6500 }
  ])

  const [footTrafficData] = useState([
    { day: 1, visitors: 15 },
    { day: 5, visitors: 23 },
    { day: 10, visitors: 31 },
    { day: 15, visitors: 28 },
    { day: 20, visitors: 35 },
    { day: 25, visitors: 42 },
    { day: 30, visitors: 48 }
  ])

  const totalRevenue = revenueData[revenueData.length - 1].revenue
  const avgSpendGlobeTrotter = 250
  const avgSpendOthers = 95
  const newCustomers = 127
  const totalFootTraffic = footTrafficData[footTrafficData.length - 1].visitors

  const maxRevenue = Math.max(...revenueData.map(d => d.revenue))
  const maxFootTraffic = Math.max(...footTrafficData.map(d => d.visitors))

  return (
    <div className="analytics-container">
      <h1>Globe Trotter+ Analytics Dashboard</h1>
      
      <div className="analytics-grid">
        {/* Total Revenue Chart */}
        <div className="analytics-card full-width">
          <h2>Total Revenue from Globe Trotter+ Missions</h2>
          <div className="chart-subtitle">This Month</div>
          <div className="revenue-total">${totalRevenue.toLocaleString()}</div>
          <div className="chart-container">
            <div className="chart-bars">
              {revenueData.map((data, index) => (
                <div key={index} className="bar-group">
                  <div 
                    className="bar revenue-bar"
                    style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                  >
                    <span className="bar-tooltip">${data.revenue}</span>
                  </div>
                  <div className="bar-label">Day {data.day}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customer Insights Panel */}
        <div className="analytics-card">
          <h2>Customer Insights</h2>
          <div className="insights-content">
            <div className="insight-item highlight">
              <div className="insight-icon">💳</div>
              <div className="insight-label">Avg Spend per Globe Trotter+ Member</div>
              <div className="insight-value">${avgSpendGlobeTrotter}</div>
            </div>
            <div className="insight-divider">vs</div>
            <div className="insight-item">
              <div className="insight-icon">👤</div>
              <div className="insight-label">Avg Spend for Other Cardholders</div>
              <div className="insight-value">${avgSpendOthers}</div>
            </div>
            <div className="insight-comparison">
              <div className="comparison-badge">
                +{Math.round(((avgSpendGlobeTrotter - avgSpendOthers) / avgSpendOthers) * 100)}% Higher Spending
              </div>
            </div>
          </div>
        </div>

        {/* Foot Traffic Graph */}
        <div className="analytics-card">
          <h2>Foot Traffic</h2>
          <div className="chart-subtitle">Globe Trotter+ Members Visits</div>
          <div className="traffic-total">{totalFootTraffic} Total Visits</div>
          <div className="chart-container traffic-chart">
            <div className="line-chart">
              <svg viewBox="0 0 300 150" className="line-chart-svg">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={`grid-${i}`}
                    x1="0"
                    y1={30 + i * 30}
                    x2="300"
                    y2={30 + i * 30}
                    stroke="#e0e0e0"
                    strokeWidth="0.5"
                  />
                ))}
                
                {/* Line path */}
                <polyline
                  fill="none"
                  stroke="#667eea"
                  strokeWidth="3"
                  points={footTrafficData.map((data, index) => {
                    const x = (index / (footTrafficData.length - 1)) * 280 + 10
                    const y = 140 - ((data.visitors / maxFootTraffic) * 100)
                    return `${x},${y}`
                  }).join(' ')}
                />
                
                {/* Data points */}
                {footTrafficData.map((data, index) => {
                  const x = (index / (footTrafficData.length - 1)) * 280 + 10
                  const y = 140 - ((data.visitors / maxFootTraffic) * 100)
                  return (
                    <circle
                      key={index}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="#667eea"
                    />
                  )
                })}
              </svg>
            </div>
            <div className="chart-x-labels">
              {footTrafficData.map((data, index) => (
                <span key={index} className="x-label">Day {data.day}</span>
              ))}
            </div>
          </div>
        </div>

        {/* New Customer Acquisition */}
        <div className="analytics-card metric-card">
          <h2>New Customer Acquisition</h2>
          <div className="metric-content">
            <div className="metric-icon">🎯</div>
            <div className="metric-value">{newCustomers}</div>
            <div className="metric-label">New Customers Driven by<br/>Globe Trotter+ Missions</div>
            <div className="metric-trend">
              <span className="trend-icon">↗</span>
              <span className="trend-text">+23% from last month</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics
