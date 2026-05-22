import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { AuthProvider } from "./context/Authcontext";
import Login from "./pages/login";
import Register from "./pages/Regester";
function App() {
  return (
  
      <AuthProvider>
        
        <Router>
          <Routes>
            <Route path="/"/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
          </Routes>
        </Router>
      </AuthProvider>

    
  )
}

export default App;