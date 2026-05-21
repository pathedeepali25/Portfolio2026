import { useState, useEffect, useRef } from "react";

const sections = [
  {
    id: "hero",
    label: "Intro",
  },
  {
    id: "problem",
    label: "Problem",
  },
  {
    id: "research",
    label: "Research",
  },
  {
    id: "pain",
    label: "Pain Points",
  },
  {
    id: "solution",
    label: "Solution",
  },
  {
    id: "screens",
    label: "Screens",
  },
  {
    id: "takeaways",
    label: "Takeaways",
  },
];

const painPoints = [
  {
    icon: "🧭",
    title: "Lost in Navigation",
    desc: "Users couldn't find their way. Menus were buried, flows were broken.",
    stat: "87%",
    statLabel: "complained about navigation",
  },
  {
    icon: "🎨",
    title: "Visual Chaos",
    desc: "Inconsistent UI with no visual hierarchy. Nothing guided the eye.",
    stat: "Poor",
    statLabel: "overall UI rating",
  },
  {
    icon: "📸",
    title: "Screenshot Hack",
    desc: "Users took screenshots to review answers later. The app didn't let them.",
    stat: "0",
    statLabel: "in-app review options",
  },
  {
    icon: "🔇",
    title: "No Fluency Path",
    desc: "Grammar improved, but speaking? Users were on their own.",
    stat: "60%",
    statLabel: "wanted speaking practice",
  },
  {
    icon: "📊",
    title: "Invisible Progress",
    desc: "No word tracking. No milestones. Users couldn't see how far they'd come.",
    stat: "0",
    statLabel: "words tracked",
  },
  {
    icon: "⚙️",
    title: "Buried Controls",
    desc: "Switching languages meant diving into settings. Every. Single. Time.",
    stat: "5+",
    statLabel: "taps to switch language",
  },
];

const screens = [
  {
    name: "Home",
    emoji: "🏠",
    color: "#FF6B35",
    headline: "The Zeigarnik Hook",
    desc: "A progress bar that whispers 'you're almost there.' Streak counters that turn learning into a daily ritual. Psychology meets pixels.",
    principle: "Zeigarnik Effect — people remember incomplete tasks 90% better",
  },
  {
    name: "Explore",
    emoji: "🔍",
    color: "#4ECDC4",
    headline: "Content You Actually Want",
    desc: "Podcasts, articles, games — categorized by what you love, not what we think you should learn. Your interests become your curriculum.",
    principle: "Intrinsic motivation drives 3x more engagement than extrinsic",
  },
  {
    name: "Connect",
    emoji: "💬",
    color: "#FFE66D",
    headline: "The Missing Piece",
    desc: "Chat with native speakers 1-on-1 or in groups. Because fluency doesn't happen in isolation — it happens in conversation.",
    principle: "Addressing the #1 unmet need from user research",
  },
  {
    name: "Profile",
    emoji: "👤",
    color: "#A8E6CF",
    headline: "Your Learning DNA",
    desc: "Every saved word, every bookmarked lesson, every milestone — organized beautifully. Your journey, at a glance.",
    principle: "Organized content retrieval reduces cognitive load by 40%",
  },
];

const takeaways = [
  {
    quote: "UX isn't about features — it's about confidence.",
    subtext: "Every interaction should make users feel smarter, not smaller.",
    icon: "💡",
  },
  {
    quote: "Users don't drop off because they're lazy. They drop off because they're lost.",
    subtext: "Navigation isn't just wayfinding — it's the foundation of trust.",
    icon: "🗺️",
  },
  {
    quote: "The best UX gets out of your way and helps you feel smart.",
    subtext: "Invisible design is the hardest — and most impactful — kind.",
    icon: "✨",
  },
];

function useInView(ref, threshold = 0.3) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold }
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function AnimatedSection({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, 0.15);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(60px)",
        transition: `all 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

export default function BabbelCaseStudy() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      const sectionEls = sections.map((s) => document.getElementById(s.id));
      for (let i = sectionEls.length - 1; i >= 0; i--) {
        if (sectionEls[i]) {
          const rect = sectionEls[i].getBoundingClientRect();
          if (rect.top <= 200) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Instrument Serif', Georgia, serif",
        background: "#0A0A0B",
        color: "#E8E4DF",
        minHeight: "100vh",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500&display=swap');

        * { margin: 0; padding: 0; box-sizing: border-box; }
        html { scroll-behavior: smooth; }

        .nav-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: rgba(255,255,255,0.15);
          transition: all 0.4s ease;
          cursor: pointer; border: none;
        }
        .nav-dot.active {
          background: #FF6B35;
          box-shadow: 0 0 12px rgba(255,107,53,0.5);
          transform: scale(1.4);
        }
        .nav-dot:hover { background: rgba(255,255,255,0.4); }

        .grain {
          position: fixed; top: 0; left: 0; width: 100%; height: 100%;
          pointer-events: none; z-index: 999; opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
        }

        .hero-title {
          font-size: clamp(2.8rem, 8vw, 7rem);
          line-height: 0.95;
          font-weight: 400;
          letter-spacing: -0.03em;
        }

        .section-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: #FF6B35;
          margin-bottom: 1.5rem;
        }

        .body-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 1.05rem;
          line-height: 1.75;
          color: rgba(232, 228, 223, 0.7);
          font-weight: 300;
        }

        .pain-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 16px;
          padding: 2rem;
          transition: all 0.5s cubic-bezier(0.22, 1, 0.36, 1);
          position: relative;
          overflow: hidden;
        }
        .pain-card::before {
          content: '';
          position: absolute; top: 0; left: 0;
          width: 100%; height: 2px;
          background: linear-gradient(90deg, transparent, #FF6B35, transparent);
          opacity: 0;
          transition: opacity 0.4s;
        }
        .pain-card:hover {
          background: rgba(255,255,255,0.06);
          border-color: rgba(255,107,53,0.2);
          transform: translateY(-4px);
        }
        .pain-card:hover::before { opacity: 1; }

        .screen-card {
          padding: 2.5rem;
          border-radius: 20px;
          position: relative;
          overflow: hidden;
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .screen-card:hover { transform: scale(1.02); }

        .takeaway-card {
          border-left: 3px solid #FF6B35;
          padding: 2rem 2.5rem;
          background: rgba(255,107,53,0.03);
          border-radius: 0 16px 16px 0;
          transition: all 0.4s ease;
        }
        .takeaway-card:hover {
          background: rgba(255,107,53,0.07);
          border-left-width: 5px;
        }

        .stat-number {
          font-family: 'Instrument Serif', serif;
          font-size: 2.5rem;
          color: #FF6B35;
          line-height: 1;
        }

        .divider-line {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,107,53,0.3), transparent);
          margin: 0 auto;
          width: 60%;
        }

        @keyframes float { 
          0%, 100% { transform: translateY(0); } 
          50% { transform: translateY(-10px); } 
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255,107,53,0.1); }
          50% { box-shadow: 0 0 40px rgba(255,107,53,0.25); }
        }

        .role-badge {
          display: inline-block;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          padding: 0.4rem 1rem;
          border: 1px solid rgba(255,107,53,0.3);
          border-radius: 100px;
          color: #FF6B35;
          letter-spacing: 0.1em;
        }

        .scroll-cue {
          animation: float 3s ease-in-out infinite;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          color: rgba(255,255,255,0.3);
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }

        .process-step {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 0;
        }
        .process-num {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          width: 32px; height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(255,107,53,0.3);
          display: flex; align-items: center; justify-content: center;
          color: #FF6B35;
          flex-shrink: 0;
        }
      `}</style>

      <div className="grain" />

      {/* Side nav dots */}
      <nav
        style={{
          position: "fixed",
          right: "1.5rem",
          top: "50%",
          transform: "translateY(-50%)",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          zIndex: 100,
        }}
      >
        {sections.map((s) => (
          <button
            key={s.id}
            className={`nav-dot ${activeSection === s.id ? "active" : ""}`}
            onClick={() =>
              document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth" })
            }
            title={s.label}
          />
        ))}
      </nav>

      {/* ========== HERO ========== */}
      <section
        id="hero"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "2rem",
          position: "relative",
        }}
      >
        {/* Ambient glow */}
        <div
          style={{
            position: "absolute",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(255,107,53,0.08) 0%, transparent 70%)",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${1 + scrollY * 0.0003})`,
            pointerEvents: "none",
          }}
        />

        <AnimatedSection>
          <div className="section-label" style={{ marginBottom: "2rem" }}>
            UI/UX Case Study
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <h1 className="hero-title">
            <span style={{ color: "rgba(232,228,223,0.4)", fontStyle: "italic" }}>
              When 
            </span>
            <span style={{ color: "#FF6B35" }}>10 million</span>
            <br />
            learners feel
            <br />
            <span style={{ fontStyle: "italic", color: "#E8E4DF" }}>lost</span>
            <span style={{ color: "rgba(232,228,223,0.2)" }}>,</span>{" "}
            <span style={{ color: "#4ECDC4" }}>the app</span>
            <br />
            <span style={{ color: "rgba(232,228,223,0.4)" }}>is the problem.</span>
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.35}>
          <p
            className="body-text"
            style={{
              maxWidth: "520px",
              margin: "2.5rem auto 2rem",
              fontSize: "1.15rem",
            }}
          >
            A redesign of Babbel — the world's top-selling language app — 
            turning confusion into confidence, one screen at a time.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.5}>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
            <span className="role-badge">UX Research</span>
            <span className="role-badge">UI Design</span>
            <span className="role-badge">Interaction Design</span>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.7}>
          <div className="scroll-cue" style={{ marginTop: "4rem" }}>
            ↓ Scroll to explore the story
          </div>
        </AnimatedSection>
      </section>

      {/* ========== THE PROBLEM ========== */}
      <section id="problem" style={{ padding: "8rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
        <AnimatedSection>
          <div className="section-label">01 — The Problem</div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              lineHeight: 1.1,
              marginBottom: "2rem",
              fontWeight: 400,
            }}
          >
            Babbel had the <span style={{ fontStyle: "italic", color: "#FF6B35" }}>brains</span>.
            <br />
            It just didn't have the <span style={{ fontStyle: "italic", color: "#4ECDC4" }}>soul</span>.
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="body-text" style={{ maxWidth: "680px", marginBottom: "2.5rem" }}>
            Babbel's content was world-class — interactive lessons, speech recognition,
            podcasts, games. Almost every user improved their grammar and vocabulary.
            60% even improved their speaking skills.
          </p>
          <p className="body-text" style={{ maxWidth: "680px", marginBottom: "3rem" }}>
            But the app itself? It was getting in its own way. Users weren't failing at
            learning — they were failing at <em>using</em>. And in a market where Duolingo
            makes everything feel like a game, "effective but frustrating" doesn't survive.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "2rem",
              textAlign: "center",
              marginTop: "3rem",
            }}
          >
            {[
              { num: "10M+", label: "Active users worldwide" },
              { num: "60%", label: "Improved oral proficiency" },
              { num: "14", label: "Languages offered" },
            ].map((s, i) => (
              <AnimatedSection key={i} delay={0.3 + i * 0.1}>
                <div className="stat-number">{s.num}</div>
                <div
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.8rem",
                    color: "rgba(232,228,223,0.4)",
                    marginTop: "0.5rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  {s.label}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <div className="divider-line" />

      {/* ========== RESEARCH ========== */}
      <section id="research" style={{ padding: "8rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
        <AnimatedSection>
          <div className="section-label">02 — The Deep Dive</div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              lineHeight: 1.15,
              marginBottom: "2.5rem",
              fontWeight: 400,
            }}
          >
            I didn't just study the app.
            <br />
            <span style={{ fontStyle: "italic", color: "rgba(232,228,223,0.4)" }}>
              I became the user.
            </span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="body-text" style={{ maxWidth: "680px", marginBottom: "3rem" }}>
            I used Babbel daily, read hundreds of Play Store reviews, ran competitive
            analyses against Duolingo, Rosetta Stone, and Memrise, and mapped every
            friction point in the user journey.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.3}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {[
              "Personal app usage & observation",
              "Play Store review mining (500+ reviews)",
              "Competitive analysis — 4 major competitors",
              "Desk research on language-learning outcomes",
              "Information architecture mapping",
            ].map((step, i) => (
              <div className="process-step" key={i}>
                <div className="process-num">0{i + 1}</div>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.95rem",
                    color: "rgba(232,228,223,0.65)",
                  }}
                >
                  {step}
                </span>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </section>

      <div className="divider-line" />

      {/* ========== PAIN POINTS ========== */}
      <section id="pain" style={{ padding: "8rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
        <AnimatedSection>
          <div className="section-label">03 — What Was Broken</div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              lineHeight: 1.15,
              marginBottom: "1rem",
              fontWeight: 400,
            }}
          >
            Six fractures in the experience
          </h2>
          <p className="body-text" style={{ maxWidth: "600px", marginBottom: "3rem" }}>
            Each one small enough to ignore. Together? A death spiral of frustration.
          </p>
        </AnimatedSection>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {painPoints.map((p, i) => (
            <AnimatedSection key={i} delay={0.15 + i * 0.08}>
              <div className="pain-card">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "1rem",
                  }}
                >
                  <span style={{ fontSize: "2rem" }}>{p.icon}</span>
                  <div style={{ textAlign: "right" }}>
                    <div className="stat-number" style={{ fontSize: "1.8rem" }}>
                      {p.stat}
                    </div>
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.65rem",
                        color: "rgba(232,228,223,0.3)",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {p.statLabel}
                    </div>
                  </div>
                </div>
                <h3
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "1rem",
                    fontWeight: 600,
                    marginBottom: "0.5rem",
                    color: "#E8E4DF",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.85rem",
                    color: "rgba(232,228,223,0.5)",
                    lineHeight: 1.6,
                  }}
                >
                  {p.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <div className="divider-line" />

      {/* ========== SOLUTION / SCREENS ========== */}
      <section id="solution" style={{ padding: "8rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
        <AnimatedSection>
          <div className="section-label">04 — The Redesign</div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
              fontWeight: 400,
            }}
          >
            Not a facelift.
            <br />
            <span style={{ fontStyle: "italic", color: "#FF6B35" }}>A rethink.</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <p className="body-text" style={{ maxWidth: "650px", marginBottom: "2rem" }}>
            Every screen was rebuilt from first principles: What does the user need
            <em> right now</em>? What's getting in their way? What would make them
            come back tomorrow?
          </p>
        </AnimatedSection>
      </section>

      <section id="screens" style={{ padding: "0 2rem 8rem", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gap: "1.5rem" }}>
          {screens.map((s, i) => (
            <AnimatedSection key={i} delay={0.1 + i * 0.1}>
              <div
                className="screen-card"
                style={{
                  background: `linear-gradient(135deg, ${s.color}08 0%, ${s.color}03 100%)`,
                  border: `1px solid ${s.color}15`,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "2rem",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                  }}
                >
                  <div
                    style={{
                      fontSize: "3rem",
                      width: "80px",
                      height: "80px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: `${s.color}10`,
                      borderRadius: "20px",
                      flexShrink: 0,
                    }}
                  >
                    {s.emoji}
                  </div>
                  <div style={{ flex: 1, minWidth: "250px" }}>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.65rem",
                        color: s.color,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {s.name} Screen
                    </div>
                    <h3
                      style={{
                        fontSize: "1.6rem",
                        fontWeight: 400,
                        marginBottom: "0.75rem",
                        lineHeight: 1.2,
                      }}
                    >
                      {s.headline}
                    </h3>
                    <p
                      className="body-text"
                      style={{ fontSize: "0.95rem", marginBottom: "1rem" }}
                    >
                      {s.desc}
                    </p>
                    <div
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.7rem",
                        color: "rgba(232,228,223,0.3)",
                        padding: "0.6rem 1rem",
                        background: "rgba(255,255,255,0.03)",
                        borderRadius: "8px",
                        display: "inline-block",
                      }}
                    >
                      ↳ {s.principle}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      <div className="divider-line" />

      {/* ========== TAKEAWAYS ========== */}
      <section id="takeaways" style={{ padding: "8rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
        <AnimatedSection>
          <div className="section-label">05 — What I Took Away</div>
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <h2
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              lineHeight: 1.15,
              marginBottom: "3rem",
              fontWeight: 400,
            }}
          >
            Lessons that shaped
            <br />
            <span style={{ fontStyle: "italic", color: "#4ECDC4" }}>how I design</span>
          </h2>
        </AnimatedSection>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {takeaways.map((t, i) => (
            <AnimatedSection key={i} delay={0.15 + i * 0.12}>
              <div className="takeaway-card">
                <div style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                  <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>{t.icon}</span>
                  <div>
                    <p
                      style={{
                        fontSize: "1.25rem",
                        lineHeight: 1.4,
                        marginBottom: "0.5rem",
                        fontStyle: "italic",
                      }}
                    >
                      "{t.quote}"
                    </p>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "0.85rem",
                        color: "rgba(232,228,223,0.4)",
                        lineHeight: 1.6,
                      }}
                    >
                      {t.subtext}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <section
        style={{
          padding: "6rem 2rem 4rem",
          textAlign: "center",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "400px",
            height: "400px",
            background:
              "radial-gradient(circle, rgba(78,205,196,0.06) 0%, transparent 70%)",
            bottom: "0",
            left: "50%",
            transform: "translateX(-50%)",
            pointerEvents: "none",
          }}
        />

        <AnimatedSection>
          <div className="section-label">Case Study by</div>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              fontWeight: 400,
              marginBottom: "1rem",
            }}
          >
            Deepali Pathe
          </h2>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.9rem",
              color: "rgba(232,228,223,0.4)",
              marginBottom: "2rem",
            }}
          >
            UX Researcher & Product Designer
          </p>
          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              color: "rgba(232,228,223,0.2)",
              letterSpacing: "0.1em",
            }}
          >
            Originally published on Medium · Bootcamp · 2022
          </div>
        </AnimatedSection>
      </section>
    </div>
  );
}
