import { useState } from 'react';
import { ANCHORS, ASSESSMENTS } from '../data.js';
import './RoundView.css';

const GRADE_CONFIG = {
  strong: { label: 'Recommended', color: '#15A06B', bg: 'rgba(21,160,107,0.12)', border: 'rgba(21,160,107,0.3)' },
  caution: { label: 'Use with caution', color: '#C07A10', bg: 'rgba(192,122,16,0.12)', border: 'rgba(192,122,16,0.3)' },
  risk: { label: 'Pedagogical trap', color: '#C2376A', bg: 'rgba(194,55,106,0.12)', border: 'rgba(194,55,106,0.3)' },
};

const CLO_COLORS = {
  CLO1: '#6C63D4', CLO2: '#15A06B', CLO3: '#C2376A', CLO4: '#C07A10', CLO5: '#2277CC',
};

export default function RoundView({ round }) {
  const [activeOption, setActiveOption] = useState(null);
  const roundAnchors = ANCHORS.filter(a => a.rounds.includes(round.id));

  return (
    <div className="round-view">
      <div className="rv-hero" style={{ '--rc': round.color, '--rcl': round.colorLight, '--rcd': round.colorDark }}>
        <div className="rv-hero-top">
          <div className="rv-badge-row">
            <span className="rv-code-badge" style={{ background: round.color }}>{round.code}</span>
            {round.signature && <span className="rv-sig-badge">★ Signature Round</span>}
            {round.shock && <span className="rv-shock-badge">⚡ Shock Event</span>}
          </div>
          <h1 className="rv-title">{round.title}</h1>
          <p className="rv-subtitle">{round.subtitle}</p>
          <div className="rv-meta-row">
            <span className="rv-meta-item">{round.unit}</span>
            <span className="rv-meta-sep">·</span>
            <span className="rv-meta-item">{round.weeks}</span>
            <span className="rv-meta-sep">·</span>
            <span className="rv-meta-item">Dataset: {round.dataset.join(', ')}</span>
          </div>
        </div>

        <div className="rv-hero-stats">
          <div className="rv-hstat"><span className="rv-hstat-num">{round.options.length}</span><span className="rv-hstat-label">options</span></div>
          <div className="rv-hstat-divider" />
          <div className="rv-hstat"><span className="rv-hstat-num">{round.clos.length}</span><span className="rv-hstat-label">CLOs</span></div>
          <div className="rv-hstat-divider" />
          <div className="rv-hstat"><span className="rv-hstat-num">{round.theories.length}</span><span className="rv-hstat-label">anchors</span></div>
          <div className="rv-hstat-divider" />
          <div className="rv-hstat"><span className="rv-hstat-num">{roundAnchors.length}</span><span className="rv-hstat-label">characters</span></div>
        </div>

        <div className="rv-planted">
          <span className="rv-planted-label">Planted pattern</span>
          <span className="rv-planted-text">{round.planted}</span>
        </div>
      </div>

      <div className="rv-two-col">
        <div className="rv-panel">
          <div className="section-eyebrow">Course Learning Outcomes</div>
          <div className="clo-tags">
            {round.clos.map(c => (
              <div key={c} className="clo-tag" style={{ borderColor: CLO_COLORS[c] + '44', background: CLO_COLORS[c] + '12' }}>
                <span className="clo-tag-id" style={{ color: CLO_COLORS[c] }}>{c}</span>
                <span className="clo-tag-label" style={{ color: CLO_COLORS[c] + 'CC' }}>
                  { c === 'CLO1' ? 'Drivers & Maturity'
                  : c === 'CLO2' ? 'Platforms & Tools'
                  : c === 'CLO3' ? 'Evaluate Analytics & AI'
                  : c === 'CLO4' ? 'Design Interventions'
                  : 'Ethics, Fairness & Change' }
                </span>
              </div>
            ))}
          </div>
          {round.deliverable && (
            <div className="rv-deliverable">
              <span className="rv-del-icon">📄</span>
              <span className="rv-del-text">{round.deliverable}</span>
            </div>
          )}
          {(round.assessments || []).length > 0 && (
            <div className="rv-assessments">
              {ASSESSMENTS.filter(a => (round.assessments || []).includes(a.label)).map(a => (
                <div key={a.label} className="rv-assess-item"
                  style={{ borderColor: a.color + '44', background: a.color + '10' }}>
                  <span className="rv-assess-label" style={{ color: a.color }}>{a.label}</span>
                  <span className="rv-assess-text">{a.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rv-panel">
          <div className="section-eyebrow">Scholarly Anchors · {round.theories.length} frameworks</div>
          <div className="theory-list">
            {round.theories.map((t, i) => (
              <div key={i} className="theory-item">
                <span className="theory-bullet" style={{ background: round.color }} />
                <span className="theory-text">{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {round.shock && (
        <div className="rv-shock" style={{ borderColor: round.color + '60', background: round.color + '08' }}>
          <div className="rv-shock-header">
            <span className="rv-shock-badge" style={{ background: round.color }}>AUTO</span>
            <span className="rv-shock-title" style={{ color: round.color }}>{round.shock.title}</span>
          </div>
          <p className="rv-shock-body">{round.shock.text}</p>
          <div className="rv-shock-rule">
            Instructor guardrail — do NOT telegraph this event to students before all teams submit {round.id}.
          </div>
        </div>
      )}

      <div className="rv-options-section">
        <div className="section-eyebrow">{round.options.length} Options — each mapped to theory, CLO, and lecture week</div>
        <div className="rv-options-grid">
          {round.options.map(opt => {
            const grade = GRADE_CONFIG[opt.grade] || GRADE_CONFIG.caution;
            const isActive = activeOption === opt.code;
            return (
              <div key={opt.code}
                className={`option-card ${isActive ? 'expanded' : ''}`}
                style={{ '--rc': round.color, '--oc': grade.color }}
                onClick={() => setActiveOption(isActive ? null : opt.code)}
              >
                <div className="oc-header">
                  <div className="oc-code-row">
                    <span className="oc-code" style={{ background: round.color + '22', color: round.color }}>{opt.code}</span>
                    <span className="oc-grade-badge" style={{ background: grade.bg, color: grade.color, border: `1px solid ${grade.border}` }}>{grade.label}</span>
                  </div>
                  <div className="oc-name">{opt.name}</div>
                  <div className="oc-tagline">{opt.tagline}</div>
                </div>

                <div className="oc-costs">
                  <div className="oc-cost" style={{ background: 'rgba(21,160,107,0.1)', color: '#52C99A' }}>
                    <span>Rs {opt.cost.budget}L</span>
                  </div>
                  <div className="oc-cost" style={{ background: 'rgba(123,114,240,0.1)', color: '#9B94E8' }}>
                    <span>{opt.cost.hours} hrs</span>
                  </div>
                  <div className="oc-cost" style={{
                    background: opt.cost.cc >= 0 ? 'rgba(21,160,107,0.1)' : 'rgba(194,55,106,0.1)',
                    color: opt.cost.cc >= 0 ? '#52C99A' : '#E06B96',
                  }}>
                    <span>{opt.cost.cc >= 0 ? '+' : ''}{opt.cost.cc} CC</span>
                  </div>
                </div>

                <div className="oc-clos">
                  {opt.clos.map(c => (
                    <span key={c} className="oc-clo-tag" style={{ color: CLO_COLORS[c], background: CLO_COLORS[c] + '15', border: `1px solid ${CLO_COLORS[c]}30` }}>{c}</span>
                  ))}
                </div>

                <div className="oc-expand-btn" style={{ color: round.color }}>
                  {isActive ? '▲ collapse' : '▼ full theory map'}
                </div>

                {isActive && (
                  <div className="oc-expanded">
                    <div className="oc-exp-section">
                      <div className="oc-exp-label">Theoretical grounding</div>
                      <div className="oc-exp-body">{opt.theory}</div>
                    </div>
                    <div className="oc-exp-section">
                      <div className="oc-exp-label">Lecture linkage</div>
                      <div className="oc-exp-body oc-lecture">{opt.lectureLink}</div>
                    </div>
                    <div className="oc-exp-section">
                      <div className="oc-exp-label">Pedagogical purpose</div>
                      <div className="oc-exp-body">{opt.pedagogy}</div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="budget-summary">
          <div className="budget-row">
            {round.options.map(opt => (
              <div key={opt.code} className="budget-bar-wrap">
                <span className="budget-code" style={{ color: round.color }}>{opt.code}</span>
                <div className="budget-bar-track">
                  <div className="budget-bar-fill" style={{ width: `${(opt.cost.budget / 200) * 100}%`, background: round.color + '90' }} />
                </div>
                <span className="budget-val">Rs {opt.cost.budget}L</span>
              </div>
            ))}
          </div>
          <div className="budget-note">Total Rs 6 crore (Rs 600L) across all 6 rounds. Overspend in early rounds reduces options in R4 retraining.</div>
        </div>
      </div>

      {roundAnchors.length > 0 && (
        <div className="rv-anchors-section">
          <div className="section-eyebrow">Human anchor test — ask this before confirming your option</div>
          <div className="rv-anchors-grid">
            {roundAnchors.map(a => (
              <div key={a.id} className="rv-anchor-card" style={{ '--ac': a.color }}>
                <div className="rv-anchor-left">
                  <div className="rv-anchor-avatar" style={{ background: a.color + '22', color: a.color, border: `1.5px solid ${a.color}50` }}>
                    {a.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="rv-anchor-id" style={{ color: a.color }}>{a.id}</div>
                    <div className="rv-anchor-name">{a.name}</div>
                  </div>
                </div>
                <div className="rv-anchor-profile">{a.profile}</div>
                <div className="rv-anchor-q">
                  <span className="rv-anchor-q-icon">?</span>
                  <span>{a.question}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rv-stakeholder">
        <div className="section-eyebrow">Stakeholder challenge this round</div>
        <div className="rv-sth-card" style={{ borderColor: round.color + '50' }}>
          <div className="rv-sth-header">
            <span className="rv-sth-badge" style={{ background: round.color }}>R{round.id.slice(1)}</span>
            <span className="rv-sth-role" style={{ color: round.color }}>
              { round.id === 'R1' ? 'CFO'
              : round.id === 'R2' ? 'CIO / CISO'
              : round.id === 'R3' ? 'Operations Head'
              : round.id === 'R4' ? 'Employee Representative'
              : round.id === 'R5' ? 'Board of Directors'
              : 'Labour / Worker Voice' }
            </span>
          </div>
          <div className="rv-sth-q">
            { round.id === 'R1' ? '"Why should we fund HR analytics when payroll and compliance already work? What specific financial or operational risk are we solving?"'
            : round.id === 'R2' ? '"Your architecture increases mobile access and data collection. Who owns identity, consent, API security, and vendor risk?"'
            : round.id === 'R3' ? '"Your rollout will reduce store productivity during peak retail weeks. How many training hours per frontline employee does this require, and what is the lost-productivity cost?"'
            : round.id === 'R4' ? '"Why should employees trust a model that over-flags young workers while missing older leavers? Cite your false-positive rates by age group."'
            : round.id === 'R5' ? '"Are we solving attrition, or merely explaining it after the fact? Name one leading indicator you will monitor next quarter."'
            : '"Is this future-of-work strategy a genuine reskilling plan, or a disguised job-reduction plan? Name the safeguards, redeployment logic, and worker consultation mechanism."' }
          </div>
          <div className="rv-sth-note">Minimum 100 words · saved separately · feeds Board Confidence Index</div>
        </div>
      </div>
    </div>
  );
}
