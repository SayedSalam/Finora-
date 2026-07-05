import { useState, useEffect, useRef, useMemo } from "react";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import {
  LayoutDashboard, ArrowLeftRight, CreditCard, PieChart as PieIcon, Wallet,
  Receipt, Settings as SettingsIcon, Shield, Bell, Search, Moon, Sun,
  ChevronLeft, TrendingUp, TrendingDown, User, LogOut, Plus, Snowflake,
  Eye, EyeOff, Lock, Mail, Globe, ArrowUpRight, ArrowDownRight, Filter,
  Download, Check, ShieldCheck, Zap, Sparkles,
} from "lucide-react";

/* ── FINORA logo (uploaded brand mark) ─────────────────────────── */
const LOGO = "data:image/png;base64,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";

/* ── Brand tokens ──────────────────────────────────────────────── */
const NAVY = "#0A2540", EMERALD = "#00D084", CYAN = "#06B6D4";
const PROFIT = "#22C55E", LOSS = "#EF4444", PENDING = "#F59E0B", DONE = "#3B82F6";

const palette = (dark) =>
  dark
    ? { bg: "#020617", card: "#0F172A", soft: "#111c34", border: "rgba(148,163,184,0.14)",
        text: "#E2E8F0", sub: "#94A3B8", faint: "#1E293B", grid: "rgba(148,163,184,0.12)" }
    : { bg: "#F7FAFC", card: "#FFFFFF", soft: "#F8FAFC", border: "rgba(15,23,42,0.08)",
        text: "#111827", sub: "#64748B", faint: "#EEF2F7", grid: "rgba(100,116,139,0.14)" };

/* ── i18n (light) ──────────────────────────────────────────────── */
const T = {
  en: { dir: "ltr", dash: "Dashboard", tx: "Transactions", cards: "Cards", invest: "Investments",
    budgets: "Budgets", bills: "Bills & Payments", security: "Security", settings: "Settings",
    greeting: "Welcome back", overview: "Here's your financial overview",
    balance: "Total Balance", income: "Monthly Income", expenses: "Monthly Expenses",
    portfolio: "Investment Portfolio", credit: "Credit Score", goal: "Savings Goal",
    growth: "Balance Growth", spend: "Spending Categories", flow: "Cash Flow", perf: "Investment Performance",
    recent: "Recent Transactions", viewall: "View all", signin: "Sign In", search: "Search…" },
  ar: { dir: "rtl", dash: "الرئيسية", tx: "المعاملات", cards: "البطاقات", invest: "الاستثمارات",
    budgets: "الميزانيات", bills: "الفواتير", security: "الأمان", settings: "الإعدادات",
    greeting: "أهلاً بعودتك", overview: "هذه نظرة عامة على وضعك المالي",
    balance: "إجمالي الرصيد", income: "الدخل الشهري", expenses: "المصروفات الشهرية",
    portfolio: "محفظة الاستثمار", credit: "التقييم الائتماني", goal: "هدف الادخار",
    growth: "نمو الرصيد", spend: "فئات الإنفاق", flow: "التدفق النقدي", perf: "أداء الاستثمار",
    recent: "أحدث المعاملات", viewall: "عرض الكل", signin: "تسجيل الدخول", search: "بحث…" },
};

/* ── Currencies ────────────────────────────────────────────────── */
const CUR = {
  USD: { rate: 1, sym: "$" }, EUR: { rate: 0.92, sym: "€" }, GBP: { rate: 0.79, sym: "£" },
  SAR: { rate: 3.75, sym: "﷼" }, EGP: { rate: 48.5, sym: "E£" },
};

/* ── Mock data ─────────────────────────────────────────────────── */
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const balanceSeries = [612,640,628,671,705,742,738,769,791,804,818,824].map((v,i)=>({m:MONTHS[i],v:v*1000}));
const spendData = [
  { name: "Housing", v: 14200, c: NAVY }, { name: "Food", v: 6300, c: EMERALD },
  { name: "Transport", v: 3100, c: CYAN }, { name: "Entertainment", v: 2450, c: "#8B5CF6" },
  { name: "Investments", v: 16800, c: "#F59E0B" },
];
const flowData = MONTHS.slice(0,7).map((m,i)=>({ m, income: 80+i*1.5, expenses: 40+(i%3)*2, savings: 22+i }));
const perfData = MONTHS.map((m,i)=>({
  m, stocks: 420+i*22+(i%2?14:-8), bonds: 180+i*4, crypto: 90+i*9+(i%3?22:-18), funds: 240+i*11,
}));
const txData = [
  { id:"TX-90412", date:"2026-06-26", merchant:"Apple Store", cat:"Electronics", method:"Platinum •4821", amt:-2399, st:"Completed" },
  { id:"TX-90411", date:"2026-06-25", merchant:"Payroll — Acme Corp", cat:"Salary", method:"Direct deposit", amt:87300, st:"Completed" },
  { id:"TX-90408", date:"2026-06-25", merchant:"Whole Foods", cat:"Groceries", method:"Virtual •0093", amt:-184.5, st:"Completed" },
  { id:"TX-90402", date:"2026-06-24", merchant:"Tesla Supercharge", cat:"Transport", method:"Platinum •4821", amt:-46.2, st:"Completed" },
  { id:"TX-90399", date:"2026-06-23", merchant:"Vanguard Transfer", cat:"Investments", method:"ACH", amt:-12000, st:"Pending" },
  { id:"TX-90391", date:"2026-06-22", merchant:"Netflix", cat:"Entertainment", method:"Virtual •0093", amt:-22.99, st:"Completed" },
  { id:"TX-90388", date:"2026-06-21", merchant:"Riyad Bank Transfer", cat:"Transfer", method:"Wire", amt:-5400, st:"Failed" },
  { id:"TX-90380", date:"2026-06-20", merchant:"Emirates Airlines", cat:"Travel", method:"Business •7710", amt:-1840, st:"Completed" },
  { id:"TX-90377", date:"2026-06-19", merchant:"Dribbble Pro", cat:"Software", method:"Virtual •0093", amt:-15, st:"Pending" },
  { id:"TX-90370", date:"2026-06-18", merchant:"Stripe Payout", cat:"Income", method:"ACH", amt:6420, st:"Completed" },
  { id:"TX-90362", date:"2026-06-17", merchant:"Starbucks", cat:"Food", method:"Platinum •4821", amt:-8.75, st:"Completed" },
  { id:"TX-90355", date:"2026-06-16", merchant:"AWS", cat:"Software", method:"Business •7710", amt:-742.1, st:"Completed" },
];
const assets = [
  { name:"Apple Inc.", sym:"AAPL", type:"Stock", val:42300, chg:1.84 },
  { name:"Vanguard S&P 500", sym:"VOO", type:"ETF", val:128400, chg:0.62 },
  { name:"Bitcoin", sym:"BTC", type:"Crypto", val:68900, chg:-2.31 },
  { name:"NVIDIA", sym:"NVDA", type:"Stock", val:51200, chg:3.07 },
  { name:"Blackstone REIT", sym:"BREIT", type:"Real Estate", val:38000, chg:0.18 },
  { name:"Ethereum", sym:"ETH", type:"Crypto", val:24700, chg:-1.12 },
];
const budgets = [
  { cat:"Housing", spent:1420, cap:1800, c:NAVY }, { cat:"Food & Dining", spent:630, cap:900, c:EMERALD },
  { cat:"Transport", spent:310, cap:400, c:CYAN }, { cat:"Entertainment", spent:245, cap:300, c:"#8B5CF6" },
  { cat:"Shopping", spent:880, cap:700, c:"#F59E0B" },
];
const insights = [
  "You spent 18% less on dining compared to last month.",
  "Shopping is 26% over budget — consider trimming $180.",
  "On track to hit your $250K savings goal 2 months early.",
];
const bills = [
  { name:"Electricity — SEC", due:"Jun 28", amt:212.4, st:"Upcoming" },
  { name:"Internet — STC Fiber", due:"Jun 24", amt:89, st:"Paid" },
  { name:"Platinum Card", due:"Jun 30", amt:1840, st:"Upcoming" },
  { name:"Home Insurance", due:"Jun 19", amt:340, st:"Overdue" },
  { name:"Spotify Family", due:"Jun 22", amt:16.99, st:"Paid" },
];
const notifs = [
  { ic: TrendingUp, t:"Salary received", d:"+$87,300 from Acme Corp", time:"2h", c:PROFIT },
  { ic: Shield, t:"Unusual transaction", d:"$5,400 wire flagged for review", time:"5h", c:PENDING },
  { ic: Receipt, t:"Payment due soon", d:"Platinum card • $1,840 on Jun 30", time:"1d", c:DONE },
  { ic: PieIcon, t:"Portfolio update", d:"NVDA up 3.07% today", time:"1d", c:CYAN },
];

/* ── helpers ───────────────────────────────────────────────────── */
function useCountUp(target, ms = 1100) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf, start;
    const step = (t) => {
      if (!start) start = t;
      const p = Math.min((t - start) / ms, 1);
      setV(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, ms]);
  return v;
}
const money = (n, cur) => {
  const { rate, sym } = CUR[cur];
  const x = n * rate;
  const s = Math.abs(x).toLocaleString(undefined, { maximumFractionDigits: x % 1 ? 2 : 0 });
  return `${x < 0 ? "-" : ""}${sym}${s}`;
};

function AnimatedMoney({ value, cur, className, style }) {
  const v = useCountUp(value);
  return <span className={className} style={style}>{money(v, cur)}</span>;
}

const ST = {
  Completed: PROFIT, Paid: PROFIT, Pending: PENDING, Upcoming: DONE,
  Failed: LOSS, Overdue: LOSS,
};
function StatusPill({ s }) {
  const c = ST[s] || "#64748B";
  return (
    <span style={{ color: c, background: c + "1f", padding: "3px 10px", borderRadius: 999,
      fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>{s}</span>
  );
}

/* ── shells ────────────────────────────────────────────────────── */
function Card({ C, children, style, className = "" }) {
  return (
    <div className={`rounded-2xl ${className}`} style={{
      background: C.card, border: `1px solid ${C.border}`,
      boxShadow: "0 1px 2px rgba(2,6,23,.04), 0 8px 24px rgba(2,6,23,.05)", ...style }}>
      {children}
    </div>
  );
}

/* ════════════════════════════════ LOGIN ════════════════════════ */
function Login({ onAuth, dark, lang }) {
  const C = palette(dark);
  const tt = T[lang];
  const [show, setShow] = useState(false);
  return (
    <div className="min-h-screen w-full flex" style={{ background: C.bg, color: C.text }}>
      {/* left visual */}
      <div className="hidden md:flex flex-col justify-between relative overflow-hidden"
        style={{ width: "52%", padding: "48px",
          background: `linear-gradient(150deg, ${NAVY} 0%, #0c3358 55%, #0a4d6b 100%)`, color: "#fff" }}>
        <div style={{ position:"absolute", inset:0, opacity:.5,
          background:`radial-gradient(600px 300px at 80% -10%, ${CYAN}55, transparent), radial-gradient(500px 320px at 0% 110%, ${EMERALD}44, transparent)` }} />
        <div className="flex items-center gap-3" style={{ position:"relative" }}>
          <div style={{ background:"#fff", borderRadius:14, padding:7 }}>
            <img src={LOGO} alt="FINORA" style={{ width:30, height:30 }} />
          </div>
          <span style={{ fontWeight:800, letterSpacing:".22em", fontSize:20 }}>FINORA</span>
        </div>
        <div style={{ position:"relative" }} className="finora-fade">
          <div style={{ fontSize:42, fontWeight:800, lineHeight:1.12, maxWidth:440 }}>
            Your Money. Your Future. Your Control.
          </div>
          <p style={{ marginTop:16, color:"#cbe7ff", maxWidth:400 }}>
            A premium banking and analytics platform engineered for clarity, security, and total financial command.
          </p>
          <MiniDash />
        </div>
        <div style={{ position:"relative", display:"flex", gap:18, color:"#bfe0ff", fontSize:13 }}>
          <span className="flex items-center gap-2"><ShieldCheck size={15}/> 256-bit encryption</span>
          <span className="flex items-center gap-2"><Zap size={15}/> Real-time analytics</span>
        </div>
      </div>
      {/* right form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="finora-fade" style={{ width:"100%", maxWidth:400,
          background: dark ? "rgba(15,23,42,.7)" : "rgba(255,255,255,.72)",
          backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)",
          border:`1px solid ${C.border}`, borderRadius:24, padding:32,
          boxShadow:"0 20px 60px rgba(2,6,23,.18)" }}>
          <div className="md:hidden flex items-center gap-2 mb-6">
            <img src={LOGO} style={{ width:32 }} alt="FINORA"/>
            <span style={{ fontWeight:800, letterSpacing:".2em" }}>FINORA</span>
          </div>
          <h1 style={{ fontSize:24, fontWeight:800 }}>Sign in</h1>
          <p style={{ color:C.sub, fontSize:14, marginTop:4 }}>Access your financial dashboard.</p>

          <label style={{ fontSize:13, fontWeight:600, color:C.sub, display:"block", marginTop:22 }}>Email</label>
          <Field C={C} icon={Mail}><input defaultValue="hatem@finora.io" style={inp(C)} /></Field>

          <label style={{ fontSize:13, fontWeight:600, color:C.sub, display:"block", marginTop:14 }}>Password</label>
          <Field C={C} icon={Lock}>
            <input type={show?"text":"password"} defaultValue="finora2026" style={inp(C)} />
            <button onClick={()=>setShow(s=>!s)} style={{ color:C.sub, padding:4 }}>
              {show ? <EyeOff size={17}/> : <Eye size={17}/>}
            </button>
          </Field>

          <div style={{ display:"flex", gap:8, marginTop:14 }}>
            {[0,1,2,3].map(i=>(
              <input key={i} maxLength={1} placeholder="•" inputMode="numeric"
                style={{ flex:1, textAlign:"center", padding:"10px 0", borderRadius:12,
                  border:`1px solid ${C.border}`, background:C.soft, color:C.text, fontWeight:700 }} />
            ))}
          </div>
          <p style={{ fontSize:12, color:C.sub, marginTop:6 }}>Two-factor authentication code</p>

          <label style={{ display:"flex", alignItems:"center", gap:8, marginTop:14, fontSize:13, color:C.sub, cursor:"pointer" }}>
            <input type="checkbox" defaultChecked /> Remember me on this device
          </label>

          <button onClick={onAuth} style={{ width:"100%", marginTop:18, padding:"13px",
            borderRadius:14, fontWeight:700, color:"#fff",
            background:`linear-gradient(90deg, ${NAVY}, #0e3e63)`,
            boxShadow:`0 10px 24px ${NAVY}44` }}>{tt.signin}</button>

          <button onClick={onAuth} style={{ width:"100%", marginTop:10, padding:"12px",
            borderRadius:14, fontWeight:600, color:C.text, background:C.soft,
            border:`1px solid ${C.border}`, display:"flex", alignItems:"center", justifyContent:"center", gap:10 }}>
            <GoogleG/> Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
const inp = (C) => ({ flex:1, background:"transparent", color:C.text, outline:"none", fontSize:14 });
function Field({ C, icon:Icon, children }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:10, marginTop:6,
      border:`1px solid ${C.border}`, background:C.soft, borderRadius:12, padding:"11px 12px" }}>
      <Icon size={17} color={C.sub}/>{children}
    </div>
  );
}
function GoogleG(){return(<svg width="17" height="17" viewBox="0 0 48 48"><path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.8-6.8C35.6 2.4 30.2 0 24 0 14.6 0 6.4 5.4 2.6 13.2l7.9 6.2C12.4 13.7 17.7 9.5 24 9.5z"/><path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-2.8-.4-4.1H24v7.8h12.4c-.3 2.1-1.6 5.2-4.6 7.3l7.1 5.5c4.2-3.9 6.2-9.6 6.2-16.5z"/><path fill="#FBBC05" d="M10.5 28.6c-.5-1.4-.8-2.9-.8-4.6s.3-3.2.8-4.6l-7.9-6.2C1 16.5 0 20.1 0 24s1 7.5 2.6 10.8l7.9-6.2z"/><path fill="#34A853" d="M24 48c6.2 0 11.5-2 15.3-5.5l-7.1-5.5c-2 1.3-4.6 2.2-8.2 2.2-6.3 0-11.6-4.2-13.5-9.9l-7.9 6.2C6.4 42.6 14.6 48 24 48z"/></svg>);}

function MiniDash(){
  return(
    <div style={{ marginTop:30, position:"relative", height:170, maxWidth:430 }}>
      <div className="finora-float" style={glass(0,0,"58%")}>
        <div style={{ fontSize:11, opacity:.8 }}>Total balance</div>
        <div style={{ fontSize:24, fontWeight:800 }}>$824,560</div>
        <svg width="100%" height="44" viewBox="0 0 200 44" style={{ marginTop:6 }}>
          <polyline fill="none" stroke={EMERALD} strokeWidth="2.5"
            points="0,38 25,30 50,33 75,20 100,24 125,12 150,16 175,7 200,4"/>
        </svg>
      </div>
      <div className="finora-float2" style={glass("auto",0,"38%","top")}>
        <div style={{ fontSize:11, opacity:.8 }}>Portfolio</div>
        <div style={{ fontSize:18, fontWeight:800 }}>$1.2M</div>
        <div style={{ color:EMERALD, fontSize:12, fontWeight:700 }}>▲ 4.2%</div>
      </div>
    </div>
  );
}
const glass=(left,bottom,w,top)=>({ position:"absolute", left:left===0?0:undefined, right:left==="auto"?0:undefined,
  bottom:top?undefined:0, top:top?0:undefined, width:w, padding:14, borderRadius:16,
  background:"rgba(255,255,255,.1)", border:"1px solid rgba(255,255,255,.18)",
  backdropFilter:"blur(8px)", color:"#fff" });

/* ════════════════════════════════ APP ══════════════════════════ */
export default function FinoraApp() {
  const [dark, setDark] = useState(false);
  const [lang, setLang] = useState("en");
  const [authed, setAuthed] = useState(false);
  const [page, setPage] = useState("dash");
  const [collapsed, setCollapsed] = useState(false);
  const [cur, setCur] = useState("USD");
  const [bellOpen, setBellOpen] = useState(false);
  const C = palette(dark);
  const tt = T[lang];

  useEffect(() => {
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Cairo:wght@400;600;700;800&display=swap";
    document.head.appendChild(l);
    return () => { try { document.head.removeChild(l); } catch {} };
  }, []);

  const font = lang === "ar" ? "Cairo, system-ui, sans-serif" : "Inter, system-ui, sans-serif";

  if (!authed)
    return (
      <div dir={tt.dir} style={{ fontFamily: font }}>
        <Styles/>
        <Login onAuth={() => setAuthed(true)} dark={dark} lang={lang} />
      </div>
    );

  const nav = [
    { k:"dash", ic:LayoutDashboard, label:tt.dash },
    { k:"tx", ic:ArrowLeftRight, label:tt.tx },
    { k:"cards", ic:CreditCard, label:tt.cards },
    { k:"invest", ic:PieIcon, label:tt.invest },
    { k:"budgets", ic:Wallet, label:tt.budgets },
    { k:"bills", ic:Receipt, label:tt.bills },
    { k:"security", ic:Shield, label:tt.security },
    { k:"settings", ic:SettingsIcon, label:tt.settings },
  ];
  const sideW = collapsed ? 76 : 248;

  return (
    <div dir={tt.dir} style={{ fontFamily:font, background:C.bg, color:C.text, minHeight:"100vh" }}>
      <Styles/>
      {/* sidebar */}
      <aside style={{ position:"fixed", top:0, bottom:0, [tt.dir==="rtl"?"right":"left"]:0,
        width:sideW, background:C.card, borderRight:tt.dir==="ltr"?`1px solid ${C.border}`:"none",
        borderLeft:tt.dir==="rtl"?`1px solid ${C.border}`:"none", transition:"width .25s ease",
        display:"flex", flexDirection:"column", zIndex:30 }} className="hide-mobile">
        <div className="flex items-center gap-3" style={{ padding:"20px 18px", height:68 }}>
          <div style={{ background:NAVY, borderRadius:11, padding:6, flexShrink:0 }}>
            <img src={LOGO} alt="FINORA" style={{ width:24, height:24, filter:"brightness(0) invert(1)" }}/>
          </div>
          {!collapsed && <span style={{ fontWeight:800, letterSpacing:".18em" }}>FINORA</span>}
        </div>
        <nav style={{ padding:"6px 12px", flex:1 }}>
          {nav.map(n => {
            const on = page === n.k;
            return (
              <button key={n.k} onClick={()=>setPage(n.k)} title={n.label}
                style={{ width:"100%", display:"flex", alignItems:"center", gap:12, padding:"11px 12px",
                  borderRadius:12, marginBottom:4, fontWeight:600, fontSize:14,
                  color:on?"#fff":C.sub, justifyContent:collapsed?"center":"flex-start",
                  background:on?`linear-gradient(90deg, ${NAVY}, #0e3e63)`:"transparent",
                  boxShadow:on?`0 8px 18px ${NAVY}33`:"none", transition:"all .15s" }}>
                <n.ic size={19}/>{!collapsed && <span>{n.label}</span>}
              </button>
            );
          })}
        </nav>
        <div style={{ padding:12 }}>
          <button onClick={()=>setCollapsed(c=>!c)} style={{ width:"100%", display:"flex", gap:10,
            alignItems:"center", justifyContent:collapsed?"center":"flex-start", padding:"10px 12px",
            borderRadius:12, color:C.sub, fontSize:13, fontWeight:600 }}>
            <ChevronLeft size={18} style={{ transform: (collapsed!==(tt.dir==="rtl"))?"rotate(180deg)":"none" }}/>
            {!collapsed && <span>Collapse</span>}
          </button>
          <button onClick={()=>{setAuthed(false);setPage("dash");}} style={{ width:"100%", display:"flex", gap:10,
            alignItems:"center", justifyContent:collapsed?"center":"flex-start", padding:"10px 12px",
            borderRadius:12, color:LOSS, fontSize:13, fontWeight:600 }}>
            <LogOut size={18}/>{!collapsed && <span>Sign out</span>}
          </button>
        </div>
      </aside>

      {/* main */}
      <div style={{ [tt.dir==="rtl"?"marginRight":"marginLeft"]: sideW, transition:"margin .25s" }} className="main-pad">
        {/* topbar */}
        <header style={{ position:"sticky", top:0, zIndex:20, height:68, background:C.card+"e6",
          backdropFilter:"blur(10px)", borderBottom:`1px solid ${C.border}`,
          display:"flex", alignItems:"center", gap:14, padding:"0 22px" }}>
          <div style={{ display:"flex", alignItems:"center", gap:9, flex:1, maxWidth:420,
            background:C.soft, border:`1px solid ${C.border}`, borderRadius:12, padding:"9px 12px" }}>
            <Search size={17} color={C.sub}/>
            <input placeholder={tt.search} style={{ flex:1, background:"transparent", outline:"none", color:C.text, fontSize:14 }}/>
          </div>
          <div className="flex-1" />
          <select value={cur} onChange={e=>setCur(e.target.value)}
            style={{ background:C.soft, border:`1px solid ${C.border}`, color:C.text, borderRadius:10,
              padding:"8px 10px", fontWeight:600, fontSize:13, cursor:"pointer" }}>
            {Object.keys(CUR).map(k=><option key={k} value={k}>{k}</option>)}
          </select>
          <IconBtn C={C} onClick={()=>setLang(l=>l==="en"?"ar":"en")} title="Language"><Globe size={18}/></IconBtn>
          <IconBtn C={C} onClick={()=>setDark(d=>!d)} title="Theme">{dark?<Sun size={18}/>:<Moon size={18}/>}</IconBtn>
          <div style={{ position:"relative" }}>
            <IconBtn C={C} onClick={()=>setBellOpen(o=>!o)} title="Notifications">
              <Bell size={18}/>
              <span style={{ position:"absolute", top:6, right:6, width:8, height:8, borderRadius:99, background:LOSS }}/>
            </IconBtn>
            {bellOpen && <Notifications C={C} onClose={()=>setBellOpen(false)}/>}
          </div>
          <div className="flex items-center gap-2" style={{ paddingInlineStart:6 }}>
            <div style={{ width:36, height:36, borderRadius:99, background:`linear-gradient(135deg,${NAVY},${CYAN})`,
              display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700 }}>H</div>
            <div className="hide-mobile">
              <div style={{ fontSize:13, fontWeight:700 }}>Hatem</div>
              <div style={{ fontSize:11, color:C.sub }}>Premium account</div>
            </div>
          </div>
        </header>

        <main style={{ padding:24, maxWidth:1440, margin:"0 auto" }}>
          {page==="dash" && <Dashboard C={C} cur={cur} tt={tt}/>}
          {page==="tx" && <Transactions C={C} cur={cur}/>}
          {page==="cards" && <Cards C={C} cur={cur}/>}
          {page==="invest" && <Investments C={C} cur={cur}/>}
          {page==="budgets" && <Budgets C={C} cur={cur}/>}
          {page==="bills" && <Bills C={C} cur={cur}/>}
          {page==="security" && <Security C={C}/>}
          {page==="settings" && <SettingsPage C={C} dark={dark} setDark={setDark} lang={lang} setLang={setLang}/>}
        </main>
      </div>
    </div>
  );
}

function IconBtn({ C, children, onClick, title }) {
  return (
    <button onClick={onClick} title={title} style={{ position:"relative", width:40, height:40, borderRadius:12,
      display:"flex", alignItems:"center", justifyContent:"center", color:C.sub,
      background:C.soft, border:`1px solid ${C.border}` }}>{children}</button>
  );
}
function Notifications({ C, onClose }) {
  return (
    <>
      <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:40 }}/>
      <div className="finora-fade" style={{ position:"absolute", top:50, right:0, width:320, zIndex:50,
        background:C.card, border:`1px solid ${C.border}`, borderRadius:16, boxShadow:"0 20px 50px rgba(2,6,23,.22)", overflow:"hidden" }}>
        <div style={{ padding:"14px 16px", fontWeight:700, borderBottom:`1px solid ${C.border}` }}>Notifications</div>
        {notifs.map((n,i)=>(
          <div key={i} style={{ display:"flex", gap:12, padding:"12px 16px", borderBottom:i<notifs.length-1?`1px solid ${C.border}`:"none" }}>
            <div style={{ width:34, height:34, borderRadius:10, background:n.c+"22", color:n.c,
              display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}><n.ic size={17}/></div>
            <div style={{ minWidth:0 }}>
              <div style={{ fontSize:13, fontWeight:700 }}>{n.t}</div>
              <div style={{ fontSize:12, color:C.sub }}>{n.d}</div>
            </div>
            <div style={{ fontSize:11, color:C.sub, marginInlineStart:"auto", whiteSpace:"nowrap" }}>{n.time}</div>
          </div>
        ))}
      </div>
    </>
  );
}

/* ── Dashboard ─────────────────────────────────────────────────── */
function Dashboard({ C, cur, tt }) {
  const [loading, setLoading] = useState(true);
  useEffect(()=>{ const id=setTimeout(()=>setLoading(false),650); return ()=>clearTimeout(id); },[]);
  const stats = [
    { label:tt.balance, val:824560, sub:"+12.4% vs last year", up:true, money:true },
    { label:tt.income, val:87300, sub:"This month", up:true, money:true, sign:"+" },
    { label:tt.expenses, val:-42850, sub:"This month", up:false, money:true },
    { label:tt.portfolio, val:1200000, sub:"+4.2% today", up:true, money:true },
  ];
  return (
    <div className="finora-rise">
      <div style={{ marginBottom:20 }}>
        <h1 style={{ fontSize:24, fontWeight:800 }}>{tt.greeting}, Hatem 👋</h1>
        <p style={{ color:C.sub, marginTop:2 }}>{tt.overview}</p>
      </div>

      <div className="grid-stats">
        {stats.map((s,i)=>(
          <Card key={i} C={C} style={{ padding:18 }}>
            {loading ? <Skel C={C}/> : <>
              <div className="flex items-center justify-between">
                <span style={{ color:C.sub, fontSize:13, fontWeight:600 }}>{s.label}</span>
                <span style={{ color:s.up?PROFIT:LOSS, background:(s.up?PROFIT:LOSS)+"1c", borderRadius:8,
                  padding:"3px 7px", fontSize:11, fontWeight:700, display:"inline-flex", alignItems:"center", gap:3 }}>
                  {s.up?<ArrowUpRight size={12}/>:<ArrowDownRight size={12}/>}
                </span>
              </div>
              <div style={{ fontSize:26, fontWeight:800, marginTop:8 }}>
                {s.sign}<AnimatedMoney value={Math.abs(s.val)} cur={cur}/>
              </div>
              <div style={{ fontSize:12, color:C.sub, marginTop:4 }}>{s.sub}</div>
            </>}
          </Card>
        ))}
        {/* credit + goal */}
        <Card C={C} style={{ padding:18 }}>
          {loading?<Skel C={C}/>:<>
            <div style={{ color:C.sub, fontSize:13, fontWeight:600 }}>{tt.credit}</div>
            <div style={{ fontSize:26, fontWeight:800, marginTop:8 }}>810 <span style={{ fontSize:14, color:C.sub }}>/ 850</span></div>
            <ProgressBar C={C} pct={810/850} color={EMERALD}/>
            <div style={{ fontSize:12, color:PROFIT, marginTop:6, fontWeight:600 }}>Excellent</div>
          </>}
        </Card>
        <Card C={C} style={{ padding:18 }}>
          {loading?<Skel C={C}/>:<>
            <div style={{ color:C.sub, fontSize:13, fontWeight:600 }}>{tt.goal}</div>
            <div style={{ fontSize:26, fontWeight:800, marginTop:8 }}>72%</div>
            <ProgressBar C={C} pct={0.72} color={CYAN}/>
            <div style={{ fontSize:12, color:C.sub, marginTop:6 }}>{money(180000,cur)} of {money(250000,cur)}</div>
          </>}
        </Card>
      </div>

      <div className="grid-charts" style={{ marginTop:18 }}>
        <ChartCard C={C} title={tt.growth} span2>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={balanceSeries} margin={{ left:-18, right:6, top:8 }}>
              <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={EMERALD} stopOpacity={.35}/>
                <stop offset="100%" stopColor={EMERALD} stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false}/>
              <XAxis dataKey="m" tick={{ fill:C.sub, fontSize:12 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill:C.sub, fontSize:12 }} axisLine={false} tickLine={false} tickFormatter={v=>`${v/1000}k`}/>
              <Tooltip contentStyle={tip(C)} formatter={v=>money(v,cur)}/>
              <Area type="monotone" dataKey="v" stroke={EMERALD} strokeWidth={2.5} fill="url(#g1)"/>
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard C={C} title={tt.spend}>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={spendData} dataKey="v" nameKey="name" innerRadius={58} outerRadius={92} paddingAngle={3} stroke="none">
                {spendData.map((d,i)=><Cell key={i} fill={d.c}/>)}
              </Pie>
              <Tooltip contentStyle={tip(C)} formatter={v=>money(v,cur)}/>
            </PieChart>
          </ResponsiveContainer>
          <Legend2 C={C} data={spendData}/>
        </ChartCard>
      </div>

      <div className="grid-charts" style={{ marginTop:18 }}>
        <ChartCard C={C} title={tt.flow}>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={flowData} margin={{ left:-22, top:8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false}/>
              <XAxis dataKey="m" tick={{ fill:C.sub, fontSize:12 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill:C.sub, fontSize:12 }} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={tip(C)} cursor={{ fill:C.grid }}/>
              <Bar dataKey="income" fill={NAVY} radius={[5,5,0,0]}/>
              <Bar dataKey="expenses" fill={LOSS} radius={[5,5,0,0]}/>
              <Bar dataKey="savings" fill={EMERALD} radius={[5,5,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard C={C} title={tt.perf}>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={perfData} margin={{ left:-22, top:8 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.grid} vertical={false}/>
              <XAxis dataKey="m" tick={{ fill:C.sub, fontSize:12 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill:C.sub, fontSize:12 }} axisLine={false} tickLine={false}/>
              <Tooltip contentStyle={tip(C)}/>
              <Line type="monotone" dataKey="stocks" stroke={NAVY} strokeWidth={2} dot={false}/>
              <Line type="monotone" dataKey="bonds" stroke={CYAN} strokeWidth={2} dot={false}/>
              <Line type="monotone" dataKey="crypto" stroke="#F59E0B" strokeWidth={2} dot={false}/>
              <Line type="monotone" dataKey="funds" stroke={EMERALD} strokeWidth={2} dot={false}/>
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <Card C={C} style={{ marginTop:18, padding:0, overflow:"hidden" }}>
        <div className="flex items-center justify-between" style={{ padding:"16px 18px" }}>
          <h3 style={{ fontWeight:700 }}>{tt.recent}</h3>
          <span style={{ color:CYAN, fontSize:13, fontWeight:600, cursor:"pointer" }}>{tt.viewall}</span>
        </div>
        <TxTable C={C} rows={txData.slice(0,5)} cur={cur}/>
      </Card>
    </div>
  );
}

const tip = (C) => ({ background:C.card, border:`1px solid ${C.border}`, borderRadius:12, color:C.text, fontSize:13 });
function ProgressBar({ C, pct, color }) {
  return (
    <div style={{ height:8, borderRadius:99, background:C.faint, marginTop:10, overflow:"hidden" }}>
      <div style={{ height:"100%", width:`${pct*100}%`, borderRadius:99,
        background:`linear-gradient(90deg,${color},${color}aa)`, transition:"width 1s ease" }}/>
    </div>
  );
}
function Skel({ C }) {
  return <div className="shimmer" style={{ height:78, borderRadius:10, background:C.faint }}/>;
}
function ChartCard({ C, title, children, span2 }) {
  return (
    <Card C={C} style={{ padding:18, gridColumn: span2?"span 2":undefined }} className={span2?"span2":""}>
      <h3 style={{ fontWeight:700, marginBottom:6 }}>{title}</h3>
      {children}
    </Card>
  );
}
function Legend2({ C, data }) {
  const total = data.reduce((a,b)=>a+b.v,0);
  return (
    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"6px 14px", marginTop:8 }}>
      {data.map((d,i)=>(
        <div key={i} className="flex items-center gap-2" style={{ fontSize:12 }}>
          <span style={{ width:9, height:9, borderRadius:3, background:d.c }}/>
          <span style={{ color:C.sub }}>{d.name}</span>
          <span style={{ marginInlineStart:"auto", fontWeight:700, color:C.text }}>{Math.round(d.v/total*100)}%</span>
        </div>
      ))}
    </div>
  );
}

/* ── Transactions ──────────────────────────────────────────────── */
function TxTable({ C, rows, cur }) {
  return (
    <div style={{ overflowX:"auto" }}>
      <table style={{ width:"100%", borderCollapse:"collapse", fontSize:13.5, minWidth:560 }}>
        <thead>
          <tr style={{ color:C.sub, textAlign:"start" }}>
            {["Merchant","Category","Method","Date","Amount","Status"].map(h=>(
              <th key={h} style={{ padding:"10px 18px", fontWeight:600, textAlign: h==="Amount"?"end":"start", borderTop:`1px solid ${C.border}` }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map(r=>(
            <tr key={r.id} className="tx-row">
              <td style={td(C)}><div style={{ fontWeight:600 }}>{r.merchant}</div><div style={{ color:C.sub, fontSize:11 }}>{r.id}</div></td>
              <td style={{ ...td(C), color:C.sub }}>{r.cat}</td>
              <td style={{ ...td(C), color:C.sub }}>{r.method}</td>
              <td style={{ ...td(C), color:C.sub, whiteSpace:"nowrap" }}>{r.date}</td>
              <td style={{ ...td(C), textAlign:"end", fontWeight:700, color: r.amt<0?C.text:PROFIT }}>{r.amt>0?"+":""}{money(r.amt,cur)}</td>
              <td style={td(C)}><StatusPill s={r.st}/></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
const td = (C) => ({ padding:"13px 18px", borderTop:`1px solid ${C.border}`, verticalAlign:"middle" });

function Transactions({ C, cur }) {
  const [q,setQ]=useState(""); const [filt,setFilt]=useState("All"); const [sort,setSort]=useState("date"); const [pg,setPg]=useState(0);
  const filtered = useMemo(()=>{
    let r = txData.filter(t=>(filt==="All"||t.st===filt) &&
      (t.merchant.toLowerCase().includes(q.toLowerCase())||t.cat.toLowerCase().includes(q.toLowerCase())));
    r = [...r].sort((a,b)=> sort==="amount" ? Math.abs(b.amt)-Math.abs(a.amt) : b.date.localeCompare(a.date));
    return r;
  },[q,filt,sort]);
  const per=6; const pages=Math.max(1,Math.ceil(filtered.length/per));
  const view=filtered.slice(pg*per,pg*per+per);
  return (
    <div className="finora-rise">
      <PageHead C={C} title="Transactions" sub="Search, filter, and export your activity."/>
      <Card C={C} style={{ padding:0, overflow:"hidden" }}>
        <div className="flex items-center gap-3 flex-wrap" style={{ padding:"14px 16px", borderBottom:`1px solid ${C.border}` }}>
          <div className="flex items-center gap-2" style={{ background:C.soft, border:`1px solid ${C.border}`, borderRadius:10, padding:"8px 11px", flex:1, minWidth:200 }}>
            <Search size={16} color={C.sub}/>
            <input value={q} onChange={e=>{setQ(e.target.value);setPg(0);}} placeholder="Search merchant or category"
              style={{ flex:1, background:"transparent", outline:"none", color:C.text, fontSize:13 }}/>
          </div>
          <select value={filt} onChange={e=>{setFilt(e.target.value);setPg(0);}} style={sel(C)}>
            {["All","Completed","Pending","Failed"].map(o=><option key={o}>{o}</option>)}
          </select>
          <select value={sort} onChange={e=>setSort(e.target.value)} style={sel(C)}>
            <option value="date">Sort: Date</option><option value="amount">Sort: Amount</option>
          </select>
          <button style={{ ...sel(C), display:"flex", alignItems:"center", gap:7, color:C.text }}><Download size={15}/> Export</button>
        </div>
        <TxTable C={C} rows={view} cur={cur}/>
        <div className="flex items-center justify-between" style={{ padding:"12px 18px", fontSize:13, color:C.sub }}>
          <span>{filtered.length} transactions</span>
          <div className="flex items-center gap-2">
            <button disabled={pg===0} onClick={()=>setPg(p=>p-1)} style={pgBtn(C,pg===0)}>Prev</button>
            <span>{pg+1} / {pages}</span>
            <button disabled={pg>=pages-1} onClick={()=>setPg(p=>p+1)} style={pgBtn(C,pg>=pages-1)}>Next</button>
          </div>
        </div>
      </Card>
    </div>
  );
}
const sel = (C) => ({ background:C.soft, border:`1px solid ${C.border}`, color:C.text, borderRadius:10, padding:"9px 11px", fontSize:13, fontWeight:600, cursor:"pointer" });
const pgBtn = (C,dis) => ({ background:C.soft, border:`1px solid ${C.border}`, color:dis?C.sub:C.text, borderRadius:9, padding:"6px 12px", fontWeight:600, opacity:dis?.5:1, cursor:dis?"default":"pointer" });

/* ── Cards ─────────────────────────────────────────────────────── */
function Cards({ C, cur }) {
  const [frozen,setFrozen]=useState({});
  const cardList=[
    { name:"Platinum", num:"•• 4821", grad:`linear-gradient(135deg,${NAVY},#0e3e63 60%,${CYAN})`, type:"Physical", limit:25000, bal:8420 },
    { name:"Business", num:"•• 7710", grad:`linear-gradient(135deg,#1a1a2e,#16213e 60%,${EMERALD})`, type:"Physical", limit:60000, bal:21340 },
    { name:"Virtual", num:"•• 0093", grad:`linear-gradient(135deg,#312e81,#6d28d9 60%,#06B6D4)`, type:"Virtual", limit:5000, bal:640 },
  ];
  return (
    <div className="finora-rise">
      <PageHead C={C} title="Cards" sub="Manage physical and virtual cards." action="Add card"/>
      <div className="grid-cards">
        {cardList.map((c,i)=>(
          <div key={i}>
            <div style={{ borderRadius:20, padding:22, color:"#fff", aspectRatio:"1.6/1",
              background:c.grad, position:"relative", overflow:"hidden",
              boxShadow:"0 18px 40px rgba(2,6,23,.25)", opacity:frozen[i]?.6:1, transition:"opacity .3s" }}>
              <div className="flex items-center justify-between">
                <img src={LOGO} style={{ width:30, filter:"brightness(0) invert(1)" }} alt=""/>
                <span style={{ fontWeight:700, letterSpacing:".1em", fontSize:13 }}>{c.type.toUpperCase()}</span>
              </div>
              <div style={{ position:"absolute", bottom:54, left:22, fontSize:20, letterSpacing:".18em", fontFamily:"monospace" }}>{c.num}</div>
              <div className="flex items-center justify-between" style={{ position:"absolute", bottom:18, left:22, right:22 }}>
                <div><div style={{ fontSize:10, opacity:.7 }}>CARD HOLDER</div><div style={{ fontWeight:600 }}>HATEM</div></div>
                <div style={{ fontStyle:"italic", fontWeight:800, fontSize:18 }}>{c.name}</div>
              </div>
              {frozen[i] && <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center",
                background:"rgba(2,6,23,.35)", fontWeight:700, gap:8 }}><Snowflake size={18}/> Frozen</div>}
            </div>
            <Card C={C} style={{ padding:16, marginTop:14 }}>
              <div className="flex items-center justify-between" style={{ fontSize:13 }}>
                <span style={{ color:C.sub }}>Spent / Limit</span>
                <span style={{ fontWeight:700 }}>{money(c.bal,cur)} / {money(c.limit,cur)}</span>
              </div>
              <ProgressBar C={C} pct={c.bal/c.limit} color={CYAN}/>
              <div className="flex gap-2" style={{ marginTop:14 }}>
                <button onClick={()=>setFrozen(f=>({...f,[i]:!f[i]}))} style={{ flex:1, ...sel(C),
                  color: frozen[i]?DONE:C.text, display:"flex", alignItems:"center", justifyContent:"center", gap:6 }}>
                  <Snowflake size={15}/> {frozen[i]?"Unfreeze":"Freeze"}
                </button>
                <button style={{ flex:1, ...sel(C), color:C.text }}>Limits</button>
                <button style={{ ...sel(C), color:C.text }}><Eye size={15}/></button>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Investments ───────────────────────────────────────────────── */
function Investments({ C, cur }) {
  const total = assets.reduce((a,b)=>a+b.val,0);
  return (
    <div className="finora-rise">
      <PageHead C={C} title="Investments" sub="Portfolio overview and market movers."/>
      <div className="grid-stats" style={{ gridTemplateColumns:"repeat(3,1fr)" }}>
        {[
          { l:"Total Assets", v:total, s:"Across 6 holdings", up:true },
          { l:"Daily Gain / Loss", v:8240, s:"+1.34% today", up:true, sign:"+" },
          { l:"Realized YTD", v:42180, s:"+18.7% return", up:true, sign:"+" },
        ].map((s,i)=>(
          <Card key={i} C={C} style={{ padding:18 }}>
            <div style={{ color:C.sub, fontSize:13, fontWeight:600 }}>{s.l}</div>
            <div style={{ fontSize:24, fontWeight:800, marginTop:8 }}>{s.sign}<AnimatedMoney value={s.v} cur={cur}/></div>
            <div style={{ fontSize:12, color:PROFIT, marginTop:4, fontWeight:600 }}>{s.s}</div>
          </Card>
        ))}
      </div>
      <div className="grid-charts" style={{ marginTop:18 }}>
        <ChartCard C={C} title="Asset Allocation">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={assets} dataKey="val" nameKey="name" innerRadius={55} outerRadius={90} paddingAngle={3} stroke="none">
                {assets.map((a,i)=><Cell key={i} fill={[NAVY,EMERALD,CYAN,"#8B5CF6","#F59E0B","#EC4899"][i]}/>)}
              </Pie>
              <Tooltip contentStyle={tip(C)} formatter={v=>money(v,cur)}/>
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
        <Card C={C} style={{ padding:0, overflow:"hidden", gridColumn:"span 1" }}>
          <h3 style={{ fontWeight:700, padding:"16px 18px" }}>Holdings & Top Movers</h3>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", fontSize:13.5, borderCollapse:"collapse", minWidth:460 }}>
              <thead><tr style={{ color:C.sub }}>
                {["Asset","Type","Value","24h"].map(h=><th key={h} style={{ padding:"10px 18px", textAlign:h==="Value"||h==="24h"?"end":"start", fontWeight:600, borderTop:`1px solid ${C.border}` }}>{h}</th>)}
              </tr></thead>
              <tbody>{assets.map(a=>(
                <tr key={a.sym} className="tx-row">
                  <td style={td(C)}><div style={{ fontWeight:700 }}>{a.sym}</div><div style={{ color:C.sub, fontSize:11 }}>{a.name}</div></td>
                  <td style={{ ...td(C), color:C.sub }}>{a.type}</td>
                  <td style={{ ...td(C), textAlign:"end", fontWeight:700 }}>{money(a.val,cur)}</td>
                  <td style={{ ...td(C), textAlign:"end", fontWeight:700, color:a.chg>=0?PROFIT:LOSS }}>
                    <span className="flex items-center justify-end gap-1">{a.chg>=0?<TrendingUp size={14}/>:<TrendingDown size={14}/>}{a.chg>=0?"+":""}{a.chg}%</span>
                  </td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ── Budgets ───────────────────────────────────────────────────── */
function Budgets({ C, cur }) {
  return (
    <div className="finora-rise">
      <PageHead C={C} title="Budgets" sub="Smart monthly budgeting and spending insights."/>
      <div className="grid-charts">
        <Card C={C} style={{ padding:18, gridColumn:"span 2" }} className="span2">
          <h3 style={{ fontWeight:700, marginBottom:14 }}>Monthly Budgets</h3>
          {budgets.map((b,i)=>{
            const pct=b.spent/b.cap, over=pct>1;
            return (
              <div key={i} style={{ marginBottom:16 }}>
                <div className="flex items-center justify-between" style={{ fontSize:13.5, marginBottom:6 }}>
                  <span style={{ fontWeight:600 }}>{b.cat}</span>
                  <span style={{ color: over?LOSS:C.sub, fontWeight:600 }}>{money(b.spent,cur)} / {money(b.cap,cur)}</span>
                </div>
                <div style={{ height:9, borderRadius:99, background:C.faint, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${Math.min(pct,1)*100}%`, borderRadius:99,
                    background: over?`linear-gradient(90deg,${LOSS},#f87171)`:`linear-gradient(90deg,${b.c},${b.c}aa)`, transition:"width 1s" }}/>
                </div>
              </div>
            );
          })}
        </Card>
        <Card C={C} style={{ padding:18 }}>
          <h3 style={{ fontWeight:700, marginBottom:12, display:"flex", alignItems:"center", gap:8 }}><Sparkles size={17} color={CYAN}/> AI Insights</h3>
          {insights.map((t,i)=>(
            <div key={i} style={{ display:"flex", gap:10, padding:"12px 0", borderTop:i?`1px solid ${C.border}`:"none" }}>
              <div style={{ width:8, height:8, borderRadius:99, background:CYAN, marginTop:6, flexShrink:0 }}/>
              <p style={{ fontSize:13.5, color:C.text, lineHeight:1.5 }}>{t}</p>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}

/* ── Bills ─────────────────────────────────────────────────────── */
function Bills({ C, cur }) {
  return (
    <div className="finora-rise">
      <PageHead C={C} title="Bills & Payments" sub="Track upcoming, paid, and overdue bills."/>
      <Card C={C} style={{ padding:0, overflow:"hidden" }}>
        {bills.map((b,i)=>(
          <div key={i} className="flex items-center gap-4" style={{ padding:"16px 18px", borderTop:i?`1px solid ${C.border}`:"none" }}>
            <div style={{ width:42, height:42, borderRadius:12, background:C.soft, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <Receipt size={19} color={C.sub}/>
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:700, fontSize:14 }}>{b.name}</div>
              <div style={{ fontSize:12, color:C.sub }}>Due {b.due}</div>
            </div>
            <div style={{ fontWeight:800 }}>{money(b.amt,cur)}</div>
            <StatusPill s={b.st}/>
            {b.st!=="Paid" && <button style={{ ...sel(C), color:"#fff", background:NAVY, border:"none" }}>Pay</button>}
          </div>
        ))}
      </Card>
    </div>
  );
}

/* ── Security ──────────────────────────────────────────────────── */
function Security({ C }) {
  const items=[
    { ic:Lock, t:"Two-factor authentication", d:"Enabled via authenticator app", on:true },
    { ic:User, t:"Biometric login", d:"Face ID on this device", on:true },
    { ic:Bell, t:"Login alerts", d:"Email me on new device sign-in", on:true },
    { ic:Shield, t:"Withdrawal whitelist", d:"Restrict transfers to known accounts", on:false },
  ];
  return (
    <div className="finora-rise">
      <PageHead C={C} title="Security Center" sub="Protect your account and review activity."/>
      <div className="grid-charts">
        <Card C={C} style={{ padding:22, gridColumn:"span 1" }}>
          <div style={{ color:C.sub, fontSize:13, fontWeight:600 }}>Security Score</div>
          <div style={{ display:"flex", alignItems:"center", gap:18, marginTop:10 }}>
            <Ring pct={0.86}/>
            <div><div style={{ fontSize:30, fontWeight:800 }}>86<span style={{ fontSize:15, color:C.sub }}>/100</span></div>
            <div style={{ color:PROFIT, fontSize:13, fontWeight:600 }}>Strong protection</div></div>
          </div>
        </Card>
        <Card C={C} style={{ padding:8, gridColumn:"span 2" }} className="span2">
          {items.map((it,i)=>(
            <div key={i} className="flex items-center gap-3" style={{ padding:"14px 14px", borderTop:i?`1px solid ${C.border}`:"none" }}>
              <div style={{ width:38, height:38, borderRadius:11, background:C.soft, display:"flex", alignItems:"center", justifyContent:"center" }}><it.ic size={18} color={C.sub}/></div>
              <div style={{ flex:1 }}><div style={{ fontWeight:700, fontSize:14 }}>{it.t}</div><div style={{ fontSize:12, color:C.sub }}>{it.d}</div></div>
              <Toggle on={it.on}/>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
function Ring({ pct }) {
  const r=34,c=2*Math.PI*r;
  return (
    <svg width="86" height="86" viewBox="0 0 86 86">
      <circle cx="43" cy="43" r={r} fill="none" stroke="rgba(148,163,184,.25)" strokeWidth="9"/>
      <circle cx="43" cy="43" r={r} fill="none" stroke={EMERALD} strokeWidth="9" strokeLinecap="round"
        strokeDasharray={c} strokeDashoffset={c*(1-pct)} transform="rotate(-90 43 43)"/>
    </svg>
  );
}
function Toggle({ on:init }) {
  const [on,setOn]=useState(init);
  return (
    <button onClick={()=>setOn(o=>!o)} style={{ width:46, height:26, borderRadius:99, padding:3,
      background:on?EMERALD:"#94a3b8", transition:"background .2s", display:"flex",
      justifyContent:on?"flex-end":"flex-start" }}>
      <span style={{ width:20, height:20, borderRadius:99, background:"#fff", transition:"all .2s" }}/>
    </button>
  );
}

/* ── Settings ──────────────────────────────────────────────────── */
function SettingsPage({ C, dark, setDark, lang, setLang }) {
  return (
    <div className="finora-rise" style={{ maxWidth:760 }}>
      <PageHead C={C} title="Settings" sub="Appearance, language, and notifications."/>
      <Card C={C} style={{ padding:20, marginBottom:16 }}>
        <h3 style={{ fontWeight:700, marginBottom:14 }}>Appearance</h3>
        <div className="flex gap-3">
          {[["Light",false],["Dark",true]].map(([l,v])=>(
            <button key={l} onClick={()=>setDark(v)} style={{ flex:1, padding:"16px", borderRadius:14,
              border:`2px solid ${dark===v?CYAN:C.border}`, background:C.soft, color:C.text, fontWeight:700,
              display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
              {v?<Moon size={17}/>:<Sun size={17}/>}{l}{dark===v&&<Check size={16} color={CYAN}/>}
            </button>
          ))}
        </div>
      </Card>
      <Card C={C} style={{ padding:20, marginBottom:16 }}>
        <h3 style={{ fontWeight:700, marginBottom:14 }}>Language</h3>
        <div className="flex gap-3">
          {[["English (LTR)","en"],["العربية (RTL)","ar"]].map(([l,v])=>(
            <button key={v} onClick={()=>setLang(v)} style={{ flex:1, padding:"14px", borderRadius:14,
              border:`2px solid ${lang===v?CYAN:C.border}`, background:C.soft, color:C.text, fontWeight:700 }}>{l}</button>
          ))}
        </div>
      </Card>
      <Card C={C} style={{ padding:8 }}>
        {[["Email alerts",true],["Push notifications",true],["SMS alerts",false]].map(([l,v],i)=>(
          <div key={l} className="flex items-center justify-between" style={{ padding:"14px 14px", borderTop:i?`1px solid ${C.border}`:"none" }}>
            <span style={{ fontWeight:600, fontSize:14 }}>{l}</span><Toggle on={v}/>
          </div>
        ))}
      </Card>
    </div>
  );
}

/* ── shared head ───────────────────────────────────────────────── */
function PageHead({ C, title, sub, action }) {
  return (
    <div className="flex items-center justify-between" style={{ marginBottom:18, flexWrap:"wrap", gap:10 }}>
      <div><h1 style={{ fontSize:23, fontWeight:800 }}>{title}</h1><p style={{ color:C.sub, marginTop:2 }}>{sub}</p></div>
      {action && <button style={{ display:"flex", alignItems:"center", gap:7, background:NAVY, color:"#fff",
        padding:"10px 16px", borderRadius:12, fontWeight:700, fontSize:14 }}><Plus size={16}/> {action}</button>}
    </div>
  );
}

/* ── global styles ─────────────────────────────────────────────── */
function Styles() {
  return (
    <style>{`
      * { box-sizing: border-box; }
      button { cursor: pointer; border: none; background: none; font-family: inherit; }
      .finora-fade { animation: fade .6s ease both; }
      .finora-rise { animation: rise .45s ease both; }
      @keyframes fade { from { opacity:0; transform:translateY(8px);} to {opacity:1;transform:none;} }
      @keyframes rise { from { opacity:0; transform:translateY(14px);} to {opacity:1;transform:none;} }
      .finora-float { animation: float 5s ease-in-out infinite; }
      .finora-float2 { animation: float 5s ease-in-out infinite 1.2s; }
      @keyframes float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-10px);} }
      .shimmer { position:relative; overflow:hidden; }
      .shimmer::after { content:""; position:absolute; inset:0; transform:translateX(-100%);
        background:linear-gradient(90deg,transparent,rgba(148,163,184,.25),transparent); animation:sh 1.3s infinite; }
      @keyframes sh { 100%{transform:translateX(100%);} }
      .tx-row:hover { background: rgba(100,116,139,.06); }
      .grid-stats { display:grid; grid-template-columns:repeat(6,1fr); gap:14px; }
      .grid-charts { display:grid; grid-template-columns:repeat(3,1fr); gap:18px; }
      .grid-charts .span2 { grid-column: span 2; }
      .grid-cards { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
      @media (max-width:1100px){ .grid-stats{grid-template-columns:repeat(3,1fr);} .grid-charts{grid-template-columns:1fr;} .grid-charts .span2{grid-column:auto;} .grid-cards{grid-template-columns:1fr 1fr;} }
      @media (max-width:760px){ .hide-mobile{display:none!important;} .main-pad{margin:0!important;} .grid-stats{grid-template-columns:1fr 1fr;} .grid-cards{grid-template-columns:1fr;} }
      input::placeholder { color:#94a3b8; }
      ::-webkit-scrollbar{height:8px;width:8px;} ::-webkit-scrollbar-thumb{background:rgba(148,163,184,.4);border-radius:8px;}
    `}</style>
  );
}
