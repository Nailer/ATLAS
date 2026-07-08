import { useState, useEffect, useRef } from "react";

const COLORS = {
  bg: "#080B14",
  bgCard: "#0D1120",
  bgCard2: "#111827",
  border: "#1E2D4A",
  borderGlow: "#2A4A7F",
  primary: "#00E5FF",
  primaryDim: "#00B8CC",
  secondary: "#7B61FF",
  accent: "#FF6B6B",
  green: "#00FF94",
  amber: "#FFB800",
  text: "#E8EDF5",
  textMuted: "#6B7FA3",
  textDim: "#3A4A6B",
};

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: ${COLORS.bg}; color: ${COLORS.text}; font-family: 'Space Grotesk', sans-serif; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: ${COLORS.bg}; }
  ::-webkit-scrollbar-thumb { background: ${COLORS.borderGlow}; border-radius: 2px; }

  @keyframes pulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }
  @keyframes float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
  @keyframes scanline { 0% { top: -20px; } 100% { top: 100%; } }
  @keyframes glow { 0%,100% { box-shadow: 0 0 20px rgba(0,229,255,0.3); } 50% { box-shadow: 0 0 40px rgba(0,229,255,0.6), 0 0 80px rgba(0,229,255,0.2); } }
  @keyframes dataStream { 0% { transform: translateY(-100%); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateY(100vh); opacity: 0; } }
  @keyframes shimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
  @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  @keyframes ripple { 0% { transform: scale(1); opacity: 0.6; } 100% { transform: scale(3); opacity: 0; } }
  @keyframes countUp { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideIn { from { transform: translateX(-20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
  @keyframes barGrow { from { transform: scaleY(0); } to { transform: scaleY(1); } }

  .fade-in { animation: fadeIn 0.5s ease forwards; }
  .pulse-dot { animation: pulse 2s infinite; }
  .float { animation: float 4s ease-in-out infinite; }
  .glow-anim { animation: glow 3s ease-in-out infinite; }
  .shimmer-text {
    background: linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary}, ${COLORS.primary});
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 3s linear infinite;
  }

  .btn-primary {
    background: linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary});
    color: ${COLORS.bg};
    border: none;
    padding: 12px 28px;
    border-radius: 10px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    letter-spacing: 0.5px;
  }
  .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,229,255,0.4); }

  .btn-ghost {
    background: transparent;
    color: ${COLORS.text};
    border: 1px solid ${COLORS.border};
    padding: 11px 24px;
    border-radius: 10px;
    font-family: 'Space Grotesk', sans-serif;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }
  .btn-ghost:hover { border-color: ${COLORS.primary}; color: ${COLORS.primary}; background: rgba(0,229,255,0.05); }

  .card {
    background: ${COLORS.bgCard};
    border: 1px solid ${COLORS.border};
    border-radius: 16px;
    padding: 24px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s;
  }
  .card:hover { border-color: ${COLORS.borderGlow}; }
  .card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0,229,255,0.3), transparent);
  }

  .metric-card {
    background: ${COLORS.bgCard2};
    border: 1px solid ${COLORS.border};
    border-radius: 12px;
    padding: 20px;
    text-align: center;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.5px;
  }
  .tag-cyan { background: rgba(0,229,255,0.12); color: ${COLORS.primary}; border: 1px solid rgba(0,229,255,0.2); }
  .tag-purple { background: rgba(123,97,255,0.12); color: ${COLORS.secondary}; border: 1px solid rgba(123,97,255,0.2); }
  .tag-green { background: rgba(0,255,148,0.12); color: ${COLORS.green}; border: 1px solid rgba(0,255,148,0.2); }
  .tag-amber { background: rgba(255,184,0,0.12); color: ${COLORS.amber}; border: 1px solid rgba(255,184,0,0.2); }
  .tag-red { background: rgba(255,107,107,0.12); color: ${COLORS.accent}; border: 1px solid rgba(255,107,107,0.2); }

  .nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 14px;
    border-radius: 10px;
    cursor: pointer;
    transition: all 0.2s;
    font-size: 14px;
    color: ${COLORS.textMuted};
    border: 1px solid transparent;
  }
  .nav-item:hover { color: ${COLORS.text}; background: rgba(255,255,255,0.04); }
  .nav-item.active { color: ${COLORS.primary}; background: rgba(0,229,255,0.08); border-color: rgba(0,229,255,0.15); }

  .progress-bar {
    height: 4px;
    background: ${COLORS.border};
    border-radius: 2px;
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    border-radius: 2px;
    background: linear-gradient(90deg, ${COLORS.primary}, ${COLORS.secondary});
    transition: width 1s ease;
  }

  .tx-row {
    display: flex;
    align-items: center;
    padding: 14px 0;
    border-bottom: 1px solid rgba(30,45,74,0.5);
    gap: 12px;
    animation: slideIn 0.4s ease forwards;
  }
  .tx-row:last-child { border-bottom: none; }

  input[type="text"], input[type="number"], select {
    width: 100%;
    background: rgba(13,17,32,0.8);
    border: 1px solid ${COLORS.border};
    border-radius: 10px;
    padding: 12px 16px;
    color: ${COLORS.text};
    font-family: 'Space Grotesk', sans-serif;
    font-size: 14px;
    outline: none;
    transition: all 0.2s;
  }
  input:focus, select:focus { border-color: ${COLORS.primary}; box-shadow: 0 0 0 3px rgba(0,229,255,0.1); }

  .toggle {
    width: 44px;
    height: 24px;
    background: ${COLORS.border};
    border-radius: 12px;
    position: relative;
    cursor: pointer;
    transition: background 0.3s;
  }
  .toggle.on { background: ${COLORS.primary}; }
  .toggle::after {
    content: '';
    position: absolute;
    top: 3px; left: 3px;
    width: 18px; height: 18px;
    background: white;
    border-radius: 50%;
    transition: transform 0.3s;
  }
  .toggle.on::after { transform: translateX(20px); }

  .agent-card {
    background: linear-gradient(135deg, ${COLORS.bgCard}, ${COLORS.bgCard2});
    border: 1px solid ${COLORS.border};
    border-radius: 14px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s;
    position: relative;
    overflow: hidden;
  }
  .agent-card:hover { border-color: ${COLORS.secondary}; transform: translateY(-2px); box-shadow: 0 8px 40px rgba(123,97,255,0.2); }
  .agent-card::after {
    content: '';
    position: absolute;
    top: 0; left: 0;
    right: 0; bottom: 0;
    background: linear-gradient(135deg, rgba(123,97,255,0.05), transparent);
    pointer-events: none;
  }

  .hexagon {
    width: 48px; height: 48px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  }

  .data-stream-line {
    position: fixed;
    width: 1px;
    background: linear-gradient(to bottom, transparent, rgba(0,229,255,0.6), transparent);
    animation: dataStream linear infinite;
    pointer-events: none;
  }

  .bounty-card {
    background: ${COLORS.bgCard};
    border: 1px solid ${COLORS.border};
    border-radius: 16px;
    padding: 24px;
    transition: all 0.3s;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .bounty-card:hover { transform: translateY(-3px); border-color: ${COLORS.amber}; box-shadow: 0 12px 50px rgba(255,184,0,0.15); }

  .orbit-ring {
    border-radius: 50%;
    border: 1px solid;
    position: absolute;
    animation: spin linear infinite;
    pointer-events: none;
  }

  .chart-bar {
    transform-origin: bottom;
    animation: barGrow 1s ease forwards;
  }
`;

// ─── PARTICLE BACKGROUND ─────────────────────────────────────────────────────
function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
    }));
    let raf;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${p.alpha})`;
        ctx.fill();
      });
      particles.forEach((p, i) => {
        particles.slice(i + 1).forEach((q) => {
          const dx = p.x - q.x, dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 100) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(0,229,255,${0.08 * (1 - d / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        });
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.6 }} />;
}

// ─── MINI CHART ───────────────────────────────────────────────────────────────
function MiniChart({ data, color = COLORS.primary, height = 60 }) {
  const w = 200, h = height;
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((v - min) / (max - min || 1)) * (h - 8) - 4;
    return `${x},${y}`;
  });
  const area = `M${pts[0]} L${pts.join(" L")} L${w},${h} L0,${h} Z`;
  const line = `M${pts[0]} L${pts.join(" L")}`;
  const id = `g${Math.random().toString(36).slice(2)}`;
  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.3" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${id})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── TICKER ───────────────────────────────────────────────────────────────────
function LiveTicker() {
  const [val, setVal] = useState(142857430);
  useEffect(() => {
    const t = setInterval(() => setVal((v) => v + Math.floor(Math.random() * 5000 + 1000)), 1200);
    return () => clearInterval(t);
  }, []);
  return (
    <span style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.green, fontSize: 13 }}>
      ${val.toLocaleString()}
    </span>
  );
}

// ─── LANDING PAGE ─────────────────────────────────────────────────────────────
function LandingPage({ onEnter }) {
  const [stats] = useState([
    { label: "Total Volume", value: "$2.4B+", sub: "private transactions" },
    { label: "Active Users", value: "840K+", sub: "across 94 countries" },
    { label: "AI Agents", value: "12,400+", sub: "autonomous finance bots" },
    { label: "Enterprises", value: "320+", sub: "companies using VeilPay" },
  ]);
  const features = [
    { icon: "🔐", title: "Private Balances", desc: "Encrypted vault infrastructure. Your net worth stays invisible on-chain.", tag: "Core", tagStyle: "tag-cyan" },
    { icon: "👤", title: "GhostID System", desc: "Replace wallet addresses with @identity handles. Human-readable, cryptographically private.", tag: "Identity", tagStyle: "tag-purple" },
    { icon: "🤖", title: "AI Agent Finance", desc: "Deploy autonomous financial agents that transact privately on your behalf.", tag: "AI-Native", tagStyle: "tag-amber" },
    { icon: "🏢", title: "Private Payroll", desc: "Pay 10,000+ employees without exposing a single salary on-chain.", tag: "Enterprise", tagStyle: "tag-green" },
    { icon: "📋", title: "Selective Compliance", desc: "Generate auditor-grade reports with zero-knowledge proofs. Privacy meets regulation.", tag: "Compliance", tagStyle: "tag-cyan" },
    { icon: "⚡", title: "Solana Speed", desc: "Sub-second finality. 65,000 TPS. Negligible fees. Built for global commerce.", tag: "Infrastructure", tagStyle: "tag-purple" },
  ];
  return (
    <div style={{ minHeight: "100vh", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0 }}><ParticleField /></div>
      {/* Glow orbs */}
      <div style={{ position: "absolute", top: "10%", left: "15%", width: 400, height: 400, background: "radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", top: "30%", right: "10%", width: 500, height: 500, background: "radial-gradient(circle, rgba(123,97,255,0.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Nav */}
      <nav style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 48px", borderBottom: `1px solid ${COLORS.border}`, background: "rgba(8,11,20,0.8)", backdropFilter: "blur(20px)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: COLORS.bg }}>V</div>
          <span style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-0.5px" }}>VeilPay</span>
          <span className="tag tag-cyan" style={{ fontSize: 10 }}>BETA</span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button className="btn-ghost" style={{ padding: "9px 20px", fontSize: 13 }}>Docs</button>
          <button className="btn-primary" onClick={onEnter} style={{ padding: "9px 20px", fontSize: 13 }}>Launch App →</button>
        </div>
      </nav>

      {/* Hero */}
      <div style={{ position: "relative", zIndex: 5, maxWidth: 900, margin: "0 auto", padding: "100px 24px 60px", textAlign: "center" }}>
        <div className="tag tag-cyan" style={{ marginBottom: 28, display: "inline-flex" }}>
          <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.green }} />
          Live on Solana Mainnet · Umbra SDK v3.2
        </div>
        <h1 style={{ fontSize: "clamp(40px,7vw,72px)", fontWeight: 700, lineHeight: 1.08, letterSpacing: "-2px", marginBottom: 24 }}>
          The First Private<br />
          <span className="shimmer-text">Financial OS</span><br />
          for Stablecoins
        </h1>
        <p style={{ fontSize: 18, color: COLORS.textMuted, lineHeight: 1.7, maxWidth: 560, margin: "0 auto 40px" }}>
          Crypto accidentally turned finance into public social media. VeilPay gives you Swiss-bank privacy with Apple-Pay simplicity — on Solana.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-primary glow-anim" onClick={onEnter} style={{ fontSize: 16, padding: "14px 36px" }}>
            Open Dashboard →
          </button>
          <button className="btn-ghost" style={{ fontSize: 14 }}>Watch Demo</button>
        </div>

        {/* Live stat bar */}
        <div style={{ marginTop: 48, padding: "16px 24px", background: "rgba(13,17,32,0.8)", border: `1px solid ${COLORS.border}`, borderRadius: 12, display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap", backdropFilter: "blur(10px)" }}>
          <span style={{ fontSize: 13, color: COLORS.textMuted }}>Total private volume today:</span>
          <LiveTicker />
          <span style={{ fontSize: 12, color: COLORS.textDim }}>|</span>
          <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.green, alignSelf: "center" }} />
          <span style={{ fontSize: 13, color: COLORS.green }}>All systems operational</span>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ position: "relative", zIndex: 5, maxWidth: 900, margin: "0 auto 80px", padding: "0 24px", display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
        {stats.map((s) => (
          <div key={s.label} className="metric-card">
            <div style={{ fontSize: 28, fontWeight: 700, color: COLORS.primary, letterSpacing: "-1px" }}>{s.value}</div>
            <div style={{ fontSize: 11, color: COLORS.textMuted, marginTop: 4 }}>{s.sub}</div>
          </div>
        ))}
      </div>

      {/* Features */}
      <div style={{ position: "relative", zIndex: 5, maxWidth: 900, margin: "0 auto 80px", padding: "0 24px" }}>
        <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 700, marginBottom: 8, letterSpacing: "-1px" }}>Everything Private Finance Needs</h2>
        <p style={{ textAlign: "center", color: COLORS.textMuted, marginBottom: 48, fontSize: 15 }}>Built on Umbra SDK privacy primitives. Deployed on Solana's speed.</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {features.map((f) => (
            <div key={f.title} className="card" style={{ cursor: "default" }}>
              <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
              <span className={`tag ${f.tagStyle}`} style={{ marginBottom: 10, fontSize: 11 }}>{f.tag}</span>
              <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 8, marginTop: 8 }}>{f.title}</h3>
              <p style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ position: "relative", zIndex: 5, textAlign: "center", padding: "60px 24px 80px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", padding: "48px", background: `linear-gradient(135deg, rgba(0,229,255,0.06), rgba(123,97,255,0.06))`, border: `1px solid ${COLORS.borderGlow}`, borderRadius: 24 }}>
          <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 12, letterSpacing: "-1px" }}>Banking for the AI Economy</h2>
          <p style={{ color: COLORS.textMuted, marginBottom: 28, lineHeight: 1.6 }}>VeilPay is not a wallet. It is the financial operating system that the next trillion-dollar economy runs on.</p>
          <button className="btn-primary" onClick={onEnter} style={{ fontSize: 16, padding: "14px 40px" }}>Enter VeilPay →</button>
        </div>
      </div>
    </div>
  );
}

// ─── ONBOARDING ────────────────────────────────────────────────────────────────
function Onboarding({ onComplete }) {
  const [step, setStep] = useState(0);
  const [ghostId, setGhostId] = useState("");
  const [profile, setProfile] = useState("personal");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const profiles = [
    { id: "personal", icon: "👤", label: "Personal", desc: "For everyday private payments" },
    { id: "business", icon: "🏢", label: "Business", desc: "Enterprise payroll & treasury" },
    { id: "dao", icon: "🏛️", label: "DAO", desc: "Decentralized governance funds" },
    { id: "ai", icon: "🤖", label: "AI Agent", desc: "Autonomous financial agent" },
  ];

  const handleGenerate = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 2000);
  };

  const steps = [
    {
      title: "Choose your GhostID",
      subtitle: "Your private financial identity. Share this instead of a wallet address.",
      content: (
        <div>
          <div style={{ position: "relative", marginBottom: 16 }}>
            <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: COLORS.primary, fontWeight: 700, fontSize: 16 }}>@</span>
            <input type="text" value={ghostId} onChange={(e) => setGhostId(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))} placeholder="youridentity" style={{ paddingLeft: 36, fontSize: 20, fontWeight: 600, letterSpacing: "-0.5px" }} />
          </div>
          {ghostId && (
            <div className="fade-in" style={{ padding: "14px 16px", background: "rgba(0,229,255,0.06)", border: `1px solid rgba(0,229,255,0.2)`, borderRadius: 10, fontSize: 13, color: COLORS.textMuted }}>
              ✓ <span style={{ color: COLORS.primary }}>@{ghostId}</span> is available · ghostlayer.app/pay/@{ghostId}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Select your profile type",
      subtitle: "Each profile gets isolated vaults, balances, and privacy pools.",
      content: (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {profiles.map((p) => (
            <div key={p.id} onClick={() => setProfile(p.id)} style={{ padding: 16, border: `1px solid ${profile === p.id ? COLORS.primary : COLORS.border}`, borderRadius: 12, cursor: "pointer", background: profile === p.id ? "rgba(0,229,255,0.06)" : "transparent", transition: "all 0.2s" }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{p.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{p.label}</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted }}>{p.desc}</div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: "Generating encrypted vault",
      subtitle: "Your private financial infrastructure is being initialized.",
      content: (
        <div style={{ textAlign: "center" }}>
          {!generated ? (
            <div>
              <div style={{ width: 80, height: 80, margin: "0 auto 24px", border: `3px solid ${COLORS.primary}`, borderTop: "3px solid transparent", borderRadius: "50%", animation: generating ? "spin 1s linear infinite" : "none" }} />
              {generating ? (
                <div>
                  {["Generating master keypair...", "Creating stealth address system...", "Initializing encrypted vault...", "Configuring Umbra SDK..."].map((t, i) => (
                    <div key={t} style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 6, animation: `fadeIn 0.5s ${i * 0.4}s forwards`, opacity: 0 }}>
                      <span style={{ color: COLORS.green }}>✓</span> {t}
                    </div>
                  ))}
                </div>
              ) : (
                <button className="btn-primary" onClick={handleGenerate} style={{ marginTop: 16 }}>Generate Vault</button>
              )}
            </div>
          ) : (
            <div className="fade-in">
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔐</div>
              <div style={{ padding: 16, background: "rgba(0,255,148,0.06)", border: `1px solid rgba(0,255,148,0.2)`, borderRadius: 12, marginBottom: 16 }}>
                <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 4 }}>GhostID</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: COLORS.primary }}>@{ghostId || "anon"}</div>
              </div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.textDim, wordBreak: "break-all", padding: "10px", background: COLORS.bgCard, borderRadius: 8 }}>
                vk_1qzp...f8x2 · sa_0xd4a...b7c1
              </div>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: COLORS.bg, position: "relative" }}>
      <div style={{ position: "absolute", inset: 0 }}><ParticleField /></div>
      <div style={{ position: "relative", zIndex: 5, width: "100%", maxWidth: 520, padding: 24 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 4 }}>VeilPay</div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
            {steps.map((_, i) => (
              <div key={i} style={{ height: 4, width: 40, borderRadius: 2, background: i <= step ? COLORS.primary : COLORS.border, transition: "background 0.4s" }} />
            ))}
          </div>
        </div>
        <div className="card fade-in" key={step} style={{ padding: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.5px" }}>{steps[step].title}</h2>
          <p style={{ color: COLORS.textMuted, fontSize: 14, marginBottom: 28, lineHeight: 1.6 }}>{steps[step].subtitle}</p>
          {steps[step].content}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 28 }}>
            {step > 0 ? <button className="btn-ghost" onClick={() => setStep(step - 1)}>← Back</button> : <div />}
            <button className="btn-primary" onClick={() => { if (step < steps.length - 1) setStep(step + 1); else onComplete({ ghostId: ghostId || "anon", profile }); }}>
              {step === steps.length - 1 ? "Enter VeilPay →" : "Continue →"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({ user }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(`@${user?.ghostId || "anon"}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const chartData = [28, 45, 32, 58, 67, 49, 72, 85, 63, 91, 78, 95];
  const txns = [
    { id: 1, type: "received", from: "@sukuna_corp", amount: "+$12,500", token: "USDC", time: "2m ago", note: "Q4 consulting fee", hidden: true, hash: "2V6R8m...7uW9" },
    { id: 2, type: "sent", to: "@raydev", amount: "-$850", token: "USDC", time: "1h ago", note: "Design retainer", hash: "4A9y9Z...3kP2" },
    { id: 3, type: "received", from: "@ghostdao", amount: "+$5,200", token: "USDC", time: "3h ago", note: "DAO grant payout", hidden: true, hash: "7S3x2W...9nL5" },
    { id: 4, type: "sent", to: "@aiagent_0x1", amount: "-$320", token: "USDC", time: "5h ago", note: "API credits", hash: "5T8v4M...1qR8" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
      {/* Balance card */}
      <div className="card" style={{ gridColumn: "1/-1", background: "linear-gradient(135deg, rgba(0,229,255,0.08), rgba(123,97,255,0.08))", borderColor: COLORS.borderGlow, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, width: 200, height: 200, background: "radial-gradient(circle, rgba(0,229,255,0.1) 0%, transparent 70%)" }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 8, display: "flex", alignItems: "center", gap: 6 }}>
              <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: COLORS.green }} />
              Private Balance · Encrypted Vault
            </div>
            <div style={{ fontSize: 48, fontWeight: 700, letterSpacing: "-2px", color: COLORS.text }}>$84,291.<span style={{ color: COLORS.primary }}>43</span></div>
            <div style={{ fontSize: 14, color: COLORS.green, marginTop: 6 }}>↑ +$8,240 (10.8%) this month</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div className="tag tag-cyan" style={{ marginBottom: 8, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px" }} onClick={handleCopy}>
              @{user?.ghostId || "anon"}
              <span style={{ color: copied ? COLORS.green : "inherit", display: "flex", alignItems: "center", fontSize: "14px" }}>
                {copied ? <span style={{ fontSize: "12px", fontWeight: "bold" }}>Copied!</span> : "📋"}
              </span>
            </div>
            <div style={{ fontSize: 12, color: COLORS.textMuted }}>Umbra Shield: Active</div>
          </div>
        </div>
        <div style={{ marginTop: 20 }}>
          <MiniChart data={chartData} color={COLORS.primary} height={50} />
        </div>
      </div>

      {/* Quick stats */}
      {[
        { label: "Sent (30d)", value: "$34,200", delta: "+12%", color: COLORS.accent },
        { label: "Received (30d)", value: "$42,440", delta: "+28%", color: COLORS.green },
        { label: "AI Agents", value: "4 active", delta: "autonomous", color: COLORS.secondary },
        { label: "Privacy Score", value: "99.4%", delta: "maximum", color: COLORS.primary },
      ].map((s) => (
        <div key={s.label} className="metric-card">
          <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 6 }}>{s.label}</div>
          <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
          <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 4 }}>{s.delta}</div>
        </div>
      ))}

      {/* Recent transactions */}
      <div className="card" style={{ gridColumn: "1/-1" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontWeight: 600 }}>Recent Transactions</h3>
          <span className="tag tag-green" style={{ fontSize: 11 }}>All private</span>
        </div>
        {txns.map((tx) => (
          <div key={tx.id} className="tx-row">
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: tx.type === "received" ? "rgba(0,255,148,0.12)" : "rgba(255,107,107,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>
              {tx.type === "received" ? "↓" : "↑"}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500 }}>{tx.type === "received" ? tx.from : tx.to} <span className="tag tag-cyan" style={{ fontSize: 10, marginLeft: 4 }}>stealth</span></div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, display: "flex", alignItems: "center", gap: 8 }}>
                <span>{tx.note} · {tx.time}</span>
                <a href="https://solscan.io/tx/mp5gvHtFs7JZmAu2qsPDu1VR9WhAjAJCWEh4L121buKn46kh9tfVinbf632U5aBSwN88ajLyM6SmmgH5pcaAWDd" target="_blank" rel="noreferrer" style={{ color: COLORS.primary, textDecoration: "none", fontSize: 11, borderBottom: `1px solid ${COLORS.primary}44` }}>
                  {tx.hash} ↗
                </a>
              </div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 700, color: tx.type === "received" ? COLORS.green : COLORS.accent }}>{tx.amount}</div>
              <div style={{ fontSize: 11, color: COLORS.textDim }}>{tx.token}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SEND PAYMENT ─────────────────────────────────────────────────────────────
function SendPayment() {
  const [step, setStep] = useState(0);
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [sent, setSent] = useState(false);

  const contacts = [
    { id: "@raydev", label: "Ray Dev", emoji: "👨‍💻" },
    { id: "@sukuna_corp", label: "Sukuna Corp", emoji: "🏢" },
    { id: "@ghostdao", label: "Ghost DAO", emoji: "🏛️" },
  ];

  if (sent) {
    return (
      <div className="card fade-in" style={{ maxWidth: 480, margin: "0 auto", textAlign: "center", padding: 48 }}>
        <div style={{ width: 80, height: 80, borderRadius: "50%", background: "rgba(0,255,148,0.12)", border: `2px solid ${COLORS.green}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, margin: "0 auto 24px" }}>✓</div>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Sent Privately</h2>
        <p style={{ color: COLORS.textMuted, marginBottom: 24 }}>The transaction is shielded. The recipient can only see their private vault — no on-chain trace.</p>
        <div style={{ padding: "16px", background: COLORS.bgCard2, border: `1px solid ${COLORS.border}`, borderRadius: 10, marginBottom: 24, textAlign: "left" }}>
          <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 8 }}>Transaction Details</div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
            <span style={{ color: COLORS.textDim }}>Stealth Address:</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.primary }}>0x7b3f...c82a</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
            <span style={{ color: COLORS.textDim }}>Transaction Hash:</span>
            <a href="https://solscan.io/tx/mp5gvHtFs7JZmAu2qsPDu1VR9WhAjAJCWEh4L121buKn46kh9tfVinbf632U5aBSwN88ajLyM6SmmgH5pcaAWDd" target="_blank" rel="noreferrer" style={{ color: COLORS.primary, textDecoration: "none", fontFamily: "'JetBrains Mono', monospace" }}>
              2V6R8m...7uW9 ↗
            </a>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
            <span style={{ color: COLORS.textDim }}>Privacy Status:</span>
            <span style={{ color: COLORS.green }}>Encrypted & Shielded</span>
          </div>
        </div>
        <button className="btn-primary" onClick={() => { setSent(false); setStep(0); setTo(""); setAmount(""); }}>New Payment</button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 480, margin: "0 auto" }}>
      <div className="card" style={{ padding: 32 }}>
        <div style={{ display: "flex", gap: 8, marginBottom: 28 }}>
          {["Recipient", "Amount", "Confirm"].map((s, i) => (
            <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: i <= step ? COLORS.primary : COLORS.border, transition: "background 0.3s" }} />
          ))}
        </div>

        {step === 0 && (
          <div className="fade-in">
            <h3 style={{ marginBottom: 16, fontWeight: 600 }}>Send to GhostID</h3>
            <input type="text" value={to} onChange={(e) => setTo(e.target.value)} placeholder="@username or paste address" style={{ marginBottom: 16 }} />
            <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 10 }}>Recent contacts</div>
            {contacts.map((c) => (
              <div key={c.id} onClick={() => setTo(c.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px", borderRadius: 10, cursor: "pointer", background: to === c.id ? "rgba(0,229,255,0.06)" : "transparent", border: `1px solid ${to === c.id ? COLORS.primary : COLORS.border}`, marginBottom: 8, transition: "all 0.2s" }}>
                <span style={{ fontSize: 22 }}>{c.emoji}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{c.label}</div>
                  <div style={{ fontSize: 12, color: COLORS.primary }}>{c.id}</div>
                </div>
                <div style={{ marginLeft: "auto" }}><span className="tag tag-cyan" style={{ fontSize: 10 }}>stealth</span></div>
              </div>
            ))}
          </div>
        )}

        {step === 1 && (
          <div className="fade-in">
            <h3 style={{ marginBottom: 8, fontWeight: 600 }}>Amount (USDC)</h3>
            <div style={{ marginBottom: 4, fontSize: 12, color: COLORS.primary }}>{to}</div>
            <div style={{ position: "relative", marginBottom: 16 }}>
              <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: COLORS.textMuted }}>$</span>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" style={{ paddingLeft: 32, fontSize: 24, fontWeight: 700 }} />
            </div>
            <input type="text" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Payment note (encrypted)" style={{ marginBottom: 8 }} />
            <div style={{ fontSize: 12, color: COLORS.textMuted }}>Note is end-to-end encrypted. Only recipient can read it.</div>
          </div>
        )}

        {step === 2 && (
          <div className="fade-in">
            <h3 style={{ marginBottom: 20, fontWeight: 600 }}>Confirm Private Send</h3>
            {[["To", to], ["Amount", `$${amount || "0"} USDC`], ["Note", note || "(none)"], ["Privacy", "Umbra stealth routing"], ["Fee", "~$0.001 SOL"]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${COLORS.border}`, fontSize: 14 }}>
                <span style={{ color: COLORS.textMuted }}>{k}</span>
                <span style={{ fontWeight: 500, color: k === "Privacy" ? COLORS.green : COLORS.text }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop: 16, padding: 12, background: "rgba(0,255,148,0.06)", borderRadius: 8, fontSize: 12, color: COLORS.green }}>
              ✓ Recipient identity will be hidden · Amount will be shielded · No on-chain trace
            </div>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 24 }}>
          {step > 0 ? <button className="btn-ghost" onClick={() => setStep(step - 1)}>← Back</button> : <div />}
          <button className="btn-primary" onClick={() => { if (step < 2) setStep(step + 1); else setSent(true); }}>
            {step === 2 ? "Send Privately 🔐" : "Continue →"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── AI AGENTS ────────────────────────────────────────────────────────────────
function AIAgents() {
  const [selected, setSelected] = useState(null);
  const agents = [
    { id: 1, name: "Treasury Bot", emoji: "🏦", status: "active", type: "Treasury Management", txToday: 12, volume: "$48,200", desc: "Autonomously rebalances DAO treasury across USDC, SOL, and ETH. Executes private swaps when allocation drifts beyond threshold.", actions: ["Rebalance portfolio", "Sweep to vault", "Generate report"] },
    { id: 2, name: "Payroll Agent", emoji: "💰", status: "active", type: "Payroll Automation", txToday: 34, volume: "$142,800", desc: "Streams salaries to 34 employees every 30 days. All payments are private — salary amounts invisible on-chain.", actions: ["Run payroll", "Add employee", "Pause payroll"] },
    { id: 3, name: "API Buyer", emoji: "⚡", status: "active", type: "Subscription Manager", txToday: 7, volume: "$2,340", desc: "Automatically renews API subscriptions: OpenAI, Anthropic, Pinecone, Vercel. Tracks spend and alerts on anomalies.", actions: ["View subscriptions", "Add API", "Set budget"] },
    { id: 4, name: "Invoice Collector", emoji: "📋", status: "idle", type: "Accounts Receivable", txToday: 0, volume: "$0", desc: "Sends encrypted invoices and follows up automatically. Notifies when payments arrive in private vault.", actions: ["Create invoice", "Follow up", "View outstanding"] },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>AI Financial Agents</h2>
          <p style={{ fontSize: 13, color: COLORS.textMuted }}>Autonomous economic actors operating privately on-chain</p>
        </div>
        <button className="btn-primary" style={{ fontSize: 13 }}>+ Deploy Agent</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {agents.map((a) => (
          <div key={a.id} className="agent-card" onClick={() => setSelected(selected?.id === a.id ? null : a)}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: `linear-gradient(135deg, rgba(123,97,255,0.2), rgba(0,229,255,0.1))`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{a.emoji}</div>
                <div>
                  <div style={{ fontWeight: 600 }}>{a.name}</div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted }}>{a.type}</div>
                </div>
              </div>
              <span className={`tag ${a.status === "active" ? "tag-green" : "tag-amber"}`} style={{ fontSize: 10 }}>
                {a.status === "active" && <span className="pulse-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: COLORS.green }} />}
                {a.status}
              </span>
            </div>
            <p style={{ fontSize: 12, color: COLORS.textMuted, lineHeight: 1.6, marginBottom: 12 }}>{a.desc}</p>
            <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
              <span style={{ color: COLORS.textMuted }}>Today: <span style={{ color: COLORS.primary, fontWeight: 600 }}>{a.txToday} txns</span></span>
              <span style={{ color: COLORS.textMuted }}>Volume: <span style={{ color: COLORS.green, fontWeight: 600 }}>{a.volume}</span></span>
            </div>
            {selected?.id === a.id && (
              <div className="fade-in" style={{ marginTop: 16, borderTop: `1px solid ${COLORS.border}`, paddingTop: 16 }}>
                <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 8 }}>Quick actions</div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {a.actions.map((act) => (
                    <button key={act} className="btn-ghost" style={{ padding: "6px 14px", fontSize: 12 }}>{act}</button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 20, padding: "20px 24px" }}>
        <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 4 }}>🤖 Why AI agents need private finance</div>
        <p style={{ fontSize: 13, color: COLORS.text, lineHeight: 1.6 }}>Public wallets make autonomous agents dangerous. When an AI agent's spending is fully visible, competitors can front-run its trades, vendors can price-discriminate, and treasury strategies get leaked. VeilPay gives AI agents the same financial privacy humans deserve.</p>
      </div>
    </div>
  );
}

// ─── PAYROLL ─────────────────────────────────────────────────────────────────
function Payroll() {
  const employees = [
    { name: "Alex Rivera", role: "Lead Engineer", ghostId: "@alex_r", salary: "••••••", status: "paid", date: "May 1" },
    { name: "Yuki Tanaka", role: "Product Designer", ghostId: "@yuki_t", salary: "••••••", status: "paid", date: "May 1" },
    { name: "Marcus Chen", role: "Backend Dev", ghostId: "@m_chen", salary: "••••••", status: "pending", date: "May 15" },
    { name: "Aisha Diallo", role: "DevRel", ghostId: "@aisha_d", salary: "••••••", status: "paid", date: "May 1" },
    { name: "Tom Kowalski", role: "Data Engineer", ghostId: "@tomk", salary: "••••••", status: "paid", date: "May 1" },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Private Payroll</h2>
          <p style={{ fontSize: 13, color: COLORS.textMuted }}>Salary amounts hidden on-chain. Zero exposure.</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn-ghost" style={{ fontSize: 13 }}>Export Report</button>
          <button className="btn-primary" style={{ fontSize: 13 }}>Run Payroll</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Total Headcount", value: "34", sub: "employees + contractors" },
          { label: "Monthly Payroll", value: "Encrypted", sub: "zero on-chain exposure" },
          { label: "Next Payout", value: "May 15", sub: "12 days away" },
        ].map((m) => (
          <div key={m.label} className="metric-card">
            <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 6 }}>{m.label}</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: COLORS.primary }}>{m.value}</div>
            <div style={{ fontSize: 11, color: COLORS.textDim, marginTop: 4 }}>{m.sub}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h3 style={{ fontWeight: 600, fontSize: 15 }}>Employee Roster</h3>
          <span className="tag tag-cyan" style={{ fontSize: 10 }}>Salaries hidden on-chain</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1.5fr 1fr 1fr", gap: 0 }}>
          {["Employee", "Role", "GhostID", "Salary", "Status"].map((h) => (
            <div key={h} style={{ fontSize: 11, color: COLORS.textDim, fontWeight: 600, padding: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</div>
          ))}
          {employees.map((e) => (
            <>
              <div key={`n-${e.name}`} style={{ padding: "12px 0", borderTop: `1px solid ${COLORS.border}`, fontWeight: 500, fontSize: 14 }}>{e.name}</div>
              <div style={{ padding: "12px 0", borderTop: `1px solid ${COLORS.border}`, fontSize: 13, color: COLORS.textMuted }}>{e.role}</div>
              <div style={{ padding: "12px 0", borderTop: `1px solid ${COLORS.border}`, color: COLORS.primary, fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>{e.ghostId}</div>
              <div style={{ padding: "12px 0", borderTop: `1px solid ${COLORS.border}`, color: COLORS.textDim, fontSize: 13, letterSpacing: "2px" }}>{e.salary}</div>
              <div style={{ padding: "12px 0", borderTop: `1px solid ${COLORS.border}` }}>
                <span className={`tag ${e.status === "paid" ? "tag-green" : "tag-amber"}`} style={{ fontSize: 10 }}>{e.status}</span>
              </div>
            </>
          ))}
        </div>
        <div style={{ marginTop: 16, padding: 12, background: "rgba(0,229,255,0.04)", borderRadius: 8, fontSize: 12, color: COLORS.textMuted }}>
          🔐 Salary amounts are encrypted via Umbra SDK. Even the blockchain cannot reveal payroll figures. Only the employer and employee can decrypt their individual payment amounts.
        </div>
      </div>
    </div>
  );
}

// ─── COMPLIANCE ────────────────────────────────────────────────────────────────
function Compliance() {
  const [keyGenerated, setKeyGenerated] = useState(false);
  const [scope, setScope] = useState("tax2025");
  const [copied, setCopied] = useState(false);

  const scopes = [
    { id: "tax2025", label: "2025 Tax Report", desc: "Income & payments Jan–Dec 2025" },
    { id: "payroll", label: "Payroll Audit", desc: "All employee disbursements" },
    { id: "q1treasury", label: "Q1 Treasury", desc: "Treasury movements Q1 2025" },
    { id: "custom", label: "Custom Range", desc: "Date range + category filter" },
  ];

  const handleCopy = () => {
    const keyText = `vk_1qzp4m...f8x2·${scopes.find(s => s.id === scope)?.label}`;
    navigator.clipboard.writeText(keyText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Selective Compliance</h2>
        <p style={{ fontSize: 13, color: COLORS.textMuted }}>Prove what you need. Hide what you don't. Privacy without sacrificing compliance.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: 4 }}>Generate Viewing Key</h3>
          <p style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 20, lineHeight: 1.5 }}>Issue a temporary cryptographic key that grants read-only access to selected transactions. Share with accountants, auditors, or regulators.</p>

          <div style={{ fontSize: 12, color: COLORS.textMuted, marginBottom: 8 }}>Select disclosure scope</div>
          {scopes.map((s) => (
            <div key={s.id} onClick={() => setScope(s.id)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, cursor: "pointer", border: `1px solid ${scope === s.id ? COLORS.primary : COLORS.border}`, background: scope === s.id ? "rgba(0,229,255,0.05)" : "transparent", marginBottom: 8, transition: "all 0.2s" }}>
              <div style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${scope === s.id ? COLORS.primary : COLORS.border}`, background: scope === s.id ? COLORS.primary : "transparent", flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 500 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: COLORS.textMuted }}>{s.desc}</div>
              </div>
            </div>
          ))}

          <button className="btn-primary" style={{ width: "100%", marginTop: 8 }} onClick={() => setKeyGenerated(true)}>
            Generate Viewing Key
          </button>
        </div>

        <div className="card">
          <h3 style={{ fontWeight: 600, marginBottom: 4 }}>Active Viewing Keys</h3>
          <p style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 20 }}>Keys issued to accountants, auditors, and compliance teams.</p>

          {keyGenerated && (
            <div className="fade-in" style={{ padding: 16, background: "rgba(0,255,148,0.06)", border: `1px solid rgba(0,255,148,0.2)`, borderRadius: 10, marginBottom: 12 }}>
              <div style={{ fontSize: 12, color: COLORS.green, marginBottom: 6 }}>✓ New key generated</div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: COLORS.textDim, wordBreak: "break-all" }}>vk_1qzp4m...f8x2·{scopes.find(s => s.id === scope)?.label}</div>
              <button className="btn-ghost" style={{ marginTop: 8, padding: "6px 14px", fontSize: 12, display: "inline-flex", alignItems: "center", gap: "6px", color: copied ? COLORS.green : "inherit", borderColor: copied ? COLORS.green : COLORS.border }} onClick={handleCopy}>
                <span style={{ fontSize: "14px" }}>📋</span> {copied ? "Copied!" : "Copy Key"}
              </button>
            </div>
          )}

          {[
            { to: "PwC Audit Team", scope: "Q1 Treasury", expires: "May 30", status: "active" },
            { to: "Tax Advisor", scope: "2024 Tax", expires: "Apr 15", status: "expired" },
          ].map((k) => (
            <div key={k.to} style={{ padding: "12px", border: `1px solid ${COLORS.border}`, borderRadius: 8, marginBottom: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <span style={{ fontSize: 13, fontWeight: 500 }}>{k.to}</span>
                <span className={`tag ${k.status === "active" ? "tag-green" : "tag-amber"}`} style={{ fontSize: 10 }}>{k.status}</span>
              </div>
              <div style={{ fontSize: 11, color: COLORS.textMuted }}>{k.scope} · Expires {k.expires}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="card" style={{ background: "linear-gradient(135deg, rgba(123,97,255,0.06), rgba(0,229,255,0.04))" }}>
        <h3 style={{ fontWeight: 600, marginBottom: 12 }}>Why Selective Compliance Changes Everything</h3>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {[
            { icon: "🔑", title: "Zero-knowledge proofs", desc: "Prove you paid taxes without revealing all transactions" },
            { icon: "⏰", title: "Time-limited access", desc: "Keys expire automatically. No permanent backdoors." },
            { icon: "🎯", title: "Surgical disclosure", desc: "Share only what's legally required. Nothing more." },
          ].map((f) => (
            <div key={f.title} style={{ textAlign: "center" }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{f.icon}</div>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 4 }}>{f.title}</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, lineHeight: 1.5 }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── DEVELOPERS ───────────────────────────────────────────────────────────────
function Developers({ user }) {
  const [copied, setCopied] = useState(false);
  const apiKey = "vp_test_8f92jklw03mna8sd9f";
  
  const handleCopy = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fade-in">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Developers & API</h2>
          <p style={{ fontSize: 13, color: COLORS.textMuted }}>Integrate VeilPay privacy infrastructure into your application.</p>
        </div>
        <button className="btn-primary" style={{ fontSize: 13 }}>View Docs ↗</button>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <h3 style={{ fontWeight: 600, fontSize: 15, marginBottom: 12 }}>API Keys</h3>
        <p style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 16 }}>Use this test key to authenticate your backend requests to the VeilPay stealth network.</p>
        
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: COLORS.bgCard2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "12px 16px" }}>
          <div>
            <div style={{ fontSize: 11, color: COLORS.textDim, marginBottom: 4 }}>TEST SECRET KEY</div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", color: COLORS.primary, fontSize: 14 }}>{apiKey}</div>
          </div>
          <button className="btn-ghost" onClick={handleCopy} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 12px", color: copied ? COLORS.green : "inherit", borderColor: copied ? COLORS.green : COLORS.border }}>
            <span style={{ fontSize: 14 }}>📋</span> {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      <div className="card">
        <h3 style={{ fontWeight: 600, fontSize: 15, marginBottom: 16 }}>Quick Start</h3>
        <div style={{ background: COLORS.bgCard2, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: 20, fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: COLORS.text, overflowX: "auto" }}>
          <div style={{ color: COLORS.textMuted, marginBottom: 12 }}>// 1. Install the SDK</div>
          <div style={{ color: COLORS.secondary, marginBottom: 20 }}>npm install @veilpay/sdk umbra-protocol</div>
          
          <div style={{ color: COLORS.textMuted, marginBottom: 12 }}>// 2. Initialize the client</div>
          <div><span style={{ color: COLORS.accent }}>import</span> {'{ VeilPay }'} <span style={{ color: COLORS.accent }}>from</span> '@veilpay/sdk';</div>
          <div style={{ marginTop: 8 }}><span style={{ color: COLORS.accent }}>const</span> client = <span style={{ color: COLORS.accent }}>new</span> VeilPay({'{'} apiKey: 'YOUR_API_KEY' {'}'});</div>
          
          <div style={{ color: COLORS.textMuted, marginTop: 20, marginBottom: 12 }}>// 3. Send a private transaction</div>
          <div><span style={{ color: COLORS.accent }}>const</span> tx = <span style={{ color: COLORS.accent }}>await</span> client.sendPrivate({'{'}</div>
          <div style={{ paddingLeft: 20 }}>to: '@{user?.ghostId || "anon"}',</div>
          <div style={{ paddingLeft: 20 }}>amount: '500', <span style={{ color: COLORS.textMuted }}>// USDC</span></div>
          <div style={{ paddingLeft: 20 }}>token: 'USDC',</div>
          <div style={{ paddingLeft: 20 }}>note: 'Hackathon Prize'</div>
          <div>{'}'});</div>
        </div>
      </div>
    </div>
  );
}

// ─── SETTINGS ─────────────────────────────────────────────────────────────────
function Settings({ user }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(`0x8f2A...9C14`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Identity & Security</h2>
        <p style={{ fontSize: 13, color: COLORS.textMuted }}>Manage your GhostID, encrypted vaults, and security layers.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Profile Card */}
        <div className="card">
          <h3 style={{ fontWeight: 600, fontSize: 15, marginBottom: 16 }}>Profile Identity</h3>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, fontWeight: 700, color: COLORS.bg }}>
              {user?.ghostId ? user.ghostId.charAt(0).toUpperCase() : "V"}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 18, fontWeight: 700 }}>@{user?.ghostId || "anon"}</span>
                <span className="tag tag-green" style={{ fontSize: 10 }}>Verified</span>
              </div>
              <div style={{ fontSize: 12, color: COLORS.textMuted, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 4 }} onClick={handleCopy}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>0x8f2A...9C14 (Public)</span>
                <span style={{ color: copied ? COLORS.green : "inherit" }}>{copied ? "Copied!" : "📋"}</span>
              </div>
            </div>
          </div>
          
          <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <span style={{ fontSize: 13, color: COLORS.textMuted }}>Profile Type</span>
              <span style={{ fontSize: 13, fontWeight: 500 }}>Personal Vault</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 13, color: COLORS.textMuted }}>Stealth Addresses</span>
              <span style={{ fontSize: 13, fontWeight: 500, color: COLORS.primary }}>4 Active</span>
            </div>
          </div>
        </div>

        {/* Security Settings */}
        <div className="card">
          <h3 style={{ fontWeight: 600, fontSize: 15, marginBottom: 16 }}>Security & Privacy Layers</h3>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 16, borderBottom: `1px solid ${COLORS.border}`, marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Umbra Shield Protocol</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted }}>Automatically route incoming funds via stealth addresses.</div>
            </div>
            <div className="toggle on"></div>
          </div>
          
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 16, borderBottom: `1px solid ${COLORS.border}`, marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>ZK-Proof Biometrics</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted }}>Require FaceID/TouchID for transactions &gt; $1,000.</div>
            </div>
            <div className="toggle on"></div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>Social Recovery</div>
              <div style={{ fontSize: 12, color: COLORS.textMuted }}>Recover vault using 3 trusted GhostIDs.</div>
            </div>
            <button className="btn-ghost" style={{ padding: "6px 12px", fontSize: 12 }}>Configure</button>
          </div>
        </div>

        {/* Audit Log / Advanced */}
        <div className="card" style={{ gridColumn: "1/-1" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontWeight: 600, fontSize: 15 }}>Advanced Cryptography</h3>
            <span className="tag tag-amber" style={{ fontSize: 10 }}>Danger Zone</span>
          </div>
          <p style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 20 }}>
            Manage the underlying cryptographic primitives powering your private vault. Exporting your viewing keys exposes your transaction history to whoever holds them.
          </p>
          <div style={{ display: "flex", gap: 12 }}>
            <button className="btn-ghost" style={{ fontSize: 13 }}>Export Viewing Keys</button>
            <button className="btn-ghost" style={{ fontSize: 13, color: COLORS.accent, borderColor: "rgba(255,107,107,0.3)" }}>Rotate Stealth Master Key</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── BOUNTIES ─────────────────────────────────────────────────────────────────
function Bounties({ user }) {
  const [selectedBounty, setSelectedBounty] = useState(null);
  const [submissionStatus, setSubmissionStatus] = useState("idle");
  const [projectName, setProjectName] = useState("");
  const [githubUrl, setGithubUrl] = useState("");

  const bounties = [
    { id: "frontierx", title: "FrontierX Privacy Hackathon", pool: "$150,000", tag: "Completed", tagStyle: "tag-purple", desc: "Build next-generation privacy dApps on Solana using VeilPay core contracts.", deadline: "Ended", applicants: 312, status: "completed", won: true },
    { id: "privacy-commerce", title: "Privacy Commerce Grant", pool: "$250,000", tag: "Grant", tagStyle: "tag-green", desc: "Build the first private e-commerce checkout using VeilPay SDK. Accepting USDC privately.", deadline: "Jun 30", applicants: 48, status: "open" },
    { id: "ai-agent", title: "AI Agent Challenge", pool: "$500,000", tag: "Hackathon", tagStyle: "tag-purple", desc: "Deploy an autonomous AI financial agent that executes >$100K in private transactions.", deadline: "Jul 15", applicants: 134, status: "open" },
    { id: "enterprise-integration", title: "Enterprise Integration Program", pool: "$1,000,000", tag: "Enterprise", tagStyle: "tag-amber", desc: "Integrate VeilPay private payroll into your existing HR software. 12-month engagement.", deadline: "Ongoing", applicants: 22, status: "open" },
    { id: "solana-accelerator", title: "Solana Privacy Accelerator", pool: "$100,000", tag: "Accelerator", tagStyle: "tag-cyan", desc: "3-month program. Build private DeFi primitives on top of VeilPay + Umbra infrastructure.", deadline: "May 31", applicants: 89, status: "open" },
    { id: "creator-economy", title: "Creator Economy Grant", pool: "$80,000", tag: "Grant", tagStyle: "tag-green", desc: "Build private tipping, subscription, and monetization tools for creators using VeilPay.", deadline: "Jun 15", applicants: 67, status: "open" },
    { id: "dev-bounty", title: "Developer Bounty Pool", pool: "$40,000", tag: "Bounty", tagStyle: "tag-red", desc: "Bug bounties, SDK improvements, documentation, and open source contributions.", deadline: "Rolling", applicants: 210, status: "open" },
  ];

  const totalPool = bounties.reduce((acc, b) => acc + parseInt(b.pool.replace(/[^0-9]/g, "")), 0);

  const handleApplySubmit = (e) => {
    e.preventDefault();
    setSubmissionStatus("submitting");
    setTimeout(() => setSubmissionStatus("submitted"), 1500);
  };

  if (selectedBounty) {
    if (selectedBounty.status === "completed" && selectedBounty.won) {
      return (
        <div className="fade-in">
          <button className="btn-ghost" onClick={() => setSelectedBounty(null)} style={{ marginBottom: 20, fontSize: 13 }}>← Back to Bounties</button>
          
          <div className="card" style={{ padding: 40, textAlign: "center", border: `1px solid ${COLORS.amber}`, background: "linear-gradient(135deg, rgba(255,184,0,0.08), rgba(123,97,255,0.06))" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🏆</div>
            <h2 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8, color: COLORS.amber }}>Congratulations!</h2>
            <p style={{ fontSize: 16, color: COLORS.textMuted, marginBottom: 24, maxWidth: 500, margin: "0 auto 24px" }}>
              You have won 1st place in the <strong>{selectedBounty.title}</strong>! Your submission was highly professional and demonstrated exceptional use of VeilPay's privacy primitives.
            </p>
            
            <div style={{ background: COLORS.bgCard2, border: `1px solid ${COLORS.border}`, borderRadius: 12, padding: 24, maxWidth: 400, margin: "0 auto 32px", textAlign: "left" }}>
              <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 12 }}>Prize distribution ready for:</div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px", background: "rgba(0,229,255,0.06)", border: `1px solid rgba(0,229,255,0.2)`, borderRadius: 8, marginBottom: 8 }}>
                <span style={{ fontWeight: 600, color: COLORS.primary }}>@{user?.ghostId || "anon"}</span>
                <span className="tag tag-cyan" style={{ fontSize: 10 }}>Primary Vault</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px", background: "rgba(123,97,255,0.06)", border: `1px solid rgba(123,97,255,0.2)`, borderRadius: 8 }}>
                <span style={{ fontWeight: 600, color: COLORS.secondary }}>vk_92x...p4q1</span>
                <span className="tag tag-purple" style={{ fontSize: 10 }}>Anon Stealth Key</span>
              </div>
              <div style={{ marginTop: 16, borderTop: `1px solid ${COLORS.border}`, paddingTop: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
                  <span style={{ color: COLORS.textDim }}>Transaction Hash:</span>
                  <a href="https://solscan.io/tx/mp5gvHtFs7JZmAu2qsPDu1VR9WhAjAJCWEh4L121buKn46kh9tfVinbf632U5aBSwN88ajLyM6SmmgH5pcaAWDd" target="_blank" rel="noreferrer" style={{ color: COLORS.primary, textDecoration: "none", fontFamily: "'JetBrains Mono', monospace" }}>
                    mp5g...AWDd ↗
                  </a>
                </div>
                <div style={{ fontSize: 12, color: COLORS.green }}>
                  ✓ Rewards will be streamed privately. No on-chain link to your real identity.
                </div>
              </div>
            </div>
            
            <button className="btn-primary" onClick={() => setSelectedBounty(null)} style={{ padding: "12px 32px", fontSize: 15 }}>Claim Private Reward 🔐</button>
          </div>
        </div>
      );
    }

    return (
      <div className="fade-in">
        <button className="btn-ghost" onClick={() => { setSelectedBounty(null); setSubmissionStatus("idle"); setProjectName(""); setGithubUrl(""); }} style={{ marginBottom: 20, fontSize: 13 }}>← Back to Bounties</button>
        
        <div className="card" style={{ padding: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
            <div>
              <span className={`tag ${selectedBounty.tagStyle}`} style={{ fontSize: 11, marginBottom: 12 }}>{selectedBounty.tag}</span>
              <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>{selectedBounty.title}</h2>
              <p style={{ fontSize: 15, color: COLORS.textMuted, maxWidth: 600 }}>{selectedBounty.desc}</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 32, fontWeight: 700, color: COLORS.amber, letterSpacing: "-1px" }}>{selectedBounty.pool}</div>
              <div style={{ fontSize: 13, color: COLORS.textDim }}>Total Prize Pool</div>
            </div>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, padding: "20px 0", borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}`, marginBottom: 32 }}>
            <div>
              <h4 style={{ fontSize: 14, color: COLORS.textMuted, marginBottom: 8 }}>Requirements</h4>
              <ul style={{ paddingLeft: 16, fontSize: 14, color: COLORS.text, lineHeight: 1.6 }}>
                <li>Open source implementation</li>
                <li>Integrates VeilPay SDK v3.2+</li>
                <li>Live demo on Vercel/Netlify</li>
                <li>Comprehensive README with architecture</li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontSize: 14, color: COLORS.textMuted, marginBottom: 8 }}>Judging Criteria</h4>
              <ul style={{ paddingLeft: 16, fontSize: 14, color: COLORS.text, lineHeight: 1.6 }}>
                <li>Privacy preservation (40%)</li>
                <li>User experience (30%)</li>
                <li>Technical complexity (20%)</li>
                <li>Market potential (10%)</li>
              </ul>
            </div>
          </div>

          {submissionStatus === "idle" && (
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Submit Your Project</h3>
              <form onSubmit={handleApplySubmit} style={{ maxWidth: 500 }}>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ display: "block", fontSize: 13, color: COLORS.textMuted, marginBottom: 6 }}>Project Name</label>
                  <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} required placeholder="e.g. PrivateSwap" />
                </div>
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: "block", fontSize: 13, color: COLORS.textMuted, marginBottom: 6 }}>GitHub URL</label>
                  <input type="text" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} required placeholder="https://github.com/..." />
                </div>
                <button type="submit" className="btn-primary" style={{ width: "100%", fontSize: 15, padding: "14px" }}>Submit Application</button>
              </form>
            </div>
          )}
          
          {submissionStatus === "submitting" && (
            <div style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{ width: 40, height: 40, margin: "0 auto 16px", border: `3px solid ${COLORS.primary}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }}></div>
              <div style={{ fontSize: 16, fontWeight: 500 }}>Encrypting & Submitting...</div>
            </div>
          )}

          {submissionStatus === "submitted" && (
            <div className="fade-in" style={{ padding: 24, background: "rgba(0,255,148,0.06)", border: `1px solid rgba(0,255,148,0.2)`, borderRadius: 12, display: "flex", gap: 16, alignItems: "flex-start" }}>
              <div style={{ fontSize: 24 }}>✅</div>
              <div>
                <h4 style={{ fontSize: 16, fontWeight: 600, color: COLORS.green, marginBottom: 4 }}>Submission Received!</h4>
                <p style={{ fontSize: 14, color: COLORS.textMuted, marginBottom: 12 }}>Your project <strong>{projectName}</strong> has been successfully submitted via secure channel.</p>
                <div className="tag tag-cyan" style={{ fontSize: 12 }}>Result announced soon</div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 24 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Ecosystem & Bounties</h2>
        <p style={{ fontSize: 13, color: COLORS.textMuted }}>VeilPay is funding the private finance ecosystem</p>
      </div>

      <div style={{ padding: "24px", background: "linear-gradient(135deg, rgba(255,184,0,0.08), rgba(123,97,255,0.06))", border: `1px solid rgba(255,184,0,0.2)`, borderRadius: 16, marginBottom: 24, textAlign: "center" }}>
        <div style={{ fontSize: 13, color: COLORS.textMuted, marginBottom: 4 }}>Total Ecosystem Pool</div>
        <div style={{ fontSize: 48, fontWeight: 700, letterSpacing: "-2px", color: COLORS.amber }}>${totalPool.toLocaleString()}</div>
        <div style={{ fontSize: 13, color: COLORS.textMuted, marginTop: 4 }}>across {bounties.length} active programs · 800+ applicants globally</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {bounties.map((b) => (
          <div key={b.id} className="bounty-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <span className={`tag ${b.tagStyle}`} style={{ fontSize: 11 }}>{b.tag}</span>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 22, fontWeight: 700, color: COLORS.amber, letterSpacing: "-0.5px" }}>{b.pool}</div>
                <div style={{ fontSize: 11, color: COLORS.textDim }}>prize pool</div>
              </div>
            </div>
            <h3 style={{ fontWeight: 600, fontSize: 15, marginBottom: 8 }}>{b.title}</h3>
            <p style={{ fontSize: 13, color: COLORS.textMuted, lineHeight: 1.6, marginBottom: 16 }}>{b.desc}</p>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
              <span style={{ color: COLORS.textDim }}>Deadline: <span style={{ color: COLORS.text }}>{b.deadline}</span></span>
              <span style={{ color: COLORS.textDim }}>{b.applicants} applicants</span>
            </div>
            <button 
              className={b.status === "completed" ? "btn-ghost" : "btn-primary"} 
              style={{ width: "100%", marginTop: 14, fontSize: 13, borderColor: b.status === "completed" ? COLORS.secondary : "", color: b.status === "completed" ? COLORS.secondary : "" }} 
              onClick={() => setSelectedBounty(b)}
            >
              {b.status === "completed" ? "View Result" : "Apply Now"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("landing");
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [sidebarOpen] = useState(true);

  const nav = [
    { id: "dashboard", icon: "⊞", label: "Dashboard" },
    { id: "send", icon: "↑", label: "Send" },
    { id: "agents", icon: "🤖", label: "AI Agents" },
    { id: "payroll", icon: "💼", label: "Payroll" },
    { id: "compliance", icon: "🔑", label: "Compliance" },
    { id: "bounties", icon: "🏆", label: "Bounties" },
    { id: "developers", icon: "⌨️", label: "Developers" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];

  if (screen === "landing") {
    return (
      <>
        <style>{css}</style>
        <LandingPage onEnter={() => setScreen("onboarding")} />
      </>
    );
  }

  if (screen === "onboarding") {
    return (
      <>
        <style>{css}</style>
        <Onboarding onComplete={(u) => { setUser(u); setScreen("app"); }} />
      </>
    );
  }

  const pages = { dashboard: <Dashboard user={user} />, send: <SendPayment />, agents: <AIAgents />, payroll: <Payroll />, compliance: <Compliance />, bounties: <Bounties user={user} />, developers: <Developers user={user} />, settings: <Settings user={user} /> };
  const pageTitle = { dashboard: "Overview", send: "Private Transfer", agents: "AI Agents", payroll: "Payroll", compliance: "Compliance", bounties: "Ecosystem", developers: "Developers & API", settings: "Identity & Security" };

  return (
    <>
      <style>{css}</style>
      <div style={{ display: "flex", height: "100vh", background: COLORS.bg, overflow: "hidden" }}>
        {/* Sidebar */}
        <div style={{ width: 220, borderRight: `1px solid ${COLORS.border}`, display: "flex", flexDirection: "column", padding: "20px 12px", flexShrink: 0, background: COLORS.bgCard }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "0 4px 20px", borderBottom: `1px solid ${COLORS.border}`, marginBottom: 12 }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.secondary})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: COLORS.bg }}>V</div>
            <span style={{ fontWeight: 700, fontSize: 15 }}>VeilPay</span>
          </div>

          {/* User identity */}
          <div style={{ padding: "10px 12px", background: "rgba(0,229,255,0.05)", border: `1px solid rgba(0,229,255,0.1)`, borderRadius: 10, marginBottom: 16 }}>
            <div style={{ fontSize: 11, color: COLORS.textMuted, marginBottom: 2 }}>Logged in as</div>
            <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.primary }}>@{user?.ghostId || "anon"}</div>
            <div style={{ fontSize: 10, color: COLORS.green, marginTop: 2 }}>● Shield active</div>
          </div>

          {/* Nav */}
          <div style={{ flex: 1 }}>
            {nav.map((n) => (
              <div key={n.id} className={`nav-item ${page === n.id ? "active" : ""}`} onClick={() => setPage(n.id)}>
                <span style={{ width: 20, textAlign: "center" }}>{n.icon}</span>
                <span>{n.label}</span>
              </div>
            ))}
          </div>

          {/* Bottom */}
          <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 12, marginTop: 12 }}>
            <button className="btn-ghost" style={{ width: "100%", fontSize: 12, padding: "8px", color: COLORS.textMuted }} onClick={() => setScreen("landing")}>
              ← Back to landing
            </button>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Topbar */}
          <div style={{ height: 56, borderBottom: `1px solid ${COLORS.border}`, display: "flex", alignItems: "center", padding: "0 28px", justifyContent: "space-between", flexShrink: 0 }}>
            <div>
              <span style={{ fontWeight: 600, fontSize: 16 }}>{pageTitle[page]}</span>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span className="tag tag-cyan" style={{ fontSize: 11 }}>
                <span className="pulse-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: COLORS.green }} />
                Umbra Shield: ON
              </span>
              <span style={{ fontSize: 13, color: COLORS.textMuted, fontFamily: "'JetBrains Mono', monospace" }}>SOL: 142.33</span>
            </div>
          </div>

          {/* Page */}
          <div key={page} className="fade-in" style={{ flex: 1, overflowY: "auto", padding: "28px" }}>
            {pages[page]}
          </div>
        </div>
      </div>
    </>
  );
}