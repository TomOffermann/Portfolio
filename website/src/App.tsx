import "./App.css";
import Home from "./pages/home/Home";
import Space from "./components/Space/Space";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CheatSheets from "./pages/cheat-sheets/CheatSheets";
import { useEffect, useState } from "react";
import Clean from "./components/Clean/Clean";
import AnW from "./pages/anw/AnW";
import PageNotFound from "./components/PageNotFound/PageNotFound";

function App() {
  const [onSubPage, setOnSubPage] = useState(false);
  const [spaceDesign, setSpaceDesign] = useState(true);

  const safeSpaceDesign = (design: boolean) => {
    localStorage.setItem("color", JSON.stringify(design));
  };

  useEffect(() => {
    let fromStore = localStorage.getItem("color");
    if (fromStore != null) {
      let design = JSON.parse(fromStore);
      setSpaceDesign(design);
    } else {
      setSpaceDesign(true);
    }
  }, []);

  const handleState = (state: boolean) => {
    setOnSubPage(state);
  };

  return (
    <div
      className="Home"
      style={{ backgroundColor: spaceDesign ? "#131313" : "#f18aba" }}
    >
      <button
        className="Color-Switch"
        onClick={() => {
          let newDesign = !spaceDesign;
          setSpaceDesign(newDesign);
          safeSpaceDesign(newDesign);
        }}
      >
        {spaceDesign ? "Color 🎨" : "Space 👾"}
      </button>
      {spaceDesign ? (
        <Space onSubPage={onSubPage} sunCoords={200} />
      ) : (
        <Clean />
      )}
      <BrowserRouter basename="/~toffermann">
        <Routes>
          <Route path="/" element={<Home handleState={handleState} />} />
          <Route
            path="/cheat-sheets"
            element={<CheatSheets handleState={handleState} />}
          />
          <Route path="/anw" element={<AnW handleState={handleState} />} />
          <Route path="*" element={<PageNotFound />} />
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
        </div>
        <div id="plug">@Tom Offermann</div>
      </div>
    </div>
  );
}

export default App;
