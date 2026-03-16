import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: false,
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements AfterViewInit {
  highlights = [
    { icon: 'fa-server', title: 'Backend-First', desc: 'Spring Boot, REST APIs, Microservices' },
    { icon: 'fa-diagram-project', title: 'Distributed Systems', desc: 'Kafka, Event-Driven Architecture' },
    { icon: 'fa-shield-halved', title: 'Financial Systems', desc: 'Secure, compliant fintech solutions' },
    { icon: 'fa-cloud', title: 'Cloud-Native', desc: 'Docker, AWS, CI/CD Pipelines' }
  ];

  terminalLines = [
    { type: 'command', text: 'cat about.json' },
    { type: 'output', text: '{', class: 'json-bracket' },
    { type: 'output', text: '  "name": "Samir K.C.",', class: 'json-string' },
    { type: 'output', text: '  "role": "Java Backend Developer",', class: 'json-string' },
    { type: 'output', text: '  "location": "Nepal",', class: 'json-string' },
    { type: 'output', text: '  "languages": ["Java", "Python", "TypeScript"],', class: 'json-array' },
    { type: 'output', text: '  "frameworks": ["Spring Boot", "Angular"],', class: 'json-array' },
    { type: 'output', text: '  "databases": ["PostgreSQL", "MySQL", "MongoDB"],', class: 'json-array' },
    { type: 'output', text: '  "interests": ["Distributed Systems", "Fintech"],', class: 'json-array' },
    { type: 'output', text: '  "available": true', class: 'json-bool' },
    { type: 'output', text: '}', class: 'json-bracket' },
    { type: 'command', text: 'echo "Open to opportunities!"' },
    { type: 'output', text: 'Open to opportunities!', class: 'output-success' }
  ];

  techStack = [
    {
      name: 'Backend',
      icon: 'fa-code',
      items: ['Java', 'Spring Boot', 'Spring Security', 'REST APIs', 'Kafka', 'Microservices']
    },
    {
      name: 'Frontend',
      icon: 'fa-laptop-code',
      items: ['Angular', 'TypeScript', 'HTML5', 'CSS3', 'Bootstrap']
    },
    {
      name: 'Database',
      icon: 'fa-database',
      items: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis', 'Hibernate']
    },
    {
      name: 'DevOps & Tools',
      icon: 'fa-gear',
      items: ['Git', 'Docker', 'Linux', 'AWS', 'Maven', 'Postman']
    }
  ];

  ngAfterViewInit() {
    this.setupScrollReveal();
    this.setupTechHover();
  }

  private setupScrollReveal() {
    setTimeout(() => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      }, { threshold: 0.1 });

      document.querySelectorAll('.about-text, .about-visual, .tech-category, .highlight-item').forEach(el => {
        observer.observe(el);
      });
    }, 300);
  }

  private setupTechHover() {
    setTimeout(() => {
      const techCategories = document.querySelectorAll('.tech-category');
      techCategories.forEach(cat => {
        const el = cat as HTMLElement;
        el.addEventListener('mousemove', (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          el.style.setProperty('--mouse-x', `${x}px`);
          el.style.setProperty('--mouse-y', `${y}px`);
        });
      });
    }, 300);
  }
}

