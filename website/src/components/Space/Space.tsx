import "./Space.css";
import Planet, { TPlanet } from "../Planet/Planet";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as three from "three";

import { Outlet } from "react-router-dom";
import { useRef } from "react";

import bg from "./../../2k_stars.jpg";
import sunTxt from "./../../2k_sun.jpg";
import moonTxt from "./../../2k_moon.jpg";
import earthTxt from "./../../worldColour.5400x2700.jpg";
import earthHMap from "./../../srtm_ramp2.world.5400x2700.jpg";

interface SpaceProps {
  onSubPage: boolean;
  sunCoords: number;
}

function SpaceSub(props: SpaceProps) {
  const { camera, gl, scene } = useThree();
  const ref = useRef<three.Mesh>(null!);

  new three.CubeTextureLoader().load(
    [bg, bg, bg, bg, bg, bg],
    (b) => (scene.background = b)
  );

  const controls = new OrbitControls(camera, gl.domElement);
  controls.screenSpacePanning = true;
  controls.rotateSpeed = 0.1;
  controls.zoomSpeed = 0.1;

  const distanceSunfromLight: number = 25 + 80;
  const sunCoords = new three.Vector3(props.sunCoords, -1, props.sunCoords);
  const moonRadius = 15;
  const earthRadius = Math.sqrt(
    (props.sunCoords + 5) * (props.sunCoords + 5) +
      (props.sunCoords + 3) * (props.sunCoords + 3)
  );

  useFrame(() => {
    controls.update();
  });

  return (
    <mesh ref={ref}>
      <ambientLight intensity={0.3} />
      <pointLight
        position={
          new three.Vector3(
            props.sunCoords,
            -1 - distanceSunfromLight,
            props.sunCoords
          )
        }
        color={0xfaefb6}
        intensity={100000}
      />
      <pointLight
        position={
          new three.Vector3(
            props.sunCoords,
            distanceSunfromLight - 1,
            props.sunCoords
          )
        }
        color={0xfaefb6}
        intensity={100000}
      />
      <pointLight
        position={
          new three.Vector3(
            props.sunCoords + distanceSunfromLight,
            -1,
            props.sunCoords
          )
        }
        color={0xfaefb6}
        intensity={100000}
      />
      <pointLight
        position={
          new three.Vector3(
            props.sunCoords,
            -1,
            props.sunCoords + distanceSunfromLight
          )
        }
        color={0xfaefb6}
        intensity={100000}
      />
      <pointLight
        position={
          new three.Vector3(
            props.sunCoords,
            -1,
            props.sunCoords - distanceSunfromLight
          )
        }
        color={0xfaefb6}
        intensity={100000}
      />
      <pointLight
        position={
          new three.Vector3(
            props.sunCoords - distanceSunfromLight,
            -1,
            props.sunCoords
          )
        }
        color={0xfaefb6}
        intensity={100000}
      />
      <Planet
        planetType={TPlanet.Sun}
        initialPosition={sunCoords}
        radius={25}
        onSubPage={props.onSubPage}
        xRadius={0}
        yRadius={0}
        rotationAxis={new three.Vector3(0, 0, 0)}
        rotationAngle={0}
        rotationAxisTraj={new three.Vector3(0, 1, 0)}
        rotationAmountTraj={0}
        color={0xffbbaa}
        origin={sunCoords}
        scene={scene}
        texture={sunTxt}
        heightMap={earthHMap}
        rotationSpeed={1}
        curveSpeed={0}
        curveResolution={1000}
      />
      <Planet
        planetType={TPlanet.Earth}
        initialPosition={new three.Vector3(-5, -1, -3)}
        radius={2.5}
        onSubPage={props.onSubPage}
        xRadius={earthRadius}
        yRadius={earthRadius}
        rotationAxis={new three.Vector3(0.1, 1, 0)}
        rotationAngle={1}
        rotationAxisTraj={new three.Vector3(0, 1, 0)}
        rotationAmountTraj={0}
        color={0xffbbaa}
        origin={sunCoords}
        scene={scene}
        texture={earthTxt}
        heightMap={earthHMap}
        rotationSpeed={1}
        curveSpeed={0}
        curveResolution={1000}
      />
      <Planet
        planetType={TPlanet.Moon}
        initialPosition={new three.Vector3(-5 + moonRadius - 0.25, -1, -3)}
        radius={0.5}
        onSubPage={props.onSubPage}
        xRadius={moonRadius}
        yRadius={moonRadius}
        rotationAxis={new three.Vector3(1, 1, 0)}
        rotationAngle={0}
        rotationAxisTraj={new three.Vector3(0.1, 1, 0.1)}
        rotationAmountTraj={0.3}
        color={0xffbbaa}
        origin={new three.Vector3(-5, -1, -3)}
        scene={scene}
        texture={moonTxt}
        heightMap={earthHMap}
        rotationSpeed={1}
        curveSpeed={0.25}
        curveResolution={10000}
      />
    </mesh>
  );
}

function Space(props: SpaceProps) {
  return (
    <>
      <Outlet />
      <Canvas shadows={true}>
        <SpaceSub {...props} />
      </Canvas>
    </>
  );
}

export default Space;
