import { useState } from 'react';
import { ROUNDS, META } from './data.js';
import Overview from './components/Overview.jsx';
import RoundView from './components/RoundView.jsx';
import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', label: 'Overview', color: '#7B72F0' },
    ...ROUNDS.map(r => ({ id: r.id, label: r.code + ' · ' + r.title, color: r.color })),
  ];

  const activeRound = ROUNDS.find(r => r.id === activeTab);

  return (
    <div className="app-shell">
      <div className="ambient-orb orb-1" />
      <div className="ambient-orb orb-2" />
      <div className="ambient-orb orb-3" />

      <header className="site-header">
        <div className="header-inner">
          <div className="header-brand">
            <div className="brand-mark">
              <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                <circle cx="17" cy="17" r="16" stroke="#7B72F0" strokeWidth="1.5" />
                <path d="M17 6L28 27H6L17 6Z" stroke="#7B72F0" strokeWidth="1.5" fill="none" strokeLinejoin="round" />
                <circle cx="17" cy="17" r="3.5" fill="#7B72F0" />
              </svg>
            </div>
            <div className="brand-text">
              <span className="brand-name">Project Disha</span>
              <span className="brand-sub">Syllabus–Simulation Master Map · DSEH001</span>
            </div>
          </div>
          <div className="header-meta">
            <span className="meta-pill">M.Com. PGCF 2025</span>
            <span className="meta-pill">Delhi School of Economics</span>
          </div>
        </div>
      </header>

      <nav className="main-nav">
        <div className="nav-inner">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`nav-btn ${activeTab === tab.id ? 'active' : ''}`}
              style={activeTab === tab.id ? { '--tab-color': tab.color } : {}}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
              {activeTab === tab.id && <span className="nav-indicator" style={{ background: tab.color }} />}
            </button>
          ))}
        </div>
      </nav>

      <main className="main-content">
        {activeTab === 'overview'
          ? <Overview onRoundClick={id => setActiveTab(id)} />
          : activeRound
            ? <RoundView round={activeRound} onRoundClick={id => setActiveTab(id)} />
            : null
        }
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <span>Faculty of Commerce and Business · Delhi School of Economics · University of Delhi</span>
          <span>Prof. R.K. Singh · rksingh@commerce.du.ac.in</span>
          <a href={META.simulationURL} target="_blank" rel="noreferrer" className="footer-link">
            Launch Platform ↗
          </a>
        </div>
      </footer>
    </div>
  );
}
