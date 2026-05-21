import { useState, useEffect, useRef } from "react";

/* ────────────────────── DATA ────────────────────── */

const NAV = [
  { id: "hero", label: "Cover" },
  { id: "role", label: "Role" },
  { id: "context", label: "Context" },
  { id: "product", label: "Product" },
  { id: "challenges", label: "Challenges" },
  { id: "solutions", label: "Solutions" },
  { id: "learnings", label: "Learnings" },
];

const rolePoints = [
  {
    num: "01",
    text: "Led design end-to-end for the companion app for smart glasses.",
  },
  {
    num: "02",
    text: "Made it usable for someone who has never touched smart glasses before.",
  },
  {
    num: "03",
    text: "Owned onboarding, Buddy (voice interaction), and all core app flows.",
  },
];

const productAreas = [
  {
    icon: "📷",
    title: "Gallery",
    subtitle: "What users come back for",
    desc: "Capture moments. View and manage media. No one wants to dig through menus for things they use daily — so I made sure they never have to.",
    accent: "#4ECDC4",
  },
  {
    icon: "🗣️",
    title: "Buddy — Voice AI",
    subtitle: "Not a command tool. A conversation.",
    desc: "When it listens, how it responds, how much it speaks. Even 'Say Hey Buddy' needed to feel obvious, not awkward. Every micro-interaction was designed to feel human.",
    accent: "#FFE66D",
  },
  {
    icon: "⚙️",
    title: "Control Hub",
    subtitle: "The app as a bridge",
    desc: "Settings, customization, managing how the glasses behave. The challenge wasn't adding features — it was making sure nothing feels overwhelming.",
    accent: "#A8E6CF",
  },
  {
    icon: "🎓",
    title: "Interactive Tutorials",
    subtitle: "The breakthrough moment",
    desc: "Instead of explaining features, we guided users while they were using them. Hesitation dropped. Comfort soared. People finally understood both the app and the glasses.",
    accent: "#F4845F",
  },
];

const breakdowns = [
  {
    num: "01",
    problem: "Users were confused — not because the product was bad, but because this whole category is new.",
    insight: "Smart glasses aren't smartphones. There's no muscle memory to lean on.",
  },
  {
    num: "02",
    problem: "Ray-Ban Meta users picked it up fast. But most users don't come with that context.",
    insight: "We couldn't design for the 5% who already get it. We had to design for zero familiarity.",
  },
  {
    num: "03",
    problem: "Some people buy it out of pure curiosity — no prior mental model at all.",
    insight: "Curiosity is fragile. One confusing moment kills it. Onboarding had to be bulletproof.",
  },
];

const learnings = [
  {
    quote: "Clarity matters more than features.",
    body: "When you're designing for something genuinely new, the first job isn't to impress — it's to orient.",
  },
  {
    quote: "If users don't understand it in the first few minutes, they won't stay long enough to see its value.",
    body: "Every second of confusion is a user you've lost. The product could be incredible — but if onboarding fails, no one ever finds out.",
  },
  {
    quote: "A lot of things looked good initially but didn't help in real use — those had to go.",
    body: "Letting go of work you're proud of is part of the job. UATs don't care about your Figma files.",
  },
];

/* ────────────────────── HOOKS ────────────────────── */

function useInView(ref, threshold = 0.2) {
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

function Reveal({ children, delay = 0, y = 50, style = {}, className = "" }) {
  const ref = useRef(null);
  const vis = useInView(ref, 0.12);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : `translateY(${y}px)`,
        transition: `all 0.85s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* ────────────────────── APP ────────────────────── */

export default function LenskartCaseStudy() {
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
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      background: "#08080A",
      color: "#E2DDD7",
      minHeight: "100vh",
      overflowX: "hidden",
      position: "relative",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Outfit:wght@200;300;400;500;600&family=IBM+Plex+Mono:wght@300;400;500&display=swap');

        * { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior:smooth; }

        :root {
          --bg: #08080A;
          --text: #E2DDD7;
          --muted: rgba(226,221,215,0.4);
          --accent: #C9A96E;
          --accent2: #4ECDC4;
          --sans: 'Outfit', sans-serif;
          --mono: 'IBM Plex Mono', monospace;
          --serif: 'Cormorant Garamond', Georgia, serif;
        }

        .grain {
          position:fixed;top:0;left:0;width:100%;height:100%;
          pointer-events:none;z-index:999;opacity:0.025;
          background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
        }

        .nav-pip {
          width:6px;height:6px;border-radius:50%;
          background:rgba(255,255,255,0.12);
          border:none;cursor:pointer;
          transition:all 0.4s ease;
        }
        .nav-pip.on {
          background:var(--accent);
          box-shadow:0 0 10px rgba(201,169,110,0.45);
          transform:scale(1.6);
        }
        .nav-pip:hover { background:rgba(255,255,255,0.35); }

        .label {
          font-family:var(--mono);font-size:0.65rem;
          letter-spacing:0.35em;text-transform:uppercase;
          color:var(--accent);margin-bottom:1.2rem;
        }

        .body { font-family:var(--sans);font-size:1rem;line-height:1.75;color:var(--muted);font-weight:300; }

        .divider {
          height:1px;width:50%;margin:0 auto;
          background:linear-gradient(90deg,transparent,rgba(201,169,110,0.2),transparent);
        }

        .glass-card {
          background:rgba(255,255,255,0.025);
          border:1px solid rgba(255,255,255,0.05);
          border-radius:16px;padding:2rem;
          backdrop-filter:blur(6px);
          transition:all 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .glass-card:hover {
          background:rgba(255,255,255,0.05);
          border-color:rgba(201,169,110,0.15);
          transform:translateY(-3px);
        }

        .num-badge {
          font-family:var(--mono);font-size:0.7rem;
          width:34px;height:34px;border-radius:50%;
          border:1px solid rgba(201,169,110,0.3);
          display:flex;align-items:center;justify-content:center;
          color:var(--accent);flex-shrink:0;
        }

        .quote-bar {
          border-left:3px solid var(--accent);
          padding:1.8rem 2rem;
          background:rgba(201,169,110,0.03);
          border-radius:0 14px 14px 0;
          transition:all 0.4s ease;
        }
        .quote-bar:hover {
          background:rgba(201,169,110,0.06);
          border-left-width:5px;
        }

        @keyframes drift { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        .drift { animation:drift 4s ease-in-out infinite; }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .shimmer-text {
          background: linear-gradient(90deg, var(--accent) 0%, #fff 50%, var(--accent) 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }

        .product-card {
          position:relative;overflow:hidden;
          border-radius:20px;padding:2.5rem;
          transition:transform 0.5s cubic-bezier(0.22,1,0.36,1);
        }
        .product-card:hover { transform:scale(1.015); }
        .product-card::after {
          content:'';position:absolute;top:0;right:0;
          width:120px;height:120px;
          border-radius:50%;filter:blur(60px);opacity:0.08;
          pointer-events:none;
        }
      `}</style>

      <div className="grain" />

      {/* ── NAV DOTS ── */}
      <nav style={{
        position:"fixed",right:"1.2rem",top:"50%",transform:"translateY(-50%)",
        display:"flex",flexDirection:"column",gap:"10px",zIndex:100,
      }}>
        {NAV.map(n => (
          <button key={n.id}
            className={`nav-pip ${active===n.id?"on":""}`}
            title={n.label}
            onClick={() => document.getElementById(n.id)?.scrollIntoView({behavior:"smooth"})}
          />
        ))}
      </nav>

      {/* ═══════════════ HERO ═══════════════ */}
      <section id="hero" style={{
        minHeight:"100vh",display:"flex",flexDirection:"column",
        justifyContent:"center",alignItems:"center",textAlign:"center",
        padding:"2rem",position:"relative",
      }}>
        {/* ambient orb */}
        <div style={{
          position:"absolute",width:"700px",height:"700px",
          background:"radial-gradient(circle, rgba(201,169,110,0.06) 0%, transparent 65%)",
          top:"50%",left:"50%",
          transform:`translate(-50%,-50%) scale(${1+scrollY*0.00025})`,
          pointerEvents:"none",
        }}/>

        <Reveal>
          <div className="label" style={{marginBottom:"2.5rem",letterSpacing:"0.5em"}}>
            Lenskart · Product Design · 2025
          </div>
        </Reveal>

        <Reveal delay={0.12}>
          <p style={{
            fontFamily:"var(--sans)",fontSize:"0.85rem",color:"var(--muted)",
            maxWidth:"380px",marginBottom:"2rem",fontWeight:300,letterSpacing:"0.08em",
          }}>
            What actually deserves to be
            <br/>in your line of sight all day?
          </p>
        </Reveal>

        <Reveal delay={0.22}>
          <h1 style={{
            fontSize:"clamp(3rem,9vw,7.5rem)",lineHeight:0.92,fontWeight:400,
            letterSpacing:"-0.03em",
          }}>
            <span style={{fontStyle:"italic",color:"var(--muted)"}}>B</span>{" "}
            <span className="shimmer-text">Smart</span>
            <br/>
            <span style={{fontWeight:300}}>Glasses</span>
          </h1>
        </Reveal>

        <Reveal delay={0.38}>
          <p style={{
            fontFamily:"var(--sans)",fontSize:"1.1rem",color:"rgba(226,221,215,0.55)",
            maxWidth:"480px",margin:"2.5rem auto 2rem",fontWeight:300,lineHeight:1.7,
          }}>
            Designing the companion app for India's first consumer smart glasses — 
            where an entirely new product category meets zero user familiarity.
          </p>
        </Reveal>

        <Reveal delay={0.5}>
          <div style={{display:"flex",gap:"0.6rem",flexWrap:"wrap",justifyContent:"center"}}>
            {["End-to-End Design","Voice UX","Onboarding","0→1 Product"].map(t => (
              <span key={t} style={{
                fontFamily:"var(--mono)",fontSize:"0.7rem",
                padding:"0.4rem 1rem",border:"1px solid rgba(201,169,110,0.25)",
                borderRadius:"100px",color:"var(--accent)",letterSpacing:"0.08em",
              }}>{t}</span>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.65}>
          <div className="drift" style={{
            marginTop:"4rem",fontFamily:"var(--sans)",fontSize:"0.75rem",
            color:"rgba(255,255,255,0.2)",letterSpacing:"0.25em",textTransform:"uppercase",
          }}>↓ The full story</div>
        </Reveal>
      </section>

      {/* ═══════════════ ROLE ═══════════════ */}
      <section id="role" style={{padding:"7rem 2rem",maxWidth:"880px",margin:"0 auto"}}>
        <Reveal><div className="label">01 — My Role</div></Reveal>
        <Reveal delay={0.1}>
          <h2 style={{fontSize:"clamp(1.8rem,4.5vw,3rem)",lineHeight:1.12,fontWeight:400,marginBottom:"2.5rem"}}>
            I didn't just design screens.
            <br/><span style={{fontStyle:"italic",color:"var(--accent)"}}>I owned the experience.</span>
          </h2>
        </Reveal>

        <div style={{display:"flex",flexDirection:"column",gap:"1rem"}}>
          {rolePoints.map((r,i) => (
            <Reveal key={i} delay={0.15+i*0.08}>
              <div style={{display:"flex",gap:"1.2rem",alignItems:"flex-start"}}>
                <div className="num-badge">{r.num}</div>
                <p className="body" style={{fontSize:"1.05rem",paddingTop:"0.35rem"}}>{r.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="divider"/>

      {/* ═══════════════ CONTEXT ═══════════════ */}
      <section id="context" style={{padding:"7rem 2rem",maxWidth:"880px",margin:"0 auto"}}>
        <Reveal><div className="label">02 — The Starting Point</div></Reveal>
        <Reveal delay={0.1}>
          <h2 style={{fontSize:"clamp(1.8rem,4.5vw,3rem)",lineHeight:1.12,fontWeight:400,marginBottom:"1.5rem"}}>
            Ray-Ban Meta already existed.
            <br/><span style={{fontStyle:"italic",color:"rgba(226,221,215,0.35)"}}>
            Expectations were already set.</span>
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="body" style={{maxWidth:"640px",marginBottom:"2.5rem"}}>
            We weren't inventing the category — but we were building for an Indian market 
            that had never worn a computer on their face. The business goals were clear. 
            The user research (under NDA) revealed something harder: <em>how do you onboard 
            someone into a product they have no mental model for?</em>
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div style={{
            display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:"1.5rem",
            textAlign:"center",marginTop:"2rem",
          }}>
            {[
              {big:"0→1",sub:"New product category"},
              {big:"NDA",sub:"Research under wraps"},
              {big:"Zero",sub:"Prior user familiarity"},
            ].map((s,i) => (
              <div key={i}>
                <div style={{fontFamily:"var(--serif)",fontSize:"2.2rem",color:"var(--accent)",lineHeight:1}}>{s.big}</div>
                <div style={{fontFamily:"var(--sans)",fontSize:"0.75rem",color:"var(--muted)",marginTop:"0.4rem",letterSpacing:"0.05em"}}>{s.sub}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <div className="divider"/>

      {/* ═══════════════ PRODUCT ═══════════════ */}
      <section id="product" style={{padding:"7rem 2rem",maxWidth:"1050px",margin:"0 auto"}}>
        <Reveal><div className="label">03 — What I Built</div></Reveal>
        <Reveal delay={0.1}>
          <h2 style={{fontSize:"clamp(1.8rem,4.5vw,3rem)",lineHeight:1.12,fontWeight:400,marginBottom:"1rem"}}>
            Four pillars of the experience
          </h2>
          <p className="body" style={{maxWidth:"580px",marginBottom:"3rem"}}>
            Device pairing, gallery, voice AI, settings — the app handles everything. 
            The design challenge was never "what features" but "how do we keep it from feeling overwhelming."
          </p>
        </Reveal>

        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:"1.2rem"}}>
          {productAreas.map((p,i) => (
            <Reveal key={i} delay={0.12+i*0.08}>
              <div className="product-card" style={{
                background:`linear-gradient(145deg, ${p.accent}06 0%, ${p.accent}02 100%)`,
                border:`1px solid ${p.accent}12`,
              }}>
                <span style={{fontSize:"2.2rem",display:"block",marginBottom:"1rem"}}>{p.icon}</span>
                <div style={{
                  fontFamily:"var(--mono)",fontSize:"0.6rem",color:p.accent,
                  letterSpacing:"0.2em",textTransform:"uppercase",marginBottom:"0.4rem",
                }}>{p.subtitle}</div>
                <h3 style={{
                  fontFamily:"var(--sans)",fontSize:"1.15rem",fontWeight:500,
                  marginBottom:"0.7rem",color:"var(--text)",
                }}>{p.title}</h3>
                <p style={{
                  fontFamily:"var(--sans)",fontSize:"0.85rem",color:"var(--muted)",lineHeight:1.65,
                }}>{p.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="divider"/>

      {/* ═══════════════ CHALLENGES ═══════════════ */}
      <section id="challenges" style={{padding:"7rem 2rem",maxWidth:"950px",margin:"0 auto"}}>
        <Reveal><div className="label">04 — Where Things Broke</div></Reveal>
        <Reveal delay={0.1}>
          <h2 style={{fontSize:"clamp(1.8rem,4.5vw,3rem)",lineHeight:1.12,fontWeight:400,marginBottom:"1rem"}}>
            The product wasn't bad.
            <br/><span style={{fontStyle:"italic",color:"var(--accent)"}}>The category was unfamiliar.</span>
          </h2>
          <p className="body" style={{maxWidth:"600px",marginBottom:"3rem"}}>
            Confusion wasn't a bug — it was the default state. We had to design our way out of it.
          </p>
        </Reveal>

        <div style={{display:"flex",flexDirection:"column",gap:"1.2rem"}}>
          {breakdowns.map((b,i) => (
            <Reveal key={i} delay={0.12+i*0.1}>
              <div className="glass-card" style={{display:"flex",gap:"1.5rem",alignItems:"flex-start"}}>
                <div className="num-badge" style={{marginTop:"0.2rem"}}>{b.num}</div>
                <div style={{flex:1}}>
                  <p style={{
                    fontFamily:"var(--sans)",fontSize:"1rem",fontWeight:400,
                    color:"var(--text)",lineHeight:1.6,marginBottom:"0.6rem",
                  }}>{b.problem}</p>
                  <p style={{
                    fontFamily:"var(--mono)",fontSize:"0.75rem",color:"var(--accent)",
                    lineHeight:1.5,opacity:0.8,
                  }}>↳ {b.insight}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="divider"/>

      {/* ═══════════════ SOLUTIONS ═══════════════ */}
      <section id="solutions" style={{padding:"7rem 2rem",maxWidth:"880px",margin:"0 auto"}}>
        <Reveal><div className="label">05 — What Actually Worked</div></Reveal>
        <Reveal delay={0.1}>
          <h2 style={{fontSize:"clamp(1.8rem,4.5vw,3rem)",lineHeight:1.12,fontWeight:400,marginBottom:"1.5rem"}}>
            Guide them <span style={{fontStyle:"italic"}}>while</span> they're using it.
            <br/><span style={{color:"var(--muted)",fontSize:"0.7em"}}>Not before. Not after.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div style={{
            background:"rgba(201,169,110,0.04)",border:"1px solid rgba(201,169,110,0.1)",
            borderRadius:"20px",padding:"2.5rem",marginBottom:"2rem",
          }}>
            <div style={{
              fontFamily:"var(--mono)",fontSize:"0.65rem",color:"var(--accent)",
              letterSpacing:"0.25em",textTransform:"uppercase",marginBottom:"1rem",
            }}>The Breakthrough</div>
            <p className="body" style={{fontSize:"1.1rem",color:"rgba(226,221,215,0.7)",maxWidth:"600px"}}>
              Interactive tutorials replaced static explanations. Instead of front-loading 
              information, we embedded guidance into the moment of use. Users learned by doing — 
              and hesitation dropped dramatically.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div style={{
            background:"rgba(255,255,255,0.02)",border:"1px solid rgba(255,255,255,0.04)",
            borderRadius:"20px",padding:"2.5rem",
          }}>
            <div style={{
              fontFamily:"var(--mono)",fontSize:"0.65rem",color:"var(--accent2)",
              letterSpacing:"0.25em",textTransform:"uppercase",marginBottom:"1rem",
            }}>Continuous Iteration</div>
            <p className="body" style={{fontSize:"1.05rem",color:"rgba(226,221,215,0.6)",maxWidth:"600px"}}>
              This wasn't a one-shot design. We ran UATs continuously — fixing confusion points, 
              simplifying flows, killing features that looked great in Figma but failed in real use. 
              The discipline wasn't adding. It was subtracting.
            </p>
          </div>
        </Reveal>
      </section>

      <div className="divider"/>

      {/* ═══════════════ LEARNINGS ═══════════════ */}
      <section id="learnings" style={{padding:"7rem 2rem",maxWidth:"880px",margin:"0 auto"}}>
        <Reveal><div className="label">06 — What I Carry Forward</div></Reveal>
        <Reveal delay={0.1}>
          <h2 style={{fontSize:"clamp(1.8rem,4.5vw,3rem)",lineHeight:1.12,fontWeight:400,marginBottom:"3rem"}}>
            Lessons from designing
            <br/><span style={{fontStyle:"italic",color:"var(--accent)"}}>at the edge of new</span>
          </h2>
        </Reveal>

        <div style={{display:"flex",flexDirection:"column",gap:"1.3rem"}}>
          {learnings.map((l,i) => (
            <Reveal key={i} delay={0.12+i*0.1}>
              <div className="quote-bar">
                <p style={{fontSize:"1.2rem",fontStyle:"italic",lineHeight:1.45,marginBottom:"0.6rem"}}>
                  "{l.quote}"
                </p>
                <p style={{fontFamily:"var(--sans)",fontSize:"0.85rem",color:"var(--muted)",lineHeight:1.6}}>
                  {l.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <section style={{padding:"6rem 2rem 3.5rem",textAlign:"center",position:"relative"}}>
        <div style={{
          position:"absolute",width:"400px",height:"400px",
          background:"radial-gradient(circle, rgba(201,169,110,0.05) 0%, transparent 70%)",
          bottom:0,left:"50%",transform:"translateX(-50%)",pointerEvents:"none",
        }}/>
        <Reveal>
          <div className="label">Built for Lenskart</div>
          <h2 style={{fontSize:"clamp(1.4rem,3.5vw,2.2rem)",fontWeight:400,marginBottom:"0.8rem"}}>
            B Smart Glasses Companion App
          </h2>
          <p style={{
            fontFamily:"var(--sans)",fontSize:"0.85rem",color:"var(--muted)",marginBottom:"1.5rem",
          }}>Product Design · End-to-End · 2025</p>
          <div style={{
            fontFamily:"var(--mono)",fontSize:"0.65rem",color:"rgba(226,221,215,0.15)",letterSpacing:"0.1em",
          }}>
            Some research details omitted under NDA
          </div>
        </Reveal>
      </section>
    </div>
  );
}
