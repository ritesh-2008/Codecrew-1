import { useMemo, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function CreateProject() {
    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    const [skills, setskills] = useState("");
    const [location, setlocation] = useState("");
    const [loading, setloading] = useState(false);
    const [error, seterror] = useState("");
    const [success, setsuccess] = useState("");
    const [focused, setFocused] = useState("");
    const navigate = useNavigate();

    const skillList = useMemo(() => (
        skills
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean)
            .slice(0, 8)
    ), [skills]);

    const progress = Math.min(100, Math.round((description.length / 500) * 100));

    const handlecreate = async (e) => {
        e.preventDefault();

        if (!title.trim()) {
            seterror("Project title is required");
            return;
        }
        if (!description.trim()) {
            seterror("Project description is required");
            return;
        }
        if (description.length < 20) {
            seterror("Description must be at least 20 characters");
            return;
        }

        setloading(true);
        seterror("");
        setsuccess("");

        try {
            const skillsArray = skills.split(",").map(s => s.trim()).filter(s => s);
            const res = await api.post("/createprojects", {
                title,
                description,
                skills: skillsArray,
                location
            });

            if (res.data.success) {
                setsuccess("Project created successfully. Redirecting to feed...");
                setTimeout(() => {
                    navigate("/feed");
                }, 1500);
            }
        } catch (err) {
            seterror(err.response?.data?.message || "Failed to create project");
        } finally {
            setloading(false);
        }
    };

    const inputBase = {
        width: "100%",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "13px",
        background: "rgba(8,5,18,0.72)",
        color: "white",
        font: "inherit",
        fontSize: "16px",
        outline: "none",
        transition: "border-color 0.18s, background 0.18s, box-shadow 0.18s",
    };

    const fieldStyle = (field) => ({
        ...inputBase,
        borderColor: focused === field ? "rgba(244,63,94,0.68)" : "rgba(255,255,255,0.1)",
        background: focused === field ? "rgba(244,63,94,0.05)" : "rgba(8,5,18,0.72)",
        boxShadow: focused === field ? "0 0 0 4px rgba(244,63,94,0.08), 0 0 28px rgba(244,63,94,0.12)" : "none",
    });

    const labelStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "12px",
        marginBottom: "8px",
        color: "rgba(244,63,94,0.84)",
        fontSize: "11px",
        fontWeight: "800",
        letterSpacing: "1.4px",
        textTransform: "uppercase",
    };

    return (
        <main style={{
            minHeight: "100vh",
            background: "#080510",
            color: "white",
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
            padding: "clamp(22px, 4vw, 42px)",
            position: "relative",
            overflow: "hidden",
        }}>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap');

                * { box-sizing: border-box; }
                body { overflow-x: hidden; }

                @keyframes createFloatA { 0%,100%{transform:translate3d(0,0,0)} 50%{transform:translate3d(0,-24px,0)} }
                @keyframes createFloatB { 0%,100%{transform:translate3d(0,0,0)} 50%{transform:translate3d(0,20px,0)} }
                @keyframes createFadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
                @keyframes createShimmer { 0%{background-position:-300% center} 100%{background-position:300% center} }
                @keyframes createSpin { to{transform:rotate(360deg)} }

                .create-shell {
                    width: min(1100px, 100%);
                    margin: 0 auto;
                    position: relative;
                    z-index: 1;
                    animation: createFadeUp 0.55s ease-out both;
                }
                .create-nav {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    gap: 14px;
                    margin-bottom: clamp(28px, 5vw, 44px);
                }
                .brand-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 9px;
                    padding: 7px 14px;
                    border-radius: 999px;
                    background: rgba(244,63,94,0.09);
                    border: 1px solid rgba(244,63,94,0.22);
                    color: rgba(244,63,94,0.9);
                    font-size: 12px;
                    font-weight: 800;
                    letter-spacing: 1.3px;
                    text-transform: uppercase;
                }
                .ghost-btn {
                    border: 1px solid rgba(255,255,255,0.11);
                    border-radius: 13px;
                    padding: 12px 16px;
                    background: rgba(255,255,255,0.045);
                    color: rgba(255,255,255,0.74);
                    font: inherit;
                    font-weight: 800;
                    cursor: pointer;
                    transition: transform 0.18s, background 0.18s, border-color 0.18s;
                }
                .ghost-btn:hover {
                    transform: translateY(-1px);
                    background: rgba(255,255,255,0.075);
                    border-color: rgba(255,255,255,0.2);
                }
                .create-grid {
                    display: grid;
                    grid-template-columns: minmax(0, 0.9fr) minmax(430px, 1.1fr);
                    gap: 20px;
                    align-items: start;
                }
                .create-panel,
                .create-card,
                .preview-card {
                    background: rgba(255,255,255,0.045);
                    border: 1px solid rgba(255,255,255,0.09);
                    backdrop-filter: blur(22px);
                    box-shadow: 0 24px 70px rgba(0,0,0,0.26);
                }
                .create-panel {
                    border-radius: 22px;
                    padding: clamp(26px, 4vw, 42px);
                    min-height: 560px;
                    position: sticky;
                    top: 28px;
                    overflow: hidden;
                }
                .create-panel::before {
                    content: "";
                    position: absolute;
                    inset: 0;
                    background:
                        radial-gradient(circle at 22% 16%, rgba(244,63,94,0.18), transparent 34%),
                        radial-gradient(circle at 84% 78%, rgba(139,92,246,0.14), transparent 32%);
                    pointer-events: none;
                }
                .create-title {
                    position: relative;
                    font-family: 'Syne', sans-serif;
                    font-size: clamp(44px, 7vw, 76px);
                    font-weight: 800;
                    line-height: 0.95;
                    letter-spacing: -2px;
                    margin: 0;
                }
                .create-title span {
                    background: linear-gradient(135deg, #fff, rgba(255,255,255,0.72), rgba(244,63,94,0.92));
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }
                .metric-grid {
                    display: grid;
                    grid-template-columns: repeat(2, minmax(0, 1fr));
                    gap: 10px;
                    margin-top: auto;
                    position: relative;
                }
                .metric-card {
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 15px;
                    background: rgba(8,5,18,0.54);
                    padding: 16px;
                }
                .create-card {
                    border-radius: 22px;
                    padding: 1px;
                    background: linear-gradient(135deg, rgba(244,63,94,0.5), rgba(139,92,246,0.36), rgba(255,255,255,0.08));
                    overflow: hidden;
                }
                .form-inner {
                    border-radius: 21px;
                    background: rgba(8,5,18,0.94);
                    padding: clamp(22px, 4vw, 34px);
                    position: relative;
                    overflow: hidden;
                }
                .form-inner::before {
                    content: "";
                    position: absolute;
                    top: -80px;
                    right: -70px;
                    width: 220px;
                    height: 220px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(244,63,94,0.1), transparent 68%);
                    filter: blur(36px);
                    pointer-events: none;
                }
                .form-stack {
                    display: flex;
                    flex-direction: column;
                    gap: 18px;
                    position: relative;
                }
                .helper-text {
                    color: rgba(255,255,255,0.3);
                    font-size: 12px;
                    font-weight: 700;
                    letter-spacing: 0;
                    text-transform: none;
                }
                .create-submit {
                    width: 100%;
                    min-height: 52px;
                    margin-top: 6px;
                    border: 0;
                    border-radius: 13px;
                    background: linear-gradient(135deg, #f43f5e, #e11d48);
                    color: white;
                    font: inherit;
                    font-size: 16px;
                    font-weight: 800;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 9px;
                    box-shadow: 0 0 34px rgba(244,63,94,0.27);
                    transition: transform 0.18s, box-shadow 0.18s, background 0.18s;
                }
                .create-submit:hover:not(:disabled) {
                    transform: translateY(-1px);
                    box-shadow: 0 0 54px rgba(244,63,94,0.4);
                }
                .create-submit:disabled {
                    background: rgba(255,255,255,0.1);
                    color: rgba(255,255,255,0.38);
                    cursor: not-allowed;
                    box-shadow: none;
                }
                .message {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 12px 14px;
                    border-radius: 12px;
                    font-size: 13px;
                    font-weight: 700;
                    line-height: 1.5;
                }
                .message.error {
                    color: rgba(254,202,202,0.96);
                    background: rgba(239,68,68,0.09);
                    border: 1px solid rgba(239,68,68,0.24);
                }
                .message.success {
                    color: rgba(187,247,208,0.96);
                    background: rgba(34,197,94,0.09);
                    border: 1px solid rgba(34,197,94,0.24);
                }
                .skill-preview {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 7px;
                    margin-top: 10px;
                }
                .skill-chip {
                    border: 1px solid rgba(244,63,94,0.24);
                    border-radius: 999px;
                    background: rgba(244,63,94,0.1);
                    color: rgba(255,205,214,0.95);
                    padding: 6px 10px;
                    font-size: 12px;
                    font-weight: 800;
                }
                .preview-card {
                    border-radius: 18px;
                    padding: 18px;
                    margin-top: 18px;
                    position: relative;
                }
                input::placeholder,
                textarea::placeholder { color: rgba(255,255,255,0.25); }
                input:-webkit-autofill,
                textarea:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0 1000px #0d0818 inset !important;
                    -webkit-text-fill-color: white !important;
                }
                :focus-visible {
                    outline: 2px solid rgba(244,63,94,0.65);
                    outline-offset: 3px;
                    border-radius: 8px;
                }

                @media (max-width: 940px) {
                    .create-grid { grid-template-columns: 1fr; }
                    .create-panel { position: relative; top: auto; min-height: auto; }
                }

                @media (max-width: 640px) {
                    .create-nav { align-items: stretch; flex-direction: column; }
                    .ghost-btn { width: 100%; }
                    .metric-grid { grid-template-columns: 1fr 1fr; }
                    .create-title { letter-spacing: -1px; }
                }
            `}</style>

            <div style={{ position:"fixed", top:"-180px", left:"-130px", width:"460px", height:"460px",
                borderRadius:"50%", background:"radial-gradient(circle, rgba(244,63,94,0.15) 0%, transparent 70%)",
                filter:"blur(78px)", pointerEvents:"none", animation:"createFloatA 11s ease-in-out infinite" }} aria-hidden />
            <div style={{ position:"fixed", bottom:"-170px", right:"-120px", width:"420px", height:"420px",
                borderRadius:"50%", background:"radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)",
                filter:"blur(70px)", pointerEvents:"none", animation:"createFloatB 13s ease-in-out infinite" }} aria-hidden />
            <div style={{ position:"fixed", inset:0, pointerEvents:"none",
                backgroundImage:"linear-gradient(rgba(255,255,255,0.024) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.024) 1px, transparent 1px)",
                backgroundSize:"30px 30px" }} aria-hidden />
            <div style={{ position:"fixed", top:0, left:0, right:0, height:"1px", zIndex:2, pointerEvents:"none",
                background:"linear-gradient(90deg, transparent, rgba(244,63,94,0.85) 30%, rgba(139,92,246,0.7) 68%, transparent)",
                backgroundSize:"300% auto", animation:"createShimmer 5s linear infinite" }} aria-hidden />

            <div className="create-shell">
                <nav className="create-nav">
                    <div className="brand-pill">
                        <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#f43f5e",
                            boxShadow:"0 0 10px rgba(244,63,94,0.95)" }} />
                        CodeCrew Builder
                    </div>
                    <button type="button" className="ghost-btn" onClick={() => navigate("/feed")}>
                        Back to feed
                    </button>
                </nav>

                <section className="create-grid">
                    <aside className="create-panel">
                        <div style={{ position:"relative" }}>
                            <h1 className="create-title">
                                Launch a project people want to <span>join.</span>
                            </h1>
                            <p style={{ margin:"22px 0 34px", maxWidth:"430px", color:"rgba(255,255,255,0.52)",
                                fontSize:"16px", lineHeight:"1.7" }}>
                                Give collaborators the context they need: what you are building, which stack matters, and where the work happens.
                            </p>
                        </div>

                        <div className="preview-card">
                            <span style={{ color:"rgba(244,63,94,0.9)", fontSize:"12px", fontWeight:"800",
                                letterSpacing:"1.2px", textTransform:"uppercase" }}>
                                Live preview
                            </span>
                            <h2 style={{ margin:"12px 0 8px", fontSize:"22px", lineHeight:"1.2", letterSpacing:"-0.3px" }}>
                                {title.trim() || "Your project title"}
                            </h2>
                            <p style={{ margin:0, color:"rgba(255,255,255,0.46)", fontSize:"14px", lineHeight:"1.6" }}>
                                {description.trim() || "A sharp project description will show up here as you write."}
                            </p>
                            <div className="skill-preview">
                                {skillList.length > 0 ? (
                                    skillList.slice(0, 4).map((skill) => (
                                        <span key={skill} className="skill-chip">{skill}</span>
                                    ))
                                ) : (
                                    <span className="skill-chip">Stack tags</span>
                                )}
                            </div>
                        </div>

                        <div className="metric-grid">
                            <div className="metric-card">
                                <strong style={{ display:"block", fontSize:"28px", lineHeight:"1" }}>
                                    {title.trim() ? "1" : "0"}
                                </strong>
                                <span style={{ display:"block", marginTop:"8px", color:"rgba(255,255,255,0.42)",
                                    fontSize:"12px", fontWeight:"700", textTransform:"uppercase", letterSpacing:"1px" }}>
                                    title
                                </span>
                            </div>
                            <div className="metric-card">
                                <strong style={{ display:"block", fontSize:"28px", lineHeight:"1" }}>
                                    {skillList.length}
                                </strong>
                                <span style={{ display:"block", marginTop:"8px", color:"rgba(255,255,255,0.42)",
                                    fontSize:"12px", fontWeight:"700", textTransform:"uppercase", letterSpacing:"1px" }}>
                                    skills
                                </span>
                            </div>
                        </div>
                    </aside>

                    <div className="create-card">
                        <div className="form-inner">
                            <div style={{ position:"relative", marginBottom:"24px" }}>
                                <h2 style={{ fontFamily:"'Syne', sans-serif", margin:"0 0 8px", color:"white",
                                    fontSize:"clamp(28px, 5vw, 36px)", lineHeight:"1.05", letterSpacing:"-1px" }}>
                                    Project details
                                </h2>
                                <p style={{ margin:0, color:"rgba(255,255,255,0.42)", fontSize:"14px", lineHeight:"1.6" }}>
                                    Keep it specific. Strong projects get joined faster.
                                </p>
                            </div>

                            {(success || error) && (
                                <div style={{ marginBottom:"18px", position:"relative" }}>
                                    {success && (
                                        <div className="message success">
                                            <span style={{ width:"8px", height:"8px", borderRadius:"50%", background:"#22c55e",
                                                boxShadow:"0 0 12px rgba(34,197,94,0.7)", flex:"0 0 auto" }} />
                                            {success}
                                        </div>
                                    )}
                                    {error && (
                                        <div className="message error">
                                            <span style={{ width:"8px", height:"8px", borderRadius:"50%", background:"#ef4444",
                                                boxShadow:"0 0 12px rgba(239,68,68,0.7)", flex:"0 0 auto" }} />
                                            {error}
                                        </div>
                                    )}
                                </div>
                            )}

                            <form className="form-stack" onSubmit={handlecreate}>
                                <div>
                                    <label style={labelStyle}>
                                        Project Title
                                        <span className="helper-text">{title.length}/100</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => settitle(e.target.value)}
                                        onFocus={() => setFocused("title")}
                                        onBlur={() => setFocused("")}
                                        placeholder="AI code review dashboard"
                                        maxLength="100"
                                        disabled={loading}
                                        required
                                        style={{ ...fieldStyle("title"), height:"52px", padding:"0 16px" }}
                                    />
                                </div>

                                <div>
                                    <label style={labelStyle}>
                                        Description
                                        <span className="helper-text">{description.length}/500</span>
                                    </label>
                                    <textarea
                                        value={description}
                                        onChange={(e) => setdescription(e.target.value)}
                                        onFocus={() => setFocused("description")}
                                        onBlur={() => setFocused("")}
                                        placeholder="Describe the problem, the product, and the kind of collaborators you need."
                                        maxLength="500"
                                        rows="6"
                                        disabled={loading}
                                        required
                                        style={{ ...fieldStyle("description"), minHeight:"150px", padding:"15px 16px", resize:"vertical", lineHeight:"1.6" }}
                                    />
                                    <div style={{ height:"6px", borderRadius:"999px", background:"rgba(255,255,255,0.08)",
                                        overflow:"hidden", marginTop:"10px" }}>
                                        <div style={{ width:`${progress}%`, height:"100%", borderRadius:"999px",
                                            background:"linear-gradient(90deg, #f43f5e, #8b5cf6)", transition:"width 0.18s" }} />
                                    </div>
                                </div>

                                <div>
                                    <label style={labelStyle}>
                                        Required Skills
                                        <span className="helper-text">comma separated</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={skills}
                                        onChange={(e) => setskills(e.target.value)}
                                        onFocus={() => setFocused("skills")}
                                        onBlur={() => setFocused("")}
                                        placeholder="React, Node.js, Python"
                                        disabled={loading}
                                        style={{ ...fieldStyle("skills"), height:"52px", padding:"0 16px" }}
                                    />
                                    {skillList.length > 0 && (
                                        <div className="skill-preview">
                                            {skillList.map((skill) => (
                                                <span key={skill} className="skill-chip">{skill}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <label style={labelStyle}>
                                        Location
                                        <span className="helper-text">optional</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={location}
                                        onChange={(e) => setlocation(e.target.value)}
                                        onFocus={() => setFocused("location")}
                                        onBlur={() => setFocused("")}
                                        placeholder="Remote, Mumbai, New York"
                                        disabled={loading}
                                        style={{ ...fieldStyle("location"), height:"52px", padding:"0 16px" }}
                                    />
                                </div>

                                <button type="submit" disabled={loading} className="create-submit">
                                    {loading ? (
                                        <>
                                            <span style={{ width:"16px", height:"16px", border:"2px solid rgba(255,255,255,0.32)",
                                                borderTopColor:"white", borderRadius:"50%", animation:"createSpin 0.7s linear infinite" }} />
                                            Creating project...
                                        </>
                                    ) : (
                                        <>Create Project <span aria-hidden>&rarr;</span></>
                                    )}
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}
