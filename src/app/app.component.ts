import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  constructor(private router: Router) {
  }

  public openServices(): void {
    this.router.navigate(['services']);
  }

  public openSpecialists(): void {
    this.router.navigate(['specialists']);
  }

  public openTimeslots(): void{
    this.router.navigate(['timeslots']);
  }
}
