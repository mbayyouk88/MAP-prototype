import React, { useState, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import logoSrc from './assets/logo.png';
import MLSTool from './tools/MLSTool';
import InspectionTool from './tools/InspectionTool';
import ReportTool from './tools/ReportTool';

const FULL_HEIGHT_ROUTES = ['inspection', 'urar-report', 'report-writing',
  'pr-m3', 'pr-m3-a', 'pr-m3-b',
  'pr-m5', 'pr-m5-a', 'pr-m6', 'pr-m6-a', 'pr-m7', 'pr-m7-a', 'pr-m8', 'pr-m8-a',
  'pr-m9', 'pr-m9-a'];
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
  svgAvatar, RubiMark
} from './allTheThings';

// ── PAREA Sidebar navigation ──────────────────────────────────────
const REPORT_1_ROUTES = new Set([
  'phase-1-intro','ethics-lesson','tool-orientation','engagement-letter','preliminary-research','inspection-scheduling','mentor-review-1',
  'phase-2-launch','property-research','virtual-inspection','gla-measurement','sketch','mentor-review-2',
  'market-analysis','hbu','mentor-review-3',
  'comp-selection','mentor-review-4',
  'adjustment-grid','valuation','mentor-review-5',
  'reconciliation','mentor-review-6',
  'report-writing','uspap-checklist','mentor-review-7',
  'capstone','mentor-review-8',
]);

const PAREA_NAV = [
  // ── Group 0 ──────────────────────────────────────────────────────
  { id: 'home',          icon: 'layout-dashboard', label: 'Dashboard',      route: 'home' },
  { id: 'mentors-corner',icon: 'video',            label: "Mentor's Corner", route: 'mentors-corner' },
  { id: 'office-hours',  icon: 'calendar-days',    label: 'Office Hours',   route: 'office-hours' },
  { id: 'workfile',      icon: 'folder-open',       label: 'Workfile',       route: 'workfile' },

  // ── Introduction ─────────────────────────────────────────────────
  { id: 'div-intro', divider: true },
  { id: 'sec-intro', sectionLabel: 'Introduction', sectionIcon: 'compass' },
  { id: 'welcome-intro', icon: 'smile',     label: 'Welcome',          route: 'welcome-intro' },
  { id: 'step0',       icon: 'sparkles',    label: 'Before You Start', route: 'before-you-start' },
  { id: 'enroll',      icon: 'user-plus',   label: 'Enrollment',       route: 'welcome' },
  { id: 'select-region',icon: 'map',        label: 'Select Region',    route: 'select-region' },
  { id: 'tech-setup',  icon: 'settings-2',  label: 'Tech Setup',       route: 'tech-setup' },

  // ── Practice ─────────────────────────────────────────────────────
  { id: 'div-practice', divider: true },
  { id: 'sec-practice', sectionLabel: 'Practice', sectionIcon: 'dumbbell' },
  { id: 'pr-m1', icon: 'target',         label: 'M1 · Problem ID',       route: 'pr-m1', sub: [{ route: 'pr-m1-a', label: 'a · Instructional' }, { route: 'pr-m1-b', label: 'b · Experiential' }] },
  { id: 'pr-m2', icon: 'layers',         label: 'M2 · Scope of Work',    route: 'pr-m2', sub: [{ route: 'pr-m2-a', label: 'a · Instructional' }, { route: 'pr-m2-b', label: 'b · Experiential' }] },
  { id: 'pr-m3', icon: 'database',       label: 'M3 · Data Collection',  highlight: true, route: 'pr-m3-a', sub: [{ route: 'pr-m3-a', label: 'a · Instructional · MLS' }, { route: 'pr-m3-b', label: 'b · McKissock Inspect' }, { route: 'pr-m3-c', label: 'c · Experiential' }] },
  { id: 'pr-m4', icon: 'building-2',     label: 'M4 · HBU',              route: 'pr-m4', sub: [{ route: 'pr-m4-a', label: 'a · Instructional' }, { route: 'pr-m4-b', label: 'b · Experiential' }] },
  { id: 'pr-m5', icon: 'bar-chart-2',    label: 'M5 · Sales Comparison', highlight: true, route: 'pr-m5', sub: [{ route: 'pr-m5-a', label: 'a · Instructional' }, { route: 'pr-m5-b', label: 'b · Experiential' }] },
  { id: 'pr-m6', icon: 'hammer',         label: 'M6 · Cost Approach',    route: 'pr-m6', sub: [{ route: 'pr-m6-a', label: 'a · Instructional' }, { route: 'pr-m6-b', label: 'b · Experiential' }] },
  { id: 'pr-m7', icon: 'trending-up',    label: 'M7 · Income Approach',  route: 'pr-m7', sub: [{ route: 'pr-m7-a', label: 'a · Instructional' }, { route: 'pr-m7-b', label: 'b · Experiential' }] },
  { id: 'pr-m8', icon: 'git-merge',      label: 'M8 · Reconciliation',   route: 'pr-m8', sub: [{ route: 'pr-m8-a', label: 'a · Instructional' }, { route: 'pr-m8-b', label: 'b · Experiential' }] },
  { id: 'pr-m9', icon: 'clipboard-check',label: 'M9 · Reporting',        route: 'pr-m9-a', sub: [{ route: 'pr-m9-a', label: 'a · McKissock UAD' }, { route: 'pr-m9-b', label: 'b · Experiential' }] },

  // ── Final ─────────────────────────────────────────────────────────
  { id: 'div-final', divider: true },
  { id: 'sec-final', sectionLabel: 'Final', sectionIcon: 'trophy' },
  {
    id: 'report-1', icon: 'file-text', label: 'Report 1 · Conv. Purchase', route: 'phase-1-intro',
    highlight: true, matchRoutes: REPORT_1_ROUTES,
    sub: [
      { route: 'phase-1-intro',  label: 'Step 1 · Problem ID' },
      { route: 'phase-2-launch', label: 'Step 2 · Inspection' },
      { route: 'market-analysis',label: 'Step 3 · Market & HBU' },
      { route: 'comp-selection', label: 'Step 4 · Comp Selection' },
      { route: 'adjustment-grid',label: 'Step 5 · Valuation' },
      { route: 'reconciliation', label: 'Step 6 · Reconciliation' },
      { route: 'report-writing', label: 'Step 7 · Report' },
      { route: 'capstone',       label: 'Step 8 · Communication' },
    ]
  },
  { id: 'report-2', icon: 'file-text', label: 'Report 2', route: 'report-2' },
  { id: 'report-3', icon: 'file-text', label: 'Report 3', route: 'report-3' },
  { id: 'program-complete', icon: 'award', label: 'Program Complete', route: 'program-complete' },

  // ── Tools ─────────────────────────────────────────────────────────
  { id: 'div-tools', divider: true },
  { id: 'tools-label', sectionLabel: 'Tools' },
  { id: 'mls',        icon: 'building-2',    label: 'McKissock MLS',     route: 'mls' },
  { id: 'inspection', icon: 'scan-eye',      label: 'McKissock Inspect', route: 'inspection' },
  { id: 'urar-report',icon: 'clipboard-list',label: 'McKissock UAD',     route: 'urar-report' },
];

// Collapsible section IDs
const COLLAPSIBLE_SECTS = new Set(['sec-intro', 'sec-practice', 'sec-final']);

// Map each nav item id → which section it belongs to (computed once)
const ITEM_SECTION = (() => {
  const map = {};
  let curr = null;
  for (const item of PAREA_NAV) {
    if (COLLAPSIBLE_SECTS.has(item.id)) {
      curr = item.id;
    } else if (item.sectionLabel && !COLLAPSIBLE_SECTS.has(item.id)) {
      curr = null; // Tools section — not collapsible
    } else if (!item.divider && curr) {
      map[item.id] = curr;
    }
  }
  return map;
})();

function PAREASidebar({ active, onNav, collapsed }) {
  const bg = '#fff', text = '#444', textMuted = '#888', brand = '#d60436', activeBg = '#fff0f3';

  // Determine which section contains the active route
  const getActiveSect = (r) => {
    for (const item of PAREA_NAV) {
      const sect = ITEM_SECTION[item.id];
      if (!sect) continue;
      if (item.route === r || item.matchRoutes?.has(r) || item.sub?.some(s => s.route === r)) return sect;
    }
    if (REPORT_1_ROUTES.has(r)) return 'sec-final';
    return null;
  };

  // Sections start collapsed; auto-expand the one containing the active route
  const [sectionsOpen, setSectionsOpen] = useState(() => {
    const s = getActiveSect(active);
    return s ? new Set([s]) : new Set();
  });

  useEffect(() => {
    const s = getActiveSect(active);
    if (s) setSectionsOpen(prev => new Set([...prev, s]));
  }, [active]);

  const toggleSection = (sectId) => {
    setSectionsOpen(prev => {
      const next = new Set(prev);
      if (next.has(sectId)) next.delete(sectId); else next.add(sectId);
      return next;
    });
  };

  const [expanded, setExpanded] = useState(() => {
    for (const item of PAREA_NAV) {
      if (!item.sub && !item.matchRoutes) continue;
      if (item.route === active) return item.id;
      if (item.sub?.some(s => s.route === active)) return item.id;
      if (item.matchRoutes?.has(active)) return item.id;
    }
    return null;
  });

  const isActive = (item) => {
    if (item.route === active) return true;
    if (item.matchRoutes?.has(active)) return true;
    if (item.sub) return item.sub.some(s => s.route === active);
    return false;
  };

  return (
    <aside style={{
      width: collapsed ? 56 : 236, background: bg,
      display: 'flex', flexDirection: 'column', flexShrink: 0,
      borderRight: '1px solid #e8e8e8',
      transition: 'width 200ms ease', overflow: 'hidden', minHeight: '100vh',
    }}>
      <nav style={{ flex: 1, padding: '8px 6px', display: 'flex', flexDirection: 'column', gap: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        {PAREA_NAV.map((item) => {
          if (item.divider) {
            return <div key={item.id} style={{ height: 1, background: '#e8e8e8', margin: '6px 4px' }} />;
          }
          if (item.sectionLabel) {
            if (collapsed) return null;
            const isCollapsible = COLLAPSIBLE_SECTS.has(item.id);
            if (!isCollapsible) {
              return (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '10px 10px 3px', marginTop: 2 }}>
                  {item.sectionIcon && <Icon name={item.sectionIcon} size={11} color={textMuted} />}
                  <div style={{ fontSize: 9.5, fontWeight: 800, color: textMuted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{item.sectionLabel}</div>
                </div>
              );
            }
            const isOpen = sectionsOpen.has(item.id);
            return (
              <button key={item.id} onClick={() => toggleSection(item.id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5, padding: '10px 10px 3px', marginTop: 2,
                  background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left',
                  fontFamily: 'inherit', borderRadius: 5,
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#f4f5f7'}
                onMouseLeave={e => e.currentTarget.style.background = 'none'}
              >
                {item.sectionIcon && <Icon name={item.sectionIcon} size={11} color={textMuted} />}
                <div style={{ fontSize: 9.5, fontWeight: 800, color: textMuted, textTransform: 'uppercase', letterSpacing: '0.1em', flex: 1 }}>{item.sectionLabel}</div>
                <Icon name={isOpen ? 'chevron-down' : 'chevron-right'} size={10} color={textMuted} />
              </button>
            );
          }

          // Hide items whose section is collapsed
          const sect = ITEM_SECTION[item.id];
          if (sect && !sectionsOpen.has(sect)) return null;

          const active_ = isActive(item);
          const isExpanded = expanded === item.id && !collapsed;
          const isHighlight = item.highlight && !active_;

          return (
            <div key={item.id}>
              <button
                onClick={() => {
                  if (item.sub && !collapsed) {
                    setExpanded(isExpanded ? null : item.id);
                    if (!isExpanded) onNav(item.route);
                  } else {
                    onNav(item.route);
                  }
                }}
                title={collapsed ? item.label : ''}
                style={{
                  display: 'flex', alignItems: 'center', gap: 9,
                  padding: collapsed ? '9px 0' : '7px 10px',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  borderRadius: 7, border: 'none', cursor: 'pointer',
                  fontFamily: 'inherit', fontSize: 12.5,
                  fontWeight: active_ ? 700 : isHighlight ? 700 : 400,
                  background: active_ ? activeBg : 'transparent',
                  color: active_ ? brand : text,
                  transition: 'background 120ms, color 120ms', textAlign: 'left', width: '100%',
                  whiteSpace: 'nowrap',
                  borderLeft: active_ ? `3px solid ${brand}` : '3px solid transparent',
                }}
                onMouseEnter={e => { if (!active_) e.currentTarget.style.background = '#f4f5f7'; }}
                onMouseLeave={e => { if (!active_) e.currentTarget.style.background = 'transparent'; }}
              >
                <Icon name={item.icon} size={15} color={active_ ? brand : textMuted} />
                {!collapsed && <span style={{ flex: 1, fontSize: 12.5 }}>{item.label}</span>}
                {!collapsed && item.sub && (
                  <Icon name={isExpanded ? 'chevron-down' : 'chevron-right'} size={11} color={textMuted} />
                )}
              </button>
              {!collapsed && isExpanded && item.sub && (
                <div style={{ paddingLeft: 12, marginBottom: 2 }}>
                  {item.sub.map(sub => {
                    const subActive = active === sub.route;
                    return (
                      <button key={sub.route} onClick={() => onNav(sub.route)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 8, padding: '5px 10px',
                          width: '100%', background: subActive ? activeBg : 'transparent',
                          border: 'none', borderLeft: subActive ? `2px solid ${brand}` : '2px solid transparent',
                          borderRadius: '0 5px 5px 0', cursor: 'pointer',
                          fontFamily: 'inherit', fontSize: 11.5,
                          color: subActive ? brand : '#666',
                          textAlign: 'left', whiteSpace: 'nowrap', fontWeight: subActive ? 600 : 400,
                        }}
                        onMouseEnter={e => { if (!subActive) e.currentTarget.style.background = '#f4f5f7'; }}
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
      <div style={{ padding: '10px 6px', borderTop: '1px solid #e8e8e8' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 9,
          padding: collapsed ? '9px 0' : '9px 10px',
          justifyContent: collapsed ? 'center' : 'flex-start',
          borderRadius: 7,
        }}>
          <Avatar name="Sarah H" size={28} />
          {!collapsed && (
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#292929' }}>Sarah H.</div>
              <div style={{ fontSize: 10, color: textMuted }}>Cohort 04 · Day 87</div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}

// ── Rubi Panel ─────────────────────────────────────────────
const AI_SCREENS = new Set(['engagement-letter','preliminary-research','inspection-scheduling','market-analysis','hbu','comp-selection','adjustment-grid','valuation','reconciliation','report-writing']);

const SOCRATIC_PROMPTS = {
  'before-you-start': { headline: "Before tools touch your work", body: "AI doesn't think like a human. Your <em>perspective</em>, your <em>opinion</em>, and how you <em>validate</em> them — that's what an appraiser is paid for. Acknowledge each premise; then we'll begin.", chips: ['Why this matters'] },
  'mentors-corner':   { headline: "Async means async", body: "James drops videos on his cadence, not yours. Skim the new uploads, but don't expect a video to answer a question that only your mentor review can.", chips: ['Browse new uploads'] },
  'office-hours':     { headline: "Office hours are scheduled — not on-demand", body: "Live sessions are for thinking out loud together. Per-assignment feedback still comes through Mentor Reviews — don't conflate the two.", chips: ['Add to my calendar'] },
  'home':             { headline: "Pick up where you left off", body: "You're in <strong>Step 4 · Comp Selection</strong> — the highest-judgment screen in the program. Open it when you have 45 focused minutes. Before you do: which neighborhood factor weighs most in this market?", chips: ['Resume Comp Selection', 'Why this matters'] },
  'welcome':          { headline: "Why are you here?", body: "Most folks come to PAREA because they can't find a supervisor. Be honest with yourself: do you want a license, or do you want the trade? Your answer changes how hard the next 8 weeks feel.", chips: ['I want the trade', 'I need the license'] },
  'tech-setup':       { headline: "Tools are a means", body: "McKissock MLS, McKissock Report, McKissock Inspect — these don't make you an appraiser. Your <em>judgment</em> does. Each tool will try to give you an answer. Your job is to push back.", chips: ['Got it'] },
  'select-region':    { headline: "Work where you'll actually work", body: "Pick the region you intend to appraise in — your listings, comps, and market data are drawn from it. Not sure yet? The <strong>Central Texas</strong> default is fine; you can change it anytime.", chips: ['Use the default'] },
  'phase-1-intro':    { headline: "Problem identification is everything", body: "Most bad reports trace back to a fuzzy problem statement. Before you click into the lessons: what is an appraisal <em>for</em>?", chips: ['Mortgage decision', 'Risk transfer', 'Both'] },
  'ethics-lesson':    { headline: "Ethics isn't a quiz", body: "USPAP Conduct is the only thing standing between you and a board complaint. The scenarios get harder. Don't memorize — think.", chips: ['Start scenario'] },
  'tool-orientation': { headline: "Don't trust the tool", body: "McKissock MLS will hand you 47 comps and rank them. Before you accept its top pick, ask: <strong>does this rank reflect <em>my</em> market or its training data?</strong>", chips: ['Show me an example'] },
  'engagement-letter':    { headline: "Six scope elements", body: "USPAP requires intended use, user, effective date, type/definition of value, relevant characteristics, and assignment conditions. Miss one and your report has no legal footing.", chips: ['Check my draft', 'Why each one?'] },
  'preliminary-research': { headline: "What's your preliminary read?", body: "Based on your desk research, is this market <strong>declining, stable, or increasing</strong>? Back it up with one data point.", chips: ['Increasing — DOM ↓', 'Stable — STL ~100%', 'Declining'] },
  'inspection-scheduling':{ headline: "Plan for what you can't see", body: "Tenant occupancy. Locked outbuildings. Aggressive dog. What's your contingency if you can't access the basement?", chips: ['Note it', 'Reschedule'] },
  'mentor-review-1':  { headline: "What will James push on?", body: "He sees 1 flag from the pre-screen. Predict the question before he asks it.", chips: ['USPAP edition', 'Scope tightness'] },
  'phase-2-launch':   { headline: "The case is real", body: "4218 Ridgewood Ln is a 2010 contemporary. Lender wants market value for purchase. The seller's agent will be on-site. What do you bring?", chips: ['Open the case file'] },
  'property-research':    { headline: "Three sources, one answer", body: "Public record GLA, MLS GLA, and what you measure rarely agree. Which one rules — and why?", chips: ['What I measure', 'It depends'] },
  'virtual-inspection':   { headline: "Defend your trend call", body: "You noted the neighborhood trend as <em>stable</em>. What MLS data point supports that? If you don't have one yet, we'll get it in Market Analysis — flag it.", chips: ['DOM data', 'STL ratio', 'Flag for later'] },
  'gla-measurement':  { headline: "ANSI Z765 is the standard", body: "Measure to the exterior. Bay windows count if floor-to-ceiling and ≥ 7'. Open to below doesn't count. Make a habit.", chips: ['Cheatsheet'] },
  'sketch':           { headline: "The sketch is a legal document", body: "If it disagrees with your narrative, the narrative loses. Re-check perimeter before you save.", chips: ['Recheck', 'Save'] },
  'mentor-review-2':  { headline: "Defend your GLA", body: "Predict the question: 'You measured 2,184 — assessor says 2,210. Which one goes in the report?'", chips: ['Mine', 'Note both'] },
  'market-analysis':  { headline: "Trend ≠ vibe", body: "DOM, sale-to-list, inventory months. Pick the two that tell the cleanest story for this market.", chips: ['DOM + STL', 'Inventory + STL'] },
  'hbu':              { headline: "All four tests", body: "Legally permissible · physically possible · financially feasible · maximally productive. Skip one and HBU is wrong by definition.", chips: ['Walk me through'] },
  'mentor-review-3':  { headline: "HBU is where junior appraisers slip", body: "Most argue maximally productive without showing financial feasibility. Don't.", chips: ['Show me an example'] },
  'comp-selection':   { headline: "Defend C3 over C4", body: "You picked <strong>C1, C2, C3</strong>. C4 has a higher AI score (87) than C3 (78). Walk me through why C3 made the cut over C4.", chips: ['Age + bed/bath match', 'Distance', 'Counter the AI'] },
  'mentor-review-4':  { headline: "Comp selection = the whole report", body: "If your three comps are wrong, nothing downstream matters. James will spend most of his 20 min here.", chips: ['Run pre-check'] },
  'adjustment-grid':  { headline: "Net & gross adjustment limits", body: "Net ≤ 15%, gross ≤ 25%. If you bust either, your comp is too dissimilar — or your adjustment is wrong.", chips: ['Show my totals'] },
  'cost-approach':    { headline: "Marshall & Swift, not your gut", body: "Cost approach is its own discipline. Use the published cost data; show your depreciation math.", chips: ['Pull data'] },
  'income-approach':  { headline: "It's OK to skip — if you defend it", body: "1-unit residential, owner-occupied market, no rental comps. State why <em>this</em> property doesn't need it.", chips: ['Write the rationale'] },
  'mentor-review-5':  { headline: "Three approaches, one value", body: "Predict: 'Why did you weight Sales Comparison 100%?'", chips: ['Market evidence', 'Lender expectation'] },
  'reconciliation':   { headline: "Reconciliation is judgment", body: "Don't average. Defend a single number with the most credible approach.", chips: ['Walk through'] },
  'mentor-review-6':  { headline: "The number you submit", body: "James will ask 'why $612,500 and not $610,000?' Have an answer that isn't 'it felt right'.", chips: ['Prep answer'] },
  'report-writing':   { headline: "URAR is form, not formality", body: "Every blank is meaningful. Skip nothing. The narrative tells the story the form can't.", chips: ['Start draft'] },
  'workfile':         { headline: "5-year workfile retention", body: "Everything you used, every override you rejected, every conversation with this AI. State Board can ask for it.", chips: ['Assemble'] },
  'mentor-review-7':  { headline: "Final read-through", body: "Read your report aloud. If you stumble, the reader will too.", chips: ['Done reading'] },
  'capstone':         { headline: "Client pushback isn't personal", body: "The lender's questions feel adversarial — they're not. Answer with USPAP and data, not defense.", chips: ['Run the sim'] },
  'mentor-review-8':  { headline: "One report down", body: "Report 1 of 8. The next one is faster. The 8th feels routine. That's the compression curve working.", chips: ['Mark complete'] },
};

function SocraticPanel({ collapsed, onToggle, route, shake }) {
  const accent = '#d60436';
  const p = SOCRATIC_PROMPTS[route] || SOCRATIC_PROMPTS['home'];
  const [input, setInput] = useState('');

  if (collapsed) {
    return (
      <aside className={shake ? 'socratic-attention' : ''} onClick={onToggle}
        title="Open Rubi"
        style={{
          width: 44, flexShrink: 0, cursor: 'pointer',
          background: 'linear-gradient(180deg, #1a1d2b, #2a1d3a)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          borderLeft: '1px solid #2a2d3b',
        }}>
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
          padding: '14px 6px', borderRadius: 10,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.09)',
        }}>
          <div style={{ filter: `drop-shadow(0 0 8px ${accent}88)` }}>
            <RubiMark size={28} variant="brand" />
          </div>
          <div style={{
            writingMode: 'vertical-rl', transform: 'rotate(180deg)',
            fontSize: 9, fontWeight: 800, color: '#ff8da3',
            letterSpacing: '.12em', textTransform: 'uppercase',
          }}>Rubi</div>
          <span style={{
            width: 7, height: 7, borderRadius: '50%',
            background: accent, boxShadow: `0 0 8px ${accent}`,
            animation: 'pulse 1.6s ease-in-out infinite',
          }} />
        </div>
      </aside>
    );
  }

  return (
    <aside style={{
      width: 300, flexShrink: 0,
      background: 'linear-gradient(180deg, #1a1d2b 0%, #2a1d3a 100%)',
      color: '#fff', display: 'flex', flexDirection: 'column',
      borderLeft: '1px solid #2a2d3b',
    }}>
      <div style={{ padding: '14px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flexShrink: 0, filter: `drop-shadow(0 0 6px ${accent}66)` }}>
          <RubiMark size={30} variant="brand" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12.5, fontWeight: 800, fontFamily: "'Nunito', sans-serif", letterSpacing: '-0.005em' }}>Rubi</div>
          <div style={{ fontSize: 10, color: '#cbd0e0', letterSpacing: '.04em' }}>Your AI mentor partner</div>
        </div>
        <button onClick={onToggle} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', cursor: 'pointer', color: '#cbd0e0', padding: 5, borderRadius: 5, display: 'flex' }} title="Collapse">
          <Icon name="chevron-right" size={13} color="#cbd0e0" />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 10px' }}>
        <div style={{ background: `linear-gradient(135deg, ${accent}22, transparent 65%)`, border: `1px solid ${accent}44`, borderRadius: 10, padding: '12px 14px', marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: accent, animation: 'pulse 1.6s ease-in-out infinite' }} />
            <span style={{ fontSize: 9.5, fontWeight: 800, color: '#ff8da3', letterSpacing: '.1em', textTransform: 'uppercase' }}>Question for you</span>
          </div>
          <div style={{ fontSize: 13.5, fontWeight: 700, color: '#fff', lineHeight: 1.35, marginBottom: 8, fontFamily: "'Nunito', sans-serif" }} dangerouslySetInnerHTML={{ __html: p.headline }} />
          <div style={{ fontSize: 12, color: '#cbd0e0', lineHeight: 1.55 }} dangerouslySetInnerHTML={{ __html: p.body }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
          {(p.chips || []).map((c, i) => (
            <button key={i} style={{
              background: i === 0 ? 'rgba(214,4,54,0.16)' : 'rgba(255,255,255,0.04)',
              border: i === 0 ? `1px solid ${accent}88` : '1px solid rgba(255,255,255,0.1)',
              borderRadius: 7, padding: '9px 11px', textAlign: 'left',
              color: i === 0 ? '#fff' : '#cbd0e0', fontFamily: 'inherit', fontSize: 11.5,
              cursor: 'pointer', fontWeight: i === 0 ? 600 : 500,
            }}>{c}</button>
          ))}
        </div>

        <div style={{ fontSize: 10, fontWeight: 800, color: '#888', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 8 }}>Recent thinking</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[['You defended HBU against AI pushback','2h ago'],['Comp #4 challenged: 0.6mi too far','4h ago'],['Engagement letter approved','Yesterday']].map(([txt, ts], i) => (
            <div key={i} style={{ display: 'flex', gap: 8, padding: '8px 10px', background: 'rgba(255,255,255,0.03)', borderRadius: 6, fontSize: 11, color: '#cbd0e0', lineHeight: 1.4 }}>
              <Icon name="git-commit-horizontal" size={12} color="#888" />
              <div style={{ flex: 1 }}>
                <div>{txt}</div>
                <div style={{ fontSize: 10, color: '#777', marginTop: 1 }}>{ts}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '10px 12px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: 8, alignItems: 'center' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask anything…"
          style={{ flex: 1, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', padding: '8px 10px', borderRadius: 6, fontFamily: 'inherit', fontSize: 12, outline: 'none' }}
        />
        <button style={{ background: accent, border: 'none', cursor: 'pointer', color: '#fff', width: 32, height: 32, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="arrow-up" size={14} color="#fff" />
        </button>
      </div>
    </aside>
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

// ── Welcome / Motivational screen ────────────────────────────────
function S_WelcomeIntro({ navigate }) {
  return (
    <div style={{ maxWidth: 780, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', padding: '36px 0 28px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'linear-gradient(90deg, #d60436, #ff5577)', color: '#fff', padding: '6px 18px', borderRadius: 999, fontSize: 11, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 20 }}>
          <Icon name="sparkles" size={13} color="#fff" /> McKissock PAREA
        </div>
        <h1 style={{ fontFamily: "'Nunito', sans-serif", fontSize: 38, fontWeight: 800, color: '#292929', margin: '0 0 14px', lineHeight: 1.15 }}>
          You made it here for a reason.
        </h1>
        <p style={{ fontSize: 16, color: '#555', lineHeight: 1.65, maxWidth: 580, margin: '0 auto 28px' }}>
          Most aspiring appraisers never find a supervisor. You found something better — a structured path that builds the same judgment, the same discipline, and the same professional standing.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 28 }}>
        {[
          { icon: 'file-text', color: '#d60436', bg: '#fff0f3', title: '3 Real Reports', body: 'Complete three full URAR appraisals from problem ID through final delivery — each one graded by a certified mentor.' },
          { icon: 'user-check', color: '#1a9e5c', bg: '#edfbf4', title: '24 Mentor Reviews', body: 'James Mendel, MAI will review every critical decision point. Async turnaround in 48 hours.' },
          { icon: null, color: '#0a6ed1', bg: '#eef5ff', title: 'Rubi — Your AI Partner', body: 'Rubi asks the questions your mentor will ask — before they ask them. She builds your thinking, not your answers.' },
        ].map(({ icon, color, bg, title, body }) => (
          <div key={title} style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 12, padding: 20 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
              {icon ? <Icon name={icon} size={20} color={color} /> : <RubiMark size={28} variant="dark" />}
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#292929', marginBottom: 6, fontFamily: "'Nunito', sans-serif" }}>{title}</div>
            <div style={{ fontSize: 12.5, color: '#666', lineHeight: 1.55 }}>{body}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'linear-gradient(120deg, #1a1d2b 0%, #2a1d3a 100%)', borderRadius: 14, padding: '24px 28px', color: '#fff', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
          <div style={{ width: 44, height: 44, borderRadius: 10, background: 'linear-gradient(135deg, #d60436, #ff5577)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name="message-circle" size={20} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 10, fontWeight: 800, color: '#ff8da3', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 6 }}>A note before you begin</div>
            <p style={{ fontSize: 14, color: '#e8eaf0', lineHeight: 1.65, margin: 0 }}>
              PAREA is not self-study. It's a practicum. The AI won't do your thinking — it will challenge yours. Every decision you make in this program has to be one you can defend to a state board. That standard is the point.
            </p>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 12 }}>
        <Button variant="primary" size="lg" onClick={() => navigate('before-you-start')}>
          Begin the program <Icon name="arrow-right" size={15} color="#fff" />
        </Button>
        <Button variant="ghost" size="lg" onClick={() => navigate('home')}>
          Go to Dashboard
        </Button>
      </div>
    </div>
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
      <WorkfileCaptureButton step="p5" label="Adjustment grid · paired-sales derivation" source="McKissock MLS + own analysis" />
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
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}><AIChip label="Rubi" tone="brand" size="sm" /></div>
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
        subtitle="Drafting the full URAR (Form 1004) in McKissock Report." />
      <WorkfileCaptureButton step="p7" label="URAR draft · McKissock Report" source="McKissock Report" />
      <MockToolFrame tool="McKissock Report" tab="URAR Form 1004" height={480}>
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

function S_ClientCommunication({ navigate }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages(m => [...m, { from: 'user', text: input }]);
    setInput('');
  };

  return (
    <div>
      <PageHeader breadcrumb={['Step 8']} title="Communication — Delivering the Report"
        subtitle="The loan officer has received your completed appraisal. She has questions. Answer with USPAP and data — not defensiveness." />

      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 16 }}>
        {/* Chat pane */}
        <Card padding={0}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src={PERSONAS.maya.avatar} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 700 }}>{PERSONAS.maya.name}</div>
              <div style={{ fontSize: 11, color: '#888' }}>{PERSONAS.maya.role}</div>
            </div>
            <AIChip label="AI Persona" tone="brand" size="sm" />
          </div>
          <div style={{ padding: 16, height: 440, overflow: 'auto', background: '#fafbfc' }}>
            <ChatBubble from="persona" name={PERSONAS.maya.name} role="Loan Officer" time="2:04 PM" avatar={PERSONAS.maya.avatar}>
              Got the report — thank you. Quick question: the value came in at <strong>$488,000</strong> but the contract is at <strong>$505,000</strong>. My underwriter is going to ask questions. Can you walk me through why?
            </ChatBubble>
            <ChatBubble from="ai" name="Rubi" time="2:05 PM">
              Before you respond — this is the moment that tests your independence. Maya's tone is professional, not adversarial, but the pressure is real. What's your obligation here under USPAP Ethics?
            </ChatBubble>
            <ChatBubble from="persona" name={PERSONAS.maya.name} role="Loan Officer" time="2:07 PM" avatar={PERSONAS.maya.avatar}>
              Also — my borrower's agent says there was a similar unit in the building that sold for $510K last month. Shouldn't that be a comp?
            </ChatBubble>
            <ChatBubble from="ai" name="Rubi" time="2:08 PM">
              Good challenge. You need to address this specifically — either explain why you considered and rejected it, or acknowledge the error and issue an addendum. Which is it?
            </ChatBubble>
            {messages.map((m, i) => (
              <ChatBubble key={i} from={m.from === 'user' ? 'user' : 'ai'} name={m.from === 'user' ? 'You' : 'Rubi'} time="Now">
                {m.text}
              </ChatBubble>
            ))}
            <div style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 11, color: '#888' }}>Maya is reviewing…</span>
              <span style={{ display: 'inline-flex', gap: 3 }}>
                {[0,1,2].map(i => <span key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#888', animation: `pulse 1s ease-in-out ${i * 0.15}s infinite` }} />)}
              </span>
            </div>
          </div>
          <div style={{ padding: 14, borderTop: '1px solid #f0f0f0', display: 'flex', gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Type your response to Maya…"
              style={{ flex: 1, padding: '10px 12px', border: '1px solid #e8e8e8', borderRadius: 8, fontSize: 13.5, fontFamily: 'inherit', background: '#fafafa', outline: 'none' }}
            />
            <Button variant="primary" size="sm" onClick={handleSend}><Icon name="send" size={13} color="#fff" /></Button>
          </div>
        </Card>

        {/* Guidance pane */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card padding={20}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>What you're defending</div>
            {[
              { label: 'Final opinion of value', value: '$488,000', color: '#d60436' },
              { label: 'Primary approach', value: 'Sales Comparison', color: '#1a9e5c' },
              { label: 'Comps used', value: 'C1, C2, C3 — all same sub-market', color: '#0a6ed1' },
            ].map(({ label, value, color }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
                <span style={{ fontSize: 12, color: '#888' }}>{label}</span>
                <span style={{ fontSize: 12.5, fontWeight: 700, color }}>{value}</span>
              </div>
            ))}
          </Card>

          <Card padding="16px 18px" style={{ background: '#1a1d2b', color: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ width: 26, height: 26, borderRadius: 6, background: 'linear-gradient(135deg, #d60436, #ff5577)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="sparkles" size={13} color="#fff" />
              </div>
              <span style={{ fontSize: 12.5, fontWeight: 700 }}>Rubi's coaching</span>
            </div>
            <p style={{ fontSize: 12, color: '#cbd0e0', lineHeight: 1.6, margin: 0 }}>
              Client pushback on value is not personal. Your job is to explain the market, not defend the number. Lead with the comp data. If the contract-sale spread surprises you, it should surprise them too — for the right reasons.
            </p>
          </Card>

          <Card padding={16}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 10 }}>USPAP obligations in this conversation</div>
            {[
              { ok: true,  label: 'No direction in value (Ethics Rule)' },
              { ok: true,  label: 'Report stands as issued unless error found' },
              { ok: false, label: 'Addendum required if new material fact emerges' },
            ].map((r, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', background: r.ok ? '#edfbf4' : '#fff8ec', borderRadius: 5, marginBottom: 4, fontSize: 12 }}>
                <Icon name={r.ok ? 'check-circle' : 'alert-circle'} size={13} color={r.ok ? '#1a9e5c' : '#e8860a'} />
                <span style={{ color: r.ok ? '#1a9e5c' : '#e8860a', fontWeight: 600 }}>{r.label}</span>
              </div>
            ))}
          </Card>

          <Button variant="primary" onClick={() => navigate('mentor-review-8')}>
            Submit · Mentor Review 8 <Icon name="arrow-right" size={14} color="#fff" />
          </Button>
        </div>
      </div>
    </div>
  );
}

function S_ProgramComplete({ navigate }) {
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

// ── Select Region ────────────────────────────────────────────────
const REGION_KEY = 'parea_region_v1';
const REGION_DEFAULT = 'central-texas';
const REGIONS = [
  { id: 'pacific-nw',    name: 'Pacific Northwest',     blurb: 'Seattle · Portland · Boise · Anchorage',       states: ['WA','OR','ID','AK'] },
  { id: 'california',    name: 'California & Nevada',   blurb: 'Los Angeles · Bay Area · Las Vegas · Honolulu', states: ['CA','NV','HI'] },
  { id: 'mountain-west', name: 'Mountain West',         blurb: 'Denver · Salt Lake City · Billings',           states: ['MT','WY','UT','CO'] },
  { id: 'southwest',     name: 'Southwest',             blurb: 'Phoenix · Tucson · Albuquerque',               states: ['AZ','NM'] },
  { id: 'central-texas', name: 'Central Texas',         blurb: 'Austin · San Antonio · Waco corridor',         states: ['TX'] },
  { id: 'great-plains',  name: 'Great Plains',          blurb: 'Omaha · Wichita · Oklahoma City',              states: ['ND','SD','NE','KS','OK'] },
  { id: 'great-lakes',   name: 'Great Lakes & Midwest', blurb: 'Chicago · Detroit · Minneapolis · Columbus',   states: ['MN','WI','IA','MO','IL','IN','MI','OH'] },
  { id: 'southeast',     name: 'Southeast',             blurb: 'Atlanta · Nashville · Miami · Charlotte',      states: ['AR','LA','MS','AL','TN','KY','GA','SC','NC','FL'] },
  { id: 'mid-atlantic',  name: 'Mid-Atlantic',          blurb: 'Philadelphia · Pittsburgh · DC metro',         states: ['VA','WV','MD','DE','PA','NJ'] },
  { id: 'northeast',     name: 'Northeast',             blurb: 'New York City · Boston · Hartford',            states: ['NY','CT','RI','MA','VT','NH','ME'] },
];
const REGION_OF = Object.fromEntries(REGIONS.flatMap(r => r.states.map(s => [s, r.id])));
const STATE_GRID = {
  AK:[0,0],                                                                                                           ME:[10,0],
                                                                                                  VT:[9,1],           NH:[10,1],
  WA:[0,2], ID:[1,2], MT:[2,2], ND:[3,2], MN:[4,2], IL:[5,2], WI:[6,2],             MI:[8,2],   NY:[9,2],           RI:[10,2],
  OR:[0,3], NV:[1,3], WY:[2,3], SD:[3,3], IA:[4,3], IN:[5,3], OH:[6,3], PA:[7,3],   NJ:[8,3],   CT:[9,3],           MA:[10,3],
  CA:[0,4], UT:[1,4], CO:[2,4], NE:[3,4], MO:[4,4], KY:[5,4], WV:[6,4], VA:[7,4],   MD:[8,4],   DE:[9,4],
            AZ:[1,5], NM:[2,5], KS:[3,5], AR:[4,5], TN:[5,5], NC:[6,5], SC:[7,5],
  HI:[0,6],                     OK:[3,6], LA:[4,6], MS:[5,6], AL:[6,6], GA:[7,6],
                                TX:[3,7],                               FL:[8,7],
};

function USRegionMap({ selected, onPick }) {
  const GREEN = '#1f9d57', GREEN_D = '#178347';
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(11, 1fr)', gridTemplateRows: 'repeat(8, 1fr)', gap: 4, width: '100%', aspectRatio: '11 / 8' }}>
      {Object.entries(STATE_GRID).map(([abbr, [col, row]]) => {
        const reg = REGION_OF[abbr];
        const isSel = reg === selected;
        return (
          <button key={abbr} onClick={() => reg && onPick(reg)} title={REGIONS.find(r => r.id === reg)?.name}
            style={{
              gridColumn: col + 1, gridRow: row + 1,
              background: isSel ? GREEN : '#eceef1', color: isSel ? '#fff' : '#9aa1ab',
              border: isSel ? `1px solid ${GREEN_D}` : '1px solid transparent',
              borderRadius: 5, cursor: 'pointer', padding: 0,
              fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'background 120ms, color 120ms',
            }}>{abbr}</button>
        );
      })}
    </div>
  );
}

function S_SelectRegion({ navigate }) {
  const [region, setRegion] = useState(() => { try { return localStorage.getItem(REGION_KEY) || REGION_DEFAULT; } catch { return REGION_DEFAULT; } });
  const pick = (id) => { try { localStorage.setItem(REGION_KEY, id); } catch {} setRegion(id); };
  const current = REGIONS.find(r => r.id === region) || REGIONS.find(r => r.id === REGION_DEFAULT);
  return (
    <div style={{ maxWidth: 980, margin: '0 auto' }}>
      <PageHeader breadcrumb={['Enrollment']} title="Select your region"
        subtitle="Selecting your region helps us show you listings and comps that are relevant to where you actually work. Pick the area you intend to practice in — if you're unsure, leave it on the Central Texas default and change it later." />
      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 20, alignItems: 'start' }}>
        <Card padding={22}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ fontSize: 12.5, fontWeight: 800, color: '#292929', fontFamily: "'Nunito', sans-serif" }}>United States · market regions</div>
            <div style={{ display: 'flex', gap: 14, fontSize: 10.5, color: '#888' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><span style={{ width: 11, height: 11, borderRadius: 3, background: '#1f9d57' }} /> Your region</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}><span style={{ width: 11, height: 11, borderRadius: 3, background: '#eceef1' }} /> Other</span>
            </div>
          </div>
          <USRegionMap selected={region} onPick={pick} />
          <div style={{ marginTop: 16, padding: '12px 14px', borderRadius: 9, background: '#eafaf0', border: '1px solid #bce9cf', display: 'flex', alignItems: 'center', gap: 11 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: '#1f9d57', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name="map-pin" size={15} color="#fff" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 13, fontWeight: 800, color: '#13703d', fontFamily: "'Nunito', sans-serif" }}>{current.name}</div>
              <div style={{ fontSize: 11, color: '#3f8a60' }}>{current.blurb}</div>
            </div>
            <Badge color="success">Saved</Badge>
          </div>
        </Card>
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: '#888', letterSpacing: '.07em', textTransform: 'uppercase', marginBottom: 10 }}>Choose a region</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
            {REGIONS.map(r => {
              const on = r.id === region;
              return (
                <button key={r.id} onClick={() => pick(r.id)} style={{
                  display: 'flex', alignItems: 'center', gap: 12, width: '100%', textAlign: 'left',
                  padding: '11px 13px', borderRadius: 9, cursor: 'pointer', fontFamily: 'inherit',
                  background: on ? '#eafaf0' : '#fff',
                  border: on ? '1.5px solid #1f9d57' : '1px solid #e8e8e8',
                  transition: 'border-color 120ms, background 120ms',
                }}>
                  <div style={{ width: 22, height: 22, borderRadius: '50%', flexShrink: 0, border: on ? '6px solid #1f9d57' : '2px solid #ccd2da', transition: 'border 120ms' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: on ? '#13703d' : '#292929' }}>
                      {r.name}{r.id === REGION_DEFAULT && <span style={{ fontSize: 10, fontWeight: 700, color: '#999', marginLeft: 7 }}>· default</span>}
                    </div>
                    <div style={{ fontSize: 11, color: '#888', marginTop: 1 }}>{r.blurb}</div>
                  </div>
                  {on && <Icon name="check-circle-2" size={17} color="#1f9d57" />}
                </button>
              );
            })}
          </div>
          <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="primary" size="lg" onClick={() => navigate('tech-setup')}>
              Continue to Tech Setup <Icon name="arrow-right" size={14} color="#fff" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Practice Modules ─────────────────────────────────────────────
const PRACTICE_PROPERTIES = 'Evanston Single-Family · Pilsen Two-Flat · Streeterville Condo · Gold Coast Co-op';

const PRACTICE_MODULES = [
  { id: 1, route: 'pr-m1', icon: 'target',
    title: 'Identification of the Problem',
    instructional: 'Introduces the 6 assignment elements (client, intended use/users, type & def of value, effective date, property rights, conditions). A branching scenario presents a realistic engagement letter where trainees extract each element; a decision tree walks through how atypical ownership (like the co-op) changes problem identification; a knowledge check tests element recognition across all 4 properties.',
    experiential: 'Contact a Loan Officer or AMC coordinator — request a sample engagement letter or walk through one together. Extract and document all 6 assignment elements.',
    tools: [] },
  { id: 2, route: 'pr-m2', icon: 'layers',
    title: 'Determination of Scope of Work',
    instructional: 'Covers the SCOPE framework (what to research, inspect, and analyze). A scenario presents each of the 4 properties with varying complexity triggers (co-op ownership, vintage Pilsen two-flat); a decision tree guides trainees through expanding or limiting scope based on those triggers; a knowledge check asks them to justify scope decisions for each property type.',
    experiential: 'Interview a Real Estate Agent — ask about a specific listed or sold property. Identify what factors would expand or limit scope.',
    tools: [] },
  { id: 3, route: 'pr-m3', icon: 'database',
    title: 'Collection and Analysis of Data',
    instructional: 'McKissock MLS — trainees search for comparable listings and sales, filter by property type, and analyze market trends for each of the 4 properties. McKissock Inspect — trainees conduct a virtual walkthrough for each property, record condition/quality ratings, and produce a floor plan sketch.',
    experiential: 'Physically visit a property and complete a structured field worksheet (condition, quality, measurements). Pull the same property\'s public record from the County Assessor website and compare findings.',
    tools: ['mls', 'inspection'], inline: true,
    toolActivities: {
      mls: 'Search for comparable listings and sales for each of the 4 properties. Filter by property type, price range, and proximity. Save 3+ comp candidates per property and note days on market, list-to-sale ratios, and neighborhood trends.',
      inspection: 'Conduct a virtual walkthrough via McKissock Inspect. Record condition ratings (C1–C6) and quality ratings (Q1–Q6) for each property. Produce a floor plan sketch and calculate GLA using the ANSI Z765 standard.',
    } },
  { id: 4, route: 'pr-m4', icon: 'building-2',
    title: 'Determination of Highest and Best Use',
    instructional: 'Covers the 4 HBU tests (legally permissible, physically possible, financially feasible, maximally productive). A scenario applies each test to all 4 properties, highlighting how zoning and ownership type constrain HBU differently; a decision tree handles properties where current use may not be HBU (e.g., underimproved Pilsen lot); a knowledge check asks trainees to state and support the HBU conclusion for each property.',
    experiential: 'Look up a real property\'s zoning via the local municipality website. If accessible, call the Permits or Zoning Department to ask one question about permitted use.',
    tools: [] },
  { id: 5, route: 'pr-m5', icon: 'bar-chart-2',
    title: 'Application of the Approaches to Value: Sales Comparison',
    instructional: 'McKissock Report (UAD 3.6) — trainees select and enter comparable sales pulled from McKissock MLS, make and support adjustments for each property type, and see how the form dynamically adjusts fields based on property characteristics (e.g., co-op vs. condo grid differences).',
    experiential: 'Interview a Real Estate Agent — discuss recent comp sales and what buyers pay more or less for. Map responses directly to adjustment line items.',
    tools: ['urar-report'], inline: true,
    toolActivities: { 'urar-report': 'Select and enter comparable sales from McKissock MLS. Make and support adjustments for each of the 4 property types. Note how the form adjusts fields for co-op vs. condo grid differences.' } },
  { id: 6, route: 'pr-m6', icon: 'hammer',
    title: 'Application of the Approaches to Value: Cost Approach',
    instructional: 'McKissock Report (UAD 3.6) — trainees estimate replacement cost new, apply depreciation methods, and complete the cost approach section. The form adjusts based on property type (cost approach is less applicable to the co-op, so trainees encounter a real-world applicability decision).',
    experiential: 'Contact a local contractor or builder — ask about current cost per square foot and common depreciation factors in their area. Use responses to ground-truth cost inputs.',
    tools: ['urar-report'], inline: true,
    toolActivities: { 'urar-report': 'Estimate replacement cost new, apply depreciation methods, and complete the cost approach section. Note where the form signals that cost approach is less applicable — and write the rationale.' } },
  { id: 7, route: 'pr-m7', icon: 'trending-up',
    title: 'Application of the Approaches to Value: Income Approach',
    instructional: 'McKissock Report (UAD 3.6) — trainees complete GRM analysis using market rent data, apply vacancy and expense factors, and reconcile an income-based value indicator. The form activates income fields primarily for the Pilsen Two-Flat and co-op, reinforcing when this approach is relevant.',
    experiential: 'Interview a landlord, property manager, or tenant — ask about current rents, vacancy, and expenses. Use real responses to validate GRM and income inputs.',
    tools: ['urar-report'], inline: true,
    toolActivities: { 'urar-report': 'Complete GRM analysis using market rent data, apply vacancy and expense factors, and reconcile an income-based value indicator. Note when income fields activate (Pilsen Two-Flat and co-op) vs. when they don\'t.' } },
  { id: 8, route: 'pr-m8', icon: 'git-merge',
    title: 'Reconciliation',
    instructional: 'McKissock Report (UAD 3.6) — trainees review all three approach indicators within the form, weigh their reliability for each property type, and write a supported reconciliation narrative. The form requires a final value opinion with written justification before it can be submitted.',
    experiential: 'Conversation with a PAREA mentor or local appraiser — discuss how they weigh approaches and handle conflicting indicators. Document key takeaways and compare to your own reconciliation decisions.',
    tools: ['urar-report'], inline: true,
    toolActivities: { 'urar-report': 'Review all three approach indicators, weigh their reliability for each property type, and write a supported reconciliation narrative. The form requires a final value opinion with written justification before submission.' } },
  { id: 9, route: 'pr-m9', icon: 'clipboard-check',
    title: 'Reporting of the Appraisal',
    instructional: 'McKissock Report (UAD 3.6) — trainees finalize the complete UAD 3.6 report for each property, review USPAP compliance checkpoints built into the form, and submit for mentor review. The dynamic form surfaces any incomplete or inconsistent fields before final submission.',
    experiential: 'Contact an AMC coordinator or lender reviewer — ask what causes report kickbacks and what a "clean" report looks like from their side. Reflect on how those standards show up in your completed McKissock Report output.',
    tools: ['urar-report'], inline: true,
    toolActivities: {
      'urar-report': 'Finalize the complete UAD 3.6 report for each of the 4 properties. Review all USPAP compliance checkpoints. Correct any flagged fields before submitting for mentor review.',
    } },
];

const TOOL_LABELS = { mls: 'McKissock MLS', inspection: 'McKissock Inspect', 'urar-report': 'McKissock UAD' };

function PracticeModuleScreen({ module, route, navigate }) {
  const isExp = route?.endsWith('-b');
  const modIdx = PRACTICE_MODULES.findIndex(m => m.id === module.id);
  const prev = modIdx > 0 ? PRACTICE_MODULES[modIdx - 1] : null;
  const next = modIdx < PRACTICE_MODULES.length - 1 ? PRACTICE_MODULES[modIdx + 1] : null;

  const tabBtn = (active, label, icon, onClick) => (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 7, padding: '7px 14px',
      borderRadius: 7, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
      fontSize: 12.5, fontWeight: active ? 700 : 400,
      background: active ? '#fff' : 'transparent',
      color: active ? '#292929' : '#888',
      boxShadow: active ? '0 1px 4px rgba(0,0,0,0.10)' : 'none',
      transition: 'all 140ms',
    }}>
      <Icon name={icon} size={13} color={active ? '#d60436' : '#aaa'} />
      {label}
    </button>
  );

  const navBtn = (label, onClick) => (
    <button onClick={onClick} style={{
      display: 'flex', alignItems: 'center', gap: 5, padding: '5px 12px',
      borderRadius: 6, border: '1px solid #e8e8e8', background: '#fff',
      color: '#555', fontFamily: 'inherit', fontSize: 12, cursor: 'pointer',
    }}>{label}</button>
  );

  return (
    <div style={{ maxWidth: 840, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Badge>Module {module.id} of 9</Badge>
          <Badge color="warning">In development</Badge>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          {prev && navBtn(<><Icon name="chevron-left" size={12} color="#555" /> M{prev.id}</>, () => navigate(prev.route))}
          {next && navBtn(<>M{next.id} <Icon name="chevron-right" size={12} color="#555" /></>, () => navigate(next.route))}
        </div>
      </div>

      <h1 style={{ fontFamily: "'Nunito', sans-serif", fontSize: 24, fontWeight: 800, color: '#292929', margin: '8px 0 4px' }}>{module.title}</h1>
      <p style={{ fontSize: 12.5, color: '#888', marginBottom: 16, lineHeight: 1.5 }}>4 properties: {PRACTICE_PROPERTIES}</p>

      <div style={{ display: 'flex', gap: 3, background: '#f0f1f3', borderRadius: 9, padding: 4, marginBottom: 18, width: 'fit-content' }}>
        {tabBtn(!isExp, 'Instructional', 'monitor', () => navigate(module.route + '-a'))}
        {tabBtn(isExp,  'Experiential',  'map-pin',  () => navigate(module.route + '-b'))}
      </div>

      {!isExp ? (
        <Card padding={22}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: 'linear-gradient(135deg, #d60436, #ff5577)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name="monitor" size={17} color="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10.5, fontWeight: 800, color: '#888', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 8 }}>What you'll do</div>
              <p style={{ fontSize: 13.5, color: '#444', lineHeight: 1.7, margin: '0 0 14px' }}>{module.instructional}</p>
              {module.tools.length > 0 && (
                <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: 12 }}>
                  <div style={{ fontSize: 10.5, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 8 }}>Tools used in this module</div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {module.tools.map(t => (
                      <button key={t} onClick={() => navigate(t)}
                        style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 13px', borderRadius: 7, border: '1.5px solid #d60436', background: '#fff0f3', color: '#d60436', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
                        <Icon name="external-link" size={12} color="#d60436" />
                        {TOOL_LABELS[t]}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>
      ) : (
        <Card padding={22}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
            <div style={{ width: 36, height: 36, borderRadius: 9, background: 'linear-gradient(135deg, #1a9e5c, #2fd88a)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon name="map-pin" size={17} color="#fff" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 10.5, fontWeight: 800, color: '#888', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 8 }}>Your assignment</div>
              <p style={{ fontSize: 13.5, color: '#444', lineHeight: 1.7, margin: 0 }}>{module.experiential}</p>
            </div>
          </div>
        </Card>
      )}

      <div style={{ marginTop: 14, background: '#fff8ec', border: '1px solid #f5cfa0', borderRadius: 10, padding: '11px 16px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <Icon name="hammer" size={14} color="#e8860a" />
        <div style={{ fontSize: 12.5, color: '#7a4a00' }}>Interactive lessons are still being built. Check back soon.</div>
      </div>
    </div>
  );
}

function PracticeExperientialCard({ module, navigate }) {
  const modIdx = PRACTICE_MODULES.findIndex(m => m.id === module.id);
  const prev = modIdx > 0 ? PRACTICE_MODULES[modIdx - 1] : null;
  const next = modIdx < PRACTICE_MODULES.length - 1 ? PRACTICE_MODULES[modIdx + 1] : null;
  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Badge>Module {module.id} of 9</Badge>
          <span style={{ fontSize: 13, color: '#888' }}>Experiential</span>
        </div>
        <div style={{ display: 'flex', gap: 5 }}>
          {prev && <button onClick={() => navigate(prev.route + '-c')} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 6, border: '1px solid #e8e8e8', background: '#fff', color: '#555', fontFamily: 'inherit', fontSize: 11.5, cursor: 'pointer' }}><Icon name="chevron-left" size={12} color="#555" />M{prev.id}</button>}
          {next && <button onClick={() => navigate(next.route + (next.tools?.length ? '-c' : '-b'))} style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 10px', borderRadius: 6, border: '1px solid #e8e8e8', background: '#fff', color: '#555', fontFamily: 'inherit', fontSize: 11.5, cursor: 'pointer' }}>M{next.id}<Icon name="chevron-right" size={12} color="#555" /></button>}
        </div>
      </div>
      <h1 style={{ fontFamily: "'Nunito', sans-serif", fontSize: 22, fontWeight: 800, color: '#292929', margin: '8px 0 18px' }}>{module.title}</h1>
      <Card padding={24}>
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <div style={{ width: 38, height: 38, borderRadius: 9, background: 'linear-gradient(135deg, #1a9e5c, #2fd88a)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name="map-pin" size={18} color="#fff" />
          </div>
          <div>
            <div style={{ fontSize: 10.5, fontWeight: 800, color: '#888', textTransform: 'uppercase', letterSpacing: '.07em', marginBottom: 10 }}>Your assignment</div>
            <p style={{ fontSize: 14, color: '#444', lineHeight: 1.7, margin: 0 }}>{module.experiential}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

function S_ReportPlaceholder({ number, navigate }) {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <PageHeader title={`Report ${number}`} subtitle={`The case assignment for Report ${number} will become available after you complete Report 1.`} />
      <Card padding={28}>
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff8ec', border: '1px solid #f5cfa0', color: '#7a4a00', padding: '6px 14px', borderRadius: 999, fontSize: 11, fontWeight: 700, marginBottom: 16 }}>
            <Icon name="hammer" size={13} color="#e8860a" /> In development
          </div>
          <h2 style={{ fontFamily: "'Nunito', sans-serif", fontSize: 22, fontWeight: 800, color: '#292929', margin: '0 0 10px' }}>Report {number} — Coming soon</h2>
          <p style={{ fontSize: 13.5, color: '#666', lineHeight: 1.6, margin: '0 0 20px' }}>Complete the 9 Practice modules and Report 1 to unlock this assignment.</p>
          <Button variant="ghost" onClick={() => navigate('home')}>Back to Dashboard</Button>
        </div>
      </Card>
    </div>
  );
}

// ── Route → Screen ────────────────────────────────────────────────
function renderScreen(route, navigate, tweaks) {
  const p = { navigate, tweaks, route };
  switch (route) {
    case 'before-you-start': return <S00_BeforeYouStart {...p} />;
    case 'welcome': return <S01_Enrollment {...p} />;
    case 'select-region': return <S_SelectRegion {...p} />;
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
    case 'report-writing': return <Step7Layout navigate={navigate} tweaks={tweaks} />;
    case 'uspap-checklist': return <S_USPAPChecklistScreen {...p} />;
    case 'mentor-review-7': return <S_MentorReviewStub n={7} step={7} prevRoute="report-writing" nextRoute="capstone" {...p} />;
    case 'mentor-review-8': return <S_MentorReviewStub n={8} step={8} prevRoute="capstone" nextRoute={null} {...p} />;
    case 'capstone': return <S_ClientCommunication {...p} />;
    case 'program-complete': return <S_ProgramComplete {...p} />;
    case 'welcome-intro': return <S_WelcomeIntro {...p} />;
    case 'mentors-corner': return <S_MentorsCorner {...p} />;
    case 'office-hours': return <S_OfficeHours {...p} />;
    case 'workfile': return <S30b_Workfile {...p} />;
    case 'mls': return <MLSTool />;
    case 'inspection': return <InspectionTool />;
    case 'urar-report': return <ReportTool />;
    case 'report-2': return <S_ReportPlaceholder number={2} {...p} />;
    case 'report-3': return <S_ReportPlaceholder number={3} {...p} />;
    // Practice modules
    case 'pr-m1': case 'pr-m1-a': case 'pr-m1-b': return <PracticeModuleScreen module={PRACTICE_MODULES[0]} {...p} />;
    case 'pr-m2': case 'pr-m2-a': case 'pr-m2-b': return <PracticeModuleScreen module={PRACTICE_MODULES[1]} {...p} />;
    // M3: a→MLS tool, b→Inspect tool, c→experiential card
    case 'pr-m3': case 'pr-m3-a': return <PracticeModuleFullLayout module={PRACTICE_MODULES[2]} route="pr-m3-a" navigate={navigate} />;
    case 'pr-m3-b': return <PracticeModuleFullLayout module={PRACTICE_MODULES[2]} route="pr-m3-b" navigate={navigate} />;
    case 'pr-m3-c': return <PracticeExperientialCard module={PRACTICE_MODULES[2]} navigate={navigate} />;
    case 'pr-m4': case 'pr-m4-a': case 'pr-m4-b': return <PracticeModuleScreen module={PRACTICE_MODULES[3]} {...p} />;
    // M5-M8: a→UAD tool (full height), b→experiential card
    case 'pr-m5': case 'pr-m5-a': return <PracticeModuleFullLayout module={PRACTICE_MODULES[4]} route="pr-m5-a" navigate={navigate} />;
    case 'pr-m5-b': return <PracticeExperientialCard module={PRACTICE_MODULES[4]} navigate={navigate} />;
    case 'pr-m6': case 'pr-m6-a': return <PracticeModuleFullLayout module={PRACTICE_MODULES[5]} route="pr-m6-a" navigate={navigate} />;
    case 'pr-m6-b': return <PracticeExperientialCard module={PRACTICE_MODULES[5]} navigate={navigate} />;
    case 'pr-m7': case 'pr-m7-a': return <PracticeModuleFullLayout module={PRACTICE_MODULES[6]} route="pr-m7-a" navigate={navigate} />;
    case 'pr-m7-b': return <PracticeExperientialCard module={PRACTICE_MODULES[6]} navigate={navigate} />;
    case 'pr-m8': case 'pr-m8-a': return <PracticeModuleFullLayout module={PRACTICE_MODULES[7]} route="pr-m8-a" navigate={navigate} />;
    case 'pr-m8-b': return <PracticeExperientialCard module={PRACTICE_MODULES[7]} navigate={navigate} />;
    // M9: a→UAD tool, b→experiential card
    case 'pr-m9': case 'pr-m9-a': return <PracticeModuleFullLayout module={PRACTICE_MODULES[8]} route="pr-m9-a" navigate={navigate} />;
    case 'pr-m9-b': return <PracticeExperientialCard module={PRACTICE_MODULES[8]} navigate={navigate} />;
    default: return <S03_Dashboard {...p} />;
  }
}

// ── Root App ──────────────────────────────────────────────────────
// ── Shared inline tool embed ──────────────────────────────────────
function EmbeddedToolPanel({ title, icon, height, children }) {
  return (
    <div style={{ marginTop: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <Icon name={icon} size={14} color="#555" />
        <span style={{ fontSize: 13, fontWeight: 700, color: '#292929' }}>{title}</span>
      </div>
      <div style={{ border: '1px solid #e0e0e0', borderRadius: 12, overflow: 'hidden', ...(height ? { height } : {}) }}>
        {children}
      </div>
    </div>
  );
}

function Step2WithTools({ children }) {
  return (
    <div>
      {children}
      <EmbeddedToolPanel title="McKissock MLS" icon="building-2"><MLSTool /></EmbeddedToolPanel>
      <EmbeddedToolPanel title="McKissock Inspect" icon="scan-eye" height={720}><InspectionTool /></EmbeddedToolPanel>
    </div>
  );
}

function Step7Layout({ navigate, tweaks }) {
  const [tab, setTab] = useState('report');
  const TABS = [
    { id: 'report',   label: 'McKissock UAD',    icon: 'clipboard-list' },
    { id: 'workfile', label: 'Workfile',          icon: 'folder-open' },
    { id: 'inspect',  label: 'McKissock Inspect', icon: 'scan-eye' },
    { id: 'mls',      label: 'McKissock MLS',     icon: 'building-2' },
  ];
  const isFixed = tab === 'report' || tab === 'inspect';
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      <div style={{ display: 'flex', padding: '0 20px', borderBottom: '1px solid #e8e8e8', background: '#fff', flexShrink: 0 }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            style={{
              display: 'flex', alignItems: 'center', gap: 7, padding: '10px 16px',
              border: 'none', borderBottom: tab === t.id ? '2px solid #d60436' : '2px solid transparent',
              background: 'none', cursor: 'pointer', fontFamily: 'inherit',
              fontSize: 12.5, fontWeight: tab === t.id ? 700 : 400,
              color: tab === t.id ? '#d60436' : '#666',
              marginBottom: -1, transition: 'color 120ms, border-color 120ms',
            }}
          >
            <Icon name={t.icon} size={13} color={tab === t.id ? '#d60436' : '#999'} />
            {t.label}
          </button>
        ))}
      </div>
      <div style={{ flex: 1, overflow: isFixed ? 'hidden' : 'auto' }}>
        {tab === 'report'   && <ReportTool />}
        {tab === 'workfile' && <div style={{ padding: '24px 28px 80px' }}><S30b_Workfile navigate={navigate} tweaks={tweaks} /></div>}
        {tab === 'inspect'  && <InspectionTool />}
        {tab === 'mls'      && <MLSTool />}
      </div>
    </div>
  );
}

const PM_TOOL_META = {
  mls:          { label: 'McKissock MLS',    icon: 'building-2',    overflow: 'auto' },
  inspection:   { label: 'McKissock Inspect', icon: 'scan-eye',     overflow: 'hidden' },
  'urar-report':{ label: 'McKissock UAD',    icon: 'clipboard-list', overflow: 'hidden' },
};

function PracticeModuleFullLayout({ module, route, navigate }) {
  // Determine which tool to show from the route suffix
  const suffix = route?.split('-').pop(); // 'a', 'b', etc.
  const toolIdx = suffix === 'a' ? 0 : suffix === 'b' && module.tools.length > 1 ? 1 : 0;
  const activeTool = module.tools[toolIdx];
  const meta = PM_TOOL_META[activeTool];
  const activity = module.toolActivities?.[activeTool];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflow: 'hidden' }}>
      {/* Slim activity header */}
      <div style={{ padding: '10px 20px', borderBottom: '1px solid #e8e8e8', background: '#fafafa', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: activity ? 3 : 0 }}>
          <Badge>M{module.id}</Badge>
          <Icon name={meta.icon} size={13} color="#555" />
          <span style={{ fontSize: 13, fontWeight: 700, color: '#292929' }}>{meta.label}</span>
        </div>
        {activity && <p style={{ fontSize: 12, color: '#666', margin: 0, lineHeight: 1.5, maxWidth: 780 }}>{activity}</p>}
      </div>
      {/* One tool fills the remaining height */}
      <div style={{ flex: 1, overflow: meta.overflow }}>
        {activeTool === 'mls'          && <MLSTool />}
        {activeTool === 'inspection'   && <InspectionTool />}
        {activeTool === 'urar-report'  && <ReportTool />}
      </div>
    </div>
  );
}

// ── Step tool bar ─────────────────────────────────────────────────
const STEP_TOOLS = {
  // Step 2 — toolbar links navigate to each tool as a separate full screen
  'phase-2-launch':    ['mls','inspection'],
  'property-research': ['mls','inspection'],
  'virtual-inspection':['mls','inspection'],
  'gla-measurement':   ['mls','inspection'],
  'sketch':            ['mls','inspection'],
  'mentor-review-2':   ['mls','inspection'],
  'market-analysis':   ['mls'],
  'hbu':               ['mls'],
  'mentor-review-3':   ['mls'],
  'comp-selection':    ['mls'],
  'mentor-review-4':   ['mls'],
  'adjustment-grid':   ['urar-report'],
  'valuation':         ['urar-report'],
  'mentor-review-5':   ['urar-report'],
  'reconciliation':    ['urar-report'],
  'mentor-review-6':   ['urar-report'],
  // Step 7 — tools are now embedded inline as tabs
  'uspap-checklist':   ['urar-report'],
  'mentor-review-7':   ['urar-report'],
  'capstone':          ['urar-report', 'workfile'],
  'mentor-review-8':   ['workfile'],
};

const STEP_TOOL_META = {
  mls:         { icon: 'building-2',    label: 'McKissock MLS',     route: 'mls' },
  inspection:  { icon: 'scan-eye',      label: 'McKissock Inspect', route: 'inspection' },
  'urar-report':{ icon: 'clipboard-list',label: 'McKissock UAD',    route: 'urar-report' },
  workfile:    { icon: 'folder-open',   label: 'Workfile',          route: 'workfile' },
};

function StepToolsBar({ tools, navigate }) {
  return (
    <div style={{
      borderBottom: '1px solid #e8e8e8', background: '#fafafa',
      padding: '8px 28px', display: 'flex', alignItems: 'center', gap: 10,
      flexShrink: 0,
    }}>
      <span style={{ fontSize: 10.5, fontWeight: 700, color: '#aaa', textTransform: 'uppercase', letterSpacing: '.07em', marginRight: 4 }}>Tools</span>
      {tools.map(t => {
        const m = STEP_TOOL_META[t];
        return (
          <button key={t} onClick={() => navigate(m.route)}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '4px 12px', borderRadius: 6,
              border: '1px solid #e0e0e0', background: '#fff',
              color: '#333', fontFamily: 'inherit', fontSize: 12, fontWeight: 500,
              cursor: 'pointer', transition: 'border-color 120ms, background 120ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#d60436'; e.currentTarget.style.color = '#d60436'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#e0e0e0'; e.currentTarget.style.color = '#333'; }}
          >
            <Icon name={m.icon} size={13} color="inherit" />
            {m.label}
          </button>
        );
      })}
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState('home');
  const [screenKey, setScreenKey] = useState(0);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [socrCollapsed, setSocrCollapsed] = useState(true);
  const [socrShake, setSocrShake] = useState(false);
  const [textbookTopic, setTextbookTopic] = useState(null);
  const tweaks = { aiIntensity: 'normal', uspapStrict: 'normal', showCohortFeed: true };

  const navigate = r => {
    setRoute(r);
    setScreenKey(k => k + 1);
    if (socrCollapsed) {
      setSocrShake(true);
      setTimeout(() => setSocrShake(false), 800);
    }
  };
  window.__openTextbook = setTextbookTopic;

  const isFull = FULL_HEIGHT_ROUTES.includes(route);

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#f4f5f7', fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <PAREASidebar active={route} onNav={navigate} collapsed={sidebarCollapsed} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <AppTopBar onMenuToggle={() => setSidebarCollapsed(c => !c)} collapsed={sidebarCollapsed} />
        {STEP_TOOLS[route] && <StepToolsBar tools={STEP_TOOLS[route]} navigate={navigate} />}
        <div style={{ flex: 1, overflow: isFull ? 'hidden' : 'auto', padding: isFull ? 0 : '24px 28px 80px' }}>
          <div key={screenKey} className={isFull ? undefined : 'screen-enter'} style={isFull ? { height: '100%' } : undefined}>
            {renderScreen(route, navigate, tweaks)}
          </div>
        </div>
      </div>
      <SocraticPanel collapsed={socrCollapsed} onToggle={() => setSocrCollapsed(c => !c)} route={route} shake={socrShake} />
      {textbookTopic && <TextbookModal topic={textbookTopic} onClose={() => setTextbookTopic(null)} />}
    </div>
  );
}
