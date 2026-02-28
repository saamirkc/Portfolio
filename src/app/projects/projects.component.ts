import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  projects = [
    {
      title: 'Quiz Web Application',
      description: 'A full-stack exam portal featuring role-based access control (Admin/User), JWT authentication, timed quizzes, auto-grading, and a responsive Angular dashboard. Built with production-grade Spring Boot APIs and MySQL persistence.',
      technologies: ['Angular', 'Spring Boot', 'MySQL', 'JWT', 'Spring Security'],
      github: 'https://github.com/saamirkc/Examportalbackend',
      image: '/exam.jpg',
      live: ''
    },
    {
      title: 'Online Book Store',
      description: 'An e-commerce platform for books with Spring Security authentication, Khalti payment gateway integration, shopping cart management, and a responsive Angular storefront. Features order tracking and inventory management.',
      technologies: ['Angular', 'Spring Boot', 'PostgreSQL', 'Khalti', 'REST API'],
      github: 'https://github.com/saamirkc/backendbookstore',
      image: '/book.png',
      live: ''
    },
    {
      title: 'Pneumonia Detection System',
      description: 'An end-to-end ML pipeline for pneumonia detection and localization in chest X-ray images. Features a FastAPI backend serving a deep learning model with an Angular visualization frontend for medical image analysis.',
      technologies: ['FastAPI', 'Deep Learning', 'Angular', 'Python', 'TensorFlow'],
      github: 'https://github.com/saamirkc/BackendForML',
      image: '/pneumonia.png',
      live: ''
    },
    {
      title: 'Book Library Management',
      description: 'A comprehensive library management system enabling users to borrow, return, and manage books. Features user authentication, book catalog search, borrowing history, and admin dashboard built with Spring Boot microservices.',
      technologies: ['Java', 'Spring Boot', 'MySQL', 'Angular', 'Hibernate'],
      github: 'https://github.com/saamirkc/Book-backendlib',
      image: '/bookui.png',
      live: ''
    }
  ];
}

