// PAREA Combined — Screens 1-11 (Pre-Program + Step 1)

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
    setTimeout(() => { setVerifying(false); setVerified(true); }, 1800);
  };

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', paddingTop: 8 }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'linear-gradient(90deg, #d60436, #ff5577)',
          color: '#fff', padding: '6px 14px', borderRadius: 999,
          fontSize: 11, fontWeight: 800, letterSpacing: '.08em', textTransform: 'uppercase',
          marginBottom: 18,
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="3" fill="#fff"/></svg>
          AI-First PAREA Program
        </div>
        <h1 style={{ fontFamily: "'Nunito', sans-serif", fontSize: 38, fontWeight: 800, color: '#292929', lineHeight: 1.1, margin: 0, letterSpacing: '-0.02em' }}>
          Licensed Residential Appraiser Path
        </h1>
        <p style={{ fontSize: 15, color: '#666', marginTop: 12, lineHeight: 1.55 }}>
          A 6-month practicum with real tools (PropMix, True Footage, Apex Sketch),<br/>
          AI-graded checkpoints, and 1:20 mentor coverage. Three full USPAP reports — one certificate.
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0, marginBottom: 28 }}>
        {['Verify Prereq', 'Tech Setup', 'Cohort Assign'].map((s, i) => {
          const done = i < step - 1, active = i === step - 1;
          return (
            <React.Fragment key={i}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: done ? '#1a9e5c' : active ? '#d60436' : '#fff',
                  border: `2px solid ${done ? '#1a9e5c' : active ? '#d60436' : '#ccc'}`,
                  color: (done || active) ? '#fff' : '#999',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: 12,
                }}>{done ? <Icon name="check" size={12} color="#fff" strokeWidth={3}/> : i + 1}</div>
                <span style={{ fontSize: 12, fontWeight: active ? 700 : 500, color: active ? '#292929' : '#888' }}>{s}</span>
              </div>
              {i < 2 && <div style={{ width: 60, height: 2, background: done ? '#1a9e5c' : '#e0e0e0', margin: '0 14px' }}/>}
            </React.Fragment>
          );
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
            border: '1px solid #e8e8e8', borderRadius: 8, background: '#fafafa', color: '#292929',
          }}>
            <option>Ohio — accepts PAREA, AQB-aligned</option>
            <option>California</option><option>Texas</option><option>New York</option>
          </select>
        </div>

        <div style={{
          border: uploaded ? `2px solid ${verified ? '#1a9e5c' : '#d60436'}` : '2px dashed #d0d0d0',
          borderRadius: 10, padding: 26, textAlign: 'center',
          background: uploaded ? (verified ? '#edfbf4' : '#fff8ec') : '#fafafa',
          transition: 'all 200ms',
        }}>
          {!uploaded ? (
            <>
              <Icon name="upload-cloud" size={32} color="#888"/>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 10, color: '#292929' }}>Drop transcript PDF or click to browse</div>
              <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>AI parses transcript · verifies 150-hr threshold · flags discrepancies</div>
              <Button variant="primary" onClick={handleUpload} style={{ marginTop: 14 }}>
                <Icon name="file-up" size={14} color="#fff"/> Upload transcript
              </Button>
            </>
          ) : verifying ? (
            <>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <AIChip label="AI Parser" tone="dark"/>
                <div style={{
                  width: 16, height: 16, border: '2px solid #d60436', borderTopColor: 'transparent',
                  borderRadius: '50%', animation: 'spin 700ms linear infinite',
                }}/>
                <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              </div>
              <div style={{ fontSize: 14, color: '#292929' }}>Reading <em>transcript-2025.pdf</em> · matching against AQB course catalog…</div>
            </>
          ) : (
            <>
              <Icon name="check-circle" size={32} color="#1a9e5c"/>
              <div style={{ fontSize: 14, fontWeight: 700, marginTop: 8, color: '#1a9e5c' }}>Verified · 154 hours of qualifying education</div>
              <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
                Basic Appraisal Principles ✓ · Procedures ✓ · USPAP 15-Hr ✓ · Residential Site Valuation ✓
              </div>
              <Button variant="primary" onClick={() => navigate('tech-setup')} style={{ marginTop: 14 }}>
                Continue to tech setup <Icon name="arrow-right" size={14} color="#fff"/>
              </Button>
            </>
          )}
        </div>

        <div style={{ marginTop: 18, padding: '12px 14px', background: '#eaf3ff', borderRadius: 8, fontSize: 12, color: '#0a6ed1', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
          <Icon name="info" size={14} color="#0a6ed1"/>
          <div><strong>Why we need this:</strong> AQB requires 150-hr prereq before practicum. If your transcript falls short, we'll route you to qualifying education instead — no dead ends.</div>
        </div>
      </Card>

      <div style={{ textAlign: 'center', marginTop: 16, fontSize: 11, color: '#aaa', fontFamily: "'JetBrains Mono', monospace" }}>
        xAPI · learner attempted enrollment → prerequisite verified: {verified ? 'true' : '—'}
      </div>
    </div>
  );
}

// ═══ SCREEN 2: Technology Setup ══════════════════════════════
function S02_TechSetup({ navigate }) {
  const [connected, setConnected] = useS1({ propmix: true, truefootage: true, apex: false, camera: true });
  const allDone = Object.values(connected).every(Boolean);

  const TOOLS = [
    { id: 'propmix', name: 'PropMix', desc: 'Property data, MLS, public records, AVMs', color: '#0a6ed1', logo: 'P' },
    { id: 'truefootage', name: 'True Footage', desc: 'Report writing, URAR forms, Marshall & Swift cost data', color: '#1f6f5b', logo: 'T' },
    { id: 'apex', name: 'Apex Sketch', desc: 'Property sketches and GLA validation', color: '#6f3fb5', logo: 'A' },
  ];

  return (
    <div style={{ maxWidth: 980, margin: '0 auto' }}>
      <PageHeader breadcrumb={['Pre-Program']} title="Connect your real tools"
        subtitle="This program uses production tools — not simulations. Connect each account once; we'll log every session via xAPI."/>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 22 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {TOOLS.map(t => {
            const isConn = connected[t.id];
            return (
              <Card key={t.id} padding="18px 20px" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, background: t.color + '15', color: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 800, fontFamily: "'Nunito', sans-serif" }}>{t.logo}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#292929' }}>{t.name}</div>
                  <div style={{ fontSize: 12.5, color: '#666', marginTop: 2 }}>{t.desc}</div>
                  {isConn && (
                    <div style={{ fontSize: 11, color: '#1a9e5c', marginTop: 5, fontFamily: "'JetBrains Mono', monospace", display: 'flex', alignItems: 'center', gap: 5 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#1a9e5c', boxShadow: '0 0 6px #1a9e5c' }}/>
                      OAuth handshake complete · sarah.h@learner.parea
                    </div>
                  )}
                </div>
                {isConn ? (
                  <Badge color="success">Connected</Badge>
                ) : (
                  <Button variant="primary" size="sm" onClick={() => setConnected({ ...connected, [t.id]: true })}>
                    Connect {t.name}
                  </Button>
                )}
              </Card>
            );
          })}

          <Card padding="14px 20px" style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Icon name="camera" size={18} color="#666"/>
            <div style={{ flex: 1, fontSize: 13 }}>I have access to a measuring device, camera, and stable broadband (10+ Mbps).</div>
            <Badge color="success">Confirmed</Badge>
          </Card>

          <div style={{ marginTop: 8, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <Button variant="ghost" onClick={() => navigate('welcome')}>Back</Button>
            <Button variant="primary" disabled={!allDone} onClick={() => navigate('home')}>
              {allDone ? 'Continue to cohort assignment' : 'Connect all tools first'} <Icon name="arrow-right" size={14} color="#fff"/>
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
              'AI tracks every keystroke via xAPI · feeds your portfolio',
            ].map((t, i) => (
              <li key={i} style={{ fontSize: 12.5, lineHeight: 1.5, display: 'flex', gap: 8, color: '#444' }}>
                <Icon name="check" size={13} color="#d60436" strokeWidth={3}/>
                {t}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

// ═══ SCREEN 3: Cohort Dashboard (the analytics hero) ═════════
function S03_Dashboard({ navigate, tweaks }) {
  const showCohort = tweaks?.showCohortFeed !== false;

  return (
    <div>
      <CollapsibleSection title="Learning Dashboard" subtitle="Your progress metrics across the practicum · expand to view" icon="chart-line" defaultOpen={false}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 16 }}>
          <StatTile label="Cohort progress" value="49%" sub="vs cohort median 41%" trend="+8%" icon="trending-up" color="#1a9e5c"/>
          <StatTile label="Hours invested" value="68" sub="this report · 142 total" icon="clock"/>
          <StatTile label="AI overrides" value="14" sub="defended · 11 accepted" trend="79%" icon="git-branch" color="#0a6ed1"/>
          <StatTile label="Workfile items" value="—" sub="captured this report" icon="folder" color="#7b1fa2"/>
        </div>
      </CollapsibleSection>

      {/* Hero strip — current report + AI nudge */}
      <div style={{
        background: 'linear-gradient(120deg, #fff 0%, #fff5f7 65%, #ffe4eb 100%)',
        borderRadius: 14, padding: '20px 24px', color: '#292929',
        display: 'flex', alignItems: 'center', gap: 22, marginBottom: 18,
        position: 'relative', overflow: 'hidden',
        border: '1px solid #f4d4dc',
      }}>
        <div style={{ position: 'absolute', right: -40, top: -40, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(214,4,54,0.10) 0%, transparent 65%)' }}/>
        <div style={{ flex: 1, zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 10, fontWeight: 800, color: '#d60436', background: '#fff0f3', padding: '3px 8px', borderRadius: 4, letterSpacing: '.08em', textTransform: 'uppercase' }}>Up Next</span>
            <PhasePill phase="p4" size="sm"/>
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
          Resume <Icon name="arrow-right" size={15} color="#fff"/>
        </Button>
      </div>

      {/* Report header + collapsible roadmap */}
      <CompactReportHeader currentPhase="p4" completedPhases={['p1','p2','p3']}/>

      {/* Workfile + Office Hours — the always-on cohort tools */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 16, marginBottom: 18 }}>
        <WorkfileDashboardCard navigate={navigate}/>
        <OfficeHoursWidget navigate={navigate}/>
      </div>
    </div>
  );
}

function CompactReportHeader({ currentPhase, completedPhases = [] }) {
  const [open, setOpen] = useS1(false);
  const currentIdx = PHASES.slice(1).findIndex(p => p.id === currentPhase);
  return (
    <div style={{ marginBottom: 20 }}>
      <Card padding="14px 18px">
        <button onClick={() => setOpen(o => !o)} style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 14, padding: 0,
          textAlign: 'left', fontFamily: 'inherit',
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 22, fontWeight: 800, color: '#111', letterSpacing: '-0.015em' }}>
              Report 1 · Conventional Purchase
            </div>
            <div style={{ fontSize: 12, color: '#888', marginTop: 3, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span>4218 Ridgewood Ln · Glenmoor, OH 44023</span>
              <span style={{ color: '#ddd' }}>•</span>
              <Icon name="zap" size={11} color="#d60436"/>
              <strong style={{ color: '#d60436' }}>Step {currentIdx + 1} of 8</strong>
              <span style={{ color: '#aaa' }}>· 4 of 8 mentor checkpoints cleared</span>
            </div>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '6px 10px', background: '#f4f5f7', borderRadius: 6,
            fontSize: 11.5, fontWeight: 600, color: '#666',
          }}>
            {open ? 'Hide steps' : 'Show steps'}
            <Icon name={open ? 'chevron-up' : 'chevron-down'} size={13} color="#666"/>
          </div>
        </button>

        {open && (
          <div style={{ marginTop: 14, paddingTop: 14, borderTop: '1px solid #f0f0f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              {PHASES.slice(1).map((p, i) => {
                const isCurrent = p.id === currentPhase;
                const isDone = completedPhases.includes(p.id);
                const bg = isDone ? '#1a9e5c' : isCurrent ? p.color : '#fafafa';
                const fg = (isDone || isCurrent) ? '#fff' : '#888';
                const border = isCurrent ? p.color : isDone ? '#1a9e5c' : '#e8e8e8';
                return (
                  <div key={p.id} title={p.label} style={{
                    flex: 1, padding: '8px 6px', borderRadius: 6,
                    background: bg, color: fg, border: `1px solid ${border}`,
                    fontSize: 11, fontWeight: 700, textAlign: 'center',
                    display: 'flex', flexDirection: 'column', gap: 2,
                    transition: 'all 180ms',
                  }}>
                    <div style={{ fontSize: 9.5, opacity: 0.75, letterSpacing: '.04em' }}>STEP</div>
                    <div style={{ fontSize: 13, fontFamily: "'Nunito', sans-serif", fontWeight: 800 }}>{i + 1}</div>
                  </div>
                );
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
                    fontWeight: isCurrent ? 700 : 500,
                  }}>
                    <strong style={{ fontFamily: "'Nunito', sans-serif" }}>{i + 1}.</strong>
                    {p.label.replace(/^Step \d+ · /, '')}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

function Row({ dot, label, muted, pulse }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, opacity: muted ? 0.55 : 1 }}>
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: dot, animation: pulse ? 'pulse 1.4s ease-in-out infinite' : 'none' }}/>
      <span style={{ fontSize: 11.5 }}>{label}</span>
    </div>
  );
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
    { label: 'Comm. of Results', val: 0.35 },
  ];
  const cx = 130, cy = 110, r = 78;
  const angle = (i) => (i / skills.length) * Math.PI * 2 - Math.PI / 2;
  const pt = (i, v) => [cx + Math.cos(angle(i)) * r * v, cy + Math.sin(angle(i)) * r * v];
  const polygon = skills.map((s, i) => pt(i, s.val).join(',')).join(' ');
  const cohortAvg = skills.map((s, i) => pt(i, 0.55).join(',')).join(' ');

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <svg width="260" height="220">
        {[0.25, 0.5, 0.75, 1].map(g => (
          <polygon key={g}
            points={skills.map((s, i) => pt(i, g).join(',')).join(' ')}
            fill="none" stroke="#eee" strokeWidth="1"/>
        ))}
        {skills.map((s, i) => {
          const [x, y] = pt(i, 1);
          return <line key={'l'+i} x1={cx} y1={cy} x2={x} y2={y} stroke="#eee" strokeWidth="1"/>;
        })}
        <polygon points={cohortAvg} fill="#88888822" stroke="#888" strokeWidth="1" strokeDasharray="3,3"/>
        <polygon points={polygon} fill="#d6043622" stroke="#d60436" strokeWidth="2"/>
        {skills.map((s, i) => {
          const [x, y] = pt(i, s.val);
          return <circle key={'c'+i} cx={x} cy={y} r="3" fill="#d60436"/>;
        })}
        {skills.map((s, i) => {
          const [x, y] = pt(i, 1.18);
          return <text key={'t'+i} x={x} y={y} textAnchor="middle" fontSize="9" fill="#666" fontFamily="DM Sans" fontWeight="600">{s.label}</text>;
        })}
      </svg>
    </div>
  );
}

// ═══ SCREEN 4: Step 1 Intro ═════════════════════════════════
function S04_Phase1Intro({ navigate }) {
  return (
    <div>
      <PageHeader breadcrumb={['Report 1', 'Step 1 · Problem ID']} title="Section I & II — Frame the assignment"
        subtitle="Before a single comp is pulled, an appraiser frames the problem. You'll cover ethics, tool orientation, then run an AI-simulated engagement letter and inspection scheduling."/>

      <Card padding={0} style={{ overflow: 'hidden', marginBottom: 14 }}>
        <div style={{
          height: 160, background: 'linear-gradient(120deg, #6a1b9a 0%, #d60436 100%)',
          padding: 22, color: '#fff', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        }}>
          <div style={{ position: 'absolute', right: 20, top: 20, opacity: 0.2 }}>
            <Icon name="file-search" size={120} color="#fff"/>
          </div>
          <PhasePill phase="p1"/>
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
              <Step icon="shield" label="Appraiser independence & public trust" est="20 min"/>
              <Step icon="book-open" label="USPAP introduction · Ethics Rule" est="30 min"/>
              <Step icon="tool" label="Tool orientation · PropMix, True Footage, Apex" est="20 min"/>
            </ul>
          </div>
          <div style={{ flexShrink: 0, alignSelf: 'flex-end' }}>
            <Button variant="primary" onClick={() => navigate('ethics-lesson')}>
              Start Section I <Icon name="arrow-right" size={13} color="#fff"/>
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
              <Step icon="message-circle" label="Engagement letter sim — Maya Chen, loan officer" est="45 min" ai/>
              <Step icon="search" label="Preliminary research · public records, zoning, flood" est="60 min"/>
              <Step icon="calendar" label="Inspection scheduling sim — David Osei, owner" est="20 min" ai/>
            </ul>
          </div>
          <div style={{ flexShrink: 0, alignSelf: 'flex-end' }}>
            <Button variant="outline" disabled>
              Locked · finish Section I <Icon name="lock" size={13} color="#a3a3a3"/>
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
              ['Mentor Review 1 cleared', 'lock', false],
            ].map(([label, icon, done], i) => (
              <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5, color: done ? '#1a9e5c' : '#666' }}>
                <Icon name={icon} size={13} color={done ? '#1a9e5c' : '#bbb'}/>
                <span style={{ textDecoration: done ? 'line-through' : 'none' }}>{label}</span>
              </li>
            ))}
          </ul>
        </Card>
        <Card padding="18px 20px" style={{ background: '#fafbfc' }}>
          <div style={{ fontSize: 10, fontWeight: 800, color: '#d60436', letterSpacing: '.08em', textTransform: 'uppercase' }}>AI in this step</div>
          <div style={{ marginTop: 10, fontSize: 12.5, lineHeight: 1.55, color: '#444' }}>
            The AI plays your <strong>client</strong> (Maya, the loan officer) and your <strong>contact</strong> (David, the homeowner). Both push back. Both will catch a sloppy scope of work.
          </div>
        </Card>
      </div>
    </div>
  );
}

function Step({ icon, label, est, ai }) {
  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0', fontSize: 13 }}>
      <Icon name={icon} size={14} color="#7b1fa2"/>
      <span style={{ flex: 1 }}>{label}</span>
      {ai && <AIChip label="AI" tone="brand" size="sm"/>}
      <span style={{ fontSize: 11, color: '#888' }}>{est}</span>
    </li>
  );
}

// ═══ SCREEN 5: Ethics Lesson ═════════════════════════════════
function S05_Ethics({ navigate }) {
  const [answer, setAnswer] = useS1(null);
  const correct = 1;
  const choices = [
    'Complete the appraisal and try to reach the number if defensible',
    'Decline the assignment — lender pressure violates appraiser independence',
    'Ask the borrower for more information before deciding',
    'Complete the appraisal and note the pressure in the workfile',
  ];

  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <PageHeader breadcrumb={['Step 1', 'Section I.A']} title="Ethics & independence"
        subtitle="The Ethics Rule isn't paperwork — it's the spine of public trust. Read, then prove it on the case."/>

      <Card padding="24px 28px">
        <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 18 }}>
          <div style={{ width: 40, height: 40, borderRadius: 8, background: '#f3e5f5', color: '#6a1b9a', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name="shield" size={20} color="#6a1b9a"/>
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
              const bg = !showResult ? (picked ? '#fff0f3' : '#fff') : isCorrect ? '#edfbf4' : picked ? '#fff0f3' : '#fff';
              const bd = !showResult ? (picked ? '#d60436' : '#e8e8e8') : isCorrect ? '#1a9e5c' : picked ? '#d60436' : '#e8e8e8';
              return (
                <button key={i} onClick={() => setAnswer(i)} style={{
                  background: bg, border: `1.5px solid ${bd}`, borderRadius: 8,
                  padding: '12px 14px', textAlign: 'left', cursor: 'pointer',
                  fontFamily: 'inherit', fontSize: 13.5, color: '#292929',
                  display: 'flex', alignItems: 'center', gap: 10, transition: 'all 150ms',
                }}>
                  <span style={{
                    width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                    border: `1.5px solid ${bd}`, background: showResult && isCorrect ? '#1a9e5c' : picked ? '#d60436' : '#fff',
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700,
                  }}>
                    {showResult && isCorrect ? <Icon name="check" size={11} color="#fff" strokeWidth={3}/>
                      : showResult && picked ? <Icon name="x" size={11} color="#fff" strokeWidth={3}/>
                      : String.fromCharCode(65 + i)}
                  </span>
                  {c}
                </button>
              );
            })}
          </div>
          {answer != null && (
            <div style={{ marginTop: 14, padding: 14, background: answer === correct ? '#edfbf4' : '#fff0f3', borderRadius: 8, fontSize: 13, color: '#444', lineHeight: 1.5 }}>
              <strong style={{ color: answer === correct ? '#1a9e5c' : '#d60436' }}>{answer === correct ? 'Correct.' : 'Not quite.'} </strong>
              The Ethics Rule prohibits assignments where fee or continued engagement is contingent on a predetermined value. The right move is to decline — even if it costs you the fee, it preserves your license and the public trust the profession depends on.
            </div>
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 22 }}>
          <Button variant="ghost" onClick={() => navigate('phase-1-intro')}>Back</Button>
          <Button variant="primary" onClick={() => navigate('tool-orientation')} disabled={answer !== correct}>
            Continue · Tool orientation <Icon name="arrow-right" size={13} color="#fff"/>
          </Button>
        </div>
      </Card>
    </div>
  );
}

// ═══ SCREEN 6: Tool Orientation ══════════════════════════════
function S06_ToolOrientation({ navigate }) {
  const [tab, setTab] = useS1('PropMix');
  const TOOLS = ['PropMix', 'True Footage', 'Apex Sketch', 'Matterport'];
  const content = {
    'PropMix': {
      desc: 'Property data backbone. MLS, public records, AVMs, environmental overlays — all in one connected session.',
      uses: ['Pull subject property card + public records (Section IV)', 'Virtual neighborhood + site inspection (Sections V–VII)', 'Comp universe + AI match scoring (Section XIII)'],
      data: '47M+ properties · 600+ MLS feeds · refreshed nightly',
    },
    'True Footage': {
      desc: 'Report writing platform. URAR forms, narrative templates, Marshall & Swift cost data, certification library.',
      uses: ['Draft full URAR appraisal report (Section XIX)', 'Marshall & Swift cost approach data (Section XV.B)', 'Certification & workfile assembly (Section XX)'],
      data: 'AQB-aligned · USPAP edition auto-versioned · workfile auto-archived',
    },
    'Apex Sketch': {
      desc: 'Industry-standard sketching for residential. GLA validation, attached/detached structures, multi-level support.',
      uses: ['Subject property sketch (Section IX)', 'Error-correction exercises (Section IX)', 'GLA validation against measurements (Section VIII)'],
      data: 'Direct API export to True Footage · GLA reconciliation built-in',
    },
    'Matterport': {
      desc: 'Immersive 3D scans of the subject property — used for virtual inspection when on-site access is limited.',
      uses: ['Virtual walkthrough of the subject (Section VII)', 'Verify rooms, ceiling heights, layout against listing claims', 'Annotate observations + capture defensible photos for the workfile'],
      data: 'Scan dates vary · cross-check against current MLS photos · not a substitute for on-site visit when required',
    },
  };
  const t = content[tab];

  return (
    <div style={{ maxWidth: 920, margin: '0 auto' }}>
      <PageHeader breadcrumb={['Step 1', 'Section I.B']} title="Tool orientation"
        subtitle="A 90-second look at each tool. You'll go deep on each one as the case unfolds — this is just the lay of the land."/>

      <div style={{ marginBottom: 14 }}>
        <VerifyThisCallout
          claim="PropMix, True Footage, Apex, Matterport, AVMs — none of these are USPAP-compliant on their own."
          verifySteps={[
            "Before you accept any tool output, ask: what data does it ingest? Is the data fresh? Is the methodology public?",
            "Cross-check tool against tool — PropMix vs. CoreLogic vs. your own MLS pull rarely agree exactly.",
            "Cross-check tool against the source — does the AVM match what the deed actually shows?",
            "Cross-check tool against your own measurement / own market knowledge.",
            "Document what the tool said AND what you used. The workfile must show your reasoning when they differ.",
          ]}/>
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 14, borderBottom: '1px solid #e8e8e8' }}>
        {TOOLS.map(name => (
          <button key={name} onClick={() => setTab(name)} style={{
            padding: '10px 16px', background: 'none', border: 'none',
            fontFamily: 'inherit', fontSize: 13.5, fontWeight: tab === name ? 700 : 500,
            color: tab === name ? '#d60436' : '#666',
            borderBottom: tab === name ? '2px solid #d60436' : '2px solid transparent',
            cursor: 'pointer', marginBottom: -1,
          }}>{name}</button>
        ))}
      </div>

      <Card padding={0} style={{ overflow: 'hidden' }}>
        <MockToolFrame tool={tab} tab="orientation" status="demo" height={300}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 60, height: 60, borderRadius: 14, background: '#1a1d2b', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto' }}>
                <Icon name="play" size={26} color="#fff"/>
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
            {t.uses.map((u, i) => (
              <li key={i} style={{ display: 'flex', gap: 8, fontSize: 13, color: '#444' }}>
                <Icon name="arrow-right" size={13} color="#d60436"/>
                {u}
              </li>
            ))}
          </ul>
          <div style={{ marginTop: 14, padding: '10px 12px', background: '#f4f5f7', borderRadius: 6, fontSize: 11.5, color: '#666', fontFamily: "'JetBrains Mono', monospace" }}>
            DATA · {t.data}
          </div>
          <div style={{ marginTop: 18, display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="outline" size="sm">
              <Icon name="external-link" size={13} color="#d60436"/> Open my {tab} account
            </Button>
            <Button variant="primary" size="sm" onClick={() => navigate('engagement-letter')}>
              Continue · Engagement letter sim <Icon name="arrow-right" size={13} color="#fff"/>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

// ═══ SCREEN 7: AI Engagement Letter Simulation ═══════════════
function S07_Engagement({ navigate, tweaks }) {
  const intensity = tweaks?.aiIntensity || 'normal';
  const [rubricOpen, setRubricOpen] = useS1(false);
  const [draft, setDraft] = useS1('');
  const rubric = [
    { label: 'Intended use', ok: true },
    { label: 'Intended user', ok: true },
    { label: 'Effective date', ok: true },
    { label: 'USPAP edition', ok: false },
    { label: 'Form type (URAR)', ok: true },
    { label: 'Extraordinary assumptions', ok: false },
  ];
  const score = rubric.filter(r => r.ok).length;

  return (
    <div>
      <PageHeader breadcrumb={['Step 1', 'Section II.A']} title="Engagement letter — Maya Chen"
        subtitle="The AI plays the loan officer. Draft the engagement letter; she'll push back until the scope is USPAP-tight."/>

      <WorkfileGate step="p1" label="Engagement letter · Maya Chen sim transcript" source="Socratic AI + persona sim">
        Capture this AI chat — every revision Maya forces and every push the AI makes belongs in your workfile.
      </WorkfileGate>

      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 16 }}>
        {/* Chat pane */}
        <Card padding={0}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src={PERSONAS.maya.avatar} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}/>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, fontWeight: 700 }}>{PERSONAS.maya.name}</div>
              <div style={{ fontSize: 11, color: '#888' }}>{PERSONAS.maya.role}</div>
            </div>
            <AIChip label={`AI Persona · ${intensity}`} tone="brand" size="sm"/>
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
                {[0,1,2].map(i => <span key={i} style={{ width: 5, height: 5, borderRadius: '50%', background: '#888', animation: `pulse 1s ease-in-out ${i*0.15}s infinite` }}/>)}
              </span>
            </div>
          </div>
          <div style={{ padding: 14, borderTop: '1px solid #f0f0f0', display: 'flex', gap: 8 }}>
            <input placeholder="Type your reply…" style={{ flex: 1, padding: '10px 12px', border: '1px solid #e8e8e8', borderRadius: 8, fontSize: 13.5, fontFamily: 'inherit', background: '#fafafa' }}/>
            <Button variant="primary" size="sm"><Icon name="send" size={13} color="#fff"/></Button>
          </div>
        </Card>

        {/* Draft + rubric */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card padding="16px 18px">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>Engagement letter draft</div>
              <Badge color="warning">Auto-saving</Badge>
            </div>
            <textarea value={draft} onChange={e => setDraft(e.target.value)} rows={9}
              placeholder={"Write your engagement letter here.\n\nUSPAP requires six scope elements — work them out yourself:\n  • Intended use\n  • Intended user\n  • Effective date\n  • Type & definition of value (cite source)\n  • Relevant property characteristics\n  • Assignment conditions"}
              style={{
              width: '100%', fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#292929',
              border: '1px solid #e8e8e8', borderRadius: 6, padding: 10, lineHeight: 1.6, resize: 'vertical',
            }}/>
          </Card>

          <TextbookCallout topic="scope-of-work" why="USPAP requires six scope elements — if you're missing any, re-read this before you submit."/>

          <Card padding="14px 16px">
            <button onClick={() => setRubricOpen(!rubricOpen)} style={{
              width: '100%', background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: 'inherit', padding: 0,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                background: score === rubric.length ? '#edfbf4' : score >= rubric.length - 2 ? '#fff8ec' : '#fef0f1',
                border: `1.5px solid ${score === rubric.length ? '#1a9e5c' : score >= rubric.length - 2 ? '#e8860a' : '#d60436'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 800,
                color: score === rubric.length ? '#1a9e5c' : score >= rubric.length - 2 ? '#e8860a' : '#d60436',
              }}>{score}/{rubric.length}</div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#292929' }}>USPAP scope rubric</div>
                <div style={{ fontSize: 11, color: score === rubric.length ? '#1a9e5c' : '#e8860a', fontWeight: 600, marginTop: 1 }}>
                  {score === rubric.length ? 'All scope elements present' : `${rubric.length - score} missing — tap to view`}
                </div>
              </div>
              <Icon name={rubricOpen ? 'chevron-up' : 'chevron-down'} size={16} color="#888"/>
            </button>
            {rubricOpen && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 12 }}>
                {rubric.map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', background: r.ok ? '#edfbf4' : '#fff8ec', borderRadius: 5, fontSize: 12 }}>
                    <Icon name={r.ok ? 'check-circle' : 'alert-circle'} size={13} color={r.ok ? '#1a9e5c' : '#e8860a'}/>
                    <span style={{ color: r.ok ? '#1a9e5c' : '#e8860a', fontWeight: 600 }}>{r.label}</span>
                    {!r.ok && <span style={{ marginLeft: 'auto', fontSize: 10.5, color: '#e8860a' }}>missing</span>}
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Button variant="primary" onClick={() => navigate('preliminary-research')}>
            Submit & continue · Preliminary research <Icon name="arrow-right" size={14} color="#fff"/>
          </Button>
        </div>
      </div>

      <div style={{ marginTop: 14, fontSize: 11, color: '#aaa', fontFamily: "'JetBrains Mono', monospace", textAlign: 'center' }}>
        xAPI · engagement letter: attempt 2 · AI pushback: triggered (1) · USPAP rubric: 4/6
      </div>
    </div>
  );
}

// ═══ SCREEN 8: Preliminary Research ══════════════════════════
function S08_PrelimResearch({ navigate }) {
  const [checklistOpen, setChecklistOpen] = useS1(false);
  const checklist = [
    ['County Assessor lookup', true],
    ['Zoning verification (R-1 conforming)', true],
    ['FEMA flood zone check (Zone X)', true],
    ['MLS quick scan — 3 active listings noted', true],
    ['Market area boundary drawn', true],
  ];
  const doneCount = checklist.filter(([, d]) => d).length;
  const total = checklist.length;
  const complete = doneCount === total;
  return (
    <div>
      <PageHeader breadcrumb={['Step 1', 'Section II.C']} title="Preliminary research"
        subtitle="Desk research before inspection. Pull public records, zoning, flood, and a quick MLS scan from PropMix."/>

      <WorkfileCaptureButton step="p1" label="Preliminary research · PropMix card + zoning + flood + MLS scan" source="PropMix public records"/>

      <div style={{ marginBottom: 14 }}>
        <VerifyThisCallout tool="PropMix" claim="Public-record sales history, zoning R-1, flood Zone X" compact
          verifySteps={[
            "Pull the recorded deeds for the sales history — does PropMix match what the county recorded?",
            "Confirm zoning at the city/county zoning portal — PropMix can lag rezoning by months.",
            "Verify flood zone at FEMA's official Map Service Center (msc.fema.gov), not just PropMix's lookup.",
            "Sales history that's missing or shows '—' usually means the public record needs to be pulled manually.",
          ]}/>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
        <MockToolFrame tool="PropMix" tab="public-records" height={520}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
            <img src={SUBJECT.photo} style={{ width: 110, height: 84, borderRadius: 8, objectFit: 'cover' }}/>
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
              ['—', '—', '—', '—'],
            ].map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '90px 110px 1fr 1fr', gap: 8, padding: '6px 0', borderTop: i ? '1px solid #f4f4f4' : 'none', fontSize: 12, color: '#444' }}>
                <span>{row[0]}</span><strong>{row[1]}</strong><span>{row[2]}</span><span style={{ color: '#888' }}>{row[3]}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, padding: '10px 12px', background: '#fff', borderRadius: 6, border: '1px solid #e8e8e8' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#888', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.05em' }}>Market area boundary · drawn by you</div>
            <svg width="100%" height="120" viewBox="0 0 400 120">
              <rect x="0" y="0" width="400" height="120" fill="#eaf3ff"/>
              <path d="M 50 30 L 150 20 L 280 35 L 350 60 L 340 95 L 200 105 L 80 95 Z" fill="rgba(214,4,54,0.18)" stroke="#d60436" strokeWidth="1.5" strokeDasharray="4,2"/>
              <circle cx="200" cy="60" r="6" fill="#d60436"/>
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
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8, flexShrink: 0,
                background: complete ? '#edfbf4' : '#fff8ec',
                border: `1.5px solid ${complete ? '#1a9e5c' : '#e8860a'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12, fontWeight: 800,
                color: complete ? '#1a9e5c' : '#e8860a',
              }}>{doneCount}/{total}</div>
              <div style={{ flex: 1, textAlign: 'left' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#292929' }}>Research checklist</div>
                <div style={{ fontSize: 11, color: complete ? '#1a9e5c' : '#e8860a', fontWeight: 600, marginTop: 1 }}>
                  {complete ? 'All tasks complete' : `${total - doneCount} remaining — tap to view`}
                </div>
              </div>
              <Icon name={checklistOpen ? 'chevron-up' : 'chevron-down'} size={16} color="#888"/>
            </button>
            {checklistOpen && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
                {checklist.map(([label, done], i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12.5 }}>
                    <Icon name={done ? 'check-circle' : 'circle'} size={14} color={done ? '#1a9e5c' : '#bbb'}/>
                    <span style={{ color: done ? '#1a9e5c' : '#666', textDecoration: done ? 'line-through' : 'none' }}>{label}</span>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Button variant="primary" onClick={() => navigate('inspection-scheduling')}>
            Continue · Inspection scheduling <Icon name="arrow-right" size={14} color="#fff"/>
          </Button>
        </div>
      </div>
    </div>
  );
}

// ═══ SCREEN 9: Inspection Scheduling Sim ═════════════════════
function S09_InspectionScheduling({ navigate }) {
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <PageHeader breadcrumb={['Step 1', 'Section II.D']} title="Inspection scheduling — David Osei"
        subtitle="Schedule physical access. AI plays the homeowner. Confirm date, time, who's present, restrictions, and contact info — or get tripped up by a curveball."/>

      <Card padding={0}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={PERSONAS.david.avatar} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover' }}/>
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
            {[['Date','Fri Mar 14'], ['Time','10:00 AM'], ['Present','Owner + tenant'], ['Access','Side gate · 4218'], ['Contact','555-0142']].map(([k, v], i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 6, padding: '8px 10px' }}>
                <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', letterSpacing: '.04em' }}>{k}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#292929' }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 16 }}>
        <Button variant="ghost" onClick={() => navigate('preliminary-research')}>Back</Button>
        <Button variant="primary" onClick={() => navigate('mentor-review-1')}>
          Submit Step 1 · Mentor Review 1 <Icon name="arrow-right" size={14} color="#fff"/>
        </Button>
      </div>
    </div>
  );
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
        subtitle="The AI pre-screens everything from Step 1. Mentor sees a clean summary, not raw work. This is how we hold 1:20 mentor coverage."/>

      {/* Your mentor (full width) */}
      <Card padding="18px 20px" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <div style={{ fontSize: 13.5, fontWeight: 700 }}>Your mentor</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <img src={MENTOR.avatar} style={{ width: 56, height: 56, borderRadius: '50%', objectFit: 'cover', border: '2px solid #fff', boxShadow: '0 1px 4px rgba(0,0,0,0.12)' }}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>{MENTOR.name}</div>
            <div style={{ fontSize: 12, color: '#888' }}>{MENTOR.role} · {MENTOR.yearsExperience} yrs experience</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: '#fff0f3', borderRadius: 6, fontSize: 11.5, color: '#d60436', fontWeight: 600 }}>
            <Icon name="calendar" size={12} color="#d60436"/> Office hours · {MENTOR.nextOH}
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
          {[1,2,3,4,5,6,7,8].map(n => {
            const done = n <= 3, current = n === 4;
            const phase = ['p1','p2','p3','p4','p5','p6','p7','p8'][n-1];
            const p = PHASES.find(x => x.id === phase);
            return (
              <div key={n} style={{
                flex: 1, padding: '10px 8px', borderRadius: 8, textAlign: 'center',
                background: done ? '#edfbf4' : current ? '#fff8ec' : '#fafafa',
                border: `1.5px solid ${done ? '#1a9e5c33' : current ? '#e8860a' : '#eee'}`,
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: p.color, letterSpacing: '.04em', textTransform: 'uppercase' }}>MR {n}</div>
                <div style={{ fontSize: 11, color: '#444', marginTop: 4, lineHeight: 1.2 }}>{p.label.replace(/^Phase \d+ · /, '')}</div>
                <div style={{ marginTop: 6 }}>
                  {done ? <Icon name="check-circle" size={14} color="#1a9e5c"/>
                    : current ? <span style={{ fontSize: 9, fontWeight: 800, color: '#e8860a', letterSpacing: '.05em' }}>IN PROGRESS</span>
                    : <Icon name="lock" size={11} color="#bbb"/>}
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <ManualChecklist
            title="Self-check before submitting Step 1"
            subtitle="You mark these yourself — mentor sees what you marked, not what AI inferred."
            storageKey="mr1-selfcheck"
            items={[
              { label: 'Engagement letter drafted with all six USPAP scope elements', hint: 'Intended use, intended user, type/definition of value, effective date, relevant characteristics, assignment conditions.' },
              { label: 'USPAP edition explicitly stated in the engagement letter', hint: 'Easy to forget. Easy thing for the mentor to flag.' },
              { label: 'Preliminary research notes (zoning, flood, public record, MLS scan)', hint: 'Captured to the workfile, not just "done in my head."' },
              { label: 'Inspection scheduled — access, contact, contingencies noted', hint: 'What\'s your backup if the basement is locked?' },
              { label: 'Preliminary market read articulated (increasing / stable / declining)', hint: 'Back it up with one data point you can cite.' },
              { label: 'Reviewed McKissock textbook references for anything you\'re shaky on', hint: 'Scope of Work Rule is the most-cited gap on MR 1.' },
            ]}
          />

          <WorkfileCheck
            step="p1"
            mentorReviewN={1}
            navigate={navigate}
            expectedItems={[
              { label: 'Engagement letter draft', match: 'engagement', hint: 'Your draft — not the AI\'s suggestion. Capture from True Footage.' },
              { label: 'PropMix subject property card', match: 'propmix', hint: 'Capture the public record screen — APN, zone, flood.' },
              { label: 'Preliminary research notes', match: 'preliminary', hint: 'Your zoning + flood + sales-history pull.' },
              { label: 'Inspection confirmation', match: 'inspection', hint: 'Confirmation email or screenshot from your scheduling tool.' },
            ]}
          />

          <div style={{ display: 'flex', gap: 10 }}>
            <Button variant="outline" fullWidth onClick={() => navigate('engagement-letter')}>Revise first</Button>
            <Button variant="primary" fullWidth onClick={() => navigate('phase-2-launch')}>Submit to mentor (async · 48 hr)</Button>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card padding={0}>
            <button onClick={() => setScheduleOpen(o => !o)} style={{
              width: '100%', padding: '16px 18px', background: 'none', border: 'none',
              cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <img src={MENTOR.avatar} style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700 }}>Schedule live review</div>
                <div style={{ fontSize: 11.5, color: '#888', marginTop: 2 }}>{MENTOR.name} · 3 open slots this week</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <button onClick={(e) => { e.stopPropagation(); setHowOpen(true); }} title="How this works" style={{
                  background: '#fff8ec', border: '1px solid #e8860a33', borderRadius: '50%',
                  width: 24, height: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon name="info" size={12} color="#e8860a"/>
                </button>
                <Icon name={scheduleOpen ? 'chevron-up' : 'chevron-down'} size={16} color="#888"/>
              </div>
            </button>
            {scheduleOpen && (
              <div style={{ padding: '0 18px 18px', borderTop: '1px solid #f0f0f0', paddingTop: 14 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 8 }}>Open slots</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
                  {[
                    ['Thu 3:00 PM ET', '20 min · 3 ahead', false],
                    ['Thu 4:30 PM ET', '20 min · 5 ahead', false],
                    ['Fri 9:00 AM ET', '20 min · open', true],
                  ].map(([slot, info, open], i) => (
                    <button key={i} style={{
                      background: open ? '#fff0f3' : '#fafafa',
                      border: open ? '1.5px solid #d60436' : '1px solid #e8e8e8',
                      borderRadius: 6, padding: '10px 12px', textAlign: 'left',
                      cursor: 'pointer', fontFamily: 'inherit',
                      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    }}>
                      <span style={{ fontSize: 13, fontWeight: 700, color: open ? '#d60436' : '#444' }}>{slot}</span>
                      <span style={{ fontSize: 11, color: '#888' }}>{info}</span>
                    </button>
                  ))}
                </div>
                <div style={{ padding: '8px 10px', background: '#f4f5f7', borderRadius: 6, fontSize: 11.5, color: '#666', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Icon name="zap" size={12} color="#888"/>
                  Or <strong style={{ color: '#444' }}>submit async</strong> · 48-hr written turnaround
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* How-this-works overlay */}
      {howOpen && (
        <div onClick={() => setHowOpen(false)} style={{
          position: 'fixed', inset: 0, background: 'rgba(20,22,30,0.55)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200,
          padding: 20, animation: 'fadeInUp 180ms ease',
        }}>
          <div onClick={e => e.stopPropagation()} style={{
            background: '#fff', borderRadius: 14, maxWidth: 460, width: '100%',
            padding: '22px 24px', boxShadow: '0 24px 64px rgba(0,0,0,0.3)', position: 'relative',
          }}>
            <button onClick={() => setHowOpen(false)} style={{
              position: 'absolute', right: 14, top: 14, background: 'none', border: 'none',
              cursor: 'pointer', padding: 4, color: '#888',
            }}>
              <Icon name="x" size={16} color="#888"/>
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#fff8ec', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="info" size={18} color="#e8860a"/>
              </div>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 17, fontWeight: 800 }}>How mentor pre-screens work</div>
            </div>
            <div style={{ fontSize: 13.5, color: '#444', lineHeight: 1.6 }}>
              The AI pre-screen above is what your mentor <strong>opens first</strong> — they don't start from scratch. The summary, the flags, the narrative — all of it loads in their dashboard before your meeting.
              <br/><br/>
              That means <strong>they spend their 20 minutes coaching, not auditing</strong>. The most common question we hear from cohort 04: <em>"why can James give me 20 focused minutes when he supervises 19 others?"</em> Now you know.
            </div>
            <div style={{ marginTop: 18, padding: 12, background: '#f4f5f7', borderRadius: 8, fontSize: 12, color: '#555', lineHeight: 1.5 }}>
              <strong>The pre-screen never replaces the human.</strong> It just removes the work that doesn't need a human — leaving the work that does.
            </div>
          </div>
        </div>
      )}

      <div style={{ marginTop: 14, fontSize: 11, color: '#aaa', fontFamily: "'JetBrains Mono', monospace", textAlign: 'center' }}>
        xAPI · mentor review 1: AI pre-screen completed · mentor review 1: scheduled · pattern repeats for MR 2–8
      </div>
    </div>
  );
}

Object.assign(window, { S01_Enrollment, S02_TechSetup, S03_Dashboard, S04_Phase1Intro, S05_Ethics, S06_ToolOrientation, S07_Engagement, S08_PrelimResearch, S09_InspectionScheduling, S10_MentorReview1 });
