// PAREA Combined — v2 additions
// New components and screens:
//   • TextbookCallout — reusable McKissock textbook reference card (+ modal viewer)
//   • VerifyThisCallout — recurring critical-thinking + verification panel
//   • WorkfileCaptureButton (floating) + WorkfileGate (hard-gate on AI outputs)
//   • Workfile store (localStorage) + WorkfileDashboardCard
//   • MentorRubric — 4-point rubric w/ per-cell descriptors, overall, written feedback
//   • Static USPAP checklist (manual checkmarks, no auto-grade, no AI assist)
//   • S00_BeforeYouStart — preamble + ack gate
//   • S_MentorsCorner — cohort video library
//   • S_OfficeHours — scheduled Zoom sessions
//   • S30b_Workfile — expanded workfile screen w/ captured items
//
// Loaded AFTER combined-components.jsx so it can use PHASES, SUBJECT, MENTOR, etc.

const { useState: useSA, useEffect: useEA, useMemo: useMA } = React;

// ═══════════════════════════════════════════════════════════
// STEPS metadata (replaces PHASES labels — same colors/IDs)
// ═══════════════════════════════════════════════════════════
const STEPS = [
  { id: 'pre', label: 'Pre-Program', color: '#7a8aa3', bg: '#eef2f8' },
  { id: 'p1',  label: 'Step 1 · Problem ID', color: '#7b1fa2', bg: '#f3e5f5' },
  { id: 'p2',  label: 'Step 2 · Inspection', color: '#1b5e20', bg: '#e8f5e9' },
  { id: 'p3',  label: 'Step 3 · Market & HBU', color: '#e65100', bg: '#fff8e1' },
  { id: 'p4',  label: 'Step 4 · Sales Analysis', color: '#880e4f', bg: '#fce4ec' },
  { id: 'p5',  label: 'Step 5 · Valuation', color: '#0d47a1', bg: '#e3f2fd' },
  { id: 'p6',  label: 'Step 6 · Reconciliation', color: '#33691e', bg: '#f1f8e9' },
  { id: 'p7',  label: 'Step 7 · Report', color: '#1a237e', bg: '#e8eaf6' },
  { id: 'p8',  label: 'Step 8 · Communication', color: '#bf360c', bg: '#fbe9e7' },
];
// Mirror onto window.PHASES so existing screens keep working with new labels.
// (Existing components read PHASES.find(...).label — just change the labels.)
if (typeof window !== 'undefined') {
  // Patch PHASES in place so any existing references render "Step …" instead of "Phase …"
  if (Array.isArray(window.PHASES)) {
    window.PHASES.forEach((p, i) => { if (STEPS[i]) p.label = STEPS[i].label; });
  }
  window.STEPS = STEPS;
}

// ═══════════════════════════════════════════════════════════
// McKissock Textbook — placeholder content + callout + modal viewer
// ═══════════════════════════════════════════════════════════
const MCKISSOCK_TEXTBOOK = {
  'market-value': {
    chapter: 'Ch. 2 · Foundations',
    section: 'Defining Market Value',
    summary: 'Market value is the most probable price a property should bring in a competitive and open market under all conditions requisite to a fair sale — buyer and seller acting prudently, knowledgeably, and assuming the price is not affected by undue stimulus.',
    keyPoints: [
      'Most probable, not highest or average',
      'Open market, arm\'s length, no duress',
      'Buyer and seller both knowledgeable',
      'Payment in cash equivalent terms',
      'Price not affected by special financing',
    ],
    whyItMatters: 'A fuzzy definition of value is the #1 source of bad assignment results. Anchor every report on this — re-read it whenever your gut tries to default to "what the contract says."',
  },
  'scope-of-work': {
    chapter: 'Ch. 3 · USPAP Foundations',
    section: 'Scope of Work Rule',
    summary: 'The Scope of Work Rule requires that an appraiser identify the problem and determine and perform the scope of work necessary to develop credible assignment results. Six required elements must be in every engagement: intended use, intended user, type and definition of value, effective date, relevant property characteristics, and assignment conditions.',
    keyPoints: [
      'Intended use — what the result is used for',
      'Intended user — who will rely on it',
      'Type / definition of value (cite source)',
      'Effective date',
      'Relevant property characteristics',
      'Assignment conditions (extraordinary assumptions, hypothetical conditions, jurisdictional exceptions)',
    ],
    whyItMatters: 'A scope of work that misses any of these elements does not satisfy USPAP. Period.',
  },
  'gla-ansi': {
    chapter: 'Ch. 5 · Measurement',
    section: 'ANSI Z765 — Gross Living Area',
    summary: 'ANSI Z765 is the standard for measuring above-grade finished floor area in single-family residential properties. Measure from the exterior; include all finished, heated, above-grade space directly accessible from the rest of the home.',
    keyPoints: [
      'Measure to the exterior of perimeter walls',
      'Above grade only — basements are never GLA, finished or not',
      'Ceiling height: at least 7\'0" for most of the room (at least 6\'4" under sloped ceilings)',
      'Bay windows count if floor-to-ceiling AND ≥ 7\' of height',
      'Open to below: not counted',
      'Garages, porches, decks: never GLA',
    ],
    whyItMatters: 'GLA disagreements between MLS, tax records, and your measurement are routine. ANSI is your defensible standard — cite it.',
  },
  'comp-selection': {
    chapter: 'Ch. 7 · Sales Comparison',
    section: 'Selecting Comparable Sales',
    summary: 'A comparable sale is a closed transaction of a property similar to the subject in the same market segment, sold near the effective date. Comparability is judged on physical characteristics, location, market conditions at sale, and conditions of sale.',
    keyPoints: [
      '3–6 comps typical · 3 minimum for credible support',
      'Same market — same buyers competing for both',
      'Recent — within 90 days when supply allows',
      'Closest by neighborhood boundary, not radius alone',
      'Closed sales preferred; active and pending are supporting, not primary',
      'Comparability is judgment — defend every pick',
    ],
    whyItMatters: 'If your three comps are wrong, every downstream number is wrong. This is where most reports fail review.',
  },
  'hbu': {
    chapter: 'Ch. 6 · Highest & Best Use',
    section: 'The Four Tests',
    summary: 'Highest and best use is the reasonably probable use of property that results in the highest value. Four tests are applied in order — failing any one disqualifies the use.',
    keyPoints: [
      '1. Legally permissible — zoning, deed restrictions, environmental regs',
      '2. Physically possible — site size, soil, access, utilities',
      '3. Financially feasible — generates positive return',
      '4. Maximally productive — highest return among feasible uses',
      'Test BOTH as vacant AND as improved',
      'Skipping any test = HBU is wrong by definition',
    ],
    whyItMatters: 'New appraisers most commonly argue "maximally productive" without showing "financially feasible." Show all four tests, in order, every time.',
  },
  'adjustments': {
    chapter: 'Ch. 7 · Sales Comparison',
    section: 'Supporting Adjustments',
    summary: 'Every adjustment in the sales comparison grid must be supported by market evidence — most commonly paired-sales analysis, matched-pair analysis, or sensitivity analysis. "Industry rule of thumb" is not support.',
    keyPoints: [
      'Net adjustments ≤ 15% of unadjusted sale (FNMA guideline)',
      'Gross adjustments ≤ 25% of unadjusted sale (FNMA guideline)',
      'Paired sales: two closely-comparable properties differing in one feature',
      'Show your work — derivation must be in the workfile',
      'Lump-sum adjustments allowed but must be defensible',
    ],
    whyItMatters: 'When a board complaint reaches review, "I used $30/sf because everyone does" is not a defense.',
  },
  'reconciliation': {
    chapter: 'Ch. 8 · Reconciliation',
    section: 'Reconciling Indicators',
    summary: 'Reconciliation is the appraiser\'s judgment about which indicator(s) of value most credibly reflect the subject. It is never a mathematical average.',
    keyPoints: [
      'Weighted opinion, not average',
      'Weighting must be supported with reasoning, not arithmetic',
      'Defend WHY one approach is more credible than the others',
      'State a single final opinion of value',
      'Rounding is acceptable — disclose it',
    ],
    whyItMatters: 'Boards specifically test for averaging. Show that you reasoned.',
  },
  'ethics': {
    chapter: 'Ch. 1 · USPAP Ethics',
    section: 'Conduct & Independence',
    summary: 'The Ethics Rule prohibits the appraiser from accepting any assignment in which the fee, continued engagement, or future business is contingent on a predetermined value or a direction in value.',
    keyPoints: [
      'No contingent fees on value',
      'No predetermined values',
      'Disclose prior services on the property in last 3 yr',
      'Disclose significant professional assistance',
      'Disclose extraordinary assumptions / hypothetical conditions',
    ],
    whyItMatters: 'Ethics violations are the fastest path to board discipline. There is no "soft" version of these rules.',
  },
  'workfile': {
    chapter: 'Ch. 10 · Record Keeping',
    section: 'Workfile Requirements',
    summary: 'The Record Keeping Rule requires a workfile for each appraisal assignment. The workfile must contain the report, all data assembled, all analyses and reasoning supporting the report, and any communications affecting the assignment.',
    keyPoints: [
      'Workfile separate from the report',
      'Retain 5 years from report date OR 2 yr after litigation — longer of the two',
      'Include everything you considered — including the things you rejected',
      'Screenshots of source data from third-party tools count',
      'AI tool outputs must be retained too — including what you overrode',
    ],
    whyItMatters: 'If a state board asks for your workfile, you have 5 business days. "I lost it" is not a defense.',
  },
  'tool-credibility': {
    chapter: 'Ch. 11 · Working With Data Tools',
    section: 'Verifying Third-Party Outputs',
    summary: 'Appraisers may use tools — PropMix, True Footage, Apex, Matterport, AVMs, AI suggestions — to assemble and analyze data. The appraiser remains responsible for the credibility of every figure in the report.',
    keyPoints: [
      'The tool is not the appraiser',
      'No tool is USPAP-compliant — only the appraiser\'s use of it is',
      'Cross-check: tool vs. tool, tool vs. source, tool vs. your own measurement',
      'Document what the tool returned AND what you used',
      'If you overrode the tool, document why',
    ],
    whyItMatters: 'Boards and lenders are increasingly asking how you verified AI outputs. Have an answer.',
  },
};

function TextbookCallout({ topic, label, why, accent = '#0a6ed1', onOpen }) {
  const entry = MCKISSOCK_TEXTBOOK[topic];
  if (!entry) return null;
  return (
    <button onClick={() => onOpen ? onOpen(topic) : window.__openTextbook?.(topic)}
      style={{
        display: 'flex', alignItems: 'flex-start', gap: 12,
        background: '#eaf3ff', border: `1px solid ${accent}33`,
        borderLeft: `3px solid ${accent}`,
        borderRadius: 8, padding: '12px 14px',
        textAlign: 'left', width: '100%', cursor: 'pointer',
        fontFamily: 'inherit',
        transition: 'all 150ms cubic-bezier(0.4,0,0.2,1)',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = '#dfecff'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = '#eaf3ff'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      <div style={{
        width: 32, height: 36, borderRadius: 4, flexShrink: 0,
        background: `linear-gradient(135deg, ${accent}, #4d94e0)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '1px 1px 0 rgba(0,0,0,0.08)',
      }}>
        <Icon name="book-open" size={16} color="#fff" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
          <span style={{
            fontSize: 9.5, fontWeight: 800, color: accent,
            letterSpacing: '.08em', textTransform: 'uppercase',
          }}>McKissock Textbook</span>
          <span style={{ fontSize: 10.5, color: '#888', fontFamily: "'JetBrains Mono', monospace" }}>· {entry.chapter}</span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#292929', fontFamily: "'Nunito', sans-serif", lineHeight: 1.25 }}>
          {label || entry.section}
        </div>
        {why && (
          <div style={{ fontSize: 11.5, color: '#666', marginTop: 4, lineHeight: 1.45 }}>
            <em>{why}</em>
          </div>
        )}
        <div style={{
          marginTop: 6, fontSize: 11, fontWeight: 700, color: accent,
          display: 'inline-flex', alignItems: 'center', gap: 4,
        }}>
          Open textbook reference
          <Icon name="arrow-right" size={11} color={accent} />
        </div>
      </div>
    </button>
  );
}

function TextbookModal({ topic, onClose }) {
  if (!topic) return null;
  const entry = MCKISSOCK_TEXTBOOK[topic];
  if (!entry) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(15,20,35,0.55)',
      zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 32, animation: 'fadeInUp 180ms ease both',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 12, maxWidth: 720, width: '100%',
        maxHeight: '88vh', overflow: 'hidden', display: 'flex', flexDirection: 'column',
        boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
      }}>
        {/* Header */}
        <div style={{
          padding: '18px 24px',
          background: 'linear-gradient(120deg, #0a6ed1 0%, #4d94e0 100%)',
          color: '#fff', display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            width: 44, height: 52, borderRadius: 4, flexShrink: 0,
            background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '2px 2px 0 rgba(0,0,0,0.12)',
          }}>
            <Icon name="book-open" size={22} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase', opacity: 0.85 }}>
              McKissock Textbook · Foundational Reference
            </div>
            <div style={{ fontSize: 17, fontWeight: 800, marginTop: 2, fontFamily: "'Nunito', sans-serif" }}>
              {entry.section}
            </div>
            <div style={{ fontSize: 12, opacity: 0.85, marginTop: 2 }}>{entry.chapter}</div>
          </div>
          <button onClick={onClose} style={{
            background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer',
            color: '#fff', width: 32, height: 32, borderRadius: 6,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="x" size={16} color="#fff" strokeWidth={2.4} />
          </button>
        </div>
        {/* Body */}
        <div style={{ padding: '20px 26px', overflow: 'auto', flex: 1 }}>
          <p style={{ fontSize: 14, color: '#292929', lineHeight: 1.65, marginBottom: 18 }}>
            {entry.summary}
          </p>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: '#0a6ed1', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 8 }}>
            Key points
          </div>
          <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 18 }}>
            {entry.keyPoints.map((k, i) => (
              <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13, color: '#444', lineHeight: 1.5 }}>
                <span style={{
                  width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                  background: '#eaf3ff', color: '#0a6ed1',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10.5, fontWeight: 800, marginTop: 1,
                }}>{i + 1}</span>
                {k}
              </li>
            ))}
          </ul>
          <div style={{
            background: '#fff8ec', border: '1px solid #e8860a33', borderLeft: '3px solid #e8860a',
            borderRadius: 6, padding: '12px 14px',
          }}>
            <div style={{ fontSize: 10.5, fontWeight: 800, color: '#e8860a', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 4 }}>
              Why this matters
            </div>
            <div style={{ fontSize: 12.5, color: '#444', lineHeight: 1.55 }}>{entry.whyItMatters}</div>
          </div>
        </div>
        {/* Footer */}
        <div style={{
          padding: '12px 24px', borderTop: '1px solid #eee',
          background: '#fafbfc',
          display: 'flex', alignItems: 'center', gap: 10, fontSize: 11.5, color: '#888',
        }}>
          <Icon name="bookmark" size={13} color="#0a6ed1" />
          <span>Foundational reference · returns to where you left off when you close this</span>
          <div style={{ flex: 1 }} />
          <Button variant="primary" size="sm" onClick={onClose}>Got it</Button>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// "Verify this" callout — distinct from textbook, applies to tool outputs
// ═══════════════════════════════════════════════════════════
function VerifyThisCallout({ tool, claim, verifySteps, compact, defaultOpen = false }) {
  const [open, setOpen] = useSA(defaultOpen);
  const toolColors = {
    'PropMix': '#0a6ed1', 'True Footage': '#1f6f5b', 'Apex Sketch': '#6f3fb5',
    'Apex': '#6f3fb5', 'Matterport': '#0a85ff', 'CoreLogic': '#0066b3',
    'HouseCanary': '#16a34a', 'AI': '#d60436', 'AVM': '#0066b3',
  };
  const tc = toolColors[tool] || '#d60436';
  return (
    <div style={{
      background: 'linear-gradient(135deg, #fff8ec 0%, #fff5ec 100%)',
      border: '1px solid #e8860a55',
      borderLeft: '3px solid #d60436',
      borderRadius: 8, padding: compact ? '10px 12px' : '14px 16px',
    }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 8,
        background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
        textAlign: 'left', padding: 0,
      }}>
        <div style={{
          width: 22, height: 22, borderRadius: 5, flexShrink: 0,
          background: '#d60436', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="shield-alert" size={12} color="#fff" strokeWidth={2.4} />
        </div>
        <div style={{ fontSize: 10.5, fontWeight: 800, color: '#d60436', letterSpacing: '.08em', textTransform: 'uppercase' }}>
          Don't trust — verify
        </div>
        {tool && (
          <span style={{
            fontSize: 10, fontWeight: 700, color: tc,
            background: '#fff', padding: '2px 8px', borderRadius: 4,
            border: `1px solid ${tc}44`,
            fontFamily: "'JetBrains Mono', monospace",
          }}>
            from {tool}
          </span>
        )}
        <div style={{ flex: 1 }} />
        {!open && claim && (
          <span style={{ fontSize: 11, color: '#7a4400', fontStyle: 'italic', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: 320 }}>
            “{claim}”
          </span>
        )}
        <Icon name={open ? 'chevron-up' : 'chevron-down'} size={14} color="#7a4400" />
      </button>

      {open && (
        <div style={{ marginTop: 10 }}>
          {claim && (
            <div style={{
              fontSize: 12.5, fontWeight: 700, color: '#292929', marginBottom: 8,
              background: '#fff', padding: '8px 10px', borderRadius: 5,
              border: '1px dashed #e8860a66',
              fontFamily: "'JetBrains Mono', monospace",
            }}>
              {claim}
            </div>
          )}
          <div style={{ fontSize: 11.5, color: '#7a4400', fontWeight: 700, marginBottom: 6 }}>
            Before you accept this, verify it yourself:
          </div>
          <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5, margin: 0 }}>
            {verifySteps.map((s, i) => (
              <li key={i} style={{ display: 'flex', gap: 8, fontSize: 12, color: '#444', lineHeight: 1.45 }}>
                <span style={{
                  width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
                  background: '#fff', border: '1.5px solid #e8860a', color: '#e8860a',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 9.5, fontWeight: 800, marginTop: 1,
                }}>{i + 1}</span>
                <span>{s}</span>
              </li>
            ))}
          </ol>
          <div style={{
            marginTop: 10, paddingTop: 10, borderTop: '1px dashed #e8860a44',
            fontSize: 10.5, color: '#7a4400', fontStyle: 'italic',
          }}>
            Tools are not USPAP-compliant — your <strong>use</strong> of them is. The credibility of this number is on you.
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Workfile store — localStorage-backed, scoped per report
// ═══════════════════════════════════════════════════════════
const WORKFILE_KEY = 'parea_workfile_v1';
function loadWorkfile() {
  try {
    const raw = localStorage.getItem(WORKFILE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  // Seed with a few entries so the dashboard card isn't empty on first load
  return {
    'report-1': [
      { id: 'wf-seed-1', step: 'p1', label: 'Engagement letter draft', source: 'True Footage', kind: 'document', ts: Date.now() - 2 * 86400000 },
      { id: 'wf-seed-2', step: 'p1', label: 'PropMix subject property card', source: 'PropMix', kind: 'screenshot', ts: Date.now() - 86400000 },
      { id: 'wf-seed-3', step: 'p2', label: 'Apex sketch · subject GLA reconciled', source: 'Apex Sketch', kind: 'screenshot', ts: Date.now() - 12 * 3600000 },
    ],
    'report-2': [],
    'report-3': [],
  };
}
function saveWorkfile(wf) {
  try { localStorage.setItem(WORKFILE_KEY, JSON.stringify(wf)); } catch (e) {}
  // Broadcast change
  window.dispatchEvent(new CustomEvent('parea-workfile-changed'));
}
function addToWorkfile(report, entry) {
  const wf = loadWorkfile();
  if (!wf[report]) wf[report] = [];
  wf[report].unshift({ id: 'wf-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8), ts: Date.now(), ...entry });
  saveWorkfile(wf);
}

function useWorkfile(report = 'report-1') {
  const [wf, setWf] = useSA(loadWorkfile);
  useEA(() => {
    const handler = () => setWf(loadWorkfile());
    window.addEventListener('parea-workfile-changed', handler);
    return () => window.removeEventListener('parea-workfile-changed', handler);
  }, []);
  return wf[report] || [];
}

// ═══════════════════════════════════════════════════════════
// WorkfileCaptureButton — pinned floating button on tool screens
// ═══════════════════════════════════════════════════════════
function WorkfileCaptureButton({ step, label, source, kind = 'screenshot', report = 'report-1' }) {
  const [saved, setSaved] = useSA(false);
  const handleCapture = () => {
    addToWorkfile(report, { step, label, source, kind });
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };
  return (
    <div style={{
      position: 'fixed', bottom: 22, right: 22, zIndex: 90,
      display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6,
      animation: 'fadeInUp 240ms cubic-bezier(0.4,0,0.2,1) both',
    }}>
      <button onClick={handleCapture} disabled={saved}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: saved ? '#1a9e5c' : 'linear-gradient(135deg, #292929, #1a1d2b)',
          color: '#fff', border: 'none', cursor: saved ? 'default' : 'pointer',
          padding: '11px 18px 11px 14px', borderRadius: 999,
          boxShadow: '0 6px 20px rgba(0,0,0,0.22)',
          fontFamily: 'inherit', fontSize: 13, fontWeight: 700,
          transition: 'all 180ms cubic-bezier(0.4,0,0.2,1)',
        }}>
        <div style={{
          width: 26, height: 26, borderRadius: '50%',
          background: saved ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name={saved ? 'check' : 'camera'} size={13} color="#fff" strokeWidth={2.4} />
        </div>
        {saved ? 'Captured to workfile' : 'Capture to workfile'}
      </button>
      {!saved && (
        <div style={{
          fontSize: 10.5, color: '#888',
          fontFamily: "'JetBrains Mono', monospace",
          background: 'rgba(255,255,255,0.92)', padding: '2px 8px', borderRadius: 4,
          border: '1px solid #e8e8e8',
        }}>
          USPAP requires retained evidence · 5 yr
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// WorkfileGate — hard-gate on AI-output screens: must capture to advance
// ═══════════════════════════════════════════════════════════
function WorkfileGate({ step, label, source, children, report = 'report-1', defaultOpen = false }) {
  const [captured, setCaptured] = useSA(false);
  const [open, setOpen] = useSA(defaultOpen);
  const handleCapture = (e) => {
    e?.stopPropagation();
    addToWorkfile(report, { step, label, source, kind: 'screenshot' });
    setCaptured(true);
  };
  return (
    <div style={{
      background: captured ? '#edfbf4' : '#fff8ec',
      border: `1.5px solid ${captured ? '#1a9e5c55' : '#e8860a66'}`,
      borderRadius: 10, padding: '10px 14px', marginBottom: 14,
      transition: 'all 200ms cubic-bezier(0.4,0,0.2,1)',
    }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', display: 'flex', alignItems: 'center', gap: 12,
        background: 'none', border: 'none', cursor: 'pointer',
        fontFamily: 'inherit', textAlign: 'left', padding: 0,
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: 8, flexShrink: 0,
          background: captured ? '#1a9e5c' : '#e8860a',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name={captured ? 'check' : 'camera'} size={16} color="#fff" strokeWidth={2.2} />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, color: captured ? '#0d4a2e' : '#7a4400', fontFamily: "'Nunito', sans-serif" }}>
            {captured ? 'Captured · evidence preserved' : 'Capture this output before you advance'}
          </div>
          {!open && (
            <div style={{ fontSize: 11, color: captured ? '#0d4a2e' : '#7a4400', opacity: 0.8, marginTop: 1, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {captured ? `“${label}” added to your Report 1 workfile.` : `Source: ${source}`}
            </div>
          )}
        </div>
        {!captured && (
          <span onClick={handleCapture} role="button" style={{
            background: '#e8860a', color: '#fff', border: 'none', cursor: 'pointer',
            padding: '7px 12px', borderRadius: 6, fontWeight: 700, fontSize: 12,
            fontFamily: 'inherit', whiteSpace: 'nowrap',
            display: 'inline-flex', alignItems: 'center', gap: 5,
          }}>
            <Icon name="camera" size={12} color="#fff" strokeWidth={2.2} />
            Capture
          </span>
        )}
        <Icon name={open ? 'chevron-up' : 'chevron-down'} size={14} color={captured ? '#0d4a2e' : '#7a4400'} />
      </button>
      {open && (
        <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px dashed ${captured ? '#1a9e5c33' : '#e8860a33'}` }}>
          <div style={{ fontSize: 11.5, color: captured ? '#0d4a2e' : '#7a4400', lineHeight: 1.55 }}>
            {captured
              ? `“${label}” added to your Report 1 workfile.`
              : `AI/tool outputs go in your workfile — including ones you override. Source: ${source}.`}
          </div>
          {children && <div style={{ marginTop: 6, fontSize: 11.5, color: '#444', lineHeight: 1.5 }}>{children}</div>}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// WorkfileDashboardCard — pinned on the Dashboard
// ═══════════════════════════════════════════════════════════
function WorkfileDashboardCard({ navigate }) {
  const [report, setReport] = useSA('report-1');
  const [open, setOpen] = useSA(false);
  const items = useWorkfile(report);
  const REPORTS = [
    { id: 'report-1', label: 'Report 1', sub: 'Conv. Purchase', active: true },
    { id: 'report-2', label: 'Report 2', sub: 'FHA Refi', active: false },
    { id: 'report-3', label: 'Report 3', sub: 'REO', active: false },
  ];
  return (
    <Card padding={0} style={{ overflow: 'hidden' }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', padding: '14px 18px',
        background: 'linear-gradient(135deg, #292929 0%, #1a1d2b 100%)',
        color: '#fff', display: 'flex', alignItems: 'center', gap: 12,
        border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8, flexShrink: 0,
          background: 'rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="folder-open" size={18} color="#fff" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13.5, fontWeight: 800, fontFamily: "'Nunito', sans-serif" }}>Active Workfile</div>
          <div style={{ fontSize: 10.5, color: '#cbd0e0', letterSpacing: '.04em' }}>{items.length} item{items.length === 1 ? '' : 's'} captured · 5-yr retention</div>
        </div>
        <Icon name={open ? 'chevron-up' : 'chevron-down'} size={16} color="#cbd0e0" />
      </button>
      {open && (
        <>
          <div style={{ display: 'flex', gap: 4, padding: '10px 12px 0', background: '#fafbfc' }}>
            {REPORTS.map(r => (
              <button key={r.id} onClick={() => r.active && setReport(r.id)}
                disabled={!r.active}
                style={{
                  flex: 1, padding: '8px 10px',
                  background: report === r.id ? '#fff' : 'transparent',
                  border: report === r.id ? '1px solid #e8e8e8' : '1px solid transparent',
                  borderBottom: report === r.id ? '1px solid #fff' : '1px solid #eee',
                  borderRadius: '6px 6px 0 0', cursor: r.active ? 'pointer' : 'not-allowed',
                  fontFamily: 'inherit', fontSize: 11.5, fontWeight: 700,
                  color: report === r.id ? '#d60436' : r.active ? '#666' : '#bbb',
                  display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1,
                  marginBottom: -1, position: 'relative',
                }}>
                <span>{r.label}</span>
                <span style={{ fontSize: 9.5, fontWeight: 500, color: report === r.id ? '#888' : 'inherit' }}>{r.sub}</span>
                {!r.active && <span style={{ position: 'absolute', top: 4, right: 4, fontSize: 9, color: '#bbb' }}>locked</span>}
              </button>
            ))}
          </div>
          <div style={{ padding: '12px 16px 8px', maxHeight: 200, overflowY: 'auto' }}>
            {items.length === 0 ? (
              <div style={{ padding: '20px 8px', textAlign: 'center', color: '#888', fontSize: 12 }}>
                No items yet — capture as you work.
              </div>
            ) : items.slice(0, 5).map(it => (
              <div key={it.id} style={{ display: 'flex', gap: 10, padding: '7px 0', borderBottom: '1px solid #f4f4f4', alignItems: 'center' }}>
                <div style={{
                  width: 26, height: 26, borderRadius: 5, flexShrink: 0,
                  background: it.kind === 'screenshot' ? '#eaf3ff' : it.kind === 'note' ? '#fff8ec' : '#f4f5f7',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon name={it.kind === 'screenshot' ? 'image' : it.kind === 'note' ? 'sticky-note' : 'file'}
                    size={12} color={it.kind === 'screenshot' ? '#0a6ed1' : it.kind === 'note' ? '#e8860a' : '#666'} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#292929', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{it.label}</div>
                  <div style={{ fontSize: 10, color: '#888', fontFamily: "'JetBrains Mono', monospace" }}>
                    {it.source} · {relTime(it.ts)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: '10px 14px 14px', display: 'flex', gap: 8 }}>
            <Button variant="outline" size="sm" onClick={() => navigate('workfile')} fullWidth>
              <Icon name="folder-open" size={12} color="#d60436" /> Open workfile
            </Button>
          </div>
        </>
      )}
    </Card>
  );
}

function relTime(ts) {
  const diff = Date.now() - ts;
  if (diff < 60_000) return 'just now';
  if (diff < 3_600_000) return Math.floor(diff / 60_000) + 'm ago';
  if (diff < 86_400_000) return Math.floor(diff / 3_600_000) + 'h ago';
  return Math.floor(diff / 86_400_000) + 'd ago';
}

// ═══════════════════════════════════════════════════════════
// ManualChecklist — reusable static checklist (no auto-grade, no AI assist)
// Used in place of AI pre-screen lists — the learner marks each item themselves.
// ═══════════════════════════════════════════════════════════
function ManualChecklist({ title, subtitle, items, storageKey, accent = '#292929' }) {
  // items: array of strings OR {label, hint}
  const normalize = (it) => typeof it === 'string' ? { label: it } : it;
  const [checked, setChecked] = useSA(() => {
    if (!storageKey) return {};
    try { return JSON.parse(localStorage.getItem('parea_ck_' + storageKey) || '{}'); } catch (e) { return {}; }
  });
  const toggle = (i) => {
    const next = { ...checked, [i]: !checked[i] };
    setChecked(next);
    if (storageKey) {
      try { localStorage.setItem('parea_ck_' + storageKey, JSON.stringify(next)); } catch (e) {}
    }
  };
  const doneCount = items.filter((_, i) => checked[i]).length;
  return (
    <Card padding={0}>
      <div style={{
        padding: '14px 18px', borderBottom: '1px solid #eee',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 7, flexShrink: 0,
          background: '#f4f5f7',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="list-checks" size={16} color={accent} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13.5, fontWeight: 800, fontFamily: "'Nunito', sans-serif" }}>{title}</div>
          {subtitle && <div style={{ fontSize: 11, color: '#888', marginTop: 1 }}>{subtitle}</div>}
        </div>
        <div style={{ fontSize: 11, color: '#888', fontFamily: "'JetBrains Mono', monospace", fontWeight: 700 }}>
          {doneCount}/{items.length}
        </div>
      </div>
      <div style={{ padding: '6px 8px' }}>
        {items.map((raw, i) => {
          const it = normalize(raw);
          const isChecked = !!checked[i];
          return (
            <button key={i} onClick={() => toggle(i)} style={{
              width: '100%', display: 'flex', gap: 12, alignItems: 'flex-start',
              padding: '10px 12px', background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', textAlign: 'left', borderRadius: 6,
              transition: 'background 120ms',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#fafbfc'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              <div style={{
                width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                background: isChecked ? accent : '#fff',
                border: `1.5px solid ${isChecked ? accent : '#c8c8c8'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginTop: 2,
              }}>
                {isChecked && <Icon name="check" size={11} color="#fff" strokeWidth={3} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 13, color: '#292929', lineHeight: 1.4,
                  textDecoration: isChecked ? 'line-through' : 'none',
                  opacity: isChecked ? 0.55 : 1, fontWeight: 600,
                }}>{it.label}</div>
                {it.hint && <div style={{ fontSize: 11, color: '#888', marginTop: 2, lineHeight: 1.4 }}>{it.hint}</div>}
              </div>
            </button>
          );
        })}
      </div>
      <div style={{
        padding: '8px 18px', background: '#fafbfc', borderTop: '1px solid #eee',
        fontSize: 10.5, color: '#888', display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <Icon name="info" size={11} color="#888" />
        You mark each item yourself — not auto-graded, not AI-completed.
      </div>
    </Card>
  );
}

// ═══════════════════════════════════════════════════════════
// WorkfileCheck — each mentor review includes a check of the workfile
// ═══════════════════════════════════════════════════════════
function WorkfileCheck({ step, mentorReviewN, expectedItems = [], navigate }) {
  // expectedItems: list of strings the mentor expects to see in the workfile for this step
  const items = useWorkfile('report-1');
  const stepItems = items.filter(it => !step || it.step === step);
  return (
    <Card padding={0} style={{ overflow: 'hidden' }}>
      <div style={{
        padding: '12px 18px', background: '#fff8ec', borderBottom: '1px solid #e8860a33',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <Icon name="folder-search" size={16} color="#7a4400" />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800, color: '#7a4400', fontFamily: "'Nunito', sans-serif" }}>
            Workfile check · part of Mentor Review {mentorReviewN}
          </div>
          <div style={{ fontSize: 11, color: '#7a4400', opacity: 0.85, marginTop: 1 }}>
            Mentors check workfile completeness on every review. Below: what they expect to find for this step.
          </div>
        </div>
        <div style={{ fontSize: 11, fontWeight: 800, color: '#7a4400', fontFamily: "'JetBrains Mono', monospace" }}>
          {stepItems.length} captured
        </div>
      </div>
      <div style={{ padding: '14px 18px' }}>
        <div style={{ fontSize: 10.5, fontWeight: 800, color: '#888', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 8 }}>
          What the mentor expects in the workfile
        </div>
        <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {expectedItems.map((ex, i) => {
            // Loose-match: does the workfile contain anything mentioning this expected item?
            const present = stepItems.some(it =>
              it.label.toLowerCase().includes(ex.match.toLowerCase()) ||
              (it.source && it.source.toLowerCase().includes(ex.match.toLowerCase()))
            );
            return (
              <li key={i} style={{
                display: 'flex', gap: 10, alignItems: 'flex-start',
                padding: '8px 10px',
                background: present ? '#edfbf4' : '#fff',
                border: `1px solid ${present ? '#1a9e5c44' : '#e8e8e8'}`,
                borderRadius: 6,
              }}>
                <Icon name={present ? 'check-circle' : 'circle'} size={14} color={present ? '#1a9e5c' : '#bbb'} strokeWidth={2.2} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12.5, fontWeight: 600, color: present ? '#0d4a2e' : '#444' }}>{ex.label}</div>
                  {!present && ex.hint && (
                    <div style={{ fontSize: 11, color: '#888', marginTop: 2, lineHeight: 1.4 }}>{ex.hint}</div>
                  )}
                </div>
                {!present && (
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#e8860a', background: '#fff8ec', padding: '2px 7px', borderRadius: 3, letterSpacing: '.04em', textTransform: 'uppercase' }}>
                    Missing
                  </span>
                )}
              </li>
            );
          })}
        </ul>
        {navigate && (
          <button onClick={() => navigate('workfile')} style={{
            marginTop: 12, background: 'none', border: 'none', cursor: 'pointer',
            color: '#d60436', fontSize: 11.5, fontWeight: 700,
            fontFamily: 'inherit', display: 'inline-flex', alignItems: 'center', gap: 4,
          }}>
            Open workfile <Icon name="arrow-right" size={11} color="#d60436" />
          </button>
        )}
      </div>
    </Card>
  );
}

// ═══════════════════════════════════════════════════════════
// CollapsibleSection — simple wrapper for default-collapsed dashboard groupings
// ═══════════════════════════════════════════════════════════
function CollapsibleSection({ title, subtitle, icon = 'chart-line', defaultOpen = false, children }) {
  const [open, setOpen] = useSA(defaultOpen);
  return (
    <Card padding={0} style={{ overflow: 'hidden', marginBottom: 18 }}>
      <button onClick={() => setOpen(o => !o)} style={{
        width: '100%', padding: '14px 20px', background: 'none', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 14, fontFamily: 'inherit', textAlign: 'left',
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8, flexShrink: 0,
          background: '#f4f5f7',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name={icon} size={17} color="#292929" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14.5, fontWeight: 800, fontFamily: "'Nunito', sans-serif", color: '#292929' }}>{title}</div>
          {subtitle && <div style={{ fontSize: 11.5, color: '#888', marginTop: 1 }}>{subtitle}</div>}
        </div>
        <Icon name={open ? 'chevron-up' : 'chevron-down'} size={16} color="#888" />
      </button>
      {open && <div style={{ padding: '0 18px 18px', borderTop: '1px solid #f0f0f0' }}>{children}</div>}
    </Card>
  );
}

// ═══════════════════════════════════════════════════════════
// MentorRubric — 4-point scale with per-cell descriptors
// ═══════════════════════════════════════════════════════════
function MentorRubric({ criteria, overall, feedback, mentor, asyncMeta, gapReferences = [], onOpenTextbook }) {
  // criteria: [{ label, score (1-4), descriptors: { 4: '...', 3: '...', 2: '...', 1: '...' }, gap?: textbook topic }]
  const max = 4;
  const total = criteria.reduce((s, c) => s + c.score, 0);
  const maxTotal = criteria.length * max;
  const pct = (total / maxTotal) * 100;
  const verdict = pct >= 87 ? { label: 'Approved · no revisions', color: '#1a9e5c', bg: '#edfbf4' }
                : pct >= 75 ? { label: 'Approved with notes', color: '#1a9e5c', bg: '#edfbf4' }
                : pct >= 60 ? { label: 'Revisions recommended', color: '#e8860a', bg: '#fff8ec' }
                : { label: 'Revisions required', color: '#d60436', bg: '#fff0f3' };
  const scoreColor = (s) => s === 4 ? '#1a9e5c' : s === 3 ? '#1a9e5c' : s === 2 ? '#e8860a' : '#d60436';
  const cellBg = (active, s) => active ? scoreColor(s) : '#fafafa';

  return (
    <Card padding={0} style={{ overflow: 'hidden' }}>
      {/* Async banner */}
      <div style={{
        padding: '10px 18px',
        background: 'linear-gradient(90deg, #fafbfc, #f4f5f7)',
        borderBottom: '1px solid #eee',
        display: 'flex', alignItems: 'center', gap: 10,
        fontSize: 11, color: '#666',
      }}>
        <Icon name="clock" size={13} color="#888" />
        <strong style={{ color: '#292929' }}>Asynchronous review</strong>
        <span>· {asyncMeta || 'Mentor responded 6h ago · turnaround 24 hr typical'}</span>
      </div>

      {/* Header w/ overall score */}
      <div style={{
        padding: '20px 24px',
        background: '#1a1d2b',
        color: '#fff', display: 'flex', alignItems: 'center', gap: 20,
      }}>
        <img src={mentor?.avatar || MENTOR.avatar} style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: '2px solid rgba(255,255,255,0.15)' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10.5, color: '#cbd0e0', letterSpacing: '.06em', textTransform: 'uppercase', fontWeight: 700 }}>Mentor evaluation · 4-point rubric</div>
          <div style={{ fontSize: 16, fontWeight: 800, color: '#fff', marginTop: 3, fontFamily: "'Nunito', sans-serif" }}>{(mentor || MENTOR).name}</div>
          <div style={{ fontSize: 11.5, color: '#cbd0e0', marginTop: 1 }}>{(mentor || MENTOR).role}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 10.5, color: '#cbd0e0', letterSpacing: '.05em', textTransform: 'uppercase' }}>Overall</div>
          <div style={{ fontSize: 32, fontWeight: 800, fontFamily: "'Nunito', sans-serif", lineHeight: 1.1, color: '#fff' }}>
            {total}<span style={{ fontSize: 18, opacity: 0.6 }}>/{maxTotal}</span>
          </div>
          <div style={{
            display: 'inline-block', marginTop: 4,
            background: verdict.color, color: '#fff',
            padding: '3px 10px', borderRadius: 4,
            fontSize: 10.5, fontWeight: 800, letterSpacing: '.04em', textTransform: 'uppercase',
          }}>{verdict.label}</div>
        </div>
      </div>

      {/* Rubric table */}
      <div style={{ padding: '4px 0' }}>
        {/* header row */}
        <div style={{
          display: 'grid', gridTemplateColumns: '1.6fr repeat(4, 1fr) 60px',
          gap: 0, padding: '10px 18px',
          fontSize: 10, fontWeight: 800, color: '#888',
          letterSpacing: '.06em', textTransform: 'uppercase',
          borderBottom: '1px solid #eee',
        }}>
          <div>Criterion</div>
          {[4, 3, 2, 1].map(s => (
            <div key={s} style={{ textAlign: 'center', color: scoreColor(s) }}>
              {s === 4 ? 'Exemplary' : s === 3 ? 'Proficient' : s === 2 ? 'Developing' : 'Needs Work'}
              <div style={{ fontSize: 10, opacity: 0.7, fontWeight: 700 }}>{s}/4</div>
            </div>
          ))}
          <div style={{ textAlign: 'right' }}>Score</div>
        </div>

        {/* criterion rows */}
        {criteria.map((c, idx) => (
          <div key={idx} style={{
            borderTop: idx === 0 ? 'none' : '4px solid #f4f5f7',
            background: idx % 2 === 0 ? '#fff' : '#fafbfc',
          }}>
            <div style={{
              display: 'grid', gridTemplateColumns: '1.6fr repeat(4, 1fr) 60px',
              gap: 0, padding: '12px 18px', alignItems: 'stretch',
            }}>
              <div style={{ paddingRight: 14, alignSelf: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#292929' }}>{c.label}</div>
                {c.desc && <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{c.desc}</div>}
              </div>
              {[4, 3, 2, 1].map(s => {
                const active = c.score === s;
                return (
                  <div key={s} style={{
                    padding: '8px 8px',
                    background: active ? `${scoreColor(s)}11` : '#fafbfc',
                    border: active ? `1.5px solid ${scoreColor(s)}` : '1px solid #f0f0f0',
                    borderRadius: 6, margin: '0 3px',
                    fontSize: 10.5, lineHeight: 1.4, color: active ? '#292929' : '#888',
                    fontWeight: active ? 600 : 500,
                    position: 'relative',
                  }}>
                    {active && (
                      <div style={{
                        position: 'absolute', top: -7, right: -6,
                        width: 18, height: 18, borderRadius: '50%',
                        background: scoreColor(s), color: '#fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.18)',
                      }}>
                        <Icon name="check" size={10} color="#fff" strokeWidth={3} />
                      </div>
                    )}
                    {c.descriptors?.[s] || '—'}
                  </div>
                );
              })}
              <div style={{ alignSelf: 'center', textAlign: 'right', fontWeight: 800, fontSize: 16, color: scoreColor(c.score), fontFamily: "'Nunito', sans-serif" }}>
                {c.score}/4
              </div>
            </div>
            {c.note && (
              <div style={{
                padding: '0 18px 12px',
                fontSize: 12, color: '#444', lineHeight: 1.55,
                display: 'flex', gap: 10, alignItems: 'flex-start',
              }}>
                <Icon name="message-square" size={12} color={scoreColor(c.score)} />
                <div style={{ flex: 1 }}>
                  <strong style={{ color: scoreColor(c.score) }}>Mentor's note · </strong>{c.note}
                </div>
              </div>
            )}
            {c.gap && (
              <div style={{ padding: '0 18px 14px' }}>
                <TextbookCallout
                  topic={c.gap}
                  why="Score below 3/4 on a foundational topic — review this before revising."
                  onOpen={onOpenTextbook}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Mentor narrative + textbook gaps */}
      <div style={{ padding: '18px 22px', background: '#fafbfc', borderTop: '1px solid #eee' }}>
        <div style={{ fontSize: 10.5, fontWeight: 800, color: '#888', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 6 }}>
          Mentor's written feedback
        </div>
        <div style={{
          background: '#fff', borderRadius: 8, padding: '14px 16px',
          border: '1px solid #eee', fontSize: 13, color: '#292929', lineHeight: 1.65, fontStyle: 'italic',
        }}>
          "{feedback}"
        </div>
        {gapReferences.length > 0 && (
          <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: 10.5, fontWeight: 800, color: '#0a6ed1', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 8 }}>
              Foundational references · review before revising
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {gapReferences.map((g, i) => (
                <TextbookCallout key={i} topic={g.topic} why={g.why} onOpen={onOpenTextbook} />
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

// ═══════════════════════════════════════════════════════════
// Static USPAP checklist — manual checkmarks, no auto-grade
// ═══════════════════════════════════════════════════════════
const STATIC_USPAP_CHECKLIST = [
  { code: 'SR1-1', label: 'Identify the problem to be solved' },
  { code: 'SR1-2', label: 'Determine the scope of work necessary' },
  { code: 'SR1-2(e)', label: 'Identify the type and definition of value (cite source)' },
  { code: 'SR1-2(f)', label: 'Identify the effective date of the opinion of value' },
  { code: 'SR1-2(g)', label: 'Identify relevant characteristics of the subject' },
  { code: 'SR1-3', label: 'Analyze HBU as vacant AND as improved · all 4 tests' },
  { code: 'SR1-4', label: 'Develop opinion of value by applicable approaches' },
  { code: 'SR1-5', label: 'Reconcile quality and quantity of evidence' },
  { code: 'SR1-6', label: 'Reconcile reasonableness of approaches to a final opinion' },
  { code: 'SR2-1', label: 'Report not misleading; sufficient to lead intended user' },
  { code: 'SR2-2', label: 'Use appropriate written-report option (URAR)' },
  { code: 'SR2-3', label: 'Sign the certification' },
  { code: 'Ethics Rule', label: 'No contingent fees · no predetermined values' },
  { code: 'Record Keeping', label: 'Workfile prepared · 5-year retention noted' },
];

function StaticUSPAPChecklist({ title = 'USPAP self-check', items = STATIC_USPAP_CHECKLIST, printable = true }) {
  const [checked, setChecked] = useSA({});
  const toggle = (code) => setChecked(c => ({ ...c, [code]: !c[code] }));
  return (
    <Card padding={0}>
      <div style={{
        padding: '14px 20px', borderBottom: '1px solid #eee',
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 7, flexShrink: 0,
          background: '#f4f5f7',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="list-checks" size={16} color="#292929" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13.5, fontWeight: 800, fontFamily: "'Nunito', sans-serif" }}>{title}</div>
          <div style={{ fontSize: 11, color: '#888', marginTop: 1 }}>Static self-check · you mark each item · not auto-graded · not AI-completed</div>
        </div>
        {printable && (
          <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Icon name="printer" size={12} color="#d60436" /> Print
          </Button>
        )}
      </div>
      <div style={{ padding: '10px 8px' }}>
        {items.map((it, i) => {
          const isChecked = !!checked[it.code];
          return (
            <button key={it.code} onClick={() => toggle(it.code)} style={{
              width: '100%', display: 'flex', gap: 12, alignItems: 'flex-start',
              padding: '10px 14px', background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', textAlign: 'left',
              borderRadius: 6,
              transition: 'background 120ms',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#fafbfc'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
            >
              <div style={{
                width: 20, height: 20, borderRadius: 4, flexShrink: 0,
                background: isChecked ? '#292929' : '#fff',
                border: `1.5px solid ${isChecked ? '#292929' : '#c8c8c8'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginTop: 2,
              }}>
                {isChecked && <Icon name="check" size={12} color="#fff" strokeWidth={3} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: '#888', fontWeight: 700 }}>{it.code}</div>
                <div style={{ fontSize: 13, color: '#292929', marginTop: 1, lineHeight: 1.45,
                  textDecoration: isChecked ? 'line-through' : 'none',
                  opacity: isChecked ? 0.6 : 1,
                }}>{it.label}</div>
              </div>
            </button>
          );
        })}
      </div>
      <div style={{
        padding: '10px 20px', background: '#fafbfc', borderTop: '1px solid #eee',
        display: 'flex', alignItems: 'center', gap: 10,
        fontSize: 11, color: '#666',
      }}>
        <Icon name="info" size={12} color="#888" />
        Marks are yours alone — not transmitted, not auto-graded. The checklist is a thinking aid, not a compliance certificate.
      </div>
    </Card>
  );
}

// ═══════════════════════════════════════════════════════════
// Mentor videos data + screen
// ═══════════════════════════════════════════════════════════
const MENTOR_VIDEOS = [
  { id: 'v1', title: 'Welcome, Cohort 04 — what this practicum will demand of you', length: '8:42', posted: '2 weeks ago', topic: 'Orientation', thumb: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&q=70' },
  { id: 'v2', title: 'How I read a comp grid — defending each pick out loud', length: '14:08', posted: '11 days ago', topic: 'Step 4 · Sales Analysis', thumb: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=70' },
  { id: 'v3', title: 'The basement-finish adjustment that always trips you up', length: '6:31', posted: '8 days ago', topic: 'Step 5 · Valuation', thumb: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=70' },
  { id: 'v4', title: 'When you should refuse the assignment — three real scenarios', length: '11:55', posted: '5 days ago', topic: 'Ethics & Independence', thumb: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&q=70' },
  { id: 'v5', title: 'ANSI Z765 walkthrough — what counts, what doesn\'t', length: '9:14', posted: '3 days ago', topic: 'Step 2 · Inspection', thumb: 'https://images.unsplash.com/photo-1448630360428-65456885c650?w=600&q=70' },
  { id: 'v6', title: 'Reconciliation: please stop averaging', length: '7:22', posted: '2 days ago', topic: 'Step 6 · Reconciliation', thumb: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&q=70' },
];

function MentorVideoTile({ v, onPlay }) {
  return (
    <button onClick={() => onPlay(v)} style={{
      background: '#fff', border: '1px solid #eee', borderRadius: 10,
      padding: 0, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
      transition: 'all 180ms cubic-bezier(0.4,0,0.2,1)',
    }}
    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 22px rgba(0,0,0,0.10)'; }}
    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#1a1d2b' }}>
        <img src={v.thumb} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.55))' }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 52, height: 52, borderRadius: '50%',
          background: 'rgba(255,255,255,0.95)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(0,0,0,0.35)',
        }}>
          <Icon name="play" size={20} color="#d60436" strokeWidth={2.4} />
        </div>
        <div style={{
          position: 'absolute', bottom: 8, right: 8,
          background: 'rgba(0,0,0,0.7)', color: '#fff',
          padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700,
          fontFamily: "'JetBrains Mono', monospace",
        }}>{v.length}</div>
        <div style={{
          position: 'absolute', top: 8, left: 8,
          background: 'rgba(255,255,255,0.9)', color: '#d60436',
          padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 800,
          letterSpacing: '.05em', textTransform: 'uppercase',
        }}>{v.topic}</div>
      </div>
      <div style={{ padding: '12px 14px 14px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#292929', lineHeight: 1.3, fontFamily: "'Nunito', sans-serif" }}>{v.title}</div>
        <div style={{ fontSize: 10.5, color: '#888', marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon name="user" size={10} color="#888" />
          James Mendel, MAI · posted {v.posted}
        </div>
      </div>
    </button>
  );
}

function MentorVideoModal({ video, onClose }) {
  if (!video) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.78)',
      zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 32, animation: 'fadeInUp 200ms ease both',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: '#1a1d2b', borderRadius: 12, maxWidth: 920, width: '100%',
        overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
      }}>
        <div style={{ position: 'relative', aspectRatio: '16/9', background: '#000' }}>
          <img src={video.thumb} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }} />
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 12, color: '#fff',
          }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'rgba(214,4,54,0.95)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 6px 20px rgba(214,4,54,0.45)',
            }}>
              <Icon name="play" size={32} color="#fff" strokeWidth={2.4} />
            </div>
            <div style={{ fontSize: 12, opacity: 0.7, fontFamily: "'JetBrains Mono', monospace" }}>placeholder · video player</div>
          </div>
          <button onClick={onClose} style={{
            position: 'absolute', top: 14, right: 14,
            background: 'rgba(0,0,0,0.5)', border: 'none', cursor: 'pointer',
            color: '#fff', width: 34, height: 34, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon name="x" size={18} color="#fff" strokeWidth={2.4} />
          </button>
        </div>
        <div style={{ padding: '16px 22px' }}>
          <div style={{ fontSize: 10.5, fontWeight: 800, color: '#ff8da3', letterSpacing: '.06em', textTransform: 'uppercase' }}>{video.topic}</div>
          <div style={{ fontSize: 17, fontWeight: 800, color: '#fff', marginTop: 4, fontFamily: "'Nunito', sans-serif" }}>{video.title}</div>
          <div style={{ fontSize: 12, color: '#cbd0e0', marginTop: 4 }}>James Mendel, MAI · {video.length} · posted {video.posted}</div>
        </div>
      </div>
    </div>
  );
}

function S_MentorsCorner({ navigate }) {
  const [playing, setPlaying] = useSA(null);
  return (
    <div>
      <PageHeader breadcrumb={['Cohort 04']} title="Mentor's Corner"
        subtitle="Videos James has posted for Cohort 04. Asynchronous — watch when you have a focused 10 minutes. New videos appear here when he posts." />

      {/* Mentor strip */}
      <Card padding="18px 22px" style={{ marginBottom: 18, display: 'flex', alignItems: 'center', gap: 16 }}>
        <img src={MENTOR.avatar} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 800, fontFamily: "'Nunito', sans-serif" }}>{MENTOR.name}</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{MENTOR.role} · {MENTOR.yearsExperience} yr experience</div>
          <div style={{ fontSize: 11, color: '#888', marginTop: 6, display: 'flex', gap: 14, alignItems: 'center' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <Icon name="video" size={11} color="#888" /> {MENTOR_VIDEOS.length} videos
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <Icon name="calendar" size={11} color="#888" /> Office hours Thu 3:00 PM ET
            </span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
              <Icon name="clock" size={11} color="#888" /> Async feedback · 24 hr turnaround
            </span>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate('office-hours')}>
          <Icon name="calendar" size={12} color="#d60436" /> Office hours
        </Button>
      </Card>

      <div style={{ fontSize: 11, fontWeight: 800, color: '#888', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 10 }}>
        Recent uploads
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
        {MENTOR_VIDEOS.map(v => <MentorVideoTile key={v.id} v={v} onPlay={setPlaying} />)}
      </div>

      <MentorVideoModal video={playing} onClose={() => setPlaying(null)} />
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Office Hours
// ═══════════════════════════════════════════════════════════
const OFFICE_HOURS = [
  { id: 'oh-1', title: 'Cohort 04 · Open Office Hours', date: 'Thu, Mar 19, 2026', time: '3:00 PM – 4:00 PM ET', topic: 'Open Q&A · bring your stuck points', zoom: 'https://zoom.us/j/85274938102', meetingId: '852 7493 8102', recurring: 'Recurring · every Thursday' },
  { id: 'oh-2', title: 'Comp Selection Clinic', date: 'Tue, Mar 24, 2026', time: '1:00 PM – 2:00 PM ET', topic: 'Bring your top 5 PropMix candidates · we debate them live', zoom: 'https://zoom.us/j/85274938102', meetingId: '852 7493 8102', recurring: 'One-time · Step 4 deep dive' },
  { id: 'oh-3', title: 'Cohort 04 · Open Office Hours', date: 'Thu, Mar 26, 2026', time: '3:00 PM – 4:00 PM ET', topic: 'Open Q&A · bring your stuck points', zoom: 'https://zoom.us/j/85274938102', meetingId: '852 7493 8102', recurring: 'Recurring · every Thursday' },
  { id: 'oh-4', title: 'Reconciliation & Report Writing', date: 'Wed, Apr 1, 2026', time: '11:00 AM – 12:30 PM ET', topic: 'Walk through a finished URAR end-to-end · narrative tightening', zoom: 'https://zoom.us/j/85274938102', meetingId: '852 7493 8102', recurring: 'One-time · Steps 6–7' },
  { id: 'oh-5', title: 'Cohort 04 · Open Office Hours', date: 'Thu, Apr 2, 2026', time: '3:00 PM – 4:00 PM ET', topic: 'Open Q&A · bring your stuck points', zoom: 'https://zoom.us/j/85274938102', meetingId: '852 7493 8102', recurring: 'Recurring · every Thursday' },
];

function OfficeHoursWidget({ navigate }) {
  const next = OFFICE_HOURS.slice(0, 2);
  return (
    <Card padding={0} style={{ overflow: 'hidden' }}>
      <div style={{
        padding: '12px 18px', borderBottom: '1px solid #eee',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 6, flexShrink: 0,
          background: '#eaf3ff', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Icon name="calendar" size={14} color="#0a6ed1" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800, fontFamily: "'Nunito', sans-serif" }}>Upcoming Office Hours</div>
          <div style={{ fontSize: 10.5, color: '#888' }}>Scheduled Zoom sessions · hosted by James</div>
        </div>
      </div>
      <div style={{ padding: '10px 14px' }}>
        {next.map(oh => (
          <div key={oh.id} style={{
            padding: '10px 12px', borderRadius: 7, marginBottom: 8,
            background: '#fafbfc', border: '1px solid #eee',
            display: 'flex', gap: 10, alignItems: 'center',
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 7, flexShrink: 0,
              background: '#fff', border: '1px solid #e8e8e8',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Nunito', sans-serif",
            }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: '#d60436', textTransform: 'uppercase' }}>{oh.date.split(',')[0].slice(0, 3)}</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#292929', lineHeight: 1 }}>{oh.date.match(/\d+/)?.[0]}</div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: '#292929' }}>{oh.title}</div>
              <div style={{ fontSize: 11, color: '#666', marginTop: 1 }}>{oh.time}</div>
            </div>
            <a href={oh.zoom} target="_blank" rel="noreferrer" style={{
              background: '#0a6ed1', color: '#fff', textDecoration: 'none',
              padding: '6px 12px', borderRadius: 6, fontSize: 11.5, fontWeight: 700,
              display: 'flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap',
            }}>
              <Icon name="video" size={11} color="#fff" /> Join
            </a>
          </div>
        ))}
        <button onClick={() => navigate('office-hours')} style={{
          width: '100%', padding: '7px', background: 'none', border: 'none',
          cursor: 'pointer', color: '#d60436', fontSize: 11.5, fontWeight: 700,
          fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
        }}>
          View full schedule <Icon name="arrow-right" size={11} color="#d60436" />
        </button>
      </div>
    </Card>
  );
}

function S_OfficeHours({ navigate }) {
  return (
    <div>
      <PageHeader breadcrumb={['Cohort 04']} title="Office Hours · Cohort 04"
        subtitle="Scheduled Zoom sessions with James. All times Eastern. Sessions are hard-scheduled — they recur or are one-time deep-dives." />

      <Card padding="18px 22px" style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 18 }}>
        <img src={MENTOR.avatar} style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover' }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 800, fontFamily: "'Nunito', sans-serif" }}>{MENTOR.name}</div>
          <div style={{ fontSize: 12, color: '#666', marginTop: 2 }}>{MENTOR.role}</div>
        </div>
        <div style={{
          background: '#fff8ec', border: '1px solid #e8860a44', borderRadius: 7,
          padding: '8px 14px', fontSize: 11.5, color: '#7a4400', maxWidth: 340,
        }}>
          <strong>Heads up · asynchronous program.</strong> Office hours are scheduled live, but per-assignment feedback always comes through Mentor Reviews — not Zoom.
        </div>
      </Card>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {OFFICE_HOURS.map(oh => (
          <Card key={oh.id} padding={0}>
            <div style={{ display: 'flex', alignItems: 'stretch' }}>
              <div style={{
                width: 92, padding: '16px 0',
                background: oh.recurring.startsWith('Recurring') ? '#fafbfc' : '#fff5f7',
                borderRight: '1px solid #eee',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                fontFamily: "'Nunito', sans-serif",
              }}>
                <div style={{ fontSize: 10.5, fontWeight: 800, color: oh.recurring.startsWith('Recurring') ? '#666' : '#d60436', textTransform: 'uppercase', letterSpacing: '.06em' }}>{oh.date.split(',')[0].slice(0, 3)}</div>
                <div style={{ fontSize: 30, fontWeight: 800, color: '#292929', lineHeight: 1, marginTop: 2 }}>{oh.date.match(/\d+/)?.[0]}</div>
                <div style={{ fontSize: 10, color: '#888', marginTop: 2 }}>{oh.date.match(/[A-Za-z]+ \d+/)?.[0]?.split(' ')[0]}</div>
              </div>
              <div style={{ padding: '14px 20px', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 800, color: '#292929', fontFamily: "'Nunito', sans-serif" }}>{oh.title}</div>
                    <div style={{ fontSize: 12, color: '#666', marginTop: 3 }}>{oh.topic}</div>
                    <div style={{ display: 'flex', gap: 14, marginTop: 8, fontSize: 11, color: '#888', flexWrap: 'wrap' }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                        <Icon name="clock" size={11} color="#888" /> {oh.time}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: "'JetBrains Mono', monospace" }}>
                        <Icon name="hash" size={11} color="#888" /> {oh.meetingId}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                        <Icon name="repeat" size={11} color="#888" /> {oh.recurring}
                      </span>
                    </div>
                  </div>
                  <a href={oh.zoom} target="_blank" rel="noreferrer" style={{
                    background: '#0a6ed1', color: '#fff', textDecoration: 'none',
                    padding: '9px 16px', borderRadius: 7, fontSize: 12.5, fontWeight: 700,
                    display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
                  }}>
                    <Icon name="video" size={13} color="#fff" /> Join Zoom
                  </a>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card padding="14px 18px" style={{ marginTop: 16, background: '#fafbfc', display: 'flex', alignItems: 'center', gap: 12 }}>
        <Icon name="info" size={14} color="#666" />
        <div style={{ fontSize: 12, color: '#444' }}>
          Sessions are <strong>not recorded individually</strong> — but James publishes a topic recap video to <a href="#" onClick={(e) => { e.preventDefault(); navigate('mentors-corner'); }} style={{ color: '#d60436', fontWeight: 700, textDecoration: 'underline' }}>Mentor's Corner</a> after each one.
        </div>
      </Card>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// S00 Before You Start — preamble screen w/ acknowledge gate
// ═══════════════════════════════════════════════════════════
const ACK_KEY = 'parea_acknowledged_preamble_v1';
function S00_BeforeYouStart({ navigate }) {
  const [acks, setAcks] = useSA(() => {
    try { return JSON.parse(localStorage.getItem(ACK_KEY) || '{}'); } catch (e) { return {}; }
  });
  const points = [
    { id: 'ai-not-human',    title: 'AI does not think like a human.', body: 'AI tools pattern-match across training data. They do not <em>see</em> the house, talk to the owner, or weigh local context. They will be confidently wrong.' },
    { id: 'human-value',     title: 'Your human perspective is the irreplaceable part.', body: 'What an appraiser brings — and what tools cannot — is <em>judgment</em>: framing the problem, weighing conflicting evidence, forming and defending an opinion of value.' },
    { id: 'tools-are-tools', title: 'PropMix, True Footage, Apex, Matterport, AI suggestions — these are tools.', body: 'Tools assemble data. They do not appraise. <strong>No tool is USPAP-compliant by itself.</strong> Only your <em>use</em> of a tool — verified, documented, and reasoned — can be USPAP-compliant.' },
    { id: 'verify-credibility', title: 'You will be expected to verify everything.', body: 'For every output you accept from a tool, you should know: what is the source? Can I reproduce it? What would make this wrong? Throughout the program, "Verify this" callouts will walk you through it.' },
    { id: 'workfile-evidence', title: 'Document evidence as you go.', body: 'Capture screenshots and notes into your workfile every time you pull from a tool or research site. If a state board asks you to defend a number five years from now, your workfile is your answer.' },
  ];
  const allAcked = points.every(p => acks[p.id]);
  const toggle = (id) => {
    const next = { ...acks, [id]: !acks[id] };
    setAcks(next);
    try { localStorage.setItem(ACK_KEY, JSON.stringify(next)); } catch (e) {}
  };
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <div style={{
        textAlign: 'center', marginBottom: 24, padding: '24px 0 8px',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#1a1d2b', color: '#fff',
          padding: '6px 14px', borderRadius: 999,
          fontSize: 10.5, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase',
          marginBottom: 16,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#d60436' }} />
          Step 0 · Before you start
        </div>
        <h1 style={{
          fontFamily: "'Nunito', sans-serif", fontSize: 38, fontWeight: 800,
          color: '#292929', lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0,
        }}>
          Read this before the tools<br/>get their hands on you.
        </h1>
        <p style={{ fontSize: 15, color: '#666', marginTop: 14, lineHeight: 1.55, maxWidth: 640, margin: '14px auto 0' }}>
          You're about to spend months working with AI partners and production data tools. Before any of that, get clear on what they are — and what they aren't.
        </p>
      </div>

      <Card padding={0} style={{ overflow: 'hidden', marginBottom: 22 }}>
        <div style={{
          padding: '14px 22px', background: 'linear-gradient(135deg, #d60436, #ff5577)', color: '#fff',
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <Icon name="alert-triangle" size={18} color="#fff" />
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, fontFamily: "'Nunito', sans-serif" }}>The program's core premise</div>
            <div style={{ fontSize: 12, opacity: 0.92 }}>Read each point. Check the box only when you've actually thought about it.</div>
          </div>
        </div>
        <div style={{ padding: '14px 22px 22px' }}>
          {points.map((p, i) => {
            const isAcked = !!acks[p.id];
            return (
              <button key={p.id} onClick={() => toggle(p.id)} style={{
                width: '100%', display: 'flex', gap: 16, alignItems: 'flex-start',
                padding: '14px 4px',
                borderBottom: i < points.length - 1 ? '1px solid #f0f0f0' : 'none',
                background: 'none', border: 'none', cursor: 'pointer',
                fontFamily: 'inherit', textAlign: 'left',
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 6, flexShrink: 0,
                  background: isAcked ? '#1a9e5c' : '#fff',
                  border: `2px solid ${isAcked ? '#1a9e5c' : '#c8c8c8'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginTop: 2,
                  transition: 'all 150ms',
                }}>
                  {isAcked && <Icon name="check" size={14} color="#fff" strokeWidth={3} />}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15.5, fontWeight: 700, color: '#292929', fontFamily: "'Nunito', sans-serif", lineHeight: 1.3 }}>
                    {p.title}
                  </div>
                  <div style={{ fontSize: 13.5, color: '#555', marginTop: 5, lineHeight: 1.6 }}
                    dangerouslySetInnerHTML={{ __html: p.body }} />
                </div>
              </button>
            );
          })}
        </div>
      </Card>

      <div style={{
        background: '#1a1d2b', color: '#fff',
        borderRadius: 12, padding: '20px 24px',
        display: 'flex', alignItems: 'center', gap: 20,
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: '#cbd0e0', letterSpacing: '.06em', textTransform: 'uppercase', fontWeight: 700 }}>
            {allAcked ? 'You\'re ready.' : `${Object.values(acks).filter(Boolean).length}/${points.length} acknowledged`}
          </div>
          <div style={{ fontSize: 17, fontWeight: 800, marginTop: 4, fontFamily: "'Nunito', sans-serif" }}>
            {allAcked ? 'The tools work for you. Not the other way around.' : 'Acknowledge each point to continue.'}
          </div>
        </div>
        <Button variant="primary" size="lg" disabled={!allAcked} onClick={() => navigate('welcome')}>
          {allAcked ? 'Continue to Enrollment' : 'Acknowledge all to continue'} <Icon name="arrow-right" size={14} color="#fff" />
        </Button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Updated Workfile screen — uses the workfile store
// ═══════════════════════════════════════════════════════════
function S30b_Workfile({ navigate }) {
  const [report, setReport] = useSA('report-1');
  const items = useWorkfile(report);
  const REPORTS = [
    { id: 'report-1', label: 'Report 1', sub: 'Conventional Purchase · 4218 Ridgewood Ln', active: true },
    { id: 'report-2', label: 'Report 2', sub: 'FHA Refinance (not started)', active: false },
    { id: 'report-3', label: 'Report 3', sub: 'REO (not started)', active: false },
  ];
  return (
    <div>
      <PageHeader breadcrumb={['Cohort 04']} title="Workfile"
        subtitle="Your evidence trail. Every screenshot, note, and source you capture from PropMix, True Footage, Apex, Matterport, or AI tools lives here. USPAP retention: 5 years." />

      {/* Report selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
        {REPORTS.map(r => (
          <button key={r.id} onClick={() => r.active && setReport(r.id)} disabled={!r.active}
            style={{
              flex: 1, padding: '12px 16px',
              background: report === r.id ? '#fff' : '#f4f5f7',
              border: report === r.id ? '1.5px solid #d60436' : '1px solid #e8e8e8',
              borderRadius: 8,
              cursor: r.active ? 'pointer' : 'not-allowed',
              fontFamily: 'inherit', textAlign: 'left',
              opacity: r.active ? 1 : 0.55,
              transition: 'all 150ms',
            }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: report === r.id ? '#d60436' : '#292929', fontFamily: "'Nunito', sans-serif" }}>
              {r.label} {!r.active && <span style={{ fontSize: 10, color: '#888', fontWeight: 600 }}>· locked</span>}
            </div>
            <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{r.sub}</div>
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 18 }}>
        {/* Captured items */}
        <Card padding={0}>
          <div style={{
            padding: '14px 20px', borderBottom: '1px solid #eee',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <Icon name="folder-open" size={16} color="#d60436" />
            <div style={{ fontSize: 13, fontWeight: 700, flex: 1 }}>
              Captured items · {items.length}
            </div>
            <Badge color="success">USPAP-aligned</Badge>
          </div>
          <div style={{ padding: 12 }}>
            {items.length === 0 ? (
              <div style={{
                padding: 36, textAlign: 'center',
                background: '#fafbfc', borderRadius: 8, border: '1px dashed #e0e0e0',
              }}>
                <Icon name="folder" size={32} color="#bbb" />
                <div style={{ fontSize: 13.5, fontWeight: 700, marginTop: 10, color: '#292929' }}>No items yet</div>
                <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>
                  Use the floating "Capture to workfile" button while working with tools.
                </div>
              </div>
            ) : items.map(it => (
              <div key={it.id} style={{
                display: 'flex', gap: 12, padding: '11px 12px',
                borderBottom: '1px solid #f4f4f4', alignItems: 'center',
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 7, flexShrink: 0,
                  background: it.kind === 'screenshot' ? '#eaf3ff' : it.kind === 'note' ? '#fff8ec' : '#f4f5f7',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon name={it.kind === 'screenshot' ? 'image' : it.kind === 'note' ? 'sticky-note' : 'file'}
                    size={16} color={it.kind === 'screenshot' ? '#0a6ed1' : it.kind === 'note' ? '#e8860a' : '#666'} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#292929' }}>{it.label}</div>
                  <div style={{ fontSize: 11, color: '#888', marginTop: 2, fontFamily: "'JetBrains Mono', monospace" }}>
                    {it.source} · {it.kind} · {relTime(it.ts)}
                    {it.step && <> · <span style={{ color: '#d60436', fontWeight: 700 }}>Step {it.step.replace('p', '')}</span></>}
                  </div>
                </div>
                <button style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: '#888', padding: 4,
                }}>
                  <Icon name="external-link" size={13} color="#888" />
                </button>
              </div>
            ))}
          </div>
        </Card>

        {/* USPAP record-keeping note + checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card padding={18} style={{ background: '#1a1d2b', color: '#fff' }}>
            <div style={{ fontSize: 10.5, color: '#cbd0e0', letterSpacing: '.05em', textTransform: 'uppercase', fontWeight: 700 }}>
              USPAP Record Keeping Rule
            </div>
            <div style={{ fontSize: 16, fontWeight: 800, marginTop: 6, fontFamily: "'Nunito', sans-serif" }}>
              5 yrs from report date
            </div>
            <div style={{ fontSize: 11.5, color: '#cbd0e0', marginTop: 4, lineHeight: 1.5 }}>
              Or 2 years after litigation involving the assignment — whichever is longer. Workfile must include every artifact you used and every override you rejected.
            </div>
          </Card>

          <TextbookCallout topic="workfile" why="Foundational reference for workfile requirements." />

          <Card padding={0} style={{ background: '#fafbfc' }}>
            <div style={{ padding: '12px 16px', fontSize: 11, fontWeight: 800, color: '#888', letterSpacing: '.06em', textTransform: 'uppercase' }}>
              Self-check before submission
            </div>
            <div style={{ padding: '0 16px 16px', fontSize: 12, color: '#444', lineHeight: 1.6 }}>
              Open the static USPAP checklist below at Mentor Review 7 to walk through final compliance — you mark each item yourself.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// Export everything to window
// ═══════════════════════════════════════════════════════════
Object.assign(window, {
  STEPS,
  MCKISSOCK_TEXTBOOK, TextbookCallout, TextbookModal,
  VerifyThisCallout,
  WorkfileCaptureButton, WorkfileGate, WorkfileDashboardCard,
  useWorkfile, loadWorkfile, addToWorkfile,
  MentorRubric,
  STATIC_USPAP_CHECKLIST, StaticUSPAPChecklist,
  ManualChecklist, WorkfileCheck, CollapsibleSection,
  MENTOR_VIDEOS, MentorVideoTile, MentorVideoModal, S_MentorsCorner,
  OFFICE_HOURS, OfficeHoursWidget, S_OfficeHours,
  S00_BeforeYouStart,
  S30b_Workfile,
});
