import { Component, OnInit } from "@angular/core";
import { Customer } from "../../../models/customer.interface";
import { AppointmentData } from "../../../models/appointmentData.interface";
import { ApiService } from "../../../services/api.service";
import { AuthService } from "../../../services/auth.service";
import { Observable } from "rxjs";

@Component({
    selector: 'app-appointment-completion',
    templateUrl: './appointment-completion.component.html',
    styleUrl: './appointment-completion.component.scss'
  })
  export class AppointmentCompletionComponent implements OnInit{

    customer : Customer | null = null;
    formHidden: boolean = false;
    resultMessageShown: boolean = false;
    public userAuthorized$: Observable<boolean>;

    constructor(private apiService: ApiService, private authService: AuthService){
      this.userAuthorized$ = this.authService.loggedIn$;  
    }

    ngOnInit(): void {
      if(this.userAuthorized$){
        this.apiService.viewCustomerAccount().subscribe(
          (result) => {this.customer = result}
        );
      }
    }
    
    formCompleted(customer : Customer){
      this.customer = customer;
      this.createAppointment();
    }

    createAppointment(){
      const selectedService = sessionStorage.getItem('selectedServiceId');
      const selectedSpecialist = sessionStorage.getItem('selectedSpecialistId');
      const selectedTime =sessionStorage.getItem('selectedTimeslot');

      if(selectedSpecialist && selectedService && selectedTime){
        const data : AppointmentData = {
          customer : this.customer!, 
          serviceId : Number(selectedService),
          specialistId : Number(selectedSpecialist),
          dateTime : new Date(selectedTime!)
        };
        this.apiService.createAppointment(data).subscribe((response) => {
            if(response.isSuccess){
              this.formHidden = true;
              this.resultMessageShown = true;
            }
          });
      }
    }
  }