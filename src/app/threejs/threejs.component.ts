import { Component, OnInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-threejs',
  standalone: false,
  templateUrl: './threejs.component.html',
  styleUrl: './threejs.component.css'
})
export class ThreejsComponent implements OnInit, OnDestroy {
  private animationId: number = 0;
  private resizeHandler: (() => void) | null = null;

  experiences = [
    {
      role: 'Junior Java Developer',
      company: 'Wow Finstack, Nepal',
      date: 'Jul 2024 — Oct 2024',
      points: [
        'Designed and developed production-grade RESTful APIs using Spring Boot for financial services.',
        'Implemented critical features: mobile top-up, interbank fund transfer, and account management.',
        'Integrated multiple backend services to streamline financial workflows across distributed systems.',
        'Implemented asynchronous processing using Apache Kafka for real-time transactions and notifications.'
      ],
      tech: ['Java', 'Spring Boot', 'Kafka', 'REST APIs', 'PostgreSQL', 'Microservices'],
      visible: false
    },
    {
      role: 'Backend Developer Intern',
      company: 'US-Based E-commerce (Remote)',
      date: 'Mar 2024 — Jun 2024',
      points: [
        'Developed and maintained production-grade backend features using Spring Boot.',
        'Integrated PayPal payment gateway for secure transaction flow.',
        'Fixed critical bugs in the address management module, improving data consistency.',
        'Collaborated with Angular developers to refine UI workflows and resolve frontend issues.'
      ],
      tech: ['Java', 'Spring Boot', 'PayPal API', 'Angular', 'MySQL'],
      visible: false
    }
  ];

  roles = [
    'Java Backend Developer',
    'Spring Boot Engineer',
    'Distributed Systems Builder',
    'API Architect'
  ];
  roleIndex = 0;
  letterIndex = 0;
  isDeleting = false;
  private typeTimeout: any;

  ngOnInit() {
    this.initThreeJS();
    this.cycleRoleText();
    this.animateExperiences();
    this.setupScrollAnimations();
  }

  ngOnDestroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
    }
    if (this.typeTimeout) {
      clearTimeout(this.typeTimeout);
    }
  }

  private initThreeJS() {
    const canvas = document.getElementById('threeCanvas') as HTMLCanvasElement;
    if (!canvas) return;

    const scene = new THREE.Scene();

    // Improved lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0x00ffd1, 0.4);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x6c63ff, 0.6, 20);
    pointLight.position.set(-3, 3, 3);
    scene.add(pointLight);

    const rimLight = new THREE.DirectionalLight(0x00ffd1, 0.3);
    rimLight.position.set(-5, 0, -5);
    scene.add(rimLight);

    const loader = new GLTFLoader();
    loader.load('programmer_desktop_3d_pc/scene.gltf', (gltf) => {
      gltf.scene.scale.set(0.3, 0.3, 0.3);
      scene.add(gltf.scene);
    }, undefined, (error) => {
      console.error('Error loading 3D model:', error);
    });

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = false;

    const setSize = () => {
      const container = canvas.parentElement;
      if (container) {
        const size = Math.min(container.clientWidth, 600);
        renderer.setSize(size, size);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      }
    };
    setSize();

    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    camera.position.z = 4;

    // Smooth oscillation
    let rotationAngle = 0;
    const maxRotation = 0.2;
    const rotationSpeed = 0.001;
    let direction = 1;

    const animate = () => {
      this.animationId = requestAnimationFrame(animate);
      rotationAngle += rotationSpeed * direction;
      if (rotationAngle >= maxRotation || rotationAngle <= -maxRotation) {
        direction *= -1;
      }
      scene.rotation.y = rotationAngle;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    this.resizeHandler = setSize;
    window.addEventListener('resize', this.resizeHandler);
  }

  cycleRoleText() {
    const roleText = document.getElementById('roleText');
    if (!roleText) return;

    const currentRole = this.roles[this.roleIndex];

    if (!this.isDeleting) {
      roleText.textContent = currentRole.slice(0, this.letterIndex++);
      if (this.letterIndex <= currentRole.length) {
        this.typeTimeout = setTimeout(() => this.cycleRoleText(), 80);
      } else {
        this.typeTimeout = setTimeout(() => {
          this.isDeleting = true;
          this.cycleRoleText();
        }, 2500);
      }
    } else {
      roleText.textContent = currentRole.slice(0, this.letterIndex--);
      if (this.letterIndex >= 0) {
        this.typeTimeout = setTimeout(() => this.cycleRoleText(), 40);
      } else {
        this.isDeleting = false;
        this.roleIndex = (this.roleIndex + 1) % this.roles.length;
        this.letterIndex = 0;
        this.typeTimeout = setTimeout(() => this.cycleRoleText(), 500);
      }
    }
  }

  private animateExperiences() {
    setTimeout(() => {
      this.experiences.forEach((exp, i) => {
        setTimeout(() => {
          exp.visible = true;
        }, i * 300);
      });
    }, 1000);
  }

  private setupScrollAnimations() {
    setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
        observer.observe(el);
      });
    }, 500);
  }

  scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (el) {
      const navHeight = 80;
      const pos = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: pos - navHeight, behavior: 'smooth' });
    }
  }
}

