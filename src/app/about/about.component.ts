import { Component } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

  ngOnInit() {

  //   scene
    const scene = new THREE.Scene();
    const samir=new THREE.TextureLoader().load('sam.jpeg');
    const sam =new THREE.Mesh(new THREE.BoxGeometry(3,3,3),new THREE.MeshBasicMaterial({map:samir}));
    scene.scale.set(0.9, 0.9, 0.9);
    scene.add(sam);


    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // white ambient light
    scene.add(ambientLight);

    const camera = new THREE.PerspectiveCamera(75, 600/600, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('bgCanvas') as HTMLCanvasElement,alpha:true });




    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();
    controls.enableZoom=false;
    // renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setSize(600, 600);

    renderer.setClearColor(0x101010,0);
    camera.position.z = 5;


    function animate() {
      requestAnimationFrame(animate);

      sam.rotation.y += 0.002;
      renderer.render(scene, camera);

    }
    animate();
  }
}
