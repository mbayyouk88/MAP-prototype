import React from 'react';

// ─── SHARED ───────────────────────────────────────────────────────────────────
const TabBar = ({ active, setActive }) => (
  <div style={{ display:"flex", background:"#0f172a", borderBottom:"2px solid #1e293b", padding:"0 20px", gap:4, flexShrink:0 }}>
    {[
      { key:"tour",   icon:"🏠", label:"McKissock Virtual Tour" },
      { key:"sketch", icon:"✏️", label:"McKissock Sketch" },
    ].map(t => (
      <button key={t.key} onClick={() => setActive(t.key)}
        style={{ display:"flex", alignItems:"center", gap:7, padding:"12px 20px", fontSize:13, fontWeight:600, background:"none", border:"none", borderBottom: active===t.key ? "2px solid #38bdf8" : "2px solid transparent", marginBottom:-2, color: active===t.key ? "#38bdf8" : "#64748b", cursor:"pointer", whiteSpace:"nowrap", transition:"color 0.2s" }}>
        <span style={{ fontSize:16 }}>{t.icon}</span>
        {t.label}
      </button>
    ))}
  </div>
);

// ─── VIRTUAL TOUR ─────────────────────────────────────────────────────────────
const MATTERPORT_URL = "https://my.matterport.com/show/?m=UDw2UanapEg&play=1&qs=1&brand=0";
const adverseOptions = ["None Observed","Deferred Maintenance","Water Damage","Foundation Issues","Mold / Moisture","Structural Concerns","Multiple Issues"];

function ExportModal({ onClose, adverse, notes }) {
  const lines = ["=== SITE INSPECTION ===",`Adverse Conditions: ${adverse||"—"}`,"","=== GENERAL NOTES ===",notes||"—"].join("\n");
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.7)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center" }}>
      <div style={{ background:"#1e293b", borderRadius:12, padding:24, width:"min(560px,90vw)", maxHeight:"80vh", display:"flex", flexDirection:"column", gap:12 }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ color:"#f1f5f9", fontWeight:700, fontSize:16 }}>Inspection Summary</span>
          <button onClick={onClose} style={{ background:"none", border:"none", color:"#94a3b8", fontSize:20, cursor:"pointer" }}>✕</button>
        </div>
        <textarea readOnly value={lines} style={{ flex:1, background:"#0f172a", border:"1px solid #334155", borderRadius:8, color:"#94a3b8", fontFamily:"monospace", fontSize:13, padding:12, resize:"none", minHeight:200 }} />
        <div style={{ display:"flex", gap:8, justifyContent:"flex-end" }}>
          <button onClick={() => navigator.clipboard.writeText(lines)} style={{ background:"#0284c7", border:"none", borderRadius:8, color:"#fff", padding:"8px 18px", cursor:"pointer", fontWeight:600 }}>Copy to Clipboard</button>
          <button onClick={onClose} style={{ background:"#334155", border:"none", borderRadius:8, color:"#f1f5f9", padding:"8px 18px", cursor:"pointer" }}>Close</button>
        </div>
      </div>
    </div>
  );
}

function VirtualTour() {
  const [adverse, setAdverse] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [showExport, setShowExport] = React.useState(false);
  const filled = (adverse!==""?1:0)+(notes.trim()!==""?1:0);
  const pct = Math.round((filled/2)*100);
  return (
    <div style={{ display:"flex", height:"100%", background:"#0f172a", fontFamily:"'Segoe UI',system-ui,sans-serif", overflow:"hidden" }}>
      {/* LEFT — Matterport */}
      <div style={{ flex:"0 0 65%", position:"relative", background:"#000" }}>
        <iframe src={MATTERPORT_URL}
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", border:"none" }}
          allow="xr-spatial-tracking; fullscreen" allowFullScreen title="Matterport Virtual Tour" />
      </div>
      {/* RIGHT — Inspection Panel */}
      <div style={{ flex:"0 0 35%", display:"flex", flexDirection:"column", background:"#0f172a", borderLeft:"1px solid #1e293b", overflow:"hidden" }}>
        <div style={{ padding:"14px 20px 10px", borderBottom:"1px solid #1e293b" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
            <span style={{ color:"#f1f5f9", fontWeight:700, fontSize:14 }}>Site Inspection</span>
            <span style={{ color:pct===100?"#4ade80":"#38bdf8", fontWeight:700, fontSize:12 }}>{pct}%</span>
          </div>
          <div style={{ height:4, background:"#1e293b", borderRadius:99, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${pct}%`, background:pct===100?"#4ade80":"linear-gradient(90deg,#0ea5e9,#6366f1)", borderRadius:99, transition:"width 0.4s" }} />
          </div>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:20, display:"flex", flexDirection:"column", gap:24 }}>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            <div style={{ borderBottom:"1px solid #334155", paddingBottom:6 }}>
              <span style={{ fontSize:11, fontWeight:700, color:"#38bdf8", textTransform:"uppercase", letterSpacing:"0.08em" }}>Adverse Conditions</span>
            </div>
            <label style={{ fontSize:11, fontWeight:600, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.05em" }}>Select Condition</label>
            <select value={adverse} onChange={e=>setAdverse(e.target.value)}
              style={{ background:"#1e293b", border:"1px solid #334155", borderRadius:8, color:"#f1f5f9", padding:"10px 12px", fontSize:14 }}>
              <option value="">Select...</option>
              {adverseOptions.map(o=><option key={o} value={o}>{o}</option>)}
            </select>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            <div style={{ borderBottom:"1px solid #334155", paddingBottom:6 }}>
              <span style={{ fontSize:11, fontWeight:700, color:"#38bdf8", textTransform:"uppercase", letterSpacing:"0.08em" }}>General Notes</span>
            </div>
            <label style={{ fontSize:11, fontWeight:600, color:"#94a3b8", textTransform:"uppercase", letterSpacing:"0.05em" }}>Observations & Comments</label>
            <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={10}
              placeholder="Record your observations from the virtual tour here..."
              style={{ background:"#1e293b", border:"1px solid #334155", borderRadius:8, color:"#f1f5f9", padding:"10px 12px", fontSize:14, resize:"vertical", lineHeight:1.6 }} />
          </div>
        </div>
        <div style={{ padding:"12px 20px", borderTop:"1px solid #1e293b", display:"flex", gap:8 }}>
          <button onClick={()=>{setAdverse("");setNotes("");}}
            style={{ flex:1, padding:"9px 0", background:"#1e293b", border:"1px solid #334155", borderRadius:8, color:"#94a3b8", fontSize:13, cursor:"pointer", fontWeight:600 }}>Clear</button>
          <button onClick={()=>setShowExport(true)}
            style={{ flex:2, padding:"9px 0", background:"linear-gradient(135deg,#0ea5e9,#6366f1)", border:"none", borderRadius:8, color:"#fff", fontSize:13, cursor:"pointer", fontWeight:700 }}>Export Summary</button>
        </div>
      </div>
      {showExport && <ExportModal onClose={()=>setShowExport(false)} adverse={adverse} notes={notes} />}
    </div>
  );
}

// ─── MCKISSOCK SKETCH ─────────────────────────────────────────────────────────
const FLOOR_ORDER = ['Basement','Ground Level','First Floor','Second Floor','Third Floor'];
const ROOM_TYPES  = ['Living Room','Kitchen','Bedroom','Bathroom','Garage','Basement Area','ADU','Stairway','Other'];
const GLA_EXCLUDED= ['Garage','Basement Area','ADU','Stairway'];
const COLORS = { 'Living Room':'#BFDBFE','Kitchen':'#BBF7D0','Bedroom':'#FDE68A','Bathroom':'#DDD6FE','Garage':'#E5E7EB','Basement Area':'#FECACA','ADU':'#FED7AA','Stairway':'#C7D2FE','Other':'#F9A8D4' };
const CHECKLIST_DEF = [
  {id:1, section:'1', label:'Virtual inspection completed',             tab:'inspection'},
  {id:2, section:'1', label:'Types & quality of construction noted',    tab:'inspection'},
  {id:3, section:'1', label:'Floor plan issues & room count determined',tab:'sketch'},
  {id:4, section:'1', label:'Condition factors & upgrades documented',  tab:'inspection'},
  {id:5, section:'1', label:'Adverse influences identified',            tab:'inspection'},
  {id:6, section:'1', label:'Description of improvements written',      tab:'inspection'},
  {id:7, section:'2', label:'Basement area measured',                   tab:'sketch'},
  {id:8, section:'2', label:'Stairways & vaulted ceilings noted',       tab:'inspection'},
  {id:9, section:'2', label:'Below-grade / split-level area noted',     tab:'inspection'},
  {id:10,section:'2', label:'ADUs & outbuildings measured',             tab:'sketch'},
  {id:11,section:'2', label:'Special assignment conditions noted',      tab:'inspection'},
  {id:12,section:'2', label:'Rounding practices applied',               tab:'gla'},
  {id:13,section:'3', label:'Sketch completed',                         tab:'sketch'},
  {id:14,section:'3', label:'Final GLA determined & exclusions noted',  tab:'gla'},
];
const SECTION_TITLES = {'1':'1 – Improvements Inspection','2':'2 – Measuring','3':'3 – Sketch Completion'};

function McKissockSketch() {
  const [tab, setTab]               = React.useState('dashboard');
  const [property, setProperty]     = React.useState({ address:'742 Evergreen Terrace',city:'Springfield',state:'IL',zip:'62701',type:'Single Family',year:'1998',style:'Ranch',beds:'3',baths:'2',quality:'',condition:'',adverse:'' });
  const [improvements, setImprovements]     = React.useState('');
  const [stairwaysNote, setStairwaysNote]   = React.useState('');
  const [vaultedNote, setVaultedNote]       = React.useState('');
  const [belowGradeNote, setBelowGradeNote] = React.useState('');
  const [specialConditions, setSpecialConditions] = React.useState('');
  const [mentorNotes, setMentorNotes]       = React.useState('');
  const [manualChecked, setManualChecked]   = React.useState({});
  const [floors, setFloors]                 = React.useState({'Basement':[],'Ground Level':[]});
  const [unlockedFloors, setUnlockedFloors] = React.useState(['Basement','Ground Level']);
  const [activeFloor, setActiveFloor]       = React.useState('Ground Level');
  const [selectedRoomType, setSelectedRoomType] = React.useState('Living Room');
  const [selectedRoomId, setSelectedRoomId] = React.useState(null);
  const [drawing, setDrawing]               = React.useState(false);
  const [startPt, setStartPt]               = React.useState(null);
  const [currentPt, setCurrentPt]           = React.useState(null);
  const [dragState, setDragState]           = React.useState(null);
  const [deleteModal, setDeleteModal]       = React.useState(null);
  const [floorToast, setFloorToast]         = React.useState('');
  const canvasRef = React.useRef(null);

  const allRooms = React.useMemo(()=>Object.values(floors).flat(),[floors]);
  const currentFloorRooms = floors[activeFloor]||[];
  const selectedRoom = selectedRoomId ? currentFloorRooms.find(r=>r.id===selectedRoomId) : null;

  const gla = React.useMemo(()=>
    Object.entries(floors).filter(([fn])=>fn!=='Basement').flatMap(([,rooms])=>rooms.filter(r=>!GLA_EXCLUDED.includes(r.type)&&!r.isMirror)).reduce((s,r)=>s+r.area,0),[floors]);

  const totalNonMirrorRooms = React.useMemo(()=>Object.values(floors).flat().filter(r=>!r.isMirror).length,[floors]);
  const maxRoomsOnOneFloor  = React.useMemo(()=>Math.max(0,...Object.values(floors).map(rooms=>rooms.filter(r=>!r.isMirror).length)),[floors]);

  const checklist = React.useMemo(()=>{
    const basementRooms=(floors['Basement']||[]).filter(r=>r.type!=='Stairway'&&!r.isMirror);
    const hasADU    = allRooms.some(r=>r.type==='ADU'&&!r.isMirror);
    const hasStairway=allRooms.some(r=>r.type==='Stairway'&&!r.isMirror);
    const glaRooms  = Object.entries(floors).filter(([fn])=>fn!=='Basement').flatMap(([,rooms])=>rooms.filter(r=>!GLA_EXCLUDED.includes(r.type)&&!r.isMirror));
    return CHECKLIST_DEF.map(item=>{
      let auto=false;
      if(item.id===2)  auto=!!property.quality;
      else if(item.id===3)  auto=maxRoomsOnOneFloor>=2;
      else if(item.id===4)  auto=!!property.condition;
      else if(item.id===5)  auto=property.adverse.length>0;
      else if(item.id===6)  auto=improvements.length>5;
      else if(item.id===7)  auto=basementRooms.length>0;
      else if(item.id===8)  auto=stairwaysNote.length>0||hasStairway;
      else if(item.id===9)  auto=belowGradeNote.length>0;
      else if(item.id===10) auto=hasADU;
      else if(item.id===11) auto=specialConditions.length>0;
      else if(item.id===12) auto=totalNonMirrorRooms>=3;
      else if(item.id===13) auto=glaRooms.length>0;
      else if(item.id===14) auto=gla>0;
      return {...item, checked:auto||!!(manualChecked[item.id]), isAuto:auto};
    });
  },[floors,property,improvements,stairwaysNote,belowGradeNote,specialConditions,gla,manualChecked,allRooms,maxRoomsOnOneFloor,totalNonMirrorRooms]);

  const completedCount = checklist.filter(c=>c.checked).length;
  const progress = Math.round((completedCount/CHECKLIST_DEF.length)*100);

  const getPos=(e,el)=>{const rect=el.getBoundingClientRect();const cx=e.touches?e.touches[0].clientX:e.clientX;const cy=e.touches?e.touches[0].clientY:e.clientY;return{x:Math.round((cx-rect.left)/20)*20,y:Math.round((cy-rect.top)/20)*20};};

  const handleCanvasDown=(e)=>{
    const roomEl=e.target.closest('[data-room-id]');
    const p=getPos(e,canvasRef.current);
    if(roomEl){
      if(e.target.closest('[data-del-btn]'))return;
      if(selectedRoomType==='Stairway'){setDrawing(true);setStartPt(p);setCurrentPt(p);setSelectedRoomId(null);}
      else{
        const roomId=parseInt(roomEl.dataset.roomId);
        const room=currentFloorRooms.find(r=>r.id===roomId);
        if(room){const rect=canvasRef.current.getBoundingClientRect();setDragState({id:room.id,linkedFloor:room.type==='Stairway'?room.linkedFloor:null,offsetX:e.clientX-rect.left-room.x,offsetY:e.clientY-rect.top-room.y});setSelectedRoomId(roomId);}
      }return;
    }
    setDrawing(true);setStartPt(p);setCurrentPt(p);setSelectedRoomId(null);
  };

  const handleCanvasMove=(e)=>{
    if(dragState){
      const rect=canvasRef.current.getBoundingClientRect();
      const snappedX=Math.round((e.clientX-rect.left-dragState.offsetX)/20)*20;
      const snappedY=Math.round((e.clientY-rect.top-dragState.offsetY)/20)*20;
      const room=currentFloorRooms.find(r=>r.id===dragState.id);
      if(!room)return;
      const newX=Math.max(0,Math.min(snappedX,560-room.w));
      const newY=Math.max(0,Math.min(snappedY,400-room.h));
      setFloors(prev=>{
        const upd={...prev};
        upd[activeFloor]=upd[activeFloor].map(r=>r.id===dragState.id?{...r,x:newX,y:newY}:r);
        if(dragState.linkedFloor&&upd[dragState.linkedFloor]){upd[dragState.linkedFloor]=upd[dragState.linkedFloor].map(r=>r.isMirror&&r.parentId===dragState.id?{...r,x:newX,y:newY}:r);}
        return upd;
      });return;
    }
    if(!drawing)return;
    setCurrentPt(getPos(e,canvasRef.current));
  };

  const handleCanvasUp=()=>{
    if(dragState){setDragState(null);return;}
    if(!drawing||!startPt||!currentPt)return;
    setDrawing(false);
    const x=Math.min(startPt.x,currentPt.x),y=Math.min(startPt.y,currentPt.y);
    const w=Math.abs(currentPt.x-startPt.x),h=Math.abs(currentPt.y-startPt.y);
    setStartPt(null);setCurrentPt(null);
    if(w<20||h<20)return;
    const area=Math.round((w/20)*(h/20));
    const id=Date.now();
    const newRoom={id,type:selectedRoomType,x,y,w,h,area,label:'',linkedFloor:null,isMirror:false};
    if(selectedRoomType==='Stairway'){
      const idx=FLOOR_ORDER.indexOf(activeFloor);
      const nextFloor=FLOOR_ORDER[idx+1];
      if(nextFloor){
        const mirrorId=id+1;
        const main={...newRoom,linkedFloor:nextFloor};
        const mirror={...newRoom,id:mirrorId,linkedFloor:activeFloor,isMirror:true,parentId:id};
        setFloors(prev=>{const upd={...prev};upd[activeFloor]=[...(upd[activeFloor]||[]),main];upd[nextFloor]=[...(upd[nextFloor]||[]),mirror];return upd;});
        if(!unlockedFloors.includes(nextFloor)){setUnlockedFloors(prev=>[...prev,nextFloor]);setFloorToast('🔓 '+nextFloor+' unlocked! Switch floors above to continue.');setTimeout(()=>setFloorToast(''),4000);}
        return;
      }
    }
    setFloors(prev=>({...prev,[activeFloor]:[...(prev[activeFloor]||[]),newRoom]}));
  };

  const handleDelRoom=(e,room)=>{
    e.stopPropagation();
    if(room.type==='Stairway'&&room.linkedFloor){setDeleteModal({room,linkedFloor:room.linkedFloor,isMirror:!!room.isMirror});}
    else{setFloors(prev=>({...prev,[activeFloor]:prev[activeFloor].filter(r=>r.id!==room.id)}));if(selectedRoomId===room.id)setSelectedRoomId(null);}
  };

  const confirmDel=(delFloor)=>{
    if(deleteModal.isMirror){setDeleteModal(null);return;}
    const{room,linkedFloor}=deleteModal;
    setFloors(prev=>{const upd={...prev};upd[activeFloor]=upd[activeFloor].filter(r=>r.id!==room.id);if(delFloor){delete upd[linkedFloor];}else if(upd[linkedFloor]){upd[linkedFloor]=upd[linkedFloor].filter(r=>!(r.isMirror&&r.parentId===room.id));}return upd;});
    if(delFloor){setUnlockedFloors(uf=>uf.filter(f=>f!==linkedFloor));if(activeFloor===linkedFloor)setActiveFloor('Ground Level');}
    if(selectedRoomId===room.id)setSelectedRoomId(null);
    setDeleteModal(null);
  };

  const updateLabel=(id,label)=>setFloors(prev=>({...prev,[activeFloor]:prev[activeFloor].map(r=>r.id===id?{...r,label}:r)}));
  const handleChecklistClick=(item)=>{if(item.tab)setTab(item.tab);if(!item.isAuto)setManualChecked(prev=>({...prev,[item.id]:!prev[item.id]}));};

  const card ={background:'white',borderRadius:12,boxShadow:'0 1px 3px rgba(0,0,0,0.1)',padding:20,marginBottom:12};
  const lbl  ={display:'block',fontSize:13,fontWeight:600,color:'#374151',marginBottom:6};
  const inp  ={width:'100%',border:'1px solid #d1d5db',borderRadius:8,padding:'8px 12px',fontSize:13,outline:'none',boxSizing:'border-box'};
  const txta =(r)=>({width:'100%',border:'1px solid #d1d5db',borderRadius:8,padding:'8px 12px',fontSize:13,resize:'none',outline:'none',boxSizing:'border-box',minHeight:r*28});
  const sel  ={width:'100%',border:'1px solid #d1d5db',borderRadius:8,padding:'8px 12px',fontSize:13,outline:'none'};

  return (
    <div style={{ height:'100%', background:'#f3f4f6', fontFamily:'system-ui,sans-serif', display:'flex', flexDirection:'column', overflow:'hidden' }}>
      {/* Sub-nav */}
      <nav style={{ background:'white', borderBottom:'1px solid #e5e7eb', padding:'0 16px', display:'flex', gap:4, overflowX:'auto', flexShrink:0 }}>
        {[{key:'dashboard',label:'🏠 Overview'},{key:'property',label:'📋 Property Info'},{key:'inspection',label:'🔍 Inspection Notes'},{key:'sketch',label:'✏️ Sketch Tool'},{key:'gla',label:'📐 GLA Summary'}].map(t=>(
          <button key={t.key} onClick={()=>setTab(t.key)}
            style={{ padding:'12px 14px',fontSize:13,fontWeight:500,background:'none',border:'none',borderBottom:tab===t.key?'2px solid #1d4ed8':'2px solid transparent',color:tab===t.key?'#1d4ed8':'#6b7280',cursor:'pointer',whiteSpace:'nowrap' }}>
            {t.label}
          </button>
        ))}
      </nav>

      <div style={{ display:'flex', flex:1, overflow:'hidden' }}>
        {/* Sidebar */}
        <aside style={{ width:256, background:'white', borderRight:'1px solid #e5e7eb', display:'flex', flexDirection:'column', flexShrink:0, overflowY:'auto' }}>
          <div style={{ padding:'12px 16px', borderBottom:'1px solid #e5e7eb', background:'#f9fafb', position:'sticky', top:0, zIndex:10 }}>
            <div style={{ fontSize:11, fontWeight:700, color:'#6b7280', textTransform:'uppercase', letterSpacing:'0.05em' }}>PAREA Checklist</div>
            <div style={{ marginTop:8 }}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, color:'#6b7280', marginBottom:4 }}>
                <span>{completedCount}/{CHECKLIST_DEF.length} complete</span><span>{progress}%</span>
              </div>
              <div style={{ background:'#e5e7eb', borderRadius:9999, height:6 }}>
                <div style={{ background:'#22c55e', height:6, borderRadius:9999, width:progress+'%', transition:'width 0.3s' }} />
              </div>
            </div>
          </div>
          {['1','2','3'].map(s=>(
            <div key={s} style={{ borderBottom:'1px solid #e5e7eb' }}>
              <div style={{ padding:'10px 16px 4px', fontSize:10, fontWeight:700, color:'#1e40af', textTransform:'uppercase', letterSpacing:'0.06em' }}>{SECTION_TITLES[s]}</div>
              {checklist.filter(c=>c.section===s).map(item=>(
                <div key={item.id} onClick={()=>handleChecklistClick(item)} title={'Go to '+item.tab}
                  style={{ display:'flex', alignItems:'flex-start', gap:8, padding:'6px 16px', cursor:'pointer', userSelect:'none' }}
                  onMouseEnter={e=>e.currentTarget.style.background='#f0f9ff'}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <div style={{ marginTop:2, width:15, height:15, borderRadius:'50%', border:'2px solid', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:9, fontWeight:700, borderColor:item.checked?(item.isAuto?'#3b82f6':'#22c55e'):'#d1d5db', background:item.checked?(item.isAuto?'#3b82f6':'#22c55e'):'transparent', color:item.checked?'white':'transparent', transition:'all 0.2s' }}>✓</div>
                  <span style={{ fontSize:11, lineHeight:1.4, color:item.checked?'#9ca3af':'#374151', textDecoration:item.checked?'line-through':'none', flex:1 }}>
                    {item.label}
                    {item.isAuto&&item.checked&&<span style={{ color:'#93c5fd', marginLeft:4, fontSize:9 }}>●auto</span>}
                  </span>
                </div>
              ))}
            </div>
          ))}
          {progress===100&&<div style={{ margin:12, background:'#f0fdf4', border:'1px solid #86efac', borderRadius:8, padding:12, textAlign:'center', fontSize:12, color:'#15803d', fontWeight:600 }}>✅ Ready for Mentor Review!</div>}
        </aside>

        {/* Main */}
        <main style={{ flex:1, overflowY:'auto', padding:24 }}>

          {tab==='dashboard'&&(
            <div>
              <div style={{ fontSize:20, fontWeight:700, color:'#1f2937', marginBottom:4 }}>Assignment Overview</div>
              <div style={{ fontSize:13, color:'#6b7280', marginBottom:20 }}>Licensed Residential — PAREA Training Module</div>
              <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:16, marginBottom:20 }}>
                {[{title:'Subject Property',val:property.address,sub:property.city+', '+property.state+' '+property.zip,color:'#2563eb'},{title:'Inspection Progress',val:progress+'%',sub:completedCount+'/'+CHECKLIST_DEF.length+' items',color:'#22c55e'},{title:'Current GLA',val:gla.toLocaleString()+' sf',sub:allRooms.filter(r=>!GLA_EXCLUDED.includes(r.type)&&!r.isMirror).length+' room(s) sketched',color:'#a855f7'}].map((c,i)=>(
                  <div key={i} style={{ background:'white', borderRadius:12, boxShadow:'0 1px 3px rgba(0,0,0,0.1)', padding:16, borderLeft:'4px solid '+c.color }}>
                    <div style={{ fontSize:11, color:'#6b7280', textTransform:'uppercase', marginBottom:4 }}>{c.title}</div>
                    <div style={{ fontSize:22, fontWeight:700, color:'#1f2937' }}>{c.val}</div>
                    <div style={{ fontSize:12, color:'#6b7280' }}>{c.sub}</div>
                  </div>
                ))}
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                <div style={card}>
                  <div style={{ fontSize:14, fontWeight:600, color:'#374151', marginBottom:12 }}>📌 Section Progress</div>
                  {['1','2','3'].map(s=>{const items=checklist.filter(c=>c.section===s);const done=items.filter(c=>c.checked).length;return(
                    <div key={s} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'8px 0', borderBottom:'1px solid #f3f4f6' }}>
                      <span style={{ fontSize:13, color:'#4b5563' }}>{SECTION_TITLES[s]}</span>
                      <span style={{ fontSize:11, fontWeight:600, padding:'2px 8px', borderRadius:9999, background:done===items.length?'#dcfce7':'#fef9c3', color:done===items.length?'#15803d':'#854d0e' }}>{done}/{items.length}</span>
                    </div>
                  );})}
                </div>
                <div style={card}>
                  <div style={{ fontSize:14, fontWeight:600, color:'#374151', marginBottom:8 }}>📝 Mentor Notes</div>
                  <textarea rows={5} value={mentorNotes} onChange={e=>setMentorNotes(e.target.value)} style={txta(5)} placeholder="Add notes for mentor review..." />
                </div>
              </div>
            </div>
          )}

          {tab==='property'&&(
            <div style={{ ...card, maxWidth:640 }}>
              <div style={{ fontSize:20, fontWeight:700, color:'#1f2937', marginBottom:16 }}>📋 Property Information</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                {[{label:'Street Address',key:'address'},{label:'City',key:'city'},{label:'State',key:'state'},{label:'ZIP Code',key:'zip'},{label:'Property Type',key:'type'},{label:'Year Built',key:'year'},{label:'Architectural Style',key:'style'},{label:'Bedrooms',key:'beds'},{label:'Bathrooms',key:'baths'}].map(f=>(
                  <div key={f.key}><label style={lbl}>{f.label}</label><input type="text" value={property[f.key]} onChange={e=>setProperty(p=>({...p,[f.key]:e.target.value}))} style={inp} /></div>
                ))}
              </div>
            </div>
          )}

          {tab==='inspection'&&(
            <div style={{ maxWidth:640 }}>
              <div style={{ fontSize:20, fontWeight:700, color:'#1f2937', marginBottom:16 }}>🔍 Inspection Notes</div>
              <div style={card}>
                <label style={lbl}>Quality Rating</label>
                <select value={property.quality} onChange={e=>setProperty(p=>({...p,quality:e.target.value}))} style={{ ...sel, marginBottom:12 }}>
                  <option value="">Select quality rating...</option>
                  {['Q1 – Minimum quality','Q2 – Fair quality','Q3 – Average quality','Q4 – Good quality','Q5 – High quality','Q6 – Exceptional quality'].map(o=><option key={o}>{o}</option>)}
                </select>
                <label style={lbl}>Condition Rating</label>
                <select value={property.condition} onChange={e=>setProperty(p=>({...p,condition:e.target.value}))} style={sel}>
                  <option value="">Select condition rating...</option>
                  {['C1 – New','C2 – Nearly new','C3 – Well maintained','C4 – Adequately maintained','C5 – Poor condition','C6 – Severe deterioration'].map(o=><option key={o}>{o}</option>)}
                </select>
              </div>
              {[{label:'Adverse Influences',val:property.adverse,set:v=>setProperty(p=>({...p,adverse:v})),rows:3,ph:'Describe any adverse influences observed...'},{label:'Stairways',val:stairwaysNote,set:setStairwaysNote,rows:2,ph:'Note stairway locations, dimensions, and floor connections...'},{label:'Vaulted Ceilings',val:vaultedNote,set:setVaultedNote,rows:2,ph:'Note rooms with vaulted ceilings and any GLA considerations...'},{label:'Below-Grade / Split-Level',val:belowGradeNote,set:setBelowGradeNote,rows:2,ph:'Describe any below-grade or split-level conditions...'},{label:'Special Assignment Conditions',val:specialConditions,set:setSpecialConditions,rows:2,ph:'Note any unusual conditions or assignment-specific requirements...'},{label:'Description of Improvements',val:improvements,set:setImprovements,rows:7,ph:'The subject is a 1-story ranch-style home of average quality (Q3)...'}].map((f,i)=>(
                <div key={i} style={card}><label style={lbl}>{f.label}</label><textarea rows={f.rows} value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph} style={txta(f.rows)} /></div>
              ))}
            </div>
          )}

          {tab==='sketch'&&(
            <div>
              <div style={{ fontSize:20, fontWeight:700, color:'#1f2937', marginBottom:4 }}>✏️ Floor Plan Sketch Tool</div>
              <div style={{ fontSize:13, color:'#6b7280', marginBottom:12 }}>Select a floor and room type, then click-drag to draw. <strong>Stairway</strong> mode draws on top of existing rooms and unlocks the next floor. Drag any room to reposition it.</div>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:12, flexWrap:'wrap' }}>
                <span style={{ fontSize:11, fontWeight:700, color:'#6b7280', textTransform:'uppercase' }}>Floor:</span>
                {FLOOR_ORDER.map(f=>{const unlocked=unlockedFloors.includes(f);const active=activeFloor===f;return(
                  <button key={f} onClick={()=>{if(unlocked){setActiveFloor(f);setSelectedRoomId(null);}}}
                    style={{ padding:'4px 14px', borderRadius:9999, fontSize:12, fontWeight:600, border:'1px solid', cursor:unlocked?'pointer':'not-allowed', borderColor:active&&unlocked?'#1d4ed8':unlocked?'#d1d5db':'#e5e7eb', background:active&&unlocked?'#1d4ed8':unlocked?'white':'#f9fafb', color:active&&unlocked?'white':unlocked?'#374151':'#d1d5db' }}>
                    {unlocked?f:'🔒 '+f}
                  </button>
                );})}
              </div>
              {floorToast&&<div style={{ marginBottom:12, background:'#f0fdf4', border:'1px solid #86efac', color:'#15803d', fontSize:13, padding:'8px 16px', borderRadius:8 }}>{floorToast}</div>}
              <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:16 }}>
                {ROOM_TYPES.map(r=>(
                  <button key={r} onClick={()=>setSelectedRoomType(r)}
                    style={{ padding:'4px 12px', borderRadius:9999, fontSize:12, fontWeight:600, border:selectedRoomType===r?'2px solid #1d4ed8':'1px solid #d1d5db', background:selectedRoomType===r?'#1d4ed8':'white', color:selectedRoomType===r?'white':'#374151', cursor:'pointer', display:'flex', alignItems:'center', gap:5 }}>
                    <span style={{ display:'inline-block', width:8, height:8, borderRadius:2, background:COLORS[r]||'#d1d5db', flexShrink:0 }} />{r}
                  </button>
                ))}
              </div>
              <div style={{ display:'flex', gap:16, flexWrap:'wrap', alignItems:'flex-start' }}>
                <div ref={canvasRef}
                  onMouseDown={handleCanvasDown} onMouseMove={handleCanvasMove} onMouseUp={handleCanvasUp}
                  onMouseLeave={()=>{setDrawing(false);setStartPt(null);setCurrentPt(null);if(dragState)setDragState(null);}}
                  style={{ position:'relative', width:560, height:400, background:'white', border:'2px solid #d1d5db', borderRadius:12, overflow:'hidden', cursor:dragState?'grabbing':'crosshair', userSelect:'none', flexShrink:0 }}>
                  <svg style={{ position:'absolute', inset:0, width:'100%', height:'100%', pointerEvents:'none' }}>
                    <defs><pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f3f4f6" strokeWidth="1"/></pattern></defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                  </svg>
                  <div style={{ position:'absolute', top:8, right:12, fontSize:15, fontWeight:700, color:'#e5e7eb', pointerEvents:'none' }}>{activeFloor}</div>
                  {currentFloorRooms.map(room=>(
                    <div key={room.id} data-room-id={String(room.id)}
                      style={{ position:'absolute', left:room.x, top:room.y, width:room.w, height:room.h, background:(COLORS[room.type]||'#e5e7eb')+(room.isMirror?'88':'cc'), border:selectedRoomId===room.id?'2px solid #2563eb':room.isMirror?'2px dashed #818cf8':'2px solid #1d4ed8', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', overflow:'hidden', cursor:selectedRoomType==='Stairway'?'crosshair':'grab', boxSizing:'border-box', zIndex:room.type==='Stairway'?2:1 }}>
                      <span style={{ fontSize:11, fontWeight:700, color:'#1f2937', lineHeight:1.2, pointerEvents:'none' }}>{room.type}</span>
                      {room.label&&<span style={{ fontSize:10, fontStyle:'italic', color:'#374151', lineHeight:1.2, pointerEvents:'none' }}>{room.label}</span>}
                      <span style={{ fontSize:10, color:'#6b7280', pointerEvents:'none' }}>{room.area} sf</span>
                      {room.isMirror&&<span style={{ fontSize:9, color:'#818cf8', pointerEvents:'none' }}>↕ {room.linkedFloor}</span>}
                      <button data-del-btn="true" onMouseDown={e=>e.stopPropagation()} onClick={e=>handleDelRoom(e,room)}
                        style={{ position:'absolute', top:1, right:4, color:'#ef4444', fontSize:14, fontWeight:700, background:'none', border:'none', cursor:'pointer', lineHeight:1, zIndex:3 }}>×</button>
                    </div>
                  ))}
                  {drawing&&startPt&&currentPt&&(
                    <div style={{ position:'absolute', left:Math.min(startPt.x,currentPt.x), top:Math.min(startPt.y,currentPt.y), width:Math.abs(currentPt.x-startPt.x), height:Math.abs(currentPt.y-startPt.y), background:(COLORS[selectedRoomType]||'#e5e7eb')+'66', border:'2px dashed #3b82f6', pointerEvents:'none', zIndex:10 }} />
                  )}
                </div>
                <div style={{ flex:1, minWidth:160, background:'white', borderRadius:12, boxShadow:'0 1px 3px rgba(0,0,0,0.1)', padding:16, maxHeight:400, overflowY:'auto' }}>
                  <div style={{ fontSize:13, fontWeight:600, color:'#374151', marginBottom:8 }}>Rooms — {activeFloor}</div>
                  {currentFloorRooms.length===0&&<div style={{ fontSize:12, color:'#9ca3af' }}>No rooms drawn yet.</div>}
                  {currentFloorRooms.map(r=>(
                    <div key={r.id} onClick={()=>setSelectedRoomId(r.id===selectedRoomId?null:r.id)}
                      style={{ display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:12, padding:'4px 8px', borderRadius:6, cursor:'pointer', background:selectedRoomId===r.id?'#eff6ff':'transparent', marginBottom:2 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:6 }}>
                        <div style={{ width:10, height:10, borderRadius:2, background:COLORS[r.type]||'#e5e7eb', flexShrink:0 }} />
                        <span style={{ color:'#374151' }}>{r.type}{r.label?' ('+r.label+')':''}</span>
                        {r.isMirror&&<span style={{ color:'#818cf8', fontStyle:'italic', fontSize:10 }}>mirror</span>}
                      </div>
                      <div style={{ display:'flex', gap:4, alignItems:'center' }}>
                        <span style={{ color:'#6b7280' }}>{r.area} sf</span>
                        {GLA_EXCLUDED.includes(r.type)&&<span style={{ color:'#f87171', fontStyle:'italic', fontSize:10 }}>excl.</span>}
                      </div>
                    </div>
                  ))}
                  {selectedRoom&&(
                    <div style={{ marginTop:8, paddingTop:8, borderTop:'1px solid #e5e7eb' }}>
                      <div style={{ fontSize:11, color:'#6b7280', marginBottom:4 }}>Label / note for <strong>{selectedRoom.type}</strong>:</div>
                      <input type="text" value={selectedRoom.label} onChange={e=>updateLabel(selectedRoom.id,e.target.value)} placeholder='e.g. "Vaulted Ceiling"'
                        style={{ width:'100%', border:'1px solid #d1d5db', borderRadius:6, padding:'4px 8px', fontSize:12, outline:'none', boxSizing:'border-box' }} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {tab==='gla'&&(
            <div style={{ maxWidth:600 }}>
              <div style={{ fontSize:20, fontWeight:700, color:'#1f2937', marginBottom:4 }}>📐 GLA Summary</div>
              <div style={{ fontSize:13, color:'#6b7280', marginBottom:20 }}>ANSI-compliant — Basement floor, Garage, ADU, and Stairways excluded from GLA.</div>
              {FLOOR_ORDER.filter(f=>unlockedFloors.includes(f)).map(floorName=>{
                const floorRooms=(floors[floorName]||[]).filter(r=>!r.isMirror);
                if(floorRooms.length===0)return null;
                const glaRooms=floorName==='Basement'?[]:floorRooms.filter(r=>!GLA_EXCLUDED.includes(r.type));
                const floorGLA=glaRooms.reduce((s,r)=>s+r.area,0);
                return(
                  <div key={floorName} style={card}>
                    <div style={{ fontSize:11, fontWeight:700, color:'#6b7280', textTransform:'uppercase', marginBottom:8 }}>{floorName}</div>
                    {floorRooms.map(r=>(
                      <div key={r.id} style={{ display:'flex', justifyContent:'space-between', fontSize:13, padding:'4px 0', borderBottom:'1px solid #f9fafb', color:GLA_EXCLUDED.includes(r.type)||floorName==='Basement'?'#9ca3af':'#374151' }}>
                        <span>{r.type}{r.label?' — '+r.label:''}{(GLA_EXCLUDED.includes(r.type)||floorName==='Basement')?' (excl.)':''}</span>
                        <span>{r.area.toLocaleString()} sf</span>
                      </div>
                    ))}
                    {floorGLA>0&&<div style={{ display:'flex', justifyContent:'space-between', fontSize:13, fontWeight:600, color:'#1d4ed8', paddingTop:8, marginTop:4, borderTop:'1px solid #e5e7eb' }}><span>Floor GLA</span><span>{floorGLA.toLocaleString()} sf</span></div>}
                  </div>
                );
              })}
              {totalNonMirrorRooms>=3?(
                <div style={card}>
                  <div style={{ fontSize:13, fontWeight:700, color:'#374151', marginBottom:8 }}>📏 Rounding Applied (ANSI Z765)</div>
                  <div style={{ fontSize:12, color:'#374151', marginBottom:10, padding:'6px 10px', background:'#eff6ff', borderRadius:6, borderLeft:'3px solid #3b82f6' }}>All dimensions rounded to the nearest foot per ANSI Z765 standards.</div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 48px 48px 60px', gap:'4px 8px', fontSize:12, alignItems:'center' }}>
                    {['Room','W (ft)','H (ft)','Area (sf)'].map((h,i)=><span key={i} style={{ color:'#9ca3af', fontWeight:700, paddingBottom:4, borderBottom:'1px solid #e5e7eb' }}>{h}</span>)}
                    {Object.entries(floors).flatMap(([fn,rooms])=>rooms.filter(r=>!r.isMirror).map(r=>{
                      const isExcl=GLA_EXCLUDED.includes(r.type)||fn==='Basement';
                      return[
                        <span key={r.id+'n'} style={{ color:isExcl?'#9ca3af':'#374151', paddingTop:4 }}>{fn==='Basement'?'[B] ':''}{r.type}{r.label?' ('+r.label+')':''}</span>,
                        <span key={r.id+'w'} style={{ textAlign:'right', color:'#374151', paddingTop:4 }}>{Math.round(r.w/20)}</span>,
                        <span key={r.id+'h'} style={{ textAlign:'right', color:'#374151', paddingTop:4 }}>{Math.round(r.h/20)}</span>,
                        <span key={r.id+'a'} style={{ textAlign:'right', color:isExcl?'#9ca3af':'#1d4ed8', fontWeight:isExcl?400:600, paddingTop:4 }}>{r.area}</span>,
                      ];
                    }))}
                  </div>
                </div>
              ):(
                <div style={{ ...card, color:'#9ca3af', fontSize:13, fontStyle:'italic' }}>📏 Rounding table will appear once 3 or more rooms are sketched.</div>
              )}
              <div style={{ background:'#1e3a8a', color:'white', borderRadius:12, padding:20, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <div>
                  <div style={{ fontSize:11, color:'#93c5fd', textTransform:'uppercase', letterSpacing:'0.05em' }}>Final GLA (ANSI-Compliant)</div>
                  <div style={{ fontSize:32, fontWeight:700 }}>{gla.toLocaleString()} <span style={{ fontSize:16, fontWeight:400, color:'#93c5fd' }}>sq ft</span></div>
                </div>
                <button style={{ background:'white', color:'#1e3a8a', fontWeight:600, fontSize:13, padding:'8px 16px', borderRadius:8, border:'none', cursor:'pointer' }}>Export Report</button>
              </div>
            </div>
          )}
        </main>
      </div>

      {deleteModal&&(
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.5)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:50, padding:16 }}>
          <div style={{ background:'white', borderRadius:16, padding:24, maxWidth:380, width:'100%', boxShadow:'0 20px 60px rgba(0,0,0,0.3)' }}>
            {deleteModal.isMirror?(
              <>
                <div style={{ fontSize:18, fontWeight:700, marginBottom:8 }}>ℹ️ Mirror Stairway</div>
                <p style={{ fontSize:14, color:'#4b5563', marginBottom:16 }}>This is a mirrored stairway from <strong>{deleteModal.linkedFloor}</strong>. Switch to that floor and delete the original there.</p>
                <div style={{ display:'flex', justifyContent:'flex-end' }}><button onClick={()=>setDeleteModal(null)} style={{ padding:'8px 20px', background:'#1d4ed8', color:'white', border:'none', borderRadius:8, cursor:'pointer', fontWeight:600 }}>Got it</button></div>
              </>
            ):(
              <>
                <div style={{ fontSize:18, fontWeight:700, marginBottom:8 }}>⚠️ Delete Stairway?</div>
                <p style={{ fontSize:14, color:'#4b5563', marginBottom:16 }}>This stairway connects to <strong>{deleteModal.linkedFloor}</strong>. Do you also want to delete <strong>{deleteModal.linkedFloor}</strong> and all its rooms?</p>
                <div style={{ display:'flex', gap:8, justifyContent:'flex-end', flexWrap:'wrap' }}>
                  <button onClick={()=>setDeleteModal(null)} style={{ padding:'8px 16px', border:'1px solid #d1d5db', borderRadius:8, cursor:'pointer', fontSize:13, background:'white', color:'#374151' }}>Cancel</button>
                  <button onClick={()=>confirmDel(false)} style={{ padding:'8px 16px', border:'1px solid #fbbf24', borderRadius:8, cursor:'pointer', fontSize:13, background:'#fffbeb', color:'#92400e' }}>Delete Stairway Only</button>
                  <button onClick={()=>confirmDel(true)} style={{ padding:'8px 16px', background:'#dc2626', color:'white', border:'none', borderRadius:8, cursor:'pointer', fontSize:13, fontWeight:600 }}>Delete Both</button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function InspectionTool() {
  const [activeTab, setActiveTab] = React.useState('tour');
  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', overflow:'hidden' }}>
      <TabBar active={activeTab} setActive={setActiveTab} />
      <div style={{ flex:1, overflow:'hidden' }}>
        {activeTab==='tour'   && <VirtualTour />}
        {activeTab==='sketch' && <McKissockSketch />}
      </div>
    </div>
  );
}
