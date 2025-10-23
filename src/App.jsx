import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import POS from './POS'
import Analytics from './components/Analytics'
import './App.css'

function Navigation() {
  const location = useLocation()
  
  return (
    <nav className="main-nav">
      <Link 
        to="/" 
        className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
      >
        <span className="nav-icon">💳</span>
        POS Terminal
      </Link>
      <Link 
        to="/analytics" 
        className={`nav-link ${location.pathname === '/analytics' ? 'active' : ''}`}
      >
        <span className="nav-icon">📊</span>
        Analytics
      </Link>
    </nav>
  )
}

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navigation />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<POS />} />
            <Route path="/analytics" element={<Analytics />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
