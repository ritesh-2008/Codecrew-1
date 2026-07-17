import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/Authcontext";
import ProtectedRoute from "./components/Protectedroute";
import Login from "./pages/Login";
import Register from "./pages/Regester";
import Landing from "./pages/Landing";
import Feed from "./pages/Feed";
import CreateProject from "./components/Createproject";
import User from "./components/user";
import ChatInterface from "./components/ChatInterface";
import { socket } from "./socket";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    socket.connect()

    socket.on("connect", () => {
      console.log("Connected to server with socket id:", socket.id)
    })

    return () => {
      socket.disconnect()
    }
  }, [])
  
  return (

    <AuthProvider>

      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/feed" element={<ProtectedRoute> <Feed /> </ProtectedRoute>} />
          <Route path="/createproject" element={<ProtectedRoute> <CreateProject /> </ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute> <User /> </ProtectedRoute>} />
          <Route path="/chat/:projectId" element={<ProtectedRoute> <ChatInterface /> </ProtectedRoute>} />

        </Routes>
      </Router>
    </AuthProvider>


  )
}

export default App;
