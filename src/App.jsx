// App.jsx

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./App.css";

import DashboardWorker from "./pages/DashboardWorker";
import DashboardManager from "./pages/DashboardManager";
import DashboardProjectManager from "./pages/DashboardProjectManager";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard/worker" element={<DashboardWorker />} />
          <Route path="/dashboard/manager" element={<DashboardManager />} />
          <Route
            path="/dashboard/project-manager"
            element={<DashboardProjectManager />}
          />
          <Route path="/" element={<Navigate replace to="/login" />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
