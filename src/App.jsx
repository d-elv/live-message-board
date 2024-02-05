import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Auth } from "./pages/auth/auth.jsx";
import { HomePage } from "./pages/homePage/homePage.jsx";
import { BulletinBoard } from "./pages/bulletinBoard/bulletinBoard.jsx";
import { Settings } from "./pages/settings/settings.jsx";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/login" exact element={<Auth />} />
          <Route path="/bulletin-board" exact element={<BulletinBoard />} />
          <Route path="/settings" exact element={<Settings />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
