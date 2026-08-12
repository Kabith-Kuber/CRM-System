"use client";

import { ChangeEvent, useEffect, useState } from "react";

type View = "Command center" | "Failure scanner" | "Onboarding" | "Sales engineer" | "CRM" | "ROI report" | "Customer health";
type Lifecycle = "Signal found" | "Ticket created" | "Email drafted" | "Email sent" | "Discovery booked" | "Pilot active";

const SELF_EMAIL = "kabith29@gmail.com";
function openSelfGmail(subject: string, body: string) {
  const params = new URLSearchParams({ view: "cm", fs: "1", to: SELF_EMAIL, su: subject, body });
  window.open(`https://mail.google.com/mail/u/0/?${params.toString()}`, "_blank", "noopener,noreferrer");
}

const prospects = [
  { name: "Decagon", contact: "Jordan Lee", role: "VP Applied AI", signal: "Scaling customer-support agents", stack: "OpenAI · LangGraph · Postgres", score: 94, stage: "Pilot", value: 42000 },
  { name: "Glean", contact: "Priya Shah", role: "AI Platform Lead", signal: "Agentic enterprise search", stack: "Anthropic · RAG · Kubernetes", score: 91, stage: "Discovery", value: 56000 },
  { name: "Intercom", contact: "Maya Chen", role: "Head of AI", signal: "Fin deployed in production", stack: "OpenAI · Tool calling · Snowflake", score: 88, stage: "Qualified", value: 38000 },
  { name: "Harvey", contact: "Alex Morgan", role: "Product AI", signal: "High-stakes legal workflows", stack: "Azure OpenAI · RAG · Python", score: 83, stage: "Prospecting", value: 48000 },
];

const customerHealth = [
  { name: "Northstar AI", health: 94, agents: 6, traces: "1.8M", impact: "+22% quality", expansion: "Connect 4 more agents", tone: "strong" },
  { name: "Relay Support", health: 81, agents: 3, traces: "620k", impact: "-31% retries", expansion: "Add support operations", tone: "strong" },
  { name: "Atlas Copilot", health: 68, agents: 2, traces: "190k", impact: "+9% quality", expansion: "Activate replay evals", tone: "watch" },
  { name: "Draft Legal", health: 52, agents: 1, traces: "48k", impact: "Setup incomplete", expansion: "Onboarding intervention", tone: "risk" },
];

const nav: { view: View; icon: string }[] = [
  { view: "Command center", icon: "▦" }, { view: "Failure scanner", icon: "⌁" }, { view: "Onboarding", icon: "↳" },
  { view: "Sales engineer", icon: "✦" }, { view: "CRM", icon: "◎" }, { view: "ROI report", icon: "$" }, { view: "Customer health", icon: "♥" },
];

export default function DemoPage() {
  const [view, setView] = useState<View>("Command center");
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState(0);
  const [lifecycle, setLifecycle] = useState<Lifecycle>("Signal found");
  const [toast, setToast] = useState("");
  const [briefOpen, setBriefOpen] = useState(false);
  const [metrics, setMetrics] = useState([0, 0, 0, 0]);
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 3200); };
  useEffect(() => { const target = [48, 12, 3, 184]; const id = window.setInterval(() => setMetrics(values => values.map((value, i) => value >= target[i] ? value : Math.min(target[i], value + Math.max(1, Math.ceil(target[i] / 22))))), 42); return () => window.clearInterval(id); }, []);
  const prospect = prospects[selected];
  return <main className={`gtm-demo-v2 ${collapsed ? "sidebar-closed" : ""}`}>
    <aside className="v2-sidebar">
      <div className="v2-brand"><a href="/">moda<span>/gtm</span></a><button aria-label="Collapse navigation" onClick={() => setCollapsed(!collapsed)}>☰</button></div>
      <div className="v2-workspace"><small>WORKSPACE</small><b>Revenue learning OS</b><span>Interactive prototype</span></div>
      <nav>{nav.map(item => <button key={item.view} className={view === item.view ? "active" : ""} onClick={() => setView(item.view)} title={item.view}><i>{item.icon}</i><span>{item.view}</span></button>)}</nav>
      <div className="v2-status"><i /> <span><b>All systems live</b><small>Demo data · synced now</small></span></div>
    </aside>
    <section className="v2-main">
      <header className="v2-header"><div><p>MODA GTM ENGINE / LIVE SIMULATION</p><h1>{view}</h1></div><div className="v2-header-actions"><button className="generate-brief" onClick={() => { setBriefOpen(!briefOpen); notify(briefOpen ? "Brief closed." : "Daily GTM brief generated."); }}>✦ Generate brief</button><div className="v2-avatar">PB</div></div></header>
      {briefOpen && <section className="v2-brief"><span>DAILY BRIEF · 9:42 ET</span><b>Decagon is ready for a trace review. Northstar AI is an expansion candidate. Draft Legal needs onboarding help.</b><button onClick={() => { setView("CRM"); setBriefOpen(false); }}>Open action queue →</button></section>}
      {view === "Command center" && <CommandCenter metrics={metrics} lifecycle={lifecycle} setLifecycle={setLifecycle} setView={setView} notify={notify} />}
      {view === "Failure scanner" && <FailureScanner setLifecycle={setLifecycle} setView={setView} notify={notify} />}
      {view === "Onboarding" && <Onboarding notify={notify} />}
      {view === "Sales engineer" && <SalesEngineer selected={selected} setSelected={setSelected} lifecycle={lifecycle} setLifecycle={setLifecycle} notify={notify} />}
      {view === "CRM" && <CRM selected={selected} setSelected={setSelected} lifecycle={lifecycle} setLifecycle={setLifecycle} setView={setView} notify={notify} />}
      {view === "ROI report" && <ROIReport notify={notify} />}
      {view === "Customer health" && <HealthEngine notify={notify} />}
    </section>
    {toast && <div className="v2-toast"><b>✓</b><span>{toast}</span><button onClick={() => setToast("")}>Dismiss</button></div>}
  </main>;
}

function CommandCenter({ metrics, lifecycle, setLifecycle, setView, notify }: any) {
  return <><section className="v2-metrics"><Metric value={metrics[0]} label="High-fit accounts" note="+8 this week"/><Metric value={metrics[1]} label="Active conversations" note="3 need action"/><Metric value={metrics[2]} label="Live pilots" note="1 closes this month"/><Metric value={`$${metrics[3]}k`} label="Qualified pipeline" note="↑ 18% this week"/></section>
    <section className="v2-hero-grid"><article className="v2-card command-story"><div className="v2-card-head"><div><h2>One concern, fully automated</h2><p>Watch Moda’s GTM system turn a production signal into a pilot.</p></div><span className="live-pill">LIVE</span></div><Lifecycle state={lifecycle} setState={setLifecycle} notify={notify}/></article>
    <article className="v2-card today"><div className="v2-card-head"><div><h2>Today’s priorities</h2><p>Ranked by revenue impact</p></div></div><button onClick={() => setView("Failure scanner")}><i className="red">1</i><span><b>Analyze Decagon trace sample</b><small>Reliability concern detected</small></span><em>Now</em></button><button onClick={() => setView("Sales engineer")}><i className="yellow">2</i><span><b>Prepare Glean discovery</b><small>Technical buyer replied</small></span><em>Today</em></button><button onClick={() => setView("Customer health")}><i className="green">3</i><span><b>Review Northstar expansion</b><small>4 unconnected agents found</small></span><em>This week</em></button></article></section>
    <section className="solution-grid">{[
      ["⌁","Agent Failure Scanner","Trace sample → top failure patterns","Failure scanner"],["↳","Automated Onboarding","Signup → useful dashboard in <10 min","Onboarding"],["✦","AI Sales Engineer","Prospect research → tailored demo","Sales engineer"],["◎","Stack Intelligence","Signals → high-intent CRM targets","CRM"],["$","ROI Report","Reliability impact → dollars","ROI report"],["♥","Expansion Engine","Usage → health and growth actions","Customer health"]
    ].map(x => <button key={x[1]} onClick={() => setView(x[3] as View)}><i>{x[0]}</i><b>{x[1]}</b><span>{x[2]}</span><em>Open →</em></button>)}</section></>;
}

function FailureScanner({ setLifecycle, setView, notify }: any) {
  const [file, setFile] = useState(""); const [running, setRunning] = useState(false); const [done, setDone] = useState(false);
  const analyze = () => { setRunning(true); setDone(false); window.setTimeout(() => { setRunning(false); setDone(true); setLifecycle("Ticket created"); notify("Scan complete: 5 failure families detected and CRM ticket created."); }, 1500); };
  const upload = (event: ChangeEvent<HTMLInputElement>) => { const next = event.target.files?.[0]; if (next) { setFile(next.name); setDone(false); notify(`${next.name} loaded locally.`); } };
  return <section className="scanner-layout"><article className="v2-card scanner-input"><div className="eyeline">INSTANT VALUE DEMO</div><h2>Show a prospect what Moda finds in their traces.</h2><p>Upload JSON, JSONL, CSV, or a log export. This prototype analyzes locally and does not transmit the file.</p><label className="upload-zone"><input type="file" accept=".json,.jsonl,.csv,.txt,.log" onChange={upload}/><i>⇧</i><b>{file || "Drop a trace export here"}</b><span>{file ? "Ready to analyze" : "or click to select a sample"}</span></label><div className="scanner-buttons"><button className="v2-primary" onClick={() => { setFile("decagon_support_traces.jsonl"); notify("Sample trace set loaded."); }}>Load sample data</button><button onClick={analyze} disabled={running || !file}>{running ? "Scanning 1,284 traces…" : "Run failure scan →"}</button></div>{running && <div className="scan-progress"><span/><b>Clustering failures and attributing root causes…</b></div>}</article>
    <article className={`v2-card scan-results ${done ? "revealed" : ""}`}><div className="v2-card-head"><div><h2>Failure pattern report</h2><p>{done ? "1,284 production traces analyzed" : "Results appear after the scan"}</p></div>{done && <span className="complete-pill">COMPLETE</span>}</div>{done ? <><div className="failure-bars">{[["Tool calls",18],["Retrieval",11],["Memory",7],["Workflow loops",5],["Prompt ambiguity",4]].map((x,i) => <div key={x[0]}><span>{x[0]}</span><div><i style={{width:`${Number(x[1])*4.7}%`}}/></div><b>{x[1]}%</b><em>{[231,141,90,64,51][i]} runs</em></div>)}</div><div className="fix-summary"><span>HERE’S WHAT MODA COULD FIX</span><b>Add a tool-call verifier, repair stale retrieval, and create 37 replay evals from the highest-impact failures.</b><button onClick={() => { setLifecycle("Ticket created"); setView("CRM"); }}>Create CRM opportunity →</button></div></> : <div className="empty-result"><i>⌁</i><b>No scan yet</b><span>Load the sample to run the instant demo.</span></div>}</article></section>;
}

function Onboarding({ notify }: any) {
  const [step, setStep] = useState(0); const [connected, setConnected] = useState<string[]>([]); const [detecting, setDetecting] = useState(false);
  const connectors = ["OpenAI", "Anthropic", "LangGraph", "LangSmith", "Custom JSON", "S3 export"];
  const detect = () => { setDetecting(true); window.setTimeout(() => { setDetecting(false); setStep(1); setConnected(["OpenAI","LangGraph","Custom JSON"]); notify("Stack detected: OpenAI + LangGraph + custom tool traces."); }, 1200); };
  return <section className="onboard-page"><article className="v2-card onboarding-main"><div className="eyeline">AUTOMATED CUSTOMER ONBOARDING</div><h2>Useful Moda dashboard in under 10 minutes.</h2><div className="onboarding-timeline">{["Detect stack","Map trace schema","Configure signals","First dashboard"].map((x,i)=><div className={i<=step?"done":""} key={x}><span>{i<step?"✓":i+1}</span><b>{x}</b><small>{["Framework + models","Messages + tool calls","Quality + safety","Patterns + next fixes"][i]}</small></div>)}</div><div className="connector-grid">{connectors.map(x=><button key={x} className={connected.includes(x)?"connected":""} onClick={()=>setConnected(current=>current.includes(x)?current.filter(y=>y!==x):[...current,x])}><i>{connected.includes(x)?"✓":"+"}</i><b>{x}</b><span>{connected.includes(x)?"Connected":"Available"}</span></button>)}</div><div className="onboard-actions"><button className="v2-primary" onClick={detect}>{detecting?"Detecting environment…":"Auto-detect stack"}</button><button onClick={()=>{setStep(Math.min(3,step+1));notify(step>=2?"First Moda dashboard created in 08:42.":"Onboarding advanced.")}} disabled={step===0}>Continue setup →</button></div></article>
    <article className="v2-card detected-stack"><h3>Detected environment</h3><dl><dt>Framework</dt><dd>{step?"LangGraph 0.2":"Waiting…"}</dd><dt>Models</dt><dd>{step?"GPT-4.1 + o3":"Waiting…"}</dd><dt>Tools</dt><dd>{step?"refund, search, escalate":"Waiting…"}</dd><dt>Trace shape</dt><dd>{step?"OpenTelemetry + custom events":"Waiting…"}</dd></dl><div className="time-goal"><span>TIME TO VALUE</span><b>{step===3?"08:42":"< 10:00"}</b><small>{step===3?"Dashboard live":"Target"}</small></div></article></section>;
}

function SalesEngineer({ selected, setSelected, lifecycle, setLifecycle, notify }: any) {
  const [generated, setGenerated] = useState(false); const [sending, setSending] = useState(false); const prospect = prospects[selected];
  const send = () => { const subject = `What Moda could learn from ${prospect.name}'s agent traces`; const body = `Demo prospect: ${prospect.contact}, ${prospect.role}\n\nHi Kabith — this is the self-routed version of a personalized Moda follow-up for ${prospect.name}.\n\nSignal: ${prospect.signal}\nStack: ${prospect.stack}\n\nModa would identify the top recurring failures, attribute them to the right harness layer, and validate the safest improvement against historical runs.\n\nSuggested CTA: 20-minute trace review.`; setSending(true); openSelfGmail(subject, body); window.setTimeout(()=>{setSending(false);setLifecycle("Email sent");notify(`Gmail opened with the ${prospect.name} email addressed to ${SELF_EMAIL}.`);},600); };
  return <section className="sales-page"><article className="v2-card prospect-input"><div className="eyeline">AI SALES ENGINEER</div><h2>Prepare every technical sales call in minutes.</h2><label>Prospect<select value={selected} onChange={e=>{setSelected(Number(e.target.value));setGenerated(false)}}>{prospects.map((x,i)=><option key={x.name} value={i}>{x.name} — {x.contact}</option>)}</select></label><div className="prospect-facts"><span>TRIGGER<b>{prospect.signal}</b></span><span>STACK<b>{prospect.stack}</b></span><span>BUYER<b>{prospect.contact} · {prospect.role}</b></span></div><button className="v2-primary full" onClick={()=>{setGenerated(true);notify("Technical account brief generated.")}}>✦ Generate sales brief</button></article>
    <article className="v2-card sales-output"><div className="v2-card-head"><div><h2>Technical account brief</h2><p>{generated?`Prepared for ${prospect.name}`:"Select a prospect and generate"}</p></div></div>{generated?<div className="battlecard">
      <div className="self-recipient"><span>SAFE DEMO RECIPIENT</span><b>{SELF_EMAIL}</b><small>Every prospect email is routed to your inbox.</small></div>
      <section><span>LIKELY PAIN</span><b>Production failures are visible, but root-cause attribution across tools, retrieval, and workflows is slow.</b></section><section><span>INTEGRATION PLAN</span><b>Ingest {prospect.stack}; map tool events; baseline the top three failure families.</b></section><section><span>DEMO ANGLE</span><b>Use their support workflow to demonstrate trace → diagnosis → validated fix.</b></section><section><span>OBJECTION</span><b>“We already have tracing.” Response: tracing shows what happened; Moda recommends and validates what to change.</b></section>
      <div className="email-composer"><span>FOLLOW-UP EMAIL · TO {SELF_EMAIL}</span><h3>Subject: what Moda could learn from {prospect.name}’s agent traces</h3><p>Hi Kabith — this is the self-routed version of the personalized follow-up for {prospect.name}. The original prospect context stays visible, but the recipient is always you.</p><div><button onClick={()=>{navigator.clipboard?.writeText(`Subject: what Moda could learn from ${prospect.name}'s agent traces`);notify("Email copied.")}}>Copy</button><button className="v2-primary" onClick={send} disabled={sending}>{sending?"Opening Gmail…":lifecycle==="Email sent"?"✓ Open again in Gmail":"Open ready-to-send Gmail"}</button><a href="https://mail.google.com/mail/u/0/#sent" target="_blank" rel="noreferrer">View sent mail ↗</a></div></div></div>:<div className="empty-result"><i>✦</i><b>No brief yet</b><span>The agent will generate pain, integration, demo, objections, and follow-up.</span></div>}</article></section>;
}

function CRM({ selected, setSelected, lifecycle, setLifecycle, setView, notify }: any) {
  const prospect=prospects[selected]; const [ticket,setTicket]=useState(lifecycle!=="Signal found");
  return <section className="crm-page"><article className="v2-card crm-table"><div className="v2-card-head"><div><h2>Agent-stack pipeline</h2><p>Scored by deployment signal and reliability exposure</p></div><button onClick={()=>notify("Pipeline filtered to scores above 85.")}>Score ≥ 85</button></div><div className="crm-head"><span>Account</span><span>Signal + stack</span><span>Stage</span><span>Fit</span><span>Value</span></div>{prospects.map((x,i)=><button key={x.name} className={selected===i?"selected":""} onClick={()=>setSelected(i)}><b>{x.name}<small>{x.contact}</small></b><span>{x.signal}<small>{x.stack}</small></span><em>{x.stage}</em><i>{x.score}</i><strong>${(x.value/1000).toFixed(0)}k</strong></button>)}</article>
    <article className="v2-card crm-record"><div className="record-title"><div>{prospect.name[0]}</div><span><small>CRM RECORD</small><b>{prospect.name}</b><em>{prospect.contact} · {prospect.role}</em></span><button onClick={()=>notify(`${prospect.name} CRM record opened.`)}>Open CRM</button></div><div className="record-signal"><span>WHY NOW</span><b>{prospect.signal}</b><small>{prospect.stack}</small></div><div className="ticket-box"><span>RELIABILITY CONCERN</span><b>Tool failures are reducing successful task completion.</b><button onClick={()=>{setTicket(true);setLifecycle("Ticket created");notify("Reliability ticket created and assigned to solutions.")}}>{ticket?"✓ Ticket created":"Create ticket"}</button></div><div className="record-actions"><button onClick={()=>{setLifecycle("Email drafted");setView("Sales engineer");}}>Generate email →</button><button onClick={()=>{setLifecycle("Discovery booked");notify("Technical discovery booked.")}}>Book discovery</button></div></article><Lifecycle state={lifecycle} setState={setLifecycle} notify={notify}/></section>;
}

function ROIReport({ notify }: any) {
  const [traces,setTraces]=useState(24000); const [failure,setFailure]=useState(12); const failed=Math.round(traces*failure/100); const hours=Math.round(failed*0.16); const tasks=Math.round(failed*0.62); const recovery=Math.round(tasks*18);
  return <section className="roi-page"><article className="v2-card roi-controls"><div className="eyeline">AUTOMATED ROI REPORT</div><h2>Translate technical reliability into dollars.</h2><label>Monthly agent sessions<b>{traces.toLocaleString()}</b><input type="range" min="5000" max="100000" step="1000" value={traces} onChange={e=>setTraces(Number(e.target.value))}/></label><label>Observed failure rate<b>{failure}%</b><input type="range" min="2" max="30" value={failure} onChange={e=>setFailure(Number(e.target.value))}/></label><button className="v2-primary full" onClick={()=>notify("ROI report exported for the executive buyer.")}>Export executive report →</button></article><article className="v2-card roi-report"><div className="report-brand"><span>MODA IMPACT MODEL</span><b>Projected monthly opportunity</b></div><div className="roi-hero"><span>RECOVERABLE VALUE</span><b>${recovery.toLocaleString()}</b><small>Estimated from failed-task recovery</small></div><div className="roi-stat-grid"><span><b>{failed.toLocaleString()}</b>failed sessions identified</span><span><b>{hours.toLocaleString()}</b>support hours affected</span><span><b>{tasks.toLocaleString()}</b>recoverable tasks</span><span><b>3</b>priority fixes</span></div><blockquote>“Moda identified {failed.toLocaleString()} failed sessions. Fixing the top three issues could recover approximately ${recovery.toLocaleString()} in monthly value.”</blockquote></article></section>;
}

function HealthEngine({ notify }: any) {
  const [selected,setSelected]=useState(0);
  const [xp,setXp]=useState(680);
  const [completed,setCompleted]=useState<string[]>([]);
  const customer=customerHealth[selected];
  const level=customer.health>=90?"Champion":customer.health>=75?"Growing":customer.health>=60?"Opportunity":"Recovery";
  const nextLevel=1000;
  const createPlay=()=>{if(!completed.includes(customer.name)){setCompleted([...completed,customer.name]);setXp(value=>Math.min(nextLevel,value+120));notify(`+120 XP · Expansion play created for ${customer.name}.`)}else{notify(`${customer.name} expansion play is already active.`)}};
  return <section className="health-page health-game">
    <article className="v2-card health-table">
      <div className="v2-card-head"><div><div className="eyeline">ACCOUNT HEARTBEAT</div><h2>Customer health league</h2><p>Click an account to reveal its next growth mission.</p></div><span className="live-pill">LIVE · 4</span></div>
      <div className="health-summary"><div><span>PORTFOLIO PULSE</span><b>74</b><small>+6 this month</small></div><div><span>EXPANSION XP</span><b>{xp}</b><small>{nextLevel-xp} to next level</small></div><div><span>ACTIVE STREAK</span><b>4</b><small>weeks improving</small></div></div>
      <div className="health-list">{customerHealth.map((x,i)=>{const rank=x.health>=90?"Champion":x.health>=75?"Growing":x.health>=60?"Opportunity":"Recovery";return <button aria-label={`Open ${x.name} customer health`} key={x.name} className={selected===i?"selected":""} onClick={()=>setSelected(i)}>
        <div className={`account-heart ${x.tone}`} style={{"--health":`${x.health}%`} as React.CSSProperties}><span>♥</span><b>{x.health}</b></div>
        <span className="health-account"><b>{x.name}</b><small>{x.agents} agents · {x.traces} traces</small><i>{x.impact}</i></span>
        <span className={`health-rank ${x.tone}`}>{rank}</span>
        <strong>{completed.includes(x.name)?"✓ Play active":x.expansion}</strong>
      </button>})}</div>
    </article>
    <article className={`v2-card expansion-card health-focus ${customer.tone}`}>
      <div className="focus-top"><span className="eyeline">SELECTED ACCOUNT</span><span className={`level-chip ${customer.tone}`}>LEVEL · {level.toUpperCase()}</span></div>
      <div className="heart-hero"><div className="hero-heart"><span>♥</span><b>{customer.health}</b><small>/100</small></div><div><h2>{customer.name}</h2><p>{customer.impact} from {customer.traces} analyzed traces.</p></div></div>
      <div className="xp-track"><div><span>EXPANSION XP</span><b>{xp} / {nextLevel}</b></div><div className="xp-bar"><i style={{width:`${xp/nextLevel*100}%`}}/></div><small>Complete the mission to earn +120 XP.</small></div>
      <div className="achievement-grid"><div><span>♢</span><b>Coverage</b><small>{customer.agents} agents live</small></div><div><span>↗</span><b>Momentum</b><small>{customer.impact}</small></div><div className="unlocked"><span>★</span><b>Next unlock</b><small>{customer.expansion}</small></div></div>
      <div className="growth-mission"><span>GROWTH MISSION</span><b>{customer.expansion}</b><p>Turn proven reliability value into the next customer outcome.</p></div>
      <button className={`v2-primary full mission-button ${completed.includes(customer.name)?"complete":""}`} onClick={createPlay}>{completed.includes(customer.name)?"✓ Expansion play active":"Launch mission · +120 XP →"}</button>
    </article>
  </section>
}

function Lifecycle({state,setState,notify}:any){const states:Lifecycle[]=["Signal found","Ticket created","Email drafted","Email sent","Discovery booked","Pilot active"];const index=states.indexOf(state);const advance=()=>{const next=states[Math.min(index+1,states.length-1)];setState(next);if(next==="Email sent"){openSelfGmail("Moda GTM automation — follow-up ready",`Hi Kabith — this is the self-routed email created when the demo automation reached its email step.\n\nThe prospect context remains fictional; the recipient is always ${SELF_EMAIL}.\n\nNext step: technical discovery.`);notify(`Email step opened in Gmail, addressed to ${SELF_EMAIL}.`);return}notify(next==="Pilot active"?"End-to-end automation complete: pilot active.":`${next}. Automation advanced.`)};return <div className="lifecycle"><div className="lifecycle-steps">{states.map((x,i)=><div key={x} className={i<=index?"done":""}><span>{i<index?"✓":i+1}</span><b>{x}</b><small>{["Stack signal","CRM action","AI sales engineer","Gmail to you","Technical call","Trace-to-fix proof"][i]}</small></div>)}</div><button className="v2-primary" onClick={advance}>{index===states.length-1?"✓ Automation complete":`Advance to ${states[index+1]} →`}</button></div>}
function Metric({value,label,note}:{value:string|number;label:string;note:string}){return <article><b>{value}</b><span>{label}</span><small>{note}</small></article>}
