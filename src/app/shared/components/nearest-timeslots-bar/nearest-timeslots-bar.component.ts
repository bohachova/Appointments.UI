import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { TimeSlot } from "../../../models/timeslot.interface";
import { ApiService } from "../../../services/api.service";
import { TimeSlotsRequest } from "../../../models/requests/timeslotsRequest.interface";

@Component({
    selector: 'app-nearest-timeslots-bar',
    templateUrl: './nearest-timeslots-bar.component.html',
    styleUrl: './nearest-timeslots-bar.component.scss'
  })
  export class NearestTimeslotsBarComponent implements OnInit {

    @Input()
    specialistId: number | null = null;
    @Input()
    serviceId: number | undefined;

    timeslots : TimeSlot[] = [];
    selectedTimeslot: TimeSlot | null = null;
    selectedDate = new Date();
    requestedDays = 30;

    @Output()
    timeslotWithSpecialistSelected = new EventEmitter<TimeSlot>();

    constructor(private apiService: ApiService){}
    
    ngOnInit(): void {
        const request : TimeSlotsRequest = {
            specialistId: Number(this.specialistId),
            date: new Date(),
            serviceSelected: this.serviceId != null,
            serviceId: this.serviceId,
            intervalsCount: 5
        };
        this.getNearestTimeSlots(request);
    }

    getNearestTimeSlots(request : TimeSlotsRequest){
        this.requestedDays--;

        this.apiService.getRequestedTimeslots(request).subscribe(
            (result) => {
                if(result.length === 0 && this.requestedDays > 0) {
                    request.date.setDate(request.date.getDate() + 1);
                    this.getNearestTimeSlots(request);
                    this.selectedDate = request.date;
                }
                else {
                    this.timeslots = result
                }
            }
        );
    }

    onTimeslotSelected(slots: TimeSlot[]){
        this.selectedTimeslot = slots[0];
        this.selectedTimeslot.date = this.selectedDate;
        this.timeslotWithSpecialistSelected.emit(this.selectedTimeslot);
    }

  }