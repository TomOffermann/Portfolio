import "./App.css";
import Home from "./pages/home/Home";
import Space from "./components/Space/Space";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CheatSheets from "./pages/cheat-sheets/CheatSheets";
import { useState } from "react";

function App() {
  const [onSubPage, setOnSubPage] = useState(false);

  const handleState = (state: boolean) => {
    setOnSubPage(state);
  };

  return (
    <div className="Home">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Space onSubPage={onSubPage} />}>
            <Route index element={<Home handleState={handleState} />} />
            <Route
              path="cheat-sheets"
              element={<CheatSheets handleState={handleState} />}
            />
            {/*<Route path="projects" element={<Projects />} />
            <Route path="tools" element={<Tools />} />
  <Route path="cv" element={<CV />} />*/}
          </Route>
        </Routes>
      </BrowserRouter>
      <div className="Footer">
        <div className="Socials">
          <a
            target="_blank"
            rel="noreferrer"
            className="github"
            href="https://github.com/TomOffermann"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg"
              width="18px"
            />
          </a>
          <a
            className="instagram"
            target="_blank"
            rel="noreferrer"
            href="https://www.instagram.com/tom.offmn/"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/5/58/Instagram-Icon.png"
              width="20px"
            />
          </a>
        </div>
        <div id="plug">@Tom Offermann</div>
      </div>
    </div>
  );
}

export default App;
