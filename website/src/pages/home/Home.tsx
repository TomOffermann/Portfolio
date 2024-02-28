import { Link } from "react-router-dom";
import "./Home.css";

interface HomeProps {
  handleState: (state: boolean) => void;
}

function Home(props: HomeProps) {
  return (
    <>
      <div className="Container">
        <div className="Title">WELCOME</div>
        <div className="Sub-Title">to my personal website</div>
        <div className="Navigator">
          <Link
            className="Link"
            to="/cheat-sheets"
            onClick={() => props.handleState(true)}
          >
            Cheat-Sheets/ Summaries
          </Link>
          <Link
            className="Link"
            to="/anw"
            onClick={() => props.handleState(true)}
          >
            AlgoWahr FS24
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
