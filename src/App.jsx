import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import logoSrc from './assets/logo.png';
import MLSTool from './tools/MLSTool';
import InspectionTool from './tools/InspectionTool';
import ReportTool from './tools/ReportTool';

const FULL_HEIGHT_ROUTES = ['inspection', 'urar-report'];
import {
  C, Icon, Button, Badge, Avatar, Card, CardSection, StepTracker, CheckItem,
  Textarea, Input, Toast, PageHeader, ToolCard,
  PHASES, AIChip, PhasePill, ChatBubble, MockToolFrame, USPAPScanner,
  StatTile, SUBJECT, COMPS, MENTOR, PERSONAS, COHORT_FEED,
  STEPS, TextbookCallout, TextbookModal, VerifyThisCallout,
  WorkfileCaptureButton, WorkfileGate, WorkfileDashboardCard, OfficeHoursWidget,
  MentorRubric, StaticUSPAPChecklist, S_MentorsCorner, S_OfficeHours,
  S00_BeforeYouStart, S30b_Workfile,
  S01_Enrollment, S02_TechSetup, S03_Dashboard, S04_Phase1Intro, S05_Ethics,
  S06_ToolOrientation, S07_Engagement, S08_PrelimResearch, S09_InspectionScheduling, S10_MentorReview1,
  S12_CaseDrop, S13_PropertyResearch, S14_VirtualInspection, S15_GLA, S16_Sketch,
  S17_MentorReview2, S18_Market, S19_HBU, S20_MentorReview3, S21_CompSelection, S22_MentorReview4,
  svgAvatar
} from './allTheThings';

// ── PAREA Sidebar navigation ──────────────────────────────────────
const PAREA_NAV = [
  { id: 'home', icon: 'layout-dashboard', label: 'Dashboard', route: 'home' },
  { id: 'step0', icon: 'sparkles', label: 'Before You Start', route: 'before-you-start' },
  { id: 'enroll', icon: 'user-plus', label: 'Enrollment', route: 'welcome' },
  {
    id: 'step1', icon: 'file-search', label: 'Step 1 · Problem ID', route: 'phase-1-intro',
    sub: [
      { route: 'ethics-lesson', label: 'a · Ethics' },
      { route: 'tool-orientation', label: 'b · Tool orientation' },
      { route: 'engagement-letter', label: 'c · Engagement letter' },
      { route: 'preliminary-research', label: 'd · Prelim research' },
      { route: 'inspection-scheduling', label: 'e · Inspect scheduling' },
      { route: 'mentor-review-1', label: 'Review 1' },
    ]
  },
  {
    id: 'step2', icon: 'home', label: 'Step 2 · Inspection', route: 'phase-2-launch',
    sub: [
      { route: 'property-research', label: 'a · Property research' },
      { route: 'virtual-inspection', label: 'b · Virtual inspection' },
      { route: 'gla-measurement', label: 'c · GLA measurement' },
      { route: 'sketch', label: 'd · Sketch' },
      { route: 'mentor-review-2', label: 'Review 2' },
    ]
  },
  {
    id: 'step3', icon: 'bar-chart-2', label: 'Step 3 · Market & HBU', route: 'market-analysis',
    sub: [
      { route: 'market-analysis', label: 'a · Market analysis' },
      { route: 'hbu', label: 'b · HBU 4-test' },
      { route: 'mentor-review-3', label: 'Review 3' },
    ]
  },
  {
    id: 'step4', icon: 'dollar-sign', label: 'Step 4 · Sales Analysis', route: 'comp-selection',
    sub: [
      { route: 'comp-selection', label: 'a · Comp selection' },
      { route: 'mentor-review-4', label: 'Review 4' },
    ]
  },
  {
    id: 'step5', icon: 'calculator', label: 'Step 5 · Valuation', route: 'adjustment-grid',
    sub: [
      { route: 'adjustment-grid', label: 'a · Adjustment grid' },
      { route: 'valuation', label: 'b · Value indication' },
      { route: 'mentor-review-5', label: 'Review 5' },
    ]
  },
  {
    id: 'step6', icon: 'git-merge', label: 'Step 6 · Reconciliation', route: 'reconciliation',
    sub: [
      { route: 'reconciliation', label: 'a · Reconciliation' },
      { route: 'mentor-review-6', label: 'Review 6' },
    ]
  },
  {
    id: 'step7', icon: 'file-text', label: 'Step 7 · Report', route: 'report-writing',
    sub: [
      { route: 'report-writing', label: 'a · Report writing' },
      { route: 'uspap-checklist', label: 'b · USPAP checklist' },
      { route: 'mentor-review-7', label: 'Review 7' },
    ]
  },
  {
    id: 'step8', icon: 'message-square', label: 'Step 8 · Communication', route: 'capstone',
    sub: [
      { route: 'capstone', label: 'a · Capstone' },
      { route: 'mentor-review-8', label: 'Review 8' },
    ]
  },
  { id: 'divider', divider: true },
  { id: 'mentors-corner', icon: 'video', label: "Mentor's Corner", route: 'mentors-corner' },
  { id: 'office-hours', icon: 'calendar-days', label: 'Office Hours', route: 'office-hours' },
  { id: 'workfile', icon: 'folder-open', label: 'Workfile', route: 'workfile' },
  { id: 'divider2', divider: true },
  { id: 'tools-label', sectionLabel: 'Tools' },
  { id: 'mls', icon: 'building-2', label: 'MLS Search', route: 'mls' },
  { id: 'inspection', icon: 'scan-eye', label: 'Inspect & Sketch', route: 'inspection' },
  { id: 'urar-report', icon: 'clipboard-list', label: 'URAR Report', route: 'urar-report' },
];

function PAREASidebar({ active, onNav, collapsed }) {
  const [expanded, setExpanded] = useState(() => {
    for (const item of PAREA_NAV) {
      if (item.sub && (item.route === active || item.sub.some(s => s.route === active))) {
        return item.id;
      }
    }
    return null;
  });

  const sidebarBg = '#1e2333';
  const sidebarText = '#b0b8cc';
  const brand = '#d60436';

  const isActive = (item) => {
    if (item.route === active) return true;
    if (item.sub) return item.sub.some(s => s.route === active);
    return false;
  };

  return (
    <aside style={{
      width: collapsed ? 60 : 232, background: sidebarBg,
      display: 'flex', flexDirection: 'column', flexShrink: 0,
      transition: 'width 250ms ease', overflow: 'hidden', minHeight: '100vh'
    }}>
      <nav style={{ flex: 1, padding: '10px 6px', display: 'flex', flexDirection: 'column', gap: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {PAREA_NAV.map((item) => {
          if (item.divider) {
            return <div key={item.id} style={{ height: 1, background: 'rgba(255,255,255,0.08)', margin: '8px 6px' }} />;
          }
          if (item.sectionLabel) {
            if (collapsed) return null;
            return <div key={item.id} style={{ padding: '6px 10px 2px', fontSize: 9, fontWeight: 700, color: 'rgba(176,184,204,0.45)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{item.sectionLabel}</div>;
          }
          const active_ = isActive(item);
          const isExpanded = expanded === item.id && !collapsed;
          return (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (item.sub && !collapsed) {
                    setExpanded(isExpanded ? null : item.id);
                  } else {
                    onNav(item.route);
                    if (item.sub && !collapsed) setExpanded(item.id);
                  }
                }}
                title={collapsed ? item.label : ''}
                style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: collapsed ? '9px 0' : '8px 10px',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  borderRadius: 7, border: 'none', cursor: 'pointer',
                  fontFamily: 'inherit', fontSize: 12.5, fontWeight: active_ ? 700 : 400,
                  background: active_ ? 'rgba(214,4,54,0.18)' : 'transparent',
                  color: active_ ? '#fff' : sidebarText,
                  transition: 'all 120ms ease', textAlign: 'left', width: '100%',
                  whiteSpace: 'nowrap',
                  borderLeft: active_ ? `3px solid ${brand}` : '3px solid transparent'
                }}
                onMouseEnter={e => { if (!active_) e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
                onMouseLeave={e => { if (!active_) e.currentTarget.style.background = 'transparent'; }}
              >
                <Icon name={item.icon} size={16} color={active_ ? '#fff' : sidebarText} />
                {!collapsed && <span style={{ flex: 1, fontSize: 12.5 }}>{item.label}</span>}
                {!collapsed && item.sub && (
                  <Icon name={isExpanded ? 'chevron-down' : 'chevron-right'} size={12} color={sidebarText} />
                )}
              </button>
              {!collapsed && isExpanded && item.sub && (
                <div style={{ paddingLeft: 14 }}>
                  {item.sub.map(sub => {
                    const subActive = active === sub.route;
                    return (
                      <button key={sub.route} onClick={() => onNav(sub.route)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          padding: '6px 10px', width: '100%',
                          background: subActive ? 'rgba(214,4,54,0.15)' : 'transparent',
                          border: 'none', borderLeft: subActive ? `2px solid ${brand}` : '2px solid transparent',
                          borderRadius: '0 5px 5px 0', cursor: 'pointer',
                          fontFamily: 'inherit', fontSize: 11.5,
                          color: subActive ? '#fff' : 'rgba(176,184,204,0.8)',
                          textAlign: 'left', whiteSpace: 'nowrap'
                        }}
                        onMouseEnter={e => { if (!subActive) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                        onMouseLeave={e => { if (!subActive) e.currentTarget.style.background = 'transparent'; }}
                      >
                        {sub.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>
      <div style={{ padding: '10px 6px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 9,
          padding: collapsed ? '9px 0' : '9px 10px',
          justifyContent: collapsed ? 'center' : 'flex-start',
          borderRadius: 7,
        }}>
          <Avatar name="Sarah H" size={28} />
          {!collapsed && (
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#fff' }}>Sarah H.</div>
              <div style={{ fontSize: 10, color: sidebarText }}>Appraiser Trainee</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

// ── Socratic AI Panel ─────────────────────────────────────────────
const AI_SCREENS = new Set(['engagement-letter','preliminary-research','inspection-scheduling','market-analysis','hbu','comp-selection','adjustment-grid','valuation','reconciliation','report-writing']);

function SocraticPanel({ open, onToggle, route }) {
  const [shaking, setShaking] = useState(false);
  const prevRoute = useRef(route);
  const [messages, setMessages] = useState([
    { from: 'ai', text: "Ready. Navigate to any assignment screen and I'll ask you a Socratic question to sharpen your thinking." }
  ]);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (prevRoute.current !== route && AI_SCREENS.has(route)) {
      setShaking(true);
      const t = setTimeout(() => setShaking(false), 800);
      prevRoute.current = route;
      return () => clearTimeout(t);
    }
    prevRoute.current = route;
  }, [route]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input;
    setMessages(m => [...m, { from: 'user', text: userMsg }]);
    setInput('');
    setTimeout(() => {
      setMessages(m => [...m, { from: 'ai', text: "That's a reasonable read. But push one level deeper — what market mechanism supports that conclusion? Cite a data point." }]);
    }, 800);
  };

  return (
    <>
      <button onClick={onToggle} title="Socratic AI"
        style={{
          position: 'fixed', right: open ? 320 : 0, top: '50%', transform: 'translateY(-50%)',
          background: '#1a1d2b', color: '#fff', border: 'none', cursor: 'pointer',
          padding: '14px 7px', borderRadius: '8px 0 0 8px',
          boxShadow: '-2px 0 12px rgba(0,0,0,0.18)',
          zIndex: 200, transition: 'right 250ms ease',
          animation: shaking ? 'shake 0.6s ease' : 'none',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6
        }}>
        <Icon name="sparkles" size={16} color="#d60436" />
        <span style={{ fontSize: 9, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', writingMode: 'vertical-rl', color: '#b0b8cc' }}>AI</span>
      </button>

      {open && (
        <div style={{
          position: 'fixed', right: 0, top: 0, bottom: 0, width: 320,
          background: '#1a1d2b', display: 'flex', flexDirection: 'column',
          zIndex: 150, boxShadow: '-4px 0 20px rgba(0,0,0,0.25)',
          animation: 'slideInRight 200ms ease both'
        }}>
          <div style={{ padding: '16px 18px', borderBottom: '1px solid #2a2d3b', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #d60436, #ff5577)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="sparkles" size={16} color="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 800, color: '#fff', fontFamily: "'Nunito', sans-serif" }}>Socratic AI</div>
              <div style={{ fontSize: 10, color: '#888' }}>Asks. Never tells.</div>
            </div>
            <button onClick={onToggle} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
              <Icon name="x" size={16} color="#888" />
            </button>
          </div>
          <div style={{ flex: 1, overflow: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, flexDirection: m.from === 'user' ? 'row-reverse' : 'row', alignItems: 'flex-start' }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                  background: m.from === 'ai' ? 'linear-gradient(135deg, #d60436, #ff5577)' : 'rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 800, color: '#fff'
                }}>{m.from === 'ai' ? 'AI' : 'S'}</div>
                <div style={{
                  maxWidth: '80%', padding: '9px 12px', borderRadius: 10,
                  borderTopLeftRadius: m.from === 'user' ? 10 : 3,
                  borderTopRightRadius: m.from === 'user' ? 3 : 10,
                  background: m.from === 'user' ? '#d60436' : 'rgba(255,255,255,0.07)',
                  color: '#fff', fontSize: 12.5, lineHeight: 1.5
                }}>{m.text}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: '12px 14px', borderTop: '1px solid #2a2d3b', display: 'flex', gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Respond…"
              style={{
                flex: 1, background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 7, padding: '9px 12px', color: '#fff', fontSize: 12.5,
                fontFamily: 'inherit', outline: 'none'
              }}
            />
            <button onClick={send} style={{ background: '#d60436', border: 'none', cursor: 'pointer', padding: '0 12px', borderRadius: 7, display: 'flex', alignItems: 'center' }}>
              <Icon name="send" size={13} color="#fff" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ── TopBar (overrides the one in allTheThings, using imported logo) ──
function AppTopBar({ onMenuToggle, collapsed }) {
  return (
    <header style={{
      height: 58, background: '#fff', borderBottom: '1px solid #e8e8e8',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px', flexShrink: 0, zIndex: 10
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={onMenuToggle} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: '#555', display: 'flex' }}>
          <Icon name={collapsed ? 'panel-left-open' : 'panel-left-close'} size={18} color="#555" />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src={logoSrc} alt="McKissock" style={{ height: 22, width: 'auto' }} />
          <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 15, color: '#292929' }}>McKissock</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', display: 'flex' }}>
          <Icon name="bell" size={18} color="#555" />
          <span style={{ position: 'absolute', top: -3, right: -3, width: 8, height: 8, background: '#d60436', borderRadius: '50%', border: '1.5px solid white' }} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <Avatar name="Sarah H" size={32} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#292929' }}>Sarah H.</div>
            <div style={{ fontSize: 11, color: '#888' }}>Appraiser Trainee</div>
          </div>
          <Icon name="chevron-down" size={14} color="#888" />
        </div>
      </div>
    </header>
  );
}

// ── Stub / new screens ────────────────────────────────────────────
function S_AdjustmentGrid({ navigate }) {
  const [cells, setCells] = useState({
    'c1-location': '', 'c1-gla': '+4,500', 'c1-bsmt': '', 'c1-garage': '',
    'c2-location': '', 'c2-gla': '-4,500', 'c2-bsmt': '-8,000', 'c2-garage': '',
    'c3-location': '+5,000', 'c3-gla': '+6,900', 'c3-bsmt': '', 'c3-garage': '+3,000',
  });
  const comps = COMPS.slice(0,3);
  const rows = [
    { key: 'location', label: 'Location', hint: 'Same sub-market? Adjust for boundary quality.' },
    { key: 'gla', label: 'GLA', hint: '$X/sf — derive from paired sales.' },
    { key: 'bsmt', label: 'Basement finish', hint: 'Below-grade — separate line item.' },
    { key: 'garage', label: 'Garage', hint: 'Attached vs detached, stalls.' },
  ];
  const net = (id) => rows.reduce((s, r) => s + (parseInt((cells[`${id}-${r.key}`] || '0').replace(/[,$+]/g,'')) || 0), 0);

  return (
    <div>
      <PageHeader breadcrumb={['Step 5', 'Section XIV']} title="Adjustment grid"
        subtitle="Every line item needs a defensible derivation — no rule-of-thumb adjustments." />
      <div style={{ marginBottom: 14 }}>
        <TextbookCallout topic="adjustments" why="Net ≤15% · Gross ≤25% of unadjusted sale — know this before you fill a single cell." />
      </div>
      <WorkfileCaptureButton step="p5" label="Adjustment grid · paired-sales derivation" source="PropMix + own analysis" />
      <Card padding={0} style={{ overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
          <thead>
            <tr style={{ background: '#1a1d2b', color: '#fff' }}>
              <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, width: 170 }}>Item</th>
              <th style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 700 }}>Subject</th>
              {comps.map(c => (
                <th key={c.id} style={{ padding: '10px 14px', textAlign: 'center', fontWeight: 700 }}>
                  <div>{c.id}</div>
                  <div style={{ fontSize: 10, opacity: 0.75 }}>${c.sale.toLocaleString()}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={row.key} style={{ borderBottom: '1px solid #f0f0f0', background: ri % 2 === 0 ? '#fff' : '#fafbfc' }}>
                <td style={{ padding: '8px 14px' }}>
                  <div style={{ fontWeight: 600, color: '#292929' }}>{row.label}</div>
                  <div style={{ fontSize: 10.5, color: '#888', marginTop: 2 }}>{row.hint}</div>
                </td>
                <td style={{ padding: '8px 14px', textAlign: 'center', fontSize: 11, color: '#888' }}>
                  {row.key === 'gla' ? '2,148 sf' : row.key === 'bsmt' ? 'Finished' : row.key === 'garage' ? '2-car att.' : 'Glenmoor Est.'}
                </td>
                {comps.map(c => {
                  const cellKey = `${c.id.toLowerCase()}-${row.key}`;
                  const val = cells[cellKey] || '';
                  const num = parseInt(val.replace(/[,$+]/g,'')) || 0;
                  const color = num > 0 ? '#1a9e5c' : num < 0 ? '#d60436' : '#888';
                  return (
                    <td key={c.id} style={{ padding: '6px 10px', textAlign: 'center' }}>
                      <input value={val} onChange={e => setCells(p => ({...p, [cellKey]: e.target.value}))} placeholder="+/−"
                        style={{ width: 90, padding: '6px 8px', textAlign: 'center', border: `1.5px solid ${val ? '#e8e8e8' : '#f0f0f0'}`, borderRadius: 5, fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color, background: val ? '#fff' : '#fafafa', outline: 'none' }} />
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr style={{ background: '#f4f5f7', fontWeight: 700 }}>
              <td style={{ padding: '10px 14px' }}>Adjusted sale price</td>
              <td style={{ padding: '10px 14px', textAlign: 'center' }}>—</td>
              {comps.map(c => {
                const adj = c.sale + net(c.id.toLowerCase());
                return <td key={c.id} style={{ padding: '10px 14px', textAlign: 'center', fontSize: 14, fontFamily: "'Nunito', sans-serif", color: '#1a9e5c' }}>${adj.toLocaleString()}</td>;
              })}
            </tr>
          </tbody>
        </table>
      </Card>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 14 }}>
        <Button variant="ghost" onClick={() => navigate('mentor-review-4')}>Back</Button>
        <Button variant="primary" onClick={() => navigate('valuation')}>Continue · Value indication <Icon name="arrow-right" size={13} color="#fff" /></Button>
      </div>
    </div>
  );
}

function S_Valuation({ navigate }) {
  const [opinion] = useState('488,000');
  return (
    <div>
      <PageHeader breadcrumb={['Step 5', 'Section XV']} title="Value indication — Sales Comparison"
        subtitle="You've built the grid. Form your value indication — a reasoned conclusion, not an average." />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16 }}>
        <Card padding={22}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>Adjusted sale prices</div>
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            {COMPS.slice(0,3).map((c,i) => (
              <div key={c.id} style={{ flex: 1, background: '#fafafa', border: '1px solid #e8e8e8', borderRadius: 8, padding: 12, textAlign: 'center' }}>
                <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: '.04em' }}>{c.id}</div>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#292929', fontFamily: "'Nunito', sans-serif", marginTop: 4 }}>
                  ${(c.sale + [4500,-12500,15900][i]).toLocaleString()}
                </div>
                <div style={{ fontSize: 10, color: '#888', marginTop: 2 }}>adj. from ${c.sale.toLocaleString()}</div>
              </div>
            ))}
          </div>
          <div style={{ background: '#1a1d2b', borderRadius: 8, padding: 16, color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}><AIChip label="Socratic" tone="brand" size="sm" /></div>
            <div style={{ fontSize: 12.5, lineHeight: 1.55, color: '#e8eaf0' }}>Three adjusted values around $482–483K. Which comp carries the most weight, and why?</div>
          </div>
        </Card>
        <Card padding={20}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Sales comparison indication</div>
          <input defaultValue={opinion} style={{ width: '100%', padding: '10px 12px', border: '1.5px solid #d60436', borderRadius: 8, fontSize: 18, fontWeight: 800, color: '#292929', fontFamily: "'Nunito', sans-serif", textAlign: 'center', background: '#fff0f3' }} />
          <div style={{ marginTop: 12, padding: '10px 12px', background: '#edfbf4', border: '1px solid #1a9e5c33', borderRadius: 6, fontSize: 11.5, color: '#1a9e5c', fontWeight: 600 }}>✓ Within market range $449K – $512K</div>
          <Button variant="primary" fullWidth onClick={() => navigate('mentor-review-5')} style={{ marginTop: 12 }}>Submit · Review 5 <Icon name="arrow-right" size={13} color="#fff" /></Button>
        </Card>
      </div>
    </div>
  );
}

function S_Reconciliation({ navigate }) {
  return (
    <div>
      <PageHeader breadcrumb={['Step 6']} title="Reconciliation" subtitle="Reconcile your value indicators. Weighting is a reasoned judgment — never a mathematical average." />
      <div style={{ marginBottom: 14 }}><TextbookCallout topic="reconciliation" why="Boards specifically test for averaging. Show that you reasoned." /></div>
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16 }}>
        <Card padding={22}>
          {[
            { label: 'Sales Comparison', value: '$488,000', weight: 'Primary', color: '#1a9e5c', note: 'Best market evidence for SFR purchase.' },
            { label: 'Cost Approach', value: '$492,000', weight: 'Supporting', color: '#0a6ed1', note: 'Upper-bound check.' },
            { label: 'Income Approach', value: 'N/A', weight: 'Not applicable', color: '#888', note: 'Subject not typically rented.' },
          ].map((a, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, padding: '12px 0', borderBottom: i < 2 ? '1px solid #f0f0f0' : 'none' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', flexShrink: 0, background: a.color + '15', border: `2px solid ${a.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: a.color, marginTop: 2 }}>{i+1}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{a.label}</div>
                  <span style={{ fontSize: 16, fontWeight: 800, color: a.color, fontFamily: "'Nunito', sans-serif" }}>{a.value}</span>
                </div>
                <div style={{ fontSize: 11, color: a.color, fontWeight: 600 }}>{a.weight}</div>
                <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>{a.note}</div>
              </div>
            </div>
          ))}
        </Card>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card padding={20} style={{ background: '#fff0f3', border: '1.5px solid #d60436' }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#d60436', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 8 }}>Final Opinion of Value</div>
            <input defaultValue="488,000" style={{ width: '100%', padding: '12px', border: '2px solid #d60436', borderRadius: 8, fontSize: 24, fontWeight: 800, color: '#292929', fontFamily: "'Nunito', sans-serif", textAlign: 'center', background: '#fff' }} />
          </Card>
          <Card padding={16}><Textarea rows={5} placeholder="Explain your reconciliation reasoning…" value="" onChange={() => {}} /></Card>
          <Button variant="primary" onClick={() => navigate('mentor-review-6')}>Submit · Review 6 <Icon name="arrow-right" size={13} color="#fff" /></Button>
        </div>
      </div>
    </div>
  );
}

function S_ReportWriting({ navigate }) {
  return (
    <div>
      <PageHeader breadcrumb={['Step 7']} title="Report writing — URAR"
        subtitle="Drafting the full URAR (Form 1004) in True Footage." />
      <WorkfileCaptureButton step="p7" label="URAR draft · True Footage" source="True Footage" />
      <MockToolFrame tool="True Footage" tab="URAR Form 1004" height={480}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[['Subject Address','4218 Ridgewood Lane, Glenmoor, OH 44023'],['Borrower','Redacted'],['Lender','First Summit Bank'],['Effective Date','March 14, 2026'],['Property Type','Single-Family Detached'],['Form','URAR (Fannie Mae 1004)'],['Opinion of Value','$488,000'],['Approaches Used','Sales Comparison + Cost'],].map(([k,v],i) => (
            <div key={i} style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 5, padding: '8px 10px' }}>
              <div style={{ fontSize: 9.5, color: '#888', fontWeight: 700, textTransform: 'uppercase' }}>{k}</div>
              <div style={{ fontSize: 12, color: '#292929', marginTop: 2, fontFamily: "'JetBrains Mono', monospace" }}>{v}</div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 10, padding: '10px 12px', background: '#edfbf4', border: '1px solid #1a9e5c33', borderRadius: 6, display: 'flex', gap: 10, alignItems: 'center' }}>
          <Icon name="check-circle" size={14} color="#1a9e5c" />
          <div style={{ fontSize: 12, color: '#1a9e5c', fontWeight: 600 }}>AI narrative review: no conclusory statements detected.</div>
        </div>
      </MockToolFrame>
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 14 }}>
        <Button variant="ghost" onClick={() => navigate('uspap-checklist')}>USPAP self-check</Button>
        <Button variant="primary" onClick={() => navigate('mentor-review-7')}>Submit · Review 7 <Icon name="arrow-right" size={13} color="#fff" /></Button>
      </div>
    </div>
  );
}

function S_USPAPChecklistScreen({ navigate }) {
  return (
    <div style={{ maxWidth: 840, margin: '0 auto' }}>
      <PageHeader breadcrumb={['Step 7', 'Pre-submission']} title="USPAP self-check"
        subtitle="Mark each item yourself. Thinking aid — not auto-graded." />
      <StaticUSPAPChecklist />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}>
        <Button variant="primary" onClick={() => navigate('report-writing')}>Back to report <Icon name="arrow-right" size={13} color="#fff" /></Button>
      </div>
    </div>
  );
}

function S_MentorReviewStub({ n, step, prevRoute, nextRoute, navigate }) {
  return (
    <div>
      <PageHeader breadcrumb={[`Step ${step}`, `Review ${n}`]} title={`Review ${n} — Pre-screen`}
        subtitle="AI pre-screen completed. Ready for mentor review." />
      <Card padding={20} style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: '#edfbf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="check-circle" size={24} color="#1a9e5c" />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700 }}>All items ready for mentor review</div>
            <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>James Mendel, MAI · async 48-hr turnaround</div>
          </div>
          <div style={{ flex: 1 }} />
          <Badge color="success">Pre-screen passed</Badge>
        </div>
        <div style={{ background: '#fffbf2', border: '1px solid #e8860a33', borderRadius: 8, padding: 14 }}>
          <div style={{ fontSize: 12.5, color: '#444', lineHeight: 1.55 }}>
            Step {step} work submitted. James will review within 48 hours.
          </div>
        </div>
      </Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
        {prevRoute && <Button variant="ghost" onClick={() => navigate(prevRoute)}>Revise</Button>}
        {nextRoute && <Button variant="primary" onClick={() => navigate(nextRoute)}>Continue to next step <Icon name="arrow-right" size={13} color="#fff" /></Button>}
      </div>
    </div>
  );
}

function S_Capstone({ navigate }) {
  return (
    <div style={{ maxWidth: 840, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', padding: '32px 0 20px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(90deg, #d60436, #ff5577)', color: '#fff', padding: '6px 16px', borderRadius: 999, fontSize: 11, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 16 }}>
          <Icon name="award" size={14} color="#fff" /> Program Complete
        </div>
        <h1 style={{ fontFamily: "'Nunito', sans-serif", fontSize: 36, fontWeight: 800, color: '#292929', margin: 0 }}>PAREA Practicum — Complete</h1>
        <p style={{ fontSize: 15, color: '#666', marginTop: 12, lineHeight: 1.55 }}>Three reports. Eight steps each. Eight mentor reviews each.</p>
      </div>
      <Card padding={28}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
          {[['Reports completed','3','file-text','#d60436'],['Mentor reviews cleared','24','check-circle','#1a9e5c'],['Total hours','150+','clock','#0a6ed1']].map(([l,v,ic,col],i) => (
            <div key={i} style={{ textAlign: 'center', padding: 16, background: '#fafafa', borderRadius: 10 }}>
              <Icon name={ic} size={28} color={col} />
              <div style={{ fontSize: 28, fontWeight: 800, color: '#292929', fontFamily: "'Nunito', sans-serif", marginTop: 8 }}>{v}</div>
              <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>
        <div style={{ background: '#f4f5f7', borderRadius: 10, padding: 18, marginBottom: 16, textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Nunito', sans-serif", fontSize: 22, fontWeight: 800, color: '#292929', marginTop: 10 }}>Certificate of Completion</h2>
          <p style={{ fontSize: 13, color: '#666', marginTop: 6 }}>Sarah H. — McKissock PAREA Licensed Residential Appraiser Practicum</p>
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <Button variant="primary" size="lg"><Icon name="download" size={15} color="#fff" /> Download certificate</Button>
          <Button variant="ghost" size="lg" onClick={() => navigate('home')}>Return to dashboard</Button>
        </div>
      </Card>
    </div>
  );
}

// ── Route → Screen ────────────────────────────────────────────────
function renderScreen(route, navigate, tweaks) {
  const p = { navigate, tweaks };
  switch (route) {
    case 'before-you-start': return <S00_BeforeYouStart {...p} />;
    case 'welcome': return <S01_Enrollment {...p} />;
    case 'tech-setup': return <S02_TechSetup {...p} />;
    case 'home': return <S03_Dashboard {...p} />;
    case 'phase-1-intro': return <S04_Phase1Intro {...p} />;
    case 'ethics-lesson': return <S05_Ethics {...p} />;
    case 'tool-orientation': return <S06_ToolOrientation {...p} />;
    case 'engagement-letter': return <S07_Engagement {...p} />;
    case 'preliminary-research': return <S08_PrelimResearch {...p} />;
    case 'inspection-scheduling': return <S09_InspectionScheduling {...p} />;
    case 'mentor-review-1': return <S10_MentorReview1 {...p} />;
    case 'phase-2-launch': return <S12_CaseDrop {...p} />;
    case 'property-research': return <S13_PropertyResearch {...p} />;
    case 'virtual-inspection': return <S14_VirtualInspection {...p} />;
    case 'gla-measurement': return <S15_GLA {...p} />;
    case 'sketch': return <S16_Sketch {...p} />;
    case 'mentor-review-2': return <S17_MentorReview2 {...p} />;
    case 'market-analysis': return <S18_Market {...p} />;
    case 'hbu': return <S19_HBU {...p} />;
    case 'mentor-review-3': return <S20_MentorReview3 {...p} />;
    case 'comp-selection': return <S21_CompSelection {...p} />;
    case 'mentor-review-4': return <S22_MentorReview4 {...p} />;
    case 'adjustment-grid': return <S_AdjustmentGrid {...p} />;
    case 'valuation': return <S_Valuation {...p} />;
    case 'mentor-review-5': return <S_MentorReviewStub n={5} step={5} prevRoute="valuation" nextRoute="reconciliation" {...p} />;
    case 'reconciliation': return <S_Reconciliation {...p} />;
    case 'mentor-review-6': return <S_MentorReviewStub n={6} step={6} prevRoute="reconciliation" nextRoute="report-writing" {...p} />;
    case 'report-writing': return <S_ReportWriting {...p} />;
    case 'uspap-checklist': return <S_USPAPChecklistScreen {...p} />;
    case 'mentor-review-7': return <S_MentorReviewStub n={7} step={7} prevRoute="report-writing" nextRoute="capstone" {...p} />;
    case 'mentor-review-8': return <S_MentorReviewStub n={8} step={8} prevRoute="capstone" nextRoute={null} {...p} />;
    case 'capstone': return <S_Capstone {...p} />;
    case 'mentors-corner': return <S_MentorsCorner {...p} />;
    case 'office-hours': return <S_OfficeHours {...p} />;
    case 'workfile': return <S30b_Workfile {...p} />;
    case 'mls': return <MLSTool />;
    case 'inspection': return <InspectionTool />;
    case 'urar-report': return <ReportTool />;
    default: return <S03_Dashboard {...p} />;
  }
}

// ── Root App ──────────────────────────────────────────────────────
export default function App() {
  const [route, setRoute] = useState(() => {
    try {
      const acked = JSON.parse(localStorage.getItem('parea_acknowledged_preamble_v1') || '{}');
      const pts = ['ai-not-human','human-value','tools-are-tools','verify-credibility','workfile-evidence'];
      return pts.every(k => acked[k]) ? 'home' : 'before-you-start';
    } catch { return 'before-you-start'; }
  });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [aiOpen, setAiOpen] = useState(false);
  const [textbookTopic, setTextbookTopic] = useState(null);
  const tweaks = { aiIntensity: 'normal', uspapStrict: 'normal', showCohortFeed: true };

  const navigate = r => setRoute(r);
  window.__openTextbook = setTextbookTopic;

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#f4f5f7', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <PAREASidebar active={route} onNav={navigate} collapsed={sidebarCollapsed} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', marginRight: aiOpen ? 320 : 0, transition: 'margin-right 250ms ease' }}>
        <AppTopBar onMenuToggle={() => setSidebarCollapsed(c => !c)} collapsed={sidebarCollapsed} />
        <div style={{ flex: 1, overflow: FULL_HEIGHT_ROUTES.includes(route) ? 'hidden' : 'auto', padding: FULL_HEIGHT_ROUTES.includes(route) ? 0 : '24px 28px 80px' }}>
          {renderScreen(route, navigate, tweaks)}
        </div>
      </div>
      <SocraticPanel open={aiOpen} onToggle={() => setAiOpen(o => !o)} route={route} />
      {textbookTopic && <TextbookModal topic={textbookTopic} onClose={() => setTextbookTopic(null)} />}
    </div>
  );
}
