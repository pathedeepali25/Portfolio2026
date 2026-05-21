import { useState, useEffect, useRef } from "react";

/* ─────────────── DATA ─────────────── */

const NAV = [
  { id: "hero", label: "Cover" },
  { id: "problem", label: "Problem" },
  { id: "role", label: "Role" },
  { id: "system", label: "System" },
  { id: "craft", label: "Craft" },
  { id: "impact", label: "Impact" },
  { id: "reflection", label: "Reflection" },
];

const researchInsights = [
  { icon: "🎨", text: "Inconsistent visual patterns across tools" },
  { icon: "🔧", text: "Developers needed cleaner specs to reduce back-and-forth" },
  { icon: "⚡", text: "Designers wanted ready-made templates and variants to move faster" },
];

const roleItems = [
  "Structured components using variants and variables",
  "Applied Figma variable modes to enable one-click dark mode",
  "Used auto layout + variables to ensure responsive behavior",
  "Documented usage and worked closely with developers to ensure feasibility",
  "Explored edge cases through real-world use and feedback loops",
];

const tokenCategories = [
  {
    name: "Buttons & Links",
    accent: "#9B7BF7",
    count: "8 variants",
    detail: "Primary, Secondary (1 & 2), Tertiary (1 & 2), Error, Success, Warning, Informational — each with Default, Hover, Active, Focus, and Disabled states.",
  },
  {
    name: "Text & Icons",
    accent: "#7BB8F7",
    count: "8 semantic colors",
    detail: "Primary, Secondary (1 & 2), Tertiary, Error, Success, Warning, Informational — mapped to content hierarchy from headings to captions.",
  },
  {
    name: "Backgrounds",
    accent: "#7BF7C4",
    count: "5 layers deep",
    detail: "Primary → Secondary → Tertiary (1 & 2) → Accent. Each layer semantically named so nesting feels automatic, not manual.",
  },
  {
    name: "Borders & Dividers",
    accent: "#F7C87B",
    count: "4 weights",
    detail: "Extra-light, Light, Dark, Extra-dark — separate tokens for dashboard vs. website contexts.",
  },
];

const typescaleBreakpoints = [
  { device: "Mobile", h1: "32/40", body: "14/20", tokens: 10 },
  { device: "Tablet Portrait", h1: "40/48", body: "16/24", tokens: 10 },
  { device: "Tablet Landscape", h1: "40/48", body: "16/24", tokens: 10 },
  { device: "Desktop Large", h1: "56/64", body: "18/24", tokens: 10 },
];

const spacingRange = [
  { token: "Spacing-1", px: 2, use: "Icon-text gaps, badge padding" },
  { token: "Spacing-5", px: 16, use: "Button padding, avatar spacing" },
  { token: "Spacing-9", px: 32, use: "Card internal spacing" },
  { token: "Spacing-16", px: 80, use: "Major section breaks" },
];

const impactStats = [
  { number: "40%", label: "Faster design workflow for common flows", accent: "#9B7BF7" },
  { number: "↓", label: "Fewer dev questions — clearer specs", accent: "#7BB8F7" },
  { number: "🌙", label: "Dark mode toggle adopted across all tools", accent: "#7BF7C4" },
  { number: "🏗️", label: "Starting point for all internal products", accent: "#F7C87B" },
];

const constraints = [
  "Needed to work with existing design legacy where possible",
  "Prioritized depth over breadth — fewer components, better quality",
  "Scoped system to 2D only for faster adoption across teams",
];

/* ─────────────── HOOKS ─────────────── */

function useInView(ref, threshold = 0.15) {
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setSeen(true); },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return seen;
}

function R({ children, delay = 0, y = 45, style = {}, className = "" }) {
  const ref = useRef(null);
  const vis = useInView(ref);
  return (
    <div ref={ref} className={className} style={{
      opacity: vis ? 1 : 0,
      transform: vis ? "translateY(0)" : `translateY(${y}px)`,
      transition: `all 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
      ...style,
    }}>{children}</div>
  );
}

/* ─────────────── MAIN ─────────────── */

export default function AjnaCaseStudy() {
  const [active, setActive] = useState("hero");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      for (let i = NAV.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV[i].id);
        if (el && el.getBoundingClientRect().top <= 220) {
          setActive(NAV[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div style={{
      fontFamily: "'Playfair Display', Georgia, serif",
      background: "#06060A",
      color: "#E4E0EC",
      minHeight: "100vh",
      overflowX: "hidden",
      position: "relative",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Sora:wght@200;300;400;500;600&family=IBM+Plex+Mono:wght@300;400;500&display=swap');

        *{margin:0;padding:0;box-sizing:border-box}
        html{scroll-behavior:smooth}

        :root {
          --bg:#06060A;--text:#E4E0EC;
          --muted:rgba(228,224,236,0.4);
          --accent:#9B7BF7;--accent2:#7BB8F7;
          --sans:'Sora',sans-serif;
          --mono:'IBM Plex Mono',monospace;
          --serif:'Playfair Display',Georgia,serif;
        }

        .grain{position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:999;opacity:0.022;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")}

        .pip{width:6px;height:6px;border-radius:50%;background:rgba(255,255,255,0.1);border:none;cursor:pointer;transition:all 0.4s}
        .pip.on{background:var(--accent);box-shadow:0 0 10px rgba(155,123,247,0.45);transform:scale(1.6)}
        .pip:hover{background:rgba(255,255,255,0.3)}

        .tag{font-family:var(--mono);font-size:0.63rem;letter-spacing:0.35em;text-transform:uppercase;color:var(--accent);margin-bottom:1.2rem}
        .body{font-family:var(--sans);font-size:1rem;line-height:1.75;color:var(--muted);font-weight:300}
        .divider{height:1px;width:50%;margin:0 auto;background:linear-gradient(90deg,transparent,rgba(155,123,247,0.18),transparent)}

        .glass{background:rgba(255,255,255,0.025);border:1px solid rgba(255,255,255,0.05);border-radius:16px;padding:2rem;
          transition:all 0.5s cubic-bezier(0.22,1,0.36,1)}
        .glass:hover{background:rgba(255,255,255,0.05);border-color:rgba(155,123,247,0.15);transform:translateY(-3px)}

        .num{font-family:var(--mono);font-size:0.7rem;width:32px;height:32px;border-radius:50%;
          border:1px solid rgba(155,123,247,0.3);display:flex;align-items:center;justify-content:center;
          color:var(--accent);flex-shrink:0}

        @keyframes drift{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        .drift{animation:drift 4s ease-in-out infinite}

        @keyframes glow-pulse{
          0%,100%{text-shadow:0 0 20px rgba(155,123,247,0.15)}
          50%{text-shadow:0 0 40px rgba(155,123,247,0.35)}
        }
        .glow{animation:glow-pulse 3s ease-in-out infinite}

        .token-card{position:relative;overflow:hidden;border-radius:18px;padding:2rem;
          transition:transform 0.5s cubic-bezier(0.22,1,0.36,1)}
        .token-card:hover{transform:scale(1.015)}

        .scale-row{display:grid;grid-template-columns:90px 90px 1fr;gap:1rem;align-items:center;
          padding:0.8rem 0;border-bottom:1px solid rgba(255,255,255,0.04)}
        .scale-row:last-child{border-bottom:none}

        .impact-card{text-align:center;padding:2rem 1.5rem;border-radius:16px;
          background:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.04);
          transition:all 0.4s ease}
        .impact-card:hover{background:rgba(255,255,255,0.05);transform:translateY(-4px)}

        .quote-block{border-left:3px solid var(--accent);padding:1.8rem 2rem;
          background:rgba(155,123,247,0.03);border-radius:0 14px 14px 0;transition:all 0.4s}
        .quote-block:hover{background:rgba(155,123,247,0.06);border-left-width:5px}
      `}</style>

      <div className="grain"/>

      {/* NAV */}
      <nav style={{position:"fixed",right:"1.2rem",top:"50%",transform:"translateY(-50%)",
        display:"flex",flexDirection:"column",gap:"10px",zIndex:100}}>
        {NAV.map(n=>(
          <button key={n.id} className={`pip ${active===n.id?"on":""}`} title={n.label}
            onClick={()=>document.getElementById(n.id)?.scrollIntoView({behavior:"smooth"})}/>
        ))}
      </nav>

      {/* ═══════ HERO ═══════ */}
      <section id="hero" style={{minHeight:"100vh",display:"flex",flexDirection:"column",
        justifyContent:"center",alignItems:"center",textAlign:"center",padding:"2rem",position:"relative"}}>

        <div style={{position:"absolute",width:"700px",height:"700px",
          background:"radial-gradient(circle, rgba(155,123,247,0.07) 0%, transparent 65%)",
          top:"50%",left:"50%",transform:`translate(-50%,-50%) scale(${1+scrollY*0.0002})`,pointerEvents:"none"}}/>

        <R><div className="tag" style={{marginBottom:"2.5rem",letterSpacing:"0.5em"}}>Design System · Internal Tools · 2025</div></R>

        <R delay={0.12}>
          <h1 style={{fontSize:"clamp(3.2rem,9vw,7.5rem)",lineHeight:0.92,fontWeight:400,letterSpacing:"-0.03em"}}>
            <span className="glow" style={{color:"var(--accent)"}}>Ajna</span>
            <br/>
            <span style={{fontWeight:300,color:"rgba(228,224,236,0.5)",fontStyle:"italic"}}>Design System</span>
          </h1>
        </R>

        <R delay={0.3}>
          <p style={{fontFamily:"var(--sans)",fontSize:"1.1rem",color:"rgba(228,224,236,0.5)",
            maxWidth:"500px",margin:"2.5rem auto 2rem",fontWeight:300,lineHeight:1.7}}>
            Bringing structure, speed, and dark mode to internal tools — 
            so every team stops reinventing the same button.
          </p>
        </R>

        <R delay={0.42}>
          <div style={{display:"flex",gap:"0.6rem",flexWrap:"wrap",justifyContent:"center"}}>
            {["Design Systems","Figma Variables","Dark Mode","Component Architecture","Developer Handoff"].map(t=>(
              <span key={t} style={{fontFamily:"var(--mono)",fontSize:"0.68rem",padding:"0.4rem 1rem",
                border:"1px solid rgba(155,123,247,0.22)",borderRadius:"100px",color:"var(--accent)",letterSpacing:"0.08em"}}>{t}</span>
            ))}
          </div>
        </R>

        <R delay={0.55}>
          <div className="drift" style={{marginTop:"4rem",fontFamily:"var(--sans)",fontSize:"0.75rem",
            color:"rgba(255,255,255,0.18)",letterSpacing:"0.25em",textTransform:"uppercase"}}>↓ The full story</div>
        </R>
      </section>

      {/* ═══════ PROBLEM ═══════ */}
      <section id="problem" style={{padding:"7rem 2rem",maxWidth:"880px",margin:"0 auto"}}>
        <R><div className="tag">01 — The Problem</div></R>
        <R delay={0.1}>
          <h2 style={{fontSize:"clamp(1.8rem,4.5vw,3.2rem)",lineHeight:1.1,fontWeight:400,marginBottom:"1.5rem"}}>
            Every team was designing
            <br/><span style={{fontStyle:"italic",color:"var(--accent)"}}>the same button.</span>
            <br/><span style={{color:"var(--muted)",fontSize:"0.75em"}}>Again. And again. And again.</span>
          </h2>
        </R>
        <R delay={0.2}>
          <p className="body" style={{maxWidth:"640px",marginBottom:"3rem"}}>
            Internal tools lacked visual consistency. Buttons, forms, layouts — every team was building 
            them from scratch, wasting time and introducing inconsistencies that compounded across products. 
            Developers spent hours in back-and-forth over specs that should have been self-evident. 
            Designers wanted templates they could trust.
          </p>
        </R>

        <R delay={0.3}>
          <h3 style={{fontFamily:"var(--sans)",fontSize:"0.9rem",fontWeight:500,marginBottom:"1.5rem",
            color:"rgba(228,224,236,0.6)",letterSpacing:"0.05em"}}>Research Insights</h3>
          <div style={{display:"flex",flexDirection:"column",gap:"0.8rem"}}>
            {researchInsights.map((r,i)=>(
              <R key={i} delay={0.3+i*0.07}>
                <div className="glass" style={{display:"flex",gap:"1rem",alignItems:"center",padding:"1.2rem 1.5rem"}}>
                  <span style={{fontSize:"1.5rem"}}>{r.icon}</span>
                  <p style={{fontFamily:"var(--sans)",fontSize:"0.9rem",color:"rgba(228,224,236,0.6)",lineHeight:1.5}}>{r.text}</p>
                </div>
              </R>
            ))}
          </div>
        </R>

        <R delay={0.55}>
          <div style={{marginTop:"2.5rem",fontFamily:"var(--mono)",fontSize:"0.7rem",color:"var(--muted)",letterSpacing:"0.1em"}}>
            Built for: Product & engineering teams · Designers · Developers
          </div>
        </R>
      </section>

      <div className="divider"/>

      {/* ═══════ ROLE ═══════ */}
      <section id="role" style={{padding:"7rem 2rem",maxWidth:"880px",margin:"0 auto"}}>
        <R><div className="tag">02 — My Role</div></R>
        <R delay={0.1}>
          <h2 style={{fontSize:"clamp(1.8rem,4.5vw,3rem)",lineHeight:1.1,fontWeight:400,marginBottom:"2.5rem"}}>
            Not just designing components.
            <br/><span style={{fontStyle:"italic",color:"var(--accent2)"}}>Architecting decisions.</span>
          </h2>
        </R>

        <div style={{display:"flex",flexDirection:"column",gap:"0.7rem"}}>
          {roleItems.map((r,i)=>(
            <R key={i} delay={0.12+i*0.06}>
              <div style={{display:"flex",gap:"1.2rem",alignItems:"flex-start"}}>
                <div className="num">0{i+1}</div>
                <p className="body" style={{fontSize:"0.95rem",paddingTop:"0.3rem"}}>{r}</p>
              </div>
            </R>
          ))}
        </div>
      </section>

      <div className="divider"/>

      {/* ═══════ THE SYSTEM ═══════ */}
      <section id="system" style={{padding:"7rem 2rem",maxWidth:"1050px",margin:"0 auto"}}>
        <R><div className="tag">03 — The System</div></R>
        <R delay={0.1}>
          <h2 style={{fontSize:"clamp(1.8rem,4.5vw,3rem)",lineHeight:1.1,fontWeight:400,marginBottom:"1rem"}}>
            Tokens, not opinions.
          </h2>
          <p className="body" style={{maxWidth:"600px",marginBottom:"3rem"}}>
            Every visual decision — color, spacing, type, borders — was encoded into tokens 
            that scale across contexts and switch themes in one click.
          </p>
        </R>

        {/* Token Cards */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:"1.2rem",marginBottom:"4rem"}}>
          {tokenCategories.map((t,i)=>(
            <R key={i} delay={0.1+i*0.07}>
              <div className="token-card" style={{
                background:`linear-gradient(145deg, ${t.accent}08 0%, ${t.accent}02 100%)`,
                border:`1px solid ${t.accent}12`,
              }}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"1rem"}}>
                  <h3 style={{fontFamily:"var(--sans)",fontSize:"1rem",fontWeight:500,color:"var(--text)"}}>{t.name}</h3>
                  <span style={{fontFamily:"var(--mono)",fontSize:"0.6rem",color:t.accent,
                    padding:"0.25rem 0.6rem",border:`1px solid ${t.accent}30`,borderRadius:"100px"}}>{t.count}</span>
                </div>
                <p style={{fontFamily:"var(--sans)",fontSize:"0.8rem",color:"var(--muted)",lineHeight:1.6}}>{t.detail}</p>
              </div>
            </R>
          ))}
        </div>

        {/* Typography Scale */}
        <R delay={0.1}>
          <h3 style={{fontFamily:"var(--sans)",fontSize:"1.1rem",fontWeight:500,marginBottom:"0.5rem",color:"var(--text)"}}>
            Responsive Typescale
          </h3>
          <p className="body" style={{fontSize:"0.85rem",marginBottom:"1.5rem",maxWidth:"550px"}}>
            A harmonious scale across four breakpoints — every token named, sized, and weighted 
            for its exact purpose in the hierarchy.
          </p>
        </R>

        <R delay={0.2}>
          <div style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.04)",
            borderRadius:"16px",padding:"1.5rem 2rem",marginBottom:"3rem"}}>
            {typescaleBreakpoints.map((t,i)=>(
              <div key={i} className="scale-row">
                <span style={{fontFamily:"var(--mono)",fontSize:"0.75rem",color:"var(--accent)"}}>{t.device}</span>
                <span style={{fontFamily:"var(--mono)",fontSize:"0.7rem",color:"var(--muted)"}}>h1: {t.h1}</span>
                <span style={{fontFamily:"var(--mono)",fontSize:"0.7rem",color:"rgba(228,224,236,0.25)"}}>body: {t.body} · {t.tokens} tokens</span>
              </div>
            ))}
          </div>
        </R>

        {/* Spacing */}
        <R delay={0.1}>
          <h3 style={{fontFamily:"var(--sans)",fontSize:"1.1rem",fontWeight:500,marginBottom:"0.5rem",color:"var(--text)"}}>
            Spacing System
          </h3>
          <p className="body" style={{fontSize:"0.85rem",marginBottom:"1.5rem",maxWidth:"550px"}}>
            16 tokens from 2px to 80px — from icon-text micro-gaps to major section breaks.
          </p>
        </R>

        <R delay={0.2}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"0.8rem"}}>
            {spacingRange.map((s,i)=>(
              <div key={i} style={{background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.04)",
                borderRadius:"12px",padding:"1.2rem 1.5rem"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:"0.5rem"}}>
                  <span style={{fontFamily:"var(--mono)",fontSize:"0.75rem",color:"var(--accent)"}}>{s.token}</span>
                  <span style={{fontFamily:"var(--mono)",fontSize:"0.65rem",color:"var(--muted)"}}>{s.px}px</span>
                </div>
                <div style={{height:Math.max(3, Math.min(s.px * 0.4, 28)),background:"linear-gradient(90deg, var(--accent), var(--accent2))",
                  borderRadius:"4px",opacity:0.3,marginBottom:"0.6rem"}}/>
                <p style={{fontFamily:"var(--sans)",fontSize:"0.7rem",color:"rgba(228,224,236,0.35)",lineHeight:1.4}}>{s.use}</p>
              </div>
            ))}
          </div>
        </R>
      </section>

      <div className="divider"/>

      {/* ═══════ CRAFT ═══════ */}
      <section id="craft" style={{padding:"7rem 2rem",maxWidth:"880px",margin:"0 auto"}}>
        <R><div className="tag">04 — The Craft</div></R>
        <R delay={0.1}>
          <h2 style={{fontSize:"clamp(1.8rem,4.5vw,3rem)",lineHeight:1.1,fontWeight:400,marginBottom:"1.5rem"}}>
            Dark mode wasn't a feature.
            <br/><span style={{fontStyle:"italic",color:"var(--accent)"}}>It was a proof of architecture.</span>
          </h2>
        </R>

        <R delay={0.2}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.2rem",marginBottom:"2rem"}}>
            <div className="glass">
              <div style={{fontFamily:"var(--mono)",fontSize:"0.6rem",color:"var(--accent)",
                letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:"0.8rem"}}>Variables → Modes</div>
              <p className="body" style={{fontSize:"0.88rem"}}>
                Figma variable modes meant dark mode wasn't a separate file or a duplication nightmare. 
                One click. Every component. Every screen.
              </p>
            </div>
            <div className="glass">
              <div style={{fontFamily:"var(--mono)",fontSize:"0.6rem",color:"var(--accent2)",
                letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:"0.8rem"}}>Layered Components</div>
              <p className="body" style={{fontSize:"0.88rem"}}>
                Clear override logic so designers could customize without breaking the system. 
                Flexibility without chaos.
              </p>
            </div>
          </div>
        </R>

        <R delay={0.3}>
          <h3 style={{fontFamily:"var(--sans)",fontSize:"0.95rem",fontWeight:500,marginBottom:"1.2rem",color:"rgba(228,224,236,0.6)"}}>
            Constraints & Trade-offs
          </h3>
          <div style={{display:"flex",flexDirection:"column",gap:"0.6rem"}}>
            {constraints.map((c,i)=>(
              <div key={i} style={{display:"flex",gap:"0.8rem",alignItems:"center"}}>
                <div style={{width:"6px",height:"6px",borderRadius:"50%",background:"var(--accent)",flexShrink:0,opacity:0.5}}/>
                <p style={{fontFamily:"var(--sans)",fontSize:"0.88rem",color:"var(--muted)",lineHeight:1.5}}>{c}</p>
              </div>
            ))}
          </div>
        </R>
      </section>

      <div className="divider"/>

      {/* ═══════ IMPACT ═══════ */}
      <section id="impact" style={{padding:"7rem 2rem",maxWidth:"950px",margin:"0 auto"}}>
        <R><div className="tag">05 — Impact</div></R>
        <R delay={0.1}>
          <h2 style={{fontSize:"clamp(1.8rem,4.5vw,3rem)",lineHeight:1.1,fontWeight:400,marginBottom:"3rem"}}>
            Numbers that moved.
          </h2>
        </R>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"1.2rem"}}>
          {impactStats.map((s,i)=>(
            <R key={i} delay={0.1+i*0.08}>
              <div className="impact-card">
                <div style={{fontSize:"2.5rem",marginBottom:"0.8rem",
                  fontFamily:typeof s.number==="string"&&s.number.match(/\d/)?"var(--serif)":"inherit",
                  color:s.accent,lineHeight:1}}>{s.number}</div>
                <p style={{fontFamily:"var(--sans)",fontSize:"0.8rem",color:"var(--muted)",lineHeight:1.5}}>{s.label}</p>
              </div>
            </R>
          ))}
        </div>
      </section>

      <div className="divider"/>

      {/* ═══════ REFLECTION ═══════ */}
      <section id="reflection" style={{padding:"7rem 2rem",maxWidth:"880px",margin:"0 auto"}}>
        <R><div className="tag">06 — Reflection</div></R>
        <R delay={0.1}>
          <h2 style={{fontSize:"clamp(1.8rem,4.5vw,3rem)",lineHeight:1.1,fontWeight:400,marginBottom:"3rem"}}>
            The biggest win wasn't
            <br/><span style={{fontStyle:"italic",color:"var(--accent)"}}>the dark mode toggle.</span>
          </h2>
        </R>

        <R delay={0.2}>
          <div className="quote-block" style={{marginBottom:"1.5rem"}}>
            <p style={{fontSize:"1.15rem",fontStyle:"italic",lineHeight:1.5,marginBottom:"0.6rem"}}>
              "Working on Ajna taught me the power of good structure. I learned how small decisions 
              in token naming or variable logic can impact teams weeks later."
            </p>
            <p style={{fontFamily:"var(--sans)",fontSize:"0.85rem",color:"var(--muted)",lineHeight:1.6}}>
              The dark mode toggle was fun to build. But the biggest win was watching other designers 
              move faster, with less friction. That's what a design system is actually for.
            </p>
          </div>
        </R>

        <R delay={0.35}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1rem"}}>
            <div className="glass" style={{padding:"1.5rem"}}>
              <div style={{fontFamily:"var(--mono)",fontSize:"0.6rem",color:"#7BF7C4",
                letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:"0.5rem"}}>What stuck</div>
              <p style={{fontFamily:"var(--sans)",fontSize:"0.85rem",color:"var(--muted)",lineHeight:1.6}}>
                Variables aren't just a Figma feature — they're a way of thinking about 
                decisions that need to scale.
              </p>
            </div>
            <div className="glass" style={{padding:"1.5rem"}}>
              <div style={{fontFamily:"var(--mono)",fontSize:"0.6rem",color:"#F7C87B",
                letterSpacing:"0.15em",textTransform:"uppercase",marginBottom:"0.5rem"}}>What I'd do differently</div>
              <p style={{fontFamily:"var(--sans)",fontSize:"0.85rem",color:"var(--muted)",lineHeight:1.6}}>
                Start with developer feedback earlier. The best tokens are the ones 
                engineers actually want to use.
              </p>
            </div>
          </div>
        </R>
      </section>

      {/* ═══════ FOOTER ═══════ */}
      <section style={{padding:"5rem 2rem 3rem",textAlign:"center",position:"relative"}}>
        <div style={{position:"absolute",width:"400px",height:"400px",
          background:"radial-gradient(circle, rgba(155,123,247,0.04) 0%, transparent 70%)",
          bottom:0,left:"50%",transform:"translateX(-50%)",pointerEvents:"none"}}/>
        <R>
          <div className="tag">Internal Project</div>
          <h2 style={{fontSize:"clamp(1.3rem,3vw,2rem)",fontWeight:400,marginBottom:"0.6rem"}}>
            Ajna Design System
          </h2>
          <p style={{fontFamily:"var(--sans)",fontSize:"0.8rem",color:"var(--muted)",marginBottom:"1rem"}}>
            Design Systems · Component Architecture · 2025
          </p>
          <div style={{fontFamily:"var(--mono)",fontSize:"0.6rem",color:"rgba(228,224,236,0.12)",letterSpacing:"0.1em"}}>
            Built for internal tools · Reusable · Responsive · Dark mode ready
          </div>
        </R>
      </section>
    </div>
  );
}
