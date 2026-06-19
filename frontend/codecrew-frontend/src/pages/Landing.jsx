import { Link } from "react-router-dom";

export default function Landing() {
    return (
        <main style={{
            minHeight: "100vh",
            background: "#080510",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflowX: "hidden",
            fontFamily: "'Inter', -apple-system, sans-serif",
        }}>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');

                * { box-sizing: border-box; margin: 0; padding: 0; }
                html { scroll-behavior: smooth; }
                body { overflow-x: hidden; }

                @keyframes float-orb-a {
                    0%,100% { transform: translateY(0px) scale(1); }
                    50%      { transform: translateY(-30px) scale(1.05); }
                }
                @keyframes float-orb-b {
                    0%,100% { transform: translateY(0px) scale(1); }
                    50%      { transform: translateY(24px) scale(0.96); }
                }
                @keyframes shimmer-line {
                    0%   { background-position: -400% center; }
                    100% { background-position:  400% center; }
                }
                @keyframes fade-up {
                    from { opacity: 0; transform: translateY(24px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulse-badge {
                    0%,100% { box-shadow: 0 0 0 0 rgba(244,63,94,0.3); }
                    50%     { box-shadow: 0 0 0 8px rgba(244,63,94,0); }
                }
                @keyframes spin-slow {
                    from { transform: rotate(0deg); }
                    to   { transform: rotate(360deg); }
                }

                .hero-title {
                    font-family: 'Syne', sans-serif;
                    font-size: clamp(56px, 12vw, 120px);
                    font-weight: 800;
                    line-height: 0.95;
                    letter-spacing: -3px;
                    background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 60%, rgba(244,63,94,0.8) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: fade-up 0.7s ease-out both;
                }

                .hero-sub {
                    font-size: clamp(16px, 3vw, 22px);
                    font-weight: 400;
                    color: rgba(255,255,255,0.45);
                    line-height: 1.65;
                    max-width: 540px;
                    animation: fade-up 0.7s ease-out 0.12s both;
                }

                .feature-card {
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.08);
                    border-radius: 20px;
                    padding: clamp(20px, 4vw, 32px);
                    transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
                    position: relative;
                    overflow: hidden;
                }
                .feature-card:hover {
                    transform: translateY(-4px);
                    border-color: rgba(244,63,94,0.3);
                    box-shadow: 0 20px 60px rgba(244,63,94,0.08);
                }
                .feature-card::before {
                    content: '';
                    position: absolute;
                    top: 0; left: 0; right: 0;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, rgba(244,63,94,0.5), transparent);
                    opacity: 0;
                    transition: opacity 0.25s;
                }
                .feature-card:hover::before { opacity: 1; }

                .btn-primary {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    padding: clamp(14px, 3vw, 18px) clamp(28px, 5vw, 48px);
                    font-size: clamp(15px, 2.5vw, 18px);
                    font-weight: 700;
                    color: white;
                    background: linear-gradient(135deg, #f43f5e, #e11d48);
                    border-radius: 14px;
                    text-decoration: none;
                    border: none;
                    box-shadow: 0 0 30px rgba(244,63,94,0.3), 0 4px 20px rgba(244,63,94,0.2);
                    transition: all 0.25s;
                    font-family: inherit;
                    letter-spacing: -0.3px;
                    white-space: nowrap;
                }
                .btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 0 50px rgba(244,63,94,0.45), 0 8px 30px rgba(244,63,94,0.3);
                }
                .btn-primary:active { transform: scale(0.97); }

                .btn-secondary {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    padding: clamp(14px, 3vw, 18px) clamp(28px, 5vw, 48px);
                    font-size: clamp(15px, 2.5vw, 18px);
                    font-weight: 600;
                    color: rgba(255,255,255,0.75);
                    background: rgba(255,255,255,0.05);
                    border-radius: 14px;
                    text-decoration: none;
                    border: 1px solid rgba(255,255,255,0.12);
                    transition: all 0.25s;
                    font-family: inherit;
                    letter-spacing: -0.3px;
                    white-space: nowrap;
                    backdrop-filter: blur(8px);
                }
                .btn-secondary:hover {
                    background: rgba(255,255,255,0.09);
                    border-color: rgba(255,255,255,0.22);
                    color: white;
                    transform: translateY(-2px);
                }
                .btn-secondary:active { transform: scale(0.97); }

                .stat-num {
                    font-family: 'Syne', sans-serif;
                    font-size: clamp(28px, 5vw, 42px);
                    font-weight: 800;
                    background: linear-gradient(135deg, #fff, rgba(244,63,94,0.9));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    line-height: 1;
                }

                @media (max-width: 640px) {
                    .cta-row { flex-direction: column; width: 100%; }
                    .btn-primary, .btn-secondary { width: 100%; }
                    .features-grid { grid-template-columns: 1fr !important; }
                    .stats-grid { gap: 16px !important; }
                }

                :focus-visible {
                    outline: 2px solid rgba(244,63,94,0.7);
                    outline-offset: 3px;
                    border-radius: 8px;
                }
            `}</style>

            {/* ── Background orbs ── */}
            <div style={{
                position: "fixed", top: "-200px", left: "-150px",
                width: "500px", height: "500px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(244,63,94,0.14) 0%, transparent 70%)",
                filter: "blur(80px)", pointerEvents: "none", zIndex: 0,
                animation: "float-orb-a 10s ease-in-out infinite",
            }} aria-hidden />

            <div style={{
                position: "fixed", bottom: "-180px", right: "-130px",
                width: "440px", height: "440px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)",
                filter: "blur(70px)", pointerEvents: "none", zIndex: 0,
                animation: "float-orb-b 13s ease-in-out infinite",
            }} aria-hidden />

            <div style={{
                position: "fixed", top: "40%", left: "60%",
                width: "300px", height: "300px", borderRadius: "50%",
                background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
                filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
                animation: "float-orb-a 16s ease-in-out infinite reverse",
            }} aria-hidden />

            {/* Grid overlay */}
            <div style={{
                position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
                backgroundImage: `linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                                   linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)`,
                backgroundSize: "32px 32px",
            }} aria-hidden />

            {/* Top shimmer */}
            <div style={{
                position: "fixed", top: 0, left: 0, right: 0, height: "1px", zIndex: 50,
                background: "linear-gradient(90deg, transparent, rgba(244,63,94,0.8) 30%, rgba(139,92,246,0.7) 60%, transparent)",
                backgroundSize: "300% auto",
                animation: "shimmer-line 5s linear infinite",
            }} aria-hidden />

            {/* ── Content ── */}
            <div style={{
                width: "100%",
                maxWidth: "min(1160px, 94vw)",
                margin: "0 auto",
                padding: "clamp(40px, 8vh, 80px) clamp(16px, 4vw, 48px)",
                position: "relative", zIndex: 1,
                display: "flex", flexDirection: "column", alignItems: "center",
                gap: "clamp(48px, 8vh, 80px)",
            }}>

                {/* ── Hero ── */}
                <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: "24px" }}>

                    {/* Badge */}
                    <div style={{
                        display: "inline-flex", alignItems: "center", gap: "8px",
                        padding: "6px 16px", borderRadius: "999px",
                        background: "rgba(244,63,94,0.1)", border: "1px solid rgba(244,63,94,0.25)",
                        animation: "fade-up 0.6s ease-out both, pulse-badge 3s ease-in-out 1s infinite",
                    }}>
                        <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#f43f5e", boxShadow: "0 0 8px rgba(244,63,94,0.9)" }} />
                        <span style={{ fontSize: "12px", fontWeight: "700", color: "rgba(244,63,94,0.9)", letterSpacing: "1.5px", textTransform: "uppercase" }}>
                            Now in Beta
                        </span>
                    </div>

                    <h1 className="hero-title">CodeCrew</h1>

                    <p className="hero-sub">
                        Find developers who build like you do. Post a project, join a crew, ship something real.
                    </p>

                    {/* CTA buttons */}
                    <div className="cta-row" style={{
                        display: "flex", gap: "12px", justifyContent: "center",
                        marginTop: "8px", animation: "fade-up 0.7s ease-out 0.24s both",
                    }}>
                        <Link to="/register" className="btn-primary">
                            Create Account <span>→</span>
                        </Link>
                        <Link to="/login" className="btn-secondary">
                            Sign In <span style={{ opacity: 0.6 }}>↗</span>
                        </Link>
                    </div>
                </div>

                {/* ── Features ── */}
                <div className="features-grid" style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "clamp(12px, 2vw, 20px)",
                    width: "100%",
                    animation: "fade-up 0.7s ease-out 0.3s both",
                }}>
                    {[
                        { icon: "💡", title: "Post Ideas", desc: "Share your project concept and find developers who want to build it with you." },
                        { icon: "🤝", title: "Join Crews", desc: "Browse open projects by stack and skill. One click to join, zero friction." },
                        { icon: "🚀", title: "Ship Together", desc: "Collaborate, commit, and launch — with people who are as serious as you are." },
                    ].map(({ icon, title, desc }) => (
                        <div key={title} className="feature-card">
                            <div style={{ fontSize: "clamp(28px, 4vw, 36px)", marginBottom: "16px" }}>{icon}</div>
                            <h3 style={{
                                fontFamily: "'Syne', sans-serif",
                                fontSize: "clamp(16px, 2.2vw, 20px)",
                                fontWeight: "700",
                                color: "white",
                                marginBottom: "10px",
                                letterSpacing: "-0.3px",
                            }}>{title}</h3>
                            <p style={{
                                fontSize: "clamp(13px, 1.6vw, 15px)",
                                color: "rgba(255,255,255,0.42)",
                                lineHeight: "1.65",
                            }}>{desc}</p>
                        </div>
                    ))}
                </div>

                {/* ── Stats ── */}
                <div style={{
                    width: "100%",
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                    paddingTop: "clamp(32px, 5vh, 48px)",
                    animation: "fade-up 0.7s ease-out 0.4s both",
                }}>
                    <div className="stats-grid" style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "clamp(24px, 4vw, 48px)",
                        textAlign: "center",
                    }}>
                        {[
                            { num: "500+", label: "Active Members" },
                            { num: "100+", label: "Projects Shipped" },
                            { num: "50+",  label: "Active Crews" },
                        ].map(({ num, label }) => (
                            <div key={label} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                                <span className="stat-num">{num}</span>
                                <span style={{
                                    fontSize: "clamp(12px, 1.5vw, 14px)",
                                    color: "rgba(255,255,255,0.35)",
                                    fontWeight: "500",
                                    letterSpacing: "0.3px",
                                }}>{label}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ── Footer note ── */}
                <p style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.2)",
                    letterSpacing: "0.3px",
                    animation: "fade-up 0.7s ease-out 0.48s both",
                }}>
                    🔒 Your data is encrypted and never sold
                </p>

            </div>
        </main>
    );
}
