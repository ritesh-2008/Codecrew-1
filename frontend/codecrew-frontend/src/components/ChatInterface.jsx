import { useState, useEffect, useRef, useCallback, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { socket } from "../socket";
import api from "../api/axios";
import { AuthContext } from "../context/Authcontext";

export default function ChatInterface() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [project, setProject] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [usersOnline, setUsersOnline] = useState(0);
  const [username, setUsername] = useState(user?.username || "Anonymous");
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Fetch project info
  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await api.get(`/projects/${projectId}`);
        setProject(res.data.project);
        const usernameRes = await api.get("/user/me");
        setUsername(usernameRes.data.user);
      } catch (err) {
        console.error("Failed to fetch project:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [projectId]);

  // Join socket room and listen for messages
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    socket.emit("join-project", projectId);

    const handleMessage = (msg) => {
      setMessages((prev) => [...prev, { ...msg, isSelf: msg.senderId === socket.id }]);
    };

    const handleUserCount = (count) => {
      setUsersOnline(count);
    };

    socket.on("chat-message", handleMessage);
    socket.on("room-users", handleUserCount);

    // Request current room user count
    socket.emit("get-room-users", projectId);

    return () => {
      socket.off("chat-message", handleMessage);
      socket.off("room-users", handleUserCount);
      socket.emit("leave-project", projectId);
    };
  }, [projectId]);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = useCallback(async () => {
    const text = input.trim();
    if (!text || sending) return;

    setSending(true);
    setInput("");

    // Emit message to server with username from auth context
    socket.emit("send-message", {
      projectId,
      text,
      senderName: username?.username ,
    });
    setSending(false);
  }, [input, sending, projectId]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <main style={{
      minHeight: "100vh",
      background: "#080510",
      color: "white",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap');

        * { box-sizing: border-box; }
        body { overflow: hidden; }

        @keyframes chatFloat { 0%,100%{transform:translate3d(0,0,0)} 50%{transform:translate3d(0,-20px,0)} }
        @keyframes chatFadeIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
        @keyframes chatPulse { 0%,100%{opacity:0.3} 50%{opacity:1} }
        @keyframes chatShimmer { 0%{background-position:-300% center} 100%{background-position:300% center} }
        @keyframes spin { to{transform:rotate(360deg)} }
        @keyframes msgPop { 0%{opacity:0;transform:scale(0.96) translateY(6px)} 100%{opacity:1;transform:scale(1) translateY(0)} }

        .chat-shell {
          width: min(760px, 100%);
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          height: 100vh;
          position: relative;
          z-index: 1;
          padding: 0 16px;
        }

        .chat-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          flex-shrink: 0;
        }

        .chat-back {
          width: 38px;
          height: 38px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.045);
          color: rgba(255,255,255,0.7);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          transition: all 0.18s;
          flex-shrink: 0;
        }
        .chat-back:hover {
          background: rgba(255,255,255,0.08);
          color: white;
          border-color: rgba(244,63,94,0.4);
          transform: translateX(-2px);
        }

        .chat-project-name {
          font-family: 'Syne', sans-serif;
          font-size: 20px;
          font-weight: 700;
          letter-spacing: -0.3px;
          margin: 0;
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .chat-online {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 600;
          color: rgba(255,255,255,0.42);
          white-space: nowrap;
        }
        .chat-online-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 10px rgba(34,197,94,0.6);
          animation: chatPulse 2s ease-in-out infinite;
        }

        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 16px 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
          scrollbar-width: thin;
          scrollbar-color: rgba(255,255,255,0.08) transparent;
        }
        .chat-messages::-webkit-scrollbar { width: 4px; }
        .chat-messages::-webkit-scrollbar-track { background: transparent; }
        .chat-messages::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }

        .msg-row {
          display: flex;
          align-items: flex-end;
          gap: 10px;
          animation: msgPop 0.25s ease-out both;
        }
        .msg-row.is-self {
          flex-direction: row-reverse;
        }

        .msg-avatar {
          width: 32px;
          height: 32px;
          border-radius: 10px;
          background: linear-gradient(135deg, rgba(244,63,94,0.2), rgba(139,92,246,0.2));
          border: 1px solid rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          color: rgba(255,255,255,0.7);
          flex-shrink: 0;
          text-transform: uppercase;
        }

        .msg-bubble {
          max-width: 75%;
          padding: 10px 14px;
          border-radius: 16px;
          background: rgba(255,255,255,0.055);
          border: 1px solid rgba(255,255,255,0.07);
          font-size: 14px;
          line-height: 1.55;
          color: rgba(255,255,255,0.88);
          word-wrap: break-word;
        }
        .msg-bubble.is-self {
          background: rgba(244,63,94,0.15);
          border-color: rgba(244,63,94,0.25);
          border-bottom-right-radius: 4px;
        }
        .msg-bubble:not(.is-self) {
          border-bottom-left-radius: 4px;
        }

        .msg-sender {
          font-size: 11px;
          font-weight: 700;
          color: rgba(244,63,94,0.72);
          margin-bottom: 4px;
          letter-spacing: 0.2px;
        }
        .is-self .msg-sender {
          color: rgba(244,63,94,0.6);
        }

        .msg-time {
          font-size: 10px;
          color: rgba(255,255,255,0.24);
          margin-top: 4px;
          letter-spacing: 0.2px;
        }

        .chat-input-area {
          padding: 12px 0 20px;
          border-top: 1px solid rgba(255,255,255,0.07);
          flex-shrink: 0;
          display: flex;
          gap: 10px;
          align-items: flex-end;
        }

        .chat-input {
          flex: 1;
          min-height: 50px;
          max-height: 140px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          background: rgba(8,5,18,0.72);
          color: white;
          font: inherit;
          font-size: 15px;
          padding: 13px 16px;
          outline: none;
          resize: none;
          transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
        }
        .chat-input:focus {
          border-color: rgba(244,63,94,0.6);
          background: rgba(244,63,94,0.035);
          box-shadow: 0 0 0 4px rgba(244,63,94,0.08), 0 0 26px rgba(244,63,94,0.1);
        }
        .chat-input::placeholder {
          color: rgba(255,255,255,0.28);
        }

        .chat-send {
          width: 50px;
          height: 50px;
          border: 0;
          border-radius: 14px;
          background: linear-gradient(135deg, #f43f5e, #e11d48);
          color: white;
          font-size: 20px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.18s;
          box-shadow: 0 0 22px rgba(244,63,94,0.22);
          flex-shrink: 0;
        }
        .chat-send:hover:not(:disabled) {
          transform: translateY(-1px) scale(1.03);
          box-shadow: 0 0 36px rgba(244,63,94,0.34);
        }
        .chat-send:active:not(:disabled) { transform: scale(0.95); }
        .chat-send:disabled {
          background: rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.25);
          box-shadow: none;
          cursor: not-allowed;
        }

        .chat-empty {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          gap: 8px;
        }
        .chat-empty-icon {
          width: 60px;
          height: 60px;
          border-radius: 20px;
          background: rgba(244,63,94,0.08);
          border: 1px solid rgba(244,63,94,0.16);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          margin-bottom: 6px;
        }

        .chat-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 20px;
          color: rgba(255,255,255,0.42);
          font-size: 14px;
        }

        :focus-visible {
          outline: 2px solid rgba(244,63,94,0.65);
          outline-offset: 3px;
          border-radius: 8px;
        }
      `}</style>

      {/* Ambient orbs */}
      <div style={{ position:"fixed", top:"-140px", right:"-100px", width:"380px", height:"380px",
        borderRadius:"50%", background:"radial-gradient(circle, rgba(244,63,94,0.12) 0%, transparent 70%)",
        filter:"blur(70px)", pointerEvents:"none", animation:"chatFloat 12s ease-in-out infinite" }} aria-hidden />
      <div style={{ position:"fixed", bottom:"-120px", left:"-80px", width:"320px", height:"320px",
        borderRadius:"50%", background:"radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)",
        filter:"blur(60px)", pointerEvents:"none", animation:"chatFloat 9s ease-in-out infinite reverse" }} aria-hidden />
      <div style={{ position:"fixed", top:0, left:0, right:0, height:"1px", zIndex:2, pointerEvents:"none",
        background:"linear-gradient(90deg, transparent, rgba(244,63,94,0.85) 30%, rgba(139,92,246,0.7) 68%, transparent)",
        backgroundSize:"300% auto", animation:"chatShimmer 5s linear infinite" }} aria-hidden />

      <div className="chat-shell">
        {/* Header */}
        <header className="chat-header">
          <button className="chat-back" onClick={() => navigate(-1)} aria-label="Go back">
            <span aria-hidden>&larr;</span>
          </button>

          {loading ? (
            <div className="chat-loading" style={{ flex:1, justifyContent:"flex-start", padding:0 }}>
              <div style={{ width:"16px", height:"16px", border:"2px solid rgba(255,255,255,0.16)",
                borderTopColor:"#f43f5e", borderRadius:"50%", animation:"spin 0.7s linear infinite" }} />
              Loading...
            </div>
          ) : (
            <>
              <h1 className="chat-project-name">
                {project?.title || "Project Chat"}
              </h1>
              <div className="chat-online">
                <span className="chat-online-dot" />
                {usersOnline} online
              </div>
            </>
          )}
        </header>

        {/* Messages area */}
        {!loading && messages.length === 0 && (
          <div className="chat-empty">
            <div className="chat-empty-icon">💬</div>
            <h2 style={{ margin:0, fontSize:"18px", fontWeight:"600" }}>No messages yet</h2>
            <p style={{ margin:0, color:"rgba(255,255,255,0.42)", fontSize:"14px", maxWidth:"340px", lineHeight:"1.6" }}>
              Start the conversation — say hello to the crew working on this project.
            </p>
          </div>
        )}

        {!loading && messages.length > 0 && (
          <div className="chat-messages">
            {messages.map((msg, idx) => (
              <div key={idx} className={`msg-row${msg.isSelf ? " is-self" : ""}`}>
                <div className="msg-avatar">{msg.senderName?.slice(0, 2) || "??"}</div>
                <div className={`msg-bubble${msg.isSelf ? " is-self" : ""}`}>
                  <div className="msg-sender">{msg.senderName }</div>
                  {msg.text}
                  <div className="msg-time">
                    {msg.time ? new Date(msg.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "just now"}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}

        {loading && (
          <div className="chat-messages" style={{ justifyContent:"center", alignItems:"center" }}>
            <div style={{ width:"28px", height:"28px", border:"3px solid rgba(255,255,255,0.16)",
              borderTopColor:"#f43f5e", borderRadius:"50%", animation:"spin 0.7s linear infinite" }} />
          </div>
        )}

        {/* Input area */}
        <div className="chat-input-area">
          <textarea
            ref={inputRef}
            className="chat-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            disabled={loading}
          />
          <button
            className="chat-send"
            onClick={handleSend}
            disabled={!input.trim() || sending || loading}
            aria-label="Send message"
          >
            {sending ? (
              <div style={{ width:"16px", height:"16px", border:"2px solid rgba(255,255,255,0.3)",
                borderTopColor:"white", borderRadius:"50%", animation:"spin 0.7s linear infinite" }} />
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}
