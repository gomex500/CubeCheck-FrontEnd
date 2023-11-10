import React, {useRef, useEffect} from "react";
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {TransformControls} from 'three/examples/jsm/controls/TransformControls';

const Esquema = ({contruccion}) =>{

    const mountRef = useRef(null);


    useEffect(() =>{
        console.log(contruccion);
        const currentRef = mountRef.current;
        const {clientWidth: width, clientHeight: height} = currentRef;

        ///scena
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x252525);

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

        const tcontrols = new TransformControls(camera, renderer.domElement);

        tcontrols.addEventListener('dragging-changed', (e) =>{
            controls.enabled = !e.value;
        });


        const Resize = () =>{
            const updateWidth = currentRef.clientWidth;
            const updateHeight = currentRef.clientHeight;
            renderer.setSize(updateWidth, updateHeight);
            camera.aspect = updateWidth / updateHeight;
            camera.updateProjectionMatrix();
        };

        window.addEventListener('resize', Resize);

        const axesHelper = new THREE.AxesHelper(2);
        scene.add(axesHelper);

        const size = contruccion.embaldosado[0] +5;
        const divisions = contruccion.embaldosado[2] + 5;
        const gridHelper = new THREE.GridHelper(size, divisions);
        scene.add(gridHelper);

        // let x = 10;
        // let y = 1;
        // let z = 10;

        const geometry = new THREE.BoxGeometry(contruccion.embaldosado[0],contruccion.embaldosado[1],contruccion.embaldosado[2]);
        const geometry2 = new THREE.BoxGeometry(0.4,contruccion.altura+0.5,0.4);
        
        const material = new THREE.MeshPhongMaterial({ color: 0x4d82bc });
        // const material = new THREE.MeshBasicMaterial({
        //     color: 0xc1c1c1
        // });
        const material2 = new THREE.MeshBasicMaterial({
            color: 0xfcffff
        });
        const cube = new THREE.Mesh(geometry, material);
        const cube1 = new THREE.Mesh(geometry2, material2);
        const cube2 = new THREE.Mesh(geometry2, material2);
        const cube3 = new THREE.Mesh(geometry2, material2);
        const cube4 = new THREE.Mesh(geometry2, material2);
        const cube5 = new THREE.Mesh(geometry2, material);
        const cube6 = new THREE.Mesh(geometry2, material);
        scene.add(cube, cube1, cube2,cube3, cube4, cube5, cube6);
        cube.position.set(0,0.2,0);
        cube1.position.set(contruccion.pilaresEsquinas[0].x,contruccion.pilaresEsquinas[0].y,contruccion.pilaresEsquinas[0].z);
        cube2.position.set(contruccion.pilaresEsquinas[1].x,contruccion.pilaresEsquinas[1].y,contruccion.pilaresEsquinas[1].z);
        cube3.position.set(contruccion.pilaresEsquinas[2].x,contruccion.pilaresEsquinas[2].y,contruccion.pilaresEsquinas[2].z);
        cube4.position.set(contruccion.pilaresEsquinas[3].x,contruccion.pilaresEsquinas[3].y,contruccion.pilaresEsquinas[3].z);

        //pilares centrales z
        for (let z = 0; z < contruccion.pilaresZ.length; z++) {
            console.log(contruccion.pilaresZ);
            const pilarz = new THREE.Mesh(geometry2, material);
            pilarz.position.set(contruccion.pilaresZ[z].x, contruccion.pilaresZ[z].y,contruccion.pilaresZ[z].z);
            scene.add(pilarz);
        }
        // cube5.position.set((contruccion.embaldosado[0]/2)-3.2,1.6,(contruccion.embaldosado[2]/2)-0.25);
        // cube6.position.set(((contruccion.embaldosado[0]/2)-3.2)*-1,1.6,(contruccion.embaldosado[2]/2)-0.25);
        // tcontrols.attach(cube3);
        // scene.add(tcontrols);

        // tcontrols.setMode('rotate');

        const ambientLight = new THREE.AmbientLight(0x4d82bc, 10);
        scene.add(ambientLight);

        const light = new THREE.PointLight(0x4d82bc, 10000);
        light.position.set(8, 8, 8);
        scene.add(light);

        const animateScene = () =>{
            controls.update();
            renderer.render(scene, camera);
            requestAnimationFrame(animateScene);
        }
        animateScene();

        return () =>{
            currentRef.removeChild(renderer.domElement);
            window.addEventListener('resize', Resize);
        }

    },[]);

    return <div>
        <div ref={mountRef} style={{width: "100%", height: "300px"}}></div>
    </div>
}

export default Esquema;