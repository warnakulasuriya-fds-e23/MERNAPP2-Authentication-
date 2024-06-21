import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UseAuthContext } from "./hooks/UseAuthContext";
//pages and components
import Home from "./Pages/Home";
import NavBar from "./components/NavBar";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
function App() {
  const { user } = UseAuthContext();
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
