import { Component, OnInit, OnDestroy, HostListener, NgZone } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  isScrolled = false;
  mobileMenuOpen = false;
  activeSection = 'home';
  scrollProgress = 0;

  navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  private scrollThreshold = 50;
  private observer!: IntersectionObserver;

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled = window.scrollY > this.scrollThreshold;

    // Calculate scroll progress for the progress bar
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  }

  private setupIntersectionObserver() {
    setTimeout(() => {
      const options: IntersectionObserverInit = {
        root: null,
        rootMargin: '-10% 0px -70% 0px',
        threshold: 0
      };

      this.observer = new IntersectionObserver((entries) => {
        this.ngZone.run(() => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              this.activeSection = entry.target.id;
            }
          });
        });
      }, options);

      this.navItems.forEach(item => {
        const element = document.getElementById(item.id);
        if (element) {
          this.observer.observe(element);
        }
      });
    }, 300);
  }

  scrollTo(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: 'smooth'
      });
    }
    this.mobileMenuOpen = false;
  }

  toggleMobileMenu() {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }
}

