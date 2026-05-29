// PAREA LMS — All 14 Screens
const { useState, useEffect, useRef } = React;

// ═══════════════════════════════════════════════════════════
// SCREEN 1: Dashboard / Homepage
// ═══════════════════════════════════════════════════════════
function Screen1_Dashboard({ navigate }) {
  const activityFeed = [
    { icon: 'message-square', color: C.info, text: 'Sarah opened a discussion on comparable selection methodology.', time: 'April 27, 9:14 AM', user: 'Sarah H.' },
    { icon: 'check-circle', color: C.success, text: 'Module 2 · Case 1 marked complete.', time: 'April 26, 4:02 PM', user: 'System' },
    { icon: 'star', color: C.warning, text: 'Mentor Sarah Chen left feedback on your Case 1 report.', time: 'April 25, 11:30 AM', user: 'Sarah Chen, MAI' },
  ];
  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
      {/* Main */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <PageHeader title="Welcome back, Sarah." subtitle="You're making great progress. Here's where you left off." />

        {/* Up Next */}
        <Card style={{ border: `1.5px solid ${C.brand}20` }}>
          <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.08em', color: C.brand, textTransform: 'uppercase', marginBottom: 12 }}>Up Next</div>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <div style={{
              width: 80, height: 64, borderRadius: 10, flexShrink: 0,
              background: 'linear-gradient(135deg, #fce4ec 0%, #ffd6de 100%)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="home" size={28} color={C.brand} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, color: C.text3, marginBottom: 2 }}>Module 2</div>
              <div style={{ fontSize: 17, fontWeight: 700, color: C.charcoal, marginBottom: 6 }}>Case 2: Residential Property</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <Badge color="warning">Not Started</Badge>
                <Badge color="neutral" dot={false}>8–12 hrs</Badge>
              </div>
            </div>
            <Button variant="primary" onClick={() => navigate('case-launch')}>
              Start Case <Icon name="arrow-right" size={14} color="#fff" />
            </Button>
          </div>
        </Card>

        {/* Completed */}
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: C.text2, marginBottom: 12 }}>Completed</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { mod: 'Module 1', title: 'Case 1: Single Family Residence', score: '22/25', date: 'Apr 18' },
              { mod: 'Module 1', title: 'Introduction to Appraisal Principles', score: 'Complete', date: 'Apr 10' },
            ].map((item, i) => (
              <Card key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: C.successBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name="check-circle" size={18} color={C.success} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: C.text3 }}>{item.mod}</div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.charcoal }}>{item.title}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: C.success }}>{item.score}</div>
                  <div style={{ fontSize: 11, color: C.text3 }}>{item.date}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Activity Feed Sidebar */}
      <div style={{ width: 280, flexShrink: 0 }}>
        <CardSection title="Activity Feed">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {activityFeed.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '12px 0', borderBottom: i < activityFeed.length - 1 ? `1px solid ${C.border}` : 'none' }}>
                <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon name={a.icon} size={14} color={a.color} />
                </div>
                <div>
                  <div style={{ fontSize: 12, color: C.charcoal, lineHeight: 1.4 }}><strong>{a.user}</strong> — {a.text}</div>
                  <div style={{ fontSize: 11, color: C.text3, marginTop: 3 }}>{a.time}</div>
                </div>
              </div>
            ))}
          </div>
        </CardSection>

        <Card style={{ marginTop: 16 }}>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Upcoming</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ width: 32, height: 32, borderRadius: 6, background: C.infoBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="video" size={14} color={C.info} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Mentor Meeting</div>
                <div style={{ fontSize: 12, color: C.text3 }}>Nov 17 · 9:00 AM ET</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ width: 32, height: 32, borderRadius: 6, background: C.warningBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Icon name="clipboard" size={14} color={C.warning} />
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>Case 2 Due</div>
                <div style={{ fontSize: 12, color: C.text3 }}>May 18, 2026</div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCREEN 2: Case Activity Launch
// ═══════════════════════════════════════════════════════════
function Screen2_CaseLaunch({ navigate }) {
  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <PageHeader breadcrumb={['My Courses', 'Module 2', 'Case 2']} title="Case 2: Residential Property" />

      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <Badge color="neutral" dot={false}>Not Started</Badge>
          <span style={{ fontSize: 13, color: C.text3 }}>0% overall progress</span>
        </div>
        <div style={{ background: '#f0f0f0', borderRadius: 9999, height: 8, overflow: 'hidden', marginBottom: 6 }}>
          <div style={{ width: '0%', height: '100%', background: C.brand, borderRadius: 9999, transition: 'width 600ms ease' }} />
        </div>
        <div style={{ fontSize: 12, color: C.text3 }}>Complete all 5 steps to finish this case</div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
        {[
          { label: 'Case Type', value: 'Single Family Residence', icon: 'home' },
          { label: 'Mentor', value: 'Sarah Chen, MAI', icon: 'user-check' },
          { label: 'Estimated Time', value: '8–12 hours', icon: 'clock' },
          { label: 'Due Date', value: 'May 18, 2026', icon: 'calendar' },
        ].map((m, i) => (
          <Card key={i} style={{ padding: '14px 18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: C.brandSubtle, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={m.icon} size={15} color={C.brand} />
              </div>
              <div>
                <div style={{ fontSize: 11, color: C.text3, fontWeight: 500 }}>{m.label}</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.charcoal }}>{m.value}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: C.text2, marginBottom: 12 }}>Case Steps</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {['Property Data Collection', 'Visual Inspection', 'Complete Appraisal Report', 'Peer Review', 'Discussion Forum'].map((s, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', background: '#fafafa', borderRadius: 8 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: C.text3 }}>{i + 1}</div>
              <span style={{ fontSize: 14, color: C.charcoal }}>{s}</span>
            </div>
          ))}
        </div>
      </Card>

      <Button variant="primary" size="lg" fullWidth onClick={() => navigate('case-intro')}>
        Start Case <Icon name="arrow-right" size={15} color="#fff" />
      </Button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCREEN 3: Case Introduction
// ═══════════════════════════════════════════════════════════
function Screen3_CaseIntro({ navigate }) {
  const [playing, setPlaying] = useState(false);
  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <PageHeader breadcrumb={['Module 2', 'Case 2']} title="Residential Property Analysis" />

      {/* Video Player */}
      <Card style={{ marginBottom: 20, padding: 0, overflow: 'hidden' }}>
        <div
          onClick={() => setPlaying(!playing)}
          style={{
            position: 'relative', background: '#1a1a2e', height: 320,
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}
        >
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 12 }}>
            <div style={{ fontSize: 48, opacity: 0.15 }}>🏠</div>
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(255,255,255,0.3)' }}>
              <Icon name={playing ? 'pause' : 'play'} size={26} color="#fff" />
            </div>
            {!playing && <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>Case 2 Introduction — 4:32</div>}
          </div>
          {playing && (
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 4, background: 'rgba(255,255,255,0.2)' }}>
              <div style={{ width: '0%', height: '100%', background: C.brand }} />
            </div>
          )}
        </div>
        <div style={{ padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: C.text2 }}>Intro</span>
          <button style={{ fontSize: 12, color: C.info, background: 'none', border: `1px solid ${C.info}`, borderRadius: 4, padding: '2px 8px', cursor: 'pointer' }}>CC</button>
          <button style={{ fontSize: 12, color: C.info, background: 'none', border: `1px solid ${C.info}`, borderRadius: 4, padding: '2px 8px', cursor: 'pointer' }}>Transcript</button>
          <span style={{ fontSize: 12, color: C.text3, flex: 1 }}>Watch this overview provided by your mentor to understand the objectives of this case.</span>
        </div>
      </Card>

      {/* Case Overview */}
      <CardSection title="Case Overview" style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 14, color: C.text2, lineHeight: 1.6 }}>
          In this case, you will complete a full appraisal of a single-family residence located in a suburban market. You'll research comparable sales, conduct a visual inspection using the PropMix MLS platform, complete a standard URAR appraisal report, participate in peer review, and engage in a class discussion about your methodology.
        </p>
        <p style={{ fontSize: 14, color: C.text2, lineHeight: 1.6, marginTop: 10 }}>
          This is a supervised simulation designed to mirror real-world appraisal conditions. Your mentor, Sarah Chen MAI, will review your completed report and provide feedback within 5 business days.
        </p>
      </CardSection>

      {/* What You'll Produce */}
      <CardSection title="What You'll Produce" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            'A completed URAR appraisal report for a 3-bed/2-bath single family home',
            'A written sales comparison grid with at least 3 comparable properties',
            'Documented property inspection notes and measurements',
            'A peer review evaluation of a fellow student\'s report',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', background: C.brandSubtle, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: C.brand }}>{i + 1}</span>
              </div>
              <span style={{ fontSize: 14, color: C.charcoal, lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
      </CardSection>

      {/* Learning Path */}
      <CardSection title="Learning Path" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {['Property Data Collection', 'Visual Inspection', 'Complete Appraisal Report', 'Peer Review', 'Discussion Forum'].map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, padding: '10px 0', borderBottom: i < 4 ? `1px solid ${C.border}` : 'none', alignItems: 'center' }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', border: `2px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 12, fontWeight: 700, color: C.text3 }}>{i + 1}</div>
              <span style={{ fontSize: 14, color: C.charcoal }}>{step}</span>
            </div>
          ))}
        </div>
      </CardSection>

      <Button variant="primary" size="lg" fullWidth onClick={() => navigate('step-1')}>
        Begin Research <Icon name="arrow-right" size={15} color="#fff" />
      </Button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCREEN 4: Property Data Collection (Step 1 of 5)
// ═══════════════════════════════════════════════════════════
function Screen4_DataCollection({ navigate, showToast }) {
  const STEPS = ['Data Collection', 'Visual Inspection', 'Appraisal Report', 'Peer Review', 'Discussion'];
  const [checks, setChecks] = useState([false, false, false, false]);
  const [notes, setNotes] = useState('');
  const items = [
    'Locate subject property in PropMix MLS and confirm parcel data',
    'Identify and export at least 3 comparable sales within 1 mile, same timeframe',
    'Document square footage, year built, bedroom/bathroom count, and lot size',
    'Note any special features: garage, pool, recent renovations, or condition issues',
  ];
  const allChecked = checks.every(Boolean);
  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: C.text3, marginBottom: 8 }}>Module 2 · Case 2 · Step 1 of 5</div>
        <StepTracker steps={STEPS} current={0} />
      </div>
      <PageHeader title="Property Data Collection" />

      <ToolCard title="PropMix MLS Platform" description="Access the MLS database to research the subject property, comparable sales, and market data for your appraisal." onLaunch={() => showToast('PropMix MLS opening in a new tab...')} />

      <CardSection title="Task Checklist" style={{ marginTop: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {items.map((item, i) => (
            <CheckItem key={i} label={item} checked={checks[i]} onChange={v => { const n = [...checks]; n[i] = v; setChecks(n); }} />
          ))}
        </div>
      </CardSection>

      <CardSection title="Research Notes" style={{ marginTop: 16 }}>
        <Textarea placeholder="Record your data collection notes here — property details, comps found, any anomalies or concerns…" value={notes} onChange={setNotes} rows={5} />
      </CardSection>

      <div style={{ marginTop: 24 }}>
        <Button variant="primary" size="lg" fullWidth onClick={() => { showToast('Step 1 complete! Moving to Visual Inspection.'); navigate('step-2'); }} disabled={!allChecked}>
          <Icon name="check" size={15} color="#fff" /> Mark Complete &amp; Continue
        </Button>
        {!allChecked && <p style={{ textAlign: 'center', fontSize: 12, color: C.text3, marginTop: 8 }}>Complete all checklist items to continue.</p>}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCREEN 5: Visual Inspection (Step 2 of 5)
// ═══════════════════════════════════════════════════════════
function Screen5_VisualInspection({ navigate, showToast }) {
  const STEPS = ['Data Collection', 'Visual Inspection', 'Appraisal Report', 'Peer Review', 'Discussion'];
  const [checks, setChecks] = useState([false, false, false, false, false]);
  const [measurements, setMeasurements] = useState({ grossLiving: '', lotSize: '', garage: '', yearBuilt: '' });
  const [observations, setObservations] = useState('');
  const items = [
    'Confirm property address and access on PropMix street view',
    'Document exterior condition: roof, siding, windows, foundation',
    'Note interior condition based on available listing photos',
    'Record all permanent improvements and special features',
    'Photograph or screenshot any condition issues for documentation',
  ];
  const setMeas = (k, v) => setMeasurements(prev => ({ ...prev, [k]: v }));
  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: C.text3, marginBottom: 8 }}>Module 2 · Case 2 · Step 2 of 5</div>
        <StepTracker steps={STEPS} current={1} />
      </div>
      <PageHeader title="Visual Inspection" />

      <ToolCard title="MatterPort Virtual Tour Platform" description="Use street view, listing photos, and property details to conduct your remote visual inspection." onLaunch={() => showToast('MatterPort Virtual Tour opening in a new tab...')} />

      <CardSection title="Inspector's List" style={{ marginTop: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {items.map((item, i) => (
            <CheckItem key={i} label={item} checked={checks[i]} onChange={v => { const n = [...checks]; n[i] = v; setChecks(n); }} />
          ))}
        </div>
      </CardSection>

      <CardSection title="Measurements" style={{ marginTop: 16 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[
            { label: 'Gross Living Area (sq ft)', key: 'grossLiving', placeholder: 'e.g. 1,842' },
            { label: 'Lot Size (sq ft)', key: 'lotSize', placeholder: 'e.g. 7,500' },
            { label: 'Garage / Carport', key: 'garage', placeholder: 'e.g. 2-car attached' },
            { label: 'Year Built', key: 'yearBuilt', placeholder: 'e.g. 1998' },
          ].map(f => (
            <div key={f.key}>
              <div style={{ fontSize: 12, fontWeight: 600, color: C.text2, marginBottom: 5 }}>{f.label}</div>
              <Input placeholder={f.placeholder} value={measurements[f.key]} onChange={v => setMeas(f.key, v)} />
            </div>
          ))}
        </div>
      </CardSection>

      <CardSection title="Observations &amp; Notes" style={{ marginTop: 16 }}>
        <Textarea placeholder="Document your visual inspection findings, condition ratings, and any notable observations…" value={observations} onChange={setObservations} rows={4} />
      </CardSection>

      <div style={{ marginTop: 24 }}>
        <Button variant="primary" size="lg" fullWidth onClick={() => { showToast('Step 2 complete!'); navigate('step-3'); }}>
          Continue to Report <Icon name="arrow-right" size={15} color="#fff" />
        </Button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCREEN 6: Appraisal Report (Step 3 of 5)
// ═══════════════════════════════════════════════════════════
function Screen6_AppraisalReport({ navigate, showToast }) {
  const STEPS = ['Data Collection', 'Visual Inspection', 'Appraisal Report', 'Peer Review', 'Discussion'];
  const [checks, setChecks] = useState([false, false, false, false]);
  const [reflection, setReflection] = useState('');
  const [uploaded, setUploaded] = useState(false);
  const items = [
    'Complete all sections of the URAR 1004 appraisal form',
    'Enter at least 3 comparable sales in the sales comparison grid',
    'Apply appropriate adjustments with written justification for each',
    'Reconcile value indication and provide final opinion of value',
  ];
  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: C.text3, marginBottom: 8 }}>Module 2 · Case 2 · Step 3 of 5</div>
        <StepTracker steps={STEPS} current={2} />
      </div>
      <PageHeader title="Complete Appraisal Report" />

      <ToolCard title="True Footage Appraisal Program" description="Use the True Footage platform to complete your URAR 1004 form. Enter all property data, comparable sales, adjustments, and your final value opinion." onLaunch={() => showToast('True Footage opening in a new tab...')} />

      <CardSection title="Report Checklist" style={{ marginTop: 20 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {items.map((item, i) => (
            <CheckItem key={i} label={item} checked={checks[i]} onChange={v => { const n = [...checks]; n[i] = v; setChecks(n); }} />
          ))}
        </div>
      </CardSection>

      {/* Upload */}
      <Card style={{ marginTop: 16 }}>
        <div
          onClick={() => { showToast('Report uploaded successfully.'); setUploaded(true); }}
          style={{
            border: `2px dashed ${uploaded ? C.success : C.border}`, borderRadius: 10, padding: '24px 20px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, cursor: 'pointer',
            background: uploaded ? C.successBg : '#fafafa', transition: 'all 200ms',
          }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: uploaded ? C.successBg : '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name={uploaded ? 'check-circle' : 'upload'} size={20} color={uploaded ? C.success : C.text3} />
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: uploaded ? C.success : C.charcoal }}>{uploaded ? 'Report Uploaded' : 'Upload Report'}</div>
            <div style={{ fontSize: 12, color: C.text3 }}>{uploaded ? 'appraisal_report_case2.pdf' : 'Click to upload your completed URAR 1004 form (PDF)'}</div>
          </div>
        </div>
      </Card>

      <CardSection title="Reflection" style={{ marginTop: 16 }}>
        <p style={{ fontSize: 13, color: C.text2, marginBottom: 10 }}>
          Briefly describe your approach to this appraisal. What challenges did you encounter with adjustments or comparable selection? What would you do differently?
        </p>
        <Textarea placeholder="Write your reflection here (minimum 100 words)…" value={reflection} onChange={setReflection} rows={5} />
      </CardSection>

      <div style={{ marginTop: 24 }}>
        <Button variant="primary" size="lg" fullWidth onClick={() => { showToast('Appraisal submitted for review!'); navigate('submitted'); }} disabled={!uploaded}>
          Submit for Review <Icon name="send" size={14} color="#fff" />
        </Button>
        {!uploaded && <p style={{ textAlign: 'center', fontSize: 12, color: C.text3, marginTop: 8 }}>Upload your report to submit.</p>}
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCREEN 7: Appraisal Submitted
// ═══════════════════════════════════════════════════════════
function Screen7_Submitted({ navigate }) {
  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      {/* Success Header */}
      <div style={{ textAlign: 'center', padding: '32px 0 24px' }}>
        <div style={{ width: 72, height: 72, borderRadius: '50%', background: C.successBg, border: `2px solid ${C.success}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
          <Icon name="check" size={32} color={C.success} strokeWidth={2.5} />
        </div>
        <h1 style={{ fontFamily: "'Nunito', sans-serif", fontSize: 28, fontWeight: 700, color: C.charcoal, marginBottom: 6 }}>Appraisal Submitted</h1>
        <p style={{ fontSize: 15, color: C.text2 }}>Your report is now under review by your mentor, Sarah Chen, MAI.</p>
      </div>

      {/* Status Timeline */}
      <Card style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 16 }}>Review Status</div>
        {[
          { label: 'Submitted', desc: 'Report received — May 1, 2026', done: true },
          { label: 'Under Review', desc: 'Mentor review in progress', done: true },
          { label: 'Feedback Ready', desc: 'Estimated 3–5 business days', done: false },
        ].map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, paddingBottom: i < 2 ? 16 : 0, position: 'relative' }}>
            {i < 2 && <div style={{ position: 'absolute', left: 13, top: 28, width: 2, height: 'calc(100% - 14px)', background: s.done ? C.success : '#e0e0e0' }} />}
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: s.done ? C.success : C.white, border: `2px solid ${s.done ? C.success : '#ccc'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {s.done ? <Icon name="check" size={13} color="#fff" strokeWidth={2.5} /> : <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ccc' }} />}
            </div>
            <div style={{ paddingTop: 2 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: s.done ? C.charcoal : C.text3 }}>{s.label}</div>
              <div style={{ fontSize: 12, color: C.text3 }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </Card>

      {/* Email notice */}
      <Card style={{ background: C.infoBg, border: `1px solid ${C.info}22`, marginBottom: 20 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <Icon name="mail" size={18} color={C.info} />
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.charcoal, marginBottom: 2 }}>Email Notification</div>
            <div style={{ fontSize: 13, color: C.text2 }}>We'll send an email update to sarah@email.com when your feedback is ready.</div>
          </div>
        </div>
      </Card>

      {/* Next Steps */}
      <CardSection title="What Happens Next" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { n: 1, t: 'Mentor Review', d: 'Sarah Chen will evaluate your report against the scoring rubric.' },
            { n: 2, t: 'Feedback + Scoring', d: 'You\'ll receive a score out of 25 with detailed rubric breakdown.' },
            { n: 3, t: 'Revision and/or Completion', d: 'You may be asked to revise or can proceed to case completion.' },
          ].map(s => (
            <div key={s.n} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{ width: 26, height: 26, borderRadius: '50%', border: `2px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 12, fontWeight: 700, color: C.text3 }}>{s.n}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.charcoal }}>{s.t}</div>
                <div style={{ fontSize: 12, color: C.text2 }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>
      </CardSection>

      <Button variant="primary" size="lg" fullWidth onClick={() => navigate('step-4')}>
        Continue to Peer Review <Icon name="arrow-right" size={15} color="#fff" />
      </Button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCREEN 8: Peer Review (Step 4 of 5)
// ═══════════════════════════════════════════════════════════
function Screen8_PeerReview({ navigate, showToast }) {
  const STEPS = ['Data Collection', 'Visual Inspection', 'Appraisal Report', 'Peer Review', 'Discussion'];
  const RUBRIC = [
    { label: 'Comparable Selection', desc: 'Quality and relevance of comparable sales chosen' },
    { label: 'Data Accuracy', desc: 'Correctness of property data and MLS information' },
    { label: 'Adjustment Methodology', desc: 'Appropriateness and support of value adjustments' },
    { label: 'Report Completeness', desc: 'All required sections completed and well-documented' },
  ];
  const [scores, setScores] = useState([0, 0, 0, 0]);
  const [feedback, setFeedback] = useState('');
  const setScore = (i, v) => { const n = [...scores]; n[i] = v; setScores(n); };
  const ready = scores.every(s => s > 0) && feedback.trim().length > 0;
  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: C.text3, marginBottom: 8 }}>Module 2 · Case 2 · Step 4 of 5</div>
        <StepTracker steps={STEPS} current={3} />
      </div>
      <PageHeader title="Peer Review" />

      {/* Assignment Card */}
      <Card style={{ marginBottom: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
        <div style={{ width: 48, height: 48, borderRadius: '50%', background: C.infoBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Icon name="users" size={22} color={C.info} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.charcoal, marginBottom: 2 }}>Peer Review Assignment</div>
          <div style={{ fontSize: 13, color: C.text2 }}>Author: Jordan Young &nbsp;·&nbsp; Case: Residential Property &nbsp;·&nbsp; Submitted: Sep 19, 2025</div>
        </div>
      </Card>

      {/* Download */}
      <Button variant="ghost" fullWidth style={{ marginBottom: 16, justifyContent: 'center', gap: 8 }} onClick={() => showToast('Downloading Jordan Young\'s report...')}>
        <Icon name="download" size={15} color={C.charcoal} /> Download Report (PDF)
      </Button>

      {/* Rubric */}
      <CardSection title="Review Rubric" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {RUBRIC.map((r, i) => (
            <div key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                <div>
                  <span style={{ fontSize: 14, fontWeight: 600 }}>{r.label}</span>
                  <span style={{ fontSize: 12, color: C.text3, marginLeft: 8 }}>{r.desc}</span>
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: scores[i] ? C.brand : C.text3, minWidth: 30, textAlign: 'right' }}>{scores[i] > 0 ? `${scores[i]}/5` : '—/5'}</span>
              </div>
              <div style={{ display: 'flex', gap: 6 }}>
                {[1, 2, 3, 4, 5].map(v => (
                  <button key={v} onClick={() => setScore(i, v)} style={{
                    flex: 1, padding: '7px 0', borderRadius: 6, fontSize: 13, fontWeight: 600,
                    border: `1.5px solid ${scores[i] === v ? C.brand : C.border}`,
                    background: scores[i] === v ? C.brand : 'transparent',
                    color: scores[i] === v ? '#fff' : C.text2,
                    cursor: 'pointer', transition: 'all 120ms',
                  }}>{v}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardSection>

      {/* Written Feedback */}
      <CardSection title="Written Feedback" style={{ marginBottom: 24 }}>
        <Textarea placeholder="Provide constructive feedback to your peer. Comment on their comparable selection, adjustment logic, and overall report quality. Be specific and professional." value={feedback} onChange={setFeedback} rows={5} />
      </CardSection>

      <Button variant="primary" size="lg" fullWidth onClick={() => { showToast('Peer review submitted!'); navigate('step-5'); }} disabled={!ready}>
        Submit Review <Icon name="send" size={14} color="#fff" />
      </Button>
      {!ready && <p style={{ textAlign: 'center', fontSize: 12, color: C.text3, marginTop: 8 }}>{scores.every(s => s > 0) ? 'Add written feedback to submit.' : 'Score all criteria and add written feedback to submit.'}</p>}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCREEN 9: Discussion Forum (Step 5 of 5)
// ═══════════════════════════════════════════════════════════
function Screen9_DiscussionForum({ navigate, showToast }) {
  const STEPS = ['Data Collection', 'Visual Inspection', 'Appraisal Report', 'Peer Review', 'Discussion'];
  const [checks, setChecks] = useState([false, false, false, false]);
  const [showForum, setShowForum] = useState(false);
  const [posts, setPosts] = useState([
    { author: 'Jordan Young', time: '12:00 · Sep 1, 2025', content: 'I found it challenging to find truly comparable sales for the subject. The neighborhood had limited recent transactions, so I had to expand my search radius to 1.5 miles. Anyone else deal with this?', replies: 7, likes: 3, liked: false, showReply: false, replyText: '', replies_list: [{ author: 'Maria Lopez', content: 'Same issue here — I ended up using a time adjustment for an older sale.', likes: 2, liked: false }] },
    { author: 'Maria Lopez', time: '13:00 · Sep 1, 2025', content: 'My biggest challenge was the garage adjustment. Subject had a 2-car attached but most comps had 1-car. I used $8,000 as my adjustment — does that seem reasonable for this market?', replies: 1, likes: 2, liked: false, showReply: false, replyText: '', replies_list: [] },
  ]);
  const [newPost, setNewPost] = useState('');
  const checkItems = [
    'Read at least 2 existing discussion posts from classmates',
    'Post an original comment about your appraisal approach or findings',
    'Reply to at least one classmate\'s post with substantive feedback',
    'Respond to any replies on your post (if applicable)',
  ];
  const toggleLike = (i) => setPosts(prev => prev.map((p, idx) => idx === i ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p));
  const submitPost = () => { if (newPost.trim()) { setPosts(prev => [{ author: 'Sarah H.', time: 'Just now', content: newPost, replies: 0, likes: 0, liked: false, showReply: false, replyText: '', replies_list: [] }, ...prev]); setNewPost(''); showToast('Post published!'); } };

  if (showForum) {
    return (
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ marginBottom: 20 }}>
          <button onClick={() => setShowForum(false)} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: C.white, border: `1.5px solid ${C.border}`,
            borderRadius: 8, padding: '8px 16px', cursor: 'pointer',
            fontSize: 13, fontWeight: 600, color: C.charcoal,
            boxShadow: '0 1px 3px rgba(0,0,0,.08)',
            marginBottom: 16, transition: 'all 150ms',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.brand; e.currentTarget.style.color = C.brand; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.charcoal; }}
          >
            <Icon name="arrow-left" size={15} color="currentColor" /> Back to Step 5
          </button>
          <PageHeader title="Discussion Forum" subtitle="Case 2: Residential Property Analysis" />
        </div>

        {/* Posts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
          {posts.map((p, i) => (
            <Card key={i}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <Avatar name={p.author} size={36} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontSize: 14, fontWeight: 700 }}>{p.author}</span>
                    <span style={{ fontSize: 11, color: C.text3 }}>{p.time}</span>
                  </div>
                  <p style={{ fontSize: 14, color: C.charcoal, lineHeight: 1.55, marginBottom: 10 }}>{p.content}</p>
                  <div style={{ display: 'flex', gap: 16 }}>
                    <button onClick={() => setPosts(prev => prev.map((pp, idx) => idx === i ? { ...pp, showReply: !pp.showReply } : pp))} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: C.text2, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Icon name="corner-down-right" size={12} color={C.text2} /> Reply
                    </button>
                    <button onClick={() => toggleLike(i)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: p.liked ? C.brand : C.text2, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Icon name="thumbs-up" size={12} color={p.liked ? C.brand : C.text2} /> {p.likes}
                    </button>
                  </div>
                  {/* Replies */}
                  {p.replies_list.map((r, ri) => (
                    <div key={ri} style={{ marginTop: 10, marginLeft: 16, padding: '10px 12px', background: '#f9f9f9', borderRadius: 8, borderLeft: `2px solid ${C.border}` }}>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                        <Avatar name={r.author} size={26} />
                        <div style={{ flex: 1 }}>
                          <span style={{ fontSize: 13, fontWeight: 700 }}>{r.author}</span>
                          <p style={{ fontSize: 13, color: C.text2, margin: '2px 0 6px' }}>{r.content}</p>
                          <button style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 11, color: r.liked ? C.brand : C.text3, display: 'flex', alignItems: 'center', gap: 3 }}>
                            <Icon name="thumbs-up" size={10} color={r.liked ? C.brand : C.text3} /> {r.likes}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {p.showReply && (
                    <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>
                      <Input placeholder="Write a reply…" value={p.replyText} onChange={v => setPosts(prev => prev.map((pp, idx) => idx === i ? { ...pp, replyText: v } : pp))} />
                      <Button variant="primary" size="sm" onClick={() => { showToast('Reply posted!'); setPosts(prev => prev.map((pp, idx) => idx === i ? { ...pp, replies_list: [...pp.replies_list, { author: 'Sarah H.', content: pp.replyText, likes: 0, liked: false }], replyText: '', showReply: false } : pp)); }}>
                        <Icon name="send" size={12} color="#fff" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* New Post */}
        <Card>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Start a New Discussion</div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Avatar name="Sarah H." size={32} />
            <div style={{ flex: 1 }}>
              <Textarea placeholder="Share your thoughts, questions, or observations about this case…" value={newPost} onChange={setNewPost} rows={3} />
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
                <Button variant="primary" size="sm" onClick={submitPost} disabled={!newPost.trim()}>
                  <Icon name="send" size={13} color="#fff" /> Post
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 720, margin: '0 auto' }}>
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, color: C.text3, marginBottom: 8 }}>Module 2 · Case 2 · Step 5 of 5</div>
        <StepTracker steps={STEPS} current={4} />
      </div>
      <PageHeader title="Discussion Forum" />

      <CardSection title="Instructions" style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 14, color: C.text2, lineHeight: 1.6 }}>
          Engage with your classmates in the course discussion forum. Share your approach to this case, any challenges you encountered, and respond thoughtfully to at least one peer's post. Substantive participation is required for credit.
        </p>
      </CardSection>

      <CardSection title="Discussion Checklist" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {checkItems.map((item, i) => (
            <CheckItem key={i} label={item} checked={checks[i]} onChange={v => { const n = [...checks]; n[i] = v; setChecks(n); }} />
          ))}
        </div>
      </CardSection>

      <Button variant="outline" fullWidth size="lg" onClick={() => setShowForum(true)} style={{ marginBottom: 12 }}>
        <Icon name="message-square" size={15} color={C.brand} /> Go to Discussion
      </Button>

      <Button variant="primary" size="lg" fullWidth onClick={() => { showToast('Case 2 complete! Great work.'); navigate('case-complete'); }}>
        <Icon name="check-circle" size={15} color="#fff" /> Mark Activity Complete
      </Button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCREEN 10: Case Complete
// ═══════════════════════════════════════════════════════════
function Screen10_CaseComplete({ navigate }) {
  const STEPS = ['Data Collection', 'Visual Inspection', 'Appraisal Report', 'Peer Review', 'Discussion'];
  return (
    <div style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ padding: '40px 0 28px' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: C.successBg, border: `2px solid ${C.success}`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          <Icon name="check" size={36} color={C.success} strokeWidth={2.5} />
        </div>
        <h1 style={{ fontFamily: "'Nunito', sans-serif", fontSize: 30, fontWeight: 800, color: C.charcoal, marginBottom: 8 }}>Case 2 Complete!</h1>
        <div style={{ maxWidth: 380, margin: '0 auto' }}>
          <StepTracker steps={STEPS} current={5} />
        </div>
      </div>

      <Card style={{ marginBottom: 20, textAlign: 'left' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: C.text2, marginBottom: 12 }}>Case Summary</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          {[
            { label: 'Case', value: 'Case 2: Residential Property' },
            { label: 'Module', value: 'Module 2' },
            { label: 'Steps Completed', value: '5 of 5' },
            { label: 'Mentor', value: 'Sarah Chen, MAI' },
          ].map((item, i) => (
            <div key={i}>
              <div style={{ fontSize: 11, color: C.text3, marginBottom: 2 }}>{item.label}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.charcoal }}>{item.value}</div>
            </div>
          ))}
        </div>
      </Card>

      <Card style={{ marginBottom: 24, background: `linear-gradient(135deg, ${C.successBg} 0%, #f0fdf6 100%)`, border: `1px solid ${C.success}33` }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: C.success, marginBottom: 6 }}>🎉 Nice work!</div>
        <p style={{ fontSize: 14, color: C.text2, lineHeight: 1.6 }}>
          Make sure to check the announcement board for your next assignment. Your mentor feedback for this case will be available within 3–5 business days.
        </p>
      </Card>

      <div style={{ display: 'flex', gap: 12 }}>
        <Button variant="ghost" fullWidth onClick={() => navigate('home')}>
          <Icon name="layout-dashboard" size={14} color={C.charcoal} /> Back to Dashboard
        </Button>
        <Button variant="primary" fullWidth onClick={() => navigate('mentor-feedback')}>
          View Mentor Feedback <Icon name="arrow-right" size={14} color="#fff" />
        </Button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCREEN 11: Mentor Feedback
// ═══════════════════════════════════════════════════════════
function Screen11_MentorFeedback({ navigate }) {
  const STEPS = ['Data Collection', 'Visual Inspection', 'Appraisal Report', 'Peer Review', 'Discussion'];
  const rubric = [
    { label: 'Property Research', score: 3, max: 5, note: 'Comparable search was limited to a narrow radius. Additional market data and a broader comp search would have strengthened your analysis.' },
    { label: 'Inspection Quality', score: 4, max: 5, note: 'Condition observations were well-documented and thorough. Minor detail missing on the garage and deferred maintenance items noted in listing photos.' },
    { label: 'Adjustments', score: 5, max: 5, note: 'Excellent work. Each adjustment was clearly supported with market evidence and paired sales analysis. Line-item justifications were specific and credible.' },
    { label: 'Reconciliation', score: 3, max: 5, note: 'Value conclusion was stated but not adequately supported. The narrative should explain why the sales comparison approach was weighted most heavily.' },
    { label: 'Report Completeness', score: 6, max: 5 },
  ];
  const total = rubric.reduce((s, r) => s + r.score, 0);
  const maxTotal = rubric.reduce((s, r) => s + r.max, 0);
  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }}>
      <PageHeader breadcrumb={['Module 2', 'Case 2', 'Feedback']} title="Mentor Feedback" />

      <div style={{ marginBottom: 20 }}>
        <StepTracker steps={STEPS} current={5} />
        <div style={{ fontSize: 13, color: C.text3, marginTop: 6 }}>Provided by: <strong>Sarah Chen, MAI</strong></div>
      </div>

      {/* Score Card */}
      <Card style={{ marginBottom: 16, background: C.charcoal, color: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Overall Score</div>
            <div style={{ fontFamily: "'Nunito', sans-serif", fontSize: 40, fontWeight: 800 }}>{total}<span style={{ fontSize: 20, opacity: 0.6 }}>/{maxTotal}</span></div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>Based on rubric criteria</div>
          </div>
          <Badge color="warning" dot={false}>Revision Recommended</Badge>
        </div>
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.12)' }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 6 }}>General Comments</div>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>
            Strong work on your adjustment methodology — your line-item adjustments were well-supported and justified. The main areas for improvement are in property research depth and the reconciliation narrative. Expand your discussion of why you weighted the sales comparison approach as you did.
          </p>
        </div>
      </Card>

      {/* Rubric Breakdown */}
      <CardSection title="Rubric Breakdown" style={{ marginBottom: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {rubric.map((r, i) => (
            <div key={i}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{r.label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: r.score >= 4 ? C.success : r.score === 3 ? C.warning : C.brand }}>{r.score}/{r.max}</span>
              </div>
              <div style={{ height: 8, background: '#f0f0f0', borderRadius: 9999, overflow: 'hidden', marginBottom: r.note ? 6 : 0 }}>
                <div style={{ width: `${Math.min((r.score / r.max) * 100, 100)}%`, height: '100%', background: r.score >= 4 ? C.success : r.score === 3 ? C.warning : C.brand, borderRadius: 9999, transition: 'width 600ms ease' }} />
              </div>
              {r.note && (
                <p style={{ fontSize: 12, color: C.text2, lineHeight: 1.55, paddingLeft: 2 }}>{r.note}</p>
              )}
            </div>
          ))}
        </div>
      </CardSection>

      {/* Revision Card */}
      <Card style={{ marginBottom: 24, border: `1.5px solid ${C.warning}44`, background: C.warningBg }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <Icon name="alert-circle" size={20} color={C.warning} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.charcoal, marginBottom: 4 }}>Revision Recommended</div>
            <p style={{ fontSize: 13, color: C.text2, lineHeight: 1.5 }}>Strengthen your reconciliation section and expand your market research. Focus on explaining your value conclusion more thoroughly.</p>
          </div>
        </div>
        <div style={{ marginTop: 14 }}>
          <Button variant="primary" size="sm" onClick={() => {}}>
            <Icon name="play" size={13} color="#fff" /> Start Revision
          </Button>
        </div>
      </Card>

      <div style={{ display: 'flex', gap: 12 }}>
        <Button variant="ghost" fullWidth onClick={() => navigate('home')}>
          <Icon name="layout-dashboard" size={14} color={C.charcoal} /> Back to Dashboard
        </Button>
        <Button variant="primary" fullWidth onClick={() => navigate('schedule-meeting')}>
          <Icon name="calendar" size={14} color="#fff" /> Schedule Mentor Meeting
        </Button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCREEN 12: Schedule Mentor Meeting
// ═══════════════════════════════════════════════════════════
function Screen12_ScheduleMeeting({ navigate, showToast }) {
  const [selectedDay, setSelectedDay] = useState(17);
  const [selectedTime, setSelectedTime] = useState(null);
  const times = ['9:00 AM ET', '9:30 AM ET', '11:00 AM ET', '2:00 PM ET', '3:30 PM ET'];
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
  const offset = 6; // November 2025 starts on Saturday (offset 6)
  return (
    <div style={{ maxWidth: 580, margin: '0 auto' }}>
      <PageHeader title="Schedule Mentor Meeting" subtitle="Book a 1-on-1 session with Sarah Chen, MAI" />

      {/* Calendar */}
      <Card style={{ marginBottom: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Icon name="chevron-left" size={18} color={C.text2} /></button>
          <span style={{ fontSize: 15, fontWeight: 700 }}>November 2025</span>
          <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Icon name="chevron-right" size={18} color={C.text2} /></button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, marginBottom: 8 }}>
          {daysOfWeek.map(d => <div key={d} style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: C.text3, padding: '4px 0' }}>{d}</div>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
          {Array.from({ length: offset }).map((_, i) => <div key={`e${i}`} />)}
          {days.map(d => {
            const isAvailable = [10, 17, 19, 24, 26].includes(d);
            const isSelected = d === selectedDay;
            const isPast = d < 10;
            return (
              <button key={d} onClick={() => isAvailable && setSelectedDay(d)} style={{
                padding: '8px 4px', borderRadius: 8, border: 'none', fontSize: 13,
                cursor: isAvailable ? 'pointer' : 'default',
                background: isSelected ? C.brand : isAvailable ? C.brandSubtle : 'transparent',
                color: isSelected ? '#fff' : isAvailable ? C.brand : isPast ? '#ccc' : C.charcoal,
                fontWeight: isSelected || isAvailable ? 600 : 400,
                transition: 'all 120ms',
              }}>{d}</button>
            );
          })}
        </div>
        <div style={{ marginTop: 12, display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><div style={{ width: 10, height: 10, borderRadius: '50%', background: C.brandSubtle, border: `1px solid ${C.brand}` }} /><span style={{ fontSize: 11, color: C.text3 }}>Available</span></div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}><div style={{ width: 10, height: 10, borderRadius: '50%', background: C.brand }} /><span style={{ fontSize: 11, color: C.text3 }}>Selected</span></div>
        </div>
      </Card>

      {/* Time Slots */}
      <Card style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Available Times on Nov {selectedDay}th</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {times.map(t => (
            <button key={t} onClick={() => setSelectedTime(t)} style={{
              padding: '11px 16px', borderRadius: 8, textAlign: 'left', cursor: 'pointer',
              border: `1.5px solid ${selectedTime === t ? C.brand : C.border}`,
              background: selectedTime === t ? C.brandSubtle : 'transparent',
              color: selectedTime === t ? C.brand : C.charcoal,
              fontSize: 14, fontWeight: selectedTime === t ? 600 : 400,
              fontFamily: 'inherit', transition: 'all 120ms',
            }}>{t}</button>
          ))}
        </div>
      </Card>

      <Button variant="primary" size="lg" fullWidth disabled={!selectedTime} onClick={() => { showToast(`Meeting booked: Nov ${selectedDay} at ${selectedTime}`); navigate('virtual-meeting'); }}>
        <Icon name="calendar-check" size={15} color="#fff" /> Book Meeting
      </Button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCREEN 13: Virtual Mentor Meeting
// ═══════════════════════════════════════════════════════════
function Screen13_VirtualMeeting({ navigate }) {
  const [muted, setMuted] = useState(false);
  const [videoOff, setVideoOff] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setElapsed(e => e + 1), 1000);
    return () => clearInterval(t);
  }, []);
  const fmt = s => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
  const participants = [
    { name: 'Sarah Chen', role: 'Mentor (MAI)', active: true },
    { name: 'Sarah H.', role: 'You', active: false },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#0d1117', borderRadius: 12, overflow: 'hidden', minHeight: 520 }}>
      {/* Header */}
      <div style={{ padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Mentor Meeting — Case 2 Review</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>with Sarah Chen, MAI</div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: 'rgba(26,158,92,0.2)', border: '1px solid rgba(26,158,92,0.4)', borderRadius: 20, padding: '4px 12px' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#1a9e5c', animation: 'pulse 1.5s infinite' }} />
            <span style={{ fontSize: 12, color: '#1a9e5c', fontWeight: 600 }}>Live · {fmt(elapsed)}</span>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr', padding: 16, gap: 12 }}>
        {/* Main video */}
        <div style={{ position: 'relative', background: '#1a1f2e', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 280 }}>
          <div style={{ textAlign: 'center' }}>
            <Avatar name="Sarah Chen" size={80} />
            <div style={{ color: '#fff', fontSize: 15, fontWeight: 600, marginTop: 12 }}>Sarah Chen, MAI</div>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Mentor</div>
          </div>
          <div style={{ position: 'absolute', top: 12, left: 12 }}>
            <div style={{ background: 'rgba(0,0,0,0.5)', borderRadius: 6, padding: '3px 10px', fontSize: 12, color: '#fff' }}>Sarah Chen</div>
          </div>
          {/* Self view */}
          <div style={{ position: 'absolute', bottom: 12, right: 12, width: 120, height: 90, background: videoOff ? '#222' : '#2a3047', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid rgba(255,255,255,0.15)' }}>
            {videoOff ? <Icon name="video-off" size={20} color="rgba(255,255,255,0.3)" /> : <Avatar name="Sarah H." size={36} />}
            <div style={{ position: 'absolute', bottom: 5, left: 7, fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>You</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div style={{ padding: '14px 20px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'center', gap: 12 }}>
        {[
          { icon: muted ? 'mic-off' : 'mic', label: muted ? 'Unmute' : 'Mute', onClick: () => setMuted(m => !m), active: muted },
          { icon: videoOff ? 'video-off' : 'video', label: videoOff ? 'Start Video' : 'Stop Video', onClick: () => setVideoOff(v => !v), active: videoOff },
          { icon: 'monitor', label: 'Share Screen', onClick: () => {}, active: false },
          { icon: 'message-circle', label: 'Chat', onClick: () => setChatOpen(c => !c), active: chatOpen },
        ].map((btn, i) => (
          <button key={i} onClick={btn.onClick} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
            background: btn.active ? 'rgba(214,4,54,0.3)' : 'rgba(255,255,255,0.08)',
            border: `1px solid ${btn.active ? 'rgba(214,4,54,0.5)' : 'rgba(255,255,255,0.12)'}`,
            borderRadius: 10, padding: '10px 20px', cursor: 'pointer', transition: 'all 150ms',
          }}>
            <Icon name={btn.icon} size={20} color={btn.active ? C.brand : '#fff'} />
            <span style={{ fontSize: 10, color: btn.active ? C.brand : 'rgba(255,255,255,0.6)' }}>{btn.label}</span>
          </button>
        ))}
        <button onClick={() => navigate('home')} style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5,
          background: C.brand, border: 'none', borderRadius: 10, padding: '10px 20px', cursor: 'pointer',
        }}>
          <Icon name="phone-off" size={20} color="#fff" />
          <span style={{ fontSize: 10, color: '#fff' }}>End</span>
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
// SCREEN 14: Field Visit Assignment
// ═══════════════════════════════════════════════════════════
function Screen14_FieldVisit({ navigate, showToast }) {
  const [checks, setChecks] = useState([false, false, false, false, false]);
  const items = [
    'Bring your trainee license and a valid government-issued ID',
    'Record the office hours and confirm they accept walk-in trainees',
    'Request access to at least 3 recent residential appraisals on file',
    'Complete the Field Visit Report form (attached below) during your visit',
    'Obtain the assessor\'s signature on the completion form',
  ];
  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }}>
      <PageHeader title="Out in the Field" subtitle="Due: December 2, 2025" />

      <Card style={{ marginBottom: 20, background: C.warningBg, border: `1px solid ${C.warning}33` }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
          <div style={{ width: 40, height: 40, borderRadius: 10, background: C.warningBg, border: `1px solid ${C.warning}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name="map-pin" size={20} color={C.warning} />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.charcoal, marginBottom: 3 }}>Visit Your Local Assessor's Office</div>
            <div style={{ fontSize: 13, color: C.text2 }}>This assignment requires an in-person visit to your county assessor's office to observe real appraisal records and workflow.</div>
          </div>
        </div>
      </Card>

      <CardSection title="Assignment Details" style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 14, color: C.text2, lineHeight: 1.65, marginBottom: 10 }}>
          Visit your local county assessor's office and request to review residential appraisal files. This experience provides direct exposure to how local jurisdictions value real property and supports your understanding of mass appraisal techniques as they compare to individual appraisal methods.
        </p>
        <p style={{ fontSize: 14, color: C.text2, lineHeight: 1.65 }}>
          You will complete the Field Visit Report documenting your observations, the types of properties reviewed, and a comparison of the assessor's methodology to what you practiced in Case 2. Your mentor will review this report and provide brief feedback.
        </p>
        <div style={{ marginTop: 14, display: 'flex', gap: 16 }}>
          {[
            { label: 'Estimated Time', value: '2–4 hours on-site' },
            { label: 'Deliverable', value: 'Field Visit Report (PDF)' },
          ].map((m, i) => (
            <div key={i} style={{ flex: 1, background: '#f9f9f9', borderRadius: 8, padding: '10px 14px' }}>
              <div style={{ fontSize: 11, color: C.text3, marginBottom: 2 }}>{m.label}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.charcoal }}>{m.value}</div>
            </div>
          ))}
        </div>
      </CardSection>

      <CardSection title="Preparation Checklist" style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {items.map((item, i) => (
            <CheckItem key={i} label={item} checked={checks[i]} onChange={v => { const n = [...checks]; n[i] = v; setChecks(n); }} />
          ))}
        </div>
      </CardSection>

      <Button variant="primary" size="lg" fullWidth onClick={() => showToast('Field Visit Report downloaded.')}>
        <Icon name="download" size={15} color="#fff" /> Download Field Report Template
      </Button>
    </div>
  );
}

// Export all screens
Object.assign(window, {
  Screen1_Dashboard,
  Screen2_CaseLaunch,
  Screen3_CaseIntro,
  Screen4_DataCollection,
  Screen5_VisualInspection,
  Screen6_AppraisalReport,
  Screen7_Submitted,
  Screen8_PeerReview,
  Screen9_DiscussionForum,
  Screen10_CaseComplete,
  Screen11_MentorFeedback,
  Screen12_ScheduleMeeting,
  Screen13_VirtualMeeting,
  Screen14_FieldVisit,
});
