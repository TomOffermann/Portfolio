import { useState } from "react";
import "./ToolSelector.css";

interface ToolSelectorProps {
  names: string[];
  components: React.FC[];
}

function ToolSelector(props: ToolSelectorProps) {
  const [current, setCurrent] = useState<number>(0);
  return (
    <>
      <div className={"ToolSelector"}>
        {props.names.map((e, i) => (
          <button
            onClick={() => setCurrent(i)}
            className={
              i === current ? "ToolSelectorItemSelected" : "ToolSelectorItem"
            }
            key={i + " " + e}
          >
            {e}
          </button>
        ))}
      </div>
      {props.components[current]({})}
    </>
  );
}

export default ToolSelector;
