// PAREA Combined Program — Extra components beyond the base components.jsx
// Provides AI-first UI primitives: chat, mock tools, analytics, USPAP scanner

const { useState: useStateC, useEffect: useEffectC, useRef: useRefC, useMemo: useMemoC } = React;

// ── Phase metadata ───────────────────────────────────────────
const PHASES = [
  { id: 'pre', label: 'Pre-Program', color: '#7a8aa3', bg: '#eef2f8' },
  { id: 'p1',  label: 'Phase 1 · Problem ID', color: '#7b1fa2', bg: '#f3e5f5' },
  { id: 'p2',  label: 'Phase 2 · Inspection', color: '#1b5e20', bg: '#e8f5e9' },
  { id: 'p3',  label: 'Phase 3 · Market & HBU', color: '#e65100', bg: '#fff8e1' },
  { id: 'p4',  label: 'Phase 4 · Sales Analysis', color: '#880e4f', bg: '#fce4ec' },
  { id: 'p5',  label: 'Phase 5 · Valuation', color: '#0d47a1', bg: '#e3f2fd' },
  { id: 'p6',  label: 'Phase 6 · Reconciliation', color: '#33691e', bg: '#f1f8e9' },
  { id: 'p7',  label: 'Phase 7 · Report', color: '#1a237e', bg: '#e8eaf6' },
  { id: 'p8',  label: 'Phase 8 · Communication', color: '#bf360c', bg: '#fbe9e7' },
];

// ── PhasePill ────────────────────────────────────────────────
function PhasePill({ phase, size = 'md' }) {
  const p = PHASES.find(x => x.id === phase) || PHASES[0];
  const sz = size === 'sm' ? { fs: 10, py: 2, px: 8 } : { fs: 11, py: 4, px: 10 };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: p.bg, color: p.color,
      padding: `${sz.py}px ${sz.px}px`, borderRadius: 999,
      fontSize: sz.fs, fontWeight: 700, letterSpacing: '.02em',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: p.color }} />
      {p.label}
    </span>
  );
}

// ── AI Chip (denotes AI involvement) ─────────────────────────
function AIChip({ label = 'AI', size = 'md', tone = 'brand' }) {
  const sz = size === 'sm' ? { fs: 9, py: 1, px: 6 } : { fs: 10, py: 2, px: 8 };
  const tones = {
    brand: { bg: 'linear-gradient(90deg, #d60436 0%, #ff5577 100%)', color: '#fff' },
    dark:  { bg: '#1a1d2b', color: '#fff' },
    soft:  { bg: '#fff0f3', color: '#d60436' },
  };
  const t = tones[tone] || tones.brand;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      background: t.bg, color: t.color,
      padding: `${sz.py}px ${sz.px}px`, borderRadius: 4,
      fontSize: sz.fs, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase',
      fontFamily: "'JetBrains Mono', 'DM Sans', monospace",
    }}>
      <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="2.5" fill={tone === 'soft' ? '#d60436' : '#fff'}/></svg>
      {label}
    </span>
  );
}

// ── ProgressRing (SVG) ───────────────────────────────────────
function ProgressRing({ value = 0, size = 100, stroke = 8, color = '#d60436', track = '#f0f0f0', label, sub }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size/2} cy={size/2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
        <circle cx={size/2} cy={size/2} r={r} stroke={color} strokeWidth={stroke} fill="none"
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 600ms cubic-bezier(0.4,0,0.2,1)' }} />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center', lineHeight: 1.05,
      }}>
        <div style={{ fontSize: size * 0.24, fontWeight: 800, color: '#292929', fontFamily: "'Nunito', sans-serif" }}>
          {label != null ? label : `${Math.round(value)}%`}
        </div>
        {sub && <div style={{ fontSize: size * 0.10, color: '#888', marginTop: 2, fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase' }}>{sub}</div>}
      </div>
    </div>
  );
}

// ── Sparkline ────────────────────────────────────────────────
function Sparkline({ data, w = 220, h = 50, color = '#d60436', fill = 'rgba(214,4,54,0.10)' }) {
  if (!data || !data.length) return null;
  const min = Math.min(...data), max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * (w - 4) + 2;
    const y = h - 4 - ((v - min) / range) * (h - 8);
    return [x, y];
  });
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');
  const area = `${path} L ${pts[pts.length-1][0]} ${h} L ${pts[0][0]} ${h} Z`;
  return (
    <svg width={w} height={h} style={{ display: 'block' }}>
      <path d={area} fill={fill} />
      <path d={path} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => i === pts.length - 1 && (
        <circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill={color} stroke="#fff" strokeWidth="1.5" />
      ))}
    </svg>
  );
}

// ── BarMini ──────────────────────────────────────────────────
function BarMini({ data, w = 220, h = 60, color = '#d60436' }) {
  const max = Math.max(...data) || 1;
  const bw = (w - (data.length - 1) * 4) / data.length;
  return (
    <svg width={w} height={h}>
      {data.map((v, i) => {
        const bh = (v / max) * (h - 4);
        return <rect key={i} x={i * (bw + 4)} y={h - bh} width={bw} height={bh} rx="2" fill={color} opacity={0.4 + (i/data.length)*0.6} />;
      })}
    </svg>
  );
}

// ── PhaseRoadmap (horizontal stepper across all 8 phases) ────
function PhaseRoadmap({ currentPhase = 'p1', completedPhases = [] }) {
  const idx = PHASES.findIndex(p => p.id === currentPhase);
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, width: '100%' }}>
      {PHASES.slice(1).map((p, i) => {
        const isCurrent = p.id === currentPhase;
        const isDone = completedPhases.includes(p.id) || (idx > 0 && i < idx - 1);
        const bg = isDone ? '#1a9e5c' : isCurrent ? p.color : '#e8e8e8';
        const fg = (isDone || isCurrent) ? '#fff' : '#888';
        return (
          <div key={p.id} style={{
            flex: 1, padding: '10px 8px', background: bg, color: fg,
            position: 'relative', clipPath: i === 0 ? 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)'
              : i === PHASES.length - 2 ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 12px 50%)'
              : 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%, 12px 50%)',
            marginLeft: i === 0 ? 0 : -8,
            zIndex: isCurrent ? 10 : PHASES.length - i,
            display: 'flex', flexDirection: 'column', gap: 1,
            transition: 'all 200ms',
          }}>
            <div style={{ fontSize: 9, fontWeight: 700, opacity: 0.85, letterSpacing: '.05em' }}>PHASE {i + 1}</div>
            <div style={{ fontSize: 10.5, fontWeight: 700, lineHeight: 1.15 }}>{p.label.replace(/^Phase \d+ · /, '')}</div>
          </div>
        );
      })}
    </div>
  );
}

// ── Compression Curve (the AI-first "speed" graph) ───────────
function CompressionCurve({ height = 120, width = 360 }) {
  // Time per assignment over 24 sessions — declining curve
  const data = [148, 142, 138, 130, 126, 122, 115, 110, 108, 102, 98, 94, 88, 84, 80, 76, 73, 70, 68, 66, 63, 61, 59, 57];
  const pad = { l: 32, r: 12, t: 12, b: 22 };
  const w = width - pad.l - pad.r, h = height - pad.t - pad.b;
  const max = 160, min = 40;
  const x = (i) => pad.l + (i / (data.length - 1)) * w;
  const y = (v) => pad.t + h - ((v - min) / (max - min)) * h;
  const path = data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(v)}`).join(' ');
  const area = `${path} L ${x(data.length - 1)} ${pad.t + h} L ${x(0)} ${pad.t + h} Z`;
  const gridY = [40, 80, 120, 160];

  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="ccGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d60436" stopOpacity="0.22"/>
          <stop offset="100%" stopColor="#d60436" stopOpacity="0"/>
        </linearGradient>
      </defs>
      {gridY.map(g => (
        <g key={g}>
          <line x1={pad.l} y1={y(g)} x2={pad.l + w} y2={y(g)} stroke="#f0f0f0" />
          <text x={pad.l - 6} y={y(g) + 3} fontSize="9" fill="#888" textAnchor="end" fontFamily="DM Sans">{g}m</text>
        </g>
      ))}
      <path d={area} fill="url(#ccGrad)" />
      <path d={path} stroke="#d60436" strokeWidth="2" fill="none" strokeLinecap="round" />
      {data.map((v, i) => i % 4 === 0 && <circle key={i} cx={x(i)} cy={y(v)} r="2.5" fill="#d60436"/>)}
      <circle cx={x(data.length-1)} cy={y(data[data.length-1])} r="4.5" fill="#d60436" stroke="#fff" strokeWidth="2"/>
      <text x={pad.l} y={height - 4} fontSize="9" fill="#888" fontFamily="DM Sans">Session 1</text>
      <text x={pad.l + w} y={height - 4} fontSize="9" fill="#888" textAnchor="end" fontFamily="DM Sans">Session 24</text>
    </svg>
  );
}

// ── ChatBubble (AI conversation) ─────────────────────────────
function ChatBubble({ from, name, avatar, role, time, children, accent }) {
  const isAI = from === 'ai' || from === 'persona';
  const isUser = from === 'user';
  return (
    <div style={{
      display: 'flex', gap: 10, marginBottom: 14,
      flexDirection: isUser ? 'row-reverse' : 'row',
    }}>
      {avatar ? (
        <img src={avatar} alt={name || ''} style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '2px solid #fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} />
      ) : (
        <div style={{
          width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
          background: isAI ? 'linear-gradient(135deg, #d60436, #ff5577)' : '#e8e8e8',
          color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 800,
        }}>
          {isAI ? 'AI' : (name || '?').split(' ').map(w => w[0]).slice(0, 2).join('')}
        </div>
      )}
      <div style={{ maxWidth: '78%', display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start' }}>
        {(name || role) && (
          <div style={{ fontSize: 11, color: '#888', marginBottom: 3, display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ fontWeight: 700, color: '#292929' }}>{name}</span>
            {role && <span>{role}</span>}
            {time && <span>· {time}</span>}
            {isAI && from === 'ai' && <AIChip label="Socratic" size="sm" tone="dark" />}
          </div>
        )}
        <div style={{
          background: isUser ? '#d60436' : isAI ? '#1a1d2b' : '#fff',
          color: isUser ? '#fff' : isAI ? '#fff' : '#292929',
          padding: '10px 14px', borderRadius: 12,
          borderTopLeftRadius: isUser ? 12 : 4, borderTopRightRadius: isUser ? 4 : 12,
          fontSize: 13.5, lineHeight: 1.5,
          border: !isAI && !isUser ? '1px solid #e8e8e8' : 'none',
          boxShadow: !isAI && !isUser ? '0 1px 2px rgba(0,0,0,0.04)' : 'none',
          ...(accent ? { borderLeft: `3px solid ${accent}` } : {}),
        }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// ── MockToolFrame (PropMix / True Footage / Apex Sketch chrome) ─
function MockToolFrame({ tool = 'PropMix', tab, children, height = 380, status = 'live' }) {
  const tools = {
    PropMix:     { color: '#0a6ed1', bg: '#eaf3ff', accent: '#0a6ed1', logo: 'P' },
    'True Footage': { color: '#1f6f5b', bg: '#e8f5ef', accent: '#1f6f5b', logo: 'T' },
    'Apex Sketch':  { color: '#6f3fb5', bg: '#f0e9fb', accent: '#6f3fb5', logo: 'A' },
    'CoreLogic':    { color: '#0066b3', bg: '#e6f1fa', accent: '#0066b3', logo: 'C' },
    'HouseCanary':  { color: '#16a34a', bg: '#e7f8ee', accent: '#16a34a', logo: 'H' },
    'Matterport':   { color: '#0a85ff', bg: '#e6f1ff', accent: '#0a85ff', logo: 'M' },
  };
  const t = tools[tool] || tools.PropMix;
  return (
    <div style={{
      border: '1px solid #d8d8d8', borderRadius: 10, overflow: 'hidden',
      background: '#fff', display: 'flex', flexDirection: 'column',
      boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '8px 12px', background: t.bg, borderBottom: `1px solid ${t.accent}33`,
      }}>
        <div style={{
          width: 22, height: 22, borderRadius: 5, background: t.color, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: 12, fontFamily: "'Nunito', sans-serif",
        }}>{t.logo}</div>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: t.color }}>{tool}</div>
        {tab && <div style={{ fontSize: 11, color: '#666' }}>· {tab}</div>}
        <div style={{ flex: 1 }}/>
        <div style={{ display: 'flex', gap: 5, alignItems: 'center', fontSize: 10, color: '#666', fontFamily: "'JetBrains Mono', monospace" }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: status === 'live' ? '#1a9e5c' : '#888', boxShadow: status === 'live' ? '0 0 6px #1a9e5c' : 'none' }}/>
          {status === 'live' ? 'LIVE · API connected' : status.toUpperCase()}
        </div>
      </div>
      <div style={{ padding: 14, height, overflow: 'auto', background: '#fafbfc' }}>
        {children}
      </div>
    </div>
  );
}

// ── USPAPScanner Rail ────────────────────────────────────────
function USPAPScanner({ items, strictness = 'normal' }) {
  // items: [{ code, label, status: 'ok' | 'warn' | 'fail' | 'pending' }]
  const map = {
    ok:      { color: '#1a9e5c', bg: '#edfbf4', icon: 'check',     label: 'Resolved' },
    warn:    { color: '#e8860a', bg: '#fff8ec', icon: 'alert-triangle', label: 'Pending' },
    fail:    { color: '#d60436', bg: '#fff0f3', icon: 'x',         label: 'Flag' },
    pending: { color: '#888',    bg: '#f0f0f0', icon: 'clock',     label: 'Later' },
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
        <AIChip label="USPAP Live" size="sm" tone="dark" />
        <span style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 700 }}>Strictness: {strictness}</span>
      </div>
      {items.map((it, i) => {
        const m = map[it.status] || map.pending;
        return (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 10px', background: m.bg, borderRadius: 6,
            border: `1px solid ${m.color}22`,
          }}>
            <div style={{
              width: 18, height: 18, borderRadius: 4, background: m.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name={m.icon} size={11} color="#fff" strokeWidth={3} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#292929', fontFamily: "'JetBrains Mono', monospace" }}>{it.code}</div>
              <div style={{ fontSize: 11, color: '#555', lineHeight: 1.3, marginTop: 1 }}>{it.label}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ── MentorBadge / CheckpointBadge ────────────────────────────
function MentorBadge({ n, status = 'locked', phaseColor = '#7b1fa2' }) {
  const isLocked = status === 'locked';
  const isApproved = status === 'approved';
  const isPending = status === 'pending';
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '6px 12px', borderRadius: 999,
      background: isApproved ? '#edfbf4' : isPending ? '#fff8ec' : isLocked ? '#f0f0f0' : phaseColor,
      color: isApproved ? '#1a9e5c' : isPending ? '#e8860a' : isLocked ? '#888' : '#fff',
      fontSize: 11.5, fontWeight: 700,
      border: isApproved ? '1px solid #1a9e5c33' : isPending ? '1px solid #e8860a33' : 'none',
    }}>
      <span style={{ fontSize: 13 }}>⚑</span>
      Mentor Review {n}
      {isApproved && <Icon name="check-circle" size={13} />}
    </div>
  );
}

// ── CohortFeedItem ───────────────────────────────────────────
const COHORT_FEED = [
  { name: 'Amara K.', avatar: 'https://i.pravatar.cc/64?img=47', action: 'submitted Report 1 for Mentor Review 8', phase: 'p8', time: '12 min ago' },
  { name: 'Takeshi R.', avatar: 'https://i.pravatar.cc/64?img=12', action: 'completed Adjustment Grid · 4 overrides defended', phase: 'p5', time: '38 min ago' },
  { name: 'Priya N.',  avatar: 'https://i.pravatar.cc/64?img=45', action: 'cleared Mentor Review 3 (Market & HBU)', phase: 'p3', time: '1 hr ago' },
  { name: 'Diego A.',  avatar: 'https://i.pravatar.cc/64?img=33', action: 'finalized GLA in Apex Sketch · 2,148 sq ft', phase: 'p2', time: '2 hr ago' },
  { name: 'Lena O.',   avatar: 'https://i.pravatar.cc/64?img=49', action: 'opened comp selection · MLS scan', phase: 'p4', time: '3 hr ago' },
  { name: 'Marcus P.', avatar: 'https://i.pravatar.cc/64?img=15', action: 'AI flagged USPAP SR1-3 · revising HBU', phase: 'p3', time: '4 hr ago' },
  { name: 'Yuki T.',   avatar: 'https://i.pravatar.cc/64?img=44', action: 'started Report 2 · FHA Refinance', phase: 'p1', time: '5 hr ago' },
];

function CohortFeedItem({ item, compact }) {
  const p = PHASES.find(x => x.id === item.phase) || PHASES[0];
  return (
    <div style={{
      display: 'flex', gap: 10, padding: compact ? '8px 0' : '10px 0',
      borderBottom: '1px solid #f0f0f0', alignItems: 'flex-start',
    }}>
      <img src={item.avatar} alt={item.name} style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }}/>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12.5, color: '#292929', lineHeight: 1.4 }}>
          <strong>{item.name}</strong> {item.action}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 3 }}>
          <span style={{ fontSize: 9.5, fontWeight: 700, color: p.color, textTransform: 'uppercase', letterSpacing: '.05em' }}>{p.label}</span>
          <span style={{ fontSize: 10.5, color: '#888' }}>· {item.time}</span>
        </div>
      </div>
    </div>
  );
}

// ── Stat Tile ────────────────────────────────────────────────
function StatTile({ label, value, sub, trend, color = '#d60436', icon }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 10, padding: '14px 16px',
      border: '1px solid #eee', display: 'flex', flexDirection: 'column', gap: 4,
      flex: 1, minWidth: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 10.5, color: '#888', textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 700 }}>{label}</div>
        {icon && <Icon name={icon} size={14} color={color} />}
      </div>
      <div style={{ fontSize: 22, fontWeight: 800, color: '#292929', fontFamily: "'Nunito', sans-serif", lineHeight: 1.1 }}>{value}</div>
      {(sub || trend) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
          {trend && (
            <span style={{ color: trend.startsWith('-') ? '#1a9e5c' : trend.startsWith('+') ? '#1a9e5c' : '#888', fontWeight: 700 }}>
              {trend}
            </span>
          )}
          {sub && <span style={{ color: '#888' }}>{sub}</span>}
        </div>
      )}
    </div>
  );
}

// ── Subject property data (Report 1) ─────────────────────────
const SUBJECT = {
  address: '4218 Ridgewood Lane',
  city: 'Glenmoor, OH 44023',
  photo: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80',
  type: 'Single-Family Detached', style: '2-Story Colonial',
  yearBuilt: 2008, gla: 2148, beds: 4, baths: 2.5, lot: 0.31,
  garage: '2-car attached', basement: 'Full, finished',
  apn: '14-022-37-104', zone: 'R-1 (Single-Family Residential)',
  floodZone: 'X (minimal risk)', purchasePrice: 492000,
};

const COMPS = [
  { id: 'C1', address: '4109 Ridgewood Ln', dist: 0.18, gla: 2090, beds: 4, baths: 2.5, age: 17, sale: 478000, sold: '2026-02-14', dom: 9, aiScore: 96, photo: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80' },
  { id: 'C2', address: '3884 Cedar Hollow Dr', dist: 0.42, gla: 2210, beds: 4, baths: 3, age: 16, sale: 495000, sold: '2026-01-28', dom: 14, aiScore: 92, photo: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&q=80' },
  { id: 'C3', address: '4502 Birchwood Ct', dist: 0.31, gla: 2055, beds: 4, baths: 2.5, age: 19, sale: 466000, sold: '2025-12-08', dom: 21, aiScore: 89, photo: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=400&q=80' },
  { id: 'C4', address: '4071 Glen Ridge Way', dist: 0.55, gla: 2240, beds: 5, baths: 3, age: 14, sale: 512000, sold: '2026-03-02', dom: 6, aiScore: 87, photo: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=400&q=80' },
  { id: 'C5', address: '3922 Maple Crest Dr', dist: 0.68, gla: 1980, beds: 3, baths: 2.5, age: 18, sale: 449000, sold: '2026-01-04', dom: 18, aiScore: 78, photo: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=80' },
];

const MENTOR = {
  name: 'James Mendel, MAI',
  role: 'Lead Mentor · Cohort 04',
  avatar: 'https://i.pravatar.cc/128?img=68',
  yearsExperience: 23,
  nextOH: 'Thu 3:00 PM ET',
};

const PERSONAS = {
  maya: {
    name: 'Maya Chen',
    role: 'Loan Officer · First Summit Bank',
    avatar: 'https://i.pravatar.cc/128?img=48',
    tone: 'Professional, deal-pressured',
  },
  david: {
    name: 'David Osei',
    role: 'Homeowner · 4218 Ridgewood Ln',
    avatar: 'https://i.pravatar.cc/128?img=59',
    tone: 'Cooperative, schedule-constrained',
  },
};

// Export to window
Object.assign(window, {
  PHASES, PhasePill, AIChip, ProgressRing, Sparkline, BarMini,
  PhaseRoadmap, CompressionCurve, ChatBubble, MockToolFrame,
  USPAPScanner, MentorBadge, CohortFeedItem, COHORT_FEED, StatTile,
  SUBJECT, COMPS, MENTOR, PERSONAS,
});
