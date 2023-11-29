import React, {useRef, useEffect} from "react";
import * as THREE from 'three';
// import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import fondo from '../img/fondo2.png'

const EsquemaHome = () =>{

    const mountRef = useRef(null);

    useEffect(() => {
        const currentRef = mountRef.current;
        const {clientWidth: width, clientHeight: height} = currentRef;

        ///scena
        const scene = new THREE.Scene();
        // scene.background = new THREE.Color(0xffffff);

        var loader = new THREE.TextureLoader();

        loader.load(fondo, texture =>{
            scene.background = texture;
        })
      
        const camera = new THREE.PerspectiveCamera(5, width / height, 0.1, 100);
        scene.add(camera);
        camera.position.z = 2;
        camera.position.x = 20;
        camera.position.y = 10;
        camera.lookAt(new THREE.Vector3(0,0,0));

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        currentRef.appendChild(renderer.domElement);

        // const controls = new OrbitControls(camera, renderer.domElement);
        // controls.enableDamping = true;

        const Resize = () =>{
            const updateWidth = currentRef.clientWidth;
            const updateHeight = currentRef.clientHeight;
            renderer.setSize(updateWidth, updateHeight);
            camera.aspect = updateWidth / updateHeight;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', Resize);

        // const axesHelper = new THREE.AxesHelper(2);
        // scene.add(axesHelper);

        // const size = 10;
        // const divisions = 10;
        // const gridHelper = new THREE.GridHelper(size, divisions);
        // scene.add(gridHelper);

        const geometry = new THREE.DodecahedronGeometry(1);

        const material = new THREE.MeshPhongMaterial({ color: 0x4d82bc, wireframe:true});
        material.wireframeLinewidth = 4;

        const cube = new THREE.Mesh(geometry, material);

        scene.add(cube);

        const ambientLight = new THREE.AmbientLight(0x4d82bc, 10);
        scene.add(ambientLight);

        const light = new THREE.PointLight(0x4d82bc, 10000);
        light.position.set(8, 8, 20);
        scene.add(light);

        const clock = new THREE.Clock();

        const animateScene = () =>{
            // controls.update();
            const elapsedTime = clock.getElapsedTime();
            cube.rotation.y = elapsedTime;
            cube.rotation.x = elapsedTime;
            cube.position.y = Math.sin(elapsedTime);
            renderer.render(scene, camera);
            requestAnimationFrame(animateScene);
        }
        animateScene();

        return () =>{
            currentRef.removeChild(renderer.domElement);
            window.addEventListener('resize', Resize);
        }

    }, [])
    

    return <div>
        <div ref={mountRef} className={"esquema2"}></div>
    </div>
}

export default EsquemaHome;