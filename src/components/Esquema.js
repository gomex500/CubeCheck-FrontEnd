import React, {useRef, useEffect} from "react";
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {TransformControls} from 'three/examples/jsm/controls/TransformControls';
import {Bloque, Ladrillo, Concreto} from '../img/texturas/index'

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

        const geometry3 = new THREE.BoxGeometry(0.25,contruccion.alturaParedes,contruccion.embaldosado[2]-0.45);
        const geometry31 = new THREE.BoxGeometry(0.25,(contruccion.alturaParedes/2)-0.4,contruccion.embaldosado[2]-0.45);
        const geometry32 = new THREE.BoxGeometry(0.25,(contruccion.alturaParedes/2)-0.4,contruccion.embaldosado[2]-0.45);
        const geometry33 = new THREE.BoxGeometry(0.25,0.8,0.8);
        const geometry34 = new THREE.BoxGeometry(0.25,0.8,1.6);

        const geometry4 = new THREE.BoxGeometry(contruccion.embaldosado[0]-0.45,contruccion.alturaParedes,0.25);
        const geometry41 = new THREE.BoxGeometry(contruccion.embaldosado[0]-0.45,(contruccion.alturaParedes/2)-0.4,0.25);
        const geometry42 = new THREE.BoxGeometry(contruccion.embaldosado[0]-0.45,(contruccion.alturaParedes/2)-0.4,0.25);
        const geometry43 = new THREE.BoxGeometry(0.8,0.8,0.25);
        const geometry44 = new THREE.BoxGeometry(1.6,0.8,0.25);

        const geometry5 = new THREE.BoxGeometry((contruccion.embaldosado[0]-1)-0.45,contruccion.alturaParedes,0.25);
        const geometry51 = new THREE.BoxGeometry(1,1,0.25);
        const geometry52 = new THREE.BoxGeometry((contruccion.embaldosado[0]-1)-0.45,(contruccion.alturaParedes/2)-0.4,0.25);
        const geometry53 = new THREE.BoxGeometry((contruccion.embaldosado[0]-1)-0.45,(contruccion.alturaParedes/2)-0.4,0.25);
        const geometry54 = new THREE.BoxGeometry(0.8,0.8,0.25);
        const geometry55 = new THREE.BoxGeometry(1.18,0.8,0.25);
        const geometry56 = new THREE.BoxGeometry(1.6,0.8,0.25);

        //textura pilares
        const textureLoader = new THREE.TextureLoader();
        const texture1 = textureLoader.load(Concreto);
        const texture2 = textureLoader.load(contruccion.materialBase === "Ladrillo" ? Ladrillo : Bloque)

        //textura paredes
        const textures = [
            textureLoader.load(contruccion.materialBase === "Ladrillo" ? Ladrillo : Bloque),
            textureLoader.load(contruccion.materialBase === "Ladrillo" ? Ladrillo : Bloque),
            textureLoader.load(contruccion.materialBase === "Ladrillo" ? Ladrillo : Bloque),
            textureLoader.load(contruccion.materialBase === "Ladrillo" ? Ladrillo : Bloque),
            textureLoader.load(contruccion.materialBase === "Ladrillo" ? Ladrillo : Bloque),
            textureLoader.load(contruccion.materialBase === "Ladrillo" ? Ladrillo : Bloque),
        ];

        // Configurar repetición para cada textura
        textures.forEach(texture => {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            // Número de repeticiones en los ejes S y T
            texture.repeat.set(contruccion.embaldosado[0]/2, contruccion.alturaParedes/2);
        });
        // const material = new THREE.MeshPhongMaterial({ color: 0x4d82bc });
        const material = new THREE.MeshBasicMaterial({ map: texture1 });
        // const material = new THREE.MeshBasicMaterial({
        //     color: 0xc1c1c1
        // });
        // const material2 = new THREE.MeshPhongMaterial({
        //     color: 0x2E4BCD
        // });
        const material2 = new THREE.MeshBasicMaterial({ map: texture1 });
        // const material3 = new THREE.MeshPhongMaterial({
        //     color: 0x4B2ECD
        // });

        const material3 = textures.map(texture => new THREE.MeshBasicMaterial({ map: texture }));

        const material4 = textures.map(texture => new THREE.MeshBasicMaterial({ map: texture2 }));

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

        //pared derecha
        const grupo1 = new THREE.Group();

        //validacion si la pared tiene ventanas
        if(contruccion.ventanasD){
            const pared1 = new THREE.Mesh(geometry31, material3);
            const pared12 = new THREE.Mesh(geometry32, material3);
            const pared13 = new THREE.Mesh(geometry33, material4);
            const pared14 = new THREE.Mesh(geometry33, material4);
            grupo1.add(pared1, pared12, pared13, pared14);
            scene.add(grupo1);
            pared1.position.set(contruccion.pilaresEsquinas[0].x-0.01,0.7,0);
            pared12.position.set(contruccion.pilaresEsquinas[0].x-0.01,(contruccion.alturaParedes/2)+1.05,0);
            pared13.position.set(contruccion.pilaresEsquinas[0].x-0.01,(contruccion.alturaParedes/2)+0.1,contruccion.pilaresEsquinas[0].x-0.5);
            pared14.position.set(contruccion.pilaresEsquinas[0].x-0.01,(contruccion.alturaParedes/2)+0.1,contruccion.pilaresEsquinas[1].x+0.5);
        }else{
            const pared1 = new THREE.Mesh(geometry3, material3);
            grupo1.add(pared1)
            scene.add(grupo1);
            pared1.position.set(contruccion.pilaresEsquinas[0].x-0.01,contruccion.pilaresEsquinas[3].y,0);
        }

        //validacion si la pared se mueve
        if (contruccion.moverPared) {
            const tcontrolsP1 = new TransformControls(camera, renderer.domElement);

            tcontrolsP1.addEventListener('dragging-changed', (e) =>{
                controls.enabled = !e.value;
            });
            tcontrolsP1.attach(grupo1);
            tcontrolsP1.position.set(contruccion.pilaresEsquinas[0].x-0.01,1,0);
            scene.add(tcontrolsP1);
            tcontrolsP1.setMode('translate');
        }

        //pared izquierda
        const grupo2 = new THREE.Group();

        //validacion si la pared tiene ventanas
        if (contruccion.ventanasI) {
            const pared2 = new THREE.Mesh(geometry31, material3);
            const pared22 = new THREE.Mesh(geometry32, material3);
            const pared23 = new THREE.Mesh(geometry33, material4);
            const pared24 = new THREE.Mesh(geometry33, material4);
            grupo2.add(pared2, pared22, pared23, pared24);
            scene.add(grupo2);
            pared2.position.set((contruccion.pilaresEsquinas[0].x-0.01)*-1,0.7,0);
            pared22.position.set((contruccion.pilaresEsquinas[0].x-0.01)*-1,(contruccion.alturaParedes/2)+1.05,0);
            pared23.position.set((contruccion.pilaresEsquinas[0].x-0.01)*-1,(contruccion.alturaParedes/2)+0.1,contruccion.pilaresEsquinas[0].x-0.5);
            pared24.position.set((contruccion.pilaresEsquinas[0].x-0.01)*-1,(contruccion.alturaParedes/2)+0.1,contruccion.pilaresEsquinas[1].x+0.5);
        } else {
            const pared2 = new THREE.Mesh(geometry3, material3);
            grupo2.add(pared2);
            scene.add(grupo2);
            pared2.position.set((contruccion.pilaresEsquinas[0].x-0.01)*-1,contruccion.pilaresEsquinas[3].y,0);
        }

        //validacion si la pared se mueve
        if (contruccion.moverPared) {
            const tcontrolsP2 = new TransformControls(camera, renderer.domElement);
            tcontrolsP2.addEventListener('dragging-changed', (e) =>{
                controls.enabled = !e.value;
            });
            tcontrolsP2.attach(grupo2);
            tcontrolsP2.position.set((contruccion.pilaresEsquinas[0].x-0.01)*-1,1,0);
            scene.add(tcontrolsP2);
            tcontrolsP2.setMode('translate');
        }

        //pared trasera
        const grupo3 = new THREE.Group();

        //validacion si la pared tiene ventanas
        if (contruccion.ventanasT) {
            const pared3 = new THREE.Mesh(geometry41, material3);
            const pared32 = new THREE.Mesh(geometry42, material3);
            const pared33 = new THREE.Mesh(geometry43, material4);
            const pared34 = new THREE.Mesh(geometry43, material4);
            grupo3.add(pared3, pared32, pared33, pared34);
            scene.add(grupo3);
            pared3.position.set(0,0.7,(contruccion.pilaresEsquinas[1].z-0.01)*-1);
            pared32.position.set(0,(contruccion.alturaParedes/2)+1.05,(contruccion.pilaresEsquinas[1].z-0.01)*-1);
            pared33.position.set(contruccion.pilaresEsquinas[2].x+0.5,(contruccion.alturaParedes/2)+0.1,(contruccion.pilaresEsquinas[1].z-0.01)*-1);
            pared34.position.set((contruccion.pilaresEsquinas[1].x+0.5)*-1,(contruccion.alturaParedes/2)+0.1,(contruccion.pilaresEsquinas[1].z-0.01)*-1);
        } else {
            const pared3 = new THREE.Mesh(geometry4, material3);
            grupo3.add(pared3);
            scene.add(grupo3);
            pared3.position.set(0,contruccion.pilaresEsquinas[3].y,(contruccion.pilaresEsquinas[1].z-0.01)*-1);
        }

        //validacion si la pared se mueve
        if (contruccion.moverPared) {
            const tcontrolsP3 = new TransformControls(camera, renderer.domElement);
            tcontrolsP3.addEventListener('dragging-changed', (e) =>{
                controls.enabled = !e.value;
            });
            tcontrolsP3.attach(grupo3);
            tcontrolsP3.position.set(0,1,(contruccion.pilaresEsquinas[1].z-0.01)*-1);
            scene.add(tcontrolsP3);
            tcontrolsP3.setMode('translate');
        }

        //pared delatera
        const grupo4 = new THREE.Group();
        if (contruccion.ventanasF) {
            const pared4 = new THREE.Mesh(geometry52, material3);
            const pared41 = new THREE.Mesh(geometry51, material4);
            const pared42 = new THREE.Mesh(geometry53, material3);
            const pared43 = new THREE.Mesh(geometry54, material4);
            const pared44 = new THREE.Mesh(geometry55, material4);
            grupo4.add(pared4, pared41,pared42 ,pared43, pared44);
            scene.add(grupo4);
            pared4.position.set(-0.5,0.7,contruccion.pilaresEsquinas[1].z-0.01);
            pared41.position.set(contruccion.pilaresEsquinas[0].x-0.5,contruccion.pilaresEsquinas[3].y+1,contruccion.pilaresEsquinas[1].z-0.01);
            pared42.position.set(-0.5,(contruccion.alturaParedes/2)+1.05,contruccion.pilaresEsquinas[1].z-0.01);
            pared43.position.set(contruccion.pilaresEsquinas[2].x+0.5,(contruccion.alturaParedes/2)+0.1,contruccion.pilaresEsquinas[1].z-0.01);
            pared44.position.set((contruccion.pilaresEsquinas[1].x+1.56)*-1,(contruccion.alturaParedes/2)+0.1,contruccion.pilaresEsquinas[1].z-0.01);
        } else {
            const pared4 = new THREE.Mesh(geometry5, material3);
            const pared41 = new THREE.Mesh(geometry51, material4);
            grupo4.add(pared4, pared41);
            scene.add(grupo4);
            pared4.position.set(-0.5,contruccion.pilaresEsquinas[3].y,contruccion.pilaresEsquinas[1].z-0.01);
            pared41.position.set(contruccion.pilaresEsquinas[0].x-0.5,contruccion.pilaresEsquinas[3].y+1,contruccion.pilaresEsquinas[1].z-0.01);
        }
    
        if (contruccion.moverPared) {
            const tcontrolsP4 = new TransformControls(camera, renderer.domElement);
            tcontrolsP4.addEventListener('dragging-changed', (e) =>{
                controls.enabled = !e.value;
            });
            tcontrolsP4.attach(grupo4);
            tcontrolsP4.position.set(0,1,contruccion.pilaresEsquinas[1].z-0.01);
            scene.add(tcontrolsP4);
            tcontrolsP4.setMode('translate');
        }

        //pilares centrales z
        if (contruccion.pilaresZ) {
            for (let z = 0; z < contruccion.pilaresZ.length; z++) {
                const pilarz = new THREE.Mesh(geometry2, material2);
                if (contruccion.ventanasF) {
                    const pared45 = new THREE.Mesh(geometry56, material4);
                    pared45.position.set(contruccion.pilaresZ[z].x, contruccion.pilaresZ[z].y,contruccion.pilaresZ[z].z-0.01)
                    grupo4.add(pared45)
                    scene.add(grupo4);
                }
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
                if (contruccion.ventanasT) {
                    const pared35 = new THREE.Mesh(geometry44, material4);
                    pared35.position.set(contruccion.pilaresZN[z].x, (contruccion.alturaParedes/2)+0.1,contruccion.pilaresZN[z].z+0.01)
                    grupo3.add(pared35)
                    scene.add(grupo3);
                }
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
                if (contruccion.ventanasD) {
                    const pared15 = new THREE.Mesh(geometry34, material4);
                    pared15.position.set(contruccion.pilaresX[z].x-0.01, (contruccion.alturaParedes/2)+0.1,contruccion.pilaresX[z].z)
                    grupo1.add(pared15)
                    scene.add(grupo1);
                }
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
                if (contruccion.ventanasI) {
                    const pared25 = new THREE.Mesh(geometry34, material4);
                    pared25.position.set(contruccion.pilaresXN[z].x+0.01, (contruccion.alturaParedes/2)+0.1,contruccion.pilaresX[z].z)
                    grupo2.add(pared25);
                    scene.add(grupo2);
                }
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