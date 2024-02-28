import * as three from "three";
import { MeshProps, useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";

/*
  This Component should generalize a "Rock" in Space so 
  there is not always the need for a Moon or new Jupiter
  class whenever we decide to add a new planet
*/

export enum TPlanet {
  Earth,
  Sun,
  Moon,
}

type PlanetProps = MeshProps & {
  planetType: TPlanet;
  initialPosition: three.Vector3; // Initial Position on the trajectory
  radius: number; // Radius of the planet
  onSubPage: boolean; // State that keeps track of the current animation
  xRadius: number; // Radius of the ellipse in the x-direction
  yRadius: number; // Radius of the ellipse in the y-direction
  rotationAxis: three.Vector3; // Rotation-axis of the planets own rotation
  rotationAngle: number; // Initial rotation angle
  rotationAxisTraj: three.Vector3; // Rotation-axis in respect to the sun
  rotationAmountTraj: number; // Rotation amount not an angle per say :)
  color: number; // Color of the trajectory of the planet
  origin: three.Vector3; // Middle point of the ellipse (suns coords)
  scene: three.Scene; // Pass-through scene from top components
  texture: string; // Planet texture
  heightMap: string; // Planet height map
  rotationSpeed: number; // Rotation speed of the planet (around the sun)
  curveSpeed: number; // Speed at which the planet moves along it's orbit
  curveResolution: number; // How many points are used to render the curve
};

function Planet(props: PlanetProps) {
  const ref = useRef<three.Mesh>(null!);

  const [x, setX] = useState(0);

  useFrame(() => {
    ref.current.position.x = three.MathUtils.lerp(
      ref.current.position.x,
      props.onSubPage ? x + 11 : x,
      0.01
    );
  });

  useEffect(() => {
    setX(ref.current.position.x);
  }, []);

  return (
    <>
      <mesh {...props} ref={ref} scale={1}>
        <Trajectory {...props} />
        <PlanetMesh position={props.initialPosition} {...props} />
      </mesh>
    </>
  );
}

function Trajectory(props: PlanetProps) {
  const ref = useRef<three.Mesh>(null!);

  function rotateAboutPoint(
    obj: three.Vector3,
    point: three.Vector3,
    axis: three.Vector3,
    theta: number
  ): void {
    obj.sub(point);
    obj.applyAxisAngle(axis, theta);
    obj.add(point);
  }

  let extend = (v: three.Vector2): three.Vector3 => {
    let res = new three.Vector3(v.x, props.origin.y, v.y);
    rotateAboutPoint(
      res,
      props.origin,
      props.rotationAxisTraj,
      props.rotationAmountTraj
    );
    return res;
  };

  useEffect(() => {
    let planetTrajectory = new three.EllipseCurve(
      props.origin.x,
      props.origin.z,
      props.xRadius,
      props.yRadius,
      0,
      2 * Math.PI,
      false
    );

    let points = props.curveResolution;
    let planet2dPoints = planetTrajectory.getSpacedPoints(points);

    const planetGeometry = new three.BufferGeometry().setFromPoints(
      planet2dPoints.map((e) => extend(e))
    );

    let planetMaterial = new three.LineBasicMaterial({ color: props.color });
    let planetLine = new three.Line(planetGeometry, planetMaterial);

    ref.current.add(planetLine);
  }, []);

  return <mesh ref={ref}></mesh>;
}

function PlanetMesh(props: PlanetProps) {
  const ref = useRef<three.Mesh>(null!);

  const txt = useLoader(three.TextureLoader, props.texture);
  const hMap = useLoader(three.TextureLoader, props.heightMap);

  const [i, setI] = useState(0);

  let planetTrajectory = new three.EllipseCurve(
    props.origin.x,
    props.origin.z,
    props.xRadius,
    props.yRadius,
    0,
    2 * Math.PI,
    false
  );

  function rotateAboutPoint(
    obj: three.Vector3,
    point: three.Vector3,
    axis: three.Vector3,
    theta: number
  ): void {
    obj.sub(point);
    obj.applyAxisAngle(axis, theta);
    obj.add(point);
  }

  let extend = (v: three.Vector2): three.Vector3 => {
    let res = new three.Vector3(v.x, props.origin.y, v.y);
    rotateAboutPoint(
      res,
      props.origin,
      props.rotationAxisTraj,
      props.rotationAmountTraj
    );
    return res;
  };

  let points = props.curveResolution;
  let planet2dPoints = planetTrajectory.getSpacedPoints(points);

  useFrame(() => {
    if (props.planetType == TPlanet.Moon) {
      ref.current.position.copy(extend(planet2dPoints[Math.floor(i)]));
      setI((i + props.curveSpeed) % points);
    }
    props.onSubPage
      ? ref.current.rotateOnAxis(props.rotationAxis, 0.005)
      : ref.current.rotateOnAxis(props.rotationAxis, 0.003);
  });

  return (
    <>
      <mesh receiveShadow {...props} ref={ref} scale={1}>
        <sphereGeometry args={[props.radius, 1440, 720]} />
        <meshPhongMaterial
          map={txt}
          displacementMap={hMap}
          displacementScale={0.03}
        />
      </mesh>
    </>
  );
}

export default Planet;
