import { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";

export default function User() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const profile = useMemo(() => {
    const storedUser = localStorage.getItem("user");
    const fallback = storedUser ? safeParseUser(storedUser) : {};
    return user || fallback;
  }, [user]);

  const displayName = profile?.name || profile?.user || profile?.username || "CodeCrew User";
  const email = profile?.email || "builder@codecrew.dev";
  const location = profile?.location || "Remote friendly";
  const skills =
    Array.isArray(profile?.skills) && profile.skills.length > 0
      ? profile.skills
      : ["React", "Node", "MongoDB", "Product"];
  const initials = displayName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const topSkills = skills.slice(0, 6);
  const signature = `${topSkills[0] || "Full-stack"} builder`;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <main className="user-page">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Syne:wght@700;800&display=swap');

        .user-page {
          min-height: 100vh;
          padding: clamp(18px, 4vw, 42px);
          background:
            linear-gradient(120deg, rgba(244,63,94,0.14), transparent 28%),
            linear-gradient(240deg, rgba(20,184,166,0.12), transparent 30%),
            linear-gradient(135deg, #090711 0%, #101422 48%, #070816 100%);
          color: white;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          overflow-x: hidden;
          position: relative;
        }

        .user-page::before {
          content: "";
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(255,255,255,0.026) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.026) 1px, transparent 1px);
          background-size: 34px 34px;
          mask-image: linear-gradient(140deg, rgba(0,0,0,0.92), rgba(0,0,0,0.14));
          pointer-events: none;
        }

        .user-page::after {
          content: "";
          position: fixed;
          inset: 0;
          background:
            linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent),
            linear-gradient(180deg, rgba(255,255,255,0.035), transparent 38%);
          opacity: 0.55;
          pointer-events: none;
        }

        .profile-shell {
          width: min(1180px, 100%);
          margin: 0 auto;
          position: relative;
          z-index: 1;
          animation: userFadeUp 0.5s ease-out both;
        }

        @keyframes userFadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .profile-nav,
        .nav-actions,
        .brand-pill,
        .button,
        .profile-kicker,
        .mini-row,
        .skill-cloud,
        .activity-item,
        .signal-row {
          display: flex;
          align-items: center;
        }

        .profile-nav {
          justify-content: space-between;
          gap: 16px;
          margin-bottom: clamp(26px, 5vw, 50px);
        }

        .brand-pill {
          gap: 10px;
          min-height: 34px;
          padding: 7px 14px;
          border-radius: 999px;
          border: 1px solid rgba(244,63,94,0.24);
          background: rgba(244,63,94,0.1);
          color: rgba(255,218,225,0.92);
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 1px;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .brand-dot,
        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #f43f5e;
          box-shadow: 0 0 14px rgba(244,63,94,0.95);
          flex: 0 0 auto;
        }

        .nav-actions {
          gap: 10px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }

        .button {
          justify-content: center;
          gap: 8px;
          min-height: 44px;
          border-radius: 14px;
          padding: 0 16px;
          border: 1px solid rgba(255,255,255,0.12);
          color: white;
          font: inherit;
          font-weight: 850;
          cursor: pointer;
          transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease, border-color 0.18s ease;
          white-space: nowrap;
        }

        .button:hover {
          transform: translateY(-1px);
        }

        .button:active {
          transform: scale(0.98);
        }

        .button-secondary {
          background: rgba(255,255,255,0.055);
          color: rgba(255,255,255,0.72);
        }

        .button-secondary:hover {
          color: white;
          border-color: rgba(255,255,255,0.22);
          background: rgba(255,255,255,0.085);
        }

        .button-primary {
          border: 0;
          background: linear-gradient(135deg, #f43f5e, #e11d48);
          box-shadow: 0 18px 46px rgba(244,63,94,0.3);
        }

        .button-primary:hover {
          box-shadow: 0 22px 58px rgba(244,63,94,0.42);
        }

        .profile-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(330px, 0.85fr);
          gap: 18px;
          align-items: stretch;
        }

        .profile-hero,
        .side-card,
        .metric-card,
        .activity-item,
        .signal-card {
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.052);
          backdrop-filter: blur(24px);
          box-shadow: 0 24px 72px rgba(0,0,0,0.28);
        }

        .profile-hero {
          min-height: 590px;
          border-radius: 28px;
          padding: clamp(22px, 4vw, 34px);
          position: relative;
          overflow: hidden;
          display: grid;
          grid-template-rows: auto 1fr auto;
          gap: 28px;
        }

        .profile-hero::before {
          content: "";
          position: absolute;
          inset: 1px;
          border-radius: 27px;
          background:
            linear-gradient(135deg, rgba(244,63,94,0.19), transparent 36%),
            linear-gradient(315deg, rgba(20,184,166,0.14), transparent 42%);
          pointer-events: none;
        }

        .profile-hero > * {
          position: relative;
          z-index: 1;
        }

        .hero-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 18px;
        }

        .profile-kicker {
          gap: 8px;
          color: rgba(255,255,255,0.56);
          font-size: 12px;
          font-weight: 900;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .status-dot {
          background: #22c55e;
          box-shadow: 0 0 14px rgba(34,197,94,0.95);
        }

        .availability {
          border: 1px solid rgba(34,197,94,0.22);
          border-radius: 999px;
          background: rgba(34,197,94,0.09);
          color: rgba(187,247,208,0.95);
          padding: 8px 12px;
          font-size: 12px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 1px;
          white-space: nowrap;
        }

        .hero-main {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(190px, 240px);
          gap: clamp(20px, 5vw, 42px);
          align-items: center;
        }

        .profile-title {
          margin: 0;
          font-family: 'Syne', sans-serif;
          font-size: clamp(48px, 8vw, 94px);
          line-height: 0.94;
          letter-spacing: 0;
          max-width: 720px;
        }

        .profile-title span {
          display: block;
          background: linear-gradient(135deg, #fff, rgba(255,255,255,0.7), rgba(20,184,166,0.96));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .profile-subtitle {
          max-width: 640px;
          margin: 20px 0 0;
          color: rgba(255,255,255,0.6);
          font-size: clamp(15px, 2vw, 18px);
          line-height: 1.72;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 26px;
        }

        .avatar-card {
          border-radius: 26px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(244,63,94,0.85), rgba(20,184,166,0.72), rgba(255,255,255,0.24));
          box-shadow: 0 34px 80px rgba(244,63,94,0.22);
        }

        .avatar-inner {
          min-height: 268px;
          border-radius: 25px;
          background:
            linear-gradient(180deg, rgba(255,255,255,0.12), transparent),
            rgba(8,5,18,0.94);
          display: grid;
          place-items: center;
          position: relative;
          overflow: hidden;
        }

        .avatar-inner::after {
          content: "";
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 18px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.42), transparent);
        }

        .avatar-initials {
          font-family: 'Syne', sans-serif;
          font-size: clamp(56px, 8vw, 88px);
          font-weight: 800;
          letter-spacing: 0;
        }

        .avatar-label {
          position: absolute;
          left: 18px;
          right: 18px;
          bottom: 28px;
          display: flex;
          justify-content: space-between;
          gap: 12px;
          color: rgba(255,255,255,0.48);
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .profile-meta {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
        }

        .meta-card {
          min-width: 0;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 18px;
          background: rgba(8,5,18,0.38);
          padding: 16px;
        }

        .meta-card span {
          display: block;
          margin-bottom: 8px;
          color: rgba(244,63,94,0.82);
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .meta-card strong {
          display: block;
          overflow: hidden;
          text-overflow: ellipsis;
          color: rgba(255,255,255,0.86);
          font-size: 14px;
          line-height: 1.35;
          white-space: nowrap;
        }

        .side-stack {
          display: grid;
          gap: 18px;
        }

        .side-card {
          border-radius: 24px;
          padding: 22px;
        }

        .section-title {
          margin: 0 0 16px;
          color: rgba(255,255,255,0.92);
          font-size: 13px;
          font-weight: 900;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .metric-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .metric-card {
          border-radius: 18px;
          padding: 18px;
        }

        .metric-card strong {
          display: block;
          font-family: 'Syne', sans-serif;
          font-size: 34px;
          line-height: 1;
        }

        .metric-card span {
          display: block;
          margin-top: 8px;
          color: rgba(255,255,255,0.45);
          font-size: 12px;
          font-weight: 850;
          letter-spacing: 0.8px;
          text-transform: uppercase;
        }

        .skill-cloud {
          flex-wrap: wrap;
          gap: 8px;
        }

        .skill-chip {
          border: 1px solid rgba(20,184,166,0.26);
          border-radius: 999px;
          background: rgba(20,184,166,0.1);
          color: rgba(204,251,241,0.95);
          padding: 8px 11px;
          font-size: 12px;
          font-weight: 900;
          max-width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .activity-list {
          display: grid;
          gap: 10px;
        }

        .activity-item {
          align-items: flex-start;
          gap: 12px;
          border-radius: 18px;
          padding: 15px;
        }

        .activity-mark {
          width: 10px;
          height: 10px;
          margin-top: 5px;
          border-radius: 50%;
          background: #f43f5e;
          box-shadow: 0 0 16px rgba(244,63,94,0.82);
          flex: 0 0 auto;
        }

        .activity-item strong {
          display: block;
          color: rgba(255,255,255,0.9);
          font-size: 14px;
          line-height: 1.35;
        }

        .activity-item span {
          display: block;
          margin-top: 5px;
          color: rgba(255,255,255,0.46);
          font-size: 13px;
          line-height: 1.45;
        }

        .signal-card {
          border-radius: 22px;
          padding: 20px;
          background:
            linear-gradient(135deg, rgba(244,63,94,0.14), rgba(20,184,166,0.1)),
            rgba(255,255,255,0.045);
        }

        .signal-row {
          justify-content: space-between;
          gap: 16px;
          margin-top: 12px;
        }

        .signal-bar {
          height: 9px;
          border-radius: 999px;
          background: rgba(255,255,255,0.08);
          overflow: hidden;
          flex: 1;
        }

        .signal-bar span {
          display: block;
          width: 82%;
          height: 100%;
          border-radius: inherit;
          background: linear-gradient(90deg, #f43f5e, #14b8a6);
        }

        .logout-button {
          width: 100%;
          margin-top: 16px;
        }

        :focus-visible {
          outline: 2px solid rgba(244,63,94,0.68);
          outline-offset: 3px;
          border-radius: 10px;
        }

        @media (max-width: 980px) {
          .profile-grid,
          .hero-main {
            grid-template-columns: 1fr;
          }

          .avatar-card {
            max-width: 320px;
          }

          .profile-hero {
            min-height: auto;
          }
        }

        @media (max-width: 680px) {
          .profile-nav,
          .hero-top {
            align-items: stretch;
            flex-direction: column;
          }

          .nav-actions,
          .hero-actions {
            justify-content: stretch;
          }

          .button,
          .hero-actions .button {
            flex: 1;
          }

          .profile-meta {
            grid-template-columns: 1fr;
          }

          .profile-title {
            font-size: clamp(42px, 14vw, 62px);
          }

          .metric-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 420px) {
          .nav-actions,
          .hero-actions,
          .metric-grid {
            grid-template-columns: 1fr;
            display: grid;
          }

          .button {
            width: 100%;
          }
        }
      `}</style>

      <section className="profile-shell" aria-label="User profile">
        <nav className="profile-nav">
          <div className="brand-pill">
            <span className="brand-dot" />
            CodeCrew Profile
          </div>

          <div className="nav-actions">
            <button className="button button-secondary" type="button" onClick={() => navigate("/feed")}>
              Feed
            </button>
            <button className="button button-primary" type="button" onClick={() => navigate("/createproject")}>
              New Project
            </button>
          </div>
        </nav>

        <div className="profile-grid">
          <article className="profile-hero">
            <div className="hero-top">
              <div className="profile-kicker">
                <span className="status-dot" />
                Live builder profile
              </div>
              <div className="availability">Available</div>
            </div>

            <div className="hero-main">
              <div>
                <h1 className="profile-title">
                  {displayName}
                  <span>{signature}</span>
                </h1>
                <p className="profile-subtitle">
                  A sharp CodeCrew identity for getting matched with serious teams,
                  showing your stack at a glance, and moving from idea to shipped work.
                </p>

                <div className="hero-actions">
                  <button className="button button-primary" type="button" onClick={() => navigate("/feed")}>
                    Find Crews
                  </button>
                  <button className="button button-secondary" type="button" onClick={() => navigate("/createproject")}>
                    Start Build
                  </button>
                </div>
              </div>

              <div className="avatar-card" aria-label={`${displayName} avatar`}>
                <div className="avatar-inner">
                  <div className="avatar-initials">{initials || "CC"}</div>
                  <div className="avatar-label">
                    <span>{topSkills[0] || "CodeCrew"}</span>
                    <span>{skills.length} skills</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="profile-meta">
              <div className="meta-card">
                <span>Email</span>
                <strong title={email}>{email}</strong>
              </div>
              <div className="meta-card">
                <span>Location</span>
                <strong title={location}>{location}</strong>
              </div>
              <div className="meta-card">
                <span>Mode</span>
                <strong>Shipping focused</strong>
              </div>
            </div>
          </article>

          <aside className="side-stack" aria-label="Profile details">
            <section className="side-card">
              <h2 className="section-title">Builder Snapshot</h2>
              <div className="metric-grid">
                <div className="metric-card">
                  <strong>03</strong>
                  <span>projects</span>
                </div>
                <div className="metric-card">
                  <strong>12</strong>
                  <span>joins</span>
                </div>
              </div>
            </section>

            <section className="side-card">
              <h2 className="section-title">Stack</h2>
              <div className="skill-cloud">
                {skills.map((skill) => (
                  <span className="skill-chip" key={skill} title={skill}>
                    {skill}
                  </span>
                ))}
              </div>
            </section>

            <section className="signal-card">
              <h2 className="section-title">Crew Match</h2>
              <p className="profile-subtitle" style={{ margin: 0, fontSize: "14px", lineHeight: 1.55 }}>
                Best for compact teams, clear ownership, and fast product loops.
              </p>
              <div className="signal-row">
                <div className="signal-bar" aria-hidden>
                  <span />
                </div>
                <strong>82%</strong>
              </div>
            </section>

            <section className="side-card">
              <h2 className="section-title">Recent Pulse</h2>
              <div className="activity-list">
                <div className="activity-item">
                  <span className="activity-mark" />
                  <div>
                    <strong>Ready to collaborate</strong>
                    <span>Profile is tuned for quick matching across active projects.</span>
                  </div>
                </div>
                <div className="activity-item">
                  <span className="activity-mark" />
                  <div>
                    <strong>Shipping mode active</strong>
                    <span>Strong fit for focused builds with visible ownership.</span>
                  </div>
                </div>
              </div>

              <button className="button button-secondary logout-button" type="button" onClick={handleLogout}>
                Logout
              </button>
            </section>
          </aside>
        </div>
      </section>
    </main>
  );
}

function safeParseUser(storedUser) {
  try {
    return JSON.parse(storedUser);
  } catch {
    return {};
  }
}
