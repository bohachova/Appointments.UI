import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../../services/auth.service";
import { Observable, Subscription } from "rxjs";

@Component({
    selector: 'app-auth-label',
    templateUrl: './auth-label.component.html',
    styleUrl: './auth-label.component.scss'
  })
  export class AuthLabelComponent implements OnInit {

    public userAuthorized$: Observable<boolean>;

    constructor(private router: Router, private authService: AuthService){
      this.userAuthorized$ = this.authService.loggedIn$;
    }

    ngOnInit(){
        this.authService.autoLogin();
    }

    navigateToProfile(){
        this.router.navigate(['/profile']);
    }

    navigateToAuthorization(){
        this.router.navigate(['/authorization']);
    }

  }