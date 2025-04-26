import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  ngOnInit(){
    const linkcolor = document.querySelectorAll(".nav-link");
    linkcolor.forEach(link => {
if(window.location.href.endsWith(link.getAttribute('href')|| '')){
  link.classList.add("active");
}
link.addEventListener("click", () => {
linkcolor.forEach(link => {
  link.classList.remove("active");
})
  link.classList.add("active");

})

    }

    )


  }

}
