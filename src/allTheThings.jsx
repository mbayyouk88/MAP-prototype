import React, { useState, useEffect, useRef, useMemo } from 'react';
import * as LucideIcons from 'lucide-react';
import logoSrc from './assets/logo.png';

// ── SVG Avatar helper ─────────────────────────────────────────────
export function svgAvatar(name, size = 128) {
  const initials = name.split(' ').map(w => w[0]).join('').slice(0,2).toUpperCase();
  const hue = Array.from(name).reduce((h, c, i) => h + c.charCodeAt(0) * (i+1), 0) % 360;
  const bg = encodeURIComponent(`hsl(${hue},45%,65%)`);
  const fg = encodeURIComponent(`hsl(${hue},50%,18%)`);
  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`,
    `<circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="${bg}"/>`,
    `<text x="${size/2}" y="${Math.round(size*0.65)}" text-anchor="middle" font-family="DM Sans,sans-serif" font-weight="700" font-size="${Math.round(size*0.38)}" fill="${fg}">${initials}</text>`,
    `</svg>`
  ].join('');
  return 'data:image/svg+xml,' + svg;
}

// ── Lucide Icon component (uses lucide-react package) ─────────────
export function Icon({ name, size = 16, color = 'currentColor', strokeWidth = 1.75 }) {
  const iconName = name.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join('');
  const LucideIcon = LucideIcons[iconName];
  if (!LucideIcon) return <span style={{ display: 'inline-flex', width: size, height: size }} />;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 0, flexShrink: 0 }}>
      <LucideIcon size={size} color={color} strokeWidth={strokeWidth} />
    </span>
  );
}

// ── Components.jsx content ────────────────────────────────────────

// ── Design Tokens ─────────────────────────────────────────────
const C = {
  brand: '#d60436',
  brandDark: '#a8002a',
  brandSubtle: '#fff0f3',
  charcoal: '#292929',
  text2: '#555',
  text3: '#888',
  border: '#e8e8e8',
  bg: '#f4f5f7',
  white: '#ffffff',
  success: '#1a9e5c',
  successBg: '#edfbf4',
  warning: '#e8860a',
  warningBg: '#fff8ec',
  info: '#0a6ed1',
  infoBg: '#eef5ff',
  sidebar: '#1e2333',
  sidebarHover: '#2a3047',
  sidebarActive: '#d60436',
  sidebarText: '#b0b8cc',
  sidebarTextActive: '#ffffff'
};

// ── Button ───────────────────────────────────────────────────
function Button({ children, variant = 'primary', size = 'md', onClick, disabled, style, fullWidth }) {
  const [hov, setHov] = useState(false);
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 7,
    fontFamily: 'inherit', fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none', borderRadius: 8, transition: 'all 150ms ease',
    fontSize: size === 'sm' ? 13 : size === 'lg' ? 15 : 14,
    padding: size === 'sm' ? '7px 14px' : size === 'lg' ? '13px 28px' : '10px 20px',
    width: fullWidth ? '100%' : undefined
  };
  const variants = {
    primary: { background: hov ? C.brandDark : C.brand, color: '#fff' },
    secondary: { background: hov ? '#ffd6de' : C.brandSubtle, color: C.brand },
    ghost: { background: hov ? '#f0f0f0' : 'transparent', color: C.charcoal, border: `1px solid ${C.border}` },
    outline: { background: 'transparent', color: C.brand, border: `1.5px solid ${C.brand}`, ...(hov ? { background: C.brandSubtle } : {}) },
    success: { background: hov ? '#148a4e' : C.success, color: '#fff' },
    dark: { background: hov ? '#3d3d3d' : C.charcoal, color: '#fff' }
  };
  const disabledStyle = disabled ? { background: '#e0e0e0', color: '#a3a3a3', border: 'none' } : {};
  return (
    <button
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ ...base, ...variants[variant], ...disabledStyle, ...style }} data-comment-anchor="87db3dd52b-button-73-5">
      
      {children}
    </button>);

}

// ── Badge ────────────────────────────────────────────────────
function Badge({ children, color = 'neutral', dot = true }) {
  const map = {
    brand: { bg: C.brandSubtle, text: C.brand, d: C.brand },
    success: { bg: C.successBg, text: C.success, d: C.success },
    warning: { bg: C.warningBg, text: C.warning, d: C.warning },
    info: { bg: C.infoBg, text: C.info, d: C.info },
    neutral: { bg: '#f0f0f0', text: C.text2, d: '#888' }
  };
  const s = map[color] || map.neutral;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: dot ? 5 : 0,
      background: s.bg, color: s.text,
      padding: '3px 10px', borderRadius: 9999,
      fontSize: 11, fontWeight: 600, letterSpacing: '.02em'
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: s.d, flexShrink: 0 }} />}
      {children}
    </span>);

}

// ── Avatar ───────────────────────────────────────────────────
function Avatar({ name = '?', size = 32 }) {
  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  const hue = name.charCodeAt(0) * 17 % 360;
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `hsl(${hue},55%,85%)`, color: `hsl(${hue},50%,30%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontWeight: 700, fontSize: size * 0.36, flexShrink: 0, letterSpacing: '-0.02em'
    }}>{initials}</div>);

}

// ── Card ─────────────────────────────────────────────────────
function Card({ children, style, padding = '20px 22px' }) {
  return (
    <div style={{
      background: C.white, borderRadius: 12,
      boxShadow: '0 1px 3px rgba(0,0,0,.08), 0 1px 2px rgba(0,0,0,.04)',
      padding, ...style
    }}>
      {children}
    </div>);

}

// ── CardSection ──────────────────────────────────────────────
function CardSection({ title, children, style }) {
  return (
    <Card style={style}>
      {title &&
      <div style={{ fontSize: 14, fontWeight: 700, color: C.charcoal, marginBottom: 14, letterSpacing: '-.01em' }}>
          {title}
        </div>
      }
      {children}
    </Card>);

}

// ── Step Progress Tracker ────────────────────────────────────
function StepTracker({ steps, current }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 4 }}>
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <React.Fragment key={i}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: done ? C.success : active ? C.brand : C.white,
                border: done ? `2px solid ${C.success}` : active ? `2px solid ${C.brand}` : `2px solid #ccc`,
                color: done || active ? '#fff' : '#999',
                fontSize: 11, fontWeight: 700, flexShrink: 0, transition: 'all 250ms'
              }}>
                {done ? <Icon name="check" size={13} color="#fff" strokeWidth={2.5} /> : i + 1}
              </div>
            </div>
            {i < steps.length - 1 &&
            <div style={{
              flex: 1, height: 2, minWidth: 20,
              background: done ? C.success : '#e0e0e0',
              transition: 'background 250ms'
            }} />
            }
          </React.Fragment>);

      })}
    </div>);

}

// ── Checkbox Item ────────────────────────────────────────────
function CheckItem({ label, checked, onChange }) {
  return (
    <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', userSelect: 'none', padding: '4px 0' }}>
      <div
        onClick={() => onChange(!checked)}
        style={{
          width: 18, height: 18, borderRadius: 4, border: `2px solid ${checked ? C.success : '#ccc'}`,
          background: checked ? C.success : 'transparent',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, marginTop: 1, cursor: 'pointer', transition: 'all 150ms'
        }}>
        
        {checked && <Icon name="check" size={11} color="#fff" strokeWidth={3} />}
      </div>
      <span style={{ fontSize: 14, color: checked ? C.text3 : C.charcoal, textDecoration: checked ? 'line-through' : 'none', lineHeight: 1.4 }}>
        {label}
      </span>
    </label>);

}

// ── Textarea ─────────────────────────────────────────────────
function Textarea({ placeholder, value, onChange, rows = 4 }) {
  return (
    <textarea
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '100%', fontFamily: 'inherit', fontSize: 14, color: C.charcoal,
        border: `1px solid ${C.border}`, borderRadius: 8,
        padding: '10px 12px', outline: 'none', resize: 'vertical',
        lineHeight: 1.5, background: '#fafafa'
      }}
      onFocus={(e) => {e.target.style.borderColor = C.brand;e.target.style.boxShadow = '0 0 0 3px rgba(214,4,54,.08)';}}
      onBlur={(e) => {e.target.style.borderColor = C.border;e.target.style.boxShadow = 'none';}} />);


}

// ── Input ────────────────────────────────────────────────────
function Input({ placeholder, value, onChange, type = 'text' }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        width: '100%', fontFamily: 'inherit', fontSize: 14, color: C.charcoal,
        border: `1px solid ${C.border}`, borderRadius: 8,
        padding: '10px 12px', outline: 'none', background: '#fafafa'
      }}
      onFocus={(e) => {e.target.style.borderColor = C.brand;e.target.style.boxShadow = '0 0 0 3px rgba(214,4,54,.08)';}}
      onBlur={(e) => {e.target.style.borderColor = C.border;e.target.style.boxShadow = 'none';}} />);


}

// ── Toast ────────────────────────────────────────────────────
function Toast({ message, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div style={{
      position: 'fixed', bottom: 28, left: '50%', transform: 'translateX(-50%)',
      background: C.charcoal, color: '#fff', padding: '12px 22px', borderRadius: 10,
      fontSize: 14, fontWeight: 500, boxShadow: '0 8px 32px rgba(0,0,0,.2)',
      display: 'flex', alignItems: 'center', gap: 10, zIndex: 9999,
      animation: 'fadeInUp 200ms ease'
    }}>
      <Icon name="check-circle" size={16} color={C.success} />
      {message}
    </div>);

}

// ── TopBar ───────────────────────────────────────────────────
function TopBar({ onMenuToggle, collapsed }) {
  return (
    <header style={{
      height: 58, background: C.white, borderBottom: `1px solid ${C.border}`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px', flexShrink: 0, zIndex: 10
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <button onClick={onMenuToggle} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, color: C.text2, display: 'flex' }}>
          <Icon name={collapsed ? 'panel-left-open' : 'panel-left-close'} size={18} color={C.text2} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <img src={logoSrc} alt="McKissock" style={{ height: 22, width: 'auto' }} />
          <span style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: 15, color: C.charcoal }}>McKissock</span>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', display: 'flex' }}>
          <Icon name="bell" size={18} color={C.text2} />
          <span style={{ position: 'absolute', top: -3, right: -3, width: 8, height: 8, background: C.brand, borderRadius: '50%', border: '1.5px solid white' }} />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
          <Avatar name="Sarah H" size={32} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.charcoal }}>Sarah H.</div>
            <div style={{ fontSize: 11, color: C.text3 }}>Appraiser Trainee</div>
          </div>
          <Icon name="chevron-down" size={14} color={C.text3} />
        </div>
      </div>
    </header>);

}

// ── Sidebar ──────────────────────────────────────────────────
const NAV_ITEMS = [
{ id: 'home', icon: 'layout-dashboard', label: 'Dashboard' },
{ id: 'courses', icon: 'book-open', label: 'My Courses' },
{ id: 'cases', icon: 'briefcase', label: 'Cases' },
{ id: 'mentor', icon: 'user-check', label: 'Mentor' },
{ id: 'discussion', icon: 'message-square', label: 'Discussion' },
{ id: 'progress', icon: 'bar-chart-2', label: 'Progress' },
{ id: 'schedule', icon: 'calendar', label: 'Schedule' },
{ id: 'announce', icon: 'megaphone', label: 'Announcements' }];


function Sidebar({ active, onNav, collapsed }) {
  return (
    <aside style={{
      width: collapsed ? 60 : 224, background: C.sidebar,
      display: 'flex', flexDirection: 'column', flexShrink: 0,
      transition: 'width 250ms ease', overflow: 'hidden'
    }}>
      <nav style={{ flex: 1, padding: '12px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {NAV_ITEMS.map((item) => {
          const isActive = active === item.id;
          return (
            <button key={item.id} onClick={() => onNav(item.id)} title={collapsed ? item.label : ''} style={{
              display: 'flex', alignItems: 'center', gap: 11,
              padding: collapsed ? '10px 0' : '9px 12px',
              justifyContent: collapsed ? 'center' : 'flex-start',
              borderRadius: 8, border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', fontSize: 13.5, fontWeight: isActive ? 600 : 400,
              background: isActive ? 'rgba(214,4,54,0.18)' : 'transparent',
              color: isActive ? '#fff' : C.sidebarText,
              transition: 'all 120ms ease', textAlign: 'left', width: '100%',
              whiteSpace: 'nowrap',
              borderLeft: isActive ? `3px solid ${C.brand}` : '3px solid transparent'
            }}
            onMouseEnter={(e) => {if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.07)';}}
            onMouseLeave={(e) => {if (!isActive) e.currentTarget.style.background = 'transparent';}}>
              
              <Icon name={item.icon} size={17} color={isActive ? '#fff' : C.sidebarText} />
              {!collapsed && item.label}
            </button>);

        })}
      </nav>
      <div style={{ padding: '12px 8px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 11, width: '100%',
          padding: collapsed ? '10px 0' : '9px 12px', justifyContent: collapsed ? 'center' : 'flex-start',
          background: 'none', border: 'none', cursor: 'pointer', color: C.sidebarText,
          fontSize: 13, fontFamily: 'inherit', borderRadius: 8
        }}>
          <Icon name="log-out" size={16} color={C.sidebarText} />
          {!collapsed && 'Sign Out'}
        </button>
      </div>
    </aside>);

}

// ── Page Header ──────────────────────────────────────────────
function PageHeader({ breadcrumb, title, subtitle }) {
  return (
    <div style={{ marginBottom: 22 }}>
      {breadcrumb &&
      <div style={{ fontSize: 12, color: C.text3, marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
          {breadcrumb.map((b, i) =>
        <React.Fragment key={i}>
              {i > 0 && <Icon name="chevron-right" size={12} color={C.text3} />}
              <span style={{ color: i === breadcrumb.length - 1 ? C.text2 : C.text3 }}>{b}</span>
            </React.Fragment>
        )}
        </div>
      }
      <h1 style={{ fontFamily: "'Nunito', sans-serif", fontSize: 26, fontWeight: 700, color: C.charcoal, margin: 0 }}>{title}</h1>
      {subtitle && <p style={{ fontSize: 14, color: C.text2, marginTop: 4 }}>{subtitle}</p>}
    </div>);

}

// ── Tool Launch Card ─────────────────────────────────────────
function ToolCard({ title, description, onLaunch }) {
  return (
    <Card style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{
        width: 80, height: 60, borderRadius: 8, background: 'linear-gradient(135deg, #e8f0fe 0%, #d2e3fc 100%)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
      }}>
        <Icon name="map-pin" size={26} color={C.info} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 3 }}>{title}</div>
        <div style={{ fontSize: 13, color: C.text2, lineHeight: 1.4 }}>{description}</div>
      </div>
      <Button variant="outline" size="sm" onClick={onLaunch}>
        <Icon name="external-link" size={13} color={C.brand} /> Launch
      </Button>
    </Card>);

}

// ── Combined-Components.jsx content ──────────────────────────────
// Provides AI-first UI primitives: chat, mock tools, analytics, USPAP scanner

const { useState: useStateC, useEffect: useEffectC, useRef: useRefC, useMemo: useMemoC } = React;

// ── Phase metadata ───────────────────────────────────────────
const PHASES = [
{ id: 'pre', label: 'Pre-Program', color: '#7a8aa3', bg: '#eef2f8' },
{ id: 'p1', label: 'Phase 1 · Problem ID', color: '#7b1fa2', bg: '#f3e5f5' },
{ id: 'p2', label: 'Phase 2 · Inspection', color: '#1b5e20', bg: '#e8f5e9' },
{ id: 'p3', label: 'Phase 3 · Market & HBU', color: '#e65100', bg: '#fff8e1' },
{ id: 'p4', label: 'Phase 4 · Sales Analysis', color: '#880e4f', bg: '#fce4ec' },
{ id: 'p5', label: 'Phase 5 · Valuation', color: '#0d47a1', bg: '#e3f2fd' },
{ id: 'p6', label: 'Phase 6 · Reconciliation', color: '#33691e', bg: '#f1f8e9' },
{ id: 'p7', label: 'Phase 7 · Report', color: '#1a237e', bg: '#e8eaf6' },
{ id: 'p8', label: 'Phase 8 · Communication', color: '#bf360c', bg: '#fbe9e7' }];


// ── PhasePill ────────────────────────────────────────────────
function PhasePill({ phase, size = 'md' }) {
  const p = PHASES.find((x) => x.id === phase) || PHASES[0];
  const sz = size === 'sm' ? { fs: 10, py: 2, px: 8 } : { fs: 11, py: 4, px: 10 };
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      background: p.bg, color: p.color,
      padding: `${sz.py}px ${sz.px}px`, borderRadius: 999,
      fontSize: sz.fs, fontWeight: 700, letterSpacing: '.02em'
    }}>
      <span style={{ width: 6, height: 6, borderRadius: '50%', background: p.color }} />
      {p.label}
    </span>);

}

// ── AI Chip (denotes AI involvement) ─────────────────────────
function AIChip({ label = 'AI', size = 'md', tone = 'brand' }) {
  const sz = size === 'sm' ? { fs: 9, py: 1, px: 6 } : { fs: 10, py: 2, px: 8 };
  const tones = {
    brand: { bg: 'linear-gradient(90deg, #d60436 0%, #ff5577 100%)', color: '#fff' },
    dark: { bg: '#1a1d2b', color: '#fff' },
    soft: { bg: '#fff0f3', color: '#d60436' }
  };
  const t = tones[tone] || tones.brand;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 4,
      background: t.bg, color: t.color,
      padding: `${sz.py}px ${sz.px}px`, borderRadius: 4,
      fontSize: sz.fs, fontWeight: 800, letterSpacing: '.06em', textTransform: 'uppercase',
      fontFamily: "'JetBrains Mono', 'DM Sans', monospace"
    }}>
      <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="2.5" fill={tone === 'soft' ? '#d60436' : '#fff'} /></svg>
      {label}
    </span>);

}

// ── ProgressRing (SVG) ───────────────────────────────────────
function ProgressRing({ value = 0, size = 100, stroke = 8, color = '#d60436', track = '#f0f0f0', label, sub }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - value / 100 * c;
  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
        <circle cx={size / 2} cy={size / 2} r={r} stroke={color} strokeWidth={stroke} fill="none"
        strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 600ms cubic-bezier(0.4,0,0.2,1)' }} />
      </svg>
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', textAlign: 'center', lineHeight: 1.05
      }}>
        <div style={{ fontSize: size * 0.24, fontWeight: 800, color: '#292929', fontFamily: "'Nunito', sans-serif" }}>
          {label != null ? label : `${Math.round(value)}%`}
        </div>
        {sub && <div style={{ fontSize: size * 0.10, color: '#888', marginTop: 2, fontWeight: 600, letterSpacing: '.04em', textTransform: 'uppercase' }}>{sub}</div>}
      </div>
    </div>);

}

// ── Sparkline ────────────────────────────────────────────────
function Sparkline({ data, w = 220, h = 50, color = '#d60436', fill = 'rgba(214,4,54,0.10)' }) {
  if (!data || !data.length) return null;
  const min = Math.min(...data),max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = i / (data.length - 1) * (w - 4) + 2;
    const y = h - 4 - (v - min) / range * (h - 8);
    return [x, y];
  });
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');
  const area = `${path} L ${pts[pts.length - 1][0]} ${h} L ${pts[0][0]} ${h} Z`;
  return (
    <svg width={w} height={h} style={{ display: 'block' }}>
      <path d={area} fill={fill} />
      <path d={path} stroke={color} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => i === pts.length - 1 &&
      <circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill={color} stroke="#fff" strokeWidth="1.5" />
      )}
    </svg>);

}

// ── BarMini ──────────────────────────────────────────────────
function BarMini({ data, w = 220, h = 60, color = '#d60436' }) {
  const max = Math.max(...data) || 1;
  const bw = (w - (data.length - 1) * 4) / data.length;
  return (
    <svg width={w} height={h}>
      {data.map((v, i) => {
        const bh = v / max * (h - 4);
        return <rect key={i} x={i * (bw + 4)} y={h - bh} width={bw} height={bh} rx="2" fill={color} opacity={0.4 + i / data.length * 0.6} />;
      })}
    </svg>);

}

// ── PhaseRoadmap (horizontal stepper across all 8 phases) ────
function PhaseRoadmap({ currentPhase = 'p1', completedPhases = [] }) {
  const idx = PHASES.findIndex((p) => p.id === currentPhase);
  return (
    <div style={{ display: 'flex', alignItems: 'stretch', gap: 0, width: '100%' }}>
      {PHASES.slice(1).map((p, i) => {
        const isCurrent = p.id === currentPhase;
        const isDone = completedPhases.includes(p.id) || idx > 0 && i < idx - 1;
        const bg = isDone ? '#1a9e5c' : isCurrent ? p.color : '#e8e8e8';
        const fg = isDone || isCurrent ? '#fff' : '#888';
        return (
          <div key={p.id} style={{
            flex: 1, padding: '10px 8px', background: bg, color: fg,
            position: 'relative', clipPath: i === 0 ? 'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%)' :
            i === PHASES.length - 2 ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%, 12px 50%)' :
            'polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%, 12px 50%)',
            marginLeft: i === 0 ? 0 : -8,
            zIndex: isCurrent ? 10 : PHASES.length - i,
            display: 'flex', flexDirection: 'column', gap: 1,
            transition: 'all 200ms'
          }}>
            <div style={{ fontSize: 9, fontWeight: 700, opacity: 0.85, letterSpacing: '.05em' }}>STEP {i + 1}</div>
            <div style={{ fontSize: 10.5, fontWeight: 700, lineHeight: 1.15 }}>{p.label.replace(/^Phase \d+ · /, '')}</div>
          </div>);

      })}
    </div>);

}

// ── Compression Curve (the AI-first "speed" graph) ───────────
function CompressionCurve({ height = 120, width = 360 }) {
  // Time per assignment over 24 sessions — declining curve
  const data = [148, 142, 138, 130, 126, 122, 115, 110, 108, 102, 98, 94, 88, 84, 80, 76, 73, 70, 68, 66, 63, 61, 59, 57];
  const pad = { l: 32, r: 12, t: 12, b: 22 };
  const w = width - pad.l - pad.r,h = height - pad.t - pad.b;
  const max = 160,min = 40;
  const x = (i) => pad.l + i / (data.length - 1) * w;
  const y = (v) => pad.t + h - (v - min) / (max - min) * h;
  const path = data.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(v)}`).join(' ');
  const area = `${path} L ${x(data.length - 1)} ${pad.t + h} L ${x(0)} ${pad.t + h} Z`;
  const gridY = [40, 80, 120, 160];

  return (
    <svg width={width} height={height} style={{ display: 'block' }}>
      <defs>
        <linearGradient id="ccGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d60436" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#d60436" stopOpacity="0" />
        </linearGradient>
      </defs>
      {gridY.map((g) =>
      <g key={g}>
          <line x1={pad.l} y1={y(g)} x2={pad.l + w} y2={y(g)} stroke="#f0f0f0" />
          <text x={pad.l - 6} y={y(g) + 3} fontSize="9" fill="#888" textAnchor="end" fontFamily="DM Sans">{g}m</text>
        </g>
      )}
      <path d={area} fill="url(#ccGrad)" />
      <path d={path} stroke="#d60436" strokeWidth="2" fill="none" strokeLinecap="round" />
      {data.map((v, i) => i % 4 === 0 && <circle key={i} cx={x(i)} cy={y(v)} r="2.5" fill="#d60436" />)}
      <circle cx={x(data.length - 1)} cy={y(data[data.length - 1])} r="4.5" fill="#d60436" stroke="#fff" strokeWidth="2" />
      <text x={pad.l} y={height - 4} fontSize="9" fill="#888" fontFamily="DM Sans">Session 1</text>
      <text x={pad.l + w} y={height - 4} fontSize="9" fill="#888" textAnchor="end" fontFamily="DM Sans">Session 24</text>
    </svg>);

}

// ── ChatBubble (AI conversation) ─────────────────────────────
function ChatBubble({ from, name, avatar, role, time, children, accent }) {
  const isAI = from === 'ai' || from === 'persona';
  const isUser = from === 'user';
  return (
    <div style={{
      display: 'flex', gap: 10, marginBottom: 14,
      flexDirection: isUser ? 'row-reverse' : 'row'
    }}>
      {avatar ?
      <img src={avatar} alt={name || ''} style={{ width: 34, height: 34, borderRadius: '50%', objectFit: 'cover', flexShrink: 0, border: '2px solid #fff', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }} /> :

      <div style={{
        width: 34, height: 34, borderRadius: '50%', flexShrink: 0,
        background: isAI ? 'linear-gradient(135deg, #d60436, #ff5577)' : '#e8e8e8',
        color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 12, fontWeight: 800
      }}>
          {isAI ? 'AI' : (name || '?').split(' ').map((w) => w[0]).slice(0, 2).join('')}
        </div>
      }
      <div style={{ maxWidth: '78%', display: 'flex', flexDirection: 'column', alignItems: isUser ? 'flex-end' : 'flex-start' }}>
        {(name || role) &&
        <div style={{ fontSize: 11, color: '#888', marginBottom: 3, display: 'flex', gap: 6, alignItems: 'center' }}>
            <span style={{ fontWeight: 700, color: '#292929' }}>{name}</span>
            {role && <span>{role}</span>}
            {time && <span>· {time}</span>}
            {isAI && from === 'ai' && <AIChip label="Socratic" size="sm" tone="dark" />}
          </div>
        }
        <div style={{
          background: isUser ? '#d60436' : isAI ? '#1a1d2b' : '#fff',
          color: isUser ? '#fff' : isAI ? '#fff' : '#292929',
          padding: '10px 14px', borderRadius: 12,
          borderTopLeftRadius: isUser ? 12 : 4, borderTopRightRadius: isUser ? 4 : 12,
          fontSize: 13.5, lineHeight: 1.5,
          border: !isAI && !isUser ? '1px solid #e8e8e8' : 'none',
          boxShadow: !isAI && !isUser ? '0 1px 2px rgba(0,0,0,0.04)' : 'none',
          ...(accent ? { borderLeft: `3px solid ${accent}` } : {})
        }}>
          {children}
        </div>
      </div>
    </div>);

}

// ── MockToolFrame (PropMix / True Footage / Apex Sketch chrome) ─
function MockToolFrame({ tool = 'PropMix', tab, children, height = 380, status = 'live' }) {
  const tools = {
    PropMix: { color: '#0a6ed1', bg: '#eaf3ff', accent: '#0a6ed1', logo: 'P' },
    'True Footage': { color: '#1f6f5b', bg: '#e8f5ef', accent: '#1f6f5b', logo: 'T' },
    'Apex Sketch': { color: '#6f3fb5', bg: '#f0e9fb', accent: '#6f3fb5', logo: 'A' },
    'CoreLogic': { color: '#0066b3', bg: '#e6f1fa', accent: '#0066b3', logo: 'C' },
    'HouseCanary': { color: '#16a34a', bg: '#e7f8ee', accent: '#16a34a', logo: 'H' },
    'Matterport': { color: '#0a85ff', bg: '#e6f1ff', accent: '#0a85ff', logo: 'M' }
  };
  const t = tools[tool] || tools.PropMix;
  return (
    <div style={{
      border: '1px solid #d8d8d8', borderRadius: 10, overflow: 'hidden',
      background: '#fff', display: 'flex', flexDirection: 'column',
      boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '8px 12px', background: t.bg, borderBottom: `1px solid ${t.accent}33`
      }} data-comment-anchor="4cd20db30f-div-253-7">
        <div style={{
          width: 22, height: 22, borderRadius: 5, background: t.color, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: 12, fontFamily: "'Nunito', sans-serif"
        }}>{t.logo}</div>
        <div style={{ fontSize: 12.5, fontWeight: 700, color: t.color }}>{tool}</div>
        {tab && <div style={{ fontSize: 11, color: '#666' }}>· {tab}</div>}
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', gap: 5, alignItems: 'center', fontSize: 10, color: '#666', fontFamily: "'JetBrains Mono', monospace" }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: status === 'live' ? '#1a9e5c' : '#888', boxShadow: status === 'live' ? '0 0 6px #1a9e5c' : 'none' }} />
          {status === 'live' ? 'LIVE · API connected' : status.toUpperCase()}
        </div>
      </div>
      <div style={{ padding: 14, height, overflow: 'auto', background: '#fafbfc' }}>
        {children}
      </div>
    </div>);

}

// ── USPAPScanner Rail ────────────────────────────────────────
function USPAPScanner({ items, strictness = 'normal' }) {
  // items: [{ code, label, status: 'ok' | 'warn' | 'fail' | 'pending' }]
  const map = {
    ok: { color: '#1a9e5c', bg: '#edfbf4', icon: 'check', label: 'Resolved' },
    warn: { color: '#e8860a', bg: '#fff8ec', icon: 'alert-triangle', label: 'Pending' },
    fail: { color: '#d60436', bg: '#fff0f3', icon: 'x', label: 'Flag' },
    pending: { color: '#888', bg: '#f0f0f0', icon: 'clock', label: 'Later' }
  };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6 }}>
        <AIChip label="Mentor Pre-Screen" size="sm" tone="dark" />
        <span style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 700 }}>Strictness: {strictness}</span>
      </div>
      {items.map((it, i) => {
        const m = map[it.status] || map.pending;
        return (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '8px 10px', background: m.bg, borderRadius: 6,
            border: `1px solid ${m.color}22`
          }}>
            <div style={{
              width: 18, height: 18, borderRadius: 4, background: m.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <Icon name={m.icon} size={11} color="#fff" strokeWidth={3} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#292929', fontFamily: "'JetBrains Mono', monospace" }}>{it.code}</div>
              <div style={{ fontSize: 11, color: '#555', lineHeight: 1.3, marginTop: 1 }}>{it.label}</div>
            </div>
          </div>);

      })}
    </div>);

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
      border: isApproved ? '1px solid #1a9e5c33' : isPending ? '1px solid #e8860a33' : 'none'
    }}>
      <span style={{ fontSize: 13 }}>⚑</span>
      Mentor Review {n}
      {isApproved && <Icon name="check-circle" size={13} />}
    </div>);

}

// ── CohortFeedItem ───────────────────────────────────────────
const COHORT_FEED = [
{ name: 'Amara K.', avatar: 'https://i.pravatar.cc/64?img=47', action: 'submitted Report 1 for Mentor Review 8', phase: 'p8', time: '12 min ago' },
{ name: 'Takeshi R.', avatar: 'https://i.pravatar.cc/64?img=12', action: 'completed Adjustment Grid · 4 overrides defended', phase: 'p5', time: '38 min ago' },
{ name: 'Priya N.', avatar: 'https://i.pravatar.cc/64?img=45', action: 'cleared Mentor Review 3 (Market & HBU)', phase: 'p3', time: '1 hr ago' },
{ name: 'Diego A.', avatar: 'https://i.pravatar.cc/64?img=33', action: 'finalized GLA in Apex Sketch · 2,148 sq ft', phase: 'p2', time: '2 hr ago' },
{ name: 'Lena O.', avatar: 'https://i.pravatar.cc/64?img=49', action: 'opened comp selection · MLS scan', phase: 'p4', time: '3 hr ago' },
{ name: 'Marcus P.', avatar: 'https://i.pravatar.cc/64?img=15', action: 'AI flagged USPAP SR1-3 · revising HBU', phase: 'p3', time: '4 hr ago' },
{ name: 'Yuki T.', avatar: 'https://i.pravatar.cc/64?img=44', action: 'started Report 2 · FHA Refinance', phase: 'p1', time: '5 hr ago' }];


function CohortFeedItem({ item, compact }) {
  const p = PHASES.find((x) => x.id === item.phase) || PHASES[0];
  return (
    <div style={{
      display: 'flex', gap: 10, padding: compact ? '8px 0' : '10px 0',
      borderBottom: '1px solid #f0f0f0', alignItems: 'flex-start'
    }}>
      <img src={item.avatar} alt={item.name} style={{ width: 28, height: 28, borderRadius: '50%', objectFit: 'cover' }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12.5, color: '#292929', lineHeight: 1.4 }}>
          <strong>{item.name}</strong> {item.action}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 3 }}>
          <span style={{ fontSize: 9.5, fontWeight: 700, color: p.color, textTransform: 'uppercase', letterSpacing: '.05em' }}>{p.label}</span>
          <span style={{ fontSize: 10.5, color: '#888' }}>· {item.time}</span>
        </div>
      </div>
    </div>);

}

// ── Stat Tile ────────────────────────────────────────────────
function StatTile({ label, value, sub, trend, color = '#d60436', icon }) {
  return (
    <div style={{
      background: '#fff', borderRadius: 10, padding: '14px 16px',
      border: '1px solid #eee', display: 'flex', flexDirection: 'column', gap: 4,
      flex: 1, minWidth: 0
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: 10.5, color: '#888', textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 700 }}>{label}</div>
        {icon && <Icon name={icon} size={14} color={color} />}
      </div>
      <div style={{ fontSize: 22, fontWeight: 800, color: '#292929', fontFamily: "'Nunito', sans-serif", lineHeight: 1.1 }}>{value}</div>
      {(sub || trend) &&
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
          {trend &&
        <span style={{ color: trend.startsWith('-') ? '#1a9e5c' : trend.startsWith('+') ? '#1a9e5c' : '#888', fontWeight: 700 }}>
              {trend}
            </span>
        }
          {sub && <span style={{ color: '#888' }}>{sub}</span>}
        </div>
      }
    </div>);

}

// ── Subject property data (Report 1) ─────────────────────────
const SUBJECT = {
  address: '4218 Ridgewood Lane',
  city: 'Glenmoor, OH 44023',
  photo: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80',
  type: 'Condominium', style: 'Mid-Rise Condo',
  yearBuilt: 2008, gla: 2148, beds: 4, baths: 2.5, lot: 0.31,
  garage: '2-car attached', basement: 'Full, finished',
  apn: '14-022-37-104', zone: 'R-1 (Single-Family Residential)',
  floodZone: 'X (minimal risk)', purchasePrice: 492000
};

const COMPS = [
{ id: 'C1', address: '4109 Ridgewood Ln', dist: 0.18, gla: 2090, beds: 4, baths: 2.5, age: 17, sale: 478000, sold: '2026-02-14', dom: 9, aiScore: 96, photo: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&q=80' },
{ id: 'C2', address: '3884 Cedar Hollow Dr', dist: 0.42, gla: 2210, beds: 4, baths: 3, age: 16, sale: 495000, sold: '2026-01-28', dom: 14, aiScore: 92, photo: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=400&q=80' },
{ id: 'C3', address: '4502 Birchwood Ct', dist: 0.31, gla: 2055, beds: 4, baths: 2.5, age: 19, sale: 466000, sold: '2025-12-08', dom: 21, aiScore: 89, photo: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=400&q=80' },
{ id: 'C4', address: '4071 Glen Ridge Way', dist: 0.55, gla: 2240, beds: 5, baths: 3, age: 14, sale: 512000, sold: '2026-03-02', dom: 6, aiScore: 87, photo: 'https://images.unsplash.com/photo-1576941089067-2de3c901e126?w=400&q=80' },
{ id: 'C5', address: '3922 Maple Crest Dr', dist: 0.68, gla: 1980, beds: 3, baths: 2.5, age: 18, sale: 449000, sold: '2026-01-04', dom: 18, aiScore: 78, photo: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=400&q=80' }];


const MENTOR = {
  name: 'James Mendel, MAI',
  role: 'Lead Mentor · Cohort 04',
  avatar: 'https://i.pravatar.cc/128?img=68',
  yearsExperience: 23,
  nextOH: 'Thu 3:00 PM ET'
};

const PERSONAS = {
  maya: {
    name: 'Maya Chen',
    role: 'Loan Officer · First Summit Bank',
    avatar: 'https://i.pravatar.cc/128?img=48',
    tone: 'Professional, deal-pressured'
  },
  david: {
    name: 'David Osei',
    role: 'Homeowner · 4218 Ridgewood Ln',
    avatar: 'https://i.pravatar.cc/128?img=59',
    tone: 'Cooperative, schedule-constrained'
  }
};

// ── Patch avatar URLs after data objects are defined ──────────────
MENTOR.avatar = svgAvatar('James Mendel', 128);
PERSONAS.maya.avatar = svgAvatar('Maya Chen', 128);
PERSONAS.david.avatar = svgAvatar('David Osei', 128);
COHORT_FEED.forEach(item => { item.avatar = svgAvatar(item.name.replace('.',''), 64); });

// ── Combined-Additions.jsx content ───────────────────────────────
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
{ id: 'p1', label: 'Step 1 · Problem ID', color: '#7b1fa2', bg: '#f3e5f5' },
{ id: 'p2', label: 'Step 2 · Inspection', color: '#1b5e20', bg: '#e8f5e9' },
{ id: 'p3', label: 'Step 3 · Market & HBU', color: '#e65100', bg: '#fff8e1' },
{ id: 'p4', label: 'Step 4 · Sales Analysis', color: '#880e4f', bg: '#fce4ec' },
{ id: 'p5', label: 'Step 5 · Valuation', color: '#0d47a1', bg: '#e3f2fd' },
{ id: 'p6', label: 'Step 6 · Reconciliation', color: '#33691e', bg: '#f1f8e9' },
{ id: 'p7', label: 'Step 7 · Report', color: '#1a237e', bg: '#e8eaf6' },
{ id: 'p8', label: 'Step 8 · Communication', color: '#bf360c', bg: '#fbe9e7' }];

// Mirror onto window.PHASES so existing screens keep working with new labels.
// (Existing components read PHASES.find(...).label — just change the labels.)
// Patch PHASES with STEPS labels
PHASES.forEach((p, i) => {if (STEPS[i]) p.label = STEPS[i].label;});

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
    'Price not affected by special financing'],

    whyItMatters: 'A fuzzy definition of value is the #1 source of bad assignment results. Anchor every report on this — re-read it whenever your gut tries to default to "what the contract says."'
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
    'Assignment conditions (extraordinary assumptions, hypothetical conditions, jurisdictional exceptions)'],

    whyItMatters: 'A scope of work that misses any of these elements does not satisfy USPAP. Period.'
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
    'Garages, porches, decks: never GLA'],

    whyItMatters: 'GLA disagreements between MLS, tax records, and your measurement are routine. ANSI is your defensible standard — cite it.'
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
    'Comparability is judgment — defend every pick'],

    whyItMatters: 'If your three comps are wrong, every downstream number is wrong. This is where most reports fail review.'
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
    'Skipping any test = HBU is wrong by definition'],

    whyItMatters: 'New appraisers most commonly argue "maximally productive" without showing "financially feasible." Show all four tests, in order, every time.'
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
    'Lump-sum adjustments allowed but must be defensible'],

    whyItMatters: 'When a board complaint reaches review, "I used $30/sf because everyone does" is not a defense.'
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
    'Rounding is acceptable — disclose it'],

    whyItMatters: 'Boards specifically test for averaging. Show that you reasoned.'
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
    'Disclose extraordinary assumptions / hypothetical conditions'],

    whyItMatters: 'Ethics violations are the fastest path to board discipline. There is no "soft" version of these rules.'
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
    'AI tool outputs must be retained too — including what you overrode'],

    whyItMatters: 'If a state board asks for your workfile, you have 5 business days. "I lost it" is not a defense.'
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
    'If you overrode the tool, document why'],

    whyItMatters: 'Boards and lenders are increasingly asking how you verified AI outputs. Have an answer.'
  }
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
      transition: 'all 150ms cubic-bezier(0.4,0,0.2,1)'
    }}
    onMouseEnter={(e) => {e.currentTarget.style.background = '#dfecff';e.currentTarget.style.transform = 'translateY(-1px)';}}
    onMouseLeave={(e) => {e.currentTarget.style.background = '#eaf3ff';e.currentTarget.style.transform = 'translateY(0)';}}>
      
      <div style={{
        width: 32, height: 36, borderRadius: 4, flexShrink: 0,
        background: `linear-gradient(135deg, ${accent}, #4d94e0)`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '1px 1px 0 rgba(0,0,0,0.08)'
      }}>
        <Icon name="book-open" size={16} color="#fff" />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
          <span style={{
            fontSize: 9.5, fontWeight: 800, color: accent,
            letterSpacing: '.08em', textTransform: 'uppercase'
          }}>McKissock Textbook</span>
          <span style={{ fontSize: 10.5, color: '#888', fontFamily: "'JetBrains Mono', monospace" }}>· {entry.chapter}</span>
        </div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#292929', fontFamily: "'Nunito', sans-serif", lineHeight: 1.25 }}>
          {label || entry.section}
        </div>
        {why &&
        <div style={{ fontSize: 11.5, color: '#666', marginTop: 4, lineHeight: 1.45 }}>
            <em>{why}</em>
          </div>
        }
        <div style={{
          marginTop: 6, fontSize: 11, fontWeight: 700, color: accent,
          display: 'inline-flex', alignItems: 'center', gap: 4
        }}>
          Open textbook reference
          <Icon name="arrow-right" size={11} color={accent} />
        </div>
      </div>
    </button>);

}

function TextbookModal({ topic, onClose }) {
  if (!topic) return null;
  const entry = MCKISSOCK_TEXTBOOK[topic];
  if (!entry) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(15,20,35,0.55)',
      zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 32, animation: 'fadeInUp 180ms ease both'
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: '#fff', borderRadius: 12, maxWidth: 720, width: '100%',
        maxHeight: '88vh', overflow: 'hidden', display: 'flex', flexDirection: 'column',
        boxShadow: '0 20px 60px rgba(0,0,0,0.25)'
      }}>
        {/* Header */}
        <div style={{
          padding: '18px 24px',
          background: 'linear-gradient(120deg, #0a6ed1 0%, #4d94e0 100%)',
          color: '#fff', display: 'flex', alignItems: 'center', gap: 14
        }}>
          <div style={{
            width: 44, height: 52, borderRadius: 4, flexShrink: 0,
            background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '2px 2px 0 rgba(0,0,0,0.12)'
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
            display: 'flex', alignItems: 'center', justifyContent: 'center'
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
            {entry.keyPoints.map((k, i) =>
            <li key={i} style={{ display: 'flex', gap: 10, fontSize: 13, color: '#444', lineHeight: 1.5 }}>
                <span style={{
                width: 18, height: 18, borderRadius: 4, flexShrink: 0,
                background: '#eaf3ff', color: '#0a6ed1',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10.5, fontWeight: 800, marginTop: 1
              }}>{i + 1}</span>
                {k}
              </li>
            )}
          </ul>
          <div style={{
            background: '#fff8ec', border: '1px solid #e8860a33', borderLeft: '3px solid #e8860a',
            borderRadius: 6, padding: '12px 14px'
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
          display: 'flex', alignItems: 'center', gap: 10, fontSize: 11.5, color: '#888'
        }}>
          <Icon name="bookmark" size={13} color="#0a6ed1" />
          <span>Foundational reference · returns to where you left off when you close this</span>
          <div style={{ flex: 1 }} />
          <Button variant="primary" size="sm" onClick={onClose}>Got it</Button>
        </div>
      </div>
    </div>);

}

// ═══════════════════════════════════════════════════════════
// "Verify this" callout — distinct from textbook, applies to tool outputs
// ═══════════════════════════════════════════════════════════
function VerifyThisCallout({ tool, claim, verifySteps, compact }) {
  const toolColors = {
    'PropMix': '#0a6ed1', 'True Footage': '#1f6f5b', 'Apex Sketch': '#6f3fb5',
    'Apex': '#6f3fb5', 'Matterport': '#0a85ff', 'CoreLogic': '#0066b3',
    'HouseCanary': '#16a34a', 'AI': '#d60436', 'AVM': '#0066b3'
  };
  const tc = toolColors[tool] || '#d60436';
  return (
    <div style={{
      background: 'linear-gradient(135deg, #fff8ec 0%, #fff5ec 100%)',
      border: '1px solid #e8860a55',
      borderLeft: '3px solid #d60436',
      borderRadius: 8, padding: compact ? '10px 12px' : '14px 16px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <div style={{
          width: 22, height: 22, borderRadius: 5, flexShrink: 0,
          background: '#d60436', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Icon name="shield-alert" size={12} color="#fff" strokeWidth={2.4} />
        </div>
        <div style={{ fontSize: 10.5, fontWeight: 800, color: '#d60436', letterSpacing: '.08em', textTransform: 'uppercase' }}>
          Don't trust — verify
        </div>
        {tool &&
        <span style={{
          marginLeft: 'auto', fontSize: 10, fontWeight: 700, color: tc,
          background: '#fff', padding: '2px 8px', borderRadius: 4,
          border: `1px solid ${tc}44`,
          fontFamily: "'JetBrains Mono', monospace"
        }}>
            from {tool}
          </span>
        }
      </div>
      {claim &&
      <div style={{
        fontSize: 12.5, fontWeight: 700, color: '#292929', marginBottom: 8,
        background: '#fff', padding: '8px 10px', borderRadius: 5,
        border: '1px dashed #e8860a66',
        fontFamily: "'JetBrains Mono', monospace"
      }}>
          {claim}
        </div>
      }
      <div style={{ fontSize: 11.5, color: '#7a4400', fontWeight: 700, marginBottom: 6 }}>
        Before you accept this, verify it yourself:
      </div>
      <ol style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 5, margin: 0 }}>
        {verifySteps.map((s, i) =>
        <li key={i} style={{ display: 'flex', gap: 8, fontSize: 12, color: '#444', lineHeight: 1.45 }}>
            <span style={{
            width: 16, height: 16, borderRadius: '50%', flexShrink: 0,
            background: '#fff', border: '1.5px solid #e8860a', color: '#e8860a',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 9.5, fontWeight: 800, marginTop: 1
          }}>{i + 1}</span>
            <span>{s}</span>
          </li>
        )}
      </ol>
      <div style={{
        marginTop: 10, paddingTop: 10, borderTop: '1px dashed #e8860a44',
        fontSize: 10.5, color: '#7a4400', fontStyle: 'italic'
      }}>
        Tools are not USPAP-compliant — your <strong>use</strong> of them is. The credibility of this number is on you.
      </div>
    </div>);

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
    { id: 'wf-seed-3', step: 'p2', label: 'Apex sketch · subject GLA reconciled', source: 'Apex Sketch', kind: 'screenshot', ts: Date.now() - 12 * 3600000 }],

    'report-2': [],
    'report-3': []
  };
}
function saveWorkfile(wf) {
  try {localStorage.setItem(WORKFILE_KEY, JSON.stringify(wf));} catch (e) {}
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
      position: 'fixed', bottom: 22, left: 22, zIndex: 90,
      animation: 'fadeInUp 240ms cubic-bezier(0.4,0,0.2,1) both'
    }}>
      <button onClick={handleCapture} disabled={saved}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        background: saved ? '#1a9e5c' : 'linear-gradient(135deg, #292929, #1a1d2b)',
        color: '#fff', border: 'none', cursor: saved ? 'default' : 'pointer',
        padding: '11px 18px 11px 14px', borderRadius: 999,
        boxShadow: '0 6px 20px rgba(0,0,0,0.22)',
        fontFamily: 'inherit', fontSize: 13, fontWeight: 700,
        transition: 'all 180ms cubic-bezier(0.4,0,0.2,1)'
      }}>
        <div style={{
          width: 26, height: 26, borderRadius: '50%',
          background: saved ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Icon name={saved ? 'check' : 'camera'} size={13} color="#fff" strokeWidth={2.4} />
        </div>
        {saved ? 'Captured to workfile' : 'Capture to workfile'}
      </button>
      {!saved &&
      <div style={{
        marginLeft: 8, marginTop: 6, fontSize: 10.5, color: '#888',
        fontFamily: "'JetBrains Mono', monospace"
      }}>
          USPAP requires retained evidence · 5 yr
        </div>
      }
    </div>);

}

// ═══════════════════════════════════════════════════════════
// WorkfileGate — hard-gate on AI-output screens: must capture to advance
// ═══════════════════════════════════════════════════════════
function WorkfileGate({ step, label, source, children, report = 'report-1' }) {
  const [captured, setCaptured] = useSA(false);
  const handleCapture = () => {
    addToWorkfile(report, { step, label, source, kind: 'screenshot' });
    setCaptured(true);
  };
  return (
    <div style={{
      background: captured ? '#edfbf4' : '#fff8ec',
      border: `1.5px solid ${captured ? '#1a9e5c55' : '#e8860a66'}`,
      borderRadius: 10, padding: 14, marginBottom: 14,
      transition: 'all 200ms cubic-bezier(0.4,0,0.2,1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 40, height: 40, borderRadius: 8, flexShrink: 0,
          background: captured ? '#1a9e5c' : '#e8860a',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Icon name={captured ? 'check' : 'camera'} size={18} color="#fff" strokeWidth={2.2} />
        </div>
        <div style={{ flex: 1 }} data-comment-anchor="44d49f9950-div-514-9">
          <div style={{ fontSize: 13, fontWeight: 800, color: captured ? '#0d4a2e' : '#7a4400', fontFamily: "'Nunito', sans-serif" }}>
            {captured ? 'Captured · evidence preserved' : 'Capture this output before you advance'}
          </div>
          <div style={{ fontSize: 11.5, color: captured ? '#0d4a2e' : '#7a4400', marginTop: 2, opacity: 0.85 }}>
            {captured ?
            `"${label}" added to your Report 1 workfile.` :
            `AI/tool outputs go in your workfile — including ones you override. Source: ${source}.`}
          </div>
          {children && <div style={{ marginTop: 6, fontSize: 11.5, color: '#444', lineHeight: 1.5 }}>{children}</div>}
        </div>
        {!captured &&
        <button onClick={handleCapture} style={{
          background: '#e8860a', color: '#fff', border: 'none', cursor: 'pointer',
          padding: '9px 14px', borderRadius: 7, fontWeight: 700, fontSize: 12.5,
          fontFamily: 'inherit', whiteSpace: 'nowrap',
          display: 'flex', alignItems: 'center', gap: 6
        }}>
            <Icon name="camera" size={13} color="#fff" strokeWidth={2.2} />
            Capture screenshot
          </button>
        }
      </div>
    </div>);

}

// ═══════════════════════════════════════════════════════════
// WorkfileDashboardCard — pinned on the Dashboard
// ═══════════════════════════════════════════════════════════
function WorkfileDashboardCard({ navigate }) {
  const [report, setReport] = useSA('report-1');
  const items = useWorkfile(report);
  const REPORTS = [
  { id: 'report-1', label: 'Report 1', sub: 'Conv. Purchase', active: true },
  { id: 'report-2', label: 'Report 2', sub: 'FHA Refi', active: false },
  { id: 'report-3', label: 'Report 3', sub: 'REO', active: false }];

  return (
    <Card padding={0} style={{ overflow: 'hidden' }}>
      <div style={{
        padding: '14px 18px',
        background: 'linear-gradient(135deg, #292929 0%, #1a1d2b 100%)',
        color: '#fff', display: 'flex', alignItems: 'center', gap: 12
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8, flexShrink: 0,
          background: 'rgba(255,255,255,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Icon name="folder-open" size={18} color="#fff" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13.5, fontWeight: 800, fontFamily: "'Nunito', sans-serif" }}>Active Workfile</div>
          <div style={{ fontSize: 10.5, color: '#cbd0e0', letterSpacing: '.04em' }}>{items.length} item{items.length === 1 ? '' : 's'} captured · 5-yr retention</div>
        </div>
      </div>
      {/* Report switcher */}
      <div style={{ display: 'flex', gap: 4, padding: '10px 12px 0', background: '#fafbfc' }}>
        {REPORTS.map((r) =>
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
          marginBottom: -1, position: 'relative'
        }}>
            <span>{r.label}</span>
            <span style={{ fontSize: 9.5, fontWeight: 500, color: report === r.id ? '#888' : 'inherit' }}>{r.sub}</span>
            {!r.active && <span style={{ position: 'absolute', top: 4, right: 4, fontSize: 9, color: '#bbb' }}>locked</span>}
          </button>
        )}
      </div>
      {/* Recent items */}
      <div style={{ padding: '12px 16px 8px', maxHeight: 200, overflowY: 'auto' }}>
        {items.length === 0 ?
        <div style={{ padding: '20px 8px', textAlign: 'center', color: '#888', fontSize: 12 }}>
            No items yet — capture as you work.
          </div> :
        items.slice(0, 5).map((it) =>
        <div key={it.id} style={{ display: 'flex', gap: 10, padding: '7px 0', borderBottom: '1px solid #f4f4f4', alignItems: 'center' }}>
            <div style={{
            width: 26, height: 26, borderRadius: 5, flexShrink: 0,
            background: it.kind === 'screenshot' ? '#eaf3ff' : it.kind === 'note' ? '#fff8ec' : '#f4f5f7',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
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
        )}
      </div>
      <div style={{ padding: '10px 14px 14px', display: 'flex', gap: 8 }}>
        <Button variant="outline" size="sm" onClick={() => navigate('workfile')} fullWidth>
          <Icon name="folder-open" size={12} color="#d60436" /> Open workfile
        </Button>
      </div>
    </Card>);

}

function relTime(ts) {
  const diff = Date.now() - ts;
  if (diff < 60_000) return 'just now';
  if (diff < 3_600_000) return Math.floor(diff / 60_000) + 'm ago';
  if (diff < 86_400_000) return Math.floor(diff / 3_600_000) + 'h ago';
  return Math.floor(diff / 86_400_000) + 'd ago';
}

// ═══════════════════════════════════════════════════════════
// MentorRubric — 4-point scale with per-cell descriptors
// ═══════════════════════════════════════════════════════════
function MentorRubric({ criteria, overall, feedback, mentor, asyncMeta, gapReferences = [], onOpenTextbook }) {
  // criteria: [{ label, score (1-4), descriptors: { 4: '...', 3: '...', 2: '...', 1: '...' }, gap?: textbook topic }]
  const max = 4;
  const total = criteria.reduce((s, c) => s + c.score, 0);
  const maxTotal = criteria.length * max;
  const pct = total / maxTotal * 100;
  const verdict = pct >= 87 ? { label: 'Approved · no revisions', color: '#1a9e5c', bg: '#edfbf4' } :
  pct >= 75 ? { label: 'Approved with notes', color: '#1a9e5c', bg: '#edfbf4' } :
  pct >= 60 ? { label: 'Revisions recommended', color: '#e8860a', bg: '#fff8ec' } :
  { label: 'Revisions required', color: '#d60436', bg: '#fff0f3' };
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
        fontSize: 11, color: '#666'
      }}>
        <Icon name="clock" size={13} color="#888" />
        <strong style={{ color: '#292929' }}>Asynchronous review</strong>
        <span>· {asyncMeta || 'Mentor responded 6h ago · turnaround 24 hr typical'}</span>
      </div>

      {/* Header w/ overall score */}
      <div style={{
        padding: '20px 24px',
        background: '#1a1d2b',
        color: '#fff', display: 'flex', alignItems: 'center', gap: 20
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
            fontSize: 10.5, fontWeight: 800, letterSpacing: '.04em', textTransform: 'uppercase'
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
          borderBottom: '1px solid #eee'
        }}>
          <div>Criterion</div>
          {[4, 3, 2, 1].map((s) =>
          <div key={s} style={{ textAlign: 'center', color: scoreColor(s) }}>
              {s === 4 ? 'Exemplary' : s === 3 ? 'Proficient' : s === 2 ? 'Developing' : 'Needs Work'}
              <div style={{ fontSize: 10, opacity: 0.7, fontWeight: 700 }}>{s}/4</div>
            </div>
          )}
          <div style={{ textAlign: 'right' }}>Score</div>
        </div>

        {/* criterion rows */}
        {criteria.map((c, idx) =>
        <div key={idx} style={{ borderBottom: '1px solid #f4f4f4' }}>
            <div style={{
            display: 'grid', gridTemplateColumns: '1.6fr repeat(4, 1fr) 60px',
            gap: 0, padding: '12px 18px', alignItems: 'stretch'
          }}>
              <div style={{ paddingRight: 14, alignSelf: 'center' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#292929' }}>{c.label}</div>
                {c.desc && <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{c.desc}</div>}
              </div>
              {[4, 3, 2, 1].map((s) => {
              const active = c.score === s;
              return (
                <div key={s} style={{
                  padding: '8px 8px',
                  background: active ? `${scoreColor(s)}11` : '#fafbfc',
                  border: active ? `1.5px solid ${scoreColor(s)}` : '1px solid #f0f0f0',
                  borderRadius: 6, margin: '0 3px',
                  fontSize: 10.5, lineHeight: 1.4, color: active ? '#292929' : '#888',
                  fontWeight: active ? 600 : 500,
                  position: 'relative'
                }}>
                    {active &&
                  <div style={{
                    position: 'absolute', top: -7, right: -6,
                    width: 18, height: 18, borderRadius: '50%',
                    background: scoreColor(s), color: '#fff',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.18)'
                  }}>
                        <Icon name="check" size={10} color="#fff" strokeWidth={3} />
                      </div>
                  }
                    {c.descriptors?.[s] || '—'}
                  </div>);

            })}
              <div style={{ alignSelf: 'center', textAlign: 'right', fontWeight: 800, fontSize: 16, color: scoreColor(c.score), fontFamily: "'Nunito', sans-serif" }}>
                {c.score}/4
              </div>
            </div>
            {c.note &&
          <div style={{
            padding: '0 18px 12px',
            fontSize: 12, color: '#444', lineHeight: 1.55,
            display: 'flex', gap: 10, alignItems: 'flex-start'
          }}>
                <Icon name="message-square" size={12} color={scoreColor(c.score)} />
                <div style={{ flex: 1 }}>
                  <strong style={{ color: scoreColor(c.score) }}>Mentor's note · </strong>{c.note}
                </div>
              </div>
          }
            {c.gap &&
          <div style={{ padding: '0 18px 14px' }}>
                <TextbookCallout
              topic={c.gap}
              why="Score below 3/4 on a foundational topic — review this before revising."
              onOpen={onOpenTextbook} />
            
              </div>
          }
          </div>
        )}
      </div>

      {/* Mentor narrative + textbook gaps */}
      <div style={{ padding: '18px 22px', background: '#fafbfc', borderTop: '1px solid #eee' }}>
        <div style={{ fontSize: 10.5, fontWeight: 800, color: '#888', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 6 }}>
          Mentor's written feedback
        </div>
        <div style={{
          background: '#fff', borderRadius: 8, padding: '14px 16px',
          border: '1px solid #eee', fontSize: 13, color: '#292929', lineHeight: 1.65, fontStyle: 'italic'
        }}>
          "{feedback}"
        </div>
        {gapReferences.length > 0 &&
        <div style={{ marginTop: 14 }}>
            <div style={{ fontSize: 10.5, fontWeight: 800, color: '#0a6ed1', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 8 }}>
              Foundational references · review before revising
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {gapReferences.map((g, i) =>
            <TextbookCallout key={i} topic={g.topic} why={g.why} onOpen={onOpenTextbook} />
            )}
            </div>
          </div>
        }
      </div>
    </Card>);

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
{ code: 'Record Keeping', label: 'Workfile prepared · 5-year retention noted' }];


function StaticUSPAPChecklist({ title = 'USPAP self-check', items = STATIC_USPAP_CHECKLIST, printable = true }) {
  const [checked, setChecked] = useSA({});
  const toggle = (code) => setChecked((c) => ({ ...c, [code]: !c[code] }));
  return (
    <Card padding={0}>
      <div style={{
        padding: '14px 20px', borderBottom: '1px solid #eee',
        display: 'flex', alignItems: 'center', gap: 12
      }}>
        <div style={{
          width: 32, height: 32, borderRadius: 7, flexShrink: 0,
          background: '#f4f5f7',
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Icon name="list-checks" size={16} color="#292929" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13.5, fontWeight: 800, fontFamily: "'Nunito', sans-serif" }}>{title}</div>
          <div style={{ fontSize: 11, color: '#888', marginTop: 1 }}>Static self-check · you mark each item · not auto-graded · not AI-completed</div>
        </div>
        {printable &&
        <Button variant="outline" size="sm" onClick={() => window.print()}>
            <Icon name="printer" size={12} color="#d60436" /> Print
          </Button>
        }
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
              transition: 'background 120ms'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#fafbfc'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'none'}>
              
              <div style={{
                width: 20, height: 20, borderRadius: 4, flexShrink: 0,
                background: isChecked ? '#292929' : '#fff',
                border: `1.5px solid ${isChecked ? '#292929' : '#c8c8c8'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginTop: 2
              }}>
                {isChecked && <Icon name="check" size={12} color="#fff" strokeWidth={3} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: '#888', fontWeight: 700 }}>{it.code}</div>
                <div style={{ fontSize: 13, color: '#292929', marginTop: 1, lineHeight: 1.45,
                  textDecoration: isChecked ? 'line-through' : 'none',
                  opacity: isChecked ? 0.6 : 1
                }}>{it.label}</div>
              </div>
            </button>);

        })}
      </div>
      <div style={{
        padding: '10px 20px', background: '#fafbfc', borderTop: '1px solid #eee',
        display: 'flex', alignItems: 'center', gap: 10,
        fontSize: 11, color: '#666'
      }}>
        <Icon name="info" size={12} color="#888" />
        Marks are yours alone — not transmitted, not auto-graded. The checklist is a thinking aid, not a compliance certificate.
      </div>
    </Card>);

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
{ id: 'v6', title: 'Reconciliation: please stop averaging', length: '7:22', posted: '2 days ago', topic: 'Step 6 · Reconciliation', thumb: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=600&q=70' }];


function MentorVideoTile({ v, onPlay }) {
  return (
    <button onClick={() => onPlay(v)} style={{
      background: '#fff', border: '1px solid #eee', borderRadius: 10,
      padding: 0, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
      overflow: 'hidden', display: 'flex', flexDirection: 'column',
      transition: 'all 180ms cubic-bezier(0.4,0,0.2,1)'
    }}
    onMouseEnter={(e) => {e.currentTarget.style.transform = 'translateY(-2px)';e.currentTarget.style.boxShadow = '0 8px 22px rgba(0,0,0,0.10)';}}
    onMouseLeave={(e) => {e.currentTarget.style.transform = 'translateY(0)';e.currentTarget.style.boxShadow = 'none';}}>
      
      <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', background: '#1a1d2b' }}>
        <img src={v.thumb} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 50%, rgba(0,0,0,0.55))' }} />
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 52, height: 52, borderRadius: '50%',
          background: 'rgba(255,255,255,0.95)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(0,0,0,0.35)'
        }}>
          <Icon name="play" size={20} color="#d60436" strokeWidth={2.4} />
        </div>
        <div style={{
          position: 'absolute', bottom: 8, right: 8,
          background: 'rgba(0,0,0,0.7)', color: '#fff',
          padding: '2px 8px', borderRadius: 4, fontSize: 11, fontWeight: 700,
          fontFamily: "'JetBrains Mono', monospace"
        }}>{v.length}</div>
        <div style={{
          position: 'absolute', top: 8, left: 8,
          background: 'rgba(255,255,255,0.9)', color: '#d60436',
          padding: '2px 8px', borderRadius: 4, fontSize: 10, fontWeight: 800,
          letterSpacing: '.05em', textTransform: 'uppercase'
        }}>{v.topic}</div>
      </div>
      <div style={{ padding: '12px 14px 14px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#292929', lineHeight: 1.3, fontFamily: "'Nunito', sans-serif" }}>{v.title}</div>
        <div style={{ fontSize: 10.5, color: '#888', marginTop: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon name="user" size={10} color="#888" />
          James Mendel, MAI · posted {v.posted}
        </div>
      </div>
    </button>);

}

function MentorVideoModal({ video, onClose }) {
  if (!video) return null;
  return (
    <div onClick={onClose} style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.78)',
      zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 32, animation: 'fadeInUp 200ms ease both'
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: '#1a1d2b', borderRadius: 12, maxWidth: 920, width: '100%',
        overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.4)'
      }}>
        <div style={{ position: 'relative', aspectRatio: '16/9', background: '#000' }}>
          <img src={video.thumb} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.45 }} />
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 12, color: '#fff'
          }}>
            <div style={{
              width: 80, height: 80, borderRadius: '50%',
              background: 'rgba(214,4,54,0.95)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 6px 20px rgba(214,4,54,0.45)'
            }}>
              <Icon name="play" size={32} color="#fff" strokeWidth={2.4} />
            </div>
            <div style={{ fontSize: 12, opacity: 0.7, fontFamily: "'JetBrains Mono', monospace" }}>placeholder · video player</div>
          </div>
          <button onClick={onClose} style={{
            position: 'absolute', top: 14, right: 14,
            background: 'rgba(0,0,0,0.5)', border: 'none', cursor: 'pointer',
            color: '#fff', width: 34, height: 34, borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
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
    </div>);

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
        {MENTOR_VIDEOS.map((v) => <MentorVideoTile key={v.id} v={v} onPlay={setPlaying} />)}
      </div>

      <MentorVideoModal video={playing} onClose={() => setPlaying(null)} />
    </div>);

}

// ═══════════════════════════════════════════════════════════
// Office Hours
// ═══════════════════════════════════════════════════════════
const OFFICE_HOURS = [
{ id: 'oh-1', title: 'Cohort 04 · Open Office Hours', date: 'Thu, Mar 19, 2026', time: '3:00 PM – 4:00 PM ET', topic: 'Open Q&A · bring your stuck points', zoom: 'https://zoom.us/j/85274938102', meetingId: '852 7493 8102', recurring: 'Recurring · every Thursday' },
{ id: 'oh-2', title: 'Comp Selection Clinic', date: 'Tue, Mar 24, 2026', time: '1:00 PM – 2:00 PM ET', topic: 'Bring your top 5 PropMix candidates · we debate them live', zoom: 'https://zoom.us/j/85274938102', meetingId: '852 7493 8102', recurring: 'One-time · Step 4 deep dive' },
{ id: 'oh-3', title: 'Cohort 04 · Open Office Hours', date: 'Thu, Mar 26, 2026', time: '3:00 PM – 4:00 PM ET', topic: 'Open Q&A · bring your stuck points', zoom: 'https://zoom.us/j/85274938102', meetingId: '852 7493 8102', recurring: 'Recurring · every Thursday' },
{ id: 'oh-4', title: 'Reconciliation & Report Writing', date: 'Wed, Apr 1, 2026', time: '11:00 AM – 12:30 PM ET', topic: 'Walk through a finished URAR end-to-end · narrative tightening', zoom: 'https://zoom.us/j/85274938102', meetingId: '852 7493 8102', recurring: 'One-time · Steps 6–7' },
{ id: 'oh-5', title: 'Cohort 04 · Open Office Hours', date: 'Thu, Apr 2, 2026', time: '3:00 PM – 4:00 PM ET', topic: 'Open Q&A · bring your stuck points', zoom: 'https://zoom.us/j/85274938102', meetingId: '852 7493 8102', recurring: 'Recurring · every Thursday' }];


function OfficeHoursWidget({ navigate }) {
  const next = OFFICE_HOURS.slice(0, 2);
  return (
    <Card padding={0} style={{ overflow: 'hidden' }}>
      <div style={{
        padding: '12px 18px', borderBottom: '1px solid #eee',
        display: 'flex', alignItems: 'center', gap: 10
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: 6, flexShrink: 0,
          background: '#eaf3ff', display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <Icon name="calendar" size={14} color="#0a6ed1" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 800, fontFamily: "'Nunito', sans-serif" }}>Upcoming Office Hours</div>
          <div style={{ fontSize: 10.5, color: '#888' }}>Scheduled Zoom sessions · hosted by James</div>
        </div>
      </div>
      <div style={{ padding: '10px 14px' }}>
        {next.map((oh) =>
        <div key={oh.id} style={{
          padding: '10px 12px', borderRadius: 7, marginBottom: 8,
          background: '#fafbfc', border: '1px solid #eee',
          display: 'flex', gap: 10, alignItems: 'center'
        }}>
            <div style={{
            width: 44, height: 44, borderRadius: 7, flexShrink: 0,
            background: '#fff', border: '1px solid #e8e8e8',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Nunito', sans-serif"
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
            display: 'flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap'
          }}>
              <Icon name="video" size={11} color="#fff" /> Join
            </a>
          </div>
        )}
        <button onClick={() => navigate('office-hours')} style={{
          width: '100%', padding: '7px', background: 'none', border: 'none',
          cursor: 'pointer', color: '#d60436', fontSize: 11.5, fontWeight: 700,
          fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4
        }}>
          View full schedule <Icon name="arrow-right" size={11} color="#d60436" />
        </button>
      </div>
    </Card>);

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
          padding: '8px 14px', fontSize: 11.5, color: '#7a4400', maxWidth: 340
        }}>
          <strong>Heads up · asynchronous program.</strong> Office hours are scheduled live, but per-assignment feedback always comes through Mentor Reviews — not Zoom.
        </div>
      </Card>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {OFFICE_HOURS.map((oh) =>
        <Card key={oh.id} padding={0}>
            <div style={{ display: 'flex', alignItems: 'stretch' }}>
              <div style={{
              width: 92, padding: '16px 0',
              background: oh.recurring.startsWith('Recurring') ? '#fafbfc' : '#fff5f7',
              borderRight: '1px solid #eee',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Nunito', sans-serif"
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
                  display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap'
                }}>
                    <Icon name="video" size={13} color="#fff" /> Join Zoom
                  </a>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      <Card padding="14px 18px" style={{ marginTop: 16, background: '#fafbfc', display: 'flex', alignItems: 'center', gap: 12 }}>
        <Icon name="info" size={14} color="#666" />
        <div style={{ fontSize: 12, color: '#444' }}>
          Sessions are <strong>not recorded individually</strong> — but James publishes a topic recap video to <a href="#" onClick={(e) => {e.preventDefault();navigate('mentors-corner');}} style={{ color: '#d60436', fontWeight: 700, textDecoration: 'underline' }}>Mentor's Corner</a> after each one.
        </div>
      </Card>
    </div>);

}

// ═══════════════════════════════════════════════════════════
// S00 Before You Start — preamble screen w/ acknowledge gate
// ═══════════════════════════════════════════════════════════
const ACK_KEY = 'parea_acknowledged_preamble_v1';
function S00_BeforeYouStart({ navigate }) {
  const [acks, setAcks] = useSA(() => {
    try {return JSON.parse(localStorage.getItem(ACK_KEY) || '{}');} catch (e) {return {};}
  });
  const points = [
  { id: 'ai-not-human', title: 'AI does not think like a human.', body: 'AI tools pattern-match across training data. They do not <em>see</em> the house, talk to the owner, or weigh local context. They will be confidently wrong.' },
  { id: 'human-value', title: 'Your human perspective is the irreplaceable part.', body: 'What an appraiser brings — and what tools cannot — is <em>judgment</em>: framing the problem, weighing conflicting evidence, forming and defending an opinion of value.' },
  { id: 'tools-are-tools', title: 'PropMix, True Footage, Apex, Matterport, AI suggestions — these are tools.', body: 'Tools assemble data. They do not appraise. <strong>No tool is USPAP-compliant by itself.</strong> Only your <em>use</em> of a tool — verified, documented, and reasoned — can be USPAP-compliant.' },
  { id: 'verify-credibility', title: 'You will be expected to verify everything.', body: 'For every output you accept from a tool, you should know: what is the source? Can I reproduce it? What would make this wrong? Throughout the program, "Verify this" callouts will walk you through it.' },
  { id: 'workfile-evidence', title: 'Document evidence as you go.', body: 'Capture screenshots and notes into your workfile every time you pull from a tool or research site. If a state board asks you to defend a number five years from now, your workfile is your answer.' }];

  const allAcked = points.every((p) => acks[p.id]);
  const toggle = (id) => {
    const next = { ...acks, [id]: !acks[id] };
    setAcks(next);
    try {localStorage.setItem(ACK_KEY, JSON.stringify(next));} catch (e) {}
  };
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <div style={{
        textAlign: 'center', marginBottom: 24, padding: '24px 0 8px'
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#1a1d2b', color: '#fff',
          padding: '6px 14px', borderRadius: 999,
          fontSize: 10.5, fontWeight: 800, letterSpacing: '.1em', textTransform: 'uppercase',
          marginBottom: 16
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#d60436' }} />
          Step 0 · Before you start
        </div>
        <h1 style={{
          fontFamily: "'Nunito', sans-serif", fontSize: 38, fontWeight: 800,
          color: '#292929', lineHeight: 1.1, letterSpacing: '-0.02em', margin: 0
        }}>
          Read this before the tools<br />get their hands on you.
        </h1>
        <p style={{ fontSize: 15, color: '#666', marginTop: 14, lineHeight: 1.55, maxWidth: 640, margin: '14px auto 0' }}>
          You're about to spend months working with AI partners and production data tools. Before any of that, get clear on what they are — and what they aren't.
        </p>
      </div>

      <Card padding={0} style={{ overflow: 'hidden', marginBottom: 22 }}>
        <div style={{
          padding: '14px 22px', background: 'linear-gradient(135deg, #d60436, #ff5577)', color: '#fff',
          display: 'flex', alignItems: 'center', gap: 12
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
                fontFamily: 'inherit', textAlign: 'left'
              }}>
                <div style={{
                  width: 28, height: 28, borderRadius: 6, flexShrink: 0,
                  background: isAcked ? '#1a9e5c' : '#fff',
                  border: `2px solid ${isAcked ? '#1a9e5c' : '#c8c8c8'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginTop: 2,
                  transition: 'all 150ms'
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
              </button>);

          })}
        </div>
      </Card>

      <div style={{
        background: '#1a1d2b', color: '#fff',
        borderRadius: 12, padding: '20px 24px',
        display: 'flex', alignItems: 'center', gap: 20
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
    </div>);

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
  { id: 'report-3', label: 'Report 3', sub: 'REO (not started)', active: false }];

  return (
    <div>
      <PageHeader breadcrumb={['Cohort 04']} title="Workfile"
      subtitle="Your evidence trail. Every screenshot, note, and source you capture from PropMix, True Footage, Apex, Matterport, or AI tools lives here. USPAP retention: 5 years." />

      {/* Report selector */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
        {REPORTS.map((r) =>
        <button key={r.id} onClick={() => r.active && setReport(r.id)} disabled={!r.active}
        style={{
          flex: 1, padding: '12px 16px',
          background: report === r.id ? '#fff' : '#f4f5f7',
          border: report === r.id ? '1.5px solid #d60436' : '1px solid #e8e8e8',
          borderRadius: 8,
          cursor: r.active ? 'pointer' : 'not-allowed',
          fontFamily: 'inherit', textAlign: 'left',
          opacity: r.active ? 1 : 0.55,
          transition: 'all 150ms'
        }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: report === r.id ? '#d60436' : '#292929', fontFamily: "'Nunito', sans-serif" }}>
              {r.label} {!r.active && <span style={{ fontSize: 10, color: '#888', fontWeight: 600 }}>· locked</span>}
            </div>
            <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{r.sub}</div>
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 18 }}>
        {/* Captured items */}
        <Card padding={0}>
          <div style={{
            padding: '14px 20px', borderBottom: '1px solid #eee',
            display: 'flex', alignItems: 'center', gap: 10
          }}>
            <Icon name="folder-open" size={16} color="#d60436" />
            <div style={{ fontSize: 13, fontWeight: 700, flex: 1 }}>
              Captured items · {items.length}
            </div>
            <Badge color="success">USPAP-aligned</Badge>
          </div>
          <div style={{ padding: 12 }}>
            {items.length === 0 ?
            <div style={{
              padding: 36, textAlign: 'center',
              background: '#fafbfc', borderRadius: 8, border: '1px dashed #e0e0e0'
            }}>
                <Icon name="folder" size={32} color="#bbb" />
                <div style={{ fontSize: 13.5, fontWeight: 700, marginTop: 10, color: '#292929' }}>No items yet</div>
                <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>
                  Use the floating "Capture to workfile" button while working with tools.
                </div>
              </div> :
            items.map((it) =>
            <div key={it.id} style={{
              display: 'flex', gap: 12, padding: '11px 12px',
              borderBottom: '1px solid #f4f4f4', alignItems: 'center'
            }}>
                <div style={{
                width: 40, height: 40, borderRadius: 7, flexShrink: 0,
                background: it.kind === 'screenshot' ? '#eaf3ff' : it.kind === 'note' ? '#fff8ec' : '#f4f5f7',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
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
                color: '#888', padding: 4
              }}>
                  <Icon name="external-link" size={13} color="#888" />
                </button>
              </div>
            )}
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
    </div>);

}

// ── Screens 1 content ─────────────────────────────────────────────
const { useState: useS1, useEffect: useE1, useMemo: useM1 } = React;

// ═══ SCREEN 1: Welcome / Enrollment Gate ═════════════════════
function S01_Enrollment({ navigate, tweaks }) {
  const [step, setStep] = useS1(1);
  const [uploaded, setUploaded] = useS1(false);
  const [verifying, setVerifying] = useS1(false);
  const [verified, setVerified] = useS1(false);

  const handleUpload = () => {
    setUploaded(true);
    setVerifying(true);
    setTimeout(() => {setVerifying(false);setVerified(true);}, 1800);
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', paddingTop: 8 }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'linear-gradient(90deg, #d60436, #ff5577)',
          color: '#fff', padding: '6px 14px', borderRadius: 999,
          fontSize: 11, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase',
          marginBottom: 18
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="3" fill="#fff" /></svg>
          AI-First PAREA Program
        </div>
        <h1 style={{ fontFamily: "'Nunito', sans-serif", fontSize: 38, fontWeight: 800, color: '#292929', lineHeight: 1.1, margin: 0, letterSpacing: '-0.02em' }}>
          Licensed Residential Appraiser Path
        </h1>
        <p style={{ fontSize: 15, color: '#666', marginTop: 12, lineHeight: 1.55 }}>
          A 6-month practicum with real tools (PropMix, True Footage, Apex Sketch),<br />
          AI-graded checkpoints, and 1:20 mentor coverage. Three full USPAP reports — one certificate.
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: 28 }}>
        {['Verify Prereq', 'Tech Setup', 'Cohort Assign'].map((s, i) => {
          const done = i < step - 1,active = i === step - 1;
          return (
            <React.Fragment key={i}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: done ? '#1a9e5c' : active ? '#d60436' : '#fff',
                  border: `2px solid ${done ? '#1a9e5c' : active ? '#d60436' : '#ccc'}`,
                  color: done || active ? '#fff' : '#999',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: 12
                }}>{done ? <Icon name="check" size={12} color="#fff" strokeWidth={3} /> : i + 1}</div>
                <span style={{ fontSize: 12, fontWeight: active ? 700 : 500, color: active ? '#292929' : '#888' }}>{s}</span>
              </div>
              {i < 2 && <div style={{ width: 60, height: 2, background: done ? '#1a9e5c' : '#e0e0e0', margin: '0 14px' }} />}
            </React.Fragment>);

        })}
      </div>

      <Card padding={28}>
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 11, color: '#888', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase' }}>Step 1 of 3</div>
          <h2 style={{ fontFamily: "'Nunito', sans-serif", fontSize: 22, fontWeight: 700, marginTop: 4, color: '#292929' }}>Verify your prerequisites</h2>
          <p style={{ fontSize: 13.5, color: '#666', marginTop: 6, lineHeight: 1.5 }}>
            PAREA requires <strong>150 hours of qualifying education</strong> before you can begin. Upload your transcript — our AI will verify the hours match AQB criteria.
          </p>
        </div>

        <div style={{ marginBottom: 18 }}>
          <label style={{ fontSize: 12, fontWeight: 600, color: '#444', display: 'block', marginBottom: 6 }}>Your state of licensure</label>
          <select style={{
            width: '100%', padding: '10px 12px', fontSize: 14, fontFamily: 'inherit',
            border: '1px solid #e8e8e8', borderRadius: 8, background: '#fafafa', color: '#292929'
          }}>
            <option>Ohio — accepts PAREA, AQB-aligned</option>
            <option>California</option><option>Texas</option><option>New York</option>
          </select>
        </div>

        <div style={{
          border: uploaded ? `2px solid ${verified ? '#1a9e5c' : '#d60436'}` : '2px dashed #d0d0d0',
          borderRadius: 10, padding: 26, textAlign: 'center',
          background: uploaded ? verified ? '#edfbf4' : '#fff8ec' : '#fafafa',
          transition: 'all 200ms'
        }}>
          {!uploaded ?
          <>
              <Icon name="upload-cloud" size={32} color="#888" />
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 10, color: '#292929' }}>Drop transcript PDF or click to browse</div>
              <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>AI parses transcript · verifies 150-hr threshold · flags discrepancies</div>
              <Button variant="primary" onClick={handleUpload} style={{ marginTop: 14 }}>
                <Icon name="file-up" size={14} color="#fff" /> Upload transcript
              </Button>
            </> :
          verifying ?
          <>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <AIChip label="AI Parser" tone="dark" />
                <div style={{
                width: 16, height: 16, border: '2px solid #d60436', borderTopColor: 'transparent',
                borderRadius: '50%', animation: 'spin 700ms linear infinite'
              }} />
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
              <div style={{ fontSize: 14, color: '#292929' }}>Reading <em>transcript-2025.pdf</em> · matching against AQB course catalog…</div>
            </> :

          <>
              <Icon name="check-circle" size={32} color="#1a9e5c" />
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 8, color: '#1a9e5c' }}>Verified · 154 hours of qualifying education</div>
              <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
                Basic Appraisal Principles ✓ · Procedures ✓ · USPAP 15-Hr ✓ · Residential Site Valuation ✓
              </div>
              <Button variant="primary" onClick={() => navigate('tech-setup')} style={{ marginTop: 14 }}>
                Continue to tech setup <Icon name="arrow-right" size={14} color="#fff" />
              </Button>
            </>
          }
        </div>

        <div style={{ marginTop: 18, padding: '12px 14px', background: '#eaf3ff', borderRadius: 8, fontSize: 12, color: '#0a6ed1', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <Icon name="info" size={14} color="#0a6ed1" />
          <div><strong>Why we need this:</strong> AQB requires 150-hr prereq before practicum. If your transcript falls short, we'll route you to qualifying education instead — no dead ends.</div>
        </div>
      </Card>

      <div style={{ textAlign: 'center', marginTop: 16, fontSize: 11, color: '#aaa', fontFamily: "'JetBrains Mono', monospace" }}>
        xAPI · learner attempted enrollment → prerequisite verified: {verified ? 'true' : '—'}
      </div>
    </div>);

}

// ═══ SCREEN 2: Technology Setup ══════════════════════════════
function S02_TechSetup({ navigate }) {
  const [connected, setConnected] = useS1({ propmix: true, truefootage: true, apex: false, camera: true });
  const allDone = Object.values(connected).every(Boolean);

  const TOOLS = [
  { id: 'propmix', name: 'PropMix', desc: 'Property data, MLS, public records, AVMs', color: '#0a6ed1', logo: 'P' },
  { id: 'truefootage', name: 'True Footage', desc: 'Report writing, URAR forms, Marshall & Swift cost data', color: '#1f6f5b', logo: 'T' },
  { id: 'apex', name: 'Apex Sketch', desc: 'Property sketches and GLA validation', color: '#6f3fb5', logo: 'A' }];


  return (
    <div style={{ maxWidth: 980, margin: '0 auto' }}>
      <PageHeader breadcrumb={['Pre-Program']} title="Connect your real tools"
      subtitle="This program uses production tools — not simulations. Connect each account once; we'll log every session via xAPI." />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 22 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {TOOLS.map((t) => {
            const isConn = connected[t.id];
            return (
              <Card key={t.id} padding="18px 20px" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, background: t.color + '15', color: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800, fontFamily: "'Nunito', sans-serif" }}>{t.logo}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#292929' }}>{t.name}</div>
                  <div style={{ fontSize: 12.5, color: '#666', marginTop: 2 }}>{t.desc}</div>
                  {isConn &&
                  <div style={{ fontSize: 11, color: '#1a9e5c', marginTop: 5, fontFamily: "'JetBrains Mono', monospace", display: 'flex', alignItems: 'center', gap: 5 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1a9e5c', boxShadow: '0 0 6px #1a9e5c' }} />
                      OAuth handshake complete · sarah.h@learner.parea
                    </div>
                  }
                </div>
                {isConn ?
                <Badge color="success">Connected</Badge> :

                <Button variant="primary" size="sm" onClick={() => setConnected({ ...connected, [t.id]: true })}>
                    Connect {t.name}
                  </Button>
                }
              </Card>);

          })}

          <Card padding="14px 20px" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Icon name="camera" size={18} color="#666" />
            <div style={{ flex: 1, fontSize: 13 }}>I have access to a measuring device, camera, and stable broadband (10+ Mbps).</div>
            <Badge color="success">Confirmed</Badge>
          </Card>

          <div style={{ marginTop: 8, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <Button variant="ghost" onClick={() => navigate('welcome')}>Back</Button>
            <Button variant="primary" disabled={!allDone} onClick={() => navigate('home')}>
              {allDone ? 'Continue to cohort assignment' : 'Connect all tools first'} <Icon name="arrow-right" size={14} color="#fff" />
            </Button>
          </div>
        </div>

        <Card padding={20} style={{ background: '#fafbfc' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <div style={{ fontSize: 10, fontWeight: 800, color: '#d60436', letterSpacing: '.08em', textTransform: 'uppercase' }}>Why this matters</div>
          </div>
          <div style={{ fontSize: 13.5, lineHeight: 1.55, color: '#444' }}>
            Other PAREA programs simulate the tools. This one doesn't.
          </div>
          <ul style={{ marginTop: 12, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
            'Real PropMix MLS — same data the firm you join will use',
            'Real True Footage URAR — your reports are firm-ready',
            'Real Apex sketches — exportable to your workfile',
            'AI tracks every keystroke via xAPI · feeds your portfolio'].
            map((t, i) =>
            <li key={i} style={{ fontSize: 12.5, lineHeight: 1.5, display: 'flex', gap: 8, color: '#444' }}>
                <Icon name="check" size={13} color="#d60436" strokeWidth={3} />
                {t}
              </li>
            )}
          </ul>
        </Card>
      </div>
    </div>);

}

// ═══ SCREEN 3: Cohort Dashboard (the analytics hero) ═════════
function S03_Dashboard({ navigate, tweaks }) {
  const showCohort = tweaks?.showCohortFeed !== false;

  return (
    <div>
      {/* Stat tiles row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 18 }}>
        <StatTile label="Cohort progress" value="49%" sub="vs cohort median 41%" trend="+8%" icon="trending-up" color="#1a9e5c" />
        <StatTile label="Hours invested" value="68" sub="this report · 142 total" icon="clock" />
        <StatTile label="AI overrides" value="14" sub="defended · 11 accepted" trend="79%" icon="git-branch" color="#0a6ed1" />
        <StatTile label="USPAP flags" value="3" sub="open · 11 resolved" trend="-2 today" icon="shield-check" color="#e8860a" />
      </div>

      {/* Hero strip — current report + AI nudge */}
      <div style={{
        background: 'linear-gradient(120deg, #fff 0%, #fff5f7 65%, #ffe4eb 100%)',
        borderRadius: 14, padding: '20px 24px', color: '#292929',
        display: 'flex', alignItems: 'center', gap: 22, marginBottom: 18,
        position: 'relative', overflow: 'hidden',
        border: '1px solid #f4d4dc'
      }}>
        <div style={{ position: 'absolute', right: -40, top: -40, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(214,4,54,0.10) 0%, transparent 65%)' }} />
        <div style={{ flex: 1, zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 10, fontWeight: 800, color: '#d60436', background: '#fff0f3', padding: '3px 8px', borderRadius: 4, letterSpacing: '.08em', textTransform: 'uppercase' }}>Up Next</span>
            <PhasePill phase="p4" size="sm" />
          </div>
          <h1 style={{ fontFamily: "'Nunito', sans-serif", fontSize: 26, fontWeight: 800, margin: 0, letterSpacing: '-0.01em', color: '#292929' }}>
            Comp Selection — Report 1
          </h1>
          <p style={{ fontSize: 13.5, color: '#555', marginTop: 6, maxWidth: 560, lineHeight: 1.5 }}>
            PropMix returned 47 candidates within your market boundary. AI scored them — your next move is to pick 3–5 and defend each selection against your Socratic AI partner.
          </p>
          <div style={{ display: 'flex', gap: 16, marginTop: 14, fontSize: 12, color: '#666' }}>
            <div><span style={{ color: '#d60436' }}>● </span><strong>~45 min</strong> est.</div>
            <div><span style={{ color: '#d60436' }}>● </span>Highest-judgment screen of the program</div>
          </div>
        </div>
        <Button variant="primary" size="lg" onClick={() => navigate('comp-selection')}>
          Resume <Icon name="arrow-right" size={15} color="#fff" />
        </Button>
      </div>

      {/* Report header + collapsible roadmap */}
      <CompactReportHeader currentPhase="p4" completedPhases={['p1', 'p2', 'p3']} />

      {/* Workfile + Office Hours — the always-on cohort tools */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 16, marginBottom: 18 }}>
        <WorkfileDashboardCard navigate={navigate} />
        <OfficeHoursWidget navigate={navigate} />
      </div>
    </div>);

}

function CompactReportHeader({ currentPhase, completedPhases = [] }) {
  const [open, setOpen] = useS1(false);
  const currentIdx = PHASES.slice(1).findIndex((p) => p.id === currentPhase);
  return (
    <div style={{ marginBottom: 20 }}>
      <Card padding="14px 18px">
        <button onClick={() => setOpen((o) => !o)} style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 14, padding: 0,
          textAlign: 'left', fontFamily: 'inherit'
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 22, fontWeight: 800, color: '#111', letterSpacing: '-0.015em' }}>
              Report 1 · Conventional Purchase
            </div>
            <div style={{ fontSize: 12, color: '#888', marginTop: 3, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>4218 Ridgewood Ln · Glenmoor, OH 44023</span>
              <span style={{ color: '#ddd' }}>•</span>
              <Icon name="zap" size={11} color="#d60436" />
              <strong style={{ color: '#d60436' }}>Step {currentIdx + 1} of 8</strong>
              <span style={{ color: '#aaa' }}>· 4 of 8 mentor checkpoints cleared</span>
            </div>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 10px', background: '#f4f5f7', borderRadius: 6,
            fontSize: 11.5, fontWeight: 600, color: '#666'
          }}>
            {open ? 'Hide steps' : 'Show steps'}
            <Icon name={open ? 'chevron-up' : 'chevron-down'} size={13} color="#666" />
          </div>
        </button>

        {open &&
        <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #f0f0f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              {PHASES.slice(1).map((p, i) => {
              const isCurrent = p.id === currentPhase;
              const isDone = completedPhases.includes(p.id);
              const bg = isDone ? '#1a9e5c' : isCurrent ? p.color : '#fafafa';
              const fg = isDone || isCurrent ? '#fff' : '#888';
              const border = isCurrent ? p.color : isDone ? '#1a9e5c' : '#e8e8e8';
              return (
                <div key={p.id} title={p.label} style={{
                  flex: 1, padding: '8px 6px', borderRadius: 6,
                  background: bg, color: fg, border: `1px solid ${border}`,
                  fontSize: 11, fontWeight: 700, textAlign: 'center',
                  display: 'flex', flexDirection: 'column', gap: 2,
                  transition: 'all 180ms'
                }}>
                    <div style={{ fontSize: 9.5, opacity: 0.75, letterSpacing: '.04em' }}>STEP</div>
                    <div style={{ fontSize: 13, fontFamily: "'Nunito', sans-serif", fontWeight: 800 }}>{i + 1}</div>
                  </div>);

            })}
            </div>
            {/* Open format: flowing chips with step names */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, fontSize: 11, color: '#444' }}>
              {PHASES.slice(1).map((p, i) => {
              const isCurrent = p.id === currentPhase;
              const isDone = completedPhases.includes(p.id);
              return (
                <span key={p.id} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '3px 9px', borderRadius: 999,
                  background: isDone ? '#edfbf4' : isCurrent ? p.bg : '#f4f5f7',
                  color: isDone ? '#1a9e5c' : isCurrent ? p.color : '#666',
                  fontWeight: isCurrent ? 700 : 500
                }}>
                    <strong style={{ fontFamily: "'Nunito', sans-serif" }}>{i + 1}.</strong>
                    {p.label.replace(/^Step \d+ · /, '')}
                  </span>);

            })}
            </div>
          </div>
        }
      </Card>
    </div>);

}

function Row({ dot, label, muted, pulse }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: muted ? 0.55 : 1 }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: dot, animation: pulse ? 'pulse 1.4s ease-in-out infinite' : 'none' }} />
      <span style={{ fontSize: 11.5 }}>{label}</span>
    </div>);

}

function CompetencyRadar() {
  const skills = [
  { label: 'Sales Comp.', val: 0.78 },
  { label: 'Market & HBU', val: 0.85 },
  { label: 'USPAP Std 1', val: 0.72 },
  { label: 'USPAP Std 2', val: 0.45 },
  { label: 'Cost', val: 0.60 },
  { label: 'Income', val: 0.55 },
  { label: 'Report Writing', val: 0.40 },
  { label: 'Comm. of Results', val: 0.35 }];

  const cx = 130,cy = 110,r = 78;
  const angle = (i) => i / skills.length * Math.PI * 2 - Math.PI / 2;
  const pt = (i, v) => [cx + Math.cos(angle(i)) * r * v, cy + Math.sin(angle(i)) * r * v];
  const polygon = skills.map((s, i) => pt(i, s.val).join(',')).join(' ');
  const cohortAvg = skills.map((s, i) => pt(i, 0.55).join(',')).join(' ');

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <svg width="260" height="220">
        {[0.25, 0.5, 0.75, 1].map((g) =>
        <polygon key={g}
        points={skills.map((s, i) => pt(i, g).join(',')).join(' ')}
        fill="none" stroke="#eee" strokeWidth="1" />
        )}
        {skills.map((s, i) => {
          const [x, y] = pt(i, 1);
          return <line key={'l' + i} x1={cx} y1={cy} x2={x} y2={y} stroke="#eee" strokeWidth="1" />;
        })}
        <polygon points={cohortAvg} fill="#88888822" stroke="#888" strokeWidth="1" strokeDasharray="3,3" />
        <polygon points={polygon} fill="#d6043622" stroke="#d60436" strokeWidth="2" />
        {skills.map((s, i) => {
          const [x, y] = pt(i, s.val);
          return <circle key={'c' + i} cx={x} cy={y} r="3" fill="#d60436" />;
        })}
        {skills.map((s, i) => {
          const [x, y] = pt(i, 1.18);
          return <text key={'t' + i} x={x} y={y} textAnchor="middle" fontSize="9" fill="#666" fontFamily="DM Sans" fontWeight="600">{s.label}</text>;
        })}
      </svg>
    </div>);

}

// ═══ SCREEN 4: Step 1 Intro ═════════════════════════════════
function S04_Phase1Intro({ navigate }) {
  return (
    <div>
      <PageHeader breadcrumb={['Report 1', 'Step 1 · Problem ID']} title="Section I & II — Frame the assignment"
      subtitle="Before a single comp is pulled, an appraiser frames the problem. You'll cover ethics, tool orientation, then run an AI-simulated engagement letter and inspection scheduling." />

      <Card padding={0} style={{ overflow: 'hidden', marginBottom: 14 }}>
        <div style={{
          height: 160, background: 'linear-gradient(120deg, #6a1b9a 0%, #d60436 100%)',
          padding: 22, color: '#fff', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'
        }}>
          <div style={{ position: 'absolute', right: 20, top: 20, opacity: 0.2 }}>
            <Icon name="file-search" size={120} color="#fff" />
          </div>
          <PhasePill phase="p1" />
          <h2 style={{ fontFamily: "'Nunito', sans-serif", fontSize: 22, fontWeight: 800, marginTop: 8 }}>Sections I & II · 4–6 hrs</h2>
        </div>
      </Card>

      {/* Section I — full width */}
      <Card padding={22} style={{ marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 320 }}>
            <div style={{ fontSize: 11, color: '#888', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase' }}>Section I</div>
            <h3 style={{ fontFamily: "'Nunito', sans-serif", fontSize: 20, fontWeight: 700, marginTop: 4, marginBottom: 14 }}>Ethics, USPAP intro, tool orientation</h3>
            <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Step icon="shield" label="Appraiser independence & public trust" est="20 min" />
              <Step icon="book-open" label="USPAP introduction · Ethics Rule" est="30 min" />
              <Step icon="tool" label="Tool orientation · PropMix, True Footage, Apex" est="20 min" />
            </ul>
          </div>
          <div style={{ flexShrink: 0, alignSelf: 'flex-end' }}>
            <Button variant="primary" onClick={() => navigate('ethics-lesson')}>
              Start Section I <Icon name="arrow-right" size={13} color="#fff" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Section II — full width */}
      <Card padding={22} style={{ marginBottom: 18 }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: 320 }}>
            <div style={{ fontSize: 11, color: '#888', fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase' }}>Section II · AI-simulated</div>
            <h3 style={{ fontFamily: "'Nunito', sans-serif", fontSize: 20, fontWeight: 700, marginTop: 4, marginBottom: 14 }}>Engagement letter, scope, prelim research, scheduling</h3>
            <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <Step icon="message-circle" label="Engagement letter sim — Maya Chen, loan officer" est="45 min" ai />
              <Step icon="search" label="Preliminary research · public records, zoning, flood" est="60 min" />
              <Step icon="calendar" label="Inspection scheduling sim — David Osei, owner" est="20 min" ai />
            </ul>
          </div>
          <div style={{ flexShrink: 0, alignSelf: 'flex-end' }}>
            <Button variant="outline" disabled>
              Locked · finish Section I <Icon name="lock" size={13} color="#a3a3a3" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Companion info row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Card padding="18px 20px">
          <div style={{ fontSize: 12, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '.05em' }}>What you'll produce</div>
          <ul style={{ marginTop: 10, paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
            ['Approved engagement letter', 'check-circle', true],
            ['Defined scope of work', 'check-circle', true],
            ['Preliminary research notes', 'circle', false],
            ['Inspection appointment confirmed', 'circle', false],
            ['Mentor Review 1 cleared', 'lock', false]].
            map(([label, icon, done], i) =>
            <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: done ? '#1a9e5c' : '#666' }}>
                <Icon name={icon} size={13} color={done ? '#1a9e5c' : '#bbb'} />
                <span style={{ textDecoration: done ? 'line-through' : 'none' }}>{label}</span>
              </li>
            )}
          </ul>
        </Card>
        <Card padding="18px 20px" style={{ background: '#fafbfc' }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: '#d60436', letterSpacing: '.08em', textTransform: 'uppercase' }}>AI in this step</div>
          <div style={{ marginTop: 10, fontSize: 12.5, lineHeight: 1.55, color: '#444' }}>
            The AI plays your <strong>client</strong> (Maya, the loan officer) and your <strong>contact</strong> (David, the homeowner). Both push back. Both will catch a sloppy scope of work.
          </div>
        </Card>
      </div>
    </div>);

}

function Step({ icon, label, est, ai }) {
  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', fontSize: 13 }}>
      <Icon name={icon} size={14} color="#7b1fa2" />
      <span style={{ flex: 1 }}>{label}</span>
      {ai && <AIChip label="AI" tone="brand" size="sm" />}
      <span style={{ fontSize: 11, color: '#888' }}>{est}</span>
    </li>);

}

// ═══ SCREEN 5: Ethics Lesson ═════════════════════════════════
function S05_Ethics({ navigate }) {
  const [answer, setAnswer] = useS1(null);
  const correct = 1;
  const choices = [
  'Complete the appraisal and try to reach the number if defensible',
  'Decline the assignment — lender pressure violates appraiser independence',
  'Ask the borrower for more information before deciding',
  'Complete the appraisal and note the pressure in the workfile'];


  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <PageHeader breadcrumb={['Step 1', 'Section I.A']} title="Ethics & independence"
      subtitle="The Ethics Rule isn't paperwork — it's the spine of public trust. Read, then prove it on the case." />

      <Card padding="24px 28px">
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 18 }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: '#f3e5f5', color: '#6a1b9a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name="shield" size={20} color="#6a1b9a" />
          </div>
          <div>
            <h3 style={{ fontFamily: "'Nunito', sans-serif", fontSize: 18, fontWeight: 700 }}>The fee can't depend on the value</h3>
            <p style={{ fontSize: 14, color: '#444', marginTop: 6, lineHeight: 1.6 }}>
              USPAP's Ethics Rule prohibits accepting any assignment in which your fee, your continued engagement, or your future business with that client is contingent on a <strong>predetermined value</strong> or a direction in value (toward or away from a target).
            </p>
            <p style={{ fontSize: 14, color: '#444', marginTop: 10, lineHeight: 1.6 }}>
              The independence requirement is what makes appraisers different from underwriters, agents, or AVMs. Lenders, agents, and borrowers all want a number. You owe them <em>credible analysis</em>, not their number.
            </p>
          </div>
        </div>

        <div style={{ background: '#fafafa', borderRadius: 10, padding: 20, marginTop: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <Badge color="brand">Knowledge check 1 of 3</Badge>
            <span style={{ fontSize: 11, color: '#888' }}>Auto-graded · logged to xAPI</span>
          </div>
          <div style={{ fontSize: 14, fontWeight: 600, color: '#292929', marginBottom: 12, lineHeight: 1.5 }}>
            An appraiser is hired by a lender who tells them the value must come in above $400,000 or the loan won't close. What should the appraiser do?
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {choices.map((c, i) => {
              const picked = answer === i;
              const showResult = answer != null;
              const isCorrect = i === correct;
              const bg = !showResult ? picked ? '#fff0f3' : '#fff' : isCorrect ? '#edfbf4' : picked ? '#fff0f3' : '#fff';
              const bd = !showResult ? picked ? '#d60436' : '#e8e8e8' : isCorrect ? '#1a9e5c' : picked ? '#d60436' : '#e8e8e8';
              return (
                <button key={i} onClick={() => setAnswer(i)} style={{
                  background: bg, border: `1.5px solid ${bd}`, borderRadius: 8,
                  padding: '12px 14px', textAlign: 'left', cursor: 'pointer',
                  fontFamily: 'inherit', fontSize: 13.5, color: '#292929',
                  display: 'flex', alignItems: 'center', gap: 10, transition: 'all 150ms'
                }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                    border: `1.5px solid ${bd}`, background: showResult && isCorrect ? '#1a9e5c' : picked ? '#d60436' : '#fff',
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700
                  }}>
                    {showResult && isCorrect ? <Icon name="check" size={11} color="#fff" strokeWidth={3} /> :
                    showResult && picked ? <Icon name="x" size={11} color="#fff" strokeWidth={3} /> :
                    String.fromCharCode(65 + i)}
                  </span>
                  {c}
                </button>);

            })}
          </div>
          {answer != null &&
          <div style={{ marginTop: 14, padding: 14, background: answer === correct ? '#edfbf4' : '#fff0f3', borderRadius: 8, fontSize: 13, color: '#444', lineHeight: 1.5 }}>
              <strong style={{ color: answer === correct ? '#1a9e5c' : '#d60436' }}>{answer === correct ? 'Correct.' : 'Not quite.'} </strong>
              The Ethics Rule prohibits assignments where fee or continued engagement is contingent on a predetermined value. The right move is to decline — even if it costs you the fee, it preserves your license and the public trust the profession depends on.
            </div>
          }
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 22 }}>
          <Button variant="ghost" onClick={() => navigate('phase-1-intro')}>Back</Button>
          <Button variant="primary" onClick={() => navigate('tool-orientation')} disabled={answer !== correct}>
            Continue · Tool orientation <Icon name="arrow-right" size={13} color="#fff" />
          </Button>
        </div>
      </Card>
    </div>);

}

// ═══ SCREEN 6: Tool Orientation ══════════════════════════════
function S06_ToolOrientation({ navigate }) {
  const [tab, setTab] = useS1('PropMix');
  const TOOLS = ['PropMix', 'True Footage', 'Apex Sketch'];
  const content = {
    'PropMix': {
      desc: 'Property data backbone. MLS, public records, AVMs, environmental overlays — all in one connected session.',
      uses: ['Pull subject property card + public records (Section IV)', 'Virtual neighborhood + site inspection (Sections V–VII)', 'Comp universe + AI match scoring (Section XIII)'],
      data: '47M+ properties · 600+ MLS feeds · refreshed nightly'
    },
    'True Footage': {
      desc: 'Report writing platform. URAR forms, narrative templates, Marshall & Swift cost data, certification library.',
      uses: ['Draft full URAR appraisal report (Section XIX)', 'Marshall & Swift cost approach data (Section XV.B)', 'Certification & workfile assembly (Section XX)'],
      data: 'AQB-aligned · USPAP edition auto-versioned · workfile auto-archived'
    },
    'Apex Sketch': {
      desc: 'Industry-standard sketching for residential. GLA validation, attached/detached structures, multi-level support.',
      uses: ['Subject property sketch (Section IX)', 'Error-correction exercises (Section IX)', 'GLA validation against measurements (Section VIII)'],
      data: 'Direct API export to True Footage · GLA reconciliation built-in'
    }
  };
  const t = content[tab];

  return (
    <div style={{ maxWidth: 920, margin: '0 auto' }}>
      <PageHeader breadcrumb={['Step 1', 'Section I.B']} title="Tool orientation"
      subtitle="A 90-second look at each tool. You'll go deep on each one as the case unfolds — this is just the lay of the land." />

      <div style={{ display: 'flex', gap: 6, marginBottom: 14, borderBottom: '1px solid #e8e8e8' }}>
        {TOOLS.map((name) =>
        <button key={name} onClick={() => setTab(name)} style={{
          padding: '10px 16px', background: 'none', border: 'none',
          fontFamily: 'inherit', fontSize: 13.5, fontWeight: tab === name ? 700 : 500,
          color: tab === name ? '#d60436' : '#666',
          borderBottom: tab === name ? '2px solid #d60436' : '2px solid transparent',
          cursor: 'pointer', marginBottom: -1
        }}>{name}</button>
        )}
      </div>

      <Card padding={0} style={{ overflow: 'hidden' }}>
        <MockToolFrame tool={tab} tab="orientation" status="demo" height={300}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 60, height: 60, borderRadius: 14, background: '#1a1d2b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                <Icon name="play" size={26} color="#fff" />
              </div>
              <div style={{ marginTop: 12, fontSize: 14, fontWeight: 700, color: '#292929' }}>90-second {tab} demo</div>
              <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>Screen recording — no narration · captions on by default</div>
            </div>
          </div>
        </MockToolFrame>
        <div style={{ padding: '20px 22px' }}>
          <p style={{ fontSize: 14, color: '#444', lineHeight: 1.6, marginBottom: 14 }}>{t.desc}</p>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 8 }}>How you'll use it</div>
          <ul style={{ paddingLeft: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
            {t.uses.map((u, i) =>
            <li key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#444' }}>
                <Icon name="arrow-right" size={13} color="#d60436" />
                {u}
              </li>
            )}
          </ul>
          <div style={{ marginTop: 14, padding: '10px 12px', background: '#f4f5f7', borderRadius: 6, fontSize: 11.5, color: '#666', fontFamily: "'JetBrains Mono', monospace" }}>
            DATA · {t.data}
          </div>
          <div style={{ marginTop: 18, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outline" size="sm">
              <Icon name="external-link" size={13} color="#d60436" /> Open my {tab} account
            </Button>
            <Button variant="primary" size="sm" onClick={() => navigate('engagement-letter')}>
              Continue · Engagement letter sim <Icon name="arrow-right" size={13} color="#fff" />
            </Button>
          </div>
        </div>
      </Card>
    </div>);

}

// ═══ SCREEN 7: AI Engagement Letter Simulation ═══════════════
function S07_Engagement({ navigate, tweaks }) {
  const intensity = tweaks?.aiIntensity || 'normal';
  const [rubricOpen, setRubricOpen] = useS1(false);
  const [draft, setDraft] = useS1(`ENGAGEMENT LETTER\n\nIntended Use: Mortgage origination — purchase transaction\nIntended User: First Summit Bank (lender)\nEffective Date: [pending inspection]\nForm Type: URAR (Form 1004)\nAssignment Type: Sales Comparison + Cost; Income N/A`);
  const rubric = [
  { label: 'Intended use', ok: true },
  { label: 'Intended user', ok: true },
  { label: 'Effective date', ok: true },
  { label: 'USPAP edition', ok: false },
  { label: 'Form type (URAR)', ok: true },
  { label: 'Extraordinary assumptions', ok: false }];

  const score = rubric.filter((r) => r.ok).length;

  return (
    <div>
      <PageHeader breadcrumb={['Step 1', 'Section II.A']} title="Engagement letter — Maya Chen"
      subtitle="The AI plays the loan officer. Draft the engagement letter; she'll push back until the scope is USPAP-tight." />

      <WorkfileGate step="p1" label="Engagement letter · Maya Chen sim transcript" source="Socratic AI + persona sim">
        Capture this AI chat — every revision Maya forces and every push the AI makes belongs in your workfile.
      </WorkfileGate>

      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 16 }}>
        {/* Chat pane */}
        <Card padding={0}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src={PERSONAS.maya.avatar} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 700 }}>{PERSONAS.maya.name}</div>
              <div style={{ fontSize: 11, color: '#888' }}>{PERSONAS.maya.role}</div>
            </div>
            <AIChip label={`AI Persona · ${intensity}`} tone="brand" size="sm" />
          </div>
          <div style={{ padding: 16, height: 460, overflow: 'auto', background: '#fafbfc' }}>
            <ChatBubble from="persona" name={PERSONAS.maya.name} role="Loan Officer" time="9:14 AM" avatar={PERSONAS.maya.avatar}>
              Hi, I need an appraisal for a purchase transaction at <strong>4218 Ridgewood Lane</strong>. Borrower is putting 20% down. Closing in 21 days. Can you take this on?
            </ChatBubble>
            <ChatBubble from="user" name="You" time="9:16 AM">
              Yes — sending an engagement letter now. I'll need access to inspect the property within the next 5 business days.
            </ChatBubble>
            <ChatBubble from="ai" name="Socratic AI" time="9:17 AM">
              Before you send — your draft is missing the <strong>USPAP edition in effect</strong> and doesn't address whether any extraordinary assumptions apply. The lender will accept the letter as-is, but your mentor will flag both. Add them?
            </ChatBubble>
            <ChatBubble from="persona" name={PERSONAS.maya.name} role="Loan Officer" time="9:21 AM" avatar={PERSONAS.maya.avatar}>
              Got the letter — looks good on our end. One thing: the borrower's agent mentioned the basement was finished last year. <em>Should that affect anything on your end?</em>
            </ChatBubble>
            <div style={{ display: 'flex', gap: 8, marginTop: 8, alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: 11, color: '#888' }}>Maya is typing…</span>
              <span style={{ display: 'inline-flex', gap: 3 }}>
                {[0, 1, 2].map((i) => <span key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#888', animation: `pulse 1s ease-in-out ${i * 0.15}s infinite` }} />)}
              </span>
            </div>
          </div>
          <div style={{ padding: 14, borderTop: '1px solid #f0f0f0', display: 'flex', gap: 8 }}>
            <input placeholder="Type your reply…" style={{ flex: 1, padding: '10px 12px', border: '1px solid #e8e8e8', borderRadius: 8, fontSize: 13.5, fontFamily: 'inherit', background: '#fafafa' }} />
            <Button variant="primary" size="sm"><Icon name="send" size={13} color="#fff" /></Button>
          </div>
        </Card>

        {/* Draft + rubric */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card padding="16px 18px">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>Engagement letter draft</div>
              <Badge color="warning">Auto-saving</Badge>
            </div>
            <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={9} style={{
              width: '100%', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#292929',
              border: '1px solid #e8e8e8', borderRadius: 6, padding: 10, lineHeight: 1.6, resize: 'vertical'
            }} />
          </Card>

          <TextbookCallout topic="scope-of-work" why="USPAP requires six scope elements — if you're missing any, re-read this before you submit." />

          <Card padding="14px 16px">
            <button onClick={() => setRubricOpen(!rubricOpen)} style={{
              width: '100%', background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', padding: 0,
              display: 'flex', alignItems: 'center', gap: 10
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                background: score === rubric.length ? '#edfbf4' : score >= rubric.length - 2 ? '#fff8ec' : '#fef0f1',
                border: `1.5px solid ${score === rubric.length ? '#1a9e5c' : score >= rubric.length - 2 ? '#e8860a' : '#d60436'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 800,
                color: score === rubric.length ? '#1a9e5c' : score >= rubric.length - 2 ? '#e8860a' : '#d60436'
              }}>{score}/{rubric.length}</div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#292929' }}>USPAP scope rubric</div>
                <div style={{ fontSize: 11, color: score === rubric.length ? '#1a9e5c' : '#e8860a', fontWeight: 600, marginTop: 1 }}>
                  {score === rubric.length ? 'All scope elements present' : `${rubric.length - score} missing — tap to view`}
                </div>
              </div>
              <Icon name={rubricOpen ? 'chevron-up' : 'chevron-down'} size={16} color="#888" />
            </button>
            {rubricOpen &&
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12 }} data-comment-anchor="4589a2ef2b-div-778-15">
                {rubric.map((r, i) =>
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', background: r.ok ? '#edfbf4' : '#fff8ec', borderRadius: 5, fontSize: 12 }}>
                    <Icon name={r.ok ? 'check-circle' : 'alert-circle'} size={13} color={r.ok ? '#1a9e5c' : '#e8860a'} />
                    <span style={{ color: r.ok ? '#1a9e5c' : '#e8860a', fontWeight: 600 }}>{r.label}</span>
                    {!r.ok && <span style={{ marginLeft: 'auto', fontSize: 10.5, color: '#e8860a' }}>missing</span>}
                  </div>
              )}
              </div>
            }
          </Card>

          <Button variant="primary" onClick={() => navigate('preliminary-research')}>
            Submit & continue · Preliminary research <Icon name="arrow-right" size={14} color="#fff" />
          </Button>
        </div>
      </div>

      <div style={{ marginTop: 14, fontSize: 11, color: '#aaa', fontFamily: "'JetBrains Mono', monospace", textAlign: 'center' }}>
        xAPI · engagement letter: attempt 2 · AI pushback: triggered (1) · USPAP rubric: 4/6
      </div>
    </div>);

}

// ═══ SCREEN 8: Preliminary Research ══════════════════════════
function S08_PrelimResearch({ navigate }) {
  const [checklistOpen, setChecklistOpen] = useS1(false);
  const checklist = [
  ['County Assessor lookup', true],
  ['Zoning verification (R-1 conforming)', true],
  ['FEMA flood zone check (Zone X)', true],
  ['MLS quick scan — 3 active listings noted', true],
  ['Market area boundary drawn', true]];

  const doneCount = checklist.filter(([, d]) => d).length;
  const total = checklist.length;
  const complete = doneCount === total;
  return (
    <div>
      <PageHeader breadcrumb={['Step 1', 'Section II.C']} title="Preliminary research"
      subtitle="Desk research before inspection. Pull public records, zoning, flood, and a quick MLS scan from PropMix." />

      <WorkfileCaptureButton step="p1" label="Preliminary research · PropMix card + zoning + flood + MLS scan" source="PropMix public records" />

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
        <MockToolFrame tool="PropMix" tab="public-records" height={520}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
            <img src={SUBJECT.photo} style={{ width: 110, height: 84, borderRadius: 8, objectFit: 'cover' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: '#0a6ed1' }}>{SUBJECT.address}</div>
              <div style={{ fontSize: 12, color: '#666' }}>{SUBJECT.city}</div>
              <div style={{ marginTop: 8, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, fontSize: 11.5, fontFamily: "'JetBrains Mono', monospace", color: '#444' }}>
                <div>APN: <strong>{SUBJECT.apn}</strong></div>
                <div>Zone: <strong>{SUBJECT.zone}</strong></div>
                <div>Flood: <strong>{SUBJECT.floodZone}</strong></div>
                <div>Lot: <strong>{SUBJECT.lot} ac</strong></div>
              </div>
            </div>
          </div>
          <div style={{ background: '#fff', borderRadius: 6, border: '1px solid #e8e8e8', padding: '10px 12px' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#888', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '.05em' }}>Sales history · last 3</div>
            {[
            ['Apr 2018', '$398,500', 'Conventional', 'Arms-length'],
            ['Jul 2008', '$355,000', 'New construction', 'Builder/Owner'],
            ['—', '—', '—', '—']].
            map((row, i) =>
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '90px 110px 1fr 1fr', gap: 8, padding: '6px 0', borderTop: i ? '1px solid #f4f4f4' : 'none', fontSize: 12, color: '#444' }}>
                <span>{row[0]}</span><strong>{row[1]}</strong><span>{row[2]}</span><span style={{ color: '#888' }}>{row[3]}</span>
              </div>
            )}
          </div>
          <div style={{ marginTop: 12, padding: '10px 12px', background: '#fff', borderRadius: 6, border: '1px solid #e8e8e8' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#888', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.05em' }}>Market area boundary · drawn by you</div>
            <svg width="100%" height="120" viewBox="0 0 400 120">
              <rect x="0" y="0" width="400" height="120" fill="#eaf3ff" />
              <path d="M 50 30 L 150 20 L 280 35 L 350 60 L 340 95 L 200 105 L 80 95 Z" fill="rgba(214,4,54,0.18)" stroke="#d60436" strokeWidth="1.5" strokeDasharray="4,2" />
              <circle cx="200" cy="60" r="6" fill="#d60436" />
              <text x="208" y="64" fontSize="10" fill="#d60436" fontWeight="700">Subject</text>
              <text x="60" y="115" fontSize="9" fill="#666">~0.8 mi N–S · ~1.2 mi E–W · 412 SFR units</text>
            </svg>
          </div>
        </MockToolFrame>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card padding="14px 16px">
            <button onClick={() => setChecklistOpen(!checklistOpen)} style={{
              width: '100%', background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', padding: 0,
              display: 'flex', alignItems: 'center', gap: 10
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                background: complete ? '#edfbf4' : '#fff8ec',
                border: `1.5px solid ${complete ? '#1a9e5c' : '#e8860a'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 800,
                color: complete ? '#1a9e5c' : '#e8860a'
              }}>{doneCount}/{total}</div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#292929' }}>Research checklist</div>
                <div style={{ fontSize: 11, color: complete ? '#1a9e5c' : '#e8860a', fontWeight: 600, marginTop: 1 }}>
                  {complete ? 'All tasks complete' : `${total - doneCount} remaining — tap to view`}
                </div>
              </div>
              <Icon name={checklistOpen ? 'chevron-up' : 'chevron-down'} size={16} color="#888" />
            </button>
            {checklistOpen &&
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                {checklist.map(([label, done], i) =>
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5 }}>
                    <Icon name={done ? 'check-circle' : 'circle'} size={14} color={done ? '#1a9e5c' : '#bbb'} />
                    <span style={{ color: done ? '#1a9e5c' : '#666', textDecoration: done ? 'line-through' : 'none' }}>{label}</span>
                  </div>
              )}
              </div>
            }
          </Card>

          <Card padding={0} style={{ background: '#1a1d2b', color: '#fff' }}>
            <div style={{ padding: '14px 16px', borderBottom: '1px solid #2a2d3b', display: 'flex', alignItems: 'center', gap: 10 }}>
              <AIChip label="Socratic" tone="brand" size="sm" />
              <span style={{ fontSize: 12, color: '#cbd0e0' }}>One question before you advance</span>
            </div>
            <div style={{ padding: 16 }}>
              <div style={{ fontSize: 13, lineHeight: 1.55, color: '#e8eaf0', marginBottom: 14 }}>
                Based on your research, what's your <strong>preliminary read</strong> on this market — declining, stable, or increasing? Back it up with <em>one</em> data point.
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {['Increasing — DOM dropped from 28 to 12 over 12 months', 'Stable — sale-to-list near 100%', 'Declining — inventory rising'].map((c, i) =>
                <button key={i} style={{
                  background: i === 0 ? 'rgba(214,4,54,0.18)' : 'rgba(255,255,255,0.05)',
                  border: i === 0 ? '1px solid #d60436' : '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 6, padding: '10px 12px', textAlign: 'left',
                  color: '#fff', fontFamily: 'inherit', fontSize: 12, cursor: 'pointer'
                }}>{c}</button>
                )}
              </div>
              <div style={{ marginTop: 12, fontSize: 11, color: '#888', lineHeight: 1.5 }}>
                Defend your pick (min 50 chars) — AI will challenge if it's thin.
              </div>
            </div>
          </Card>

          <Button variant="primary" onClick={() => navigate('inspection-scheduling')}>
            Continue · Inspection scheduling <Icon name="arrow-right" size={14} color="#fff" />
          </Button>
        </div>
      </div>
    </div>);

}

// ═══ SCREEN 9: Inspection Scheduling Sim ═════════════════════
function S09_InspectionScheduling({ navigate }) {
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <PageHeader breadcrumb={['Step 1', 'Section II.D']} title="Inspection scheduling — David Osei"
      subtitle="Schedule physical access. AI plays the homeowner. Confirm date, time, who's present, restrictions, and contact info — or get tripped up by a curveball." />

      <Card padding={0}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={PERSONAS.david.avatar} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700 }}>{PERSONAS.david.name}</div>
            <div style={{ fontSize: 11, color: '#888' }}>{PERSONAS.david.role}</div>
          </div>
          <Badge color="warning">Curveball: tenant present</Badge>
        </div>
        <div style={{ padding: 18, height: 440, overflow: 'auto', background: '#fafbfc' }}>
          <ChatBubble from="persona" name="David Osei" role="Homeowner" time="2:08 PM" avatar={PERSONAS.david.avatar}>
            Hello, this is David. I understand you need to inspect the property? When were you thinking?
          </ChatBubble>
          <ChatBubble from="user" name="You" time="2:09 PM">
            Hi David — would Thursday morning work? I'd want about 60–75 minutes on site.
          </ChatBubble>
          <ChatBubble from="persona" name="David Osei" role="Homeowner" time="2:11 PM" avatar={PERSONAS.david.avatar}>
            Thursday I'm out of town until 4pm. <em>Also — I should mention, we have a tenant in the basement studio</em>. Lily. She's home most days but I'll need to give her notice.
          </ChatBubble>
          <ChatBubble from="user" name="You" time="2:13 PM">
            Got it — basement is rented. How about <strong>Friday at 10am</strong>? That gives you and Lily two days notice. I'll need access to all interior spaces including the basement unit.
          </ChatBubble>
          <ChatBubble from="ai" name="Socratic AI" time="2:14 PM">
            Good catch on the tenant — note this in your workfile, it may affect highest & best use. One more thing to confirm: <strong>day-of contact number</strong>, and <strong>any access restrictions</strong> (gates, dogs, alarms).
          </ChatBubble>
          <ChatBubble from="persona" name="David Osei" role="Homeowner" time="2:18 PM" avatar={PERSONAS.david.avatar}>
            Friday 10am works. Cell is 555-0142. We have a Doberman — I'll crate her. Side gate code is 4218. Lily's expecting you.
          </ChatBubble>
        </div>
        <div style={{ padding: '12px 18px', borderTop: '1px solid #f0f0f0', background: '#f8f9fb' }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 8 }}>Confirmation captured by AI</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
            {[['Date', 'Fri Mar 14'], ['Time', '10:00 AM'], ['Present', 'Owner + tenant'], ['Access', 'Side gate · 4218'], ['Contact', '555-0142']].map(([k, v], i) =>
            <div key={i} style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 6, padding: '8px 10px' }}>
                <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', letterSpacing: '.04em' }}>{k}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#292929' }}>{v}</div>
              </div>
            )}
          </div>
        </div>
      </Card>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
        <Button variant="ghost" onClick={() => navigate('preliminary-research')}>Back</Button>
        <Button variant="primary" onClick={() => navigate('mentor-review-1')}>
          Submit Step 1 · Mentor Review 1 <Icon name="arrow-right" size={14} color="#fff" />
        </Button>
      </div>
    </div>);

}

// ═══ SCREEN 10: Mentor Review 1 — AI Pre-Screen + Scheduling ══
function S10_MentorReview1({ navigate, tweaks }) {
  const strict = tweaks?.uspapStrict || 'normal';
  const flags = strict === 'strict' ? 2 : 1;
  const [detailsOpen, setDetailsOpen] = useS1(false);
  const [scheduleOpen, setScheduleOpen] = useS1(false);
  const [howOpen, setHowOpen] = useS1(false);

  return (
    <div>
      <PageHeader breadcrumb={['Step 1', 'Mentor Review 1']} title="Mentor Review 1 — Pre-screen"
      subtitle="The AI pre-screens everything from Step 1. Mentor sees a clean summary, not raw work. This is how we hold 1:20 mentor coverage." />

      {/* Your mentor (full width) */}
      <Card padding="18px 20px" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700 }}>Your mentor</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <img src={MENTOR.avatar} style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff', boxShadow: '0 1px 4px rgba(0,0,0,0.12)' }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{MENTOR.name}</div>
            <div style={{ fontSize: 12, color: '#888' }}>{MENTOR.role} · {MENTOR.yearsExperience} yrs experience</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: '#fff0f3', borderRadius: 6, fontSize: 11.5, color: '#d60436', fontWeight: 600 }}>
            <Icon name="calendar" size={12} color="#d60436" /> Office hours · {MENTOR.nextOH}
          </div>
          <div style={{ padding: '6px 12px', background: '#f4f5f7', borderRadius: 6, fontSize: 11.5, color: '#555' }}>
            <strong>3 in queue</strong> · async 48-hr
          </div>
        </div>
      </Card>

      {/* Mentor checkpoints (full width) */}
      <Card padding="18px 22px" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 700 }}>Mentor checkpoints · Report 1</div>
            <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>AI pre-screens every submission · mentor sees a clean summary</div>
          </div>
          <Badge color="brand">4 of 8 cleared</Badge>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => {
            const done = n <= 3,current = n === 4;
            const phase = ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'][n - 1];
            const p = PHASES.find((x) => x.id === phase);
            return (
              <div key={n} style={{
                flex: 1, padding: '10px 8px', borderRadius: 8, textAlign: 'center',
                background: done ? '#edfbf4' : current ? '#fff8ec' : '#fafafa',
                border: `1.5px solid ${done ? '#1a9e5c33' : current ? '#e8860a' : '#eee'}`
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: p.color, letterSpacing: '.04em', textTransform: 'uppercase' }}>MR {n}</div>
                <div style={{ fontSize: 11, color: '#444', marginTop: 4, lineHeight: 1.2 }}>{p.label.replace(/^Phase \d+ · /, '')}</div>
                <div style={{ marginTop: 6 }}>
                  {done ? <Icon name="check-circle" size={14} color="#1a9e5c" /> :
                  current ? <span style={{ fontSize: 9, fontWeight: 800, color: '#e8860a', letterSpacing: '.05em' }}>IN PROGRESS</span> :
                  <Icon name="lock" size={11} color="#bbb" />}
                </div>
              </div>);

          })}
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16 }}>
        <Card padding={0}>
          <div style={{ padding: '14px 18px', background: '#fafbfc', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 10, fontWeight: 800, color: '#1a9e5c', background: '#edfbf4', padding: '3px 8px', borderRadius: 4, letterSpacing: '.08em', textTransform: 'uppercase' }}>Pre-screen</span>
            <div style={{ fontSize: 13, fontWeight: 700, flex: 1, color: '#292929' }}>Step 1 readiness · 4 of 5 ready</div>
            <Badge color="warning">{flags} flag{flags !== 1 ? 's' : ''}</Badge>
          </div>
          <div style={{ padding: 18 }}>
            {/* Narrative on top */}
            <div style={{ background: '#fffbf2', border: '1px solid #e8860a33', borderRadius: 8, padding: 14, marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: 10, fontWeight: 800, color: '#e8860a', background: '#fff8ec', padding: '3px 8px', borderRadius: 4, letterSpacing: '.08em', textTransform: 'uppercase' }}>Mentor Pre-screen Note</span>
              </div>
              <div style={{ fontSize: 13, color: '#444', lineHeight: 1.55 }}>
                Your Step 1 work is solid. The engagement letter is tight and your inspection scheduling caught the tenant — well done. <strong style={{ color: '#d60436' }}>One flag</strong>: you didn't note the USPAP edition in the letter. James will likely ask about this — fix before the meeting and you'll be set.
              </div>
            </div>

            {/* Collapsible breakdown */}
            <button onClick={() => setDetailsOpen((o) => !o)} style={{
              width: '100%', padding: '10px 14px', background: '#fafafa',
              border: '1px solid #e8e8e8', borderRadius: 8, cursor: 'pointer',
              fontFamily: 'inherit', display: 'flex', alignItems: 'center', gap: 8,
              marginBottom: 8
            }}>
              <Icon name={detailsOpen ? 'chevron-down' : 'chevron-right'} size={14} color="#888" />
              <span style={{ fontSize: 12.5, fontWeight: 600, color: '#444', flex: 1, textAlign: 'left' }}>
                {detailsOpen ? 'Hide' : 'Show'} item-by-item breakdown
              </span>
              <span style={{ fontSize: 11, color: '#888' }}>4 ok · 1 flag</span>
            </button>
            {detailsOpen && [
            { label: 'Engagement letter', status: 'ok', detail: '6 of 6 USPAP scope elements present · AI pushback resolved (1)' },
            { label: 'Scope of work', status: 'ok', detail: 'Defined · matches engagement letter' },
            { label: 'Preliminary research', status: 'ok', detail: '5 of 5 desk-research tasks complete · market trend defended' },
            { label: 'Inspection scheduling', status: 'ok', detail: 'Date · time · access · contact captured · curveball noted' },
            { label: 'USPAP edition note', status: 'warn', detail: 'Edition not stated explicitly in engagement letter — mentor will likely flag' }].
            slice(0, 5 + (strict === 'strict' ? 0 : 0)).map((it, i) =>
            <div key={i} style={{
              display: 'flex', gap: 12, padding: 12, marginBottom: 8,
              background: it.status === 'ok' ? '#edfbf4' : '#fff8ec',
              borderRadius: 8, border: `1px solid ${it.status === 'ok' ? '#1a9e5c33' : '#e8860a33'}`
            }}>
                <div style={{
                width: 24, height: 24, borderRadius: 6, flexShrink: 0,
                background: it.status === 'ok' ? '#1a9e5c' : '#e8860a',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}>
                  <Icon name={it.status === 'ok' ? 'check' : 'alert-triangle'} size={13} color="#fff" strokeWidth={3} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: it.status === 'ok' ? '#1a9e5c' : '#e8860a' }}>{it.label}</div>
                  <div style={{ fontSize: 12, color: '#444', marginTop: 2 }}>{it.detail}</div>
                </div>
              </div>
            )}
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              <Button variant="outline" fullWidth onClick={() => navigate('engagement-letter')}>Revise first</Button>
              <Button variant="primary" fullWidth onClick={() => navigate('phase-2-launch')}>Submit to mentor anyway</Button>
            </div>
          </div>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card padding={0}>
            <button onClick={() => setScheduleOpen((o) => !o)} style={{
              width: '100%', padding: '16px 18px', background: 'none', border: 'none',
              cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
              display: 'flex', alignItems: 'center', gap: 12
            }}>
              <img src={MENTOR.avatar} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700 }}>Schedule live review</div>
                <div style={{ fontSize: 11.5, color: '#888', marginTop: 2 }}>{MENTOR.name} · 3 open slots this week</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button onClick={(e) => {e.stopPropagation();setHowOpen(true);}} title="How this works" style={{
                  background: '#fff8ec', border: '1px solid #e8860a33', borderRadius: '50%',
                  width: 24, height: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}>
                  <Icon name="info" size={12} color="#e8860a" />
                </button>
                <Icon name={scheduleOpen ? 'chevron-up' : 'chevron-down'} size={16} color="#888" />
              </div>
            </button>
            {scheduleOpen &&
            <div style={{ padding: '0 18px 18px', borderTop: '1px solid #f0f0f0', paddingTop: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 8 }}>Open slots</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
                  {[
                ['Thu 3:00 PM ET', '20 min · 3 ahead', false],
                ['Thu 4:30 PM ET', '20 min · 5 ahead', false],
                ['Fri 9:00 AM ET', '20 min · open', true]].
                map(([slot, info, open], i) =>
                <button key={i} style={{
                  background: open ? '#fff0f3' : '#fafafa',
                  border: open ? '1.5px solid #d60436' : '1px solid #e8e8e8',
                  borderRadius: 6, padding: '10px 12px', textAlign: 'left',
                  cursor: 'pointer', fontFamily: 'inherit',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: open ? '#d60436' : '#444' }}>{slot}</span>
                      <span style={{ fontSize: 11, color: '#888' }}>{info}</span>
                    </button>
                )}
                </div>
                <div style={{ padding: '8px 10px', background: '#f4f5f7', borderRadius: 6, fontSize: 11.5, color: '#666', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon name="zap" size={12} color="#888" />
                  Or <strong style={{ color: '#444' }}>submit async</strong> · 48-hr written turnaround
                </div>
              </div>
            }
          </Card>
        </div>
      </div>

      {/* How-this-works overlay */}
      {howOpen &&
      <div onClick={() => setHowOpen(false)} style={{
        position: 'fixed', inset: 0, background: 'rgba(20,22,30,0.55)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200,
        padding: 20, animation: 'fadeInUp 180ms ease'
      }}>
          <div onClick={(e) => e.stopPropagation()} style={{
          background: '#fff', borderRadius: 14, maxWidth: 460, width: '100%',
          padding: '22px 24px', boxShadow: '0 24px 64px rgba(0,0,0,0.3)', position: 'relative'
        }}>
            <button onClick={() => setHowOpen(false)} style={{
            position: 'absolute', right: 14, top: 14, background: 'none', border: 'none',
            cursor: 'pointer', padding: 4, color: '#888'
          }}>
              <Icon name="x" size={16} color="#888" />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#fff8ec', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="info" size={18} color="#e8860a" />
              </div>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 17, fontWeight: 800 }}>How mentor pre-screens work</div>
            </div>
            <div style={{ fontSize: 13.5, color: '#444', lineHeight: 1.6 }}>
              The AI pre-screen above is what your mentor <strong>opens first</strong> — they don't start from scratch. The summary, the flags, the narrative — all of it loads in their dashboard before your meeting.
              <br /><br />
              That means <strong>they spend their 20 minutes coaching, not auditing</strong>. The most common question we hear from cohort 04: <em>"why can James give me 20 focused minutes when he supervises 19 others?"</em> Now you know.
            </div>
            <div style={{ marginTop: 18, padding: 12, background: '#f4f5f7', borderRadius: 8, fontSize: 12, color: '#555', lineHeight: 1.5 }}>
              <strong>The pre-screen never replaces the human.</strong> It just removes the work that doesn't need a human — leaving the work that does.
            </div>
          </div>
        </div>
      }

      <div style={{ marginTop: 14, fontSize: 11, color: '#aaa', fontFamily: "'JetBrains Mono', monospace", textAlign: 'center' }}>
        xAPI · mentor review 1: AI pre-screen completed · mentor review 1: scheduled · pattern repeats for MR 2–8
      </div>
    </div>);

}

// ── Screens 2 content ─────────────────────────────────────────────
const { useState: useS2, useEffect: useE2 } = React;

// ═══ SCREEN 12: Step 2 Case Drop ════════════════════════════
function S12_CaseDrop({ navigate }) {
  return (
    <div>
      <PageHeader breadcrumb={['Report 1', 'Step 2 · Inspection']} title="Assignment dropped"
      subtitle="Mentor Review 1 cleared. Here's the full property card — pulled live from PropMix. Today's plan is AI-tailored to your pace." />

      {/* Estimates banner — at the top */}
      <Card padding="14px 18px" style={{ marginBottom: 14, background: 'linear-gradient(90deg, #fafbfc, #fff)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: '#fff8ec', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="clock" size={15} color="#e8860a" />
            </div>
            <div>
              <div style={{ fontSize: 10.5, color: '#888', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '.05em' }}>Estimated total</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#292929', fontFamily: "'Nunito', sans-serif", lineHeight: 1.1 }}>6–8 hrs · 2–3 sessions</div>
            </div>
          </div>
          <div style={{ width: 1, height: 36, background: '#eee' }} />
          <div>
            <div style={{ fontSize: 10.5, color: '#888', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '.05em' }}>Cohort median · Step 2</div>
            <div style={{ fontSize: 13, color: '#292929', marginTop: 2 }}>
              <strong style={{ color: '#1a9e5c' }}>5.4 hrs</strong> <span style={{ fontSize: 11, color: '#888', fontWeight: 500 }}>· you're trending faster</span>
            </div>
          </div>
          <div style={{ width: 1, height: 36, background: '#eee' }} />
          <div>
            <div style={{ fontSize: 10.5, color: '#888', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '.05em' }}>Inspection window</div>
            <div style={{ fontSize: 13, color: '#292929', marginTop: 2, fontWeight: 600 }}>Fri, Mar 14 · 10:00 AM ET</div>
          </div>
          <div style={{ flex: 1 }} />
          <AIChip label="AI-tailored plan" tone="brand" size="sm" />
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16 }}>
        <Card padding={0} style={{ overflow: 'hidden' }}>
          <div style={{ position: 'relative', height: 220 }}>
            <img src={SUBJECT.photo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7) 100%)' }} />
            <div style={{ position: 'absolute', top: 14, left: 14 }}><PhasePill phase="p2" /></div>
            <div style={{ position: 'absolute', bottom: 14, left: 16, color: '#fff' }}>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 24, fontWeight: 800 }}>{SUBJECT.address}</div>
              <div style={{ fontSize: 13, opacity: 0.9 }}>{SUBJECT.city} · {SUBJECT.style}</div>
            </div>
          </div>
          <div style={{ padding: '18px 22px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
              {[['GLA', '2,148 sf'], ['Beds/Bath', '4 / 2.5'], ['Year', '2008'], ['Lot', '0.31 ac']].map(([k, v], i) =>
              <div key={i} style={{ background: '#fafafa', borderRadius: 6, padding: '10px 12px' }}>
                  <div style={{ fontSize: 10.5, color: '#888', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '.05em' }}>{k}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#292929', marginTop: 2 }}>{v}</div>
                </div>
              )}
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 8 }}>Scope of work · from your engagement letter</div>
            <div style={{ background: '#fafafa', borderRadius: 8, padding: 14, fontSize: 12.5, color: '#444', lineHeight: 1.6, fontFamily: "'JetBrains Mono', monospace" }}>
              Intended use: mortgage origination · Intended user: First Summit Bank<br />
              Effective date: TBD upon inspection · Form: URAR (1004) · USPAP 2024–2025 ed.<br />
              Approaches: Sales Comparison (primary) + Cost (supporting) · Income N/A
            </div>
          </div>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card padding="16px 18px">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>Today's plan</div>
              <AIChip label="AI-tailored" tone="brand" size="sm" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
              ['Pull public records & zoning (PropMix)', '45 min', 'database'],
              ['Virtual neighborhood inspection', '1.5 hr', 'map'],
              ['Start improvements inspection', '2 hr', 'home']].
              map(([t, time, ic], i) =>
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: '#f4f5f7', borderRadius: 6 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 5, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={ic} size={12} color="#1b5e20" />
                  </div>
                  <span style={{ flex: 1, fontSize: 12.5, color: '#292929' }}>{t}</span>
                  <span style={{ fontSize: 11, color: '#888', fontFamily: "'JetBrains Mono', monospace" }}>{time}</span>
                </div>
              )}
            </div>
            <Button variant="primary" fullWidth onClick={() => navigate('property-research')} style={{ marginTop: 12 }}>
              Accept & open PropMix <Icon name="arrow-right" size={13} color="#fff" />
            </Button>
          </Card>
        </div>
      </div>
    </div>);

}

// ═══ SCREEN 13: Property Research (PropMix split) ════════════
function S13_PropertyResearch({ navigate }) {
  return (
    <div>
      <PageHeader breadcrumb={['Step 2', 'Section IV']} title="Property & site research"
      subtitle="PropMix on the left · your data-entry form on the right. AI cross-checks every entry against the source data." />

      <WorkfileCaptureButton step="p2" label="PropMix property card · 4218 Ridgewood Ln" source="PropMix public records" />

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
        <MockToolFrame tool="PropMix" tab="property-card" height={500}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
            ['LEGAL DESCRIPTION', 'Lot 14, Block 22, Glenmoor Estates Sub. Ph. III · Plat 442/87'],
            ['APN', '14-022-37-104'],
            ['CURRENT OWNER', 'OSEI, DAVID J. & PAULA M. (joint tenants)'],
            ['PRIOR SALE', 'Apr 2018 · $398,500 · arms-length conventional'],
            ['ZONING', 'R-1 Single-Family Residential · legally conforming'],
            ['FLOOD ZONE', 'X (minimal risk) · Map 39085C0312H · 11/2014'],
            ['ENVIRONMENTAL', 'No flags · radon zone 2 · no underground storage tanks'],
            ['EASEMENTS', '10ft public utility easement along rear lot line']].
            map(([k, v], i) =>
            <div key={i} style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 6, padding: '8px 12px' }}>
                <div style={{ fontSize: 9.5, fontWeight: 700, color: '#888', letterSpacing: '.05em' }}>{k}</div>
                <div style={{ fontSize: 12, color: '#292929', marginTop: 2, fontFamily: "'JetBrains Mono', monospace" }}>{v}</div>
              </div>
            )}
          </div>
        </MockToolFrame>

        <Card padding="16px 18px" style={{ height: 500, overflow: 'auto' }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Your entries · Section IV</div>
          {[
          ['Legal description', 'Lot 14, Block 22, Glenmoor Estates Sub. Ph. III'],
          ['APN', '14-022-37-104'],
          ['Zone', 'R-1'],
          ['Flood Zone', 'Zone X'],
          ['Last sale (date / price)', '04/2018 · $398,500'],
          ['Easements / encroachments noted', '10ft PUE rear lot']].
          map(([k, v], i) =>
          <div key={i} style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>{k}</label>
              <input value={v} readOnly style={{ width: '100%', padding: '8px 10px', border: '1px solid #e8e8e8', borderRadius: 6, fontSize: 12.5, background: '#fafafa', fontFamily: "'JetBrains Mono', monospace" }} />
            </div>
          )}
          <div style={{ background: '#edfbf4', border: '1px solid #1a9e5c33', borderRadius: 8, padding: 12, marginTop: 14, display: 'flex', gap: 10 }}>
            <Icon name="check-circle" size={16} color="#1a9e5c" />
            <div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#1a9e5c' }}>AI cross-check passed</div>
              <div style={{ fontSize: 11.5, color: '#444', marginTop: 2 }}>All 6 fields match PropMix source data within tolerance.</div>
            </div>
          </div>
          <Button variant="primary" fullWidth onClick={() => navigate('virtual-inspection')} style={{ marginTop: 14 }}>
            Continue · Virtual inspection <Icon name="arrow-right" size={13} color="#fff" />
          </Button>
        </Card>
      </div>
    </div>);

}

// ═══ SCREEN 14: Virtual Inspection ═══════════════════════════
function S14_VirtualInspection({ navigate }) {
  const [section, setSection] = useS2('improvements');
  const sections = {
    neighborhood: { label: 'Neighborhood (V)', icon: 'map' },
    site: { label: 'Site (VI)', icon: 'square' },
    improvements: { label: 'Improvements (VII)', icon: 'home' }
  };

  return (
    <div>
      <PageHeader breadcrumb={['Step 2', 'Sections V–VII']} title="Virtual inspection"
      subtitle="Move through neighborhood, site, then improvements. Annotation panel floats on the right — AI fires one Socratic question per section." />

      <div style={{ marginBottom: 14 }}>
        <VerifyThisCallout tool="Matterport" claim="3D scan presents the home — but Matterport renders what was scanned, not what's actually there now"
        compact
        verifySteps={[
        "Is the scan recent enough to reflect the current condition? Check the scan date in the metadata.",
        "Does the scan miss spaces? Closets, attic access, mechanical rooms often are skipped.",
        "Does the scan show actual condition (wear, paint, fixtures), or has it been staged/cleaned post-scan?"]
        } />
      </div>

      <WorkfileCaptureButton step="p2" label="Virtual inspection · annotated photos + Matterport scan" source="Matterport + PropMix" />

      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        {Object.entries(sections).map(([k, v]) =>
        <button key={k} onClick={() => setSection(k)} style={{
          padding: '8px 14px', border: '1px solid', borderRadius: 8,
          borderColor: section === k ? '#d60436' : '#e8e8e8',
          background: section === k ? '#fff0f3' : '#fff',
          color: section === k ? '#d60436' : '#666',
          fontSize: 12.5, fontWeight: section === k ? 700 : 500,
          cursor: 'pointer', fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', gap: 6
        }}>
            <Icon name={v.icon} size={13} color={section === k ? '#d60436' : '#888'} />
            {v.label}
          </button>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16 }}>
        <MockToolFrame
          tool={section === 'improvements' ? 'Matterport' : 'PropMix'}
          tab={section === 'improvements' ? '3D scan + photos' : section === 'site' ? 'aerial' : 'street view'}
          height={460}>
          
          {section === 'improvements' ?
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {[
            'photo-1568605114967-8130f3a36994',
            'photo-1600585154340-be6161a56a0c',
            'photo-1600596542815-ffad4c1539a9',
            'photo-1600607687939-ce8a6c25118c',
            'photo-1600585154526-990dced4db0d',
            'photo-1600210492486-724fe5c67fb0'].
            map((p, i) =>
            <div key={i} style={{ position: 'relative' }}>
                  <img src={`https://images.unsplash.com/${p}?w=300&q=70`} style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 6 }} />
                  <div style={{ position: 'absolute', bottom: 4, left: 4, background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '2px 6px', borderRadius: 3, fontSize: 9.5, fontFamily: "'JetBrains Mono', monospace" }}>{['Front', 'Kitchen', 'LR', 'Primary BR', 'Bsmt finish', 'Garage'][i]}</div>
                </div>
            )}
            </div> :
          section === 'site' ?
          <div style={{ background: '#dde8d8', borderRadius: 6, height: '100%', position: 'relative' }}>
              <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
                <rect x="0" y="0" width="400" height="400" fill="#dde8d8" />
                <path d="M 20 80 L 380 80 L 380 320 L 20 320 Z" fill="none" stroke="#888" strokeDasharray="4,3" />
                <rect x="140" y="160" width="120" height="100" fill="#a8845a" stroke="#5a3d20" strokeWidth="1.5" />
                <rect x="160" y="270" width="60" height="40" fill="#8a6c4a" stroke="#5a3d20" strokeWidth="1.2" />
                <text x="200" y="50" textAnchor="middle" fontSize="11" fill="#444" fontFamily="DM Sans" fontWeight="700">N</text>
                <text x="200" y="218" textAnchor="middle" fontSize="9" fill="#fff" fontFamily="DM Sans" fontWeight="700">House (2,148 sf)</text>
                <text x="200" y="295" textAnchor="middle" fontSize="9" fill="#fff" fontFamily="DM Sans" fontWeight="700">2-car gar</text>
                <text x="60" y="355" fontSize="10" fill="#444" fontFamily="DM Sans">Lot · 0.31 ac · level · public utilities · curb &amp; gutter</text>
              </svg>
            </div> :

          <div style={{ background: '#bcd', borderRadius: 6, height: '100%', position: 'relative', backgroundImage: `url(https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&q=70)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.6))' }} />
              <div style={{ position: 'absolute', bottom: 12, left: 12, color: '#fff', fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>Glenmoor Estates · Ph III · suburban · stable</div>
            </div>
          }
        </MockToolFrame>

        <Card padding={0} style={{ height: 460, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{sections[section].label} · annotations</div>
            <Badge color="brand">3 / 6</Badge>
          </div>
          <div style={{ padding: 16, flex: 1, overflow: 'auto' }}>
            {section === 'improvements' &&
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
              ['Construction type', 'Wood-frame · vinyl siding', true],
              ['Exterior condition', 'C3 · average · no deferred maintenance', true],
              ['Interior condition', 'C3 · standard finishes · updated kitchen 2020', true],
              ['Functional layout', '4 BR up · open kitchen/great room · finished bsmt studio', false],
              ['Roof condition', '', false],
              ['HVAC age / condition', '', false]].
              map(([k, v, done], i) =>
              <div key={i}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#666', display: 'block', marginBottom: 3 }}>{k}{!done && <span style={{ color: '#e8860a', marginLeft: 4 }}>*</span>}</label>
                    <input value={v} readOnly placeholder={done ? '' : 'Required before advancing'} style={{
                  width: '100%', padding: '7px 10px',
                  border: `1px solid ${done ? '#e8e8e8' : '#e8860a'}`,
                  borderRadius: 5, fontSize: 12, background: done ? '#fafafa' : '#fff8ec',
                  fontFamily: "'JetBrains Mono', monospace"
                }} />
                  </div>
              )}
              </div>
            }
          </div>
        </Card>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}>
        <Button variant="primary" onClick={() => navigate('gla-measurement')}>
          Continue · GLA measurement <Icon name="arrow-right" size={14} color="#fff" />
        </Button>
      </div>
    </div>);

}

// ═══ SCREEN 15: GLA Measurement ══════════════════════════════
function S15_GLA({ navigate }) {
  return (
    <div>
      <PageHeader breadcrumb={['Step 2', 'Section VIII']} title="GLA measurement"
      subtitle="Two-part. (A) Classify floor areas — what counts, what doesn't. (B) Calculate subject GLA from PropMix measurements." />

      <div style={{ marginBottom: 14 }}>
        <TextbookCallout topic="gla-ansi" why="ANSI Z765 is the standard — know what counts before you measure." />
      </div>

      <WorkfileCaptureButton step="p2" label="GLA worksheet · subject 2,148 sf reconciled" source="PropMix + own measurement" />

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16 }}>
        <Card padding={20}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 6 }}>Part A · Classification exercise</div>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Split-level · classify each colored region</div>
          <svg width="100%" viewBox="0 0 480 220" style={{ border: '1px solid #e8e8e8', borderRadius: 6, background: '#fafafa' }}>
            <rect x="40" y="40" width="160" height="100" fill="#bcd9c6" stroke="#1a9e5c" strokeWidth="1.5" />
            <text x="120" y="92" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1a9e5c" fontFamily="DM Sans">Above grade · 1,180 sf</text>
            <text x="120" y="108" textAnchor="middle" fontSize="9" fill="#1a9e5c" fontFamily="DM Sans">Living + kitchen + 2 BR</text>
            <rect x="220" y="40" width="120" height="100" fill="#bcd9c6" stroke="#1a9e5c" strokeWidth="1.5" />
            <text x="280" y="92" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1a9e5c" fontFamily="DM Sans">Above grade · 968 sf</text>
            <text x="280" y="108" textAnchor="middle" fontSize="9" fill="#1a9e5c" fontFamily="DM Sans">Bedrooms + bath upper</text>
            <rect x="360" y="40" width="80" height="100" fill="#fed8a4" stroke="#e8860a" strokeWidth="1.5" />
            <text x="400" y="80" textAnchor="middle" fontSize="10" fontWeight="700" fill="#e8860a" fontFamily="DM Sans">Garage</text>
            <text x="400" y="96" textAnchor="middle" fontSize="9" fill="#e8860a" fontFamily="DM Sans">Non-GLA</text>
            <rect x="40" y="150" width="300" height="60" fill="#fab1c0" stroke="#d60436" strokeWidth="1.5" />
            <text x="190" y="186" textAnchor="middle" fontSize="11" fontWeight="700" fill="#d60436" fontFamily="DM Sans">Below grade · finished basement (NOT GLA)</text>
            <text x="380" y="158" fontSize="10" fill="#444" fontFamily="DM Sans" fontWeight="700">Total GLA: 2,148 sf</text>
          </svg>
          <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
            <Badge color="success">Scenario 1 · 3/3</Badge>
            <Badge color="success">Scenario 2 · 3/3</Badge>
            <Badge color="success">Scenario 3 · 2/3</Badge>
          </div>
        </Card>

        <Card padding={20}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 6 }}>Part B · Subject calculation</div>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Calculate from PropMix measurements</div>
          <div style={{ background: '#fafafa', borderRadius: 8, padding: 14, fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: '#444', lineHeight: 1.7 }}>
            Lower level (above grade): 32′ × 28.5′ = <strong>912 sf</strong><br />
            Upper level: 32′ × 38.5′ = <strong>1,232 sf</strong><br />
            Bay window upper: 4 sf<br />
            <hr style={{ border: 'none', borderTop: '1px dashed #ccc', margin: '8px 0' }} />
            <strong>Calculated GLA: 2,148 sf</strong>
          </div>
          <div style={{ marginTop: 14, padding: 12, background: '#edfbf4', border: '1px solid #1a9e5c33', borderRadius: 8, fontSize: 12, color: '#444', lineHeight: 1.5 }}>
            <strong style={{ color: '#1a9e5c' }}>Match.</strong> Your 2,148 sf matches PropMix records exactly (0% variance · threshold ±2%).
          </div>
          <Button variant="primary" fullWidth onClick={() => navigate('sketch')} style={{ marginTop: 14 }}>
            Continue · Sketch in Apex <Icon name="arrow-right" size={13} color="#fff" />
          </Button>
        </Card>
      </div>
    </div>);

}

// ═══ SCREEN 16: Apex Sketch ══════════════════════════════════
function S16_Sketch({ navigate }) {
  return (
    <div>
      <PageHeader breadcrumb={['Step 2', 'Section IX']} title="Property sketch"
      subtitle="(A) Find 3 deliberate errors in the sample sketch. (B) Build the subject sketch — GLA must reconcile with your measurement." />

      <MockToolFrame tool="Apex Sketch" tab="subject sketch" height={500}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: 16, height: '100%' }}>
          <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #e8e8e8', padding: 14, position: 'relative' }}>
            <svg width="100%" viewBox="0 0 500 360">
              <defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="0.5" /></pattern></defs>
              <rect width="500" height="360" fill="url(#grid)" />
              {/* Lower level */}
              <polygon points="60,80 280,80 280,200 60,200" fill="#bcd9c6" stroke="#1a9e5c" strokeWidth="2" />
              <text x="170" y="135" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0d4a2e" fontFamily="DM Sans">Lower Level</text>
              <text x="170" y="155" textAnchor="middle" fontSize="11" fill="#0d4a2e" fontFamily="DM Sans">32′ × 28.5′ = 912 sf · GLA</text>
              {/* Upper level */}
              <polygon points="60,80 380,80 380,40 280,40 280,80" fill="none" stroke="#1a9e5c" strokeWidth="1.5" strokeDasharray="4,2" />
              <text x="220" y="65" textAnchor="middle" fontSize="10" fill="#1a9e5c" fontFamily="DM Sans">Upper · 1,232 sf · GLA</text>
              {/* Garage */}
              <polygon points="280,200 380,200 380,290 280,290" fill="#fed8a4" stroke="#e8860a" strokeWidth="2" />
              <text x="330" y="248" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7a4400" fontFamily="DM Sans">2-car garage</text>
              <text x="330" y="262" textAnchor="middle" fontSize="9" fill="#7a4400" fontFamily="DM Sans">attached · non-GLA</text>
              {/* Basement footprint dashed */}
              <polygon points="60,200 280,200 280,290 60,290" fill="none" stroke="#d60436" strokeWidth="1.5" strokeDasharray="4,2" />
              <text x="170" y="248" textAnchor="middle" fontSize="10" fill="#d60436" fontFamily="DM Sans">Basement (below grade · not GLA)</text>
              <text x="170" y="262" textAnchor="middle" fontSize="9" fill="#d60436" fontFamily="DM Sans">finished studio · 868 sf</text>
              {/* dimensions */}
              <text x="170" y="74" textAnchor="middle" fontSize="9" fill="#666" fontFamily="DM Sans">32′</text>
              <text x="50" y="140" textAnchor="middle" fontSize="9" fill="#666" fontFamily="DM Sans">28.5′</text>
            </svg>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ background: '#edfbf4', border: '1px solid #1a9e5c33', borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 6 }}>GLA Reconciliation</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, marginBottom: 4 }}><span>Sketch GLA</span><strong>2,148 sf</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, marginBottom: 4 }}><span>Measurement GLA</span><strong>2,148 sf</strong></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, color: '#1a9e5c', fontWeight: 700, paddingTop: 6, borderTop: '1px solid #1a9e5c33' }}><span>Variance</span><span>0.0% ✓</span></div>
            </div>
            <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 8, padding: 12, fontSize: 11.5, color: '#444' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '.04em', marginBottom: 6 }}>Part A · Errors caught</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div>✓ Bsmt counted as GLA</div>
                <div>✓ Garage labeled "living"</div>
                <div>✓ Bedroom dim flipped</div>
              </div>
            </div>
          </div>
        </div>
      </MockToolFrame>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}>
        <Button variant="primary" onClick={() => navigate('mentor-review-2')}>
          Submit Step 2 · Mentor Review 2 <Icon name="arrow-right" size={14} color="#fff" />
        </Button>
      </div>
    </div>);

}

// ═══ SCREEN 17: Mentor Review 2 ══════════════════════════════
function S17_MentorReview2({ navigate }) {
  return (
    <div>
      <PageHeader breadcrumb={['Step 2', 'Mentor Review 2']} title="Mentor Review 2 — Pre-screen"
      subtitle="Property research, virtual inspection, GLA, and sketch — all pre-screened by AI before the mentor sees it." />
      <Card padding={0}>
        <div style={{ padding: '14px 18px', background: '#fafbfc', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: '#1a9e5c', background: '#edfbf4', padding: '3px 8px', borderRadius: 4, letterSpacing: '.08em', textTransform: 'uppercase' }}>Pre-screen</span>
          <div style={{ fontSize: 13, fontWeight: 700, flex: 1, color: '#292929' }}>Step 2 readiness · 4 of 4 ready</div>
          <Badge color="success">All clear</Badge>
        </div>
        <div style={{ padding: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }} data-comment-anchor="270c563d1c-div-422-9">
          {[
          ['Property/site research', 'All PropMix fields complete · cross-check passed', 'ok'],
          ['Virtual inspection', 'V/VI/VII annotations captured · roof + HVAC noted', 'ok'],
          ['GLA measurement', '2,148 sf · 0.0% variance with PropMix', 'ok'],
          ['Sketch', 'Apex export validated · GLA reconciled', 'ok']].
          map(([label, detail, status], i) =>
          <div key={i} style={{ display: 'flex', gap: 10, padding: 10, background: '#edfbf4', borderRadius: 8, border: '1px solid #1a9e5c33' }}>
              <div style={{ width: 20, height: 20, borderRadius: 5, background: '#1a9e5c', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="check" size={11} color="#fff" strokeWidth={3} />
              </div>
              <div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: '#1a9e5c' }}>{label}</div>
                <div style={{ fontSize: 11, color: '#444', marginTop: 2 }}>{detail}</div>
              </div>
            </div>
          )}
        </div>
        <div style={{ padding: '0 18px 18px' }}>
          <div style={{ background: '#fffbf2', border: '1px solid #e8860a33', borderRadius: 8, padding: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: '#e8860a', background: '#fff8ec', padding: '3px 8px', borderRadius: 4, letterSpacing: '.08em', textTransform: 'uppercase' }}>Mentor Pre-screen Note</span>
            </div>
            <div style={{ fontSize: 12.5, color: '#444', marginTop: 4, lineHeight: 1.55 }}>
              Step 2 is clean — your sketch reconciled to the measurement on the first try, which is rare. James will likely move quickly through this review.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
            <Button variant="ghost" fullWidth>Submit async (48hr)</Button>
            <Button variant="primary" fullWidth onClick={() => navigate('market-analysis')}>Continue to Step 3 →</Button>
          </div>
        </div>
      </Card>
    </div>);

}

// ═══ SCREEN 18: Market Analysis ══════════════════════════════
function S18_Market({ navigate }) {
  return (
    <div>
      <PageHeader breadcrumb={['Step 3', 'Section XI.A–B']} title="Market analysis"
      subtitle="PropMix market dashboard left · structured analysis right · Socratic AI challenge below." />

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
        <MockToolFrame tool="PropMix" tab="market dashboard" height={500}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
            <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '.05em' }}>Median Sale · 12 mo</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#0a6ed1', marginTop: 2, fontFamily: "'Nunito', sans-serif" }}>$478,400</div>
              <div style={{ fontSize: 10.5, color: '#1a9e5c', fontWeight: 600, marginTop: 2 }}>↑ 4.2% YoY</div>
              <div style={{ marginTop: 6 }}><Sparkline data={[442, 448, 451, 456, 460, 464, 468, 470, 473, 475, 477, 478]} w={210} h={36} color="#0a6ed1" fill="rgba(10,110,209,0.12)" /></div>
            </div>
            <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '.05em' }}>Days on Market</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#0a6ed1', marginTop: 2, fontFamily: "'Nunito', sans-serif" }}>12 days</div>
              <div style={{ fontSize: 10.5, color: '#1a9e5c', fontWeight: 600, marginTop: 2 }}>↓ from 28 (12mo)</div>
              <div style={{ marginTop: 6 }}><BarMini data={[28, 26, 24, 22, 20, 18, 17, 15, 14, 13, 12, 12]} w={210} h={36} color="#0a6ed1" /></div>
            </div>
            <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '.05em' }}>Sale-to-List Ratio</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#0a6ed1', marginTop: 2, fontFamily: "'Nunito', sans-serif" }}>101.2%</div>
              <div style={{ fontSize: 10.5, color: '#888', marginTop: 2 }}>Multiple-offer market</div>
            </div>
            <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '.05em' }}>Absorption Rate</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#e8860a', marginTop: 2, fontFamily: "'Nunito', sans-serif" }}>2.8 mo</div>
              <div style={{ fontSize: 10.5, color: '#e8860a', fontWeight: 600, marginTop: 2 }}>Below 6mo equilibrium</div>
            </div>
          </div>
          <div style={{ marginBottom: 10 }}>
            <VerifyThisCallout tool="AVM" claim="CoreLogic $472,800 · HouseCanary $485,100 · PropMix $478,200"
            compact
            verifySteps={[
            "Pull the model card — what data does each AVM ingest? MLS only? Tax records only?",
            "Compare each AVM's confidence interval — wide bands mean low confidence",
            "Cross-check against the median sale and your own three comps — does one AVM agree more than the others?",
            "AVMs are reference, not authority. Don't quote them as your value."]
            } />
          </div>
          <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 8, padding: 12 }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 8 }}>AVM Cross-check (reference only)</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {[['CoreLogic', '$472,800'], ['HouseCanary', '$485,100'], ['PropMix AVM', '$478,200']].map(([k, v], i) =>
              <div key={i} style={{ background: '#eaf3ff', borderRadius: 6, padding: 8 }}>
                  <div style={{ fontSize: 10, color: '#888' }}>{k}</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#0a6ed1', fontFamily: "'Nunito', sans-serif" }}>{v}</div>
                </div>
              )}
            </div>
          </div>
        </MockToolFrame>

        <Card padding={20} style={{ height: 500, overflow: 'auto' }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Your conclusion</div>
          <label style={{ fontSize: 11, fontWeight: 600, color: '#666', display: 'block', marginBottom: 4 }}>Market trend</label>
          <select style={{ width: '100%', padding: '8px 10px', border: '1.5px solid #d60436', borderRadius: 6, fontSize: 13, fontFamily: 'inherit', background: '#fff0f3', color: '#d60436', fontWeight: 700, marginBottom: 14 }}>
            <option>Increasing</option><option>Stable</option><option>Declining</option>
          </select>
          <label style={{ fontSize: 11, fontWeight: 600, color: '#666', display: 'block', marginBottom: 4 }}>Supporting data points (3 req'd)</label>
          <div style={{ background: '#fafafa', borderRadius: 6, padding: 10, fontSize: 12, color: '#444', lineHeight: 1.6, marginBottom: 14 }}>
            1. DOM ↓ 28→12 (12mo)<br />2. Sale-to-list 101.2%<br />3. Absorption 2.8mo &lt; 6mo eq.
          </div>
          <div style={{ background: '#1a1d2b', color: '#fff', borderRadius: 8, padding: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}><AIChip label="Socratic" tone="brand" size="sm" /></div>
            <div style={{ fontSize: 12, color: '#e8eaf0', lineHeight: 1.5 }}>
              You concluded <em>increasing</em>. With absorption at 2.8 mo (below the 6-mo equilibrium), I agree the data leans that direction — but defend it: which of the three is your strongest support, and why?
            </div>
          </div>
          <Button variant="primary" fullWidth onClick={() => navigate('hbu')} style={{ marginTop: 14 }}>
            Continue · HBU 4-test <Icon name="arrow-right" size={13} color="#fff" />
          </Button>
        </Card>
      </div>
    </div>);

}

// ═══ SCREEN 19: HBU 4-Test ═══════════════════════════════════
function S19_HBU({ navigate, tweaks }) {
  return (
    <div>
      <PageHeader breadcrumb={['Step 3', 'Section XI.C']} title="Highest & best use"
      subtitle="The 4-test framework — sequential. Live USPAP SR1-3 scanner watches your narrative for conclusory statements." />

      <div style={{ marginBottom: 14 }}>
        <TextbookCallout topic="hbu" why="The 4 tests are sequential and every one of them must be addressed — re-read before you submit." />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
          { n: 1, title: 'Legally Permissible', state: 'done', body: 'R-1 zoning · current SFR use is legally conforming. No non-conforming elements; ADU not permitted in R-1.' },
          { n: 2, title: 'Physically Possible', state: 'done', body: '0.31 ac level lot, public utilities, no topographic constraints. Could support duplex footprint physically.' },
          { n: 3, title: 'Financially Feasible', state: 'current', body: 'Duplex conversion would require zoning variance (financially unfeasible) and rental rates ~$1,650/unit don\'t support construction cost. Current SFR use generates highest market value.' },
          { n: 4, title: 'Maximally Productive', state: 'pending', body: 'As vacant: SFR. As improved: continued SFR use. Current improvements represent HBU.' }].
          map((t) => {
            const isDone = t.state === 'done',isCurrent = t.state === 'current';
            return (
              <Card key={t.n} padding={18} style={{ border: isCurrent ? '1.5px solid #d60436' : '1px solid #eee', background: isCurrent ? '#fff8fa' : '#fff' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                    background: isDone ? '#1a9e5c' : isCurrent ? '#d60436' : '#e8e8e8',
                    color: isDone || isCurrent ? '#fff' : '#888',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800
                  }}>{isDone ? <Icon name="check" size={14} color="#fff" strokeWidth={3} /> : t.n}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#292929' }}>Test {t.n} · {t.title}</div>
                    <div style={{ fontSize: 12.5, color: '#444', lineHeight: 1.55, marginTop: 6 }}>{t.body}</div>
                  </div>
                </div>
              </Card>);

          })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card padding="14px 16px">
            <USPAPScanner strictness={tweaks?.uspapStrict || 'normal'} items={[
            { code: 'SR1-3', label: 'HBU support — 3/4 tests addressed', status: 'warn' },
            { code: 'SR1-3a', label: 'Legally permissible — supported', status: 'ok' },
            { code: 'SR1-3b', label: 'Physically possible — supported', status: 'ok' },
            { code: 'SR1-3c', label: 'Financially feasible — thin', status: 'warn' },
            { code: 'SR1-3d', label: 'Max productive — pending', status: 'pending' }]
            } />
          </Card>
          <Button variant="primary" onClick={() => navigate('mentor-review-3')}>
            Submit Step 3 · MR 3 <Icon name="arrow-right" size={14} color="#fff" />
          </Button>
        </div>
      </div>
    </div>);

}

// ═══ SCREEN 20: Mentor Review 3 ══════════════════════════════
function S20_MentorReview3({ navigate }) {
  return (
    <div>
      <PageHeader breadcrumb={['Step 3', 'Mentor Review 3']} title="Mentor Review 3 — Pre-screen" />
      <Card padding={0}>
        <div style={{ padding: '14px 18px', background: '#fafbfc', borderBottom: '1px solid #eee' }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: '#1a9e5c', background: '#edfbf4', padding: '3px 8px', borderRadius: 4, letterSpacing: '.08em', textTransform: 'uppercase', marginRight: 8 }}>Pre-screen</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#292929' }}>Step 3 · Market Analysis &amp; HBU</span>
        </div>
        <div style={{ padding: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
          ['Market trend conclusion', 'Increasing — 3/3 data points cited', 'ok'],
          ['HBU 4-test framework', '3 of 4 tests addressed; T4 pending', 'warn'],
          ['SR1-3 compliance', 'Test 3 narrative thin — mentor will push', 'warn'],
          ['AVM cross-check', 'CoreLogic + HouseCanary + PropMix noted', 'ok']].
          map(([l, d, s], i) =>
          <div key={i} style={{ padding: 12, background: s === 'ok' ? '#edfbf4' : '#fff8ec', border: `1px solid ${s === 'ok' ? '#1a9e5c33' : '#e8860a33'}`, borderRadius: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon name={s === 'ok' ? 'check-circle' : 'alert-triangle'} size={14} color={s === 'ok' ? '#1a9e5c' : '#e8860a'} />
                <div style={{ fontSize: 12.5, fontWeight: 700, color: s === 'ok' ? '#1a9e5c' : '#e8860a' }}>{l}</div>
              </div>
              <div style={{ fontSize: 11.5, color: '#444', marginTop: 4, paddingLeft: 22 }}>{d}</div>
            </div>
          )}
        </div>
        <div style={{ padding: '0 18px 18px' }}>
          <Button variant="primary" fullWidth onClick={() => navigate('comp-selection')}>Continue to Step 4 · Comp Selection →</Button>
        </div>
      </Card>
    </div>);

}

// ═══ SCREEN 21: Comp Selection (HERO SCREEN) ═════════════════
function S21_CompSelection({ navigate, tweaks }) {
  const [selected, setSelected] = useS2(['C1', 'C2', 'C3']);
  const intensity = tweaks?.aiIntensity || 'normal';

  return (
    <div>
      <PageHeader breadcrumb={['Step 4', 'Section XIII']} title="Comp selection — defend every pick"
      subtitle="Real PropMix MLS data · AI scores each candidate · you defend each selection against your Socratic AI partner." />

      <WorkfileGate step="p4" label="PropMix comp candidates · 47 properties + AI ranking" source="PropMix MLS">
        47 candidates with AI match scores. Capture the raw list <em>and</em> your three picks — including the ones you rejected and why.
      </WorkfileGate>

      <div style={{ marginBottom: 14 }}>
        <VerifyThisCallout tool="PropMix" claim="AI ranked C4 (87) higher than C3 (78) on its match score"
        verifySteps={[
        "What is the PropMix AI scoring on? Distance and GLA alone, or location quality + sale recency too?",
        "Check the raw MLS for each candidate — does the AI's ranking match what your own market knowledge says?",
        "Is the highest-scored comp in the same neighborhood, or just within a radius?",
        "Walk the AI's ranking against your three picks — if it disagrees, defend your pick with market evidence, not gut feel."]
        } />
      </div>

      <WorkfileCaptureButton step="p4" label="Comp selection · 3 picks defended" source="PropMix MLS + AI ranking" />

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 14 }}>
        {/* Left: MLS map + ranked list */}
        <Card padding={0} style={{ overflow: 'hidden' }}>
          <div style={{ height: 200, background: '#dde8d8', position: 'relative', backgroundImage: 'url(https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&q=70)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,30,15,0.35)' }} />
            <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} viewBox="0 0 700 200">
              <path d="M 50 30 L 600 25 L 650 100 L 600 175 L 100 170 Z" fill="rgba(214,4,54,0.18)" stroke="#d60436" strokeWidth="1.5" strokeDasharray="5,3" />
              <circle cx="350" cy="100" r="9" fill="#d60436" stroke="#fff" strokeWidth="2" />
              <text x="350" y="84" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff" fontFamily="DM Sans">SUBJECT</text>
              {COMPS.map((c, i) => {
                const x = 200 + i * 90,y = 70 + i % 2 * 60;
                const sel = selected.includes(c.id);
                return (
                  <g key={c.id}>
                    <circle cx={x} cy={y} r="11" fill={sel ? '#1a9e5c' : '#fff'} stroke={sel ? '#1a9e5c' : '#0a6ed1'} strokeWidth="2" />
                    <text x={x} y={y + 4} textAnchor="middle" fontSize="10" fontWeight="800" fill={sel ? '#fff' : '#0a6ed1'} fontFamily="DM Sans">{c.id}</text>
                  </g>);

              })}
              <text x="20" y="195" fontSize="10" fill="#fff" fontFamily="DM Sans" fontWeight="700">PropMix MLS · 47 closed sales · 12 mo · 1mi radius</text>
            </svg>
          </div>
          <div style={{ padding: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#888', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.05em' }}>Ranked candidates · AI match score</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {COMPS.map((c) => {
                const sel = selected.includes(c.id);
                return (
                  <div key={c.id} onClick={() => setSelected((s) => s.includes(c.id) ? s.filter((x) => x !== c.id) : [...s, c.id])}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10, padding: 8,
                    background: sel ? '#edfbf4' : '#fafafa',
                    border: `1.5px solid ${sel ? '#1a9e5c' : '#e8e8e8'}`,
                    borderRadius: 6, cursor: 'pointer', transition: 'all 120ms'
                  }}>
                    <img src={c.photo} style={{ width: 44, height: 36, objectFit: 'cover', borderRadius: 4 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#292929' }}>{c.id} · {c.address}</div>
                      <div style={{ fontSize: 10.5, color: '#888', fontFamily: "'JetBrains Mono', monospace" }}>{c.gla}sf · {c.beds}/{c.baths} · {c.dist}mi · sold {c.sold}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#292929', fontFamily: "'Nunito', sans-serif" }}>${c.sale.toLocaleString()}</div>
                      <div style={{ fontSize: 10, color: c.aiScore >= 90 ? '#1a9e5c' : c.aiScore >= 85 ? '#e8860a' : '#888', fontWeight: 700 }}>AI: {c.aiScore}</div>
                    </div>
                  </div>);

              })}
            </div>
            <div style={{ marginTop: 10, padding: 10, background: '#f4f5f7', borderRadius: 6, fontSize: 11, color: '#666' }}>
              <strong>Cohort heatmap:</strong> 14 of 19 peers picked C1, C2; 11 picked C3; only 4 picked C5.
            </div>
          </div>
        </Card>

        {/* Selected tray */}
        <Card padding="14px 16px">
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Selected · {selected.length}/5</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {selected.map((id) => {
              const c = COMPS.find((x) => x.id === id);
              return (
                <div key={id} style={{ background: '#fafafa', border: '1px solid #e8e8e8', borderRadius: 6, padding: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: 11.5, fontWeight: 700, color: '#1a9e5c' }}>{c.id}</div>
                      <div style={{ fontSize: 11, color: '#444' }}>{c.address.split(' ').slice(0, 2).join(' ')}</div>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}>${(c.sale / 1000).toFixed(0)}K</div>
                  </div>
                  <div style={{ marginTop: 6, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4, fontSize: 10, color: '#666', fontFamily: "'JetBrains Mono', monospace" }}>
                    <span>{c.gla}sf</span><span>{c.dist}mi</span><span>{c.dom}d DOM</span>
                  </div>
                </div>);

            })}
          </div>
          <div style={{ marginTop: 10, padding: 8, background: '#edfbf4', borderRadius: 6, fontSize: 11, color: '#1a9e5c', fontWeight: 600 }}>
            ✓ All 3 picks defended
          </div>
        </Card>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}>
        <Button variant="primary" onClick={() => navigate('mentor-review-4')}>
          Submit selections · MR 4 <Icon name="arrow-right" size={14} color="#fff" />
        </Button>
      </div>
    </div>);

}

// ═══ SCREEN 22: Mentor Review 4 ══════════════════════════════
function S22_MentorReview4({ navigate }) {
  const criteria = [
  {
    label: 'Comp selection rationale',
    desc: 'Three picks defended on market, not score',
    score: 3,
    descriptors: {
      4: 'Each pick defended on market evidence; rejected candidates also documented with reasoning.',
      3: 'Defenses present and credible, but reasoning leans on AI score rather than independent market judgment.',
      2: 'Some picks defended; others appear to follow PropMix\'s top-ranked output.',
      1: 'Accepted AI ranking without independent reasoning.'
    },
    note: "You picked C1/C2/C3 over the AI's top-scored C4. Defense was reasonable, but lean more on neighborhood boundary and bracketing logic — not 'AI is wrong.'"
  },
  {
    label: 'Proximity & market alignment',
    desc: 'Comps share the subject\'s market segment',
    score: 4,
    descriptors: {
      4: 'All comps in the subject\'s neighborhood boundary; same buyer pool.',
      3: 'Comps in close radius; one comp arguably from a different sub-market.',
      2: 'Radius-based selection; market alignment not explicitly addressed.',
      1: 'Comps span multiple market segments.'
    },
    note: 'All three within 0.7 mi and inside Glenmoor Estates. Clean.'
  },
  {
    label: 'Sale recency & time-adjustment readiness',
    desc: 'Closed sales within market-meaningful window',
    score: 2,
    descriptors: {
      4: 'All comps closed within 90 days; minimal time adjustment expected.',
      3: 'Older comps included with a clear time-adjustment plan documented.',
      2: 'Older comp included without an articulated time-adjustment approach.',
      1: 'Multiple stale comps; no time adjustment plan.'
    },
    note: 'C3 closed 14 months ago. You\'ll need a defensible monthly adjustment derived from paired sales — not an industry rule of thumb.',
    gap: 'comp-selection'
  },
  {
    label: 'Bracketing the subject',
    desc: 'Picks bracket subject on GLA, beds, baths',
    score: 3,
    descriptors: {
      4: 'Subject is bracketed on all primary characteristics.',
      3: 'Subject is bracketed on most primary characteristics; one parameter is one-sided.',
      2: 'Bracketing addressed only on price; physical brackets not analyzed.',
      1: 'No bracketing analysis.'
    },
    note: 'GLA bracket: 2,055 – 2,210 (subject 2,148) — good. Bath bracket is one-sided (all comps 2.5 or 3 baths). Acknowledge.'
  }];

  return (
    <div>
      <PageHeader breadcrumb={['Step 4', 'Mentor Review 4']} title="Mentor Review 4 — Sales Analysis"
      subtitle="Asynchronous review by James Mendel, MAI. Submitted Wed 4:18 PM · returned Thu 9:42 AM · turnaround 17 hr." />

      <MentorRubric
        criteria={criteria}
        feedback="Strong comp set overall. The basement-finish adjustment will get hit on the next review — set up the paired sales now. Where I want you to grow: your defense of C3 over C4 leaned on 'I trust my read of the market more than the AI.' That's the right instinct but the wrong articulation. Show me a market mechanism. Otherwise: clean. Continue."
        asyncMeta="Submitted Wed 4:18 PM · returned Thu 9:42 AM · 17 hr turnaround"
        gapReferences={[
        { topic: 'comp-selection', why: 'Selecting comps is a market judgment, not a score — re-read.' },
        { topic: 'adjustments', why: 'You\'ll need paired-sales support for the time adjustment on C3.' }]
        }
        onOpenTextbook={(t) => window.__openTextbook?.(t)} />
      

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 16 }}>
        <Button variant="ghost" onClick={() => navigate('comp-selection')}>Revise selection</Button>
        <Button variant="primary" onClick={() => navigate('adjustment-grid')}>
          Continue to Step 5 · Adjustment Grid <Icon name="arrow-right" size={13} color="#fff" />
        </Button>
      </div>
    </div>);

}

// ── Export everything ─────────────────────────────────────────────
export {
  AIChip, Avatar, Badge, BarMini, Button, C, COHORT_FEED, COMPS, Card, CardSection, ChatBubble, CheckItem, CohortFeedItem, CompressionCurve, Input, MCKISSOCK_TEXTBOOK, MENTOR, MENTOR_VIDEOS, MentorBadge, MentorRubric, MentorVideoModal, MentorVideoTile, MockToolFrame, NAV_ITEMS, OFFICE_HOURS, OfficeHoursWidget, PERSONAS, PHASES, PageHeader, PhasePill, PhaseRoadmap, ProgressRing, S00_BeforeYouStart, S01_Enrollment, S02_TechSetup, S03_Dashboard, S04_Phase1Intro, S05_Ethics, S06_ToolOrientation, S07_Engagement, S08_PrelimResearch, S09_InspectionScheduling, S10_MentorReview1, S12_CaseDrop, S13_PropertyResearch, S14_VirtualInspection, S15_GLA, S16_Sketch, S17_MentorReview2, S18_Market, S19_HBU, S20_MentorReview3, S21_CompSelection, S22_MentorReview4, S30b_Workfile, STATIC_USPAP_CHECKLIST, STEPS, SUBJECT, S_MentorsCorner, S_OfficeHours, Sidebar, Sparkline, StatTile, StaticUSPAPChecklist, StepTracker, Textarea, TextbookCallout, TextbookModal, Toast, ToolCard, TopBar, USPAPScanner, VerifyThisCallout, WorkfileCaptureButton, WorkfileDashboardCard, WorkfileGate, addToWorkfile, loadWorkfile, useWorkfile
};
