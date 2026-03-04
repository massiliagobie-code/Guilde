import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis } from "recharts";

const TOTAL_PARTIES = 14;

const players = [
  { name: "Philippe Lagrafeuille", participations: 14, absences: 0, nonMembre: 0, total: 1545654, avg: 110403, max: 126213, min: 84678 },
  { name: "Jean Marc Aumond",      participations: 13, absences: 1, nonMembre: 0, total: 1355172, avg: 104244, max: 121693, min: 79508 },
  { name: "Sébastien Havet",       participations: 11, absences: 3, nonMembre: 0, total: 1132292, avg: 102935, max: 124098, min: 76583 },
  { name: "Patrice Beley",         participations: 14, absences: 0, nonMembre: 0, total: 1288929, avg: 92066,  max: 112612, min: 71116 },
  { name: "Sandrine Ginier Maurel",participations: 11, absences: 3, nonMembre: 0, total: 970384,  avg: 88216,  max: 105514, min: 65793 },
  { name: "Philippe Chevalier",    participations: 14, absences: 0, nonMembre: 0, total: 1223047, avg: 87360,  max: 101828, min: 75621 },
  { name: "Ali Qashqaee",          participations: 11, absences: 3, nonMembre: 0, total: 945230,  avg: 85930,  max: 93340,  min: 74620 },
  { name: "Tralala Patatra",       participations: 11, absences: 3, nonMembre: 0, total: 905060,  avg: 82278,  max: 108030, min: 39390 },
  { name: "Zakihiro",              participations: 13, absences: 1, nonMembre: 0, total: 1057550, avg: 81350,  max: 95160,  min: 72670 },
  { name: "minitire",              participations:  9, absences: 5, nonMembre: 0, total: 730570,  avg: 81174,  max: 94510,  min: 61100 },
  { name: "Pierre-Henri Petiphar", participations:  8, absences: 6, nonMembre: 0, total: 597870,  avg: 74733,  max: 88010,  min: 64610 },
  { name: "Gobie Di Massilia",     participations: 14, absences: 0, nonMembre: 0, total: 964481,  avg: 68891,  max: 76303,  min: 59597 },
  { name: "Magalie Havet",         participations:  5, absences: 9, nonMembre: 0, total: 343530,  avg: 68706,  max: 74690,  min: 55660 },
  { name: "Erwan Le Goff",         participations: 14, absences: 0, nonMembre: 0, total: 959790,  avg: 68556,  max: 78260,  min: 59670 },
  { name: "mrmagoo8o",             participations: 12, absences: 2, nonMembre: 0, total: 805400,  avg: 67116,  max: 77090,  min: 61620 },
  { name: "Pascal Mirolles",       participations: 13, absences: 1, nonMembre: 0, total: 868350,  avg: 66796,  max: 77480,  min: 52080 },
  { name: "Christophe Givanino",   participations:  5, absences: 9, nonMembre: 0, total: 330330,  avg: 66066,  max: 70200,  min: 61750 },
  { name: "Nicolas Romain",        participations: 14, absences: 0, nonMembre: 0, total: 910660,  avg: 65047,  max: 73970,  min: 49790 },
  { name: "Patrick Perez",         participations: 14, absences: 0, nonMembre: 0, total: 862680,  avg: 61620,  max: 70330,  min: 33670 },
  { name: "Ingrid Hlcp",           participations: 14, absences: 0, nonMembre: 0, total: 836020,  avg: 59715,  max: 67210,  min: 51480 },
  { name: "Gatien Barresi",        participations: 11, absences: 3, nonMembre: 0, total: 643370,  avg: 58488,  max: 71630,  min: 30940 },
  { name: "Yamn Alchehabi",        participations:  7, absences: 7, nonMembre: 0, total: 384150,  avg: 54878,  max: 74360,  min: 3120 },
  { name: "ericboboss",            participations:  6, absences: 8, nonMembre: 0, total: 325390,  avg: 54231,  max: 60710,  min: 39650 },
  { name: "Mathilde 231",          participations: 14, absences: 0, nonMembre: 0, total: 693220,  avg: 49515,  max: 60720,  min: 43290 },
  { name: "Paul Pires",            participations: 13, absences: 1, nonMembre: 0, total: 613420,  avg: 47186,  max: 52910,  min: 39150 },
  { name: "Dom Dom",               participations:  7, absences: 3, nonMembre: 4, total: 298700,  avg: 42671,  max: 62270,  min: 6890 },
  { name: "Bruno Zunino",          participations:  8, absences: 6, nonMembre: 0, total: 181560,  avg: 22695,  max: 36270,  min: 16620 },
  { name: "Isa S. Goncalves",      participations:  8, absences: 0, nonMembre: 6, total: 177720,  avg: 22215,  max: 32630,  min: 9900 },
  { name: "Sergio Goncalves",      participations:  8, absences: 0, nonMembre: 6, total: 127180,  avg: 15897,  max: 33930,  min: 6990 },
  { name: "IllogicalCall83",       participations:  6, absences: 1, nonMembre: 7, total: 87330,   avg: 14555,  max: 18150,  min: 11430 },
  { name: "GrumpyWonder5",         participations:  7, absences: 0, nonMembre: 7, total: 69730,   avg: 9961,   max: 13170,  min: 5720 },
  { name: "AssassinFood42",        participations:  1, absences: 0, nonMembre: 13, total: 56680,  avg: 56680,  max: 56680,  min: 56680 },
];

const fmt = (v) => v >= 1000000 ? (v/1000000).toFixed(2)+"M" : v >= 1000 ? (v/1000).toFixed(0)+"K" : v;
const fmtFull = (v) => v.toLocaleString("fr-FR");

const getPresenceColor = (p) => {
  if (p >= 13) return "#4ade80";
  if (p >= 10) return "#86efac";
  if (p >= 7)  return "#facc15";
  if (p >= 4)  return "#fb923c";
  return "#f87171";
};

const getPresenceLabel = (p, nonMembre) => {
  if (nonMembre > 8) return { label: "Nouveau", color: "#a78bfa" };
  if (p >= 13) return { label: "Pilier", color: "#4ade80" };
  if (p >= 10) return { label: "Régulier", color: "#86efac" };
  if (p >= 7)  return { label: "Occasionnel", color: "#facc15" };
  return { label: "Rare", color: "#f87171" };
};

const TABS = ["Meilleurs scores", "Régularité", "Vue globale"];

const short = (name) => name.length > 14 ? name.split(" ")[0] : name;

export default function App() {
  const [tab, setTab] = useState(0);
  const [sortKey, setSortKey] = useState("avg");

  const sorted = [...players].sort((a, b) => b[sortKey] - a[sortKey]);
  const top5avg = [...players].sort((a,b) => b.avg - a.avg).slice(0,5);
  const top5total = [...players].sort((a,b) => b.total - a.total).slice(0,5);
  const top5presence = [...players].sort((a,b) => b.participations - a.participations).slice(0,8);

  const CustomBarTooltip = ({ active, payload }) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
      <div style={{ background:"rgba(5,13,26,0.97)", border:"1px solid #1e3a5f", borderRadius:10, padding:"12px 16px", fontFamily:"'IBM Plex Mono',monospace", fontSize:12 }}>
        <div style={{ color:"#e2e8f0", fontWeight:"bold", marginBottom:6 }}>{d.name}</div>
        <div style={{ color:"#38bdf8" }}>Moy: <b>{fmtFull(d.avg)}</b></div>
        <div style={{ color:"#a78bfa" }}>Max: <b>{fmtFull(d.max)}</b></div>
        <div style={{ color:"#94a3b8" }}>Participations: <b>{d.participations}/{TOTAL_PARTIES}</b></div>
      </div>
    );
  };

  return (
    <div style={{ minHeight:"100vh", background:"#030b16", fontFamily:"'IBM Plex Mono',monospace", padding:"28px 20px", boxSizing:"border-box", position:"relative", overflow:"hidden" }}>
      {/* bg texture */}
      <div style={{ position:"absolute", inset:0, opacity:0.03, backgroundImage:"radial-gradient(#38bdf8 1px, transparent 1px)", backgroundSize:"28px 28px", pointerEvents:"none" }} />
      <div style={{ position:"absolute", top:0, left:"50%", transform:"translateX(-50%)", width:"80%", height:2, background:"linear-gradient(90deg, transparent, #38bdf8, #a78bfa, transparent)", opacity:0.5 }} />

      <div style={{ maxWidth:960, margin:"0 auto", position:"relative" }}>

        {/* Header */}
        <div style={{ marginBottom:28, borderLeft:"3px solid #38bdf8", paddingLeft:16 }}>
          <div style={{ color:"#38bdf8", fontSize:10, letterSpacing:"0.3em", textTransform:"uppercase", marginBottom:4 }}>Guilde Bernard</div>
          <h1 style={{ margin:0, fontSize:"clamp(20px,3.5vw,32px)", color:"#e2e8f0", fontWeight:"bold", letterSpacing:"-0.02em" }}>
            Analyse des Joueurs
          </h1>
          <div style={{ color:"#475569", fontSize:11, marginTop:4 }}>{players.length} joueurs · {TOTAL_PARTIES} parties analysées</div>
        </div>

        {/* Summary pills */}
        <div style={{ display:"flex", gap:10, flexWrap:"wrap", marginBottom:24 }}>
          {[
            { label:"Piliers (13-14/14)", count: players.filter(p=>p.participations>=13 && p.nonMembre<5).length, color:"#4ade80" },
            { label:"Réguliers (10-12/14)", count: players.filter(p=>p.participations>=10 && p.participations<13 && p.nonMembre<5).length, color:"#86efac" },
            { label:"Occasionnels (7-9/14)", count: players.filter(p=>p.participations>=7 && p.participations<10 && p.nonMembre<5).length, color:"#facc15" },
            { label:"Rares (<7/14)", count: players.filter(p=>p.participations<7 && p.nonMembre<5).length, color:"#f87171" },
            { label:"Nouveaux membres", count: players.filter(p=>p.nonMembre>=5).length, color:"#a78bfa" },
          ].map((s,i) => (
            <div key={i} style={{ display:"flex", alignItems:"center", gap:8, background:"rgba(15,23,42,0.8)", border:`1px solid ${s.color}44`, borderRadius:20, padding:"6px 14px" }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:s.color }} />
              <span style={{ color:"#94a3b8", fontSize:11 }}>{s.label}</span>
              <span style={{ color:s.color, fontWeight:"bold", fontSize:13 }}>{s.count}</span>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display:"flex", gap:4, marginBottom:24, background:"rgba(15,23,42,0.6)", borderRadius:10, padding:4, width:"fit-content" }}>
          {TABS.map((t,i) => (
            <button key={i} onClick={()=>setTab(i)} style={{
              background: tab===i ? "linear-gradient(135deg,#1e40af,#1e3a5f)" : "transparent",
              border: tab===i ? "1px solid #3b82f6" : "1px solid transparent",
              borderRadius:8, padding:"8px 16px", color: tab===i ? "#e2e8f0" : "#475569",
              cursor:"pointer", fontSize:12, fontFamily:"inherit", fontWeight: tab===i ? "bold" : "normal",
              transition:"all 0.2s",
            }}>{t}</button>
          ))}
        </div>

        {/* TAB 0: Meilleurs scores */}
        {tab===0 && (
          <div style={{ animation:"fadeIn 0.4s ease" }}>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
              {/* Top avg */}
              <div style={{ background:"rgba(15,23,42,0.8)", border:"1px solid #1e3a5f", borderRadius:14, padding:"18px 16px" }}>
                <div style={{ color:"#38bdf8", fontSize:10, letterSpacing:"0.2em", marginBottom:12 }}>🥇 TOP 5 SCORE MOYEN</div>
                {top5avg.map((p,i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                    <div style={{ color:["#ffd700","#c0c0c0","#cd7f32","#94a3b8","#64748b"][i], fontWeight:"bold", fontSize:14, width:18 }}>{i+1}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ color:"#e2e8f0", fontSize:12 }}>{p.name}</div>
                      <div style={{ height:4, background:"#1e3a5f", borderRadius:2, marginTop:3 }}>
                        <div style={{ height:4, background:`linear-gradient(90deg,#38bdf8,#a78bfa)`, borderRadius:2, width:`${(p.avg/top5avg[0].avg)*100}%`, transition:"width 0.8s" }} />
                      </div>
                    </div>
                    <div style={{ color:"#38bdf8", fontWeight:"bold", fontSize:13, minWidth:58, textAlign:"right" }}>{fmt(p.avg)}</div>
                  </div>
                ))}
              </div>
              {/* Top total */}
              <div style={{ background:"rgba(15,23,42,0.8)", border:"1px solid #1e3a5f", borderRadius:14, padding:"18px 16px" }}>
                <div style={{ color:"#a78bfa", fontSize:10, letterSpacing:"0.2em", marginBottom:12 }}>⭐ TOP 5 SCORE TOTAL</div>
                {top5total.map((p,i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                    <div style={{ color:["#ffd700","#c0c0c0","#cd7f32","#94a3b8","#64748b"][i], fontWeight:"bold", fontSize:14, width:18 }}>{i+1}</div>
                    <div style={{ flex:1 }}>
                      <div style={{ color:"#e2e8f0", fontSize:12 }}>{p.name}</div>
                      <div style={{ height:4, background:"#1e3a5f", borderRadius:2, marginTop:3 }}>
                        <div style={{ height:4, background:`linear-gradient(90deg,#a78bfa,#ec4899)`, borderRadius:2, width:`${(p.total/top5total[0].total)*100}%`, transition:"width 0.8s" }} />
                      </div>
                    </div>
                    <div style={{ color:"#a78bfa", fontWeight:"bold", fontSize:13, minWidth:58, textAlign:"right" }}>{fmt(p.total)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bar chart */}
            <div style={{ background:"rgba(15,23,42,0.8)", border:"1px solid #1e3a5f", borderRadius:14, padding:"18px 12px 12px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14, paddingLeft:8 }}>
                <div style={{ color:"#94a3b8", fontSize:10, letterSpacing:"0.2em" }}>SCORE MOYEN PAR JOUEUR (participants réguliers)</div>
              </div>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={players.filter(p=>p.participations>=7 && p.nonMembre<5).sort((a,b)=>b.avg-a.avg)} margin={{top:5,right:10,bottom:60,left:10}}>
                  <XAxis dataKey="name" tick={{ fill:"#475569", fontSize:9, fontFamily:"IBM Plex Mono" }} angle={-45} textAnchor="end" interval={0} tickFormatter={short} axisLine={false} tickLine={false} />
                  <YAxis tickFormatter={fmt} tick={{ fill:"#475569", fontSize:9 }} axisLine={false} tickLine={false} width={44} />
                  <Tooltip content={<CustomBarTooltip />} />
                  <Bar dataKey="avg" radius={[4,4,0,0]}>
                    {players.filter(p=>p.participations>=7 && p.nonMembre<5).sort((a,b)=>b.avg-a.avg).map((p,i) => (
                      <Cell key={i} fill={`hsl(${200 - i*5},80%,${60-i*1.5}%)`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* TAB 1: Régularité */}
        {tab===1 && (
          <div style={{ animation:"fadeIn 0.4s ease" }}>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(260px,1fr))", gap:12 }}>
              {[...players].sort((a,b)=>b.participations-a.participations).map((p,i) => {
                const pct = (p.participations/TOTAL_PARTIES)*100;
                const badge = getPresenceLabel(p.participations, p.nonMembre);
                const presColor = getPresenceColor(p.participations);
                return (
                  <div key={i} style={{ background:"rgba(15,23,42,0.8)", border:`1px solid ${presColor}22`, borderRadius:12, padding:"14px 16px", position:"relative", overflow:"hidden" }}>
                    <div style={{ position:"absolute", top:0, left:0, height:"100%", width:`${pct}%`, background:`${presColor}08`, borderRadius:12, pointerEvents:"none" }} />
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                      <div style={{ color:"#e2e8f0", fontSize:12, fontWeight:"bold", lineHeight:1.3 }}>{p.name}</div>
                      <div style={{ background:badge.color+"22", border:`1px solid ${badge.color}55`, borderRadius:6, padding:"2px 8px", color:badge.color, fontSize:9, whiteSpace:"nowrap", marginLeft:6 }}>
                        {badge.label}
                      </div>
                    </div>
                    {/* presence bar */}
                    <div style={{ display:"flex", gap:3, marginBottom:8 }}>
                      {Array.from({length:TOTAL_PARTIES}).map((_,j) => {
                        let color = "#1e3a5f";
                        if (j < p.participations) color = presColor;
                        return <div key={j} style={{ flex:1, height:6, borderRadius:2, background:color, transition:"background 0.3s" }} />;
                      })}
                    </div>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:10 }}>
                      <span style={{ color:presColor, fontWeight:"bold" }}>{p.participations}/{TOTAL_PARTIES} parties</span>
                      {p.absences > 0 && <span style={{ color:"#64748b" }}>{p.absences} abs.</span>}
                      {p.nonMembre > 0 && <span style={{ color:"#a78bfa" }}>{p.nonMembre} avant</span>}
                      <span style={{ color:"#94a3b8" }}>moy. {fmt(p.avg)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: Vue globale */}
        {tab===2 && (
          <div style={{ animation:"fadeIn 0.4s ease" }}>
            {/* Sort */}
            <div style={{ display:"flex", gap:8, marginBottom:16, flexWrap:"wrap" }}>
              <span style={{ color:"#475569", fontSize:11, alignSelf:"center" }}>Trier par :</span>
              {[{k:"avg",l:"Score moyen"},{k:"total",l:"Total"},{k:"max",l:"Record"},{k:"participations",l:"Présence"}].map(s => (
                <button key={s.k} onClick={()=>setSortKey(s.k)} style={{
                  background: sortKey===s.k ? "#1e3a5f" : "rgba(15,23,42,0.6)",
                  border: `1px solid ${sortKey===s.k ? "#38bdf8" : "#1e3a5f"}`,
                  borderRadius:6, padding:"5px 12px", color: sortKey===s.k ? "#38bdf8" : "#64748b",
                  cursor:"pointer", fontSize:11, fontFamily:"inherit",
                }}>{s.l}</button>
              ))}
            </div>

            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:11 }}>
                <thead>
                  <tr style={{ borderBottom:"1px solid #1e3a5f" }}>
                    {["#","Joueur","Présence","Moy/partie","Total","Record","Statut"].map((h,i) => (
                      <th key={i} style={{ padding:"8px 10px", color:"#475569", textAlign:i===1?"left":"center", fontWeight:"normal", letterSpacing:"0.1em", fontSize:10 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((p,i) => {
                    const badge = getPresenceLabel(p.participations, p.nonMembre);
                    const presColor = getPresenceColor(p.participations);
                    return (
                      <tr key={i} style={{ borderBottom:"1px solid #0f1c2e", transition:"background 0.15s" }}
                        onMouseEnter={e=>e.currentTarget.style.background="#0d1f35"}
                        onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                        <td style={{ padding:"9px 10px", color:"#334155", textAlign:"center" }}>{i+1}</td>
                        <td style={{ padding:"9px 10px", color:"#e2e8f0", fontWeight:"bold" }}>{p.name}</td>
                        <td style={{ padding:"9px 10px", textAlign:"center" }}>
                          <span style={{ color:presColor, fontWeight:"bold" }}>{p.participations}</span>
                          <span style={{ color:"#334155" }}>/{TOTAL_PARTIES}</span>
                        </td>
                        <td style={{ padding:"9px 10px", color:"#38bdf8", textAlign:"center", fontWeight:"bold" }}>{fmtFull(p.avg)}</td>
                        <td style={{ padding:"9px 10px", color:"#94a3b8", textAlign:"center" }}>{fmt(p.total)}</td>
                        <td style={{ padding:"9px 10px", color:"#a78bfa", textAlign:"center" }}>{fmtFull(p.max)}</td>
                        <td style={{ padding:"9px 10px", textAlign:"center" }}>
                          <span style={{ background:badge.color+"22", border:`1px solid ${badge.color}55`, borderRadius:5, padding:"2px 8px", color:badge.color, fontSize:9 }}>{badge.label}</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;700&display=swap');
        @keyframes fadeIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </div>
  );
}
