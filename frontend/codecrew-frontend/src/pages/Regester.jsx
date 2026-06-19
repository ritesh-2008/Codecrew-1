import { useState } from "react";
import useAuth from "../hooks/usehook";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState("");
    const [location, setLocation] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [focused, setFocused] = useState("");
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSkillKey = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const s = skillInput.trim();
            if (s && !skills.includes(s)) setSkills([...skills, s]);
            setSkillInput("");
        }
    };

    const removeSkill = (s) => setSkills(skills.filter(x => x !== s));

    const handle = async (e) => {
        e.preventDefault();
        if (!username.trim()) return setError("Username is required");
        if (!email.trim())    return setError("Email is required");
        if (!password.trim()) return setError("Password is required");
        if (password.length < 6) return setError("Password must be at least 6 characters");

        setLoading(true);
        setError("");
        const res = await register(username, email, password, skills, location);
        if (res.success) {
            navigate("/feed");
        } else {
            setError(res.error || "Registration failed");
        }
        setLoading(false);
    };

    const inputBase = {
        width: "100%",
        padding: "14px 48px 14px 16px",
        background: "rgba(255,255,255,0.05)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "12px",
        color: "white",
        fontSize: "15px",
        fontFamily: "inherit",
        outline: "none",
        transition: "all 0.2s",
    };

    const inp = (field) => ({
        ...inputBase,
        borderColor: focused === field ? "rgba(244,63,94,0.7)" : "rgba(255,255,255,0.1)",
        boxShadow: focused === field ? "0 0 20px rgba(244,63,94,0.15)" : "none",
        background: focused === field ? "rgba(244,63,94,0.04)" : "rgba(255,255,255,0.04)",
    });

    const labelStyle = {
        display: "block",
        fontSize: "11px",
        fontWeight: "700",
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        color: "rgba(244,63,94,0.7)",
        marginBottom: "8px",
    };

    return (
        <main style={{
            minHeight: "100vh",
            background: "#080510",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "clamp(24px, 5vh, 60px) clamp(16px, 4vw, 32px)",
            fontFamily: "'Inter', -apple-system, sans-serif",
            position: "relative",
            overflowX: "hidden",
        }}>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');

                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { overflow-x: hidden; }

                @keyframes float-a { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-24px)} }
                @keyframes float-b { 0%,100%{transform:translateY(0)} 50%{transform:translateY(18px)} }
                @keyframes shimmer { 0%{background-position:-300% center} 100%{background-position:300% center} }
                @keyframes fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
                @keyframes spin    { to{transform:rotate(360deg)} }

                .reg-card { animation: fadeUp 0.55s ease-out both; }

                input::placeholder { color: rgba(255,255,255,0.2); }
                input:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0 1000px #0d0818 inset !important;
                    -webkit-text-fill-color: white !important;
                }

                /* prevent iOS zoom */
                input, button, select, textarea { font-size: 16px !important; }

                .skill-tag {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 4px 10px 4px 12px;
                    background: rgba(244,63,94,0.12);
                    border: 1px solid rgba(244,63,94,0.3);
                    border-radius: 999px;
                    color: rgba(244,63,94,0.9);
                    font-size: 13px;
                    font-weight: 600;
                }
                .skill-tag button {
                    background: none;
                    border: none;
                    color: rgba(244,63,94,0.6);
                    cursor: pointer;
                    padding: 0;
                    font-size: 14px !important;
                    line-height: 1;
                    transition: color 0.15s;
                }
                .skill-tag button:hover { color: rgba(244,63,94,1); }

                .submit-btn {
                    width: 100%;
                    padding: 15px;
                    border: none;
                    border-radius: 12px;
                    font-size: 16px !important;
                    font-weight: 700;
                    color: white;
                    background: linear-gradient(135deg, #f43f5e, #e11d48);
                    cursor: pointer;
                    font-family: inherit;
                    letter-spacing: -0.2px;
                    box-shadow: 0 0 30px rgba(244,63,94,0.25);
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                }
                .submit-btn:hover:not(:disabled) {
                    transform: translateY(-1px);
                    box-shadow: 0 0 50px rgba(244,63,94,0.4);
                }
                .submit-btn:active:not(:disabled) { transform: scale(0.98); }
                .submit-btn:disabled {
                    background: rgba(255,255,255,0.1);
                    color: rgba(255,255,255,0.3);
                    cursor: not-allowed;
                    box-shadow: none;
                }

                :focus-visible {
                    outline: 2px solid rgba(244,63,94,0.6);
                    outline-offset: 3px;
                    border-radius: 8px;
                }
            `}</style>

            {/* Orbs */}
            <div style={{ position:"fixed", top:"-160px", left:"-120px", width:"400px", height:"400px",
                borderRadius:"50%", background:"radial-gradient(circle, rgba(244,63,94,0.13) 0%, transparent 70%)",
                filter:"blur(70px)", pointerEvents:"none", zIndex:0,
                animation:"float-a 10s ease-in-out infinite" }} aria-hidden />
            <div style={{ position:"fixed", bottom:"-140px", right:"-100px", width:"360px", height:"360px",
                borderRadius:"50%", background:"radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
                filter:"blur(60px)", pointerEvents:"none", zIndex:0,
                animation:"float-b 13s ease-in-out infinite" }} aria-hidden />

            {/* Grid */}
            <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none",
                backgroundImage:"linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
                backgroundSize:"28px 28px" }} aria-hidden />

            {/* Top shimmer */}
            <div style={{ position:"fixed", top:0, left:0, right:0, height:"1px", zIndex:50, pointerEvents:"none",
                background:"linear-gradient(90deg, transparent, rgba(244,63,94,0.8) 30%, rgba(139,92,246,0.7) 70%, transparent)",
                backgroundSize:"300% auto", animation:"shimmer 5s linear infinite" }} aria-hidden />

            {/* Card */}
            <div className="reg-card" style={{
                width: "100%",
                maxWidth: "min(480px, 96vw)",
                position: "relative",
                zIndex: 1,
            }}>
                {/* Gradient border */}
                <div style={{
                    borderRadius: "22px",
                    padding: "1px",
                    background: "linear-gradient(135deg, rgba(244,63,94,0.5), rgba(139,92,246,0.4), rgba(59,130,246,0.3))",
                    boxShadow: "0 0 60px rgba(244,63,94,0.1), 0 0 120px rgba(139,92,246,0.07)",
                }}>
                    <div style={{
                        borderRadius: "21px",
                        background: "rgba(8,5,18,0.97)",
                        backdropFilter: "blur(24px)",
                        padding: "clamp(24px, 5vw, 40px)",
                        position: "relative",
                        overflow: "hidden",
                    }}>
                        {/* Inner glow */}
                        <div style={{ position:"absolute", top:"-60px", right:"-60px", width:"200px", height:"200px",
                            borderRadius:"50%", background:"radial-gradient(circle, rgba(244,63,94,0.08), transparent)",
                            filter:"blur(40px)", pointerEvents:"none" }} aria-hidden />

                        {/* Header */}
                        <div style={{ textAlign:"center", marginBottom:"clamp(24px, 4vw, 32px)" }}>
                            <div style={{ display:"inline-flex", alignItems:"center", gap:"6px",
                                padding:"5px 14px", borderRadius:"999px",
                                background:"rgba(244,63,94,0.08)", border:"1px solid rgba(244,63,94,0.2)",
                                marginBottom:"16px" }}>
                                <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:"#f43f5e",
                                    boxShadow:"0 0 8px rgba(244,63,94,0.9)" }} />
                                <span style={{ fontSize:"11px", fontWeight:"700", color:"rgba(244,63,94,0.85)",
                                    letterSpacing:"1.5px", textTransform:"uppercase" }}>CodeCrew</span>
                            </div>

                            <h1 style={{ fontFamily:"'Syne', sans-serif", fontSize:"clamp(26px, 5vw, 34px)",
                                fontWeight:"800", color:"white", letterSpacing:"-1px", lineHeight:"1.1",
                                marginBottom:"8px" }}>
                                Join the Crew
                            </h1>
                            <p style={{ fontSize:"14px", color:"rgba(255,255,255,0.35)", lineHeight:"1.5" }}>
                                Already in?{" "}
                                <Link to="/login" style={{ color:"rgba(244,63,94,0.85)", fontWeight:"600",
                                    textDecoration:"none", borderBottom:"1px solid rgba(244,63,94,0.3)" }}>
                                    Sign in →
                                </Link>
                            </p>
                        </div>

                        {/* Error */}
                        {error && (
                            <div style={{ display:"flex", alignItems:"center", gap:"10px",
                                padding:"12px 14px", borderRadius:"10px", marginBottom:"20px",
                                background:"rgba(239,68,68,0.08)", border:"1px solid rgba(239,68,68,0.25)" }}>
                                <span style={{ fontSize:"16px" }}>❌</span>
                                <span style={{ fontSize:"13px", color:"rgba(239,68,68,0.9)", fontWeight:"500" }}>{error}</span>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handle} style={{ display:"flex", flexDirection:"column", gap:"18px" }}>

                            {/* Username */}
                            <div>
                                <label style={labelStyle}>Username</label>
                                <div style={{ position:"relative" }}>
                                    <input type="text" placeholder="cooldev42" value={username}
                                        onChange={e => setUsername(e.target.value)}
                                        onFocus={() => setFocused("username")}
                                        onBlur={() => setFocused("")}
                                        disabled={loading} style={inp("username")} />
                                    <span style={{ position:"absolute", right:"14px", top:"50%",
                                        transform:"translateY(-50%)", fontSize:"16px", pointerEvents:"none" }}>👤</span>
                                </div>
                            </div>

                            {/* Email */}
                            <div>
                                <label style={labelStyle}>Email Address</label>
                                <div style={{ position:"relative" }}>
                                    <input type="email" placeholder="you@example.com" value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        onFocus={() => setFocused("email")}
                                        onBlur={() => setFocused("")}
                                        disabled={loading} style={inp("email")} />
                                    <span style={{ position:"absolute", right:"14px", top:"50%",
                                        transform:"translateY(-50%)", fontSize:"16px", pointerEvents:"none" }}>✉️</span>
                                </div>
                            </div>

                            {/* Password */}
                            <div>
                                <label style={labelStyle}>Password</label>
                                <div style={{ position:"relative" }}>
                                    <input type={showPassword ? "text" : "password"}
                                        placeholder="min 6 characters" value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        onFocus={() => setFocused("password")}
                                        onBlur={() => setFocused("")}
                                        disabled={loading}
                                        style={{ ...inp("password"), paddingRight:"48px" }} />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                                        style={{ position:"absolute", right:"14px", top:"50%",
                                            transform:"translateY(-50%)", background:"none", border:"none",
                                            cursor:"pointer", fontSize:"16px !important", padding:"0",
                                            color:"rgba(255,255,255,0.4)", transition:"color 0.15s" }}>
                                        {showPassword ? "🙈" : "👁️"}
                                    </button>
                                </div>
                            </div>

                            {/* Skills */}
                            <div>
                                <label style={labelStyle}>Skills <span style={{ color:"rgba(255,255,255,0.25)", fontWeight:"400", textTransform:"none", letterSpacing:"0", fontSize:"11px" }}>optional · press Enter to add</span></label>
                                <div style={{
                                    minHeight: "48px",
                                    padding: "8px 12px",
                                    background: focused === "skills" ? "rgba(244,63,94,0.04)" : "rgba(255,255,255,0.04)",
                                    border: `1px solid ${focused === "skills" ? "rgba(244,63,94,0.7)" : "rgba(255,255,255,0.1)"}`,
                                    borderRadius: "12px",
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "6px",
                                    alignItems: "center",
                                    transition: "all 0.2s",
                                    boxShadow: focused === "skills" ? "0 0 20px rgba(244,63,94,0.15)" : "none",
                                    cursor: "text",
                                }}>
                                    {skills.map(s => (
                                        <span key={s} className="skill-tag">
                                            {s}
                                            <button type="button" onClick={() => removeSkill(s)}>✕</button>
                                        </span>
                                    ))}
                                    <input type="text" value={skillInput}
                                        onChange={e => setSkillInput(e.target.value)}
                                        onKeyDown={handleSkillKey}
                                        onFocus={() => setFocused("skills")}
                                        onBlur={() => setFocused("")}
                                        placeholder={skills.length === 0 ? "React, Node.js, Python..." : ""}
                                        disabled={loading}
                                        style={{ flex:"1", minWidth:"120px", background:"transparent",
                                            border:"none", outline:"none", color:"white",
                                            fontSize:"15px", fontFamily:"inherit", padding:"2px 4px" }} />
                                </div>
                            </div>

                            {/* Location */}
                            <div>
                                <label style={labelStyle}>Location <span style={{ color:"rgba(255,255,255,0.25)", fontWeight:"400", textTransform:"none", letterSpacing:"0", fontSize:"11px" }}>optional</span></label>
                                <div style={{ position:"relative" }}>
                                    <input type="text" placeholder="Mumbai, India" value={location}
                                        onChange={e => setLocation(e.target.value)}
                                        onFocus={() => setFocused("location")}
                                        onBlur={() => setFocused("")}
                                        disabled={loading} style={inp("location")} />
                                    <span style={{ position:"absolute", right:"14px", top:"50%",
                                        transform:"translateY(-50%)", fontSize:"16px", pointerEvents:"none" }}>📍</span>
                                </div>
                            </div>

                            {/* Submit */}
                            <button type="submit" disabled={loading} className="submit-btn" style={{ marginTop:"6px" }}>
                                {loading ? (
                                    <>
                                        <div style={{ width:"16px", height:"16px", border:"2px solid rgba(255,255,255,0.3)",
                                            borderTopColor:"white", borderRadius:"50%",
                                            animation:"spin 0.7s linear infinite" }} />
                                        Creating account...
                                    </>
                                ) : (
                                    <> Create Account &nbsp;🚀 </>
                                )}
                            </button>
                        </form>

                        {/* Footer */}
                        <p style={{ textAlign:"center", fontSize:"12px", color:"rgba(255,255,255,0.2)",
                            marginTop:"20px", lineHeight:"1.6" }}>
                            🔒 Your data is encrypted and never sold
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
        
