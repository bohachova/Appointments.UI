import { Component, OnInit, provideExperimentalZonelessChangeDetection, ViewChild } from "@angular/core";
import { Customer } from "../../../models/customer.interface";
import { AppointmentData } from "../../../models/appointmentData.interface";
import { ApiService } from "../../../services/api.service";
import { AuthService } from "../../../services/auth.service";
import { Observable } from "rxjs";
import { PersonalDataFormComponent } from "../../components/personal-data-form/personal-data-form.component";

@Component({
    selector: 'app-appointment-completion',
    templateUrl: './appointment-completion.component.html',
    styleUrl: './appointment-completion.component.scss'
  })
  export class AppointmentCompletionComponent implements OnInit{

    @ViewChild(PersonalDataFormComponent) personalDataFormComponent!: PersonalDataFormComponent;
    customer : Customer | null = null;
    formHidden: boolean = false;
    resultMessageShown: boolean = false;
    public userAuthorized$: Observable<boolean>;

    constructor(private apiService: ApiService, private authService: AuthService){
      this.userAuthorized$ = this.authService.loggedIn$;  
    }

    ngOnInit(): void {
      this.userAuthorized$.subscribe(isAuthorized => {
        if (isAuthorized) {
          this.apiService.viewCustomerAccount().subscribe(
            result => { this.customer = result }
          );
        } else {
          console.log('User not authorized');
        }
      });
    }

    submitForm(){
      const form = this.personalDataFormComponent.personalDataForm;

      if(form.valid){
        const customer : Customer = form.value;
        this.customer = customer;
        this.createAppointment();
      }
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