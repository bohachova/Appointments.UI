import { Component } from '@angular/core';
import { Customer } from '../../../models/customer.interface';
import { AuthResponse } from '../../../responses/authResponse.interface';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrl: './registration.component.scss'
  })
  export class RegistrationComponent{

    userPhoneNumber: string | null = null;

    constructor(private authService: AuthService, private router: Router){}

    ngOnInit(){
      this.userPhoneNumber = sessionStorage.getItem('userPhoneNumber');
    }
      
    registrationHandler(customer : Customer){
      this.authService.registration(customer).subscribe({
        next: () => {
          const token = this.authService.getAccessToken();
          if (token) {
            this.router.navigate(['/']);
          } else {
            console.error('This phone number is already in use.');
          }
        },
        error: (err) => {
          console.error('Registration failed:', err);
        }
      });
    }
  } 