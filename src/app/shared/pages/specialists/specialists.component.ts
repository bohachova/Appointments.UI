import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Observable } from 'rxjs';
import { Specialist } from '../../../models/specialist.interface';
import { TimeSlot } from '../../../models/timeslot.interface';
import { NextStepService } from '../../../services/next-step-button.service';

@Component({
  selector: 'app-specialists',
  templateUrl: './specialists.component.html',
  styleUrl: './specialists.component.scss'
})
export class SpecialistsComponent {
  public readonly specialists$: Observable<Specialist[]>
  serviceSelected : boolean = false;
  timeSelected : boolean = false;
  nearestSpecialistsTimeslots: TimeSlot[] = [];
  nextStep: string = '';
  
  constructor(private apiService: ApiService, private nextStepService: NextStepService) {
    const serviceId = sessionStorage.getItem('selectedServiceId');
    const timeslot = sessionStorage.getItem('selectedTimeslot');

    if(serviceId){
      this.serviceSelected = true;
      if(timeslot){
        this.timeSelected = true;
        const requestedSpecialists = sessionStorage.getItem('availableSpecialists');
        this.specialists$ = apiService.getAvailableSpecialists(Number(serviceId),requestedSpecialists ? JSON.parse(requestedSpecialists) : [] )
      }
      else{
        this.specialists$ = apiService.getSpecialistsByService(Number(serviceId));
      }
    }
    else{
      this.specialists$ = apiService.getAllSpecialists();
    }
  }

  onSpecialistSelected(specialistId : number, price? : number){
    sessionStorage.setItem('selectedSpecialistId', specialistId.toString());
    if(this.serviceSelected && this.timeSelected){
      this.nextStep = 'appointmentCompletion';
    }
    else if(this.serviceSelected && !this.timeSelected){
      this.nextStep = 'timeslots';
    }
    else{
      this.nextStep = 'services';
    }
    this.nextStepService.setNextStep(true, this.nextStep);
  }

  onSpecialistWithTimeSlotSelected(slot: TimeSlot){
    sessionStorage.setItem('selectedSpecialistId', slot.specialistId!.toString());
    const [hours, minutes] = slot.start.split(':').map(Number);
    slot.date!.setHours(hours, minutes, 0);
    sessionStorage.setItem('selectedTimeslot', slot.date!.toString());
    this.nextStep = this.serviceSelected ? 'appointmentCompletion' : 'services';
    this.nextStepService.setNextStep(true, this.nextStep);
  }
}
