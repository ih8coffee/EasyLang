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
import Projects from "./pages/Projects";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/projects/:projectId" element={<Projects />} />
          <Route path="/workspace" element={<Workspace />} />
          <Route path="/workspace/:taskId" element={<Workspace />} />
          <Route path="/workspace/:projectId" element={<Workspace />} />
          <Route path="/" element={<Navigate replace to="/dashboard" />} />
          <Route path="*">404 Not Found</Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
