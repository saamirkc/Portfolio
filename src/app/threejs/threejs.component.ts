import { Component, OnInit, OnDestroy, AfterViewInit, NgZone, HostListener } from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

@Component({
  selector: 'app-threejs',
  standalone: false,
  templateUrl: './threejs.component.html',
  styleUrl: './threejs.component.css'
})
export class ThreejsComponent implements OnInit, AfterViewInit, OnDestroy {
  private animationId: number = 0;
  private resizeHandler: (() => void) | null = null;
  private mouseMoveHandler: ((e: MouseEvent) => void) | null = null;

  // Parallax scroll values
  mountain3Y = '0%';
  planetsX = '0%';
  mountain2Y = '0%';
  mountain1Y = '0%';

  // Flip words
  flipWords = ['Scalable', 'Resilient', 'Clean', 'Thoughtful'];
  currentFlipWord = '';
  flipWordIndex = 0;
  private flipTimeout: any;
  isFlipAnimating = false;

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

  private scrollObserver!: IntersectionObserver;
  private mouseX = 0;
  private mouseY = 0;
  private targetCamX = 0;
  private targetCamY = 1;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.currentFlipWord = this.flipWords[0];
    this.startFlipWords();
    this.setupScrollAnimations();
  }

  ngAfterViewInit() {
    // Small delay to ensure canvas is fully laid out in the DOM
    setTimeout(() => {
      this.initThreeJS();
    }, 100);
  }

  ngOnDestroy() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
    if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler);
    if (this.mouseMoveHandler) window.removeEventListener('mousemove', this.mouseMoveHandler);
    if (this.flipTimeout) clearTimeout(this.flipTimeout);
    if (this.scrollObserver) this.scrollObserver.disconnect();
  }

  @HostListener('window:scroll')
  onScroll() {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const progress = Math.min(scrollY / vh, 1);

    this.mountain3Y = `${progress * 70}%`;
    this.planetsX = `${progress * -20}%`;
    this.mountain2Y = `${progress * 30}%`;
    this.mountain1Y = `${progress * 5}%`;
  }

  private startFlipWords() {
    this.currentFlipWord = this.flipWords[this.flipWordIndex];
    this.isFlipAnimating = true;

    this.flipTimeout = setTimeout(() => {
      this.isFlipAnimating = false;
      setTimeout(() => {
        this.flipWordIndex = (this.flipWordIndex + 1) % this.flipWords.length;
        this.startFlipWords();
      }, 200);
    }, 3000);
  }

  private initThreeJS() {
    const canvas = document.getElementById('astronautCanvas') as HTMLCanvasElement;
    if (!canvas) return;

    const scene = new THREE.Scene();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 5, 5);
    scene.add(dirLight);

    const accentLight = new THREE.PointLight(0x8b9cf7, 0.4, 15);
    accentLight.position.set(-3, 2, 3);
    scene.add(accentLight);

    const rimLight = new THREE.DirectionalLight(0xc4b5a0, 0.25);
    rimLight.position.set(-5, 0, -5);
    scene.add(rimLight);

    // Load the spaceman model
    let spaceman: THREE.Group | null = null;
    let mixer: THREE.AnimationMixer | null = null;
    const clock = new THREE.Clock();

    const loader = new GLTFLoader();
    loader.load('tenhun_falling_spaceman_fanart.glb', (gltf) => {
      spaceman = gltf.scene;
      spaceman.scale.set(0.3, 0.3, 0.3);
      spaceman.position.set(1.3, -1, 0);
      spaceman.rotation.set(-Math.PI / 2, -0.2, 2.2);

      // Play animations if available
      if (gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(spaceman);
        const action = mixer.clipAction(gltf.animations[0]);
        action.play();
      }

      scene.add(spaceman);
    }, undefined, (error) => {
      console.error('Error loading spaceman:', error);
    });

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 1, 3);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;

    const setSize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    setSize();

    // Mouse-driven camera easing (like Ali's portfolio Rig component)
    this.mouseMoveHandler = (e: MouseEvent) => {
      this.mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      this.mouseY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', this.mouseMoveHandler);

    let time = 0;
    const animate = () => {
      this.animationId = requestAnimationFrame(animate);
      time += 0.01;
      const delta = clock.getDelta();

      // Update animation mixer
      if (mixer) mixer.update(delta);

      // Smooth camera follow mouse (like the Rig component)
      this.targetCamX = this.mouseX * 0.1;
      this.targetCamY = 1 + this.mouseY * 0.1;
      camera.position.x += (this.targetCamX - camera.position.x) * 0.02;
      camera.position.y += (this.targetCamY - camera.position.y) * 0.02;

      // Subtle floating for spaceman
      if (spaceman) {
        spaceman.position.y = -1 + Math.sin(time * 0.5) * 0.15;
      }

      renderer.render(scene, camera);
    };
    animate();

    this.resizeHandler = setSize;
    window.addEventListener('resize', this.resizeHandler);
  }

  private setupScrollAnimations() {
    setTimeout(() => {
      this.scrollObserver = new IntersectionObserver((entries) => {
        this.ngZone.run(() => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              const expElements = entry.target.querySelectorAll('.timeline-item');
              if (expElements.length > 0) {
                this.experiences.forEach((exp, i) => {
                  setTimeout(() => { exp.visible = true; }, i * 300);
                });
              }
            }
          });
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, #experience').forEach(el => {
        this.scrollObserver.observe(el);
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

