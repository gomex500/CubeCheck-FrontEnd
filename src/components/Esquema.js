import React, {useRef, useEffect} from "react";
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const Esquema = () =>{

    const mountRef = useRef(null);


    useEffect(() =>{

        const currentRef = mountRef.current;
        const {clientWidth: width, clientHeight: height} = currentRef;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(25, width / height, 0.1, 100);
        scene.add(camera);
        camera.position.z = 25;
        camera.position.x = 20;
        camera.position.y = 8;
        camera.lookAt(new THREE.Vector3(0,0,0));

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        currentRef.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;

        const Resize = () =>{
            const updateWidth = currentRef.clientWidth;
            const updateHeight = currentRef.clientHeight;
            renderer.setSize(updateWidth, updateHeight);
            camera.aspect = updateWidth / updateHeight;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', Resize);

        const animateScene = () =>{
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animateScene);
        }
        animateScene();

        const axesHelper = new THREE.AxesHelper(2);
        scene.add(axesHelper);

        const size = 20;
        const divisions = 20;
        const gridHelper = new THREE.GridHelper(size, divisions);
        scene.add(gridHelper);

        const geometry = new THREE.BoxGeometry(10,1,10);
        const geometry2 = new THREE.BoxGeometry(1,6,1);
        
        const material = new THREE.MeshBasicMaterial({
            color: 0xc1c1c1
        });
        const material2 = new THREE.MeshBasicMaterial({
            color: 0xfcffff
        });
        const cube = new THREE.Mesh(geometry, material);
        const cube1 = new THREE.Mesh(geometry2, material);
        const cube2 = new THREE.Mesh(geometry2, material);
        const cube3 = new THREE.Mesh(geometry2, material);
        const cube4 = new THREE.Mesh(geometry2, material);
        scene.add(cube, cube1, cube2, cube3, cube4);
        cube.position.set(1,0.5,1);
        cube1.position.set(-3.5,3,-3.5);
        cube2.position.set(-3.5,3,5.5);
        cube3.position.set(5.5,3,5.5);
        cube4.position.set(5.5,3,-3.5);

        

        return () =>{
            currentRef.removeChild(renderer.domElement);
            window.addEventListener('resize', Resize);
        }

    },[]);

    return <div ref={mountRef} style={{width: "100%", height: "300px"}}></div>;
}

export default Esquema;