import { Component } from '@angular/core';
import { Service } from '../../../models/service.interface';
import { map, Observable, switchMap } from 'rxjs';
import { ApiService } from '../../../services/api.service';
import { GetAvailableServicesRequest } from '../../../models/requests/getAvailableServicesRequest.interface';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss'
})
export class ServicesComponent {
  public readonly services$: Observable<Service[]>;
  specialistSelected : boolean = false;
  timeSelected: boolean = false;
  nextStepButtonActive: boolean = false;
  nextStep: string = '';
  
  constructor(private apiService: ApiService) {
    const specialistId = sessionStorage.getItem('selectedSpecialistId');
    const timeslot = sessionStorage.getItem('selectedTimeslot');
    if(specialistId){
      this.specialistSelected = true;
      this.services$ = this.apiService.getSpecialistsServices(+specialistId);
    }
    else if(timeslot){
      this.timeSelected = true;
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
  }

  onServiceSelected(serviceId : number){
    sessionStorage.setItem('selectedServiceId', serviceId.toString());
    this.nextStep = this.specialistSelected ? 'timeslots' : 'specialists';
    this.nextStepButtonActive = true;
  }
}
