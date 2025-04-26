import {Component, signal} from '@angular/core';
import {Router} from '@angular/router';


@Component({
  selector: 'app-contact',
  standalone: false,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent {
  constructor(private route:Router) { }


  onSubmit() {
    alert("Thank you for contacting me");
    this.route.navigate(['/'])
  }
}
