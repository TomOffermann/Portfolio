import "./Earth.css";
import { MeshProps, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as three from "three";
import txt from "./../../worldColour.5400x2700.jpg";
import hMap from "./../../srtm_ramp2.world.5400x2700.jpg";
import bg from "./../../2k_stars.jpg";

type EarthProps = MeshProps & { onSubPage: boolean };

function Earth(props: EarthProps) {
  const { camera, gl, scene } = useThree();
  const ref = useRef<three.Mesh>(null!);
  const texture = useLoader(three.TextureLoader, txt);
  const heightMap = useLoader(three.TextureLoader, hMap);
  new three.CubeTextureLoader().load(
    [bg, bg, bg, bg, bg, bg],
    (b) => (scene.background = b)
  );

  let curve = new three.EllipseCurve(
    100,
    100,
    147.085,
    147.085,
    Math.PI + 0.4,
    Math.PI * 2 - 2,
    false
  );

  let points = curve.getSpacedPoints(200);

  const geometry = new three.BufferGeometry().setFromPoints(
    points.map((e) => {
      let res = new three.Vector3();
      res.x = e.x;
      res.y = -1;
      res.z = e.y;
      return res;
    })
  );

  let material = new three.LineBasicMaterial({ color: 0x00ffaa });

  let line = new three.Line(geometry, material);

  scene.add(line);

  const controls = new OrbitControls(camera, gl.domElement);
  controls.screenSpacePanning = true;
  controls.rotateSpeed = 0.1;
  controls.zoomSpeed = 0.1;

  useFrame(() => {
    controls.update();

    ref.current.position.x = three.MathUtils.lerp(
      ref.current.position.x,
      props.onSubPage ? 5 : -5,
      0.005
    );
    ref.current.rotation.y = three.MathUtils.lerp(
      ref.current.rotation.y,
      !props.onSubPage ? 2 * Math.PI - 1 : 6 * Math.PI - 1 - 1 - 2 * Math.PI,
      0.002
    );
  });

  return (
    <>
      <mesh {...props} ref={ref} scale={2.2}>
        <sphereGeometry args={[1, 720, 320]} />
        <meshStandardMaterial
          map={texture}
          displacementMap={heightMap}
          displacementScale={0.03}
          color="white"
        />
      </mesh>
    </>
  );
}

export default Earth;
