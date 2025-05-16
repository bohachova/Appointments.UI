import { Component } from '@angular/core';
import { RegistrationStatus } from '../../../enums/registrationStatuses.enum';
import { AuthRequest } from '../../../models/requests/authRequest.interface';
import { Router } from '@angular/router';
import { RegistrationStatusRequest } from '../../../models/requests/registrationStatusRequest.interface';
import { AuthService } from '../../../services/auth.service';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrl: './authorization.component.scss'
})
export class AuthorizationComponent {

  customersPhone: string = '';
  status: RegistrationStatus | null = null;
  password: string = '';
  RegistrationStatus = RegistrationStatus;
  authorizationFailed: boolean = false;
  statusChecked: boolean = false;

  constructor(private authService: AuthService, private apiService:ApiService, private router: Router) {}
  
  checkRegistrationStatus(){
     let statusRequest : RegistrationStatusRequest = {phone: this.customersPhone};
     this.apiService.checkRegistrationStatus(statusRequest).subscribe(
      (status) => {this.status = status.status}
    );
    this.statusChecked = true;
  }

  authorize(){
    let request: AuthRequest = {
      phone: this.customersPhone,
      password: this.password
    };

    this.authService.authorization(request).subscribe({
      next: () => {
        const token = this.authService.getAccessToken();
        if (token) {
          this.authorizationFailed = false;
          this.router.navigate(['/']);
        } else {
          this.authorizationFailed = true;
        }
      },
      error: () => {
        this.authorizationFailed = true;
      }
    });
  }

  registrationRedirect(){
    sessionStorage.setItem('userPhoneNumber', this.customersPhone);
    this.router.navigate(['/authorization/registration']);
  }
}
