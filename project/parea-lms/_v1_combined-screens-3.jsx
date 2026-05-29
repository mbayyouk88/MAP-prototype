// PAREA Combined — Screens 23-33 (Phase 5-8 + Cert)

const { useState: useS3, useEffect: useE3 } = React;

// Adjustment grid math (ties out)
const ADJ = {
  C1: { sale: 478000, time: 4500, location: 0, gla: 1740, beds: 0, baths: 0, garage: 0, basement: -3000, age: -1500, condition: 0 },
  C2: { sale: 495000, time: 5000, location: 0, gla: -1860, beds: 0, baths: -2500, garage: 0, basement: -2000, age: -1500, condition: 0 },
  C3: { sale: 466000, time: 14000, location: 0, gla: 2790, beds: 0, baths: 0, garage: 0, basement: 0, age: 1500, condition: 0 },
};

// ═══ SCREEN 23: Adjustment Grid ══════════════════════════════
function S23_AdjGrid({ navigate }) {
  const ids = ['C1', 'C2', 'C3'];
  const lines = [
    { key: 'time', label: 'Time / Market Cond.', sub: '+0.4%/mo · matched-pair' },
    { key: 'location', label: 'Location' },
    { key: 'gla', label: 'GLA', sub: '$30/sf' },
    { key: 'beds', label: 'Bedrooms' },
    { key: 'baths', label: 'Baths', sub: '$2,500/half' },
    { key: 'garage', label: 'Garage' },
    { key: 'basement', label: 'Basement Finish', sub: '$15/sf' },
    { key: 'age', label: 'Age / Condition' },
    { key: 'condition', label: 'Condition rating' },
  ];
  const [grid, setGrid] = useS3(() => JSON.parse(JSON.stringify(ADJ)));
  const [editingCell, setEditingCell] = useS3(null);

  const totalsFor = (id) => {
    const a = grid[id];
    const adj = lines.reduce((s, l) => s + (Number(a[l.key]) || 0), 0);
    const gross = lines.reduce((s, l) => s + Math.abs(Number(a[l.key]) || 0), 0);
    return { adj, gross, indicated: a.sale + adj };
  };
  const allIndicated = ids.map(id => totalsFor(id).indicated);
  const minI = Math.min(...allIndicated);
  const maxI = Math.max(...allIndicated);
  const range = maxI - minI;
  const spreadPct = ((range / minI) * 100).toFixed(1);

  const updateCell = (id, key, raw) => {
    const num = parseInt(String(raw).replace(/[^\-0-9]/g, ''), 10);
    setGrid(g => ({ ...g, [id]: { ...g[id], [key]: Number.isFinite(num) ? num : 0 } }));
  };

  return (
    <div>
      <PageHeader breadcrumb={['Phase 5', 'Section XV.A']} title="Adjustment grid"
        subtitle="Click any adjustment to edit. Net, indicated value, gross %, and the indicated range live-recalculate. AI checks each adjustment is supported."/>

      <Card padding={0} style={{ overflow: 'hidden' }}>
        <div style={{ padding: '12px 18px', background: '#fafbfc', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 700, flex: 1, color: '#292929' }}>Sales Comparison Approach · Section XV.A</div>
          <span style={{ fontSize: 10, fontWeight: 800, color: '#1a9e5c', background: '#edfbf4', padding: '3px 8px', borderRadius: 4, letterSpacing: '.08em', textTransform: 'uppercase' }}>Live USPAP Scan</span>
        </div>
        <div style={{ overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11.5, fontFamily: "'JetBrains Mono', monospace" }}>
            <thead>
              <tr style={{ background: '#fafafa' }}>
                <th style={th()}>Item</th>
                <th style={th(true, '#fff0f3', '#d60436')}>Subject<br/><span style={{ fontWeight: 500, color: '#666' }}>4218 Ridgewood</span></th>
                {ids.map(id => {
                  const c = COMPS.find(x => x.id === id);
                  return (
                    <th key={id} style={th(true)}>{id}<br/><span style={{ fontWeight: 500, color: '#666' }}>{c.address.split(' ').slice(0, 2).join(' ')}</span></th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={td(true)}>Sale price</td>
                <td style={td(false, '#fff0f3')}>—</td>
                {ids.map(id => {
                  const c = COMPS.find(x => x.id === id);
                  return <td key={id} style={td(false, '#fff', '#0a6ed1', 700)}>${c.sale.toLocaleString()}</td>;
                })}
              </tr>
              <tr>
                <td style={td(true)}>$/sf</td>
                <td style={td(false, '#fff0f3')}>—</td>
                {ids.map(id => {
                  const c = COMPS.find(x => x.id === id);
                  return <td key={id} style={td()}>${(c.sale / c.gla).toFixed(0)}</td>;
                })}
              </tr>
              <tr style={{ background: '#fafafa' }}>
                <td style={td(true)}>GLA · Bed/Bath</td>
                <td style={td(false, '#fff0f3')}>{SUBJECT.gla}sf · 4/2.5</td>
                {ids.map(id => {
                  const c = COMPS.find(x => x.id === id);
                  return <td key={id} style={td()}>{c.gla}sf · {c.beds}/{c.baths}</td>;
                })}
              </tr>

              {lines.map((line) => (
                <tr key={line.key}>
                  <td style={td(true)}>
                    {line.label}
                    {line.sub && <div style={{ fontSize: 9.5, color: '#888', fontWeight: 400, marginTop: 1 }}>{line.sub}</div>}
                  </td>
                  <td style={td(false, '#fff0f3')}>—</td>
                  {ids.map(id => {
                    const v = grid[id][line.key];
                    const isEditing = editingCell === `${id}-${line.key}`;
                    const display = v === 0 ? '0' : (v > 0 ? '+' : '−') + '$' + Math.abs(v).toLocaleString();
                    const cellColor = v > 0 ? '#1a9e5c' : v < 0 ? '#d60436' : '#666';
                    const cellBg = v > 0 ? '#edfbf4' : v < 0 ? '#fff0f3' : '#fff';
                    return (
                      <td key={id} style={{
                        ...td(false, cellBg, cellColor, v ? 700 : 500),
                        padding: 0, position: 'relative',
                      }}>
                        {isEditing ? (
                          <input
                            autoFocus
                            type="text"
                            defaultValue={v}
                            onBlur={(e) => { updateCell(id, line.key, e.target.value); setEditingCell(null); }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') { updateCell(id, line.key, e.target.value); setEditingCell(null); }
                              if (e.key === 'Escape') setEditingCell(null);
                            }}
                            style={{
                              width: '100%', padding: '8px 12px', textAlign: 'right',
                              border: '2px solid #d60436', background: '#fff',
                              fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5, fontWeight: 700,
                              color: '#292929', outline: 'none',
                            }}
                          />
                        ) : (
                          <button
                            onClick={() => setEditingCell(`${id}-${line.key}`)}
                            title="Click to edit"
                            style={{
                              width: '100%', padding: '8px 12px', textAlign: 'right',
                              border: 'none', background: 'transparent', cursor: 'pointer',
                              fontFamily: "'JetBrains Mono', monospace", fontSize: 11.5,
                              color: cellColor, fontWeight: v ? 700 : 500,
                            }}
                          >{display}</button>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}

              <tr style={{ background: '#fafbfc', borderTop: '2px solid #e8e8e8' }}>
                <td style={{ ...td(true), borderTop: '2px solid #e8e8e8' }}>Net adjustment</td>
                <td style={{ ...td(false, '#fff0f3'), borderTop: '2px solid #e8e8e8' }}>—</td>
                {ids.map(id => {
                  const t = totalsFor(id);
                  return <td key={id} style={{
                    ...td(false, 'transparent', t.adj >= 0 ? '#1a9e5c' : '#d60436', 800, 12.5),
                    borderTop: '2px solid #e8e8e8',
                  }}>
                    {t.adj === 0 ? '$0' : (t.adj >= 0 ? '+' : '−') + '$' + Math.abs(t.adj).toLocaleString()}
                  </td>;
                })}
              </tr>
              <tr style={{ background: '#fff0f3' }}>
                <td style={td(true, '#fff0f3', '#d60436')}>Indicated value</td>
                <td style={td(false, '#fff0f3')}>—</td>
                {ids.map(id => {
                  const t = totalsFor(id);
                  return <td key={id} style={td(false, '#fff0f3', '#d60436', 800, 14)}>
                    ${t.indicated.toLocaleString()}
                  </td>;
                })}
              </tr>
              <tr>
                <td style={td(true)}>Gross adjustment</td>
                <td style={td(false, '#fff0f3')}>—</td>
                {ids.map(id => {
                  const t = totalsFor(id);
                  const pct = (t.gross / COMPS.find(x => x.id === id).sale) * 100;
                  return <td key={id} style={td(false, pct > 25 ? '#fff8ec' : '#edfbf4', pct > 25 ? '#e8860a' : '#1a9e5c', 700)}>
                    {pct.toFixed(1)}%
                  </td>;
                })}
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 14 }}>
        <Card padding="14px 18px">
          <div style={{ fontSize: 12, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 8 }}>AI adjustment review</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <Row dot="#1a9e5c" label="Time adjustment supported by 0.4%/mo trend (12mo data)"/>
            <Row dot="#1a9e5c" label="GLA at $30/sf — within market range ($28–$34)"/>
            <Row dot="#1a9e5c" label="Bath adjustment matched-pair derived ($2,500/half)"/>
            <Row dot="#e8860a" label="Basement finish — paired-sales support is thin (n=2)" pulse/>
            <Row dot="#888" label="Age/Condition · accepted lump-sum" muted/>
          </div>
        </Card>
        <Card padding="14px 18px">
          <div style={{ fontSize: 12, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 8 }}>Indicated range</div>
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end', height: 80, padding: '8px 0' }}>
            {ids.map(id => {
              const t = totalsFor(id);
              return (
                <div key={id} style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 13, fontWeight: 800, color: '#0a6ed1', fontFamily: "'Nunito', sans-serif" }}>${(t.indicated/1000).toFixed(0)}K</div>
                  <div style={{ fontSize: 10, color: '#888', marginTop: 2 }}>{id}</div>
                </div>
              );
            })}
          </div>
          <div style={{ background: '#fafafa', padding: 10, borderRadius: 6, fontSize: 12, color: '#444', marginTop: 8 }}>
            <strong>Range:</strong> ${minI.toLocaleString()} – ${maxI.toLocaleString()} · <strong>spread:</strong> ${range.toLocaleString()} ({spreadPct}%) — {Number(spreadPct) < 4 ? 'tight, well-defined' : Number(spreadPct) < 8 ? 'acceptable spread' : 'wide — revisit adjustments'}.
          </div>
        </Card>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}>
        <Button variant="primary" onClick={() => navigate('cost-approach')}>Continue · Cost approach <Icon name="arrow-right" size={14} color="#fff"/></Button>
      </div>
    </div>
  );
}

const td = (label, bg = '#fff', color = '#292929', weight = 500, fs = 11.5) => ({
  padding: '8px 12px', borderBottom: '1px solid #f0f0f0', borderRight: '1px solid #f0f0f0',
  background: bg, color, fontWeight: label ? 600 : weight, fontSize: fs, textAlign: label ? 'left' : 'right',
  fontFamily: "'JetBrains Mono', monospace",
});
const th = (numeric, bg = '#fafafa', color = '#444') => ({
  padding: '10px 12px', borderBottom: '2px solid #e8e8e8', borderRight: '1px solid #f0f0f0',
  background: bg, color, fontSize: 11.5, fontWeight: 700, textAlign: numeric ? 'right' : 'left',
});

// ═══ SCREEN 24: Cost Approach ════════════════════════════════
function S24_Cost({ navigate }) {
  return (
    <div>
      <PageHeader breadcrumb={['Phase 5', 'Section XV.B']} title="Cost approach"
        subtitle="Marshall &amp; Swift via True Footage. Replacement cost new less depreciation, plus site value."/>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>
        <MockToolFrame tool="True Footage" tab="cost approach" height={460}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, fontFamily: "'JetBrains Mono', monospace" }}>
            <tbody>
              {[
                ['Reproduction cost new (M&S Class 4, Avg Std)', '2,148 sf × $172/sf', '$369,456'],
                ['Garage replacement', '480 sf × $42/sf', '$20,160'],
                ['Basement finish', '868 sf × $48/sf', '$41,664'],
                ['Subtotal · Improvements', '', '$431,280'],
                [' ', ' ', ' '],
                ['Less depreciation:', '', ''],
                ['  Physical (effective age 14yr ÷ 65yr life × .85)', '', '−$78,800'],
                ['  Functional', 'none observed', '−$0'],
                ['  External', 'none observed', '−$0'],
                ['Depreciated cost · Improvements', '', '$352,480'],
                [' ', ' ', ' '],
                ['Site value (vacant lot abstraction)', '0.31 ac', '$140,000'],
                [' ', ' ', ' '],
              ].map((r, i) => (
                <tr key={i} style={{ background: r[0].startsWith('Depreciated') || r[0].startsWith('Subtotal') ? '#fafafa' : 'transparent' }}>
                  <td style={{ padding: '6px 8px', color: '#444', fontSize: 11.5 }}>{r[0]}</td>
                  <td style={{ padding: '6px 8px', color: '#888', fontSize: 11 }}>{r[1]}</td>
                  <td style={{ padding: '6px 8px', textAlign: 'right', fontWeight: r[2].startsWith('$') && !r[2].startsWith('$0') ? 700 : 400, color: r[2].startsWith('−') ? '#d60436' : '#292929' }}>{r[2]}</td>
                </tr>
              ))}
              <tr style={{ background: '#1a1d2b', color: '#fff' }}>
                <td style={{ padding: '10px 8px', fontWeight: 700 }}>Cost approach indicated value</td>
                <td/>
                <td style={{ padding: '10px 8px', textAlign: 'right', fontWeight: 800, fontSize: 14, color: '#7ce0a4' }}>$492,480</td>
              </tr>
            </tbody>
          </table>
        </MockToolFrame>

        <Card padding={20}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Triangulation check</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[['Sales Comparison', '$487,500', '#0a6ed1', 'primary'],
              ['Cost', '$492,480', '#1f6f5b', 'support'],
              ['AVM consensus', '$478,700', '#888', 'reference']].map(([k,v,c,t], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: 10, background: '#fafafa', borderRadius: 6 }}>
                <div style={{ width: 4, height: 30, borderRadius: 2, background: c }}/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700 }}>{k}</div>
                  <div style={{ fontSize: 10.5, color: '#888' }}>{t}</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 800, color: c, fontFamily: "'Nunito', sans-serif" }}>{v}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: 10, background: '#edfbf4', border: '1px solid #1a9e5c33', borderRadius: 6, fontSize: 12, color: '#444' }}>
            <strong style={{ color: '#1a9e5c' }}>Tight cluster.</strong> Cost approach within 1.0% of Sales Comparison — supports your range.
          </div>
          <Button variant="primary" fullWidth onClick={() => navigate('income-approach')} style={{ marginTop: 14 }}>
            Continue · Income approach <Icon name="arrow-right" size={13} color="#fff"/>
          </Button>
        </Card>
      </div>
    </div>
  );
}

// ═══ SCREEN 25: Income Approach (skip-defended) ══════════════
function S25_Income({ navigate }) {
  return (
    <div style={{ maxWidth: 880, margin: '0 auto' }}>
      <PageHeader breadcrumb={['Phase 5', 'Section XV.C']} title="Income approach — defend the skip"
        subtitle="Most residential sales don't require Income. But you must defend why it's not applicable here."/>

      <Card padding={24}>
        <div style={{ background: '#fff8ec', border: '1px solid #e8860a33', borderRadius: 10, padding: 16, display: 'flex', gap: 14, marginBottom: 18 }}>
          <Icon name="info" size={20} color="#e8860a"/>
          <div>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: '#e8860a' }}>USPAP says: developed only when applicable</div>
            <div style={{ fontSize: 12.5, color: '#666', marginTop: 4, lineHeight: 1.5 }}>
              For owner-occupied SFR purchases, the Income approach typically isn't relevant. <em>But you can't just skip it</em> — your scope of work and report must explain the rationale.
            </div>
          </div>
        </div>

        <div style={{ fontSize: 12, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 8 }}>Your defense</div>
        <textarea defaultValue="The Income approach is not developed in this assignment. The intended use is mortgage origination for an owner-occupied purchase; the property is being acquired for personal residence, not investment. The local market for single-family detached homes in Glenmoor Estates is dominated by owner-occupants, and rental sales in this segment are sparse and not directly comparable. The Sales Comparison Approach is supported by abundant arms-length transactions and is the most relevant indicator of value. Cost approach is included as a check. Per USPAP SR1-4(c), excluding the Income Approach is justified given the lack of relevance to the intended use and intended user."
          rows={9} style={{
          width: '100%', padding: 12, fontSize: 12.5, fontFamily: 'inherit', lineHeight: 1.6,
          border: '1px solid #e8e8e8', borderRadius: 8, color: '#292929',
        }}/>
        <div style={{ marginTop: 14, padding: 12, background: '#1a1d2b', color: '#fff', borderRadius: 8 }}>
          <AIChip label="Socratic" tone="brand" size="sm"/>
          <div style={{ fontSize: 12.5, marginTop: 8, color: '#e8eaf0', lineHeight: 1.55 }}>
            Strong defense. You hit intended use, market segment, USPAP citation. <strong style={{ color: '#7ce0a4' }}>Accepted.</strong>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
          <Button variant="primary" onClick={() => navigate('mentor-review-5')}>Continue · MR 5 <Icon name="arrow-right" size={14} color="#fff"/></Button>
        </div>
      </Card>
    </div>
  );
}

// ═══ SCREEN 26: MR 5 ═════════════════════════════════════════
function S26_MR5({ navigate }) {
  return (
    <div>
      <PageHeader breadcrumb={['Phase 5', 'Mentor Review 5']} title="Mentor Review 5 — Pre-screen"/>
      <Card padding={0}>
        <div style={{ padding: '14px 18px', background: '#fafbfc', borderBottom: '1px solid #eee' }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: '#1a9e5c', background: '#edfbf4', padding: '3px 8px', borderRadius: 4, letterSpacing: '.08em', textTransform: 'uppercase', marginRight: 8 }}>Pre-screen</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#292929' }}>Phase 5 · Valuation Approaches</span>
        </div>
        <div style={{ padding: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            ['Sales Comparison · adjustment grid', 'Tight range $479K–$494K · gross adj &lt; 25%', 'ok'],
            ['Cost approach', 'Indicated $492,480 · within 1% of SC', 'ok'],
            ['Income approach skip', 'USPAP SR1-4(c) cited · accepted', 'ok'],
            ['Basement adjustment support', 'Paired-sales n=2 · mentor will probe', 'warn'],
          ].map(([l, d, s], i) => (
            <div key={i} style={{ padding: 12, background: s==='ok' ? '#edfbf4' : '#fff8ec', border: `1px solid ${s==='ok' ? '#1a9e5c33' : '#e8860a33'}`, borderRadius: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon name={s==='ok' ? 'check-circle' : 'alert-triangle'} size={14} color={s==='ok' ? '#1a9e5c' : '#e8860a'}/>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: s==='ok' ? '#1a9e5c' : '#e8860a' }}>{l}</div>
              </div>
              <div style={{ fontSize: 11.5, color: '#444', marginTop: 4, paddingLeft: 22 }} dangerouslySetInnerHTML={{ __html: d }}/>
            </div>
          ))}
        </div>
        <div style={{ padding: '0 18px 18px' }}>
          <Button variant="primary" fullWidth onClick={() => navigate('reconciliation')}>Continue to Phase 6 · Reconciliation →</Button>
        </div>
      </Card>
    </div>
  );
}

// ═══ SCREEN 27: Reconciliation ═══════════════════════════════
function S27_Reconciliation({ navigate }) {
  return (
    <div>
      <PageHeader breadcrumb={['Phase 6', 'Section XVI']} title="Reconciliation"
        subtitle="Three indicators · one final value. Weighting must be quantitative reasoning, not 'I averaged them'."/>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>
        <Card padding={20}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 12 }}>Indicators &amp; weighting</div>
          {[
            { name: 'Sales Comparison', val: 487500, weight: 80, color: '#0a6ed1', note: 'Primary · best market data · 3 closely-supported comps' },
            { name: 'Cost approach', val: 492480, weight: 15, color: '#1f6f5b', note: 'Supports SC · M&S data 2024 ed' },
            { name: 'Income approach', val: null, weight: 0, color: '#888', note: 'N/A · owner-occupied purchase' },
          ].map((i, idx) => (
            <div key={idx} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <div style={{ width: 4, height: 26, borderRadius: 2, background: i.color }}/>
                <div style={{ flex: 1, fontSize: 13, fontWeight: 700 }}>{i.name}</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: i.val ? i.color : '#888', fontFamily: "'Nunito', sans-serif" }}>{i.val ? '$'+(i.val/1000).toFixed(0)+'K' : 'N/A'}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#444', minWidth: 40, textAlign: 'right' }}>{i.weight}%</div>
              </div>
              <div style={{ background: '#f4f5f7', height: 6, borderRadius: 3, overflow: 'hidden', marginLeft: 14 }}>
                <div style={{ background: i.color, height: '100%', width: `${i.weight}%`, transition: 'width 400ms' }}/>
              </div>
              <div style={{ fontSize: 11, color: '#888', marginTop: 4, marginLeft: 14 }}>{i.note}</div>
            </div>
          ))}
          <div style={{ background: '#1a1d2b', color: '#fff', borderRadius: 10, padding: 18, marginTop: 18, textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: '#cbd0e0', textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 700 }}>Final reconciled value</div>
            <div style={{ fontSize: 36, fontWeight: 800, color: '#fff', fontFamily: "'Nunito', sans-serif", marginTop: 4 }}>$488,000</div>
            <div style={{ fontSize: 11, color: '#cbd0e0', marginTop: 4 }}>rounded · effective Mar 14, 2026 · contract price $492,000</div>
          </div>
        </Card>

        <Card padding={20}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Reconciliation narrative</div>
          <textarea defaultValue="Greatest weight is given to the Sales Comparison Approach (80%). Three closely-supported comparable sales within 0.7 mi produced a tight indicated range of $478,800–$493,790 with gross adjustments under 25%. The Cost Approach ($492,480) provides supporting evidence and is within 1.0% of the Sales Comparison indicated value, suggesting no significant external obsolescence. The Income Approach is not applicable for this owner-occupied purchase. Final reconciled value: $488,000."
            rows={9} style={{
            width: '100%', padding: 10, fontSize: 11.5, fontFamily: 'inherit', lineHeight: 1.55,
            border: '1px solid #e8e8e8', borderRadius: 6, color: '#292929',
          }}/>
          <div style={{ marginTop: 12, padding: 10, background: '#edfbf4', border: '1px solid #1a9e5c33', borderRadius: 6, fontSize: 11.5, color: '#1a9e5c', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
            <Icon name="check-circle" size={14} color="#1a9e5c"/>
            <div><strong>SR1-5 satisfied.</strong> Quantitative reasoning &gt; conclusory statement.</div>
          </div>
          <Button variant="primary" fullWidth onClick={() => navigate('mentor-review-6')} style={{ marginTop: 14 }}>
            Submit Phase 6 · MR 6 <Icon name="arrow-right" size={13} color="#fff"/>
          </Button>
        </Card>
      </div>
    </div>
  );
}

// ═══ SCREEN 28: MR 6 ═════════════════════════════════════════
function S28_MR6({ navigate }) {
  return (
    <div>
      <PageHeader breadcrumb={['Phase 6', 'Mentor Review 6']} title="Mentor Review 6 — Pre-screen"/>
      <Card padding={0}>
        <div style={{ padding: '14px 18px', background: '#fafbfc', borderBottom: '1px solid #eee' }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: '#1a9e5c', background: '#edfbf4', padding: '3px 8px', borderRadius: 4, letterSpacing: '.08em', textTransform: 'uppercase', marginRight: 8 }}>Pre-screen</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#292929' }}>Phase 6 · Reconciliation</span>
        </div>
        <div style={{ padding: 18 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            {[
              ['Final value $488,000', 'Within indicator range', 'ok'],
              ['Weighting reasoning', 'Quantitative · SR1-5 satisfied', 'ok'],
              ['Rounding', '$488K from $487,500 · accepted', 'ok'],
              ['Effective date', 'Mar 14, 2026 · matches inspection', 'ok'],
            ].map(([l, d, s], i) => (
              <div key={i} style={{ padding: 12, background: '#edfbf4', borderRadius: 8, border: '1px solid #1a9e5c33' }}>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <Icon name="check-circle" size={14} color="#1a9e5c"/>
                  <div style={{ fontSize: 12.5, fontWeight: 700, color: '#1a9e5c' }}>{l}</div>
                </div>
                <div style={{ fontSize: 11.5, color: '#444', marginTop: 4, paddingLeft: 22 }}>{d}</div>
              </div>
            ))}
          </div>
          <Button variant="primary" fullWidth onClick={() => navigate('report-writing')}>Continue to Phase 7 · Report Writing →</Button>
        </div>
      </Card>
    </div>
  );
}

// ═══ SCREEN 29: Report Writing (URAR draft) ══════════════════
function S29_ReportWriting({ navigate }) {
  return (
    <div>
      <PageHeader breadcrumb={['Phase 7', 'Section XIX']} title="URAR report drafting"
        subtitle="True Footage URAR form · auto-populated from your work · narrative sections you write · live USPAP scan."/>

      <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 14 }}>
        <MockToolFrame tool="True Footage" tab="URAR Form 1004" height={520}>
          <div style={{ background: '#fff', border: '1px solid #ccc', borderRadius: 4, padding: 14, fontFamily: "'JetBrains Mono', monospace", fontSize: 10.5, color: '#222' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #222', paddingBottom: 6, marginBottom: 10 }}>
              <span style={{ fontWeight: 800 }}>UNIFORM RESIDENTIAL APPRAISAL REPORT · Form 1004 · 03/2005</span>
              <span style={{ color: '#888' }}>File #: 2026-0314-RC1</span>
            </div>
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: '#666', textTransform: 'uppercase', marginBottom: 3 }}>SUBJECT</div>
              <div>Property Address: <strong>4218 Ridgewood Lane</strong> · City: <strong>Glenmoor</strong> · State: <strong>OH</strong> · Zip: <strong>44023</strong></div>
              <div>Borrower: David J. Osei · Owner of Public Record: same · County: Geauga</div>
              <div>Legal Description: Lot 14, Block 22, Glenmoor Estates Sub. Ph. III</div>
              <div>Assessor's Parcel #: 14-022-37-104 · Tax Year: 2025 · R.E. Taxes: $5,840</div>
            </div>
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: '#666', textTransform: 'uppercase', marginBottom: 3 }}>ASSIGNMENT</div>
              <div>Lender/Client: First Summit Bank · Address: 100 Main St, Cleveland OH 44114</div>
              <div>Appraiser: Sarah H. (PAREA Practicum) · Effective Date: 03/14/2026</div>
            </div>
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: '#666', textTransform: 'uppercase', marginBottom: 3 }}>CONTRACT</div>
              <div>Contract Price: $492,000 · Date: 02/28/2026 · Is this a sale of an REO/short sale: <strong>No</strong></div>
            </div>
            <div style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 9.5, fontWeight: 700, color: '#666', textTransform: 'uppercase', marginBottom: 3 }}>NEIGHBORHOOD</div>
              <div>Location: Suburban · Built-Up: Over 75% · Growth: Stable · Trend: <strong>Increasing</strong> · Demand/Supply: <strong>Shortage</strong></div>
              <div>Marketing Time: <strong>Under 3 months</strong> · Price Range: $410K–$540K · Predominant: $478K · Age: 8–22yr</div>
            </div>
            <div style={{ background: '#fff8ec', borderLeft: '3px solid #e8860a', paddingLeft: 8, padding: 6, marginTop: 8 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: '#e8860a' }}>NEIGHBORHOOD COMMENTS · narrative · 200-400 words</div>
              <div style={{ fontSize: 10, color: '#666', marginTop: 2 }}>Glenmoor Estates is a stable, owner-occupied subdivision developed primarily 2002–2010… <em style={{ color: '#aaa' }}>[continue typing — 187/300 words]</em></div>
            </div>
            <div style={{ marginTop: 10, padding: '6px 8px', background: '#0a6ed1', color: '#fff', borderRadius: 3, fontSize: 9 }}>
              … grid, comments, certification, and signature pages auto-populated from your work
            </div>
          </div>
        </MockToolFrame>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Card padding="14px 16px">
            <USPAPScanner items={[
              { code: 'SR2-1', label: 'Form completion · 92%', status: 'warn' },
              { code: 'SR2-2', label: 'Reporting standard · URAR', status: 'ok' },
              { code: 'SR2-3', label: 'Certification · pending', status: 'pending' },
              { code: 'SR2-3a', label: 'Signature attribution · pending', status: 'pending' },
              { code: 'SR1-6', label: 'Reconciliation reporting', status: 'ok' },
            ]}/>
          </Card>
          <Card padding="12px 16px">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <div style={{ fontSize: 12, fontWeight: 700 }}>Sections to write</div>
              <Badge color="warning">3 left</Badge>
            </div>
            <div style={{ fontSize: 11.5, color: '#444', display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Neighborhood narrative</span><span style={{ color: '#e8860a' }}>187/300</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Site comments</span><span style={{ color: '#1a9e5c' }}>✓</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Improvements narrative</span><span style={{ color: '#888' }}>—</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Reconciliation comments</span><span style={{ color: '#1a9e5c' }}>✓</span></div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Certification &amp; signatures</span><span style={{ color: '#888' }}>—</span></div>
            </div>
          </Card>
          <Button variant="primary" onClick={() => navigate('workfile')}>
            Continue · Workfile assembly <Icon name="arrow-right" size={14} color="#fff"/>
          </Button>
        </div>
      </div>
    </div>
  );
}

// ═══ SCREEN 30: Workfile Assembly ════════════════════════════
function S30_Workfile({ navigate }) {
  return (
    <div>
      <PageHeader breadcrumb={['Phase 7', 'Section XX']} title="Workfile assembly"
        subtitle="USPAP requires a workfile separate from the report. Every artifact, every research source, retained 5 years."/>

      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 14 }}>
        <Card padding={0}>
          <div style={{ padding: '14px 18px', borderBottom: '1px solid #f0f0f0', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Icon name="folder" size={16} color="#d60436"/>
            <div style={{ fontSize: 13, fontWeight: 700, flex: 1 }}>Workfile · 4218-Ridgewood-2026-0314</div>
            <Badge color="success">USPAP-compliant</Badge>
          </div>
          <div style={{ padding: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              ['Engagement letter', 'PDF · 2pg', 'check'],
              ['Scope of work', 'PDF · 1pg', 'check'],
              ['Subject property card (PropMix)', 'PDF · 8pg', 'check'],
              ['Site sketch (Apex)', 'apx + PDF', 'check'],
              ['Photos · 47 captioned', 'JPG set', 'check'],
              ['MLS data · 47 candidates', 'CSV · raw', 'check'],
              ['MLS data · 3 selected comps', 'PDF · 12pg', 'check'],
              ['Adjustment derivation worksheets', 'XLSX · 4 tabs', 'check'],
              ['Cost approach (M&S)', 'PDF · 3pg', 'check'],
              ['HBU 4-test analysis', 'PDF · 2pg', 'check'],
              ['Reconciliation worksheet', 'PDF · 1pg', 'check'],
              ['Final report', 'URAR · 32pg', 'check'],
              ['Certification', 'PDF · signed', 'check'],
              ['xAPI session log', 'JSON · 142 events', 'check'],
            ].map(([n, m, s], i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 8px', background: '#fafafa', borderRadius: 5 }}>
                <Icon name="file" size={13} color="#888"/>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11.5, fontWeight: 600, color: '#292929' }}>{n}</div>
                  <div style={{ fontSize: 10, color: '#888', fontFamily: "'JetBrains Mono', monospace" }}>{m}</div>
                </div>
                <Icon name="check-circle" size={12} color="#1a9e5c"/>
              </div>
            ))}
          </div>
        </Card>

        <Card padding={20}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Retention</div>
          <div style={{ background: '#1a1d2b', color: '#fff', borderRadius: 8, padding: 14 }}>
            <div style={{ fontSize: 10.5, color: '#cbd0e0', textTransform: 'uppercase', letterSpacing: '.05em' }}>USPAP Record Keeping Rule</div>
            <div style={{ fontSize: 14, fontWeight: 700, marginTop: 4 }}>5 years from report date<br/><span style={{ fontSize: 11, color: '#cbd0e0' }}>or 2 yrs after litigation — whichever is longer</span></div>
          </div>
          <div style={{ marginTop: 14, fontSize: 13, fontWeight: 700, marginBottom: 8 }}>Disclosures</div>
          {[
            ['Significant assistance', 'None'],
            ['Prior services in past 3yr', 'None'],
            ['Hypothetical conditions', 'None'],
            ['Extraordinary assumptions', 'None'],
          ].map(([k, v], i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '6px 0', borderBottom: '1px solid #f4f4f4' }}>
              <span style={{ color: '#666' }}>{k}</span><strong>{v}</strong>
            </div>
          ))}
          <Button variant="primary" fullWidth onClick={() => navigate('mentor-review-7')} style={{ marginTop: 14 }}>
            Submit Phase 7 · MR 7 <Icon name="arrow-right" size={13} color="#fff"/>
          </Button>
        </Card>
      </div>
    </div>
  );
}

// ═══ SCREEN 31: MR 7 ═════════════════════════════════════════
function S31_MR7({ navigate }) {
  return (
    <div>
      <PageHeader breadcrumb={['Phase 7', 'Mentor Review 7']} title="Mentor Review 7 — Pre-screen"/>
      <Card padding={0}>
        <div style={{ padding: '14px 18px', background: '#fafbfc', borderBottom: '1px solid #eee' }}>
          <span style={{ fontSize: 10, fontWeight: 800, color: '#1a9e5c', background: '#edfbf4', padding: '3px 8px', borderRadius: 4, letterSpacing: '.08em', textTransform: 'uppercase', marginRight: 8 }}>Pre-screen</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#292929' }}>Phase 7 · Report &amp; Workfile</span>
        </div>
        <div style={{ padding: 18, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            ['URAR Form 1004 · 100% complete', 'All sections · all narratives ≥ word floor', 'ok'],
            ['Workfile · 14 artifacts archived', 'USPAP-compliant retention metadata', 'ok'],
            ['Certification signed', 'SR2-3 · electronic signature affixed', 'ok'],
            ['xAPI session log archived', '142 events · full chain of custody', 'ok'],
          ].map(([l, d, s], i) => (
            <div key={i} style={{ padding: 12, background: '#edfbf4', borderRadius: 8, border: '1px solid #1a9e5c33' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Icon name="check-circle" size={14} color="#1a9e5c"/>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: '#1a9e5c' }}>{l}</div>
              </div>
              <div style={{ fontSize: 11.5, color: '#444', marginTop: 4, paddingLeft: 22 }}>{d}</div>
            </div>
          ))}
        </div>
        <div style={{ padding: '0 18px 18px' }}>
          <Button variant="primary" fullWidth onClick={() => navigate('client-sim')}>Continue to Phase 8 · Client Communication →</Button>
        </div>
      </Card>
    </div>
  );
}

// ═══ SCREEN 32: Client Communication Sim ═════════════════════
function S32_ClientSim({ navigate }) {
  return (
    <div>
      <PageHeader breadcrumb={['Phase 8', 'Section XXI']} title="Client communication sim — Maya is on the phone"
        subtitle="Your value came in $4K below contract. Maya is asking questions. Defend without violating SR2 or appraiser independence."/>

      <Card padding={0}>
        <div style={{ padding: '14px 18px', borderBottom: '1px solid #f0f0f0', background: '#fff0f3', display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={PERSONAS.maya.avatar} style={{ width: 38, height: 38, borderRadius: '50%', objectFit: 'cover' }}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700 }}>{PERSONAS.maya.name}</div>
            <div style={{ fontSize: 11, color: '#888' }}>Calling about your appraisal · 2:14 PM</div>
          </div>
          <Badge color="brand">High-pressure scenario</Badge>
        </div>
        <div style={{ padding: 18, height: 460, overflow: 'auto', background: '#fafbfc' }}>
          <ChatBubble from="persona" name="Maya Chen" role="Loan Officer" time="2:14 PM" avatar={PERSONAS.maya.avatar}>
            Hi — I have your report. Quick question: <strong>contract is $492,000, your value is $488,000</strong>. We're $4,000 short. Is there anything you can do? Borrower is great, lender's flexible, this could blow up the deal.
          </ChatBubble>
          <ChatBubble from="user" name="You" time="2:16 PM">
            I understand the pressure, Maya. My value is supported by three closely-comparable sales with gross adjustments under 25%. The contract is just one data point — my opinion is independent of it. I can't change the value, but I can walk you through the support if it would help your file.
          </ChatBubble>
          <ChatBubble from="persona" name="Maya Chen" role="Loan Officer" time="2:18 PM" avatar={PERSONAS.maya.avatar}>
            <em>What if I sent you two more comps the agent thinks are stronger?</em> Both came in higher. Would you consider them?
          </ChatBubble>
          <ChatBubble from="ai" name="Socratic AI" time="2:18 PM">
            <strong>Watch this one.</strong> Looking at additional comps is fine — you're not obligated to change the value, but you must consider data offered in good faith. <em>Refusing to look = USPAP problem. Changing the value because of pressure = USPAP problem.</em> Thread the needle.
          </ChatBubble>
          <ChatBubble from="user" name="You" time="2:21 PM">
            Send them over — I'll review in good faith. If they materially change my analysis, I'll revise the report and document the reason. If they don't, I'll provide a written explanation of why my conclusion stands. Either way, my opinion will be based on the data, not on the contract or the deal.
          </ChatBubble>
          <ChatBubble from="ai" name="Socratic AI" time="2:22 PM" accent="#1a9e5c">
            <strong style={{ color: '#7ce0a4' }}>Textbook response.</strong> You agreed to consider new data, refused to commit to a number, and named the boundary explicitly. SR2-3 / Ethics Rule preserved. Logged.
          </ChatBubble>
        </div>
        <div style={{ padding: '12px 18px', borderTop: '1px solid #f0f0f0', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
          {['Response defends independence', 'No commitment to change value', 'Offers structured re-review path'].map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '6px 10px', background: '#edfbf4', borderRadius: 5, fontSize: 11.5, color: '#1a9e5c' }}>
              <Icon name="check-circle" size={12} color="#1a9e5c"/>
              <span style={{ fontWeight: 600 }}>{s}</span>
            </div>
          ))}
        </div>
      </Card>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 14 }}>
        <Button variant="primary" onClick={() => navigate('mentor-review-8')}>Submit · Final Mentor Review <Icon name="arrow-right" size={14} color="#fff"/></Button>
      </div>
    </div>
  );
}

// AI label badge — used wherever AI-generated content needs marking
function AILabel({ label, color = '#d60436', bg = '#fff', accent = '#fff0f3' }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      fontSize: 10, fontWeight: 800, color,
      background: bg, padding: '3px 8px 3px 6px', borderRadius: 4,
      letterSpacing: '.08em', textTransform: 'uppercase',
      border: `1px solid ${accent}`,
    }}>
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
        <path d="M6 1 L7.2 4.8 L11 6 L7.2 7.2 L6 11 L4.8 7.2 L1 6 L4.8 4.8 Z" fill={color}/>
      </svg>
      {label}
    </span>
  );
}

// ═══ SCREEN 33: Final Review + Certificate Preview ═══════════
function S33_FinalReview({ navigate }) {
  return (
    <div>
      <PageHeader breadcrumb={['Phase 8', 'Mentor Review 8']} title="Final Mentor Review — Report 1 complete"
        subtitle="Capstone review of all 8 phases. Mentor signs off. Report 1 lands in your portfolio."/>

      {/* Capstone banner */}
      <Card padding={0} style={{ marginBottom: 14 }}>
        <div style={{ padding: '18px 22px', background: 'linear-gradient(120deg, #fff0f3 0%, #fff5ec 100%)', color: '#292929', borderBottom: '1px solid #f4d4dc', display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ flex: 1 }}>
            <AILabel label="Capstone Pre-screen"/>
            <div style={{ fontSize: 20, fontWeight: 800, marginTop: 8, fontFamily: "'Nunito', sans-serif", color: '#292929' }}>Report 1 · Conventional Purchase</div>
            <div style={{ fontSize: 12.5, color: '#555', marginTop: 2 }}>4218 Ridgewood Lane · Glenmoor, OH · $488,000 · 03/14/2026</div>
          </div>
          <Badge color="success">Approved · no revisions</Badge>
        </div>
      </Card>

      {/* Stats row — 4 wide tiles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 14 }}>
        <StatTile label="Hours" value="68" sub="this report · 142 total" icon="clock" color="#0a6ed1"/>
        <StatTile label="USPAP flags resolved" value="14" sub="0 outstanding" trend="+14" icon="shield-check" color="#1a9e5c"/>
        <StatTile label="AI overrides defended" value="11" sub="of 14 attempted · 79%" trend="79%" icon="git-branch" color="#d60436"/>
        <StatTile label="Sessions" value="24" sub="48 hours over 47 days" icon="zap"/>
      </div>

      {/* Phase audit summary — full width */}
      <Card padding="18px 22px" style={{ marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 12 }}>All 8 phases · audit summary</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
          {PHASES.slice(1).map((p, i) => (
            <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: '#edfbf4', borderRadius: 6, border: '1px solid #1a9e5c33' }}>
              <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#1a9e5c', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10.5, fontWeight: 800, flexShrink: 0 }}>{i+1}</span>
              <span style={{ flex: 1, fontSize: 12.5, fontWeight: 600, color: '#0d4a2e' }}>{p.label}</span>
              <span style={{ fontSize: 10.5, color: '#888' }}>MR{i+1} · cleared</span>
              <Icon name="check-circle" size={14} color="#1a9e5c"/>
            </div>
          ))}
        </div>
      </Card>

      {/* Mentor narrative + portfolio entry side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16 }}>
        <Card padding="18px 22px" style={{ background: '#fffbf2', border: '1px solid #e8860a33' }}>
          <AILabel label="Mentor Narrative"/>
          <div style={{ fontSize: 13.5, color: '#444', marginTop: 10, lineHeight: 1.6, fontStyle: 'italic' }}>
            "Sarah's Report 1 is the cleanest I've reviewed this cohort. Compression curve at 61% — well ahead of median. The basement adjustment defense was thin but she patched it before submission. Comp selection was disciplined, reconciliation was quantitative. <strong style={{ color: '#1a9e5c', fontStyle: 'normal' }}>Approved without revisions.</strong>"
          </div>
          <div style={{ fontSize: 11.5, color: '#666', marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
            <img src={MENTOR.avatar} style={{ width: 24, height: 24, borderRadius: '50%', objectFit: 'cover' }}/>
            <span>— {MENTOR.name} · {MENTOR.role}</span>
          </div>
        </Card>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <Card padding={0} style={{ overflow: 'hidden', background: 'linear-gradient(135deg, #fff8ec 0%, #fff 100%)', border: '1.5px solid #e8860a44' }}>
            <div style={{ padding: '20px 22px', textAlign: 'center', position: 'relative' }}>
              <Icon name="award" size={48} color="#e8860a"/>
              <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: '.06em', fontWeight: 700, marginTop: 8 }}>Portfolio entry · 1 of 3</div>
              <div style={{ fontSize: 16, fontWeight: 800, color: '#292929', marginTop: 6, fontFamily: "'Nunito', sans-serif" }}>Report 1 · Conventional Purchase</div>
              <div style={{ fontSize: 12, color: '#666', marginTop: 6, lineHeight: 1.5 }}>Now in your portfolio. Two more reports + final cert exam stand between you and your AQB-aligned PAREA certificate.</div>
              <Button variant="primary" onClick={() => navigate('home')} style={{ marginTop: 14 }}>
                Back to dashboard <Icon name="arrow-right" size={13} color="#fff"/>
              </Button>
            </div>
          </Card>
          <Card padding="14px 16px">
            <div style={{ fontSize: 11, color: '#888', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: 6 }}>Up next · Report 2</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#292929' }}>FHA Refinance · 2143 Westbridge Dr</div>
            <div style={{ fontSize: 11, color: '#666', marginTop: 4, lineHeight: 1.5 }}>FHA-specific compliance twist. Scope &amp; engagement letter open in 2 weeks.</div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function Mini({ label, value, color }) {
  return (
    <div style={{ background: '#fafafa', borderRadius: 6, padding: 10 }}>
      <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '.05em' }}>{label}</div>
      <div style={{ fontSize: 18, fontWeight: 800, color, fontFamily: "'Nunito', sans-serif", marginTop: 2 }}>{value}</div>
    </div>
  );
}

Object.assign(window, { S23_AdjGrid, S24_Cost, S25_Income, S26_MR5, S27_Reconciliation, S28_MR6, S29_ReportWriting, S30_Workfile, S31_MR7, S32_ClientSim, S33_FinalReview });
