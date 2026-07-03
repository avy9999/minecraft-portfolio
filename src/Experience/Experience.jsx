import { React, Suspense, useEffect, useRef, useState} from 'react'
import { Canvas, useFrame } from '@react-three/fiber';

import { CameraControls, OrbitControls, Environment, View, PerspectiveCamera, useHelper } from '@react-three/drei';

import * as THREE from "three";

import Model from "./models/MineT";

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
    lerpFactor}) => {
    const cameraCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-19, 2, 8),
        new THREE.Vector3(-17, 2, 8),
        new THREE.Vector3(-13, 2, 8),
        new THREE.Vector3(-12, 2, 8), //open door
        new THREE.Vector3(-7, 2, 8),
        new THREE.Vector3(-5, 3, 8),
        new THREE.Vector3(-4, 3, 5),
        new THREE.Vector3(0, 0, 5),
        new THREE.Vector3(2, -0.6, 5),
        new THREE.Vector3(2, -0.6, 7),
        new THREE.Vector3(2, -1, 9), //2nd door
        new THREE.Vector3(5.6, -1.5, 8.4),
        new THREE.Vector3(7, -1.3, 9),
        new THREE.Vector3(9, -1.3, 6),
        new THREE.Vector3(7, -1.3, 9),
        new THREE.Vector3(5.6, -1.5, 8.4),
        new THREE.Vector3(2, -1, 9),
        new THREE.Vector3(2, -0.6, 7),
        new THREE.Vector3(2, -0.6, 5),
        new THREE.Vector3(0, 0, 5),
        new THREE.Vector3(-3.9, 2.5, 7.6),
        new THREE.Vector3(3.7, 2.6, 8.2),
        new THREE.Vector3(7.4, 2.6, 7.5),
        new THREE.Vector3(7.4, 2.6, 8.5),
        new THREE.Vector3(3.7, 2.6, 8.2),
        new THREE.Vector3(-0.6, 3, 8),

        new THREE.Vector3(-13, 2, 8),
        new THREE.Vector3(-17, 2, 8),
        new THREE.Vector3(-19, 2, 8),
        
    ]);
    useFrame(()=>{
        if (camera){
            // console.log("position");
            // console.log(camera.current.position);

            const newProgress = THREE.MathUtils.lerp(scrollProgress, targetScrollProgress.current, lerpFactor);

            setscrollProgress(newProgress);

            const point = cameraCurve.getPoint(newProgress);

            camera.current.position.copy(point);
        }
    });
    return (
        <>
        <DebugCurve curve={cameraCurve}/>
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
        />
        <Suspense fallback={null}>
            <Model />
        </Suspense>
        </>
    );
}

const Experience = () => {
    const controls1 = useRef();
    const camera1 = useRef();

    const [scrollProgress, setscrollProgress] = useState(0);
    const scrollSpeed = 0.00005;
    const targetScrollProgress = useRef(0);
    const lerpFactor = 0.1;

    const isSwiping = useRef(false);

    useEffect(() => {
        const handleWheel = (e) => {
            targetScrollProgress.current = targetScrollProgress.current + (e.deltaY) * scrollSpeed;
        }

        const handlePointerDown = ()=>{
            isSwiping.current = true;
        }

        const handlePointerMove = (e)=>{
            if (!isSwiping.current) return;
            targetScrollProgress.current = targetScrollProgress.current + (e.movementY) * scrollSpeed;
        }

        const handlePointerUp = ()=>{
            isSwiping.current = false;
        }

        window.addEventListener("wheel", handleWheel);
        window.addEventListener("pointerdown", handlePointerDown);
        window.addEventListener("pointermove", handlePointerMove);
        window.addEventListener("pointerup", handlePointerUp);

        return () =>{
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("pointerdown", handlePointerDown);
            window.removeEventListener("pointermove", handlePointerMove);
            window.removeEventListener("pointerup", handlePointerUp);
        }
    }, []);

  return (
    <>
    {/* <CameraControls ref={controls}/> */}
        <Canvas
        eventSource={document.getElementById("root")}>
            <Scene camera={camera1}
            scrollProgress = {scrollProgress}
            setscrollProgress = {setscrollProgress}
            targetScrollProgress = {targetScrollProgress}
            lerpFactor = {lerpFactor}/>
            <PerspectiveCamera ref={camera1} makeDefault fov={70} position={[0, 5, 0]}/>
            <OrbitControls ref={controls1}  camera={camera1.current}/>
        </Canvas>
    </>
  );
}

export default Experience;