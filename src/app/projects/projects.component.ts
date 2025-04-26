import {Component} from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  projects = [
    {
      title: 'Quiz Web App',
      description: 'A full-stack quiz application with role-based access (Admin/User), built with Angular, Spring Boot, and JWT Authentication.',
      technologies: ['Angular', 'Spring Boot', 'MySQL', 'JWT'],
      github: 'https://github.com/saamirkc/Examportalbackend',
      image: '/exam.jpg'

    },
    {
      title: 'Online Book Store',
      description: 'An e-commerce platform for books featuring Spring Security, payment integration (Khalti), and responsive Angular frontend.',
      technologies: ['Angular', 'Spring Boot', 'PostgreSQL', 'Khalti'],
      github: 'https://github.com/saamirkc/backendbookstore',
      image: '/book.png'

    },
    {
      title: 'Pneumonia Detection and Localization In Chest X-Ray Images',
      description: 'An end-to-end machine learning project for pneumonia detection and localization in chest X-ray images.',
      technologies: ['Angular', 'FastApi', 'Machine Learning', 'Deep Learning'],
      github: 'https://github.com/saamirkc/BackendForML',
      image: '/pneumonia.png'

    },
    {
      title: 'Book Library',
      description: 'A book library management system  built with Java , Spring Boot ,Angular providing users the ability to borrow, return, and manage books.',
      technologies: ['Java', 'Spring Boot', 'MySQL'],
      github: 'https://github.com/saamirkc/Book-backendlib',
      image: '/bookui.png'
    }

  ];

  getBadgeUrl(tech: string): string {
    switch (tech) {
      case 'Java':
        return 'https://img.shields.io/badge/Java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white';
      case 'Spring Boot':
        return 'https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white';
      case 'Angular':
        return 'https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white';
      case 'MySQL':
        return 'https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white';
      case 'JWT':
        return 'https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white';
      case 'Khalti':
        return 'https://img.shields.io/badge/Khalti-5C2D91?style=for-the-badge&logo=khalti&logoColor=white';
      case 'FastApi':
        return 'https://img.shields.io/badge/FastApi-005571?style=for-the-badge&logo=fastapi&logoColor=white';
      case 'Machine Learning':
        return 'https://img.shields.io/badge/Machine%20Learning-FF6347?style=for-the-badge&logo=machine%20learning&logoColor=white';
      case 'Deep Learning':
        return 'https://img.shields.io/badge/Deep%20Learning-D41B71?style=for-the-badge&logo=deep%20learning&logoColor=white';
      case 'PostgreSQL':
        return 'https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white';
      default:
        return 'https://img.shields.io/badge/Tech-gray?style=for-the-badge';
    }
  }

}
