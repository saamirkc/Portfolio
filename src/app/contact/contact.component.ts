import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements AfterViewInit {
  formSubmitted = false;

  ngAfterViewInit() {
    this.setupScrollReveal();
  }

  onSubmit() {
    this.formSubmitted = true;
    setTimeout(() => {
      this.formSubmitted = false;
    }, 3000);
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

      document.querySelectorAll('.contact-info, .contact-form-wrapper, .info-card').forEach(el => {
        observer.observe(el);
      });
    }, 300);
  }
}

