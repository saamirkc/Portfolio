import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements AfterViewInit {
  activeProject = 0;

  projects = [
    {
      title: 'Quiz Web Application',
      description: 'A full-stack exam portal featuring role-based access control (Admin/User), JWT authentication, timed quizzes, auto-grading, and a responsive Angular dashboard. Built with production-grade Spring Boot APIs and MySQL persistence.',
      technologies: ['Angular', 'Spring Boot', 'MySQL', 'JWT', 'Spring Security'],
      github: 'https://github.com/saamirkc/Examportalbackend',
      icon: 'fa-graduation-cap',
      color: '#00ffd1',
      gradient: 'linear-gradient(135deg, #00ffd1, #00b894)',
      metrics: [
        { label: 'API Endpoints', value: '25+' },
        { label: 'Auth Layers', value: '3' },
        { label: 'Quiz Engine', value: 'Real-time' }
      ],
      architecture: ['REST API', 'JWT Auth', 'Role-based Access', 'Auto-grading Engine'],
      live: ''
    },
    {
      title: 'Online Book Store',
      description: 'An e-commerce platform for books with Spring Security authentication, Khalti payment gateway integration, shopping cart management, and a responsive Angular storefront. Features order tracking and inventory management.',
      technologies: ['Angular', 'Spring Boot', 'PostgreSQL', 'Khalti', 'REST API'],
      github: 'https://github.com/saamirkc/backendbookstore',
      icon: 'fa-shopping-cart',
      color: '#6c63ff',
      gradient: 'linear-gradient(135deg, #6c63ff, #5a52d5)',
      metrics: [
        { label: 'Payment Gateway', value: 'Khalti' },
        { label: 'Product Catalog', value: 'Dynamic' },
        { label: 'Cart System', value: 'Full CRUD' }
      ],
      architecture: ['Payment Integration', 'Cart Management', 'Order Tracking', 'Inventory System'],
      live: ''
    },
    {
      title: 'Pneumonia Detection',
      description: 'An end-to-end ML pipeline for pneumonia detection and localization in chest X-ray images. Features a FastAPI backend serving a deep learning model with an Angular visualization frontend for medical image analysis.',
      technologies: ['FastAPI', 'Deep Learning', 'Angular', 'Python', 'TensorFlow'],
      github: 'https://github.com/saamirkc/BackendForML',
      icon: 'fa-brain',
      color: '#ff6b9d',
      gradient: 'linear-gradient(135deg, #ff6b9d, #ee5a6f)',
      metrics: [
        { label: 'ML Model', value: 'CNN' },
        { label: 'Accuracy', value: '92%+' },
        { label: 'API Backend', value: 'FastAPI' }
      ],
      architecture: ['Deep Learning Pipeline', 'Image Processing', 'REST API', 'Medical Visualization'],
      live: ''
    },
    {
      title: 'Book Library Management',
      description: 'A comprehensive library management system enabling users to borrow, return, and manage books. Features user authentication, book catalog search, borrowing history, and admin dashboard built with Spring Boot microservices.',
      technologies: ['Java', 'Spring Boot', 'MySQL', 'Angular', 'Hibernate'],
      github: 'https://github.com/saamirkc/Book-backendlib',
      icon: 'fa-book',
      color: '#ffa657',
      gradient: 'linear-gradient(135deg, #ffa657, #f0932b)',
      metrics: [
        { label: 'Microservices', value: '4' },
        { label: 'DB Operations', value: 'CRUD+' },
        { label: 'User Roles', value: 'Multi' }
      ],
      architecture: ['Microservices', 'ORM Layer', 'Auth System', 'Admin Dashboard'],
      live: ''
    }
  ];

  ngAfterViewInit() {
    this.setupTiltEffect();
    this.setupScrollReveal();
  }

  setActiveProject(index: number) {
    this.activeProject = index;
  }

  private setupTiltEffect() {
    setTimeout(() => {
      const cards = document.querySelectorAll('.project-card');
      cards.forEach(card => {
        const el = card as HTMLElement;
        el.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          const rotateX = (y - centerY) / 15;
          const rotateY = (centerX - x) / 15;
          el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;

          // Move glow effect
          const glowEl = el.querySelector('.card-glow') as HTMLElement;
          if (glowEl) {
            glowEl.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(0, 255, 209, 0.1), transparent 40%)`;
          }
        });

        el.addEventListener('mouseleave', () => {
          el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
          const glowEl = el.querySelector('.card-glow') as HTMLElement;
          if (glowEl) {
            glowEl.style.background = 'transparent';
          }
        });
      });
    }, 300);
  }

  private setupScrollReveal() {
    setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      }, { threshold: 0.15 });

      document.querySelectorAll('.project-card, .project-showcase-item').forEach(el => {
        observer.observe(el);
      });
    }, 300);
  }
}

