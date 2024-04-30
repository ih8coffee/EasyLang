import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";

import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";
import Workspace from "./pages/Workspace";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/" element={<Navigate replace to="/login" />} />
          <Route path="*">404 Not Found</Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
