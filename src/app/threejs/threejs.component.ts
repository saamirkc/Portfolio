import { Component } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


@Component({
  selector: 'app-threejs',
  standalone: false,
  templateUrl: './threejs.component.html',
  styleUrl: './threejs.component.css'
})
export class ThreejsComponent {
  ngOnInit() {

    const scene = new THREE.Scene();
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // white ambient light
    scene.add(ambientLight);
    //
    // const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    // directionalLight.position.set(10, 10, 10);
    // scene.add(directionalLight);
    // const light = new THREE.SpotLight(0x006769,100);
    // light.position.set(1,1,1);
    // scene.add(light);
    const loader = new GLTFLoader();
    loader.load('programmer_desktop_3d_pc/scene.gltf', function (gltf) {
      gltf.scene.scale.set(0.3, 0.3, 0.3);
      scene.add(gltf.scene);

    }, undefined, function (error) {
      console.error(error);
    });

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('threeCanvas') as HTMLCanvasElement,alpha:true });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    // renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(600, 600);
    renderer.setClearColor(0x101010,0);

    camera.position.z = 4;

    const animate = () => {
      requestAnimationFrame(animate);
      scene.rotation.y += 0.003;

      renderer.render(scene, camera);
    };
    animate();
    this.cycleRoleText();


  }

   roles=["Java Backend Developer", "Spring Boot | Angular", "Full Stack Developer", ];
  roleIndex = 0;
letterIndex = 0;
   cycleRoleText() {
     const roleText = document.getElementById("roleText");
     if (!roleText) return;

     const currentRole = this.roles[this.roleIndex];
     roleText.textContent = currentRole.slice(0, this.letterIndex++);

     if (this.letterIndex <= currentRole.length) {
       setTimeout(() => this.cycleRoleText(), 100); // typing speed
     } else {
       setTimeout(() => {
         this.roleIndex = (this.roleIndex + 1) % this.roles.length;
         this.letterIndex = 0;
         this.cycleRoleText();

       }, 2000);


     }
  }
}

