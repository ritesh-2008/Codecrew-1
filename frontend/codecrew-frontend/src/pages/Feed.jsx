import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { socket } from "../socket";

export default function Feed() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [activeSkill, setActiveSkill] = useState("All");
  const [joiningId, setJoiningId] = useState("");
  const [joinedIds, setJoinedIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/getprojects");
        setProjects(res.data.projects || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const skillCloud = useMemo(() => {
    const skills = projects.flatMap((project) =>
      Array.isArray(project.skills) ? project.skills : []
    );

    return ["All", ...Array.from(new Set(skills.filter(Boolean))).slice(0, 8)];
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return projects.filter((project) => {
      const skills = Array.isArray(project.skills) ? project.skills : [];
      const matchesSkill = activeSkill === "All" || skills.includes(activeSkill);
      const searchable = [
        project.title,
        project.description,
        project.location,
        ...skills,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return matchesSkill && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }, [activeSkill, projects, query]);

  const handleJoin = async (projectId) => {
    setJoiningId(projectId);
    try {
      const res = await api.post(`/projects/${projectId}/join`);
      if (res.data.success) {
        console.log("Emitting join-project", projectId);
        console.log(socket.connected);
        socket.emit("join-project", projectId);
        setJoinedIds((current) =>
          current.includes(projectId) ? current : [...current, projectId]
        );
      }
    } catch (err) {
      console.error(err);
      setError("Failed to join project");
    } finally {
      setJoiningId("");
    }
  };

  const totalSkills = skillCloud.length > 1 ? skillCloud.length - 1 : 0;

  return (
    <main style={{
      minHeight: "100vh",
      background: "#080510",
      color: "white",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      padding: "clamp(22px, 4vw, 40px)",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap');

        * { box-sizing: border-box; }
        body { overflow-x: hidden; }

        @keyframes feedFloatA { 0%,100%{transform:translate3d(0,0,0)} 50%{transform:translate3d(0,-22px,0)} }
        @keyframes feedFloatB { 0%,100%{transform:translate3d(0,0,0)} 50%{transform:translate3d(0,20px,0)} }
        @keyframes feedFadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes feedShimmer { 0%{background-position:-300% center} 100%{background-position:300% center} }
        @keyframes feedSpin { to{transform:rotate(360deg)} }

        .feed-shell {
          width: min(1180px, 100%);
          margin: 0 auto;
          position: relative;
          z-index: 1;
          animation: feedFadeUp 0.55s ease-out both;
        }
        .feed-nav {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: clamp(28px, 5vw, 48px);
        }
        .feed-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: flex-end;
        }
        .feed-brand {
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
        .feed-title {
          font-family: 'Syne', sans-serif;
          font-size: clamp(44px, 8vw, 86px);
          font-weight: 800;
          letter-spacing: -2px;
          line-height: 0.95;
          margin: 0;
          max-width: 760px;
        }
        .feed-title span {
          background: linear-gradient(135deg, #fff, rgba(255,255,255,0.7), rgba(244,63,94,0.92));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .feed-create {
          border: 0;
          border-radius: 13px;
          padding: 13px 18px;
          background: linear-gradient(135deg, #f43f5e, #e11d48);
          color: white;
          font: inherit;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 0 34px rgba(244,63,94,0.28);
          transition: transform 0.18s, box-shadow 0.18s;
          white-space: nowrap;
        }
        .feed-profile {
          border: 1px solid rgba(255,255,255,0.11);
          border-radius: 13px;
          padding: 13px 16px;
          background: rgba(255,255,255,0.055);
          color: rgba(255,255,255,0.72);
          font: inherit;
          font-weight: 800;
          cursor: pointer;
          transition: transform 0.18s, border-color 0.18s, background 0.18s, color 0.18s;
          white-space: nowrap;
        }
        .feed-profile:hover {
          transform: translateY(-1px);
          color: white;
          border-color: rgba(255,255,255,0.22);
          background: rgba(255,255,255,0.08);
        }
        .feed-create:hover {
          transform: translateY(-1px);
          box-shadow: 0 0 54px rgba(244,63,94,0.4);
        }
        .feed-create:active { transform: scale(0.98); }
        .feed-dashboard {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 320px;
          gap: 18px;
          align-items: stretch;
          margin: clamp(24px, 4vw, 36px) 0 22px;
        }
        .feed-control,
        .feed-stat,
        .project-card,
        .feed-state {
          background: rgba(255,255,255,0.045);
          border: 1px solid rgba(255,255,255,0.09);
          backdrop-filter: blur(22px);
          box-shadow: 0 20px 60px rgba(0,0,0,0.22);
        }
        .feed-control {
          border-radius: 18px;
          padding: 16px;
        }
        .feed-search {
          width: 100%;
          height: 52px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 13px;
          background: rgba(8,5,18,0.72);
          color: white;
          font: inherit;
          font-size: 16px;
          padding: 0 16px;
          outline: none;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
        }
        .feed-search:focus {
          border-color: rgba(244,63,94,0.68);
          background: rgba(244,63,94,0.045);
          box-shadow: 0 0 0 4px rgba(244,63,94,0.08), 0 0 26px rgba(244,63,94,0.12);
        }
        .feed-search::placeholder { color: rgba(255,255,255,0.28); }
        .skill-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 12px;
        }
        .skill-filter {
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px;
          background: rgba(255,255,255,0.045);
          color: rgba(255,255,255,0.58);
          padding: 8px 12px;
          font: inherit;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: color 0.18s, border-color 0.18s, background 0.18s;
        }
        .skill-filter.is-active {
          color: white;
          border-color: rgba(244,63,94,0.44);
          background: rgba(244,63,94,0.15);
        }
        .feed-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .feed-stat {
          border-radius: 18px;
          padding: 18px;
        }
        .project-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }
        .project-card {
          min-height: 320px;
          border-radius: 20px;
          padding: 1px;
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
        }
        .project-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(244,63,94,0.22), rgba(139,92,246,0.15), transparent 52%);
          opacity: 0;
          transition: opacity 0.2s;
          pointer-events: none;
        }
        .project-card:hover {
          transform: translateY(-4px);
          border-color: rgba(244,63,94,0.28);
          box-shadow: 0 28px 80px rgba(0,0,0,0.28), 0 0 42px rgba(244,63,94,0.1);
        }
        .project-card:hover::before { opacity: 1; }
        .project-inner {
          min-height: 318px;
          height: 100%;
          border-radius: 19px;
          padding: 20px;
          background: rgba(8,5,18,0.9);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }
        .project-title {
          margin: 0;
          color: white;
          font-size: 21px;
          line-height: 1.18;
          letter-spacing: -0.3px;
        }
        .project-desc {
          color: rgba(255,255,255,0.52);
          font-size: 14px;
          line-height: 1.65;
          margin: 14px 0 0;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .tag-row {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          margin-top: 18px;
        }
        .project-tag {
          border: 1px solid rgba(244,63,94,0.24);
          border-radius: 999px;
          background: rgba(244,63,94,0.1);
          color: rgba(255,205,214,0.95);
          padding: 6px 10px;
          font-size: 12px;
          font-weight: 800;
        }
        .join-btn {
          width: 100%;
          min-height: 44px;
          margin-top: auto;
          border: 0;
          border-radius: 12px;
          background: linear-gradient(135deg, #f43f5e, #e11d48);
          color: white;
          font: inherit;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: transform 0.18s, box-shadow 0.18s, background 0.18s;
          box-shadow: 0 0 28px rgba(244,63,94,0.22);
        }
        .join-btn:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 0 42px rgba(244,63,94,0.34);
        }
        .join-btn:disabled {
          background: rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.42);
          cursor: not-allowed;
          box-shadow: none;
        }
        .chat-btn {
          width: 100%;
          min-height: 44px;
          margin-top: 8px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          background: rgba(255,255,255,0.045);
          color: rgba(255,255,255,0.68);
          font: inherit;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          transition: all 0.18s;
        }
        .chat-btn:hover {
          background: rgba(255,255,255,0.08);
          color: white;
          border-color: rgba(244,63,94,0.3);
          transform: translateY(-1px);
        }
        .chat-btn:active { transform: scale(0.98); }
        .feed-state {
          border-radius: 20px;
          padding: clamp(28px, 6vw, 56px);
          text-align: center;
        }
        :focus-visible {
          outline: 2px solid rgba(244,63,94,0.65);
          outline-offset: 3px;
          border-radius: 8px;
        }

        @media (max-width: 980px) {
          .feed-dashboard { grid-template-columns: 1fr; }
          .project-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }

        @media (max-width: 640px) {
          .feed-nav { align-items: stretch; flex-direction: column; }
          .feed-actions { justify-content: stretch; }
          .feed-profile { flex: 1; }
          .feed-create { width: 100%; }
          .feed-stats { grid-template-columns: 1fr 1fr; }
          .project-grid { grid-template-columns: 1fr; }
          .feed-title { letter-spacing: -1px; }
        }
      `}</style>

      <div style={{ position:"fixed", top:"-180px", left:"-130px", width:"460px", height:"460px",
        borderRadius:"50%", background:"radial-gradient(circle, rgba(244,63,94,0.15) 0%, transparent 70%)",
        filter:"blur(78px)", pointerEvents:"none", animation:"feedFloatA 11s ease-in-out infinite" }} aria-hidden />
      <div style={{ position:"fixed", bottom:"-170px", right:"-120px", width:"420px", height:"420px",
        borderRadius:"50%", background:"radial-gradient(circle, rgba(139,92,246,0.14) 0%, transparent 70%)",
        filter:"blur(70px)", pointerEvents:"none", animation:"feedFloatB 13s ease-in-out infinite" }} aria-hidden />
      <div style={{ position:"fixed", inset:0, pointerEvents:"none",
        backgroundImage:"linear-gradient(rgba(255,255,255,0.024) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.024) 1px, transparent 1px)",
        backgroundSize:"30px 30px" }} aria-hidden />
      <div style={{ position:"fixed", top:0, left:0, right:0, height:"1px", zIndex:2, pointerEvents:"none",
        background:"linear-gradient(90deg, transparent, rgba(244,63,94,0.85) 30%, rgba(139,92,246,0.7) 68%, transparent)",
        backgroundSize:"300% auto", animation:"feedShimmer 5s linear infinite" }} aria-hidden />

      <div className="feed-shell">
        <nav className="feed-nav">
          <div className="feed-brand">
            <span style={{ width:"7px", height:"7px", borderRadius:"50%", background:"#f43f5e",
              boxShadow:"0 0 10px rgba(244,63,94,0.95)" }} />
            CodeCrew Feed
          </div>

          <div className="feed-actions">
            <button className="feed-profile" onClick={() => navigate("/profile")}>
              Profile
            </button>
            <button className="feed-create" onClick={() => navigate("/createproject")}>
              Create Project <span aria-hidden>+</span>
            </button>
          </div>
        </nav>

        <header>
          <h1 className="feed-title">
            Discover projects worth <span>shipping.</span>
          </h1>
          <p style={{ maxWidth:"650px", margin:"20px 0 0", color:"rgba(255,255,255,0.52)",
            fontSize:"clamp(15px, 2vw, 18px)", lineHeight:"1.7" }}>
            Browse open builds, find a stack that fits, and join the crew that is already moving.
          </p>
        </header>

        <section className="feed-dashboard" aria-label="Feed controls">
          <div className="feed-control">
            <input
              className="feed-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by title, description, location, or stack"
            />
            <div className="skill-row">
              {skillCloud.map((skill) => (
                <button
                  key={skill}
                  type="button"
                  onClick={() => setActiveSkill(skill)}
                  className={`skill-filter${activeSkill === skill ? " is-active" : ""}`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div className="feed-stats">
            <div className="feed-stat">
              <strong style={{ display:"block", fontSize:"30px", lineHeight:"1", color:"white" }}>
                {projects.length}
              </strong>
              <span style={{ display:"block", marginTop:"8px", color:"rgba(255,255,255,0.42)",
                fontSize:"12px", fontWeight:"700", textTransform:"uppercase", letterSpacing:"1px" }}>
                live projects
              </span>
            </div>
            <div className="feed-stat">
              <strong style={{ display:"block", fontSize:"30px", lineHeight:"1", color:"white" }}>
                {totalSkills}
              </strong>
              <span style={{ display:"block", marginTop:"8px", color:"rgba(255,255,255,0.42)",
                fontSize:"12px", fontWeight:"700", textTransform:"uppercase", letterSpacing:"1px" }}>
                stacks
              </span>
            </div>
          </div>
        </section>

        {error && (
          <div className="feed-state" style={{ marginBottom:"18px", borderColor:"rgba(239,68,68,0.24)",
            background:"rgba(239,68,68,0.08)", textAlign:"left", padding:"16px 18px" }}>
            <strong style={{ display:"block", color:"rgba(254,202,202,0.96)", fontSize:"14px" }}>
              Something went wrong
            </strong>
            <span style={{ color:"rgba(254,202,202,0.72)", fontSize:"13px", marginTop:"4px", display:"block" }}>
              {error}
            </span>
          </div>
        )}

        {loading && (
          <div className="feed-state">
            <div style={{ width:"28px", height:"28px", border:"3px solid rgba(255,255,255,0.16)",
              borderTopColor:"#f43f5e", borderRadius:"50%", animation:"feedSpin 0.7s linear infinite",
              margin:"0 auto 18px" }} />
            <h2 style={{ margin:"0 0 8px", fontSize:"22px" }}>Loading projects</h2>
            <p style={{ margin:0, color:"rgba(255,255,255,0.42)" }}>Finding the newest builds for you.</p>
          </div>
        )}

        {!loading && filteredProjects.length > 0 && (
          <section className="project-grid" aria-label="Projects">
            {filteredProjects.map((project) => {
              const skills = Array.isArray(project.skills) ? project.skills : [];
              const isJoined = joinedIds.includes(project._id);
              const memberCount = Array.isArray(project.members) ? project.members.length : 0;

              return (
                <article key={project._id} className="project-card">
                  <div className="project-inner">
                    <div style={{ display:"flex", justifyContent:"space-between", gap:"12px", marginBottom:"18px" }}>
                      <span style={{ color:"rgba(244,63,94,0.9)", fontSize:"12px", fontWeight:"800",
                        letterSpacing:"1.2px", textTransform:"uppercase" }}>
                        Open project
                      </span>
                      <span style={{ color:"rgba(255,255,255,0.36)", fontSize:"12px", fontWeight:"700" }}>
                        {memberCount} joined
                      </span>
                    </div>

                    <h2 className="project-title">{project.title}</h2>
                    <p className="project-desc">{project.description}</p>

                    <div className="tag-row">
                      {skills.length > 0 ? (
                        <>
                          {skills.slice(0, 4).map((skill) => (
                            <span key={skill} className="project-tag">{skill}</span>
                          ))}
                          {skills.length > 4 && (
                            <span className="project-tag">+{skills.length - 4}</span>
                          )}
                        </>
                      ) : (
                        <span className="project-tag">General</span>
                      )}
                    </div>

                    <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
                      gap:"10px", margin:"18px 0 16px", color:"rgba(255,255,255,0.36)", fontSize:"13px" }}>
                      <span>{project.location || "Remote friendly"}</span>
                      <span>{project.creator?.length || 1} creator</span>
                    </div>

                    <button
                      className="join-btn"
                      onClick={() => handleJoin(project._id)}
                      disabled={joiningId === project._id || isJoined}
                    >
                      {joiningId === project._id ? (
                        <>
                          <span style={{ width:"15px", height:"15px", border:"2px solid rgba(255,255,255,0.3)",
                            borderTopColor:"white", borderRadius:"50%", animation:"feedSpin 0.7s linear infinite" }} />
                          Joining...
                        </>
                      ) : isJoined ? (
                        "Joined"
                      ) : (
                        <>Join project <span aria-hidden>&rarr;</span></>
                      )}
                    </button>

                    <button
                      className="chat-btn"
                      onClick={() => navigate(`/chat/${project._id}`)}
                    >
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:"6px"}}>
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      Chat
                    </button>
                  </div>
                </article>
              );
            })}
          </section>
        )}

        {!loading && filteredProjects.length === 0 && (
          <div className="feed-state">
            <h2 style={{ margin:"0 0 10px", fontSize:"24px" }}>
              {projects.length === 0 ? "No projects yet" : "No matches found"}
            </h2>
            <p style={{ margin:"0 auto 22px", maxWidth:"460px", color:"rgba(255,255,255,0.44)", lineHeight:"1.6" }}>
              {projects.length === 0
                ? "Start the first build and give the community something to join."
                : "Try a different search term or switch the selected stack."}
            </p>
            <button className="feed-create" onClick={() => navigate("/createproject")}>
              Create Project <span aria-hidden>+</span>
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
