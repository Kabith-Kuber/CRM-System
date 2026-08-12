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
  useEffect(() => { if (window.location.hash.toLowerCase() === "#crm") setView("CRM"); }, []);
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
  const [step, setStep] = useState(-1);
  const [connected, setConnected] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const phases = [
    { name:"Connect", detail:"Identify the customer stack" },
    { name:"Normalize", detail:"Map messages, tools, and traces" },
    { name:"Configure", detail:"Create reliability signals" },
    { name:"Launch", detail:"Publish the first dashboard" }
  ];
  const connectors = ["OpenAI", "Anthropic", "LangGraph", "LangSmith", "Custom JSON", "S3 export"];
  const agents = [
    { icon:"⌁", name:"Connector Scout", script:"detect_agent_stack.ts", action:"Scanning SDKs, models, and trace sources" },
    { icon:"≋", name:"Schema Mapper", script:"normalize_traces.py", action:"Mapping messages, tool calls, and outcomes" },
    { icon:"✦", name:"Signal Builder", script:"configure_signals.ts", action:"Creating failure and quality monitors" },
    { icon:"▦", name:"Dashboard Agent", script:"publish_workspace.ts", action:"Building the first useful Moda view" }
  ];
  const runOnboarding = () => {
    if(running) return;
    setRunning(true); setStep(0); setConnected([]);
    window.setTimeout(()=>setConnected(["OpenAI","LangGraph"]),450);
    window.setTimeout(()=>{setStep(1);setConnected(["OpenAI","LangGraph","Custom JSON"]);},1050);
    window.setTimeout(()=>setStep(2),1750);
    window.setTimeout(()=>{setStep(3);setRunning(false);notify("Onboarding complete: first Moda dashboard live in 08:42.");},2500);
  };
  const statusFor = (index:number) => index < step || (!running && step===3) ? "complete" : index===step && running ? "running" : "queued";
  return <section className="onboard-page onboarding-v3">
    <section className="onboard-hero">
      <div><div className="eyeline">AUTOMATED CUSTOMER ONBOARDING</div><h2>From trace export to useful Moda workspace.</h2><p>Four automated steps. One clear outcome. No manual configuration maze.</p></div>
      <div className="onboard-target"><span>TIME TO FIRST VALUE</span><b>{step===3?"08:42":"< 10 min"}</b><small>{step===3?"✓ Workspace live":"Target for every new customer"}</small></div>
    </section>
    <div className="onboard-progress">{phases.map((phase,i)=>{const status=statusFor(i);return <div className={status} key={phase.name}><span>{status==="complete"?"✓":i+1}</span><b>{phase.name}</b><small>{phase.detail}</small>{i<phases.length-1&&<i>→</i>}</div>})}</div>
    <section className="onboard-workspace">
      <article className="v2-card connection-panel">
        <div className="v2-card-head"><div><h3>1. Connect the customer environment</h3><p>Moda detects what is already running.</p></div><span className={running?"scan-live":""}>{running?"● SCANNING":"READY"}</span></div>
        <div className="connector-grid">{connectors.map(x=><button key={x} className={connected.includes(x)?"connected":""} onClick={()=>setConnected(current=>current.includes(x)?current.filter(y=>y!==x):[...current,x])}><i>{connected.includes(x)?"✓":"+"}</i><span><b>{x}</b><small>{connected.includes(x)?"Connection verified":"Available connector"}</small></span></button>)}</div>
        <button className="v2-primary run-onboarding" onClick={runOnboarding} disabled={running}>{running?`Running step ${step+1} of 4…`:step===3?"Run onboarding again":"Run complete onboarding →"}</button>
      </article>
      <article className="v2-card environment-panel">
        <div className="v2-card-head"><div><h3>2. Review the detected workspace</h3><p>What Moda configures automatically.</p></div><span className={step===3?"workspace-live":""}>{step===3?"LIVE":"PREVIEW"}</span></div>
        <div className="environment-map">
          <div><span>FRAMEWORK</span><b>{step>=0?"LangGraph 0.2":"Waiting for scan"}</b><small>{step>=0?"12 workflows discovered":"—"}</small></div>
          <div><span>MODELS</span><b>{step>=0?"GPT-4.1 + o3":"Waiting for scan"}</b><small>{step>=0?"2 production models":"—"}</small></div>
          <div><span>TOOLS</span><b>{step>=1?"refund · search · escalate":"Mapping tool calls"}</b><small>{step>=1?"18 tools normalized":"—"}</small></div>
          <div><span>TRACE FORMAT</span><b>{step>=1?"OpenTelemetry + custom":"Mapping schema"}</b><small>{step>=1?"48k historical traces":"—"}</small></div>
        </div>
        <div className="first-output"><span>FIRST MODA OUTPUT</span><b>{step>=2?"5 recurring failure patterns configured":"Appears after signals are configured"}</b><small>{step===3?"Dashboard ready for the customer team":"Tool calls · retrieval · memory · workflow loops"}</small></div>
      </article>
    </section>
    <section className="automation-dock">
      <div className="dock-title"><span className={running?"pulse-dot":""}/><div><b>AI automation runtime</b><small>{running?`${agents[step]?.name} is working now` : step===3?"All onboarding agents completed successfully":"Agents start when onboarding runs"}</small></div><em>{running?"RUNNING":step===3?"4/4 COMPLETE":"STANDBY"}</em></div>
      <div className="agent-rail">{agents.map((agent,i)=>{const status=statusFor(i);return <article className={status} key={agent.name}><i>{agent.icon}</i><div><b>{agent.name}</b><code>{agent.script}</code><small>{status==="running"?agent.action:status==="complete"?"Completed successfully":"Waiting for prior step"}</small></div><span>{status==="running"?<i/>:status==="complete"?"✓":"···"}</span></article>})}</div>
    </section>
  </section>;
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
  const prospect=prospects[selected];
  const [filter,setFilter]=useState("All accounts");
  const [tickets,setTickets]=useState([
    {id:"MOD-142",account:"Decagon",title:"Attribute tool-call failures to workflow changes",owner:"Solutions",priority:"Urgent",status:"In progress",age:"2h"},
    {id:"MOD-137",account:"Glean",title:"Validate context-loss pattern on long sessions",owner:"Kabith",priority:"High",status:"Ready",age:"5h"},
    {id:"MOD-129",account:"Intercom",title:"Prepare trace-review POV for support agent",owner:"GTM",priority:"High",status:"Waiting",age:"1d"},
    {id:"MOD-118",account:"Harvey",title:"Map security requirements for pilot",owner:"Product",priority:"Medium",status:"Research",age:"2d"}
  ]);
  const intelligence=[
    {intent:25,fit:24,urgency:24,access:21,why:"Production support agents create high trace volume and visible resolution risk.",buyer:"Jordan Lee",economic:"VP Customer Experience",champion:"Applied AI lead",message:"Tie tool-call failures to resolution quality and offer a 20-minute trace review."},
    {intent:24,fit:23,urgency:22,access:22,why:"Agentic search depends on retrieval quality and retaining context across long sessions.",buyer:"Priya Shah",economic:"VP Engineering",champion:"AI Platform lead",message:"Lead with context-loss diagnosis and hours saved reviewing traces."},
    {intent:23,fit:23,urgency:21,access:21,why:"A production support agent makes reliability measurable through deflection and resolution.",buyer:"Maya Chen",economic:"GM, Fin",champion:"Head of AI",message:"Connect failure clusters to escalations, retries, and customer satisfaction."},
    {intent:21,fit:24,urgency:20,access:18,why:"High-stakes legal workflows create strong reliability and governance requirements.",buyer:"Alex Morgan",economic:"Chief Product Officer",champion:"Product AI lead",message:"Position Moda as the learning layer for safe, auditable agent improvement."}
  ][selected];
  const createTicket=()=>{if(tickets.some(t=>t.account===prospect.name&&t.id.startsWith("NEW"))){notify(`${prospect.name} ticket is already visible in the queue.`);return}setTickets(current=>[{id:`NEW-${current.length+1}`,account:prospect.name,title:`Investigate ${prospect.signal.toLowerCase()}`,owner:"Kabith",priority:"High",status:"Ready",age:"Now"},...current]);setLifecycle("Ticket created");notify(`Ticket created for ${prospect.name} and added to the revenue queue.`)};
  const visible=filter==="All accounts"?prospects:prospects.filter(x=>x.score>=90);
  return <section className="crm-page revenue-crm">
    <section className="crm-kpis"><div><span>QUALIFIED PIPELINE</span><b>$184k</b><small>4 production-agent accounts</small></div><div><span>TOP-ACCOUNT COVERAGE</span><b>75%</b><small>3 of 4 have a technical buyer</small></div><div><span>OPEN ACTIONS</span><b>{tickets.length}</b><small>2 need action today</small></div><div><span>EXPECTED PIPELINE</span><b>$52k</b><small>Weighted by stage and fit</small></div></section>
    <section className="crm-main-grid">
      <article className="v2-card crm-table"><div className="v2-card-head"><div><div className="eyeline">WHO TO CONTACT NEXT</div><h2>Revenue-ranked accounts</h2><p>Prioritized by production usage, pain, timing, and buyer access.</p></div><select aria-label="Filter accounts" value={filter} onChange={e=>setFilter(e.target.value)}><option>All accounts</option><option>Score 90+</option></select></div><div className="crm-head"><span>Account</span><span>Why now</span><span>Stage</span><span>Score</span><span>ARR</span></div>{visible.map(x=>{const i=prospects.indexOf(x);return <button key={x.name} className={selected===i?"selected":""} onClick={()=>setSelected(i)}><span><b>{x.name}</b><small>{x.contact} · {x.role}</small></span><span><b>{x.signal}</b><small>{x.stack}</small></span><em>{x.stage}</em><i>{x.score}</i><strong>${(x.value/1000).toFixed(0)}k</strong></button>})}</article>
      <article className="v2-card account-intelligence"><div className="account-intel-head"><div className="company-mark">{prospect.name[0]}</div><div><span>RECOMMENDED ACCOUNT</span><h2>{prospect.name}</h2><p>{intelligence.why}</p></div><div className="fit-score"><b>{prospect.score}</b><small>FIT SCORE</small></div></div>
        <div className="score-explain"><span><b>{intelligence.intent}/25</b>Intent</span><span><b>{intelligence.fit}/25</b>Product fit</span><span><b>{intelligence.urgency}/25</b>Urgency</span><span><b>{intelligence.access}/25</b>Buyer access</span></div>
        <div className="buyer-map"><div><span>TECHNICAL CHAMPION</span><b>{intelligence.buyer}</b><small>{prospect.role}</small></div><div><span>ECONOMIC BUYER</span><b>{intelligence.economic}</b><small>Owns budget and business outcome</small></div><div><span>INTERNAL PATH</span><b>{intelligence.champion}</b><small>Turns technical proof into adoption</small></div></div>
        <div className="recommended-message"><span>WHY THEY SHOULD REPLY</span><b>{intelligence.message}</b></div>
        <div className="record-actions"><button onClick={()=>{setLifecycle("Email drafted");setView("Sales engineer")}}>Generate personalized email →</button><button onClick={createTicket}>Create action ticket</button><button onClick={()=>{setLifecycle("Discovery booked");notify(`Discovery booked with ${intelligence.buyer}.`)}}>Book discovery</button></div>
      </article>
    </section>
    <article className="v2-card ticket-center"><div className="v2-card-head"><div><div className="eyeline">REVENUE ACTION QUEUE</div><h2>All customer tickets</h2><p>Every signal has an owner, priority, and next action.</p></div><span className="ticket-count">{tickets.length} OPEN</span></div><div className="ticket-head"><span>Ticket</span><span>Account + work</span><span>Owner</span><span>Priority</span><span>Status</span><span>Age</span></div><div className="ticket-list">{tickets.map(ticket=><button key={ticket.id} onClick={()=>notify(`${ticket.id} opened: ${ticket.title}`)}><code>{ticket.id}</code><span><b>{ticket.account}</b><small>{ticket.title}</small></span><em>{ticket.owner}</em><i className={ticket.priority.toLowerCase()}>{ticket.priority}</i><strong>{ticket.status}</strong><small>{ticket.age}</small></button>)}</div></article>
    <article className="money-loop"><span>HOW THIS MAKES MODA MONEY</span><div><b>1</b><p><strong>Focus</strong>Find teams with deployed agents and urgent failure pain.</p></div><div><b>2</b><p><strong>Convert</strong>Reach the technical champion with a specific point of view.</p></div><div><b>3</b><p><strong>Prove</strong>Run a trace-based pilot tied to measurable recovery.</p></div><div><b>4</b><p><strong>Expand</strong>Use results to connect more agents, teams, and volume.</p></div></article>
  </section>;
}

function ROIReport({ notify }: any) {
  const [traces,setTraces]=useState(24000); const [failure,setFailure]=useState(12); const [taskValue,setTaskValue]=useState(18); const failed=Math.round(traces*failure/100); const hours=Math.round(failed*0.16); const tasks=Math.round(failed*0.62); const recovery=Math.round(tasks*taskValue); const annual=recovery*12; const modaCost=36000; const roi=Math.round((annual-modaCost)/modaCost*100); const payback=Math.max(1,Math.round(modaCost/recovery));
  return <section className="roi-page roi-v3"><section className="roi-top"><div><div className="eyeline">MODA BUSINESS CASE BUILDER</div><h2>Turn agent failures into a budget decision.</h2><p>Give the technical champion a financial story they can take to leadership.</p></div><div className="roi-decision"><span>RECOMMENDATION</span><b>{roi>200?"Strong business case":"Validate with pilot"}</b><small>{roi}% modeled first-year ROI</small></div></section>
    <section className="roi-layout"><article className="v2-card roi-controls"><div className="v2-card-head"><div><h3>Customer assumptions</h3><p>Adjust the model during the sales call.</p></div><span>LIVE MODEL</span></div><label>Monthly agent sessions<b>{traces.toLocaleString()}</b><input type="range" min="5000" max="100000" step="1000" value={traces} onChange={e=>setTraces(Number(e.target.value))}/></label><label>Observed failure rate<b>{failure}%</b><input type="range" min="2" max="30" value={failure} onChange={e=>setFailure(Number(e.target.value))}/></label><label>Value per recovered task<b>${taskValue}</b><input type="range" min="5" max="75" value={taskValue} onChange={e=>setTaskValue(Number(e.target.value))}/></label><div className="model-note"><span>MODEL ASSUMPTION</span><p>62% of failed sessions are recoverable; each failure creates ~9.6 minutes of support or user friction.</p></div><button className="v2-primary full" onClick={()=>notify("Executive ROI report generated and ready to share.")}>Generate executive report →</button></article>
      <article className="roi-report"><div className="report-brand"><span>MODA IMPACT MODEL · DECAGON</span><b>EXECUTIVE VIEW</b></div><div className="roi-hero"><span>ANNUAL RECOVERABLE VALUE</span><b>${annual.toLocaleString()}</b><small>${recovery.toLocaleString()} monthly opportunity</small></div><div className="roi-stat-grid"><div><span>FAILED SESSIONS</span><b>{failed.toLocaleString()}</b><small>identified monthly</small></div><div><span>RECOVERABLE TASKS</span><b>{tasks.toLocaleString()}</b><small>after top fixes</small></div><div><span>SUPPORT HOURS</span><b>{hours.toLocaleString()}</b><small>affected monthly</small></div><div><span>PAYBACK</span><b>{payback} mo</b><small>modeled</small></div></div><div className="value-waterfall"><span>WHERE VALUE COMES FROM</span><div><b style={{width:"72%"}}/><em>Task recovery · 72%</em></div><div><b style={{width:"19%"}}/><em>Support efficiency · 19%</em></div><div><b style={{width:"9%"}}/><em>Engineering time · 9%</em></div></div><blockquote>Moda can turn {failed.toLocaleString()} failed monthly sessions into a prioritized improvement plan worth an estimated <b>${annual.toLocaleString()} annually.</b></blockquote></article></section>
    <section className="roi-proof"><div><span>01</span><b>Baseline</b><p>Measure failure rate before Moda.</p></div><div><span>02</span><b>Fix</b><p>Prioritize the three highest-value causes.</p></div><div><span>03</span><b>Replay</b><p>Validate improvements against real traces.</p></div><div><span>04</span><b>Prove</b><p>Show recovered tasks and dollars.</p></div></section></section>;
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
