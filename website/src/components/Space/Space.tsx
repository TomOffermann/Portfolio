import "./Space.css";
import { Canvas } from "@react-three/fiber";
import Earth from "./../Earth/Earth";
import { Outlet } from "react-router-dom";
import Moon from "../Moon/Moon";
import Comet from "../Comet/Comet";

interface SpaceProps {
  onSubPage: boolean;
}

function Space(props: SpaceProps) {
  return (
    <>
      <Outlet />
      <Canvas>
        <directionalLight
          position={[2, 0.3, 2]}
          intensity={5}
          color={0xffefc4}
        />
        <ambientLight intensity={0.6} />
        <Earth onSubPage={props.onSubPage} position={[-5, -1, -3]} />
        <Moon onSubPage={props.onSubPage} />
        <Comet onSubPage={props.onSubPage} xR={20} yR={14} />
      </Canvas>
    </>
  );
}

export default Space;
