import { Component, OnInit } from "@angular/core";
import { TimeSlot } from "../../../models/timeslot.interface";
import { ApiService } from "../../../services/api.service";
import { TimeSlotsRequest } from "../../../models/requests/timeslotsRequest.interface";
import { min, Observable, of, Subject } from "rxjs";
import { NextStepService } from "../../../services/next-step-button.service";

@Component({
  selector: 'app-timeslots',
  templateUrl: './timeslots.component.html',
  styleUrl: './timeslots.component.scss'
})
export class TimeSlotsComponent implements OnInit {
  selectedDate: Date = new Date();
  timeslots$: Observable<TimeSlot[]> | null = null;
  serviceSelected: boolean = false;
  specialistSelected: boolean = false;
  workingDays: number[] = [];
  nextStep: string = '';

  constructor(private apiService: ApiService, private nextStepService: NextStepService) {
  }

  ngOnInit(): void {
    const serviceId = sessionStorage.getItem('selectedServiceId');
    const specialistId = sessionStorage.getItem('selectedSpecialistId');
    if (serviceId && specialistId) {
      this.serviceSelected = true;
      this.specialistSelected = true;
      this.apiService.viewSpecialistsWorkingDays(Number(specialistId)).subscribe(
        (result) => { this.workingDays = result }
      );
    }
    this.handleDateClick(new Date());
  }  

  handleDateClick(date: Date): void {
    this.selectedDate = date;

    if (this.serviceSelected && this.specialistSelected) {
        const request: TimeSlotsRequest = {
          specialistId: Number(sessionStorage.getItem('selectedSpecialistId')),
          date: this.selectedDate,
          serviceSelected: this.serviceSelected,
          serviceId: Number(sessionStorage.getItem('selectedServiceId'))
        };
        this.timeslots$ = this.apiService.getRequestedTimeslots(request);
      } 
      else {
        this.timeslots$ = this.apiService.getAllTimeslots(this.selectedDate);
      }
    }

  onTimeSlotSelected(slots: TimeSlot[]) {
    const [hours, minutes] = slots[0].start.split(':').map(Number);
    this.selectedDate.setHours(hours, minutes, 0);
    sessionStorage.setItem('selectedTimeslot', this.selectedDate.toString());
    if (this.specialistSelected && this.serviceSelected) {
      this.nextStep = 'appointmentCompletion';
    }
    else {
      const specialists = slots.map(slot => slot.specialistId);
      sessionStorage.setItem('availableSpecialists', JSON.stringify(specialists));
      this.nextStep = 'services';
    }
    this.nextStepService.setNextStep(true, this.nextStep);
  }
}