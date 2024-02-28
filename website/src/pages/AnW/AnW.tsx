import { Link } from "react-router-dom";
import "./AnW.css";
import { useState } from "react";

interface AnWProps {
  handleState: (state: boolean) => void;
}

function AnW(props: AnWProps) {
  return (
    <>
      <div className="OnTop">
        <Link
          className="LinkHome"
          to="/"
          onClick={() => props.handleState(false)}
        >
          {"<Home>"}
        </Link>
      </div>
      <div className="Container">
        <div className="Title">AnW</div>
        <div className="Sub-Title">D-INFK BSC. ETHZ</div>
        <div className="Collection-AnW">
          <div className="Column">
            <a target="_blank" href="/~toffermann/data/week01.html" className="Link">
              Week 01
            </a>
            <a target="_blank" href="/~toffermann/data/week02.html" className="Link">
              Week 02
            </a>
            <a target="_blank" href="/~toffermann/data/week03.html" className="Link">
              Week 03
            </a>
            <a target="_blank" href="/~toffermann/data/week04.html" className="Link">
              Week 04
            </a>
            <a target="_blank" href="/~toffermann/data/week05.html" className="Link">
              Week 05
            </a>
            <a target="_blank" href="/~toffermann/data/week06.html" className="Link">
              Week 06
            </a>
            <a target="_blank" href="/~toffermann/data/week07.html" className="Link">
              Week 07
            </a>
          </div>
          <div className="Column">
            <a target="_blank" href="/~toffermann/data/week08.html" className="Link">
              Week 08
            </a>
            <a target="_blank" href="/~toffermann/data/week09.html" className="Link">
              Week 09
            </a>
            <a target="_blank" href="/~toffermann/data/week10.html" className="Link">
              Week 10
            </a>
            <a target="_blank" href="/~toffermann/data/week11.html" className="Link">
              Week 11
            </a>
            <a target="_blank" href="/~toffermann/data/week12.html" className="Link">
              Week 12
            </a>
            <a target="_blank" href="/~toffermann/data/week13.html" className="Link">
              Week 13
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default AnW;
