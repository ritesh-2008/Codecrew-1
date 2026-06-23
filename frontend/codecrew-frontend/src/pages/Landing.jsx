import { Link } from "react-router-dom";

export default function Landing() {
    const featureCards = [
        {
            step: "01",
            title: "Publish a real build",
            desc: "Describe the product, the stack, and the kind of teammate you need.",
        },
        {
            step: "02",
            title: "Match by momentum",
            desc: "Browse open projects by skill, interest, and readiness to ship.",
        },
        {
            step: "03",
            title: "Turn strangers into crew",
            desc: "Join fast, collaborate cleanly, and move from idea to working product.",
        },
    ];

    const projectRows = [
        { title: "AI code review dashboard", stack: "React · Node · OpenAI", status: "4 builders" },
        { title: "Campus event marketplace", stack: "Next.js · MongoDB", status: "2 builders" },
        { title: "Remote pair-programming room", stack: "WebRTC · Redis", status: "6 builders" },
    ];

    return (
        <main style={{
            minHeight: "100vh",
            background: "#080510",
            color: "white",
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            position: "relative",
            overflow: "hidden",
        }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap');

                * { box-sizing: border-box; }
                html { scroll-behavior: smooth; }
                body { overflow-x: hidden; }

                @keyframes landingFadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
                @keyframes landingShimmer { 0%{background-position:-300% center} 100%{background-position:300% center} }
                @keyframes scanLine { 0%{transform:translateY(-100%)} 100%{transform:translateY(520%)} }
                @keyframes pulseDot { 0%,100%{opacity:0.45;transform:scale(1)} 50%{opacity:1;transform:scale(1.25)} }

                .landing-shell {
                    width: min(1180px, 100%);
                    margin: 0 auto;
                    padding: clamp(22px, 4vw, 40px);
                    position: relative;
                    z-index: 1;
                }
                .landing-nav {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 16px;
                    margin-bottom: clamp(46px, 9vh, 90px);
                    animation: landingFadeUp 0.55s ease-out both;
                }
                .brand-mark {
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    color: white;
                    text-decoration: none;
                    font-weight: 900;
                    letter-spacing: -0.3px;
                }
                .brand-dot {
                    width: 31px;
                    height: 31px;
                    border-radius: 10px;
                    background: linear-gradient(135deg, #f43f5e, #8b5cf6);
                    box-shadow: 0 0 28px rgba(244,63,94,0.35);
                    display: grid;
                    place-items: center;
                    font-family: 'Syne', sans-serif;
                    font-size: 15px;
                    font-weight: 800;
                }
                .nav-actions {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                .nav-link {
                    color: rgba(255,255,255,0.62);
                    text-decoration: none;
                    font-size: 14px;
                    font-weight: 800;
                    padding: 10px 12px;
                    border-radius: 11px;
                    transition: color 0.18s, background 0.18s;
                }
                .nav-link:hover {
                    color: white;
                    background: rgba(255,255,255,0.055);
                }
                .btn-primary,
                .btn-secondary {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 46px;
                    border-radius: 13px;
                    padding: 0 18px;
                    text-decoration: none;
                    font-size: 15px;
                    font-weight: 900;
                    transition: transform 0.18s, box-shadow 0.18s, background 0.18s, border-color 0.18s;
                    white-space: nowrap;
                }
                .btn-primary {
                    color: white;
                    background: linear-gradient(135deg, #f43f5e, #e11d48);
                    box-shadow: 0 0 34px rgba(244,63,94,0.28);
                    border: 0;
                }
                .btn-primary:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 0 54px rgba(244,63,94,0.4);
                }
                .btn-secondary {
                    color: rgba(255,255,255,0.76);
                    background: rgba(255,255,255,0.045);
                    border: 1px solid rgba(255,255,255,0.11);
                }
                .btn-secondary:hover {
                    transform: translateY(-1px);
                    color: white;
                    background: rgba(255,255,255,0.075);
                    border-color: rgba(255,255,255,0.2);
                }
                .hero-grid {
                    display: grid;
                    grid-template-columns: minmax(0, 0.94fr) minmax(420px, 1.06fr);
                    gap: clamp(28px, 5vw, 64px);
                    align-items: center;
                    min-height: calc(100vh - 190px);
                }
                .hero-copy {
                    animation: landingFadeUp 0.6s ease-out 0.08s both;
                }
                .signal-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 9px;
                    padding: 7px 14px;
                    border-radius: 999px;
                    background: rgba(244,63,94,0.09);
                    border: 1px solid rgba(244,63,94,0.22);
                    color: rgba(244,63,94,0.92);
                    font-size: 12px;
                    font-weight: 900;
                    letter-spacing: 1.2px;
                    text-transform: uppercase;
                    margin-bottom: 22px;
                }
                .signal-pill span:first-child {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: #f43f5e;
                    box-shadow: 0 0 10px rgba(244,63,94,0.95);
                    animation: pulseDot 2.4s ease-in-out infinite;
                }
                .hero-title {
                    font-family: 'Syne', sans-serif;
                    font-size: clamp(54px, 9vw, 104px);
                    font-weight: 800;
                    line-height: 0.92;
                    letter-spacing: -2px;
                    margin: 0;
                    max-width: 760px;
                }
                .hero-title span {
                    background: linear-gradient(135deg, #fff, rgba(255,255,255,0.72), rgba(244,63,94,0.92));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .hero-sub {
                    max-width: 590px;
                    color: rgba(255,255,255,0.54);
                    font-size: clamp(16px, 2vw, 20px);
                    line-height: 1.72;
                    margin: 24px 0 0;
                }
                .hero-actions {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-top: 30px;
                }
                .hero-stats {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 10px;
                    margin-top: 34px;
                    max-width: 560px;
                }
                .stat-card {
                    border: 1px solid rgba(255,255,255,0.09);
                    border-radius: 16px;
                    background: rgba(255,255,255,0.045);
                    padding: 15px;
                    backdrop-filter: blur(18px);
                }
                .stat-card strong {
                    display: block;
                    font-family: 'Syne', sans-serif;
                    font-size: 28px;
                    line-height: 1;
                }
                .stat-card span {
                    display: block;
                    color: rgba(255,255,255,0.4);
                    font-size: 12px;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 1px;
                    margin-top: 8px;
                }
                .product-frame {
                    border-radius: 26px;
                    padding: 1px;
                    background: linear-gradient(135deg, rgba(244,63,94,0.56), rgba(139,92,246,0.38), rgba(255,255,255,0.08));
                    box-shadow: 0 28px 90px rgba(0,0,0,0.38), 0 0 80px rgba(244,63,94,0.12);
                    animation: landingFadeUp 0.65s ease-out 0.18s both;
                    position: relative;
                }
                .product-window {
                    min-height: 560px;
                    border-radius: 25px;
                    background:
                        linear-gradient(135deg, rgba(244,63,94,0.08), rgba(139,92,246,0.07)),
                        rgba(8,5,18,0.96);
                    overflow: hidden;
                    position: relative;
                }
                .product-window::before {
                    content: "";
                    position: absolute;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
                    background-size: 30px 30px;
                    mask-image: linear-gradient(140deg, rgba(0,0,0,0.96), rgba(0,0,0,0.18));
                    pointer-events: none;
                }
                .window-bar {
                    height: 54px;
                    border-bottom: 1px solid rgba(255,255,255,0.08);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 18px;
                    position: relative;
                }
                .window-dots {
                    display: flex;
                    gap: 7px;
                }
                .window-dots span {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: rgba(255,255,255,0.18);
                }
                .mock-body {
                    position: relative;
                    padding: 20px;
                    display: grid;
                    gap: 14px;
                }
                .mock-highlight {
                    border: 1px solid rgba(244,63,94,0.28);
                    border-radius: 20px;
                    background: rgba(244,63,94,0.1);
                    padding: 20px;
                    position: relative;
                    overflow: hidden;
                }
                .mock-highlight::after {
                    content: "";
                    position: absolute;
                    left: 0;
                    right: 0;
                    top: 0;
                    height: 70px;
                    background: linear-gradient(180deg, rgba(255,255,255,0.08), transparent);
                    animation: scanLine 5s ease-in-out infinite;
                    opacity: 0.45;
                }
                .project-row {
                    border: 1px solid rgba(255,255,255,0.09);
                    border-radius: 16px;
                    background: rgba(255,255,255,0.045);
                    padding: 16px;
                    display: grid;
                    grid-template-columns: 1fr auto;
                    gap: 14px;
                    align-items: center;
                    position: relative;
                }
                .tag-row {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 7px;
                    margin-top: 16px;
                }
                .tag {
                    border: 1px solid rgba(244,63,94,0.24);
                    border-radius: 999px;
                    background: rgba(244,63,94,0.1);
                    color: rgba(255,205,214,0.95);
                    padding: 6px 10px;
                    font-size: 12px;
                    font-weight: 900;
                }
                .section-block {
                    margin-top: clamp(70px, 12vh, 120px);
                    animation: landingFadeUp 0.7s ease-out 0.28s both;
                }
                .section-heading {
                    display: flex;
                    align-items: end;
                    justify-content: space-between;
                    gap: 24px;
                    margin-bottom: 20px;
                }
                .section-heading h2 {
                    font-family: 'Syne', sans-serif;
                    font-size: clamp(34px, 5vw, 58px);
                    line-height: 1;
                    letter-spacing: -1px;
                    margin: 0;
                    max-width: 620px;
                }
                .section-heading p {
                    max-width: 390px;
                    color: rgba(255,255,255,0.44);
                    line-height: 1.65;
                    margin: 0;
                }
                .feature-grid {
                    display: grid;
                    grid-template-columns: repeat(3, minmax(0, 1fr));
                    gap: 16px;
                }
                .feature-card {
                    min-height: 230px;
                    border: 1px solid rgba(255,255,255,0.09);
                    border-radius: 18px;
                    background: rgba(255,255,255,0.045);
                    backdrop-filter: blur(18px);
                    padding: 22px;
                    transition: transform 0.18s, border-color 0.18s, box-shadow 0.18s;
                }
                .feature-card:hover {
                    transform: translateY(-4px);
                    border-color: rgba(244,63,94,0.28);
                    box-shadow: 0 28px 80px rgba(0,0,0,0.24), 0 0 42px rgba(244,63,94,0.1);
                }
                .step-number {
                    color: rgba(244,63,94,0.9);
                    font-size: 12px;
                    font-weight: 900;
                    letter-spacing: 1.5px;
                    text-transform: uppercase;
                }
                .feature-card h3 {
                    font-size: 22px;
                    line-height: 1.15;
                    letter-spacing: -0.4px;
                    margin: 34px 0 12px;
                }
                .feature-card p {
                    color: rgba(255,255,255,0.44);
                    line-height: 1.65;
                    margin: 0;
                    font-size: 14px;
                }
                .bottom-cta {
                    border: 1px solid rgba(255,255,255,0.09);
                    border-radius: 24px;
                    background:
                        linear-gradient(135deg, rgba(244,63,94,0.12), rgba(139,92,246,0.08)),
                        rgba(255,255,255,0.045);
                    backdrop-filter: blur(22px);
                    padding: clamp(26px, 5vw, 46px);
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 24px;
                }
                .background-grid {
                    position: fixed;
                    inset: 0;
                    pointer-events: none;
                    background:
                        radial-gradient(circle at 18% 0%, rgba(244,63,94,0.16), transparent 32%),
                        radial-gradient(circle at 84% 18%, rgba(139,92,246,0.13), transparent 32%),
                        linear-gradient(rgba(255,255,255,0.024) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.024) 1px, transparent 1px);
                    background-size: auto, auto, 30px 30px, 30px 30px;
                    z-index: 0;
                }
                .top-line {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 1px;
                    z-index: 2;
                    pointer-events: none;
                    background: linear-gradient(90deg, transparent, rgba(244,63,94,0.85) 30%, rgba(139,92,246,0.7) 68%, transparent);
                    background-size: 300% auto;
                    animation: landingShimmer 5s linear infinite;
                }
                :focus-visible {
                    outline: 2px solid rgba(244,63,94,0.65);
                    outline-offset: 3px;
                    border-radius: 8px;
                }

                @media (max-width: 980px) {
                    .hero-grid { grid-template-columns: 1fr; min-height: auto; }
                    .product-window { min-height: 500px; }
                    .section-heading { align-items: start; flex-direction: column; }
                    .feature-grid { grid-template-columns: 1fr; }
                    .bottom-cta { align-items: stretch; flex-direction: column; }
                    .bottom-cta .hero-actions { width: 100%; margin-top: 0; }
                }

                @media (max-width: 640px) {
                    .landing-nav { align-items: stretch; flex-direction: column; }
                    .nav-actions { width: 100%; }
                    .nav-link, .btn-primary, .btn-secondary { flex: 1; }
                    .hero-actions { align-items: stretch; flex-direction: column; }
                    .hero-stats { grid-template-columns: 1fr; }
                    .product-window { min-height: auto; }
                    .project-row { grid-template-columns: 1fr; }
                    .hero-title { letter-spacing: -1px; }
                }
            `}</style>

            <div className="background-grid" aria-hidden />
            <div className="top-line" aria-hidden />

            <div className="landing-shell">
                <nav className="landing-nav">
                    <Link to="/" className="brand-mark">
                        <span className="brand-dot">C</span>
                        <span>CodeCrew</span>
                    </Link>

                    <div className="nav-actions">
                        <Link to="/login" className="nav-link">Sign in</Link>
                        <Link to="/register" className="btn-primary">Join now</Link>
                    </div>
                </nav>

                <section className="hero-grid">
                    <div className="hero-copy">
                        <div className="signal-pill">
                            <span />
                            <span>Developer crews for real projects</span>
                        </div>

                        <h1 className="hero-title">
                            Find the builders who make your idea <span>ship.</span>
                        </h1>

                        <p className="hero-sub">
                            CodeCrew helps developers publish serious project ideas, discover crews by stack, and collaborate with people who want to build the same thing now.
                        </p>

                        <div className="hero-actions">
                            <Link to="/register" className="btn-primary">Create your crew <span aria-hidden>&rarr;</span></Link>
                            <Link to="/login" className="btn-secondary">Open feed</Link>
                        </div>

                        <div className="hero-stats">
                            {[
                                ["500+", "active members"],
                                ["100+", "projects shipped"],
                                ["50+", "live crews"],
                            ].map(([value, label]) => (
                                <div className="stat-card" key={label}>
                                    <strong>{value}</strong>
                                    <span>{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="product-frame" aria-label="CodeCrew project feed preview">
                        <div className="product-window">
                            <div className="window-bar">
                                <div className="window-dots">
                                    <span />
                                    <span />
                                    <span />
                                </div>
                                <span style={{ color:"rgba(255,255,255,0.34)", fontSize:"12px", fontWeight:"900", letterSpacing:"1px", textTransform:"uppercase" }}>
                                    Live project feed
                                </span>
                            </div>

                            <div className="mock-body">
                                <div className="mock-highlight">
                                    <span style={{ color:"rgba(244,63,94,0.95)", fontSize:"12px", fontWeight:"900", letterSpacing:"1.2px", textTransform:"uppercase" }}>
                                        Featured build
                                    </span>
                                    <h2 style={{ margin:"14px 0 8px", fontSize:"30px", lineHeight:"1.05", letterSpacing:"-0.8px" }}>
                                        Ship an MVP with people who match your stack.
                                    </h2>
                                    <p style={{ margin:0, color:"rgba(255,255,255,0.48)", lineHeight:"1.65", maxWidth:"460px" }}>
                                        Search projects, preview the idea, check required skills, and join the crew in one flow.
                                    </p>
                                    <div className="tag-row">
                                        {["React", "Node.js", "MongoDB", "Remote"].map((tag) => (
                                            <span className="tag" key={tag}>{tag}</span>
                                        ))}
                                    </div>
                                </div>

                                {projectRows.map((project) => (
                                    <div className="project-row" key={project.title}>
                                        <div>
                                            <h3 style={{ margin:"0 0 7px", fontSize:"16px", letterSpacing:"-0.2px" }}>
                                                {project.title}
                                            </h3>
                                            <p style={{ margin:0, color:"rgba(255,255,255,0.4)", fontSize:"13px" }}>
                                                {project.stack}
                                            </p>
                                        </div>
                                        <span style={{ color:"rgba(255,255,255,0.58)", fontSize:"12px", fontWeight:"900" }}>
                                            {project.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-block">
                    <div className="section-heading">
                        <h2>From idea post to working crew.</h2>
                        <p>CodeCrew keeps the loop simple: publish, discover, join, and move. No bloated profiles. No dead project boards.</p>
                    </div>

                    <div className="feature-grid">
                        {featureCards.map((feature) => (
                            <article className="feature-card" key={feature.title}>
                                <span className="step-number">{feature.step}</span>
                                <h3>{feature.title}</h3>
                                <p>{feature.desc}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="section-block" style={{ marginBottom:"clamp(34px, 7vh, 72px)" }}>
                    <div className="bottom-cta">
                        <div>
                            <span className="step-number">Start building</span>
                            <h2 style={{ fontFamily:"'Syne', sans-serif", fontSize:"clamp(30px, 5vw, 52px)", lineHeight:"1", letterSpacing:"-1px", margin:"12px 0 0" }}>
                                Your next crew is one project away.
                            </h2>
                        </div>
                        <div className="hero-actions">
                            <Link to="/register" className="btn-primary">Create account</Link>
                            <Link to="/login" className="btn-secondary">Sign in</Link>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
