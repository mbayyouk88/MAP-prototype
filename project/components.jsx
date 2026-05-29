// PAREA LMS — Shared Components
// Exports to window for use in main app

const { useState, useEffect, useRef } = React;

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

// ── Icon ─────────────────────────────────────────────────────
function Icon({ name, size = 16, color = 'currentColor', strokeWidth = 1.75 }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.innerHTML = '';
      const el = document.createElement('i');
      el.setAttribute('data-lucide', name);
      ref.current.appendChild(el);
      lucide.createIcons({ nodes: [el] });
      const svg = ref.current.querySelector('svg');
      if (svg) {
        svg.setAttribute('width', size);
        svg.setAttribute('height', size);
        svg.setAttribute('stroke', color);
        svg.setAttribute('stroke-width', strokeWidth);
      }
    }
  }, [name, size, color, strokeWidth]);
  return <span ref={ref} style={{ display: 'inline-flex', alignItems: 'center', lineHeight: 0 }} />;
}

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
          <img src={window.__logoSrc || '../assets/Colibri_Logo_COLOR.png'} alt="McKissock" style={{ height: 22, width: 'auto' }} />
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

// Export to window
Object.assign(window, {
  C, Icon, Button, Badge, Avatar, Card, CardSection,
  StepTracker, CheckItem, Textarea, Input, Toast,
  TopBar, Sidebar, NAV_ITEMS, PageHeader, ToolCard
});