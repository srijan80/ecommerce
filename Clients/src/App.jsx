import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Home from "./pages/Home";
import SinglePage from "./pages/SinglePage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminPanel from "./pages/admin/AdminPanel";
import ProtectedRoute from "./auth/ProtectedRoute";
import Success from './pages/Success'
import Customerorders from "./pages/Customerorders";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/product/:id" element={<ProtectedRoute><SinglePage /></ProtectedRoute>} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/AdminPanel" element={<AdminPanel />} />
          <Route path="/success" element={<Success />} />
          <Route path="/customerorders" element={<Customerorders />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
