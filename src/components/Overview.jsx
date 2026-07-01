import { ROUNDS, CLO_MAP, ASSESSMENTS, ANCHORS } from '../data.js';
import './Overview.css';

const CLO_COVERAGE = {
  CLO1: ['R1','R2','R6'],
  CLO2: ['R2','R3'],
  CLO3: ['R4','R5','R6'],
  CLO4: ['R1','R2','R3','R4','R5','R6'],
  CLO5: ['R2','R3','R4','R5','R6'],
};

const CLO_PRIMARY = {
  CLO1: ['R1'],
  CLO2: ['R2','R3'],
  CLO3: ['R4','R5'],
  CLO4: ['R2','R3','R4','R5','R6'],
  CLO5: ['R3','R4','R5','R6'],
};

export default function Overview({ onRoundClick }) {
  return (
    <div className="overview">
      <div className="ov-hero">
        <div className="ov-hero-badge">DSEH001 · AY 2026-27 · Cohort 1</div>
        <h1 className="ov-hero-title">
          How Project Disha teaches<br />your entire course
        </h1>
        <p className="ov-hero-body">
          24 simulation options across 6 rounds, each mapped to a CLO, a scholarly anchor, a lecture week, and an assessment event. Every option the right theory. Every theory a live decision.
        </p>
        <div className="ov-stats">
          <div className="ov-stat"><span className="ov-stat-num">24</span><span className="ov-stat-label">options<br />6 rounds</span></div>
          <div className="ov-stat-divider" />
          <div className="ov-stat"><span className="ov-stat-num">5</span><span className="ov-stat-label">CLOs fully<br />covered</span></div>
          <div className="ov-stat-divider" />
          <div className="ov-stat"><span className="ov-stat-num">12+</span><span className="ov-stat-label">scholarly<br />anchors</span></div>
          <div className="ov-stat-divider" />
          <div className="ov-stat"><span className="ov-stat-num">4</span><span className="ov-stat-label">human<br />anchors</span></div>
          <div className="ov-stat-divider" />
          <div className="ov-stat"><span className="ov-stat-num">2</span><span className="ov-stat-label">auto shock<br />events</span></div>
        </div>
      </div>

      <div className="ov-section">
        <div className="section-eyebrow">Simulation spine · 12 weeks</div>
        <div className="round-flow">
          {ROUNDS.map((r, i) => (
            <button key={r.id} className="flow-block" onClick={() => onRoundClick(r.id)}
              style={{ '--rc': r.color, '--rcl': r.colorLight, '--rcd': r.colorDark }}>
              <div className="flow-badge" style={{ background: r.color }}>{r.code}</div>
              <div className="flow-title">{r.title}</div>
              <div className="flow-weeks">{r.weeks}</div>
              <div className="flow-unit">{r.unit}</div>
              {r.shock && <div className="flow-shock-dot" title={r.shock.title} />}
              {r.deliverable && <div className="flow-d-dot" title={r.deliverable} />}
              {r.signature && <div className="flow-star">★</div>}
              {i < ROUNDS.length - 1 && <div className="flow-arrow">→</div>}
            </button>
          ))}
        </div>
        <div className="flow-legend">
          <span><span className="legend-dot" style={{background:'#E05830'}} /> auto shock event</span>
          <span><span className="legend-dot" style={{background:'#C2376A'}} /> formal deliverable</span>
          <span><span className="legend-star">★</span> signature round</span>
        </div>
      </div>

      <div className="ov-section">
        <div className="section-eyebrow">CLO x Round Coverage Matrix</div>
        <div className="clo-matrix-wrap">
          <table className="clo-matrix">
            <thead>
              <tr>
                <th>CLO</th>
                <th>Bloom's Level</th>
                {ROUNDS.map(r => (<th key={r.id} style={{ color: r.color }}>{r.code}</th>))}
                <th>Assessment</th>
              </tr>
            </thead>
            <tbody>
              {CLO_MAP.map(clo => (
                <tr key={clo.id}>
                  <td className="clo-id-cell">
                    <span className="clo-dot" style={{ background: clo.color }} />
                    <span className="clo-id">{clo.id}</span>
                    <span className="clo-label-text">{clo.label}</span>
                  </td>
                  <td className="clo-bloom">{clo.bloom}</td>
                  {ROUNDS.map(r => {
                    const isPrimary = (CLO_PRIMARY[clo.id] || []).includes(r.id);
                    const isCover = (CLO_COVERAGE[clo.id] || []).includes(r.id);
                    return (
                      <td key={r.id} className="clo-cell">
                        {isPrimary
                          ? <span className="clo-pip primary" style={{ background: r.color }} />
                          : isCover
                            ? <span className="clo-pip reinforce" style={{ borderColor: r.color }} />
                            : <span className="clo-pip empty" />
                        }
                      </td>
                    );
                  })}
                  <td className="clo-assess-cell">
                    {ASSESSMENTS
                      .filter(a =>
                        (clo.id === 'CLO1' && ['Quiz 1','D1'].includes(a.label)) ||
                        (clo.id === 'CLO2' && ['Quiz 2','Quiz 3','D1'].includes(a.label)) ||
                        (clo.id === 'CLO3' && ['Quiz 4','D1','D2'].includes(a.label)) ||
                        (clo.id === 'CLO4' && ['Quiz 4','D1','D2'].includes(a.label)) ||
                        (clo.id === 'CLO5' && ['Quiz 5','D2'].includes(a.label))
                      )
                      .map(a => (
                        <span key={a.label} className="assess-badge"
                          style={{ background: a.color + '22', color: a.color, borderColor: a.color + '44' }}>
                          {a.label}
                        </span>
                      ))
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="matrix-legend">
            <span><span className="clo-pip primary" style={{background:'#888',display:'inline-block',marginRight:4}} /> Primary CLO</span>
            <span><span className="clo-pip reinforce" style={{borderColor:'#888',display:'inline-block',marginRight:4}} /> Reinforced</span>
          </div>
        </div>
      </div>

      <div className="ov-section">
        <div className="section-eyebrow">Assessment Timeline · 12 Weeks</div>
        <div className="assess-timeline">
          {Array.from({length: 12}, (_, i) => i + 1).map(week => {
            const items = ASSESSMENTS.filter(a => a.week === week);
            return (
              <div key={week} className="timeline-week">
                <div className="timeline-week-num">W{week}</div>
                <div className="timeline-track">
                  {items.length === 0
                    ? <div className="timeline-dot" />
                    : items.map(a => (
                        <div key={a.label} className={`timeline-event ${a.deliverable ? 'deliverable' : 'quiz'}`}
                          style={{ background: a.color + '20', borderColor: a.color, color: a.color }}>
                          <span className="te-label">{a.label}</span>
                          <span className="te-text">{a.text}</span>
                        </div>
                      ))
                  }
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="ov-section">
        <div className="section-eyebrow">The Four Human Anchors — Real rows in the dataset</div>
        <div className="anchors-grid">
          {ANCHORS.map(a => (
            <div key={a.id} className="anchor-card" style={{ '--ac': a.color }}>
              <div className="anchor-avatar" style={{ background: a.color + '22', color: a.color, border: `1.5px solid ${a.color}44` }}>
                {a.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="anchor-body">
                <div className="anchor-id-badge" style={{ color: a.color }}>{a.id}</div>
                <div className="anchor-name">{a.name}</div>
                <div className="anchor-profile">{a.profile}</div>
                <div className="anchor-rounds">
                  {ROUNDS.map(r => (
                    <span key={r.id}
                      className={`anchor-round-pip ${a.rounds.includes(r.id) ? 'active' : ''}`}
                      style={a.rounds.includes(r.id) ? {background: r.color} : {}}>
                      {r.code}
                    </span>
                  ))}
                </div>
                <div className="anchor-q">"{a.question}"</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ov-section">
        <div className="section-eyebrow">Shock Events — Automatic, never telegraphed</div>
        <div className="shocks-row">
          {ROUNDS.filter(r => r.shock).map(r => (
            <div key={r.id} className="shock-card" style={{ '--sc': r.color }}>
              <div className="shock-round-badge" style={{ background: r.color }}>{r.code}</div>
              <div className="shock-title">{r.shock.title}</div>
              <div className="shock-body">{r.shock.text}</div>
              <div className="shock-axes">
                <span className="shock-axis">Equity & Compliance (primary)</span>
                <span className="shock-axis">BCI Crisis Penalty 0-3</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="ov-section">
        <div className="section-eyebrow">Explore each round</div>
        <div className="round-cards-grid">
          {ROUNDS.map(r => (
            <button key={r.id} className="round-cta-card" onClick={() => onRoundClick(r.id)}
              style={{ '--rc': r.color }}>
              <div className="rcc-top">
                <span className="rcc-badge" style={{ background: r.color }}>{r.code}</span>
                {r.signature && <span className="rcc-sig">★ Signature</span>}
                {r.shock && <span className="rcc-shock" style={{ color: r.color }}>⚡ Shock</span>}
              </div>
              <div className="rcc-title">{r.title}</div>
              <div className="rcc-sub">{r.subtitle}</div>
              <div className="rcc-meta">{r.weeks} · {r.unit}</div>
              <div className="rcc-options">{r.options.length} options · {r.dataset.join(', ')}</div>
              <div className="rcc-arrow">View map →</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
