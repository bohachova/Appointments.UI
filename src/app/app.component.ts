import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { NextStepService } from './services/next-step-button.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  homePage: boolean = true;
  showButton$!: Observable<boolean>;
  nextRoute$!: Observable<string | null>;

  constructor(private router: Router, private nextStepService: NextStepService) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.homePage = event.urlAfterRedirects === '/';
      if (this.homePage) {
          sessionStorage.clear();
        }
      this.nextStepService.reset();
    });
    this.showButton$ = this.nextStepService.showButton$;
    this.nextRoute$ = this.nextStepService.nextRoute$;
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

