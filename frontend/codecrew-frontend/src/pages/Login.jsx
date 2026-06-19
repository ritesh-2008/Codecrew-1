import { useState } from "react";
import useAuth from "../hooks/usehook"
import { useNavigate, Link } from "react-router-dom";


export default function Login() {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [focused, setFocused] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    const handle = async (e) => {
        e.preventDefault();
        
        // Validation
        if (!email.trim()) {
            setError("Email is required");
            return;
        }
        if (!password.trim()) {
            setError("Password is required");
            return;
        }
        if (password.length < 6) {
            setError("Password must be at least 6 characters");
            return;
        }
        
        setLoading(true);
        setError("");
        try {
            const result = await login(email, password);
            if (result.success) {
                navigate("/feed");
            } else {
                setError(result.error || "login failed");
            }
        } catch {
            setError("something went wrong")
        }
        setLoading(false);
    }

    const inputBase = {
        width: "100%",
        padding: "15px 48px 15px 16px",
        background: "rgba(255,255,255,0.045)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "12px",
        color: "white",
        fontSize: "16px",
        fontFamily: "inherit",
        outline: "none",
        transition: "border-color 0.2s, background 0.2s, box-shadow 0.2s",
    };

    const inputStyle = (field) => ({
        ...inputBase,
        borderColor: focused === field ? "rgba(244,63,94,0.72)" : "rgba(255,255,255,0.1)",
        background: focused === field ? "rgba(244,63,94,0.055)" : "rgba(255,255,255,0.045)",
        boxShadow: focused === field ? "0 0 0 4px rgba(244,63,94,0.09), 0 0 28px rgba(244,63,94,0.13)" : "none",
    });

    const labelStyle = {
        display: "block",
        marginBottom: "8px",
        color: "rgba(244,63,94,0.82)",
        fontSize: "11px",
        fontWeight: "800",
        letterSpacing: "1.4px",
        textTransform: "uppercase",
    };

    return (
        <main style={{
            minHeight: "100vh",
            background: "#080510",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(24px, 5vh, 64px) clamp(16px, 4vw, 40px)",
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            position: "relative",
            overflow: "hidden",
        }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap');

                * { box-sizing: border-box; }
                body { overflow-x: hidden; }

                @keyframes loginFloatA { 0%,100%{transform:translate3d(0,0,0)} 50%{transform:translate3d(0,-26px,0)} }
                @keyframes loginFloatB { 0%,100%{transform:translate3d(0,0,0)} 50%{transform:translate3d(0,22px,0)} }
                @keyframes loginFadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
                @keyframes loginShimmer { 0%{background-position:-300% center} 100%{background-position:300% center} }
                @keyframes loginSpin { to{transform:rotate(360deg)} }

                .login-shell { animation: loginFadeUp 0.55s ease-out both; }
                .login-grid {
                    display: grid;
                    grid-template-columns: minmax(0, 1fr) minmax(380px, 440px);
                    width: min(980px, 100%);
                    border-radius: 24px;
                    padding: 1px;
                    background: linear-gradient(135deg, rgba(244,63,94,0.55), rgba(139,92,246,0.42), rgba(59,130,246,0.28));
                    box-shadow: 0 28px 90px rgba(0,0,0,0.42), 0 0 80px rgba(244,63,94,0.12);
                    position: relative;
                    z-index: 1;
                }
                .login-card {
                    grid-column: 2;
                    border-radius: 0 23px 23px 0;
                    background: rgba(8,5,18,0.97);
                    backdrop-filter: blur(24px);
                    padding: clamp(26px, 4vw, 42px);
                    position: relative;
                    overflow: hidden;
                }
                .login-panel {
                    border-radius: 23px 0 0 23px;
                    background:
                        linear-gradient(135deg, rgba(244,63,94,0.16), rgba(139,92,246,0.12)),
                        radial-gradient(circle at 20% 20%, rgba(255,255,255,0.11), transparent 32%),
                        rgba(255,255,255,0.035);
                    border-right: 1px solid rgba(255,255,255,0.08);
                    min-height: 580px;
                    padding: clamp(32px, 5vw, 52px);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    position: relative;
                    overflow: hidden;
                }
                .login-panel::before {
                    content: "";
                    position: absolute;
                    inset: 0;
                    background-image:
                        linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
                    background-size: 28px 28px;
                    mask-image: linear-gradient(120deg, rgba(0,0,0,0.95), rgba(0,0,0,0.16));
                    pointer-events: none;
                }
                .login-title {
                    font-family: 'Syne', sans-serif;
                    font-size: clamp(42px, 7vw, 78px);
                    font-weight: 800;
                    line-height: 0.95;
                    color: white;
                    letter-spacing: -2px;
                    margin: 0;
                    position: relative;
                }
                .metric-row {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 10px;
                    position: relative;
                }
                .metric {
                    border: 1px solid rgba(255,255,255,0.1);
                    background: rgba(255,255,255,0.045);
                    border-radius: 14px;
                    padding: 14px 12px;
                }
                .login-submit {
                    width: 100%;
                    min-height: 50px;
                    border: 0;
                    border-radius: 12px;
                    background: linear-gradient(135deg, #f43f5e, #e11d48);
                    color: white;
                    font: inherit;
                    font-size: 16px;
                    font-weight: 800;
                    cursor: pointer;
                    box-shadow: 0 0 34px rgba(244,63,94,0.26);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 9px;
                    transition: transform 0.18s, box-shadow 0.18s, background 0.18s;
                }
                .login-submit:hover:not(:disabled) {
                    transform: translateY(-1px);
                    box-shadow: 0 0 54px rgba(244,63,94,0.38);
                }
                .login-submit:active:not(:disabled) { transform: scale(0.98); }
                .login-submit:disabled {
                    background: rgba(255,255,255,0.11);
                    color: rgba(255,255,255,0.35);
                    cursor: not-allowed;
                    box-shadow: none;
                }
                input::placeholder { color: rgba(255,255,255,0.22); }
                input:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0 1000px #0d0818 inset !important;
                    -webkit-text-fill-color: white !important;
                }
                :focus-visible {
                    outline: 2px solid rgba(244,63,94,0.65);
                    outline-offset: 3px;
                    border-radius: 8px;
                }

                @media (max-width: 840px) {
                    .login-grid { display: block; max-width: 480px; }
                    .login-panel { display: none; }
                    .login-card { border-radius: 23px; }
                }
            `}</style>

            <div style={{ position:"fixed", top:"-170px", left:"-120px", width:"430px", height:"430px",
                borderRadius:"50%", background:"radial-gradient(circle, rgba(244,63,94,0.15) 0%, transparent 70%)",
                filter:"blur(72px)", pointerEvents:"none", animation:"loginFloatA 10s ease-in-out infinite" }} aria-hidden />
            <div style={{ position:"fixed", bottom:"-160px", right:"-110px", width:"400px", height:"400px",
                borderRadius:"50%", background:"radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)",
                filter:"blur(68px)", pointerEvents:"none", animation:"loginFloatB 13s ease-in-out infinite" }} aria-hidden />
            <div style={{ position:"fixed", inset:0, pointerEvents:"none",
                backgroundImage:"linear-gradient(rgba(255,255,255,0.024) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.024) 1px, transparent 1px)",
                backgroundSize:"30px 30px" }} aria-hidden />
            <div style={{ position:"fixed", top:0, left:0, right:0, height:"1px", zIndex:2, pointerEvents:"none",
                background:"linear-gradient(90deg, transparent, rgba(244,63,94,0.85) 30%, rgba(139,92,246,0.7) 68%, transparent)",
                backgroundSize:"300% auto", animation:"loginShimmer 5s linear infinite" }} aria-hidden />

            <section className="login-shell login-grid">
                <aside className="login-panel" aria-hidden>
                    <div style={{ position:"relative" }}>
                        <div style={{ display:"inline-flex", alignItems:"center", gap:"8px",
                            padding:"7px 14px", borderRadius:"999px", background:"rgba(244,63,94,0.12)",
                            border:"1px solid rgba(244,63,94,0.28)", marginBottom:"28px" }}>
                            <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#f43f5e",
                                boxShadow:"0 0 12px rgba(244,63,94,0.95)" }} />
                            <span style={{ color:"rgba(255,255,255,0.7)", fontSize:"12px", fontWeight:"800",
                                letterSpacing:"1.2px", textTransform:"uppercase" }}>Developer network</span>
                        </div>
                        <h1 className="login-title">Build with your crew.</h1>
                        <p style={{ maxWidth:"390px", marginTop:"22px", color:"rgba(255,255,255,0.56)",
                            fontSize:"16px", lineHeight:"1.7" }}>
                            Jump back into your projects, meet builders who match your stack, and keep shipping.
                        </p>
                    </div>

                    <div className="metric-row">
                        <div className="metric">
                            <strong style={{ display:"block", color:"white", fontSize:"22px", lineHeight:"1" }}>24/7</strong>
                            <span style={{ display:"block", color:"rgba(255,255,255,0.42)", fontSize:"12px", marginTop:"8px" }}>active crews</span>
                        </div>
                        <div className="metric">
                            <strong style={{ display:"block", color:"white", fontSize:"22px", lineHeight:"1" }}>Fast</strong>
                            <span style={{ display:"block", color:"rgba(255,255,255,0.42)", fontSize:"12px", marginTop:"8px" }}>project matching</span>
                        </div>
                        <div className="metric">
                            <strong style={{ display:"block", color:"white", fontSize:"22px", lineHeight:"1" }}>Real</strong>
                            <span style={{ display:"block", color:"rgba(255,255,255,0.42)", fontSize:"12px", marginTop:"8px" }}>collaboration</span>
                        </div>
                    </div>
                </aside>

                <div className="login-card">
                    <div style={{ position:"absolute", top:"-80px", right:"-70px", width:"220px", height:"220px",
                        borderRadius:"50%", background:"radial-gradient(circle, rgba(244,63,94,0.1), transparent 68%)",
                        filter:"blur(36px)", pointerEvents:"none" }} aria-hidden />

                    <div style={{ position:"relative", textAlign:"center", marginBottom:"30px" }}>
                        <Link to="/" style={{ display:"inline-flex", alignItems:"center", gap:"8px",
                            padding:"6px 14px", borderRadius:"999px", background:"rgba(244,63,94,0.08)",
                            border:"1px solid rgba(244,63,94,0.2)", color:"rgba(244,63,94,0.86)",
                            fontSize:"11px", fontWeight:"800", letterSpacing:"1.5px", textTransform:"uppercase",
                            textDecoration:"none", marginBottom:"18px" }}>
                            <span style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#f43f5e",
                                boxShadow:"0 0 8px rgba(244,63,94,0.9)" }} />
                            CodeCrew
                        </Link>
                        <h2 style={{ fontFamily:"'Syne', sans-serif", color:"white", fontSize:"clamp(28px, 5vw, 36px)",
                            lineHeight:"1.05", fontWeight:"800", letterSpacing:"-1px", margin:"0 0 10px" }}>
                            Welcome back
                        </h2>
                        <p style={{ margin:0, color:"rgba(255,255,255,0.4)", fontSize:"14px", lineHeight:"1.6" }}>
                            New here?{" "}
                            <Link to="/register" style={{ color:"rgba(244,63,94,0.9)", fontWeight:"700",
                                textDecoration:"none", borderBottom:"1px solid rgba(244,63,94,0.34)" }}>
                                Create an account
                            </Link>
                        </p>
                    </div>

                    {error && (
                        <div style={{ display:"flex", alignItems:"center", gap:"10px", padding:"12px 14px",
                            borderRadius:"12px", marginBottom:"20px", background:"rgba(239,68,68,0.09)",
                            border:"1px solid rgba(239,68,68,0.24)", position:"relative" }}>
                            <span style={{ width:"8px", height:"8px", borderRadius:"50%", background:"#ef4444",
                                boxShadow:"0 0 12px rgba(239,68,68,0.7)", flex:"0 0 auto" }} />
                            <p style={{ margin:0, color:"rgba(254,202,202,0.96)", fontSize:"13px", fontWeight:"600",
                                lineHeight:"1.5" }}>{error}</p>
                        </div>
                    )}

                    <form onSubmit={handle} style={{ display:"flex", flexDirection:"column", gap:"18px", position:"relative" }}>
                        <div>
                            <label style={labelStyle}>Email Address</label>
                            <div style={{ position:"relative" }}>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setemail(e.target.value)}
                                    onFocus={() => setFocused("email")}
                                    onBlur={() => setFocused("")}
                                    placeholder="you@example.com"
                                    disabled={loading}
                                    required
                                    style={inputStyle("email")}
                                />
                                <span style={{ position:"absolute", right:"15px", top:"50%", transform:"translateY(-50%)",
                                    color:"rgba(255,255,255,0.32)", fontSize:"15px", pointerEvents:"none" }}>@</span>
                            </div>
                            {email && !email.includes("@") && (
                                <p style={{ margin:"8px 0 0", color:"rgba(251,191,36,0.9)", fontSize:"12px", fontWeight:"600" }}>
                                    Please enter a valid email.
                                </p>
                            )}
                        </div>

                        <div>
                            <label style={labelStyle}>Password</label>
                            <div style={{ position:"relative" }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setpassword(e.target.value)}
                                    onFocus={() => setFocused("password")}
                                    onBlur={() => setFocused("")}
                                    placeholder="min 6 characters"
                                    disabled={loading}
                                    required
                                    style={inputStyle("password")}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    disabled={loading}
                                    style={{ position:"absolute", right:"10px", top:"50%", transform:"translateY(-50%)",
                                        height:"32px", minWidth:"34px", border:"0", borderRadius:"9px",
                                        background: showPassword ? "rgba(244,63,94,0.12)" : "transparent",
                                        color: showPassword ? "rgba(244,63,94,0.92)" : "rgba(255,255,255,0.38)",
                                        cursor: loading ? "not-allowed" : "pointer", fontSize:"12px", fontWeight:"800",
                                        letterSpacing:"0.5px" }}
                                >
                                    {showPassword ? "HIDE" : "SHOW"}
                                </button>
                            </div>
                        </div>

                        <button type="submit" disabled={loading} className="login-submit" style={{ marginTop:"6px" }}>
                            {loading ? (
                                <>
                                    <span style={{ width:"16px", height:"16px", border:"2px solid rgba(255,255,255,0.32)",
                                        borderTopColor:"white", borderRadius:"50%", animation:"loginSpin 0.7s linear infinite" }} />
                                    Signing in...
                                </>
                            ) : (
                                <>Sign in <span aria-hidden>&rarr;</span></>
                            )}
                        </button>
                    </form>

                    <p style={{ margin:"20px 0 0", textAlign:"center", color:"rgba(255,255,255,0.25)",
                        fontSize:"12px", lineHeight:"1.6" }}>
                        Protected session. Encrypted credentials. No noise.
                    </p>
                </div>
            </section>
        </main>
    );
}

