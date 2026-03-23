import {
  Component,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
  NgZone,
} from '@angular/core';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface TerminalEntry {
  type: 'command' | 'output';
  text: string;
  class?: string;
  visible: boolean;
  typedText?: string;
  isTyping?: boolean;
}

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent implements AfterViewInit, OnDestroy {
  @ViewChild('modelCanvas', { static: false })
  canvasRef!: ElementRef<HTMLCanvasElement>;

  terminalEntries: TerminalEntry[] = [];
  currentDate = this.getFormattedDate();

  private animationId = 0;
  private resizeHandler: (() => void) | null = null;
  private typingTimeouts: any[] = [];
  private renderer!: THREE.WebGLRenderer;

  private allEntries: TerminalEntry[] = [
    { type: 'command', text: 'whoami', visible: false, typedText: '', isTyping: false },
    {
      type: 'output',
      text: 'samir-kc — Java Backend Developer @ Nepal',
      class: 'out-info',
      visible: false,
    },
    { type: 'command', text: 'cat about.json', visible: false, typedText: '', isTyping: false },
    { type: 'output', text: '{', class: 'json-bracket', visible: false },
    {
      type: 'output',
      text: '  "name"       : "Samir K.C.",',
      class: 'json-key',
      visible: false,
    },
    {
      type: 'output',
      text: '  "role"       : "Java Backend Developer",',
      class: 'json-key',
      visible: false,
    },
    {
      type: 'output',
      text: '  "location"   : "Nepal",',
      class: 'json-key',
      visible: false,
    },
    {
      type: 'output',
      text: '  "languages"  : ["Java", "Python", "TypeScript"],',
      class: 'json-arr',
      visible: false,
    },
    {
      type: 'output',
      text: '  "frameworks" : ["Spring Boot", "Angular"],',
      class: 'json-arr',
      visible: false,
    },
    {
      type: 'output',
      text: '  "databases"  : ["PostgreSQL", "MySQL", "MongoDB"],',
      class: 'json-arr',
      visible: false,
    },
    {
      type: 'output',
      text: '  "tools"      : ["Docker", "AWS", "Kafka", "Git"],',
      class: 'json-arr',
      visible: false,
    },
    {
      type: 'output',
      text: '  "interests"  : ["Distributed Systems", "Fintech"],',
      class: 'json-arr',
      visible: false,
    },
    {
      type: 'output',
      text: '  "available"  : true',
      class: 'json-bool',
      visible: false,
    },
    { type: 'output', text: '}', class: 'json-bracket', visible: false },
    {
      type: 'command',
      text: 'echo $STATUS',
      visible: false,
      typedText: '',
      isTyping: false,
    },
    {
      type: 'output',
      text: '→ Open to new opportunities',
      class: 'out-success',
      visible: false,
    },
    {
      type: 'command',
      text: 'uptime',
      visible: false,
      typedText: '',
      isTyping: false,
    },
    {
      type: 'output',
      text: 'coding for 3+ years, still going strong ☕',
      class: 'out-muted',
      visible: false,
    },
  ];

  constructor(private ngZone: NgZone) {}

  ngAfterViewInit() {
    this.startTerminalSequence();
    setTimeout(() => this.initScene(), 200);
    this.setupScrollReveal();
  }

  ngOnDestroy() {
    this.typingTimeouts.forEach((t) => clearTimeout(t));
    if (this.animationId) cancelAnimationFrame(this.animationId);
    if (this.resizeHandler) window.removeEventListener('resize', this.resizeHandler);
    if (this.renderer) this.renderer.dispose();
  }

  /* ── Terminal Typing Engine ── */

  private startTerminalSequence() {
    let globalDelay = 600;

    for (let i = 0; i < this.allEntries.length; i++) {
      const entry = this.allEntries[i];

      if (entry.type === 'command') {
        // push an empty entry first, then type each char
        const pushTimeout = setTimeout(() => {
          entry.visible = true;
          entry.isTyping = true;
          entry.typedText = '';
          this.terminalEntries.push(entry);
          this.scrollTerminal();
        }, globalDelay);
        this.typingTimeouts.push(pushTimeout);
        globalDelay += 100;

        // type each character
        const chars = entry.text.split('');
        for (let c = 0; c < chars.length; c++) {
          const charTimeout = setTimeout(() => {
            entry.typedText += chars[c];
          }, globalDelay + c * 55);
          this.typingTimeouts.push(charTimeout);
        }
        globalDelay += chars.length * 55 + 400; // wait after typing

        // mark typing done
        const doneTimeout = setTimeout(() => {
          entry.isTyping = false;
        }, globalDelay);
        this.typingTimeouts.push(doneTimeout);
        globalDelay += 100;
      } else {
        // output lines appear instantly with a slight stagger
        const outTimeout = setTimeout(() => {
          entry.visible = true;
          this.terminalEntries.push(entry);
          this.scrollTerminal();
        }, globalDelay);
        this.typingTimeouts.push(outTimeout);
        globalDelay += 60;
      }
    }
  }

  private scrollTerminal() {
    setTimeout(() => {
      const body = document.querySelector('.term-body');
      if (body) body.scrollTop = body.scrollHeight;
    }, 20);
  }

  /* ── 3D Scene (programmer_desktop_3d_pc) ── */

  private initScene() {
    const canvas = this.canvasRef?.nativeElement;
    if (!canvas) return;

    const container = canvas.parentElement!;
    const scene = new THREE.Scene();

    // ── Lighting (soft studio setup) ──
    const ambient = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambient);

    const keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x8b9cf7, 0.35);
    fillLight.position.set(-5, 3, -3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xc4b5a0, 0.2);
    rimLight.position.set(0, 2, -6);
    scene.add(rimLight);

    const accentLight = new THREE.PointLight(0x4ade80, 0.25, 15);
    accentLight.position.set(0, 4, 3);
    scene.add(accentLight);

    // ── Camera (will be repositioned after model loads) ──
    const fov = 36;
    const camera = new THREE.PerspectiveCamera(
      fov,
      container.clientWidth / container.clientHeight,
      0.01,
      500
    );
    // temporary default — overridden once model bbox is known
    camera.position.set(0, 3, 8);
    camera.lookAt(0, 1, 0);

    // ── Renderer ──
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;

    const setSize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      this.renderer.setSize(w, h);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    setSize();
    this.resizeHandler = setSize;
    window.addEventListener('resize', this.resizeHandler);

    // ── Load model & auto-frame ──
    // Pivot group — the model sits inside this so rotation is always around its center
    const pivot = new THREE.Group();
    scene.add(pivot);

    let modelReady = false;
    let mixer: THREE.AnimationMixer | null = null;
    const clock = new THREE.Clock();

    const loader = new GLTFLoader();
    loader.load(
      'programmer_desktop_3d_pc/scene.gltf',
      (gltf) => {
        const model = gltf.scene;

        // Reset transform
        model.scale.set(1, 1, 1);
        model.position.set(0, 0, 0);
        model.rotation.set(0, 0, 0);
        model.updateMatrixWorld(true);

        // ── Compute bounding box ──
        const box = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);

        // ── Normalize: scale so largest axis ≈ 3 units ──
        const maxDim = Math.max(size.x, size.y, size.z);
        const desiredSize = 3.0;
        const sf = desiredSize / maxDim;
        model.scale.setScalar(sf);

        // Offset the model so its center sits at the pivot origin
        model.position.set(
          -center.x * sf,
          -center.y * sf,
          -center.z * sf
        );

        pivot.add(model);

        // ── Position camera to frame the whole scene ──
        model.updateMatrixWorld(true);
        const fitBox = new THREE.Box3().setFromObject(pivot);
        const fitSize = new THREE.Vector3();
        const fitCenter = new THREE.Vector3();
        fitBox.getSize(fitSize);
        fitBox.getCenter(fitCenter);

        const fitH = (fitSize.y / 2) / Math.tan(THREE.MathUtils.degToRad(fov / 2));
        const fitW = (fitSize.x / 2) / (Math.tan(THREE.MathUtils.degToRad(fov / 2)) * camera.aspect);
        const fitDist = Math.max(fitH, fitW) * 1.4;

        camera.position.set(
          fitCenter.x,
          fitCenter.y + fitSize.y * 0.35,   // slightly above
          fitCenter.z + fitDist
        );
        camera.lookAt(fitCenter);
        camera.updateProjectionMatrix();

        // ── Play embedded animations ──
        if (gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(model);
          gltf.animations.forEach((clip) => {
            const action = mixer!.clipAction(clip);
            action.play();
          });
        }

        modelReady = true;
      },
      undefined,
      (err) => console.error('3D model load error:', err)
    );

    // ── Hover pause: stop rotation when user hovers the 3D canvas ──
    let isHovered = false;
    canvas.addEventListener('mouseenter', () => (isHovered = true));
    canvas.addEventListener('mouseleave', () => (isHovered = false));

    // ── Render loop — smooth to-and-fro Y-axis swing ──
    //
    // Uses a virtual "angle" that advances via sinusoidal easing:
    //   rotation = center + amplitude * sin(phase)
    //
    // amplitude ~60° (1.05 rad) → total sweep ~120° so the back is never exposed.
    // A full left→center→right→center cycle takes ~35 seconds at 60 fps.

    const swingAmplitude = 1.05;            // ±60° from front-facing center
    const swingSpeed     = 0.003;           // phase increment per frame (~35 s cycle)
    const centerAngle    = 0;               // front-facing base angle
    let   phase          = 0;               // drives sin()
    let   currentSpeed   = swingSpeed;      // eased towards 0 on hover

    const animate = () => {
      this.animationId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);

      if (modelReady) {
        // Smoothly ease speed towards target (0 when hovered, swingSpeed when not)
        const targetSpeed = isHovered ? 0 : swingSpeed;
        currentSpeed += (targetSpeed - currentSpeed) * 0.04;   // soft lerp

        phase += currentSpeed;

        // sin() gives natural ease-in-out at the turning points
        pivot.rotation.y = centerAngle + swingAmplitude * Math.sin(phase);

        // Lock other axes — no tilt
        pivot.rotation.x = 0;
        pivot.rotation.z = 0;
      }

      this.renderer.render(scene, camera);
    };

    this.ngZone.runOutsideAngular(() => animate());
  }

  /* ── Scroll Reveal ── */

  private setupScrollReveal() {
    setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
            }
          });
        },
        { threshold: 0.1 }
      );

      document
        .querySelectorAll('.about-col-left, .about-col-right, .tech-category')
        .forEach((el) => observer.observe(el));
    }, 300);
  }

  /* ── Helpers ── */

  private getFormattedDate(): string {
    const d = new Date();
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const day = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return `${day[d.getDay()]} ${months[d.getMonth()]} ${d.getDate()} ${d.getHours().toString().padStart(2,'0')}:${d.getMinutes().toString().padStart(2,'0')}`;
  }

  techStack = [
    {
      name: 'Backend',
      icon: 'fa-code',
      items: ['Java', 'Spring Boot', 'Spring Security', 'REST APIs', 'Kafka', 'Microservices'],
    },
    {
      name: 'Frontend',
      icon: 'fa-laptop-code',
      items: ['Angular', 'TypeScript', 'HTML5', 'CSS3', 'Bootstrap'],
    },
    {
      name: 'Database',
      icon: 'fa-database',
      items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Hibernate'],
    },
    {
      name: 'DevOps & Tools',
      icon: 'fa-gear',
      items: ['Git', 'Docker', 'Linux', 'AWS', 'Maven', 'Postman'],
    },
  ];
}

