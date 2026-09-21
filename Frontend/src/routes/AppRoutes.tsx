import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Chat from "../components/Chat";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;