import "./App.css";
import { useState } from "react";

import Navbar from "./navbar";
import TextForm from "./text-form";
import About from "./about";
import Alert from "./alert";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const [dark, setDark] = useState(false);
  const [alert, set] = useState(null);

  const show = (message, type) => {
    set({
      msg: message,
      type: type,
    });

    setTimeout(() => {
      set(null);
    }, 3000);
  };

  const close = () => {
    set(null);
  };

  const toggleMode = () => {
    if (dark) {
      setDark(false);
      show("Light Mode Enabled", "warning");
    } else {
      setDark(true);
      show("Dark Mode Enabled", "success");
    }
  };

  const bg = dark ? "#1e1e1e" : "white";
  const color = dark ? "white" : "black";
  const navBg = dark ? "#1e1e1e" : "white";

  return (
    <Router>
      <div
        style={{
          backgroundColor: bg,
          color: color,
          minHeight: "100vh",
        }}
      >
        <Navbar
          navBg={navBg}
          color={color}
          toggleMode={toggleMode}
          mode={dark ? "dark" : "light"}
        />

        <Alert alert={alert} close={close} />

        <Routes>
          <Route
            path="/"
            element={
              <TextForm
                dark={dark}
                title="Enter Your Text"
              />
            }
          />

          <Route
            path="/about"
            element={<About />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;