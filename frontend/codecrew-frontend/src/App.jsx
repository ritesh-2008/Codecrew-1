import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/authcontext";
function App() {
  return (
  
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/"></Route>
          </Routes>
        </Router>
      </AuthProvider>

    
  )
}

export default App;