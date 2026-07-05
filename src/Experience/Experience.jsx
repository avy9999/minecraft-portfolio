import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

import {
  OrbitControls,
  Environment,
  PerspectiveCamera,
} from "@react-three/drei";

import * as THREE from "three";

import Model from "./models/MineT";
import cameraKeyframes from "../data/cameraKeyframes.json";
import { useModalStore } from "./stores/modalStore";

const CAMERA_POS_SMOOTH = 0.08;
const CAMERA_ROT_SMOOTH = 0.08;
const MOUSE_SMOOTH = 0.12;

/* ---------------- CAMERA SCENE ---------------- */

const Scene = ({ camera, progressRef, recordMode, mouseOffset }) => {
  const [pulseIntensity] = useState(0);

  const getInterpolatedFrame = (progress) => {
    if (!cameraKeyframes.length) return null;

    for (let i = 0; i < cameraKeyframes.length - 1; i++) {
      const start = cameraKeyframes[i];
      const end = cameraKeyframes[i + 1];

      if (progress >= start.progress && progress <= end.progress) {
        const t =
          (progress - start.progress) /
          (end.progress - start.progress);

        return {
          position: new THREE.Vector3().lerpVectors(
            new THREE.Vector3(...start.position),
            new THREE.Vector3(...end.position),
            t
          ),

          quaternion: new THREE.Quaternion()
            .copy(new THREE.Quaternion(...start.quaternion))
            .slerp(new THREE.Quaternion(...end.quaternion), t),
        };
      }
    }

    const last = cameraKeyframes[cameraKeyframes.length - 1];

    return {
      position: new THREE.Vector3(...last.position),
      quaternion: new THREE.Quaternion(...last.quaternion),
    };
  };

  useFrame((state) => {
    if (!camera?.current) return;

    /* ---------------- SMOOTH INFINITE SCROLL ---------------- */

    const p = progressRef.current;

    progressRef.current.current +=
      (progressRef.current.target - progressRef.current.current) * 0.03;

    const smooth = progressRef.current.current;

    const progressLooped = THREE.MathUtils.euclideanModulo(smooth, 1);

    const frame = getInterpolatedFrame(progressLooped);
    if (!frame) return;

    /* ---------------- CAMERA POSITION ---------------- */

    const finalPosition = frame.position.clone();

    const offsetX = THREE.MathUtils.lerp(
      camera.current.userData.offsetX || 0,
      mouseOffset.current.x,
      MOUSE_SMOOTH
    );

    const offsetY = THREE.MathUtils.lerp(
      camera.current.userData.offsetY || 0,
      mouseOffset.current.y,
      MOUSE_SMOOTH
    );

    camera.current.userData.offsetX = offsetX;
    camera.current.userData.offsetY = offsetY;

    finalPosition.add(new THREE.Vector3(offsetX, offsetY, 0));

    camera.current.position.lerp(finalPosition, CAMERA_POS_SMOOTH);

    if (!recordMode) {
      camera.current.quaternion.slerp(frame.quaternion, CAMERA_ROT_SMOOTH);
    }

    progressRef.current.looped = progressLooped;
  });

  return (
    <>
      <directionalLight
        position={[20, 30, -10]}
        intensity={1.8}
        color={"#ffb37a"}
        castShadow
      />

      <ambientLight intensity={0.25} color={"#ffe0c2"} />

      <hemisphereLight
        skyColor={"#ffd7b0"}
        groundColor={"#2b1b12"}
        intensity={0.4}
      />

      <Environment
        background
        backgroundRotation={[0, Math.PI * 1.65, 0]}
        files={[
          "/cubemap/px.webp",
          "/cubemap/nx.webp",
          "/cubemap/py.webp",
          "/cubemap/ny.webp",
          "/cubemap/pz.webp",
          "/cubemap/nz.webp",
        ]}
        environmentIntensity={0.8}
      />

      <Suspense fallback={null}>
        <Model
          progress={progressRef.current.looped || 0}
          pulseIntensity={1}
        />
      </Suspense>
    </>
  );
};

/* ---------------- MAIN EXPERIENCE ---------------- */

const Experience = () => {
  const controls1 = useRef();
  const camera1 = useRef();

  const RECORD_MODE = false;

  /* ---------------- FIXED REF STRUCTURE ---------------- */

  const progressRef = useRef({
    current: 0,
    target: 0,
    looped: 0,
  });

  const scrollSpeed = 0.00003;
  const isSwiping = useRef(false);
  const mouseOffset = useRef({ x: 0, y: 0 });

  const { isModalOpen } = useModalStore();

  /* ---------------- INPUT ---------------- */

  useEffect(() => {
    const handleWheel = (e) => {
      if (isModalOpen) return;
      progressRef.current.target += e.deltaY * scrollSpeed;
    };

    const handlePointerDown = () => {
      if (isModalOpen) return;
      isSwiping.current = true;
    };

    const handlePointerMove = (e) => {
      if (!isSwiping.current) return;
      progressRef.current.target += e.movementY * scrollSpeed;
    };

    const handlePointerUp = () => {
      isSwiping.current = false;
    };

    const handleMouseMove = (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = (e.clientY / window.innerHeight) * 2 - 1;

      mouseOffset.current.x = mouseX * 0.2;
      mouseOffset.current.y = mouseY * 0.2;
    };

    window.addEventListener("wheel", handleWheel);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [isModalOpen]);

  /* ---------------- RENDER ---------------- */

  return (
    <Canvas
      gl={{
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.15,
      }}
      eventSource={document.getElementById("root")}
    >
      <fog attach="fog" args={["#f6d6b8", 60, 140]} />

      <Scene
        camera={camera1}
        progressRef={progressRef}
        recordMode={RECORD_MODE}
        mouseOffset={mouseOffset}
      />

      <PerspectiveCamera
        ref={camera1}
        makeDefault
        fov={70}
        position={[0, 5, 0]}
      />

      <OrbitControls ref={controls1} enabled={RECORD_MODE} />
    </Canvas>
  );
};

export default Experience;