import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-next-step-button',
    templateUrl: './next-step-button.component.html',
    styleUrl: './next-step-button.component.scss'
  })
  export class NextStepButtonComponent {

    @Input()
    nextStep!: string;

    constructor(private router: Router){}

    goToNextStep(){
      if(this.nextStep){
        this.router.navigate([this.nextStep]);
      }
    }
  }