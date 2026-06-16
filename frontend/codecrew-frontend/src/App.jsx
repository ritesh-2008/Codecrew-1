import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { AuthProvider } from "./context/Authcontext";
import ProtectedRoute from "./components/Protectedroute";
import Login from "./pages/Login";
import Register from "./pages/Regester";
import Landing from "./pages/Landing";
import Feed from "./pages/Feed";
import CreateProject from "./components/Createproject";

function App() {
  return (
  
      <AuthProvider>
        
        <Router>
          <Routes>
            <Route path="/" element={<Landing/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/feed" element={<ProtectedRoute> <Feed /> </ProtectedRoute>}/>
            <Route path="/createproject" element={<ProtectedRoute> <CreateProject /> </ProtectedRoute>}/>
          </Routes>
        </Router>
      </AuthProvider>

    
  )
}

export default App;