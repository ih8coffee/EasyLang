// App.jsx

import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Navbar className="navbar" />
      <div className="App">
        <Dashboard />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
