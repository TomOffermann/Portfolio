import { Link } from "react-router-dom";
import "./CheatSheets.css";

interface CheatSheetProps {
  handleState: (state: boolean) => void;
}

function CheatSheets(props: CheatSheetProps) {
  return (
    <>
      <div className="OnTop">
        <Link className="Link" to="/" onClick={() => props.handleState(false)}>
          Home
        </Link>
      </div>
      <div className="Container">
        <div className="Title">SUMMARIES</div>
        <div className="Sub-Title">D-INFK BSC. ETHZ</div>
        <div className="Collection">
          <div className="Sem">Semester 1 (HS22): /---/</div>
          <br />
          <div className="Sem">
            Semester 2 (FS23):
            <span>
              &#8226;{" "}
              <a target="_blank" href="/data/AnW.pdf" className="Link">
                Algorithmen & Wahrscheinlichkeit
              </a>
            </span>
            <span>
              &#8226;{" "}
              <a target="_blank" href="/data/PProg.pdf" className="Link">
                Parallele Programmierung
              </a>
            </span>
            <span>
              &#8226;{" "}
              <a target="_blank" href="/data/Analysis.pdf" className="Link">
                Analysis I (adapted version of ...'s Spick)
              </a>
            </span>
          </div>
          <br />
          <div className="Sem">Semester 3 (HS23): /---/</div>
          <br />
        </div>
      </div>
    </>
  );
}

export default CheatSheets;
