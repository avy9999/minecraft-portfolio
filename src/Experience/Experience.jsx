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

    const rotationTargets = [
        {progress: 0, rotation: new THREE.Euler(-1.85,-1.47,-1.85)},
        {progress: 0.1, rotation: new THREE.Euler(-1.87, -1.49, -1.87)},
        {progress: 0.17, rotation: new THREE.Euler(-0.34, -0.92, -0.27)},
        {progress: 0.19, rotation: new THREE.Euler(-0.25, 0.03, 0.01)},
        {progress: 0.20, rotation: new THREE.Euler(-1.68, 1.32, 1.69)},
        {progress: 0.22, rotation: new THREE.Euler(-2.92, -0.19,-3.09)},
        {progress: 0.25, rotation: new THREE.Euler(-1.65, -1.24, -1.66)},
        {progress: 0.3, rotation: new THREE.Euler(-1.72, -1.39, -1.73)},
        {progress: 0.37, rotation: new THREE.Euler(-1.47, -1.24, -1.47)},
        {progress: 0.4, rotation: new THREE.Euler(-2.03, -1.37, -2.04)},
        {progress: 0.44, rotation: new THREE.Euler(-0.18, -0.46, -0.08)},
        {progress: 0.47, rotation: new THREE.Euler(-0.18, 0.38, 0.07)},
        {progress: 0.47, rotation: new THREE.Euler(-1.66, 1.42, 1.66)},
        {progress: 0.48, rotation: new THREE.Euler(-2.76, 1.19, 2.78)},
        {progress: 0.52, rotation: new THREE.Euler(-1.69, 1.37, 1.69)},
        {progress: 0.55, rotation: new THREE.Euler(-0.40, 1.26, 0.38)},
        {progress: 0.58, rotation: new THREE.Euler(-0.18, -0.45, -0.08)},
        {progress: 0.61, rotation: new THREE.Euler(-0.16, 0.63, 0.09)},
        {progress: 0.64, rotation: new THREE.Euler(1.28, 1.44, -1.28)},
        {progress: 0.70, rotation: new THREE.Euler(-3.07, 0.54, 3.10)},
        {progress: 0.71, rotation: new THREE.Euler(-2.54, -1.06, -2.59)},
        {progress: 0.73, rotation: new THREE.Euler(-1.69, -1.27, -1.70)},
        {progress: 0.76, rotation: new THREE.Euler(-2.82, -1.08, -2.85)},
        {progress: 0.78, rotation: new THREE.Euler(-0.61, -1.21, -0.57)},
        {progress: 0.82, rotation: new THREE.Euler(-0.17, 0.56, 0.09)},
        {progress: 0.76, rotation: new THREE.Euler(-1.42, 1.35, 1.42)},
        {progress: 0.74, rotation: new THREE.Euler(-3.05, 1.17, 3.05)},
        {progress: 0.73, rotation: new THREE.Euler(-3.00, 0.33, 3.09)},
        {progress: 0.72, rotation: new THREE.Euler(-2.98, -0.85, -3.02)},
        {progress: 0.71, rotation: new THREE.Euler(-2.76, -1.42, -2.77)},
        {progress: 0.90, rotation: new THREE.Euler(-2.85, -1.49, -2.85)}
    ];

    const getLerpedRotation = (progress) => {
        for (let i = 0; i < rotationTargets.length - 1; i++){
            const start = rotationTargets[i];
            const end = rotationTargets[i+1];

            if (progress >= start.progress && progress <= end.progress){
                const lerpFactor = (progress-start.progress) / (end.progress - start.progress);
                return new THREE.Euler(
                    THREE.MathUtils.lerp(start.rotation.x, end.rotation.x, lerpFactor),
                    THREE.MathUtils.lerp(start.rotation.y, end.rotation.y, lerpFactor),
                    THREE.MathUtils.lerp(start.rotation.z, end.rotation.z, lerpFactor)
                );
            }
        }
    }

    useFrame(()=>{
        if (camera){
            // console.log("position");
            // console.log(camera.current.position);

            // const newProgress = THREE.MathUtils.lerp(scrollProgress, targetScrollProgress.current, lerpFactor);

            // setscrollProgress(newProgress);

            // const point = cameraCurve.getPoint(newProgress);

            // camera.current.position.copy(point);

            const newProgress = THREE.MathUtils.clamp(
                THREE.MathUtils.lerp(
                    scrollProgress,
                    targetScrollProgress.current,
                    lerpFactor
                ),
                0,
                1
            );

            setscrollProgress(newProgress);

            console.log("newProgress");
            console.log(newProgress);
            console.log("rotation");
            console.log(camera.current.rotation);

            const point = cameraCurve.getPoint(newProgress);

            if (point && camera.current) {
                camera.current.position.copy(point);
            }

            const targetRotation = getLerpedRotation(newProgress);

            if (targetRotation) {
                camera.current.rotation.copy(targetRotation);
            }
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
        // const handleWheel = (e) => {
        //     targetScrollProgress.current = targetScrollProgress.current + (e.deltaY) * scrollSpeed;
        // }

        const handleWheel = (e) => {
            targetScrollProgress.current = THREE.MathUtils.clamp(
                targetScrollProgress.current + e.deltaY * scrollSpeed,
                0,
                1
            );
        };

        const handlePointerMove = (e) => {
            if (!isSwiping.current) return;

            targetScrollProgress.current = THREE.MathUtils.clamp(
                targetScrollProgress.current + e.movementY * scrollSpeed,
                0,
                1
            );
        };

        const handlePointerDown = ()=>{
            isSwiping.current = true;
        }

        // const handlePointerMove = (e)=>{
        //     if (!isSwiping.current) return;
        //     targetScrollProgress.current = targetScrollProgress.current + (e.movementY) * scrollSpeed;
        // }

        const handlePointerUp = ()=>{
            isSwiping.current = false;
        }

        window.addEventListener("wheel", handleWheel);
        // window.addEventListener("pointerdown", handlePointerDown);
        // window.addEventListener("pointermove", handlePointerMove);
        // window.addEventListener("pointerup", handlePointerUp);

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
            <OrbitControls ref={controls1}/>
        </Canvas>
    </>
  );
}

export default Experience;