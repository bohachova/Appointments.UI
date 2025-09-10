import { Component } from '@angular/core';
import { Service } from '../../../models/service.interface';
import { map, Observable, switchMap, tap } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { GetAvailableServicesRequest } from '../../../models/requests/getAvailableServicesRequest.interface';
import { NextStepService } from '../../../services/next-step-button.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  public readonly services$: Observable<Service[]>;
  specialistSelected : boolean = false;
  timeSelected: boolean = false;
  nextStep: string = '';
  
  constructor(private apiService: ApiService, private nextStepService: NextStepService) {
    const specialistId = sessionStorage.getItem('selectedSpecialistId');
    const timeslot = sessionStorage.getItem('selectedTimeslot');

    this.specialistSelected = !!specialistId;
    this.timeSelected = !!timeslot;

    if(specialistId){
      this.services$ = this.apiService.getSpecialistsServices(+specialistId);
    }
    else if(timeslot){
      const specialists = sessionStorage.getItem('availableSpecialists');
      const request : GetAvailableServicesRequest = {
        dateTime: new Date(timeslot),
        specialists: specialists ? JSON.parse(specialists) : []
      };
      this.services$ = this.apiService.getAvailableServicesByTime(request);
    }
    else{
      this.services$ = this.apiService.getAllServices();
    }

    if(this.specialistSelected){
      this.nextStep = this.timeSelected ? 'appointmentCompletion' : 'timeslots';
    }
    else{
      this.nextStep = 'specialists';
    }
  }

  onServiceSelected(serviceId : number){
    sessionStorage.setItem('selectedServiceId', serviceId.toString());
    this.nextStepService.setNextStep(true, this.nextStep);
  }
}
