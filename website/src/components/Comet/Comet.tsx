import { MeshProps, useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as three from "three";

type CometProps = MeshProps & { onSubPage: boolean, xR:number, yR:number };

function Comet(props: CometProps) {
  const { scene } = useThree();
  const ref = useRef<three.Mesh>(null!);

  let comet = new three.EllipseCurve(-5, -3, props.xR, props.yR, 0, 2 * Math.PI, false);
  let points = 1000;
  let cometPoints = comet.getSpacedPoints(points);

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

  const cometGeometry = new three.BufferGeometry().setFromPoints(
    cometPoints.map((e) => extend(e))
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

  let cometMaterial = new three.LineBasicMaterial({ color: 0xff0000 });

  let moonLine = new three.Line(cometGeometry, cometMaterial);

  let frame = 0;

  useFrame((state, delta) => {
    frame += 1;
    let f = Math.floor(frame % points);
    let v = extend(cometPoints[f]);
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

export default Comet;
