import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";


export default function User() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
   

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await api.get("/user/me");
                console.log("API response:", res.data.user);
                setUser(res.data.user);
                console.log("Fetched user:", res.data.user);
            } catch (err) {
                console.error("Error fetching user:", err);
                setError("Failed to load profile");
            } finally {
                setLoading(false);
            }
        };
        getUser();
    }, []);

    const initials = user?.username
        ? user.username.slice(0, 2).toUpperCase()
        : "??";

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

                @keyframes float-a { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-22px)} }
                @keyframes float-b { 0%,100%{transform:translateY(0)} 50%{transform:translateY(18px)} }
                @keyframes shimmer { 0%{background-position:-300% center} 100%{background-position:300% center} }
                @keyframes fadeUp  { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
                @keyframes spin    { to{transform:rotate(360deg)} }
                @keyframes pulse-ring {
                    0%  { box-shadow: 0 0 0 0 rgba(244,63,94,0.4); }
                    70% { box-shadow: 0 0 0 14px rgba(244,63,94,0); }
                    100%{ box-shadow: 0 0 0 0 rgba(244,63,94,0); }
                }

                .profile-card { animation: fadeUp 0.55s ease-out both; }

                .skill-pill {
                    display: inline-flex;
                    align-items: center;
                    padding: 5px 12px;
                    background: rgba(244,63,94,0.1);
                    border: 1px solid rgba(244,63,94,0.25);
                    border-radius: 999px;
                    color: rgba(244,63,94,0.85);
                    font-size: 12px;
                    font-weight: 600;
                    letter-spacing: 0.3px;
                    transition: all 0.2s;
                }
                .skill-pill:hover {
                    background: rgba(244,63,94,0.18);
                    border-color: rgba(244,63,94,0.45);
                    transform: translateY(-1px);
                }

                .stat-box {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 4px;
                    padding: 14px 8px;
                    background: rgba(255,255,255,0.03);
                    border: 1px solid rgba(255,255,255,0.07);
                    border-radius: 14px;
                    transition: all 0.2s;
                }
                .stat-box:hover {
                    background: rgba(244,63,94,0.06);
                    border-color: rgba(244,63,94,0.2);
                }

                .action-btn {
                    flex: 1;
                    padding: 12px 16px;
                    border-radius: 11px;
                    font-size: 13px;
                    font-weight: 600;
                    cursor: pointer;
                    font-family: inherit;
                    transition: all 0.2s;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 6px;
                    border: none;
                }
                .btn-rose {
                    background: linear-gradient(135deg, #f43f5e, #e11d48);
                    color: white;
                    box-shadow: 0 0 24px rgba(244,63,94,0.25);
                }
                .btn-rose:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 0 40px rgba(244,63,94,0.4);
                }
                .btn-ghost {
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1) !important;
                    color: rgba(255,255,255,0.6);
                }
                .btn-ghost:hover {
                    background: rgba(255,255,255,0.09);
                    color: white;
                    transform: translateY(-1px);
                }
                .btn-ghost:active, .btn-rose:active { transform: scale(0.97); }

                :focus-visible { outline: 2px solid rgba(244,63,94,0.6); outline-offset: 3px; border-radius: 8px; }
            `}</style>

            {/* Orbs */}
            <div style={{
                position: "fixed", top: "-160px", left: "-120px", width: "400px", height: "400px",
                borderRadius: "50%", background: "radial-gradient(circle, rgba(244,63,94,0.12) 0%, transparent 70%)",
                filter: "blur(70px)", pointerEvents: "none", zIndex: 0,
                animation: "float-a 10s ease-in-out infinite"
            }} aria-hidden />
            <div style={{
                position: "fixed", bottom: "-140px", right: "-100px", width: "360px", height: "360px",
                borderRadius: "50%", background: "radial-gradient(circle, rgba(139,92,246,0.11) 0%, transparent 70%)",
                filter: "blur(60px)", pointerEvents: "none", zIndex: 0,
                animation: "float-b 13s ease-in-out infinite"
            }} aria-hidden />

            {/* Grid */}
            <div style={{
                position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
                backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
                backgroundSize: "28px 28px"
            }} aria-hidden />

            {/* Top shimmer */}
            <div style={{
                position: "fixed", top: 0, left: 0, right: 0, height: "1px", zIndex: 50, pointerEvents: "none",
                background: "linear-gradient(90deg, transparent, rgba(244,63,94,0.8) 30%, rgba(139,92,246,0.7) 70%, transparent)",
                backgroundSize: "300% auto", animation: "shimmer 5s linear infinite"
            }} aria-hidden />

            {/* ── Card ── */}
            <div className="profile-card" style={{ width: "100%", maxWidth: "min(440px, 96vw)", zIndex: 1, position: "relative" }}>
                <div style={{
                    borderRadius: "22px", padding: "1px",
                    background: "linear-gradient(135deg, rgba(244,63,94,0.45), rgba(139,92,246,0.35), rgba(59,130,246,0.25))",
                    boxShadow: "0 0 60px rgba(244,63,94,0.1), 0 0 100px rgba(139,92,246,0.07)",
                }}>
                    <div style={{
                        borderRadius: "21px",
                        background: "rgba(8,5,18,0.97)",
                        backdropFilter: "blur(24px)",
                        overflow: "hidden",
                        position: "relative",
                    }}>
                        {/* Top accent bar */}
                        <div style={{ height: "3px", background: "linear-gradient(90deg, #f43f5e, #8b5cf6, #3b82f6)" }} />

                        <div style={{ padding: "clamp(24px, 5vw, 36px)" }}>

                            {/* ── Loading ── */}
                            {loading && (
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "32px 0" }}>
                                    <div style={{
                                        width: "36px", height: "36px", border: "2px solid rgba(255,255,255,0.1)",
                                        borderTopColor: "rgba(244,63,94,0.8)", borderRadius: "50%",
                                        animation: "spin 0.8s linear infinite"
                                    }} />
                                    <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.35)" }}>Loading profile...</p>
                                </div>
                            )}

                            {/* ── Error ── */}
                            {error && !loading && (
                                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px", padding: "32px 0", textAlign: "center" }}>
                                    <span style={{ fontSize: "40px" }}>😵</span>
                                    <p style={{ fontSize: "14px", color: "rgba(239,68,68,0.8)" }}>{error}</p>
                                    <button onClick={() => window.location.reload()} className="action-btn btn-rose"
                                        style={{ width: "auto", padding: "10px 24px" }}>
                                        Try again
                                    </button>
                                </div>
                            )}

                            {/* ── Profile ── */}
                            {user && !loading && (
                                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>

                                    {/* Avatar + name */}
                                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "14px" }}>
                                        {/* Avatar */}
                                        <div style={{ position: "relative" }}>
                                            <div style={{
                                                width: "80px", height: "80px", borderRadius: "50%",
                                                background: "linear-gradient(135deg, #f43f5e, #8b5cf6)",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                fontSize: "28px", fontWeight: "800", color: "white",
                                                fontFamily: "'Syne', sans-serif",
                                                boxShadow: "0 0 30px rgba(244,63,94,0.3)",
                                                animation: "pulse-ring 3s ease-in-out infinite",
                                            }}>
                                                {initials}
                                            </div>
                                            {/* Online dot */}
                                            <div style={{
                                                position: "absolute", bottom: "2px", right: "2px",
                                                width: "14px", height: "14px", borderRadius: "50%",
                                                background: "#22c55e", border: "2px solid rgba(8,5,18,1)",
                                                boxShadow: "0 0 8px rgba(34,197,94,0.8)"
                                            }} />
                                        </div>

                                        {/* Name + badge */}
                                        <div style={{ textAlign: "center" }}>
                                            <h1 style={{
                                                fontFamily: "'Syne', sans-serif", fontSize: "clamp(22px, 4vw, 28px)",
                                                fontWeight: "800", color: "white", letterSpacing: "-0.5px",
                                                marginBottom: "6px"
                                            }}>
                                                {user.username}
                                            </h1>
                                            <div style={{
                                                display: "inline-flex", alignItems: "center", gap: "6px",
                                                padding: "4px 12px", borderRadius: "999px",
                                                background: "rgba(244,63,94,0.08)", border: "1px solid rgba(244,63,94,0.2)"
                                            }}>
                                                <div style={{
                                                    width: "5px", height: "5px", borderRadius: "50%",
                                                    background: "#f43f5e", boxShadow: "0 0 6px rgba(244,63,94,0.9)"
                                                }} />
                                                <span style={{
                                                    fontSize: "11px", fontWeight: "700",
                                                    color: "rgba(244,63,94,0.8)", letterSpacing: "1px", textTransform: "uppercase"
                                                }}>
                                                    CodeCrew Member
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)" }} />

                                    {/* Info rows */}
                                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                                        {[
                                            { icon: "✉️", label: "Email", value: user.email },
                                            {
                                                icon: "📍", label: "Location", value:
                                                    typeof user.location === "object"
                                                        ? user.location?.city || "Not set"
                                                        : user.location || "Not set"
                                            },
                                        ].map(({ icon, label, value }) => (
                                            <div key={label} style={{
                                                display: "flex", alignItems: "center", gap: "12px",
                                                padding: "12px 14px", borderRadius: "12px",
                                                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)"
                                            }}>
                                                <span style={{ fontSize: "18px", flexShrink: 0 }}>{icon}</span>
                                                <div style={{ minWidth: 0 }}>
                                                    <p style={{
                                                        fontSize: "10px", fontWeight: "700", letterSpacing: "1px",
                                                        textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "2px"
                                                    }}>
                                                        {label}
                                                    </p>
                                                    <p style={{
                                                        fontSize: "14px", color: "rgba(255,255,255,0.75)",
                                                        fontWeight: "500", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
                                                    }}>
                                                        {value}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Stats */}
                                    <div style={{ display: "flex", gap: "10px" }}>
                                        <div className="stat-box">
                                            <span style={{
                                                fontFamily: "'Syne', sans-serif", fontSize: "22px",
                                                fontWeight: "800", color: "white"
                                            }}>
                                                {user.skills?.length || 0}
                                            </span>
                                            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", fontWeight: "500" }}>Skills</span>
                                        </div>
                                        <div className="stat-box">
                                            <span style={{
                                                fontFamily: "'Syne', sans-serif", fontSize: "22px",
                                                fontWeight: "800", color: "white"
                                            }}>
                                                {user.projects?.length || 0}
                                            </span>
                                            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", fontWeight: "500" }}>Projects</span>
                                        </div>
                                        <div className="stat-box">
                                            <span style={{
                                                fontFamily: "'Syne', sans-serif", fontSize: "22px",
                                                fontWeight: "800", color: "white"
                                            }}>
                                                {user.members?.length || 0}
                                            </span>
                                            <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)", fontWeight: "500" }}>Joined</span>
                                        </div>
                                    </div>

                                    {/* Skills */}
                                    {user.skills?.length > 0 && (
                                        <div>
                                            <p style={{
                                                fontSize: "10px", fontWeight: "700", letterSpacing: "1.5px",
                                                textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: "10px"
                                            }}>
                                                💡 Skills
                                            </p>
                                            <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                                                {user.skills.map(skill => (
                                                    <span key={skill} className="skill-pill">{skill}</span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div style={{ display: "flex", gap: "10px", marginTop: "4px" }}>
                                        <button className="action-btn btn-rose"
                                            onClick={() => navigate("/feed")}>
                                            🚀 Browse Projects
                                        </button>
                                        <button className="action-btn btn-ghost"
                                            onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}>
                                            🚪 Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}