// PAREA Combined — Screens 12-22 (Step 2-4)

const { useState: useS2, useEffect: useE2 } = React;

// ═══ SCREEN 12: Step 2 Case Drop ════════════════════════════
function S12_CaseDrop({ navigate }) {
  return (
    <div>
      <PageHeader breadcrumb={['Report 1', 'Step 2 · Inspection']} title="Assignment dropped"
        subtitle="Mentor Review 1 cleared. Here's the full property card — pulled live from PropMix. Today's plan is AI-tailored to your pace."/>

      {/* Estimates banner — at the top */}
      <Card padding="14px 18px" style={{ marginBottom: 14, background: 'linear-gradient(90deg, #fafbfc, #fff)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: '#fff8ec', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="clock" size={15} color="#e8860a"/>
            </div>
            <div>
              <div style={{ fontSize: 10.5, color: '#888', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '.05em' }}>Estimated total</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#292929', fontFamily: "'Nunito', sans-serif", lineHeight: 1.1 }}>6–8 hrs · 2–3 sessions</div>
            </div>
          </div>
          <div style={{ width: 1, height: 36, background: '#eee' }}/>
          <div>
            <div style={{ fontSize: 10.5, color: '#888', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '.05em' }}>Cohort median · Step 2</div>
            <div style={{ fontSize: 13, color: '#292929', marginTop: 2 }}>
              <strong style={{ color: '#1a9e5c' }}>5.4 hrs</strong> <span style={{ fontSize: 11, color: '#888', fontWeight: 500 }}>· you're trending faster</span>
            </div>
          </div>
          <div style={{ width: 1, height: 36, background: '#eee' }}/>
          <div>
            <div style={{ fontSize: 10.5, color: '#888', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '.05em' }}>Inspection window</div>
            <div style={{ fontSize: 13, color: '#292929', marginTop: 2, fontWeight: 600 }}>Fri, Mar 14 · 10:00 AM ET</div>
          </div>
          <div style={{ flex: 1 }}/>
          <AIChip label="AI-tailored plan" tone="brand" size="sm"/>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16 }}>
        <Card padding={0} style={{ overflow: 'hidden' }}>
          <div style={{ position: 'relative', height: 220 }}>
            <img src={SUBJECT.photo} style={{ width: '100%', height: '100%', objectFit: 'cover' }}/>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7) 100%)' }}/>
            <div style={{ position: 'absolute', top: 14, left: 14 }}><PhasePill phase="p2"/></div>
            <div style={{ position: 'absolute', bottom: 14, left: 16, color: '#fff' }}>
              <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 24, fontWeight: 800 }}>{SUBJECT.address}</div>
              <div style={{ fontSize: 13, opacity: 0.9 }}>{SUBJECT.city} · {SUBJECT.style}</div>
            </div>
          </div>
          <div style={{ padding: '18px 22px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
              {[['GLA','2,148 sf'], ['Beds/Bath','4 / 2.5'], ['Year','2008'], ['Lot','0.31 ac']].map(([k,v], i) => (
                <div key={i} style={{ background: '#fafafa', borderRadius: 6, padding: '10px 12px' }}>
                  <div style={{ fontSize: 10.5, color: '#888', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '.05em' }}>{k}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#292929', marginTop: 2 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 8 }}>Scope of work · from your engagement letter</div>
            <div style={{ background: '#fafafa', borderRadius: 8, padding: 14, fontSize: 12.5, color: '#444', lineHeight: 1.6, fontFamily: "'JetBrains Mono', monospace" }}>
              Intended use: mortgage origination · Intended user: First Summit Bank<br/>
              Effective date: TBD upon inspection · Form: URAR (1004) · USPAP 2024–2025 ed.<br/>
              Approaches: Sales Comparison (primary) + Cost (supporting) · Income N/A
            </div>
          </div>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card padding="16px 18px">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>Today's plan</div>
              <AIChip label="AI-tailored" tone="brand" size="sm"/>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                ['Pull public records & zoning (PropMix)', '45 min', 'database'],
                ['Virtual neighborhood inspection', '1.5 hr', 'map'],
                ['Start improvements inspection', '2 hr', 'home'],
              ].map(([t, time, ic], i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', background: '#f4f5f7', borderRadius: 6 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 5, background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon name={ic} size={12} color="#1b5e20"/>
                  </div>
                  <span style={{ flex: 1, fontSize: 12.5, color: '#292929' }}>{t}</span>
                  <span style={{ fontSize: 11, color: '#888', fontFamily: "'JetBrains Mono', monospace" }}>{time}</span>
                </div>
              ))}
            </div>
            <Button variant="primary" fullWidth onClick={() => navigate('property-research')} style={{ marginTop: 12 }}>
              Accept & open PropMix <Icon name="arrow-right" size={13} color="#fff"/>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ═══ SCREEN 13: Property Research (PropMix split) ════════════
function S13_PropertyResearch({ navigate }) {
  return (
    <div>
      <PageHeader breadcrumb={['Step 2', 'Section IV']} title="Property & site research"
        subtitle="PropMix on the left · your data-entry form on the right. AI cross-checks every entry against the source data."/>

      <WorkfileCaptureButton step="p2" label="PropMix property card · 4218 Ridgewood Ln" source="PropMix public records"/>

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
              ['EASEMENTS', '10ft public utility easement along rear lot line'],
            ].map(([k, v], i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 6, padding: '8px 12px' }}>
                <div style={{ fontSize: 9.5, fontWeight: 700, color: '#888', letterSpacing: '.05em' }}>{k}</div>
                <div style={{ fontSize: 12, color: '#292929', marginTop: 2, fontFamily: "'JetBrains Mono', monospace" }}>{v}</div>
              </div>
            ))}
          </div>
        </MockToolFrame>

        <Card padding="16px 18px" style={{ height: 500, overflow: 'auto' }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Your entries · Section IV</div>
          <div style={{ fontSize: 11.5, color: '#888', marginBottom: 12, lineHeight: 1.5 }}>
            Fill these in yourself from the PropMix card on the left — and from any other source you cross-check. Don't auto-trust PropMix; verify before you transcribe.
          </div>
          {[
            ['Legal description', 'e.g. Lot N, Block N, …'],
            ['APN', '14-022-…'],
            ['Zone', 'R-1, R-2, …'],
            ['Flood Zone', 'Zone X, A, AE, …'],
            ['Last sale (date / price)', 'mm/yyyy · $—'],
            ['Easements / encroachments noted', 'e.g. 10ft PUE rear lot'],
          ].map(([k, ph], i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: '#444', display: 'block', marginBottom: 4 }}>{k}</label>
              <input placeholder={ph} style={{ width: '100%', padding: '8px 10px', border: '1px solid #e8e8e8', borderRadius: 6, fontSize: 12.5, background: '#fff', fontFamily: "'JetBrains Mono', monospace" }}/>
            </div>
          ))}
          <VerifyThisCallout tool="PropMix" claim="Public-record APN, zone, flood zone, easements" compact
            verifySteps={[
              "Cross-check the APN against the County Assessor's website — does PropMix match?",
              "Flood zone: confirm via FEMA's Map Service Center, not just PropMix's lookup.",
              "Easements: pull the recorded plat — PropMix's easement field is often blank when it shouldn't be.",
              "Last sale: confirm date + price against the recorded deed if PropMix shows stale data.",
            ]}/>
          <Button variant="primary" fullWidth onClick={() => navigate('virtual-inspection')} style={{ marginTop: 14 }}>
            Continue · Virtual inspection <Icon name="arrow-right" size={13} color="#fff"/>
          </Button>
        </Card>
      </div>
    </div>
  );
}

// ═══ SCREEN 14: Virtual Inspection ═══════════════════════════
function S14_VirtualInspection({ navigate }) {
  const [section, setSection] = useS2('improvements');
  const sections = {
    neighborhood: { label: 'Neighborhood (V)', icon: 'map' },
    site: { label: 'Site (VI)', icon: 'square' },
    improvements: { label: 'Improvements (VII)', icon: 'home' },
  };

  return (
    <div>
      <PageHeader breadcrumb={['Step 2', 'Sections V–VII']} title="Virtual inspection"
        subtitle="Move through neighborhood, site, then improvements. Annotation panel floats on the right — AI fires one Socratic question per section."/>

      <div style={{ marginBottom: 14 }}>
        <VerifyThisCallout tool="Matterport" claim="3D scan presents the home — but Matterport renders what was scanned, not what's actually there now"
          compact
          verifySteps={[
            "Is the scan recent enough to reflect the current condition? Check the scan date in the metadata.",
            "Does the scan miss spaces? Closets, attic access, mechanical rooms often are skipped.",
            "Does the scan show actual condition (wear, paint, fixtures), or has it been staged/cleaned post-scan?",
          ]}/>
      </div>

      <WorkfileCaptureButton step="p2" label="Virtual inspection · annotated photos + Matterport scan" source="Matterport + PropMix"/>

      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
        {Object.entries(sections).map(([k, v]) => (
          <button key={k} onClick={() => setSection(k)} style={{
            padding: '8px 14px', border: '1px solid', borderRadius: 8,
            borderColor: section === k ? '#d60436' : '#e8e8e8',
            background: section === k ? '#fff0f3' : '#fff',
            color: section === k ? '#d60436' : '#666',
            fontSize: 12.5, fontWeight: section === k ? 700 : 500,
            cursor: 'pointer', fontFamily: 'inherit',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <Icon name={v.icon} size={13} color={section === k ? '#d60436' : '#888'}/>
            {v.label}
          </button>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 16 }}>
        <MockToolFrame
          tool={section === 'improvements' ? 'Matterport' : 'PropMix'}
          tab={section === 'improvements' ? '3D scan + photos' : section === 'site' ? 'aerial' : 'street view'}
          height={460}
        >
          {section === 'improvements' ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {[
                'photo-1568605114967-8130f3a36994',
                'photo-1600585154340-be6161a56a0c',
                'photo-1600596542815-ffad4c1539a9',
                'photo-1600607687939-ce8a6c25118c',
                'photo-1600585154526-990dced4db0d',
                'photo-1600210492486-724fe5c67fb0',
              ].map((p, i) => (
                <div key={i} style={{ position: 'relative' }}>
                  <img src={`https://images.unsplash.com/${p}?w=300&q=70`} style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 6 }}/>
                  <div style={{ position: 'absolute', bottom: 4, left: 4, background: 'rgba(0,0,0,0.7)', color: '#fff', padding: '2px 6px', borderRadius: 3, fontSize: 9.5, fontFamily: "'JetBrains Mono', monospace" }}>{['Front','Kitchen','LR','Primary BR','Bsmt finish','Garage'][i]}</div>
                </div>
              ))}
            </div>
          ) : section === 'site' ? (
            <div style={{ background: '#dde8d8', borderRadius: 6, height: '100%', position: 'relative' }}>
              <svg width="100%" height="100%" viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
                <rect x="0" y="0" width="400" height="400" fill="#dde8d8"/>
                <path d="M 20 80 L 380 80 L 380 320 L 20 320 Z" fill="none" stroke="#888" strokeDasharray="4,3"/>
                <rect x="140" y="160" width="120" height="100" fill="#a8845a" stroke="#5a3d20" strokeWidth="1.5"/>
                <rect x="160" y="270" width="60" height="40" fill="#8a6c4a" stroke="#5a3d20" strokeWidth="1.2"/>
                <text x="200" y="50" textAnchor="middle" fontSize="11" fill="#444" fontFamily="DM Sans" fontWeight="700">N</text>
                <text x="200" y="218" textAnchor="middle" fontSize="9" fill="#fff" fontFamily="DM Sans" fontWeight="700">House (2,148 sf)</text>
                <text x="200" y="295" textAnchor="middle" fontSize="9" fill="#fff" fontFamily="DM Sans" fontWeight="700">2-car gar</text>
                <text x="60" y="355" fontSize="10" fill="#444" fontFamily="DM Sans">Lot · 0.31 ac · level · public utilities · curb &amp; gutter</text>
              </svg>
            </div>
          ) : (
            <div style={{ background: '#bcd', borderRadius: 6, height: '100%', position: 'relative', backgroundImage: `url(https://images.unsplash.com/photo-1449844908441-8829872d2607?w=600&q=70)`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.6))' }}/>
              <div style={{ position: 'absolute', bottom: 12, left: 12, color: '#fff', fontSize: 11, fontFamily: "'JetBrains Mono', monospace" }}>Glenmoor Estates · Ph III · suburban · stable</div>
            </div>
          )}
        </MockToolFrame>

        <Card padding={0} style={{ height: 460, display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '14px 16px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{sections[section].label} · annotations</div>
            <Badge color="brand">3 / 6</Badge>
          </div>
          <div style={{ padding: 16, flex: 1, overflow: 'auto' }}>
            {section === 'improvements' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  ['Construction type', 'Wood-frame · vinyl siding', true],
                  ['Exterior condition', 'C3 · average · no deferred maintenance', true],
                  ['Interior condition', 'C3 · standard finishes · updated kitchen 2020', true],
                  ['Functional layout', '4 BR up · open kitchen/great room · finished bsmt studio', false],
                  ['Roof condition', '', false],
                  ['HVAC age / condition', '', false],
                ].map(([k, v, done], i) => (
                  <div key={i}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: '#666', display: 'block', marginBottom: 3 }}>{k}{!done && <span style={{ color: '#e8860a', marginLeft: 4 }}>*</span>}</label>
                    <input value={v} readOnly placeholder={done ? '' : 'Required before advancing'} style={{
                      width: '100%', padding: '7px 10px',
                      border: `1px solid ${done ? '#e8e8e8' : '#e8860a'}`,
                      borderRadius: 5, fontSize: 12, background: done ? '#fafafa' : '#fff8ec',
                      fontFamily: "'JetBrains Mono', monospace",
                    }}/>
                  </div>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}>
        <Button variant="primary" onClick={() => navigate('gla-measurement')}>
          Continue · GLA measurement <Icon name="arrow-right" size={14} color="#fff"/>
        </Button>
      </div>
    </div>
  );
}

// ═══ SCREEN 15: GLA Measurement ══════════════════════════════
function S15_GLA({ navigate }) {
  return (
    <div>
      <PageHeader breadcrumb={['Step 2', 'Section VIII']} title="GLA measurement"
        subtitle="Two-part. (A) Classify floor areas — what counts, what doesn't. (B) Calculate subject GLA from PropMix measurements."/>

      <div style={{ marginBottom: 14 }}>
        <TextbookCallout topic="gla-ansi" why="ANSI Z765 is the standard — know what counts before you measure."/>
      </div>

      <WorkfileCaptureButton step="p2" label="GLA worksheet · subject 2,148 sf reconciled" source="PropMix + own measurement"/>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 16 }}>
        <Card padding={20}>
          <div style={{ fontSize: 11, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 6 }}>Part A · Classification exercise</div>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Split-level · classify each colored region</div>
          <svg width="100%" viewBox="0 0 480 220" style={{ border: '1px solid #e8e8e8', borderRadius: 6, background: '#fafafa' }}>
            <rect x="40"  y="40" width="160" height="100" fill="#bcd9c6" stroke="#1a9e5c" strokeWidth="1.5"/>
            <text x="120" y="92" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1a9e5c" fontFamily="DM Sans">Above grade · 1,180 sf</text>
            <text x="120" y="108" textAnchor="middle" fontSize="9" fill="#1a9e5c" fontFamily="DM Sans">Living + kitchen + 2 BR</text>
            <rect x="220" y="40" width="120" height="100" fill="#bcd9c6" stroke="#1a9e5c" strokeWidth="1.5"/>
            <text x="280" y="92" textAnchor="middle" fontSize="11" fontWeight="700" fill="#1a9e5c" fontFamily="DM Sans">Above grade · 968 sf</text>
            <text x="280" y="108" textAnchor="middle" fontSize="9" fill="#1a9e5c" fontFamily="DM Sans">Bedrooms + bath upper</text>
            <rect x="360" y="40" width="80"  height="100" fill="#fed8a4" stroke="#e8860a" strokeWidth="1.5"/>
            <text x="400" y="80" textAnchor="middle" fontSize="10" fontWeight="700" fill="#e8860a" fontFamily="DM Sans">Garage</text>
            <text x="400" y="96" textAnchor="middle" fontSize="9" fill="#e8860a" fontFamily="DM Sans">Non-GLA</text>
            <rect x="40"  y="150" width="300" height="60" fill="#fab1c0" stroke="#d60436" strokeWidth="1.5"/>
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
            Lower level (above grade): 32′ × 28.5′ = <strong>912 sf</strong><br/>
            Upper level: 32′ × 38.5′ = <strong>1,232 sf</strong><br/>
            Bay window upper: 4 sf<br/>
            <hr style={{ border: 'none', borderTop: '1px dashed #ccc', margin: '8px 0' }}/>
            <strong>Calculated GLA: 2,148 sf</strong>
          </div>
          <div style={{ marginTop: 14, padding: 12, background: '#edfbf4', border: '1px solid #1a9e5c33', borderRadius: 8, fontSize: 12, color: '#444', lineHeight: 1.5 }}>
            <strong style={{ color: '#1a9e5c' }}>Match.</strong> Your 2,148 sf matches PropMix records exactly (0% variance · threshold ±2%).
          </div>
          <Button variant="primary" fullWidth onClick={() => navigate('sketch')} style={{ marginTop: 14 }}>
            Continue · Sketch in Apex <Icon name="arrow-right" size={13} color="#fff"/>
          </Button>
        </Card>
      </div>
    </div>
  );
}

// ═══ SCREEN 16: Apex Sketch ══════════════════════════════════
function S16_Sketch({ navigate }) {
  return (
    <div>
      <PageHeader breadcrumb={['Step 2', 'Section IX']} title="Property sketch"
        subtitle="(A) Find 3 deliberate errors in the sample sketch. (B) Build the subject sketch — GLA must reconcile with your measurement."/>

      <MockToolFrame tool="Apex Sketch" tab="subject sketch" height={500}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 240px', gap: 16, height: '100%' }}>
          <div style={{ background: '#fff', borderRadius: 8, border: '1px solid #e8e8e8', padding: 14, position: 'relative' }}>
            <svg width="100%" viewBox="0 0 500 360">
              <defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f0f0f0" strokeWidth="0.5"/></pattern></defs>
              <rect width="500" height="360" fill="url(#grid)"/>
              {/* Lower level */}
              <polygon points="60,80 280,80 280,200 60,200" fill="#bcd9c6" stroke="#1a9e5c" strokeWidth="2"/>
              <text x="170" y="135" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0d4a2e" fontFamily="DM Sans">Lower Level</text>
              <text x="170" y="155" textAnchor="middle" fontSize="11" fill="#0d4a2e" fontFamily="DM Sans">32′ × 28.5′ = 912 sf · GLA</text>
              {/* Upper level */}
              <polygon points="60,80 380,80 380,40 280,40 280,80" fill="none" stroke="#1a9e5c" strokeWidth="1.5" strokeDasharray="4,2"/>
              <text x="220" y="65" textAnchor="middle" fontSize="10" fill="#1a9e5c" fontFamily="DM Sans">Upper · 1,232 sf · GLA</text>
              {/* Garage */}
              <polygon points="280,200 380,200 380,290 280,290" fill="#fed8a4" stroke="#e8860a" strokeWidth="2"/>
              <text x="330" y="248" textAnchor="middle" fontSize="11" fontWeight="700" fill="#7a4400" fontFamily="DM Sans">2-car garage</text>
              <text x="330" y="262" textAnchor="middle" fontSize="9" fill="#7a4400" fontFamily="DM Sans">attached · non-GLA</text>
              {/* Basement footprint dashed */}
              <polygon points="60,200 280,200 280,290 60,290" fill="none" stroke="#d60436" strokeWidth="1.5" strokeDasharray="4,2"/>
              <text x="170" y="248" textAnchor="middle" fontSize="10" fill="#d60436" fontFamily="DM Sans">Basement (below grade · not GLA)</text>
              <text x="170" y="262" textAnchor="middle" fontSize="9" fill="#d60436" fontFamily="DM Sans">finished studio · 868 sf</text>
              {/* dimensions */}
              <text x="170" y="74" textAnchor="middle" fontSize="9" fill="#666" fontFamily="DM Sans">32′</text>
              <text x="50"  y="140" textAnchor="middle" fontSize="9" fill="#666" fontFamily="DM Sans">28.5′</text>
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
          Submit Step 2 · Mentor Review 2 <Icon name="arrow-right" size={14} color="#fff"/>
        </Button>
      </div>
    </div>
  );
}

// ═══ SCREEN 17: Mentor Review 2 ══════════════════════════════
function S17_MentorReview2({ navigate }) {
  return (
    <div>
      <PageHeader breadcrumb={['Step 2', 'Mentor Review 2']} title="Mentor Review 2"
        subtitle="Asynchronous review by James Mendel, MAI. Submit when you're ready — 24 hr typical turnaround."/>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <ManualChecklist
            title="Self-check before submitting Step 2"
            subtitle="You mark these yourself. Mentor reviews your marks + the actual work."
            storageKey="mr2-selfcheck"
            items={[{"label":"Property research entries match PropMix source (cross-checked)","hint":"You cross-checked APN, zoning, flood — not just trusted PropMix."},{"label":"Virtual inspection annotations captured in Apex/Matterport workfile","hint":"Photos labeled, deferred maintenance noted."},{"label":"GLA measured per ANSI Z765 — variance from PropMix documented","hint":"Below grade is not GLA, regardless of finish."},{"label":"Apex sketch GLA reconciled with your measurement","hint":"If they disagree, the narrative loses — re-check perimeter."},{"label":"Reviewed McKissock textbook references for any concept you fumbled","hint":"ANSI Z765 is the most commonly-flagged gap on MR 2."}]}
          />
          <WorkfileCheck
            step="p2"
            mentorReviewN={2}
            navigate={navigate}
            expectedItems={[{"label":"PropMix property card capture","match":"propmix","hint":"Including any cross-checks you did."},{"label":"Inspection photos and Matterport annotations","match":"inspection","hint":"Annotated photos go in the workfile."},{"label":"GLA worksheet (your calculation)","match":"gla","hint":"Reconciled with the Apex sketch."},{"label":"Apex sketch export","match":"apex","hint":"PDF export of the validated sketch."}]}
          />
          <div style={{ display: 'flex', gap: 10 }}>
            <Button variant="outline" fullWidth onClick={() => navigate('sketch')}>Revise first</Button>
            <Button variant="primary" fullWidth onClick={() => navigate('market-analysis')}>Submit to mentor (async · 24 hr)</Button>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card padding="14px 16px" style={{ background: '#fafbfc' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src={MENTOR.avatar} style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover' }}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700 }}>{MENTOR.name}</div>
                <div style={{ fontSize: 10.5, color: '#888' }}>Reviews Step 2 — returns scored 4-pt rubric</div>
              </div>
              <Badge color="warning">3 in queue</Badge>
            </div>
          </Card>
          <Card padding="14px 16px" style={{ background: '#1a1d2b', color: '#fff' }}>
            <div style={{ fontSize: 10.5, color: '#cbd0e0', letterSpacing: '.05em', textTransform: 'uppercase', fontWeight: 700 }}>How this review works</div>
            <div style={{ fontSize: 12, color: '#cbd0e0', marginTop: 6, lineHeight: 1.5 }}>
              James reviews your work + your workfile against the 4-point rubric. He returns scored feedback for each criterion. Foundational gaps come with McKissock textbook references.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}



// ═══ SCREEN 18: Market Analysis ══════════════════════════════
function S18_Market({ navigate }) {
  return (
    <div>
      <PageHeader breadcrumb={['Step 3', 'Section XI.A–B']} title="Market analysis"
        subtitle="PropMix market dashboard left · structured analysis right · Socratic AI challenge below."/>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 16 }}>
        <MockToolFrame tool="PropMix" tab="market dashboard" height={500}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 12 }}>
            <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '.05em' }}>Median Sale · 12 mo</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#0a6ed1', marginTop: 2, fontFamily: "'Nunito', sans-serif" }}>$478,400</div>
              <div style={{ fontSize: 10.5, color: '#1a9e5c', fontWeight: 600, marginTop: 2 }}>↑ 4.2% YoY</div>
              <div style={{ marginTop: 6 }}><Sparkline data={[442,448,451,456,460,464,468,470,473,475,477,478]} w={210} h={36} color="#0a6ed1" fill="rgba(10,110,209,0.12)"/></div>
            </div>
            <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 8, padding: 12 }}>
              <div style={{ fontSize: 10.5, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '.05em' }}>Days on Market</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: '#0a6ed1', marginTop: 2, fontFamily: "'Nunito', sans-serif" }}>12 days</div>
              <div style={{ fontSize: 10.5, color: '#1a9e5c', fontWeight: 600, marginTop: 2 }}>↓ from 28 (12mo)</div>
              <div style={{ marginTop: 6 }}><BarMini data={[28,26,24,22,20,18,17,15,14,13,12,12]} w={210} h={36} color="#0a6ed1"/></div>
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
                "AVMs are reference, not authority. Don't quote them as your value.",
              ]}/>
          </div>
          <div style={{ background: '#fff', border: '1px solid #e8e8e8', borderRadius: 8, padding: 12 }}>
            <div style={{ fontSize: 10.5, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 8 }}>AVM Cross-check (reference only)</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              {[['CoreLogic','$472,800'],['HouseCanary','$485,100'],['PropMix AVM','$478,200']].map(([k,v],i)=>(
                <div key={i} style={{ background: '#eaf3ff', borderRadius: 6, padding: 8 }}>
                  <div style={{ fontSize: 10, color: '#888' }}>{k}</div>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#0a6ed1', fontFamily: "'Nunito', sans-serif" }}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </MockToolFrame>

        <Card padding={20} style={{ height: 500, overflow: 'auto' }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Your conclusion</div>
          <label style={{ fontSize: 11, fontWeight: 600, color: '#666', display: 'block', marginBottom: 4 }}>Market trend (your call)</label>
          <select defaultValue="" style={{ width: '100%', padding: '8px 10px', border: '1.5px solid #e8e8e8', borderRadius: 6, fontSize: 13, fontFamily: 'inherit', background: '#fff', color: '#292929', marginBottom: 14 }}>
            <option value="">— Choose, then defend below —</option>
            <option>Increasing</option><option>Stable</option><option>Declining</option>
          </select>
          <label style={{ fontSize: 11, fontWeight: 600, color: '#666', display: 'block', marginBottom: 4 }}>Your supporting data points (3 required)</label>
          <textarea rows={4} placeholder={"1. \n2. \n3. "} style={{
            width: '100%', padding: 10, fontSize: 12, fontFamily: 'inherit', lineHeight: 1.6,
            border: '1px solid #e8e8e8', borderRadius: 6, marginBottom: 14, resize: 'vertical',
          }}/>
          <div style={{ background: '#1a1d2b', color: '#fff', borderRadius: 8, padding: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}><AIChip label="Socratic" tone="brand" size="sm"/></div>
            <div style={{ fontSize: 12, color: '#e8eaf0', lineHeight: 1.5 }}>
              You concluded <em>increasing</em>. With absorption at 2.8 mo (below the 6-mo equilibrium), I agree the data leans that direction — but defend it: which of the three is your strongest support, and why?
            </div>
          </div>
          <Button variant="primary" fullWidth onClick={() => navigate('hbu')} style={{ marginTop: 14 }}>
            Continue · HBU 4-test <Icon name="arrow-right" size={13} color="#fff"/>
          </Button>
        </Card>
      </div>
    </div>
  );
}

// ═══ SCREEN 19: HBU 4-Test ═══════════════════════════════════
function S19_HBU({ navigate, tweaks }) {
  return (
    <div>
      <PageHeader breadcrumb={['Step 3', 'Section XI.C']} title="Highest & best use"
        subtitle="The 4-test framework — sequential. Live USPAP SR1-3 scanner watches your narrative for conclusory statements."/>

      <div style={{ marginBottom: 14 }}>
        <TextbookCallout topic="hbu" why="The 4 tests are sequential and every one of them must be addressed — re-read before you submit."/>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { n: 1, title: 'Legally Permissible', state: 'current', body: '', placeholder: 'What does R-1 zoning allow / prohibit here? Are there deed restrictions or environmental rules?' },
            { n: 2, title: 'Physically Possible', state: 'current', body: '', placeholder: 'Lot size, soil, access, utilities — what does the site physically support?' },
            { n: 3, title: 'Financially Feasible', state: 'current', body: '', placeholder: 'Of the legally permissible + physically possible uses, which ones generate a positive return? Show your reasoning.' },
            { n: 4, title: 'Maximally Productive', state: 'current', body: '', placeholder: 'Of the feasible uses, which one produces the highest value (as vacant AND as improved)?' },
          ].map((t) => {
            const isDone = t.state === 'done', isCurrent = t.state === 'current';
            return (
              <Card key={t.n} padding={18} style={{ border: isCurrent ? '1.5px solid #d60436' : '1px solid #eee', background: isCurrent ? '#fff8fa' : '#fff' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                    background: isDone ? '#1a9e5c' : isCurrent ? '#d60436' : '#e8e8e8',
                    color: isDone || isCurrent ? '#fff' : '#888',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800,
                  }}>{isDone ? <Icon name="check" size={14} color="#fff" strokeWidth={3}/> : t.n}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#292929' }}>Test {t.n} · {t.title}</div>
                    {t.body
                    ? <div style={{ fontSize: 12.5, color: '#444', lineHeight: 1.55, marginTop: 6 }}>{t.body}</div>
                    : <textarea rows={2} placeholder={t.placeholder} style={{
                        width: '100%', marginTop: 6, padding: 8, fontSize: 12, fontFamily: 'inherit', lineHeight: 1.5,
                        border: '1px solid #e8e8e8', borderRadius: 6, resize: 'vertical', background: '#fafbfc',
                      }}/>}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card padding="14px 16px" style={{ background: '#fafbfc' }}>
            <div style={{ fontSize: 10.5, fontWeight: 800, color: '#888', letterSpacing: '.06em', textTransform: 'uppercase', marginBottom: 8 }}>
              On your own
            </div>
            <div style={{ fontSize: 12, color: '#444', lineHeight: 1.55 }}>
              All four tests in your own words. No template, no AI completion. The mentor will read for whether you've reasoned through it — not whether you matched a script.
            </div>
          </Card>
          <Button variant="primary" onClick={() => navigate('mentor-review-3')}>
            Submit Step 3 · MR 3 <Icon name="arrow-right" size={14} color="#fff"/>
          </Button>
        </div>
      </div>
    </div>
  );
}

// ═══ SCREEN 20: Mentor Review 3 ══════════════════════════════
function S20_MentorReview3({ navigate }) {
  return (
    <div>
      <PageHeader breadcrumb={['Step 3', 'Mentor Review 3']} title="Mentor Review 3"
        subtitle="Asynchronous review by James Mendel, MAI. Submit when you're ready — 24 hr typical turnaround."/>

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <ManualChecklist
            title="Self-check before submitting Step 3"
            subtitle="You mark these yourself. Mentor reviews your marks + the actual work."
            storageKey="mr3-selfcheck"
            items={[{"label":"Market trend conclusion supported by 3 distinct data points","hint":"DOM, sale-to-list, and absorption — in your own analysis."},{"label":"HBU 4-test addressed in writing for both vacant and as-improved","hint":"Legally permissible → physically possible → financially feasible → maximally productive."},{"label":"Financial feasibility shown with reasoning (not just \"because\")","hint":"Most common MR 3 flag."},{"label":"AVMs cross-checked against your own market analysis","hint":"Tools are reference, not authority."},{"label":"Reviewed McKissock textbook references for HBU foundations","hint":"New appraisers most often skip step 3 of the 4-test."}]}
          />
          <WorkfileCheck
            step="p3"
            mentorReviewN={3}
            navigate={navigate}
            expectedItems={[{"label":"PropMix market dashboard capture","match":"market","hint":"DOM, STL, absorption screenshots."},{"label":"AVM cross-check screenshots","match":"avm","hint":"Or just \"corelogic\"/\"housecanary\" labeled captures."},{"label":"HBU 4-test written analysis","match":"hbu","hint":"Your written reasoning for each of the four tests."}]}
          />
          <div style={{ display: 'flex', gap: 10 }}>
            <Button variant="outline" fullWidth onClick={() => navigate('hbu')}>Revise first</Button>
            <Button variant="primary" fullWidth onClick={() => navigate('comp-selection')}>Submit to mentor (async · 24 hr)</Button>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Card padding="14px 16px" style={{ background: '#fafbfc' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <img src={MENTOR.avatar} style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover' }}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700 }}>{MENTOR.name}</div>
                <div style={{ fontSize: 10.5, color: '#888' }}>Reviews Step 3 — returns scored 4-pt rubric</div>
              </div>
              <Badge color="warning">3 in queue</Badge>
            </div>
          </Card>
          <Card padding="14px 16px" style={{ background: '#1a1d2b', color: '#fff' }}>
            <div style={{ fontSize: 10.5, color: '#cbd0e0', letterSpacing: '.05em', textTransform: 'uppercase', fontWeight: 700 }}>How this review works</div>
            <div style={{ fontSize: 12, color: '#cbd0e0', marginTop: 6, lineHeight: 1.5 }}>
              James reviews your work + your workfile against the 4-point rubric. He returns scored feedback for each criterion. Foundational gaps come with McKissock textbook references.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}



// ═══ SCREEN 21: Comp Selection (HERO SCREEN) ═════════════════
function S21_CompSelection({ navigate, tweaks }) {
  const [selected, setSelected] = useS2(['C1', 'C2', 'C3']);
  const intensity = tweaks?.aiIntensity || 'normal';

  return (
    <div>
      <PageHeader breadcrumb={['Step 4', 'Section XIII']} title="Comp selection — defend every pick"
        subtitle="Real PropMix MLS data · AI scores each candidate · you defend each selection against your Socratic AI partner."/>

      <WorkfileGate step="p4" label="PropMix comp candidates · 47 properties + AI ranking" source="PropMix MLS">
        47 candidates with AI match scores. Capture the raw list <em>and</em> your three picks — including the ones you rejected and why.
      </WorkfileGate>

      <div style={{ marginBottom: 14 }}>
        <VerifyThisCallout tool="PropMix" claim="AI ranked C4 (87) higher than C3 (78) on its match score"
          verifySteps={[
            "What is the PropMix AI scoring on? Distance and GLA alone, or location quality + sale recency too?",
            "Check the raw MLS for each candidate — does the AI's ranking match what your own market knowledge says?",
            "Is the highest-scored comp in the same neighborhood, or just within a radius?",
            "Walk the AI's ranking against your three picks — if it disagrees, defend your pick with market evidence, not gut feel.",
          ]}/>
      </div>

      <WorkfileCaptureButton step="p4" label="Comp selection · 3 picks defended" source="PropMix MLS + AI ranking"/>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 14 }}>
        {/* Left: MLS map + ranked list */}
        <Card padding={0} style={{ overflow: 'hidden' }}>
          <div style={{ height: 200, background: '#dde8d8', position: 'relative', backgroundImage: 'url(https://images.unsplash.com/photo-1524813686514-a57563d77965?w=800&q=70)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,30,15,0.35)' }}/>
            <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }} viewBox="0 0 700 200">
              <path d="M 50 30 L 600 25 L 650 100 L 600 175 L 100 170 Z" fill="rgba(214,4,54,0.18)" stroke="#d60436" strokeWidth="1.5" strokeDasharray="5,3"/>
              <circle cx="350" cy="100" r="9" fill="#d60436" stroke="#fff" strokeWidth="2"/>
              <text x="350" y="84" textAnchor="middle" fontSize="10" fontWeight="700" fill="#fff" fontFamily="DM Sans">SUBJECT</text>
              {COMPS.map((c, i) => {
                const x = 200 + i * 90, y = 70 + (i % 2) * 60;
                const sel = selected.includes(c.id);
                return (
                  <g key={c.id}>
                    <circle cx={x} cy={y} r="11" fill={sel ? '#1a9e5c' : '#fff'} stroke={sel ? '#1a9e5c' : '#0a6ed1'} strokeWidth="2"/>
                    <text x={x} y={y+4} textAnchor="middle" fontSize="10" fontWeight="800" fill={sel ? '#fff' : '#0a6ed1'} fontFamily="DM Sans">{c.id}</text>
                  </g>
                );
              })}
              <text x="20" y="195" fontSize="10" fill="#fff" fontFamily="DM Sans" fontWeight="700">PropMix MLS · 47 closed sales · 12 mo · 1mi radius</text>
            </svg>
          </div>
          <div style={{ padding: 12 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#888', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.05em' }}>Ranked candidates · AI match score</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {COMPS.map(c => {
                const sel = selected.includes(c.id);
                return (
                  <div key={c.id} onClick={() => setSelected(s => s.includes(c.id) ? s.filter(x => x !== c.id) : [...s, c.id])}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 10, padding: 8,
                      background: sel ? '#edfbf4' : '#fafafa',
                      border: `1.5px solid ${sel ? '#1a9e5c' : '#e8e8e8'}`,
                      borderRadius: 6, cursor: 'pointer', transition: 'all 120ms',
                  }}>
                    <img src={c.photo} style={{ width: 44, height: 36, objectFit: 'cover', borderRadius: 4 }}/>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#292929' }}>{c.id} · {c.address}</div>
                      <div style={{ fontSize: 10.5, color: '#888', fontFamily: "'JetBrains Mono', monospace" }}>{c.gla}sf · {c.beds}/{c.baths} · {c.dist}mi · sold {c.sold}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#292929', fontFamily: "'Nunito', sans-serif" }}>${c.sale.toLocaleString()}</div>
                      <div style={{ fontSize: 10, color: c.aiScore >= 90 ? '#1a9e5c' : c.aiScore >= 85 ? '#e8860a' : '#888', fontWeight: 700 }}>AI: {c.aiScore}</div>
                    </div>
                  </div>
                );
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
            {selected.map(id => {
              const c = COMPS.find(x => x.id === id);
              return (
                <div key={id} style={{ background: '#fafafa', border: '1px solid #e8e8e8', borderRadius: 6, padding: 10 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontSize: 11.5, fontWeight: 700, color: '#1a9e5c' }}>{c.id}</div>
                      <div style={{ fontSize: 11, color: '#444' }}>{c.address.split(' ').slice(0,2).join(' ')}</div>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, fontFamily: "'Nunito', sans-serif" }}>${(c.sale/1000).toFixed(0)}K</div>
                  </div>
                  <div style={{ marginTop: 6, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 4, fontSize: 10, color: '#666', fontFamily: "'JetBrains Mono', monospace" }}>
                    <span>{c.gla}sf</span><span>{c.dist}mi</span><span>{c.dom}d DOM</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 10, padding: 8, background: '#edfbf4', borderRadius: 6, fontSize: 11, color: '#1a9e5c', fontWeight: 600 }}>
            ✓ All 3 picks defended
          </div>
        </Card>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}>
        <Button variant="primary" onClick={() => navigate('mentor-review-4')}>
          Submit selections · MR 4 <Icon name="arrow-right" size={14} color="#fff"/>
        </Button>
      </div>
    </div>
  );
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
        1: 'Accepted AI ranking without independent reasoning.',
      },
      note: "You picked C1/C2/C3 over the AI's top-scored C4. Defense was reasonable, but lean more on neighborhood boundary and bracketing logic — not 'AI is wrong.'",
    },
    {
      label: 'Proximity & market alignment',
      desc: 'Comps share the subject\'s market segment',
      score: 4,
      descriptors: {
        4: 'All comps in the subject\'s neighborhood boundary; same buyer pool.',
        3: 'Comps in close radius; one comp arguably from a different sub-market.',
        2: 'Radius-based selection; market alignment not explicitly addressed.',
        1: 'Comps span multiple market segments.',
      },
      note: 'All three within 0.7 mi and inside Glenmoor Estates. Clean.',
    },
    {
      label: 'Sale recency & time-adjustment readiness',
      desc: 'Closed sales within market-meaningful window',
      score: 2,
      descriptors: {
        4: 'All comps closed within 90 days; minimal time adjustment expected.',
        3: 'Older comps included with a clear time-adjustment plan documented.',
        2: 'Older comp included without an articulated time-adjustment approach.',
        1: 'Multiple stale comps; no time adjustment plan.',
      },
      note: 'C3 closed 14 months ago. You\'ll need a defensible monthly adjustment derived from paired sales — not an industry rule of thumb.',
      gap: 'comp-selection',
    },
    {
      label: 'Bracketing the subject',
      desc: 'Picks bracket subject on GLA, beds, baths',
      score: 3,
      descriptors: {
        4: 'Subject is bracketed on all primary characteristics.',
        3: 'Subject is bracketed on most primary characteristics; one parameter is one-sided.',
        2: 'Bracketing addressed only on price; physical brackets not analyzed.',
        1: 'No bracketing analysis.',
      },
      note: 'GLA bracket: 2,055 – 2,210 (subject 2,148) — good. Bath bracket is one-sided (all comps 2.5 or 3 baths). Acknowledge.',
    },
  ];
  return (
    <div>
      <PageHeader breadcrumb={['Step 4', 'Mentor Review 4']} title="Mentor Review 4 — Sales Analysis"
        subtitle="Asynchronous review by James Mendel, MAI. Submitted Wed 4:18 PM · returned Thu 9:42 AM · turnaround 17 hr."/>

      <MentorRubric
        criteria={criteria}
        feedback="Strong comp set overall. The basement-finish adjustment will get hit on the next review — set up the paired sales now. Where I want you to grow: your defense of C3 over C4 leaned on 'I trust my read of the market more than the AI.' That's the right instinct but the wrong articulation. Show me a market mechanism. Otherwise: clean. Continue."
        asyncMeta="Submitted Wed 4:18 PM · returned Thu 9:42 AM · 17 hr turnaround"
        gapReferences={[
          { topic: 'comp-selection', why: 'Selecting comps is a market judgment, not a score — re-read.' },
          { topic: 'adjustments', why: 'You\'ll need paired-sales support for the time adjustment on C3.' },
        ]}
        onOpenTextbook={(t) => window.__openTextbook?.(t)}
      />

      <div style={{ marginTop: 16 }}>
        <WorkfileCheck
          step="p4"
          mentorReviewN={4}
          navigate={navigate}
          expectedItems={[
            { label: 'PropMix MLS candidate list (47 properties + AI ranking)', match: 'propmix', hint: 'Capture the raw list — including the ones you rejected.' },
            { label: 'Your three picks with written defense for each', match: 'comp', hint: 'A short paragraph per pick — why this comp, not the AI\'s top pick.' },
            { label: 'Rejected candidates with reasons', match: 'comp', hint: 'Mentor specifically asks for what you rejected and why.' },
          ]}
        />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 16 }}>
        <Button variant="ghost" onClick={() => navigate('comp-selection')}>Revise selection</Button>
        <Button variant="primary" onClick={() => navigate('adjustment-grid')}>
          Continue to Step 5 · Adjustment Grid <Icon name="arrow-right" size={13} color="#fff"/>
        </Button>
      </div>
    </div>
  );
}

Object.assign(window, { S12_CaseDrop, S13_PropertyResearch, S14_VirtualInspection, S15_GLA, S16_Sketch, S17_MentorReview2, S18_Market, S19_HBU, S20_MentorReview3, S21_CompSelection, S22_MentorReview4 });
