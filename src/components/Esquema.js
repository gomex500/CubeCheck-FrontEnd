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

        const geometry = new THREE.BoxGeometry(contruccion.embaldosado[0],contruccion.embaldosado[1],contruccion.embaldosado[2]);
        const geometry2 = new THREE.BoxGeometry(0.25,contruccion.alturaPilares+0.5,0.25);

        const geometry3 = new THREE.BoxGeometry(0.25,contruccion.alturaParedes,contruccion.embaldosado[2]);
        const geometry4 = new THREE.BoxGeometry(contruccion.embaldosado[0],contruccion.alturaParedes,0.25);
        const geometry5 = new THREE.BoxGeometry(contruccion.embaldosado[0]-2,contruccion.alturaParedes,0.25);
        const geometry6 = new THREE.BoxGeometry(contruccion.embaldosado[0],1,0.25);
        const material = new THREE.MeshPhongMaterial({ color: 0x4d82bc });
        // const material = new THREE.MeshBasicMaterial({
        //     color: 0xc1c1c1
        // });
        const material2 = new THREE.MeshPhongMaterial({
            color: 0x2E4BCD
        });
        const material3 = new THREE.MeshPhongMaterial({
            color: 0x4B2ECD
        });
        const cube = new THREE.Mesh(geometry, material);
        const cube1 = new THREE.Mesh(geometry2, material2);
        const cube2 = new THREE.Mesh(geometry2, material2);
        const cube3 = new THREE.Mesh(geometry2, material2);
        const cube4 = new THREE.Mesh(geometry2, material2);
        scene.add(cube, cube1, cube2,cube3, cube4);
        cube.position.set(0,0.2,0);
        cube1.position.set(contruccion.pilaresEsquinas[0].x,contruccion.pilaresEsquinas[0].y,contruccion.pilaresEsquinas[0].z);
        cube2.position.set(contruccion.pilaresEsquinas[1].x,contruccion.pilaresEsquinas[1].y,contruccion.pilaresEsquinas[1].z);
        cube3.position.set(contruccion.pilaresEsquinas[2].x,contruccion.pilaresEsquinas[2].y,contruccion.pilaresEsquinas[2].z);
        cube4.position.set(contruccion.pilaresEsquinas[3].x,contruccion.pilaresEsquinas[3].y,contruccion.pilaresEsquinas[3].z);

        const grupo = new THREE.Group();

        const pared1 = new THREE.Mesh(geometry3, material3);
        const pared2 = new THREE.Mesh(geometry3, material3);
        const pared3 = new THREE.Mesh(geometry4, material3);
        const pared4 = new THREE.Mesh(geometry5, material3);
        const pared5 = new THREE.Mesh(geometry6, material3);
        grupo.add(pared4);
        grupo.add(pared5);
        scene.add(pared1, pared2, pared3, grupo);
        pared1.position.set(contruccion.pilaresEsquinas[0].x-0.01,contruccion.pilaresEsquinas[3].y,0);
        if (contruccion.moverPared) {
            const tcontrolsP1 = new TransformControls(camera, renderer.domElement);

            tcontrolsP1.addEventListener('dragging-changed', (e) =>{
                controls.enabled = !e.value;
            });
            tcontrolsP1.attach(pared1);
            scene.add(tcontrolsP1);
            tcontrolsP1.setMode('translate');
        }
        pared2.position.set((contruccion.pilaresEsquinas[0].x-0.01)*-1,contruccion.pilaresEsquinas[3].y,0);
        if (contruccion.moverPared) {
            const tcontrolsP2 = new TransformControls(camera, renderer.domElement);
            tcontrolsP2.addEventListener('dragging-changed', (e) =>{
                controls.enabled = !e.value;
            });
            tcontrolsP2.attach(pared2);
            scene.add(tcontrolsP2);
            tcontrolsP2.setMode('translate');
        }
        pared3.position.set(0,contruccion.pilaresEsquinas[3].y,(contruccion.pilaresEsquinas[1].z-0.01)*-1);
        if (contruccion.moverPared) {
            const tcontrolsP3 = new TransformControls(camera, renderer.domElement);
            tcontrolsP3.addEventListener('dragging-changed', (e) =>{
                controls.enabled = !e.value;
            });
            tcontrolsP3.attach(pared3);
            scene.add(tcontrolsP3);
            tcontrolsP3.setMode('translate');
        }
        pared4.position.set(0-1,contruccion.pilaresEsquinas[3].y,contruccion.pilaresEsquinas[1].z-0.01);
        pared5.position.set(0,contruccion.pilaresEsquinas[3].y+1,contruccion.pilaresEsquinas[1].z-0.01);
        if (contruccion.moverPared) {
            const tcontrolsP4 = new TransformControls(camera, renderer.domElement);
            tcontrolsP4.addEventListener('dragging-changed', (e) =>{
                controls.enabled = !e.value;
            });
            tcontrolsP4.attach(grupo);
            scene.add(tcontrolsP4);
            tcontrolsP4.setMode('translate');
        }

        //pilares centrales z
        if (contruccion.pilaresZ) {
            for (let z = 0; z < contruccion.pilaresZ.length; z++) {
                const pilarz = new THREE.Mesh(geometry2, material2);
                pilarz.position.set(contruccion.pilaresZ[z].x, contruccion.pilaresZ[z].y,contruccion.pilaresZ[z].z);
                scene.add(pilarz);

                if (contruccion.moverPilar) {
                    const tcontrols2 = new TransformControls(camera, renderer.domElement);

                    tcontrols2.addEventListener('dragging-changed', (e) =>{
                        controls.enabled = !e.value;
                    });
                    tcontrols2.attach(pilarz);
                    scene.add(tcontrols2);
                    tcontrols2.setMode('translate');
                }
            }
        }

        //pilares centrales zn
        if (contruccion.pilaresZN) {
            for (let z = 0; z < contruccion.pilaresZN.length; z++) {
                const pilarzn = new THREE.Mesh(geometry2, material2);
                pilarzn.position.set(contruccion.pilaresZN[z].x, contruccion.pilaresZN[z].y,contruccion.pilaresZN[z].z);
                scene.add(pilarzn);

                if (contruccion.moverPilar) {
                    const tcontrols2 = new TransformControls(camera, renderer.domElement);

                    tcontrols2.addEventListener('dragging-changed', (e) =>{
                        controls.enabled = !e.value;
                    });
                    tcontrols2.attach(pilarzn);
                    scene.add(tcontrols2);
                    tcontrols2.setMode('translate');
                }
            }
        }

        //pilares centrales zn
        if (contruccion.pilaresX) {
            for (let z = 0; z < contruccion.pilaresX.length; z++) {
                const pilarx = new THREE.Mesh(geometry2, material2);
                pilarx.position.set(contruccion.pilaresX[z].x, contruccion.pilaresX[z].y,contruccion.pilaresX[z].z);
                scene.add(pilarx);

                if (contruccion.moverPilar) {
                    const tcontrols2 = new TransformControls(camera, renderer.domElement);

                    tcontrols2.addEventListener('dragging-changed', (e) =>{
                        controls.enabled = !e.value;
                    });
                    tcontrols2.attach(pilarx);
                    scene.add(tcontrols2);
                    tcontrols2.setMode('translate');
                }
            }
        }
        if (contruccion.pilaresXN) {
            for (let z = 0; z < contruccion.pilaresXN.length; z++) {
                const pilarxn = new THREE.Mesh(geometry2, material2);
                pilarxn.position.set(contruccion.pilaresXN[z].x, contruccion.pilaresXN[z].y,contruccion.pilaresXN[z].z);
                scene.add(pilarxn);

                if (contruccion.moverPilar) {
                    const tcontrols2 = new TransformControls(camera, renderer.domElement);

                    tcontrols2.addEventListener('dragging-changed', (e) =>{
                        controls.enabled = !e.value;
                    });
                    tcontrols2.attach(pilarxn);
                    scene.add(tcontrols2);
                    tcontrols2.setMode('translate');
                }
            }
        }

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