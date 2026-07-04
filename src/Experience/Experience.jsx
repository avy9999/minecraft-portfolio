import { React, Suspense, useEffect, useRef, useState} from 'react'
import { Canvas, useFrame } from '@react-three/fiber';

import { CameraControls, OrbitControls, Environment, View, PerspectiveCamera, useHelper } from '@react-three/drei';

import * as THREE from "three";

import Model from "./models/MineT";
import cameraKeyframes from "../data/cameraKeyframes.json";

const CAMERA_POS_SMOOTH = 0.08;
const CAMERA_ROT_SMOOTH = 0.08;
const MOUSE_SMOOTH = 0.12;

const CameraHelper = ({cameraRef}) => {
    useHelper(cameraRef, THREE.CameraHelper);

    return null;
}

const DebugCurve = ({curve}) =>{
    const points = curve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    return (
        <line geometry={geometry}>
            <lineBasicMaterial color={"red"} />
        </line>
    );
}

const Scene = ({
    camera,
    scrollProgress,
    setscrollProgress,
    targetScrollProgress,
    lerpFactor,
    recordMode,
    mouseOffset
}) => {
    const [pulseIntensity, setPulseIntensity] = useState(0);
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
                        .slerp(
                            new THREE.Quaternion(...end.quaternion),
                            t
                        )
                };
            }
        }

        const last = cameraKeyframes[cameraKeyframes.length - 1];

        return {
            position: new THREE.Vector3(...last.position),
            quaternion: new THREE.Quaternion(...last.quaternion)
        };
    };

    useFrame((state) => {

        if (!camera?.current) return;

        const newPulseIntensity = (Math.sin(state.clock.elapsedTime*3)+1)/2;
        setPulseIntensity(newPulseIntensity);

        let newProgress = THREE.MathUtils.clamp(
            THREE.MathUtils.lerp(
                scrollProgress,
                targetScrollProgress.current,
                lerpFactor
            ),
            0,
            1
        );

        if (newProgress > 1){
            newProgress = 0;
            targetScrollProgress.current = 0;
        } else if(newProgress < 0){
            newProgress = 1;
            targetScrollProgress.current = 1;
        }

        setscrollProgress(newProgress);

        // console.log("newProgress");        
        // console.log(newProgress);        
        // console.log("rotation");
        // console.log(camera.current.rotation);

        const frame = getInterpolatedFrame(newProgress);

        if (!frame) return;

        const finalPosition = frame.position.clone();

        // smooth mouse offset
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

        // POSITION smoothing
        camera.current.position.lerp(finalPosition, CAMERA_POS_SMOOTH);

        // ROTATION smoothing (IMPORTANT FIX)
        if (!recordMode) {
            camera.current.quaternion.slerp(frame.quaternion, CAMERA_ROT_SMOOTH);
        }
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
        {/* <DebugCurve curve={cameraCurve}/> */}
        <Environment
        background

        backgroundRotation={[0, Math.PI * 1.65, 0]}

        files={[
            '/cubemap/px.webp',
            '/cubemap/nx.webp',
            '/cubemap/py.webp',
            '/cubemap/ny.webp',
            '/cubemap/pz.webp',
            '/cubemap/nz.webp',
        ]}
        environmentIntensity={0.8}
        />
        <Suspense fallback={null}>
            <Model progress={scrollProgress} pulseIntensity={pulseIntensity}/>
        </Suspense>
        </>
    );
}

const Experience = () => {
    const controls1 = useRef();
    const RECORD_MODE = false;
    const camera1 = useRef();

    const [scrollProgress, setscrollProgress] = useState(0);
    const scrollSpeed = 0.00005;
    const targetScrollProgress = useRef(0);
    const lerpFactor = 0.03;

    const isSwiping = useRef(false);
    const mouseOffset = useRef(new THREE.Vector3());


    useEffect(() => {

        const handleWheel = (e) => {
            targetScrollProgress.current = THREE.MathUtils.clamp(
                targetScrollProgress.current + e.deltaY * scrollSpeed * 0.5,
                0,
                1
            );
        };

        const handlePointerDown = () => {
            isSwiping.current = true;
        };

        const handlePointerMove = (e) => {
            if (!isSwiping.current) return;

            targetScrollProgress.current = THREE.MathUtils.clamp(
                targetScrollProgress.current + e.movementY * scrollSpeed,
                0,
                1
            );
        };

        const handlePointerUp = () => {
            isSwiping.current = false;
        };

        const handleMouseMove = (e) => {
            const mouseX = (e.clientX / window.innerWidth) *2 -1;
            const mouseY = (e.clientY / window.innerHeight) *2 -1;

            const sensitivityX = 0.2;
            const sensitivityY = 0.2;

            mouseOffset.current.x = mouseX * sensitivityX;
            mouseOffset.current.y = mouseY * sensitivityY;
        };

        window.addEventListener("wheel", handleWheel);
        window.addEventListener("mousemove", handleMouseMove);
        // window.addEventListener("pointerdown", handlePointerDown);
        // window.addEventListener("pointermove", handlePointerMove);
        // window.addEventListener("pointerup", handlePointerUp);

        return () => {
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("pointerdown", handlePointerDown);
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
        };

    }, []);

  return (
    <>
    {/* <CameraControls ref={controls}/> */}
        <Canvas
        gl={{
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.15
        }}
        eventSource={document.getElementById("root")}>
            <fog attach="fog" args={["#f6d6b8", 60, 140]} />
            <Scene
                camera={camera1}
                scrollProgress={scrollProgress}
                setscrollProgress={setscrollProgress}
                targetScrollProgress={targetScrollProgress}
                lerpFactor={lerpFactor}
                recordMode={RECORD_MODE}
                mouseOffset={mouseOffset}
            />
            <PerspectiveCamera ref={camera1} makeDefault fov={70} position={[0, 5, 0]}/>
            <OrbitControls
                ref={controls1}
                enabled={RECORD_MODE}
            />
        </Canvas>
    </>
  );
}

export default Experience;