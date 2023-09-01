import "./Moon.css";
import { MeshProps, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as three from "three";

type MoonProps = MeshProps & { onSubPage: boolean };

function Moon(props: MoonProps) {
  const { scene } = useThree();
  const ref = useRef<three.Mesh>(null!);

  let moon = new three.EllipseCurve(-5, -3, 10, 10, 0, 2 * Math.PI, false);
  let points = 1000;
  let moonPoints = moon.getSpacedPoints(points);

  let extend = (v: three.Vector2): three.Vector3 => {
    let res = new three.Vector3();
    res.x = v.x;
    res.y = -1;
    res.z = v.y;
    rotateAboutPoint(
      res,
      new three.Vector3(-5, -1, -3),
      new three.Vector3(Math.SQRT1_2, Math.SQRT1_2, 0),
      1.2
    );
    return res;
  };

  const moonGeometry = new three.BufferGeometry().setFromPoints(
    moonPoints.map((e) => extend(e))
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

  let moonMaterial = new three.LineBasicMaterial({ color: 0xff0000 });

  let moonLine = new three.Line(moonGeometry, moonMaterial);

  let frame = 0;

  useFrame((state, delta) => {
    frame += 1;
    let f = Math.floor(frame % points);
    let v = extend(moonPoints[f]);
    ref.current.position.x = v.x;
    ref.current.position.y = v.y;
    ref.current.position.z = v.z;
  });

  scene.add(moonLine);

  return (
    <>
      <mesh {...props} ref={ref} scale={2.2}>
        <sphereGeometry args={[0.2, 720, 320]} />
        <meshStandardMaterial displacementScale={0.03} color="white" />
      </mesh>
    </>
  );
}

export default Moon;
